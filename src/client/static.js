// 정적 운세 페이지: 빌드한 날짜와 보는 사람의 오늘 날짜가 다르면 그 자리에서 다시 계산
import { dateKey } from './engine.js';
import { genericReading, readingHTML, indexListHTML } from './content.js';

const lang = document.body.dataset.lang;
const today = dateKey(new Date());
const blocks = [...document.querySelectorAll('[data-reading],[data-glist]')].filter(el => el.dataset.date !== today);
if (blocks.length) {
  fetch(`/assets/i18n/${lang}.json`).then(r => r.json()).then(L => {
    for (const el of blocks) {
      if (el.dataset.reading) el.innerHTML = readingHTML(L, genericReading(L, el.dataset.reading, +el.dataset.idx, today), today);
      else el.innerHTML = indexListHTML(L, el.dataset.glist, today);
      el.dataset.date = today;
    }
  }).catch(() => {});
}
