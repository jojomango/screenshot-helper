# Video Screenshot Helper

這是一個 Chrome 擴充功能，當你瀏覽 kktv.me 或 netflix.com（包含子網域）時，會自動在主要影片播放器前插入一個 `<div class="screenshot-helper"></div>`，並啟用螢幕截圖功能。

## 功能簡介

在內建的 netflix 與 kktv 網域上，自動於主要影片播放器前插入 div 元件（class 為 screenshot-helper），方便使用者進行螢幕截圖。

- 支援自定義 domain，所有站台（包含預設）都可在 popup 或 options 頁面編輯、刪除。

## 安裝方式

### 方式一：從 GitHub 下載安裝
1. 前往本專案 GitHub 頁面，點選「Code」>「Download ZIP」下載專案壓縮檔。
2. 解壓縮後，打開 Chrome 瀏覽器，進入 `chrome://extensions/`。
3. 開啟右上角「開發人員模式」。
4. 點選「載入未封裝項目」，選擇剛剛解壓縮的資料夾。
5. 完成安裝，前往 kktv.me 或 netflix.com 測試功能。

### 方式二：使用 Git 指令安裝
1. 在終端機輸入：
   ```sh
   git clone <本專案 GitHub 連結>
   ```
2. 依照上述步驟 2~5 載入未封裝項目。

## 注意事項
- 此專案目前僅為開發階段，僅支援基本功能。
- 若要自動更新或公開給更多人安裝，建議日後上架 Chrome Web Store。

## 專案階段
請參考 `PHASES.md` 了解目前開發進度與規劃。

---

如有建議或問題，歡迎在 GitHub 上開 issue 討論！
