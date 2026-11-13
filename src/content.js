// 빌드(Node)와 브라우저가 함께 쓰는 화면 조각: 시간 다이얼, 정적 운세 문단.
import { generic, pick, signRanking, COLOR_HEX } from './engine.js';

export const LANGS = ['ko', 'ja', 'zh', 'en', 'es', 'id'];
export const FLAG = { ko: 'kr', ja: 'jp', zh: 'cn', en: 'us', es: 'es', id: 'id' };
export const TZ = { ko: 'Asia/Seoul', ja: 'Asia/Tokyo', zh: 'Asia/Shanghai', en: 'America/New_York', es: 'America/Mexico_City', id: 'Asia/Jakarta' };

export const SLUG = {
  zodiac: ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'],
  horoscope: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'],
  hour: ['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'],
  blood: ['a', 'b', 'o', 'ab'],
};
export const BRANCH = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const SIGN_GLYPH = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
export const BLOOD_LABEL = ['A', 'B', 'O', 'AB'];

export const fmt = (s, o = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => (o[k] ?? ''));
// 일본어·중국어: 문장 사이 '。 ' 공백 제거 (한국어·영어 영향 없음)
export const esc = s => String(s ?? '').replace(/([。！？])[ ]+/g, '$1').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');

export function sijinRange(i) {
  const s = (23 + 2 * i) % 24, e = (1 + 2 * i) % 24;
  return `${pad(s)}:00–${pad(e)}:00`;
}
// 다이얼 둘레 글자: 한중일은 지지 한자, 나머지는 띠 이름
export function dialLabels(L) {
  return ['ko', 'ja', 'zh'].includes(L.code) ? BRANCH : L.animals;
}
// 'YYYY-MM-DD' (해당 시간대 기준)
export function todayIn(tz, d = new Date()) {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  return p;
}
export function fmtDate(L, key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Intl.DateTimeFormat(L.htmlLang, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
}
export const levelOf = v => (v <= 2 ? 0 : v === 3 ? 1 : 2);

// 점수(15~99) → 쪽빛에서 놋쇠 금빛으로
export function heat(v) {
  // 흰 바탕용: 낮음(옅은 한지) → 보통(연분홍) → 높음(인주)
  const t = Math.max(0, Math.min(1, (v - 20) / 75));
  const st = [[237, 234, 227], [242, 208, 192], [214, 104, 86]];
  const [a, b, k] = t < 0.5 ? [st[0], st[1], t * 2] : [st[1], st[2], (t - 0.5) * 2];
  const c = a.map((x, i) => Math.round(x + (b[i] - x) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// 앙부일구 모티브 시간 다이얼. 자시(子)가 위, 시계 방향.
// hours: 12개 점수 또는 null(점수 없이 바늘만), nowMin: 0~1439
export function dialSVG({ hours = null, labels, nowMin = null, best = -1, worst = -1, size = 320, id = 'dial', centerTop = '', centerMain = '', centerSub = '' }) {
  const c = 160, R0 = 150, R1 = 118, R2 = 74; // 바깥 테, 칸 바깥, 칸 안쪽
  const pt = (r, deg) => { const a = (deg - 90) * Math.PI / 180; return [c + r * Math.cos(a), c + r * Math.sin(a)]; };
  const f = n => n.toFixed(2);
  let segs = '', ticks = '', text = '';
  for (let i = 0; i < 12; i++) {
    const a0 = i * 30 - 15 + 0.8, a1 = i * 30 + 15 - 0.8;
    const [x0, y0] = pt(R1, a0), [x1, y1] = pt(R1, a1), [x2, y2] = pt(R2, a1), [x3, y3] = pt(R2, a0);
    const fill = hours ? heat(hours[i]) : 'var(--ink-2)';
    const cls = `seg${i === best ? ' is-best' : ''}${i === worst ? ' is-worst' : ''}`;
    segs += `<path class="${cls}" data-i="${i}" d="M${f(x0)} ${f(y0)}A${R1} ${R1} 0 0 1 ${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}A${R2} ${R2} 0 0 0 ${f(x3)} ${f(y3)}Z" fill="${fill}"><title>${esc(labels[i])}</title></path>`;
    // 바깥 테에 지지(子丑寅…), 색 칸 안에 24시간 시각(子=00:00 … 亥=22:00)
    const [lx, ly] = pt((R0 + R1) / 2 - (String(labels[i]).length > 5 ? 3 : -1), i * 30);
    const [hx, hy] = pt(R1 - 16, i * 30);
    const short = String(labels[i]);
    text += `<text x="${f(lx)}" y="${f(ly)}" class="dl${short.length > 6 ? ' dl-long dl-xl' : short.length > 2 ? ' dl-long' : ''}" text-anchor="middle" dominant-baseline="central">${esc(short)}</text>`;
    text += `<text x="${f(hx)}" y="${f(hy)}" class="dh${i === best ? ' dh-best' : ''}${i === worst ? ' dh-worst' : ''}" text-anchor="middle" dominant-baseline="central">${String(i * 2).padStart(2, '0')}:00</text>`;
  }
  for (let k = 0; k < 96; k++) { // 15분 눈금
    const deg = k * 3.75, major = k % 8 === 4;
    const [a, b] = pt(R0 - 2, deg), [cc, d] = pt(R0 - (major ? 10 : 5), deg);
    ticks += `<line x1="${f(a)}" y1="${f(b)}" x2="${f(cc)}" y2="${f(d)}" class="${major ? 'tk tk-m' : 'tk'}"/>`;
  }
  let needle = '';
  if (nowMin !== null) {
    const deg = nowMin / 1440 * 360;
    needle = `<g class="needle" style="--deg:${f(deg)}deg"><line x1="${c}" y1="${c - R2 + 4}" x2="${c}" y2="${c - R1 - 4}"/><circle cx="${c}" cy="${c - R1 - 6}" r="4"/></g>`;
    const sdeg = typeof window === 'undefined' ? 0 : new Date().getSeconds() * 6;
    needle += `<g class="sec-hand" style="transform:rotate(${sdeg}deg)"><line x1="${c}" y1="${c - R2 + 2}" x2="${c}" y2="${c - R0 + 4}"/><circle cx="${c}" cy="${c - R0 + 4}" r="2.6"/></g>`;
  }
  return `<svg class="dial" id="${id}" viewBox="0 0 320 320" width="${size}" height="${size}" role="img" aria-label="${esc(centerTop || 'dial')}">
<circle cx="${c}" cy="${c}" r="${R0 + 6}" class="rim"/><circle cx="${c}" cy="${c}" r="${R0}" class="bowl"/>
${ticks}${segs}${text}
<circle cx="${c}" cy="${c}" r="${R2 - 6}" class="hub"/>
<text x="${c}" y="${c - 22}" class="c-top${String(centerTop).length > 22 ? ' c-sm c-xs' : String(centerTop).length > 14 ? ' c-sm' : ''}" text-anchor="middle">${esc(centerTop)}</text>
<text x="${c}" y="${c + 12}" class="c-main" text-anchor="middle">${esc(centerMain)}</text>
<text x="${c}" y="${c + 36}" class="c-sub" text-anchor="middle">${esc(centerSub)}</text>
${needle}</svg>`;
}

// ── 문장 조합 (문장 풀을 이어 붙여 가짓수를 늘림)
// rolls 위치: 0 총평, 1~12 분야별(3개씩), 13~15 좋은 시간, 16~18 조심할 시간, 19 행운 아이템, 20~27 宜/忌, 28~29 타임머신 덧붙임
const P = (arr, r) => arr[Math.floor(r * arr.length) % arr.length];
export const joiner = L => (['ja', 'zh'].includes(L.code) ? '' : ' ');
// reason: 사주 근거 문장(있으면 첫 문장을 대신함)
export function domainText(L, k, v, rolls, i, tense = 'now', reason = null) {
  const D = L.lines.domains[k], lv = levelOf(v), j = joiner(L);
  if (tense === 'past') return [P(D.pastState[lv], rolls[1 + 3 * i]), P(D.pastReflect, rolls[2 + 3 * i])].join(j);
  return [reason || P(D.state[lv], rolls[1 + 3 * i]), P(D.advice[lv], rolls[2 + 3 * i]), P(D.tip, rolls[3 + 3 * i])].join(j);
}
export function hourText(L, kind, hLabel, rolls) {
  const H = L.lines[kind === 'best' ? 'hourBest' : 'hourWorst'], o = kind === 'best' ? 13 : 16;
  return [fmt(P(H.open, rolls[o]), { h: hLabel }), P(H.advice, rolls[o + 1]), P(H.close, rolls[o + 2])].join(joiner(L));
}
// 궁합 세부 안내: 총평·띠 관계·함께하기 좋은 시간 (각 4문장)
export function loveTexts(L, cp, hLabel) {
  const V = L.lines.love, r = cp.rolls, j = joiner(L), rk = String(cp.rel);
  return {
    summary: [P(L.compatLines[cp.band], r[0]), P(V.body[cp.band], r[1]), P(V.advice[cp.band], r[2]), P(V.close, r[3])].join(j),
    rel: [L.compatRel[rk], P(V.relBody[rk], r[4]), P(V.relAdvice[rk], r[5]), P(cp.elemMatch ? V.elemYes : V.elemNo, r[6])].join(j),
    hour: [fmt(P(V.hourOpen, r[7]), { h: hLabel }), P(V.hourBody, r[8]), P(V.hourIdea, r[9]), P(V.hourClose, r[10])].join(j),
  };
}
// 총평: one = 운세 탭(1문장), 타임머신은 2문장(지난 날이면 과거형)
export function summaryText(L, band, rolls, tense = 'one') {
  if (tense === 'one') return P(L.summary[band], rolls[0]);
  if (tense === 'past') return [P(L.lines.pastSummary[band], rolls[0]), P(L.lines.pastAdd, rolls[29])].join(joiner(L));
  return [P(L.summary[band], rolls[0]), P(L.lines.summaryAdd, rolls[28])].join(joiner(L));
}
// 브라우저에서 다이얼 바늘(시·초)을 실시간으로 움직임
export function startHands() {
  if (typeof window === 'undefined' || window.__ttfHands) return;
  window.__ttfHands = true;
  const tick = () => {
    const now = new Date();
    const sdeg = now.getSeconds() * 6, hdeg = (now.getHours() * 60 + now.getMinutes()) / 1440 * 360;
    document.querySelectorAll('.dial .sec-hand').forEach(el => {
      const wrap = sdeg === 0;
      el.style.transition = wrap ? 'none' : '';
      el.style.transform = `rotate(${sdeg}deg)`;
    });
    document.querySelectorAll('.dial .needle').forEach(el => el.style.setProperty('--deg', `${hdeg.toFixed(2)}deg`));
  };
  tick();
  setTimeout(() => { tick(); setInterval(tick, 1000); }, 1000 - (Date.now() % 1000));
}

// 5칸 게이지: 단계별 색(1~2 붉음 · 3 호박 · 4~5 초록) + 숫자
export function pips(v) {
  const lv = v <= 2 ? 'lo' : v === 3 ? 'mid' : 'hi';
  return `<span class="pips pips-${lv}" role="img" aria-label="${v}/5">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= v ? 'on' : ''}"></i>`).join('')}<b>${v}<small>/5</small></b></span>`;
}

// 정적 목록 페이지: 항목별 오늘 점수. 일본어 별자리는 '오늘의 순위' 형식
export function indexListHTML(L, kind, dateK) {
  const names = { zodiac: L.animals, horoscope: L.signs, hour: L.sijin, blood: BLOOD_LABEL.map(b => (L.code === 'ja' ? `${b}型` : b)) }[kind];
  let order = names.map((_, i) => i);
  const ranked = kind === 'horoscope' && L.code === 'ja';
  if (ranked) order = signRanking(dateK);
  const items = order.map((i, n) => {
    const g = generic(kind, i, dateK, L.code);
    const sub = kind === 'hour' ? sijinRange(i) : kind === 'horoscope' ? SIGN_GLYPH[i] : '';
    return `<li><a href="/${L.code}/${kind}/${SLUG[kind][i]}/">${ranked ? `<span class="rank">${n + 1}</span>` : ''}<span class="nm">${esc(names[i])}</span>${sub ? `<span class="sub">${esc(sub)}</span>` : ''}<span class="sc" style="--h:${heat(g.score)}">${g.score}</span></a></li>`;
  }).join('');
  return `<p class="asof">${esc(fmt(L.ui.asOf, { d: fmtDate(L, dateK) }))}</p><ol class="glist${ranked ? ' ranked' : ''}">${items}</ol>`;
}

// 정적 페이지(띠·별자리·시진·혈액형)의 '오늘' 운세 문단
export function genericReading(L, kind, idx, dateK) {
  const g = generic(kind, idx, dateK, L.code);
  return {
    ...g,
    summary: summaryText(L, g.band, g.rolls, 'now'),
    domainsList: ['wealth', 'love', 'work', 'health'].map((k, i) => ({ k, label: L.ui.domains[k], v: g.domains[k], line: domainText(L, k, g.domains[k], g.rolls, i) })),
    colorName: L.colors[g.color], colorHex: COLOR_HEX[g.color], dirName: L.directions[g.direction], hourName: L.sijin[g.bestHour],
  };
}
export function readingHTML(L, r, dateK) {
  const U = L.ui;
  return `<p class="asof">${esc(fmt(U.asOf, { d: fmtDate(L, dateK) }))}</p>
<div class="score-line"><span class="score-num">${r.score}</span><p class="lead">${esc(r.summary)}</p></div>
<ul class="domains">${r.domainsList.map(d => `<li><span class="d-label">${esc(d.label)}</span>${pips(d.v)}<span class="d-line">${esc(d.line)}</span></li>`).join('')}</ul>
<dl class="kw">
<div><dt>${esc(U.kwColor)}</dt><dd><span class="swatch" style="background:${r.colorHex}"></span>${esc(r.colorName)}</dd></div>
<div><dt>${esc(U.kwDirection)}</dt><dd>${esc(r.dirName)}</dd></div>
<div><dt>${esc(U.best)}</dt><dd>${esc(r.hourName)}</dd></div>
<div><dt>${esc(U.luckyNum)}</dt><dd>${r.numbers.join(', ')}</dd></div>
</dl>`;
}
