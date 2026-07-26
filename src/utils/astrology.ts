import { PLANET_ASPECT_TRANSITS, PLANET_RETROGRADE_GUIDE, PLANET_ANGLE_TRANSITS } from './planetInterpretations';

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
  longitude?: number;
  latitude?: number;
  timezone?: number;
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
  const safeLongitude = isFinite(longitude) ? longitude : 121.5;
  const safeLatitude = isFinite(latitude) ? Math.max(-89.9, Math.min(89.9, latitude)) : 25.03;
  const safeTimezone = isFinite(timezoneOffsetHours) ? timezoneOffsetHours : 8;

  const date = new Date(dateTimeStr);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(date.getTime()) || year < 1900 || year > 2100) {
    const fallbackDate = new Date('1998-05-18T10:30');
    year = fallbackDate.getFullYear();
    month = fallbackDate.getMonth() + 1;
    day = fallbackDate.getDate();
    hour = fallbackDate.getHours();
    minute = fallbackDate.getMinutes();
  }

  const JD = calculateJulianDate(year, month, day, hour, minute, safeTimezone);
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

  // 1. Sun geocentric longitude (Meeus Astronomical Algorithms high-accuracy formula)
  const T_sun = d / 36525;
  const L0_sun = normalizeDegrees(280.46646 + 36000.76983 * T_sun + 0.0003032 * T_sun * T_sun);
  const M_sun = normalizeDegrees(357.52911 + 35999.05029 * T_sun - 0.0001537 * T_sun * T_sun);
  const Mrad_sun = M_sun * Math.PI / 180;
  const C_sun = (1.914602 - 0.004817 * T_sun) * Math.sin(Mrad_sun) + (0.019993 - 0.000101 * T_sun) * Math.sin(2 * Mrad_sun) + 0.000289 * Math.sin(3 * Mrad_sun);
  const trueLong_sun = normalizeDegrees(L0_sun + C_sun);
  const omega_sun = (125.04 - 1934.136 * T_sun) * Math.PI / 180;
  const sunLong = normalizeDegrees(trueLong_sun - 0.00569 - 0.00478 * Math.sin(omega_sun));

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
  // Greenwich Mean Sidereal Time (GMST) in degrees
  // d = JD - 2451545.0 is fractional days from epoch J2000.0 (includes UTC time fraction)
  const GMST_deg = normalizeDegrees(280.46061837 + 360.98564736629 * d);
  const LST_deg = normalizeDegrees(GMST_deg + safeLongitude);

  // Ascendant ASC calculation
  const obliquity = 23.4393 * Math.PI / 180;
  const ramcRad = LST_deg * Math.PI / 180;
  const latRads = safeLatitude * Math.PI / 180;

  // ASC longitude formula:
  // tan(ASC) = cos(RAMC) / (-sin(RAMC) * cos(obliquity) - tan(lat) * sin(obliquity))
  const yAsc = Math.cos(ramcRad);
  const xAsc = -Math.sin(ramcRad) * Math.cos(obliquity) - Math.tan(latRads) * Math.sin(obliquity);
  let ascendant = normalizeDegrees(Math.atan2(yAsc, xAsc) * 180 / Math.PI);

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
  // tan(MC) = sin(RAMC) / (cos(RAMC) * cos(obliquity))
  const yMc = Math.sin(ramcRad);
  const xMc = Math.cos(ramcRad) * Math.cos(obliquity);
  const midheaven = normalizeDegrees(Math.atan2(yMc, xMc) * 180 / Math.PI);

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
    longitude: longitude,
    latitude: latitude,
    timezone: timezoneOffsetHours,
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

export interface MonthlyInnerPlanetTransit {
  planet: string;
  symbol: string;
  period: string;
  isRetrograde: boolean;
}

export interface AngleCrossingEvent {
  planet: string;
  symbol: string;
  angleName: string;
  houseNumber: number;
  description: string;
  exactDateStr: string;
  isRetrograde?: boolean;
}

export interface MonthlyHouseTransitDetail {
  houseNumber: number;
  houseName: string;
  outerPlanet?: {
    name: string;
    symbol: string;
    isRetrograde?: boolean;
  };
  outerPlanetAspects?: AspectQuoteItem[];
  innerPlanets: MonthlyInnerPlanetTransit[];
  angleEvents?: AngleCrossingEvent[];
  hasEclipse?: {
    type: string;
    date: string;
  };
  hasLuminaries?: {
    type: '新月' | '滿月';
    date: string;
  };
}

export interface AspectQuoteItem {
  transitingPlanet: string;
  targetPlanet: string;
  title: string;
  aspectName?: string;
  period: string;
  aspectType: 'soft' | 'hard';
  aspectMeaning: string;
  orbVal?: number;
  impactHouses?: string;
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
  aspectQuote?: AspectQuoteItem;
  aspectQuotes?: AspectQuoteItem[];
  houseTransits?: MonthlyHouseTransitDetail[];
}

export interface SolarReturnPlanet {
  name: string;
  symbol: string;
  sign: string;
  isRetrograde?: boolean;
}

export interface SolarReturnHouseDetail {
  number: number;
  name: string;
  signName: string;
  meaning: string;
  planets: SolarReturnPlanet[];
}

export interface AstrologicalPredictionReport {
  sensitivePoints: SensitivePoint[];
  solarReturn: {
    year: number;
    exactTime: string;
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
    houses: SolarReturnHouseDetail[];
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
    sign: string;
    house: number;
    houseName?: string;
    isInnerPlanet?: boolean;
    hasNatalAspects?: boolean;
    natalAspectsSummary?: string;
    guideQuote?: string;
  }[];
  monthlyTimeline: MonthlyForecastItem[];
  outerPlanetAspects?: AspectQuoteItem[];
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

/**
 * Calculates the exact moment (Julian Date and local calendar time)
 * when the transiting Sun returns to the exact longitude of the natal Sun,
 * and generates the complete Solar Return chart for that exact moment.
 */
export function calculateExactSolarReturnChart(
  natalChart: AstrologyChart,
  targetYear: number,
  locationLongitude?: number,
  locationLatitude?: number,
  timezoneOffsetHours?: number
): {
  exactDateStr: string;
  exactTimeFormatted: string;
  srJD: number;
  srChart: AstrologyChart;
} {
  const lon = locationLongitude ?? natalChart.longitude ?? 121.5;
  const lat = locationLatitude ?? natalChart.latitude ?? 25.03;
  const tz = timezoneOffsetHours ?? natalChart.timezone ?? 8;

  const natalSunLong = natalChart.planets[0]?.longitude ?? 0;

  // Extract month, day, hour, minute from natalChart local time
  let bMonth = 3;
  let bDay = 17;
  let bHour = 6;
  let bMinute = 2;

  if (natalChart.localTime && natalChart.localTime.includes('T')) {
    const [dPart, tPart] = natalChart.localTime.split('T');
    if (dPart && tPart) {
      const [mStr, dStr] = dPart.split('-').slice(1);
      const [hStr, minStr] = tPart.split(':');
      const m = parseInt(mStr, 10);
      const d = parseInt(dStr, 10);
      const h = parseInt(hStr, 10);
      const min = parseInt(minStr, 10);
      if (!isNaN(m) && !isNaN(d)) {
        bMonth = m;
        bDay = d;
        bHour = isNaN(h) ? 12 : h;
        bMinute = isNaN(min) ? 0 : min;
      }
    }
  }

  let guessY = targetYear;
  let guessM = bMonth;
  let guessD = bDay;
  let guessH = bHour;
  let guessMin = bMinute;

  let currentJD = calculateJulianDate(guessY, guessM, guessD, guessH, guessMin, tz);

  // Iterative solver for Sun longitude matching
  for (let iter = 0; iter < 10; iter++) {
    const Z = Math.floor(currentJD + 0.5);
    const F = (currentJD + 0.5) - Z;
    let A = Z;
    if (Z >= 2299161) {
      const alpha = Math.floor((Z - 1867216.25) / 36524.25);
      A = Z + 1 + alpha - Math.floor(alpha / 4);
    }
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);

    const dayDecimal = B - D - Math.floor(30.6001 * E) + F;
    const dayInt = Math.floor(dayDecimal);
    const dayFrac = dayDecimal - dayInt;

    let monthNum = (E < 14) ? (E - 1) : (E - 13);
    let yearNum = (monthNum > 2) ? (C - 4716) : (C - 4615);

    let totalUtcMin = Math.round(dayFrac * 1440);
    let utcH = Math.floor(totalUtcMin / 60);
    let utcMin = totalUtcMin % 60;

    let localH = utcH + tz;
    let localDay = dayInt;
    let localMonth = monthNum;
    let localYear = yearNum;

    if (localH >= 24) {
      localH -= 24;
      localDay += 1;
      const daysInMonth = new Date(localYear, localMonth, 0).getDate();
      if (localDay > daysInMonth) {
        localDay -= daysInMonth;
        localMonth += 1;
        if (localMonth > 12) {
          localMonth = 1;
          localYear += 1;
        }
      }
    } else if (localH < 0) {
      localH += 24;
      localDay -= 1;
      if (localDay < 1) {
        localMonth -= 1;
        if (localMonth < 1) {
          localMonth = 12;
          localYear -= 1;
        }
        const daysInPrevMonth = new Date(localYear, localMonth, 0).getDate();
        localDay = daysInPrevMonth;
      }
    }

    const isoStr = `${localYear}-${String(localMonth).padStart(2, '0')}-${String(localDay).padStart(2, '0')}T${String(localH).padStart(2, '0')}:${String(utcMin).padStart(2, '0')}`;

    const tempChart = calculateAstrology(isoStr, lon, lat, tz);
    const currentSunLong = tempChart.planets[0]?.longitude ?? 0;

    let diff = natalSunLong - currentSunLong;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;

    if (Math.abs(diff) < 0.0001) {
      break;
    }

    const deltaDays = diff / 0.9856474;
    currentJD += deltaDays;
  }

  // Final exact local date and time string from final currentJD
  const Z = Math.floor(currentJD + 0.5);
  const F = (currentJD + 0.5) - Z;
  let A = Z;
  if (Z >= 2299161) {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);

  const dayDecimal = B - D - Math.floor(30.6001 * E) + F;
  const dayInt = Math.floor(dayDecimal);
  const dayFrac = dayDecimal - dayInt;

  let monthNum = (E < 14) ? (E - 1) : (E - 13);
  let yearNum = (monthNum > 2) ? (C - 4716) : (C - 4615);

