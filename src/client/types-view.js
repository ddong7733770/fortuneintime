// 60타입(일주) 카드 — 해운 화면과 공개 페이지가 함께 씀 (다른 모듈에 기대지 않음)
const STEM_H = '甲乙丙丁戊己庚辛壬癸';
const BRANCH_H = '子丑寅卯辰巳午未申酉戌亥';
const ANIMAL_SLUG = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
// 오행별 배경·강조색 (화는 붉은 양과 겹치지 않게 살구색)
export const EL_BG = ['#E3F3E6', '#FFE9D6', '#F8EDCF', '#EEF1F5', '#DFEAF8'];
export const EL_AC = ['#2F855A', '#D2543A', '#B7791F', '#5F6F86', '#2B6CB0'];
const ELK = ['목', '화', '토', '금', '수'];
const e = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f = (t, o) => t.replace(/\{(\w+)\}/g, (_, k) => (k in o ? o[k] : ''));

export const typeName = (T, t) => `${T.stems[t.s].img}의 ${T.branches[t.b].animal}`;
export const typeKo = (T, t) => `${T.stems[t.s].ko}${T.branches[t.b].ko}`;
export const typeH = t => `${STEM_H[t.s]}${BRANCH_H[t.b]}`;
export const typeTag = (T, t) => `${T.stems[t.s].vibe} ${T.branches[t.b].persona}`;
export const typeKw = (T, t) => [T.stems[t.s].kw[t.b % 3], T.branches[t.b].kw[t.s % 3], T.stems[t.s].kw[(t.b + 1) % 3]].filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
export const animalImg = (imgs, b) => (imgs && imgs.includes(ANIMAL_SLUG[b]) ? `/images/animals/${ANIMAL_SLUG[b]}.webp` : '');

// 동그란 그림: 띠 동물 그림(있으면) 또는 한자 배지 + 오행 색 배경
export function typeBadge(t, imgs, size = 'md') {
  const src = animalImg(imgs, t.b);
  const inner = src ? `<img src="${src}" alt="" loading="lazy" decoding="async">` : `<b>${BRANCH_H[t.b]}</b>`;
  return `<span class="tb tb-${size}" style="--tb:${EL_BG[t.el]};--ta:${EL_AC[t.el]}">${inner}<i>${STEM_H[t.s]}</i></span>`;
}

