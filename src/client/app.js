// Fortune in Time 화면 동작: 입력 페이지와 결과 4탭(운세, 궁합, 타임머신, 부적)
import * as E from './engine.js';
import { mountPlace } from './place.js';
import { mountBoard } from './board.js';
import { basisHTML, domainReading, sajuTabHTML, todayReading, todayReadingHTML } from './saju-view.js';
import * as MV from './masters-view.js';
import { freeMaster, MASTERS, yearFortune } from './masters.js';
import * as YV from './year-view.js';
import * as TV from './types-view.js';
import { typeOf } from './masters.js';
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
  // 미리 그려 둔(프리렌더) 화면에서는 실제로 열릴 때 광고를 요청
  if (document.prerendering) { document.addEventListener('prerenderingchange', () => pushAds(root), { once: true }); return; }
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
const SVG_STYLE = `<style>.rim{fill:#1A1A1A}.bowl{fill:#fff}.tk{stroke:#CFC9BC;stroke-width:1}.tk-m{stroke:#1A1A1A;stroke-width:1.4}.seg{stroke:#fff;stroke-width:1.2}.dl{fill:#1A1A1A;font:600 15px serif}.dl-long{font-size:9px}.dl-xl{font-size:8px}.hub{fill:#fff;stroke:#1A1A1A;stroke-width:1}.c-top{fill:#6E6A62;font:12px sans-serif}.c-sm{font-size:10px}.c-xs{font-size:8.6px}.dh{fill:#3A3631;font:700 9px sans-serif}.c-main{fill:#B3261E;font:700 34px serif}.c-sub{fill:#6E6A62;font:12px sans-serif}.needle line{stroke:#1A1A1A;stroke-width:2.5}.needle circle{fill:#B3261E}.sec-hand{display:none}.seg.is-best{fill:#C2302A;stroke:#7E1712;stroke-width:2.4}.seg.is-worst{fill:#3F4A5E;stroke:#1F2633;stroke-width:2}.dh-best,.dh-worst{fill:#fff}</style>`;
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
  } else {
    showForm(true);
    // 처음 오는 사람: 접속 국가를 목록 맨 위에 올리고 선택해 둠 (IP는 저장하지 않음)
    fetch('/api/geo').then(r => r.json()).then(g => {
      const cc = String(g.country || '').toUpperCase(), sel = form.country;
      const opt = sel && [...sel.options].find(o => o.value === cc);
      if (!opt || profile()) return;
      sel.prepend(opt);
      const sep = document.createElement('option'); sep.disabled = true; sep.textContent = '──────────';
      opt.after(sep);
      sel.value = cc;
    }).catch(() => {});
  }
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



${adSlot('A')}

${days.length ? `<section class="sec saved-up">${days.map(x => { const dd = E.daily(p, x.date, 0, C); return `<a href="/${C}/result/time/?d=${x.date}"><b>${esc(x.label || U.savedDays)}</b><span>${esc(fmtDate(L, x.date))}</span><span class="sc">${dd.score}</span></a>`; }).join('')}</section>` : ''}



${rankHTML}${yijiHTML}

<section class="sec${mode === 'reveal' ? ' fate-soft late' : ''}"><ul class="domains">${['wealth', 'love', 'work', 'health'].map((k, i) => `<li><span class="d-label">${esc(U.domains[k])}</span>${pips(d.domains[k])}<span class="d-line">${esc(S ? domainReading(S, d, k) : domainText(L, k, d.domains[k], r, i))}</span></li>`).join('')}</ul></section>
${tomorrowHTML(p, today)}


${flowHTML(p, today, today, d.score, true)}

<section class="sec rel"><h2>${esc(U.relTitle)}</h2>
<div class="rel-grid"><div class="good"><p>${esc(U.helper)}</p><b>${relCells[0][1]}</b><span>${relCells[1][1]}</span></div><div class="bad"><p>${esc(U.drain)}</p><b>${relCells[0][2]}</b><span>${relCells[1][2]}</span></div></div>
</section>

