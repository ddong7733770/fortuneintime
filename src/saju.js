// 사주(四柱) 계산 — 명리학의 정해진 규칙으로 계산합니다(무작위 없음). 브라우저와 빌드(Node)에서 같이 씁니다.
// - 년주: 입춘 시각 기준, 월주: 12절(절입 시각) 기준 — 절기 시각은 src/jieqi.js(천문 계산 표)
// - 일주: 진태양시 기준 날짜, 23시(자시)부터 다음 날로 봄
// - 시주: 진태양시 기준 시진 + 일간에 따른 시간(五鼠遁)
// - 태어난 나라의 표준시·서머타임 이력(예: 한국 1954~61년 UTC+8:30, 1987~88년 서머타임)을 반영
import { JIE_FIRST, JIE_MIN } from './jieqi.js';
import { COUNTRY_SOLAR, COUNTRY_ZONE } from './countries.js';

export const STEM_H = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const BRANCH_H = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const STEM_K = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
export const BRANCH_K = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
export const EL_H = ['木', '火', '土', '金', '水'];
export const TEN_H = ['比肩', '劫財', '食神', '傷官', '偏財', '正財', '偏官', '正官', '偏印', '正印'];
export const STEM_EL = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
export const BRANCH_EL = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
// 지장간: 지지 속에 숨은 기운 [오행, 비율] (여기·중기·정기, 한 달 30일 기준 비율)
export const HIDDEN = [[[4, 1]], [[4, .3], [3, .1], [2, .6]], [[2, .23], [1, .23], [0, .54]], [[0, 1]], [[0, .3], [4, .1], [2, .6]], [[2, .23], [3, .23], [1, .54]], [[1, .7], [2, .3]], [[1, .3], [0, .1], [2, .6]], [[2, .23], [4, .23], [3, .54]], [[3, 1]], [[3, .3], [1, .1], [2, .6]], [[2, .23], [0, .23], [4, .54]]];
// 오행의 창고(고지): 목→미, 화→술, 토→술, 금→축, 수→진
export const STORAGE = [7, 10, 10, 1, 4];
// 궁통보감 조후표: [일간 10][월지 12(子…亥)] = 필요한 천간 순서 (원문 대조, 2026-11)
const JOHU = {
  0: { 2: '丙癸', 3: '庚戊丁', 4: '庚壬', 5: '癸丁庚', 6: '癸丁庚', 7: '癸丁庚', 8: '丁庚壬', 9: '丁丙庚', 10: '丁癸戊', 11: '庚丁丙戊', 0: '丁庚丙', 1: '庚丁丙' },
  1: { 2: '丙癸', 3: '丙癸', 4: '癸丙戊', 5: '癸', 6: '癸丙', 7: '癸丙', 8: '丙癸己', 9: '癸丙丁', 10: '癸辛', 11: '丙戊', 0: '丙', 1: '丙' },
  2: { 2: '壬庚', 3: '壬己', 4: '壬甲', 5: '壬庚癸', 6: '壬庚', 7: '壬庚', 8: '壬戊', 9: '壬癸', 10: '甲壬', 11: '甲戊庚壬', 0: '壬戊己', 1: '壬甲' },
  3: { 2: '甲庚', 3: '庚甲', 4: '甲庚', 5: '甲庚', 6: '壬庚癸', 7: '甲壬庚', 8: '甲庚丙戊', 9: '甲庚丙戊', 10: '甲庚戊', 11: '甲庚', 0: '甲庚', 1: '甲庚' },
  4: { 2: '丙甲癸', 3: '丙甲癸', 4: '甲丙癸', 5: '甲丙癸', 6: '壬甲丙', 7: '癸丙甲', 8: '丙癸甲', 9: '丙癸', 10: '甲丙癸', 11: '甲丙', 0: '丙甲', 1: '丙甲' },
  5: { 2: '丙庚甲', 3: '甲癸丙', 4: '丙癸甲', 5: '癸丙', 6: '癸丙', 7: '癸丙', 8: '癸丙辛', 9: '癸丙辛', 10: '甲丙癸', 11: '丙甲戊', 0: '丙甲戊', 1: '丙甲戊' },
  6: { 2: '丙甲丁', 3: '丁甲庚丙', 4: '甲丁壬癸', 5: '壬戊丙丁', 6: '壬癸', 7: '丁甲', 8: '丁甲', 9: '丁甲丙', 10: '甲壬', 11: '丁丙', 0: '丁甲丙', 1: '丙丁甲' },
  7: { 2: '己壬庚', 3: '壬甲', 4: '壬甲', 5: '壬甲癸', 6: '壬己癸', 7: '壬庚甲', 8: '壬甲戊', 9: '壬甲', 10: '壬甲', 11: '壬丙', 0: '丙壬戊甲', 1: '丙壬戊己' },
  8: { 2: '庚丙戊', 3: '戊辛庚', 4: '甲庚', 5: '壬辛庚癸', 6: '癸庚辛', 7: '辛甲', 8: '戊丁', 9: '甲庚', 10: '甲丙', 11: '戊丙庚', 0: '戊丙', 1: '丙丁甲' },
  9: { 2: '辛丙', 3: '庚辛', 4: '丙辛甲', 5: '辛', 6: '庚辛壬癸', 7: '庚辛壬癸', 8: '丁', 9: '辛丙', 10: '辛甲壬癸', 11: '庚辛戊丁', 0: '丙辛', 1: '丙丁' },
};
const STEM_CH = '甲乙丙丁戊己庚辛壬癸';
// 조후 순서(오행)를 돌려줌. 원문이 조건을 단 칸은 사주를 보고 고름
export function johuList(ds, mb, { count, strength, stems }) {
  let seq = JOHU[ds][mb];
  if (ds === 1 && mb === 7 && count[3] + count[4] >= 4) seq = '丙癸';                 // 乙 未월: 柱多金水 丙火為尊
  if (ds === 1 && mb === 8 && !stems.includes(2) && !stems.includes(9)) seq = '己丙癸'; // 乙 申월: 不見丙癸 喜己土
  if (ds === 2 && mb === 11 && strength >= 1) seq = '壬甲戊庚';                        // 丙 亥월: 火旺用壬
  if (ds === 3 && mb === 2 && stems.filter(x => x === 0).length >= 2) seq = '庚甲';    // 丁 寅월: 甲多 姑用庚金
  const ss = [...seq].map(ch => STEM_CH.indexOf(ch));
  const els = []; ss.forEach(i => { const e = STEM_EL[i]; if (!els.includes(e)) els.push(e); });
  els.stems = ss;
  return els;
}
const BRANCH_MAIN = [9, 5, 0, 1, 4, 2, 3, 5, 6, 7, 4, 8]; // 지지의 본기(정기) 천간
const yang = s => s % 2 === 0;

