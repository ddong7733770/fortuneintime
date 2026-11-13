// forTime 정적 사이트 빌드: `node build.mjs` → dist/ 폴더
// Cloudflare Pages 설정: 빌드 명령 `node build.mjs`, 출력 폴더 `dist`
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './site.config.mjs';
import Z27 from './src/i18n/masters/ko-zodiac27.js';
import { GOAT } from './src/client/goat.js';
import { branchRel } from './src/saju.js';
import T60 from './src/i18n/masters/ko-types.js';
import { typeOf, TYPES60 } from './src/masters.js';
import * as TV from './src/client/types-view.js';
import { LANGS, TZ, SLUG, SIGN_GLYPH, BLOOD_LABEL, fmt, esc, sijinRange, dialLabels, dialSVG, todayIn, genericReading, readingHTML, indexListHTML, fmtDate } from './src/content.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
// 게시판 개인정보 안내(개인정보처리방침에 추가)
const BOARD_PRIVACY = {
  ko: ['게시판', '게시판에 글을 쓰면 작성자 이름(운세를 볼 때 입력한 이름), 제목, 내용, 첨부 이미지, 국가(접속 위치로 추정한 국가 코드), 작성 시각, 비밀번호의 해시값이 저장됩니다. 비밀번호 원문과 IP 주소는 저장하지 않습니다. 같은 시간대에 여러 번 쓰는 것을 막기 위해 IP 주소를 알아볼 수 없게 바꾼 값(해시)을 그 시간대가 끝나는 6시 또는 18시까지만 보관한 뒤 자동으로 지웁니다. 글은 작성자가 비밀번호로 직접 수정·삭제할 수 있고, 목적에 맞지 않거나 부적절한 글은 운영진이 삭제할 수 있습니다. 이미지는 올리기 전에 기기에서 다시 저장되어 사진 속 위치 정보가 지워집니다.'],
  ja: ['掲示板', '掲示板に投稿すると、投稿者名（占いで入力した名前）、タイトル、本文、添付画像、国（接続位置から推定した国コード）、投稿時刻、パスワードのハッシュ値が保存されます。パスワードの原文とIPアドレスは保存しません。同じ時間帯の連続投稿を防ぐため、IPアドレスを判別できない形に変換した値（ハッシュ）をその時間帯が終わる6時または18時まで保管し、自動で削除します。投稿は投稿者がパスワードで編集・削除でき、目的に合わない・不適切な投稿は運営者が削除することがあります。画像はアップロード前に端末で再保存され、写真の位置情報は削除されます。'],
  zh: ['留言板', '发帖时会保存作者名（看运势时输入的名字）、标题、内容、附加图片、国家（根据访问位置推测的国家代码）、发帖时间和密码的哈希值。不保存密码原文和IP地址。为防止同一时段多次发帖，会将IP地址转换为无法识别的值（哈希），仅保存至该时段结束（6点或18点）后自动删除。作者可凭密码修改或删除帖子，不符合宗旨或不当的帖子运营方可删除。图片在上传前会在设备上重新保存，照片中的位置信息会被删除。'],
  en: ['Board', 'When you post, we store the author name (the name you entered for your fortune), title, message, attached image, country (a country code estimated from your connection) and post time, plus a hash of your password. We do not store your password itself or your IP address. To limit posting to once per time slot, we keep an irreversible hash of your IP address only until that slot ends (6:00 or 18:00) and then delete it automatically. Authors can edit or delete posts with their password, and operators may remove posts that are inappropriate or off-topic. Images are re-saved on your device before upload, which removes location data from photos.'],
  es: ['Tablón', 'Al publicar guardamos el nombre del autor (el que introdujiste para tu fortuna), título, mensaje, imagen adjunta, país (código estimado por tu conexión), hora de publicación y un hash de tu contraseña. No guardamos la contraseña ni tu dirección IP. Para limitar las publicaciones a una por franja, conservamos un hash irreversible de tu IP solo hasta que termina la franja (6:00 o 18:00) y luego se borra automáticamente. Los autores pueden editar o borrar con su contraseña, y los administradores pueden retirar publicaciones inapropiadas. Las imágenes se vuelven a guardar en tu dispositivo antes de subirse, lo que elimina los datos de ubicación de las fotos.'],
  id: ['Papan', 'Saat menulis, kami menyimpan nama penulis (nama yang kamu isi untuk ramalan), judul, pesan, gambar lampiran, negara (kode negara dari perkiraan koneksi), waktu kirim, dan hash kata sandi. Kami tidak menyimpan kata sandi asli maupun alamat IP. Untuk membatasi satu tulisan per slot waktu, kami menyimpan hash IP yang tidak bisa dikembalikan hanya sampai slot berakhir (06.00 atau 18.00), lalu dihapus otomatis. Penulis dapat mengubah atau menghapus dengan kata sandi, dan pengelola dapat menghapus tulisan yang tidak pantas. Gambar disimpan ulang di perangkat sebelum diunggah sehingga data lokasi pada foto terhapus.'],
};
// 문의하기 양식으로 받는 정보
const CONTACT_PRIVACY = {
  ko: ['문의하기', '문의하기 양식을 보내면 이메일, 이름(선택), 문의 종류와 내용, 언어, 국가 코드, 접수 시간을 답변을 위해서만 보관합니다. 답변이 끝난 문의는 운영자가 삭제하며, 같은 곳에서 너무 자주 보내는 것을 막기 위해 접속 정보를 되돌릴 수 없게 바꾼 값만 10분 동안 보관합니다.'],
  ja: ['お問い合わせ', 'お問い合わせフォームを送信すると、メールアドレス、お名前（任意）、種類と内容、言語、国コード、受付時刻を回答のためだけに保管します。回答が済んだお問い合わせは運営者が削除します。短時間の連続送信を防ぐため、接続情報を元に戻せない形に変えた値のみ10分間保管します。'],
  zh: ['联系我们', '提交联系表单时，我们仅为回复而保存电子邮箱、姓名（选填）、咨询类型与内容、语言、国家代码和提交时间。回复完成后由运营者删除。为防止短时间内重复提交，仅将访问信息转换为不可还原的值并保存10分钟。'],
  en: ['Contact', 'When you send the contact form, we keep your email, name (optional), inquiry type and message, language, country code and time only to reply to you. Inquiries are deleted by the operator once answered. To prevent repeated sending, we keep only an irreversible value derived from your connection for 10 minutes.'],
  es: ['Contacto', 'Al enviar el formulario de contacto guardamos tu correo, nombre (opcional), tipo y contenido de la consulta, idioma, código de país y hora solo para responderte. El operador elimina las consultas ya respondidas. Para evitar envíos repetidos, guardamos solo un valor irreversible derivado de tu conexión durante 10 minutos.'],
  id: ['Kontak', 'Saat kamu mengirim formulir kontak, kami menyimpan email, nama (opsional), jenis dan isi pertanyaan, bahasa, kode negara, dan waktu hanya untuk membalas. Pertanyaan yang sudah dijawab dihapus oleh operator. Untuk mencegah pengiriman berulang, kami hanya menyimpan nilai tak terbalikkan dari koneksimu selama 10 menit.'],
};
const DIST = path.join(ROOT, 'dist');
const L = {};
for (const c of LANGS) {
  L[c] = (await import(`./src/i18n/${c}.js`)).default;
  const { ui: extraUi = {}, ...lines } = (await import(`./src/i18n/lines/${c}.js`)).default;
  Object.assign(L[c].ui, extraUi);
  L[c].lines = lines;
  L[c].lines.love = (await import(`./src/i18n/love/${c}.js`)).default;
  // 사주 풀이 문장(현재 한국어만). 있으면 '사주' 탭과 근거 문장을 보여 줌
  // 명인 풀이 문장(현재 한국어만). 있으면 '명인' 탭(해운정사·하나·도한)을 보여 줌
  if (fs.existsSync(path.join(ROOT, `src/i18n/masters/${c}.js`))) { L[c].masters = (await import(`./src/i18n/masters/${c}.js`)).default; L[c].ui.tabs = { ...L[c].ui.tabs, master: L[c].masters.ui.tab || '명인' }; }
  if (fs.existsSync(path.join(ROOT, `src/i18n/saju/${c}.js`))) { L[c].saju = (await import(`./src/i18n/saju/${c}.js`)).default; L[c].ui.tabs = { ...L[c].ui.tabs, saju: L[c].saju.ui.tab }; }
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
  const extra = (await import(`./src/i18n/places/extra/${c}.js`)).default; // 2차 추가 40곳
  L[c].placesData = { ui: pl.live, places: { ...pl.places, ...more, ...extra }, forYou: pl.forYou, reason };
  const pv = L[c].policy.privacy;
  pv.splice(pv.length - 1, 0, pl.privacyAdd, BOARD_PRIVACY[c], CONTACT_PRIVACY[c]); // '문의' 항목 앞에 위치·게시판 안내 추가
}
// ── 여행지 검사: 좌표·사진·문구가 6개 언어 모두 있어야 함
{
  const src = fs.readFileSync(path.join(ROOT, 'src/client/place.js'), 'utf8');
  const ids = [...src.slice(src.indexOf('export const PLACES'), src.indexOf('// 구글 지도 검색어')).matchAll(/(\w+): \[-?\d/g)].map(m => m[1]);
  const { PHOTOS } = await import('./src/client/place-photos.js');
  for (const c of LANGS) { const miss = ids.filter(id => !L[c].placesData.places[id]); if (miss.length) { console.error(`✖ [${c}] 여행지 문구 없음: ${miss.join(', ')}`); process.exit(1); } }
  const noPh = ids.filter(id => !PHOTOS[id]); if (noPh.length) { console.error(`✖ 여행지 사진 없음: ${noPh.join(', ')}`); process.exit(1); }
  console.log(`✔ 여행지 ${ids.length}곳: 좌표·사진·6개 언어 문구 확인`);
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
// 제목: Noto Serif(언어별), 본문: Pretendard(한글·라틴) → 6개 언어를 같은 느낌으로
const HEAD_FONT = { ko: 'Noto+Serif+KR:wght@600;700', ja: 'Noto+Serif+JP:wght@600;700', zh: 'Noto+Serif+SC:wght@600;700', en: 'Noto+Serif:wght@600;700', es: 'Noto+Serif:wght@600;700', id: 'Noto+Serif:wght@600;700' };
const PRETENDARD = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
// 하단 탭 아이콘(선 아이콘)
const TAB_ICON = {
  fortune: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
  master: '<circle cx="12" cy="8.2" r="3.6"/><path d="M4.8 20.5c1.1-4 4-6.2 7.2-6.2s6.1 2.2 7.2 6.2"/>',
  saju: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12h17"/>',
  love: '<path d="M12 20s-7.2-4.4-7.2-10.1A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 7.2 2.6C19.2 15.6 12 20 12 20z"/>',
  time: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 2.1"/><path d="M19.5 4.5v3.2h-3.2"/>',
  admin: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  year: '<path d="M8.6 7.6C7.8 4.6 4.4 4.2 4 6.6c-.3 1.9 1.6 2.6 2.8 1.6M15.4 7.6c.8-3 4.2-3.4 4.6-1 .3 1.9-1.6 2.6-2.8 1.6"/><path d="M7.2 9.2c0-1.6 2.1-2.7 4.8-2.7s4.8 1.1 4.8 2.7c0 4.8-2.1 9.6-4.8 11.3-2.7-1.7-4.8-6.5-4.8-11.3z"/><path d="M10 12.6h.01M14 12.6h.01M11 16.4h2"/>',
  charm: '<rect x="7" y="2.8" width="10" height="18.4" rx="1.2"/><path d="M10 7.2h4M12 7.2v9.6M10 12h4M10 16.8h4"/>',
};

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
${noindex ? '<meta name="robots" content="noindex, follow, noai, noimageai">' : '<meta name="robots" content="index, follow, noai, noimageai">'}
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
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${font}&display=swap">
${font.includes('Noto+Serif+KR') ? '' : `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&text=${encodeURIComponent(BRAND)}&display=swap">`}
<link rel="stylesheet" href="${PRETENDARD}">
<link rel="stylesheet" href="/assets/style.css?v=${VERSION}">
${client ? `<meta name="google-adsense-account" content="${client}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}" crossorigin="anonymous"></script>` : ''}
<script type="speculationrules">{"prerender":[{"where":{"href_matches":"/*/result/*"},"eagerness":"moderate"}],"prefetch":[{"where":{"href_matches":"/*/result/*"},"eagerness":"eager"}]}</script>
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
  // 모든 나라를 이름순으로(대한민국도 이름순 자리). 접속 위치(IP) 나라는 화면에서 맨 위로 올려 선택해 둠
  const rest = Object.entries(Lc.countries).filter(([k]) => k !== 'OTHER').sort((a, b) => coll.compare(a[1], b[1]));
  const countryOpts = rest.map(([k, v]) => `<option value="${k}"${k === Lc.defaultCountry ? ' selected' : ''}>${esc(v)}</option>`).join('');
  const body = `${head({ lang: c, title: `${BRAND} ${Lc.subBrand} | ${Lc.tagline}`, desc: Lc.siteDesc, canonical: `/${c}/`, alts: langAlts('/') })}
<body class="page-input ds2" data-lang="${c}">
${header(c)}
<main class="wrap">
<section class="now-card" aria-live="polite">
<div class="now-dial" id="nowDial">${dialSVG({ labels: dialLabels(Lc), size: 200, id: 'ndial' })}</div>
<div class="now-text"><p class="now-is" id="nowIs"></p><p class="now-until">${esc(U.untilChange)} <b id="nowCount">--:--:--</b></p></div>
</section>
<h1 class="page-h">${esc(Lc.tagline)}</h1>
${c === 'ko' ? `<a class="y-promo" href="/${c}/${Y27}/"><span class="y-promo-g">${GOAT}</span><span><b>${esc(Z27.promo.title)}</b><small>${esc(Z27.promo.sub)}</small></span><i aria-hidden="true">›</i></a>` : ''}
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
<select name="y" aria-label="${esc(U.year)}"><option value="">${esc(U.year)}</option>${selectOpts(thisYear, 1930, 2000)}</select>
<select name="m" aria-label="${esc(U.month)}"><option value="">${esc(U.month)}</option>${selectOpts(1, 12, 1)}</select>
<select name="d" aria-label="${esc(U.day)}"><option value="">${esc(U.day)}</option>${selectOpts(1, 31, 1)}</select>
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
  else { delete rest.saju; delete rest.masters; }
  return {
    L: rest,
    images: config.images,
    typeImgs: TYPE_IMGS,
    ads: { on: !!ADS.client, client: ADS.client || '', slots: ADS.slots || {} },
    rewarded: !!config.rewarded,
    site: SITE,
    v: VERSION,
    googleMapsKey: config.googleMapsKey || '',
    brand: BRAND,
  };
}

// ── 3) 결과 화면 4탭 (/ko/result/fortune/ 등) — 개인 결과라 검색 제외
// 한국어(명인 풀이가 있는 언어): 오늘 / 명인 / 미래 / 부적. 예전 주소(saju, love)는 명인 화면으로 넘겨 줌
const BASE_TABS = ['fortune', 'love', 'time', 'charm'];
function buildResult(c) {
  const Lc = L[c], U = Lc.ui;
  const HAS_M = !!(Lc.saju && Lc.masters);
  const NAV = HAS_M ? ['fortune', 'master', 'year', 'time', 'charm'] : BASE_TABS; // year: 2027 신년운세(한국어 먼저)
  const PAGES = [...(HAS_M ? [...NAV, 'saju', 'love'] : NAV), 'admin']; // admin: 관리자만 (탭은 화면에서 붙임)
  for (const t of PAGES) {
    const on = HAS_M && (t === 'saju' || t === 'love') ? 'master' : t;
    // 명인 탭 아이콘은 해운정사 사진
    const ico = x => (x === 'master' ? `<img class="tab-face" src="${config.images.master}" alt="" width="26" height="26">` : `<svg viewBox="0 0 24 24" aria-hidden="true">${TAB_ICON[x]}</svg>`);
    const nav = NAV.map(x => `<a href="/${c}/result/${x}/" class="tab${x === on ? ' is-on' : ''}"${x === on ? ' aria-current="page"' : ''}>${ico(x)}<span>${esc(U.tabs[x])}</span></a>`).join('');
    const html = `${head({ lang: c, title: `${U.tabs[t]} | ${BRAND} ${Lc.subBrand}`, desc: Lc.siteDesc, canonical: `/${c}/`, noindex: true })}
<body class="page-result ds2 has-bnav tab-${t}" data-lang="${c}" data-tab="${t}">
${header(c, { edit: true })}
<nav class="tabs" aria-label="menu">${nav}</nav>
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
function staticShell(c, { title, desc, canonical, alts, h1, bodyHTML, crumbs = '', bnav = false, sticky = true, cls = '', script = '' }) {
  return `${head({ lang: c, title, desc, canonical, alts })}
<body class="page-static ds2${bnav ? ' has-bnav' : ''}${cls ? ` ${cls}` : ''}" data-lang="${c}">
${header(c)}
${bnav ? `<nav class="tabs" aria-label="menu">${bottomNav(c)}</nav>` : ''}
<main class="wrap static">
${crumbs}
${h1 ? `<h1 class="page-h">${esc(h1)}</h1>` : ''}
${bodyHTML}
${sticky ? `<div class="sticky-cta"><a class="btn-primary" href="/${c}/">${esc(L[c].ui.cta)}</a></div>` : ''}
</main>
${bnav ? `<div class="fab" id="fabTop"><button type="button" class="fab-top" aria-label="${esc(L[c].ui.toTop || 'Top')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg></button></div>` : ''}
${footer(c)}
${pushAds}
<script type="module" src="/assets/static.js?v=${VERSION}"></script>
${script}
</body></html>`;
}
// 하단 고정 탭 (결과 화면과 같은 구성, 공개 페이지에서는 선택된 탭 없음)
function bottomNav(c, on = '') {
  const Lc = L[c], U = Lc.ui, HAS_M = !!(Lc.saju && Lc.masters);
  const NAV = HAS_M ? ['fortune', 'master', 'year', 'time', 'charm'] : BASE_TABS;
  const ico = x => (x === 'master' ? `<img class="tab-face" src="${config.images.master}" alt="" width="26" height="26">` : `<svg viewBox="0 0 24 24" aria-hidden="true">${TAB_ICON[x]}</svg>`);
  return NAV.map(x => `<a href="/${c}/result/${x}/" class="tab${x === on ? ' is-on' : ''}"${x === on ? ' aria-current="page"' : ''}>${ico(x)}<span>${esc(U.tabs[x])}</span></a>`).join('');
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

// ── 4-2) 2027 정미년 띠별 운세 (한국어 먼저) — 검색 노출용 공개 페이지
// 좋은 달: 그 달(15일 기준 월지)이 내 띠와 합·삼합 / 조심할 달: 충·형. 양력 1월=丑 … 12월=子
const Y27 = 2027;
// 60타입 띠 동물 그림: public/images/animals/{rat,ox,…}.webp 가 있는 것만 씀 (없으면 한자 배지)
const TYPE_IMGS = ['mouse', 'cow', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'sheep', 'monkey', 'cock', 'dog', 'pig'].filter(a => fs.existsSync(path.join(ROOT, 'public/images/animals', `${a}.webp`)));
function monthsFor(a) {
  const good = [], care = [];
  for (let m = 1; m <= 12; m++) { const r = branchRel(m % 12, a); if (r === 'hap' || r === 'samhap') good.push(m); if (r === 'chung' || r === 'hyeong') care.push(m); }
  return { good, care };
}
function buildYear(c) {
  if (c !== 'ko') return;
  const Lc = L[c], Z = Z27, names = Lc.animals;
  const star = n => `<span class="y-stars" aria-label="${n}/5">${'★'.repeat(n)}<i>${'★'.repeat(5 - n)}</i></span>`;
  const years = i => { const ys = []; for (let y = 2014; y >= 1950; y--) if ((((y - 4) % 12) + 12) % 12 === i) ys.push(y); return ys.slice(0, 5).map(y => fmt(Z.bornIn, { y })).join(' · '); };
  const cta = `<div class="y-cta"><a class="btn-primary y-btn" href="/${c}/result/year/">${esc(Z.cta)}</a></div>`;
  const hero = (h, sub) => `<section class="y-hero y-hero-s"><p class="y-kick">2027 丁未年 · 붉은 양의 해</p><div class="y-goat sm">${GOAT}</div><h1 class="y-title">${esc(h)}</h1>${sub ? `<p class="y-who">${esc(sub)}</p>` : ''}</section>`;
  // 모음
  const grid = names.map((n, i) => `<a class="y-zc" href="/${c}/${Y27}/${SLUG.zodiac[i]}/"><b>${esc(n)}</b>${star(Z.animals[i].stars)}<small>${esc(Z.animals[i].hook)}</small></a>`).join('');
  const hubBody = `<div class="y27 y-static">${hero(Z.hubTitle)}
<section class="sec y-sec"><p>${esc(Z.hubLead)}</p></section>
<div class="y-zgrid">${grid}</div>
${cta}
${adSlot('content', Lc.ui.ad)}
<section class="sec y-sec"><p class="y-note">${esc(Z.note)}</p></section></div>`;
  write(`${c}/${Y27}/index.html`, staticShell(c, { title: `${Z.hubTitle} | ${BRAND}`, desc: Z.hubDesc, canonical: `/${c}/${Y27}/`, alts: null, h1: '', bodyHTML: hubBody }));
  addPage(`/${c}/${Y27}/`, null);
  names.forEach((n, i) => {
    const A = Z.animals[i], { good, care } = monthsFor(i), lb = Z.labels;
    const mm = list => list.length ? list.map(m => fmt(Z.monthFmt, { m })).join(' · ') : '—';
    const title = fmt(Z.pageTitle, { a: n });
    const rows = [['money', A.money], ['love', A.love], ['work', A.work], ['health', A.health]];
    const bodyHTML = `<div class="y27 y-static">${hero(title, A.hook)}
<p class="years y-years">${esc(years(i))}</p>
<section class="sec y-sec"><h2>${esc(lb.overall)}</h2><p class="y-starline">${esc(lb.stars)} ${star(A.stars)}</p><p>${esc(A.overall)}</p></section>
<section class="sec y-sec"><ul class="y-dom">${rows.map(([k, t]) => `<li><div class="y-dh"><b>${esc(lb[k])}</b></div><p>${esc(t)}</p></li>`).join('')}</ul></section>
<section class="sec y-sec"><div class="y-bw"><div class="b"><small>${esc(lb.good)}</small><b>${esc(mm(good))}</b></div><div class="w"><small>${esc(lb.care)}</small><b>${esc(mm(care))}</b></div></div>
<dl class="y-mini"><div><dt>${esc(lb.color)}</dt><dd>${esc(A.color)}</dd></div></dl>
<p class="y-close">${esc(A.tip)}</p></section>
${cta}
${adSlot('content', Lc.ui.ad)}
<nav class="sibs" aria-label="${esc(Z.hubTitle)}">${names.map((n2, j) => `<a href="/${c}/${Y27}/${SLUG.zodiac[j]}/"${j === i ? ' aria-current="page"' : ''}>${esc(n2)}</a>`).join('')}</nav>
<section class="sec y-sec"><p class="y-note">${esc(Z.note)}</p><p><a href="/${c}/${Y27}/">${esc(Z.hubTitle)} →</a></p></section></div>`;
    const desc = fmt(Z.pageDesc, { a: n, hook: A.hook }).slice(0, 155);
    write(`${c}/${Y27}/${SLUG.zodiac[i]}/index.html`, staticShell(c, { title: `${title} | ${BRAND}`, desc, canonical: `/${c}/${Y27}/${SLUG.zodiac[i]}/`, alts: null, h1: '', bodyHTML }));
    addPage(`/${c}/${Y27}/${SLUG.zodiac[i]}/`, null);
  });
}

// ── 4-3) 60타입(일주) 공개 페이지 (한국어 먼저)
function buildTypes(c) {
  if (c !== 'ko') return;
  const T = T60, base = `/${c}/type/`;
  const cta = `<div class="y-cta"><a class="btn-primary t-find" href="/${c}/" data-hub="${base}">${esc(T.cta)}</a></div>`;
  const tScript = `<script type="module" src="/assets/type-find.js?v=${VERSION}"></script>`;
  // 모음: 천간(10)별로 묶어 6개씩
  const groups = T.stems.map((st, si) => {
    const list = TYPES60.filter(x => x.s === si).sort((a, b) => a.b - b.b).map(x => typeOf(x.s, x.b));
    return `<section class="sec t-group"><h2>${esc(st.ko)}(${'甲乙丙丁戊己庚辛壬癸'[si]}) · ${esc(st.img)}</h2><div class="t-grid">${list.map(t => `<a class="tc-mini" data-slug="${t.slug}" style="--ta:${TV.EL_AC[t.el]};--tb:${TV.EL_BG[t.el]}" href="${base}${t.slug}/">${TV.typeBadge(t, null, 'sm')}<span><b>${esc(TV.typeKo(T, t))}일주</b><small>${esc(TV.typeName(T, t))}</small></span></a>`).join('')}</div></section>`;
  }).join('');
  const hub = `<section class="sec t-intro"><h1 class="page-h">${esc(T.hubTitle)}</h1><p class="lead">${esc(T.hubLead)}</p>${cta}</section>${groups}${adSlot('content', L[c].ui.ad)}`;
  write(`${c}/type/index.html`, staticShell(c, { title: `${T.hubTitle} | ${BRAND}`, desc: T.hubDesc, canonical: base, alts: null, h1: '', bodyHTML: hub, bnav: true, sticky: false, cls: 'page-type', script: tScript }));
  addPage(base, null);
  TYPES60.forEach(x => {
    const t = typeOf(x.s, x.b);
    const title = fmt(T.pageTitle, { ko: TV.typeKo(T, t), h: TV.typeH(t), name: TV.typeName(T, t) });
    const body = `<nav class="crumbs"><a href="${base}">${esc(T.hubTitle.split(' —')[0])}</a></nav>
<section class="sec tcard" style="--ta:${TV.EL_AC[t.el]};--tb:${TV.EL_BG[t.el]}">
<div class="tc-top">${TV.typeBadge(t, null, 'lg')}<div><p class="tc-ko">${esc(TV.typeKo(T, t))}일주 <small>${TV.typeH(t)}</small></p><h1 class="tc-name">${esc(TV.typeName(T, t))}</h1><p class="tc-tag">${esc(TV.typeTag(T, t))}</p></div></div>
<ul class="tc-kw">${TV.typeKw(T, t).map(k => `<li>#${esc(k)}</li>`).join('')}</ul>
${TV.typeDetailHTML(T, t, null, base)}</section>
${cta}${adSlot('content', L[c].ui.ad)}`;
    const desc = fmt(T.pageDesc, { ko: TV.typeKo(T, t), h: TV.typeH(t), tag: TV.typeTag(T, t) }).slice(0, 155);
    write(`${c}/type/${t.slug}/index.html`, staticShell(c, { title: `${title} | ${BRAND}`, desc, canonical: `${base}${t.slug}/`, alts: null, h1: '', bodyHTML: body, bnav: true, sticky: false, cls: 'page-type', script: tScript }));
    addPage(`${base}${t.slug}/`, null);
  });
}

// ── 5) 정책 페이지
function buildPolicy(c) {
  const Lc = L[c], U = Lc.ui;
  for (const key of ['about', 'privacy', 'terms', 'contact']) {
    const secs = Lc.policy[key].map(([h, p]) => `<section><h2>${esc(h)}</h2><p>${esc(fmt(p, { email: config.contactEmail, brand: BRAND }))}</p></section>`).join('\n');
    const F = Lc.contactForm || {};
    const extra = key === 'contact' ? `<form class="form compact ct-form" id="ctForm" novalidate data-lang="${c}" data-need="${esc(F.need)}" data-err="${esc(F.err)}" data-limit="${esc(F.limit)}">
<label class="field"><span>${esc(F.name)}</span><input name="name" maxlength="30" autocomplete="name"></label>
<label class="field"><span>${esc(F.email)}</span><input name="email" type="email" maxlength="100" autocomplete="email" required></label>
<label class="field"><span>${esc(F.kind)}</span><select name="kind">${(F.kinds || []).map((k, i) => `<option value="${i}">${esc(k)}</option>`).join('')}</select></label>
<label class="field"><span>${esc(F.msg)}</span><textarea name="msg" rows="6" maxlength="3000" required></textarea></label>
<input name="hp" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
<p class="form-err" id="ctErr" hidden></p>
<button class="btn-primary" type="submit">${esc(F.send)}</button>
<p class="ct-ok" id="ctOk" hidden>${esc(F.ok)}</p>
</form>
<p class="muted small">${esc(F.alt)}</p><p class="mail"><a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a></p>
<script type="module" src="/assets/contact.js?v=${VERSION}"></script>` : '';
    const body = `${head({ lang: c, title: `${U[key]} | ${BRAND}`, desc: `${U[key]} – ${BRAND} ${Lc.subBrand}`, canonical: `/${c}/${key}/`, alts: langAlts(`/${key}/`) })}
<body class="page-policy ds2" data-lang="${c}">
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
  // AI 학습·수집 봇 차단 (검색·애드센스용 Googlebot, Mediapartners-Google 등은 그대로 허용)
  const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'CCBot', 'Google-Extended', 'GoogleOther', 'Applebot-Extended', 'PerplexityBot', 'Perplexity-User', 'Bytespider', 'Amazonbot', 'meta-externalagent', 'meta-externalfetcher', 'FacebookBot', 'cohere-ai', 'cohere-training-data-crawler', 'Diffbot', 'ImagesiftBot', 'Omgilibot', 'Omgili', 'YouBot', 'AI2Bot', 'Ai2Bot-Dolma', 'DuckAssistBot', 'MistralAI-User', 'PetalBot', 'Timpibot', 'VelenPublicWebCrawler', 'Webzio-Extended', 'iaskspider', 'Kangaroo Bot', 'Scrapy', 'img2dataset', 'TikTokSpider', 'Brightbot'];
  write('robots.txt', `${AI_BOTS.map(b => `User-agent: ${b}\nDisallow: /\n`).join('\n')}\nUser-agent: *\nAllow: /\nDisallow: /*/result/\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
  if (ADS.client) write('ads.txt', `google.com, ${ADS.client.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
  write('manifest.webmanifest', JSON.stringify({ name: `${BRAND} 시운`, short_name: BRAND, id: '/', start_url: '/?source=home', scope: '/', display: 'standalone', lang: 'ko', description: 'Your fortune, hour by hour', background_color: '#FFFFFF', theme_color: '#FFFFFF', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
  write('_headers', `/assets/*\n  Cache-Control: public, max-age=86400\n/images/*\n  Cache-Control: public, max-age=86400\n/sw.js\n  Cache-Control: no-cache\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Robots-Tag: noai, noimageai\n`);
  write('404.html', `${head({ lang: 'ko', title: `404 | ${BRAND}`, desc: L.ko.siteDesc, canonical: '/404', noindex: true })}
<body class="page-root"><main class="root-wrap"><h1 class="root-title"><span class="wordmark">${esc(BRAND)}</span></h1><p class="root-tag">404</p>
<div class="lang-grid">${LANGS.map(c => `<a class="lang-card" href="/${c}/"><span class="lang-name">${esc(L[c].ui.home)}</span></a>`).join('')}</div></main></body></html>`);
}

// ── 실행
rm(DIST);
mk(DIST);
copyDir(path.join(ROOT, 'public'), DIST);
mk(path.join(DIST, 'assets'));
for (const f of ['engine.js', 'content.js', 'countries.js', 'saju.js', 'jieqi.js', 'masters.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(DIST, 'assets', f));
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
for (const f of ['app.js', 'content.js', 'engine.js', 'root.js', 'static.js', 'place.js', 'place-photos.js', 'place-intro.js', 'sfx.js', 'countries.js', 'saju.js', 'saju-view.js', 'jieqi.js', 'masters.js', 'masters-view.js', 'board.js', 'contact.js', 'date-icons.js', 'year-view.js', 'goat.js', 'types-view.js', 'type-find.js']) {
  const fp = path.join(DIST, 'assets', f);
  const src = fs.readFileSync(fp, 'utf8')
    .replace(/(from\s+'\.\/[\w-]+\.m?js)'/g, `$1?v=${VERSION}'`)
    .replace(/import\('\.\/lunar\.mjs'\)/g, `import('./lunar.mjs?v=${VERSION}')`)
    .replace(/\/assets\/i18n\/\$\{(\w+)\}\.json/g, `/assets/i18n/\${$1}.json?v=${VERSION}`);
  fs.writeFileSync(fp, src);
}

buildRoot();
for (const c of LANGS) { buildInput(c); buildResult(c); buildStatic(c); buildYear(c); buildTypes(c); buildPolicy(c); }
buildMisc();

const count = fs.readdirSync(DIST, { recursive: true }).filter(f => f.endsWith('.html')).length;
console.log(`✔ 빌드 완료: HTML ${count}쪽, 사이트맵 ${pages.length}개 주소 → dist/`);