<section class="sec kw-sec${mode === 'reveal' ? ' fate-soft' : ''}"><dl class="kw">${kw.map(([t, v, raw]) => `<div><dt>${esc(t)}</dt><dd>${raw ? v : esc(v)}</dd></div>`).join('')}</dl></section>

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
</section>
<section class="sec change" id="changeSec">
<div class="change-head"><h2>${esc(U.changeTitle)}</h2></div>
<p class="fate-cta">${esc(U.fateCta)}</p>
<p class="fate-left${ts.left <= 0 ? ' is-out' : ''}">${admin ? esc(U.adminMode) : esc(fmt(U.fateLeft, { n: Math.max(0, ts.left) }))}</p>
<p class="change-count">${esc(U.untilChange)} <b data-count>--:--:--</b></p>
${ts.used > 0 && !admin ? `<p class="change-done">${esc(U.changeDone)}</p>` : ''}
<div class="btn-row">
<button class="btn-primary btn-fate" type="button" id="changeBtn"${ts.left <= 0 ? ' disabled' : ''}><span>${esc(U.changeBtn)}</span></button>
${!admin && canReward() && ts.bonus < 1 ? `<button class="btn-ghost" type="button" id="rewardBtn">${esc(U.changeAd)}</button>` : ''}
</div>
${ts.left <= 0 ? `<p class="fate-none">${esc(fmt(U.fateAllUsed, { t: hhmm(per.next) }))}</p>` : ''}
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
  if (rec.last !== t) {
    rec.n += 1; rec.last = t;
    const save = () => { const v2 = store.get('visits', {}); v2[seed] = { ...(v2[seed] || {}), [k]: rec }; store.set('visits', v2); };
    // 미리 그려 둔 화면은 사용자가 실제로 열었을 때만 방문으로 셈
    if (document.prerendering) document.addEventListener('prerenderingchange', save, { once: true }); else save();
  }
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
// ── 오늘 탭 개편 (결론 → 핵심 → 자세히)
const DOMK = ['wealth', 'love', 'work', 'health'];
const DOM_IC = {
  wealth: '<path d="M4 7h16v10H4z"/><circle cx="12" cy="12" r="2.4"/><path d="M7 10v4M17 10v4"/>',
  love: '<path d="M12 19s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 7.6 3.6 3.6 0 0 1 18.5 10c0 4.8-6.5 9-6.5 9z"/>',
  work: '<path d="M4 8h16v10H4zM9 8V6h6v2M4 12h16"/>',
  health: '<path d="M4 12h4l2-4 4 8 2-4h4"/>',
};
const domIcon = k => `<i class="c2-ic c2-${k}" aria-hidden="true"><svg viewBox="0 0 24 24">${DOM_IC[k]}</svg></i>`;
function basisChipLine(S, d) {
  try { const box = document.createElement('div'); box.innerHTML = basisHTML(S, d, null); return [...box.querySelectorAll('.basis-chips span')].slice(0, 3).map(x => x.textContent).join(' · '); } catch { return ''; }
}
function todayParts(d, fr) {
  const T = M.today, r = d.rolls;
  const [, bText, bKind] = T.badge.find(([min]) => d.score >= min);
  const badgeHTML = `<p class="c2-badge c2-b-${bKind}">${esc(bText)}</p>`;
  // 3줄 요약
  const order = [...DOMK].sort((a, b) => d.domains[b] - d.domains[a] || DOMK.indexOf(a) - DOMK.indexOf(b));
  const best = order[0], care = order[order.length - 1];
  const hour = d.best;
  const summaryHTML = `<section class="c2-card c2-sum"><h2 class="c2-h">${esc(T.sumTitle)}</h2><ul>
<li><span class="c2-sic s-good">${domIcon(best)}</span><div><small>${esc(T.sumBest)}</small><b>${esc(U.domains[best])} · ${esc(T.word[best][d.domains[best] - 1])}</b></div></li>
<li><span class="c2-sic s-warn"><i class="c2-ic"><svg viewBox="0 0 24 24"><path d="M12 4 3 20h18L12 4zM12 10v4M12 17h.01"/></svg></i></span><div><small>${esc(T.sumCare)}</small><b>${d.domains[care] >= 4 ? esc(T.sumNone) : `${esc(U.domains[care])} · ${esc(T.care[care])}`}</b></div></li>
<li><span class="c2-sic s-brand"><i class="c2-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg></i></span><div><small>${esc(T.sumHour)}</small><b>${esc(L.sijin[hour])} (${sijinRange(hour)})</b></div></li></ul></section>`;
  // 2×2 타일 + 분야 카드(하나씩 보임)
  const sel = d.domains[care] <= 2 ? care : best;
  const bar = (k, n) => `<span class="c2-bar">${[1, 2, 3, 4, 5].map(i => `<i${i <= n ? ' class="on"' : ''}></i>`).join('')}</span>`;
  const tiles = DOMK.map(k => `<button type="button" class="c2-tile t-${k}${k === sel ? ' is-on' : ''}" data-dom="${k}" aria-pressed="${k === sel}"><span class="c2-tt">${domIcon(k)}${esc(U.domains[k])}</span><span class="c2-sc">${d.domains[k]}<small>/5</small></span>${bar(k, d.domains[k])}<span class="c2-w">${esc(T.word[k][d.domains[k] - 1])}</span></button>`).join('');
  const cards = DOMK.map((k, i) => {
    const n = d.domains[k], kind = n >= 4 ? 'good' : n === 3 ? 'mid' : 'warn';
    const pool = T.todo[k][n >= 3 ? 'up' : 'down'];
    const a = Math.floor(r[30 + i] * pool.length), b = (a + 1 + Math.floor(r[34 + i] * (pool.length - 1))) % pool.length;
    const no = T.todo[k].no[Math.floor(r[26 + i] * T.todo[k].no.length)];
    return `<article class="c2-card c2-dom d-${k}" data-dom="${k}"${k === sel ? '' : ' hidden'}>
<div class="c2-dh"><h3>${esc(U.domains[k])}</h3><span class="c2-badge c2-b-${kind}">${esc(T.lvl[kind])}</span></div>
<p class="c2-lead">${esc(T.lead[k][n - 1][Math.floor(r[20 + i] * 3)])}</p>
<ul class="c2-todo"><li>${esc(pool[a])}</li><li>${esc(pool[b])}</li><li class="no">${esc(no)}</li></ul>
<details class="c2-more"><summary><span class="o">${esc(T.more)}</span><span class="c">${esc(T.less)}</span></summary><p>${esc(MV.fortuneDomain(M, S, d, k))}</p></details></article>`;
  }).join('');
  const domainsHTML = `<section class="c2-doms"><div class="c2-hrow"><h2 class="c2-h">${esc(T.domTitle)}</h2><small>${esc(T.domHint)}</small></div><div class="c2-tiles">${tiles}</div>${cards}</section>`;
  return { badgeHTML, summaryHTML, domainsHTML };
}
function bindDomTiles() {
  $$('.c2-tile').forEach(t => t.addEventListener('click', () => {
    const k = t.dataset.dom;
    $$('.c2-tile').forEach(x => { const on = x === t; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
    $$('.c2-dom').forEach(c => { c.hidden = c.dataset.dom !== k; });
    const card = $(`.c2-dom[data-dom="${k}"]`);
    if (card && card.getBoundingClientRect().top > innerHeight - 120) card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  }));
}
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
  const tz = todayParts(d, fr);
  document.body.classList.add('ds2');
  app().innerHTML = `
<section class="hero-score c2-hero${mode === 'reveal' ? ' fate-reveal' : ''}">
${mode === 'reveal' ? `<p class="fate-arrived" role="status">${esc(U.fateArrived)}</p><div class="fate-dust" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<i style="--x:${(8 + (i * 47) % 84)}%;--y:${(10 + (i * 31) % 78)}%;--dl:${(i % 7) * 0.11}s"></i>`).join('')}</div>` : ''}
<p class="who">${name ? `${name} · ` : ''}${esc(fmtDate(L, today))}</p>
<p class="big-score" aria-label="${esc(U.todayScore)} ${d.score}"><span id="scoreNum">${animate ? 0 : d.score}</span><small>/100</small></p>
${tz.badgeHTML}
<p class="lead">${esc(fr.flow)}</p>
</section>
${tz.summaryHTML}
${tz.domainsHTML}
<section class="m-basic${mode === 'reveal' ? ' fate-soft' : ''}">${MV.fortuneBasicHTML(M, S, d, today)}</section>
<details class="c2-fold"><summary><span><b>${esc(M.today.basisFold)}</b><small>${esc(basisChipLine(S, d))}</small></span></summary>${basisHTML(S, d, `/${C}/result/master/?m=haewoon`)}</details>

<section class="sec mcards"><h2>${esc(M.ui.cardsTitle)}</h2><div class="mc-list">${MASTERS.map(card).join('')}</div></section>

${flowHTML(p, today, today, d.score, true)}
${tomorrowHTML(p, today)}

${adSlot('A')}

<section class="sec kw-sec"><dl class="kw">${kw.map(([t, v, raw]) => `<div><dt>${esc(t)}</dt><dd>${raw ? v : esc(v)}</dd></div>`).join('')}</dl></section>

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
</section>
<section class="sec change" id="changeSec">
<div class="change-head"><h2>${esc(U.changeTitle)}</h2></div>
<p class="fate-cta">${esc(U.fateCta)}</p>
<p class="fate-left${ts.left <= 0 ? ' is-out' : ''}">${admin ? esc(U.adminMode) : esc(fmt(U.fateLeft, { n: Math.max(0, ts.left) }))}</p>
<p class="change-count">${esc(U.untilChange)} <b data-count>--:--:--</b></p>
${ts.used > 0 && !admin ? `<p class="change-done">${esc(U.changeDone)}</p>` : ''}
<div class="btn-row">
<button class="btn-accent btn-primary btn-fate" type="button" id="changeBtn"${ts.left <= 0 ? ' disabled' : ''}><span>${esc(U.changeBtn)}</span></button>
${!admin && canReward() && ts.bonus < 1 ? `<button class="btn-ghost" type="button" id="rewardBtn">${esc(U.changeAd)}</button>` : ''}
</div>
${ts.left <= 0 ? `<p class="fate-none">${esc(fmt(U.fateAllUsed, { t: hhmm(per.next) }))}</p>` : ''}
</section>`;

  bindDomTiles();
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
  let m = new URLSearchParams(location.search).get('m');
  if (!MASTERS.includes(m)) m = tab === 'saju' ? 'haewoon' : tab === 'love' ? 'hana' : (session.get('master') || 'haewoon');
  session.set('master', m);
  const MU = M.ui;
  const p = P(), chart = E.SJ.chartOf(p), per = E.period(), today = todayKey();
  const d = E.daily(p, today, turnsState(per.key).used, C);
  const open = isOpen(m) || (m === 'hana' && !!inv);
  // 위쪽 명인 선택: 사진과 담당 분야만 (이름·열림 표시 없음)
  const pick = MASTERS.map(k => `<a href="?m=${k}" data-m="${k}" class="mp mp-${k}${k === m ? ' is-on' : ''}"${k === m ? ' aria-current="page"' : ''} aria-label="${esc(MU.name[k])}">${imgTag(k, 36, 'mp-img')}<small>${esc(MU.field[k])}</small></a>`).join('');
  const head = `<header class="mhead">${imgTag(m, 76, 'mh-img')}<div><h1>${esc(MU.title[m])}</h1><p>${esc(MU.field[m])}</p></div></header>`;
  let content = '';
  if (open) {
    const secs = m === 'haewoon' ? MV.haewoonSections(M, S, L, d, chart, nowMin()) : m === 'hana' ? MV.hanaSections(M, S, d, chart, new Date(), L) : MV.dohanSections(M, S, L, d, chart);
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
    if (m === 'hana') content += compatBlock(!!inv); // 궁합 요약은 하나 풀이가 잠겨 있어도 무료
  }
  // 해운: 맨 위에 '나의 타입'(60타입) 카드 — 광고 잠금과 상관없이 보임
  const ty = m === 'haewoon' && M.types ? typeOf(chart.dayStem, chart.pillars.day.branch) : null;
  const typeCard = ty ? TV.typeCardHTML(M.types, ty, D.typeImgs, `/${C}/type/`) : '';
  app().innerHTML = `<nav class="mpick" aria-label="${esc(MU.pick)}">${pick}</nav><div class="mview m-${m}">${head}${typeCard}${content}</div>`;
  $('#typeShare')?.addEventListener('click', () => makeAndShowCard($('#typeShare'), () => TV.makeTypeCard(M.types, ty, D.typeImgs, location.host), `type-${ty.slug}.png`, `나의 60타입은 ${TV.typeName(M.types, ty)} ${location.origin}/${C}/type/${ty.slug}/`));
  $('#unlockBtn')?.addEventListener('click', () => unlockWithAd(m, () => renderMaster()));
  // 시운 다이얼: 칸(시간대)을 누르면 그 시간의 풀이 하나만 아래에 보여 줌 (화면은 움직이지 않음)
  const selHour = i => {
    const svg = $('#sdial'); if (!svg) return;
    $$('.seg', svg).forEach(x => x.classList.toggle('is-sel', +x.dataset.i === i));
    const id = i <= 2 ? 0 : i;
    $$('.hr-list .hr').forEach(x => { x.hidden = x.id !== `hr-${id}`; });
    $('.c-top', svg).textContent = L.sijin[i]; $('.c-main', svg).textContent = d.hours[i]; $('.c-sub', svg).textContent = sijinRange(i);
  };
  $('#sdial')?.addEventListener('click', e => { const seg = e.target.closest('.seg'); if (seg) selHour(+seg.dataset.i); });
  if ($('#sdial')) selHour(Math.floor(((nowMin() + 60) % 1440) / 120));
  if ($('#sdial')) requestAnimationFrame(() => requestAnimationFrame(() => $('#sdial')?.classList.add('is-in')));
  const now = $('.daeun .is-now'); if (now) now.parentElement.scrollLeft = now.offsetLeft - now.parentElement.offsetLeft - 16;
  if (m === 'hana') bindCompat(p, inv);
  if ((tab === 'love' || location.hash === '#compat') && $('#compat')) setTimeout(() => $('#compat').scrollIntoView({ block: 'start' }), 60);
  $$('.mpick a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); goMaster(a.dataset.m); }));
  fab(m);
  pushAds(app());
}
// 명인 바꾸기: 새로 불러오지 않고 화면만 부드럽게 바꿈
function goMaster(k) {
  const u = new URL(location.href); u.searchParams.set('m', k); u.hash = '';
  history.pushState(null, '', u);
  const a = app(); a.classList.add('is-out');
  setTimeout(() => { window.scrollTo(0, 0); renderMaster(); a.classList.remove('is-out'); }, reduceMotion ? 0 : 160);
}
addEventListener('popstate', () => { if (HAS_M && ['master', 'saju', 'love'].includes(body.dataset.tab)) renderMaster(); });

// ── 오른쪽 아래 떠 있는 버튼: 맨 위로 + (명인 화면) 지금 보고 있지 않은 명인 2명
function fab(cur = null) {
  let el = $('#fab');
  if (!el) { el = document.createElement('div'); el.id = 'fab'; el.className = 'fab'; document.body.append(el); }
  const others = HAS_M && cur ? MASTERS.filter(k => k !== cur) : [];
  el.innerHTML = `<button type="button" class="fab-top" aria-label="${esc(U.toTop)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg></button>${others.map(k => `<a href="?m=${k}" class="fab-m mc-${k}" data-m="${k}" aria-label="${esc(M.ui.name[k])}">${imgTag(k, 44, 'fab-img')}</a>`).join('')}`;
  el.querySelector('.fab-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  el.querySelectorAll('.fab-m').forEach(a => a.addEventListener('click', e => { e.preventDefault(); goMaster(a.dataset.m); }));
  const upd = () => el.classList.toggle('show-top', scrollY > 240);
  upd(); if (!fab.bound) { addEventListener('scroll', () => $('#fab')?.classList.toggle('show-top', scrollY > 240), { passive: true }); fab.bound = true; }
}

// ── 하나의 궁합 (광고 별도). 초대 링크로 들어온 결과는 광고 없이 보여 줌
// ── 하나의 궁합: 관계 7종(썸·연인·최애·친구·동료·상사·가족). 요약(점수·한 줄·공유 카드)은 무료, 상세는 광고 1번(같은 두 사람·관계는 계속 열림)
// 링크로 보내면 받은 사람은 자기 정보만 넣으면 바로 두 사람 요약을 봄. 정보는 링크 안에만 있고 서버에 저장하지 않음
const KIND_ORDER = ['some', 'lover', 'idol', 'friend', 'coworker', 'boss', 'family'];
function compatBlock(viaInvite) {
  const MU = M.ui, CP = M.hana.compat;
  const pv = store.get('partner', null) || {};
  const thisYear = new Date().getFullYear();
  const opt = (from, to, sel) => { let s = ''; for (let i = from; to >= from ? i <= to : i >= to; to >= from ? i++ : i--) s += `<option value="${i}"${i === sel ? ' selected' : ''}>${i}</option>`; return s; };
  const kind = pv.kind || 'some';
  return `<section class="sec compat" id="compat"><h2>${esc(MU.compatTitle)}</h2><p class="muted">${esc(MU.compatSub)}</p>
<form id="compatForm" class="form compact"${viaInvite ? ' hidden' : ''}>
<div class="ck-row" role="radiogroup" aria-label="${esc(MU.relKind)}">${KIND_ORDER.map(k => `<label class="ck"><input type="radio" name="kind" value="${k}"${k === kind ? ' checked' : ''}><span>${esc(MU.relKinds[k])}</span></label>`).join('')}</div>
<p class="muted small ck-idol"${kind === 'idol' ? '' : ' hidden'}>${esc(CP.idolNote)}</p>
<label class="field"><span id="ptNameLbl">${esc(kind === 'idol' ? CP.idolName : U.partnerName)} <small>${esc(U.optional)}</small></span><input name="name" maxlength="20" value="${esc(pv.name || '')}"></label>
<fieldset class="field"><legend>${esc(U.gender)}</legend><div class="seg-ctl"><label><input type="radio" name="gender" value="M"${pv.gender !== 'F' ? ' checked' : ''}><span>${esc(U.male)}</span></label><label><input type="radio" name="gender" value="F"${pv.gender === 'F' ? ' checked' : ''}><span>${esc(U.female)}</span></label></div></fieldset>
<fieldset class="field"><legend>${esc(U.birth)}</legend><div class="ymd">
<select name="y" aria-label="${esc(U.year)}"><option value="">${esc(U.year)}</option>${opt(thisYear, 1930, pv.y || 2000)}</select>
<select name="m" aria-label="${esc(U.month)}"><option value="">${esc(U.month)}</option>${opt(1, 12, pv.m || 1)}</select>
<select name="d" aria-label="${esc(U.day)}"><option value="">${esc(U.day)}</option>${opt(1, 31, pv.d || 1)}</select></div></fieldset>
<label class="field"><span>${esc(U.birthTime)} <small>${esc(U.optional)}</small></span><select name="sijin"><option value="">${esc(U.unknown)}</option>${L.sijin.map((s, i) => `<option value="${i}"${pv.sijin === i ? ' selected' : ''}>${esc(s)} (${sijinRange(i)})</option>`).join('')}</select></label>
<p class="form-err" id="loveErr" hidden>${esc(U.required)}</p>
<button class="btn-primary" type="submit">${esc(U.analyze)}</button>
</form>
<div id="compatOut"></div>
<div class="cp-invite"><p>${esc(CP.inviteLead)}</p><button class="btn-ghost" type="button" id="inviteBtn">${esc(U.invite)}</button></div>
</section>`;
}
const pairKey = (a, b, kind) => `${E.profileSeed(a)}~${E.profileSeed(b)}~${kind}`;
function compatOpen(k) { return isAdmin() || !!store.get('cpOpen', {})[k]; }
function setCompatOpen(k) { const o = store.get('cpOpen', {}); const ks = Object.keys(o); if (ks.length > 30) delete o[ks[0]]; o[k] = 1; store.set('cpOpen', o); }
function bindCompat(p, inv) {
  const out = $('#compatOut'); if (!out) return;
  const CP = M.hana.compat;
  const show = (pt, scroll) => {
    const raw = activeRaw();
    const kind = KIND_ORDER.includes(pt.kind) ? pt.kind : 'lover';
    const partner = E.profileFrom({ name: pt.name || '', y: pt.y, m: pt.m, d: pt.d, sijin: pt.sijin ?? null, timeMode: pt.sijin === null || pt.sijin === undefined ? 'unknown' : 'sijin', country: raw.country, gender: pt.gender || null });
    const cp = MV.compatReading(M, S, p, partner, kind);
    const key = pairKey(p, partner, kind), opened = compatOpen(key);
    const nm1 = p.name || U.me || '나', nm2 = pt.name || M.ui.relKinds[kind];
    // 무료 요약
    let html = `<div class="love-res cp-sum"><p class="cp-kind">${esc(M.ui.relKinds[kind])}</p>
<p class="pair"><span>${esc(nm1)}</span><i aria-hidden="true">${kind === 'idol' ? '★' : '+'}</i><span>${esc(nm2)}</span></p>
<p class="big-score"><span id="loveNum">0</span><small>/100</small></p><p class="score-label">${esc(U.loveScore)}</p>
<p class="cp-one">${esc(CP.score[cp.band])} ${esc(cp.kindLine)}</p>
<button type="button" class="btn-primary sm cp-share" id="cpShare">${esc(CP.shareBtn)}</button></div>`;
    if (opened) {
      const C2 = M.hana.compat;
      const da = E.daily(p, todayKey(), 0, C).hours, db = E.daily(partner, todayKey(), 0, C).hours;
      const tog = da.map((h, i) => Math.round((h + db[i]) / 2));
      const bh = [4, 5, 6, 7, 8, 9, 10, 11].reduce((a, i) => (tog[i] > tog[a] ? i : a), 4);
      html += `<div class="cp-detail"><h3 class="cp-h">${esc(CP.detailTitle)}</h3>
<ul class="axes">${Object.entries(C2.axes).map(([k, t]) => `<li><span>${esc(t)}</span>${pips(cp.axes[k])}</li>`).join('')}</ul>
${cp.lines.map(t => `<p class="m-p">${esc(t)}</p>`).join('')}
${cp.more.map(t => `<p class="m-p">${esc(t)}</p>`).join('')}
<div class="dodont"><div><h3>${esc(C2.do)}</h3><ul>${cp.doList.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><div><h3>${esc(C2.dont)}</h3><ul>${cp.dontList.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
<p class="m-p">${esc(fmt(C2.hour, { h: `${L.sijin[bh]} (${sijinRange(bh)})` }))}</p></div>`;
    } else {
      html += `<div class="cp-lock"><div class="lk-blur" aria-hidden="true"><i></i><i></i><i></i></div><div class="lk-box"><p class="muted small">${esc(CP.lockDesc)}</p><button class="btn-accent btn-primary" type="button" id="cpUnlock">${esc(CP.lockBtn)}</button></div></div>`;
    }
    out.innerHTML = html;
    countUp($('#loveNum'), cp.score);
    $('#cpUnlock')?.addEventListener('click', () => adThen(() => { setCompatOpen(key); show(pt, false); setTimeout(() => $('.cp-detail')?.scrollIntoView({ block: 'start' }), 60); }));
    $('#cpShare')?.addEventListener('click', () => makeAndShowCard($('#cpShare'), () => MV.makeCompatCard(M, cp, nm1, nm2, kind, location.host), 'compat.png', `${CP.shareText} ${location.origin}/${C}/result/love/`));
    if (scroll) out.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  if (inv) show({ name: inv.n, y: inv.y, m: inv.m, d: inv.d, sijin: inv.s ?? null, gender: inv.g, kind: inv.k || 'lover' }, false);
  else { const pv = store.get('partner', null); if (pv && pv.y) show(pv, false); }
  const form = $('#compatForm');
  form?.addEventListener('change', e => {
    if (e.target.name !== 'kind') return;
    const idol = e.target.value === 'idol';
    $('.ck-idol', form).hidden = !idol;
    $('#ptNameLbl').innerHTML = `${esc(idol ? CP.idolName : U.partnerName)} <small>${esc(U.optional)}</small>`;
  });
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, y = +f.y.value, mo = +f.m.value, dd = +f.d.value;
    if (!y || !mo || !dd || new Date(y, mo - 1, dd).getMonth() !== mo - 1) { $('#loveErr').hidden = false; return; }
    $('#loveErr').hidden = true;
    const pt = { name: f.name.value.trim(), y, m: mo, d: dd, sijin: f.sijin.value === '' ? null : +f.sijin.value, gender: f.gender.value, kind: f.kind.value };
    store.set('partner', pt);
    show(pt, true);
  });
  // 초대 링크: 내 생년월일과 고른 관계만 링크에 담음(서버 저장 없음)
  $('#inviteBtn')?.addEventListener('click', () => {
    const raw = activeRaw();
    const k = form ? (new FormData(form).get('kind') || 'some') : (inv?.k || 'lover');
    const code = b64e({ n: raw.name || '', y: raw.y, m: raw.m, d: raw.d, s: raw.sijin, g: raw.gender, b: raw.blood, k: k === 'idol' ? 'friend' : k });
    shareLink(`${location.origin}/${C}/result/love/?inv=${code}`, fmt(U.invitedBy, { n: raw.name || '' }));
  });
}