// 십신: 일간 d 기준 천간 x의 관계 (0 비견 1 겁재 2 식신 3 상관 4 편재 5 정재 6 편관 7 정관 8 편인 9 정인)
export function tenGod(d, x) {
  const diff = (STEM_EL[x] - STEM_EL[d] + 5) % 5; // 0 같음 1 내가 생함 2 내가 극함 3 나를 극함 4 나를 생함
  return diff * 2 + (yang(d) === yang(x) ? 0 : 1);
}
export const tenGodOfBranch = (d, b) => tenGod(d, BRANCH_MAIN[b]);
export const groupOf = tg => Math.floor(tg / 2); // 0 비겁 1 식상 2 재성 3 관성 4 인성
export const elOfGroup = (dayStem, g) => (STEM_EL[dayStem] + g) % 5; // 그 십신 그룹에 해당하는 오행

// ── 시간대: 나라 시간대의 실제 UTC 오프셋(분). 서머타임·과거 변경 포함
function zoneOffset(zone, ms) {
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
      .formatToParts(new Date(ms)).filter(x => x.type !== 'literal').map(x => [x.type, +x.value]));
    return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute) - Math.floor(ms / 60000) * 60000) / 60000);
  } catch { return 540; }
}
// 그 나라 시계로 y-m-d hh:mm 이었던 순간의 UTC(ms)
export function localToUTC(y, m, d, hh, mm, zone) {
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  let ms = naive - zoneOffset(zone, naive) * 60000;
  ms = naive - zoneOffset(zone, ms) * 60000;
  return ms;
}
const stdOffsetNow = zone => Math.min(zoneOffset(zone, Date.UTC(2026, 0, 15)), zoneOffset(zone, Date.UTC(2026, 6, 15)));

// 60갑자 번호 → 천간·지지
const gz = i => ({ idx: ((i % 60) + 60) % 60, stem: (((i % 10) + 10) % 10), branch: (((i % 12) + 12) % 12) });
const gzOf = (stem, branch) => { for (let i = 0; i < 60; i++) if (i % 10 === stem && i % 12 === branch) return i; return 0; };
// 일주 (1949-10-01이 갑자일)
export function dayGZ(y, m, d) { return gz(Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1949, 9, 1)) / 864e5)); }

