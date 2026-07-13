import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Share-safe Gemini helper with lazy initialization and error handling
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API for intelligent horoscope astrological interpretation
app.post('/api/astrology/interpret', async (req, res) => {
  try {
    const {
      birthData,
      transitData,
      userQuestion
    } = req.body;

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(400).json({
        error: 'missing_api_key',
        message: '尚未設定 GEMINI_API_KEY 密鑰，請至 [Settings > Secrets] 面板中新增此值，即可啟用智慧 AI 星盤解說功能。'
      });
    }

    const ai = getAiClient();
    
    // Construct rich historical astrological details for prompt context
    const prompt = `
你是一位學識極其淵博且富有慈悲心的古典占星大師。請依據以下求問者的【出生星盤】與【當下流年（Transit）雙盤數據】，進行深度、細緻的占卜和生命盤面解析。

【求問者出生星盤數據 (Natal Chart)】：
- 觀測時間: ${birthData.localTime}
- 地點: ${birthData.location}
- 太陽位置: ${birthData.sunSign}
- 月亮位置: ${birthData.moonSign}
- 上升星座 (ASC): ${birthData.ascendantSign}
- 行星宫位與星座分佈:
${birthData.planetDetails?.map((p: any) => `  * ${p.name}: ${p.signName} ${Math.floor(p.degreeInSign)}度, 落入第 ${p.house} 宮 (${p.houseMeaning}) ${p.isRetrograde ? '(逆行)' : ''}`).join('\n')}
- 本命相位分佈 (Natal Aspects):
${birthData.aspects?.map((a: any) => `  * ${a.planetA} 與 ${a.planetB} 呈 ${a.name} (${Math.floor(a.angle)}度): ${a.description}`).join('\n')}
- 月亮南北交點業力軸線 (Lunar Nodes):
${birthData.planetDetails?.filter((p: any) => p.id === 'rahu' || p.id === 'ketu' || p.name.includes('交點')).map((p: any) => `  * ${p.name}: ${p.signName} ${Math.floor(p.degreeInSign)}度, 落入第 ${p.house} 宮 (${p.houseMeaning})`).join('\n') || ''}

【當下求問時刻流年星盤數據 (Transit Chart)】：
- 流年時間: ${transitData.localTime}
- 流年行星落入本命宮位與影響:
${transitData.planetDetails?.map((p: any) => `  * 流年 ${p.name}: 落入本命第 ${p.house} 宮 (${p.houseMeaning}), 預計 ${p.timeForecast} 移動至下一宮`).join('\n')}

【求問者當下占卜解說備註與關注點】：
"${userQuestion || '無特定提問，請針對整個人生格局、近期事業、財運與感情發展給予綜合洞察。'}"

請撰寫一份結構極其清晰、言之有物理性且文筆典雅細膩的「星盤占卜解說報告」。必須包含以下四個向度：
1. 【本命格局與人格天賦分析】：解讀太陽、月亮與上升星座的交織作用，剖析核心性格優勢、隱藏盲點與今生特徵。
2. 【當下星宿流年運勢剖析】：說明當前流年星宿進入本命宮位帶來的急迫課題，包含面臨何種機遇與如何化解磨難。
3. 【月亮南北交點業力軸線指引】：基於北交點☊（今生成長方向、陌生功課）與南交點☋（與生俱來慣性、舒適圈與壓力下的退路），指引求問者如何突破慣性、朝北交點邁進。
4. 【大師指引與專屬占卜建議】：針對求問者的問題或近期生活，給予在事業發展、財富儲備、情感和心靈狀態上的具體指引，指出近期適合開拓的事項。

請使用「繁體中文（台灣）」書寫，语气要真誠、包容、充滿智慧且具有啟發性。
`;

    // High performance model for detailed reading calculations
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    const text = response.text || '無法生成解析內容。';
    return res.json({ text });

  } catch (err: any) {
    console.error('Gemini interpretation error:', err);
    return res.status(500).json({
      error: 'api_failed',
      message: err.message || 'AI 星盤計算解讀失敗，請稍後再試。'
    });
  }
});

// Serve frontend assets
if (process.env.NODE_ENV !== 'production') {
  createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  }).then((vite) => {
    app.use(vite.middlewares);
    
    // Fallback route handling
    app.get('*', (req, res, next) => {
      vite.middlewares(req, res, next);
    });
  });
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Listen to incoming connections on container standard ingress port
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Astrology App server running on http://localhost:${PORT} with NODE_ENV=${process.env.NODE_ENV}`);
});