// ════════ 관리자 탭: 접속 트래픽 (국가·언어·기기 / 연·월·주·일) ════════
function renderAdmin() {
  if (!isAdmin()) { location.replace(`/${C}/result/fortune/`); return; }
  const st = { by: session.get('adm_by') || 'day', range: session.get('adm_range') || '30' };
  const kst = d => new Date(d.getTime() + 9 * 3600e3).toISOString().slice(0, 10);
  const rangeFrom = r => (r === 'all' ? '2000-01-01' : kst(new Date(Date.now() - (Number(r) - 1) * 864e5)));
  const dn = (() => { try { return new Intl.DisplayNames(['ko'], { type: 'region' }); } catch { return null; } })();
  const LN = { ko: '한국어', ja: '일본어', zh: '중국어', en: '영어', es: '스페인어', id: '인도네시아어', etc: '기타' };
  const DV = { mobile: '모바일', tablet: '태블릿', desktop: 'PC' };
  const BY = { day: '일별', week: '주별', month: '월별', year: '연별' };
  const RG = { 7: '최근 7일', 30: '최근 30일', 90: '최근 90일', 365: '최근 1년', all: '전체' };
  const num = n => Number(n || 0).toLocaleString('ko-KR');
  app().innerHTML = `<section class="sec adm" id="admInq"><h1 class="page-h">문의함 <span class="adm-new" id="inqNew" hidden></span></h1><p class="muted small">사이트 '문의하기' 양식으로 들어온 내용입니다. 새 문의가 위에 표시되고, 펼치면 읽음으로 바뀝니다.</p><div id="inqOut"><p class="muted">불러오는 중…</p></div></section>
<section class="sec adm"><h1 class="page-h">접속 트래픽</h1><p class="muted small">개인 정보 없이 날짜·국가·언어·기기별 숫자만 집계합니다. 날짜는 한국 시간 기준이며, 관리자 본인의 접속은 빠집니다.</p>
<div class="adm-ctl"><div class="adm-seg" id="admBy">${Object.entries(BY).map(([k, v]) => `<button type="button" data-v="${k}" aria-pressed="${k === st.by}">${v}</button>`).join('')}</div>
<select id="admRange">${Object.entries(RG).map(([k, v]) => `<option value="${k}"${k === st.range ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
<div id="admOut"><p class="muted">불러오는 중…</p></div></section>`;
  const bar = (rows, label) => {
    const max = Math.max(1, ...rows.map(r => r.pv));
    const tot = rows.reduce((a, r) => a + r.pv, 0) || 1;
    return `<table class="adm-t"><thead><tr><th></th><th>페이지뷰</th><th>방문자</th><th>비율</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(label(r.k))}</td><td>${num(r.pv)}</td><td>${num(r.uv)}</td><td><span class="adm-bar"><i style="width:${(r.pv / max) * 100}%"></i></span><em>${Math.round((r.pv / tot) * 100)}%</em></td></tr>`).join('') || '<tr><td colspan="4" class="muted">데이터가 없습니다</td></tr>'}</tbody></table>`;
  };
  const chart = rows => {
    if (!rows.length) return '<p class="muted">아직 데이터가 없습니다.</p>';
    const W = 340, H = 160, n = rows.length, max = Math.max(1, ...rows.map(r => r.pv));
    const bw = Math.max(2, (W - 10) / n - 2);
    const bars = rows.map((r, i) => { const x = 5 + i * ((W - 10) / n), h = (r.pv / max) * (H - 30), hu = (r.uv / max) * (H - 30); return `<g><title>${esc(r.k)} · 페이지뷰 ${num(r.pv)} · 방문자 ${num(r.uv)}</title><rect x="${x}" y="${H - 18 - h}" width="${bw}" height="${h}" class="b-pv"/><rect x="${x}" y="${H - 18 - hu}" width="${bw}" height="${hu}" class="b-uv"/></g>`; }).join('');
    const lab = i => `<text x="${5 + i * ((W - 10) / n) + bw / 2}" y="${H - 4}" text-anchor="${i === 0 ? 'start' : 'end'}">${esc(rows[i].k)}</text>`;
    return `<svg class="adm-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="추이 그래프">${bars}${lab(0)}${n > 1 ? lab(n - 1) : ''}</svg><p class="adm-legend"><span><i class="b-pv"></i>페이지뷰</span><span><i class="b-uv"></i>방문자</span><span class="muted">최고 ${num(max)}</span></p>`;
  };
  const load = async () => {
    const out = $('#admOut');
    const name = (profile()?.name || '').trim();
    try {
      const r = await fetch(`/api/stats?by=${st.by}&from=${rangeFrom(st.range)}&to=${kst(new Date())}`, { headers: { 'x-admin': encodeURIComponent(name) } }).then(x => x.json());
      if (!r.ok) throw new Error(r.error);
      const t = r.total || {};
      out.innerHTML = `<div class="adm-cards"><div><span>페이지뷰</span><b>${num(t.pv)}</b></div><div><span>방문자</span><b>${num(t.uv)}</b></div><div><span>국가 수</span><b>${num(t.countries)}</b></div></div>
<h2>${BY[st.by]} 추이</h2>${chart(r.series)}
<details class="adm-more"><summary>${BY[st.by]} 숫자 보기</summary>${bar([...r.series].reverse(), k => k)}</details>
<h2>국가별</h2>${bar(r.country, k => (k === 'XX' ? '알 수 없음' : `${(dn && dn.of(k)) || k} (${k})`))}
<h2>언어별</h2>${bar(r.lang, k => LN[k] || k)}
<h2>기기별</h2>${bar(r.device, k => DV[k] || k)}`;
    } catch (e) {
      out.innerHTML = `<p class="muted">${e.message === 'denied' ? 'Cloudflare에 설정한 관리자 이름(ADMIN_NAME)과 지금 이름이 달라 볼 수 없습니다.' : e.message === 'no_db' ? '데이터베이스(DB)가 연결되어 있지 않습니다.' : '통계를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'}</p>`;
    }
  };
  const hdr = { 'x-admin': encodeURIComponent((profile()?.name || '').trim()) };
  const KD = { ko: '한국어', ja: '일본어', zh: '중국어', en: '영어', es: '스페인어', id: '인도네시아어' };
  const loadInq = async () => {
    const out = $('#inqOut');
    try {
      const r = await fetch('/api/contact', { headers: hdr }).then(x => x.json());
      if (!r.ok) throw new Error(r.error);
      const unread = r.items.filter(i => !i.read).length;
      $('#inqNew').hidden = !unread; $('#inqNew').textContent = `새 문의 ${unread}`;
      setAdminBadge(unread);
      const items = [...r.items].sort((a, b) => a.read - b.read || b.id - a.id);
      out.innerHTML = items.length ? items.map(i => `<details class="inq${i.read ? '' : ' is-new'}" data-id="${i.id}"><summary>${i.read ? '' : '<b class="inq-dot">NEW</b>'}<span class="inq-k">${esc(i.kind || '문의')}</span><span class="inq-s">${esc(i.msg.slice(0, 40))}</span><time>${new Date(i.created).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</time></summary>
<dl class="inq-meta"><div><dt>이름</dt><dd>${esc(i.name || '-')}</dd></div><div><dt>이메일</dt><dd>${esc(i.email)}</dd></div><div><dt>언어·국가</dt><dd>${esc(KD[i.lang] || i.lang || '-')} · ${esc(i.country ? ((dn && dn.of(i.country)) || i.country) : '-')}</dd></div></dl>
<p class="inq-msg">${esc(i.msg)}</p><p class="inq-act"><a class="btn-primary sm" href="mailto:${encodeURIComponent(i.email)}?subject=${encodeURIComponent('[Fortune in Time] 문의 답변')}">메일로 답장</a><button type="button" class="btn-ghost sm" data-del="${i.id}">삭제</button></p></details>`).join('') : '<p class="muted">아직 들어온 문의가 없습니다.</p>';
      $$('details.inq', out).forEach(d => d.addEventListener('toggle', async () => {
        if (!d.open || !d.classList.contains('is-new')) return;
        d.classList.remove('is-new'); $('.inq-dot', d)?.remove();
        await fetch(`/api/contact/${d.dataset.id}/read`, { method: 'POST', headers: hdr }).catch(() => {});
        const n = $$('details.inq.is-new', out).length; $('#inqNew').hidden = !n; $('#inqNew').textContent = `새 문의 ${n}`; setAdminBadge(n);
      }));
      $$('[data-del]', out).forEach(b => b.addEventListener('click', async () => {
        if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = '한 번 더 누르면 삭제'; return; }
        await fetch(`/api/contact/${b.dataset.del}/delete`, { method: 'POST', headers: hdr }).catch(() => {});
        loadInq();
      }));
    } catch (e) {
      out.innerHTML = `<p class="muted">${e.message === 'no_db' ? '데이터베이스(DB)가 연결되어 있지 않습니다.' : '문의를 불러오지 못했습니다.'}</p>`;
    }
  };
  loadInq();
  $$('#admBy button').forEach(b => b.addEventListener('click', () => { st.by = b.dataset.v; session.set('adm_by', st.by); $$('#admBy button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); load(); }));
  $('#admRange').addEventListener('change', e => { st.range = e.target.value; session.set('adm_range', st.range); load(); });
  load();
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
<select name="y" aria-label="${esc(U.year)}"><option value="">${esc(U.year)}</option>${opt(thisYear, 1930, pv?.y || 2000)}</select>
<select name="m" aria-label="${esc(U.month)}"><option value="">${esc(U.month)}</option>${opt(1, 12, pv?.m || 1)}</select>
<select name="d" aria-label="${esc(U.day)}"><option value="">${esc(U.day)}</option>${opt(1, 31, pv?.d || 1)}</select></div></fieldset>
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
    // 결과 전에 광고 창: 5초 동안 게이지가 찬 뒤 오른쪽 위 X를 누르면 결과가 보임 (관리자는 바로)
    if (isAdmin()) renderTime(true); else adGate(() => renderTime(true));
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

// ── 2027 신년운세 탭 (해운정사): 요약은 무료, 12달 상세는 광고 1번 보면 그 해 내내 열림(기기에만 기록)
const YEAR = 2027;
function yearOpen() { if (isAdmin()) return true; const raw = activeRaw(); return !!(raw && store.get(`y${YEAR}`, {})[E.profileSeed(raw)]); }
function setYearOpen() { const raw = activeRaw(); if (!raw) return; const a = store.get(`y${YEAR}`, {}); a[E.profileSeed(raw)] = 1; store.set(`y${YEAR}`, a); }
// 보상형 광고가 연결돼 있으면 그것을, 아니면 배너 광고 창(5초)을 보여 준 뒤 열림
function adThen(done) {
  if (typeof window.ttfShowRewarded === 'function') {
    try { window.ttfShowRewarded(done, () => { toast(M.ui.adFail); done(); }); } catch { done(); }
    return;
  }
  adGate(done);
}
// 같은 사람(이름·생년월일·시간·국가·성별)이 다시 와도 점수·문장이 바뀌지 않도록 처음 결과를 기기에 고정
function fixedYear(chart) {
  const raw = activeRaw(), key = `${(raw?.name || '').trim()}|${E.profileSeed(raw || {})}`;
  const all = store.get(`y${YEAR}fix`, {});
  if (all[key] && all[key].v === 1) return all[key].yf;
  const yf = yearFortune(chart, YEAR);
  const keys = Object.keys(all); if (keys.length >= 6) delete all[keys[0]]; // 최근 6명만
  all[key] = { v: 1, yf };
  try { store.set(`y${YEAR}fix`, all); } catch { /* 저장 공간이 없으면 그대로 계산값 사용 */ }
  return yf;
}
function renderYear() {
  const Y = M.year, p = P(), chart = E.SJ.chartOf(p), yf = fixedYear(chart);
  const t = YV.yearTopHTML(Y, S, chart, yf, (activeRaw()?.name || '').trim());
  const open = yearOpen();
  app().innerHTML = `<div class="y27">${t.hero}${t.overall}${t.dom}${adSlot('tab')}${t.months}
<section class="sec y-sec" id="yDetail"><h2>${esc(Y.secs.detail)}</h2>${open ? YV.yearDetailHTML(Y, yf, chart) : YV.yearLockHTML(Y)}</section>
${t.luck}<section class="sec y-sec y-zlink"><a class="btn-ghost" href="/${C}/${YEAR}/">${esc(Y.zodiacCta)}</a></section>
<section class="sec"><p class="disc-inline">${esc(S.ui.disclaimer)}</p></section></div>`;
  $('#yUnlock')?.addEventListener('click', () => adThen(() => { setYearOpen(); renderYear(); setTimeout(() => $('#yDetail')?.scrollIntoView({ block: 'start' }), 60); }));
  $('#yShare')?.addEventListener('click', () => shareYearCard(Y, chart, yf));
  pushAds(app());
}
// 공유 카드: 이미지를 만들어 미리 보여 주고 공유·저장
async function shareYearCard(Y, chart, yf) {
  await makeAndShowCard($('#yShare'), () => YV.makeCard(Y, S, chart, yf), `fortune-${YEAR}.png`, `${Y.card.shareText} ${location.origin}/${C}/${YEAR}/`);
}
// 공유 카드 공통: 버튼을 '만드는 중'으로 바꾸고 → 이미지 생성 → 미리보기 창(공유하기 · 이미지 저장 · 닫기)
async function makeAndShowCard(btn, make, fname, shareText) {
  const Yc = M.year.card;
  const old = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.textContent = Yc.making; }
  const blob = await make().catch(() => null);
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
  if (!blob) { toast(Yc.fail); return; }
  const file = new File([blob], fname, { type: 'image/png' });
  const url = URL.createObjectURL(blob);
  const canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
  const ov = document.createElement('div');
  ov.className = 'y-card-ov';
  ov.innerHTML = `<div class="y-card-box" role="dialog" aria-modal="true"><img src="${url}" alt="">
<div class="y-card-btns">${canShare ? `<button type="button" class="btn-primary" data-a="share">${esc(Yc.shareBtn)}</button><button type="button" class="btn-ghost" data-a="save">${esc(Yc.saveBtn)}</button>` : `<a class="btn-primary" href="${url}" download="${fname}">${esc(Yc.saveBtn)}</a>`}<button type="button" class="btn-ghost" data-a="close">${esc(Yc.close)}</button></div>
<p class="muted small">${esc(canShare ? Yc.saveHint : Yc.hold)}</p></div>`;
  document.body.append(ov);
  document.documentElement.classList.add('adgate-on');
  requestAnimationFrame(() => ov.classList.add('on'));
  const close = () => { ov.classList.remove('on'); document.documentElement.classList.remove('adgate-on'); setTimeout(() => { ov.remove(); URL.revokeObjectURL(url); }, 250); };
  ov.addEventListener('click', e => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (e.target === ov || a === 'close') close();
    if (a === 'share') navigator.share({ files: [file], text: shareText }).catch(() => {});
    // 이미지만 넘기면 휴대폰 공유 창에 '이미지 저장'(아이폰 → 사진 앱) · '갤러리에 저장'이 뜸
    if (a === 'save') navigator.share({ files: [file] }).catch(() => {});
  });
}

// 광고 창(미래 운세 결과 전): 배너 광고 + 5초 로딩 게이지 → 닫기(X) 버튼이 나타남
function adGate(done) {
  const ov = document.createElement('div');
  ov.className = 'adgate';
  ov.innerHTML = `<div class="adgate-box" role="dialog" aria-modal="true" aria-label="${esc(U.ad)}">
<button type="button" class="adgate-x" aria-label="${esc(U.closeAd)}" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
${adSlot('gate')}
<div class="adgate-bar" aria-hidden="true"><i></i></div><p class="adgate-t">${esc(U.adLoading)}</p></div>`;
  document.body.append(ov);
  document.documentElement.classList.add('adgate-on');
  pushAds(ov);
  requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('on')));
  const x = ov.querySelector('.adgate-x');
  setTimeout(() => { x.hidden = false; ov.classList.add('done'); x.focus(); }, 5000);
  x.addEventListener('click', () => {
    ov.classList.remove('on'); document.documentElement.classList.remove('adgate-on');
    setTimeout(() => ov.remove(), 260); done();
  });
}

