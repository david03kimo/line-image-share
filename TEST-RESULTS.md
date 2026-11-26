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
- 使用者已完成 LINE Login 與首次授權，正式頁顯示「已連接 LINE，可以分享」。
- 實際按分享按鈕成功開啟官方 Share Target Picker，新視窗顯示好友、群組、聊天分頁；未自行選取任何收件人。
- 目標 https://line.me/R/ti/p/@427ysxfl 可開啟 LINE Add friend 網頁。
- 修正部署時舊 config.js 快取：index.html 的設定檔加入版本參數。初次部署期間舊 HTML 可能仍被快取，可在網址加 ?v=20261126-1 重新開啟。

## 使用者實際驗收結果

使用者於 2026-11-26 回報：已發送給數位好友及群組，點擊圖片後直接進入官方帳號，確認成功。此為使用者提供的實際傳送及接收端驗收結果，非代理逐一觀看各收件人的裝置。

- 好友及群組傳送：使用者確認成功。
- 接收端點擊圖片跳轉至 @427ysxfl 官方帳號：使用者確認成功。
- 使用者指示收尾，核心分享及跳轉功能驗收完成。
- 未另外確認測試裝置是否為 iPhone，也未由代理逐一觀察各 LINE 版本的渲染外觀。390 × 844 Chrome 模擬已通過；不額外要求重測。
- 更換圖片及目標網址不需變更 LIFF ID：由前端設定方式實作，HTTPS 驗證與預覽鎖定已測試。

## 收尾

- 正式網站再次確認顯示「已連接 LINE，可以分享」，分享按鈕可用。
- 保留乾淨的正式網址分頁，移除該分頁已使用的 OAuth 回呼查詢字串。
- 未由代理另行向好友、客戶或群組發送訊息。
