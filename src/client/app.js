// Fortune in Time 화면 동작: 입력 페이지와 결과 4탭(운세, 궁합, 타임머신, 부적)
import * as E from './engine.js';
import { mountPlace } from './place.js';
import { mountBoard } from './board.js';
import { basisHTML, domainReading, sajuTabHTML, todayReading, todayReadingHTML } from './saju-view.js';
import * as MV from './masters-view.js';
import { freeMaster, MASTERS } from './masters.js';
import { dialSVG, dialLabels, fmt, esc, pips, sijinRange, fmtDate, BLOOD_LABEL, SIGN_GLYPH, domainText, hourText, summaryText, loveTexts, startHands } from './content.js';

const D = JSON.parse(document.getElementById('ttf-data').textContent);
const L = D.L, U = L.ui, C = L.code;
const S = L.saju || null; // 사주 풀이 문장(한국어). 없으면 한자 요약만
const M = L.masters || null; // 명인(해운정사·하나·도한) 문장. 있으면 오늘/명인/미래/부적 구성
const HAS_M = !!(S && M);
const body = document.body;
const qs = new URLSearchParams(location.search);
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── 저장소: 모두 이 기기 안에만
const store = {
  get(k, def) { try { const v = localStorage.getItem('ttf.' + k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set(k, v) { try { localStorage.setItem('ttf.' + k, JSON.stringify(v)); } catch { /* 저장 불가 환경 */ } },
  del(k) { try { localStorage.removeItem('ttf.' + k); } catch { /* */ } },
};
const session = {
  get(k) { try { return JSON.parse(sessionStorage.getItem('ttf.' + k)); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem('ttf.' + k, JSON.stringify(v)); } catch { /* */ } },
  del(k) { try { sessionStorage.removeItem('ttf.' + k); } catch { /* */ } },
};
store.set('lang', C);

// ── 공통 도구
const pad = n => String(n).padStart(2, '0');
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const hhmm = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`; };
const addDays = (key, n) => { const { y, m, d } = E.parseKey(key); const t = new Date(Date.UTC(y, m - 1, d + n)); return t.toISOString().slice(0, 10); };
const todayKey = () => E.dateKey(new Date());
const b64e = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64d = s => { try { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))))); } catch { return null; } };
const isPreview = () => document.documentElement.classList.contains('ad-preview');

function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 2400);
}
function modal(text, { closable = true } = {}) {
  const m = $('#modal'); if (!m) return;
  $('#modalText').textContent = text;
  $('#modalClose').hidden = !closable;
  m.hidden = false;
  $('#modalClose').onclick = () => { m.hidden = true; };
}

// ── 광고
function adSlot(name) {
  const slot = (D.ads.slots || {})[name];
  return `<aside class="ad" data-ad="${name}"><span class="ad-label">${esc(U.ad)}</span>${D.ads.on && slot
    ? `<ins class="adsbygoogle" style="display:block" data-ad-client="${D.ads.client}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`
    : `<div class="ad-mock">${esc(U.adMock)} ${name}</div>`}</aside>`;
}
function pushAds(root = document) {
  $$('ins.adsbygoogle', root).forEach(ins => {
    if (ins.dataset.pushed || ins.closest('[hidden]')) return;
    ins.dataset.pushed = '1';
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* 광고 차단 등 */ }
  });
}
// 보상형 광고: 실제 연동 시 window.ttfShowRewarded(onGranted)를 정의하면 그것을 씁니다.
const canReward = () => typeof window.ttfShowRewarded === 'function' || isPreview();
function showRewarded(onGranted) {
  if (typeof window.ttfShowRewarded === 'function') return window.ttfShowRewarded(onGranted);
  let s = 5;
  modal(fmt(U.rewardWait, { s }), { closable: false });
  const t = setInterval(() => {
    s -= 1;
    if (s > 0) { $('#modalText').textContent = fmt(U.rewardWait, { s }); return; }
    clearInterval(t); $('#modal').hidden = true; onGranted();
  }, 1000);
}

// ── 공유
async function shareLink(url, text) {
  if (navigator.share) { try { await navigator.share({ title: D.brand, text, url }); return; } catch { /* 취소 */ } }
  try { await navigator.clipboard.writeText(url); toast(U.copied); } catch { prompt('', url); }
}
async function shareCanvas(canvas, filename, text) {
  const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
  const file = new File([blob], filename, { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: D.brand, text }); return; } catch { /* 취소 → 저장 */ }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });

// 다이얼 SVG를 그림 파일로 그릴 때 필요한 스타일(외부 CSS가 적용되지 않으므로)
const SVG_STYLE = `<style>.rim{fill:#1A1A1A}.bowl{fill:#fff}.tk{stroke:#CFC9BC;stroke-width:1}.tk-m{stroke:#1A1A1A;stroke-width:1.4}.seg{stroke:#fff;stroke-width:1.2}.dl{fill:#1A1A1A;font:600 15px serif}.dl-long{font-size:9px}.dl-xl{font-size:8px}.hub{fill:#fff;stroke:#1A1A1A;stroke-width:1}.c-top{fill:#6E6A62;font:12px sans-serif}.c-sm{font-size:10px}.c-xs{font-size:8.6px}.dh{fill:#3A3631;font:700 9px sans-serif}.c-main{fill:#B3261E;font:700 34px serif}.c-sub{fill:#6E6A62;font:12px sans-serif}.needle line{stroke:#1A1A1A;stroke-width:2.5}.needle circle{fill:#B3261E}.sec-hand{display:none}.seg.is-best{stroke:#1A1A1A;stroke-width:2.4}.seg.is-worst{stroke:#8C877D;stroke-width:2;stroke-dasharray:4 3}</style>`;
function svgToImg(svg) {
  const s = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ').replace(/(<svg[^>]*>)/, `$1${SVG_STYLE}`)
    .replace(/<g class="needle" style="--deg:([\d.]+)deg">/, (_, d) => `<g class="needle" transform="rotate(${d} 160 160)">`)
    .replace(/var\(--ink-2\)/g, '#FAF8F3');
  return loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s));
}
function wrapText(ctx, text, x, y, maxW, lh) {
  const words = /[぀-鿿가-힯]/.test(text) ? [...text] : text.split(' ');
  const sep = words.length === [...text].length ? '' : ' ';
  let line = '';
  for (const w of words) {
    const t = line ? line + sep + w : w;
    if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = w; } else line = t;
  }
  if (line) ctx.fillText(line, x, y);
  return y + lh;
}

// ── 프로필
function profile() { return store.get('profile', null); }
// 같은 기기에서는 시간대(6시·18시)마다 처음 운세를 본 정보로 고정.
// 이름·생년월일 등을 바꿔도 바뀐 정보의 운세는 다음 시간대부터 보임(관리자 제외). 시간대가 바뀌면 그때 저장된 정보로 다시 고정
function activeRaw() {
  const raw = profile(); if (!raw) return null;
  if (isAdmin()) return raw;
  const per = E.period(), lk = store.get('lock', null), seed = E.profileSeed(raw);
  if (!lk || lk.per !== per.key || !lk.raw) { store.set('lock', { per: per.key, seed, raw }); return raw; }
  return lk.seed === seed ? raw : lk.raw;
}
const lockedOther = () => { const raw = profile(), lk = store.get('lock', null); return !!(raw && lk && !isAdmin() && lk.per === E.period().key && lk.seed !== E.profileSeed(raw)); };
function P() { const p = activeRaw(); return p ? E.profileFrom(p) : null; }

// ── 시계: 화면의 카운트다운을 1초마다 갱신, 리셋 시각이 지나면 다시 그림
function startTicker(onReset) {
  let next = E.period().next;
  const tick = () => {
    const left = next - Date.now();
    $$('[data-count]').forEach(el => { el.textContent = clock(left); });
    if (left <= 0) { next = E.period().next; onReset && onReset(); }
  };
  tick(); setInterval(tick, 1000);
}

// ════════════════════════════════════════
// 입력 페이지
// ════════════════════════════════════════
function initInput() {
  const form = $('#profileForm');
  const inv = qs.get('inv') || session.get('inv');
  if (inv) session.set('inv', inv);
  const p = profile();
  if (p && inv) { // 초대 링크로 들어왔고 이미 정보가 있으면 바로 궁합 결과로
    location.replace(`/${C}/result/love/?inv=${inv}`);
    return;
  }
  // 이 기기에 저장된 정보: 카드로 보여주고, '수정'을 누르면 채워진 입력 칸이 열림
  const card = $('#savedCard');
  const showForm = open => { form.hidden = !open; card.hidden = open || !profile(); };
  if (p) {
    const birth = p.cal === 'lunar' ? `${U.lunar} ${p.ly}.${p.lm}.${p.ld}${p.leap ? ` (${U.leap})` : ''} → ${U.solar} ${p.y}.${p.m}.${p.d}` : `${p.y}.${p.m}.${p.d}`;
    const time = p.timeMode === 'exact' ? `${pad(p.hh)}:${pad(p.mm)} (${L.sijin[p.sijin]})` : p.timeMode === 'sijin' ? `${L.sijin[p.sijin]} (${sijinRange(p.sijin)})` : U.unknown;
    $('#savedBody').innerHTML = `<dl class="saved-dl">
${p.name ? `<div><dt>${esc(U.name)}</dt><dd>${esc(p.name)}</dd></div>` : ''}
<div><dt>${esc(U.gender)}</dt><dd>${esc(p.gender === 'F' ? U.female : U.male)}</dd></div>
<div><dt>${esc(U.birth)}</dt><dd>${esc(birth)}</dd></div>
<div><dt>${esc(U.birthTime)}</dt><dd>${esc(time)}</dd></div>
<div><dt>${esc(U.country)}</dt><dd>${esc(L.countries[p.country] || '')}</dd></div>
${p.blood !== null && p.blood !== undefined ? `<div><dt>${esc(U.blood)}</dt><dd>${BLOOD_LABEL[p.blood]}</dd></div>` : ''}
</dl>`;
    $('#savedEdit').addEventListener('click', () => { showForm(true); form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); });
    $('#savedDel').addEventListener('click', () => {
      ['profile', 'partner', 'days', 'charm'].forEach(k => store.del(k)); // 운명 바꾸기 횟수·시간대 고정(lock)은 남겨 둠
      form.reset(); showForm(true);
    });
    showForm(qs.has('edit'));
  } else showForm(true);
  if (inv) {
    const o = b64d(inv);
    if (o) { const b = $('#inviteBanner'); b.textContent = fmt(U.invitedBy, { n: o.n || '?' }); b.hidden = false; }
  }
  // 지금 이 시간
  const drawNow = () => {
    const d = new Date();
    const si = E.sijinIndex(d.getHours(), d.getMinutes());
    $('#nowIs').innerHTML = `${esc(fmt(U.nowIs, { s: L.sijin[si] }))}<small>${sijinRange(si)}</small>`;
    $('#nowDial').innerHTML = dialSVG({ labels: dialLabels(L), nowMin: nowMin(), size: 200, id: 'ndial', centerTop: U.now, centerMain: dialLabels(L)[si], centerSub: hhmm(d) });
    requestAnimationFrame(() => $('#ndial')?.classList.add('is-in'));
  };
  drawNow(); setInterval(drawNow, 60000);
  const cnt = $('#nowCount'); cnt.dataset.count = '1';
  startTicker();

  // 입력 칸 동작
  const exact = form.exact, sijinSel = form.sijin;
  exact.addEventListener('change', () => { $('.exact-time', form).hidden = !exact.checked; sijinSel.disabled = exact.checked; });
  if (form.cal) $$('input[name=cal]', form).forEach(r => r.addEventListener('change', () => { $('.leap', form).hidden = form.cal.value !== 'lunar'; }));

  // 수정 모드: 저장된 값 채우기
  if (p) {
    form.name.value = p.name || '';
    $$(`input[name=gender][value="${p.gender}"]`, form).forEach(r => { r.checked = true; });
    if (form.cal && p.cal === 'lunar') { $$('input[name=cal][value=lunar]', form)[0].checked = true; $('.leap', form).hidden = false; form.leap.checked = !!p.leap; }
    form.y.value = p.cal === 'lunar' ? p.ly : p.y; form.m.value = p.cal === 'lunar' ? p.lm : p.m; form.d.value = p.cal === 'lunar' ? p.ld : p.d;
    if (p.timeMode === 'exact') { exact.checked = true; exact.dispatchEvent(new Event('change')); form.hh.value = p.hh; form.mm.value = p.mm; } else if (p.timeMode === 'sijin') sijinSel.value = p.sijin;
    form.country.value = p.country || L.defaultCountry;
    if (form.blood && p.blood !== null && p.blood !== undefined) $$(`input[name=blood][value="${p.blood}"]`, form).forEach(r => { r.checked = true; });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const err = $('#formErr');
    const y = +form.y.value, m = +form.m.value, d = +form.d.value;
    if (!y || !m || !d) { err.textContent = U.required; err.hidden = false; form.y.focus(); return; }
    const out = { name: form.name.value.trim(), gender: form.gender.value, country: form.country.value, cal: 'solar', y, m, d, sijin: null, timeMode: 'unknown', blood: null, mbti: p?.mbti || null };
    if (form.cal && form.cal.value === 'lunar') {
      const { default: Cal } = await import('./lunar.mjs');
      const cal = new Cal();
      if (!cal.setLunarDate(y, m, d, !!form.leap.checked)) { err.textContent = U.required; err.hidden = false; return; }
      const s = cal.getSolarCalendar();
      Object.assign(out, { cal: 'lunar', ly: y, lm: m, ld: d, leap: !!form.leap.checked, y: s.year, m: s.month, d: s.day });
    } else {
      const t = new Date(y, m - 1, d);
      if (t.getMonth() !== m - 1) { err.textContent = U.required; err.hidden = false; form.d.focus(); return; }
    }
    if (exact.checked) Object.assign(out, { timeMode: 'exact', hh: +form.hh.value, mm: +form.mm.value, sijin: E.correctedSijin(+form.hh.value, +form.mm.value, out.country) });
    else if (sijinSel.value !== '') Object.assign(out, { timeMode: 'sijin', sijin: +sijinSel.value });
    if (form.blood && form.blood.value !== '') out.blood = +form.blood.value;
    store.set('profile', out);
    const pending = session.get('inv');
    location.href = pending ? `/${C}/result/love/?inv=${pending}` : `/${C}/result/fortune/`;
  });
}

