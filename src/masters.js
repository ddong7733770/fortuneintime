// 명인 풀이용 계산 (해운정사 시운 · 하나 인연 · 도한 일·사업)
// 모든 값은 사주 원국(chart)과 그날 운세(daily) 결과에서만 나옴. 같은 사람·같은 날이면 언제나 같은 결과
import * as SJ from './saju.js';

export const MASTERS = ['haewoon', 'hana', 'dohan'];

// 하나·도한 중 오늘 무료로 보는 명인: 날짜만으로 정함(모든 사용자에게 같음)
export function freeMaster(dateK) {
  let h = 2166136261;
  for (const ch of `free#${dateK}`) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 2) ? 'dohan' : 'hana';
}

// 그룹(0 비겁 1 식상 2 재성 3 관성 4 인성)이 이 사람에게 도움이 되는 기운인지
const favG = (chart, g) => SJ.elValue(chart, SJ.elOfGroup(chart.dayStem, g)) >= 0;

// ── 해운정사 시운: 12시진 상세
// 점수는 daily()의 hours와 같은 값(해운정사·도한이 같은 숫자를 씀)
export function hourDetail(chart, d) {
  const ds = d.saju.gz.stem;
  return d.hours.map((score, i) => {
    const hg = SJ.hourGZ(ds, i);
    const tg = SJ.tenGod(chart.dayStem, hg.stem);
    const grp = SJ.groupOf(tg);
    return {
      i, score, stem: hg.stem, branch: hg.branch, tg, grp,
      fav: favG(chart, grp),
      rel: SJ.branchRel(hg.branch, chart.pillars.day.branch), // 내 일지(나와 배우자 자리)와의 관계
      band: score >= 80 ? 3 : score >= 66 ? 2 : score >= 50 ? 1 : 0,
      sleep: i === 0 || i === 1 || i === 2, // 23~05시
      dawn: i === 3,                         // 05~07시
    };
  });
}

// ── 도한: 보고·회의·계약하기 좋은 시간 (07~21시 안에서)
// 보고: 윗사람·평가 = 관성(3), 문서·정리 = 인성(4) / 회의: 표현 = 식상(1), 협의 = 비겁(0), 일지와 합 / 계약: 재물 = 재성(2), 문서 = 인성(4), 충 없는 시간
const WORK_PREF = { report: [3, 4], meeting: [1, 0], contract: [2, 4] };
export function workHours(chart, d) {
  const hs = hourDetail(chart, d).filter(h => h.i >= 4 && h.i <= 10);
  const out = {}, used = {};
  for (const [kind, pref] of Object.entries(WORK_PREF)) {
    const val = h => {
      let v = h.score;
      const pi = pref.indexOf(h.grp);
      if (pi >= 0) v += (h.fav ? 12 : 3) - pi * 5; // 첫째 기운에 더 큰 가중치
      if (h.rel === 'hap' || h.rel === 'samhap') v += kind === 'meeting' ? 8 : 4;
      if (h.rel === 'chung') v -= kind === 'contract' ? 18 : 10;
      if (h.rel === 'hyeong' || h.rel === 'hae') v -= 5;
      v -= (used[h.i] || 0) * 4; // 앞 일정에서 이미 고른 시간은 살짝 뒤로(같은 시간만 반복되지 않게)
      return v;
    };
    const ranked = [...hs].sort((a, b) => val(b) - val(a) || a.i - b.i);
    const best = ranked.slice(0, 2);
    best.forEach(h => { used[h.i] = (used[h.i] || 0) + 1; });
    out[kind] = { best: best.sort((a, b) => a.i - b.i), worst: ranked[ranked.length - 1], pref };
  }
  return out;
}

