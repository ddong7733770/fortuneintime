// Cloudflare Pages 고급 모드 워커
// · /api/geo   : 접속 위치(대략)를 알려 줌. 아무것도 저장하지 않음
// · /api/board : 부적 탭 게시판 (Cloudflare D1 데이터베이스 'DB' 연결 필요)
// · 옛 12시진 주소(/언어/hour/…)는 각 언어 첫 화면으로
// _routes.json 덕분에 /api/*와 옛 주소에만 실행되어 무료 요청 한도를 아낍니다.
//
// 게시판 설정 (Cloudflare 대시보드 → Pages 프로젝트 → 설정)
// 1) 바인딩: D1 데이터베이스를 변수 이름 DB 로 연결
// 2) 변수 및 비밀: ADMIN_NAME (암호화) = 관리자 이름. 이 이름으로 쓴 요청은 모든 글을 수정·삭제할 수 있음
// 표는 처음 요청 때 자동으로 만들어짐.
//
// 개인정보: IP는 저장하지 않음. 글쓰기 횟수 제한을 위해 'IP+시간대+비밀값'을 해시한 값만
// 그 시간대가 끝나는 6시·18시(접속 지역 시간)까지 보관하고 지움. 국가는 Cloudflare가 알려 주는 국가 코드만 저장.

const LANGS = ['ko', 'ja', 'zh', 'en', 'es', 'id'];
const MAX_IMG = 500 * 1024;
const IMG_TYPES = ['image/jpeg', 'image/webp', 'image/png'];
const PAGE = 10; // 목록 한 번에 10개

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const err = (code, status = 400) => json({ ok: false, error: code }, status);
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const sha = async s => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
async function pwHash(pw, salt) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: new TextEncoder().encode(salt), iterations: 5000 }, key, 256));
}
const clean = (s, n) => String(s || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, n);

// 접속 지역 시간 기준 시간대(6시·18시) 키와 끝나는 시각
function periodOf(tz) {
  const now = new Date();
  let parts;
  try { parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(p => [p.type, p.value])); }
  catch { return periodOf('Asia/Seoul'); }
  const h = +parts.hour, m = +parts.minute, s = +parts.second;
  const half = h >= 6 && h < 18 ? 'A' : 'P';
  const toNext = (h < 6 ? 6 - h : h < 18 ? 18 - h : 30 - h) * 3600 - m * 60 - s;
  let day = `${parts.year}-${parts.month}-${parts.day}`;
  if (h < 6) { const d = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day - 1)); day = d.toISOString().slice(0, 10); }
  return { key: `${day}${half}`, exp: now.getTime() + toNext * 1000 };
}

let ready = false;
async function ensure(db) {
  if (ready) return;
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, lang TEXT, country TEXT, name TEXT, title TEXT, body TEXT, has_img INTEGER DEFAULT 0, pw TEXT, salt TEXT, created INTEGER, updated INTEGER)'),
    db.prepare('CREATE INDEX IF NOT EXISTS posts_lang ON posts (lang, id)'),
    db.prepare('CREATE TABLE IF NOT EXISTS imgs (post_id INTEGER PRIMARY KEY, type TEXT, data BLOB)'),
    db.prepare('CREATE TABLE IF NOT EXISTS limits (h TEXT PRIMARY KEY, exp INTEGER)'),
    // 접속 통계: 개인 정보 없이 날짜·국가·언어·기기별 숫자만 (pv=페이지뷰, uv=그날 첫 방문)
    // 문의하기: 관리자 탭에서 확인 (read=0 새 문의)
    db.prepare('CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, kind TEXT, msg TEXT, lang TEXT, country TEXT, created INTEGER, read INTEGER DEFAULT 0)'),
    db.prepare('CREATE TABLE IF NOT EXISTS stats (day TEXT, country TEXT, lang TEXT, device TEXT, pv INTEGER DEFAULT 0, uv INTEGER DEFAULT 0, PRIMARY KEY (day, country, lang, device))'),
  ]);
  ready = true;
}
const isAdmin = (env, name) => !!env.ADMIN_NAME && String(name || '').trim().toLowerCase() === String(env.ADMIN_NAME).trim().toLowerCase();

