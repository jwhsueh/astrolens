import React, { useState, useEffect } from 'react';
import {
  calculateAstrology,
  getPlanetSignInterpretation,
  getPlanetHouseInterpretation,
  formatTimeRange,
  ZODIAC_SIGNS,
  PlanetPosition,
  HouseData,
  Aspect,
  PLANETS_METADATA
} from './utils/astrology';
import { ALL_TAROT_CARDS, getTarotCardById } from './utils/tarot';
import AstrologyWheel from './components/AstrologyWheel';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Printer,
  Download,
  Loader2,
  FileText,
  Search,
  BookOpen,
  Compass,
  ArrowRight,
  Info,
  Layers,
  Activity,
  User,
  Heart,
  Workflow,
  EyeOff,
  Eye,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Preset birth and observatory list
const LOCATION_PRESETS = [
  { name: '台北市 (Taipei)', longitude: 121.50, latitude: 25.03, timezone: 8 },
  { name: '香港 (Hong Kong)', longitude: 114.15, latitude: 22.25, timezone: 8 },
  { name: '上海市 (Shanghai)', longitude: 121.47, latitude: 31.23, timezone: 8 },
  { name: '北京市 (Beijing)', longitude: 116.40, latitude: 39.90, timezone: 8 },
  { name: '東京 (Tokyo)', longitude: 139.69, latitude: 35.67, timezone: 9 },
  { name: '新加坡 (Singapore)', longitude: 103.85, latitude: 1.35, timezone: 8 },
  { name: '倫敦 (London)', longitude: -0.12, latitude: 51.50, timezone: 0 },
  { name: '紐約 (New York)', longitude: -74.00, latitude: 40.71, timezone: -5 },
  { name: '洛杉磯 (Los Angeles)', longitude: -118.24, latitude: 34.05, timezone: -8 },
];

const HOUSE_DETAILS_MAP: { [key: number]: string } = {
  1: '自我外表個性宮',
  2: '價值資產財金宮',
  3: '溝通學習短行宮',
  4: '家庭根源安全宮',
  5: '愛情創意娛樂宮',
  6: '日常工作勞健宮',
  7: '夫妻伴侶合作宮',
  8: '他人資源轉玄宮',
  9: '高等哲學非行宮',
  10: '事業名望官祿宮',
  11: '群眾社會福德宮',
  12: '隱密玄秘因果宮',
};

const MAJOR_ARCANA_ASTROLOGY: Record<string, { type: 'planet' | 'zodiac'; name: string; symbol: string }> = {
  fool: { type: 'planet', name: '天王星', symbol: '♅' },
  magician: { type: 'planet', name: '水星', symbol: '☿' },
  priestess: { type: 'planet', name: '月亮', symbol: '☽' },
  empress: { type: 'planet', name: '金星', symbol: '♀' },
  emperor: { type: 'zodiac', name: '白羊座', symbol: '♈' },
  hierophant: { type: 'zodiac', name: '金牛座', symbol: '♉' },
  lovers: { type: 'zodiac', name: '雙子座', symbol: '♊' },
  chariot: { type: 'zodiac', name: '巨蟹座', symbol: '♋' },
  strength: { type: 'zodiac', name: '獅子座', symbol: '♌' },
  hermit: { type: 'zodiac', name: '處女座', symbol: '♍' },
  fortune_wheel: { type: 'planet', name: '木星', symbol: '♃' },
  justice: { type: 'zodiac', name: '天秤座', symbol: '♎' },
  hanged_man: { type: 'planet', name: '海王星', symbol: '♆' },
  death: { type: 'zodiac', name: '天蠍座', symbol: '♏' },
  temperance: { type: 'zodiac', name: '射手座', symbol: '♐' },
  devil: { type: 'zodiac', name: '摩羯座', symbol: '♑' },
  tower: { type: 'planet', name: '火星', symbol: '♂' },
  star: { type: 'zodiac', name: '水瓶座', symbol: '♒' },
  moon: { type: 'zodiac', name: '雙魚座', symbol: '♓' },
  sun: { type: 'planet', name: '太陽', symbol: '☉' },
  judgement: { type: 'planet', name: '冥王星', symbol: '♇' },
  world: { type: 'planet', name: '土星', symbol: '♄' }
};

const SUIT_ELEMENTS = {
  wands: {
    element: '火',
    planets: [
      { name: '太陽', symbol: '☉' },
      { name: '火星', symbol: '♂' },
      { name: '木星', symbol: '♃' }
    ],
    zodiacs: ['白羊座', '獅子座', '射手座'],
    houses: [1, 5, 9]
  },
  cups: {
    element: '水',
    planets: [
      { name: '月亮', symbol: '☽' },
      { name: '金星', symbol: '♀' },
      { name: '海王星', symbol: '♆' },
      { name: '冥王星', symbol: '♇' }
    ],
    zodiacs: ['巨蟹座', '天蠍座', '雙魚座'],
    houses: [4, 8, 12]
  },
  swords: {
    element: '風',
    planets: [
      { name: '水星', symbol: '☿' },
      { name: '天王星', symbol: '♅' }
    ],
    zodiacs: ['雙子座', '天秤座', '水瓶座'],
    houses: [3, 7, 11]
  },
  pentacles: {
    element: '土',
    planets: [
      { name: '土星', symbol: '♄' },
      { name: '北交點', symbol: '☊' },
      { name: '南交點', symbol: '☋' }
    ],
    zodiacs: ['金牛座', '處女座', '摩羯座'],
    houses: [2, 6, 10]
  }
};

const getCardValue = (cardId: string): number => {
  if (cardId.endsWith('_ace')) return 1;
  if (cardId.endsWith('_two')) return 2;
  if (cardId.endsWith('_three')) return 3;
  if (cardId.endsWith('_four')) return 4;
  if (cardId.endsWith('_five')) return 5;
  if (cardId.endsWith('_six')) return 6;
  if (cardId.endsWith('_seven')) return 7;
  if (cardId.endsWith('_eight')) return 8;
  if (cardId.endsWith('_nine')) return 9;
  if (cardId.endsWith('_ten')) return 10;
  if (cardId.endsWith('_page')) return 11;
  if (cardId.endsWith('_knight')) return 12;
  if (cardId.endsWith('_queen')) return 13;
  return 0; // major or unknown
};

const PLANET_CORE_MEANINGS: Record<string, string> = {
  '太陽': '能量核心、外在自我、生命力與意志力的展現，主導人格追求與核心天賦。',
  '月亮': '內心情感、情緒本能、潛意識世界、安全感來源與內在情感需求。',
  '水星': '心智思維、學習交流、邏輯分析、語言表達與溝通能力。',
  '金星': '愛與美感、人際和諧、藝術追求、價值觀、金錢財產與戀愛態度。',
  '火星': '行動力、精力與慾望、競爭侵略、身體耐力與生存意志。',
  '木星': '幸運繁榮、機遇與擴張、哲學信念、道德情操、高等教育與智慧引領。',
  '土星': '限制與考驗、紀律責任、壓抑恐懼、嚴肅秩序、耐力與業力磨練。',
  '天王星': '變革不羈、獨立自主、突然變化、原創見解、科技突破與特立獨行。',
  '海王星': '靈性想像力、夢境幻覺、同情共情、藝術直覺與無邊界包容力量。',
  '冥王星': '深層轉化、毀滅與再生、意志掌控、秘密權力、靈魂宿命與浴火重生。',
  '北交點': '靈魂今生進化的課題、需要主動挑戰與學習的高層次方向。',
  '南交點': '靈魂過去世累積的熟練習慣、舒適圈以及應避免的過度沈溺。',
};

const ZODIAC_CORE_MEANINGS: Record<string, string> = {
  '牡羊座': '熱情直率、勇往直前、自我意志強、不畏競爭（火象 / 創始）',
  '金牛座': '務實穩定、美感物質、追求感官享受、耐心與沉穩（土象 / 固定）',
  '雙子座': '好奇善變、資訊傳播、靈活多工、機智聰敏與健談（風象 / 變動）',
  '巨蟹座': '溫柔敏感、家庭懷舊、母性滋養、注重安全感與情感呵護（水象 / 創始）',
  '獅子座': '自信慷慨、耀眼表達、渴望焦點、舞台魅力與追求尊嚴（火象 / 固定）',
  '處女座': '完美主義、條理分析、注重瑣碎精準、熱心服務與工作常規（土象 / 變動）',
  '天秤座': '和諧優雅、注重關係公平、美感外交與猶豫不決（風象 / 創始）',
  '天蠍座': '深沉執著、直覺穿透、靈魂蛻變、掌控與神祕吸引力（水象 / 固定）',
  '射手座': '追求哲理、自由樂觀、跨界探索、慷慨直率與拓展視野（火象 / 變動）',
  '摩羯座': '紀律野心、嚴謹負責、社會成就、堅忍與保守沉著（土象 / 創始）',
  '水瓶座': '特立獨行、前衛客觀、群體福祉、冷靜高度智慧與疏離感（風象 / 固定）',
  '雙魚座': '靈性夢幻、超強共情、藝術想像、自我犧牲與包容溫柔（水象 / 變動）',
};