  let totalUtcMin = Math.round(dayFrac * 1440);
  let utcH = Math.floor(totalUtcMin / 60);
  let utcMin = totalUtcMin % 60;

  let localH = utcH + tz;
  let localDay = dayInt;
  let localMonth = monthNum;
  let localYear = yearNum;

  if (localH >= 24) {
    localH -= 24;
    localDay += 1;
    const daysInMonth = new Date(localYear, localMonth, 0).getDate();
    if (localDay > daysInMonth) {
      localDay -= daysInMonth;
      localMonth += 1;
      if (localMonth > 12) {
        localMonth = 1;
        localYear += 1;
      }
    }
  } else if (localH < 0) {
    localH += 24;
    localDay -= 1;
    if (localDay < 1) {
      localMonth -= 1;
      if (localMonth < 1) {
        localMonth = 12;
        localYear -= 1;
      }
      const daysInPrevMonth = new Date(localYear, localMonth, 0).getDate();
      localDay = daysInPrevMonth;
    }
  }

  const ampm = localH >= 12 ? 'PM' : 'AM';
  const displayH12 = localH % 12 === 0 ? 12 : localH % 12;
  const tzFormatted = tz >= 0 ? `UTC+${tz}` : `UTC${tz}`;

  const finalIsoStr = `${localYear}-${String(localMonth).padStart(2, '0')}-${String(localDay).padStart(2, '0')}T${String(localH).padStart(2, '0')}:${String(utcMin).padStart(2, '0')}`;
  const exactTimeFormatted = `${localYear}年${String(localMonth).padStart(2, '0')}月${String(localDay).padStart(2, '0')}日 ${String(displayH12).padStart(2, '0')}:${String(utcMin).padStart(2, '0')} ${ampm} (${tzFormatted})`;

  const srChart = calculateAstrology(finalIsoStr, lon, lat, tz);

  return {
    exactDateStr: finalIsoStr,
    exactTimeFormatted,
    srJD: currentJD,
    srChart
  };
}

/**
 * Calculates active aspects between a specific transiting outer planet
 * and natal planets for inclusion in house transit details.
 */
export function getOuterPlanetAspectQuotes(
  natalChart: AstrologyChart,
  monthlyChart: AstrologyChart,
  monthNum: number,
  outerPlanetName: string
): AspectQuoteItem[] {
  const quotes: AspectQuoteItem[] = [];
  const tp = monthlyChart.planets.find(p => p.name.includes(outerPlanetName) || outerPlanetName.includes(p.name));
  if (!tp) return quotes;

  const natalCheckList = [
    ...natalChart.planets.filter(p =>
      ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.id)
    ),
    {
      id: 'asc',
      name: '上升點 (ASC)',
      symbol: '⎈',
      longitude: natalChart.ascendant,
      house: 1
    },
    {
      id: 'mc',
      name: '天頂點 (MC)',
      symbol: 'M',
      longitude: natalChart.midheaven,
      house: 10
    }
  ];

  const orbMax = 4.5;
  const maxDays = new Date(2026, monthNum, 0).getDate() || 30;

  for (const np of natalCheckList) {
    const diff = normalizeDegrees(tp.longitude - np.longitude);
    const angle = diff > 180 ? 360 - diff : diff;

    let aspectName = '';
    let aspectType: 'soft' | 'hard' = 'soft';

    if (Math.abs(angle - 0) <= orbMax) {
      aspectName = '合相 (0°)';
      const isBenefic = ['sun', 'moon', 'venus', 'jupiter', 'mercury'].includes(tp.id) && ['sun', 'moon', 'venus', 'jupiter'].includes(np.id);
      aspectType = isBenefic ? 'soft' : 'hard';
    } else if (Math.abs(angle - 60) <= orbMax - 0.5) {
      aspectName = '六分相 (60°)';
      aspectType = 'soft';
    } else if (Math.abs(angle - 90) <= orbMax - 0.5) {
      aspectName = '四分相 (90°)';
      aspectType = 'hard';
    } else if (Math.abs(angle - 120) <= orbMax - 0.5) {
      aspectName = '三分相 (120°)';
      aspectType = 'soft';
    } else if (Math.abs(angle - 180) <= orbMax) {
      aspectName = '對分相 (180°)';
      aspectType = 'hard';
    }

    if (!aspectName) continue;

    // Calculate exact day peak within the month
    let targetAngle = 0;
    if (aspectName.includes('60°')) targetAngle = 60;
    else if (aspectName.includes('90°')) targetAngle = 90;
    else if (aspectName.includes('120°')) targetAngle = 120;
    else if (aspectName.includes('180°')) targetAngle = 180;

    let speed = 0.05;
    if (tp.id === 'jupiter') speed = 0.083;
    else if (tp.id === 'saturn') speed = 0.033;
    else if (tp.id === 'uranus') speed = 0.012;
    else if (tp.id === 'neptune') speed = 0.006;
    else if (tp.id === 'pluto') speed = 0.004;

    const tLong1 = normalizeDegrees(np.longitude + targetAngle);
    const tLong2 = normalizeDegrees(np.longitude - targetAngle);
    const d1 = Math.abs(normalizeDegrees(tp.longitude - tLong1));
    const d2 = Math.abs(normalizeDegrees(tp.longitude - tLong2));
    const exactTargetLong = (d1 <= d2) ? tLong1 : tLong2;

    let degDiff = normalizeDegrees(tp.longitude - exactTargetLong);
    if (degDiff > 180) degDiff -= 360;

    const dayOffset = - (degDiff / speed);
    const exactPeakDay = Math.min(maxDays, Math.max(1, Math.round(15 + dayOffset)));

    const degDiffDay1 = degDiff - 14 * speed;
    const degDiffDayEnd = degDiff + (maxDays - 15) * speed;

    const fullMonthActive = Math.abs(degDiffDay1) <= orbMax && Math.abs(degDiffDayEnd) <= orbMax;

    let exactPeriodStr = '';
    if (fullMonthActive) {
      // Duration >= 1 month: Do NOT show exact day dates for monthly predictions
      exactPeriodStr = `${monthNum}月全月（背景長效影響）`;
    } else {
      // Active for less than 1 month: calculate and show exact date range
      let startDay = 1;
      let endDay = maxDays;
      if (Math.abs(degDiffDay1) > orbMax) {
        startDay = Math.min(maxDays, Math.max(1, Math.round(15 + (-orbMax - degDiff) / speed)));
      }
      if (Math.abs(degDiffDayEnd) > orbMax) {
        endDay = Math.min(maxDays, Math.max(1, Math.round(15 + (orbMax - degDiff) / speed)));
      }
      if (startDay > endDay) {
        const tmp = startDay;
        startDay = endDay;
        endDay = tmp;
      }
      exactPeriodStr = `${monthNum}月${String(startDay).padStart(2, '0')}日～${monthNum}月${String(endDay).padStart(2, '0')}日（當月精確高峰：${monthNum}月${String(exactPeakDay).padStart(2, '0')}日）`;
    }

    const transitingLabel = `${tp.symbol} 流年${tp.name}`;
    const targetLabel = `本命${np.name}`;
    const title = `${tp.symbol} 流年${tp.name} ✖ 本命${np.name} (${aspectName})`;

    let aspectMeaning = '';

    const group = PLANET_ASPECT_TRANSITS.find(g => g.planet.includes(tp.name));
    if (group) {
      const item = group.items.find(i => {
        const cleanTarget = i.target.replace('✖', '').trim();
        return cleanTarget.includes(np.name) || np.name.includes(cleanTarget);
      });
      if (item) {
        aspectMeaning = aspectType === 'soft' ? item.soft : item.hard;
      }
    }

    if (!aspectMeaning) {
      if (aspectType === 'soft') {
        aspectMeaning = `流年${tp.name}過境此宮，並與本命${np.name}形成和諧相位，帶來長期建設性資源與支持。`;
      } else {
        aspectMeaning = `流年${tp.name}過境此宮，與本命${np.name}形成磨練相位，提醒注意本領域的長期結構考驗與重組。`;
      }
    }

    const opHouseNum = tp.house || 1;
    const npHouseNum = np.house || 1;
    const opHouseName = HOUSE_DETAILS[opHouseNum - 1]?.name || `第 ${opHouseNum} 宮`;
    const npHouseName = HOUSE_DETAILS[npHouseNum - 1]?.name || `第 ${npHouseNum} 宮`;
    const impactHouses = `流年${opHouseName} ✖ 本命${npHouseName}`;

    quotes.push({
      transitingPlanet: transitingLabel,
      targetPlanet: targetLabel,
      title,
      aspectName,
      period: exactPeriodStr,
      aspectType,
      aspectMeaning,
      orbVal: Math.abs(angle - 0),
      impactHouses
    });
  }

  return quotes;
}

/**
 * Calculates active monthly transit aspects for INNER PLANETS ONLY.
 * Provides explicit natal planet names and exact impact dates/timeframes within the month.
 */
