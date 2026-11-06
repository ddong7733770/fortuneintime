// 사주 화면 조각: 운세 탭의 '오늘의 사주 근거', 분야별 근거 문장, 내일 미리보기, 사주 탭
import { SJ } from './engine.js';

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// {키} 치환 + 한국어 조사 자동 선택: {키:은/는} → 앞말의 받침에 따라 '은' 또는 '는'
export const hasBatchim = w => { const t = String(w).replace(/\([^)]*\)\s*$/, '').trim(); const c = t.charCodeAt(t.length - 1); return c >= 0xAC00 && c <= 0xD7A3 ? (c - 0xAC00) % 28 !== 0 : false; };
export const fmt = (s, o = {}) => String(s).replace(/\{(\w+)(?::([^}/]+)\/([^}]+))?\}/g, (_, k, a, b) => { const v = o[k] ?? ''; return a ? v + (hasBatchim(v) ? a : b) : v; });
export const pickR = (arr, r) => arr[Math.floor((r || 0) * arr.length) % arr.length];
export const EL_CLS = ['el-wood', 'el-fire', 'el-earth', 'el-metal', 'el-water'];
export const gzH = g => SJ.STEM_H[g.stem] + SJ.BRANCH_H[g.branch];
export const gzK = g => SJ.STEM_K[g.stem] + SJ.BRANCH_K[g.branch];
const POS_ORDER = ['day', 'month', 'year', 'hour'];

// 오늘 근거 문장(한국어). 다른 언어는 한자 요약만
export function basisLines(S, d) {
  const { chart, ev } = d.saju;
  const out = [];
  const ten = S.ten[ev.tgS].split('(')[0];
  out.push(fmt(S.dayIntro, { s: stemName(S, ev.stem), d: stemName(S, chart.dayStem), ten, mean: S.tenMean[ev.tgS] }));
  const els = [...new Set([SJ.STEM_EL[ev.stem], SJ.BRANCH_EL[ev.branch]])].map(e => S.el[e]).join('·');
  const mood = ev.val >= 1.5 ? 'good' : ev.val <= -1.5 ? 'bad' : 'mid';
  out.push(fmt(S.yongDay[mood], { yong: S.el[chart.fav.yong], els }));
  if (d.saju.kai) out.push(fmt(S.ui.kai, { el: S.el[chart.fav.yong] }));
  return out;
}

// ── 해운정사의 오늘 풀이: ① 전체 흐름 ② 눈여겨볼 대목 ③ 실천 조언 ④ 여운 있는 한마디
const REL_PRI = { chung: 0, hyeong: 1, hap: 2, samhap: 3, hae: 4 };
const DOMS = ['wealth', 'love', 'work', 'health'];
// P: 문장 묶음(없으면 해운정사 말투 S.hw). 오늘 탭은 중립 안내형 묶음(masters.fortune)을 넘김
// 문장이 여러 개면 그날 값으로 하나 고름
const W = (v, x) => (Array.isArray(v) ? pickR(v, x) : v);
export function todayReading(S, d, P = null) {
  const H = P || S.hw, TD = (P && P.tenDay) || S.tenDay, RL = (P && P.rel) || S.rel, { chart, ev } = d.saju, r = d.rolls;
  const vs = SJ.elValue(chart, SJ.STEM_EL[ev.stem]);
  const flow = `${pickR(H.flow[d.band], r[31])} ${TD[ev.tgS][vs >= 0 ? 0 : 1]}`;
  let focus;
  const rels = [...ev.rels].sort((a, b2) => REL_PRI[a.type] - REL_PRI[b2.type] || POS_ORDER.indexOf(a.pos) - POS_ORDER.indexOf(b2.pos));
  if (rels.length) {
    const x = rels[0];
    focus = fmt(W(RL[x.type], r[38]), { b: branchName(S, ev.branch), nb: branchName(S, x.with), pos: S.pos[x.pos] });
  } else if (ev.stemChungDay) focus = fmt(W(RL.stemChung, r[38]), { s: stemName(S, ev.stem) });
  else if (ev.stemHapDay) focus = fmt(W(RL.stemHap, r[38]), { s: stemName(S, ev.stem) });
  else {
    const lo = DOMS.reduce((a, k) => (d.domains[k] < d.domains[a] ? k : a)), hi = DOMS.reduce((a, k) => (d.domains[k] > d.domains[a] ? k : a));
    focus = d.domains[lo] <= 2 ? fmt(W(H.focusNone.weak, r[39]), { dom: H.domName[lo] }) : fmt(W(H.focusNone.strong, r[39]), { dom: H.domName[hi] });
  }
  if (H.focusLead && r[32] < 0.4) focus = `${pickR(H.focusLead, r[33])} ${focus}`;
  const weak = DOMS.reduce((a, k) => (d.domains[k] < d.domains[a] ? k : a));
  const Y = S.yong[chart.fav.yong];
  const advice = [pickR(H.adviceDom[weak], r[34])];
  if (r[35] < 0.6) advice.push(fmt(pickR(H.adviceYong, r[36]), { act: Y.act.split(', ')[0], yong: S.el[chart.fav.yong] }));
  const closing = H.closing ? pickR(H.closing[d.band <= 0 ? 0 : d.band === 1 ? 1 : 2], r[37]) : '';
  return { flow, focus, advice: advice.join(' '), closing };
}
export function todayReadingHTML(S, d, withFlow = true) {
  const t = todayReading(S, d);
  return `<section class="sec hw"><h2>${esc(S.ui.hwTitle)}</h2>
${withFlow ? `<p class="hw-flow">${esc(t.flow)}</p>` : ''}
<h3>${esc(S.ui.focus)}</h3><p>${esc(t.focus)}</p>
<h3>${esc(S.ui.advice)}</h3><p>${esc(t.advice)}</p>
<p class="hw-close">“${esc(t.closing)}”<span>— ${esc(S.ui.hwSay)}</span></p></section>`;
}