async function readImage(file) {
  if (!file || typeof file === 'string' || !file.size) return null;
  if (!IMG_TYPES.includes(file.type)) throw new Error('img_type');
  if (file.size > MAX_IMG) throw new Error('img_size');
  return { type: file.type, data: new Uint8Array(await file.arrayBuffer()) };
}
// 수정·삭제 권한: 관리자 이름이거나 글 비밀번호가 맞을 때
async function allowed(env, post, fd) {
  if (isAdmin(env, fd.get('who'))) return true;
  const pw = String(fd.get('pw') || '');
  return !!pw && (await pwHash(pw, post.salt)) === post.pw;
}

async function board(request, env, url) {
  const db = env.DB;
  if (!db) return err('no_db', 503);
  await ensure(db);
  const path = url.pathname.replace(/^\/api\/board\/?/, '');
  const cf = request.cf || {};

  // 목록: ?lang=ko|all&before=id
  if (request.method === 'GET' && path === '') {
    const lang = url.searchParams.get('lang') || 'all', before = +url.searchParams.get('before') || 2e9;
    const q = lang === 'all' || !LANGS.includes(lang)
      ? db.prepare('SELECT id, lang, country, name, title, substr(body, 1, 120) AS preview, has_img, created FROM posts WHERE id < ? ORDER BY id DESC LIMIT ?').bind(before, PAGE + 1)
      : db.prepare('SELECT id, lang, country, name, title, substr(body, 1, 120) AS preview, has_img, created FROM posts WHERE lang = ? AND id < ? ORDER BY id DESC LIMIT ?').bind(lang, before, PAGE + 1);
    const { results } = await q.all();
    return json({ ok: true, items: results.slice(0, PAGE), more: results.length > PAGE });
  }
  // 이미지
  let m = path.match(/^img\/(\d+)$/);
  if (request.method === 'GET' && m) {
    const row = await db.prepare('SELECT type, data FROM imgs WHERE post_id = ?').bind(+m[1]).first();
    if (!row) return new Response('not found', { status: 404 });
    return new Response(new Uint8Array(row.data), { headers: { 'content-type': row.type, 'cache-control': 'public, max-age=86400', 'x-content-type-options': 'nosniff' } });
  }
  // 글 보기
  m = path.match(/^(\d+)$/);
  if (request.method === 'GET' && m) {
    const row = await db.prepare('SELECT id, lang, country, name, title, body, has_img, created, updated FROM posts WHERE id = ?').bind(+m[1]).first();
    return row ? json({ ok: true, item: row }) : err('not_found', 404);
  }
  if (request.method !== 'POST') return err('method', 405);
  let fd;
  try { fd = await request.formData(); } catch { return err('bad_form'); }

  // 글쓰기
  if (path === '') {
    const name = clean(fd.get('name'), 20) || '-', title = clean(fd.get('title'), 60), body = clean(fd.get('body'), 2000), pw = String(fd.get('pw') || '');
    const lang = LANGS.includes(fd.get('lang')) ? fd.get('lang') : 'en';
    if (!title || !body) return err('empty');
    if (name === '__admin__') return err('denied', 403);
    if ((!isAdmin(env, name) && pw.length < 4) || pw.length > 40) return err('pw');
    const admin = isAdmin(env, name);
    const shownName = admin ? '__admin__' : name; // 관리자 이름은 화면에 드러나지 않게
    const per = periodOf(cf.timezone || 'Asia/Seoul');
    const ip = request.headers.get('cf-connecting-ip') || '';
    const h = await sha(`${ip}|${per.key}|${env.ADMIN_NAME || 'fit'}`);
    await db.prepare('DELETE FROM limits WHERE exp < ?').bind(Date.now()).run();
    if (!admin && await db.prepare('SELECT h FROM limits WHERE h = ?').bind(h).first()) return err('limit', 429);
    let img = null;
    try { img = await readImage(fd.get('image')); } catch (e) { return err(e.message); }
    const salt = crypto.randomUUID();
    const now = Date.now();
    const r = await db.prepare('INSERT INTO posts (lang, country, name, title, body, has_img, pw, salt, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(lang, String(cf.country || '').slice(0, 2), shownName, title, body, img ? 1 : 0, await pwHash(pw, salt), salt, now, now).run();
    const id = r.meta.last_row_id;
    const ops = [];
    if (img) ops.push(db.prepare('INSERT INTO imgs (post_id, type, data) VALUES (?, ?, ?)').bind(id, img.type, img.data));
    if (!admin) ops.push(db.prepare('INSERT OR REPLACE INTO limits (h, exp) VALUES (?, ?)').bind(h, per.exp));
    if (ops.length) await db.batch(ops);
    return json({ ok: true, id });
  }
  // 수정·삭제·권한 확인
  m = path.match(/^(\d+)\/(edit|delete|check)$/);
  if (!m) return err('not_found', 404);
  const id = +m[1];
  const post = await db.prepare('SELECT id, pw, salt, has_img FROM posts WHERE id = ?').bind(id).first();
  if (!post) return err('not_found', 404);
  if (!(await allowed(env, post, fd))) return err('denied', 403);
  if (m[2] === 'check') return json({ ok: true });
  if (m[2] === 'delete') {
    await db.batch([db.prepare('DELETE FROM posts WHERE id = ?').bind(id), db.prepare('DELETE FROM imgs WHERE post_id = ?').bind(id)]);
    return json({ ok: true });
  }
  const title = clean(fd.get('title'), 60), body = clean(fd.get('body'), 2000);
  if (!title || !body) return err('empty');
  let img = null;
  try { img = await readImage(fd.get('image')); } catch (e) { return err(e.message); }
  const removeImg = fd.get('removeImg') === '1';
  const ops = [];
  let has = post.has_img;
  if (img) { ops.push(db.prepare('INSERT OR REPLACE INTO imgs (post_id, type, data) VALUES (?, ?, ?)').bind(id, img.type, img.data)); has = 1; }
  else if (removeImg) { ops.push(db.prepare('DELETE FROM imgs WHERE post_id = ?').bind(id)); has = 0; }
  ops.push(db.prepare('UPDATE posts SET title = ?, body = ?, has_img = ?, updated = ? WHERE id = ?').bind(title, body, has, Date.now(), id));
  await db.batch(ops);
  return json({ ok: true });
}

// ── 접속 통계 (관리자 탭)
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|GPT|Claude|anthropic|CCBot|Bytespider|Perplexity|Diffbot|cohere|Amazonbot/i;
const deviceOf = ua => (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua) ? 'tablet' : /Mobi|iPhone|iPod|Android/i.test(ua) ? 'mobile' : 'desktop');
const kstDay = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // 통계 날짜는 한국 시간 기준
async function hit(request, env) {
  if (!env.DB) return new Response(null, { status: 204 });
  const ua = request.headers.get('user-agent') || '';
  if (BOT.test(ua)) return new Response(null, { status: 204 });
  let b = {}; try { b = await request.json(); } catch { /* */ }
  const lang = LANGS.includes(b.l) ? b.l : 'etc';
  const country = String((request.cf || {}).country || 'XX').slice(0, 2);
  await ensure(env.DB);
  await env.DB.prepare('INSERT INTO stats (day, country, lang, device, pv, uv) VALUES (?, ?, ?, ?, 1, ?) ON CONFLICT(day, country, lang, device) DO UPDATE SET pv = pv + 1, uv = uv + excluded.uv')
    .bind(kstDay(), country, lang, deviceOf(ua), b.n ? 1 : 0).run();
  return new Response(null, { status: 204 });
}
async function stats(request, env, url) {
  if (!env.DB) return err('no_db', 503);
  if (!isAdmin(env, decodeURIComponent(request.headers.get('x-admin') || ''))) return err('denied', 403);
  await ensure(env.DB);
  const re = /^\d{4}-\d{2}-\d{2}$/;
  const to = re.test(url.searchParams.get('to') || '') ? url.searchParams.get('to') : kstDay();
  const from = re.test(url.searchParams.get('from') || '') ? url.searchParams.get('from') : '2000-01-01';
  const KEY = { day: 'day', week: "strftime('%Y-W%W', day)", month: 'substr(day, 1, 7)', year: 'substr(day, 1, 4)' }[url.searchParams.get('by')] || 'day';
  const q = (sql) => env.DB.prepare(sql).bind(from, to).all().then(r => r.results);
  const [series, country, lang, device, total] = await Promise.all([
    q(`SELECT ${KEY} AS k, SUM(pv) AS pv, SUM(uv) AS uv FROM stats WHERE day BETWEEN ? AND ? GROUP BY k ORDER BY k`),
    q('SELECT country AS k, SUM(pv) AS pv, SUM(uv) AS uv FROM stats WHERE day BETWEEN ? AND ? GROUP BY k ORDER BY pv DESC LIMIT 50'),
    q('SELECT lang AS k, SUM(pv) AS pv, SUM(uv) AS uv FROM stats WHERE day BETWEEN ? AND ? GROUP BY k ORDER BY pv DESC'),
    q('SELECT device AS k, SUM(pv) AS pv, SUM(uv) AS uv FROM stats WHERE day BETWEEN ? AND ? GROUP BY k ORDER BY pv DESC'),
    q('SELECT SUM(pv) AS pv, SUM(uv) AS uv, COUNT(DISTINCT country) AS countries FROM stats WHERE day BETWEEN ? AND ?'),
  ]);
  return json({ ok: true, from, to, series, country, lang, device, total: total[0] || {} });
}

