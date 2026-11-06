// 2027 신년운세 화면 (해운정사) + 공유 카드(1080×1920)
import { SJ } from './engine.js';
import { esc, fmt } from './saju-view.js';

import { GOAT, SHEEP_PNG } from './goat.js';
export { GOAT };

const DOMS = ['wealth', 'love', 'work', 'health'];
const dots = n => `<span class="y-dots" aria-label="${n}/5">${[1, 2, 3, 4, 5].map(i => `<i${i <= n ? ' class="on"' : ''}></i>`).join('')}</span>`;
const mName = (Y, m) => fmt(Y.monthName, { m });
const ms = (Y, list) => list.map(m => mName(Y, m)).join(' · ');
// 문장 고르기: 같은 사람이면 늘 같은 문장
const seedOf = chart => chart.dayStem * 31 + chart.pillars.day.branch * 7 + (chart.pillars.month?.branch || 0) * 3 + (chart.pillars.year?.branch || 0);
const pickS = (arr, seed, salt = 0) => arr[Math.abs(seed * 13 + salt * 7) % arr.length];

// 12달 그래프
function graphSVG(Y, yf) {
  const W = 360, H = 170, x0 = 22, x1 = W - 14, yTop = 22, yBot = 128;
  const xs = i => x0 + (i * (x1 - x0)) / 11;
  const ys = s => yBot - ((Math.max(30, Math.min(100, s)) - 30) / 70) * (yBot - yTop);
  const pts = yf.months.map((m, i) => [xs(i), ys(m.score)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const [px, py] = pts[i - 1], [cx, cy] = pts[i], mx = (px + cx) / 2; d += ` C${mx},${py} ${mx},${cy} ${cx},${cy}`; }
  const area = `${d} L${pts[11][0]},${yBot} L${pts[0][0]},${yBot} Z`;
  return `<svg viewBox="0 0 ${W} ${H}" class="y-graph" role="img" aria-label="${esc(Y.secs.months)}">
<defs><linearGradient id="yg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9483B" stop-opacity=".28"/><stop offset="1" stop-color="#D9483B" stop-opacity="0"/></linearGradient></defs>
<path d="M${x0} ${ys(65)}H${x1}" stroke="#E9D9C6" stroke-dasharray="3 4"/>
<path d="${area}" fill="url(#yg)"/><path d="${d}" fill="none" stroke="#C8372D" stroke-width="2.6" stroke-linecap="round"/>
${yf.months.map((m, i) => {
    const best = yf.best.includes(m.m), worst = yf.worst.includes(m.m);
    return `<circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="${best ? 6 : 4}" fill="${best ? '#F2C14E' : worst ? '#9C948A' : '#fff'}" stroke="${best ? '#C98A22' : worst ? '#7A7268' : '#C8372D'}" stroke-width="2"/>${best ? `<text x="${pts[i][0]}" y="${pts[i][1] - 11}" text-anchor="middle" class="y-gs">${m.score}</text>` : ''}<text x="${pts[i][0]}" y="${H - 16}" text-anchor="middle" class="y-gm${best ? ' b' : ''}">${m.m}</text>`;
  }).join('')}
</svg><p class="y-legend"><span><i class="b"></i>${esc(Y.bestTitle)}</span><span><i class="w"></i>${esc(Y.worstTitle)}</span></p>`;
}

// 첫 화면(무료): 히어로 + 총평 + 분야 + 좋은 달·조심할 달 + 그래프 + 개운법
export function yearTopHTML(Y, S, chart, yf, name) {
  const seed = seedOf(chart);
  const bandName = Y.hero.bandName[yf.band];
  const who = name ? fmt(Y.hero.who, { name }) : Y.hero.whoGuest;
  const yong = S.yong[chart.fav.yong];
  const C = 2 * Math.PI * 42, off = C * (1 - yf.score / 100);
  const hero = `<section class="y-hero">
<p class="y-kick">${esc(Y.hero.kicker)}</p>
<h1 class="y-title">${esc(Y.hero.title)}</h1>
<div class="y-goat">${GOAT}</div>
<p class="y-who">${esc(who)}</p>
<div class="y-score"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" class="tr"/><circle cx="50" cy="50" r="42" class="fg" style="stroke-dasharray:${C.toFixed(1)};stroke-dashoffset:${off.toFixed(1)}"/></svg><div><b>${yf.score}</b><small>${esc(Y.hero.scoreLabel)}</small></div></div>
<p class="y-band">${esc(bandName)}</p>
<p class="y-kwt">${esc(Y.hero.kwTitle)}</p>
<ul class="y-kw">${yf.kw.map(k => `<li>#${esc(k)}</li>`).join('')}</ul>
<button type="button" class="y-share" id="yShare"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5M5 12v7.5h14V12"/></svg>${esc(Y.hero.share)}</button>
</section>`;
  // 총평
  const ov = [Y.intro, pickS(Y.overall[yf.band], seed), pickS(Y.stem[yf.grpS][yf.favS ? 0 : 1], seed, 1), pickS(Y.branch[yf.grpB][yf.favB ? 0 : 1], seed, 2)];
  if (yf.dae) ov.push(pickS(Y.dae[yf.dae.tone], seed, 3));
  if (yf.rel) ov.push(fmt(Y.rel[yf.rel.type], { pos: Y.posName[yf.rel.pos] }));
  const yb = chart.pillars.year.branch;
  if (yb === 7) ov.push(Y.bonmyeong);
  if ([11, 3, 7].includes(yb)) ov.push(Y.samjae);
  const overall = `<section class="sec y-sec"><h2>${esc(Y.secs.overall)}</h2>${ov.map(t => `<p>${esc(t)}</p>`).join('')}<p class="y-close">${esc(pickS(Y.close, seed, 4))}</p></section>`;
  // 분야
  const dom = `<section class="sec y-sec"><h2>${esc(Y.secs.dom)}</h2><ul class="y-dom">${DOMS.map((k, i) => `<li><div class="y-dh"><b>${esc(Y.domTitle[k])}</b>${dots(yf.dom[k])}</div><p>${esc(pickS(Y.dom[k][yf.dom[k] - 1], seed, 5 + i))}</p></li>`).join('')}</ul></section>`;
  // 좋은 달·조심할 달 + 그래프
  const months = `<section class="sec y-sec"><h2>${esc(Y.secs.months)}</h2>
<div class="y-bw"><div class="b"><small>${esc(Y.bestTitle)}</small><b>${esc(ms(Y, yf.best))}</b></div><div class="w"><small>${esc(Y.worstTitle)}</small><b>${esc(ms(Y, yf.worst))}</b></div></div>
${graphSVG(Y, yf)}
<p>${esc(fmt(Y.bestLine, { ms: ms(Y, yf.best) }))} ${esc(fmt(Y.worstLine, { ms: ms(Y, yf.worst) }))}</p>
<p class="y-note">${esc(Y.ipchun)}</p></section>`;
  const luck = `<section class="sec y-sec y-luck"><h2>${esc(Y.secs.luck)}</h2><p>${esc(fmt(Y.luck.lead, { el: S.el[chart.fav.yong] }))}</p>
<dl><div><dt>${esc(Y.luck.color)}</dt><dd>${esc(yong.color)}</dd></div><div><dt>${esc(Y.luck.dir)}</dt><dd>${esc(yong.dir)}</dd></div><div><dt>${esc(Y.luck.num)}</dt><dd>${esc(yong.num)}</dd></div><div><dt>${esc(Y.luck.act)}</dt><dd>${esc(yong.act)}</dd></div></dl></section>`;
  return { hero, overall, dom, months, luck };
}

// 12달 상세 (광고 1회 후)
export function yearDetailHTML(Y, yf, chart) {
  const seed = seedOf(chart);
  return `<ol class="y-mlist">${yf.months.map((mo, i) => {
    const t = [Y.month.season[mo.m - 1], pickS(Y.month.band[mo.band], seed, i), mo.band <= 1 ? Y.month.relief[mo.top] : pickS(Y.month.top[mo.top], seed, i + 3)];
    if (mo.ev.domRaw[mo.low] < 2.6) t.push(Y.month.low[mo.low]);
    const tag = yf.best.includes(mo.m) ? ' is-best' : yf.worst.includes(mo.m) ? ' is-worst' : '';
    return `<li class="y-mo${tag}"><div class="y-mh"><b>${esc(mName(Y, mo.m))}</b><span class="y-gz">${SJ.STEM_H[mo.gz.stem]}${SJ.BRANCH_H[mo.gz.branch]}月</span><em>${mo.score}</em></div>
<p>${t.map(esc).join(' ')}</p><p class="y-days"><small>${esc(Y.month.goodDays)}</small>${mo.good.map(d => `<span>${esc(fmt(Y.month.dayFmt, { m: mo.m, d }))}</span>`).join('')}</p></li>`;
  }).join('')}</ol>`;
}

export function yearLockHTML(Y) {
  return `<div class="y-lock"><div class="y-lock-blur" aria-hidden="true">${Array.from({ length: 3 }, (_, i) => `<div class="y-mo"><div class="y-mh"><b>${i + 1}월</b><em>··</em></div><p>■■■■ ■■■ ■■■■■ ■■ ■■■■ ■■■■■■ ■■■</p></div>`).join('')}</div>
<div class="y-lock-box"><b>${esc(Y.lock.title)}</b><p>${esc(Y.lock.desc)}</p><button type="button" class="btn-primary y-btn" id="yUnlock">${esc(Y.lock.btn)}</button><small>${esc(Y.lock.note)}</small></div></div>`;
}

// ── 공유 카드: 이름은 넣지 않음(개인정보 없이 키워드·점수·좋은 달만)
const loadImg = src => new Promise((ok, no) => { const img = new Image(); img.onload = () => ok(img); img.onerror = no; img.src = src; });
function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
export async function makeCard(Y, S, chart, yf) {
  const serif = '"Noto Serif KR", serif', sans = '"Pretendard Variable", Pretendard, system-ui, sans-serif';
  try { await Promise.all([document.fonts.load(`700 80px ${serif}`, '정미년'), document.fonts.load(`600 40px ${sans}`, '키워드')]); } catch { /* 시스템 글꼴로 */ }
  const W = 1080, H = 1920, cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#FFF9F0'); g.addColorStop(0.5, '#FFEBD2'); g.addColorStop(1, '#F9D3A8');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // 바탕 무늬: 구름 점
  ctx.fillStyle = 'rgba(242,193,78,.14)';
  for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc((i * 233) % W, (i * 397) % 900, 30 + (i % 4) * 14, 0, Math.PI * 2); ctx.fill(); }
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#B5652F'; ctx.font = `600 38px ${sans}`; ctx.fillText(Y.hero.kicker, W / 2, 150);
  ctx.fillStyle = '#C8372D'; ctx.font = `700 92px ${serif}`; ctx.fillText(Y.hero.kwTitle, W / 2, 262);
  try { const img = await loadImg(SHEEP_PNG); const h = 540, w = Math.round(h * img.naturalWidth / img.naturalHeight); ctx.drawImage(img, W / 2 - w / 2, 290, w, h); } catch { /* */ }
  // 크림 패널
  ctx.fillStyle = '#FFFFFF'; ctx.shadowColor = 'rgba(160,80,40,.18)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 12; rrect(ctx, 70, 850, W - 140, 860, 48); ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#C8372D';
  yf.kw.forEach((k, i) => { ctx.font = `700 ${k.length > 4 ? 84 : 100}px ${serif}`; ctx.fillText(`#${k}`, W / 2, 1010 + i * 150); });
  ctx.strokeStyle = '#EAD7C0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(170, 1380); ctx.lineTo(W - 170, 1380); ctx.stroke();
  const rows = [[Y.hero.scoreLabel, `${yf.score} · ${Y.hero.bandName[yf.band]}`], [Y.card.best, ms(Y, yf.best)], [Y.card.color, S.yong[chart.fav.yong].color]];
  rows.forEach(([a, b], i) => {
    const y = 1462 + i * 82;
    ctx.textAlign = 'left'; ctx.fillStyle = '#9A7F68'; ctx.font = `600 36px ${sans}`; ctx.fillText(a, 170, y);
    ctx.textAlign = 'right'; ctx.fillStyle = '#3B2320'; ctx.font = `700 40px ${sans}`; ctx.fillText(b, W - 170, y);
  });
  ctx.textAlign = 'center'; ctx.fillStyle = '#8E1D17'; ctx.font = `700 40px ${serif}`; ctx.fillText(Y.card.brand, W / 2, 1800);
  ctx.font = `500 30px ${sans}`; ctx.fillStyle = '#9A7F68'; ctx.fillText(Y.card.site, W / 2, 1850);
  return new Promise(ok => cv.toBlob(ok, 'image/png'));
}
