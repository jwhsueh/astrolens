import { PLANET_ASPECT_TRANSITS } from './planetInterpretations';

/**
 * Astrology Calculation Engine and Interpretation Content
 * Computes geocentric longitude positions of major planets based on J2000 Julian Dates.
 */

export interface PlanetPosition {
  id: string;
  name: string;
  symbol: string;
  longitude: number; // 0 to 360
  signIndex: number; // 0 to 11
  degreeInSign: number;
  house: number;      // 1 to 12
  isRetrograde: boolean;
  speed: number;       // degrees per day
  daysToNextHouse: number; // estimated hours/days to next house
}

export interface Aspect {
  planetA: string;
  planetB: string;
  type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
  angle: number;
  orb: number;
  name: string;
  description: string;
  harmony: 'positive' | 'challenging' | 'neutral';
  ingressTime?: string;
  egressTime?: string;
  futureAspects?: { name: string; time: string; angle: number }[];
}

export interface HouseData {
  number: number;
  name: string;
  longitudeCusp: number;
  signIndex: number;
  degreeInSign: number;
  meaning: string;
}

export interface AstrologyChart {
  julianDate: number;
  localTime: string;
  location: string;
  planets: PlanetPosition[];
  houses: HouseData[];
  ascendant: number;
  midheaven: number;
  aspects: Aspect[];
}

export const ZODIAC_SIGNS = [
  { name: '牡羊座', nameEn: 'Aries', symbol: '♈', element: '火', quality: '創始' },
  { name: '金牛座', nameEn: 'Taurus', symbol: '♉', element: '土', quality: '固定' },
  { name: '雙子座', nameEn: 'Gemini', symbol: '♊', element: '風', quality: '變動' },
  { name: '巨蟹座', nameEn: 'Cancer', symbol: '♋', element: '水', quality: '創始' },
  { name: '獅子座', nameEn: 'Leo', symbol: '♌', element: '火', quality: '固定' },
  { name: '處女座', nameEn: 'Virgo', symbol: '♍', element: '土', quality: '變動' },
  { name: '天秤座', nameEn: 'Libra', symbol: '♎', element: '風', quality: '創始' },
  { name: '天蠍座', nameEn: 'Scorpio', symbol: '♏', element: '水', quality: '固定' },
  { name: '射手座', nameEn: 'Sagittarius', symbol: '♐', element: '火', quality: '變動' },
  { name: '摩羯座', nameEn: 'Capricorn', symbol: '♑', element: '土', quality: '創始' },
  { name: '水瓶座', nameEn: 'Aquarius', symbol: '♒', element: '風', quality: '固定' },
  { name: '雙魚座', nameEn: 'Pisces', symbol: '♓', element: '水', quality: '變動' },
];

export const PLANETS_METADATA = [
  { id: 'sun', name: '太陽', symbol: '☉', avgSpeed: 0.9856 },
  { id: 'moon', name: '月亮', symbol: '☽', avgSpeed: 13.176 },
  { id: 'mercury', name: '水星', symbol: '☿', avgSpeed: 1.2 },
  { id: 'venus', name: '金星', symbol: '♀', avgSpeed: 1.2 },
  { id: 'mars', name: '火星', symbol: '♂', avgSpeed: 0.524 },
  { id: 'jupiter', name: '木星', symbol: '♃', avgSpeed: 0.083 },
  { id: 'saturn', name: '土星', symbol: '♄', avgSpeed: 0.033 },
  { id: 'uranus', name: '天王星', symbol: '♅', avgSpeed: 0.0117 },
  { id: 'neptune', name: '海王星', symbol: '♆', avgSpeed: 0.006 },
  { id: 'pluto', name: '冥王星', symbol: '♇', avgSpeed: 0.004 },
  { id: 'rahu', name: '北交點', symbol: '☊', avgSpeed: -0.053 },
  { id: 'ketu', name: '南交點', symbol: '☋', avgSpeed: -0.053 },
];

export const HOUSE_DETAILS = [
  { number: 1, name: '第一宮（命宮）', keyMeaning: '自我認同、外在人格、生命力與第一印象' },
  { number: 2, name: '第二宮（財帛宮）', keyMeaning: '個人財產、物質安全、理財觀念與內在價值感' },
  { number: 3, name: '第三宮（兄弟宮）', keyMeaning: '思維溝通、基礎學習、短途旅行與手足鄰里關係' },
  { number: 4, name: '第四宮（田宅宮）', keyMeaning: '家庭、根源、內心安全感、私密生活與晚年生活' },
  { number: 5, name: '第五宮（戀愛創意宮）', keyMeaning: '愛情、創造力、自我表達、娛樂、投機與子女運勢' },
  { number: 6, name: '第六宮（工作健康宮）', keyMeaning: '日常秩序、勞動服務、生理健康與對待寵物/下屬的態度' },
  { number: 7, name: '第七宮（夫妻伴侶宮）', keyMeaning: '婚姻關係、一對一合作、公開對手與法律契約' },
  { number: 8, name: '疾厄宮（第八宮）', keyMeaning: '他人資源（遺產、親密共享）、性、偏財、心理轉化與玄秘事物' },
  { number: 9, name: '第九宮（遷移宮）', keyMeaning: '高等教育、宗教哲學、跨國旅行、國際視野與信念系統' },
  { number: 10, name: '第十宮（官祿宮）', keyMeaning: '事業成就、社會地位、名聲信譽、志向與權威形象' },
  { number: 11, name: '第十一宮（福德團體宮）', keyMeaning: '社會群體、朋友圈、願景理想與長遠人際網絡' },
  { number: 12, name: '第十二宮（玄秘宮）', keyMeaning: '潛意識、集體心靈、因果業力、隱遁、幕後支持與靈修' },
];

/**
 * Calculates Julian Date from local calendar time and location longitude.
 */
export function calculateJulianDate(year: number, month: number, day: number, hour: number, minute: number, timezoneOffsetHours: number): number {
  // Convert local time to UTC
  let utcHour = hour - timezoneOffsetHours;
  let utcDay = day;
  let utcMonth = month;
  let utcYear = year;

  if (utcHour < 0) {
    utcHour += 24;
    utcDay -= 1;
  } else if (utcHour >= 24) {
    utcHour -= 24;
    utcDay += 1;
  }

  // Basic Julian day formula
  if (utcMonth <= 2) {
    utcYear -= 1;
    utcMonth += 12;
  }

  const A = Math.floor(utcYear / 100);
  const B = 2 - A + Math.floor(A / 4);

  const dayFraction = (utcDay + utcHour / 24.0 + minute / 1440.0);
  const JD = Math.floor(365.25 * (utcYear + 4716)) + Math.floor(30.6001 * (utcMonth + 1)) + dayFraction + B - 1524.5;
  return JD;
}

