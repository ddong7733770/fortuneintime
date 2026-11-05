import { COUNTRY_SOLAR } from './countries.js';
import * as SJ from './saju.js';
export { SJ };

// Fortune in Time 운세 엔진 — 브라우저와 빌드(Node) 양쪽에서 같은 코드를 씁니다.
// 같은 입력·같은 날짜·같은 회차면 언제나 같은 결과가 나옵니다(서버 저장 없음).

export const MBTI = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
export const BLOOD = ['A','B','O','AB'];
export const COLOR_HEX = ['#E63946','#F4A261','#E9C46A','#2A9D8F','#264653','#6A4C93','#FF7FA8','#8AC926','#1982C4','#F1FAEE','#B08968','#D4AF37'];
export const CHARMS = ['achieve','noble','health','luck','peace','guard','allwell','ward','wealth','wish'];
// 가장 좋은 시간·조심할 시간은 깨어 있는 시간대(6시~24시)의 시진에서만 고름: 辰(07~09)부터 亥(21~23)까지
export const DAY_SIJIN = [4, 5, 6, 7, 8, 9, 10, 11];
export function pickHour(hours, fn) {
  const v = fn(...DAY_SIJIN.map(i => hours[i]));
  return DAY_SIJIN.find(i => hours[i] === v);
}

// 문자열 → 32비트 시드
function hash(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return h1 >>> 0;
}
export function rng(seedStr) {
  let a = hash(String(seedStr));
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.round(v)));
const pad = n => String(n).padStart(2, '0');

export function dateKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
export function parseKey(k) { const [y, m, d] = k.split('-').map(Number); return { y, m, d }; }

// 6시·18시 기준 기간. 0~6시는 전날 저녁 기간에 속합니다.
export function period(now = new Date()) {
  const h = now.getHours();
  const base = new Date(now);
  let half, next;
  if (h >= 6 && h < 18) { half = 'A'; next = new Date(now); next.setHours(18, 0, 0, 0); }
  else {
    half = 'P';
    if (h < 6) base.setDate(base.getDate() - 1);
    next = new Date(base); next.setDate(next.getDate() + 1); next.setHours(6, 0, 0, 0);
  }
  return { key: `${dateKey(base)}${half}`, day: dateKey(base), next };
}

// 띠: 입춘(2월 4일) 기준
export function animalIndex(y, m, d) {
  const yy = (m < 2 || (m === 2 && d < 4)) ? y - 1 : y;
  return (((yy - 4) % 12) + 12) % 12;
}
// 별자리: 0 양자리 … 11 물고기자리
export function signIndex(m, d) {
  const starts = [[3,21],[4,20],[5,21],[6,22],[7,23],[8,23],[9,23],[10,23],[11,22],[12,22],[1,20],[2,19]];
  for (let i = 11; i >= 0; i--) {
    const [sm, sd] = starts[i];
    if (m === sm && d >= sd) return i;
  }
  const prev = { 1: 9, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8 };
  return prev[m];
}
export const SIGN_ELEMENT = [0,1,2,3,0,1,2,3,0,1,2,3]; // 불, 흙, 공기, 물

// 일주(60갑자) — 1949-10-01이 갑자일
export function dayPillar(y, m, d) {
  const diff = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1949, 9, 1)) / 864e5);
  const idx = ((diff % 60) + 60) % 60;
  return { idx, stem: idx % 10, branch: idx % 12 };
}
export const STEM_ELEMENT = [0,0,1,1,2,2,3,3,4,4]; // 목, 화, 토, 금, 수

// 시진: 0 자시(23~01) … 11 해시(21~23)
export function sijinIndex(h, min = 0) {
  const t = h * 60 + min;
  return Math.floor((((t + 60) % 1440)) / 120);
}

// 태어난 나라별 진태양시 보정(분): 전 세계 242개 국가·지역 (src/countries.js, scripts/make-countries.mjs로 생성)
export const BIRTH_COUNTRIES = COUNTRY_SOLAR;
export function correctedSijin(h, min, country) {
  const off = BIRTH_COUNTRIES[country] ?? 0;
  const t = (((h * 60 + min + off) % 1440) + 1440) % 1440;
  return sijinIndex(Math.floor(t / 60), t % 60);
}

