// 부적 탭 하단 게시판. 서버: public/_worker.js 의 /api/board (Cloudflare D1)
// · 작성자: 운세를 볼 때 입력한 이름 자동 / 비밀번호는 글마다 / 국가는 접속 위치로 자동(서버)
// · 이미지 1장, 500KB 넘으면 자동으로 줄여서 올림(사진 속 위치 정보도 함께 지워짐)
// · 시간대(6시·18시)마다 1회 작성(서버에서 확인) / 작성자 본인(비밀번호) 또는 관리자 이름은 수정·삭제 가능
const MAX = 500 * 1024;
const LANG_NAMES = { ko: '한국어', ja: '日本語', zh: '中文', en: 'English', es: 'Español', id: 'Indonesia' };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 이미지 줄이기: 긴 변 1600px부터 시작해 500KB 이하가 될 때까지 화질·크기를 낮춤 (JPEG로 다시 저장)
export async function compressImage(file) {
  let src;
  try { src = await createImageBitmap(file); }
  catch { src = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(file); }); }
  let side = 1600, q = 0.86, blob = null;
  for (let k = 0; k < 12; k++) {
    const sc = Math.min(1, side / Math.max(src.width, src.height));
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(src.width * sc)); cv.height = Math.max(1, Math.round(src.height * sc));
    const x = cv.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, cv.width, cv.height); x.drawImage(src, 0, 0, cv.width, cv.height);
    blob = await new Promise(r => cv.toBlob(r, 'image/jpeg', q));
    if (blob && blob.size <= MAX) return blob;
    if (q > 0.6) q -= 0.1; else side = Math.round(side * 0.8);
  }
  return blob && blob.size <= MAX ? blob : null;
}

