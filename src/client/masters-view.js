// 명인 화면 조각: 오늘 탭(중립 안내형) · 해운정사(사주·시운) · 하나(인연·궁합) · 도한(일·사업)
// 문장은 L.masters(src/i18n/masters/ko.js), 계산은 masters.js. 같은 사람·같은 날이면 언제나 같은 결과
import { SJ } from './engine.js';
import * as MS from './masters.js';
import { DATE_ICONS } from './date-icons.js';
import { dialSVG, dialLabels, sijinRange, pips as gauge } from './content.js';
import { esc, fmt, pickR, todayReading, domainReading, sajuSections, stemName } from './saju-view.js';

const DOMS = ['wealth', 'love', 'work', 'health'];
const lvl = v => (v <= 2 ? 0 : v === 3 ? 1 : 2);
const first = (t, n = 2) => String(t).split(/(?<=[.!?])\s+/).slice(0, n).join(' ');
const sec = (id, title, body, cls = '') => `<section class="sec m-sec${cls ? ` ${cls}` : ''}" id="sec-${id}"><h2>${esc(title)}</h2>${body}</section>`;
const p = t => (t ? `<p class="m-p">${esc(t)}</p>` : '');
const loveStar = chart => (chart.male === false ? '이성을 뜻하는 관성(官星)' : chart.male ? '이성을 뜻하는 재성(財星)' : '인연의 별');
const hourName = (L, i) => `${L.sijin[i]} ${sijinRange(i)}`;

// ════════ 오늘 탭 (중립 안내형) ════════
export function fortuneReading(M, S, d) { return todayReading(S, d, M.fortune); }
export function fortuneDomain(M, S, d, k) {
  const D = M.fortune.dom[k];
  const t = domainReading(S, d, k, D);
  return k === 'love' ? t.replace('{star}', loveStar(d.saju.chart)) : t;
}
export function fortuneBasicHTML(M, S, d, dateK = null) {
  const t = fortuneReading(M, S, d), F = M.fortune;
  const wk = dateK ? weekendText(M, d, dateK) : '';
  return `<h3>${esc(F.focus)}</h3><p class="m-p">${esc(t.focus)}</p><h3>${esc(F.advice)}</h3><p class="m-p">${esc(t.advice)}</p>${wk ? `<div class="wkend"><h3>${esc(F.weekend.title)}</h3><p class="m-p">${esc(wk)}</p></div>` : ''}`;
}
// 토·일요일에만: 외출·여행·외식·데이트 등 휴일 운세 (점수 구간 · 오늘의 십신 · 용신 · 약한 분야 · 애정 단계로 고름)
export function weekendText(M, d, dateK) {
  const [y, m, dd] = dateK.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, dd)).getUTCDay();
  if (dow !== 0 && dow !== 6) return '';
  const W = M.fortune.weekend, r = d.rolls, { chart, ev } = d.saju;
  const grp = SJ.groupOf(ev.tgS), fav = SJ.elValue(chart, SJ.STEM_EL[ev.stem]) >= 0 ? 0 : 1;
  const weak = DOMS.reduce((a, k) => (d.domains[k] < d.domains[a] ? k : a), 'wealth');
  const out = [pickR(W.lead[d.band], r[12]), pickR(W.act[grp][fav], r[13]), pickR(W.place[chart.fav.yong], r[14])];
  if (d.domains[weak] <= 3) out.push(pickR(W.care[weak], r[15])); else out.push(pickR(W.who[lvl(d.domains.love)], r[16]));
  return out.join(' ');
}

// 오늘 탭의 명인 카드 한 줄
export function cardLine(M, d, m) {
  const r = d.rolls;
  if (m === 'haewoon') return pickR(M.haewoon.card, r[5]);
  if (m === 'hana') return pickR(M.hana.card[lvl(d.domains.love)], r[6]);
  return pickR(M.dohan.card[lvl(d.domains.work)], r[7]);
}

