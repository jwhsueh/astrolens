# Astrology Natal & Transit Chart Application

碧霄占星雙盤（本命盤與流年盤）解析系統是一個基於 React、Vite、Express 和 TypeScript 的高精度占星工具。支援高精度的宮位過宮移動預測、流年行星星座客居判定、動態相位計算、AI 占卜解譯與 PDF 報告一鍵匯出。

## 🪐 特色功能
- **雙盤同顯**: 同步載入本命盤（🔘 內圈）及問事流年盤（🪐 外圈）的十二宮落星配置。
- **高精度過宮時間算力**: 基於行星運行速度以及當前運動方向（順行或逆行）精確算出流年星體進入與離開各個本命宮位的天數和具體日期時間。
- **星座越界提醒**: 對於流年星體「雖在某宮，但已移入下個星座」之狀態提供動態視覺高亮與標記（例如：第十一宮但已進入金牛座）。
- **AI 智能解盤**: 深度整合 Gemini 語意智慧模型，一鍵生成多達數千字的本命特徵與流年流月運勢解讀。
- **一鍵導出 PDF**: 高度優化的排版規格，適合生成可直接列印或提供給個案客戶的精美星盤分析報告。

---

## 🚀 快速開始

### 1. 準備環境
本專案基於 **Node.js (v18+)** 進行開發。請確保已安裝 Node.js 與 npm 工具。

### 2. 下載與安裝
```bash
# 複製您的 GitHub 儲存庫
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <REPOSITORY_NAME>

# 安裝所有相依套件
npm install
```

### 3. 配置環境變數
在專案根目錄下，複製 `.env.example` 並重新命名為 `.env`：
```bash
cp .env.example .env
```
在 `.env` 檔案中填入您的 **Gemini API 金鑰** 以啟用 AI 占卜解析服務：
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. 開發階段執行
啟動本地開發伺服器，預設會監聽 [http://localhost:3000](http://localhost:3000)：
```bash
npm run dev
```

### 5. 建置與生產執行
編譯前端 Vite 靜態資源、以及使用 esbuild 捆包後端 TS 伺服器：
```bash
# 進行生產環境打包建置
npm run build

# 啟動生產伺服器執行
npm run start
```

---

## 🛠️ 開發架構

- **前端平台**: React 19 / Vite 6 / TypeScript / Tailwind CSS
- **後端伺服器**: Express (整合 Vite 中介軟體，兼顧敏捷開發與高能生產部署需求)
- **GitHub CI 工作流**: 於 `.github/workflows/build.yml` 中定義了高度流暢的現代化 CI 機制，每次 `push` 或 `pull_request` 都會自動驗證型別安全 (`tsc --noEmit`) 與建置打包。

---

## 📜 授權許可

本專案採用私有或 MIT 許可協議進行託管，歡迎客製化與進一步開發！