// ── 달·해 흐름
// 그 달 15일 정오가 속한 절기 기준 월주. 12개월(이번 달부터)
export function monthScan(chart, y, m, n = 12) {
  const list = [];
  for (let k = 0; k < n; k++) {
    const mm = ((m - 1 + k) % 12) + 1, yy = y + Math.floor((m - 1 + k) / 12);
    const gz = SJ.monthYearGZAt(yy, mm, 15).month;
    const ev = SJ.evalGZ(chart, gz.stem, gz.branch, chart.male);
    list.push({ y: yy, m: mm, gz, ev, grpS: SJ.groupOf(ev.tgS), grpB: SJ.groupOf(ev.tgB), tone: ev.val >= 0.8 ? 2 : ev.val <= -0.8 ? 0 : 1 });
  }
  return list;
}
export function yearInfo(chart, y) {
  const gz = SJ.monthYearGZAt(y, 7, 1).year;
  const ev = SJ.evalGZ(chart, gz.stem, gz.branch, chart.male);
  return { y, gz, ev, grpS: SJ.groupOf(ev.tgS), grpB: SJ.groupOf(ev.tgB), tone: ev.val >= 0.8 ? 2 : ev.val <= -0.8 ? 0 : 1 };
}
export function currentDaeun(chart, nowMs = Date.now()) {
  if (!chart.daeun) return null;
  const age = (nowMs - chart.birthMs) / (365.2425 * 864e5);
  const list = chart.daeun.list, ci = Math.max(0, list.findIndex(g => age >= g.age && age < g.age + 10));
  const cur = list[ci];
  const ev = SJ.evalGZ(chart, cur.stem, cur.branch, chart.male);
  return { ...cur, ev, grp: SJ.groupOf(SJ.tenGod(chart.dayStem, cur.stem)), tone: ev.val >= 0.8 ? 2 : ev.val <= -0.8 ? 0 : 1 };
}

// ── 하나: 인연이 들어오는 달 (이성의 별이 도움이 되는 기운으로 들어오거나, 도화·일지 합·천간합)
export function loveSignals(chart, mo) {
  const g = chart.male === false ? 3 : 2;
  const ev = mo.ev, sig = [];
  if ((mo.grpS === g || mo.grpB === g) && favG(chart, g)) sig.push('star');
  if (ev.dohwa) sig.push('dohwa');
  if (ev.rels.some(r => r.pos === 'day' && (r.type === 'hap' || r.type === 'samhap'))) sig.push('dayHap');
  if (ev.stemHapDay) sig.push('stemHap');
  const warn = [];
  if (ev.rels.some(r => r.pos === 'day' && r.type === 'chung')) warn.push('dayChung');
  if ((mo.grpS === g || mo.grpB === g) && !favG(chart, g)) warn.push('starHeavy');
  return { sig, warn };
}

// ── 도한: 커리어 신호
export function careerSignals(chart, x) {
  const ev = x.ev, s = [];
  const has = g => x.grpS === g || x.grpB === g;
  if (ev.yeokma || ev.rels.some(r => r.pos === 'month' && r.type === 'chung')) s.push('move');           // 이동·변동
  if ((ev.tgS === 7 || ev.tgB === 7 || has(3)) && (has(4) || chart.gw[4] >= 1.5) && favG(chart, 3)) s.push('rise'); // 평가·승진
  if (has(1) && (has(2) || chart.gw[2] >= 1.5) && favG(chart, 1)) s.push('venture');                       // 창업·부업
  if (has(4) && favG(chart, 4)) s.push('study');                                                           // 자격·문서
  if (has(0) && !favG(chart, 0)) s.push('compete');                                                        // 경쟁·지출
  return s;
}

// ── 도한: 일하는 스타일 (조직형·사업형·전문가형)
export function workStyle(chart) {
  const gw = chart.gw;
  const sc = {
    org: gw[3] * 1.2 + gw[4] * 0.8 + (chart.strength <= 0 ? 0.6 : 0),
    biz: gw[1] * 0.9 + gw[2] * 1.2 + (chart.strength >= 0 ? 0.8 : 0) + (chart.sal.yeokma ? 0.5 : 0),
    pro: gw[4] * 1.0 + gw[1] * 0.8 + (chart.sal.hwagae ? 0.6 : 0),
  };
  const order = Object.keys(sc).sort((a, b) => sc[b] - sc[a]);
  return { type: order[0], second: order[1], close: sc[order[0]] - sc[order[1]] < 0.6, sc };
}

