# line-image-share

輕量 HTML/CSS/JavaScript LIFF 工具。使用個人 LINE 帳號透過 Share Target Picker 分享一則只有圖片的 Flex Message，整張圖片設有 URI Action。

- 正式網站：https://david03kimo.github.io/line-image-share/
- Repository：https://github.com/david03kimo/line-image-share

## 日常使用

1. 在 iPhone 的 LINE 中開啟 [LIFF URL](https://liff.line.me/2012815212-Ru3ZjSNq)。
2. 確認圖片及點擊目標；必要時貼上新的公開 HTTPS 圖片網址與目標網址，按「更新預覽」。
3. 按「分享到 LINE」，確認好友或群組後送出。
4. 成功、取消、錯誤會顯示於按鈕下方。接收者點擊圖片即開啟目標網址。

更換宣傳圖片與目標不需重申請 LIFF ID。網址只保存在目前瀏覽器；其他裝置不會同步。外部圖片主機須允許公開載入，LINE 伺服器也必須能存取；不適合登入後才能查看、會過期或阻擋防盜連的圖片網址。新圖片應為 PNG/JPEG、最大 10 MB；高度不得超過寬度三倍。工具讀取實際尺寸並約分計算 aspectRatio。已送出的舊訊息不會因修改輸入欄而改變。

## 預設宣傳圖片

`images/ai-training.png`：1526 × 1030，Flex aspectRatio `763:515`，約 2.05 MB。複製自下載項目「AI 教育訓練企業工作坊.png」，原檔保持不變。圖片包含 `@427ysxfl`。目前保留原圖品質，未做有損壓縮。

若新圖片尚無公開網址，將圖片新增至 `images/` 並提交推送至 main，等待 Pages 部署後複製其 HTTPS 網址到工具。建議用新檔名，避免快取及影響舊訊息。若要讓所有人預設使用新圖片，更新 `config.js` 的 defaultImage；defaultTarget 可同樣修改。

## 部署與維護

- 純靜態網站，不需 npm install、資料庫或後端。
- `config.js` 的 liffId 是公開應用程式識別碼，可以放前端。
- 使用官方 CDN `https://static.line-scdn.net/liff/edge/2/sdk.js`，跟隨 LIFF v2 安全修正及更新。
- 修改 config.js 後，請同步更改 index.html 中 config.js 的版本查詢參數（例如 ?v=20261126-2），避免瀏覽器沿用舊快取。
- GitHub Pages：從 main 分支根目錄部署，HTTPS 網址須與 LIFF Endpoint URL 一致（包含專案子路徑和結尾斜線）。
- 本機預覽：`python3 -m http.server 8765`。分享與預設圖片的完整測試請使用正式 HTTPS 站點；此工具會拒絕 HTTP 圖片網址。
- 不可放入 Channel Secret、Channel Access Token、密碼、個人文件、.env。此工具不需要 Bot Token，也不需要改 Webhook。
- 如果搬移網域，只需更新 LIFF Endpoint URL 與必要的 LINE Login 回呼設定；一般圖片網址更換不需改 Endpoint。

## Flex 結構

一則 `type: flex` 訊息，contents 為 `bubble`，只有 `hero` 圖片。hero 的 `size: full`、`aspectMode: fit`、`action: {type: uri, uri: ...}`。沒有標題、文字區、頁尾或按鈕。`altText` 為 LINE 必填替代文字，僅用於通知或無法顯示 Flex 的環境。Flex 仍是卡片訊息，與原生照片的圓角、選單等細節可能因 LINE 版本不同。

只有使用者按分享才呼叫 `liff.shareTargetPicker()`；`isMultiple: true` 讓好友與群組皆可選。程式不預選收件人、不自動連續發送、不取得收件人清單。成功只代表 LINE SDK 回報 success，無法得知對方已讀或點擊。

## LINE 設定與驗收

請見 `SETUP.md` 與 `TEST-RESULTS.md`。若 Channel 維持 Developing，僅具備 Channel 角色的 LINE 帳號能啟動工具；收件人點圖前往官方帳號不需啟動本 LIFF。若開放其他人使用本工具分享，需先評估並發布 Channel。

## 官方文件

- [註冊 LIFF App](https://developers.line.biz/en/docs/liff/registering-liff-apps/)
- [開發與啟用 Share Target Picker](https://developers.line.biz/en/docs/liff/developing-liff-apps/)
- [Share Target Picker API](https://developers.line.biz/en/reference/liff/#share-target-picker)
- [Flex Message](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)
- [Flex 圖片規格](https://developers.line.biz/en/reference/messaging-api/#f-image)

官方現建議新應用評估 LINE MINI App；本工具為個人分享用途，採既有 Provider 下的 LINE Login/LIFF，降低不必要的申請成本。