// ── 분야별 풀이(재물·애정·직장·건강): 흐름 → 왜 그런지(사주 근거) → 주의·가능성 → 현실 조언
// D: 분야 문장 묶음(없으면 S.dom2[k]). 오늘 탭은 중립 묶음, 하나는 하나 말투 묶음을 넘김
export function domainReading(S, d, k, D = null) {
  D = D || S.dom2[k];
  const { chart, ev } = d.saju, ds = chart.dayStem;
  const i = DOMS.indexOf(k), r = j => d.rolls[(10 + i * 5 + j) % 40];
  const v = d.domains[k], c = v <= 2 ? 0 : v === 3 ? 1 : 2;
  const gs = SJ.groupOf(ev.tgS), gb = SJ.groupOf(ev.tgB);
  const has = g => gs === g || gb === g;
  const fav = g => SJ.elValue(chart, SJ.elOfGroup(ds, g)) >= 0;
  const relAt = (pos, t) => ev.rels.some(x => x.pos === pos && x.type === t);
  // 확장 묶음(more·act가 있는 오늘 탭·하나): 문장 수 2배 — 흐름 → 풀어 쓰기 → 근거 → 주의/기회 → 행동 → 팁
  const ext = !!D.more, r2 = j => d.rolls[(21 + i * 4 + j) % 40];
  const W = x => (Array.isArray(x) ? pickR(x, r2(0)) : x);
  const out = [pickR(D.flow[c], r(0))];
  if (ext) out.push(pickR(D.more[c], r2(1)));
  let why;
  if (k === 'wealth') {
    if (has(2)) why = fav(2) ? (ev.tgS === 4 || ev.tgB === 4 ? W(D.why.pyeon) : W(D.why.jeong)) : W(D.why.bad);
    else if (ev.tgS === 1 || ev.tgB === 1) why = W(D.why.rob);
    else if (has(1)) why = W(D.why.output); else if (has(4)) why = W(D.why.doc); else why = W(D.why.none);
    out.push(why); if (c <= 1) out.push(pickR(D.caution, r(1))); if (ext) out.push(pickR(D.act[c], r2(2))); out.push(pickR(D.tip, r(2)));
  } else if (k === 'love') {
    const g = chart.male === false ? 3 : 2;
    const star = chart.male === false ? '이성을 뜻하는 관성(官星)' : chart.male ? '이성을 뜻하는 재성(財星)' : '인연의 별';
    if (has(g)) why = fav(g) ? fmt(W(D.why.star), { star }) : W(D.why.bad);
    else if (ev.dohwa) why = W(D.why.dohwa); else if (relAt('day', 'hap')) why = W(D.why.dayHap); else if (relAt('day', 'chung')) why = W(D.why.dayChung);
    else if (ev.stemHapDay) why = W(D.why.stemHap); else why = W(D.why.none);
    out.push(why); if (c === 0 && D.caution) out.push(pickR(D.caution, r(1))); else if (c >= 1 || r(1) < 0.5) out.push(pickR(D.chance, r(3))); if (ext) out.push(pickR(D.act[c], r2(2))); out.push(pickR(D.tip, r(2)));
  } else if (k === 'work') {
    if (has(3)) why = fav(3) ? W(D.why.kwan) : W(D.why.kwanBad);
    else if (relAt('month', 'chung')) why = W(D.why.monthChung);
    else if (has(1)) why = W(D.why.output); else if (has(4)) why = W(D.why.study); else if (has(0)) why = W(D.why.rob); else why = W(D.why.none);
    out.push(why); if (c <= 1) out.push(pickR(D.caution, r(1))); if (ext) out.push(pickR(D.act[c], r2(2))); out.push(pickR(D.tip, r(2)));
  } else {
    const els = [SJ.STEM_EL[ev.stem], SJ.BRANCH_EL[ev.branch]];
    const ex = els.find(e => chart.count[e] >= 3 && SJ.elValue(chart, e) < 0), lk = els.find(e => chart.count[e] === 0);
    if (ex !== undefined) why = fmt(W(D.why.excess), { el: S.el[ex], organ: S.organ[ex] });
    else if (lk !== undefined) why = fmt(W(D.why.lack), { el: S.el[lk] });
    else if (relAt('day', 'chung')) why = W(D.why.chung); else if (ev.rels.some(x => x.type === 'hyeong')) why = W(D.why.hyeong); else why = W(D.why.none);
    out.push(why); if (ext) out.push(pickR(D.act[c], r2(2))); out.push(c === 0 ? D.tip[0] : pickR(D.tip.slice(1), r(2)));
  }
  return out.join(' ');
}
// 예전 이름 호환
export const domainReason = (S, d, k) => domainReading(S, d, k);