// ── 하나·도한: 사람 유형
// 천을귀인(나를 돕는 띠), 일지와 육합·삼합(잘 맞는 띠), 일지와 충(부딪히기 쉬운 띠)
const GUI = [[1, 7], [0, 8], [11, 9], [11, 9], [1, 7], [0, 8], [1, 7], [2, 6], [5, 3], [5, 3]];
const HAP6 = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
const TRI = [[8, 0, 4], [2, 6, 10], [5, 9, 1], [11, 3, 7]];
export function peopleOf(chart) {
  const db = chart.pillars.day.branch;
  return {
    noble: GUI[chart.dayStem],
    match: [HAP6[db], ...TRI.find(t => t.includes(db)).filter(b => b !== db)],
    clash: [(db + 6) % 12],
    dayGrp: SJ.groupOf(chart.tens.day.branch), // 배우자 자리의 십신 그룹
  };
}

// ── 해운정사 신년운세 (그 해의 세운 + 그 해 대운 + 12달 월운 + 달마다 좋은 날)
// 같은 사주면 언제나 같은 결과. 점수는 0~100, 단계는 0(버티는 해)~4(활짝 핀 해)
const clampN = (v, a, b) => Math.max(a, Math.min(b, v));
// 키워드 묶음 (그룹마다 도움일 때 6개 · 부담일 때 6개)
const KW_GOOD = [
  ['독립', '동료', '자립', '내 편', '연대', '자신감'],
  ['표현', '창작', '도전', '재능', '발견', '무대'],
  ['수확', '기회', '실속', '부수입', '목돈', '거래'],
  ['인정', '승진', '책임', '명예', '자리', '신뢰'],
  ['배움', '자격', '회복', '스승', '문서운', '여유'],
];
const KW_HARD = [
  ['절제', '경쟁', '거리 두기', '내 몫 지키기', '양보', '혼자만의 시간'],
  ['말조심', '선택과 집중', '마무리', '완급 조절', '한 우물', '숨 고르기'],
  ['지출 관리', '욕심 덜기', '점검', '저축', '계약 확인', '현금 지키기'],
  ['체력 관리', '버티기', '규칙', '거절', '기본기', '페이스 조절'],
  ['결단', '실행', '정리', '홀로서기', '첫걸음', '미니멀'],
];
const REL_KW = { hap: ['귀인', '인연'], samhap: ['협력', '팀워크'], chung: ['변화', '이동'], hyeong: ['꼼꼼함', '재확인'], hae: ['오해 풀기', '대화'] };
// P: 언어별 키워드 묶음(L.masters.year.kw). 없으면 한국어
export function yearFortune(chart, y = 2027, P = null) {
  const G = (P && P.good) || KW_GOOD, HD = (P && P.hard) || KW_HARD, RK = (P && P.rel) || REL_KW;
  const yi = yearInfo(chart, y);
  const mid = Date.UTC(y, 6, 1);
  const dae = currentDaeun(chart, mid);
  const ev = yi.ev, dv = dae ? dae.ev.val : 0;
  const score = clampN(Math.round(ev.raw * 0.9 + 14 + dv * 2.2), 40, 97);
  const band = score >= 82 ? 4 : score >= 72 ? 3 : score >= 62 ? 2 : score >= 52 ? 1 : 0;
  // 분야: 세운 + 대운 바탕
  const dom = {};
  for (const k of ['wealth', 'love', 'work', 'health']) {
    const base = ev.domRaw[k] + (dae ? 0.35 * (dae.ev.domRaw[k] - 3) : 0);
    dom[k] = clampN(Math.round(base), 1, 5);
  }
  // 12달 (양력 1~12월, 각 달 15일이 속한 절기의 월주)
  const months = monthScan(chart, y, 1, 12).map(mo => {
    const s = clampN(Math.round(mo.ev.raw * 0.85 + 13 + (score - 68) * 0.35), 32, 98);
    const md = mo.ev.domRaw;
    const order = Object.keys(md).sort((a, b) => md[b] - md[a]);
    // 이 달의 좋은 날 2개(그날 일진이 원국과 가장 잘 맞는 날)
    const dim = new Date(Date.UTC(y, mo.m, 0)).getUTCDate();
    const days = [];
    for (let d = 1; d <= dim; d++) { const g = SJ.dateGZ(y, mo.m, d); days.push({ d, v: SJ.evalGZ(chart, g.stem, g.branch, chart.male).raw }); }
    const good = days.sort((a, b) => b.v - a.v || a.d - b.d).slice(0, 2).map(x => x.d).sort((a, b) => a - b);
    return { ...mo, score: s, band: s >= 80 ? 4 : s >= 70 ? 3 : s >= 60 ? 2 : s >= 50 ? 1 : 0, top: order[0], low: order[order.length - 1], good };
  });
  const byScore = [...months].sort((a, b) => b.score - a.score || a.m - b.m);
  const best = byScore.slice(0, 3).map(x => x.m).sort((a, b) => a - b);
  const worst = byScore.slice(-2).map(x => x.m).sort((a, b) => a - b);
  // 키워드 3개: 천간의 기운, 지지의 기운, 원국과의 관계(없으면 신살·용신)
  const seed = (chart.dayStem * 7 + chart.pillars.day.branch * 3 + (chart.pillars.month?.branch || 0)) % 6;
  const kw = [];
  const pick = (g, i) => (favG(chart, g) ? G : HD)[g][i % 6];
  kw.push(pick(yi.grpS, seed));
  const k2 = pick(yi.grpB, seed + 1); if (!kw.includes(k2)) kw.push(k2);
  const rel = ev.rels.find(r => r.pos === 'day') || ev.rels.find(r => r.pos === 'month');
  const rk = rel && RK[rel.type][(seed + chart.pillars.year.branch) % 2];
  if (rk && !kw.includes(rk)) kw.push(rk);
  else if (ev.dohwa) kw.push(((P && P.dohwa) || ['설렘', '매력'])[seed % 2]);
  else if (ev.yeokma) kw.push(((P && P.yeokma) || ['여행', '이동'])[seed % 2]);
  const FILL = (P && P.fill) || ['성장', '균형', '새 출발', '용기', '여유', '단단함', '반전', '꾸준함', '설렘', '단짠', '레벨업', '행운'];
  for (let j = 0; j < FILL.length; j++) { const extra = FILL[(seed * 2 + chart.pillars.year.branch + j) % FILL.length]; if (kw.length < 3 && !kw.includes(extra)) kw.push(extra); }
  return { y, gz: yi.gz, ev, grpS: yi.grpS, grpB: yi.grpB, favS: favG(chart, yi.grpS), favB: favG(chart, yi.grpB), dae, score, band, dom, months, best, worst, kw: kw.slice(0, 3), rel };
}