// ── 문의하기 (사이트 폼 → 데이터베이스 → 관리자 탭)
async function contact(request, env, url) {
  const db = env.DB;
  if (!db) return err('no_db', 503);
  await ensure(db);
  const path = url.pathname.replace(/^\/api\/contact\/?/, '');
  if (request.method === 'POST' && path === '') {
    let b = {}; try { b = await request.json(); } catch { return err('bad_form'); }
    if (b.hp) return json({ ok: true }); // 자동 입력 봇(숨은 칸을 채움)은 저장하지 않음
    const email = clean(b.email, 100), msg = clean(b.msg, 3000);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || msg.length < 5) return err('empty');
    // 같은 접속(IP 해시)에서 10분에 한 번만. IP 원문은 저장하지 않음
    const ip = request.headers.get('cf-connecting-ip') || '';
    const h = await sha(`ct|${ip}|${env.ADMIN_NAME || 'fit'}`);
    await db.prepare('DELETE FROM limits WHERE exp < ?').bind(Date.now()).run();
    if (await db.prepare('SELECT h FROM limits WHERE h = ?').bind(h).first()) return err('limit', 429);
    await db.batch([
      db.prepare('INSERT INTO inquiries (name, email, kind, msg, lang, country, created) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(clean(b.name, 30), email, clean(b.kind, 30), msg, LANGS.includes(b.lang) ? b.lang : '', String((request.cf || {}).country || '').slice(0, 2), Date.now()),
      db.prepare('INSERT OR REPLACE INTO limits (h, exp) VALUES (?, ?)').bind(h, Date.now() + 10 * 60e3),
    ]);
    return json({ ok: true });
  }
  // 아래는 관리자만
  if (!isAdmin(env, decodeURIComponent(request.headers.get('x-admin') || ''))) return err('denied', 403);
  if (request.method === 'GET' && path === 'count') {
    const r = await db.prepare('SELECT COUNT(*) AS n FROM inquiries WHERE read = 0').first();
    return json({ ok: true, unread: r ? r.n : 0 });
  }
  if (request.method === 'GET' && path === '') {
    const { results } = await db.prepare('SELECT id, name, email, kind, msg, lang, country, created, read FROM inquiries ORDER BY id DESC LIMIT 100').all();
    return json({ ok: true, items: results });
  }
  const m = path.match(/^(\d+)\/(read|delete)$/);
  if (request.method === 'POST' && m) {
    if (m[2] === 'read') await db.prepare('UPDATE inquiries SET read = 1 WHERE id = ?').bind(+m[1]).run();
    else await db.prepare('DELETE FROM inquiries WHERE id = ?').bind(+m[1]).run();
    return json({ ok: true });
  }
  return err('not_found', 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/geo') {
      const cf = request.cf || {};
      const body = {
        lat: cf.latitude ? Number(cf.latitude) : null,
        lon: cf.longitude ? Number(cf.longitude) : null,
        city: cf.city || '',
        country: cf.country || '',
        tz: cf.timezone || '',
      };
      return json(body);
    }
    if (url.pathname === '/api/hit' && request.method === 'POST') { try { return await hit(request, env); } catch { return new Response(null, { status: 204 }); } }
    if (url.pathname === '/api/contact' || url.pathname.startsWith('/api/contact/')) { try { return await contact(request, env, url); } catch { return err('server', 500); } }
    if (url.pathname === '/api/stats') { try { return await stats(request, env, url); } catch { return err('server', 500); } }
    if (url.pathname === '/api/board' || url.pathname.startsWith('/api/board/')) {
      try { return await board(request, env, url); } catch { return err('server', 500); }
    }
    // 삭제된 12시진 페이지(/언어/hour/…)는 각 언어 첫 화면으로 보냄
    const m = url.pathname.match(/^\/(ko|ja|zh|en|es|id)\/hour(\/|$)/);
    if (m) return Response.redirect(`${url.origin}/${m[1]}/`, 301);
    return env.ASSETS.fetch(request);
  },
};
