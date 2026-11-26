(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const config = window.APP_CONFIG;
  const storageKey = 'line-image-share:v1';
  let current = null, ready = false, busy = false, revision = 0;
  const status = text => { $('status').textContent = text; };
  function sync() { $('share').disabled = busy || !current || !ready; }
  function https(value) {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('請輸入不含帳密的 HTTPS 網址。');
    if (url.href.length > 2000) throw new Error('網址長度不可超過 2000 字元。');
    return url.href;
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function aspectRatio(width, height) {
    if (!width || !height || height > width * 3) throw new Error('圖片高度不可超過寬度的三倍，請改用符合 Flex 規格的圖片。');
    const factor = gcd(width, height), w = width / factor, h = height / factor;
    if (Math.max(w, h) > 100000) throw new Error('圖片比例超出 Flex 規格。');
    return `${w}:${h}`;
  }
  function message(data) {
    return {type:'flex', altText:'AI 教育訓練宣傳圖片（點擊查看）', contents:{type:'bubble', size:'giga', hero:{type:'image', url:data.image, size:'full', aspectRatio:data.ratio, aspectMode:'fit', action:{type:'uri', uri:data.target}}}};
  }
  async function preview() {
    const version = ++revision;
    current = null; sync();
    try {
      const image = https($('image-url').value.trim()), target = https($('target-url').value.trim());
      status('正在載入圖片並計算比例…');
      const img = new Image(); img.referrerPolicy = 'no-referrer';
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('圖片載入逾時，請檢查公開 HTTPS 網址。')), 15000);
        img.onload = () => { clearTimeout(timer); resolve(); };
        img.onerror = () => { clearTimeout(timer); reject(new Error('無法載入圖片，請確認網址可公開存取，且是 PNG 或 JPEG 圖片。')); };
        img.src = image;
      });
      if (version !== revision) return;
      const ratio = aspectRatio(img.naturalWidth, img.naturalHeight);
      current = {image, target, ratio};
      $('preview').src = image; $('preview-link').href = target;
      $('dimensions').textContent = `${img.naturalWidth} × ${img.naturalHeight} · 圖片比例 ${ratio} · 點圖片可測試目標網址`;
      try { localStorage.setItem(storageKey, JSON.stringify({image, target})); } catch {}
      status(ready ? '預覽已更新，可以分享。' : '預覽已更新，正在準備 LINE 分享…');
    } catch (error) { if (version === revision) status(error.message); }
    sync();
  }
  $('settings').addEventListener('submit', event => { event.preventDefault(); preview(); });
  for (const id of ['image-url','target-url']) $(id).addEventListener('input', () => { ++revision; current = null; sync(); status('網址已變更，請先按「更新預覽」。'); });
  $('share').addEventListener('click', async () => {
    if (!current || !ready || busy) return;
    if (!liff.isLoggedIn()) {
      status('請先完成 LINE 登入，登入後再按一次分享。');
      liff.login({redirectUri:location.origin + location.pathname}); return;
    }
    if (!liff.isApiAvailable('shareTargetPicker')) { status('目前無法使用分享選擇器。請在 iPhone LINE 中開啟 LIFF 網址，並確認 Channel 已啟用 shareTargetPicker。'); return; }
    busy = true; sync(); status('請在 LINE 視窗選擇收件人並確認送出。');
    try {
      const result = await liff.shareTargetPicker([message(current)], {isMultiple:true});
      status(result?.status === 'success' ? '分享成功！LINE 已回報訊息送出。' : '已取消分享，尚未送出訊息。');
    } catch (error) { status(`分享失敗${error.code ? `（${error.code}）` : ''}，請重試並確認 LINE 登入與網路連線。`); }
    finally { busy = false; sync(); }
  });
  async function start() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch {}
    $('image-url').value = saved.image || new URL(config.defaultImage, location.href).href;
    $('target-url').value = saved.target || config.defaultTarget;
    await preview();
    if (!config.liffId) { status('圖片預覽已就緒，等待設定 LIFF ID。'); return; }
    try {
      if (!window.liff) throw new Error('SDK');
      await liff.init({liffId:config.liffId});
      ready = true; sync();
      if (current) status(liff.isLoggedIn() ? '已連接 LINE，可以分享。' : '預覽已就緒，按「分享到 LINE」完成登入。');
    } catch { status('LINE 初始化失敗，請確認網路、LIFF ID 與 Endpoint URL 後重新開啟。'); }
  }
  start();
})();