// ════════════════════════════════════════
// 결과 화면 공통
// ════════════════════════════════════════
const app = () => $('#app');
// 이름이 관리자 이름이면 모든 횟수 제한을 풀어 줌(이 기기에서만). 코드에는 이름 대신 해시만 둠
// 게시판의 수정·삭제 권한은 서버(Cloudflare 비밀값 ADMIN_NAME)에서 따로 확인
const nameHash = s => { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (let i = 0, ch; i < s.length; i++) { ch = s.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36); };
const ADMIN_HASH = 'uzj8gzsi7a';
const isAdmin = () => nameHash((profile()?.name || '').trim().toLowerCase()) === ADMIN_HASH;
const UNLIMITED = 999;
function turnsState(key) {
  const t = store.get('turns', {});
  const s = t[key] || { used: 0, bonus: 0 };
  return { ...s, left: isAdmin() ? UNLIMITED : 1 + s.bonus - s.used };
}
function saveTurns(key, s) {
  const t = store.get('turns', {});
  const old = addDays(key.slice(0, 10), -2);
  Object.keys(t).forEach(k => { if (k.slice(0, 10) < old) delete t[k]; }); // 지난 기록 정리
  t[key] = { used: s.used, bonus: s.bonus };
  store.set('turns', t);
}
function countUp(el, to) {
  if (!el) return;
  if (reduceMotion) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 900;
  const step = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function bindDial(svgId, hours, lineEl) {
  const svg = document.getElementById(svgId); if (!svg) return;
  requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.add('is-in')));
  svg.addEventListener('click', e => {
    const seg = e.target.closest('.seg'); if (!seg) return;
    const i = +seg.dataset.i;
    $$('.seg', svg).forEach(s => s.classList.toggle('is-sel', s === seg));
    $('.c-top', svg).textContent = `${L.sijin[i]}`;
    $('.c-top', svg).classList.toggle('c-sm', L.sijin[i].length > 14);
    $('.c-top', svg).classList.toggle('c-xs', L.sijin[i].length > 22);
    $('.c-main', svg).textContent = hours[i];
    $('.c-sub', svg).textContent = sijinRange(i);
    if (lineEl) lineEl.textContent = fmt(L.hourTap, { h: L.sijin[i], n: hours[i] });
  });
}

// ── 시간대마다 1회 제한 (6시·18시 기준, 하루 2회). 보상형 광고로 1회 추가 가능
function gate(name) {
  const per = E.period();
  const all = store.get('gates', {});
  const g = { used: 0, bonus: 0, data: null, ...((all[per.key] || {})[name] || {}) };
  return {
    per, used: g.used, bonus: g.bonus, data: g.data, left: isAdmin() ? UNLIMITED : 1 + g.bonus - g.used,
    save(upd) {
      const a = store.get('gates', {}), old = addDays(per.key.slice(0, 10), -2);
      Object.keys(a).forEach(k => { if (k.slice(0, 10) < old) delete a[k]; });
      a[per.key] = { ...(a[per.key] || {}), [name]: { used: g.used, bonus: g.bonus, data: g.data, ...upd } };
      store.set('gates', a);
    },
  };
}
function gateHTML(g) {
  if (isAdmin()) return `<div class="gate admin"><p class="gate-state"><span>${esc(U.adminMode)}</span></p></div>`;
  return `<div class="gate"><p class="gate-rule">${esc(U.gateRule)}</p>
<p class="gate-state"><span>${g.left > 0 ? `${esc(U.changeLeft)} <b>${g.left}</b>` : esc(U.gateUsed)}</span> <span>${esc(U.untilNext)} <b data-count>${clock(g.per.next - Date.now())}</b></span></p>
${g.left <= 0 && g.bonus < 1 && canReward() ? `<button type="button" class="btn-ghost sm gate-ad">${esc(U.changeAd)}</button>` : ''}</div>`;
}
function bindGate(root, name, rerender) {
  root.querySelector('.gate-ad')?.addEventListener('click', () => showRewarded(() => { gate(name).save({ bonus: 1 }); rerender(); }));
}