const JBASE = Date.UTC(1900, 0, 1);
function jieIndexAt(ms) { // ms 이전의 마지막 절 위치
  const t = (ms - JBASE) / 60000;
  let lo = 0, hi = JIE_MIN.length - 1;
  if (t < JIE_MIN[0]) return 0;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (JIE_MIN[mid] <= t) lo = mid; else hi = mid - 1; }
  return lo;
}
const jieNo = i => (JIE_FIRST + i) % 12; // 0 소한 1 입춘 …
const jieMs = i => JBASE + JIE_MIN[i] * 60000;

// 년주·월주 (순간 ms 기준)
export function yearMonthGZ(ms) {
  const i = jieIndexAt(ms);
  const mb = (jieNo(i) + 1) % 12; // 월지: 입춘→寅
  let k = i; while (jieNo(k) !== 1) k--; // 직전 입춘
  const yy = new Date(jieMs(k)).getUTCFullYear();
  const year = gz(yy - 4);
  const start = ((year.stem % 5) * 2 + 2) % 10; // 五虎遁: 寅월의 천간
  const ms_ = (start + (mb - 2 + 12) % 12) % 10;
  return { year, month: gz(gzOf(ms_, mb)), jieIdx: i };
}
const hourStem = (dayStem, h) => ((dayStem % 5) * 2 + h) % 10; // 五鼠遁