// 지지 관계: 2 육합, 1 삼합, -2 충, 0 보통
const TRINE = [[0,4,8],[1,5,9],[2,6,10],[3,7,11]];
const HARMONY = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
export function relation(a, b) {
  if (HARMONY.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return 2;
  if (a !== b && TRINE.some(g => g.includes(a) && g.includes(b))) return 1;
  if (Math.abs(a - b) === 6) return -2;
  return 0;
}

export function profileFrom(p) {
  return {
    ...p,
    animal: animalIndex(p.y, p.m, p.d),
    sign: signIndex(p.m, p.d),
    pillar: dayPillar(p.y, p.m, p.d),
  };
}
// 계산 기준: 생년월일·시간 입력·태어난 나라·성별만 (이름·기기·IP는 넣지 않음 → 같은 정보면 어디서든 같은 결과)
export const profileSeed = p => `${p.y}-${p.m}-${p.d}|${p.timeMode || ''}|${p.timeMode === 'exact' ? `${p.hh}:${p.mm}` : ''}|${p.sijin ?? -1}|${p.country || ''}|${String(p.gender || '').toUpperCase()}`;

// 추천 복권 번호(1~45 중 6개): 용신 오행의 수(하도수: 목 3·8, 화 2·7, 토 5·10, 금 4·9, 수 1·6)로 끝나는 번호를 2개 이상 넣음
export const EL_DIGITS = [[3, 8], [2, 7], [5, 0], [4, 9], [1, 6]];
function luckyNumbers(r, lang, yongEl = null) {
  const out = [];
  const okZh = n => !(lang === 'zh' && String(n).includes('4'));
  if (yongEl !== null) {
    const pool = []; for (let n = 1; n <= 45; n++) if (EL_DIGITS[yongEl].includes(n % 10) && okZh(n)) pool.push(n);
    while (out.length < 2 && pool.length) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
  }
  while (out.length < 6) {
    const n = 1 + Math.floor(r() * 45);
    if (out.includes(n) || !okZh(n)) continue;
    out.push(n);
  }
  if (lang === 'zh' && !out.some(n => String(n).includes('8'))) out[5] = [8, 18, 28, 38].find(n => !out.includes(n));
  return out.sort((a, b) => a - b);
}

// 용신 오행 → 행운의 색(COLOR_HEX 번호)·방향(0 북 … 7 북서)
const EL_COLORS = [[7, 3], [0, 6], [2, 10], [9, 11], [8, 4]];
const EL_DIRS = [[2], [4], [5, 1], [6], [0]];
const HOUR_REL = { hap: 2, samhap: 1, chung: -3, hyeong: -1, hae: -0.5 };

// 하루 운세: 그날 일진(日辰)이 사주 원국과 만나는 관계로 계산 (src/saju.js). turn = 운명 바꾸기 횟수
// 같은 사람·같은 날짜면 언제나 같은 결과. 난수(rolls)는 같은 뜻의 문장 가운데 표현을 고르는 데만 씀
export function daily(p, dateK, turn = 0, lang = 'ko') {
  const P = p.animal === undefined ? profileFrom(p) : p;
  const { y, m, d } = parseKey(dateK);
  const today = dayPillar(y, m, d);
  const r = rng(`${profileSeed(P)}#${dateK}#${turn}`);
  const rel = relation(today.branch, P.animal);
  const chart = SJ.chartOf(P);
  const ev = SJ.evalGZ(chart, today.stem, today.branch, chart.male);
  const my = SJ.monthYearGZAt(y, m, d);
  const evM = SJ.evalGZ(chart, my.month.stem, my.month.branch, chart.male);
  const domains = { ...ev.dom };
  const avg = (domains.wealth + domains.love + domains.work + domains.health) / 4;
  let base = 0.7 * (ev.raw + 0.25 * (evM.raw - 62)) + 0.3 * (30 + avg * 14);
  // 운명 바꾸기: 용신 기운을 보강하는 개운(開運) — 점수가 오르고 가장 약한 분야가 한 단계 나아짐
  const kai = turn > 0 ? Math.min(14, 4 * turn + Math.round(r() * 2)) : 0;
  if (turn > 0) {
    for (let t = 0; t < Math.min(turn, 2); t++) {
      const k = Object.keys(domains).reduce((a, b) => (domains[b] < domains[a] ? b : a));
      domains[k] = Math.min(5, domains[k] + 1);
    }
  }
  const score = clamp(base + kai, 32, 98);
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hg = SJ.hourGZ(today.stem, i);
    let hv = SJ.elValue(chart, SJ.STEM_EL[hg.stem]) + SJ.elValue(chart, SJ.BRANCH_EL[hg.branch]);
    const rr = SJ.branchRel(hg.branch, chart.pillars.day.branch); if (rr) hv += HOUR_REL[rr];
    return clamp(score - 2 + hv * 5.5, 15, 99);
  });
  const best = pickHour(hours, Math.max);
  const worst = pickHour(hours, Math.min);
  const helperM = Math.floor(r() * 16);
  let drainM = Math.floor(r() * 16); if (drainM === helperM) drainM = (drainM + 5) % 16;
  const helperB = Math.floor(r() * 4);
  let drainB = Math.floor(r() * 4); if (drainB === helperB) drainB = (drainB + 1) % 4;
  const luckEl = turn % 2 ? chart.fav.hee : chart.fav.yong;
  const pick = arr => arr[Math.floor(r() * arr.length)];
  return {
    date: dateK, turn, score, rel,
    band: score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0,
    power: clamp(70 + r() * 29, 70, 99),
    hours, best, worst, domains,
    color: pick(EL_COLORS[luckEl]),
    direction: pick(EL_DIRS[luckEl]),
    numbers: luckyNumbers(r, lang, chart.fav.yong),
    helper: { mbti: MBTI[helperM], blood: BLOOD[helperB] },
    drain: { mbti: MBTI[drainM], blood: BLOOD[drainB] },
    charm: CHARMS[Math.floor(r() * CHARMS.length)],
    rolls: Array.from({ length: 40 }, () => r()), // 같은 뜻 안에서 문장 표현을 고르는 난수
    saju: { chart, ev, evM, kai, gz: today },
  };
}