// 한국어 이름: 계(癸·물), 미(未·양)
export const stemName = (S, s) => `${SJ.STEM_K[s]}(${SJ.STEM_H[s]}·${S.elShort[SJ.STEM_EL[s]]})`;
export const branchName = (S, b) => `${SJ.BRANCH_K[b]}(${SJ.BRANCH_H[b]}·${S.animal[b]})`;
function basisChipsKo(S, d) {
  const { chart, ev, gz } = d.saju;
  return [fmt(S.chip.day, { gz: gzK(gz) }), S.ten[ev.tgS].split('(')[0], fmt(S.chip.yong, { el: S.el[chart.fav.yong] }),
    ...ev.rels.slice(0, 2).map(r => fmt(S.chip.rel[r.type], { a: SJ.BRANCH_K[ev.branch], b: SJ.BRANCH_K[r.with] }))];
}
export function basisChips(d) {
  const { chart, ev, gz } = d.saju;
  const rel = ev.rels.map(r => SJ.BRANCH_H[ev.branch] + SJ.BRANCH_H[r.with] + ({ hap: '合', samhap: '半合', chung: '沖', hyeong: '刑', hae: '害' })[r.type]);
  return [`${gzH(gz)}日`, SJ.TEN_H[ev.tgS], `用神 ${SJ.EL_H[chart.fav.yong]}`, ...rel.slice(0, 2)];
}
export function basisHTML(S, d, link) {
  const chips = (S ? basisChipsKo(S, d) : basisChips(d)).map(c => `<span>${esc(c)}</span>`).join('');
  if (!S) return `<section class="sec basis"><p class="basis-chips">${chips}</p></section>`;
  const { gz } = d.saju;
  return `<section class="sec basis"><h2>${esc(S.ui.todayBasis)}</h2>
<p class="basis-chips">${chips}</p>
<p class="muted basis-note">${esc(fmt(S.ui.basisNote, { gz: `${gzK(gz)}(${gzH(gz)})` }))}</p>
<ul class="basis-list">${basisLines(S, d).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
${link ? `<a class="txt-link" href="${link}">${esc(S.ui.seeSaju)} →</a>` : ''}</section>`;
}