// ── 운세 탭
function renderFortune(animate = true, mode = '') {
  if (HAS_M) return renderFortuneM(animate, mode);
  const admin = isAdmin();
  const p = P();
  const per = E.period();
  const ts = turnsState(per.key);
  const today = todayKey();
  const d = E.daily(p, today, ts.used, C);
  const r = d.rolls;
  const curSi = E.sijinIndex(new Date().getHours(), new Date().getMinutes());
  const summary = S ? todayReading(S, d).flow : summaryText(L, d.band, r, 'one'); // 한국어: 해운정사의 오늘 흐름
  const days = store.get('days', []).filter(x => x.date >= todayKey() && x.date <= addDays(todayKey(), 7)).sort((a, b) => (a.date < b.date ? -1 : 1));
  const name = p.name ? esc(p.name) : '';

  const kw = [
    [U.kwAnimal, L.animals[p.animal]],
    [U.kwSign, `${SIGN_GLYPH[p.sign]} ${L.signs[p.sign]}`],
    [U.kwColor, `<span class="swatch" style="background:${E.COLOR_HEX[d.color]}"></span>${esc(L.colors[d.color])}`, true],
    [U.kwDirection, L.directions[d.direction]],
  ];
  if (L.luckyItems && L.luckyItems.length) kw.push([U.kwItem, E.pick(L.luckyItems, r[19])]);

  // 일본어: 오늘의 별자리 순위
  let rankHTML = '';
  if (C === 'ja') {
    const rank = E.signRanking(today);
    const mine = rank.indexOf(p.sign) + 1;
    rankHTML = `<section class="sec rank-sec"><h2>${esc(U.rankTitle)}</h2>
<p class="my-rank"><b>${mine}</b><span>${esc(fmt(U.rankOf, { s: L.signs[p.sign], n: mine }))}</span></p>
<ol class="rank-top">${rank.slice(0, 3).map((s, i) => `<li><span class="rank">${i + 1}</span>${SIGN_GLYPH[s]} ${esc(L.signs[s])}</li>`).join('')}</ol>
${p.blood !== null && p.blood !== undefined && L.bloodTraits?.length ? `<p class="blood-line"><b>${BLOOD_LABEL[p.blood]}型</b> ${esc(L.bloodTraits[p.blood])}</p>` : ''}
<a class="txt-link" href="/ja/horoscope/">${esc(U.signIndex)}</a></section>`;
  }
  // 중국어: 오늘의 의(宜)·기(忌)
  let yijiHTML = '';
  if (L.yi && L.yi.length) {
    const take = (arr, a, n) => { const out = []; let k = 0; while (out.length < n && k < 20) { const x = E.pick(arr, (r[a + (k % 4)] + k * 0.137) % 1); if (!out.includes(x)) out.push(x); k++; } return out; };
    yijiHTML = `<section class="sec yiji"><div><h2>${esc(U.yiTitle)}</h2><ul>${take(L.yi, 20, 3).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div><h2>${esc(U.jiTitle)}</h2><ul>${take(L.ji, 24, 3).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></section>`;
  }
  const relCells = [
    ['mbti', d.helper.mbti, d.drain.mbti],
    ['blood', `${BLOOD_LABEL[E.BLOOD.indexOf(d.helper.blood)]}${C === 'ja' ? '型' : ''}`, `${BLOOD_LABEL[E.BLOOD.indexOf(d.drain.blood)]}${C === 'ja' ? '型' : ''}`],
  ];
  if (C === 'ja') relCells.reverse();

  app().innerHTML = `
<section class="master">
<img class="master-img" src="${D.images.master}" alt="${esc(U.masterName)}" width="88" height="88" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'master-img ph',textContent:'${esc(U.masterName).slice(0, 1)}'}))">
<div class="master-txt"><p class="master-name">${esc(U.master)} <b>${esc(U.masterName)}</b></p>${S ? `<p class="power">${esc(S.ui.hwTagline)}</p>` : `<p class="power">${esc(U.power)} ${d.power}%</p>`}</div>
</section>
<section class="hero-score${mode === 'reveal' ? ' fate-reveal' : ''}">
${mode === 'reveal' ? `<p class="fate-arrived" role="status">${esc(U.fateArrived)}</p><div class="fate-dust" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<i style="--x:${(8 + (i * 47) % 84)}%;--y:${(10 + (i * 31) % 78)}%;--dl:${(i % 7) * 0.11}s"></i>`).join('')}</div>` : ''}
<p class="who">${name ? `${name} · ` : ''}${esc(fmtDate(L, todayKey()))}</p>
<p class="big-score" aria-label="${esc(U.todayScore)} ${d.score}"><span id="scoreNum">${animate ? 0 : d.score}</span><small>/100</small></p>
<p class="score-label">${esc(U.todayScore)}</p>
<p class="lead">${esc(summary)}</p>
${S ? '' : `<p class="rel-line">${esc(L.relToday[String(d.rel)])}</p>`}
</section>
${S ? todayReadingHTML(S, d, false) : ''}
${basisHTML(S, d, S ? `/${C}/result/saju/` : null)}

<section class="sec dial-sec">
<h2>${esc(U.dialTitle)}${L.sijinNote ? ` <button class="info" type="button" aria-label="?" data-note>?</button>` : ''}</h2>
${dialSVG({ hours: d.hours, labels: dialLabels(L), nowMin: nowMin(), best: d.best, worst: d.worst, size: 320, id: 'fdial', centerTop: `${U.now} ${L.sijin[curSi]}`, centerMain: d.hours[curSi], centerSub: hhmm(new Date()) })}
<p class="dial-hint" id="hourLine">${esc(U.dialHint)}</p>
<ul class="bw"><li class="b"><span>${esc(U.best)}</span>${esc(hourText(L, 'best', `${L.sijin[d.best]} (${sijinRange(d.best)})`, r))}</li><li class="w"><span>${esc(U.worst)}</span>${esc(hourText(L, 'worst', `${L.sijin[d.worst]} (${sijinRange(d.worst)})`, r))}</li></ul>
</section>

<section class="sec change" id="changeSec">
<div class="change-head"><h2>${esc(U.changeTitle)}</h2></div>
<p class="fate-left${ts.left <= 0 ? ' is-out' : ''}">${admin ? esc(U.adminMode) : esc(fmt(U.fateLeft, { n: Math.max(0, ts.left) }))}</p>
<p class="change-count">${esc(U.untilChange)} <b data-count>--:--:--</b></p>
${ts.used > 0 && !admin ? `<p class="change-done">${esc(U.changeDone)}</p>` : ''}
<div class="btn-row">
<button class="btn-primary btn-fate" type="button" id="changeBtn"${ts.left <= 0 ? ' disabled' : ''}><span>${esc(U.changeBtn)}</span></button>
${!admin && canReward() && ts.bonus < 1 ? `<button class="btn-ghost" type="button" id="rewardBtn">${esc(U.changeAd)}</button>` : ''}
</div>
${ts.left <= 0 ? `<p class="fate-none">${esc(fmt(U.fateAllUsed, { t: hhmm(per.next) }))}</p>` : ''}
</section>

${adSlot('A')}

${days.length ? `<section class="sec saved-up">${days.map(x => { const dd = E.daily(p, x.date, 0, C); return `<a href="/${C}/result/time/?d=${x.date}"><b>${esc(x.label || U.savedDays)}</b><span>${esc(fmtDate(L, x.date))}</span><span class="sc">${dd.score}</span></a>`; }).join('')}</section>` : ''}

<section class="sec kw-sec${mode === 'reveal' ? ' fate-soft' : ''}"><dl class="kw">${kw.map(([t, v, raw]) => `<div><dt>${esc(t)}</dt><dd>${raw ? v : esc(v)}</dd></div>`).join('')}</dl></section>

${rankHTML}${yijiHTML}

<section class="sec${mode === 'reveal' ? ' fate-soft late' : ''}"><ul class="domains">${['wealth', 'love', 'work', 'health'].map((k, i) => `<li><span class="d-label">${esc(U.domains[k])}</span>${pips(d.domains[k])}<span class="d-line">${esc(S ? domainReading(S, d, k) : domainText(L, k, d.domains[k], r, i))}</span></li>`).join('')}</ul></section>
${tomorrowHTML(p, today)}


${flowHTML(p, today, today, d.score, true)}

<section class="sec rel"><h2>${esc(U.relTitle)}</h2>
<div class="rel-grid"><div class="good"><p>${esc(U.helper)}</p><b>${relCells[0][1]}</b><span>${relCells[1][1]}</span></div><div class="bad"><p>${esc(U.drain)}</p><b>${relCells[0][2]}</b><span>${relCells[1][2]}</span></div></div>
</section>

<section class="sec place" id="placeSec">
<div class="place-head"><h2>${esc(U.placeTitle)}</h2><button type="button" class="sfx-btn" aria-pressed="true" aria-label="${esc(U.sfxOn)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="w" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M16 9l6 6M22 9l-6 6"/></svg></button></div><p class="muted">${esc(U.placeSub)}</p>
<div class="place-stage is-idle"><div class="place-map" aria-live="polite"><svg class="pidle" viewBox="0 0 320 200" aria-hidden="true"><circle cx="160" cy="100" r="86"/><ellipse cx="160" cy="100" rx="40" ry="86"/><ellipse cx="160" cy="100" rx="86" ry="30"/><line x1="74" y1="100" x2="246" y2="100"/><line x1="160" y1="14" x2="160" y2="186"/></svg></div>
<button type="button" class="btn-primary place-go">${esc(U.placeStart)}</button></div>
<div class="place-info"></div>
<div id="placeGate"></div>
</section>

<section class="sec nums"><h2>${esc(U.numbersTitle)}</h2><p class="muted">${esc(U.numbersHint)}</p>
<div class="cards six">${d.numbers.map(n => `<button type="button" class="flip"><span class="f-back" aria-hidden="true">?</span><span class="f-front">${n}</span></button>`).join('')}</div>
${S ? `<p class="muted small nums-basis">${esc(fmt(S.lottoBasis, { el: S.el[d.saju.chart.fav.yong], digits: E.EL_DIGITS[d.saju.chart.fav.yong].map(n => n || 10).join('·') }))}</p>` : ''}

</section>