// ════════ 해운정사: 사주 + 시운 ════════
export function siunHTML(M, L, d, chart, nowMinute) {
  const H = M.haewoon.siun, U = M.ui;
  const hs = MS.hourDetail(chart, d);
  const day = hs.filter(h => !h.sleep && !h.dawn);
  const best = day.reduce((a, b) => (b.score > a.score ? b : a)), worst = day.reduce((a, b) => (b.score < a.score ? b : a));
  const cur = Math.floor(((nowMinute + 60) % 1440) / 120);
  const card = h => {
    const g = H.tg[h.tg][h.fav ? 0 : 1];
    const rl = h.rel ? H.rel[h.rel] : '';
    const avoid = h.rel === 'chung' ? H.avoidChung : H.avoid[h.grp];
    const body = h.dawn ? `<p class="m-p">${esc(H.dawn)} ${esc(g)}</p>`
      : `<p class="m-p">${esc(g)}${rl ? ` ${esc(rl)}` : ''}</p><p class="hr-do"><span>${esc(H.doLabel)}</span>${esc(H.doIt[h.tg])}<span>${esc(H.avoidLabel)}</span>${esc(avoid)}</p>`;
    const bw = h.i === best.i ? 'best' : h.i === worst.i ? 'worst' : '';
    return `<article class="hr hr-b${h.band}${h.i === cur ? ' is-now' : ''}${h.dawn ? ' is-dawn' : ''}${bw ? ` is-${bw}` : ''}" id="hr-${h.i}"${h.i === cur ? '' : ' hidden'}>
${bw ? `<p class="hr-tagrow"><em class="hr-tag t-${bw}">${esc(U[bw === 'best' ? 'bestTag' : 'worstTag'])}</em></p>` : ''}<header><b>${esc(L.sijin[h.i])}</b><span class="hr-t">${sijinRange(h.i)}</span>${h.i === cur ? `<em>${esc(U.siunNow)}</em>` : ''}<span class="hr-s">${h.score}</span><span class="hr-band">${esc(U.band[h.band])}</span></header>
${body}</article>`;
  };
  const list = [3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => card(hs[i])).join('');
  const sleep = `<article class="hr is-sleep${cur <= 2 ? ' is-now' : ''}" id="hr-0"${cur <= 2 ? '' : ' hidden'}><header><b>${esc(L.sijin[0])} · ${esc(L.sijin[1])} · ${esc(L.sijin[2])}</b><span class="hr-t">${esc(U.sleepRange)}</span></header><p class="m-p">${esc(H.sleep)}</p></article>`;
  const sum = `${fmt(H.summary, { best: hourName(L, best.i), worst: hourName(L, worst.i) })} ${pickR(H.summaryTail, d.rolls[8])}`;
  const dial = dialSVG({ hours: d.hours, labels: dialLabels(L), nowMin: nowMinute, best: best.i, worst: worst.i, size: 300, id: 'sdial', centerTop: `${U.siunNow} ${L.sijin[cur]}`, centerMain: d.hours[cur], centerSub: sijinRange(cur) });
  return sec('siun', U.secs.siun, `<p class="m-lead">${esc(sum)}</p><div class="siun-box"><div class="siun-dial">${dial}</div><p class="dial-legend"><span><i class="lg-best"></i>${esc(U.bestTag)} ${esc(L.sijin[best.i])}</span><span><i class="lg-worst"></i>${esc(U.worstTag)} ${esc(L.sijin[worst.i])}</span></p><p class="dial-hint">${esc(U.siunHint)}</p><div class="hr-list">${list}${sleep}</div></div>`, 'siun');
}
export function haewoonSections(M, S, L, d, chart, nowMinute) {
  const x = sajuSections(S, chart, { O: M.haewoon.ov, overallTitle: M.ui.secs.overall });
  return { pillars: x.pillars, overall: x.overall, siun: siunHTML(M, L, d, chart, nowMinute), rest: x.basic };
}
export function haewoonTeaser(M, S, chart) { return first(S.dayMaster[chart.dayStem], 2); }