// ── 타고난 분야별 운: 원국의 십신 무게·위치·용신·신살로 문장을 고름
export function lifeTexts(S, chart) {
  const T = S.life, ds = chart.dayStem, gw = chart.gw, tg = chart.tgCount, P = chart.pillars;
  const fav = g => SJ.elValue(chart, SJ.elOfGroup(ds, g)) >= 0;
  const posOf = g => ['year', 'month', 'day', 'hour'].filter(pos => chart.tens[pos] && ((chart.tens[pos].stem !== null && SJ.groupOf(chart.tens[pos].stem) === g) || SJ.groupOf(chart.tens[pos].branch) === g));
  const Y = S.yong[chart.fav.yong], yEl = S.el[chart.fav.yong];
  const out = {};
  // 재물운
  const w = [];
  if (gw[2] >= 2) w.push(fav(2) && chart.strength >= 0 ? T.wealth.strongFav : chart.strength < 0 ? T.wealth.strongUnfav : T.wealth.strongFav);
  else if (gw[1] >= 1.5) w.push(T.wealth.output); else w.push(T.wealth.weak);
  if (tg[4] + tg[5] > 0) w.push(tg[4] > tg[5] ? T.wealth.pyeon : T.wealth.jeong);
  const wp = posOf(2); if (wp.length) w.push(T.wealth.where[wp.includes('month') ? 'month' : wp[0]]);
  if (gw[0] >= 3 && chart.strength > 0) w.push(T.wealth.rob);
  w.push(fmt(T.wealth.tip, { el: yEl, act: Y.act }));
  out.wealth = w;
  // 직장·사업운
  const k = [];
  if (gw[3] >= 1.5) k.push(fav(3) ? T.work.kwanFav : T.work.kwanUnfav); else k.push(T.work.noKwan);
  if (tg[6] + tg[7] > 0) k.push(tg[7] >= tg[6] ? T.work.jeong : T.work.pyeon);
  if (gw[1] >= 2) k.push(T.work.output); else if (gw[4] >= 2.5) k.push(T.work.insung);
  if (gw[0] >= 3) k.push(T.work.bigup);
  if (chart.sal.yeokma) k.push(T.work.yeokma);
  k.push(fmt(T.work.field, { el: yEl, fields: T.work.fields[chart.fav.yong] }));
  out.work = k;
  // 이성·대인관계
  const l = [], g = chart.male === false ? 3 : 2;
  const starN = chart.male === false ? tg[6] + tg[7] : tg[4] + tg[5];
  if (starN >= 3) l.push(T.love.many);
  else if (gw[g] >= 1.5) l.push(fav(g) ? (chart.male === false ? T.love.strongF : T.love.strongM) : T.love.unfav);
  else l.push(T.love.none);
  l.push(T.love.palace[SJ.groupOf(chart.tens.day.branch)]);
  if (SJ.branchRel(P.day.branch, P.month.branch) === 'chung') l.push(T.love.palaceChung);
  if (chart.sal.dohwa) l.push(T.love.dohwa);
  const top = [0, 1, 2, 3, 4].reduce((a, b) => (gw[b] > gw[a] ? b : a), 0);
  l.push(T.love.people[top]);
  out.love = l;
  // 가정·건강
  const h = [];
  const earlyIn = ['year', 'month'].some(pos => chart.tens[pos] && ((chart.tens[pos].stem !== null && SJ.groupOf(chart.tens[pos].stem) === 4) || SJ.groupOf(chart.tens[pos].branch) === 4));
  h.push(earlyIn ? T.home.parents : T.home.self);
  if (SJ.branchRel(P.day.branch, P.month.branch) === 'hap') h.push(T.home.harmony);
  if (P.hour) {
    const hg = [SJ.groupOf(chart.tens.hour.stem), SJ.groupOf(chart.tens.hour.branch)];
    const childG = chart.male === false ? 1 : 3;
    h.push(hg.includes(childG) ? T.home.child : T.home.late[hg[0]]);
  }
  const lackE = chart.count.findIndex(c => c === 0);
  const excE = chart.count.findIndex((c, e) => c >= 3 && SJ.elValue(chart, e) < 0);
  if (lackE >= 0) h.push(fmt(T.home.lack, { el: S.el[lackE], organ: S.organ[lackE] }));
  if (excE >= 0) h.push(fmt(T.home.excess, { el: S.el[excE], organ: S.organ[excE] }));
  h.push(chart.strength < 0 ? T.home.weak : chart.strength > 0 ? T.home.strong : T.home.mid);
  out.home = h;
  return out;
}
function lifeHTML(S, chart) {
  const t = lifeTexts(S, chart);
  return ['wealth', 'work', 'love', 'home'].map(k => `<section class="sec life life-${k}"><h2>${esc(S.life.titles[k])}</h2><p class="lead-s">${t[k].map(esc).join(' ')}</p></section>`).join('');
}

