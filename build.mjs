// Fortune in Time 정적 사이트 빌드: `node build.mjs` → dist/ 폴더
// Cloudflare Pages 설정: 빌드 명령 `node build.mjs`, 출력 폴더 `dist`
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './site.config.mjs';
import { LANGS, TZ, SLUG, SIGN_GLYPH, BLOOD_LABEL, fmt, esc, sijinRange, dialLabels, dialSVG, todayIn, genericReading, readingHTML, indexListHTML, fmtDate } from './src/content.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const L = {};
for (const c of LANGS) {
  L[c] = (await import(`./src/i18n/${c}.js`)).default;
  const { ui: extraUi = {}, ...lines } = (await import(`./src/i18n/lines/${c}.js`)).default;
  Object.assign(L[c].ui, extraUi);
  L[c].lines = lines;
  L[c].lines.love = (await import(`./src/i18n/love/${c}.js`)).default;
  // 태어난 나라: 전 세계 국가를 이 언어의 이름으로 (기존 '기타'는 저장된 정보 표시용으로만 유지)
  {
    const { COUNTRY_SOLAR } = await import('./src/countries.js');
    const dn = new Intl.DisplayNames([L[c].htmlLang], { type: 'region' });
    const names = {};
    for (const code of Object.keys(COUNTRY_SOLAR)) names[code] = dn.of(code);
    names.OTHER = L[c].countries.OTHER;
    L[c].countries = names;
  }
  // '지금 나에게 필요한 장소는?' 문구
  const pl = (await import(`./src/i18n/places/${c}.js`)).default;
  Object.assign(L[c].ui, pl.ui);
  const more = (await import(`./src/i18n/places/more/${c}.js`)).default;
  const reason = (await import(`./src/i18n/places/reason/${c}.js`)).default;
  L[c].placesData = { ui: pl.live, places: { ...pl.places, ...more }, forYou: pl.forYou, reason };
  const pv = L[c].policy.privacy;
  pv.splice(pv.length - 1, 0, pl.privacyAdd); // '문의' 항목 앞에 위치 안내 추가
}
// ── 문장 가짓수 검사: 요청 기준보다 적으면 빌드를 멈춤
for (const c of LANGS) {
  const ln = L[c].lines, n = a => a.length;
  const fail = [];
  for (const k of ['hourBest', 'hourWorst']) { const h = ln[k]; const v = n(h.open) * n(h.advice) * n(h.close); if (v < 160) fail.push(`${k} ${v}`); }
  for (const [k, D] of Object.entries(ln.domains)) {
    const now = [0, 1, 2].reduce((s, l) => s + n(D.state[l]) * n(D.advice[l]) * n(D.tip), 0);
    const past = [0, 1, 2].reduce((s, l) => s + n(D.pastState[l]) * n(D.pastReflect), 0);
    if (now < 180) fail.push(`${k} ${now}`); if (past < 120) fail.push(`${k} past ${past}`);
  }
  const sNow = [0, 1, 2, 3].reduce((s, b) => s + n(L[c].summary[b]) * n(ln.summaryAdd), 0);
  const sPast = [0, 1, 2, 3].reduce((s, b) => s + n(ln.pastSummary[b]) * n(ln.pastAdd), 0);
  if (sNow < 120) fail.push(`summary ${sNow}`); if (sPast < 120) fail.push(`pastSummary ${sPast}`);
  if (fail.length) throw new Error(`[문장 부족] ${c}: ${fail.join(', ')}`);
}

const SITE = config.siteUrl.replace(/\/$/, '');
const BRAND = config.brand;
const ADS = config.adsense || {};
const VERSION = Date.now().toString(36);
// 언어 선택은 국기 대신 언어 코드와 이름으로 표시 (특정 나라와 언어를 묶지 않음)
const LANG_EN = { ko: 'Korean', ja: 'Japanese', zh: 'Chinese', en: 'English', es: 'Spanish', id: 'Indonesian' };
const GLOBE = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/></svg>';
const HEAD_FONT = { ko: 'Gowun+Batang:wght@700', ja: 'Shippori+Mincho:wght@700', zh: 'Noto+Serif+SC:wght@700', en: 'Gowun+Batang:wght@700', es: 'Gowun+Batang:wght@700', id: 'Gowun+Batang:wght@700' };