<section class="sec share-row">
<button class="btn-ghost" type="button" id="shareBtn">${esc(U.share)}</button>
<a class="btn-ghost" href="/${C}/result/love/">${esc(U.gotoLove)}</a>
</section>`;

  if (animate || mode === 'reveal') countUp($('#scoreNum'), d.score); else $('#scoreNum').textContent = d.score;
  if (mode === 'reveal') setTimeout(() => { $('.fate-dust')?.remove(); $('.fate-arrived')?.classList.add('is-gone'); }, reduceMotion ? 1800 : 3200);
  bindDial('fdial', d.hours, $('#hourLine'));
  $$('[data-count]').forEach(el => { el.textContent = clock(per.next - Date.now()); });
  $('[data-note]')?.addEventListener('click', () => modal(L.sijinNote));

  $('#changeBtn').addEventListener('click', changeFate);
  $('#rewardBtn')?.addEventListener('click', () => showRewarded(() => {
    const s = turnsState(per.key); s.bonus = 1; saveTurns(per.key, s); renderFortune(false);
  }));
  $$('.flip').forEach(b => b.addEventListener('click', () => {
    b.classList.add('is-open');
    const wrap = $('.after-flip');
    if (wrap && wrap.hidden) { wrap.hidden = false; pushAds(wrap); }
  }));
  $('#shareBtn').addEventListener('click', () => shareFortune(p, d, summary, todayKey()));
  // 오늘 가장 약한 분야(모두 4 이상이면 없음)
  const weakK = ['wealth', 'love', 'work', 'health'].reduce((a, k) => (d.domains[k] < d.domains[a] ? k : a), 'wealth');
  const placeGate = () => { const el = $('#placeGate'); if (el) { el.innerHTML = gateHTML(gate('place')); bindGate(el, 'place', () => renderFortune(false)); } };
  placeGate();
  mountPlace($('#placeSec'), { C, D, U, weakest: d.domains[weakK] >= 4 ? null : { k: weakK, v: d.domains[weakK] }, getGate: () => gate('place'), onUsed: placeGate, fortune: { score: d.score, band: d.band, dir: d.direction, dirNames: L.directions } });
  animateFlow($('.flow'));
  pushAds(app());
}

// ════════════════════════════════════════
// 명인 구성 (한국어): 오늘 탭 · 명인 탭(해운정사·하나·도한) · 광고 해제 · 방문 횟수
// ════════════════════════════════════════
// 광고로 연 명인: 시간대(6시·18시)마다 기록. 하나·도한 중 오늘의 무료 명인은 날짜만으로 정함(모두에게 같음)
function unlocked() { const per = E.period(); return (store.get('unlock', {})[per.key]) || {}; }
function isOpen(k) {
  if (isAdmin()) return true;
  if ((k === 'hana' || k === 'dohan') && freeMaster(todayKey()) === k) return true;
  return !!unlocked()[k];
}
function setOpen(k) {
  const per = E.period(), a = store.get('unlock', {});
  Object.keys(a).forEach(x => { if (x !== per.key) delete a[x]; });
  a[per.key] = { ...(a[per.key] || {}), [k]: 1 };
  store.set('unlock', a);
}
// 보상형 광고를 보면 열림. 광고 연동 전이거나 광고를 불러오지 못하면 그냥 열어 줌
function unlockWithAd(k, done) {
  if (typeof window.ttfShowRewarded === 'function') {
    try { window.ttfShowRewarded(() => { setOpen(k); done(); }, () => { setOpen(k); toast(M.ui.adFail); done(); }); }
    catch { setOpen(k); toast(M.ui.adFail); done(); }
    return;
  }
  if (isPreview()) return showRewarded(() => { setOpen(k); done(); });
  setOpen(k); done();
}
// 같은 사주 정보로 그 명인 화면을 '서로 다른 날' 연 횟수(같은 날 다시 열면 세지 않음, 기기에만 저장)
function visitCount(k) {
  const raw = activeRaw(); if (!raw) return 1;
  const seed = E.profileSeed(raw), t = todayKey(), v = store.get('visits', {});
  const rec = { n: 0, last: '', ...((v[seed] || {})[k] || {}) };
  if (rec.last !== t) { rec.n += 1; rec.last = t; v[seed] = { ...(v[seed] || {}), [k]: rec }; store.set('visits', v); }
  return rec.n;
}
const masterImg = k => (k === 'haewoon' ? D.images.master : D.images[k]);
const imgTag = (k, size, cls) => `<img class="${cls}" src="${masterImg(k)}" alt="${esc(M.ui.name[k])}" width="${size}" height="${size}" loading="lazy" onerror="this.style.visibility='hidden'">`;
function badgeOf(k) {
  const free = freeMaster(todayKey());
  if (k === free && !isAdmin()) return ['free', M.ui.badge.free];
  return isOpen(k) ? ['open', M.ui.badge.open] : ['ad', M.ui.badge.ad];
}

// ── 오늘 탭 (명인 구성): 점수·운명 바꾸기 → 오늘의 운세 → 명인 카드 → 7일 흐름 → 배너 → 장소 → 복권
function renderFortuneM(animate = true, mode = '') {
  const admin = isAdmin();
  const p = P(), per = E.period(), ts = turnsState(per.key), today = todayKey();
  const d = E.daily(p, today, ts.used, C), r = d.rolls;
  const fr = MV.fortuneReading(M, S, d);
  const name = p.name ? esc(p.name) : '';
  const kw = [
    [U.kwColor, `<span class="swatch" style="background:${E.COLOR_HEX[d.color]}"></span>${esc(L.colors[d.color])}`, true],
    [U.kwDirection, L.directions[d.direction]],
    [U.kwAnimal, L.animals[p.animal]],
    [U.kwSign, `${SIGN_GLYPH[p.sign]} ${L.signs[p.sign]}`],
  ];
  const card = k => {
    const [bc, bt] = badgeOf(k);
    return `<a class="mc mc-${k}" href="/${C}/result/master/?m=${k}">${imgTag(k, 56, 'mc-img')}<span class="mc-txt"><span class="mc-top"><b>${esc(M.ui.name[k])}</b><small>${esc(M.ui.field[k])}</small><em class="bdg bdg-${bc}">${esc(bt)}</em></span>${k === 'haewoon' ? `<span class="mc-q">${esc(M.ui.teaserSiun)}</span>` : ''}<span class="mc-line">${esc(MV.cardLine(M, d, k))}</span></span></a>`;
  };
  app().innerHTML = `
<section class="hero-score${mode === 'reveal' ? ' fate-reveal' : ''}">
${mode === 'reveal' ? `<p class="fate-arrived" role="status">${esc(U.fateArrived)}</p><div class="fate-dust" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<i style="--x:${(8 + (i * 47) % 84)}%;--y:${(10 + (i * 31) % 78)}%;--dl:${(i % 7) * 0.11}s"></i>`).join('')}</div>` : ''}
<p class="who">${name ? `${name} · ` : ''}${esc(fmtDate(L, today))}</p>
<p class="big-score" aria-label="${esc(U.todayScore)} ${d.score}"><span id="scoreNum">${animate ? 0 : d.score}</span><small>/100</small></p>
<p class="score-label">${esc(U.todayScore)}</p>
<p class="lead">${esc(fr.flow)}</p>
</section>

<section class="sec change" id="changeSec">
<div class="change-head"><h2>${esc(U.changeTitle)}</h2></div>
<p class="fate-left${ts.left <= 0 ? ' is-out' : ''}">${admin ? esc(U.adminMode) : esc(fmt(U.fateLeft, { n: Math.max(0, ts.left) }))}</p>
<p class="change-count">${esc(U.untilChange)} <b data-count>--:--:--</b></p>
${ts.used > 0 && !admin ? `<p class="change-done">${esc(U.changeDone)}</p>` : ''}
<div class="btn-row">
<button class="btn-accent btn-primary btn-fate" type="button" id="changeBtn"${ts.left <= 0 ? ' disabled' : ''}><span>${esc(U.changeBtn)}</span></button>
${!admin && canReward() && ts.bonus < 1 ? `<button class="btn-ghost" type="button" id="rewardBtn">${esc(U.changeAd)}</button>` : ''}
</div>
${ts.left <= 0 ? `<p class="fate-none">${esc(fmt(U.fateAllUsed, { t: hhmm(per.next) }))}</p>` : ''}
</section>

<section class="sec m-basic${mode === 'reveal' ? ' fate-soft' : ''}"><h2>${esc(M.fortune.title)}</h2>
${MV.fortuneBasicHTML(M, S, d)}
<dl class="kw">${kw.map(([t, v, raw]) => `<div><dt>${esc(t)}</dt><dd>${raw ? v : esc(v)}</dd></div>`).join('')}</dl>
<ul class="domains">${['wealth', 'love', 'work', 'health'].map(k => `<li><span class="d-label">${esc(U.domains[k])}</span>${pips(d.domains[k])}<span class="d-line">${esc(MV.fortuneDomain(M, S, d, k))}</span></li>`).join('')}</ul>
</section>
${basisHTML(S, d, `/${C}/result/master/?m=haewoon`)}

<section class="sec mcards"><h2>${esc(M.ui.cardsTitle)}</h2><div class="mc-list">${MASTERS.map(card).join('')}</div></section>

${flowHTML(p, today, today, d.score, true)}
${tomorrowHTML(p, today)}

${adSlot('A')}

<section class="sec place" id="placeSec">
<div class="place-head"><h2>${esc(U.placeTitle)}</h2><button type="button" class="sfx-btn" aria-pressed="true" aria-label="${esc(U.sfxOn)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="w" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M16 9l6 6M22 9l-6 6"/></svg></button></div><p class="muted">${esc(U.placeSub)}</p>
<div class="place-stage is-idle"><div class="place-map" aria-live="polite"><svg class="pidle" viewBox="0 0 320 200" aria-hidden="true"><circle cx="160" cy="100" r="86"/><ellipse cx="160" cy="100" rx="40" ry="86"/><ellipse cx="160" cy="100" rx="86" ry="30"/><line x1="74" y1="100" x2="246" y2="100"/><line x1="160" y1="14" x2="160" y2="186"/></svg></div>
<button type="button" class="btn-primary place-go">${esc(U.placeStart)}</button></div>
<div class="place-info"></div>
<div id="placeGate"></div>
</section>

<section class="sec nums"><h2>${esc(U.numbersTitle)}</h2><p class="muted">${esc(U.numbersHint)}</p>
<div class="cards six">${d.numbers.map(n => `<button type="button" class="flip"><span class="f-back" aria-hidden="true">?</span><span class="f-front">${n}</span></button>`).join('')}</div>
<p class="muted small nums-basis">${esc(fmt(S.lottoBasis, { el: S.el[d.saju.chart.fav.yong], digits: E.EL_DIGITS[d.saju.chart.fav.yong].map(n => n || 10).join('·') }))}</p>
</section>

<section class="sec share-row">
<button class="btn-ghost" type="button" id="shareBtn">${esc(U.share)}</button>
<a class="btn-ghost" href="/${C}/result/master/?m=hana#compat">${esc(U.gotoLove)}</a>
</section>`;

  if (animate || mode === 'reveal') countUp($('#scoreNum'), d.score); else $('#scoreNum').textContent = d.score;
  if (mode === 'reveal') setTimeout(() => { $('.fate-dust')?.remove(); $('.fate-arrived')?.classList.add('is-gone'); }, reduceMotion ? 1800 : 3200);
  $$('[data-count]').forEach(el => { el.textContent = clock(per.next - Date.now()); });
  $('#changeBtn').addEventListener('click', changeFate);
  $('#rewardBtn')?.addEventListener('click', () => showRewarded(() => { const s = turnsState(per.key); s.bonus = 1; saveTurns(per.key, s); renderFortune(false); }));
  $$('.flip').forEach(b => b.addEventListener('click', () => b.classList.add('is-open')));
  $('#shareBtn').addEventListener('click', () => shareFortune(p, d, fr.flow, today));
  const weakK = ['wealth', 'love', 'work', 'health'].reduce((a, k) => (d.domains[k] < d.domains[a] ? k : a), 'wealth');
  const placeGate = () => { const el = $('#placeGate'); if (el) { el.innerHTML = gateHTML(gate('place')); bindGate(el, 'place', () => renderFortune(false)); } };
  placeGate();
  mountPlace($('#placeSec'), { C, D, U, weakest: d.domains[weakK] >= 4 ? null : { k: weakK, v: d.domains[weakK] }, getGate: () => gate('place'), onUsed: placeGate, fortune: { score: d.score, band: d.band, dir: d.direction, dirNames: L.directions } });
  animateFlow($('.flow'));
  pushAds(app());
  void r;
}