// ── 사주 원국
const cache = new Map();
export function chartOf(p) {
  const key = `${p.y}-${p.m}-${p.d}|${p.timeMode}|${p.hh}|${p.mm}|${p.sijin}|${p.country}|${p.gender}`;
  if (cache.has(key)) return cache.get(key);
  const zone = p.country === '__CN8' ? 'Etc/GMT-8' /* 검증용 */ : (COUNTRY_ZONE[p.country] || 'Asia/Seoul');
  const solarOff = COUNTRY_SOLAR[p.country] ?? 0;
  let ms, dY = p.y, dM = p.m, dD = p.d, hb = null, solarHM = null;
  if (p.timeMode === 'exact' && p.hh != null) {
    ms = localToUTC(p.y, p.m, p.d, +p.hh, +p.mm || 0, zone);
    const ts = new Date(ms + (stdOffsetNow(zone) + solarOff) * 60000); // 진태양시
    solarHM = [ts.getUTCHours(), ts.getUTCMinutes()];
    const dayStart = new Date(ts.getTime() + 60 * 60000); // 23시부터 다음 날
    dY = dayStart.getUTCFullYear(); dM = dayStart.getUTCMonth() + 1; dD = dayStart.getUTCDate();
    hb = Math.floor(((ts.getUTCHours() * 60 + ts.getUTCMinutes() + 60) % 1440) / 120);
  } else if (p.timeMode === 'sijin' && p.sijin != null) {
    hb = +p.sijin;
    ms = localToUTC(p.y, p.m, p.d, hb === 0 ? 0 : hb * 2, 0, zone);
  } else {
    ms = localToUTC(p.y, p.m, p.d, 12, 0, zone);
  }
  const { year, month, jieIdx } = yearMonthGZ(ms);
  const day = dayGZ(dY, dM, dD);
  const hour = hb === null ? null : gz(gzOf(hourStem(day.stem, hb), hb));
  const pillars = { year, month, day, hour };
  const ds = day.stem;

  // 오행 분포(가중치: 월지 3, 일지 1.5, 나머지 1 — 일간 제외 강약 계산용 / 표시용은 개수)
  const count = [0, 0, 0, 0, 0];
  const items = [];
  for (const [pos, pl] of Object.entries(pillars)) {
    if (!pl) continue;
    items.push({ pos, kind: 'stem', v: pl.stem, el: STEM_EL[pl.stem], w: pos === 'day' ? 0 : 1 });
    items.push({ pos, kind: 'branch', v: pl.branch, el: BRANCH_EL[pl.branch], w: pos === 'month' ? 3 : pos === 'day' ? 1.5 : 1 });
  }
  items.forEach(it => { count[it.el]++; });
  const me = STEM_EL[ds];
  let sup = 0, tot = 0;
  const gw = [0, 0, 0, 0, 0]; // 십신 그룹별 무게 (천간 1 + 지지는 지장간 비율대로 나눔)
  const add = (el, w) => { const g = (el - me + 5) % 5; gw[g] += w; tot += w; if (g === 0 || g === 4) sup += w; };
  for (const [pos, pl] of Object.entries(pillars)) {
    if (!pl) continue;
    if (pos !== 'day') add(STEM_EL[pl.stem], 1);
    const w = pos === 'month' ? 3 : pos === 'day' ? 1.5 : 1;
    HIDDEN[pl.branch].forEach(([el, f]) => add(el, w * f));
  }
  const ratio = tot ? sup / tot : 0.4;
  // 나를 돕는 기운(비겁·인성)은 다섯 기운 중 둘이라 평균이 약 0.4 → 0.4 근처를 중화로 봄 (약 15·25·20·25·15%로 나뉨)
  const strength = ratio >= 0.59 ? 2 : ratio >= 0.44 ? 1 : ratio >= 0.345 ? 0 : ratio >= 0.21 ? -1 : -2; // 극신강…극신약
  // 억부용신(간단): 강하면 덜어 주는 기운, 약하면 돕는 기운
  let yongG;
  if (strength > 0) yongG = gw[4] > gw[0] ? 2 : (gw[3] < 1 ? 1 : 3);        // 인성 과다 → 재성 / 비겁 과다 → 관성(없으면 식상)
  else if (strength < 0) yongG = gw[2] > gw[3] + gw[1] ? 0 : 4;              // 재성 과다 → 비겁 / 그 외 → 인성
  else yongG = [0, 1, 2, 3, 4].reduce((a, g) => (gw[g] < gw[a] ? g : a), 1); // 중화 → 가장 부족한 기운
  const yongEok = (me + yongG) % 5; // 억부 용신
  // ── 궁통보감 조후 + 우선순위 규칙 (2026-11 확정)
  //  1) 중화(0) → 조후 1순위  2) 한여름(巳午未)·한겨울(亥子丑)생 → 조후 1순위
  //  3) 단, 극신강·극신약(±2)인데 조후 1순위가 균형을 더 무너뜨리면 → 억부 유지
  //  4) 봄·가을생 → 억부, 조후 1순위가 균형에도 도움이면 희신
  const stems = Object.values(pillars).filter(Boolean).map(pl => pl.stem);
  const jList = johuList(ds, month.branch, { count, strength, stems });
  const helpful = el => { const g = (el - me + 5) % 5; return strength > 0 ? g === 1 || g === 2 || g === 3 : strength < 0 ? g === 0 || g === 4 : true; };
  const extreme = [5, 6, 7, 11, 0, 1].includes(month.branch);
  const j1 = jList[0], j2 = jList.find(e => e !== j1);
  let yong = yongEok, yongRule = 'eok';
  if (strength === 0) { yong = j1; yongRule = 'johu-mid'; }
  else if (extreme) {
    if (Math.abs(strength) === 2 && !helpful(j1)) yongRule = 'eok-extreme';
    else { yong = j1; yongRule = 'johu-season'; }
  }
  let hee = (yong + 4) % 5;
  if (yongRule === 'eok' && j1 !== yong && helpful(j1)) hee = j1;
  else if (j2 !== undefined && j2 !== yong && helpful(j2)) hee = j2;
  if (hee === (yong + 3) % 5) hee = (yong + 4) % 5; // 용신을 치는 기운은 희신이 될 수 없음
  const rest = [0, 1, 2, 3, 4].filter(e => e !== yong && e !== hee);
  // 기신: 용신을 치는 기운, 구신: 희신을 치는 기운(겹치면 남은 것), 한신: 나머지
  const gi = (yong + 3) % 5;
  const gu = rest.find(e => e !== gi && e === (hee + 3) % 5) ?? rest.find(e => e !== gi && e !== (yong + 1) % 5) ?? rest.find(e => e !== gi);
  const han = rest.find(e => e !== gi && e !== gu);
  const fav = { yong, hee, gi, gu, han };
  // 조후: 한여름생(巳午未월)에 수 부족, 한겨울생(亥子丑월)에 화 부족
  const season = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4][month.branch];
  const johu = [5, 6, 7].includes(month.branch) && count[4] === 0 ? 4 : [11, 0, 1].includes(month.branch) && count[1] === 0 ? 1 : null;

  // 십신 배치
  const tens = {};
  for (const [pos, pl] of Object.entries(pillars)) {
    if (!pl) continue;
    tens[pos] = { stem: pos === 'day' ? null : tenGod(ds, pl.stem), branch: tenGodOfBranch(ds, pl.branch) };
  }
  const tgCount = Array(10).fill(0);
  Object.values(tens).forEach(t => { if (t.stem !== null) tgCount[t.stem]++; tgCount[t.branch]++; });

  // 신살
  const branches = Object.values(pillars).filter(Boolean).map(x => x.branch);
  const trineOf = b => [[8, 0, 4], [2, 6, 10], [5, 9, 1], [11, 3, 7]].findIndex(g => g.includes(b));
  const SAL = { dohwa: [9, 3, 6, 0], yeokma: [2, 8, 11, 5], hwagae: [4, 10, 1, 7] };
  const sal = {};
  for (const [k, arr] of Object.entries(SAL)) {
    const targets = new Set([arr[trineOf(day.branch)], arr[trineOf(year.branch)]]);
    sal[k] = branches.filter((b, i) => targets.has(b)).length > 0;
  }
  const GUI = [[1, 7], [0, 8], [11, 9], [11, 9], [1, 7], [0, 8], [1, 7], [2, 6], [5, 3], [5, 3]][ds];
  sal.gwiin = branches.some(b => GUI.includes(b));

  // 대운
  let daeun = null;
  const gch = String(p.gender || '').toUpperCase()[0];
  if (gch === 'M' || gch === 'F') {
    const male = gch === 'M';
    const fwd = yang(year.stem) === male;
    const target = fwd ? jieMs(jieIdx + 1) : jieMs(jieIdx);
    const days = Math.abs(target - ms) / 864e5;
    const start = days / 3; // 3일 = 1년
    const list = [];
    for (let k = 1; k <= 10; k++) {
      const g = gz(month.idx + (fwd ? k : -k));
      list.push({ ...g, age: start + (k - 1) * 10 });
    }
    daeun = { forward: fwd, start, list };
  }
  const res = { male: gch === 'M' ? true : gch === 'F' ? false : null, pillars, dayStem: ds, me, count, gw, ratio, strength, yongG, yongEok, yongRule, johuStems: jList.stems, fav, johu, season, tens, tgCount, sal, daeun, solarHM, hasHour: !!hour, birthMs: ms };
  cache.set(key, res);
  return res;
}