// ── 언어 파일 점검: 한국어에 있는 화면 문구가 빠진 언어가 있으면 알려 줌
for (const c of LANGS) {
  const miss = Object.keys(L.ko.ui).filter(k => !(k in L[c].ui));
  if (miss.length) console.warn(`[i18n] ${c} 누락: ${miss.join(', ')}`);
}

// ── 파일 유틸
const rm = p => fs.rmSync(p, { recursive: true, force: true });
const mk = p => fs.mkdirSync(p, { recursive: true });
function write(rel, content) {
  const f = path.join(DIST, rel);
  mk(path.dirname(f));
  fs.writeFileSync(f, content);
}
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  mk(dst);
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
const pages = []; // sitemap용 {loc, alts}

// ── 공통 조각
function head({ lang, title, desc, canonical, alts = null, noindex = false, ogImage }) {
  const Lc = L[lang] || L.ko;
  const font = HEAD_FONT[lang] || HEAD_FONT.ko;
  const client = ADS.client;
  return `<!doctype html>
<html lang="${Lc.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<link rel="canonical" href="${SITE}${canonical}">
${alts ? alts.map(a => `<link rel="alternate" hreflang="${a.hl}" href="${SITE}${a.href}">`).join('\n') : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(BRAND)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:image" content="${SITE}${ogImage || `/og/${lang in L ? lang : 'ko'}.png`}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="${Lc.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#141B36">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${font}&display=swap">
${font.includes('Gowun') ? '' : `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@700&text=${encodeURIComponent(BRAND)}&display=swap">`}
<link rel="stylesheet" href="/assets/style.css?v=${VERSION}">
${client ? `<meta name="google-adsense-account" content="${client}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}" crossorigin="anonymous"></script>` : ''}
${config.ga4 ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${config.ga4}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${config.ga4}');</script>` : ''}
<script>(function(){var h=location.hostname,p=/(^|[?&])ads=preview/.test(location.search);if(p||h==='localhost'||h==='127.0.0.1')document.documentElement.classList.add('ad-preview');${client ? "document.documentElement.classList.add('ads-on');" : ''}})();</script>
</head>`;
}

function header(c, { edit = false } = {}) {
  const Lc = L[c];
  return `<header class="top">
<a class="brand" href="/${c}/"><span class="wordmark">${esc(BRAND)}</span><span class="sub">${esc(Lc.subBrand)}</span></a>
<nav class="top-actions">
${edit ? `<a class="txt-btn" href="/${c}/?edit=1">${esc(Lc.ui.edit)}</a>` : ''}
<a class="lang-btn" href="/?pick=1" aria-label="${esc(Lc.ui.language)}" title="${esc(Lc.ui.language)}">${GLOBE}<span>${c.toUpperCase()}</span></a>
</nav>
</header>`;
}

function footer(c) {
  const Lc = L[c], U = Lc.ui;
  return `<footer class="foot">
<nav class="foot-links"><a href="/${c}/zodiac/">${esc(U.zodiacIndex)}</a><a href="/${c}/horoscope/">${esc(U.signIndex)}</a>${c === 'ja' ? `<a href="/ja/blood/">${esc(U.bloodIndex)}</a>` : ''}</nav>
<nav class="foot-links small"><a href="/${c}/about/">${esc(U.about)}</a><a href="/${c}/privacy/">${esc(U.privacy)}</a><a href="/${c}/terms/">${esc(U.terms)}</a><a href="/${c}/contact/">${esc(U.contact)}</a></nav>
<p class="disclaimer">${esc(Lc.disclaimer)}</p>
<p class="copy">© ${new Date().getFullYear()} ${esc(BRAND)}</p>
</footer>`;
}

// 애드센스 광고 자리. client가 비어 있으면 미리보기(localhost, ?ads=preview)에서만 회색 상자로 보임
export function adSlot(name, label) {
  const slot = (ADS.slots || {})[name];
  return `<aside class="ad" data-ad="${name}"><span class="ad-label">${esc(label)}</span>${ADS.client && slot ? `<ins class="adsbygoogle" style="display:block" data-ad-client="${ADS.client}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>` : `<div class="ad-mock">${esc(label)} ${name}</div>`}</aside>`;
}

function langAlts(sub) {
  const alts = LANGS.map(c => ({ hl: L[c].htmlLang, href: `/${c}${sub}` }));
  alts.push({ hl: 'x-default', href: sub === '/' ? '/' : `/ko${sub}` });
  return alts;
}
function addPage(loc, alts) { pages.push({ loc, alts }); }
const pushAds = `<script>document.querySelectorAll('ins.adsbygoogle').forEach(function(){try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});</script>`;

// ── 1) 언어 선택 첫 페이지 (/)
function buildRoot() {
  const cards = LANGS.map(c => `<a class="lang-card" href="/${c}/" data-lang="${c}" hreflang="${L[c].htmlLang}" lang="${L[c].htmlLang}">
<span class="lang-name">${esc(L[c].name)}</span>${LANG_EN[c] !== L[c].name ? `<span class="lang-en">${LANG_EN[c]}</span>` : ''}<span class="rec" hidden>${esc(L[c].ui.recommended)}</span></a>`).join('\n');
  const html = `${head({ lang: 'ko', title: `${BRAND} | 시운 時運 – Your fortune, hour by hour`, desc: `${L.ko.siteDesc} ${L.en.siteDesc}`, canonical: '/', alts: langAlts('/') })}
<body class="page-root">
<main class="root-wrap">
<div class="root-hero">
<h1 class="root-title"><span class="wordmark">${esc(BRAND)}</span><span class="root-sub">시운 時運 时运</span></h1>
<p class="root-tag">Your fortune, hour by hour</p>
<div class="root-dial" id="rootDial">${dialSVG({ labels: dialLabels(L.ko), nowMin: null, size: 220, id: 'pdial' })}</div>
</div>
<p class="choose" id="chooseLabel">${esc(L.ko.ui.chooseLang)} / Choose your language</p>
<div class="lang-grid">${cards}</div>
<p class="root-intro" id="rootIntro">${esc(L.ko.intro)}</p>
</main>
<footer class="foot" id="rootFoot">
<nav class="foot-links small">${LANGS.map(c => `<a href="/${c}/about/" lang="${L[c].htmlLang}">${esc(L[c].ui.about)}</a>`).join('')}</nav>
<nav class="foot-links small"><a href="/ko/privacy/">${esc(L.ko.ui.privacy)}</a><a href="/en/privacy/">${esc(L.en.ui.privacy)}</a><a href="/ja/privacy/">${esc(L.ja.ui.privacy)}</a></nav>
<p class="copy">© ${new Date().getFullYear()} ${esc(BRAND)}</p>
</footer>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: BRAND, alternateName: ['시운', '時運'], url: SITE + '/', inLanguage: LANGS.map(c => L[c].htmlLang) })}</script>
<script type="module" src="/assets/root.js?v=${VERSION}"></script>
</body></html>`;
  write('index.html', html);
  addPage('/', langAlts('/'));
}

// ── 2) 언어별 입력 페이지 (/ko/ 등)
function selectOpts(from, to, sel, suffix = '') {
  let s = '';
  for (let i = from; to >= from ? i <= to : i >= to; to >= from ? i++ : i--) s += `<option value="${i}"${i === sel ? ' selected' : ''}>${i}${suffix}</option>`;
  return s;
}
function buildInput(c) {
  const Lc = L[c], U = Lc.ui;
  const thisYear = new Date().getFullYear();
  const showLunar = ['ko', 'zh'].includes(c);
  const showBlood = c === 'ja';
  const sijinOpts = Lc.sijin.map((s, i) => `<option value="${i}">${esc(s)} (${sijinRange(i)})</option>`).join('');
  const coll = new Intl.Collator(Lc.htmlLang);
  const rest = Object.entries(Lc.countries).filter(([k]) => k !== 'OTHER' && k !== Lc.defaultCountry).sort((a, b) => coll.compare(a[1], b[1]));
  const countryOpts = `<option value="${Lc.defaultCountry}" selected>${esc(Lc.countries[Lc.defaultCountry])}</option><option disabled>──────────</option>`
    + rest.map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('');
  const body = `${head({ lang: c, title: `${BRAND} ${Lc.subBrand} | ${Lc.tagline}`, desc: Lc.siteDesc, canonical: `/${c}/`, alts: langAlts('/') })}