// ── 명인 탭: 위에서 명인을 고르면 제목·색·내용이 함께 바뀜
function renderMaster() {
  const tab = body.dataset.tab;
  const inv = qs.get('inv') ? b64d(qs.get('inv')) : null;
  let m = qs.get('m');
  if (!MASTERS.includes(m)) m = tab === 'saju' ? 'haewoon' : tab === 'love' ? 'hana' : (session.get('master') || 'haewoon');
  session.set('master', m);
  const MU = M.ui;
  const p = P(), chart = E.SJ.chartOf(p), per = E.period(), today = todayKey();
  const d = E.daily(p, today, turnsState(per.key).used, C);
  const open = isOpen(m) || (m === 'hana' && !!inv);
  const pick = MASTERS.map(k => { const [bc, bt] = badgeOf(k); return `<a href="?m=${k}" class="mp mp-${k}${k === m ? ' is-on' : ''}"${k === m ? ' aria-current="page"' : ''}>${imgTag(k, 52, 'mp-img')}<b>${esc(MU.name[k])}</b><small>${esc(MU.field[k])}</small><em class="bdg bdg-${bc}">${esc(bt)}</em></a>`; }).join('');
  const head = `<header class="mhead">${imgTag(m, 76, 'mh-img')}<div><h1>${esc(MU.title[m])}</h1><p>${esc(MU.field[m])}</p></div></header>`;
  let content = '';
  if (open) {
    const secs = m === 'haewoon' ? MV.haewoonSections(M, S, L, d, chart, nowMin()) : m === 'hana' ? MV.hanaSections(M, S, d, chart) : MV.dohanSections(M, S, L, d, chart);
    const n = visitCount(m), o = MV.ORDER[m];
    const list = (n >= 3 ? o.late : o.early).map(k => secs[k]);
    const fold = n >= 3 && o.fold.length ? `<details class="fold"><summary>${esc(MU.fold[m])}</summary>${o.fold.map(k => secs[k]).join('')}</details>` : '';
    if (m === 'hana') content = list.join('') + fold + adSlot('tab') + compatBlock(!!inv);
    else content = list.slice(0, -1).join('') + adSlot('tab') + list[list.length - 1] + fold;
    content += `<section class="sec"><p class="disc-inline">${esc(m === 'haewoon' ? S.ui.disclaimer : MU.disclaimer)}</p></section>`;
  } else {
    const teaser = m === 'haewoon' ? MV.haewoonTeaser(M, S, chart) : m === 'hana' ? MV.hanaTeaser(M, S, chart) : MV.dohanTeaser(M, chart);
    content = `<section class="sec locked"><p class="lk-teaser">${esc(teaser)}</p><div class="lk-blur" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<div class="lk-box"><button class="btn-accent btn-primary" type="button" id="unlockBtn">${esc(MU.unlock)}</button><p class="muted small">${esc(fmt(MU.unlockNote, { t: hhmm(per.next) }))}</p>${m !== 'haewoon' ? `<p class="muted small">${esc(MU.unlockFree)}</p>` : ''}</div></section>${adSlot('tab')}`;
  }
  app().innerHTML = `<nav class="mpick" aria-label="${esc(MU.pick)}">${pick}</nav><div class="mview m-${m}">${head}${content}</div>`;
  $('#unlockBtn')?.addEventListener('click', () => unlockWithAd(m, () => renderMaster()));
  // 시운 다이얼: 칸을 누르면 그 시간 풀이로 이동
  $('#sdial')?.addEventListener('click', e => {
    const seg = e.target.closest('.seg'); if (!seg) return;
    const i = +seg.dataset.i, el = document.getElementById(`hr-${i <= 2 ? 0 : i}`);
    if (el) { el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); el.classList.add('is-flash'); setTimeout(() => el.classList.remove('is-flash'), 1400); }
  });
  if ($('#sdial')) requestAnimationFrame(() => requestAnimationFrame(() => $('#sdial')?.classList.add('is-in')));
  const now = $('.daeun .is-now'); if (now) now.parentElement.scrollLeft = now.offsetLeft - now.parentElement.offsetLeft - 16;
  if (m === 'hana' && open) bindCompat(p, inv);
  if ((tab === 'love' || location.hash === '#compat') && $('#compat')) setTimeout(() => $('#compat').scrollIntoView({ block: 'start' }), 60);
  pushAds(app());
}

// ── 하나의 궁합 (광고 별도). 초대 링크로 들어온 결과는 광고 없이 보여 줌
function compatBlock(viaInvite) {
  const MU = M.ui, open = viaInvite || isOpen('compat');
  const pv = store.get('partner', null) || {};
  const thisYear = new Date().getFullYear();
  const opt = (from, to, sel) => { let s = ''; for (let i = from; to >= from ? i <= to : i >= to; to >= from ? i++ : i--) s += `<option value="${i}"${i === sel ? ' selected' : ''}>${i}</option>`; return s; };
  if (!open) return `<section class="sec compat" id="compat"><h2>${esc(MU.compatTitle)}</h2><p class="muted">${esc(MU.compatSub)}</p>
<div class="lk-box"><button class="btn-accent btn-primary" type="button" id="compatUnlock">${esc(MU.compatUnlock)}</button><p class="muted small">${esc(fmt(MU.compatNote, { t: hhmm(E.period().next) }))}</p></div></section>`;
  return `<section class="sec compat" id="compat"><h2>${esc(MU.compatTitle)}</h2><p class="muted">${esc(MU.compatSub)}</p>
<form id="compatForm" class="form compact"${viaInvite ? ' hidden' : ''}>
<label class="field"><span>${esc(MU.relKind)}</span><select name="kind">${Object.entries(MU.relKinds).map(([k, v]) => `<option value="${k}"${pv.kind === k ? ' selected' : ''}>${esc(v)}</option>`).join('')}</select></label>
<label class="field"><span>${esc(U.partnerName)} <small>${esc(U.optional)}</small></span><input name="name" maxlength="20" value="${esc(pv.name || '')}"></label>
<fieldset class="field"><legend>${esc(U.gender)}</legend><div class="seg-ctl"><label><input type="radio" name="gender" value="M"${pv.gender !== 'F' ? ' checked' : ''}><span>${esc(U.male)}</span></label><label><input type="radio" name="gender" value="F"${pv.gender === 'F' ? ' checked' : ''}><span>${esc(U.female)}</span></label></div></fieldset>
<fieldset class="field"><legend>${esc(U.birth)}</legend><div class="ymd">
<select name="y" aria-label="${esc(U.year)}"><option value="">${esc(U.year)}</option>${opt(thisYear, 1930, pv.y)}</select>
<select name="m" aria-label="${esc(U.month)}"><option value="">${esc(U.month)}</option>${opt(1, 12, pv.m)}</select>
<select name="d" aria-label="${esc(U.day)}"><option value="">${esc(U.day)}</option>${opt(1, 31, pv.d)}</select></div></fieldset>
<label class="field"><span>${esc(U.birthTime)} <small>${esc(U.optional)}</small></span><select name="sijin"><option value="">${esc(U.unknown)}</option>${L.sijin.map((s, i) => `<option value="${i}"${pv.sijin === i ? ' selected' : ''}>${esc(s)} (${sijinRange(i)})</option>`).join('')}</select></label>
<p class="form-err" id="loveErr" hidden>${esc(U.required)}</p>
<button class="btn-primary" type="submit">${esc(U.analyze)}</button>
</form>
<div id="compatOut"></div>
<div class="share-row"><button class="btn-ghost" type="button" id="inviteBtn">${esc(U.invite)}</button></div>
</section>`;
}
function bindCompat(p, inv) {
  $('#compatUnlock')?.addEventListener('click', () => unlockWithAd('compat', () => { renderMaster(); setTimeout(() => $('#compat')?.scrollIntoView({ block: 'start' }), 60); }));
  const out = $('#compatOut'); if (!out) return;
  const show = (pt, scroll) => {
    const raw = activeRaw();
    const partner = E.profileFrom({ name: pt.name || '', y: pt.y, m: pt.m, d: pt.d, sijin: pt.sijin ?? null, timeMode: pt.sijin === null || pt.sijin === undefined ? 'unknown' : 'sijin', country: raw.country, gender: pt.gender || null });
    const cp = MV.compatReading(M, S, p, partner, pt.kind || 'lover');
    const C2 = M.hana.compat;
    const da = E.daily(p, todayKey(), 0, C).hours, db = E.daily(partner, todayKey(), 0, C).hours;
    const tog = da.map((h, i) => Math.round((h + db[i]) / 2));
    const bh = [4, 5, 6, 7, 8, 9, 10, 11].reduce((a, i) => (tog[i] > tog[a] ? i : a), 4);
    const nm1 = esc(p.name || U.me || '나'), nm2 = esc(pt.name || M.ui.relKinds[pt.kind || 'lover']);
    const bar = v => `<span class="pips">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= v ? 'on' : ''}"></i>`).join('')}</span>`;
    out.innerHTML = `<div class="love-res">
