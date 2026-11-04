import { COUNTRY_SOLAR } from './countries.js';

// Fortune in Time 운세 엔진 — 브라우저와 빌드(Node) 양쪽에서 같은 코드를 씁니다.
// 같은 입력·같은 날짜·같은 회차면 언제나 같은 결과가 나옵니다(서버 저장 없음).

export const MBTI = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
export const BLOOD = ['A','B','O','AB'];
export const COLOR_HEX = ['#E63946','#F4A261','#E9C46A','#2A9D8F','#264653','#6A4C93','#FF7FA8','#8AC926','#1982C4','#F1FAEE','#B08968','#D4AF37'];
export const CHARMS = ['achieve','noble','health','luck','peace','guard','allwell','ward','wealth','wish'];

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
const profileSeed = p => `${(p.name || '').trim().toLowerCase()}|${p.y}-${p.m}-${p.d}|${p.sijin ?? -1}|${p.gender || ''}`;

function luckyNumbers(r, lang) {
  const out = [];
  while (out.length < 6) {
    const n = 1 + Math.floor(r() * 45);
    if (out.includes(n)) continue;
    if (lang === 'zh' && String(n).includes('4')) continue;
    out.push(n);
  }
  if (lang === 'zh' && !out.some(n => String(n).includes('8'))) out[5] = [8, 18, 28, 38].find(n => !out.includes(n));
  return out.sort((a, b) => a - b);
}

// 하루 운세. turn = 운명 바꾸기 횟수(0이 기본)
export function daily(p, dateK, turn = 0, lang = 'ko') {
  const P = p.animal === undefined ? profileFrom(p) : p;
  const { y, m, d } = parseKey(dateK);
  const today = dayPillar(y, m, d);
  const r = rng(`${profileSeed(P)}#${dateK}#${turn}`);
  const rel = relation(today.branch, P.animal);
  let score = 52 + r() * 36 + rel * 4 + (P.pillar.stem % 5 === today.stem % 5 ? 3 : 0);
  if (turn > 0) score = Math.max(score, daily(P, dateK, turn - 1, lang).score + 3 + r() * 6);
  score = clamp(score, 38, 99);
  const hours = Array.from({ length: 12 }, (_, i) => clamp(score + (r() - 0.5) * 44 + relation(i, P.animal) * 5, 15, 99));
  const best = hours.indexOf(Math.max(...hours));
  const worst = hours.indexOf(Math.min(...hours));
  const dom = () => clamp(score / 20 + (r() - 0.5) * 2.4, 1, 5);
  const helperM = Math.floor(r() * 16);
  let drainM = Math.floor(r() * 16); if (drainM === helperM) drainM = (drainM + 5) % 16;
  const helperB = Math.floor(r() * 4);
  let drainB = Math.floor(r() * 4); if (drainB === helperB) drainB = (drainB + 1) % 4;
  return {
    date: dateK, turn, score, rel,
    band: score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0,
    power: clamp(70 + r() * 29, 70, 99),
    hours, best, worst,
    domains: { wealth: dom(), love: dom(), work: dom(), health: dom() },
    color: Math.floor(r() * 12),
    direction: Math.floor(r() * 8),
    numbers: luckyNumbers(r, lang),
    helper: { mbti: MBTI[helperM], blood: BLOOD[helperB] },
    drain: { mbti: MBTI[drainM], blood: BLOOD[drainB] },
    charm: CHARMS[Math.floor(r() * CHARMS.length)],
    rolls: Array.from({ length: 40 }, () => r()), // 문장 선택용 난수
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
    together, bestHour: together.indexOf(Math.max(...together)),
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
    numbers: luckyNumbers(r, lang), bestHour: Math.floor(r() * 12),
    rolls: Array.from({ length: 40 }, () => r()),
  };
}

export const pick = (arr, roll) => arr[Math.floor(roll * arr.length) % arr.length];
