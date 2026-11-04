// '지금 나에게 필요한 장소는?' — 접속 위치에서 세계의 힐링 여행지로 떠나는 애니메이션
// 구글 지도 키(site.config.mjs의 googleMapsKey)가 있으면 구글 지도로, 없으면 내장 세계지도로 그립니다.

import { PHOTOS } from './place-photos.js';
import { playIntro, drawIntroIdle } from './place-intro.js';
import * as SFX from './sfx.js';

// 여행지 좌표 (문구는 /assets/places/언어.json)
export const PLACES = {
  jeju: [33.38, 126.55], arashiyama: [35.017, 135.672], yakushima: [30.35, 130.53], ubud: [-8.507, 115.263],
  luangprabang: [19.885, 102.135], jiuzhaigou: [33.26, 103.92], rishikesh: [30.087, 78.268], paro: [27.49, 89.36],
  bled: [46.364, 14.094], santorini: [36.39, 25.46], zermatt: [46.02, 7.75], bluelagoon: [63.88, -22.45],
  tromso: [69.65, 18.96], valdorcia: [43.07, 11.68], sedona: [34.87, -111.76], banff: [51.42, -116.18],
  machupicchu: [-13.163, -72.545], uyuni: [-20.13, -67.49], chefchaouen: [35.17, -5.27], milford: [-44.67, 167.92],
  halong: [20.91, 107.18], cappadocia: [38.64, 34.83], plitvice: [44.88, 15.62], hallstatt: [47.56, 13.65],
  skye: [57.5, -6.18], maldives: [3.2, 73.22], borabora: [-16.5, -151.74], whitehaven: [-20.28, 149.04],
  uluru: [-25.34, 131.04], serengeti: [-2.33, 34.83], sossusvlei: [-24.73, 15.29], victoriafalls: [-17.92, 25.86],
  iguazu: [-25.69, -54.44], torresdelpaine: [-50.94, -73.41], galapagos: [-0.74, -90.31], yosemite: [37.75, -119.59],
  tulum: [20.21, -87.46], kerala: [9.5, 76.34], zhangjiajie: [29.32, 110.43], kauai: [22.17, -159.65],
};
// 구글 지도 검색어(영문). 여행지 이름을 누르면 구글 지도의 해당 장소 정보로 이동
const MAPQ = {
  jeju: 'Jeju Olle Trail, Jeju', arashiyama: 'Arashiyama Bamboo Grove, Kyoto', yakushima: 'Shiratani Unsuikyo, Yakushima', ubud: 'Ubud, Bali',
  luangprabang: 'Luang Prabang, Laos', jiuzhaigou: 'Jiuzhaigou Valley, Sichuan', rishikesh: 'Rishikesh, Uttarakhand', paro: "Tiger's Nest Monastery, Paro, Bhutan",
  bled: 'Lake Bled, Slovenia', santorini: 'Oia, Santorini', zermatt: 'Zermatt, Switzerland', bluelagoon: 'Blue Lagoon, Iceland',
  tromso: 'Tromsø, Norway', valdorcia: "Val d'Orcia, Tuscany", sedona: 'Sedona, Arizona', banff: 'Lake Louise, Banff National Park',
  machupicchu: 'Machu Picchu, Peru', uyuni: 'Salar de Uyuni, Bolivia', chefchaouen: 'Chefchaouen, Morocco', milford: 'Milford Sound, New Zealand',
  halong: 'Ha Long Bay, Vietnam', cappadocia: 'Göreme, Cappadocia', plitvice: 'Plitvice Lakes National Park', hallstatt: 'Hallstatt, Austria',
  skye: 'Old Man of Storr, Isle of Skye', maldives: 'Maldives', borabora: 'Bora Bora, French Polynesia', whitehaven: 'Whitehaven Beach, Queensland',
  uluru: 'Uluru, Northern Territory', serengeti: 'Serengeti National Park, Tanzania', sossusvlei: 'Sossusvlei, Namibia', victoriafalls: 'Victoria Falls',
  iguazu: 'Iguazu Falls', torresdelpaine: 'Torres del Paine National Park', galapagos: 'Bartolomé Island, Galápagos', yosemite: 'Tunnel View, Yosemite National Park',
  tulum: 'Tulum Archaeological Site, Mexico', kerala: 'Alleppey Backwaters, Kerala', zhangjiajie: 'Zhangjiajie National Forest Park', kauai: 'Nā Pali Coast State Wilderness Park, Kauai',
};
export const mapsUrl = id => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPQ[id] || id)}`;

// 위치를 못 받았을 때: 기기 시간대 → 대표 도시 좌표
const TZ_CITY = {
  'Asia/Seoul': [37.57, 126.98, 'KR'], 'Asia/Tokyo': [35.68, 139.69, 'JP'], 'Asia/Shanghai': [31.23, 121.47, 'CN'],
  'Asia/Hong_Kong': [22.32, 114.17, 'HK'], 'Asia/Taipei': [25.03, 121.57, 'TW'], 'Asia/Jakarta': [-6.2, 106.85, 'ID'],
  'Asia/Makassar': [-5.15, 119.43, 'ID'], 'Asia/Jayapura': [-2.53, 140.72, 'ID'], 'Asia/Singapore': [1.35, 103.82, 'SG'],
  'Asia/Bangkok': [13.76, 100.5, 'TH'], 'Asia/Ho_Chi_Minh': [10.82, 106.63, 'VN'], 'Asia/Manila': [14.6, 120.98, 'PH'],
  'Asia/Kolkata': [28.61, 77.21, 'IN'], 'Asia/Dubai': [25.2, 55.27, 'AE'], 'Europe/London': [51.51, -0.13, 'GB'],
  'Europe/Paris': [48.86, 2.35, 'FR'], 'Europe/Berlin': [52.52, 13.4, 'DE'], 'Europe/Madrid': [40.42, -3.7, 'ES'],
  'Europe/Rome': [41.9, 12.5, 'IT'], 'America/New_York': [40.71, -74.01, 'US'], 'America/Chicago': [41.88, -87.63, 'US'],
  'America/Denver': [39.74, -104.99, 'US'], 'America/Los_Angeles': [34.05, -118.24, 'US'], 'America/Mexico_City': [19.43, -99.13, 'MX'],
  'America/Bogota': [4.71, -74.07, 'CO'], 'America/Lima': [-12.05, -77.04, 'PE'], 'America/Santiago': [-33.45, -70.67, 'CL'],
  'America/Argentina/Buenos_Aires': [-34.6, -58.38, 'AR'], 'America/Sao_Paulo': [-23.55, -46.63, 'BR'], 'Australia/Sydney': [-33.87, 151.21, 'AU'],
};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (s, o = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => (o[k] ?? ''));
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;

function haversine([a, b], [c, d]) {
  const R = 6371, dLat = rad(c - a), dLon = rad(d - b);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a)) * Math.cos(rad(c)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// 대권(가장 짧은 하늘길) 위의 점들
function greatCircle([lat1, lon1], [lat2, lon2], n = 96) {
  const p1 = [rad(lat1), rad(lon1)], p2 = [rad(lat2), rad(lon2)];
  const toV = ([la, lo]) => [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)];
  const a = toV(p1), b = toV(p2);
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(dot) || 1e-9;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, s1 = Math.sin((1 - t) * w) / Math.sin(w), s2 = Math.sin(t * w) / Math.sin(w);
    const v = [s1 * a[0] + s2 * b[0], s1 * a[1] + s2 * b[1], s1 * a[2] + s2 * b[2]];
    pts.push([deg(Math.atan2(v[2], Math.hypot(v[0], v[1]))), deg(Math.atan2(v[1], v[0]))]);
  }
  return pts;
}

// ── 출발지: 1) Cloudflare 워커 /api/geo (접속 IP) 2) 구글 Geolocation API (키가 있을 때) 3) 기기 시간대
async function locate(key) {
  try {
    const r = await fetch('/api/geo', { cache: 'no-store' });
    if (r.ok && (r.headers.get('content-type') || '').includes('json')) {
      const g = await r.json();
      if (g.lat !== null && g.lon !== null) return { lat: g.lat, lon: g.lon, city: g.city, country: g.country, via: 'ip' };
    }
  } catch { /* 로컬 미리보기 등 */ }
  if (key) {
    try {
      const r = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${encodeURIComponent(key)}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"considerIp":true}' });
      if (r.ok) { const g = await r.json(); return { lat: g.location.lat, lon: g.location.lng, city: '', country: '', via: 'google' }; }
    } catch { /* */ }
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const t = TZ_CITY[tz] || TZ_CITY['Asia/Seoul'];
  return { lat: t[0], lon: t[1], city: '', country: t[2], via: 'tz' };
}

// ── 구글 지도
const GM_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1d2650' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#b3ad9c' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#141b36' }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#141b36' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] }, { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }, { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#2c3768' }] },
];
let gmPromise = null;
function loadGoogle(key, lang) {
  if (gmPromise) return gmPromise;
  gmPromise = new Promise((res, rej) => {
    if (window.google?.maps) return res(window.google.maps);
    window.__ttfGm = () => res(window.google.maps);
    window.gm_authFailure = () => rej(new Error('auth'));
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&libraries=geometry&language=${lang}&loading=async&callback=__ttfGm`;
    s.async = true; s.onerror = () => rej(new Error('load'));
    document.head.appendChild(s);
    setTimeout(() => rej(new Error('timeout')), 9000);
  });
  return gmPromise;
}
async function flyGoogle(el, from, to, dur, instant = false) {
  const maps = await loadGoogle(window.__ttfMapKey, window.__ttfLang);
  el.innerHTML = '';
  const map = new maps.Map(el, { center: { lat: from[0], lng: from[1] }, zoom: 2, styles: GM_STYLE, disableDefaultUI: true, gestureHandling: 'cooperative', backgroundColor: '#141b36' });
  const A = new maps.LatLng(from[0], from[1]), B = new maps.LatLng(to[0], to[1]);
  const dot = color => ({ path: maps.SymbolPath.CIRCLE, scale: 6, fillColor: color, fillOpacity: 1, strokeColor: '#141b36', strokeWeight: 2 });
  new maps.Marker({ position: A, map, icon: dot('#7CC3A8') });
  const bounds = new maps.LatLngBounds(); bounds.extend(A); bounds.extend(B);
  map.fitBounds(bounds, 48);
  const line = new maps.Polyline({ path: [A], geodesic: true, strokeColor: '#C9A24A', strokeWeight: 3, map });
  const plane = new maps.Marker({ position: A, map, icon: { ...dot('#F3E2B0'), scale: 7 } });
  if (instant) { line.setPath([A, B]); plane.setPosition(B); plane.setIcon({ ...dot('#E5484D'), scale: 8 }); return; }
  await new Promise(r => setTimeout(r, 700));
  await new Promise(done => {
    const t0 = performance.now();
    const step = t => {
      const k = Math.min(1, (t - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = maps.geometry.spherical.interpolate(A, B, e);
      line.setPath([A, p]); plane.setPosition(p);
      k < 1 ? requestAnimationFrame(step) : done();
    };
    requestAnimationFrame(step);
  });
  plane.setIcon({ ...dot('#E5484D'), scale: 8 });
}

// ── 내장 세계지도 (등장방형 투영, 경도+180 / 90-위도)
let landPath = null;
async function flySvg(el, from, to, dur, instant = false) {
  if (!landPath) landPath = await fetch(`/assets/world-land.txt?v=${window.__ttfV || ''}`).then(r => r.text());
  const raw = greatCircle(from, to);
  // 날짜변경선을 넘으면 경도를 이어 붙여 선이 끊기지 않게
  const pts = []; let prevX = null;
  for (const [la, lo] of raw) {
    let x = lo + 180;
    if (prevX !== null) { while (x - prevX > 180) x -= 360; while (x - prevX < -180) x += 360; }
    pts.push([x, 90 - la]); prevX = x;
  }
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const pad = 14; x0 -= pad; x1 += pad; y0 -= pad; y1 += pad;
  let w = Math.max(x1 - x0, 80), h = w * 0.625;
  if (y1 - y0 > h) { h = y1 - y0; w = h / 0.625; }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const vb = [cx - w / 2, cy - h / 2, w, h];
  const full = [pts[0][0] - 120, 15, 240, 150];
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join('');
  const sw = (w / 340).toFixed(3);
  el.innerHTML = `<svg class="pmap" viewBox="${full.join(' ')}" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">
<defs><path id="pland" d="${landPath}"/><radialGradient id="pglow"><stop offset="0" stop-color="#F3E2B0" stop-opacity=".9"/><stop offset="1" stop-color="#F3E2B0" stop-opacity="0"/></radialGradient></defs>
<rect x="-400" y="-50" width="1200" height="300" class="psea"/>
<g class="pland"><use href="#pland" x="-360"/><use href="#pland"/><use href="#pland" x="360"/></g>
<path d="${d}" class="proute" style="stroke-width:${sw * 2.2}"/>
<circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="${sw * 4}" class="porig"/>
<circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="${sw * 4}" class="ppulse"/>
<g class="pplane" style="opacity:0"><circle r="${sw * 12}" fill="url(#pglow)"/><g class="pico"><path transform="scale(${(sw * 0.75).toFixed(3)})" d="M12 0C12 -1.2 10.6 -2 9 -2H3.5L-2.5 -11H-5.5L-2 -2H-7L-9.5 -5.5H-12L-10.3 0L-12 5.5H-9.5L-7 2H-2L-5.5 11H-2.5L3.5 2H9C10.6 2 12 1.2 12 0Z"/></g></g>
<g class="pdest" style="opacity:0" transform="translate(${pts.at(-1)[0]} ${pts.at(-1)[1]})"><circle r="${sw * 9}" class="pring"/><circle r="${sw * 4.4}" class="pend"/></g>
</svg>`;
  const svg = el.querySelector('svg'), route = el.querySelector('.proute'), plane = el.querySelector('.pplane'), ico = el.querySelector('.pico');
  const len = route.getTotalLength();
  route.style.strokeDasharray = `${len} ${len}`; route.style.strokeDashoffset = len;
  const anim = (ms, fn) => new Promise(done => {
    if (instant || reduceMotion()) { fn(1); return done(); }
    const t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / ms); fn(k); k < 1 ? requestAnimationFrame(step) : done(); };
    requestAnimationFrame(step);
  });
  const ease = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  await new Promise(r => setTimeout(r, instant || reduceMotion() ? 0 : 500));
  // 1) 출발지에서 경로가 보이도록 화면 이동
  await anim(900, k => { const e = ease(k); svg.setAttribute('viewBox', full.map((v, i) => v + (vb[i] - v) * e).join(' ')); });
  // 2) 하늘길을 따라 비행
  plane.style.opacity = 1;
  await anim(dur, k => {
    const e = ease(k), p = route.getPointAtLength(len * e);
    const q = route.getPointAtLength(Math.min(len, len * e + len * 0.01 + 0.01)), a = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
    route.style.strokeDashoffset = len * (1 - e);
    plane.setAttribute('transform', `translate(${p.x} ${p.y})`);
    if (k < 0.995) ico.setAttribute('transform', `rotate(${a.toFixed(1)})`);
  });
  // 3) 도착
  plane.style.opacity = 0;
  el.querySelector('.pdest').style.opacity = 1;
  el.querySelector('.pdest').classList.add('is-on');
}