<p class="pair"><span>${nm1}</span><i aria-hidden="true">+</i><span>${nm2}</span></p>
<p class="big-score"><span id="loveNum">0</span><small>/100</small></p><p class="score-label">${esc(U.loveScore)}</p></div>
<ul class="axes">${Object.entries(C2.axes).map(([k, t]) => `<li><span>${esc(t)}</span>${bar(cp.axes[k])}</li>`).join('')}</ul>
${cp.lines.map(t => `<p class="m-p">${esc(t)}</p>`).join('')}
<div class="dodont"><div><h3>${esc(C2.do)}</h3><ul>${cp.doList.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><div><h3>${esc(C2.dont)}</h3><ul>${cp.dontList.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
<p class="m-p">${esc(fmt(C2.hour, { h: `${L.sijin[bh]} (${sijinRange(bh)})` }))}</p>`;
    countUp($('#loveNum'), cp.score);
    if (scroll) out.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  if (inv) show({ name: inv.n, y: inv.y, m: inv.m, d: inv.d, sijin: inv.s ?? null, gender: inv.g, kind: 'lover' }, false);
  else { const pv = store.get('partner', null); if (pv && pv.y) show(pv, false); }
  $('#compatForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, y = +f.y.value, mo = +f.m.value, dd = +f.d.value;
    if (!y || !mo || !dd || new Date(y, mo - 1, dd).getMonth() !== mo - 1) { $('#loveErr').hidden = false; return; }
    $('#loveErr').hidden = true;
    const pt = { name: f.name.value.trim(), y, m: mo, d: dd, sijin: f.sijin.value === '' ? null : +f.sijin.value, gender: f.gender.value, kind: f.kind.value };
    store.set('partner', pt);
    show(pt, true);
  });
  $('#inviteBtn')?.addEventListener('click', () => {
    const raw = activeRaw();
    const code = b64e({ n: raw.name || '', y: raw.y, m: raw.m, d: raw.d, s: raw.sijin, g: raw.gender, b: raw.blood });
    shareLink(`${location.origin}/${C}/result/love/?inv=${code}`, fmt(U.invitedBy, { n: raw.name || '' }));
  });
}

// ── 운명 바꾸기 연출: 기운이 모임 → 운명의 문 → 개방(데이터 교체) → 새 운세 공개
// 기회는 새 운세가 만들어지고 화면에 그려진 뒤에만 차감. 실패하면 그대로 두고 기존 운세 유지.
let fateBusy = false;
const FATE_TRIGRAMS = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
const FATE_ELEMENTS = ['木', '火', '土', '金', '水'];
function fateOverlay() {
  const pt = (r, deg) => { const a = (deg - 90) * Math.PI / 180; return [(r * Math.cos(a)).toFixed(1), (r * Math.sin(a)).toFixed(1)]; };
  const ticks = Array.from({ length: 72 }, (_, i) => { const [x1, y1] = pt(150, i * 5), [x2, y2] = pt(i % 6 ? 144 : 138, i * 5); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; }).join('');
  const stars = Array.from({ length: 24 }, (_, i) => { const [x, y] = pt(128, i * 15 + 7); return `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.2 : 2.2}"/>`; }).join('');
  const tri = FATE_TRIGRAMS.map((t, i) => { const [x, y] = pt(108, i * 45); return `<text x="${x}" y="${y}" transform="rotate(${i * 45} ${x} ${y})">${t}</text>`; }).join('');
  const pent = [0, 2, 4, 1, 3].map(i => pt(78, i * 72).join(',')).join(' ');
  const elem = FATE_ELEMENTS.map((t, i) => { const [x, y] = pt(78, i * 72); return `<circle cx="${x}" cy="${y}" r="12" class="node"/><text x="${x}" y="${y}" class="el">${t}</text>`; }).join('');
  const cons = [[30, 120], [55, 100], [80, 118], [200, 96], [228, 116], [250, 98], [300, 120]].map(([d, r]) => pt(r, d));
  const consPath = `M${cons.slice(0, 3).map(c => c.join(' ')).join(' L')} M${cons.slice(3).map(c => c.join(' ')).join(' L')}`;
  const parts = Array.from({ length: 26 }, (_, i) => `<i style="--a:${(i * 137.5) % 360}deg;--d:${120 + (i * 53) % 90}px;--dl:${(i % 9) * 0.05}s"></i>`).join('');
  const el = document.createElement('div');
  el.className = 'fate-ov'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
  el.innerHTML = `<div class="fate-veil"></div>
<div class="fate-core"><div class="fate-glow"></div>
<svg class="fate-seal" viewBox="-160 -160 320 320" aria-hidden="true">
<g class="r1"><circle r="150"/><circle r="134" class="thin"/>${ticks}</g>
<g class="r2"><circle r="120" class="thin"/>${stars}${tri}<path d="${consPath}" class="cons"/></g>
<g class="r3"><circle r="92" class="thin"/><polygon points="${pent}"/>${elem}</g>
<g class="r4"><circle r="40"/><path d="M0-40A20 20 0 0 1 0 0A20 20 0 0 0 0 40A40 40 0 0 1 0-40Z" class="yin"/><circle cy="-20" r="5" class="dot-d"/><circle cy="20" r="5" class="dot-l"/></g>
</svg>
<div class="fate-parts">${parts}</div><div class="fate-flash"></div></div>
<p class="fate-msg">${esc(U.fateGather)}</p>`;
  return el;
}
async function changeFate() {
  if (fateBusy) return;                               // 중복 클릭·연속 실행 방지
  const per = E.period();
  const before = turnsState(per.key);
  if (before.left <= 0) return;
  fateBusy = true;
  const btn = $('#changeBtn'); if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
  const wait = ms => new Promise(r => setTimeout(r, reduceMotion ? Math.min(ms, 150) : ms));
  const ov = fateOverlay();
  document.body.append(ov);
  document.documentElement.classList.add('fate-on');  // 현재 운세가 서서히 어두워지고 글자가 사라짐
  const close = async () => { ov.classList.add('out'); document.documentElement.classList.remove('fate-on'); await wait(700); ov.remove(); fateBusy = false; };
  try {
    // STEP 1 (0~0.5초) 기운이 모임
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('s1')));
    await wait(500);
    // STEP 2 (0.5~1.8초) 운명의 문. 이 사이에 새 운세를 미리 만들어 둠
    ov.classList.add('s2');
    let next = null;
    try { next = E.daily(P(), todayKey(), before.used + 1, C); } catch { next = null; }
    if (!next || !Number.isFinite(next.score)) throw new Error('fate');
    await wait(1300);
    // STEP 3 (1.8~2.5초) 섬광과 함께 데이터 교체 → 새 카드가 떠오름
    ov.classList.add('s3');
    await wait(160);
    const s = turnsState(per.key);
    saveTurns(per.key, { used: s.used + 1, bonus: s.bonus });
    // 운명이 바뀌면 '지금 나에게 필요한 장소는?'도 새로 떠날 수 있게 초기화
    const pg = gate('place'); pg.save({ used: 0, data: null });
    try { renderFortune(false, 'reveal'); }
    catch (e) { saveTurns(per.key, { used: s.used, bonus: s.bonus }); renderFortune(false); throw e; }
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('fate-on');
    await wait(540);
    // STEP 4 (2.5~3.5초) 공개 완료: 오버레이가 걷히고 카드 주변 입자가 사라짐
    await close();
  } catch {
    await close();
    if (btn && btn.isConnected) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
    toast(U.fateFail);
  }
}

// 내일 미리보기: 점수와 가장 큰 근거 한 줄
function tomorrowHTML(p, today) {
  const t = addDays(today, 1), d2 = E.daily(p, t, 0, C);
  const line = HAS_M ? MV.fortuneReading(M, S, d2).flow : S ? todayReading(S, d2).flow : '';
  return `<section class="sec tmr"><a href="/${C}/result/time/?d=${t}"><span class="tmr-l">${esc(HAS_M ? U.tomorrow : S ? S.ui.tomorrow : U.tomorrow)}<small>${esc(fmtDate(L, t))}</small></span><b>${d2.score}</b></a>${line ? `<p class="muted">${esc(line)}</p>` : ''}</section>`;
}

// ── 사주 탭 (사주 풀이 문장이 있는 언어만)
function renderSaju() {
  if (!S) { location.replace(`/${C}/result/fortune/`); return; }
  const p = P();
  app().innerHTML = sajuTabHTML(S, E.SJ.chartOf(p), p.name || '') + adSlot('tab');
  const now = $('.daeun .is-now'); if (now) now.parentElement.scrollLeft = now.offsetLeft - now.parentElement.offsetLeft - 16; // 지금 대운이 보이게
  pushAds(app());
}

