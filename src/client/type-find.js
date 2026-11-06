// 60타입 공개 페이지: '내 생일로 나의 타입 찾기' → 모음 페이지에서 내 타입 칸으로 이동·강조, 위로 버튼
import * as E from './engine.js';

const $ = s => document.querySelector(s);
const raw = (() => { try { return JSON.parse(localStorage.getItem('ttf.profile') || 'null'); } catch { return null; } })();
const ST = ['gap', 'eul', 'byeong', 'jeong', 'mu', 'gi', 'gyeong', 'sin', 'im', 'gye'];
const BR = ['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'];
let mine = null;
try { if (raw) { const ch = E.SJ.chartOf(E.profileFrom(raw)); mine = `${ST[ch.dayStem]}-${BR[ch.pillars.day.branch]}`; } } catch { mine = null; }

function highlight(scroll) {
  const el = mine && document.querySelector(`.tc-mini[data-slug="${mine}"]`);
  if (!el) return false;
  document.querySelectorAll('.tc-mini.is-mine').forEach(x => x.classList.remove('is-mine'));
  el.classList.add('is-mine');
  if (scroll) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  return true;
}
// 모음 페이지: 내 타입 칸은 늘 표시, 주소에 #mine 이면 그 칸으로 이동
if (document.querySelector('.t-grid')) { highlight(false); if (location.hash === '#mine') setTimeout(() => highlight(true), 120); }
document.querySelectorAll('.t-find').forEach(a => a.addEventListener('click', e => {
  if (!mine) return; // 정보가 없으면 입력 화면으로
  e.preventDefault();
  if (!highlight(true)) location.href = `${a.dataset.hub}#mine`;
}));
// 위로 버튼
const fab = $('#fabTop');
if (fab) {
  const on = () => fab.classList.toggle('show-top', scrollY > 400);
  addEventListener('scroll', on, { passive: true }); on();
  fab.querySelector('.fab-top').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}