/**
 * Normalizes degrees to [0, 360).
 */
function normalizeDegrees(deg: number): number {
  deg = deg % 360;
  if (deg < 0) deg += 360;
  return deg;
}

/**
 * Computes geocentric planet longitudes.
 */
export function calculateAstrology(
  dateTimeStr: string, // YYYY-MM-DDTHH:mm
  longitude: number,   // degrees East (positive)
  latitude: number,    // degrees North (positive)
  timezoneOffsetHours: number
): AstrologyChart {
  const date = new Date(dateTimeStr);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
    const fallbackDate = new Date('1998-05-18T10:30');
    year = fallbackDate.getFullYear();
    month = fallbackDate.getMonth() + 1;
    day = fallbackDate.getDate();
    hour = fallbackDate.getHours();
    minute = fallbackDate.getMinutes();
  }

  const JD = calculateJulianDate(year, month, day, hour, minute, timezoneOffsetHours);
  const d = JD - 2451545.0; // Days from J2000 epoch

  // Coordinates of Earth/Sun
  // Earth Heliocentric parameters
  const Earth_L = normalizeDegrees(100.464 + 0.9856474 * d);
  const Earth_e = 0.0167;
  const Earth_w = 102.947;
  const Earth_M = normalizeDegrees(Earth_L - Earth_w);
  const Earth_E = normalizeDegrees(Earth_M + (180 / Math.PI) * Earth_e * Math.sin(Earth_M * Math.PI / 180) * (1 + Earth_e * Math.cos(Earth_M * Math.PI / 180)));
  const Earth_x0 = Math.cos(Earth_E * Math.PI / 180) - Earth_e;
  const Earth_y0 = Math.sqrt(1 - Earth_e * Earth_e) * Math.sin(Earth_E * Math.PI / 180);
  const Earth_r = Math.sqrt(Earth_x0 * Earth_x0 + Earth_y0 * Earth_y0);
  const Earth_th = normalizeDegrees(Math.atan2(Earth_y0, Earth_x0) * 180 / Math.PI + Earth_w);
  const x_Earth = Earth_r * Math.cos(Earth_th * Math.PI / 180);
  const y_Earth = Earth_r * Math.sin(Earth_th * Math.PI / 180);

  // 1. Sun geocentric longitude is Earth heliocentric longitude + 180
  const sunLong = normalizeDegrees(Earth_th + 180);

  // 2. Moon geocentric position (orbital simplified)
  const moonMeanLong = normalizeDegrees(218.316 + 13.176396 * d);
  const moonAnomaly = normalizeDegrees(134.963 + 13.064993 * d);
  const moonLong = normalizeDegrees(moonMeanLong + 6.289 * Math.sin(moonAnomaly * Math.PI / 180));

  // Outer and Inner Planets Heliocentric to Geocentric converter
  const planetsHeliocentricData: { [key: string]: { a: number, e: number, w: number, L0: number, daily: number } } = {
    mercury: { a: 0.3871, e: 0.2056, w: 77.456, L0: 252.250, daily: 4.09233 },
    venus: { a: 0.7233, e: 0.0068, w: 131.532, L0: 181.980, daily: 1.60213 },
    mars: { a: 1.5237, e: 0.0934, w: 336.040, L0: 355.453, daily: 0.52402 },
    jupiter: { a: 5.2034, e: 0.0484, w: 14.753, L0: 34.404, daily: 0.08308 },
    saturn: { a: 9.5371, e: 0.0541, w: 92.431, L0: 49.944, daily: 0.03346 },
    uranus: { a: 19.191, e: 0.0473, w: 170.964, L0: 313.232, daily: 0.01173 },
    neptune: { a: 30.069, e: 0.0086, w: 44.971, L0: 304.880, daily: 0.00598 },
    pluto: { a: 39.482, e: 0.2488, w: 224.066, L0: 238.928, daily: 0.00398 }
  };

  const computedLongitudes: { [key: string]: { long: number, speed: number, r: number } } = {
    sun: { long: sunLong, speed: 0.9856, r: Earth_r },
    moon: { long: moonLong, speed: 13.176, r: 0.00257 }
  };

  // For retrograde calculations, we estimate planetary speeds by doing a tiny offset delta (+0.1 day)
  const d_next = d + 0.1;
  const Earth_L_next = normalizeDegrees(100.464 + 0.9856474 * d_next);
  const Earth_M_next = normalizeDegrees(Earth_L_next - Earth_w);
  const Earth_E_next = normalizeDegrees(Earth_M_next + (180 / Math.PI) * Earth_e * Math.sin(Earth_M_next * Math.PI / 180) * (1 + Earth_e * Math.cos(Earth_M_next * Math.PI / 180)));
  const Earth_x0_next = Math.cos(Earth_E_next * Math.PI / 180) - Earth_e;
  const Earth_y0_next = Math.sqrt(1 - Earth_e * Earth_e) * Math.sin(Earth_E_next * Math.PI / 180);
  const Earth_r_next = Math.sqrt(Earth_x0_next * Earth_x0_next + Earth_y0_next * Earth_y0_next);
  const Earth_th_next = normalizeDegrees(Math.atan2(Earth_y0_next, Earth_x0_next) * 180 / Math.PI + Earth_w);
  const x_Earth_next = Earth_r_next * Math.cos(Earth_th_next * Math.PI / 180);
  const y_Earth_next = Earth_r_next * Math.sin(Earth_th_next * Math.PI / 180);

  // Computations for nodes Rahu and Ketu
  const rahuLong = normalizeDegrees(125.045 - 0.052954 * d);
  computedLongitudes['rahu'] = { long: rahuLong, speed: -0.053, r: 0 };
  computedLongitudes['ketu'] = { long: normalizeDegrees(rahuLong + 180), speed: -0.053, r: 0 };

  for (const pKey of Object.keys(planetsHeliocentricData)) {
    const p = planetsHeliocentricData[pKey];

    // Heliocentric for t
    const L = normalizeDegrees(p.L0 + p.daily * d);
    const M = normalizeDegrees(L - p.w);
    const E = normalizeDegrees(M + (180 / Math.PI) * p.e * Math.sin(M * Math.PI / 180) * (1 + p.e * Math.cos(M * Math.PI / 180)));
    const x0 = p.a * (Math.cos(E * Math.PI / 180) - p.e);
    const y0 = p.a * Math.sqrt(1 - p.e * p.e) * Math.sin(E * Math.PI / 180);
    const r = Math.sqrt(x0 * x0 + y0 * y0);
    const th = normalizeDegrees(Math.atan2(y0, x0) * 180 / Math.PI + p.w);
    const x_h = r * Math.cos(th * Math.PI / 180);
    const y_h = r * Math.sin(th * Math.PI / 180);

    // Geocentric coordinates
    const x_g = x_h - x_Earth;
    const y_g = y_h - y_Earth;
    const geoLong = normalizeDegrees(Math.atan2(y_g, x_g) * 180 / Math.PI);

    // Heliocentric and Geocentric for t+delt(0.1 day) to estimate current velocity vector
    const L_next = normalizeDegrees(p.L0 + p.daily * d_next);
    const M_next = normalizeDegrees(L_next - p.w);
    const E_next = normalizeDegrees(M_next + (180 / Math.PI) * p.e * Math.sin(M_next * Math.PI / 180) * (1 + p.e * Math.cos(M_next * Math.PI / 180)));
    const x0_next = p.a * (Math.cos(E_next * Math.PI / 180) - p.e);
    const y0_next = p.a * Math.sqrt(1 - p.e * p.e) * Math.sin(E_next * Math.PI / 180);
    const r_next = Math.sqrt(x0_next * x0_next + y0_next * y0_next);
    const th_next = normalizeDegrees(Math.atan2(y0_next, x0_next) * 180 / Math.PI + p.w);
    const x_h_next = r_next * Math.cos(th_next * Math.PI / 180);
    const y_h_next = r_next * Math.sin(th_next * Math.PI / 180);

    const x_g_next = x_h_next - x_Earth_next;
    const y_g_next = y_h_next - y_Earth_next;
    const geoLongNext = normalizeDegrees(Math.atan2(y_g_next, x_g_next) * 180 / Math.PI);

    let speed = (geoLongNext - geoLong) / 0.1;
    // Handle wrap around boundary
    if (speed > 180) speed -= 3600;
    if (speed < -180) speed += 3600;

    computedLongitudes[pKey] = { long: geoLong, speed: speed, r: r };
  }

  // 3. Compute Local Sidereal Time for Ascendant and Houses
  // Greenwich Sidereal Time GST in hours
  // GST at UT 00:00 is: 6.6460656 + 2400.0513 * T (centuries from 1900)
  // Simplified robust GST
  const UT_hours = hour - timezoneOffsetHours + minute / 60.0;
  const GST_hours = normalizeDegrees((18.697374558 + 24.06570982441908 * d) + UT_hours) * 15; // as degrees
  const LST_deg = normalizeDegrees(GST_hours + longitude);

  // Ascendant ASC calculation
  const obliquity = 23.439 * Math.PI / 180;
  const alphaOutput = LST_deg * Math.PI / 180;
  const latRads = latitude * Math.PI / 180;

  // ASC longitude formulas
  let ascendant = normalizeDegrees(Math.atan2(
    Math.sin(alphaOutput),
    Math.cos(alphaOutput) * Math.cos(obliquity) - Math.tan(latRads) * Math.sin(obliquity)
  ) * 180 / Math.PI);

  // Equal House system divides exactly 12 houses of 30 degrees, starting from ASC
  const houses: HouseData[] = [];
  for (let h = 1; h <= 12; h++) {
    const cusp = normalizeDegrees(ascendant + 30 * (h - 1));
    const signIdx = Math.floor(cusp / 30);
    const degree = cusp % 30;
    houses.push({
      number: h,
      name: `第 ${h} 宮`,
      longitudeCusp: cusp,
      signIndex: signIdx,
      degreeInSign: degree,
      meaning: HOUSE_DETAILS[h - 1].keyMeaning
    });
  }

  // MC Calculation
  const midheaven = normalizeDegrees(Math.atan2(Math.sin(alphaOutput), Math.cos(alphaOutput) * Math.cos(obliquity)) * 180 / Math.PI);

  // Match computed planets to sign indices + houses
  const finalPlanets: PlanetPosition[] = PLANETS_METADATA.map(meta => {
    const computed = computedLongitudes[meta.id] || { long: 0, speed: meta.avgSpeed };
    let finalLong = computed.long;
    const signIdx = Math.floor(finalLong / 30);
    const degInSign = finalLong % 30;

    // Find custom house index (1 to 12)
    // For Equal House, we see how many degrees we are from Ascendant
    let distFromAsc = normalizeDegrees(finalLong - ascendant);
    const houseNum = Math.floor(distFromAsc / 30) + 1;

    // Estimate time (in days) to move to the next house.
    // Next house boundary: (HouseStart + 30) % 360
    const nextHouseCusp = normalizeDegrees(ascendant + 30 * houseNum);
    const degreesToNextCusp = normalizeDegrees(nextHouseCusp - finalLong);

    // Speed calculation
    const currentSpeed = computed.speed;
    const isRetro = currentSpeed < 0;
    let daysToNextHouse = 0;

    if (Math.abs(currentSpeed) > 0.0001) {
      if (isRetro) {
        // Moving backward, cusp is the current house start boundary
        const prevHouseCusp = normalizeDegrees(ascendant + 30 * (houseNum - 1));
        const degreesToPrevCusp = normalizeDegrees(finalLong - prevHouseCusp);
        daysToNextHouse = degreesToPrevCusp / Math.abs(currentSpeed);
      } else {
        daysToNextHouse = degreesToNextCusp / currentSpeed;
      }
    } else {
      daysToNextHouse = degreesToNextCusp / meta.avgSpeed;
    }

    return {
      id: meta.id,
      name: meta.name,
      symbol: meta.symbol,
      longitude: finalLong,
      signIndex: signIdx,
      degreeInSign: degInSign,
      house: houseNum,
      isRetrograde: isRetro,
      speed: currentSpeed,
      daysToNextHouse: daysToNextHouse
    };
  });

  // Calculate planetary aspects between all computed planets
  const aspects: Aspect[] = [];
  const majorAspects = [
    { type: 'conjunction', angle: 0, orb: 8, name: '合相', harmony: 'neutral' as const, desc: '能量融合，高度專注或過度主觀' },
    { type: 'sextile', angle: 60, orb: 6, name: '六分相', harmony: 'positive' as const, desc: '機會與和諧，主動協調能發掘才華及契機' },
    { type: 'square', angle: 90, orb: 8, name: '四分相', harmony: 'challenging' as const, desc: '困難與摩擦，內部衝突促使採取行動和克服挑戰' },
    { type: 'trine', angle: 120, orb: 8, name: '三分相', harmony: 'positive' as const, desc: '順暢流動，展現天賦資源與自然支持的幸運契機' },
    { type: 'opposition', angle: 180, orb: 8, name: '對分相', harmony: 'challenging' as const, desc: '張力與對立，人際關係鏡像投射與尋求平衡' }
  ];

  for (let i = 0; i < finalPlanets.length; i++) {
    for (let j = i + 1; j < finalPlanets.length; j++) {
      const pA = finalPlanets[i];
      const pB = finalPlanets[j];

      const diff = normalizeDegrees(pA.longitude - pB.longitude);
      const angle = diff > 180 ? 360 - diff : diff;

      for (const asp of majorAspects) {
        if (Math.abs(angle - asp.angle) <= asp.orb) {
          aspects.push({
            planetA: pA.name,
            planetB: pB.name,
            type: asp.type as any,
            angle: angle,
            orb: Math.abs(angle - asp.angle),
            name: asp.name,
            harmony: asp.harmony,
            description: `${pA.name} 與 ${pB.name} 呈 ${asp.name} (${asp.angle}°)，代表${asp.desc}`
          });
        }
      }
    }
  }

  // Format local display clock representation
  const localTimeFormatted = `${year}年${month}月${day}日 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  return {
    julianDate: JD,
    localTime: localTimeFormatted,
    location: `經度 ${longitude.toFixed(2)}°E, 緯度 ${latitude.toFixed(2)}°N`,
    planets: finalPlanets,
    houses: houses,
    ascendant: ascendant,
    midheaven: midheaven,
    aspects: aspects
  };
}

/**
 * Returns static pre-interpretations for planet in zodiac sign.
 */
export function getPlanetSignInterpretation(planet: string, sign: string): string {
  const dictionary: { [key: string]: { [key: string]: string } } = {
    '太陽': {
      '牡羊座': '充滿活力與開拓精神，勇往直前，行事果斷，具有強烈領導慾望。',
      '金牛座': '注重穩定與物質享受，做事腳踏實地，追求實用與感官舒適。',
      '雙子座': '好奇心旺盛且多才多藝，喜愛溝通和資訊，善於適應快速變化的環境。',
      '巨蟹座': '情感豐富敏感，具有強烈的母性與防衛本能，渴望溫暖的家庭與安全感。',
      '獅子座': '自信、熱情慷慨且渴望成為焦點，具有極強的舞台魅力與創造表達力。',
      '處女座': '追求完美，注重細節，條理分明，樂於服務與分析解決實際問題。',
      '天秤座': '愛好和平與和諧，注重公平與美感，擅長外交與人際關係協調。',
      '天蠍座': '意志堅定，情感深沉且洞察力極強，追求生命靈魂底層的真實連結與轉化。',
      '射手座': '追求自由、哲理與開拓視野，樂觀幽默，熱愛旅行與心智探險。',
      '摩羯座': '腳踏實地，野心勃勃且紀律嚴明，擅長組織規劃並樂於持之以恆建立基業。',
      '水瓶座': '思想前衛、崇尚自由與客觀智慧，關心集體利益，具有獨樹一幟的特立獨行作風。',
      '雙魚座': '直覺敏銳且浪漫多情，極富同情心與無限的靈性想像力，容易與他人界線模糊。'
    },
    '月亮': {
      '牡羊座': '情绪反應直接而迅速，本能地衝動，渴望在情感上被認可為第一。',
      '金牛座': '情感深沉穩定，極需物質充裕、美食與舒適感官來維護內在安全。',
      '雙子座': '透過語言與思想交流滿足情緒需求，習慣理性分析內心感受，喜新厭舊。',
      '巨蟹座': '情感極度敏銳、溫馨依賴，需要家庭般的滋養與對熟悉的私密空間的依戀。',
      '獅子座': '內心渴望尊嚴、誇讚與高調認可，在情感中表現慷慨，自尊心極強。',
      '處女座': '透過生活細節整齊、料理瑣事和實用幫忙來獲得安全感，容易焦慮。',
      '天秤座': '渴求關係和諧、優雅應對，極度害怕衝突，常因迎合他人而失去內心方向。',
      '天蠍座': '情緒強烈非黑即白，情感隱秘，具有強烈的佔有慾與不妥協的直覺守護。',
      '射手座': '在開闊草原或自由不羈中才感舒暢，追求知性與心智擴張，情緒復原力高。',
      '摩羯座': '內在壓抑，習慣自己承擔一切重任，不輕易流露真情，以事業成功為心靈安定之本。',
      '水瓶座': '情感保持疏離、冷靜，需要很大的獨立私人空間，用理智和友愛去替代親密。',
      '雙魚座': '在幻想、藝術中陶醉，有超強共情能力，容易受外在氣場影響而心碎流淚。'
    },
    '水星': {
      '牡羊座': '思考迅捷，言詞直率甚至具有攻擊性，直擊要點，不喜歡拖泥帶水。',
      '金牛座': '思維緩慢而細緻，重視邏輯的實用價值，說法沉穩，不易被說服。',
      '雙子座': '反應極快，訊息傳遞靈活，善於一心多用，但思考深度較淺或缺乏持久度。',
      '巨蟹座': '記憶力驚人，思考受直覺和過往情緒經驗主導，偏好用故事和感受表達。',
      '獅子座': '表達極富戲劇效果，觀點自信武斷，擅長公開演講和激發他人的熱情。',
      '處女座': '極具分析力、邏輯精密、善於分類整理。注重事實與精準度，吹毛求疵。',
      '天秤座': '思維偏重平衡與客觀，決策時常反覆衡量、多方考量，容易猶豫不決。',
      '天蠍座': '言詞具有穿透力，喜歡探聽秘密，直覺洞悉動機，言語可能一針見血。',
      '射手座': '追求宏觀概念，忽視微小細節，充滿理想主義色彩，直言不諱地傳播信念。',
      '摩羯座': '思考具有條理和階級，用字慎重踏實，著眼於實用產出與社會常規標準。',
      '水瓶座': '客觀冷靜、不落套俗的特異思維，擅長跨領域抽象分析，具備科學家精神。',
      '雙魚座': '思維具像化、藝術性，偏好直覺感悟而非線性邏輯，容易丟失主線。'
    }
  };

  const defaultInterpretation = `${planet}落入${sign}，將原本的行星能量透過該星座的特質表現出來。例如這代表著在應對外界或決策時，帶有該星座的特定生活熱情與能量展現。`;
  return dictionary[planet]?.[sign] || defaultInterpretation;
}

/**
 * Returns static pre-interpretations for planet in house.
 */
export function getPlanetHouseInterpretation(planet: string, house: number): string {
  const dictionary: { [key: string]: { [key: number]: string } } = {
    '太陽': {
      1: '太陽在第一宮：人格耀眼、主動積極。充滿生命力和意志力，极欲在外界展現獨特的個人身份與核心天賦。',
      2: '太陽在第二宮：核心目標聚焦在物質積累與個人價值。擅長開拓財源，極度重視金錢、才智的實際變現。',
      3: '太陽在第三宮：熱愛溝通、探索和短途旅行。心智活躍，習慣透過學習和表達來發光發熱。',
      4: '太陽在第四宮：渴望建立安穩的核心。注意力聚焦於家庭事務與靈魂私密根源，晚年運勢光明燦爛。',
      5: '太陽在第五宮：天生的創作者與娛樂家。能在藝術、戀愛、遊戲或孩子身上找回充沛的精力與無比的自信。',
      6: '太陽在第六宮：在日常秩序、健康維護或實際工作中發揮光芒。是極富責任感的勞動與服務執行者。',
      7: '太陽在第七宮：生命力根植於合作與婚姻。極需要重要夥伴作鏡子來認清自我價值。',
      8: '太陽在第八宮：被命運的危機與深層轉化所吸引。善於處理共有財產、投資和心理玄秘領域。',
      9: '太陽在第九宮：終其一生追求崇高智識、跨國探險與信念體系。天生的導師，追求意義與真理。',
      10: '太陽在第十宮：天生追逐光榮與事業巔峰。容易成為公眾或行業領袖，渴望攀登社會權力之山。',
      11: '太陽在第十一宮：在大型團體、志同道合圈子中擔任要角。能透過群眾大眾、希望願景發揮熱情。',
      12: '太陽在第十二宮：生命能量隱性流動。適合在幕後、靈修、隱密機構發揮能量，具有強大超自然的包容力。'
    }
  };

  const defaultInterpretation = `${planet}落入第${house}宮，代表著此人會在${HOUSE_DETAILS[house - 1]?.name}對應的生活領域中，強烈傾注這顆行星代表的生命力量、動能或心理特徵。`;
  return dictionary[planet]?.[house] || defaultInterpretation;
}

/**
 * Formats time forecast output neatly.
 */
export function formatTimeRange(days: number): string {
  if (days < 0) return '已移動入此宮';
  const totalHours = Math.round(days * 24);
  const d = Math.floor(totalHours / 24);
  const h = totalHours % 24;
  if (d === 0) {
    return `預計 ${h} 小時後`;
  }
  return `預計 ${d} 天 ${h} 小時後`;
}

export interface SensitivePoint {
  name: string;
  symbol: string;
  degree: number;
  sign: string;
  house: number;
  rangeMin: number;
  rangeMax: number;
}

export interface MonthlyForecastItem {
  month: number;
  monthName: string;
  intensity: 'high' | 'medium' | 'low';
  theme: string;
  timing: string;
  aspects: string[];
  triggerEvents: string[];
  score: number;
  aspectQuote?: {
    planetGroup: string;
    targetPlanet: string;
    period: string;
    aspectType: 'soft' | 'hard';
    aspectMeaning: string;
  };
}

export interface AstrologicalPredictionReport {
  sensitivePoints: SensitivePoint[];
  solarReturn: {
    year: number;
    sunSign: string;
    sunHouse: number;
    ascSign: string;
    rulingPlanet: string;
    rulingPlanetMeaning: string;
    clusteringHouse: number;
    annualTheme: string;
    moonSign: string;
    moonHouse: number;
    description: string;
  };
  houseSignifications: { house: number; name: string; meaning: string }[];
  signSignifications: { sign: string; element: string; meaning: string }[];
  eclipses: {
    date: string;
    type: string;
    degree: number;
    sign: string;
    house: number;
    sunSign: string;
    sunHouse: number;
    moonSign: string;
    moonHouse: number;
    meaning: string;
  }[];
  retrogrades: {
    planet: string;
    symbol: string;
    period: string;
    exactDates: string;
    stationPoint: string;
    type: string;
    description: string;
  }[];
  monthlyTimeline: MonthlyForecastItem[];
  lunarNodes: {
    northSign: string;
    northHouse: number;
    southSign: string;
    southHouse: number;
    title: string;
    lesson: string;
    inertia: string;
    growthDirection: string;
    houseLesson: string;
  };
  scoringConclusion: {
    majorThemes: string[];
    secondaryThemes: string[];
  };
}

export function generatePredictiveReport(natalChart: AstrologyChart, transitDateStr: string): AstrologicalPredictionReport {
  const parsedDate = new Date(transitDateStr);
  const transitYear = isNaN(parsedDate.getFullYear()) ? 2026 : parsedDate.getFullYear();
  const ascIndex = Math.floor(natalChart.ascendant / 30);
  const ascSignName = ZODIAC_SIGNS[ascIndex]?.name || '射手座';

  // Ruler mapping based on ASC sign
  const ascRulerMap: Record<string, { planet: string; meaning: string }> = {
    '白羊座': { planet: '火星 (Mars)', meaning: '象徵開創、勇氣、直接行動與競爭動力' },
    '金牛座': { planet: '金星 (Venus)', meaning: '象徵感官享受、實質價值、財富累積與審美' },
    '雙子座': { planet: '水星 (Mercury)', meaning: '象徵靈活心智、溝通表達、資訊流動與學習' },
    '巨蟹座': { planet: '月亮 (Moon)', meaning: '象徵情感需求、潛意識、家庭歸屬與保護本能' },
    '獅子座': { planet: '太陽 (Sun)', meaning: '象徵核心自我、生命活力、創造力與領導風範' },
    '處女座': { planet: '水星 (Mercury)', meaning: '象徵精準分析、工作秩序、服務精神與健康管理' },
    '天秤座': { planet: '金星 (Venus)', meaning: '象徵和諧關係、合作夥伴、審美平衡與法律公正' },
    '天蠍座': { planet: '冥王星 (Pluto)', meaning: '象徵深度轉化、潛能爆發、心理重整與權力重生' },
    '射手座': { planet: '木星 (Jupiter)', meaning: '象徵擴張視野、哲學思維、高等教育與幸運機遇' },
    '摩羯座': { planet: '土星 (Saturn)', meaning: '象徵紀律、結構、長期承擔、責任與事業成就' },
    '水瓶座': { planet: '天王星 (Uranus)', meaning: '象徵革新突破、獨立自由、科技洞察與群體願景' },
    '雙魚座': { planet: '海王星 (Neptune)', meaning: '象徵靈性直覺、無私奉獻、藝術幻想與超越現實' }
  };

  const ruler = ascRulerMap[ascSignName] || { planet: '木星 (Jupiter)', meaning: '象徵擴張、哲學與幸運機遇' };

  // House significations
  const houseSignifications = HOUSE_DETAILS.map(h => ({
    house: h.number,
    name: h.name,
    meaning: h.keyMeaning
  }));

  // Sign significations
  const signSignifications = ZODIAC_SIGNS.map(s => ({
    sign: s.name,
    element: s.element,
    meaning: s.quality
  }));

  // Step 1: Sensitive Points
  const sensitivePoints: SensitivePoint[] = [
    {
      name: '本命太陽 (Sun)',
      symbol: '☉',
      degree: natalChart.planets[0].longitude,
      sign: ZODIAC_SIGNS[natalChart.planets[0].signIndex].name,
      house: natalChart.planets[0].house,
      rangeMin: natalChart.planets[0].longitude - 3,
      rangeMax: natalChart.planets[0].longitude + 3,
    },
    {
      name: '本命月亮 (Moon)',
      symbol: '☽',
      degree: natalChart.planets[1].longitude,
      sign: ZODIAC_SIGNS[natalChart.planets[1].signIndex].name,
      house: natalChart.planets[1].house,
      rangeMin: natalChart.planets[1].longitude - 3,
      rangeMax: natalChart.planets[1].longitude + 3,
    },
    {
      name: '上升點 (ASC)',
      symbol: '⎈',
      degree: natalChart.ascendant,
      sign: ascSignName,
      house: 1,
      rangeMin: natalChart.ascendant - 3,
      rangeMax: natalChart.ascendant + 3,
    },
    {
      name: '天頂點 (MC)',
      symbol: 'M',
      degree: natalChart.midheaven,
      sign: ZODIAC_SIGNS[Math.floor(natalChart.midheaven / 30)].name,
      house: 10,
      rangeMin: natalChart.midheaven - 3,
      rangeMax: natalChart.midheaven + 3,
    }
  ];

  // Step 2: Solar Return
  const srSunHouse = ((transitYear * 3 + 2) % 12) + 1;
  const srAscSignIndex = (transitYear * 5) % 12;
  const themeMap: Record<number, string> = {
    1: '自我蛻變與個人形象重建年（落第1宮）',
    2: '財務資產重整與實質收穫年（落第2宮）',
    3: '溝通學習、短程差旅與心智擴展年（落第3宮）',
    4: '家庭根基、房產安頓與內在安全感年（落第4宮）',
    5: '愛情創作、投資理財與自我展現年（落第5宮）',
    6: '職場秩序、勞動服務與健康調整年（落第6宮）',
    7: '一對一合作、重大夥伴關係與婚姻年（落第7宮）',
    8: '深度轉化、共有財產與心理重整年（落第8宮）',
    9: '高等學術、跨國視野與哲學思維年（落第9宮）',
    10: '事業成就、公眾名望與社會地位衝刺年（落第10宮）',
    11: '群體願景、社會網絡與長期理想實現年（落第11宮）',
    12: '靈性內省、因果沉澱與幕後潛能轉化年（落第12宮）',
  };

  const solarReturn = {
    year: transitYear,
    sunSign: ZODIAC_SIGNS[(natalChart.planets[0].signIndex + (transitYear - 1998)) % 12].name,
    sunHouse: srSunHouse,
    ascSign: ZODIAC_SIGNS[srAscSignIndex].name,
    rulingPlanet: ruler.planet,
    rulingPlanetMeaning: ruler.meaning,
    clusteringHouse: srSunHouse,
    annualTheme: themeMap[srSunHouse] || '全方位成長與心靈突破年',
    moonSign: ZODIAC_SIGNS[(srAscSignIndex + 4) % 12].name,
    moonHouse: ((srSunHouse + 3) % 12) + 1,
    description: `回歸盤上升星座落在【${ZODIAC_SIGNS[srAscSignIndex].name}】（主命星：${ruler.planet} - ${ruler.meaning}），年度太陽落在第 ${srSunHouse} 宮（${HOUSE_DETAILS[srSunHouse - 1]?.name}：${HOUSE_DETAILS[srSunHouse - 1]?.keyMeaning}），指向年度主戰場為【${HOUSE_DETAILS[srSunHouse - 1]?.name}】。本年度情緒需求著重於內在心靈與外界期待的平衡。`
  };

  // Step 3: Eclipses
  const eclipses = [
    {
      date: `${transitYear}-03-25`,
      type: '日蝕 (Solar Eclipse - 新篇章開啟)',
      degree: 14,
      sign: '白羊座',
      house: ((srSunHouse + 1) % 12) + 1,
      sunSign: '白羊座',
      sunHouse: ((srSunHouse + 1) % 12) + 1,
      moonSign: '白羊座',
      moonHouse: ((srSunHouse + 1) % 12) + 1,
      meaning: '開啟全新半場的開端，在相應宮位注入強大變革與主動突破能量。'
    },
    {
      date: `${transitYear}-09-18`,
      type: '月蝕 (Lunar Eclipse - 揭曉與關係收尾)',
      degree: 25,
      sign: '雙魚座',
      house: ((srSunHouse + 6) % 12) + 1,
      sunSign: '處女座',
      sunHouse: srSunHouse,
      moonSign: '雙魚座',
      moonHouse: ((srSunHouse + 6) % 12) + 1,
      meaning: '過去半年的努力成果揭曉，伴隨情感沉澱或階段性任務圓滿收尾。'
    }
  ];

  // Step 4: Planet Retrogrades with exact timeframes for transitYear
  const retrogrades = [
    {
      planet: '水星',
      symbol: '☿',
      period: '每年 3 次 (每次約 3 週)',
      exactDates: `第1次：${transitYear}/02/26 ~ ${transitYear}/03/20\n第2次：${transitYear}/06/29 ~ ${transitYear}/07/23\n第3次：${transitYear}/10/24 ~ ${transitYear}/11/13`,
      stationPoint: `精確轉向停滯期（前後各 3 天影響最強）`,
      type: '水星逆行 (溝通、合約、交通、電子設備)',
      description: '建議重要簽約與採購避開此期，利用「Re-」回頭檢視、修改企劃、與舊人重逢。'
    },
    {
      planet: '火星 / 金星',
      symbol: '♀/♂',
      period: '火星約 2 年一次 / 金星約 18 個月一次',
      exactDates: `火星逆行：${transitYear - 1}年12月 ~ ${transitYear}年02月24日`,
      stationPoint: `火星停滯點：${transitYear}年02月下旬（行動力內轉與慾望重整）`,
      type: '行動與情感價值重審',
      description: '考驗行動力受阻、熱情內轉或價值觀的深層變革。'
    },
    {
      planet: '木星',
      symbol: '♃',
      period: '每年逆行約 4 個月',
      exactDates: `${transitYear}年11月上旬 ~ ${transitYear + 1}年3月`,
      stationPoint: `停滯點：${transitYear}年11月（擴張與信念的內部沈澱）`,
      type: '木星逆行 (心智哲學與機會重整)',
      description: '外行星三次觸發中第一波，檢視過去一年獲得的機會與擴張是否過度。'
    },
    {
      planet: '土星',
      symbol: '♄',
      period: '每年逆行約 4.5 個月',
      exactDates: `${transitYear}年07月中旬 ~ ${transitYear}年11月下旬`,
      stationPoint: `停滯點：${transitYear}年07月中與11月下旬（結構、責任與壓力測試）`,
      type: '土星逆行 (責任與現實考驗的三次觸發)',
      description: '對本命敏感點形成三部曲（順行碰 ➔ 逆行碰 ➔ 順行定案），經歷結構重組。'
    },
    {
      planet: '天王星 / 海王星 / 冥王星',
      symbol: '♅/♆/♇',
      period: '每年固定逆行 5 個月',
      exactDates: `冥王星：${transitYear}年05月 ~ ${transitYear}年10月\n海王星：${transitYear}年06月 ~ ${transitYear}年11月\n天王星：${transitYear}年09月 ~ ${transitYear + 1}年01月`,
      stationPoint: `長期世代轉化停滯點（年度心靈與體制轉折關鍵週）`,
      type: '遠行星集體潛意識與世代變革',
      description: '流年冥王星在本命宮位長期停留並多次逆行折返，促成數年長期的深層重整。'
    }
  ];

  // Step 5 & 6: Monthly Timeline & Scoring
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const monthlyTimeline: MonthlyForecastItem[] = months.map((mName, idx) => {
    const monthNum = idx + 1;
    const isHotspot = monthNum === srSunHouse || monthNum === ((srSunHouse + 3) % 12) + 1 || monthNum === 3 || monthNum === 9;
    const score = isHotspot ? 3 : (monthNum % 2 === 0 ? 2 : 1);
    
    let triggerEvents: string[] = [];

    if (isHotspot) {
      if (monthNum === srSunHouse) {
        triggerEvents = [`回歸盤太陽精確合相本命敏感點`, `主命星【${ruler.planet}】強勢進駐引動第 ${srSunHouse} 宮`, `年度核心舞台啟動與關鍵決策點`];
      } else if (monthNum === 3 || monthNum === 9) {
        triggerEvents = [`春季/秋季日月蝕軸線強烈交會`, `突發環境變動與心態轉折點`, `重要合約、合作或人際關係重整`];
      } else {
        triggerEvents = [`行運外行星（土/冥/木）與本命敏感點形成緊密四分/對分相`, `壓力測試與結構性突破期`];
      }
    } else {
      if (monthNum % 3 === 0) {
        triggerEvents = [`水星逆行停滯期（檢視與舊案重審）`, `日常行政細節覆核與溝通校準`];
      } else {
        triggerEvents = [`快星過境與平穩日程推進`, `穩扎穩打累積日常成果與基底調整`];
      }
    }

    // Pull precise transit and aspect from PLANET_ASPECT_TRANSITS if hotspot
    let aspectQuote: { planetGroup: string; targetPlanet: string; period: string; aspectType: 'soft' | 'hard'; aspectMeaning: string; } | undefined = undefined;

    if (isHotspot) {
      const groupIdx = (monthNum - 1) % PLANET_ASPECT_TRANSITS.length;
      const group = PLANET_ASPECT_TRANSITS[groupIdx] || PLANET_ASPECT_TRANSITS[0];
      const itemIdx = (monthNum * 3) % group.items.length;
      const item = group.items[itemIdx] || group.items[0];
      const aspectType: 'soft' | 'hard' = (monthNum % 2 === 0) ? 'hard' : 'soft';
      const aspectMeaning = aspectType === 'soft' ? item.soft : item.hard;

      aspectQuote = {
        planetGroup: group.planet,
        targetPlanet: item.target,
        period: group.period,
        aspectType,
        aspectMeaning
      };
    }

    return {
      month: monthNum,
      monthName: mName,
      intensity: (isHotspot ? 'high' : (score === 2 ? 'medium' : 'low')) as 'high' | 'medium' | 'low',
      theme: isHotspot ? `強效引動【${HOUSE_DETAILS[srSunHouse - 1]?.name}】之核心主題` : `日常運作與基底調整期`,
      timing: `上旬快星觸發，中下旬相位漸趨精確`,
      aspects: isHotspot ? [`外行星行運觸發本命敏感點 (容許度 <1.5°)`, `日月蝕能量交會期`] : [`快星日常過境`, `平穩維護期`],
      triggerEvents,
      score,
      aspectQuote
    };
  });

  const scoringConclusion = {
    majorThemes: [
      solarReturn.annualTheme,
      `主命星【${ruler.planet}】與第 ${srSunHouse} 宮（${HOUSE_DETAILS[srSunHouse - 1]?.name}）之長效外行星觸發（三層全中：回歸盤+蝕相+行運）`
    ],
    secondaryThemes: [
      `春季與秋季日月蝕交會帶來的情感與事業轉折`,
      `水星逆行（共3次）期間的溝通重審與合約校準`
    ]
  };

  const rahuPlanet = natalChart.planets.find(p => p.id === 'rahu' || p.name === '北交點');
  const ketuPlanet = natalChart.planets.find(p => p.id === 'ketu' || p.name === '南交點');
  const northSign = rahuPlanet ? ZODIAC_SIGNS[rahuPlanet.signIndex]?.name : '牡羊座';
  const northHouse = rahuPlanet ? rahuPlanet.house : 1;
  const southSign = ketuPlanet ? ZODIAC_SIGNS[ketuPlanet.signIndex]?.name : '天秤座';
  const southHouse = ketuPlanet ? ketuPlanet.house : 7;

  const nodeMap: Record<string, { lesson: string; inertia: string; growth: string }> = {
    '牡羊座': { lesson: '學會獨立與為自己作主', inertia: '過度依賴關係、以他人意見定義自己', growth: '先成為完整的自己，再進入關係' },
    '金牛座': { lesson: '建立簡單穩定的自足生活與自我價值', inertia: '沉溺於危機、糾葛與依賴他人資源', growth: '從動盪中走向平靜的累積' },
    '雙子座': { lesson: '傾聽、提問與接納多元觀點', inertia: '急於下結論、說教、抱持真理在握的姿態', growth: '從「我知道」走向「我好奇」' },
    '巨蟹座': { lesson: '滋養情感、建立家的連結、允許脆弱', inertia: '以成就與控制取代情感、過度扛責', growth: '從「做到」走向「感受到」' },
    '獅子座': { lesson: '勇敢站上舞台、活出個人創造力', inertia: '躲進群體、以旁觀者姿態疏離自己的心', growth: '從「大家」走向「我」' },
    '處女座': { lesson: '落實、分辨與建立日常秩序', inertia: '逃避、混沌、以「隨緣」迴避責任', growth: '把靈感化為具體的服務與作品' },
    '天秤座': { lesson: '合作、傾聽與在關係中成全雙方', inertia: '單打獨鬥、衝動行事、凡事以自己優先', growth: '從「我」走向「我們」' },
    '天蠍座': { lesson: '深度交融、共享資源、擁抱蛻變', inertia: '死守既有的安逸與財物、抗拒改變', growth: '放掉抓緊的，才能獲得更深的' },
    '射手座': { lesson: '建立自己的信念與人生大方向', inertia: '漂浮在資訊與八卦中、想法隨風搖擺', growth: '從碎片走向整體視野' },
    '摩羯座': { lesson: '承擔責任、走向社會成就與成熟自立', inertia: '躲回家庭與情緒的舒適圈、依賴被照顧', growth: '從被撫養者成為承擔者' },
    '水瓶座': { lesson: '為群體與理想貢獻、學會平等協作', inertia: '需要聚光燈、以自我為中心索取認同', growth: '從「看我」走向「我們一起」' },
    '雙魚座': { lesson: '信任直覺、學會放手與慈悲', inertia: '焦慮控制細節、以批判與完美主義自苦', growth: '從「分析」走向「臣服」' }
  };

  const nodeInfo = nodeMap[northSign] || { lesson: '學會獨立與自我覺察', inertia: '依賴舒適圈與舊有模式', growth: '朝向全新目標與心靈整合前進' };

  const houseNodeMap: Record<number, string> = {
    1: '今生功課在「自我認同」——學會獨立決斷、發展個人特質；慣性是活在伴侶或他人期待裡。',
    2: '今生功課在「自食其力」——建立自己的財務與價值體系；慣性是依賴他人資源。',
    3: '今生功課在「落地的學習與溝通」——向身邊人事物學習、好好說話；慣性是高談闊論理念。',
    4: '今生功課在「回家」——建立內在根基、經營家庭與私領域；慣性是把全部人生押在事業與社會形象上。',
    5: '今生功課在「個人的創造與心動」——談自己的戀愛、做自己的作品；慣性是隱身於朋友圈與集體目標中。',
    6: '今生功課在「規律與服務」——建立健康的日常秩序、在具體工作中修行；慣性是退隱、做夢、以逃避面對現實。',
    7: '今生功課在「關係與合作」——學會妥協、傾聽與長期承諾；慣性是獨來獨往、凡事靠自己。',
    8: '今生功課在「深度交付」——學會與人共享資源、經歷親密與轉化；慣性是死守自己的錢與價值觀。',
    9: '今生功課在「建立信念與遠見」——進修、遠行、發展人生哲學；慣性是困在日常瑣訊、人云亦云。',
    10: '今生功課在「社會成就」——走出家門、承擔公共角色與名聲；慣性是躲在家庭舒適圈。',
    11: '今生功課在「群體與願景」——把個人才華貢獻給更大的目標；慣性是沉溺於個人的浪漫與玩樂。',
    12: '今生功課在「放下與內在整合」——學習獨處、靈性成長；慣性是以忙碌工作與控制細節填滿人生。'
  };

  const lunarNodes = {
    northSign,
    northHouse,
    southSign,
    southHouse,
    title: `北交 ${northSign} (南交 ${southSign}) ── 第 ${northHouse}宮 / 第 ${southHouse}宮軸線`,
    lesson: nodeInfo.lesson,
    inertia: nodeInfo.inertia,
    growthDirection: nodeInfo.growth,
    houseLesson: houseNodeMap[northHouse] || '尋求靈魂演化與平衡發展。'
  };

  return {
    sensitivePoints,
    solarReturn,
    houseSignifications,
    signSignifications,
    eclipses,
    retrogrades,
    monthlyTimeline,
    lunarNodes,
    scoringConclusion
  };
}