// 앞뒤 7일 흐름 그래프. link=true면 점을 누를 때 타임머신으로 이동
function flowHTML(p, center, today, todayScore, link) {
  const span = Array.from({ length: 15 }, (_, i) => addDays(center, i - 7));
  const sc = span.map(k => (k === today && todayScore != null ? todayScore : E.daily(p, k, 0, C).score));
  const W = 340, H = 150, x = i => 14 + i * ((W - 28) / 14), yv = v => H - 22 - (v - 30) / 70 * (H - 44);
  const path = sc.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${yv(v).toFixed(1)}`).join('');
  const ti = span.indexOf(today);
  const dot = (v, i) => { const c = `<circle cx="${x(i)}" cy="${yv(v)}" r="${i === 7 ? 6 : 3.5}" class="${i === 7 ? 'pt sel' : 'pt'}"><title>${span[i]} ${v}</title></circle>`; return link && span[i] > today ? `<a href="/${C}/result/time/?d=${span[i]}">${c}<circle cx="${x(i)}" cy="${yv(v)}" r="11" class="hit"/></a>` : c; };
  return `<section class="sec flow"><h2>${esc(U.flow)}</h2>
<svg viewBox="0 0 ${W} ${H}" class="flow-svg flow-anim" role="img" aria-label="${esc(U.flow)}">
<line x1="14" x2="${W - 14}" y1="${yv(70)}" y2="${yv(70)}" class="grid"/>
${ti >= 0 ? `<line x1="${x(ti)}" x2="${x(ti)}" y1="10" y2="${H - 20}" class="today"/>` : ''}
<path d="${path}" class="line"/>
${sc.map(dot).join('')}
<text x="${x(0)}" y="${H - 4}" class="ax">${span[0].slice(5).replace('-', '/')}</text><text x="${x(7)}" y="${H - 4}" class="ax mid" text-anchor="middle">${center.slice(5).replace('-', '/')}</text><text x="${x(14)}" y="${H - 4}" class="ax" text-anchor="end">${span[14].slice(5).replace('-', '/')}</text>
<text x="${x(7)}" y="${yv(sc[7]) - 12}" class="val" text-anchor="middle">${sc[7]}</text>
</svg><p class="flow-note">${esc(U.flowNote)}</p></section>`;
}
// 그래프가 화면에 들어오면 선이 그려지고 점이 차례로 나타남
function animateFlow(sec) {
  const svg = sec?.querySelector('.flow-anim'); if (!svg) return;
  const line = svg.querySelector('.line'), len = line.getTotalLength();
  line.style.strokeDasharray = `${len} ${len}`; line.style.strokeDashoffset = len;
  svg.querySelectorAll('.pt').forEach((c, i) => { c.style.transitionDelay = `${0.15 + i * 0.07}s`; });
  const play = () => { svg.classList.add('is-play'); line.style.strokeDashoffset = 0; };
  if (reduceMotion || !('IntersectionObserver' in window)) return play();
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { play(); io.disconnect(); } }, { threshold: 0.4 });
  io.observe(svg);
}

async function shareFortune(p, d, summary, day) {
  const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350;
  const x = cv.getContext('2d');
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 1080, 1350);
  x.strokeStyle = '#1A1A1A'; x.lineWidth = 2; x.strokeRect(40, 40, 1000, 1270);
  x.fillStyle = '#1A1A1A'; x.font = '700 44px serif'; x.textAlign = 'center';
  x.fillText(`${D.brand}  ${L.subBrand}`, 540, 130);
  x.fillStyle = '#6E6A62'; x.font = '32px sans-serif';
  x.fillText(`${p.name ? p.name + '  ' : ''}${fmtDate(L, day)}`, 540, 190);
  const img = await svgToImg(dialSVG({ hours: d.hours, labels: dialLabels(L), nowMin: nowMin(), best: d.best, worst: d.worst, size: 620, centerTop: U.todayScore, centerMain: d.score, centerSub: '/100' }));
  if (img) x.drawImage(img, 230, 240, 620, 620);
  x.fillStyle = '#1A1A1A'; x.font = '600 44px serif';
  let y = wrapText(x, summary, 540, 960, 880, 62);
  x.fillStyle = '#6E6A62'; x.font = '32px sans-serif';
  y = wrapText(x, hourText(L, 'best', L.sijin[d.best], d.rolls).split(/(?<=[.!。！?？])\s*/)[0], 540, y + 20, 900, 46);
  x.fillStyle = '#B3261E'; x.font = '30px sans-serif';
  x.fillText(D.site.replace(/^https?:\/\//, ''), 540, 1260);
  await shareCanvas(cv, `fortune-in-time-${day}.png`, `${summary} ${D.site}/${C}/`);
}

// ── 궁합 탭
function renderLove(scrollToResult = false) {
  const p = P();
  const invRaw = qs.get('inv');
  const inv = invRaw ? b64d(invRaw) : null;
  if (invRaw) session.del('inv');
  const last = store.get('partner', null);
  const thisYear = new Date().getFullYear();
  const opt = (from, to, sel) => { let s = ''; for (let i = from; to >= from ? i <= to : i >= to; to >= from ? i++ : i--) s += `<option value="${i}"${i === sel ? ' selected' : ''}>${i}</option>`; return s; };
  const pv = inv ? null : last;
  const g = gate('love');
  const canAsk = !inv && g.left > 0;

  app().innerHTML = `
<section class="sec"><h1 class="page-h">${esc(U.loveTitle)}</h1><p class="muted">${esc(U.loveSub)}</p>
${inv ? `<p class="invite-banner">${esc(fmt(U.invitedBy, { n: inv.n || '?' }))}</p>` : ''}
<form id="loveForm" class="form compact"${canAsk ? '' : ' hidden'}>
<label class="field"><span>${esc(U.partnerName)} <small>${esc(U.optional)}</small></span><input name="name" maxlength="20" value="${esc(pv?.name || '')}"></label>
<fieldset class="field"><legend>${esc(U.birth)}</legend><div class="ymd">
<select name="y" aria-label="${esc(U.year)}"><option value="">${esc(U.year)}</option>${opt(thisYear, 1930, pv?.y)}</select>
<select name="m" aria-label="${esc(U.month)}"><option value="">${esc(U.month)}</option>${opt(1, 12, pv?.m)}</select>
<select name="d" aria-label="${esc(U.day)}"><option value="">${esc(U.day)}</option>${opt(1, 31, pv?.d)}</select></div></fieldset>
<label class="field"><span>${esc(U.birthTime)} <small>${esc(U.optional)}</small></span><select name="sijin"><option value="">${esc(U.unknown)}</option>${L.sijin.map((s, i) => `<option value="${i}"${pv?.sijin === i ? ' selected' : ''}>${esc(s)} (${sijinRange(i)})</option>`).join('')}</select></label>
<div class="two">
<label class="field"><span>${esc(U.blood)}</span><select name="blood"><option value="">${esc(U.none)}</option>${BLOOD_LABEL.map((b, i) => `<option value="${i}"${pv?.blood === i ? ' selected' : ''}>${b}</option>`).join('')}</select></label>
<label class="field"><span>${esc(U.mbti)}</span><select name="mbti"><option value="">${esc(U.none)}</option>${E.MBTI.map(m => `<option${pv?.mbti === m ? ' selected' : ''}>${m}</option>`).join('')}</select></label>
</div>
<p class="form-err" id="loveErr" hidden>${esc(U.required)}</p>
<button class="btn-primary" type="submit">${esc(U.analyze)}</button>
</form>
${inv ? '' : gateHTML(g)}</section>
<div id="loveOut"></div>
<section class="sec share-row"><button class="btn-ghost" type="button" id="inviteBtn">${esc(U.invite)}</button></section>
${adSlot('tab')}`;

  const show = (partner, scroll = true) => {
    const today = E.period().day;
    const cp = E.compat(p, partner, today);
    const lt = loveTexts(L, cp, `${L.sijin[cp.bestHour]} (${sijinRange(cp.bestHour)})`);
    const nm2 = esc(partner.name || L.animals[cp.B.animal]);
    $('#loveOut').innerHTML = `<section class="sec love-res">
<p class="pair"><span>${esc(p.name || L.animals[cp.A.animal])}</span><i aria-hidden="true">+</i><span>${nm2}</span></p>
<p class="big-score"><span id="loveNum">0</span><small>/100</small></p><p class="score-label">${esc(U.loveScore)}</p>
<p class="lead love-lead">${esc(lt.summary)}</p>
<p class="rel-line love-rel">${esc(lt.rel)}</p>
<dl class="kw two-col"><div><dt>${esc(p.name || L.animals[cp.A.animal])}</dt><dd>${esc(L.animals[cp.A.animal])}, ${SIGN_GLYPH[cp.A.sign]} ${esc(L.signs[cp.A.sign])}</dd></div><div><dt>${nm2}</dt><dd>${esc(L.animals[cp.B.animal])}, ${SIGN_GLYPH[cp.B.sign]} ${esc(L.signs[cp.B.sign])}${partner.mbti ? `, ${esc(partner.mbti)}` : ''}</dd></div></dl>
</section>
<section class="sec dial-sec"><h2>${esc(U.together)}</h2>
${dialSVG({ hours: cp.together, labels: dialLabels(L), nowMin: nowMin(), best: cp.bestHour, size: 300, id: 'ldial', centerTop: U.together, centerMain: L.sijin[cp.bestHour], centerSub: sijinRange(cp.bestHour) })}
<p class="love-hour">${esc(lt.hour)}</p>
<p class="dial-hint" id="loveHour">${esc(U.dialHint)}</p></section>`;
    countUp($('#loveNum'), cp.score);
    bindDial('ldial', cp.together, $('#loveHour'));
    if (scroll) $('#loveOut').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  // 초대 링크로 들어온 결과는 기회를 쓰지 않음. 그 외에는 이번 시간대에 본 결과를 다시 보여줌
  if (inv) show({ name: inv.n, y: inv.y, m: inv.m, d: inv.d, sijin: inv.s ?? null, gender: inv.g, blood: inv.b ?? null });
  else if (g.data) show(g.data, scrollToResult);
  bindGate(app(), 'love', () => renderLove());
  $('#loveForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const y = +f.y.value, m = +f.m.value, d = +f.d.value;
    if (!y || !m || !d || new Date(y, m - 1, d).getMonth() !== m - 1) { $('#loveErr').hidden = false; return; }
    $('#loveErr').hidden = true;
    const partner = { name: f.name.value.trim(), y, m, d, sijin: f.sijin.value === '' ? null : +f.sijin.value, blood: f.blood.value === '' ? null : +f.blood.value, mbti: f.mbti.value || null };
    const g2 = gate('love'); if (g2.left <= 0) return;
    g2.save({ used: g2.used + 1, data: partner });
    store.set('partner', partner);
    renderLove(true);
  });
  $('#inviteBtn').addEventListener('click', () => {
    const raw = activeRaw();
    const code = b64e({ n: raw.name || '', y: raw.y, m: raw.m, d: raw.d, s: raw.sijin, g: raw.gender, b: raw.blood });
    shareLink(`${location.origin}/${C}/result/love/?inv=${code}`, fmt(U.invitedBy, { n: raw.name || '' }));
  });
  pushAds(app());
}

// ── 미래 탭 (내일~1년 뒤만). 시간대마다 1회: 날짜를 고르고 '이동'을 누르면 기회를 씀
const dDay = (from, to) => { const a = E.parseKey(from), b = E.parseKey(to); return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 864e5); };
function quickDates(today, p) {
  const t = E.parseKey(today), dow = new Date(Date.UTC(t.y, t.m - 1, t.d)).getUTCDay();
  const sat = addDays(today, ((6 - dow + 7) % 7) || 7);
  const nm = new Date(Date.UTC(t.y, t.m, 1)).toISOString().slice(0, 10);
  let bd = `${t.y}-${pad(p.m)}-${pad(p.d)}`;
  if (bd <= today) bd = `${t.y + 1}-${pad(p.m)}-${pad(p.d)}`;
  if (E.parseKey(bd).m !== p.m) bd = addDays(bd, -1); // 2월 29일생: 평년에는 28일
  return { tomorrow: addDays(today, 1), weekend: sat, nextMonth1: nm, myBirthday: bd };
}
function renderTime(scrollToResult = false) {
  const p = P();
  const today = todayKey(), minD = addDays(today, 1), maxD = addDays(today, 365);
  const inRange = k => k && k >= minD && k <= maxD;
  const g = gate('time');
  const open = g.left > 0;
  const want = /^\d{4}-\d{2}-\d{2}$/.test(qs.get('d') || '') ? qs.get('d') : null;
  if (want === today) { location.replace(`/${C}/result/fortune/`); return; }
  const shown = inRange(g.data) ? g.data : null;
  const pre = inRange(want) ? want : shown || minD;
  const qd = quickDates(today, p);
  // 지난 날은 목록에서 빼고, 가까운 날부터
  const days = store.get('days', []).filter(x => x.date >= minD).sort((a, b) => (a.date < b.date ? -1 : 1));
  store.set('days', days);

  app().innerHTML = `
<section class="sec"><h1 class="page-h">${esc(U.timeTitle)}</h1><p class="muted">${esc(U.timeSub)}</p>
<div class="quick">${Object.entries(qd).map(([k, v]) => `<button type="button" data-k="${v}"${open ? '' : ' disabled'}>${esc(U[k])}<small>${esc(fmtDate(L, v).replace(/^\d{4}[^\d]*/, ''))}</small></button>`).join('')}</div>
<div class="time-ctl"><input type="date" id="tDate" value="${pre}" min="${minD}" max="${maxD}" aria-label="${esc(U.pickDate)}"${open ? '' : ' disabled'}>
<button class="btn-primary sm" type="button" id="tGo"${open ? '' : ' disabled'}>${esc(U.go)}</button></div>
${gateHTML(g)}
</section>
<div id="tOut"></div>
<section class="sec save-day"><h2>${esc(U.importantDays)}</h2>
<div class="save-row"><input id="tLabel" maxlength="20" placeholder="${esc(U.dayLabelPh)}"><button class="btn-ghost sm" type="button" id="tSave">${esc(U.saveDay)}</button></div>
<ul id="tList" class="day-list"></ul></section>
${adSlot('tab')}`;

  const draw = sel => {
    const d = E.daily(p, sel, 0, C);
    const dd = dHTML(dDay(today, sel));
    const lead = HAS_M ? MV.fortuneReading(M, S, d).flow : S ? todayReading(S, d).flow : summaryText(L, d.band, d.rolls, 'now');
    const dom = k => (HAS_M ? MV.fortuneDomain(M, S, d, k) : S ? domainReading(S, d, k) : domainText(L, k, d.domains[k], d.rolls, ['wealth', 'love', 'work', 'health'].indexOf(k), 'now'));
    const top = [4, 5, 6, 7, 8, 9, 10, 11].sort((a, b) => d.hours[b] - d.hours[a] || a - b).slice(0, 2).sort((a, b) => a - b);
    $('#tOut').innerHTML = `<section class="sec t-res">
<p class="who"><span class="t-chip">${dd}</span> ${esc(fmtDate(L, sel))}</p>
<p class="big-score"><span>${d.score}</span><small>/100</small></p>
<p class="lead">${esc(lead)}</p>
<p class="t-hours"><span>${esc(U.bestHours)}</span>${top.map(i => `<b>${esc(L.sijin[i])}</b> ${sijinRange(i)}`).join(' · ')}</p>
<ul class="domains">${['wealth', 'love', 'work', 'health'].map(k => `<li><span class="d-label">${esc(U.domains[k])}</span>${pips(d.domains[k])}<span class="d-line">${esc(dom(k))}</span></li>`).join('')}</ul>
</section>${basisHTML(S, d, null)}`;
    if (scrollToResult) $('#tOut').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  function dHTML(n) { return `D-${n}`; }
  const list = () => {
    const ds = store.get('days', []).filter(x => x.date >= minD).sort((a, b) => (a.date < b.date ? -1 : 1));
    $('#tList').innerHTML = ds.map((x, i) => `<li><button type="button" class="day-go" data-k="${x.date}"${open ? '' : ' disabled'}><b><em class="dd">D-${dDay(today, x.date)}</em>${esc(x.label || '·')}</b><span>${esc(fmtDate(L, x.date))}</span></button><button type="button" class="day-rm" data-i="${i}" aria-label="${esc(U.remove)}">${esc(U.remove)}</button></li>`).join('');
    $$('.day-go').forEach(b => b.addEventListener('click', () => { $('#tDate').value = b.dataset.k; window.scrollTo({ top: 0, behavior: 'smooth' }); }));
    $$('.day-rm').forEach(b => b.addEventListener('click', () => { const all = store.get('days', []).filter(x => x.date >= minD).sort((a, c) => (a.date < c.date ? -1 : 1)); all.splice(+b.dataset.i, 1); store.set('days', all); list(); }));
  };
  $('#tGo').addEventListener('click', () => {
    const v = $('#tDate').value; const g2 = gate('time');
    if (!inRange(v) || g2.left <= 0) return;
    g2.save({ used: g2.used + 1, data: v });
    history.replaceState(null, '', `?d=${v}`);
    renderTime(true);
  });
  $$('.quick button').forEach(b => b.addEventListener('click', () => { $('#tDate').value = b.dataset.k; $$('.quick button').forEach(x => x.classList.toggle('is-on', x === b)); }));
  $('#tSave').addEventListener('click', () => {
    const v = $('#tDate').value;
    if (!inRange(v)) return;
    const ds = store.get('days', []).filter(x => x.date !== v && x.date >= minD);
    ds.push({ date: v, label: $('#tLabel').value.trim() });
    store.set('days', ds.slice(-30)); $('#tLabel').value = ''; list(); toast(`${U.saveDay} ✓`);
  });
  if (shown) draw(shown);
  bindGate(app(), 'time', () => renderTime());
  list(); pushAds(app());
}

// ── 부적 탭: 이번 시간대(운명 바꾸기를 하면 새로)에 맞는 부적 1개를 무작위로 추천
// 선물 링크로 들어오면 선물받은 부적을 보여 줌(입력 없이도 볼 수 있음)
function charmOf(raw, per) {
  const seed = raw ? `${raw.y}-${raw.m}-${raw.d}-${raw.sijin ?? ''}-${raw.name || ''}` : 'guest';
  const r = E.rng(`charm#${seed}#${per.key}#${turnsState(per.key).used}`);
  return E.CHARMS[Math.floor(r() * E.CHARMS.length)];
}
function renderCharm() {
  const raw = activeRaw();
  const gift = qs.get('gift');
  const per = E.period();
  const isGift = E.CHARMS.includes(gift);
  const sel = isGift ? gift : charmOf(raw, per);
  const charmImg = k => D.images.charms[k];
  const hanja = k => (L.charms[k].name.split(' ').pop() || '');

  app().innerHTML = `
<section class="sec"><h1 class="page-h">${esc(U.charmTitle)}</h1><p class="muted">${esc(U.charmSub)}</p>
${isGift && qs.get('from') !== null ? `<p class="invite-banner">${esc(fmt(U.giftFrom, { n: qs.get('from') || '?' }))}${qs.get('to') ? ` → ${esc(qs.get('to'))}` : ''}</p>` : ''}
</section>
<section class="sec charm-view" id="cView">
${isGift ? '' : `<p class="charm-rec">${esc(U.charmRec)}</p>`}
<div class="charm-big"><img src="${charmImg(sel)}" alt="${esc(L.charms[sel].name)}" width="220" height="396" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'tal',textContent:'${esc(hanja(sel))}'}))"></div>
<h2 class="charm-name">${esc(L.charms[sel].name)}</h2><p class="lead charm-desc">${esc(L.charms[sel].desc)}</p>
<p class="muted">${esc(fmt(U.charmUntil, { t: hhmm(per.next) }))}</p>
<div class="btn-row"><button class="btn-primary" type="button" id="cSave">${esc(U.charmSave)}</button>${canReward() ? `<button class="btn-ghost" type="button" id="cHq">${esc(U.charmHq)}</button>` : ''}</div>
${raw ? `<div class="gift"><h3>${esc(U.charmGift)}</h3><div class="save-row"><input id="giftTo" maxlength="20" placeholder="${esc(U.giftTo)}"><button class="btn-ghost sm" type="button" id="cGift">${esc(U.charmGift)}</button></div></div>` : ''}
</section>
${!raw ? `<section class="sec share-row"><a class="btn-primary" href="/${C}/">${esc(U.submit)}</a></section>` : ''}
${adSlot('tab')}
<section class="sec board" id="boardSec"></section>`;

  store.set('charm', sel);
  mountBoard($('#boardSec'), { C, L, U, getName: () => (activeRaw()?.name || '').trim(), isAdmin, getGate: () => gate('board'), onWrote: () => { const g = gate('board'); g.save({ used: g.used + 1 }); } });
  $('#cSave').addEventListener('click', () => saveCharm(sel, false));
  $('#cHq')?.addEventListener('click', () => showRewarded(() => saveCharm(sel, true)));
  $('#cGift')?.addEventListener('click', () => {
    const to = $('#giftTo').value.trim();
    const u = new URL(`${location.origin}/${C}/result/charm/`);
    u.searchParams.set('gift', sel); u.searchParams.set('from', raw?.name || ''); if (to) u.searchParams.set('to', to);
    shareLink(u.toString(), `${L.charms[sel].name} – ${fmt(U.giftFrom, { n: raw?.name || '' })}`);
  });
  pushAds(app());
}