<body class="page-input" data-lang="${c}">
${header(c)}
<main class="wrap">
<section class="now-card" aria-live="polite">
<div class="now-dial" id="nowDial">${dialSVG({ labels: dialLabels(Lc), size: 200, id: 'ndial' })}</div>
<div class="now-text"><p class="now-is" id="nowIs"></p><p class="now-until">${esc(U.untilChange)} <b id="nowCount">--:--:--</b></p></div>
</section>
<h1 class="page-h">${esc(Lc.tagline)}</h1>
<p class="invite-banner" id="inviteBanner" hidden></p>
<section class="saved-card" id="savedCard" hidden>
<h2>${esc(U.savedTitle)}</h2><p class="muted">${esc(U.savedNote)}</p>
<div id="savedBody"></div>
<a class="btn-primary" href="/${c}/result/fortune/">${esc(U.useSaved)}</a>
<div class="btn-row"><button type="button" class="btn-ghost sm" id="savedEdit">${esc(U.edit)}</button><button type="button" class="btn-ghost sm" id="savedDel">${esc(U.del)}</button></div>
</section>
<form id="profileForm" class="form" novalidate>
<label class="field"><span>${esc(U.name)} <small>${esc(U.optional)}</small></span><input name="name" maxlength="20" autocomplete="nickname" placeholder="${esc(U.namePh)}"></label>
<fieldset class="field"><legend>${esc(U.gender)}</legend><div class="seg-ctl"><label><input type="radio" name="gender" value="M" checked><span>${esc(U.male)}</span></label><label><input type="radio" name="gender" value="F"><span>${esc(U.female)}</span></label></div></fieldset>
${showLunar ? `<fieldset class="field"><legend>${esc(U.calendar)}</legend><div class="seg-ctl"><label><input type="radio" name="cal" value="solar" checked><span>${esc(U.solar)}</span></label><label><input type="radio" name="cal" value="lunar"><span>${esc(U.lunar)}</span></label></div><label class="check leap" hidden><input type="checkbox" name="leap"> ${esc(U.leap)}</label></fieldset>` : ''}
<fieldset class="field"><legend>${esc(U.birth)}</legend><div class="ymd">
<select name="y" aria-label="${esc(U.year)}"><option value="">${esc(U.year)}</option>${selectOpts(thisYear, 1930, null)}</select>
<select name="m" aria-label="${esc(U.month)}"><option value="">${esc(U.month)}</option>${selectOpts(1, 12, null)}</select>
<select name="d" aria-label="${esc(U.day)}"><option value="">${esc(U.day)}</option>${selectOpts(1, 31, null)}</select>
</div></fieldset>
<fieldset class="field"><legend>${esc(U.birthTime)}</legend>
<select name="sijin"><option value="">${esc(U.unknown)}</option>${sijinOpts}</select>
<label class="check"><input type="checkbox" name="exact"> ${esc(U.exactTime)}</label>
<div class="exact-time" hidden><select name="hh" aria-label="${esc(U.hour)}">${selectOpts(0, 23, 12)}</select><span>${esc(U.hour)}</span><select name="mm" aria-label="${esc(U.minute)}">${selectOpts(0, 59, 0)}</select><span>${esc(U.minute)}</span></div>
${Lc.sijinNote ? `<p class="note">${esc(Lc.sijinNote)}</p>` : ''}
</fieldset>
<label class="field"><span>${esc(U.country)}</span><select name="country">${countryOpts}</select></label>
${showBlood ? `<fieldset class="field"><legend>${esc(U.blood)}</legend><div class="seg-ctl four">${['A', 'B', 'O', 'AB'].map((b, i) => `<label><input type="radio" name="blood" value="${i}"><span>${b}</span></label>`).join('')}<label><input type="radio" name="blood" value="" checked><span>${esc(U.none)}</span></label></div></fieldset>` : ''}
<p class="local-only">${esc(U.localOnly)}</p>
<p class="form-err" id="formErr" role="alert" hidden>${esc(U.required)}</p>
<div class="sticky-cta"><button type="submit" class="btn-primary">${esc(U.submit)}</button></div>
</form>
<section class="intro"><p>${esc(Lc.intro)}</p><p class="disc-inline">${esc(Lc.disclaimer)}</p></section>
</main>
${footer(c)}
<script type="application/json" id="ttf-data">${JSON.stringify(clientData(c, false)).replace(/</g, '\\u003c')}</script>
<script type="module" src="/assets/app.js?v=${VERSION}"></script>
</body></html>`;
  write(`${c}/index.html`, body);
  addPage(`/${c}/`, langAlts('/'));
}

function clientData(c, withLines = true) {
  const { policy, lines, placesData, ...rest } = L[c];
  if (withLines) rest.lines = lines;
  return {
    L: rest,
    images: config.images,
    ads: { on: !!ADS.client, client: ADS.client || '', slots: ADS.slots || {} },
    rewarded: !!config.rewarded,
    site: SITE,
    v: VERSION,
    googleMapsKey: config.googleMapsKey || '',
    brand: BRAND,
  };
}

// ── 3) 결과 화면 4탭 (/ko/result/fortune/ 등) — 개인 결과라 검색 제외
const TABS = ['fortune', 'love', 'time', 'charm'];
function buildResult(c) {
  const Lc = L[c], U = Lc.ui;
  for (const t of TABS) {
    const nav = TABS.map(x => `<a href="/${c}/result/${x}/" class="tab${x === t ? ' is-on' : ''}"${x === t ? ' aria-current="page"' : ''}>${esc(U.tabs[x])}</a>`).join('');
    const html = `${head({ lang: c, title: `${U.tabs[t]} | ${BRAND} ${Lc.subBrand}`, desc: Lc.siteDesc, canonical: `/${c}/`, noindex: true })}