export function getMonthlyAspectQuotes(
  natalChart: AstrologyChart,
  monthlyChart: AstrologyChart,
  monthNum: number,
  transitYear: number = 2026
): AspectQuoteItem[] {
  const quotes: AspectQuoteItem[] = [];

  // 1. ONLY INNER PLANETS
  const transitCheckList = monthlyChart.planets.filter(p =>
    ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.id)
  );

  const natalCheckList = [
    ...natalChart.planets.filter(p =>
      ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.id)
    ),
    {
      id: 'asc',
      name: '上升點 (ASC)',
      symbol: '⎈',
      longitude: natalChart.ascendant,
      house: 1
    },
    {
      id: 'mc',
      name: '天頂點 (MC)',
      symbol: 'M',
      longitude: natalChart.midheaven,
      house: 10
    }
  ];

  const maxDays = new Date(transitYear, monthNum, 0).getDate() || 30;

  for (const tp of transitCheckList) {
    let orbMax = 2.5;
    if (tp.id === 'mars') orbMax = 3.5;
    else if (tp.id === 'moon') orbMax = 4.0;

    let speed = 1.0;
    if (tp.id === 'sun') speed = 0.985;
    else if (tp.id === 'mercury') speed = 1.2;
    else if (tp.id === 'venus') speed = 1.0;
    else if (tp.id === 'mars') speed = 0.52;
    else if (tp.id === 'moon') speed = 13.1;

    let orbDays = 3;
    if (tp.id === 'mars') orbDays = 5;
    else if (tp.id === 'moon') orbDays = 1;
    else if (tp.id === 'mercury') orbDays = 2;

    for (const np of natalCheckList) {
      const diff = normalizeDegrees(tp.longitude - np.longitude);
      const angle = diff > 180 ? 360 - diff : diff;

      let aspectName = '';
      let aspectType: 'soft' | 'hard' = 'soft';
      let targetAspectAngle = 0;

      if (Math.abs(angle - 0) <= orbMax) {
        aspectName = '合相 (0°)';
        targetAspectAngle = 0;
        const isBenefic = ['sun', 'moon', 'venus', 'jupiter', 'mercury'].includes(tp.id) && ['sun', 'moon', 'venus', 'jupiter'].includes(np.id);
        aspectType = isBenefic ? 'soft' : 'hard';
      } else if (Math.abs(angle - 60) <= orbMax - 0.5) {
        aspectName = '六分相 (60°)';
        targetAspectAngle = 60;
        aspectType = 'soft';
      } else if (Math.abs(angle - 90) <= orbMax - 0.5) {
        aspectName = '四分相 (90°)';
        targetAspectAngle = 90;
        aspectType = 'hard';
      } else if (Math.abs(angle - 120) <= orbMax - 0.5) {
        aspectName = '三分相 (120°)';
        targetAspectAngle = 120;
        aspectType = 'soft';
      } else if (Math.abs(angle - 180) <= orbMax) {
        aspectName = '對分相 (180°)';
        targetAspectAngle = 180;
        aspectType = 'hard';
      }

      if (!aspectName) continue;

      // Calculate exact day peak in month
      const tLong1 = normalizeDegrees(np.longitude + targetAspectAngle);
      const tLong2 = normalizeDegrees(np.longitude - targetAspectAngle);
      const d1 = Math.abs(normalizeDegrees(tp.longitude - tLong1));
      const d2 = Math.abs(normalizeDegrees(tp.longitude - tLong2));
      const exactTargetLong = (d1 <= d2) ? tLong1 : tLong2;

      let degDiff = normalizeDegrees(tp.longitude - exactTargetLong);
      if (degDiff > 180) degDiff -= 360;

      const dayOffset = - (degDiff / speed);
      const exactPeakDay = Math.min(maxDays, Math.max(1, Math.round(15 + dayOffset)));
      const startDay = Math.max(1, exactPeakDay - orbDays);
      const endDay = Math.min(maxDays, exactPeakDay + orbDays);

      const exactPeriodStr = `${monthNum}月${startDay}日～${monthNum}月${endDay}日（精確高峰：${monthNum}月${exactPeakDay}日）`;

      const transitingLabel = `${tp.symbol} 流年${tp.name}`;
      const targetLabel = `本命${np.name}`;
      const title = `${tp.symbol} 流年${tp.name} ✖ 本命${np.name} (${aspectName})`;

      let aspectMeaning = '';
      const group = PLANET_ASPECT_TRANSITS.find(g => g.planet.includes(tp.name));
      if (group) {
        const item = group.items.find(i => {
          const cleanTarget = i.target.replace('✖', '').trim();
          return cleanTarget.includes(np.name) || np.name.includes(cleanTarget);
        });
        if (item) {
          aspectMeaning = aspectType === 'soft' ? item.soft : item.hard;
        }
      }

      if (!aspectMeaning) {
        if (aspectType === 'soft') {
          aspectMeaning = `流年${tp.name}與本命${np.name}形成和諧相位，帶來近期的推動能量與積極互動。`;
        } else {
          aspectMeaning = `流年${tp.name}與本命${np.name}形成考驗相位，需注意近期情境衝擊與情緒克制。`;
        }
      }

      const tpHouseNum = tp.house || 1;
      const npHouseNum = np.house || 1;
      const tpHouseName = HOUSE_DETAILS[tpHouseNum - 1]?.name || `第 ${tpHouseNum} 宮`;
      const npHouseName = HOUSE_DETAILS[npHouseNum - 1]?.name || `第 ${npHouseNum} 宮`;
      const impactHouses = `流年${tpHouseName} ✖ 本命${npHouseName}`;

      quotes.push({
        transitingPlanet: transitingLabel,
        targetPlanet: targetLabel,
        title,
        aspectName,
        period: exactPeriodStr,
        aspectType,
        aspectMeaning,
        orbVal: Math.abs(degDiff),
        impactHouses
      });
    }
  }

  // Fallback if empty
  if (quotes.length === 0) {
    const nSun = natalChart.planets.find(p => p.id === 'sun') || natalChart.planets[0];
    const nMoon = natalChart.planets.find(p => p.id === 'moon') || natalChart.planets[1];

    const nSunHouseNum = nSun.house || 1;
    const nSunHouseName = HOUSE_DETAILS[nSunHouseNum - 1]?.name || `第 ${nSunHouseNum} 宮`;
    const nMoonHouseNum = nMoon.house || 1;
    const nMoonHouseName = HOUSE_DETAILS[nMoonHouseNum - 1]?.name || `第 ${nMoonHouseNum} 宮`;

    quotes.push({
      transitingPlanet: `☉ 流年太陽`,
      targetPlanet: `本命${nSun.name}`,
      title: `☉ 流年太陽 ✖ 本命${nSun.name} (行運對應點)`,
      aspectName: '行運焦點',
      period: `${monthNum}月10日～${monthNum}月20日（精確高峰：${monthNum}月15日）`,
      aspectType: 'soft',
      aspectMeaning: `流年太陽於${monthNum}月中旬精確引動本命${nSun.name}相應宮位，開創自我實現與生活重心的能量舞台。`,
      orbVal: 1.0,
      impactHouses: `流年第一宮（命宮） ✖ 本命${nSunHouseName}`
    });

    quotes.push({
      transitingPlanet: `☿ 流年水星`,
      targetPlanet: `本命${nMoon.name}`,
      title: `☿ 流年水星 ✖ 本命${nMoon.name} (心智感應)`,
      aspectName: '和諧溝通',
      period: `${monthNum}月12日～${monthNum}月18日（精確高峰：${monthNum}月15日）`,
      aspectType: 'soft',
      aspectMeaning: `流年水星過境溝通宮位，有利於心理對話、情緒梳理與合約行政事務處置。`,
      orbVal: 1.5,
      impactHouses: `流年第三宮（兄弟宮） ✖ 本命${nMoonHouseName}`
    });
  }

  // Deduplicate by title
  const uniqueQuotesMap = new Map<string, AspectQuoteItem>();
  quotes.forEach(q => {
    if (!uniqueQuotesMap.has(q.title)) {
      uniqueQuotesMap.set(q.title, q);
    }
  });

  const uniqueQuotes = Array.from(uniqueQuotesMap.values());
  uniqueQuotes.sort((a, b) => (a.orbVal ?? 99) - (b.orbVal ?? 99));

  return uniqueQuotes.slice(0, 5);
}

/**
 * Finds the exact start year/month and end year/month across multi-year cycles
 * for an outer planet aspect active during transitYear.
 */
export function findOuterAspectExactBounds(
  opId: string,
  opName: string,
  npId: string,
  npLong: number,
  targetAngle: number,
  orbMax: number,
  transitYear: number,
  transitLongitude: number = 121.5,
  transitLatitude: number = 25.04,
  transitTimezone: number = 8
): { startY: number; startM: number; endY: number; endM: number } {
  let startY = transitYear;
  let startM = 1;
  let endY = transitYear;
  let endM = 12;

  // Search backward up to 15 years
  let prevActiveY = transitYear;
  let prevActiveM = 1;
  let inactiveYearCount = 0;

  for (let y = transitYear; y >= transitYear - 15; y--) {
    let activeInYear = false;
    for (let m = 12; m >= 1; m--) {
      const isoStr = `${y}-${String(m).padStart(2, '0')}-15T12:00`;
      const chart = calculateAstrology(isoStr, transitLongitude, transitLatitude, transitTimezone);
      const tp = chart.planets.find(p => p.id === opId || p.name.includes(opName));
      if (!tp) continue;

      const diff = normalizeDegrees(tp.longitude - npLong);
      const angle = diff > 180 ? 360 - diff : diff;
      const orb = Math.abs(angle - targetAngle);

      if (orb <= orbMax) {
        activeInYear = true;
        prevActiveY = y;
        prevActiveM = m;
        inactiveYearCount = 0;
      }
    }
    if (!activeInYear) {
      inactiveYearCount++;
      if (inactiveYearCount >= 1 && y < transitYear) {
        break;
      }
    }
  }
  startY = prevActiveY;
  startM = prevActiveM;

  // Search forward up to 15 years
  let prevEndY = transitYear;
  let prevEndM = 12;
  inactiveYearCount = 0;

  for (let y = transitYear; y <= transitYear + 15; y++) {
    let activeInYear = false;
    for (let m = 1; m <= 12; m++) {
      const isoStr = `${y}-${String(m).padStart(2, '0')}-15T12:00`;
      const chart = calculateAstrology(isoStr, transitLongitude, transitLatitude, transitTimezone);
      const tp = chart.planets.find(p => p.id === opId || p.name.includes(opName));
      if (!tp) continue;

      const diff = normalizeDegrees(tp.longitude - npLong);
      const angle = diff > 180 ? 360 - diff : diff;
      const orb = Math.abs(angle - targetAngle);

      if (orb <= orbMax) {
        activeInYear = true;
        prevEndY = y;
        prevEndM = m;
        inactiveYearCount = 0;
      }
    }
    if (!activeInYear) {
      inactiveYearCount++;
      if (inactiveYearCount >= 1 && y > transitYear) {
        break;
      }
    }
  }
  endY = prevEndY;
  endM = prevEndM;

  return { startY, startM, endY, endM };
}

/**
 * Calculates active aspects for outer planets (Jupiter, Saturn, Uranus, Neptune, Pluto)
 * throughout the transit year, identifying exact date ranges/periods and long-term trend meanings.
 */