// ── 부적 탭: 이번 시간대(운명 바꾸기를 하면 새로)에 맞는 부적 1개를 무작위로 추천
// 선물 링크로 들어오면 선물받은 부적을 보여 줌(입력 없이도 볼 수 있음)
function charmOf(raw, per) {
  const seed = raw ? E.profileSeed(raw) : 'guest'; // 이름은 넣지 않음(같은 정보면 같은 부적)
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
// 페이지 이동 시 부드럽게: 지원 브라우저는 CSS 화면 전환(@view-transition), 그 밖에는 본문을 살짝 흐리게 한 뒤 이동
if (!('onpagereveal' in window) && !reduceMotion) {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || a.target || e.metaKey || e.ctrlKey || e.shiftKey || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
    e.preventDefault(); document.documentElement.classList.add('leaving');
    setTimeout(() => { location.href = u.href; }, 110);
  });
  // 손가락이 닿는 순간 다음 페이지를 미리 받아 둠(누르고 떼는 사이에 받아져 이동이 빨라짐)
  const pre = new Set();
  document.addEventListener('touchstart', e => {
    const a = e.target.closest('a[href]'); if (!a) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || pre.has(u.href)) return;
    pre.add(u.href); const l = document.createElement('link'); l.rel = 'prefetch'; l.href = u.href; document.head.append(l);
  }, { passive: true });
  addEventListener('pageshow', () => document.documentElement.classList.remove('leaving'));
}
// 접속 통계: 개인 정보 없이 언어·그날 첫 방문 여부만 보냄(국가·기기는 서버가 숫자로만 집계). 관리자 본인은 제외
function sendHit() {
  if (isAdmin()) return;
  if (document.prerendering) { document.addEventListener('prerenderingchange', sendHit, { once: true }); return; }
  const t = todayKey(), first = store.get('hitDay', '') !== t;
  store.set('hitDay', t);
  try { fetch('/api/hit', { method: 'POST', keepalive: true, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ l: C, n: first ? 1 : 0 }) }).catch(() => {}); } catch { /* */ }
}
sendHit();
// 관리자(이름 master3771)로 접속하면 하단 탭 '부적&톡' 옆에 '관리자' 탭을 붙임
if (isAdmin() && $('.tabs') && !$('.tabs .tab-admin')) {
  const a = document.createElement('a');
  a.href = `/${C}/result/admin/`; a.className = `tab tab-admin${body.dataset.tab === 'admin' ? ' is-on' : ''}`;
  a.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg><span>${esc((U.tabs && U.tabs.admin) || 'Admin')}</span>`;
  $('.tabs').append(a);
}
// 관리자: 새 문의가 있으면 관리자 탭에 숫자 알림
function setAdminBadge(n) {
  const a = $('.tabs .tab-admin'); if (!a) return;
  let b = $('.tab-badge', a);
  if (!n) { b?.remove(); return; }
  if (!b) { b = document.createElement('i'); b.className = 'tab-badge'; a.append(b); }
  b.textContent = n > 99 ? '99+' : String(n);
  b.setAttribute('aria-label', `새 문의 ${n}건`);
}
if (isAdmin() && !document.prerendering) {
  fetch('/api/contact/count', { headers: { 'x-admin': encodeURIComponent((profile()?.name || '').trim()) } }).then(r => r.json()).then(r => { if (r.ok) setAdminBadge(r.unread); }).catch(() => {});
}
if (body.classList.contains('page-input')) initInput();
else if (body.classList.contains('page-result')) {
  const tab = body.dataset.tab;
  if (!profile() && tab !== 'charm' && tab !== 'admin') {
    if (qs.get('inv')) session.set('inv', qs.get('inv'));
    location.replace(`/${C}/`);
  } else {
    const render = tab === 'admin' ? renderAdmin : HAS_M ? { fortune: renderFortune, master: renderMaster, year: renderYear, saju: renderMaster, love: renderMaster, time: renderTime, charm: renderCharm }[tab]
      : { fortune: renderFortune, saju: renderSaju, love: renderLove, time: renderTime, charm: renderCharm }[tab];
    if (lockedOther()) {
      const n = document.createElement('p'); n.className = 'lock-note'; n.setAttribute('role', 'status');
      n.textContent = fmt(U.lockNote, { t: hhmm(E.period().next) });
      app().before(n);
    }
    // 페이지에 들어오면 언제나 맨 위(오늘의 운세 점수)부터
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!location.hash) window.scrollTo(0, 0);
    render();
    if (!document.getElementById('fab')) fab();
    startTicker(() => { if (!lockedOther()) $('.lock-note')?.remove(); if (tab === 'fortune') renderFortune(false); else render(); });
  }
}