// 추천 이유: 가장 약한 기운과의 연결 + 행운 방향 + 여행지에서 할 일 + 오늘 점수 (4문장)
function bearing([la1, lo1], [la2, lo2]) {
  const r = Math.PI / 180, y = Math.sin((lo2 - lo1) * r) * Math.cos(la2 * r);
  const x = Math.cos(la1 * r) * Math.sin(la2 * r) - Math.sin(la1 * r) * Math.cos(la2 * r) * Math.cos((lo2 - lo1) * r);
  return (Math.atan2(y, x) / r + 360) % 360;
}
function reasonText(data, name, trip, weakest, f, C) {
  const R = data.reason; if (!R || !f) return '';
  const sec = Math.round(bearing([trip.lat, trip.lon], PLACES[trip.id]) / 45) % 8;
  const diff = Math.min((sec - f.dir + 8) % 8, (f.dir - sec + 8) % 8);
  const o = { place: name, dir: f.dirNames[sec], lucky: f.dirNames[f.dir] };
  const s1 = fmt(diff === 0 ? R.dirSame : diff === 1 ? R.dirNear : R.dirOther, o);
  const s2 = R.tip[weakest ? weakest.k : 'good'];
  const s3 = fmt(R.band[f.band] || R.band[1], { score: f.score });
  return [s1, s2, s3].join(['ja', 'zh'].includes(C) ? '' : ' ');
}

