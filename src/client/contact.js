// 문의하기 폼: 내용은 사이트 데이터베이스(/api/contact)에 저장되고 관리자 탭에서 확인. 메일 주소는 답장용으로만 씀
const f = document.getElementById('ctForm');
if (f) {
  const D = f.dataset;
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const er = document.getElementById('ctErr'), ok = document.getElementById('ctOk');
    er.hidden = true; ok.hidden = true;
    const email = f.email.value.trim(), msg = f.msg.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || msg.length < 5) { er.textContent = D.need; er.hidden = false; return; }
    const b = f.querySelector('button[type=submit]'); b.disabled = true;
    const body = { name: f.name.value.trim(), email, kind: f.kind.options[f.kind.selectedIndex].text, msg, hp: f.hp.value, lang: D.lang };
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).then(x => x.json()).catch(() => ({ ok: false }));
    b.disabled = false;
    if (!r.ok) { er.textContent = r.error === 'limit' ? D.limit : D.err; er.hidden = false; return; }
    f.reset(); ok.hidden = false;
  });
}