// ── 지지·천간 관계
const SIX = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
const TRINES = [[8, 0, 4, 4], [11, 3, 7, 0], [2, 6, 10, 1], [5, 9, 1, 3]]; // 마지막 = 결과 오행
const PUNISH = [[2, 5], [5, 8], [2, 8], [1, 10], [10, 7], [1, 7], [0, 3]];
const HARM = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]];
const pairIn = (arr, a, b) => arr.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
export function branchRel(a, b) {
  if (pairIn(SIX, a, b)) return 'hap';
  if (Math.abs(a - b) === 6) return 'chung';
  if (a !== b && TRINES.some(g => g.slice(0, 3).includes(a) && g.slice(0, 3).includes(b))) return 'samhap';
  if (pairIn(PUNISH, a, b) || (a === b && [4, 6, 9, 11].includes(a))) return 'hyeong';
  if (pairIn(HARM, a, b)) return 'hae';
  return null;
}
export const stemHap = (a, b) => Math.abs(a - b) === 5;
export const stemChung = (a, b) => (a < 4 && b === a + 6) || (b < 4 && a === b + 6);

// 오행 길흉 값: 용신 +2, 희신 +1, 한신 0, 구신 -1, 기신 -2
export function elValue(chart, el) {
  const f = chart.fav;
  return el === f.yong ? 2 : el === f.hee ? 1 : el === f.gi ? -2 : el === f.gu ? -1 : 0;
}