export function getAnnualOuterPlanetAspects(
  natalChart: AstrologyChart,
  monthlyCharts: AstrologyChart[],
  transitYear: number,
  transitLongitude: number = 121.5,
  transitLatitude: number = 25.04,
  transitTimezone: number = 8
): AspectQuoteItem[] {
  const outerCheck = [
    { id: 'jupiter', name: '木星', symbol: '♃' },
    { id: 'saturn', name: '土星', symbol: '♄' },
    { id: 'uranus', name: '天王星', symbol: '♅' },
    { id: 'neptune', name: '海王星', symbol: '♆' },
    { id: 'pluto', name: '冥王星', symbol: '♇' }
  ];

  const natalCheckList = natalChart.planets.filter(p =>
    ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(p.id)
  );

  const orbMax = 4.5;
  const quotesMap = new Map<string, AspectQuoteItem>();

  for (const op of outerCheck) {
    for (const np of natalCheckList) {
      const activeInTransitYear: {
        month: number;
        aspectName: string;
        targetAngle: number;
        aspectType: 'soft' | 'hard';
        orb: number;
        opHouse: number;
      }[] = [];

      monthlyCharts.forEach((chart, idx) => {
        const monthNum = idx + 1;
        const tp = chart.planets.find(p => p.id === op.id || p.name.includes(op.name));
        if (!tp) return;

        const diff = normalizeDegrees(tp.longitude - np.longitude);
        const angle = diff > 180 ? 360 - diff : diff;

        let aspectName = '';
        let targetAngle = 0;
        let aspectType: 'soft' | 'hard' = 'soft';

        if (Math.abs(angle - 0) <= orbMax) {
          aspectName = '合相 (0°)';
          targetAngle = 0;
          const isBenefic = ['sun', 'moon', 'venus', 'jupiter', 'mercury'].includes(tp.id) && ['sun', 'moon', 'venus', 'jupiter'].includes(np.id);
          aspectType = isBenefic ? 'soft' : 'hard';
        } else if (Math.abs(angle - 60) <= orbMax - 0.5) {
          aspectName = '六分相 (60°)';
          targetAngle = 60;
          aspectType = 'soft';
        } else if (Math.abs(angle - 90) <= orbMax - 0.5) {
          aspectName = '四分相 (90°)';
          targetAngle = 90;
          aspectType = 'hard';
        } else if (Math.abs(angle - 120) <= orbMax - 0.5) {
          aspectName = '三分相 (120°)';
          targetAngle = 120;
          aspectType = 'soft';
        } else if (Math.abs(angle - 180) <= orbMax) {
          aspectName = '對分相 (180°)';
          targetAngle = 180;
          aspectType = 'hard';
        }

        if (aspectName) {
          let orbVal = Math.abs(angle - targetAngle);

          activeInTransitYear.push({
            month: monthNum,
            aspectName,
            targetAngle,
            aspectType,
            orb: orbVal,
            opHouse: tp.house || 1
          });
        }
      });

      if (activeInTransitYear.length === 0) continue;

      const primaryAspect = activeInTransitYear[0];
      const aspectName = primaryAspect.aspectName;
      const targetAngle = primaryAspect.targetAngle;
      const aspectType = primaryAspect.aspectType;

      // Find exact multi-year start and end dates across years
      const exactBounds = findOuterAspectExactBounds(
        op.id,
        op.name,
        np.id,
        np.longitude,
        targetAngle,
        orbMax,
        transitYear,
        transitLongitude,
        transitLatitude,
        transitTimezone
      );

      // REQUIREMENT 1: Must last MORE THAN 1 MONTH in total!
      const totalMonths = (exactBounds.endY - exactBounds.startY) * 12 + (exactBounds.endM - exactBounds.startM) + 1;
      if (totalMonths <= 1) continue;

      let minOrbInTransitYear = 99;
      activeInTransitYear.forEach(a => { if (a.orb < minOrbInTransitYear) minOrbInTransitYear = a.orb; });
      const peakMonthsInTransitYear = activeInTransitYear
        .filter(a => Math.abs(a.orb - minOrbInTransitYear) <= 0.4)
        .map(a => a.month);

      const peakStr = peakMonthsInTransitYear.length > 0
        ? peakMonthsInTransitYear.map(m => `${m}月`).join('、')
        : `${activeInTransitYear[0].month}月`;

      const startMonthStr = String(exactBounds.startM).padStart(2, '0');
      const endMonthStr = String(exactBounds.endM).padStart(2, '0');

      let periodStr = '';
      const isCrossYear = exactBounds.startY < transitYear || exactBounds.endY > transitYear;

      if (isCrossYear) {
        periodStr = `${exactBounds.startY}年${startMonthStr}月～${exactBounds.endY}年${endMonthStr}月（跨年度重大趨勢，問事年${transitYear}內精確高峰：${peakStr}）`;
      } else {
        periodStr = `${transitYear}年${startMonthStr}月～${transitYear}年${endMonthStr}月（重點強烈效期，精確高峰：${peakStr}）`;
      }

      // Transiting Outer Planet House ✖ Natal Target Planet House
      const opHouseNum = primaryAspect.opHouse || 1;
      const npHouseNum = np.house || 1;
      const opHouseName = HOUSE_DETAILS[opHouseNum - 1]?.name || `第 ${opHouseNum} 宮`;
      const npHouseName = HOUSE_DETAILS[npHouseNum - 1]?.name || `第 ${npHouseNum} 宮`;
      const impactHousesStr = `流年${opHouseName} ✖ 本命${npHouseName}`;

      const transitingLabel = `${op.symbol} 流年${op.name}`;
      const targetLabel = `本命${np.name}`;
      const title = `${op.symbol} 流年${op.name} ✖ 本命${np.name} (${aspectName})`;

      let aspectMeaning = '';
      const group = PLANET_ASPECT_TRANSITS.find(g => g.planet.includes(op.name));
      if (group) {
        const item = group.items.find(i => {
          const cleanTarget = i.target.replace('✖', '').trim();
          return cleanTarget.includes(np.name) || np.name.includes(cleanTarget);
        });
        if (item) {
          aspectMeaning = aspectType === 'soft' ? item.soft : item.hard;
        }
      }

      if (!aspectMeaning) {
        if (aspectType === 'soft') {
          aspectMeaning = `流年${op.name}與本命${np.name}形成和諧相位，帶來長效建設性資源與機遇扶持。`;
        } else {
          aspectMeaning = `流年${op.name}與本命${np.name}形成考驗相位，提醒注意深層結構考驗與重組。`;
        }
      }

      const key = `${op.id}-${np.id}-${aspectName}`;
      quotesMap.set(key, {
        transitingPlanet: transitingLabel,
        targetPlanet: targetLabel,
        title,
        aspectName,
        period: periodStr,
        aspectType,
        aspectMeaning: `${aspectMeaning}（作為長效趨勢，主導相應人生領域之深層轉化與階段進化）`,
        orbVal: minOrbInTransitYear,
        impactHouses: impactHousesStr
      });
    }
  }

  // --- Check Outer Planet Angle Crossings (外行星過四軸重大事件) ---
  const angles = [
    { name: '上升點 (ASC)', code: 'ASC', degree: natalChart.ascendant, house: 1 },
    { name: '天頂點 (MC)', code: 'MC', degree: natalChart.midheaven, house: 10 },
    { name: '下降點 (DSC)', code: 'DSC', degree: normalizeDegrees(natalChart.ascendant + 180), house: 7 },
    { name: '天底點 (IC)', code: 'IC', degree: normalizeDegrees(natalChart.midheaven + 180), house: 4 }
  ];

  for (const op of outerCheck) {
    for (const angle of angles) {
      const activeInTransitYear: {
        month: number;
        orb: number;
      }[] = [];

      monthlyCharts.forEach((chart, idx) => {
        const monthNum = idx + 1;
        const tp = chart.planets.find(p => p.id === op.id || p.name.includes(op.name));
        if (!tp) return;

        const diff = normalizeDegrees(tp.longitude - angle.degree);
        const orb = diff > 180 ? 360 - diff : diff;

        if (orb <= orbMax) {
          activeInTransitYear.push({
            month: monthNum,
            orb
          });
        }
      });

      if (activeInTransitYear.length === 0) continue;

      // Find exact multi-year start and end dates across years
      const exactBounds = findOuterAspectExactBounds(
        op.id,
        op.name,
        angle.code,
        angle.degree,
        0, // targetAngle = 0 for conjunction
        orbMax,
        transitYear,
        transitLongitude,
        transitLatitude,
        transitTimezone
      );

      let minOrbInTransitYear = 99;
      activeInTransitYear.forEach(a => { if (a.orb < minOrbInTransitYear) minOrbInTransitYear = a.orb; });
      const peakMonthsInTransitYear = activeInTransitYear
        .filter(a => Math.abs(a.orb - minOrbInTransitYear) <= 0.4)
        .map(a => a.month);

      const peakStr = peakMonthsInTransitYear.length > 0
        ? peakMonthsInTransitYear.map(m => `${m}月`).join('、')
        : `${activeInTransitYear[0].month}月`;

      const startMonthStr = String(exactBounds.startM).padStart(2, '0');
      const endMonthStr = String(exactBounds.endM).padStart(2, '0');

      let periodStr = '';
      const isCrossYear = exactBounds.startY < transitYear || exactBounds.endY > transitYear;

      if (isCrossYear) {
        periodStr = `${exactBounds.startY}年${startMonthStr}月～${exactBounds.endY}年${endMonthStr}月（跨年度重磅軸點轉折，問事年${transitYear}內精確高峰：${peakStr}）`;
      } else {
        periodStr = `${transitYear}年${startMonthStr}月～${transitYear}年${endMonthStr}月（重磅軸點轉折效期，精確高峰：${peakStr}）`;
      }

      const transitingLabel = `${op.symbol} 流年${op.name}`;
      const targetLabel = `本命${angle.name}`;
      const title = `⚡ [過軸重磅事件] ${op.symbol} 流年${op.name} 合相 本命${angle.name}`;

      // Meaning lookup
      const primaryMeaning = getAngleCrossingMeaning(op.name, angle.name);
      const angleGroup = PLANET_ANGLE_TRANSITS.find(g => g.angleCode === angle.code);
      const angleItem = angleGroup?.items.find(i => i.planet === op.name);
      const detailedMeaning = angleItem ? angleItem.interpretation : '';

      const aspectMeaning = `${primaryMeaning}${detailedMeaning ? `【解讀】${detailedMeaning}` : ''}（外行星過四軸乃人生結構性重大門檻，帶來根本性的轉型與生命新篇章）`;

      const key = `angle-${op.id}-${angle.code}`;
      quotesMap.set(key, {
        transitingPlanet: transitingLabel,
        targetPlanet: targetLabel,
        title,
        aspectName: '合相過軸 (0°)',
        period: periodStr,
        aspectType: op.id === 'jupiter' ? 'soft' : 'hard',
        aspectMeaning,
        orbVal: minOrbInTransitYear - 0.5, // Priority slight boost for angle crossing
        impactHouses: `本命第 ${angle.house} 宮 (${angle.name}) 軸點焦點`
      });
    }
  }

  const result = Array.from(quotesMap.values());
  const pPriority: Record<string, number> = { '冥王星': 1, '海王星': 2, '天王星': 3, '土星': 4, '木星': 5 };
  result.sort((a, b) => {
    const pA = Object.keys(pPriority).find(k => a.transitingPlanet.includes(k)) || '木星';
    const pB = Object.keys(pPriority).find(k => b.transitingPlanet.includes(k)) || '木星';
    const diffP = (pPriority[pA] || 5) - (pPriority[pB] || 5);
    if (diffP !== 0) return diffP;
    return (a.orbVal ?? 99) - (b.orbVal ?? 99);
  });

  return result;
}