// ── 해운정사의 종합 풀이: 타고난 기질 → 강점과 약점 → 지금의 흐름 → 앞으로의 변화 → 삶의 방향
export function overallTexts(S, chart, nowMs = Date.now(), O = null) {
  O = O || S.ov; const out = {};
  out.nature = S.dayMaster[chart.dayStem];
  const top = [...chart.tgCount.keys()].filter(i => chart.tgCount[i] > 0).sort((a, b) => chart.tgCount[b] - chart.tgCount[a])[0];
  const lackE = chart.count.findIndex(c => c === 0), manyE = chart.count.findIndex(c => c >= 3);
  const st = S.strength[chart.strength + 2][1].split('. ');
  out.strong = [S.tenTrait[top], st.slice(0, 2).join('. ') + '.', lackE >= 0 ? S.none[lackE] : manyE >= 0 ? S.many[manyE] : ''].filter(Boolean).join(' ');
  const age = (nowMs - chart.birthMs) / (365.2425 * 864e5);
  const toneOf = ev => (ev.val >= 0.8 ? 0 : ev.val <= -0.8 ? 2 : 1);
  const now = new Date(nowMs);
  const yr = SJ.monthYearGZAt(now.getFullYear(), now.getMonth() + 1, now.getDate()).year;
  const yTone = toneOf(SJ.evalGZ(chart, yr.stem, yr.branch, chart.male));
  const gz = g => `${SJ.STEM_K[g.stem]}${SJ.BRANCH_K[g.branch]}(${SJ.STEM_H[g.stem]}${SJ.BRANCH_H[g.branch]})`;
  const yearLine = fmt(O.year, { gz: gz(yr), tone: O.yearTone[yTone] });
  if (chart.daeun) {
    const list = chart.daeun.list, ci = list.findIndex(g => age >= g.age && age < g.age + 10);
    const cur = list[Math.max(0, ci)], nxt = list[Math.max(0, ci) + 1];
    const evC = SJ.evalGZ(chart, cur.stem, cur.branch, chart.male), tC = toneOf(evC);
    const grpC = SJ.groupOf(SJ.tenGod(chart.dayStem, cur.stem));
    out.now = `${fmt(O.now, { age: Math.floor(cur.age), gz: gz(cur), desc: S.daeunText[grpC][tC === 2 ? 1 : 0].split(' — ')[1] })} ${O.nowTone[tC]} ${yearLine}`;
    if (nxt) {
      const tN = toneOf(SJ.evalGZ(chart, nxt.stem, nxt.branch, chart.male)), grpN = SJ.groupOf(SJ.tenGod(chart.dayStem, nxt.stem));
      out.next = fmt(O.next, { age: Math.floor(nxt.age), gz: gz(nxt), desc: S.daeunText[grpN][tN === 2 ? 1 : 0].split(' — ')[1], tone: O.nextTone[tN] });
    }
  } else out.now = yearLine;
  const Y = S.yong[chart.fav.yong];
  out.way = fmt(O.way, { el: S.el[chart.fav.yong], why: Y.why, close: O.wayClose[(chart.dayStem + chart.pillars.month.branch) % O.wayClose.length] });
  return out;
}
function overallHTML(S, chart, O = null, title = null) {
  const t = overallTexts(S, chart, Date.now(), O), U = S.ui;
  const row = (h, v) => (v ? `<h3>${esc(h)}</h3><p>${esc(v)}</p>` : '');
  return `<section class="sec hw" id="sec-overall"><h2>${esc(title || U.overall)}</h2>${row(U.ovNature, t.nature)}${row(U.ovStrong, t.strong)}${row(U.ovNow, t.now)}${row(U.ovNext, t.next)}${row(U.ovWay, t.way)}</section>`;
}

