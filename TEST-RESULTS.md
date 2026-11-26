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

## 待正式環境驗收

- LIFF 初始化及帳號角色。
- iPhone LINE 開啟 LIFF，顯示好友與群組選擇器。
- 使用者確認測試收件人後，送出一則訊息。
- 接收端圖片外觀與點擊後進入 @427ysxfl 官方帳號頁面。