// 부적 이미지 파일만 그대로 저장(배경·글자 없이). 고화질은 원본 해상도 파일
async function saveCharm(k, hq) {
  const src = hq ? D.images.charms[k].replace('/charm/', '/charm/hq/') : D.images.charms[k];
  const name = `fortune-in-time-charm-${k}${hq ? '-hq' : ''}.jpg`;
  try {
    const blob = await fetch(src).then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); });
    const file = new File([blob], name, { type: 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: L.charms[k].name }); return; } catch { /* 취소 → 저장 */ }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  } catch { window.open(src, '_blank', 'noopener'); } // 저장이 막히면 이미지를 새 창으로 열어 길게 눌러 저장
}

// ════════════════════════════════════════
// 시작
// ════════════════════════════════════════
startHands();
if (body.classList.contains('page-input')) initInput();
else if (body.classList.contains('page-result')) {
  const tab = body.dataset.tab;
  if (!profile() && tab !== 'charm') {
    if (qs.get('inv')) session.set('inv', qs.get('inv'));
    location.replace(`/${C}/`);
  } else {
    const render = HAS_M ? { fortune: renderFortune, master: renderMaster, saju: renderMaster, love: renderMaster, time: renderTime, charm: renderCharm }[tab]
      : { fortune: renderFortune, saju: renderSaju, love: renderLove, time: renderTime, charm: renderCharm }[tab];
    if (lockedOther()) {
      const n = document.createElement('p'); n.className = 'lock-note'; n.setAttribute('role', 'status');
      n.textContent = fmt(U.lockNote, { t: hhmm(E.period().next) });
      app().before(n);
    }
    render();
    startTicker(() => { if (!lockedOther()) $('.lock-note')?.remove(); if (tab === 'fortune') renderFortune(false); else render(); });
  }
}