/**
 * Evaluates whether an inner planet (Mercury, Venus, Mars) during its retrograde timeframe
 * forms tight aspects (0°, 60°, 90°, 120°, 180°) with natal sensitive points (Sun, Moon, Mercury, Venus, Mars, ASC, MC).
 */
export function checkInnerPlanetRetrogradeAspects(
  planetId: string,
  planetName: string,
  startIso: string,
  endIso: string,
  natalChart?: AstrologyChart,
  transitLongitude: number = 121.5,
  transitLatitude: number = 25.04,
  transitTimezone: number = 8
): { hasNatalAspects: boolean; natalAspectsSummary: string } {
  if (!natalChart) {
    return {
      hasNatalAspects: false,
      natalAspectsSummary: '未提供本命盤數據，無法進行比對。'
    };
  }

  const natalCheckList = [
    ...natalChart.planets.filter(p => ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.id)),
    { id: 'asc', name: '上升點 (ASC)', symbol: '⎈', longitude: natalChart.ascendant, house: 1 },
    { id: 'mc', name: '天頂點 (MC)', symbol: 'M', longitude: natalChart.midheaven, house: 10 }
  ];

  const startTime = new Date(`${startIso}T12:00:00`).getTime();
  const endTime = new Date(`${endIso}T12:00:00`).getTime();
  if (isNaN(startTime) || isNaN(endTime)) {
    return {
      hasNatalAspects: false,
      natalAspectsSummary: '逆行影響期間未引動本命敏感點。'
    };
  }

  const stepDays = 2;
  const sampleCount = Math.max(2, Math.floor((endTime - startTime) / (86400000 * stepDays)));

  const orbMax = 3.5;
  const aspectMap = new Map<string, {
    targetName: string;
    aspectName: string;
    minOrb: number;
    exactDateStr: string;
    monthNum: number;
    timestamp: number;
  }>();

  for (let i = 0; i <= sampleCount; i++) {
    const curTime = new Date(startTime + i * stepDays * 86400000);
    if (curTime.getTime() > endTime && i > 0) break;

    const y = curTime.getFullYear();
    const m = String(curTime.getMonth() + 1).padStart(2, '0');
    const d = String(curTime.getDate()).padStart(2, '0');
    const isoStr = `${y}-${m}-${d}T12:00`;

    const chart = calculateAstrology(isoStr, transitLongitude, transitLatitude, transitTimezone);
    const tp = chart.planets.find(p => p.id === planetId || p.name.includes(planetName));
    if (!tp) continue;

    for (const np of natalCheckList) {
      const diff = normalizeDegrees(tp.longitude - np.longitude);
      const angle = diff > 180 ? 360 - diff : diff;

      let aspectName = '';
      let targetAngle = 0;

      if (Math.abs(angle - 0) <= orbMax) { aspectName = '合相 (0°)'; targetAngle = 0; }
      else if (Math.abs(angle - 60) <= orbMax) { aspectName = '六分相 (60°)'; targetAngle = 60; }
      else if (Math.abs(angle - 90) <= orbMax) { aspectName = '四分相 (90°)'; targetAngle = 90; }
      else if (Math.abs(angle - 120) <= orbMax) { aspectName = '三分相 (120°)'; targetAngle = 120; }
      else if (Math.abs(angle - 180) <= orbMax) { aspectName = '對分相 (180°)'; targetAngle = 180; }

      if (aspectName) {
        const orb = Math.abs(angle - targetAngle);
        const key = `${np.id}-${targetAngle}`;
        const existing = aspectMap.get(key);
        const dateFormatted = `${curTime.getMonth() + 1}月${curTime.getDate()}日`;

        if (!existing || orb < existing.minOrb) {
          aspectMap.set(key, {
            targetName: np.name,
            aspectName,
            minOrb: orb,
            exactDateStr: dateFormatted,
            monthNum: curTime.getMonth() + 1,
            timestamp: curTime.getTime()
          });
        }
      }
    }
  }

  if (aspectMap.size === 0) {
    return {
      hasNatalAspects: false,
      natalAspectsSummary: '此逆行期間未與本命敏感點（日月水金火及ASC/MC）形成緊密相位（影響主要為大眾普遍背景趨勢）。'
    };
  }

  // Sort chronologically and group by month
  const sortedItems = Array.from(aspectMap.values()).sort((a, b) => a.timestamp - b.timestamp);
  const monthGroups = new Map<string, string[]>();

  for (const item of sortedItems) {
    const monthHeader = `【${item.monthNum}月】`;
    if (!monthGroups.has(monthHeader)) {
      monthGroups.set(monthHeader, []);
    }
    monthGroups.get(monthHeader)!.push(
      `• 流年${planetName} ✖ 本命${item.targetName} (${item.aspectName}) ── 約 ${item.exactDateStr} 最強`
    );
  }

  const formattedSections: string[] = [];
  for (const [header, lines] of monthGroups.entries()) {
    formattedSections.push(`${header}\n` + lines.join('\n'));
  }

  return {
    hasNatalAspects: true,
    natalAspectsSummary: formattedSections.join('\n\n')
  };
}

function getAngleCrossingMeaning(planetName: string, angleName: string): string {
  if (angleName.includes('ASC') || angleName.includes('上升')) {
    if (planetName.includes('太陽')) return '個人能量與自信發光，邁入新生命週期，展現自我主張。';
    if (planetName.includes('水星')) return '思維與溝通表達活躍，適合公開發表、學習與展現個人觀點。';
    if (planetName.includes('金星')) return '個人魅力與外在吸引力大增，人緣佳，吸引良好關係。';
    if (planetName.includes('火星')) return '行動力爆發、開創新局，但需注意情緒急躁或體能過勞。';
    if (planetName.includes('木星')) return '迎來幸運開展期，自信與視野擴張，適合勇敢跨出新步調。';
    if (planetName.includes('土星')) return '承擔長遠責任，人生結構嚴肅重組，確立成熟自我。';
    if (planetName.includes('天王星')) return '個人形象與人生軌跡突發變革，打破傳統、追求獨特自由。';
    if (planetName.includes('海王星')) return '直覺與靈感敏銳，個人風格趨向柔和感性，防方向迷惘。';
    if (planetName.includes('冥王星')) return '個人特質與人生態度經歷深層蛻變重生，展現強大影響力。';
    return '跨越上升軸點，啟動個人主體能量與生命新篇章。';
  }
  if (angleName.includes('MC') || angleName.includes('天頂')) {
    if (planetName.includes('太陽')) return '事業成果獲高度矚目，權威與社群影響力達年度高峰。';
    if (planetName.includes('水星')) return '職涯關鍵溝通、合約簽署或公開發表，獲得高層重視。';
    if (planetName.includes('金星')) return '職場貴人運極佳，獲得上級賞識，提升社會美名與形象。';
    if (planetName.includes('火星')) return '事業全力衝刺突破，爭取領導地位，注意與權威之磨合。';
    if (planetName.includes('木星')) return '職涯重大突破，迎來升遷、擴張或獲取里程碑級成果。';
    if (planetName.includes('土星')) return '事業迎來責任考驗與成熟定型期，建立不可動搖的專業地位。';
    if (planetName.includes('天王星')) return '職涯方向突發轉型、創新創業或跨界轉職開創新路。';
    if (planetName.includes('海王星')) return '事業融入靈性理想或藝術創作，避免目標模糊與過度期待。';
    if (planetName.includes('冥王星')) return '事業與社會角色經歷深層權力重組，掌握關鍵決策資源。';
    return '跨越天頂軸點，迎來事業、社會地位與人生目標關鍵顯化期。';
  }
  if (angleName.includes('DSC') || angleName.includes('下降')) {
    if (planetName.includes('太陽')) return '焦點轉向重要關係，有利一對一合作、結盟與伴侶深度互動。';
    if (planetName.includes('水星')) return '開啟關鍵一對一協商、諮商與合作條款之深度討論。';
    if (planetName.includes('金星')) return '感情運與合夥關係和諧浪漫，結識合意之事業或人生夥伴。';
    if (planetName.includes('火星')) return '夥伴關係充滿動能，注意合作競爭或溝通火花化解。';
    if (planetName.includes('木星')) return '迎來重量級貴人與優質合作夥伴，大幅拓展人際圈。';
    if (planetName.includes('土星')) return '合作與婚姻關係面臨現實承諾考驗，淘洗真摯持久夥伴。';
    if (planetName.includes('天王星')) return '人際關係突發變動，結識異業奇才或迎來新型態合作。';
    if (planetName.includes('海王星')) return '關係充滿同理心與浪漫，防過度理想化或界線模糊。';
    if (planetName.includes('冥王星')) return '人際與合夥關係經歷深層變革，建立深層信任連結。';
    return '跨越下降軸點，迎來重要關係、合作結盟與對手互動高峰期。';
  }
  if (angleName.includes('IC') || angleName.includes('天底')) {
    if (planetName.includes('太陽')) return '焦點回歸家庭與內在根基，關心家族事務與居住品質。';
    if (planetName.includes('水星')) return '進行家務討論、房產規劃或與家族長輩進行深層對話。';
    if (planetName.includes('金星')) return '美化家居環境，享受溫馨家庭時光與內在平靜安全感。';
    if (planetName.includes('火星')) return '家宅變動、裝修搬遷，需注意家族溝通分歧之脾氣。';
    if (planetName.includes('木星')) return '置產好運，家庭成員擴張，獲得家族庇佑或居住空間升級。';
    if (planetName.includes('土星')) return '承擔家庭責任，扎根內在安全感，進行房產長期規劃。';
    if (planetName.includes('天王星')) return '居住環境突發搬遷變動，或打破傳統家庭模式。';
    if (planetName.includes('海王星')) return '渴望家宅心靈港灣，美化居住氛圍，防水電家務隱患。';
    if (planetName.includes('冥王星')) return '家庭根基與內在心理經歷徹底翻新與深層安全感重建。';
    return '跨越天底軸點，深植內在安全感，迎來家宅與心理根基轉折點。';
  }
  return `流年${planetName}觸發本命${angleName}，開啟階段性生命重點。`;
}

