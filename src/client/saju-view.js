// 사주 화면 조각: 운세 탭의 '오늘의 사주 근거', 분야별 근거 문장, 내일 미리보기, 사주 탭
import { SJ } from './engine.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// {키} 치환 + 한국어 조사 자동 선택: {키:은/는} → 앞말의 받침에 따라 '은' 또는 '는'
const hasBatchim = w => { const t = String(w).replace(/\([^)]*\)\s*$/, '').trim(); const c = t.charCodeAt(t.length - 1); return c >= 0xAC00 && c <= 0xD7A3 ? (c - 0xAC00) % 28 !== 0 : false; };
const fmt = (s, o = {}) => String(s).replace(/\{(\w+)(?::([^}/]+)\/([^}]+))?\}/g, (_, k, a, b) => { const v = o[k] ?? ''; return a ? v + (hasBatchim(v) ? a : b) : v; });
const pickR = (arr, r) => arr[Math.floor((r || 0) * arr.length) % arr.length];
const EL_CLS = ['el-wood', 'el-fire', 'el-earth', 'el-metal', 'el-water'];
const gzH = g => SJ.STEM_H[g.stem] + SJ.BRANCH_H[g.branch];
const gzK = g => SJ.STEM_K[g.stem] + SJ.BRANCH_K[g.branch];
const POS_ORDER = ['day', 'month', 'year', 'hour'];

// 오늘 근거 문장(한국어). 다른 언어는 한자 요약만
export function basisLines(S, d) {
  const { chart, ev } = d.saju;
  const out = [];
  const vs = SJ.elValue(chart, SJ.STEM_EL[ev.stem]);
  const ten = S.ten[ev.tgS].split('(')[0];
  out.push(`${fmt(S.dayIntro, { s: stemName(S, ev.stem), d: stemName(S, chart.dayStem), ten, mean: S.tenMean[ev.tgS] })} ${S.tenDay[ev.tgS][vs >= 0 ? 0 : 1]}`);
  const els = [...new Set([SJ.STEM_EL[ev.stem], SJ.BRANCH_EL[ev.branch]])].map(e => S.el[e]).join('·');
  const mood = ev.val >= 1.5 ? 'good' : ev.val <= -1.5 ? 'bad' : 'mid';
  out.push(fmt(S.yongDay[mood], { yong: S.el[chart.fav.yong], els }));
  const rels = [...ev.rels].sort((a, b) => POS_ORDER.indexOf(a.pos) - POS_ORDER.indexOf(b.pos)).slice(0, 2);
  rels.forEach(r => out.push(fmt(S.rel[r.type], { b: branchName(S, ev.branch), nb: branchName(S, r.with), pos: S.pos[r.pos] })));
  if (ev.stemHapDay) out.push(fmt(S.rel.stemHap, { s: stemName(S, ev.stem) }));
  else if (ev.stemChungDay) out.push(fmt(S.rel.stemChung, { s: stemName(S, ev.stem) }));
  if (d.saju.kai) out.push(fmt(S.ui.kai, { el: S.el[chart.fav.yong] }));
  return out;
}
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

// 분야별 근거 한 문장(한국어)
export function domainReason(S, d, k) {
  const { chart, ev } = d.saju, ds = chart.dayStem, D = S.dom[k], r = d.rolls[30 + ['wealth', 'love', 'work', 'health'].indexOf(k)];
  const gs = SJ.groupOf(ev.tgS), gb = SJ.groupOf(ev.tgB);
  const has = g => gs === g || gb === g;
  const fav = g => SJ.elValue(chart, SJ.elOfGroup(ds, g)) >= 0;
  const relAt = (pos, t) => ev.rels.some(x => x.pos === pos && x.type === t);
  if (k === 'wealth') { if (has(2)) return fav(2) ? D.star : D.starBad; if (ev.tgS === 1 || ev.tgB === 1) return D.rob; return pickR(D.plain, r); }
  if (k === 'work') { if (has(3)) return fav(3) ? D.star : D.starBad; if (relAt('month', 'chung')) return D.monthChung; if (has(1)) return D.output; if (has(4)) return D.study; return pickR(D.plain, r); }
  if (k === 'love') {
    const g = chart.male === false ? 3 : 2;
    if (has(g)) return fav(g) ? (chart.male === false ? D.starF : D.starM) : D.starBad;
    if (ev.dohwa) return D.dohwa; if (relAt('day', 'hap')) return D.dayHap; if (relAt('day', 'chung')) return D.dayChung; return pickR(D.plain, r);
  }
  const els = [SJ.STEM_EL[ev.stem], SJ.BRANCH_EL[ev.branch]];
  const ex = els.find(e => chart.count[e] >= 3 && SJ.elValue(chart, e) < 0); if (ex !== undefined) return fmt(D.excess, { el: S.el[ex], organ: S.organ[ex] });
  const lk = els.find(e => chart.count[e] === 0); if (lk !== undefined) return fmt(D.lack, { el: S.el[lk] });
  if (relAt('day', 'chung')) return D.chung; if (ev.rels.some(x => x.type === 'hyeong')) return D.hyeong; return pickR(D.plain, r);
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
export function sajuTabHTML(S, chart, name, nowMs = Date.now()) {
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
  return `<section class="sec"><h1 class="page-h">${esc(name ? `${name}의 ${U.title.replace('나의 ', '')}` : U.title)}</h1><p class="muted">${esc(U.sub)}</p></section>
<section class="sec"><h2>${esc(U.pillars)}</h2>
<div class="pillars">${['hour', 'day', 'month', 'year'].map(pos => pillarCell(S, chart, pos)).join('')}</div>
${chart.solarHM ? `<p class="muted small">${esc(fmt(U.solar, { t: `${pad(chart.solarHM[0])}:${pad(chart.solarHM[1])}` }))}</p>` : ''}
${chart.hasHour ? '' : `<p class="muted small">${esc(U.unknownHour)}</p>`}</section>
<section class="sec"><h2>${esc(U.dayMaster)}</h2>
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
${dae ? `<section class="sec"><h2>${esc(U.daeun)}</h2><ol class="daeun">${dae}</ol></section>` : ''}
<section class="sec"><p class="disc-inline">${esc(U.disclaimer)}</p></section>`;
}