// 일본식 '오늘의 별자리 순위' — 별자리별 오늘 점수가 높은 순서 (정적 페이지 점수와 일치)
export function signRanking(dateK) {
  const sc = Array.from({ length: 12 }, (_, i) => generic('horoscope', i, dateK).score);
  return [...Array(12).keys()].sort((a, b) => sc[b] - sc[a] || a - b); // [0]이 1위 별자리 번호
}

// 궁합
export function compat(a, b, dateK) {
  const A = profileFrom(a), B = profileFrom(b);
  const r = rng(`compat#${profileSeed(A)}#${profileSeed(B)}`);
  const rel = relation(A.animal, B.animal);
  const ea = SIGN_ELEMENT[A.sign], eb = SIGN_ELEMENT[B.sign];
  const elem = ea === eb ? 10 : (Math.abs(ea - eb) === 2 ? 6 : 0);
  const score = clamp(48 + rel * 9 + elem + r() * 22, 30, 99);
  const da = daily(A, dateK), db = daily(B, dateK);
  const together = da.hours.map((h, i) => Math.round((h + db.hours[i]) / 2));
  return {
    score, rel, elemMatch: elem > 0,
    band: score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0,
    together, bestHour: pickHour(together, Math.max),
    A, B, rolls: Array.from({ length: 16 }, () => r()),
  };
}

// 정적 페이지용: 띠·별자리·시진·혈액형별 '오늘' 운세 (개인정보 없이)
export function generic(kind, idx, dateK, lang = 'ko') {
  const r = rng(`${kind}#${idx}#${dateK}`);
  const score = clamp(50 + r() * 45, 45, 98);
  const dom = () => clamp(score / 20 + (r() - 0.5) * 2.4, 1, 5);
  return {
    score, band: score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0,
    domains: { wealth: dom(), love: dom(), work: dom(), health: dom() },
    color: Math.floor(r() * 12), direction: Math.floor(r() * 8),
    numbers: luckyNumbers(r, lang), bestHour: DAY_SIJIN[Math.floor(r() * DAY_SIJIN.length)],
    rolls: Array.from({ length: 40 }, () => r()),
  };
}

export const pick = (arr, roll) => arr[Math.floor(roll * arr.length) % arr.length];