// ── 영역 동작 (시간대마다 1회, 하루 2회. 이번 시간대에 다녀온 곳은 다시 보여줌)
export function mountPlace(sec, ctx) {
  const { C, D, U, weakest, getGate, onUsed, fortune } = ctx;
  const stage = sec.querySelector('.place-stage'), mapEl = sec.querySelector('.place-map'), info = sec.querySelector('.place-info');
  const goBtn = sec.querySelector('.place-go');
  let data = null, busy = false;
  window.__ttfMapKey = D.googleMapsKey || ''; window.__ttfLang = C; window.__ttfV = D.v;
  const load = async () => { if (!data) data = await fetch(`/assets/places/${C}.json?v=${D.v}`).then(r => r.json()); return data; };
  const countryName = code => { if (!code) return ''; try { return new Intl.DisplayNames([C], { type: 'region' }).of(code); } catch { return code; } };

  const fly = async (from, to, dur, instant) => {
    if (!instant && !reduceMotion() && SFX.begin()) SFX.flight((dur + 1400) / 1000); // 화면 이동 0.9초 + 대기 0.5초 포함
    if (D.googleMapsKey) { try { return await flyGoogle(mapEl, from, to, dur, instant); } catch { /* 내장 지도로 */ } }
    return flySvg(mapEl, from, to, dur, instant);
  };
  const card = (trip) => {
    const Ui = data.ui, P = data.places[trip.id], ph = PHOTOS[trip.id];
    const fromLabel = [trip.city, countryName(trip.country)].filter(Boolean).join(', ') || Ui.here;
    const hrs = Math.max(1, Math.round((trip.km / 850 + 0.5) * 2) / 2);
    const you = weakest ? fmt(data.forYou[weakest.k], { place: P.name, n: weakest.v }) : fmt(data.forYou.good, { place: P.name });
    const why = reasonText(data, P.name, trip, weakest, fortune, C);
    const again = getGate().left > 0;
    info.innerHTML = `<article class="place-card">
${ph ? `<figure class="place-photo"><img src="${ph.src}" alt="${esc(P.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('figure').remove()"><figcaption>${esc(U.photo)}: <a href="${ph.page}" target="_blank" rel="noopener">${esc(ph.by)}</a>, ${esc(ph.lic)} · Wikimedia Commons</figcaption></figure>` : ''}
<p class="place-route"><span>${esc(Ui.from)}</span> ${esc(fromLabel)} <i aria-hidden="true">→</i> <span>${esc(Ui.to)}</span> ${esc(P.region)}</p>
<h3><a class="place-maplink" href="${mapsUrl(trip.id)}" target="_blank" rel="noopener" title="${esc(U.mapOpen || 'Google Maps')}">${esc(P.name)}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg></a></h3>
<p class="place-maphint"><a href="${mapsUrl(trip.id)}" target="_blank" rel="noopener">${esc(U.mapOpen || 'Google Maps')} ↗</a></p>
<p class="place-dist">${esc(fmt(Ui.distance, { km: trip.km.toLocaleString(C), h: hrs }))}</p>
<p>${esc(P.intro)}</p>
<p class="place-boost">${esc(P.boost)}</p>
<section class="place-why"><h4>${esc(data.reason.title)}</h4><p>${esc([you, why].join(['ja', 'zh'].includes(C) ? '' : ' '))}</p></section>
${again ? `<button type="button" class="btn-ghost place-again">${esc(Ui.again)}</button>` : ''}
</article>`;
    info.querySelector('.place-again')?.addEventListener('click', go);
  };

  const go = async () => {
    if (busy || getGate().left <= 0) return; busy = true;
    SFX.begin(); // 누른 순간에 소리를 켜 둬야 브라우저가 막지 않음
    stage.classList.remove('is-idle'); stage.classList.add('is-live');
    goBtn.hidden = true; info.innerHTML = '';
    try {
      const prev = getGate().data;
      // 이번 시간대 첫 출발이면 픽셀 장면(약 5초)을 보여 주는 동안 출발지를 찾음
      const intro = prev ? Promise.resolve() : playIntro(mapEl, { reduce: reduceMotion() });
      await load();
      if (prev) info.innerHTML = `<p class="place-status">${esc(data.ui.locating)}</p>`;
      const [origin] = await Promise.all([prev ? { lat: prev.lat, lon: prev.lon, city: prev.city, country: prev.country } : locate(D.googleMapsKey), intro]);
      const g = getGate();
      const ids = Object.keys(PLACES).filter(k => k !== prev?.id);
      const id = ids[Math.floor(Math.random() * ids.length)];
      const from = [origin.lat, origin.lon], to = PLACES[id];
      const trip = { id, lat: origin.lat, lon: origin.lon, city: origin.city || '', country: origin.country || '', km: Math.round(haversine(from, to)) };
      g.save({ used: g.used + 1, data: trip }); // 출발하는 순간 이번 시간대 기회를 씀
      onUsed && onUsed();
      info.innerHTML = `<p class="place-status">${esc(fmt(data.ui.flying, { place: data.places[id].name }))}</p>`;
      await fly(from, to, Math.min(4200, 2200 + trip.km / 8), false);
      card(trip);
    } catch (e) {
      info.innerHTML = `<p class="place-status">${esc((data && data.ui.error) || 'Error')}</p>`;
      goBtn.hidden = false;
    }
    busy = false;
  };
  goBtn.addEventListener('click', go);
  // 소리 켜기/끄기
  const sBtn = sec.querySelector('.sfx-btn');
  const paint = () => { if (!sBtn) return; const on = SFX.isOn(); sBtn.setAttribute('aria-pressed', String(on)); sBtn.setAttribute('aria-label', on ? U.sfxOn : U.sfxOff); sBtn.title = sBtn.getAttribute('aria-label'); sBtn.classList.toggle('is-off', !on); };
  sBtn?.addEventListener('click', () => { SFX.setOn(!SFX.isOn()); paint(); });
  paint();

  // 이번 시간대에 이미 다녀왔다면 그 결과를 바로 보여줌
  const done = getGate().data;
  if (!done) { try { drawIntroIdle(mapEl); } catch { /* 기본 지구본 유지 */ } }
  if (done) {
    stage.classList.remove('is-idle'); stage.classList.add('is-live'); goBtn.hidden = true;
    load().then(() => fly([done.lat, done.lon], PLACES[done.id], 0, true)).then(() => card(done)).catch(() => { goBtn.hidden = false; });
  }
}
