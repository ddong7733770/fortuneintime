// 공유 미리보기(OG)·앱 아이콘 생성: `node scripts/make-images.mjs` (Playwright 필요, public/에 저장)
// 명인·부적 이미지는 public/images/에 있는 실제 이미지를 그대로 씁니다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(process.execPath)('playwright')); }
import { LANGS, dialSVG, dialLabels } from '../src/content.js';
import config from '../site.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');
const css = fs.readFileSync(path.join(ROOT, 'src/client/style.css'), 'utf8');
const L = {};
for (const c of LANGS) L[c] = (await import(`../src/i18n/${c}.js`)).default;
const fs700 = n => `<link rel="stylesheet" href="file://${path.join(ROOT, 'node_modules/@fontsource', n, '700.css')}">`;
const FONTS = fs700('gowun-batang') + fs700('shippori-mincho') + fs700('noto-serif-sc') + `<style>:root{--serif:'Gowun Batang','Noto Serif CJK KR',serif}</style>`;

const browser = await chromium.launch();
const page = await browser.newPage();
async function shot(html, w, h, out, transparent = false) {
  await page.setViewportSize({ width: w, height: h });
  const tmp = path.join(ROOT, '.shot.html');
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${css}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;${transparent ? 'background:transparent!important;background-image:none!important' : ''}}</style></head><body>${html}</body></html>`);
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, omitBackground: transparent });
  console.log('✔', path.relative(ROOT, out));
}

// OG 이미지 1200×630 (언어별)
for (const c of [...LANGS, 'default']) {
  const Lc = L[c] || L.ko;
  const dial = dialSVG({ hours: [62, 70, 78, 84, 90, 95, 88, 80, 72, 66, 58, 54], labels: dialLabels(Lc), nowMin: 600, best: 5, size: 470, centerTop: Lc.ui.todayScore, centerMain: '95', centerSub: '/100' });
  await shot(`<div style="width:1200px;height:630px;display:flex;align-items:center;gap:40px;padding:0 70px;box-sizing:border-box;background:#141B36" lang="${Lc.htmlLang}">
<div style="flex:1"><div style="font:700 74px 'Gowun Batang',serif;color:#C9A24A">${config.brand}</div>
<div style="font:700 40px ${c === 'ja' ? "'Shippori Mincho'" : c === 'zh' ? "'Noto Serif SC'" : "'Gowun Batang'"},serif;color:#E9E3D3;margin-top:18px">${Lc.subBrand}</div>
<div style="font:500 30px system-ui,sans-serif;color:#B3AD9C;margin-top:22px;line-height:1.4">${Lc.tagline}</div></div>
<div style="width:470px">${dial.replace('class="dial"', 'class="dial is-in"')}</div></div>`, 1200, 630, path.join(PUB, `og/${c === 'default' ? 'default' : c}.png`));
}

// 앱 아이콘
for (const s of [192, 512]) {
  await shot(`<div style="width:${s}px;height:${s}px;display:grid;place-items:center;background:#141B36"><div style="width:${s * 0.78}px;height:${s * 0.78}px;border-radius:50%;border:${s * 0.035}px solid #C9A24A;display:grid;place-items:center;font:700 ${s * 0.42}px 'Gowun Batang',serif;color:#F3E2B0">時</div></div>`, s, s, path.join(PUB, `icon-${s}.png`));
}
fs.writeFileSync(path.join(PUB, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#141B36"/><circle cx="32" cy="32" r="23" fill="none" stroke="#C9A24A" stroke-width="3"/><path d="M32 32V13" stroke="#F3E2B0" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="4" fill="#F3E2B0"/></svg>`);
await browser.close();
fs.rmSync(path.join(ROOT, '.shot.html'), { force: true });