<body class="page-result tab-${t}" data-lang="${c}" data-tab="${t}">
${header(c, { edit: true })}
<nav class="tabs" aria-label="tabs">${nav}</nav>
<main class="wrap" id="app" aria-live="polite"><div class="loading"><span></span></div></main>
${footer(c)}
<div class="modal" id="modal" hidden><div class="modal-box" role="dialog" aria-modal="true"><p id="modalText"></p><button class="btn-ghost" id="modalClose">${esc(U.close)}</button></div></div>
<p class="toast" id="toast" role="status" hidden></p>
<script type="application/json" id="ttf-data">${JSON.stringify(clientData(c)).replace(/</g, '\\u003c')}</script>
<script type="module" src="/assets/app.js?v=${VERSION}"></script>
</body></html>`;
    write(`${c}/result/${t}/index.html`, html);
  }
}

// ── 4) 정적 운세 페이지 (띠, 별자리, 시진, 혈액형) — 매일 재빌드, 브라우저에서 날짜가 다르면 다시 계산
function staticShell(c, { title, desc, canonical, alts, h1, bodyHTML, crumbs = '' }) {
  return `${head({ lang: c, title, desc, canonical, alts })}
<body class="page-static" data-lang="${c}">
${header(c)}
<main class="wrap static">
${crumbs}
<h1 class="page-h">${esc(h1)}</h1>
${bodyHTML}
<div class="sticky-cta"><a class="btn-primary" href="/${c}/">${esc(L[c].ui.cta)}</a></div>
</main>
${footer(c)}
${pushAds}
<script type="module" src="/assets/static.js?v=${VERSION}"></script>
</body></html>`;
}
const KIND_NAMES = c => ({ zodiac: L[c].animals, horoscope: L[c].signs, hour: L[c].sijin, blood: BLOOD_LABEL.map(b => (c === 'ja' ? `${b}型` : `${b}`)) });
const KIND_INDEX_TITLE = (c, k) => ({ zodiac: L[c].ui.zodiacIndex, horoscope: L[c].ui.signIndex, hour: L[c].ui.hourIndex, blood: L[c].ui.bloodIndex }[k]);

function buildStatic(c) {
  const Lc = L[c], U = Lc.ui;
  const dateK = todayIn(TZ[c]);
  const kinds = c === 'ja' ? ['zodiac', 'horoscope', 'blood'] : ['zodiac', 'horoscope'];
  for (const kind of kinds) {
    const names = KIND_NAMES(c)[kind];
    const indexTitle = KIND_INDEX_TITLE(c, kind);
    const sub = `/${kind}/`;
    const alts = kind === 'blood' ? null : langAlts(sub);
    // 목록
    const listBody = `<p class="lead">${esc(kind === 'hour' ? (Lc.sijinNote || Lc.intro) : Lc.intro)}</p>