// ── 60타입(일주): 태어난 날의 천간·지지
const ST_SLUG = ['gap', 'eul', 'byeong', 'jeong', 'mu', 'gi', 'gyeong', 'sin', 'im', 'gye'];
const BR_SLUG = ['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'];
const LIUHE = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 육합 짝 (子丑 寅亥 卯戌 辰酉 巳申 午未)
export const typeSlug = (s, b) => `${ST_SLUG[s]}-${BR_SLUG[b]}`;
// 60갑자 순서 (갑자, 을축, …, 계해)
export const TYPES60 = Array.from({ length: 60 }, (_, i) => ({ s: i % 10, b: i % 12 }));
export function typeOf(s, b) {
  const se = SJ.STEM_EL[s], be = SJ.BRANCH_EL[b];
  const combo = se === be ? 0 : (se + 1) % 5 === be ? 1 : (be + 1) % 5 === se ? 2 : (se + 2) % 5 === be ? 3 : 4;
  // 찰떡: 천간합(갑기·을경·병신·정임·무계) + 지지 육합 / 부딪힘: 나를 치는 천간 + 지지 충
  const best = { s: (s + 5) % 10, b: LIUHE[b] };
  const clash = { s: (s + 6) % 10, b: (b + 6) % 12 };
  return { s, b, el: se, combo, slug: typeSlug(s, b), best, clash, idx: TYPES60.findIndex(t => t.s === s && t.b === b) };
}