export function mountBoard(root, { C, L, U, getName, isAdmin, getGate, onWrote }) {
  const B = U;
  const dn = (() => { try { return new Intl.DisplayNames([L.htmlLang], { type: 'region' }); } catch { return null; } })();
  const country = cc => (cc && dn ? (dn.of(cc) || cc) : cc || '');
  const when = ms => new Intl.DateTimeFormat(L.htmlLang, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(ms));
  let lang = C, before = null, editing = null, imgBlob = null, removeImg = false;

  root.innerHTML = `<h2 class="b-title"><span class="b-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg></span>${esc(B.boardTitle)}</h2><p class="b-sub">${esc(B.boardSub)}</p>
<div class="b-tabs" role="tablist">${['all', 'ko', 'ja', 'zh', 'en', 'es', 'id'].map(k => `<button type="button" role="tab" data-l="${k}" aria-selected="${k === lang}">${esc(k === 'all' ? B.boardAll : LANG_NAMES[k])}</button>`).join('')}</div>
<div class="b-head"><button type="button" class="btn-primary sm" id="bWriteBtn">${esc(B.boardWrite)}</button><span class="muted small" id="bGateNote"></span></div>
<form class="form compact b-form" id="bForm" hidden>
<p class="b-as">${esc(B.boardBy)} <b id="bName"></b></p>
<label class="field"><span>${esc(B.boardTitleLabel)}</span><input name="title" maxlength="60" required placeholder="${esc(B.boardTitlePh)}"></label>
<label class="field"><span>${esc(B.boardBodyLabel)}</span><textarea name="body" maxlength="2000" rows="6" required placeholder="${esc(B.boardBodyPh)}"></textarea></label>
<div class="field"><span>${esc(B.boardImg)} <small>${esc(B.boardImgNote)}</small></span><input type="file" name="image" accept="image/*"><div class="b-prev" id="bPrev"></div></div>
<label class="field" id="bPwField"><span>${esc(B.boardPw)}</span><input type="password" name="pw" minlength="4" maxlength="40" autocomplete="new-password" placeholder="${esc(B.boardPwPh)}"></label>
<p class="form-err" id="bErr" hidden></p>
<div class="btn-row"><button type="submit" class="btn-primary">${esc(B.boardSubmit)}</button><button type="button" class="btn-ghost" id="bCancel">${esc(B.boardCancel)}</button></div>
</form>
<ul class="b-list" id="bList"></ul>
<button type="button" class="btn-ghost sm b-more" id="bMore" hidden>${esc(B.boardMore)}</button>`;

  const $ = s => root.querySelector(s);
  const form = $('#bForm');
  const gateNote = () => {
    const g = getGate();
    $('#bGateNote').textContent = isAdmin() ? '' : g.left > 0 ? B.boardGateLeft : B.boardGateUsed;
    $('#bWriteBtn').disabled = !isAdmin() && g.left <= 0;
  };
  const showErr = t => { const e = $('#bErr'); e.textContent = t; e.hidden = !t; };
  const errText = code => ({ limit: B.boardLimit, denied: B.boardDenied, pw: B.boardPwNeed, empty: B.boardEmptyField, img_size: B.boardImgBig, img_type: B.boardImgBig, no_db: B.boardOffline }[code] || B.boardErr);

  async function load(reset = true) {
    if (reset) { before = null; $('#bList').innerHTML = ''; }
    try {
      const r = await fetch(`/api/board?lang=${lang}${before ? `&before=${before}` : ''}`).then(x => x.json());
      if (!r.ok) throw new Error(r.error);
      if (reset && !r.items.length) $('#bList').innerHTML = `<li class="b-empty">${esc(B.boardEmpty)}</li>`;
      $('#bList').insertAdjacentHTML('beforeend', r.items.map(it => `<li class="b-it" data-id="${it.id}"><button type="button" class="b-row"><b>${esc(it.title)}</b>${it.has_img ? '<i class="b-ic" aria-hidden="true"></i>' : ''}<em class="b-pre">${esc(String(it.preview || '').replace(/\s+/g, ' '))}</em><span>${esc(it.name === '__admin__' ? B.boardAdminName : it.name)} · ${esc(country(it.country))} · ${esc(when(it.created))}</span></button><div class="b-body" hidden></div></li>`).join(''));
      if (r.items.length) before = r.items[r.items.length - 1].id;
      $('#bMore').hidden = !r.more;
    } catch (e) {
      if (reset) $('#bList').innerHTML = `<li class="b-empty">${esc(e.message === 'no_db' ? B.boardOffline : B.boardErr)}</li>`;
    }
  }
  async function open(li) {
    const box = li.querySelector('.b-body');
    if (!box.hidden) { box.hidden = true; return; }
    box.hidden = false; box.innerHTML = '<p class="muted small">…</p>';
    const r = await fetch(`/api/board/${li.dataset.id}`).then(x => x.json()).catch(() => ({ ok: false }));
    if (!r.ok) { box.innerHTML = `<p class="muted small">${esc(B.boardErr)}</p>`; return; }
    const it = r.item;
    box.innerHTML = `<p class="b-text">${esc(it.body)}</p>${it.has_img ? `<img class="b-img" src="/api/board/img/${it.id}?v=${it.updated}" alt="" loading="lazy">` : ''}
<p class="b-note">${esc(B.boardNote)}</p>
<div class="b-acts"><button type="button" class="txt-btn" data-act="edit">${esc(B.boardEdit)}</button><button type="button" class="txt-btn" data-act="delete">${esc(B.boardDel)}</button></div>
<div class="b-auth" hidden><input type="password" maxlength="40" placeholder="${esc(B.boardPw)}" autocomplete="current-password"><button type="button" class="btn-ghost sm">${esc(B.boardOk)}</button><p class="form-err" hidden></p></div>`;
    box.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => authThen(box, it, b.dataset.act)));
  }
  // 수정·삭제: 관리자 이름이면 비밀번호 없이, 아니면 글 비밀번호 확인 후
  async function authThen(box, it, act) {
    const auth = box.querySelector('.b-auth');
    const run = async pw => {
      const fd = new FormData(); fd.set('who', getName()); if (pw) fd.set('pw', pw);
      if (act === 'delete') {
        const r = await fetch(`/api/board/${it.id}/delete`, { method: 'POST', body: fd }).then(x => x.json()).catch(() => ({ ok: false }));
        if (!r.ok) return fail(r.error);
        load(); return;
      }
      const r = await fetch(`/api/board/${it.id}/check`, { method: 'POST', body: fd }).then(x => x.json()).catch(() => ({ ok: false }));
      if (!r.ok) return fail(r.error);
      startEdit(it, pw);
    };
    const fail = code => { const e = auth.querySelector('.form-err'); auth.hidden = false; e.textContent = errText(code); e.hidden = false; };
    // 삭제는 한 번 더 눌러 확인
    if (act === 'delete' && !box.dataset.confirm) { box.dataset.confirm = '1'; box.querySelector('[data-act=delete]').textContent = B.boardDelConfirm; return; }
    if (isAdmin()) return run('');
    auth.hidden = false;
    const inp = auth.querySelector('input'); inp.focus();
    auth.querySelector('button').onclick = () => { if (inp.value.length < 4) return fail('pw'); run(inp.value); };
  }
  function openForm(it = null, pw = '') {
    editing = it ? { id: it.id, pw } : null; imgBlob = null; removeImg = false;
    form.hidden = false; form.reset(); showErr('');
    $('#bName').textContent = isAdmin() ? B.boardAdminName : (getName() || B.boardAnon);
    $('#bPwField').querySelector('input').required = !isAdmin() && !it;
    form.title.value = it ? it.title : ''; form.body.value = it ? it.body : '';
    $('#bPwField').hidden = !!it;
    $('#bPrev').innerHTML = it && it.has_img ? `<img src="/api/board/img/${it.id}?v=${it.updated}" alt=""><button type="button" class="txt-btn" id="bRmImg">${esc(B.boardImgRemove)}</button>` : '';
    $('#bRmImg')?.addEventListener('click', () => { removeImg = true; $('#bPrev').innerHTML = ''; });
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const startEdit = (it, pw) => openForm(it, pw);

  root.querySelectorAll('.b-tabs button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.l; root.querySelectorAll('.b-tabs button').forEach(x => x.setAttribute('aria-selected', String(x === b))); load();
  }));
  $('#bList').addEventListener('click', e => { const row = e.target.closest('.b-row'); if (row) open(row.closest('.b-it')); });
  $('#bMore').addEventListener('click', () => load(false));
  $('#bWriteBtn').addEventListener('click', () => openForm());
  $('#bCancel').addEventListener('click', () => { form.hidden = true; editing = null; });
  form.image.addEventListener('change', async () => {
    const f = form.image.files[0]; imgBlob = null; removeImg = false; $('#bPrev').innerHTML = '';
    if (!f) return;
    try {
      imgBlob = await compressImage(f);
      if (!imgBlob) throw new Error('big');
      $('#bPrev').innerHTML = `<img src="${URL.createObjectURL(imgBlob)}" alt=""><span class="muted small">${Math.round(imgBlob.size / 1024)}KB</span>`;
    } catch { form.image.value = ''; showErr(B.boardImgBig); }
  });
  form.addEventListener('submit', async e => {
    e.preventDefault(); showErr('');
    const title = form.title.value.trim(), body = form.body.value.trim(), pw = form.pw.value;
    if (!title || !body) return showErr(B.boardEmptyField);
    if (!editing && !isAdmin() && pw.length < 4) return showErr(B.boardPwNeed);
    const fd = new FormData();
    fd.set('title', title); fd.set('body', body); fd.set('lang', C); fd.set('name', getName() || B.boardAnon); fd.set('who', getName());
    if (imgBlob) fd.set('image', new File([imgBlob], 'image.jpg', { type: 'image/jpeg' }));
    if (removeImg) fd.set('removeImg', '1');
    const btn = form.querySelector('[type=submit]'); btn.disabled = true;
    const url = editing ? `/api/board/${editing.id}/edit` : '/api/board';
    if (editing) { if (editing.pw) fd.set('pw', editing.pw); } else fd.set('pw', pw);
    const r = await fetch(url, { method: 'POST', body: fd }).then(x => x.json()).catch(() => ({ ok: false, error: 'net' }));
    btn.disabled = false;
    if (!r.ok) return showErr(errText(r.error));
    if (!editing) onWrote();
    form.hidden = true; editing = null; gateNote();
    if (lang !== 'all' && lang !== C) { lang = C; root.querySelectorAll('.b-tabs button').forEach(x => x.setAttribute('aria-selected', String(x.dataset.l === C))); }
    load();
  });
  gateNote(); load();
}