<div data-glist="${kind}" data-date="${dateK}">${indexListHTML(Lc, kind, dateK)}</div>
${adSlot('content', U.ad)}
${otherIndexLinks(c, kind)}`;
    write(`${c}${sub}index.html`, staticShell(c, { title: `${indexTitle} | ${BRAND}`, desc: `${indexTitle}. ${Lc.siteDesc}`, canonical: `/${c}${sub}`, alts, h1: indexTitle, bodyHTML: listBody }));
    addPage(`/${c}${sub}`, alts);
    // 상세 12쪽(혈액형 4쪽)
    names.forEach((nm, i) => {
      const slug = SLUG[kind][i];
      const p = `/${kind}/${slug}/`;
      const pAlts = kind === 'blood' ? null : langAlts(p);
      const r = genericReading(Lc, kind, i, dateK);
      const isHour = kind === 'hour';
      const h1 = isHour ? fmt(U.hourPageTitle, { x: `${nm} (${sijinRange(i)})` }) : fmt(U.todayOf, { x: nm });
      const trait = kind === 'zodiac' ? Lc.animalTraits[i] : kind === 'horoscope' ? Lc.signTraits[i] : kind === 'blood' ? (Lc.bloodTraits || [])[i] : Lc.sijinMeaning[i];
      const extra = kind === 'zodiac' ? `<p class="years">${bornYears(Lc, i)}</p>` : kind === 'horoscope' ? `<p class="glyph" aria-hidden="true">${SIGN_GLYPH[i]}</p>` : '';
      const desc = `${h1}. ${r.summary} ${trait || ''}`.slice(0, 155);
      const bodyHTML = `<nav class="crumbs"><a href="/${c}${sub}">${esc(indexTitle)}</a></nav>