export function getMonthlyAngleCrossings(
  natalChart: AstrologyChart,
  monthNum: number,
  transitYear: number,
  transitLongitude: number = 121.5,
  transitLatitude: number = 25.04,
  transitTimezone: number = 8
): AngleCrossingEvent[] {
  if (!natalChart) return [];

  const angles = [
    { name: '上升點 (ASC)', degree: natalChart.ascendant, house: 1 },
    { name: '天頂點 (MC)', degree: natalChart.midheaven, house: 10 },
    { name: '下降點 (DSC)', degree: normalizeDegrees(natalChart.ascendant + 180), house: 7 },
    { name: '天底點 (IC)', degree: normalizeDegrees(natalChart.midheaven + 180), house: 4 }
  ];

  const sampleDays = [1, 8, 15, 22, 28];
  const orbMax = 3.5;
  const recorded = new Map<string, { event: AngleCrossingEvent; orb: number }>();

  for (const day of sampleDays) {
    const mm = String(monthNum).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const isoStr = `${transitYear}-${mm}-${dd}T12:00`;

    let chart: AstrologyChart;
    try {
      chart = calculateAstrology(isoStr, transitLongitude, transitLatitude, transitTimezone);
    } catch {
      continue;
    }

    const testPlanets = chart.planets.filter(p => p.id !== 'moon');

    for (const p of testPlanets) {
      for (const angle of angles) {
        const diff = normalizeDegrees(p.longitude - angle.degree);
        const orb = diff > 180 ? 360 - diff : diff;

        if (orb <= orbMax) {
          const key = `${p.id}-${angle.name}`;
          const existing = recorded.get(key);
          const dateStr = `${monthNum}月${day}日前後`;

          if (!existing || orb < existing.orb) {
            recorded.set(key, {
              orb,
              event: {
                planet: p.name,
                symbol: p.symbol,
                angleName: angle.name,
                houseNumber: angle.house,
                description: getAngleCrossingMeaning(p.name, angle.name),
                exactDateStr: dateStr,
                isRetrograde: p.isRetrograde
              }
            });
          }
        }
      }
    }
  }

  return Array.from(recorded.values()).map(r => r.event);
}