// 어떤 간지(일진·월운·세운·대운)가 원국과 만날 때의 판단
const POS_W = { day: 1.6, month: 1.2, year: 0.8, hour: 0.8 };
export function evalGZ(chart, stem, branch, male) {
  const ds = chart.dayStem;
  const vs = elValue(chart, STEM_EL[stem]), vb = elValue(chart, BRANCH_EL[branch]);
  const val = 1.2 * vs + 1.0 * vb;
  const tgS = tenGod(ds, stem), tgB = tenGodOfBranch(ds, branch);
  const rels = [];
  for (const [pos, pl] of Object.entries(chart.pillars)) {
    if (!pl) continue;
    const r = branchRel(branch, pl.branch);
    if (r) rels.push({ pos, type: r, with: pl.branch });
  }
  const stemHapDay = stemHap(stem, ds), stemChungDay = stemChung(stem, ds);
  let relSum = 0;
  rels.forEach(r => { const w = POS_W[r.pos]; relSum += ({ hap: 2.2, samhap: 1.4, chung: -2.6, hyeong: -1.2, hae: -0.8 })[r.type] * w; });
  if (stemHapDay) relSum += 1.2; if (stemChungDay) relSum -= 1.4;
  const has = g => (groupOf(tgS) === g ? 1 : 0) + (groupOf(tgB) === g ? 0.7 : 0);
  const gv = g => elValue(chart, elOfGroup(ds, g));
  const sign = v => (v >= 0 ? 1 : -0.6);
  const relAt = (pos, type) => rels.some(r => r.pos === pos && r.type === type);
  // 신살: 그 날 지지가 원국의 도화·역마 자리인지
  const tri = b => [[8, 0, 4], [2, 6, 10], [5, 9, 1], [11, 3, 7]].findIndex(g => g.includes(b));
  const dohwa = [9, 3, 6, 0][tri(chart.pillars.day.branch)] === branch || [9, 3, 6, 0][tri(chart.pillars.year.branch)] === branch;
  const yeokma = [2, 8, 11, 5][tri(chart.pillars.day.branch)] === branch;
  // 넘치는 오행: 3개 이상이면서 나에게 부담이 되는 기운(용신·희신 제외)
  const exc = chart.count.map((c, e) => c >= 3 && elValue(chart, e) < 0), lack = chart.count.map(c => c === 0);
  const els = [STEM_EL[stem], BRANCH_EL[branch]];
  const wSt = STORAGE[(STEM_EL[ds] + 2) % 5];
  const wOpen = Object.values(chart.pillars).some(pl => pl && pl.branch === wSt) && Math.abs(branch - wSt) === 6;
  const loveG = male === false ? 3 : 2; // 남성 재성, 여성 관성 (모르면 재성)
  const dom = {
    wealth: 3 + 1.2 * has(2) * sign(gv(2))
      + (has(1) && chart.gw[2] >= 0.6 && chart.strength >= 0 ? 0.6 : 0)                         // 식상생재: 재능이 돈으로 이어짐(재성이 있고 감당할 힘이 있을 때)
      - (has(0) && chart.strength >= 0 ? 0.7 * has(0) : 0) + (has(0) && chart.strength < 0 && chart.gw[2] >= 2 ? 0.5 : 0) // 비겁: 신강엔 돈이 나눠지고, 재다신약엔 버틸 힘
      + (wOpen ? 0.5 : 0)                                                                      // 재물 창고가 열림(충)
      + 0.22 * val,
    work: 3 + 1.0 * has(3) * sign(gv(3)) + 0.6 * has(1) * sign(gv(1)) + 0.4 * has(4) - (relAt('month', 'chung') ? 1 : 0) + 0.22 * val,
    love: 3 + 1.1 * has(loveG) * sign(gv(loveG)) + (dohwa ? 0.8 : 0) + (relAt('day', 'hap') ? 0.8 : 0) - (relAt('day', 'chung') ? 1.2 : 0) + (stemHapDay ? 0.6 : 0) + 0.18 * val,
    health: 3 - 0.8 * els.filter(e => exc[e]).length + 0.6 * els.filter(e => lack[e]).length - (relAt('day', 'chung') ? 0.6 : 0) - (rels.some(r => r.type === 'hyeong') ? 0.4 : 0) + 0.28 * val,
  };
  const domRaw = { ...dom };
  for (const k in dom) dom[k] = Math.max(1, Math.min(5, Math.round(dom[k])));
  const raw = 62 + val * 5.5 + relSum * 2.4;
  return { stem, branch, vs, vb, val, tgS, tgB, rels, relSum, stemHapDay, stemChungDay, dohwa, yeokma, dom, domRaw, raw, wOpen };
}

// 날짜의 간지(일진) — 그날 정오 기준
export function dateGZ(y, m, d) { return dayGZ(y, m, d); }
// 그날 12시진의 시주
export const hourGZ = (dayStem, h) => ({ stem: hourStem(dayStem, h), branch: h });
// 그 달·그 해의 간지(그 날짜 정오가 속한 절기 기준)
export function monthYearGZAt(y, m, d) { return yearMonthGZ(Date.UTC(y, m - 1, d, 3)); }