// ════════ 하나: 연애·대인관계 ════════
export function hanaSections(M, S, d, chart, now = new Date(), L = null) {
  const H = M.hana, U = M.ui, ds = chart.dayStem, tg = chart.tgCount, gw = chart.gw;
  const loveG = chart.male === false ? 3 : 2;
  const pe = MS.peopleOf(chart);
  const an = bs => bs.map(b => S.animal[b]).join('·');
  // 1) 연애 기질
  const starN = chart.male === false ? tg[6] + tg[7] : tg[4] + tg[5];
  const temper = [H.temper.palace[pe.dayGrp], gw[1] >= 2 ? H.temper.express : gw[4] >= 2.5 ? H.temper.think : '', starN >= 3 ? H.temper.many : starN === 0 ? H.temper.none : '', chart.sal.dohwa ? H.temper.dohwa : ''].filter(Boolean);
  // 2) 끌리는 사람·잘 맞는 사람
  const atEl = SJ.elOfGroup(ds, loveG), yEl = chart.fav.yong;
  const type = [fmt(H.type.attract, { p: H.elPerson[atEl], el: S.el[atEl] }), fmt(H.type.match, { p: H.elPerson[yEl], el: S.el[yEl] }), fmt(H.type.animals, { a: an(pe.match) }), atEl !== yEl ? H.type.tip : ''].filter(Boolean);
  // 3) 오늘의 인연 흐름
  const todayT = domainReading(S, d, 'love', H.today).replace('{star}', loveStar(chart));
  const pips = `<p class="m-level"><span>${esc(M.fortune.domName.love)}</span>${gauge(d.domains.love)}</p>`;
  // 4) 인연 시기: 앞으로 6개월 + 올해
  const ms = MS.monthScan(chart, now.getFullYear(), now.getMonth() + 1, 6).map(mo => ({ mo, ...MS.loveSignals(chart, mo) }));
  const keep = ms.filter(x => x.sig.length || x.warn.includes('dayChung'));
  const rowsSrc = keep.length ? keep : ms.filter(x => x.warn.length).slice(0, 2);
  const rows = rowsSrc.map(x => `<li class="${x.sig.length ? 'up' : 'down'}"><b>${x.mo.m}월</b><span>${esc(x.sig.length ? H.timing.sig[x.sig[0]] : H.timing.warn[x.warn.includes('dayChung') ? 'dayChung' : x.warn[0]])}</span></li>`).join('');
  const yi = MS.yearInfo(chart, now.getFullYear()), ys = MS.loveSignals(chart, yi);
  const yearT = ys.sig.length ? H.timing.year.good : ys.warn.length ? H.timing.year.warn : H.timing.year.mid;
  const timing = `${p(H.timing.lead)}${rows ? `<ul class="m-months">${rows}</ul>` : p(H.timing.none)}<p class="m-p"><b>${esc(U.thisYear)}</b> ${esc(yearT)}</p>`;
  // 5) 대인관계
  const top = [0, 1, 2, 3, 4].reduce((a, b) => (gw[b] > gw[a] ? b : a), 0);
  const people = [fmt(H.people.noble, { a: an(pe.noble) }), fmt(H.people.match, { a: an(pe.match) }), fmt(H.people.clash, { a: an(pe.clash) }), H.people.style[top]];
  return {
    temper: sec('temper', U.secs.temper, temper.map(p).join('')),
    type: sec('type', U.secs.type, type.map(p).join('')),
    today: sec('today', U.secs.today, pips + p(todayT)),
    date: L ? hanaDate(M, S, L, d, chart, now) : '',
    timing: sec('timing', U.secs.timing, timing),
    people: sec('people', U.secs.people, people.map(p).join('')),
  };
}
// ── 하나: 추천하는 데이트 (용신 오행 → 장소군, 오늘 기운 → 분위기·시간·비용, 달 → 계절, 일지 관계 → 주의)
export function hanaDate(M, S, L, d, chart, now = new Date()) {
  const D = M.hana.date, U = D.labels, r = d.rolls, ev = d.saju.ev;
  const el = chart.fav.yong;
  const pl = D.places[el][Math.floor((r[18] || 0) * D.places[el].length)];
  const lv = lvl(d.domains.love);
  const grp = SJ.groupOf(ev.tgS), fav = SJ.elValue(chart, SJ.STEM_EL[ev.stem]) >= 0 ? 0 : 1;
  const mood = pickR(D.mood[grp][fav], r[19]);
  const bi = [4, 5, 6, 7, 8, 9, 10, 11].reduce((a, i) => (d.hours[i] > d.hours[a] ? i : a), 5);
  const slot = bi <= 5 ? 0 : bi <= 7 ? 1 : bi <= 9 ? 2 : 3;
  const hName = `${L.sijin[bi]}(${sijinRange(bi)})`;
  const mo = now.getMonth() + 1, sea = mo >= 3 && mo <= 5 ? 0 : mo >= 6 && mo <= 8 ? 1 : mo >= 9 && mo <= 11 ? 2 : 3;
  const seaName = ['봄', '여름', '가을', '겨울'][sea];
  const wl = lvl(d.domains.wealth);
  const pick = (a, j) => a[(Math.floor((r[(20 + j) % r.length] || 0) * 997) + j) % a.length];
  const dayRel = ev.rels.filter(x => x.pos === 'day').map(x => x.type);
  const careK = dayRel.includes('chung') ? 'dayChung' : ev.rels.some(x => x.type === 'hyeong') ? 'hyeong' : lv === 0 ? 'low' : lv === 2 ? 'good' : '';
  const chips = [[U.mood, D.moodShort[grp][fav]], [U.time, `${L.sijin[bi]} ${sijinRange(bi)}`], [U.form, pl.form], [U.cost, D.costLv[pl.cost]], [U.season, seaName]];
  const stages = ['some', 'early', 'long'];
  const body = `<div class="dt-card"><p class="dt-intro">${esc(pick(D.intro[lv], 1))}</p>
<div class="dt-head">${DATE_ICONS[pl.name] ? `<span class="dt-ico">${DATE_ICONS[pl.name]}</span>` : ''}<h3 class="dt-name">${esc(pl.name)}</h3></div>
<ul class="dt-chips">${chips.map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`).join('')}</ul>
<h4>${esc(U.why)}</h4><p class="m-p">${esc(pick(D.elWhy[el], 2))} ${esc(pick(pl.feature, 3))} ${esc(pick(pl.feature.filter(x => x !== pick(pl.feature, 3)), 4))}</p>
<h4>${esc(U.how)}</h4><p class="m-p">${esc(fmt(D.moodLine, { m: mood }))} ${esc(fmt(pick(D.time[slot], 5), { h: hName }))} ${esc(pick(pl.course, 6))} ${esc(pick(pl.course.filter(x => x !== pick(pl.course, 6)), 7))}</p>
<h4>${esc(U.stage)}</h4><ul class="dt-stage">${stages.map((k, i) => `<li><b>${esc(U.stageName[k])}</b><span>${esc(D.stageLead[i])} ${esc(pl.effect[k])}</span></li>`).join('')}</ul>
<p class="m-p">${esc(pl.costNote)} ${esc(pick(D.cost[wl], 8))} ${esc(D.season[sea][el])} ${esc(pick(D.elTip[el], 9))}</p>
<h4>${esc(U.talk)}</h4><ul class="dt-talk">${pl.talk.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
${careK ? `<h4>${esc(U.care)}</h4><p class="m-p">${esc(pick(D.care[careK], 10))}</p>` : ''}
<p class="m-p">${esc(pick(D.after[lv], 12))}</p>
<p class="dt-close">${esc(pick(D.closing[lv], 11))}</p></div>`;
  return sec('date', D.title, body, 'date');
}
export function hanaTeaser(M, S, chart) { return first(M.hana.temper.palace[MS.peopleOf(chart).dayGrp], 2); }

// ── 하나의 궁합(관계 다이내믹스): 두 사람 사주가 만나는 방식
export function compatReading(M, S, a, b, kind) {
  const C = M.hana.compat;
  const A = SJ.chartOf(a), B = SJ.chartOf(b);
  const tgB = SJ.tenGod(A.dayStem, B.dayStem), grp = SJ.groupOf(tgB);
  const bEl = SJ.STEM_EL[B.dayStem];
  const vEl = SJ.elValue(A, bEl);
  const dayRel = SJ.branchRel(A.pillars.day.branch, B.pillars.day.branch);
  const stemHap = SJ.stemHap(A.dayStem, B.dayStem), stemChung = SJ.stemChung(A.dayStem, B.dayStem);
  const yRel = SJ.branchRel(A.pillars.year.branch, B.pillars.year.branch);
  const vBA = SJ.elValue(B, SJ.STEM_EL[A.dayStem]);
  // 네 축(1~5): 끌림·소통·갈등(높을수록 갈등 적음)·성장
  const cl = v => Math.max(1, Math.min(5, Math.round(v)));
  const relV = { hap: 1.4, samhap: 1, chung: -1.4, hyeong: -1, hae: -0.6 };
  const axes = {
    pull: cl(3 + (stemHap ? 1.3 : 0) + (dayRel === 'hap' ? 0.8 : dayRel === 'chung' ? 0.6 : 0) + ((A.male !== B.male) && [2, 3].includes(grp) ? 0.6 : 0)),
    talk: cl(3 + (grp === 1 || grp === 0 ? 0.7 : grp === 3 ? -0.4 : 0) + (yRel === 'hap' || yRel === 'samhap' ? 0.6 : 0) + (stemChung ? -1 : 0)),
    clash: cl(3 + (relV[dayRel] || 0) + (stemChung ? -1 : 0) + (vEl < 0 ? -0.6 : 0.4)),
    grow: cl(3 + (vEl >= 0 ? 0.8 : -0.5) + (vBA >= 0 ? 0.6 : -0.3) + (grp === 4 ? 0.5 : 0)),
  };
  const score = Math.max(35, Math.min(97, Math.round(28 + (axes.pull + axes.talk + axes.clash + axes.grow) * 3.4 + (vEl >= 0 ? 4 : 0) + (vBA >= 0 ? 4 : 0))));
  const band = score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0;
  const elLine = SJ.STEM_EL[A.dayStem] === bEl ? C.el.same : vEl >= 0 ? fmt(C.el.help, { el: S.el[bEl] }) : fmt(C.el.strain, { el: S.el[bEl] });
  const kindT = (C.kind[kind] || C.kind.lover)[band >= 2 ? 'good' : 'bad'];
  const elA = SJ.STEM_EL[A.dayStem];
  return {
    score, band, axes, A, B,
    lines: [pickR(C.lead, (A.dayStem + B.dayStem) / 20), C.score[band], C.starOf[grp], elLine, C.day[dayRel || 'none'], kindT],
    doList: C.doList[bEl], dontList: C.dontList[elA],
  };
}

// ════════ 도한: 직장·사업 ════════
export function dohanSections(M, S, L, d, chart, now = new Date()) {
  const DH = M.dohan, U = M.ui, Y = chart.fav.yong, gw = chart.gw;
  const pe = MS.peopleOf(chart);
  const an = bs => bs.map(b => S.animal[b]).join('·');
  // 1) 일하는 스타일
  const ws = MS.workStyle(chart);
  const style = [DH.style[ws.type], ws.close ? fmt(DH.style.mix, { t: DH.style.name[ws.second] }) : ''].filter(Boolean);
  // 2) 맞는 업종과 역할
  const topTen = [...chart.tgCount.keys()].filter(i => chart.tgCount[i] > 0).sort((a, b) => chart.tgCount[b] - chart.tgCount[a])[0];
  const fields = [`${fmt(DH.fields.lead, { el: S.el[Y] })} (${DH.fields.list[Y]})`, fmt(DH.fields.roleLine, { r: DH.fields.role[Y] }), fmt(DH.fields.strength, { t: S.ten[topTen].split('(')[0], trait: S.tenTrait[topTen] })];
  // 3) 보고·회의·계약 시간
  const wh = MS.workHours(chart, d);
  const H2 = DH.hours2;
  // 같은 사람·같은 날이면 같은 문장: 그날의 난수(rolls)로 표현만 고름
  const pk = (arr, n) => arr[(Math.floor((d.rolls[n % d.rolls.length] || 0) * 997) + n) % arr.length];
  const KINDS = ['report', 'meeting', 'contract'];
  // 일정별로 고른 유리한 시간·피할 시간을 시간 기준으로 합쳐, 한 시간 안에서 보고·회의·계약을 코멘트로만 안내
  const goodMap = new Map(), badMap = new Map();
  KINDS.forEach(kind => {
    wh[kind].best.forEach(h => { if (!goodMap.has(h.i)) goodMap.set(h.i, { h, kinds: [] }); goodMap.get(h.i).kinds.push(kind); });
    const w = wh[kind].worst; if (!badMap.has(w.i)) badMap.set(w.i, { h: w, kinds: [] }); badMap.get(w.i).kinds.push(kind);
  });
  // 유리한 시간은 2개만: 여러 일정에 겹치는 시간 → 점수 높은 시간 순으로 고르고, 빠진 일정은 두 시간 중 더 맞는 쪽에 붙임
  const pick2 = [...goodMap.values()].sort((x, y) => y.kinds.length - x.kinds.length || y.h.score - x.h.score || x.h.i - y.h.i).slice(0, 2);
  KINDS.forEach(kind => {
    if (pick2.some(g => g.kinds.includes(kind))) return;
    const t = pick2.find(g => wh[kind].pref.includes(g.h.grp)) || [...pick2].sort((x, y) => y.h.score - x.h.score)[0];
    t.kinds.push(kind);
  });
  goodMap.clear(); pick2.forEach(g => goodMap.set(g.h.i, g));
  [...badMap.keys()].forEach(i => { if (goodMap.has(i)) badMap.delete(i); }); // 같은 시간이 양쪽에 걸리면 유리한 쪽만
  const goodLi = [...goodMap.values()].sort((x, y) => x.h.i - y.h.i).map(({ h, kinds }) => {
    const n = 10 + h.i * 3;
    const parts = [pk(H2.why[h.grp], n)];
    kinds.forEach((kind, j) => { parts.push(wh[kind].pref.includes(h.grp) ? pk(H2.fit[kind], n + j + 1) : fmt(pk(H2.plainK, n + j + 1), { k: U.kinds[kind] })); parts.push(pk(H2.act[kind], n + j + 2)); });
    if (h.rel === 'hap' || h.rel === 'samhap') parts.push(pk(H2.hap, n + 2));
    if (kinds.some(kind => wh[kind].pref.includes(h.grp)) && !h.fav) parts.push(pk(H2.unfav, n + 2));
    return `<li><b>${esc(hourName(L, h.i))}</b><p>${esc(parts.join(' '))}</p></li>`;
  }).join('');
  const badLi = [...badMap.values()].sort((x, y) => x.h.i - y.h.i).map(({ h, kinds }) => {
    const n = 30 + h.i * 2;
    const wType = h.rel === 'chung' ? 'chung' : (h.rel === 'hyeong' || h.rel === 'hae') ? 'clash' : 'low';
    const parts = [pk(H2.worst[wType], n), ...kinds.map((kind, j) => pk(H2.avoidAct[kind], n + j + 1))];
    return `<li><b>${esc(hourName(L, h.i))}</b><p>${esc(parts.join(' '))}</p></li>`;
  }).join('');
  const hours = `${p(H2.lead)}<div class="wk-box"><div class="wk-k"><p class="wk-lbl good">${esc(H2.good)}</p><ul class="wk-list">${goodLi}</ul>
<p class="wk-lbl bad">${esc(H2.bad)}</p><ul class="wk-list">${badLi}</ul></div></div>`;
  const ms = MS.monthScan(chart, now.getFullYear(), now.getMonth() + 1, 4);
  const F2 = DH.flow2;
  const toneIx = t => (t === 2 ? 0 : t === 1 ? 1 : 2);
  const m0 = ms[0], sig0 = MS.careerSignals(chart, m0);
  const yi = MS.yearInfo(chart, now.getFullYear()), sigY = MS.careerSignals(chart, yi);
  const sigs = [...new Set([...sig0, ...sigY])].slice(0, 2);
  const da = MS.currentDaeun(chart, now.getTime());
  // 이번 달 기운과 내 월지·일지의 관계
  const mr = m0.ev.rels.filter(r => r.pos === 'month' || r.pos === 'day');
  const relK = mr.some(r => r.type === 'chung') ? 'chung' : mr.some(r => r.type === 'hyeong' || r.type === 'hae') ? 'clash' : mr.some(r => r.type === 'hap' || r.type === 'samhap') ? 'hap' : 'none';
  // 달·해 문장은 그 달(해)의 간지로 고름 → 같은 달 안에서는 매일 같은 풀이
  const mk = (m0.gz.stem * 12 + m0.gz.branch), yk = (yi.gz.stem * 12 + yi.gz.branch);
  const at = (arr, k) => arr[k % arr.length];
  const ti = toneIx(m0.tone);
  const monthT = [at(F2.theme[m0.grpS][ti], mk), at(F2.detail[m0.grpS], mk + 1), at(F2.rel[relK], mk + 2), at(F2.toneAdv[ti], mk + 3), at(F2.closing[ti], mk + 4)].join(' ');
  const yT = yi.tone === 0 ? 1 : 0;
  const yearT = [at(F2.year[yi.grpS][yT], yk), at(F2.yDetail[yi.grpS], yk + 1), at(F2.yClose[yT], yk + 2)].join(' ');
  const flow = `<h3>${esc(U.thisMonth)}</h3>${p(monthT)}
<h3>${esc(U.next3)}</h3><ul class="m-months m-months-l">${ms.slice(1).map(x => { const k = x.gz.stem * 12 + x.gz.branch; return `<li class="t${x.tone}"><b>${x.m}월</b><span><em>${esc(DH.flow.short[x.grpS])} · ${esc(DH.flow.tone[x.tone])}</em> ${esc(at(F2.hint[x.grpS], k))} ${esc(at(F2.toneAdv[toneIx(x.tone)], k + 1))}</span></li>`; }).join('')}</ul>
<h3>${esc(U.thisYear)}</h3>${p(yearT)}
${sigs.length ? sigs.map((sg, i) => p(at(F2.sig[sg], yk + mk + i))).join('') : p(at(F2.noSig, yk))}
${da ? p(fmt(DH.flow.daeun, { gz: `${SJ.STEM_K[da.stem]}${SJ.BRANCH_K[da.branch]}(${SJ.STEM_H[da.stem]}${SJ.BRANCH_H[da.branch]})`, desc: S.daeunText[da.grp][da.tone === 0 ? 1 : 0].split(' — ')[1] })) : ''}`;
  // 5) 협업
  const collab = [fmt(DH.collab.noble, { a: an(pe.noble) }), fmt(DH.collab.match, { a: an(pe.match) }), fmt(DH.collab.clash, { a: an(pe.clash) }), gw[0] >= 3 ? DH.collab.rob : gw[0] <= 0.5 ? DH.collab.alone : DH.collab.mid];
  return {
    style: sec('style', U.secs.style, style.map(p).join('')),
    fields: sec('fields', U.secs.fields, fields.map(p).join('')),
    hours: sec('hours', U.secs.hours, hours),
    flow: sec('flow', U.secs.flow, flow),
    collab: sec('collab', U.secs.collab, collab.map(p).join('')),
  };
}
export function dohanTeaser(M, chart) { return first(M.dohan.style[MS.workStyle(chart).type], 2); }

// ── 방문 횟수에 따른 섹션 순서 (3번째 방문부터는 매일 바뀌는 내용을 먼저)
export const ORDER = {
  haewoon: { early: ['pillars', 'overall', 'rest', 'siun'], late: ['siun', 'overall', 'pillars', 'rest'], fold: [] }, // 처음 2번은 시운이 대운 아래, 3번째부터 맨 위
  hana: { early: ['temper', 'type', 'today', 'date', 'timing', 'people'], late: ['today', 'date', 'timing', 'people'], fold: ['temper', 'type'] },
  dohan: { early: ['style', 'fields', 'hours', 'flow', 'collab'], late: ['hours', 'flow', 'collab'], fold: ['style', 'fields'] },
};
export { stemName };
