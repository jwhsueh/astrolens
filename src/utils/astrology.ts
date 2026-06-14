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
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

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
