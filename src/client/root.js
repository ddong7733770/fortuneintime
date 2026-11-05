// 언어 선택 첫 페이지: 저장한 언어가 있으면 바로 이동, 없으면 브라우저 언어를 '추천'으로 표시
import { dialSVG, dialLabels, sijinRange, startHands } from './content.js';
import { sijinIndex } from './engine.js';

const qs = new URLSearchParams(location.search);
let saved = null;
try { saved = JSON.parse(localStorage.getItem('ttf.lang')); } catch { /* */ }
// 처음 온 사람은 이 언어 선택 화면에서 시작. 같은 기기에서 다시 오면 저장된 언어의 정보 입력 화면으로
if (saved && !qs.has('pick')) location.replace(`/${saved}/`);

const MAP = { ko: 'ko', ja: 'ja', zh: 'zh', en: 'en', es: 'es', id: 'id', in: 'id', ms: 'id' };
const guess = (navigator.languages || [navigator.language || 'ko']).map(l => MAP[l.toLowerCase().split('-')[0]]).find(Boolean) || 'en';
const rec = saved || guess;

const card = document.querySelector(`.lang-card[data-lang="${rec}"]`);
if (card) { card.classList.add('is-rec'); card.querySelector('.rec').hidden = false; }
document.querySelectorAll('.lang-card').forEach(a => a.addEventListener('click', () => {
  try { localStorage.setItem('ttf.lang', JSON.stringify(a.dataset.lang)); } catch { /* */ }
}));

// 추천 언어로 '지금은 ○○시' 다이얼 미리보기
fetch(`/assets/i18n/${rec}.json`).then(r => r.json()).then(L => {
  const draw = () => {
    const d = new Date();
    const si = sijinIndex(d.getHours(), d.getMinutes());
    const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    // 가운데에는 지금 시각을 크게, 그 아래에 지금의 시진
    document.getElementById('rootDial').innerHTML = dialSVG({ labels: dialLabels(L), nowMin: d.getHours() * 60 + d.getMinutes(), size: 220, id: 'pdial', centerTop: L.ui.now, centerMain: hm, centerSub: `${L.sijin[si]} ${sijinRange(si)}` });
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('pdial')?.classList.add('is-in')));
  };
  draw(); setInterval(draw, 15000); startHands();
  if (rec !== 'ko') {
    document.getElementById('chooseLabel').textContent = `${L.ui.chooseLang} / 언어를 선택하세요`;
    document.getElementById('rootIntro').textContent = L.intro;
    document.getElementById('rootIntro').lang = L.htmlLang;
  }
}).catch(() => {});