${extra}
${trait ? `<p class="trait">${esc(trait)}</p>` : ''}
${isHour && Lc.sijinNote ? `<p class="note">${esc(Lc.sijinNote)}</p>` : ''}
<section class="reading" data-reading="${kind}" data-idx="${i}" data-date="${dateK}">${readingHTML(Lc, r, dateK)}</section>
${adSlot('content', U.ad)}
<nav class="sibs" aria-label="${esc(U.moreLinks)}">${names.map((n2, j) => `<a href="/${c}/${kind}/${SLUG[kind][j]}/"${j === i ? ' aria-current="page"' : ''}>${esc(n2)}</a>`).join('')}</nav>
${otherIndexLinks(c, kind)}`;
      write(`${c}${p}index.html`, staticShell(c, { title: `${h1} | ${BRAND}`, desc, canonical: `/${c}${p}`, alts: pAlts, h1, bodyHTML }));
      addPage(`/${c}${p}`, pAlts);
    });
  }
}
function bornYears(Lc, i) {
  const now = new Date().getFullYear();
  const ys = [];
  for (let y = now; y >= 1930; y--) if ((((y - 4) % 12) + 12) % 12 === i) ys.push(y);
  return ys.slice(0, 7).map(y => esc(fmt(Lc.ui.bornIn, { y }))).join(', ');
}
function otherIndexLinks(c, except) {
  const U = L[c].ui;
  const all = [['zodiac', U.zodiacIndex], ['horoscope', U.signIndex]];
  if (c === 'ja') all.push(['blood', U.bloodIndex]);
  return `<nav class="more"><h2>${esc(U.moreLinks)}</h2>${all.filter(([k]) => k !== except).map(([k, t]) => `<a href="/${c}/${k}/">${esc(t)}</a>`).join('')}<a href="/${c}/">${esc(U.cta)}</a></nav>`;
}

// ── 5) 정책 페이지
function buildPolicy(c) {
  const Lc = L[c], U = Lc.ui;
  for (const key of ['about', 'privacy', 'terms', 'contact']) {
    const secs = Lc.policy[key].map(([h, p]) => `<section><h2>${esc(h)}</h2><p>${esc(fmt(p, { email: config.contactEmail, brand: BRAND }))}</p></section>`).join('\n');
    const extra = key === 'contact' ? `<p class="mail"><a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a></p>` : '';
    const body = `${head({ lang: c, title: `${U[key]} | ${BRAND}`, desc: `${U[key]} – ${BRAND} ${Lc.subBrand}`, canonical: `/${c}/${key}/`, alts: langAlts(`/${key}/`) })}