const highlightText = (text: string, highlightNames: string[]) => {
  if (!highlightNames.length) return <span>{text}</span>;
  const sortedNames = [...new Set(highlightNames)]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  if (!sortedNames.length) return <span>{text}</span>;

  const escapedNames = sortedNames.map(name => name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${escapedNames.join('|')})`, 'g');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        sortedNames.includes(part) ? (
          <span key={i} className="text-[#e5c583] font-bold underline decoration-[#c5a059]/40 decoration-1 underline-offset-2">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default function App() {
  // 1. App State for Birth (Natal) Input
  const [birthDate, setBirthDate] = useState('1998-05-18');
  const [birthTime, setBirthTime] = useState('10:30');
  const [birthLocationName, setBirthLocationName] = useState('台北市 (Taipei)');
  const [birthLongitude, setBirthLongitude] = useState(121.50);
  const [birthLatitude, setBirthLatitude] = useState(25.03);
  const [birthTimezone, setBirthTimezone] = useState(8);

  // 2. App State for Transit (Current query moment) Input
  const [transitDate, setTransitDate] = useState('2026-06-13');
  const [transitTime, setTransitTime] = useState('15:02');
  const [transitLocationName, setTransitLocationName] = useState('台北市 (Taipei)');
  const [transitLongitude, setTransitLongitude] = useState(121.50);
  const [transitLatitude, setTransitLatitude] = useState(25.03);
  const [transitTimezone, setTransitTimezone] = useState(8);

  // 3. Filters
  const [hideOuterPlanets, setHideOuterPlanets] = useState<boolean>(false);

  // Selected transit and natal planets for highlighting and sorting in double aspects list
  const [selectedTransitPlanetIds, setSelectedTransitPlanetIds] = useState<string[]>([]);
  const [selectedNatalPlanetIds, setSelectedNatalPlanetIds] = useState<string[]>([]);

  // 4. Hover & Select Details State
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);
  const [hoveredPlanetType, setHoveredPlanetType] = useState<'natal' | 'transit' | null>(null);
  const [hoveredHouse, setHoveredHouse] = useState<HouseData | null>(null);

  // Selected locked details (persistent on click until another is selected)
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [selectedPlanetType, setSelectedPlanetType] = useState<'natal' | 'transit'>('natal');
  const [isInterpretExpanded, setIsInterpretExpanded] = useState<boolean>(true);
  const [planetDetailTab, setPlanetDetailTab] = useState<'interpret' | 'future'>('interpret');
  const [activeAspectTab, setActiveAspectTab] = useState<'double' | 'natal' | 'transit'>('double');

  // 5. Divination Notes Remark State
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('astrology_notes') || 
      '【占卜師分析備註】：\n在此星盤中，太陽落在金牛座，上升星座正在冉冉升起。這表明求問者個性沈穩而具有藝術天賦...\n\n流年木星即將進入第十二宮，預示著一段潛意識精神昇華的靈性時期，適合冥想與反思。';
  });

  // 6. Tarot Timeline Spread States
  const [pastCardId, setPastCardId] = useState(() => localStorage.getItem('tarot_past_card') || 'fool');
  const [pastReversed, setPastReversed] = useState(() => localStorage.getItem('tarot_past_reversed') === 'true');

  const [presentCardId, setPresentCardId] = useState(() => localStorage.getItem('tarot_present_card') || 'magician');
  const [presentReversed, setPresentReversed] = useState(() => localStorage.getItem('tarot_present_reversed') === 'true');

  const [futureCardId, setFutureCardId] = useState(() => localStorage.getItem('tarot_future_card') || 'world');
  const [futureReversed, setFutureReversed] = useState(() => localStorage.getItem('tarot_future_reversed') === 'true');

  // 7. Download HTML States & Handler
  const [isDownloadingHTML, setIsDownloadingHTML] = useState<boolean>(false);

  const handleDownloadHTML = async () => {
    if (isDownloadingHTML) return;
    setIsDownloadingHTML(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));

      const element = document.getElementById('print-report-container');
      if (!element) {
        alert('找不到下載報告書容器，請稍後再試。');
        setIsDownloadingHTML(false);
        return;
      }

      const innerHTMLContent = element.innerHTML;

      const htmlContent = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AstroLens - 星域雙盤占卜解讀報告書 (${birthDate})</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;850&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif;
      background-color: #040810;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem 1rem;
      background-image: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #040810 70%);
    }
    .print-only {
      display: block !important;
    }
    .print-break-after {
      margin-bottom: 3.5rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
      padding-bottom: 3.5rem;
    }
    .report-card {
      max-width: 860px;
      width: 100%;
      background: #0b1329;
      color: #cbd5e1;
      border-radius: 28px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(197, 160, 89, 0.15);
      padding: 3rem 2.5rem;
    }
    .report-card .text-slate-900 {
      color: #f1f5f9 !important;
    }
    .report-card .bg-slate-100 {
      background-color: rgba(255, 255, 255, 0.04) !important;
      border-left-color: #c5a059 !important;
    }
    .report-card .bg-slate-50 {
      background-color: rgba(255, 255, 255, 0.02) !important;
      border-color: rgba(255, 255, 255, 0.05) !important;
    }
    .report-card .border-slate-200, .report-card .border-slate-300 {
      border-color: rgba(255, 255, 255, 0.08) !important;
    }
    .report-card .text-slate-800, .report-card .text-slate-850 {
      color: #e2e8f0 !important;
    }
    .report-card .text-slate-500, .report-card .text-slate-400 {
      color: #94a3b8 !important;
    }
    .report-card .text-slate-600 {
      color: #cbd5e1 !important;
    }
    .report-card table th, .report-card table td {
      border-bottom-color: rgba(255, 255, 255, 0.05) !important;
    }
    svg {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <div class="max-w-[860px] w-full mb-6 flex flex-col sm:flex-row justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 gap-3 no-print">
    <div>
      <h3 class="text-xs font-bold text-amber-400">✨ 離線互動式星象解讀報告書</h3>
      <p class="text-[10px] text-slate-400 mt-0.5">您可以隨時用瀏覽器開啟此單一檔案(支援離線)，亦可一鍵列印或輸出為紙本 PDF</p>
    </div>
    <div class="flex gap-2">
      <button onclick="window.print()" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0c1220] rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer flex items-center gap-1.5 shadow-amber-500/10">
        🖨️ 列印此報告 / 另存為標準 PDF
      </button>
    </div>
  </div>

  <main class="report-card">
    ${innerHTMLContent}
  </main>

  <footer class="mt-8 text-center text-[11px] text-slate-500 no-print">
    <p>報告生成時間: ${new Date().toLocaleDateString('zh-TW')} &bull; AstroLens Pro 星象雙盤解讀系統</p>
  </footer>

  <style>
    @media print {
      body {
        background: #ffffff !important;
        background-image: none !important;
        color: #000000 !important;
        padding: 0 !important;
      }
      .no-print {
        display: none !important;
      }
      .report-card {
        max-width: 100% !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        background: transparent !important;
        color: #000000 !important;
      }
      .report-card .text-slate-905, .report-card .text-slate-900 {
        color: #000000 !important;
      }
      .report-card .bg-slate-100 {
        background-color: #f1f5f9 !important;
        border-left-color: #000000 !important;
      }
      .report-card .bg-slate-50 {
        background-color: #f8fafc !important;
        border-color: #e2e8f0 !important;
      }
      .report-card .border-slate-200 {
        border-color: #cbd5e1 !important;
      }
    }
  </style>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AstroLens_星盤雙盤占卜解讀報告書_${birthDate}.html`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下載 HTML 報告發生異常:', error);
      alert('下載 HTML 報告發生異常，請重試！');
    } finally {
      setIsDownloadingHTML(false);
    }
  };

  // Persist notes
  useEffect(() => {
    localStorage.setItem('astrology_notes', notes);
  }, [notes]);

  // Persist Tarot
  useEffect(() => {
    localStorage.setItem('tarot_past_card', pastCardId);
    localStorage.setItem('tarot_past_reversed', String(pastReversed));
    localStorage.setItem('tarot_present_card', presentCardId);
    localStorage.setItem('tarot_present_reversed', String(presentReversed));
    localStorage.setItem('tarot_future_card', futureCardId);
    localStorage.setItem('tarot_future_reversed', String(futureReversed));
  }, [pastCardId, pastReversed, presentCardId, presentReversed, futureCardId, futureReversed]);

  // Compute Natal and Transit charts dynamically based on state
  const birthDateTimeStr = `${birthDate}T${birthTime}`;
  const transitDateTimeStr = `${transitDate}T${transitTime}`;

  const natalChart = calculateAstrology(
    birthDateTimeStr,
    birthLongitude,
    birthLatitude,
    birthTimezone
  );

  const transitChart = calculateAstrology(
    transitDateTimeStr,
    transitLongitude,
    transitLatitude,
    transitTimezone
  );

  // Filter lists based on hide Outer Planets (Uranus, Neptune, Pluto)
  const isOuterPlanetId = (id: string) => {
    return id === 'uranus' || id === 'neptune' || id === 'pluto';
  };

  const isOuterPlanetName = (name: string) => {
    return name.includes('天王星') || name.includes('海王星') || name.includes('冥王星');
  };

  const filteredNatalPlanets = hideOuterPlanets 
    ? natalChart.planets.filter(p => !isOuterPlanetId(p.id)) 
    : natalChart.planets;

  const filteredTransitPlanets = (hideOuterPlanets 
    ? transitChart.planets.filter(p => !isOuterPlanetId(p.id)) 
    : transitChart.planets).map(p => {
      // Calculate transit planet house relative to natalChart.ascendant (using Equal House from natal ASC)
      const distFromNatalAsc = ((p.longitude - natalChart.ascendant) % 360 + 360) % 360;
      const natalHouseNum = Math.floor(distFromNatalAsc / 30) + 1;
      
      // Calculate daysToNextHouse relative to natal houses
      let daysToNextHouse = p.daysToNextHouse;
      const currentSpeed = p.speed;
      const isRetro = p.isRetrograde;
      
      const nextHouseCusp = ((natalChart.ascendant + 30 * natalHouseNum) % 360 + 360) % 360;
      const degreesToNextCusp = ((nextHouseCusp - p.longitude) % 360 + 360) % 360;
      
      if (Math.abs(currentSpeed) > 0.0001) {
        if (isRetro) {
          const prevHouseCusp = ((natalChart.ascendant + 30 * (natalHouseNum - 1)) % 360 + 360) % 360;
          const degreesToPrevCusp = ((p.longitude - prevHouseCusp) % 360 + 360) % 360;
          daysToNextHouse = degreesToPrevCusp / Math.abs(currentSpeed);
        } else {
          daysToNextHouse = degreesToNextCusp / currentSpeed;
        }
      } else {
        const metadata = PLANETS_METADATA.find(m => m.id === p.id);
        const avgSpeed = metadata ? metadata.avgSpeed : 0.05;
        daysToNextHouse = degreesToNextCusp / Math.abs(avgSpeed);
      }
      
      return {
        ...p,
        house: natalHouseNum,
        daysToNextHouse: daysToNextHouse
      };
    });

  const getTransitTimeOffset = (daysOffset: number): string => {
    const baseDate = new Date(`${transitDate}T${transitTime}`);
    const resultDate = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    
    const y = resultDate.getFullYear();
    const m = String(resultDate.getMonth() + 1).padStart(2, '0');
    const d = String(resultDate.getDate()).padStart(2, '0');
    const h = String(resultDate.getHours()).padStart(2, '0');
    const min = String(resultDate.getMinutes()).padStart(2, '0');
    
    return `${y}-${m}-${d} ${h}:${min}`;
  };

  const calculateHouseTransitTimes = (tP: PlanetPosition, houseNum: number) => {
    const startCusp = ((natalChart.ascendant + 30 * (houseNum - 1)) % 360 + 360) % 360;
    const endCusp = ((natalChart.ascendant + 30 * houseNum) % 360 + 360) % 360;
    
    let t_ingress = 0;
    let t_egress = 0;
    const speed = tP.speed;
    const absSpeed = Math.abs(speed);
    
    if (absSpeed < 0.0001) {
      return { ingress: '過於緩慢或停滯', egress: '過於緩慢或停滯' };
    }
    
    if (speed > 0) {
      // 順行：在 startCusp 進入（過去），在 endCusp 離開（未來）
      const degSinceIngress = ((tP.longitude - startCusp) % 360 + 360) % 360;
      const degToEgress = ((endCusp - tP.longitude) % 360 + 360) % 360;
      
      t_ingress = -degSinceIngress / speed;
      t_egress = degToEgress / speed;
    } else {
      // 逆行：在 endCusp 進入（過去），在 startCusp 離開（未來）
      const degSinceIngress = ((endCusp - tP.longitude) % 360 + 360) % 360;
      const degToEgress = ((tP.longitude - startCusp) % 360 + 360) % 360;
      
      t_ingress = -degSinceIngress / absSpeed;
      t_egress = degToEgress / absSpeed;
    }
    
    const ingressTime = getTransitTimeOffset(t_ingress);
    const egressTime = getTransitTimeOffset(t_egress);
    
    return { ingress: ingressTime, egress: egressTime };
  };

  const getPlanetFutureCycles = (p: PlanetPosition) => {
    let speed = p.speed;
    if (Math.abs(speed) < 0.001) {
      const meta = PLANETS_METADATA.find(m => m.id === p.id);
      speed = meta ? meta.avgSpeed : 0.05;
    }
    const absSpeed = Math.abs(speed);

    const houseTimes = [];
    for (let h = 1; h <= 12; h++) {
      const cusp = ((natalChart.ascendant + 30 * (h - 1)) % 360 + 360) % 360;
      let dist = 0;
      if (speed > 0) {
        dist = ((cusp - p.longitude) % 360 + 360) % 360;
      } else {
        dist = ((p.longitude - cusp) % 360 + 360) % 360;
      }
      const days = dist / absSpeed;
      houseTimes.push({
        houseNum: h,
        houseName: `第 ${h} 宮`,
        days: days,
        formattedTime: getTransitTimeOffset(days)
      });
    }
    houseTimes.sort((a, b) => a.days - b.days);

    const signTimes = [];
    for (let s = 0; s < 12; s++) {
      const cusp = s * 30;
      let dist = 0;
      if (speed > 0) {
        dist = ((cusp - p.longitude) % 360 + 360) % 360;
      } else {
        dist = ((p.longitude - cusp) % 360 + 360) % 360;
      }
      const days = dist / absSpeed;
      signTimes.push({
        signIndex: s,
        signName: ZODIAC_SIGNS[s].name,
        signSymbol: ZODIAC_SIGNS[s].symbol,
        days: days,
        formattedTime: getTransitTimeOffset(days)
      });
    }
    signTimes.sort((a, b) => a.days - b.days);

    return { houseTimes, signTimes };
  };

  // Helper for Tarot Major Arcana & Minor Arcana Astrology Correspondence
  const renderTarotAstrologyConnection = (cardId: string, isPrint: boolean = false) => {
    const card = getTarotCardById(cardId);
    if (!card) return null;

    // 1. Major Arcana Correspondence
    if (card.category === 'major') {
      const astro = MAJOR_ARCANA_ASTROLOGY[card.id];
      if (!astro) return null;
      
      const typeLabel = astro.type === 'planet' ? '對應行星' : '對應星座';
      const textColor = isPrint ? 'text-indigo-850 font-bold' : 'text-[#e5c583] font-bold';
      const bgColor = isPrint ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950' : 'bg-[#c5a059]/10 border-[#c5a059]/20 text-slate-200';
      
      return (
        <div className={`p-2 rounded-xl border text-[10px] space-y-1 mt-1.5 ${bgColor}`}>
          <div className="flex items-center space-x-1.5">
            <span>🪐 <strong>星象對應：</strong></span>
            <span className={`${textColor} px-1.5 py-0.5 rounded bg-black/20 border border-white/5 text-[9px] whitespace-nowrap`}>
              {astro.symbol} {astro.name} ({typeLabel})
            </span>
          </div>
          <p className="text-[9px] text-slate-400 leading-normal">
            此大阿爾克納牌承載著宇宙中的<strong>{astro.name}</strong>能量。當前您本命與流年的<strong>{astro.name}</strong>將深度感應此牌陣的指示。
          </p>
        </div>
      );
    }

    // 2. Minor Arcana Correspondence
    const suit = card.category; // 'wands' | 'cups' | 'swords' | 'pentacles'
    const suitMeta = SUIT_ELEMENTS[suit as keyof typeof SUIT_ELEMENTS];
    if (!suitMeta) return null;

    const cardValue = getCardValue(card.id);
    if (cardValue === 0) return null; // shouldn't happen for valid minor arcana

    const elementColorClass = isPrint ? 'text-indigo-850 font-bold' : 'text-[#e5c583] font-bold';
    const containerBg = isPrint ? 'bg-indigo-50/70 border-indigo-150 text-indigo-950' : 'bg-black/35 border-white/10 text-slate-350';

    if (cardValue >= 1 && cardValue <= 12) {
      // Find same element planets in the corresponding house
      const natalPlanetsInHouse = filteredNatalPlanets.filter(p => p.house === cardValue);
      const transitPlanetsInHouse = filteredTransitPlanets.filter(p => p.house === cardValue);

      const isSameElementPlanet = (p: PlanetPosition) => {
        const planetBelongs = suitMeta.planets.some(ep => ep.name === p.name);
        const signElement = ZODIAC_SIGNS[p.signIndex]?.element;
        const signBelongs = signElement === suitMeta.element;
        return planetBelongs || signBelongs;
      };

      const matchingNatal = natalPlanetsInHouse.filter(isSameElementPlanet);
      const matchingTransit = transitPlanetsInHouse.filter(isSameElementPlanet);

      return (
        <div className={`p-2 rounded-xl border text-[10px] space-y-1.5 mt-1.5 ${containerBg}`}>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              <span>🔥 <strong>元素對應：</strong></span>
              <span className={`px-1.5 py-0.2 rounded bg-[#c5a059]/10 border border-[#c5a059]/15 text-[9px] whitespace-nowrap ${elementColorClass}`}>
                {suitMeta.element}元素 ({card.categoryLabel.split(' ')[0]})
              </span>
            </div>
            <div>
              <span>🪐 <strong>元素行星：</strong></span>
              <span className="font-mono text-slate-300">
                {suitMeta.planets.map(p => `${p.symbol} ${p.name}`).join(', ')}
              </span>
            </div>
            <div className="text-[9.5px] border-t border-white/5 pt-1.5 space-y-1">
              <div>
                <strong>🏠 宮位對應：</strong><span>第 {cardValue} 宮</span>
              </div>
              <div>
                <strong>本命盤第 {cardValue} 宮：</strong>
                {matchingNatal.length > 0 ? (
                  <span className="text-emerald-400 font-bold">
                    同元素星：{matchingNatal.map(p => `${p.symbol}${p.name}`).join(', ')}
                  </span>
                ) : (
                  <span className="text-slate-400 italic">無同元素星落入</span>
                )}
              </div>
              <div>
                <strong>流年盤第 {cardValue} 宮：</strong>
                {matchingTransit.length > 0 ? (
                  <span className="text-emerald-400 font-bold">
                    同元素星：{matchingTransit.map(p => `${p.symbol}${p.name}`).join(', ')}
                  </span>
                ) : (
                  <span className="text-slate-400 italic">無同元素星落入</span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (cardValue === 13) {
      // Card is Queen (index 13)
      const natalJupiter = filteredNatalPlanets.find(p => p.name === '木星');
      const transitJupiter = filteredTransitPlanets.find(p => p.name === '木星');

      const isJupiterInElement = (p: PlanetPosition | undefined) => {
        if (!p) return false;
        const inHouse = suitMeta.houses.includes(p.house);
        const inZodiacElement = ZODIAC_SIGNS[p.signIndex]?.element === suitMeta.element;
        return inHouse || inZodiacElement;
      };

      const natalJupiterMatched = isJupiterInElement(natalJupiter);
      const transitJupiterMatched = isJupiterInElement(transitJupiter);

      return (
        <div className={`p-2 rounded-xl border text-[10px] space-y-1.5 mt-1.5 ${containerBg}`}>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              <span>🌟 <strong>元素對應：</strong></span>
              <span className={`px-1.5 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] whitespace-nowrap ${elementColorClass}`}>
                {suitMeta.element}元素 👑 皇后關聯
              </span>
            </div>
            <div>
              <strong>🏠 元素宮位與星座：</strong>
              <div className="text-slate-300 font-mono text-[9px] mt-0.5">
                {suitMeta.houses.map((h, i) => `第 ${h} 宮 (${suitMeta.zodiacs[i]})`).join('、')}
              </div>
            </div>
            <div className="text-[9.5px] border-t border-white/5 pt-1.5 space-y-1">
              <div>
                <strong>本命盤木星檢測：</strong>
                {natalJupiter ? (
                  natalJupiterMatched ? (
                    <span className="text-emerald-400 font-bold">
                      ✅ 契合！木星落入{ZODIAC_SIGNS[natalJupiter.signIndex].name}，在第 {natalJupiter.house} 宮
                    </span>
                  ) : (
                    <span className="text-rose-450 font-medium text-[8px]">
                      ❌ 未契合 ({ZODIAC_SIGNS[natalJupiter.signIndex].name})
                    </span>
                  )
                ) : <span className="text-slate-400 italic">無木星資訊</span>}
              </div>
              <div>
                <strong>流年盤木星檢測：</strong>
                {transitJupiter ? (
                  transitJupiterMatched ? (
                    <span className="text-emerald-400 font-bold">
                      ✅ 契合！落本命第 {transitJupiter.house} 宮
                    </span>
                  ) : (
                    <span className="text-rose-450 font-medium text-[8px]">
                      ❌ 未契合 ({ZODIAC_SIGNS[transitJupiter.signIndex].name})
                    </span>
                  )
                ) : <span className="text-slate-400 italic">無木星資訊</span>}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Select first planet by default for detail show
  useEffect(() => {
    if (filteredNatalPlanets.length > 0 && !selectedPlanet) {
      setSelectedPlanet(filteredNatalPlanets[0]);
      setSelectedPlanetType('natal');
    }
  }, [filteredNatalPlanets]);

  // Handle preset selections
  const handleBirthPresetChange = (presetName: string) => {
    const preset = LOCATION_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setBirthLocationName(preset.name);
      setBirthLongitude(preset.longitude);
      setBirthLatitude(preset.latitude);
      setBirthTimezone(preset.timezone);
    }
  };

  const handleTransitPresetChange = (presetName: string) => {
    const preset = LOCATION_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setTransitLocationName(preset.name);
      setTransitLongitude(preset.longitude);
      setTransitLatitude(preset.latitude);
      setTransitTimezone(preset.timezone);
    }
  };

  // Compare and find major aspects formed between Transit planets and Natal planets
  const calculateTransitNatalAspects = (): Aspect[] => {
    const comparisons: Aspect[] = [];
    const transitPlanets = transitChart.planets;
    const natalPlanets = natalChart.planets;

    const majorAspects = [
      { type: 'conjunction', angle: 0, orb: 6, name: '合相', harmony: 'neutral' as const, desc: '流年星體與本命星重疊，強烈匯聚激發本原能量、開啟新篇章' },
      { type: 'sextile', angle: 60, orb: 4, name: '六分相', harmony: 'positive' as const, desc: '和諧與機會，伴隨著外界環境伸出援手與良好學習契機' },
      { type: 'square', angle: 90, orb: 6, name: '四分相', harmony: 'challenging' as const, desc: '劇烈摩擦與不得不面對的轉折考驗，需做出調整與克服衝突' },
      { type: 'trine', angle: 120, orb: 6, name: '三分相', harmony: 'positive' as const, desc: '超強順流與吉星之照，能得心應手施展本命潛能，平步青雲' },
      { type: 'opposition', angle: 180, orb: 6, name: '對分相', harmony: 'challenging' as const, desc: '深度對立與關係鏡像投射，面臨外部關係、合作對抗等深刻張力' }
    ];

    const normalizeAngle = (deg: number) => {
      deg = deg % 360;
      if (deg < 0) deg += 360;
      return deg;
    };

    const formatAspectTime = (daysOffset: number): string => {
      const baseDate = new Date(`${transitDate}T${transitTime}`);
      const resultDate = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
      
      const y = resultDate.getFullYear();
      const m = String(resultDate.getMonth() + 1).padStart(2, '0');
      const d = String(resultDate.getDate()).padStart(2, '0');
      const h = String(resultDate.getHours()).padStart(2, '0');
      const min = String(resultDate.getMinutes()).padStart(2, '0');
      
      return `${y}-${m}-${d} ${h}:${min}`;
    };

    for (const tP of transitPlanets) {
      if (hideOuterPlanets && isOuterPlanetId(tP.id)) continue;
      for (const nP of natalPlanets) {
        if (hideOuterPlanets && isOuterPlanetId(nP.id)) continue;

        let diff = Math.abs(tP.longitude - nP.longitude);
        if (diff > 180) diff = 360 - diff;

        for (const asp of majorAspects) {
          if (Math.abs(diff - asp.angle) <= asp.orb) {
            // Find L_exact (which of the two exact aspect longitudes is closer to tP)
            let diff1 = Math.abs(normalizeAngle(tP.longitude - (nP.longitude + asp.angle)));
            if (diff1 > 180) diff1 = 360 - diff1;
            let diff2 = Math.abs(normalizeAngle(tP.longitude - (nP.longitude - asp.angle)));
            if (diff2 > 180) diff2 = 360 - diff2;

            const L_exact = diff1 < diff2 
              ? normalizeAngle(nP.longitude + asp.angle) 
              : normalizeAngle(nP.longitude - asp.angle);

            let delta = tP.longitude - L_exact;
            delta = ((delta + 180) % 360 + 360) % 360 - 180; // normalized to [-180, 180]

            let ingressStr = '時間極為漫長 (天體停滯於停留區)';
            let egressStr = '時間極為漫長 (天體停滯於停留區)';

            if (Math.abs(tP.speed) >= 0.005) {
              const t1 = (-asp.orb - delta) / tP.speed;
              const t2 = (asp.orb - delta) / tP.speed;
              const t_ingress = tP.speed > 0 ? t1 : t2;
              const t_egress = tP.speed > 0 ? t2 : t1;

              ingressStr = formatAspectTime(t_ingress);
              egressStr = formatAspectTime(t_egress);
            }

            // Calculate future 3 special aspects for this pair
            const futureCandidates: { name: string; time: string; angle: number; days: number }[] = [];
            let p_speed = tP.speed;
            if (Math.abs(p_speed) < 0.001) {
              const meta = PLANETS_METADATA.find(m => m.id === tP.id);
              p_speed = meta ? meta.avgSpeed : 0.05;
            }
            const absSpeed = Math.abs(p_speed);
            const initialDiff = ((tP.longitude - nP.longitude) % 360 + 360) % 360;

            const targets = [
              { angle: 0, name: '合相 (0°)' },
              { angle: 60, name: '六分相 (60°)' },
              { angle: 90, name: '四分相 (90°)' },
              { angle: 120, name: '三分相 (120°)' },
              { angle: 180, name: '對分相 (180°)' },
              { angle: 240, name: '三分相 (120°)' },
              { angle: 270, name: '四分相 (90°)' },
              { angle: 300, name: '六分相 (60°)' }
            ];

            for (const tg of targets) {
              let angleToTravel = 0;
              if (p_speed > 0) {
                angleToTravel = ((tg.angle - initialDiff) % 360 + 360) % 360;
              } else {
                angleToTravel = ((initialDiff - tg.angle) % 360 + 360) % 360;
              }

              const t_first = angleToTravel / absSpeed;
              const occurrences = [t_first, t_first + 360 / absSpeed, t_first + 720 / absSpeed];
              for (const days of occurrences) {
                if (days > 0.02) {
                  futureCandidates.push({
                    name: tg.name,
                    time: formatAspectTime(days),
                    angle: tg.angle,
                    days: days
                  });
                }
              }
            }

            futureCandidates.sort((a, b) => a.days - b.days);

            const uniqueFuture: { name: string; time: string; angle: number }[] = [];
            const seenTimes = new Set<string>();
            for (const item of futureCandidates) {
              if (!seenTimes.has(item.time)) {
                seenTimes.add(item.time);
                uniqueFuture.push({ name: item.name, time: item.time, angle: item.angle });
                if (uniqueFuture.length >= 3) break;
              }
            }

            comparisons.push({
              planetA: `流年 ${tP.name}`,
              planetB: `本命 ${nP.name}`,
              type: asp.type as any,
              angle: diff,
              orb: Math.abs(diff - asp.angle),
              name: asp.name,
              harmony: asp.harmony,
              description: `流年 ${tP.name} 與本命 ${nP.name} 呈 ${asp.name} (${asp.angle}°)，說明${asp.desc}。`,
              ingressTime: ingressStr,
              egressTime: egressStr,
              futureAspects: uniqueFuture
            });
          }
        }
      }
    }
    return comparisons;
  };

  // Compare and find major aspects formed within Transit planets themselves
  const calculateTransitTransitAspects = (): Aspect[] => {
    const comparisons: Aspect[] = [];
    const transitPlanets = transitChart.planets;

    const majorAspects = [
      { type: 'conjunction', angle: 0, orb: 8, name: '合相', harmony: 'neutral' as const, desc: '能量融合，高度專注或開啟全新的世俗天象周期' },
      { type: 'sextile', angle: 60, orb: 6, name: '六分相', harmony: 'positive' as const, desc: '機會與和諧，主動協作能創造才華伸展與運勢契機' },
      { type: 'square', angle: 90, orb: 8, name: '四分相', harmony: 'challenging' as const, desc: '困難與磨擦，大眾世俗環境的考驗、張力促使採取行動和克服挑戰' },
      { type: 'trine', angle: 120, orb: 8, name: '三分相', harmony: 'positive' as const, desc: '流暢共鳴，展現天賦資源與社會層面順理成章得助的幸運契機' },
      { type: 'opposition', angle: 180, orb: 8, name: '對分相', harmony: 'challenging' as const, desc: '張力與對立，人際、社會二元極化鏡像投射與大環境角力尋求平衡' }
    ];

    const normalizeAngle = (deg: number) => {
      deg = deg % 360;
      if (deg < 0) deg += 360;
      return deg;
    };

    const formatAspectTime = (daysOffset: number): string => {
      const baseDate = new Date(`${transitDate}T${transitTime}`);
      const resultDate = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
      
      const y = resultDate.getFullYear();
      const m = String(resultDate.getMonth() + 1).padStart(2, '0');
      const d = String(resultDate.getDate()).padStart(2, '0');
      const h = String(resultDate.getHours()).padStart(2, '0');
      const min = String(resultDate.getMinutes()).padStart(2, '0');
      
      return `${y}-${m}-${d} ${h}:${min}`;
    };

    for (let i = 0; i < transitPlanets.length; i++) {
      const pA = transitPlanets[i];
      if (hideOuterPlanets && isOuterPlanetId(pA.id)) continue;
      for (let j = i + 1; j < transitPlanets.length; j++) {
        const pB = transitPlanets[j];
        if (hideOuterPlanets && isOuterPlanetId(pB.id)) continue;

        let diff = Math.abs(pA.longitude - pB.longitude);
        if (diff > 180) diff = 360 - diff;

        for (const asp of majorAspects) {
          if (Math.abs(diff - asp.angle) <= asp.orb) {
            const currentDiff = normalizeAngle(pA.longitude - pB.longitude);
            const deltaDiff1 = ((currentDiff - asp.angle + 180) % 360 + 360) % 360 - 180;
            const deltaDiff2 = ((currentDiff - (360 - asp.angle) + 180) % 360 + 360) % 360 - 180;
            const delta = Math.abs(deltaDiff1) < Math.abs(deltaDiff2) ? deltaDiff1 : deltaDiff2;

            const relSpeed = pA.speed - pB.speed;
            let ingressStr = '時間極為漫長 (天體停滯於停留區)';
            let egressStr = '時間極為漫長 (天體停滯於停留區)';

            if (Math.abs(relSpeed) >= 0.005) {
              const t1 = (-asp.orb - delta) / relSpeed;
              const t2 = (asp.orb - delta) / relSpeed;
              const t_ingress = relSpeed > 0 ? t1 : t2;
              const t_egress = relSpeed > 0 ? t2 : t1;

              ingressStr = formatAspectTime(t_ingress);
              egressStr = formatAspectTime(t_egress);
            }

            // Calculate future 3 special aspects for this pair
            const futureCandidates: { name: string; time: string; angle: number; days: number }[] = [];
            let p_speed = relSpeed;
            if (Math.abs(p_speed) < 0.001) {
              const metaA = PLANETS_METADATA.find(m => m.id === pA.id);
              const metaB = PLANETS_METADATA.find(m => m.id === pB.id);
              const speedA = metaA ? metaA.avgSpeed : 0.05;
              const speedB = metaB ? metaB.avgSpeed : 0.05;
              p_speed = speedA - speedB;
              if (Math.abs(p_speed) < 0.001) {
                p_speed = 0.05;
              }
            }
            const absSpeed = Math.abs(p_speed);
            const initialDiff = ((pA.longitude - pB.longitude) % 360 + 360) % 360;

            const targets = [
              { angle: 0, name: '合相 (0°)' },
              { angle: 60, name: '六分相 (60°)' },
              { angle: 90, name: '四分相 (90°)' },
              { angle: 120, name: '三分相 (120°)' },
              { angle: 180, name: '對分相 (180°)' },
              { angle: 240, name: '三分相 (120°)' },
              { angle: 270, name: '四分相 (90°)' },
              { angle: 300, name: '六分相 (60°)' }
            ];

            for (const tg of targets) {
              let angleToTravel = 0;
              if (p_speed > 0) {
                angleToTravel = ((tg.angle - initialDiff) % 360 + 360) % 360;
              } else {
                angleToTravel = ((initialDiff - tg.angle) % 360 + 360) % 360;
              }

              const t_first = angleToTravel / absSpeed;
              const occurrences = [t_first, t_first + 360 / absSpeed, t_first + 720 / absSpeed];
              for (const days of occurrences) {
                if (days > 0.02) {
                  futureCandidates.push({
                    name: tg.name,
                    time: formatAspectTime(days),
                    angle: tg.angle,
                    days: days
                  });
                }
              }
            }

            futureCandidates.sort((a, b) => a.days - b.days);

            const uniqueFuture: { name: string; time: string; angle: number }[] = [];
            const seenTimes = new Set<string>();
            for (const item of futureCandidates) {
              if (!seenTimes.has(item.time)) {
                seenTimes.add(item.time);
                uniqueFuture.push({ name: item.name, time: item.time, angle: item.angle });
                if (uniqueFuture.length >= 3) break;
              }
            }

            comparisons.push({
              planetA: `流年 ${pA.name}`,
              planetB: `流年 ${pB.name}`,
              type: asp.type as any,
              angle: diff,
              orb: Math.abs(diff - asp.angle),
              name: asp.name,
              harmony: asp.harmony,
              description: `流年 ${pA.name} 與流年 ${pB.name} 呈 ${asp.name} (${asp.angle}°)，說明${asp.desc}。`,
              ingressTime: ingressStr,
              egressTime: egressStr,
              futureAspects: uniqueFuture
            });
          }
        }
      }
    }
    return comparisons;
  };

  const transitNatalAspects = calculateTransitNatalAspects();
  const natalNatalAspects = natalChart.aspects.filter(a => !(hideOuterPlanets && (isOuterPlanetName(a.planetA) || isOuterPlanetName(a.planetB))));
  const transitTransitAspects = calculateTransitTransitAspects();

  // Helper calculating Fire/Earth/Air/Water elements proportions among active physical planets (Sun to Pluto, excluding Nodes)
  const getElementsProportion = (planetsList: PlanetPosition[]) => {
    const counts = { 火: 0, 土: 0, 風: 0, 水: 0 };
    const validIds = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    const targets = planetsList.filter(p => validIds.includes(p.id));
    
    targets.forEach(p => {
      const element = ZODIAC_SIGNS[p.signIndex]?.element;
      if (element && element in counts) {
        counts[element as keyof typeof counts]++;
      }
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return {
      counts,
      total,
      percentages: {
        火: total > 0 ? Math.round((counts['火'] / total) * 100) : 0,
        土: total > 0 ? Math.round((counts['土'] / total) * 100) : 0,
        風: total > 0 ? Math.round((counts['風'] / total) * 100) : 0,
        水: total > 0 ? Math.round((counts['水'] / total) * 100) : 0,
      }
    };
  };

  const natalElements = getElementsProportion(natalChart.planets);
  const transitElements = getElementsProportion(transitChart.planets);

  // Helper handles selecting from wheel click or list click
  const handlePlanetSelect = (planet: PlanetPosition, type: 'natal' | 'transit') => {
    setSelectedPlanet(planet);
    setSelectedPlanetType(type);
    setIsInterpretExpanded(true); // Automatically expand interpretation on click
  };

  return (
    <div className="bg-[#060a13] text-slate-100 flex flex-col font-sans selection:bg-[#c5a059]/20 selection:text-[#e5c583] min-h-screen">
      
      {/* 1. Header Navigation Ban - Hide during Print */}
      <header className="no-print bg-[#060a13]/90 backdrop-blur-md border-b border-[#c5a059]/25 sticky top-0 z-50 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 glass rounded-2xl border border-[#c5a059]/30 shadow-xl">
              <Compass className="w-6 h-6 text-[#c5a059] animate-[spin_24s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl serif text-[#c5a059] font-semibold tracking-widest uppercase">
                AstroLens Pro / 古銅金雙盤占卜指南
              </h1>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2.5em] text-[#e5c583]/70 font-mono">
                Professional Celestial Mapping & Analysis &bull; Antique Bronze Edition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHTML}
              disabled={isDownloadingHTML}
              className={`flex items-center space-x-2 px-4 py-2 bg-[#c5a059] text-[#060a13] hover:bg-[#b08b47] active:scale-95 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg border border-[#e5c583]/30 ${isDownloadingHTML ? 'opacity-70 cursor-not-allowed' : ''}`}
              title="一鍵直接本地下載 HTML 互動式報告規格書"
              id="export-pdf-main-btn"
            >
              {isDownloadingHTML ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#060a13]" />
              ) : (
                <Download className="w-4 h-4 text-[#060a13]" />
              )}
              <span>{isDownloadingHTML ? '在編譯下載中...' : '下載 HTML 報告書'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        
        {/* LEFT COLUMN: Controls & Input Parameters (Span 4) */}
        <section className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* Birth Chart Details inputs */}
          <div className="glass rounded-3xl p-5 shadow-xl space-y-4 border border-[#c5a059]/15">
            <div className="flex items-center space-x-2 border-b border-[#c5a059]/20 pb-3">
              <User className="w-5 h-5 text-[#c5a059]" />
              <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase tracking-widest serif">本命星盤輸入 (Birth Chart)</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <label className="block space-y-1.5 text-slate-300">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059]">位置預設 (快速填充緯經與時區)</span>
                <select
                  value={birthLocationName}
                  onChange={(e) => handleBirthPresetChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                  id="birth-location-preset-dropdown"
                >
                  <option value="">-- 手動自訂經緯度 --</option>
                  {LOCATION_PRESETS.map(p => (
                    <option key={`birth-${p.name}`} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1.5 text-slate-300">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059]">出生日期</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#c5a059]"
                      id="birth-date-input"
                    />
                  </div>
                </label>
                <label className="block space-y-1.5 text-slate-300">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059]">出生時間 (精確)</span>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#c5a059]"
                    id="birth-time-input"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-black/20 p-3 rounded-2xl border border-white/10 font-mono text-[10px]">
                <div>
                  <span className="block text-slate-550 mb-0.5 text-slate-400">經度 (East)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={birthLongitude}
                    onChange={(e) => {
                      setBirthLongitude(parseFloat(e.target.value) || 0);
                      setBirthLocationName('');
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-slate-200 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <span className="block text-slate-555 mb-0.5 text-slate-400">緯度 (North)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={birthLatitude}
                    onChange={(e) => {
                      setBirthLatitude(parseFloat(e.target.value) || 0);
                      setBirthLocationName('');
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-slate-200 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <span className="block text-slate-555 mb-0.5 text-slate-400">時區 (GMT)</span>
                  <input
                    type="number"
                    step="1"
                    value={birthTimezone}
                    onChange={(e) => {
                      setBirthTimezone(parseInt(e.target.value) || 0);
                      setBirthLocationName('');
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-slate-200 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Query Transit Inputs */}
          <div className="glass rounded-3xl p-5 shadow-xl space-y-4 border border-[#c5a059]/15">
            <div className="flex items-center space-x-2 border-b border-[#c5a059]/20 pb-3">
              <Activity className="w-5 h-5 text-[#c5a059]" />
              <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase tracking-widest serif">問事流年輸入 (Transit Chart)</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <label className="block space-y-1.5 text-slate-300">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059]">觀測流年位置選擇</span>
                <select
                  value={transitLocationName}
                  onChange={(e) => handleTransitPresetChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                  id="transit-location-preset-dropdown"
                >
                  <option value="">-- 手動自訂經緯度 --</option>
                  {LOCATION_PRESETS.map(p => (
                    <option key={`transit-${p.name}`} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1.5 text-slate-300">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059]">流年日期 (當下或未來)</span>
                  <input
                    type="date"
                    value={transitDate}
                    onChange={(e) => setTransitDate(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#c5a059]"
                    id="transit-date-input"
                  />
                </label>
                <label className="block space-y-1.5 text-slate-300">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059]">時間點</span>
                  <input
                    type="time"
                    value={transitTime}
                    onChange={(e) => setTransitTime(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#c5a059]"
                    id="transit-time-input"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-black/20 p-3 rounded-2xl border border-white/10 font-mono text-[10px]">
                <div>
                  <span className="block text-slate-500 mb-0.5">流年經度</span>
                  <input
                    type="number"
                    step="0.01"
                    value={transitLongitude}
                    onChange={(e) => {
                      setTransitLongitude(parseFloat(e.target.value) || 0);
                      setTransitLocationName('');
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-slate-200 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <span className="block text-slate-500 mb-0.5">流年緯度</span>
                  <input
                    type="number"
                    step="0.01"
                    value={transitLatitude}
                    onChange={(e) => {
                      setTransitLatitude(parseFloat(e.target.value) || 0);
                      setTransitLocationName('');
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-slate-200 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <span className="block text-slate-500 mb-0.5">流年時區</span>
                  <input
                    type="number"
                    step="1"
                    value={transitTimezone}
                    onChange={(e) => {
                      setTransitTimezone(parseInt(e.target.value) || 0);
                      setTransitLocationName('');
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-slate-200 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Horoscope Overview info */}
          <div className="glass rounded-3xl p-5 flex-1 flex flex-col justify-between border border-[#c5a059]/15">
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-[#c5a059] font-semibold mb-3 font-mono uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span>三女神生命三大守護 / Planetary Trinity</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5 hover:border-[#c5a059]/25 transition-colors">
                  <span className="block text-[9px] text-[#e5c583]/70 font-mono tracking-wider uppercase">太陽 (核心自我)</span>
                  <span className="block text-xl serif text-[#c5a059] mt-1">
                    {ZODIAC_SIGNS[natalChart.planets[0].signIndex].name.substring(0,2)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {natalChart.planets[0].degreeInSign.toFixed(1)}°
                  </span>
                </div>

                <div className="bg-black/30 p-3 rounded-2xl border border-white/5 hover:border-[#c5a059]/25 transition-colors">
                  <span className="block text-[9px] text-[#e5c583]/70 font-mono tracking-wider uppercase">月亮 (潛意識感受)</span>
                  <span className="block text-xl serif text-[#c5a059] mt-1">
                    {ZODIAC_SIGNS[natalChart.planets[1].signIndex].name.substring(0,2)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {natalChart.planets[1].degreeInSign.toFixed(1)}°
                  </span>
                </div>

                <div className="bg-black/30 p-3 rounded-2xl border border-white/5 hover:border-[#c5a059]/25 transition-colors">
                  <span className="block text-[9px] text-[#e5c583]/70 font-mono tracking-wider uppercase">上升 (性格面具)</span>
                  <span className="block text-xl serif text-slate-100 font-extrabold mt-1">
                    {ZODIAC_SIGNS[Math.floor(natalChart.ascendant / 30)].name.substring(0,2)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {(natalChart.ascendant % 30).toFixed(1)}°
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#c5a059]/20 text-[11px] text-slate-400 flex items-start space-x-2">
              <Info className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span className="italic leading-normal">
                Equal House 系統由上升點 ASC 作為第一宮起始點，依次每 30° 順時針推衍算一宮位。具有極佳的高緯度計算穩定性。
              </span>
            </div>
          </div>

          {/* 四元素比例比例卡片 / Four Elements Card */}
          <div className="glass rounded-3xl p-5 border border-[#c5a059]/15 space-y-4 hover:border-[#c5a059]/30 transition-all">
            <div className="flex items-center space-x-1.5 text-xs text-[#c5a059] font-bold font-mono uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#c5a059] animate-[spin_12s_linear_infinite]" />
              <span>四元素比例分析 / Element Proportions</span>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
              統計本命盤與流年盤的 10 大天體行星主要落入四大星座元素（火、土、風、水象星座）的分布比。這直接揭示了性格原動力分佈與當下流年能量背景的對比平衡：
            </p>

            <div className="space-y-3">
              {[
                { key: '火', icon: '🔥', label: '火象元素 (Fire) - 行動力', color: 'from-orange-500 to-amber-500', textColor: 'text-orange-400', desc: '牡羊/獅子/射手 ── 象徵生命的熱情、創造力、意志與直覺信念' },
                { key: '土', icon: '🌱', label: '土象元素 (Earth) - 實踐力', color: 'from-emerald-500 to-teal-500', textColor: 'text-emerald-400', desc: '金牛/處女/摩羯 ── 象徵實際的穩定、物質基礎、身心顯化與具體成果' },
                { key: '風', icon: '💨', label: '風象元素 (Air) - 理智力', color: 'from-sky-400 to-indigo-400', textColor: 'text-[#96c1ff]', desc: '雙子/天秤/水瓶 ── 象徵思維智性、溝通傳播、客觀社交與概念網絡' },
                { key: '水', icon: '💧', label: '水象元素 (Water) - 感受力', color: 'from-blue-500 to-purple-500', textColor: 'text-blue-400', desc: '巨蟹/天蠍/雙魚 ── 象徵細膩的情感、深層直覺、心靈共情與潛意識底蘊' }
              ].map((item) => {
                const natalPct = natalElements.percentages[item.key as '火' | '土' | '風' | '水'] || 0;
                const transitPct = transitElements.percentages[item.key as '火' | '土' | '風' | '水'] || 0;
                const natalCount = natalElements.counts[item.key as '火' | '土' | '風' | '水'] || 0;
                const transitCount = transitElements.counts[item.key as '火' | '土' | '風' | '水'] || 0;

                return (
                  <div key={`el-prop-${item.key}`} className="bg-black/30 p-3 rounded-2xl border border-white/5 space-y-2 hover:bg-black/50 transition-all">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold flex items-center space-x-1">
                        <span className="text-[12px]">{item.icon}</span>
                        <span className={item.textColor}>{item.label}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        本命: <strong className="text-slate-200">{natalPct}%</strong> <span className="text-slate-500">({natalCount}星)</span> | 
                        流年: <strong className="text-slate-200">{transitPct}%</strong> <span className="text-slate-500">({transitCount}星)</span>
                      </span>
                    </div>

                    {/* Progress Bar comparison */}
                    <div className="space-y-1.5 text-[9px] font-mono text-slate-450">
                      {/* Natal bar */}
                      <div className="flex items-center space-x-1.5">
                        <span className="w-8 shrink-0 text-slate-400 font-sans">本命</span>
                        <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r ${item.color} h-full transition-all duration-1000`}
                            style={{ width: `${natalPct}%` }}
                          />
                        </div>
                      </div>
                      {/* Transit bar */}
                      <div className="flex items-center space-x-1.5">
                        <span className="w-8 shrink-0 text-slate-400 font-sans">流年</span>
                        <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r from-amber-600/60 to-yellow-500/60 h-full transition-all duration-1000`}
                            style={{ width: `${transitPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed pt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* MIDDLE COLUMN: SVG Chart & Hover Interactive Cards (Span 5) */}
        <section className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Dynamic Filter Controls above search wheel */}
          <div className="flex justify-between items-center w-full px-4 py-2.5 bg-black/40 border border-[#c5a059]/20 rounded-2xl text-xs shadow-inner">
            <span className="text-[#c5a059] font-medium font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" />
              天象星鏡 / Control Panel
            </span>
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideOuterPlanets}
                onChange={(e) => setHideOuterPlanets(e.target.checked)}
                className="rounded bg-black border-[#c5a059]/40 text-[#c5a059] focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-200 text-[11px] font-bold hover:text-[#c5a059] transition-colors">
                隱藏三王星 (天王、海王、冥王)
              </span>
            </label>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-3 rounded-3xl border border-[#c5a059]/15 bg-black/10">
            {/* The main SVG Interactive double astrology circle chart */}
            <AstrologyWheel
              natalChart={natalChart}
              transitChart={transitChart}
              onHoverPlanet={(planet, type) => {
                setHoveredPlanet(planet);
                setHoveredPlanetType(type);
                if (planet) {
                  // Previews on hover, doesn't force overwrite persistent lock unless clicked
                }
              }}
              onHoverHouse={setHoveredHouse}
              onSelectPlanet={handlePlanetSelect}
              hideOuterPlanets={hideOuterPlanets}
            />
          </div>

          {/* Mini Realtime Hover & Persistent Details display for fast accessibility */}
          <div className="glass rounded-3xl p-5 shadow-xl min-h-[140px] flex flex-col justify-center border border-[#c5a059]/15">
            {hoveredPlanet ? (
              <div className="animate-fade-in space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl text-[#c5a059] font-serif">
                      {hoveredPlanet.symbol}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 font-sans">
                        {hoveredPlanetType === 'natal' ? '本命本體' : '流年天象'} • {hoveredPlanet.name} (即時預覽)
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        落入 {ZODIAC_SIGNS[hoveredPlanet.signIndex].name} {hoveredPlanet.degreeInSign.toFixed(2)}° | 落本命第 {hoveredPlanet.house} 宮
                      </p>
                    </div>
                  </div>
                  
                  {/* Transit Prediction Indicator */}
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 bg-black/40 border border-white/10 rounded-full font-mono text-[9px] text-[#c5a059] font-semibold">
                      {formatTimeRange(hoveredPlanet.daysToNextHouse)}
                    </span>
                    <span className="block text-[8px] text-slate-500 mt-1">下一宮位移動預測</span>
                  </div>
                </div>

                {/* Cosmic Meanings: Planet Essence & Zodiac Essence */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-white/[0.03] p-2 rounded-xl border border-white/5">
                    <span className="text-amber-300 font-bold block mb-0.5">🪐 {hoveredPlanet.name}象徵：</span>
                    <p className="text-slate-300 leading-relaxed font-sans">{PLANET_CORE_MEANINGS[hoveredPlanet.name] || '此天體主導能量意志與內在特質推演。'}</p>
                  </div>
                  <div className="bg-white/[0.03] p-2 rounded-xl border border-white/5">
                    <span className="text-amber-300 font-bold block mb-0.5">🌟 {ZODIAC_SIGNS[hoveredPlanet.signIndex].name}特質：</span>
                    <p className="text-slate-300 leading-relaxed font-sans">{ZODIAC_CORE_MEANINGS[ZODIAC_SIGNS[hoveredPlanet.signIndex].name] || '該星座為該能量帶來特異之色彩與行動風格。'}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-black/35 p-3 rounded-2xl border border-white/5 leading-relaxed">
                  {hoveredPlanetType === 'natal' 
                    ? getPlanetSignInterpretation(hoveredPlanet.name, ZODIAC_SIGNS[hoveredPlanet.signIndex].name)
                    : `當前流年的 ${hoveredPlanet.name} 此刻正好正橫越你的本命第 ${hoveredPlanet.house} 宮。${HOUSE_DETAILS_MAP[hoveredPlanet.house] || ''}將在此流年週期中受其波幅震盪。`
                  }
                </p>
              </div>
            ) : selectedPlanet ? (
              <div className="animate-fade-in space-y-3 text-xs w-full">
                <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl text-[#c5a059] font-serif">
                      {selectedPlanet.symbol}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#c5a059] font-sans">
                        已鎖定檢視 • {selectedPlanetType === 'natal' ? '本命' : '流年'}{selectedPlanet.name}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-mono">
                        位在 {ZODIAC_SIGNS[selectedPlanet.signIndex].name} {selectedPlanet.degreeInSign.toFixed(2)}° — 本命第 {selectedPlanet.house} 宮
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                      已自動展開
                    </span>
                  </div>
                </div>

                {/* Cosmic Meanings: Planet Essence & Zodiac Essence */}
                <div className="grid grid-cols-2 gap-2 text-[10px] pb-2 border-b border-white/5">
                  <div className="bg-white/[0.03] p-1.5 rounded-xl border border-white/5">
                    <span className="text-amber-300 font-bold block mb-0.5">🪐 {selectedPlanet.name}象徵：</span>
                    <p className="text-slate-300 leading-normal font-sans">{PLANET_CORE_MEANINGS[selectedPlanet.name] || '此天體主導能量意志與內在特質推演。'}</p>
                  </div>
                  <div className="bg-white/[0.03] p-1.5 rounded-xl border border-white/5">
                    <span className="text-amber-300 font-bold block mb-0.5">🌟 {ZODIAC_SIGNS[selectedPlanet.signIndex].name}特質：</span>
                    <p className="text-slate-300 leading-normal font-sans">{ZODIAC_CORE_MEANINGS[ZODIAC_SIGNS[selectedPlanet.signIndex].name] || '該星座為該能量帶來特異之色彩與行動風格。'}</p>
                  </div>
                </div>

                {/* Custom Tabs inside Selected Planet */}
                <div className="flex border-b border-white/10 text-[10px] bg-black/20 rounded-md p-0.5">
                  <button
                    onClick={() => setPlanetDetailTab('interpret')}
                    className={`flex-1 py-1 text-center font-bold tracking-wider cursor-pointer transition-all rounded ${
                      planetDetailTab === 'interpret'
                        ? 'text-[#e5c583] bg-[#c5a059]/15'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🪐 落位星象解析
                  </button>
                  <button
                    onClick={() => setPlanetDetailTab('future')}
                    className={`flex-1 py-1 text-center font-bold tracking-wider cursor-pointer transition-all rounded ${
                      planetDetailTab === 'future'
                        ? 'text-[#e5c583] bg-[#c5a059]/15'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🔮 未來一輪軌跡預測
                  </button>
                </div>

                {planetDetailTab === 'interpret' ? (
                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-wider text-[#e5c583] font-mono mb-0.5">【星體落入星座特徵】</span>
                      <p className="text-slate-300 leading-relaxed font-sans font-xs">
                        {getPlanetSignInterpretation(selectedPlanet.name, ZODIAC_SIGNS[selectedPlanet.signIndex].name)}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="block text-[9px] uppercase font-bold tracking-wider text-[#e5c583] font-mono mb-0.5">【宮位生活領域解析】</span>
                      <p className="text-slate-300 leading-relaxed font-sans font-xs">
                        {getPlanetHouseInterpretation(selectedPlanet.name, selectedPlanet.house)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-[160px] overflow-y-auto pr-1 space-y-3 px-0.5">
                    {/* Signs Timepoints */}
                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-wider text-[#e5c583] font-mono mb-1.5 flex items-center gap-1">
                        🌟 橫越黃道十二星座預期（未來一輪）：
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
                        {getPlanetFutureCycles(selectedPlanet).signTimes.map((st, idx) => (
                          <div key={`sel-fut-sign-${idx}`} className="bg-white/[0.02] border border-white/5 rounded-lg p-1.5 flex items-center justify-between gap-1 hover:border-[#c5a059]/20 transition-all font-mono">
                            <span className="text-slate-200 font-sans flex items-center gap-1 shrink-0">
                              <span className="text-amber-400 text-xs">{st.signSymbol}</span>
                              <strong className="text-slate-350">{st.signName}</strong>
                            </span>
                            <span className="text-[8px] text-[#e2ca9c] text-right truncate" title={st.formattedTime}>
                              {st.days < 0.02 ? '當前所落星座' : st.formattedTime.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Houses Timepoints */}
                    <div className="pt-2 border-t border-white/5">
                      <span className="block text-[9px] uppercase font-bold tracking-wider text-[#e5c583] font-mono mb-1.5 flex items-center gap-1">
                        🏡 進入本命十二宮位預期（未來一輪）：
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
                        {getPlanetFutureCycles(selectedPlanet).houseTimes.map((ht, idx) => (
                          <div key={`sel-fut-house-${idx}`} className="bg-white/[0.02] border border-white/5 rounded-lg p-1.5 flex items-center justify-between gap-1 hover:border-[#c5a059]/20 transition-all font-mono">
                            <span className="text-slate-200 font-sans flex items-center gap-1 shrink-0">
                              <span className="text-[#c5a059] font-bold text-[9px]">H{ht.houseNum}</span>
                              <strong className="text-slate-350">{ht.houseName.replace('宮', '')}</strong>
                            </span>
                            <span className="text-[8px] text-[#e2ca9c] text-right truncate" title={ht.formattedTime}>
                              {ht.days < 0.02 ? '當前所落宮位' : ht.formattedTime.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : hoveredHouse ? (
              <div className="animate-fade-in space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#c5a059]/10 border border-[#c5a059] flex items-center justify-center font-mono text-sm font-bold text-[#c5a059]">
                      {hoveredHouse.number}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 font-sans">{hoveredHouse.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">
                        宮位起點: {ZODIAC_SIGNS[hoveredHouse.signIndex].name} {hoveredHouse.degreeInSign.toFixed(1)}° Cusp
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-black/40 text-slate-400 rounded text-[9px] font-mono border border-white/10">
                    House Section
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-black/35 p-3 rounded-2xl border border-white/5 leading-relaxed">
                  <strong>此宮主導：</strong> {hoveredHouse.meaning}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2 text-center text-slate-400 space-y-1">
                <Workflow className="w-6 h-6 text-[#c5a059]/40 animate-pulse" />
                <p className="text-xs font-bold text-[#c5a059]">
                  滑鼠單擊【星盤內行星圖示】以鎖定各星曜宮位詳解
                </p>
                <p className="text-[10px] text-[#e5c583]/70 font-mono">
                  移動游標可暫時快速停靠預覽天象細部數值與各宮主导含义
                </p>
              </div>
            )}
          </div>

        </section>

        {/* RIGHT COLUMN: Tarot Timeline Spread (Span 3) */}
        <section className="lg:col-span-3 space-y-6 flex flex-col">
          
          <div className="glass rounded-3xl p-5 shadow-xl flex-1 flex flex-col space-y-4 border border-[#c5a059]/15">
            <div className="flex justify-between items-center border-b border-[#c5a059]/20 pb-2.5">
              <span className="text-xs font-bold tracking-wider font-mono uppercase text-[#c5a059] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                🔮 塔羅時間軸牌陣 / Tarot Timeline
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal font-sans">
              結合流年與本命天宮雙盤，占卜師可藉由「過去、現在、未來」三維時間軸，自由點選對應的大/小阿爾克納牌與正逆位，探尋宏觀的時間因果軌跡：
            </p>

            <div className="space-y-4 flex-1 overflow-y-auto max-h-[580px] pr-1 scrollbar-thin">
              
              {/* Slot 1: PAST */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#c5a059] font-mono">❶ 過去 (Past Path)</span>
                  <label className="flex items-center space-x-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={pastReversed}
                      onChange={(e) => setPastReversed(e.target.checked)}
                      className="rounded bg-black border-[#c5a059]/40 text-[#c5a059] focus:ring-0 focus:ring-offset-0 focus:outline-none w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 font-bold hover:text-[#c5a059] transition-colors">
                      逆位 (Reversed)
                    </span>
                  </label>
                </div>

                <select
                  value={pastCardId}
                  onChange={(e) => setPastCardId(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-250 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <optgroup label="大阿爾克納 (Major Arcana)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'major').map(c => (
                      <option key={`p-maj-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="權杖牌組 (Suit of Wands - 火)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'wands').map(c => (
                      <option key={`p-wnd-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="聖杯牌組 (Suit of Cups - 水)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'cups').map(c => (
                      <option key={`p-cup-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="寶劍牌組 (Suit of Swords - 風)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'swords').map(c => (
                      <option key={`p-swd-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="星幣牌組 (Suit of Pentacles - 土)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'pentacles').map(c => (
                      <option key={`p-pen-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>

                {(() => {
                  const card = getTarotCardById(pastCardId);
                  if (!card) return null;
                  return (
                    <div className="bg-black/30 p-2.5 rounded-xl border border-[#c5a059]/10 space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center text-[10px] pb-1 border-b border-white/5">
                        <span className="font-bold text-slate-200">{card.name}</span>
                        <span className={`font-mono px-1.5 py-0.5 rounded text-[8px] font-bold ${pastReversed ? 'bg-red-500/15 text-red-400' : 'bg-[#c5a059]/15 text-[#e5c583]'}`}>
                          {pastReversed ? '▼ 逆位' : '▲ 正位'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[8px]">
                        {(pastReversed ? card.reversedKeywords : card.uprightKeywords).map((k, idx) => (
                          <span key={`p-k-${idx}`} className="bg-white/5 text-slate-400 px-1 py-0.5 rounded">
                            #{k}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-300 italic text-[10px] leading-relaxed">
                        {pastReversed ? card.pastInterpretation.reversed : card.pastInterpretation.upright}
                      </p>
                      {renderTarotAstrologyConnection(pastCardId, false)}
                    </div>
                  );
                })()}
              </div>

              {/* Slot 2: PRESENT */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#c5a059] font-mono">❷ 現在 (Present Scene)</span>
                  <label className="flex items-center space-x-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={presentReversed}
                      onChange={(e) => setPresentReversed(e.target.checked)}
                      className="rounded bg-black border-[#c5a059]/40 text-[#c5a059] focus:ring-0 focus:ring-offset-0 focus:outline-none w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 font-bold hover:text-[#c5a059] transition-colors">
                      逆位 (Reversed)
                    </span>
                  </label>
                </div>

                <select
                  value={presentCardId}
                  onChange={(e) => setPresentCardId(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-250 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <optgroup label="大阿爾克納 (Major Arcana)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'major').map(c => (
                      <option key={`pr-maj-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="權杖牌組 (Suit of Wands - 火)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'wands').map(c => (
                      <option key={`pr-wnd-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="聖杯牌組 (Suit of Cups - 水)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'cups').map(c => (
                      <option key={`pr-cup-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="寶劍牌組 (Suit of Swords - 風)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'swords').map(c => (
                      <option key={`pr-swd-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="星幣牌組 (Suit of Pentacles - 土)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'pentacles').map(c => (
                      <option key={`pr-pen-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>

                {(() => {
                  const card = getTarotCardById(presentCardId);
                  if (!card) return null;
                  return (
                    <div className="bg-black/30 p-2.5 rounded-xl border border-[#c5a059]/10 space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center text-[10px] pb-1 border-b border-white/5">
                        <span className="font-bold text-slate-200">{card.name}</span>
                        <span className={`font-mono px-1.5 py-0.5 rounded text-[8px] font-bold ${presentReversed ? 'bg-red-500/15 text-red-400' : 'bg-[#c5a059]/15 text-[#e5c583]'}`}>
                          {presentReversed ? '▼ 逆位' : '▲ 正位'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[8px]">
                        {(presentReversed ? card.reversedKeywords : card.uprightKeywords).map((k, idx) => (
                          <span key={`pr-k-${idx}`} className="bg-white/5 text-slate-400 px-1 py-0.5 rounded">
                            #{k}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-300 italic text-[10px] leading-relaxed">
                        {presentReversed ? card.presentInterpretation.reversed : card.presentInterpretation.upright}
                      </p>
                      {renderTarotAstrologyConnection(presentCardId, false)}
                    </div>
                  );
                })()}
              </div>

              {/* Slot 3: FUTURE */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#c5a059] font-mono">❸ 未來 (Future Sight)</span>
                  <label className="flex items-center space-x-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={futureReversed}
                      onChange={(e) => setFutureReversed(e.target.checked)}
                      className="rounded bg-black border-[#c5a059]/40 text-[#c5a059] focus:ring-0 focus:ring-offset-0 focus:outline-none w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 font-bold hover:text-[#c5a059] transition-colors">
                      逆位 (Reversed)
                    </span>
                  </label>
                </div>

                <select
                  value={futureCardId}
                  onChange={(e) => setFutureCardId(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-250 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <optgroup label="大阿爾克納 (Major Arcana)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'major').map(c => (
                      <option key={`f-maj-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="權杖牌組 (Suit of Wands - 火)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'wands').map(c => (
                      <option key={`f-wnd-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="聖杯牌組 (Suit of Cups - 水)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'cups').map(c => (
                      <option key={`f-cup-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="寶劍牌組 (Suit of Swords - 風)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'swords').map(c => (
                      <option key={`f-swd-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="星幣牌組 (Suit of Pentacles - 土)">
                    {ALL_TAROT_CARDS.filter(c => c.category === 'pentacles').map(c => (
                      <option key={`f-pen-${c.id}`} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>

                {(() => {
                  const card = getTarotCardById(futureCardId);
                  if (!card) return null;
                  return (
                    <div className="bg-black/30 p-2.5 rounded-xl border border-[#c5a059]/10 space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center text-[10px] pb-1 border-b border-white/5">
                        <span className="font-bold text-slate-200">{card.name}</span>
                        <span className={`font-mono px-1.5 py-0.5 rounded text-[8px] font-bold ${futureReversed ? 'bg-red-500/15 text-red-400' : 'bg-[#c5a059]/15 text-[#e5c583]'}`}>
                          {futureReversed ? '▼ 逆位' : '▲ 正位'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[8px]">
                        {(futureReversed ? card.reversedKeywords : card.uprightKeywords).map((k, idx) => (
                          <span key={`f-k-${idx}`} className="bg-white/5 text-slate-400 px-1 py-0.5 rounded">
                            #{k}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-300 italic text-[10px] leading-relaxed">
                        {futureReversed ? card.futureInterpretation.reversed : card.futureInterpretation.upright}
                      </p>
                      {renderTarotAstrologyConnection(futureCardId, false)}
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>

        </section>

      </main>

      {/* =========================================================================
                     NEW SECTION: 12 HOUSES PLANET MAPPING & CRITICAL ASPECTS
          ========================================================================= */}
      <section className="no-print max-w-7xl w-full mx-auto p-4 lg:p-6 space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Block: 12 Houses Planet List (Planets in Houses Grid) - Span 8 */}
          <div className="lg:col-span-8 glass rounded-3xl p-6 border border-[#c5a059]/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3.5">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-[#c5a059]" />
                <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase tracking-widest serif">
                  雙盤十二宮位星體落位指南 / 12 Houses Planet Distribution
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#e5c583] bg-[#c5a059]/10 px-2.5 py-0.5 rounded-full border border-[#c5a059]/20">
                Equal House Method
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-2xl leading-normal">
              下方揭示本命誕辰盤（🔘 內圈）及問事相應流年盤（🪐 外圈）在各宮位內之占星星體配屬。這能協助占卜師快速定位生活領域之核心驅力與當下流年能量匯入點：
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {natalChart.houses.map((house) => {
                const natalPlanetsInHouse = filteredNatalPlanets.filter(p => p.house === house.number);
                const transitPlanetsInHouse = filteredTransitPlanets.filter(p => p.house === house.number);

                return (
                  <div
                    key={`mapping-house-${house.number}`}
                    className="bg-black/40 border border-white/5 rounded-2xl p-4 hover:border-[#c5a059]/30 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start border-b border-white/5 pb-2 mb-2.5">
                        <div>
                          <span className="font-mono text-xs font-extrabold text-[#c5a059]">
                            {String(house.number).padStart(2, '0')} Cusp
                          </span>
                          <h4 className="text-xs font-bold text-slate-200">{house.name}</h4>
                        </div>
                        <span className="text-[9px] text-[#e5c583] font-mono bg-[#c5a059]/5 px-1.5 py-0.5 rounded border border-[#c5a059]/10">
                          {ZODIAC_SIGNS[house.signIndex].name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-3 italic leading-normal">
                        {house.meaning}
                      </p>
                    </div>

                    <div className="space-y-2 text-[11px] bg-black/20 p-2.5 rounded-xl border border-white/5">
                      {/* Natal Residing */}
                      <div className="flex items-start justify-between">
                        <span className="text-slate-500 font-bold shrink-0 mr-2 uppercase text-[9px] tracking-wider">🔘 本命落位:</span>
                        <div className="text-right flex flex-wrap gap-1 justify-end">
                          {natalPlanetsInHouse.length > 0 ? (
                            natalPlanetsInHouse.map(p => (
                              <span
                                key={`map-natal-${p.id}`}
                                onClick={() => handlePlanetSelect(p, 'natal')}
                                className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded text-[#e5c583] cursor-pointer hover:bg-[#c5a059]/20"
                                title={`${p.name}落入${ZODIAC_SIGNS[p.signIndex].name}`}
                              >
                                <span className="font-serif text-xs">{p.symbol}</span>
                                <span>{p.name.substring(0, 2)}</span>
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-600 italic">空宮</span>
                          )}
                        </div>
                      </div>

                      {/* Transit Residing */}
                      <div className="flex items-start justify-between pt-1 border-t border-white/5">
                        <span className="text-slate-500 font-bold shrink-0 mr-2 uppercase text-[9px] tracking-wider">🪐 流年客居:</span>
                        <div className="text-right flex flex-wrap gap-1 justify-end">
                          {transitPlanetsInHouse.length > 0 ? (
                            transitPlanetsInHouse.map(p => {
                              const hasEnteredAnotherSign = p.signIndex !== house.signIndex;
                              const signName = ZODIAC_SIGNS[p.signIndex].name;
                              return (
                                <span
                                  key={`map-transit-${p.id}`}
                                  onClick={() => handlePlanetSelect(p, 'transit')}
                                  className={`inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded text-amber-200 cursor-pointer text-[10px] ${
                                    hasEnteredAnotherSign 
                                      ? 'bg-amber-500/20 border border-amber-500/50' 
                                      : 'bg-[#e5c583]/10 border border-amber-500/30 hover:bg-amber-500/10'
                                  }`}
                                  title={`${p.name}正在此流年行宮過宮${hasEnteredAnotherSign ? `，但已走入：${signName}` : ''}`}
                                >
                                  <span className="font-serif text-xs">{p.symbol}</span>
                                  <span>{p.name.substring(0, 2)}</span>
                                  {hasEnteredAnotherSign && (
                                    <span className="text-[7px] text-[#e5c583] bg-amber-500/20 px-0.5 py-0 rounded border border-amber-500/40 ml-0.5">
                                      {signName.substring(0, 2)}
                                    </span>
                                  )}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-slate-600 italic">空宮</span>
                          )}
                        </div>
                      </div>

                      {/* House Ingress / Egress Times */}
                      {transitPlanetsInHouse.length > 0 && (
                        <div className="pt-1.5 border-t border-white/5 space-y-1">
                          <span className="text-slate-500 font-bold block uppercase text-[8px] tracking-wider">⏱️ 流年進入/離開時刻:</span>
                          <div className="space-y-1">
                            {transitPlanetsInHouse.map(p => {
                              const times = calculateHouseTransitTimes(p, house.number);
                              return (
                                <div key={`house-time-${house.number}-${p.id}`} className="bg-white/[0.02] border border-white/5 p-1 rounded-lg text-[8.5px] font-mono leading-tight space-y-0.5">
                                  <div className="flex justify-between text-slate-300 font-sans">
                                    <span className="font-bold inline-flex items-center">
                                      {p.symbol} {p.name}{p.isRetrograde ? ' (逆)' : ''}
                                      {p.signIndex !== house.signIndex && (
                                        <span className="ml-1 text-[7.5px] text-amber-300 bg-amber-500/10 px-1 py-0 rounded border border-amber-500/20">
                                          已入{ZODIAC_SIGNS[p.signIndex].name}
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-[7.5px] text-[#e5c583]">{Math.abs(p.speed).toFixed(2)}°/天</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-1.5 text-slate-400">
                                    <span className="truncate">🟢 入: <strong className="text-[#e2ca9c]">{times.ingress}</strong></span>
                                    <span className="truncate">🔴 出: <strong className="text-[#e2ca9c]">{times.egress}</strong></span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Crucial inter-aspect angles - Span 4 */}
          <div className="lg:col-span-4 glass rounded-3xl p-6 border border-[#c5a059]/20 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#c5a059]/20 pb-3.5">
              <AlertTriangle className="w-5 h-5 text-[#c5a059]" />
              <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase tracking-widest serif">
                星體相位報告 / Planetary Aspect Reports
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex border border-white/10 text-[10.5px] bg-black/35 rounded-xl p-1 gap-1">
              <button
                onClick={() => setActiveAspectTab('double')}
                className={`flex-1 py-1.5 text-center font-bold tracking-wider cursor-pointer transition-all rounded-lg ${
                  activeAspectTab === 'double'
                    ? 'text-[#e5c583] bg-[#c5a059]/15 shadow border border-[#c5a059]/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🌌 雙盤交會
              </button>
              <button
                onClick={() => setActiveAspectTab('natal')}
                className={`flex-1 py-1.5 text-center font-bold tracking-wider cursor-pointer transition-all rounded-lg ${
                  activeAspectTab === 'natal'
                    ? 'text-[#e5c583] bg-[#c5a059]/15 shadow border border-[#c5a059]/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🏡 本命內在
              </button>
              <button
                onClick={() => setActiveAspectTab('transit')}
                className={`flex-1 py-1.5 text-center font-bold tracking-wider cursor-pointer transition-all rounded-lg ${
                  activeAspectTab === 'transit'
                    ? 'text-[#e5c583] bg-[#c5a059]/15 shadow border border-[#c5a059]/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🪐 流年天象
              </button>
            </div>

            {activeAspectTab === 'double' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-slate-400 leading-normal">
                  列出此刻流年星體與您本命星體之間正形成的<strong>強烈相位（角度）</strong>。這象徵外界宇宙氣場對您本命潛能與生活產生的直接共振：
                </p>

                {/* Planet Multi-select Buttons */}
                <div className="space-y-2.5 p-3.5 bg-black/35 rounded-2xl border border-white/5 text-[11px] no-print">
                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 text-[10px]">🪐 流年天體高亮與優先 (多選)</span>
                    <div className="flex flex-wrap gap-1.5 font-mono">
                      {filteredTransitPlanets.map(p => {
                        const isSelected = selectedTransitPlanetIds.includes(p.id);
                        return (
                          <button
                            key={`sel-tr-${p.id}`}
                            onClick={() => {
                              setSelectedTransitPlanetIds(prev =>
                                prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]
                              );
                            }}
                            className={`px-2 py-1 rounded text-[10px] transition-all flex items-center space-x-1 border cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e5c583] font-bold shadow'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <span className="font-serif">{p.symbol}</span>
                            <span>{p.name.substring(0, 2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 text-[10px]">🏡 本命天體高亮與優先 (多選)</span>
                    <div className="flex flex-wrap gap-1.5 font-mono">
                      {filteredNatalPlanets.map(p => {
                        const isSelected = selectedNatalPlanetIds.includes(p.id);
                        return (
                          <button
                            key={`sel-na-${p.id}`}
                            onClick={() => {
                              setSelectedNatalPlanetIds(prev =>
                                prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]
                              );
                            }}
                            className={`px-2 py-1 rounded text-[10px] transition-all flex items-center space-x-1 border cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e5c583] font-bold shadow'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <span className="font-serif">{p.symbol}</span>
                            <span>{p.name.substring(0, 2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-500 italic mt-1 leading-snug">
                    * 點擊上述按鈕進行多選/反選。勾選星體將在下方報告中以<strong>古銅金黃色</strong>高亮，並排序最優先顯示。
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[390px] pr-1.5">
                  {(() => {
                    const sortedAspects = [...transitNatalAspects].sort((a, b) => {
                      const isPlanetASelected = selectedTransitPlanetIds.some(id => {
                        const p = filteredTransitPlanets.find(x => x.id === id);
                        return p && a.planetA.includes(p.name);
                      });
                      const isPlanetBSelected = selectedNatalPlanetIds.some(id => {
                        const p = filteredNatalPlanets.find(x => x.id === id);
                        return p && a.planetB.includes(p.name);
                      });

                      const isPlanetASelectedB = selectedTransitPlanetIds.some(id => {
                        const p = filteredTransitPlanets.find(x => x.id === id);
                        return p && b.planetA.includes(p.name);
                      });
                      const isPlanetBSelectedB = selectedNatalPlanetIds.some(id => {
                        const p = filteredNatalPlanets.find(x => x.id === id);
                        return p && b.planetB.includes(p.name);
                      });

                      const getPriority = (isTransitSelected: boolean, isNatalSelected: boolean) => {
                        if (isTransitSelected && isNatalSelected) return 1;
                        if (isTransitSelected && !isNatalSelected) return 2;
                        if (!isTransitSelected && isNatalSelected) return 3;
                        return 4;
                      };

                      const prioA = getPriority(isPlanetASelected, isPlanetBSelected);
                      const prioB = getPriority(isPlanetASelectedB, isPlanetBSelectedB);

                      return prioA - prioB;
                    });

                    if (sortedAspects.length === 0) {
                      return (
                        <div className="h-[120px] flex flex-col justify-center items-center text-center text-slate-500 italic text-xs">
                          <p>當下暫無顯著合相與沖刑，天象安和無兆。</p>
                        </div>
                      );
                    }

                    // Construct a list of names to highlight in text
                    const highlightNames: string[] = [];
                    selectedTransitPlanetIds.forEach(id => {
                      const p = filteredTransitPlanets.find(x => x.id === id);
                      if (p) {
                        highlightNames.push(`流年 ${p.name}`);
                        highlightNames.push(p.name);
                      }
                    });
                    selectedNatalPlanetIds.forEach(id => {
                      const p = filteredNatalPlanets.find(x => x.id === id);
                      if (p) {
                        highlightNames.push(`本命 ${p.name}`);
                        highlightNames.push(p.name);
                      }
                    });

                    return sortedAspects.map((aspect, index) => {
                      let badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-400';
                      let badgeTitle = '🌀 交匯相位';
                      if (aspect.harmony === 'positive') {
                        badgeBg = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                        badgeTitle = '🍀 順流相 (吉)';
                      } else if (aspect.harmony === 'challenging') {
                        badgeBg = 'bg-red-500/10 border-red-500/20 text-red-400';
                        badgeTitle = '⚠️ 考驗相 (凶)';
                      }

                      return (
                        <div
                          key={`transit-natal-asp-${index}`}
                          className="p-3 bg-black/45 border border-white/5 rounded-2xl flex flex-col space-y-2 hover:border-[#c5a059]/20 transition-all shadow-inner"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-200 font-mono">
                              {highlightText(aspect.planetA, highlightNames)} ✖ {highlightText(aspect.planetB, highlightNames)}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${badgeBg} whitespace-nowrap`}>
                              {badgeTitle} • {aspect.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                            {highlightText(aspect.description, highlightNames)} (精算相差: {aspect.orb.toFixed(2)}°)
                          </p>
                          <div className="flex flex-col sm:flex-row justify-between text-[9px] text-slate-400 font-mono pt-1.5 border-t border-white/5 gap-1">
                            {aspect.ingressTime && (
                              <span className="flex items-center gap-1">🟢 進入相位：<strong className="text-[#e2ca9c]">{aspect.ingressTime}</strong></span>
                            )}
                            {aspect.egressTime && (
                              <span className="flex items-center gap-1">🔴 離開相位：<strong className="text-[#e2ca9c]">{aspect.egressTime}</strong></span>
                            )}
                          </div>
                          {aspect.futureAspects && aspect.futureAspects.length > 0 && (
                            <div className="pt-2 border-t border-white/5 space-y-1">
                              <span className="block text-[8px] font-bold text-[#e5c583]/80 uppercase tracking-wider">🌟 該配對未來三次特殊交會預測：</span>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 w-full text-[8.5px] font-mono text-slate-350">
                                {aspect.futureAspects.map((fut, fIdx) => (
                                  <div key={`fut-asp-${index}-${fIdx}`} className="bg-white/[0.02] border border-white/5 rounded-lg p-1.5 flex flex-col justify-between hover:border-[#c5a059]/25 transition-all">
                                    <span className="font-bold text-[#e2ca9c]">{fut.name}</span>
                                    <span className="text-slate-400 mt-0.5 text-[8px]">{fut.time}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {activeAspectTab === 'natal' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-slate-400 leading-normal">
                  列出您<strong>本命星盤內部（Natal Chart）</strong>天體之間形成的相位。這象徵您先天性格中不同力量的交織融合、天賦資源或內在心理張力摩擦：
                </p>

                {/* Planet Multi-select/Highlight for Natal */}
                <div className="space-y-2.5 p-3.5 bg-black/35 rounded-2xl border border-white/5 text-[11px] no-print">
                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 text-[10px]">🏡 本命天體過濾與優先級 (多選)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {filteredNatalPlanets.map(p => {
                        const isSelected = selectedNatalPlanetIds.includes(p.id);
                        return (
                          <button
                            key={`natal-sel-${p.id}`}
                            onClick={() => {
                              setSelectedNatalPlanetIds(prev =>
                                prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]
                              );
                            }}
                            className={`px-2 py-1 rounded text-[10px] transition-all flex items-center space-x-1 border cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e5c583] font-bold shadow'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <span className="font-serif">{p.symbol}</span>
                            <span>{p.name.substring(0, 2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-500 italic mt-1 leading-snug">
                    * 勾選的星體會在下方相位中排在最前方並以 <strong>古銅金黃色</strong> 高亮。
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[390px] pr-1.5">
                  {(() => {
                    const sortedAspects = [...natalNatalAspects].sort((a, b) => {
                      const isPlanetASelected = selectedNatalPlanetIds.some(id => {
                        const p = filteredNatalPlanets.find(x => x.id === id);
                        return p && (a.planetA.includes(p.name) || a.planetB.includes(p.name));
                      });
                      const isPlanetBSelected = selectedNatalPlanetIds.some(id => {
                        const p = filteredNatalPlanets.find(x => x.id === id);
                        return p && (b.planetA.includes(p.name) || b.planetB.includes(p.name));
                      });
                      if (isPlanetASelected && !isPlanetBSelected) return -1;
                      if (!isPlanetASelected && isPlanetBSelected) return 1;
                      return 0;
                    });

                    if (sortedAspects.length === 0) {
                      return (
                        <div className="h-[120px] flex flex-col justify-center items-center text-center text-slate-500 italic text-xs">
                          <p>本命星盤盤內暫無顯著相位（設定範圍內）。</p>
                        </div>
                      );
                    }

                    const highlightNames: string[] = [];
                    selectedNatalPlanetIds.forEach(id => {
                      const p = filteredNatalPlanets.find(x => x.id === id);
                      if (p) {
                        highlightNames.push(p.name);
                      }
                    });

                    return sortedAspects.map((aspect, index) => {
                      let badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-400';
                      let badgeTitle = '🌀 本命相位';
                      if (aspect.harmony === 'positive') {
                        badgeBg = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                        badgeTitle = '🍀 本命和諧相';
                      } else if (aspect.harmony === 'challenging') {
                        badgeBg = 'bg-red-500/10 border-red-500/20 text-red-400';
                        badgeTitle = '⚠️ 本命挑戰相';
                      }

                      return (
                        <div
                          key={`natal-natal-asp-${index}`}
                          className="p-3 bg-black/45 border border-white/5 rounded-2xl flex flex-col space-y-1.5 hover:border-[#c5a059]/20 transition-all shadow-inner animate-fade-in"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-200 font-mono">
                              {highlightText(aspect.planetA, highlightNames)} ✖ {highlightText(aspect.planetB, highlightNames)}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${badgeBg} whitespace-nowrap`}>
                              {badgeTitle} • {aspect.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                            {highlightText(aspect.description, highlightNames)} (精算誤差: {aspect.orb.toFixed(2)}°)
                          </p>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {activeAspectTab === 'transit' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-slate-400 leading-normal">
                  列出此刻<strong>流年天象星盤內部（Transit Chart）</strong>天體之間形成的相位。這象徵天空中集體意識的直接共振與當前大眾環境的流動氣場：
                </p>

                {/* Planet Multi-select/Highlight for Transit */}
                <div className="space-y-2.5 p-3.5 bg-black/35 rounded-2xl border border-white/5 text-[11px] no-print">
                  <div>
                    <span className="text-[#c5a059] font-bold block mb-1 text-[10px]">🪐 流年天體過濾與優先級 (多選)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {filteredTransitPlanets.map(p => {
                        const isSelected = selectedTransitPlanetIds.includes(p.id);
                        return (
                          <button
                            key={`transit-sel-${p.id}`}
                            onClick={() => {
                              setSelectedTransitPlanetIds(prev =>
                                prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]
                              );
                            }}
                            className={`px-2 py-1 rounded text-[10px] transition-all flex items-center space-x-1 border cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e5c583] font-bold shadow'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <span className="font-serif">{p.symbol}</span>
                            <span>{p.name.substring(0, 2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-500 italic mt-1 leading-snug">
                    * 勾選的星體會在下方相位中排在最前方並以 <strong>古銅金黃色</strong> 高亮。
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[390px] pr-1.5">
                  {(() => {
                    const sortedAspects = [...transitTransitAspects].sort((a, b) => {
                      const isPlanetASelected = selectedTransitPlanetIds.some(id => {
                        const p = filteredTransitPlanets.find(x => x.id === id);
                        return p && (a.planetA.includes(p.name) || a.planetB.includes(p.name));
                      });
                      const isPlanetBSelected = selectedTransitPlanetIds.some(id => {
                        const p = filteredTransitPlanets.find(x => x.id === id);
                        return p && (b.planetA.includes(p.name) || b.planetB.includes(p.name));
                      });
                      if (isPlanetASelected && !isPlanetBSelected) return -1;
                      if (!isPlanetASelected && isPlanetBSelected) return 1;
                      return 0;
                    });

                    if (sortedAspects.length === 0) {
                      return (
                        <div className="h-[120px] flex flex-col justify-center items-center text-center text-slate-500 italic text-xs">
                          <p>天空中暫無顯著相位物像。大氣平穩安和。</p>
                        </div>
                      );
                    }

                    const highlightNames: string[] = [];
                    selectedTransitPlanetIds.forEach(id => {
                      const p = filteredTransitPlanets.find(x => x.id === id);
                      if (p) {
                        highlightNames.push(`流年 ${p.name}`);
                        highlightNames.push(p.name);
                      }
                    });

                    return sortedAspects.map((aspect, index) => {
                      let badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-400';
                      let badgeTitle = '🌀 天象相位';
                      if (aspect.harmony === 'positive') {
                        badgeBg = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                        badgeTitle = '🍀 天象和諧相';
                      } else if (aspect.harmony === 'challenging') {
                        badgeBg = 'bg-red-500/10 border-red-500/20 text-red-400';
                        badgeTitle = '⚠️ 天象挑戰相';
                      }

                      return (
                        <div
                          key={`transit-transit-asp-${index}`}
                          className="p-3 bg-black/45 border border-white/5 rounded-2xl flex flex-col space-y-2 hover:border-[#c5a059]/20 transition-all shadow-inner animate-fade-in"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-200 font-mono">
                              {highlightText(aspect.planetA, highlightNames)} ✖ {highlightText(aspect.planetB, highlightNames)}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${badgeBg} whitespace-nowrap`}>
                              {badgeTitle} • {aspect.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                            {highlightText(aspect.description, highlightNames)} (精算誤差: {aspect.orb.toFixed(2)}°)
                          </p>
                          <div className="flex flex-col sm:flex-row justify-between text-[9px] text-slate-400 font-mono pt-1.5 border-t border-white/5 gap-1">
                            {aspect.ingressTime && (
                              <span className="flex items-center gap-1">🟢 進入相位：<strong className="text-[#e2ca9c]">{aspect.ingressTime}</strong></span>
                            )}
                            {aspect.egressTime && (
                              <span className="flex items-center gap-1">🔴 離開相位：<strong className="text-[#e2ca9c]">{aspect.egressTime}</strong></span>
                            )}
                          </div>
                          {aspect.futureAspects && aspect.futureAspects.length > 0 && (
                            <div className="pt-2 border-t border-white/5 space-y-1">
                              <span className="block text-[8px] font-bold text-[#e5c583]/80 uppercase tracking-wider">🌟 該配對未來三次特殊交會預測：</span>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 w-full text-[8.5px] font-mono text-slate-350">
                                {aspect.futureAspects.map((fut, fIdx) => (
                                  <div key={`fut-asp-${index}-${fIdx}`} className="bg-white/[0.02] border border-white/5 rounded-lg p-1.5 flex flex-col justify-between hover:border-[#c5a059]/25 transition-all">
                                    <span className="font-bold text-[#e2ca9c]">{fut.name}</span>
                                    <span className="text-slate-400 mt-0.5 text-[8px]">{fut.time}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* =========================================================================
                     NEW SECTION: DIVINATION COMMENTARY / NOTES SECTION (AT THE VERY BOTTOM)
          ========================================================================= */}
      <section className="no-print max-w-7xl w-full mx-auto p-4 lg:p-6">
        <div className="glass rounded-3xl p-6 shadow-xl space-y-4 border border-[#c5a059]/20">
          <div className="flex items-center space-x-2 border-b border-[#c5a059]/20 pb-3">
            <FileText className="w-5.5 h-5.5 text-[#c5a059]" />
            <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase tracking-widest serif">
              🔮 占卜解說與自訂備註 / Commentary && Custom Remarks
            </h2>
          </div>
          <p className="text-xs text-slate-400 leading-normal">
            在此輸入占卜鑑定解說或是補充文字。此處填寫的客製化備忘錄，將會同步呈現在您所下載的 <strong>HTML 報告書</strong> 與列印底層區域，助您生成專業權威的星象整合報告書：
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-black/45 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:border-[#c5a059] resize-none font-sans min-h-[160px] leading-relaxed shadow-inner"
            placeholder="請輸入占卜解說備註..."
            id="notes-textarea"
          />
        </div>
      </section>

      {/* 3. Footprint information */}
      <footer className="no-print bg-[#050a13] border-t border-[#c5a059]/20 py-6 text-center text-[10px] text-slate-500">
        <p>© 2026 Astronomy Natal & Transit Chart. All calculation epochs synchronized dynamically.</p>
      </footer>

      {/* =========================================================================
                     4. HIDDEN COMPACT PRINT REPORT VIEW (Only shown on Print)
          ========================================================================= */}
      <div 
        id="print-report-container" 
        className={`${isDownloadingHTML ? 'block bg-white text-slate-900 p-8 space-y-8 font-sans' : 'print-only'} max-w-[8.27in] mx-auto`}
        style={isDownloadingHTML ? {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '794px',
          height: 'auto',
          zIndex: -9999,
          pointerEvents: 'none',
          backgroundColor: '#ffffff',
          color: '#000000',
        } : undefined}
      >
        
        {/* PDF Page 1: Header and Chart Visuals */}
        <div className="print-break-after space-y-6">
          <div className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">星域雙盤占卜解讀報告書</h1>
              <p className="text-slate-500 text-xs mt-1">Natal & Transit Astrology Hub &bull; Professional Edition</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-400">
              列印時刻: {new Date().toLocaleDateString('zh-TW')}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <h2 className="text-sm font-bold bg-slate-100 px-2 py-1 border-l-4 border-amber-600">
                1. 觀測本命與流年參數 (Observation Metadata)
              </h2>
              <table className="w-full text-[10px] text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <th className="py-1.5 font-medium text-slate-500">本命誕辰時空</th>
                    <td className="py-1.5 text-slate-900">{natalChart.localTime}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="py-1.5 font-medium text-slate-500">本命經緯座標</th>
                    <td className="py-1.5 text-slate-900">{natalChart.location} (GMT+{birthTimezone})</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="py-1.5 font-medium text-slate-500">問事觀測時間</th>
                    <td className="py-1.5 text-slate-900">{transitChart.localTime}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="py-1.5 font-medium text-slate-500">流年觀測座標</th>
                    <td className="py-1.5 text-slate-900">{transitChart.location} (GMT+{transitTimezone})</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-sm font-bold bg-slate-100 px-2 py-1 border-l-4 border-amber-500">
                2. 核心大三元星耀 (Core Astrological Trinity)
              </h2>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="block text-[8px] text-slate-500">太陽（核心能量）</span>
                  <span className="block text-sm font-bold text-slate-900 mt-1">
                    {ZODIAC_SIGNS[natalChart.planets[0].signIndex].name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                     {natalChart.planets[0].degreeInSign.toFixed(1)}°
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="block text-[8px] text-slate-500">月亮（內在感受）</span>
                  <span className="block text-sm font-bold text-slate-900 mt-1">
                    {ZODIAC_SIGNS[natalChart.planets[1].signIndex].name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                     {natalChart.planets[1].degreeInSign.toFixed(1)}°
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="block text-[8px] text-slate-500">上升點（性格面具）</span>
                  <span className="block text-sm font-bold text-slate-900 mt-1 font-sans">
                     {ZODIAC_SIGNS[Math.floor(natalChart.ascendant / 30)].name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                     {(natalChart.ascendant % 30).toFixed(1)}°
                  </span>
                </div>
              </div>

              <h2 className="text-sm font-bold bg-slate-100 px-2 py-1 border-l-4 border-slate-700 mt-2">
                2b. 本命與流年四元素比例 (Element Proportions)
              </h2>
              <div className="space-y-1.5 text-[9.5px]">
                {[
                  { key: '火', label: '🔥 火象元素 (Fire) - 行動力' },
                  { key: '土', label: '🌱 土象元素 (Earth) - 實踐力' },
                  { key: '風', label: '💨 風象元素 (Air) - 理智力' },
                  { key: '水', label: '💧 水象元素 (Water) - 感受力' }
                ].map(item => {
                  const n = natalElements.percentages[item.key as '火' | '土' | '風' | '水'] || 0;
                  const t = transitElements.percentages[item.key as '火' | '土' | '風' | '水'] || 0;
                  const nC = natalElements.counts[item.key as '火' | '土' | '風' | '水'] || 0;
                  const tC = transitElements.counts[item.key as '火' | '土' | '風' | '水'] || 0;
                  
                  return (
                    <div key={`print-el-${item.key}`} className="border-b border-slate-200 pb-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-800 font-bold">{item.label}</span>
                        <span className="text-slate-600">本命: <strong>{n}%</strong> ({nC}星) | 流年: <strong>{t}%</strong> ({tC}星)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-[7.5px] text-slate-500 w-6 shrink-0">本命</span>
                          <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-slate-700 h-full" style={{ width: `${n}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[7.5px] text-slate-500 w-6 shrink-0">流年</span>
                          <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-slate-500 h-full" style={{ width: `${t}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Print Friendly SVG Chart section */}
            <div className="bg-slate-50 p-4 border rounded-xl flex items-center justify-center">
              <AstrologyWheel
                natalChart={natalChart}
                transitChart={transitChart}
                onHoverPlanet={() => {}}
                onHoverHouse={() => {}}
                hideOuterPlanets={hideOuterPlanets}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold bg-slate-100 px-2 py-1 border-l-4 border-amber-600">
              3. 本命行星宮位配屬 (Natal Planets in Houses)
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px]">
              {filteredNatalPlanets.map(p => (
                <div key={`print-natal-${p.id}`} className="flex justify-between border-b pb-1">
                  <span className="font-semibold text-slate-800">
                    {p.symbol} {p.name}
                  </span>
                  <span className="text-slate-600 font-mono">
                    落入 {ZODIAC_SIGNS[p.signIndex].name} ({p.degreeInSign.toFixed(1)}°) | 第 {p.house} 宮
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold bg-slate-100 px-2 py-1 border-l-4 border-amber-600">
              4. 流年行星落入本命宮位與移動預估 (Transit Planet Overlays)
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px]">
              {filteredTransitPlanets.map(p => (
                <div key={`print-transit-${p.id}`} className="flex justify-between border-b pb-1">
                  <span className="font-semibold text-slate-800">
                    流年 {p.symbol} {p.name}
                  </span>
                  <span className="text-slate-600 font-mono">
                    落本命第 {p.house} 宮 | {formatTimeRange(p.daysToNextHouse)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PDF Page 2: Divination Remarks, AI and Hand-written reports */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-850 tracking-wide pb-1 bg-slate-100 px-2 py-1 border-l-4 border-slate-900">
              5. 流年天體未來一輪黃道星座與本命宮位行運時程預估 (Celestial Cycle Timelines)
            </h2>
            <div className="space-y-2">
              {filteredTransitPlanets.map(p => {
                const cycles = getPlanetFutureCycles(p);
                return (
                  <div key={`print-cycle-${p.id}`} className="bg-slate-50 p-2 rounded border border-slate-200 text-[8px] leading-normal">
                    <div className="flex justify-between border-b border-dashed pb-0.5 mb-1 text-[8.5px]">
                      <span className="font-bold text-slate-800">流年 {p.symbol} {p.name} 行運時空軌跡預期</span>
                      <span className="text-slate-500 font-mono">目前位置: {ZODIAC_SIGNS[p.signIndex].name} {p.degreeInSign.toFixed(1)}° | 本命第 {p.house} 宮</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      <div>
                        <strong className="text-slate-750 block text-[7px] mb-0.5 font-bold">🌟 預估進入黃道星座進站時刻（未來一輪）：</strong>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] font-mono leading-tight">
                          {cycles.signTimes.slice(0, 6).map((st, sIdx) => (
                            <div key={`p-cycs-${p.id}-${sIdx}`} className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                              <span className="text-slate-600">{st.signSymbol} {st.signName}</span>
                              <span className="text-amber-800 font-bold">{st.days < 0.02 ? '當前落入' : st.formattedTime}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong className="text-slate-750 block text-[7px] mb-0.5 font-bold">🏡 預估進入本命宮位進站時刻（未來一輪）：</strong>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] font-mono leading-tight">
                          {cycles.houseTimes.slice(0, 6).map((ht, hIdx) => (
                            <div key={`p-cych-${p.id}-${hIdx}`} className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                              <span className="text-slate-600">第 {ht.houseNum} 宮</span>
                              <span className="text-amber-850 font-bold">{ht.days < 0.02 ? '當前落入' : ht.formattedTime}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-b space-y-4">
            <h2 className="text-sm font-bold text-slate-850 tracking-wide pb-1 bg-slate-100 px-2 py-1 border-l-4 border-slate-900">
              6. 雙盤十二宮落星及警戒相位附錄 (12 Houses Planet List & Crucial Aspects)
            </h2>
            <div className="grid grid-cols-3 gap-3 text-[9px] leading-relaxed">
              {natalChart.houses.slice(0, 12).map((house) => {
                const nPlanets = filteredNatalPlanets.filter(p => p.house === house.number);
                const tPlanets = filteredTransitPlanets.filter(p => p.house === house.number);
                return (
                  <div key={`print-house-${house.number}`} className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{house.name}起點在 {ZODIAC_SIGNS[house.signIndex].name}</span>
                      <div className="text-[8px] text-slate-500 mt-0.5">
                        <strong>本命:</strong> {nPlanets.map(p => `${p.symbol}${p.name}`).join(', ') || '無'}
                      </div>
                      <div className="text-[8px] text-slate-500">
                        <strong>流年:</strong> {tPlanets.map(p => {
                          const hasEnteredAnotherSign = p.signIndex !== house.signIndex;
                          const signName = ZODIAC_SIGNS[p.signIndex].name;
                          return `${p.symbol}${p.name}${hasEnteredAnotherSign ? `(已入${signName})` : ''}`;
                        }).join(', ') || '無'}
                      </div>
                    </div>
                    {tPlanets.length > 0 && (
                      <div className="mt-1 pt-1 border-t border-slate-200 text-[7px] text-slate-400 font-mono space-y-0.5">
                        {tPlanets.map(p => {
                          const times = calculateHouseTransitTimes(p, house.number);
                          const hasEnteredAnotherSign = p.signIndex !== house.signIndex;
                          const signName = ZODIAC_SIGNS[p.signIndex].name;
                          return (
                            <div key={`print-time-${house.number}-${p.id}`} className="truncate">
                              <strong>{p.symbol}{p.name}{hasEnteredAnotherSign ? `(${signName.substring(0, 2)})` : ''}:</strong> 🟢 {times.ingress} 🔴 {times.egress}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Printable section of crucial aspects */}
            <div className="mt-3 bg-slate-50 p-2.5 rounded border border-slate-200 text-[8.5px] leading-relaxed space-y-4">
              <div>
                <strong className="block text-[9.5px] text-slate-800 mb-1 border-b pb-0.5">🌌 雙盤重要警戒相位與進出時刻速查 (Transit-Natal Aspect Ingress/Egress)</strong>
                {transitNatalAspects.length === 0 ? (
                  <div className="text-slate-500 italic text-[7.5px]">無顯著警戒與吉凶交會相位。</div>
                ) : (
                   <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                     {transitNatalAspects.slice(0, 10).map((aspect, index) => (
                       <div key={`print-asp-${index}`} className="border-b border-dashed border-slate-200 pb-1 text-[7.5px]">
                         <div className="flex justify-between">
                           <span className="font-bold text-slate-800">{aspect.planetA} ✖ {aspect.planetB} ({aspect.name} • 差 {aspect.orb.toFixed(2)}°)</span>
                         </div>
                         <div className="text-slate-500 flex justify-between font-mono">
                           <span>🟢 入：{aspect.ingressTime}</span>
                           <span>🔴 出：{aspect.egressTime}</span>
                         </div>
                         {aspect.futureAspects && aspect.futureAspects.length > 0 && (
                           <div className="text-[6.5px] text-amber-700 font-sans mt-0.5 leading-snug">
                             🔮 未來交會：{aspect.futureAspects.map(fut => `${fut.name} (${fut.time})`).join(' | ')}
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-2.5">
                <div>
                  <strong className="block text-[9px] text-slate-800 mb-1 border-b pb-0.5">🏡 本命盤內在性格交織相位 (Natal-Natal Aspects)</strong>
                  {natalNatalAspects.length === 0 ? (
                    <div className="text-slate-500 italic text-[7.5px]">無顯著本命性格內部相位。</div>
                  ) : (
                    <div className="space-y-1 max-h-[140px] overflow-hidden text-[7.5px] leading-snug">
                      {natalNatalAspects.slice(0, 8).map((aspect, index) => (
                        <div key={`print-na-asp-${index}`} className="border-b border-slate-100 pb-0.5 flex justify-between">
                          <span className="font-bold text-slate-700">{aspect.planetA} ✖ {aspect.planetB}</span>
                          <span className="text-slate-500 font-mono">{aspect.name} ({aspect.orb.toFixed(1)}°)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <strong className="block text-[9px] text-slate-800 mb-1 border-b pb-0.5">🪐 當前大環境世俗天象相位 (Transit-Transit Aspects)</strong>
                  {transitTransitAspects.length === 0 ? (
                    <div className="text-slate-500 italic text-[7.5px]">無顯著世俗天象內部相位。</div>
                  ) : (
                    <div className="space-y-1 max-h-[140px] overflow-hidden text-[7.5px] leading-snug">
                      {transitTransitAspects.slice(0, 8).map((aspect, index) => (
                        <div key={`print-tr-asp-${index}`} className="border-b border-slate-100 pb-1">
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-700">{aspect.planetA} ✖ {aspect.planetB}</span>
                            <span className="text-slate-500 font-mono">{aspect.name} ({aspect.orb.toFixed(1)}°)</span>
                          </div>
                          {(aspect.ingressTime || aspect.egressTime) && (
                            <div className="text-slate-450 flex justify-between font-mono text-[6.5px] leading-none mt-0.5">
                              <span>🟢 進入：{aspect.ingressTime}</span>
                              <span>🔴 離開：{aspect.egressTime}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b space-y-4">
            <h2 className="text-sm font-bold text-slate-850 tracking-wide pb-1 bg-slate-100 px-2 py-1 border-l-4 border-slate-900">
              7. 輔助預測：塔羅時間軸牌陣 (Complementary Tarot Analysis)
            </h2>
            <div className="grid grid-cols-3 gap-4 text-[10px] leading-relaxed">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="font-extrabold text-slate-900 block border-b pb-1 mb-1.5">❶ 過去 (Past Path)</span>
                {(() => {
                  const card = getTarotCardById(pastCardId);
                  return card ? (
                    <div>
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{card.symbol} {card.name}</span>
                        <span>{pastReversed ? '逆位' : '正位'}</span>
                      </div>
                      <p className="text-slate-600 italic text-[9px] mt-1.5 leading-relaxed">
                        {pastReversed ? card.pastInterpretation.reversed : card.pastInterpretation.upright}
                      </p>
                      {renderTarotAstrologyConnection(pastCardId, true)}
                    </div>
                  ) : <span>未設定</span>;
                })()}
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="font-extrabold text-slate-900 block border-b pb-1 mb-1.5">❷ 現在 (Present Scene)</span>
                {(() => {
                  const card = getTarotCardById(presentCardId);
                  return card ? (
                    <div>
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{card.symbol} {card.name}</span>
                        <span>{presentReversed ? '逆位' : '正位'}</span>
                      </div>
                      <p className="text-slate-600 italic text-[9px] mt-1.5 leading-relaxed">
                        {presentReversed ? card.presentInterpretation.reversed : card.presentInterpretation.upright}
                      </p>
                      {renderTarotAstrologyConnection(presentCardId, true)}
                    </div>
                  ) : <span>未設定</span>;
                })()}
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="font-extrabold text-slate-900 block border-b pb-1 mb-1.5">❸ 未來 (Future Sight)</span>
                {(() => {
                  const card = getTarotCardById(futureCardId);
                  return card ? (
                    <div>
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{card.symbol} {card.name}</span>
                        <span>{futureReversed ? '逆位' : '正位'}</span>
                      </div>
                      <p className="text-slate-600 italic text-[9px] mt-1.5 leading-relaxed">
                        {futureReversed ? card.futureInterpretation.reversed : card.futureInterpretation.upright}
                      </p>
                      {renderTarotAstrologyConnection(futureCardId, true)}
                    </div>
                  ) : <span>未設定</span>;
                })()}
              </div>
            </div>
          </div>

          <div className="border-b pb-2">
            <h2 className="text-sm font-bold text-slate-850 tracking-wide bg-slate-100 px-2 py-1 border-l-4 border-slate-900">
              8. 占卜大師詳實分析備註 (Full Detailed Horoscope Assessment)
            </h2>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner whitespace-pre-wrap font-sans">
            {notes}
          </div>

          <div className="border-t pt-8 mt-12 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="border-b w-32 mx-auto h-12" />
              <span className="block text-[9px] text-slate-500 mt-2 font-mono">主占星師 簽章</span>
            </div>
            <div>
              <div className="border-b w-32 mx-auto h-12" />
              <span className="block text-[9px] text-slate-500 mt-2 font-mono">核定日期</span>
            </div>
            <div className="flex flex-col justify-end items-center">
              <span className="text-[9px] text-slate-500 font-mono italic">
                Astro Center Web Hub Standard Certification
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