// ── 사주 탭
function pillarCell(S, chart, pos) {
  const pl = chart.pillars[pos];
  const label = S.ui[pos];
  if (!pl) return `<div class="pc pc-none"><p class="pc-pos">${esc(label)}</p><p class="pc-q">?</p><p class="pc-q">?</p></div>`;
  const t = chart.tens[pos];
  const sE = SJ.STEM_EL[pl.stem], bE = SJ.BRANCH_EL[pl.branch];
  return `<div class="pc${pos === 'day' ? ' pc-me' : ''}"><p class="pc-pos">${esc(label)}</p>
<p class="pc-ten">${pos === 'day' ? esc(S.ui.me) : esc(S.ten[t.stem].split('(')[0])}</p>
<p class="pc-ch ${EL_CLS[sE]}"><b>${SJ.STEM_H[pl.stem]}</b><small>${SJ.STEM_K[pl.stem]}·${esc(S.elShort[sE])}</small></p>
<p class="pc-ch ${EL_CLS[bE]}"><b>${SJ.BRANCH_H[pl.branch]}</b><small>${SJ.BRANCH_K[pl.branch]}·${esc(S.elShort[bE])}</small></p>
<p class="pc-ten">${esc(S.ten[t.branch].split('(')[0])}</p></div>`;
}
// 사주 화면을 섹션 단위로: 해운정사 화면에서 방문 횟수에 따라 순서를 바꿈
export function sajuSections(S, chart, { O = null, overallTitle = null, nowMs = Date.now() } = {}) {
  const U = S.ui;
  const pad = n => String(n).padStart(2, '0');
  const max = Math.max(...chart.count, 1);
  const many = chart.count.map((c, i) => (c >= 3 ? i : -1)).filter(i => i >= 0);
  const none = chart.count.map((c, i) => (c === 0 ? i : -1)).filter(i => i >= 0);
  const st = S.strength[chart.strength + 2];
  const Y = S.yong[chart.fav.yong];
  const topTen = [...chart.tgCount.keys()].filter(i => chart.tgCount[i] > 0).sort((a, b) => chart.tgCount[b] - chart.tgCount[a]).slice(0, 2);
  const sal = Object.entries(chart.sal).filter(([, v]) => v).map(([k]) => S.sinsal[k]);
  const age = (nowMs - chart.birthMs) / (365.2425 * 864e5);
  const dae = chart.daeun ? chart.daeun.list.map((g, i) => {
    const ev = SJ.evalGZ(chart, g.stem, g.branch, chart.male);
    const tone = ev.val >= 0.8 ? 'good' : ev.val <= -0.8 ? 'bad' : 'mid';
    const grp = SJ.groupOf(SJ.tenGod(chart.dayStem, g.stem));
    const cur = age >= g.age && age < g.age + 10;
    const when = age >= g.age + 10 ? 'past' : cur ? 'now' : 'future';
    return `<li class="dy dy-${tone}${cur ? ' is-now' : ''}"><p class="dy-age">${esc(fmt(U.age, { a: Math.floor(g.age) }))}${cur ? ` <em>${esc(U.now)}</em>` : ''}</p>
<p class="dy-gz"><b class="${EL_CLS[SJ.STEM_EL[g.stem]]}">${SJ.STEM_H[g.stem]}</b><b class="${EL_CLS[SJ.BRANCH_EL[g.branch]]}">${SJ.BRANCH_H[g.branch]}</b></p>
<p class="dy-tone">${esc(U[tone])}</p><p class="dy-txt">${esc(S.daeunText[grp][tone === 'bad' ? 1 : 0])}</p><p class="dy-when">${esc(U[when === 'now' ? 'now' : when])}</p></li>`;
  }).join('') : '';
  const johu = chart.johu === 4 ? S.johu.split('|')[0] : chart.johu === 1 ? S.johu.split('|')[1] : '';
  return {
    pillars: `<section class="sec" id="sec-pillars"><h2>${esc(U.pillars)}</h2>
<div class="pillars">${['hour', 'day', 'month', 'year'].map(pos => pillarCell(S, chart, pos)).join('')}</div>
${chart.solarHM ? `<p class="muted small">${esc(fmt(U.solar, { t: `${pad(chart.solarHM[0])}:${pad(chart.solarHM[1])}` }))}</p>` : ''}
${chart.hasHour ? '' : `<p class="muted small">${esc(U.unknownHour)}</p>`}</section>`,
    overall: overallHTML(S, chart, O, overallTitle),
    basic: `<section class="sec"><h2>${esc(U.dayMaster)}</h2>
<p class="dm"><b class="${EL_CLS[chart.me]}">${SJ.STEM_H[chart.dayStem]}</b><span>${esc(SJ.STEM_K[chart.dayStem])}${esc(S.el[chart.me].slice(0, 1))} · ${esc(S.el[chart.me])}</span></p>
<p class="lead-s">${esc(S.dayMaster[chart.dayStem])}</p></section>
<section class="sec"><h2>${esc(U.elements)}</h2>
<ul class="el-bars">${chart.count.map((c, i) => `<li><span class="${EL_CLS[i]}">${esc(S.el[i])}</span><i><b class="bar ${EL_CLS[i]}" style="width:${(c / max) * 100}%"></b></i><em>${c}</em></li>`).join('')}</ul>
${many.map(i => `<p class="lead-s">${esc(S.many[i])}</p>`).join('')}${none.map(i => `<p class="lead-s">${esc(S.none[i])}</p>`).join('')}</section>
<section class="sec"><h2>${esc(U.strength)}</h2>
<div class="meter"><i style="left:${Math.round(chart.ratio * 100)}%"></i></div><p class="meter-ax"><span>${esc(S.strength[0][0].replace(/\(.*\)/, ''))}</span><span>${esc(S.strength[2][0].replace(/\(.*\)/, ''))}</span><span>${esc(S.strength[4][0].replace(/\(.*\)/, ''))}</span></p>
<p class="tag-line"><b>${esc(st[0])}</b></p><p class="lead-s">${esc(st[1])}</p></section>
<section class="sec"><h2>${esc(U.yongsin)}</h2>
<p class="dm"><b class="${EL_CLS[chart.fav.yong]}">${SJ.EL_H[chart.fav.yong]}</b><span>${esc(S.el[chart.fav.yong])}</span></p>
<p class="lead-s">${esc(Y.why)}${johu ? ` ${esc(johu)}` : ''}</p>
<h3>${esc(U.luckyTitle)}</h3><dl class="kw"><div><dt>색</dt><dd>${esc(Y.color)}</dd></div><div><dt>방향</dt><dd>${esc(Y.dir)}</dd></div><div><dt>숫자</dt><dd>${esc(Y.num)}</dd></div><div><dt>활동</dt><dd>${esc(Y.act)}</dd></div></dl></section>
<section class="sec"><h2>${esc(U.tenGods)}</h2>${topTen.map(i => `<p class="lead-s"><b>${esc(S.ten[i])}</b> ${esc(S.tenTrait[i])}</p>`).join('')}</section>
${sal.length ? `<section class="sec"><h2>${esc(U.sinsal)}</h2>${sal.map(([n, t]) => `<p class="lead-s"><b>${esc(n)}</b> ${esc(t)}</p>`).join('')}</section>` : ''}
${lifeHTML(S, chart)}
${dae ? `<section class="sec"><h2>${esc(U.daeun)}</h2><ol class="daeun">${dae}</ol></section>` : ''}`,
  };
}
// 예전 사주 탭(한 번에 전부)
export function sajuTabHTML(S, chart, name, nowMs = Date.now()) {
  const U = S.ui, x = sajuSections(S, chart, { nowMs });
  return `<section class="sec"><h1 class="page-h">${esc(name ? `${name}의 ${U.title.replace('나의 ', '')}` : U.title)}</h1><p class="muted">${esc(U.sub)}</p></section>${x.pillars}${x.overall}${x.basic}<section class="sec"><p class="disc-inline">${esc(U.disclaimer)}</p></section>`;
}