<body class="page-policy" data-lang="${c}">
${header(c)}
<main class="wrap prose"><h1 class="page-h">${esc(U[key])}</h1>${secs}${extra}${key !== 'contact' ? `<p class="disc-inline">${esc(Lc.disclaimer)}</p>` : ''}</main>
${footer(c)}
</body></html>`;
    write(`${c}/${key}/index.html`, body);
    addPage(`/${c}/${key}/`, langAlts(`/${key}/`));
  }
}

// ── 6) 부가 파일
function buildMisc() {
  const today = new Date().toISOString().slice(0, 10);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(p => `<url><loc>${SITE}${p.loc}</loc><lastmod>${today}</lastmod>${p.alts ? p.alts.map(a => `<xhtml:link rel="alternate" hreflang="${a.hl}" href="${SITE}${a.href}"/>`).join('') : ''}</url>`).join('\n')}
</urlset>`);
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /*/result/\n\nSitemap: ${SITE}/sitemap.xml\n`);
  if (ADS.client) write('ads.txt', `google.com, ${ADS.client.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
  write('manifest.webmanifest', JSON.stringify({ name: `${BRAND} 시운`, short_name: BRAND, id: '/', start_url: '/?source=home', scope: '/', display: 'standalone', lang: 'ko', description: 'Your fortune, hour by hour', background_color: '#141B36', theme_color: '#141B36', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
  write('_headers', `/assets/*\n  Cache-Control: public, max-age=86400\n/images/*\n  Cache-Control: public, max-age=86400\n/sw.js\n  Cache-Control: no-cache\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);
  write('404.html', `${head({ lang: 'ko', title: `404 | ${BRAND}`, desc: L.ko.siteDesc, canonical: '/404', noindex: true })}
<body class="page-root"><main class="root-wrap"><h1 class="root-title"><span class="wordmark">${esc(BRAND)}</span></h1><p class="root-tag">404</p>
<div class="lang-grid">${LANGS.map(c => `<a class="lang-card" href="/${c}/"><span class="lang-name">${esc(L[c].ui.home)}</span></a>`).join('')}</div></main></body></html>`);
}

// ── 실행
rm(DIST);
mk(DIST);
copyDir(path.join(ROOT, 'public'), DIST);
mk(path.join(DIST, 'assets'));
for (const f of ['engine.js', 'content.js', 'countries.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(DIST, 'assets', f));
copyDir(path.join(ROOT, 'src/client'), path.join(DIST, 'assets'));
fs.copyFileSync(path.join(ROOT, 'node_modules/korean-lunar-calendar/dist/korean-lunar-calendar.mjs'), path.join(DIST, 'assets/lunar.mjs'));
for (const c of LANGS) { const { policy, placesData, ...rest } = L[c]; write(`assets/i18n/${c}.json`, JSON.stringify(rest)); }
// 여행지 문구(언어별)와 내장 세계지도(육지 윤곽)
{
  const { PLACES } = await import('./src/client/place.js');
  for (const c of LANGS) {
    const miss = Object.keys(PLACES).filter(k => !L[c].placesData.places[k]);
    if (miss.length) throw new Error(`[여행지 문구 누락] ${c}: ${miss.join(', ')}`);
    write(`assets/places/${c}.json`, JSON.stringify(L[c].placesData));
  }
  const { createRequire } = await import('node:module');
  const req = createRequire(import.meta.url);
  const topo = req('world-atlas/land-110m.json');
  const { feature } = req('topojson-client');
  const r1 = v => Math.round(v * 10) / 10;
  let land = '';
  for (const g of feature(topo, topo.objects.land).features) {
    const polys = g.geometry.type === 'Polygon' ? [g.geometry.coordinates] : g.geometry.coordinates;
    for (const poly of polys) for (const ring of poly) {
      // 날짜변경선을 넘는 고리는 경도를 이어 붙여 지도 위에 가로줄이 생기지 않게
      let px = null;
      land += 'M' + ring.map(([x, y]) => { let u = x + 180; if (px !== null) { while (u - px > 180) u -= 360; while (u - px < -180) u += 360; } px = u; return `${r1(u)} ${r1(90 - y)}`; }).join('L') + 'Z';
    }
  }
  write('assets/world-land.txt', land);
}
// 브라우저 캐시 문제 방지: 스크립트끼리 불러오는 주소에도 버전을 붙임 (배포할 때마다 새 파일로 인식)
for (const f of ['app.js', 'content.js', 'engine.js', 'root.js', 'static.js', 'place.js', 'place-photos.js', 'place-intro.js', 'sfx.js', 'countries.js']) {
  const fp = path.join(DIST, 'assets', f);
  const src = fs.readFileSync(fp, 'utf8')
    .replace(/(from\s+'\.\/[\w-]+\.m?js)'/g, `$1?v=${VERSION}'`)
    .replace(/import\('\.\/lunar\.mjs'\)/g, `import('./lunar.mjs?v=${VERSION}')`)
    .replace(/\/assets\/i18n\/\$\{(\w+)\}\.json/g, `/assets/i18n/\${$1}.json?v=${VERSION}`);
  fs.writeFileSync(fp, src);
}

buildRoot();
for (const c of LANGS) { buildInput(c); buildResult(c); buildStatic(c); buildPolicy(c); }
buildMisc();

const count = fs.readdirSync(DIST, { recursive: true }).filter(f => f.endsWith('.html')).length;
console.log(`✔ 빌드 완료: HTML ${count}쪽, 사이트맵 ${pages.length}개 주소 → dist/`);
