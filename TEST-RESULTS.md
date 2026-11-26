# 測試結果

日期：2026-11-26（Asia/Taipei）

## 已完成

- 視覺確認下載項目最新 AI 教育訓練宣傳圖，包含 @427ysxfl。
- 讀取 PNG 實際尺寸 1526 × 1030，比例約分為 763:515。
- JavaScript 語法檢查通過。
- 模擬 SDK 測試通過：只有一則 Flex、只有 hero 圖片、URI Action 正確、比例正確、成功／取消／錯誤狀態、修改網址後鎖定分享直到更新預覽、拒絕 HTTP／javascript 網址、拒絕高度超過寬度三倍的圖片。
- 模擬測試不會向 LINE 發送任何訊息；不等同真實 LINE 驗收。

- 正式網站及圖片均 HTTP 200；TLS 驗證通過；GitHub Pages 顯示 built，HTTPS enforced。
- Chrome 實際載入宣傳圖，naturalWidth/naturalHeight 為 1526/1030。
- Chrome 實際操作拒絕 HTTP 目標網址，恢復 HTTPS 後可更新預覽。
- 390 × 844 手機尺寸測試：無水平溢出，圖片寬 328px，分享按鈕高 52px；此為 Chrome 版面模擬，未代表 iPhone LINE 實機。

- Console 實際確認 LIFF ID、正式 Endpoint、Full、openid、Add friend Off。
- shareTargetPicker Console 開關已顯示啟用。
- 正式頁實際完成 LIFF SDK 初始化，分享按鈕啟用；官方 edge SDK 登入請求顯示版本 2.32.0。
- 按分享按鈕可進入 LINE Login，scope 為 openid；等待使用者完成首次登入及授權。
- 目標 https://line.me/R/ti/p/@427ysxfl 可開啟 LINE Add friend 網頁。
- 修正部署時舊 config.js 快取：index.html 的設定檔加入版本參數。初次部署期間舊 HTML 可能仍被快取，可在網址加 ?v=20261126-1 重新開啟。

## 待正式環境驗收

- iPhone LINE 開啟 LIFF，顯示好友與群組選擇器。
- 使用者確認測試收件人後，送出一則訊息。
- 接收端圖片外觀與點擊後進入 @427ysxfl 官方帳號頁面。