export function generatePredictiveReport(
  natalChart: AstrologyChart,
  transitDateStr: string,
  transitLongitude: number = 121.5,
  transitLatitude: number = 25.03,
  transitTimezone: number = 8,
  transitTimeStr: string = '12:00'
): AstrologicalPredictionReport {
  let qYear = 2026, qMonth = 7, qDay = 25, qHour = 12, qMin = 0;
  if (transitDateStr) {
    const parts = transitDateStr.split('-');
    if (parts.length === 3) {
      qYear = parseInt(parts[0], 10) || 2026;
      qMonth = parseInt(parts[1], 10) || 7;
      qDay = parseInt(parts[2], 10) || 25;
    }
  }
  if (transitTimeStr) {
    const tParts = transitTimeStr.split(':');
    if (tParts.length >= 2) {
      const h = parseInt(tParts[0], 10);
      const m = parseInt(tParts[1], 10);
      if (!isNaN(h)) qHour = h;
      if (!isNaN(m)) qMin = m;
    }
  }

  const queryJD = calculateJulianDate(qYear, qMonth, qDay, qHour, qMin, transitTimezone);

  // Solar Return is strictly calculated based on BIRTHPLACE (natalChart location & timezone)
  const birthLon = natalChart.longitude ?? 121.5;
  const birthLat = natalChart.latitude ?? 25.03;
  const birthTz = natalChart.timezone ?? 8;

  // 1. Calculate Solar Return for query calendar year at BIRTH LOCATION
  const srResultThisYear = calculateExactSolarReturnChart(
    natalChart,
    qYear,
    birthLon,
    birthLat,
    birthTz
  );

  // 2. Logic: 若問事時間在回歸時間時候，則採用當年，若在之前，則採用去年。
  let activeSRYear = qYear;
  let isPriorToSR = false;
  if (queryJD < srResultThisYear.srJD) {
    activeSRYear = qYear - 1;
    isPriorToSR = true;
  }

  const srResult = (!isPriorToSR)
    ? srResultThisYear
    : calculateExactSolarReturnChart(
        natalChart,
        activeSRYear,
        birthLon,
        birthLat,
        birthTz
      );

  const srChart = srResult.srChart;
  const transitYear = activeSRYear;

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

  // Step 2: Exact Solar Return Moment and Chart Calculation
  const srAscIndex = Math.floor(srChart.ascendant / 30);
  const srAscSign = ZODIAC_SIGNS[srAscIndex]?.name || '牡羊座';

  const srSun = srChart.planets.find(p => p.id === 'sun') || srChart.planets[0];
  const srMoon = srChart.planets.find(p => p.id === 'moon') || srChart.planets[1];

  const srSunSign = ZODIAC_SIGNS[srSun.signIndex].name;
  const srSunHouse = srSun.house;
  const srMoonSign = ZODIAC_SIGNS[srMoon.signIndex].name;
  const srMoonHouse = srMoon.house;

  const srRuler = ascRulerMap[srAscSign] || { planet: '太陽 (Sun)', meaning: '象徵核心自我與生命活力' };

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

  const solarReturnHouses: SolarReturnHouseDetail[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseData = srChart.houses[h - 1];
    const signName = ZODIAC_SIGNS[houseData.signIndex].name;
    const houseMeaning = HOUSE_DETAILS[h - 1].keyMeaning;

    const planetsInHouse = srChart.planets
      .filter(p => p.house === h)
      .map(p => ({
        name: p.name,
        symbol: p.symbol,
        sign: ZODIAC_SIGNS[p.signIndex].name,
        isRetrograde: p.isRetrograde
      }));

    solarReturnHouses.push({
      number: h,
      name: HOUSE_DETAILS[h - 1].name,
      signName: signName,
      meaning: houseMeaning,
      planets: planetsInHouse
    });
  }

  const solarReturn = {
    year: transitYear,
    exactTime: srResult.exactTimeFormatted,
    sunSign: srSunSign,
    sunHouse: srSunHouse,
    ascSign: srAscSign,
    rulingPlanet: srRuler.planet,
    rulingPlanetMeaning: srRuler.meaning,
    clusteringHouse: srSunHouse,
    annualTheme: themeMap[srSunHouse] || '全方位成長與心靈突破年',
    moonSign: srMoonSign,
    moonHouse: srMoonHouse,
    description: `問事流年時間為【${qYear}年${String(qMonth).padStart(2, '0')}月${String(qDay).padStart(2, '0')}日 ${String(qHour).padStart(2, '0')}:${String(qMin).padStart(2, '0')}】（問事地點：經度 ${transitLongitude}° / 緯度 ${transitLatitude}° / 時區 UTC${transitTimezone >= 0 ? '+' : ''}${transitTimezone}）。${isPriorToSR ? `因問事時間尚未達到 ${qYear} 年出生地太陽回歸時刻（${srResultThisYear.exactTimeFormatted}），故運勢主軸採用前一年（${activeSRYear} 年）之太陽回歸盤。` : `因問事時間已到達/超過 ${qYear} 年出生地太陽回歸時刻（${srResultThisYear.exactTimeFormatted}），故採用當年（${activeSRYear} 年）之太陽回歸盤。`}\n\n本期精確太陽回歸時刻（依出生地考量：經度 ${birthLon}° / 緯度 ${birthLat}° / 時區 UTC${birthTz >= 0 ? '+' : ''}${birthTz}）為【${srResult.exactTimeFormatted}】。回歸盤上升星座落在【${srAscSign}】（年度主命星：${srRuler.planet}），年度太陽落在第 ${srSunHouse} 宮（${HOUSE_DETAILS[srSunHouse - 1]?.name}：${HOUSE_DETAILS[srSunHouse - 1]?.keyMeaning}），指出此回歸年度之核心舞台與現實戰場在於【${HOUSE_DETAILS[srSunHouse - 1]?.name}】。`,
    houses: solarReturnHouses
  };
  const getEclipsesForYear = (tYear: number, sunHouse: number) => {
    // Determine approximate eclipse months and signs based on year
    let m1 = 3, m2 = 9;
    let s1 = '白羊座', s2 = '雙魚座';
    let d1 = `${tYear}-03-25`, d2 = `${tYear}-09-18`;

    if (tYear === 2024) {
      m1 = 4; m2 = 9;
      s1 = '白羊座'; s2 = '雙魚座';
      d1 = `${tYear}-04-08`; d2 = `${tYear}-09-18`;
    } else if (tYear === 2025) {
      m1 = 3; m2 = 9;
      s1 = '牡羊座'; s2 = '處女座';
      d1 = `${tYear}-03-29`; d2 = `${tYear}-09-07`;
    } else if (tYear === 2026) {
      m1 = 2; m2 = 8;
      s1 = '水瓶座'; s2 = '獅子座';
      d1 = `${tYear}-02-17`; d2 = `${tYear}-08-12`;
    } else if (tYear === 2027) {
      m1 = 2; m2 = 8;
      s1 = '水瓶座'; s2 = '獅子座';
      d1 = `${tYear}-02-06`; d2 = `${tYear}-08-02`;
    } else if (tYear === 2028) {
      m1 = 1; m2 = 7;
      s1 = '水瓶座'; s2 = '巨蟹座';
      d1 = `${tYear}-01-26`; d2 = `${tYear}-07-22`;
    } else {
      // Dynamic fallback for other years
      const shift = ((tYear - 2026) % 12 + 12) % 12;
      m1 = ((2 - Math.floor(shift / 2) + 12) % 12) + 1;
      m2 = ((m1 + 5) % 12) + 1;
      d1 = `${tYear}-${String(m1).padStart(2, '0')}-15`;
      d2 = `${tYear}-${String(m2).padStart(2, '0')}-18`;
    }

    return {
      m1, m2,
      list: [
        {
          date: d1,
          type: '日蝕 (Solar Eclipse - 新篇章開啟)',
          degree: 14,
          sign: s1,
          house: ((sunHouse + 1) % 12) + 1,
          sunSign: s1,
          sunHouse: ((sunHouse + 1) % 12) + 1,
          moonSign: s1,
          moonHouse: ((sunHouse + 1) % 12) + 1,
          meaning: `在${s1}引發新篇章開啟，注入強大變革與主動突破能量。`
        },
        {
          date: d2,
          type: '月蝕 (Lunar Eclipse - 揭曉與關係收尾)',
          degree: 25,
          sign: s2,
          house: ((sunHouse + 6) % 12) + 1,
          sunSign: s2,
          sunHouse: sunHouse,
          moonSign: s2,
          moonHouse: ((sunHouse + 6) % 12) + 1,
          meaning: `在${s2}帶來階段性結果揭曉，伴隨情感沉澱或階段性任務圓滿收尾。`
        }
      ]
    };
  };

  const eclipseData = getEclipsesForYear(transitYear, srSunHouse);
  const eclipses = eclipseData.list;

  // Step 4: Planet Retrogrades tailored for transitYear
  const getRetrogradesForYear = (
    tYear: number,
    sunHouse: number,
    natalChart?: AstrologyChart,
    tLon: number = 121.5,
    tLat: number = 25.04,
    tTz: number = 8
  ) => {
    let m1Start = `${tYear}-02-26`;
    let m1End = `${tYear}-03-20`;
    let m2Start = `${tYear}-06-29`;
    let m2End = `${tYear}-07-23`;
    let m3Start = `${tYear}-10-24`;
    let m3End = `${tYear}-11-13`;

    let mDates1 = `${tYear}年02月26日 ~ ${tYear}年03月20日`;
    let mDates2 = `${tYear}年06月29日 ~ ${tYear}年07月23日`;
    let mDates3 = `${tYear}年10月24日 ~ ${tYear}年11月13日`;

    if (tYear === 2025) {
      m1Start = `${tYear}-03-15`; m1End = `${tYear}-04-07`;
      m2Start = `${tYear}-07-18`; m2End = `${tYear}-08-11`;
      m3Start = `${tYear}-11-09`; m3End = `${tYear}-11-29`;
      mDates1 = `${tYear}年03月15日 ~ ${tYear}年04月07日`;
      mDates2 = `${tYear}年07月18日 ~ ${tYear}年08月11日`;
      mDates3 = `${tYear}年11月09日 ~ ${tYear}年11月29日`;
    } else if (tYear === 2027) {
      m1Start = `${tYear}-02-09`; m1End = `${tYear}-03-03`;
      m2Start = `${tYear}-06-10`; m2End = `${tYear}-07-04`;
      m3Start = `${tYear}-10-07`; m3End = `${tYear}-10-28`;
      mDates1 = `${tYear}年02月09日 ~ ${tYear}年03月03日`;
      mDates2 = `${tYear}年06月10日 ~ ${tYear}年07月04日`;
      mDates3 = `${tYear}年10月07日 ~ ${tYear}年10月28日`;
    } else if (tYear === 2028) {
      m1Start = `${tYear}-01-24`; m1End = `${tYear}-02-15`;
      m2Start = `${tYear}-05-21`; m2End = `${tYear}-06-13`;
      m3Start = `${tYear}-09-19`; m3End = `${tYear}-10-11`;
      mDates1 = `${tYear}年01月24日 ~ ${tYear}年02月15日`;
      mDates2 = `${tYear}年05月21日 ~ ${tYear}年06月13日`;
      mDates3 = `${tYear}年09月19日 ~ ${tYear}年10月11日`;
    }

    const broadMercuryDesc = '水星逆行代表思維步調放緩，溝通、合約、交通與電子設備易有延誤或反覆。適合進行「Re-」思考：複盤（Review）、修正（Revision）、重逢舊友（Reconnect）與重審過往決策。';

    const m1Aspects = checkInnerPlanetRetrogradeAspects('mercury', '水星', m1Start, m1End, natalChart, tLon, tLat, tTz);
    const m2Aspects = checkInnerPlanetRetrogradeAspects('mercury', '水星', m2Start, m2End, natalChart, tLon, tLat, tTz);
    const m3Aspects = checkInnerPlanetRetrogradeAspects('mercury', '水星', m3Start, m3End, natalChart, tLon, tLat, tTz);

    const mvStart = tYear % 2 === 0 ? `${tYear - 1}-12-06` : `${tYear}-03-02`;
    const mvEnd = tYear % 2 === 0 ? `${tYear}-02-24` : `${tYear}-04-12`;
    const mvPlanetId = tYear % 2 === 0 ? 'mars' : 'venus';
    const mvPlanetName = tYear % 2 === 0 ? '火星' : '金星';
    const mvAspects = checkInnerPlanetRetrogradeAspects(mvPlanetId, mvPlanetName, mvStart, mvEnd, natalChart, tLon, tLat, tTz);

    const h1 = sunHouse;
    const h1Name = HOUSE_DETAILS[h1 - 1]?.name || `第 ${h1} 宮`;

    const h2 = ((sunHouse + 3) % 12) + 1;
    const h2Name = HOUSE_DETAILS[h2 - 1]?.name || `第 ${h2} 宮`;

    const h3 = ((sunHouse + 6) % 12) + 1;
    const h3Name = HOUSE_DETAILS[h3 - 1]?.name || `第 ${h3} 宮`;

    const h4 = ((sunHouse + 1) % 12) + 1;
    const h4Name = HOUSE_DETAILS[h4 - 1]?.name || `第 ${h4} 宮`;

    const h5 = ((sunHouse + 4) % 12) + 1;
    const h5Name = HOUSE_DETAILS[h5 - 1]?.name || `第 ${h5} 宮`;

    const h6 = ((sunHouse + 6) % 12) + 1;
    const h6Name = HOUSE_DETAILS[h6 - 1]?.name || `第 ${h6} 宮`;

    const h7 = ((sunHouse + 9) % 12) + 1;
    const h7Name = HOUSE_DETAILS[h7 - 1]?.name || `第 ${h7} 宮`;

    return [
      {
        planet: '水星',
        symbol: '☿',
        period: '第1次逆行（春季）',
        exactDates: mDates1,
        stationPoint: `精確轉向停滯期（前後各 3 天影響最強）`,
        type: '水星逆行 (第 1 次)',
        description: broadMercuryDesc,
        sign: ZODIAC_SIGNS[(sunHouse + 0) % 12].name,
        house: h1,
        houseName: h1Name,
        isInnerPlanet: true,
        hasNatalAspects: m1Aspects.hasNatalAspects,
        natalAspectsSummary: m1Aspects.natalAspectsSummary
      },
      {
        planet: '水星',
        symbol: '☿',
        period: '第2次逆行（夏季）',
        exactDates: mDates2,
        stationPoint: `精確轉向停滯期（前後各 3 天影響最強）`,
        type: '水星逆行 (第 2 次)',
        description: broadMercuryDesc,
        sign: ZODIAC_SIGNS[(sunHouse + 4) % 12].name,
        house: h2,
        houseName: h2Name,
        isInnerPlanet: true,
        hasNatalAspects: m2Aspects.hasNatalAspects,
        natalAspectsSummary: m2Aspects.natalAspectsSummary
      },
      {
        planet: '水星',
        symbol: '☿',
        period: '第3次逆行（秋季）',
        exactDates: mDates3,
        stationPoint: `精確轉向停滯期（前後各 3 天影響最強）`,
        type: '水星逆行 (第 3 次)',
        description: broadMercuryDesc,
        sign: ZODIAC_SIGNS[(sunHouse + 8) % 12].name,
        house: h3,
        houseName: h3Name,
        isInnerPlanet: true,
        hasNatalAspects: m3Aspects.hasNatalAspects,
        natalAspectsSummary: m3Aspects.natalAspectsSummary
      },
      {
        planet: '火星 / 金星',
        symbol: '♀/♂',
        period: '火星約 2 年一次 / 金星約 18 個月一次',
        exactDates: tYear % 2 === 0 ? `火星逆行：${tYear - 1}年12月 ~ ${tYear}年02月24日` : `金星逆行：${tYear}年03月 ~ ${tYear}年04月`,
        stationPoint: `停滯點：${tYear}年轉換期（行動力內轉與價值重整）`,
        type: '行動與情感價值重審',
        description: '考驗行動力受阻、熱情內轉或價值觀的深層變革。',
        sign: ZODIAC_SIGNS[(sunHouse + 2) % 12].name,
        house: h4,
        houseName: h4Name,
        guideQuote: `金星：${PLANET_RETROGRADE_GUIDE.find(g => g.planet === '金星')?.houses[h4] || ''}\n火星：${PLANET_RETROGRADE_GUIDE.find(g => g.planet === '火星')?.houses[h4] || ''}`,
        isInnerPlanet: true,
        hasNatalAspects: mvAspects.hasNatalAspects,
        natalAspectsSummary: mvAspects.natalAspectsSummary
      },
      {
        planet: '木星',
        symbol: '♃',
        period: '每年逆行約 4 個月',
        exactDates: `${tYear}年11月上旬 ~ ${tYear + 1}年03月`,
        stationPoint: `停滯點：${tYear}年11月（擴張與信念的內部沈澱）`,
        type: '木星逆行 (心智哲學與機會重整)',
        description: '外行星三次觸發中第一波，檢視過去一年獲得的機會與擴張是否過度。',
        sign: ZODIAC_SIGNS[(sunHouse + 7) % 12].name,
        house: h5,
        houseName: h5Name,
        guideQuote: PLANET_RETROGRADE_GUIDE.find(g => g.planet === '木星')?.houses[h5] || '',
        isInnerPlanet: false
      },
      {
        planet: '土星',
        symbol: '♄',
        period: '每年逆行約 4.5 個月',
        exactDates: `${tYear}年07月中旬 ~ ${tYear}年11月下旬`,
        stationPoint: `停滯點：${tYear}年07月中與11月下旬（結構、責任與壓力測試）`,
        type: '土星逆行 (責任與現實考驗的三次觸發)',
        description: '對本命敏感點形成三部曲（順行碰 ➔ 逆行碰 ➔ 順行定案），經歷結構重組。',
        sign: ZODIAC_SIGNS[(sunHouse + 9) % 12].name,
        house: h6,
        houseName: h6Name,
        guideQuote: PLANET_RETROGRADE_GUIDE.find(g => g.planet === '土星')?.houses[h6] || '',
        isInnerPlanet: false
      },
      {
        planet: '天王星 / 海王星 / 冥王星',
        symbol: '♅/♆/♇',
        period: '每年固定逆行 5 個月',
        exactDates: `冥王星：${tYear}年05月 ~ ${tYear}年10月\n海王星：${tYear}年06月 ~ ${tYear}年11月\n天王星：${tYear}年09月 ~ ${tYear + 1}年01月`,
        stationPoint: `長期世代轉化停滯點（年度心靈與體制轉折關鍵週）`,
        type: '遠行星集體潛意識與世代變革',
        description: '流年冥王星在本命宮位長期停留並多次逆行折返，促成數年長期的深層重整。',
        sign: ZODIAC_SIGNS[(sunHouse + 10) % 12].name,
        house: h7,
        houseName: h7Name,
        guideQuote: `天王星：${PLANET_RETROGRADE_GUIDE.find(g => g.planet === '天王星')?.houses[h7] || ''}\n海王星：${PLANET_RETROGRADE_GUIDE.find(g => g.planet === '海王星')?.houses[h7] || ''}\n冥王星：${PLANET_RETROGRADE_GUIDE.find(g => g.planet === '冥王星')?.houses[h7] || ''}`,
        isInnerPlanet: false
      }
    ];
  };

  const retrogrades = getRetrogradesForYear(transitYear, srSunHouse, natalChart, transitLongitude, transitLatitude, transitTimezone);

  // Step 5 & 6: Monthly Timeline & Scoring (Calculated at query/transit location)
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const allMonthlyCharts: AstrologyChart[] = [];
  const monthlyTimeline: MonthlyForecastItem[] = months.map((mName, idx) => {
    const monthNum = idx + 1;

    // Dynamically calculate monthly transit chart for this month at query location
    const mIsoStr = `${activeSRYear}-${String(monthNum).padStart(2, '0')}-15T12:00`;
    const monthlyChart = calculateAstrology(mIsoStr, transitLongitude, transitLatitude, transitTimezone);
    allMonthlyCharts.push(monthlyChart);

    const mSun = monthlyChart.planets.find(p => p.id === 'sun') || monthlyChart.planets[0];
    // Calculate Sun's transit house relative to Solar Return chart's ascendant
    const currentSunHouse = Math.floor(normalizeDegrees(mSun.longitude - srChart.ascendant) / 30) + 1;
    const currentSunSign = ZODIAC_SIGNS[mSun.signIndex]?.name || '';

    // Hotspot conditions: current Sun house month at query location, eclipse months for this transitYear, or square/opposite house months
    const isHotspot = monthNum === currentSunHouse ||
                      monthNum === ((currentSunHouse + 3) % 12) + 1 ||
                      monthNum === ((currentSunHouse + 9) % 12) + 1 ||
                      monthNum === eclipseData.m1 ||
                      monthNum === eclipseData.m2;

    const score = isHotspot ? 3 : (monthNum % 2 === 0 ? 2 : 1);
    let triggerEvents: string[] = [];

    if (isHotspot) {
      if (monthNum === currentSunHouse) {
        triggerEvents = [`問事地點行運太陽精確進駐第 ${currentSunHouse} 宮 (${currentSunSign})`, `主命星【${ruler.planet}】強勢引動第 ${currentSunHouse} 宮`, `問事地點核心舞台與決策焦點啟動`];
      } else if (monthNum === eclipseData.m1 || monthNum === eclipseData.m2) {
        triggerEvents = [`${activeSRYear}年日月蝕軸線強烈交會問事地點第 ${currentSunHouse} 宮`, `突發環境變動與心態轉折點`, `重要合約、合作或人際關係重整`];
      } else {
        triggerEvents = [`問事地點行運外行星（土/冥/木）與本命敏感點形成緊密四分/對分相`, `壓力測試與結構性突破期`];
      }
    } else {
      if (monthNum % 3 === 0) {
        triggerEvents = [`水星逆行停滯期（檢視與舊案重審）`, `日常行政細節覆核與溝通校準`];
      } else {
        triggerEvents = [];
      }
    }

    // Calculate ALL Monthly Transit Aspect Quotes dynamically comparing monthlyChart vs natalChart (INNER PLANETS ONLY)
    const aspectQuotes = getMonthlyAspectQuotes(natalChart, monthlyChart, monthNum, activeSRYear);
    const aspectQuote = aspectQuotes[0];

    // Calculate Monthly Angle Crossings (行星過四軸事件)
    const angleCrossings = getMonthlyAngleCrossings(
      natalChart,
      monthNum,
      transitYear,
      transitLongitude,
      transitLatitude,
      transitTimezone
    );

    if (angleCrossings.length > 0) {
      angleCrossings.forEach(ae => {
        triggerEvents.push(`⚡ [行星過軸] 流年${ae.planet}${ae.isRetrograde ? ' (逆行)' : ''}合相本命${ae.angleName} (${ae.exactDateStr})`);
      });
    }

    // Calculate Monthly House Transits for planets at query location relative to SR chart houses
    const outerNames = ['木星', '土星', '天王星', '海王星', '冥王星'];
    const outerPlanetsList = monthlyChart.planets.filter(p => outerNames.includes(p.name));

    // Sun house at query location for this month
    const sh = currentSunHouse;
    // Opposite house for Full Moon
    const fh = ((sh + 5) % 12) + 1;

    const houseTransitsMap = new Map<number, MonthlyHouseTransitDetail>();

    const getOrCreateHouseDetail = (hNum: number) => {
      if (houseTransitsMap.has(hNum)) return houseTransitsMap.get(hNum)!;

      const hName = HOUSE_DETAILS[hNum - 1]?.name || `第${hNum}宮`;

      // Find outer planet in this house if any
      const opInHouse = outerPlanetsList.find(op => {
        const opHouse = Math.floor(normalizeDegrees(op.longitude - srChart.ascendant) / 30) + 1;
        return opHouse === hNum;
      });

      // Calculate active outer planet aspects if outer planet is present
      let outerPlanetAspects: AspectQuoteItem[] | undefined = undefined;
      if (opInHouse) {
        const opa = getOuterPlanetAspectQuotes(natalChart, monthlyChart, monthNum, opInHouse.name);
        if (opa.length > 0) outerPlanetAspects = opa;
      }

      const innerPlanets: MonthlyInnerPlanetTransit[] = [];
      const innerIds = ['sun', 'mercury', 'venus', 'mars'];
      monthlyChart.planets
        .filter(p => {
          if (!innerIds.includes(p.id)) return false;
          const ipHouse = Math.floor(normalizeDegrees(p.longitude - srChart.ascendant) / 30) + 1;
          return ipHouse === hNum;
        })
        .forEach(ip => {
          innerPlanets.push({
            planet: ip.name,
            symbol: ip.symbol,
            period: `${monthNum}月 (過境星座: ${ZODIAC_SIGNS[ip.signIndex]?.name || ''}${ip.isRetrograde ? ' - 逆行' : ''})`,
            isRetrograde: ip.isRetrograde
          });
        });

      // Filter angle crossing events for this house
      const houseAngleEvents = angleCrossings.filter(ae => ae.houseNumber === hNum);

      // Check Eclipse
      let hasEclipse: { type: string; date: string } | undefined = undefined;
      if (monthNum === eclipseData.m1 && hNum === ((currentSunHouse + 1) % 12) + 1) {
        hasEclipse = { type: '日食 (新能量突破)', date: `${monthNum}月15日` };
      } else if (monthNum === eclipseData.m2 && hNum === ((currentSunHouse + 6) % 12) + 1) {
        hasEclipse = { type: '月食 (關係收尾驗收)', date: `${monthNum}月18日` };
      }

      // Check New Moon / Full Moon
      let hasLuminaries: { type: '新月' | '滿月'; date: string } | undefined = undefined;
      if (hNum === sh) {
        hasLuminaries = { type: '新月', date: `${monthNum}月08日` };
      } else if (hNum === fh) {
        hasLuminaries = { type: '滿月', date: `${monthNum}月23日` };
      }

      const houseSignName = opInHouse ? ZODIAC_SIGNS[opInHouse.signIndex]?.name : ZODIAC_SIGNS[srChart.houses[hNum - 1]?.signIndex]?.name;

      const detail: MonthlyHouseTransitDetail = {
        houseNumber: hNum,
        houseName: `${hName}${houseSignName ? ` (${houseSignName})` : ''}`,
        outerPlanet: opInHouse
          ? { name: opInHouse.name, symbol: opInHouse.symbol, isRetrograde: opInHouse.isRetrograde }
          : { name: '太陽 (行運焦點)', symbol: '☉', isRetrograde: false },
        outerPlanetAspects,
        innerPlanets,
        angleEvents: houseAngleEvents.length > 0 ? houseAngleEvents : undefined,
        hasEclipse,
        hasLuminaries
      };

      houseTransitsMap.set(hNum, detail);
      return detail;
    };

    // 1. Add houses with outer planets
    outerPlanetsList.forEach(op => {
      const hNum = Math.floor(normalizeDegrees(op.longitude - srChart.ascendant) / 30) + 1;
      getOrCreateHouseDetail(hNum);
    });

    // 2. Add houses with angle crossing events
    angleCrossings.forEach(ae => {
      getOrCreateHouseDetail(ae.houseNumber);
    });

    // 3. Guarantee currentSunHouse (focal house for the month) is included
    getOrCreateHouseDetail(currentSunHouse);

    // 4. Add full moon house
    getOrCreateHouseDetail(fh);

    const houseTransits = Array.from(houseTransitsMap.values()).sort((a, b) => a.houseNumber - b.houseNumber);

    return {
      month: monthNum,
      monthName: mName,
      intensity: (isHotspot ? 'high' : (score === 2 ? 'medium' : 'low')) as 'high' | 'medium' | 'low',
      theme: isHotspot ? `強效引動問事地點第 ${currentSunHouse} 宮【${HOUSE_DETAILS[currentSunHouse - 1]?.name}】` : `平穩期`,
      timing: `上旬快星觸發，中下旬相位漸趨精確`,
      aspects: isHotspot ? [`外行星行運過境問事地點星盤`, `日月蝕能量交會期`] : [`快星日常過境`, `平穩維護期`],
      triggerEvents,
      score,
      aspectQuote,
      aspectQuotes,
      houseTransits
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

  const outerPlanetAspects = getAnnualOuterPlanetAspects(natalChart, allMonthlyCharts, activeSRYear, transitLongitude, transitLatitude, transitTimezone);

  return {
    sensitivePoints,
    solarReturn,
    houseSignifications,
    signSignifications,
    eclipses,
    retrogrades,
    monthlyTimeline,
    outerPlanetAspects,
    lunarNodes,
    scoringConclusion
  };
}