// 해운 화면 맨 위 카드
export function typeCardHTML(T, t, imgs, hrefBase) {
  const kw = typeKw(T, t);
  return `<section class="sec tcard" style="--ta:${EL_AC[t.el]};--tb:${EL_BG[t.el]}">
<p class="tc-k">${e(T.ui.title)}</p>
<div class="tc-top">${typeBadge(t, imgs, 'lg')}<div><p class="tc-ko">${e(typeKo(T, t))}일주 <small>${typeH(t)}</small></p><h2 class="tc-name">${e(typeName(T, t))}</h2><p class="tc-tag">${e(typeTag(T, t))}</p></div></div>
<ul class="tc-kw">${kw.map(k => `<li>#${e(k)}</li>`).join('')}</ul>
<details class="tc-more"><summary>${e(T.ui.more)}</summary>${typeDetailHTML(T, t, imgs, hrefBase)}</details>
<div class="tc-btns"><button type="button" class="btn-primary sm tc-share" id="typeShare">${e(T.ui.share)}</button><a class="btn-ghost sm" href="${hrefBase}#mine">${e(T.ui.page)}</a></div>
</section>`;
}

// 자세히 (해운 화면 펼침 + 공개 페이지 본문)
export function typeDetailHTML(T, t, imgs, hrefBase, typeOfFn) {
  const S = T.stems[t.s], B = T.branches[t.b];
  const mini = x => `<a class="tc-mini" href="${hrefBase}${x.slug}/">${typeBadge(x, imgs, 'sm')}<span><b>${e(typeKo(T, x))}일주</b><small>${e(typeName(T, x))}</small></span></a>`;
  const best = { ...t.best, el: elOfStem(t.best.s), slug: slugOf(t.best.s, t.best.b) };
  const clash = { ...t.clash, el: elOfStem(t.clash.s), slug: slugOf(t.clash.s, t.clash.b) };
  return `<div class="tc-detail">
<p>${e(S.desc)} ${e(B.desc)} ${e(T.combo[t.combo])}</p>
<dl class="tc-dl"><div><dt>${e(T.ui.strong)}</dt><dd>${e(S.kw.join(' · '))} · ${e(B.kw.join(' · '))}</dd></div>
<div><dt>${e(T.ui.weak)}</dt><dd>${e(S.weak)}</dd></div>
<div><dt>${e(T.ui.love)}</dt><dd>${e(B.love)}</dd></div>
<div><dt>${e(T.ui.work)}</dt><dd>${e(S.work)}</dd></div></dl>
<div class="tc-match"><div><small>${e(T.ui.best)}</small>${mini(best)}</div><div><small>${e(T.ui.clash)}</small>${mini(clash)}</div></div>
</div>`;
}
const ST_SLUG = ['gap', 'eul', 'byeong', 'jeong', 'mu', 'gi', 'gyeong', 'sin', 'im', 'gye'];
const BR_SLUG = ['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'];
const slugOf = (s, b) => `${ST_SLUG[s]}-${BR_SLUG[b]}`;
const elOfStem = s => Math.floor(s / 2);

// 공유 카드 (1080×1920): 이름 없이 타입만
const loadImg = src => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; });
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
export async function makeTypeCard(T, t, imgs, site) {
  const serif = '"Noto Serif KR", serif', sans = '"Pretendard Variable", Pretendard, system-ui, sans-serif';
  try { await Promise.all([document.fonts.load(`700 80px ${serif}`, '타입'), document.fonts.load(`600 40px ${sans}`, '타입')]); } catch { /* */ }
  const W = 1080, H = 1920, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d'), ac = EL_AC[t.el];
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, EL_BG[t.el]);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 0.08; ctx.fillStyle = ac; ctx.font = `700 1100px ${serif}`; ctx.textAlign = 'center'; ctx.fillText(BRANCH_H[t.b], W / 2, 1250); ctx.globalAlpha = 1;
  ctx.fillStyle = '#6E6A62'; ctx.font = `600 38px ${sans}`; ctx.fillText(T.ui.cardTitle, W / 2, 170);
  // 그림
  ctx.fillStyle = EL_BG[t.el]; ctx.beginPath(); ctx.arc(W / 2, 520, 270, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = ac; ctx.lineWidth = 6; ctx.stroke();
  const src = animalImg(imgs, t.b);
  let drawn = false;
  if (src) { try { const im = await loadImg(src.replace('.webp', '.png')).catch(() => loadImg(src)); const h = 440, w = Math.round(h * im.naturalWidth / im.naturalHeight); ctx.drawImage(im, W / 2 - w / 2, 300, w, h); drawn = true; } catch { /* */ } }
  if (!drawn) { ctx.fillStyle = ac; ctx.font = `700 300px ${serif}`; ctx.fillText(BRANCH_H[t.b], W / 2, 625); }
  ctx.fillStyle = ac; ctx.font = `700 64px ${serif}`; ctx.fillText(`${typeKo(T, t)}일주 ${typeH(t)}`, W / 2, 900);
  ctx.fillStyle = '#1A1A1A'; ctx.font = `700 112px ${serif}`; ctx.fillText(typeName(T, t), W / 2, 1050);
  ctx.fillStyle = '#4A463F'; ctx.font = `600 48px ${sans}`; ctx.fillText(typeTag(T, t), W / 2, 1140);
  // 키워드 칩
  const kw = typeKw(T, t).map(k => `#${k}`);
  ctx.font = `700 46px ${sans}`;
  const ws = kw.map(k => ctx.measureText(k).width + 64), tot = ws.reduce((a, b) => a + b, 0) + (kw.length - 1) * 20;
  let x = (W - tot) / 2;
  kw.forEach((k, i) => { ctx.fillStyle = '#FFFFFF'; rr(ctx, x, 1220, ws[i], 92, 46); ctx.fill(); ctx.strokeStyle = ac; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = ac; ctx.fillText(k, x + ws[i] / 2, 1282); x += ws[i] + 20; });
  // 찰떡 타입
  const best = { s: t.best.s, b: t.best.b };
  ctx.fillStyle = '#FFFFFF'; rr(ctx, 140, 1400, W - 280, 200, 36); ctx.fill();
  ctx.fillStyle = '#6E6A62'; ctx.font = `600 36px ${sans}`; ctx.fillText(T.ui.best, W / 2, 1468);
  ctx.fillStyle = '#1A1A1A'; ctx.font = `700 54px ${serif}`; ctx.fillText(`${typeKo(T, best)}일주 · ${typeName(T, best)}`, W / 2, 1548);
  ctx.fillStyle = ac; ctx.font = `700 40px ${serif}`; ctx.fillText('Fortune in Time', W / 2, 1790);
  ctx.fillStyle = '#6E6A62'; ctx.font = `500 30px ${sans}`; ctx.fillText(site, W / 2, 1840);
  return new Promise(ok => cv.toBlob(ok, 'image/png'));
}
export { ELK };
