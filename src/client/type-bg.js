// 60타입 공유 카드(1080×1920) 하단 배경 — 천간별 10종. 캔버스로만 그림(이미지 파일 없음)
// 甲숲 乙꽃 丙태양 丁촛불 戊산 己들판 庚바위 辛보석 壬바다 癸빗방울
// 규칙: 장식은 카드 하단(약 1300px 아래)에만. 키 큰 장식은 양쪽 모서리, 찰떡 박스·forTime 문구 뒤는 낮고 옅게
let forest, mountains, rocks, S;
{
// 갑목(甲·숲) 카드 하단 숲 — 평면 일러스트 실루엣. 카드 위쪽·가운데는 건드리지 않음
// 가운데(찰떡 카드 140~940, forTime 문구)는 낮고 옅은 안개 숲, 키 큰 나무는 양쪽 모서리에만
const rnd = seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

// 층층이 톱니 진 전나무
function pine(c, x, base, h, w, col) {
  c.fillStyle = col;
  c.fillRect(x - w * 0.045, base - h * 0.14, w * 0.09, h * 0.16);
  const n = 6;
  for (let i = 0; i < n; i++) {
    const ty = base - h + (i * h * 0.78) / n, by = ty + h * 0.26, tw = w * (0.3 + (0.7 * (i + 1)) / n), teeth = 3 + i;
    c.beginPath(); c.moveTo(x, ty); c.lineTo(x - tw / 2, by);
    for (let k = 1; k <= teeth * 2; k++) { const px = x - tw / 2 + (tw * k) / (teeth * 2); c.lineTo(px, k % 2 ? by - h * 0.035 : by + h * 0.012); }
    c.lineTo(x + tw / 2, by); c.closePath(); c.fill();
  }
}
// 둥근 잎 덩어리 활엽수: 줄기·가지 + 짙은 잎 위에 밝은 잎
function broad(c, x, base, h, w, dark, light, trunk, r) {
  const top = base - h, cy = top + h * 0.38;
  c.fillStyle = trunk;
  c.beginPath(); c.moveTo(x - w * 0.05, base); c.lineTo(x - w * 0.02, top + h * 0.3); c.lineTo(x + w * 0.02, top + h * 0.3); c.lineTo(x + w * 0.05, base); c.fill();
  const blob = (bx, by, rx, ry) => { c.beginPath(); c.ellipse(bx, by, rx, ry, 0, 0, Math.PI * 2); c.fill(); };
  c.fillStyle = dark;
  [[0, -0.2, 0.34, 0.2], [-0.24, 0.02, 0.28, 0.17], [0.24, 0.04, 0.28, 0.17], [-0.1, 0.2, 0.3, 0.15], [0.14, 0.22, 0.28, 0.14], [0.02, -0.36, 0.22, 0.14]]
    .forEach(([dx, dy, rx, ry]) => blob(x + dx * w, cy + dy * h, rx * w, ry * h));
  c.fillStyle = light;
  [[-0.08, -0.26, 0.24, 0.13], [-0.28, -0.02, 0.18, 0.11], [0.12, -0.02, 0.2, 0.11], [-0.16, 0.16, 0.18, 0.09]]
    .forEach(([dx, dy, rx, ry]) => blob(x + dx * w + (r() - 0.5) * 6, cy + dy * h, rx * w, ry * h));
  // 잎 사이로 보이는 가지
  c.strokeStyle = trunk; c.lineCap = 'round';
  [[0, 0.3, -0.26, 0.02, 5], [0, 0.26, 0.24, 0.0, 5], [0, 0.1, -0.1, -0.24, 4], [0, 0.08, 0.14, -0.2, 4], [0, 0.0, 0.0, -0.34, 3]]
    .forEach(([x1, y1, x2, y2, lw]) => { c.lineWidth = lw; c.beginPath(); c.moveTo(x + x1 * w, cy + y1 * h); c.lineTo(x + x2 * w, cy + y2 * h); c.stroke(); });
}
// 한 겹을 불투명하게 그린 뒤 통째로 옅게 얹음 → 겹친 부분 얼룩 없음
function put(ctx, W, H, alpha, fn) {
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; fn(cv.getContext('2d'));
  ctx.save(); ctx.globalAlpha = alpha; ctx.drawImage(cv, 0, 0); ctx.restore();
}

function draw(ctx, W, H) {
  const r = rnd(11);
  // 1) 먼 안개 숲: 가운데는 낮게, 가장자리로 갈수록 조금 높게
  put(ctx, W, H, 0.38, c => {
    c.fillStyle = '#9FCDB8'; c.fillRect(0, 1765, W, H - 1765);
    for (let i = 0; i <= 16; i++) {
      const x = (i / 16) * W + (r() - 0.5) * 30, edge = Math.abs(x - W / 2) / (W / 2);
      const h = 80 + edge * 150 + r() * 50;
      pine(c, x, 1775, h, h * (0.42 + r() * 0.16), '#9FCDB8');
    }
  });
  // 2) 가운데 줄 작은 전나무(청록)
  put(ctx, W, H, 0.6, c => {
    c.fillStyle = '#5FB3A0';
    c.beginPath(); c.moveTo(0, 1840);
    for (let x = 0; x <= W; x += 60) c.quadraticCurveTo(x + 30, 1822 + r() * 10, x + 60, 1836);
    c.lineTo(W, H); c.lineTo(0, H); c.fill();
    [[250, 120], [300, 90], [350, 150], [420, 100], [700, 110], [760, 160], [820, 100], [880, 130]]
      .forEach(([x, h]) => pine(c, x, 1846, h, h * 0.48, '#5FB3A0'));
  });
  // 3) 아래 바닥: 문구 뒤는 밝은 안개로 덮어 글자가 또렷하게
  const mg = ctx.createLinearGradient(0, 1745, 0, H);
  mg.addColorStop(0, 'rgba(255,255,255,0)'); mg.addColorStop(0.35, 'rgba(255,255,255,.55)'); mg.addColorStop(1, 'rgba(255,255,255,.35)');
  ctx.fillStyle = mg; ctx.fillRect(220, 1745, W - 440, H - 1745);
  // 4) 앞쪽 바닥 띠
  put(ctx, W, H, 1, c => {
    c.fillStyle = '#2E8B6E'; c.beginPath(); c.moveTo(0, 1880);
    c.quadraticCurveTo(W * 0.25, 1868, W * 0.5, 1884); c.quadraticCurveTo(W * 0.75, 1898, W, 1872); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  });
  // 5) 왼쪽 모서리 숲 (찰떡 카드 왼쪽 140 밖으로만 높게)
  put(ctx, W, H, 1, c => {
    pine(c, 22, 1900, 560, 230, '#3E9C88');
    pine(c, 92, 1900, 470, 200, '#23775C');
    broad(c, 205, 1905, 330, 230, '#1F6E50', '#3B9D72', '#2C4A40', r);
    pine(c, 300, 1905, 190, 100, '#2E8B6E');
  });
  // 6) 오른쪽 모서리 숲
  put(ctx, W, H, 1, c => {
    pine(c, 1040, 1900, 600, 240, '#3E9C88');
    broad(c, 870, 1905, 320, 220, '#1F6E50', '#3B9D72', '#2C4A40', r);
    pine(c, 975, 1905, 500, 210, '#23775C');
    broad(c, 1075, 1910, 260, 190, '#2A8160', '#4FAE80', '#2C4A40', r);
    pine(c, 780, 1905, 170, 90, '#2E8B6E');
  });
}

forest = draw;
}
{
// 60타입 카드 하단 장식 10종 (천간: 甲숲 乙꽃 丙태양 丁촛불 戊산 己들판 庚바위 辛보석 壬바다 癸빗방울)
// 공통 규칙: 카드 하단(약 1300px 아래)에만 평면 일러스트. 키 큰 장식은 양쪽 모서리, 가운데(찰떡 박스·forTime 문구 뒤)는 낮고 옅게

const rnd = seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
function put(ctx, W, H, alpha, fn) {
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; fn(cv.getContext('2d'));
  ctx.save(); ctx.globalAlpha = alpha; ctx.drawImage(cv, 0, 0); ctx.restore();
}
// forTime 문구 뒤를 밝게
function mist(ctx, W, H, y0 = 1745, a = 0.55) {
  const g = ctx.createLinearGradient(0, y0, 0, H);
  g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.35, `rgba(255,255,255,${a})`); g.addColorStop(1, `rgba(255,255,255,${a * 0.6})`);
  ctx.fillStyle = g; ctx.fillRect(220, y0, W - 440, H - y0);
}
// 물결 모양 띠 (y에서 아래 끝까지)
function band(c, W, H, y, amp, step, col, r) {
  c.fillStyle = col; c.beginPath(); c.moveTo(0, y);
  for (let x = 0; x < W; x += step) c.quadraticCurveTo(x + step / 2, y - amp * (0.5 + r()), x + step, y);
  c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill();
}
// 가장자리가 높고 가운데가 낮은 언덕 (left·right 높이, mid 높이)
function ridge(c, W, H, yl, ym, yr, col) {
  c.fillStyle = col; c.beginPath(); c.moveTo(0, yl);
  c.bezierCurveTo(W * 0.22, yl + (ym - yl) * 0.9, W * 0.32, ym, W * 0.5, ym);
  c.bezierCurveTo(W * 0.68, ym, W * 0.78, yr + (ym - yr) * 0.9, W, yr);
  c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill();
}

// ── 乙 꽃: 꽃밭

// ── 丙 태양: 지평선 위로 떠오르는 해

// ── 丁 촛불

// ── 戊 산: 겹겹 산줄기
function peaks(c, W, H, pts, col) {
  c.fillStyle = col; c.beginPath(); c.moveTo(0, H); pts.forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(W, H); c.closePath(); c.fill();
}
function mountainsFn(ctx, W, H) {
  put(ctx, W, H, 0.45, c => peaks(c, W, H, [[0, 1640], [120, 1560], [230, 1650], [360, 1700], [470, 1660], [560, 1720], [660, 1670], [780, 1690], [880, 1600], [980, 1540], [1080, 1610]], '#CFE7D2'));
  put(ctx, W, H, 0.5, c => peaks(c, W, H, [[0, 1560], [90, 1480], [170, 1590], [270, 1740], [400, 1830], [540, 1810], [680, 1840], [800, 1740], [900, 1580], [990, 1470], [1080, 1540]], '#9FD0A9'));
  // 산허리 안개
  put(ctx, W, H, 0.7, c => { c.fillStyle = '#FFFFFF'; [[180, 1700, 220, 26], [880, 1690, 220, 24], [540, 1820, 320, 30]].forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill(); }); });
  mist(ctx, W, H, 1740, 0.65);
  put(ctx, W, H, 1, c => {
    peaks(c, W, H, [[0, 1380], [60, 1330], [130, 1440], [210, 1560], [270, 1660], [330, 1760], [400, 1900], [680, 1900], [760, 1770], [830, 1650], [900, 1520], [960, 1400], [1020, 1310], [1080, 1360]], '#4F9C6E');
    // 빛 받는 면
    c.fillStyle = '#7DBE93';
    c.beginPath(); c.moveTo(60, 1330); c.lineTo(130, 1440); c.lineTo(100, 1560); c.lineTo(40, 1460); c.fill();
    c.beginPath(); c.moveTo(1020, 1310); c.lineTo(960, 1400); c.lineTo(990, 1520); c.lineTo(1040, 1420); c.fill();
    c.fillStyle = '#3F855A'; c.beginPath(); c.moveTo(0, 1904); c.quadraticCurveTo(W / 2, 1880, W, 1900); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  });
}

// ── 己 들판: 이랑 진 언덕, 밀 이삭, 건초 더미

// ── 庚 바위
function boulder(c, x, base, w, h, col, lite, r) {
  const n = 9, pts = [];
  for (let i = 0; i <= n; i++) { const a = Math.PI + (i / n) * Math.PI, k = 0.82 + r() * 0.18; pts.push([x + Math.cos(a) * w / 2 * k, base + Math.sin(a) * h * k]); }
  c.fillStyle = col; c.beginPath(); c.moveTo(x - w / 2, base); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(x + w / 2, base); c.closePath(); c.fill();
  // 빛 받는 면(왼쪽 위)
  c.fillStyle = lite; c.beginPath(); c.moveTo(pts[1][0], pts[1][1]); for (let i = 2; i <= 5; i++) c.lineTo(pts[i][0], pts[i][1]); c.lineTo(x - w * 0.05, base - h * 0.45); c.lineTo(x - w * 0.3, base - h * 0.3); c.closePath(); c.fill();
}
function tuft(c, x, base, s, col) { c.strokeStyle = col; c.lineWidth = 4; c.lineCap = 'round'; [-0.5, -0.2, 0.1, 0.4].forEach(a => { c.beginPath(); c.moveTo(x, base); c.quadraticCurveTo(x + a * s * 0.4, base - s * 0.6, x + a * s, base - s); c.stroke(); }); }
function rocksFn(ctx, W, H) {
  const r = rnd(61);
  put(ctx, W, H, 0.45, c => ridge(c, W, H, 1690, 1810, 1680, '#C9D1DB'));
  put(ctx, W, H, 0.6, c => { [[300, 70, 40], [380, 50, 28], [460, 90, 44], [620, 70, 36], [700, 100, 46], [780, 60, 30]].forEach(([x, w, h]) => boulder(c, x, 1860, w, h, '#AEB8C5', '#C8D0DA', r)); });
  mist(ctx, W, H, 1760, 0.45);
  put(ctx, W, H, 1, c => {
    band(c, W, H, 1888, 8, 120, '#8D99A8', r);
    boulder(c, 70, 1900, 300, 330, '#6D7B8F', '#8C99AB', r); boulder(c, 20, 1610, 170, 200, '#7E8BA0', '#9DA9BA', r); boulder(c, 200, 1905, 180, 150, '#8A97A8', '#A7B2C1', r);
    boulder(c, 1010, 1900, 320, 380, '#6D7B8F', '#8C99AB', r); boulder(c, 1060, 1560, 160, 170, '#7E8BA0', '#9DA9BA', r); boulder(c, 870, 1905, 190, 160, '#8A97A8', '#A7B2C1', r);
    tuft(c, 250, 1900, 60, '#8FA88A'); tuft(c, 820, 1900, 56, '#8FA88A'); tuft(c, 140, 1905, 44, '#7E9A7A');
  });
}

// ── 辛 보석: 수정 결정

// ── 壬 바다: 겹겹 파도

// ── 癸 빗방울: 떨어지는 빗방울, 물웅덩이 동심원, 물가 풀


mountains = mountainsFn; rocks = rocksFn;
}
{
// 60타입 카드 하단 장식 3차: 乙꽃 丙태양 己들판 辛보석 壬바다 癸빗방울
// 참고 이미지는 분위기만 참고하고 모양·구도·색 배치는 새로 만듦. 키 큰 장식은 모서리, 가운데는 낮고 옅게
const rnd = seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const dot = (c, x, y, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); };
function fadeBottom(c, W, H, y0 = 1890, a = 0.85) { const g = c.createLinearGradient(0, y0, 0, H); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, `rgba(255,255,255,${a})`); c.fillStyle = g; c.fillRect(0, y0, W, H - y0); }
// forTime 문구 뒤를 밝히는 부드러운 타원 빛 (경계선 없음)
function mist(c, W, H, y0 = 1745, a = 0.55) {
  c.save(); c.translate(W / 2, 1822); c.scale(1, 0.32);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, 360); g.addColorStop(0, `rgba(255,255,255,${Math.min(0.9, a + 0.2)})`); g.addColorStop(0.6, `rgba(255,255,255,${a * 0.7})`); g.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, 360, 0, Math.PI * 2); c.fill(); c.restore();
}

// ── 乙 꽃: 동글동글한 정원 꽃 (종꽃·라벤더 이삭·겹꽃·작은 들꽃), 둥근 잎
const LEAF = ['#7FB59A', '#5E9C80', '#A9D2BC'];
function stem(c, x0, y0, x1, y1, bend, col = '#5E9C80', lw = 5) { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2 + bend, (y0 + y1) / 2, x1, y1); c.stroke(); }
function roundLeaf(c, x, y, s, a, col) { c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = col; c.beginPath(); c.ellipse(0, -s * 0.55, s * 0.32, s * 0.55, 0, 0, Math.PI * 2); c.fill(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -s * 0.1); c.lineTo(0, -s * 0.95); c.stroke(); c.restore(); }
function layered(c, x, y, s, outer, inner, core) { // 겹꽃: 바깥 꽃잎 8장 + 안쪽 6장 + 노란 점 꽃심
  [[8, 1, outer, 0], [6, 0.62, inner, 0.3]].forEach(([n, k, col, rot]) => { c.fillStyle = col; for (let i = 0; i < n; i++) { const a = rot + (i / n) * Math.PI * 2; c.beginPath(); c.ellipse(x + Math.cos(a) * s * 0.42 * k, y + Math.sin(a) * s * 0.42 * k, s * 0.3 * k, s * 0.3 * k, 0, 0, Math.PI * 2); c.fill(); } });
  dot(c, x, y, s * 0.2, core); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; dot(c, x + Math.cos(a) * s * 0.1, y + Math.sin(a) * s * 0.1, s * 0.035, 'rgba(255,255,255,.8)'); }
}
function bell(c, x, y, s, col, lip) { // 고개 숙인 종꽃
  c.fillStyle = col; c.beginPath(); c.moveTo(x - s * 0.18, y); c.quadraticCurveTo(x - s * 0.5, y + s * 0.2, x - s * 0.45, y + s * 0.75); c.quadraticCurveTo(x - s * 0.3, y + s * 0.62, x - s * 0.15, y + s * 0.78); c.quadraticCurveTo(x, y + s * 0.62, x + s * 0.15, y + s * 0.78); c.quadraticCurveTo(x + s * 0.3, y + s * 0.62, x + s * 0.45, y + s * 0.75); c.quadraticCurveTo(x + s * 0.5, y + s * 0.2, x + s * 0.18, y); c.closePath(); c.fill();
  c.fillStyle = lip; c.beginPath(); c.ellipse(x - s * 0.12, y + s * 0.35, s * 0.08, s * 0.22, 0.1, 0, Math.PI * 2); c.fill();
}
function bellStem(c, x, base, h, lean, col) {
  stem(c, x, base, x + lean, base - h, lean * 0.4);
  const tx = x + lean, ty = base - h;
  stem(c, tx, ty, tx + 40 * Math.sign(lean || 1), ty + 30, -10, '#5E9C80', 3);
  [[0.12, 0.34], [0.32, 0.27], [0.55, 0.22]].forEach(([t, s], i) => { const px = x + lean * (1 - t), py = base - h * (1 - t); stem(c, px, py, px + (i % 2 ? -34 : 34), py + 14, 0, '#5E9C80', 3); bell(c, px + (i % 2 ? -34 : 34), py + 14, h * s * 0.45, col, 'rgba(255,255,255,.55)'); });
  bell(c, tx + 40 * Math.sign(lean || 1), ty + 30, h * 0.16, col, 'rgba(255,255,255,.55)');
}
function spike(c, x, base, h, lean, col) { // 라벤더 같은 이삭
  stem(c, x, base, x + lean, base - h, lean * 0.3, '#6E9E8A', 4);
  for (let i = 0; i < 9; i++) { const t = 0.55 + i * 0.05, px = x + lean * t, py = base - h * t, s = 13 - i * 0.7; c.fillStyle = i % 2 ? col : '#C9B4EC'; c.beginPath(); c.ellipse(px - s * 0.45, py, s * 0.42, s * 0.62, -0.4, 0, Math.PI * 2); c.ellipse(px + s * 0.45, py, s * 0.42, s * 0.62, 0.4, 0, Math.PI * 2); c.fill(); }
}
function tiny(c, x, y, s, col) { c.fillStyle = col; for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; dot(c, x + Math.cos(a) * s * 0.5, y + Math.sin(a) * s * 0.5, s * 0.42, col); } dot(c, x, y, s * 0.3, '#FFE08A'); }
function flowers(ctx, W, H) {
  const c = ctx, B = 1925, r = rnd(5);
  // 언덕 같은 둥근 덤불 (옅게)
  c.save(); c.globalAlpha = 0.5; c.fillStyle = '#CDE7D8';
  [[60, 1880, 200, 120], [1020, 1870, 220, 130], [300, 1915, 180, 60], [780, 1915, 180, 60]].forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill(); });
  c.restore();
  // 가운데: 아주 작은 들꽃만
  c.save(); c.globalAlpha = 0.75;
  for (let i = 0; i < 16; i++) { const x = 250 + r() * 580, y = 1860 + r() * 45; if (x > 380 && x < 700 && y < 1880) continue; stem(c, x, B, x, y, 0, '#8DBFA6', 2); tiny(c, x, y, 10, ['#F6B6C8', '#FFFFFF', '#FBD38A', '#CDB8F0'][i % 4]); }
  c.restore();
  // 왼쪽 모서리
  roundLeaf(c, 40, B, 150, -0.35, LEAF[1]); roundLeaf(c, 120, B, 120, 0.4, LEAF[0]);
  spike(c, 26, B, 560, 14, '#A88BDF');
  bellStem(c, 92, B, 470, 30, '#8EC5E8');
  stem(c, 175, B, 190, 1620, 20); roundLeaf(c, 180, 1790, 80, 0.7, LEAF[2]); layered(c, 190, 1620, 70, '#F7A7B8', '#FBD0DA', '#F4B740');
  stem(c, 255, B, 262, 1750, -10); layered(c, 262, 1750, 44, '#FFD27A', '#FFE7B0', '#F08A5D');
  stem(c, 60, B, 48, 1800, -10); tiny(c, 48, 1800, 26, '#FFFFFF');
  // 오른쪽 모서리
  roundLeaf(c, 1040, B, 160, 0.35, LEAF[1]); roundLeaf(c, 960, B, 120, -0.4, LEAF[0]);
  spike(c, 1056, B, 590, -16, '#A88BDF');
  stem(c, 985, B, 975, 1420, -20); roundLeaf(c, 980, 1700, 90, -0.7, LEAF[2]); layered(c, 975, 1420, 76, '#F59C7E', '#FBC4AE', '#FFD45E');
  bellStem(c, 905, B, 340, -24, '#F7A7B8');
  stem(c, 830, B, 822, 1760, 8); layered(c, 822, 1760, 42, '#CDB8F0', '#E6DCF8', '#F4B740');
  stem(c, 1020, B, 1030, 1810, 6); tiny(c, 1030, 1810, 24, '#FBD38A');
  // 나비 두 마리와 꽃가루
  const fly = (x, y, s, col) => { c.fillStyle = col; [[-1, -0.5], [1, -0.5]].forEach(([d]) => { c.beginPath(); c.ellipse(x + d * s * 0.5, y - s * 0.2, s * 0.5, s * 0.38, d * 0.5, 0, Math.PI * 2); c.fill(); c.beginPath(); c.ellipse(x + d * s * 0.4, y + s * 0.3, s * 0.32, s * 0.26, -d * 0.4, 0, Math.PI * 2); c.fill(); }); c.fillStyle = '#5E6B7A'; c.fillRect(x - 2, y - s * 0.4, 4, s * 0.9); };
  fly(160, 1390, 26, 'rgba(247,167,184,.85)'); fly(920, 1330, 22, 'rgba(168,139,223,.8)');
  [[230, 1470, 5], [70, 1340, 6], [1000, 1250, 5], [880, 1430, 4], [300, 1660, 4], [770, 1650, 4]].forEach(([x, y, s], i) => dot(c, x, y, s, ['#FBD38A', '#F7A7B8', '#CDB8F0'][i % 3]));
  fadeBottom(c, W, H, 1895, 0.8);
}

// ── 丙 태양: 겹겹 언덕 위로 떠오르는 해, 동심원 빛띠, 리본 구름
function ribbon(c, x, y, w, h, col) { c.fillStyle = col; c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + w * 0.25, y - h, x + w * 0.55, y - h, x + w * 0.7, y - h * 0.4); c.bezierCurveTo(x + w * 0.8, y - h * 0.9, x + w * 0.95, y - h * 0.7, x + w, y); c.closePath(); c.fill(); }
function sun(ctx, W, H) {
  const c = ctx, cx = W / 2, HY = 1745, R = 130;
  const sky = c.createLinearGradient(0, 1300, 0, HY); sky.addColorStop(0, 'rgba(255,224,200,0)'); sky.addColorStop(1, 'rgba(255,214,186,.95)');
  c.fillStyle = sky; c.fillRect(0, 1300, W, HY - 1300);
  // 동심원 빛띠 (점선 고리)
  c.save(); c.lineCap = 'round';
  [[210, 10, 'rgba(255,190,140,.55)', [2, 22]], [280, 8, 'rgba(255,200,160,.45)', [2, 30]], [360, 6, 'rgba(255,210,175,.35)', [2, 36]]].forEach(([rr, lw, col, dash]) => { c.strokeStyle = col; c.lineWidth = lw; c.setLineDash(dash); c.beginPath(); c.arc(cx, HY, rr, Math.PI * 1.04, Math.PI * 1.96); c.stroke(); });
  c.restore();
  // 해: 가운데가 밝은 원형 그라데이션 + 안쪽 고리
  const sg = c.createRadialGradient(cx, HY - 30, 10, cx, HY, R); sg.addColorStop(0, '#FFE9A8'); sg.addColorStop(0.6, '#FFC071'); sg.addColorStop(1, '#F7944E');
  c.fillStyle = sg; c.beginPath(); c.arc(cx, HY, R, Math.PI, 0); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 4; c.beginPath(); c.arc(cx, HY, R - 22, Math.PI * 1.1, Math.PI * 1.45); c.stroke();
  // 리본 구름
  ribbon(c, 20, 1560, 260, 60, 'rgba(255,236,224,.95)'); ribbon(c, 120, 1610, 180, 40, 'rgba(255,226,210,.9)');
  ribbon(c, 800, 1540, 270, 64, 'rgba(255,236,224,.95)'); ribbon(c, 780, 1595, 170, 38, 'rgba(255,226,210,.9)');
  ribbon(c, 360, 1700, 160, 26, 'rgba(255,240,232,.85)'); ribbon(c, 600, 1690, 150, 24, 'rgba(255,240,232,.85)');
  // 겹겹 언덕: 산호 → 테라코타, 가장자리가 높음
  const hill = (yl, ym, yr, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, yl); c.bezierCurveTo(W * 0.2, yl + (ym - yl) * 0.95, W * 0.35, ym, W * 0.5, ym); c.bezierCurveTo(W * 0.65, ym, W * 0.8, yr + (ym - yr) * 0.95, W, yr); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill(); };
  hill(1640, HY, 1620, '#F9C3A3'); hill(1700, 1795, 1690, '#F4A483');
  mist(c, W, H, 1770, 0.5);
  c.fillStyle = '#E98666'; c.beginPath(); c.moveTo(0, 1560); c.bezierCurveTo(120, 1600, 230, 1760, 330, 1920); c.lineTo(0, 1920); c.fill();
  c.beginPath(); c.moveTo(W, 1540); c.bezierCurveTo(960, 1590, 850, 1760, 750, 1920); c.lineTo(W, 1920); c.fill();
  c.fillStyle = '#D9694B'; c.beginPath(); c.moveTo(0, 1700); c.bezierCurveTo(70, 1730, 140, 1830, 190, 1920); c.lineTo(0, 1920); c.fill();
  c.beginPath(); c.moveTo(W, 1690); c.bezierCurveTo(1010, 1720, 940, 1830, 890, 1920); c.lineTo(W, 1920); c.fill();
  // 언덕 위 작은 나무와 새
  const tree = (x, y, s, col) => { c.fillStyle = col; c.fillRect(x - 2, y - s * 0.5, 4, s * 0.5); c.beginPath(); c.arc(x, y - s * 0.75, s * 0.38, 0, Math.PI * 2); c.fill(); };
  tree(60, 1600, 60, '#C95D42'); tree(105, 1630, 44, '#C95D42'); tree(1010, 1580, 60, '#C95D42'); tree(965, 1610, 44, '#C95D42');
  c.strokeStyle = 'rgba(190,100,75,.6)'; c.lineWidth = 4; c.lineCap = 'round';
  [[200, 1350, 18], [245, 1385, 12], [880, 1340, 16]].forEach(([x, y, s]) => { c.beginPath(); c.moveTo(x - s, y); c.quadraticCurveTo(x - s / 2, y - s * 0.6, x, y); c.quadraticCurveTo(x + s / 2, y - s * 0.6, x + s, y); c.stroke(); });
}

// ── 己 들판: 굽이진 초록 언덕, 줄무늬 밭, 구불구불한 흙길, 먼 산과 덤불
function fields(ctx, W, H) {
  const c = ctx, r = rnd(17);
  // 먼 산 (옅은 청회색)
  c.fillStyle = 'rgba(176,196,214,.55)'; c.beginPath(); c.moveTo(0, 1730);
  [[90, 1680], [180, 1705], [260, 1665], [360, 1712], [470, 1700], [600, 1720], [700, 1690], [800, 1700], [900, 1650], [1000, 1690], [1080, 1670]].forEach(([x, y]) => c.lineTo(x, y));
  c.lineTo(W, 1780); c.lineTo(0, 1780); c.fill();
  // 덤불 줄
  c.fillStyle = '#7BB59A'; for (let x = 0; x < W; x += 34) { const edge = Math.abs(x - W / 2) / (W / 2); if (edge < 0.3) continue; c.beginPath(); c.arc(x, 1735 - edge * 30 + r() * 8, 18 + r() * 12, 0, Math.PI * 2); c.fill(); }
  const hill = (pts, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i += 3) c.bezierCurveTo(...pts[i], ...pts[i + 1], ...pts[i + 2]); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill(); };
  // 왼쪽 줄무늬 밭 언덕
  const fl = new Path2D(); fl.moveTo(0, 1600); fl.bezierCurveTo(140, 1590, 300, 1660, 420, 1760); fl.lineTo(0, 1760); fl.closePath();
  c.fillStyle = '#C9D86A'; c.fill(fl); c.save(); c.clip(fl); c.strokeStyle = '#B4C55A'; c.lineWidth = 7; for (let i = -10; i < 20; i++) { c.beginPath(); c.moveTo(i * 30, 1560); c.lineTo(i * 30 + 160, 1780); c.stroke(); } c.restore();
  hill([[0, 1740], [300, 1730], [500, 1780], [W, 1700]], '#9FCB6B');
  hill([[0, 1700], [200, 1740], [700, 1800], [W, 1640]], '#86BC5C');
  mist(c, W, H, 1760, 0.45);
  // 구불구불한 흙길: 오른쪽 아래에서 가운데 먼 언덕으로
  c.strokeStyle = '#E9D3A4'; c.lineCap = 'round';
  [[34, '#E9D3A4'], [10, '#F5E6C6']].forEach(([lw, col]) => { c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); c.moveTo(1000, 1925); c.bezierCurveTo(900, 1880, 720, 1880, 760, 1830); c.bezierCurveTo(800, 1790, 650, 1775, 600, 1770); c.stroke(); });
  // 앞 언덕 (모서리) + 흰 길 띠
  c.fillStyle = '#5FA34E'; c.beginPath(); c.moveTo(0, 1620); c.bezierCurveTo(110, 1640, 230, 1800, 300, 1925); c.lineTo(0, 1925); c.fill();
  c.fillStyle = '#6FB257'; c.beginPath(); c.moveTo(W, 1600); c.bezierCurveTo(980, 1630, 900, 1700, 860, 1760); c.bezierCurveTo(920, 1800, 1000, 1830, W, 1830); c.fill();
  c.fillStyle = '#4E9443'; c.beginPath(); c.moveTo(0, 1880); c.bezierCurveTo(360, 1860, 720, 1900, W, 1870); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 9; c.beginPath(); c.moveTo(0, 1872); c.bezierCurveTo(360, 1852, 720, 1892, W, 1862); c.stroke();
  mist(c, W, H, 1760, 0.5);
  // 둥근 나무 한 그루씩
  const tree = (x, y, s) => { c.fillStyle = '#6B5A45'; c.fillRect(x - 4, y - s * 0.5, 8, s * 0.5); c.fillStyle = '#3F8F4F'; c.beginPath(); c.arc(x, y - s * 0.7, s * 0.35, 0, Math.PI * 2); c.arc(x - s * 0.22, y - s * 0.55, s * 0.25, 0, Math.PI * 2); c.arc(x + s * 0.22, y - s * 0.55, s * 0.25, 0, Math.PI * 2); c.fill(); };
  tree(70, 1640, 150); tree(1000, 1615, 140);
  // 몽글한 구름 (양쪽)
  const cloud = (x, y, s) => { c.fillStyle = 'rgba(255,255,255,.95)'; [[-0.7, 0.1, 0.4], [-0.2, -0.2, 0.55], [0.35, -0.05, 0.45], [0.8, 0.12, 0.32]].forEach(([dx, dy, rr]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, rr * s, 0, Math.PI * 2); c.fill(); }); c.fillRect(x - s * 1.05, y + s * 0.1, s * 2.1, s * 0.32); c.fillStyle = 'rgba(214,232,244,.8)'; c.fillRect(x - s * 1.05, y + s * 0.34, s * 2.1, s * 0.08); };
  cloud(90, 1330, 70); cloud(990, 1360, 62);
}

// ── 辛 보석: 수채화처럼 번지는 결정 무리 + 흰 테두리
function prism(c, x, base, h, w, ang, cA, cB) {
  c.save(); c.translate(x, base); c.rotate(ang);
  const sh = -h + w * 0.75, faces = [[[-w / 2, 0], [-w / 2, sh], [-w * 0.15, -h], [-w * 0.15, -h * 0.04]], [[-w * 0.15, -h * 0.04], [-w * 0.15, -h], [w * 0.2, -h * 0.97], [w * 0.2, 0]], [[w * 0.2, 0], [w * 0.2, -h * 0.97], [w / 2, sh], [w / 2, 0]]];
  faces.forEach((f, i) => { const g = c.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, i === 1 ? 'rgba(255,255,255,.9)' : cA); g.addColorStop(0.55, i === 2 ? cB : cA); g.addColorStop(1, cB);
    c.fillStyle = g; c.globalAlpha = i === 1 ? 0.85 : 0.92; c.beginPath(); f.forEach(([px, py], k) => (k ? c.lineTo(px, py) : c.moveTo(px, py))); c.closePath(); c.fill(); });
  c.globalAlpha = 1; c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 3.5; c.lineJoin = 'round';
  faces.forEach(f => { c.beginPath(); f.forEach(([px, py], k) => (k ? c.lineTo(px, py) : c.moveTo(px, py))); c.closePath(); c.stroke(); });
  c.restore();
}
function gem(c, x, y, s, cA, cB) { // 작은 브릴리언트 컷
  const g = c.createLinearGradient(x - s, y - s, x + s, y + s); g.addColorStop(0, cA); g.addColorStop(1, cB); c.fillStyle = g;
  c.beginPath(); c.moveTo(x - s, y - s * 0.3); c.lineTo(x - s * 0.55, y - s * 0.75); c.lineTo(x + s * 0.55, y - s * 0.75); c.lineTo(x + s, y - s * 0.3); c.lineTo(x, y + s); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 2.5; c.stroke(); c.beginPath(); c.moveTo(x - s, y - s * 0.3); c.lineTo(x + s, y - s * 0.3); c.moveTo(x - s * 0.3, y - s * 0.3); c.lineTo(x, y + s); c.lineTo(x + s * 0.3, y - s * 0.3); c.stroke();
}
const spark = (c, x, y, s, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(x, y - s); c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s); c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill(); };
function jewels(ctx, W, H) {
  const c = ctx;
  // 바닥에 번진 수채 얼룩
  [[120, 1900, 300, 90, 'rgba(178,226,214,.45)'], [960, 1900, 320, 95, 'rgba(206,196,240,.45)'], [540, 1915, 380, 40, 'rgba(214,226,246,.5)']].forEach(([x, y, rx, ry, col]) => { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill(); });
  // 왼쪽: 민트·아쿠아 무리
  prism(c, 20, 1910, 300, 110, -0.45, 'rgba(160,230,205,.95)', 'rgba(70,190,170,.95)');
  prism(c, 95, 1910, 520, 120, -0.06, 'rgba(190,240,225,.95)', 'rgba(80,200,175,.95)');
  prism(c, 170, 1910, 330, 100, 0.32, 'rgba(170,215,245,.95)', 'rgba(90,165,225,.95)');
  prism(c, 230, 1915, 170, 84, 0.62, 'rgba(205,240,200,.95)', 'rgba(120,205,150,.95)');
  // 오른쪽: 라벤더·분홍·하늘 무리
  prism(c, 1060, 1910, 330, 110, 0.42, 'rgba(240,200,232,.95)', 'rgba(200,120,190,.95)');
  prism(c, 985, 1910, 560, 126, 0.04, 'rgba(222,212,250,.95)', 'rgba(150,130,225,.95)');
  prism(c, 905, 1910, 340, 104, -0.32, 'rgba(200,228,250,.95)', 'rgba(120,175,232,.95)');
  prism(c, 845, 1915, 175, 86, -0.6, 'rgba(250,215,232,.95)', 'rgba(225,140,185,.95)');
  // 가운데: 작은 원석 몇 개 (옅게)
  c.save(); c.globalAlpha = 0.55; [[300, 1890, 14, '#BFEBDD', '#78C9B5'], [370, 1902, 10, '#D9CFF6', '#9F8BE0'], [720, 1898, 12, '#CDE3FA', '#84B4EA'], [790, 1888, 14, '#F6D2E6', '#D98BB8']].forEach(([x, y, s, a, b]) => gem(c, x, y, s, a, b)); c.restore();
  // 떠 있는 보석과 반짝임
  gem(c, 190, 1400, 28, '#CFF3E6', '#6FCDB4'); gem(c, 905, 1360, 30, '#DCE9FB', '#8DB7EC');
  [[60, 1300, 16], [260, 1530, 10], [1030, 1290, 16], [820, 1500, 10], [140, 1600, 8], [960, 1620, 8]].forEach(([x, y, s]) => spark(c, x, y, s, 'rgba(150,140,220,.7)'));
}

// ── 壬 바다: 청록·남색 물결 겹, 흰 물거품 선, 수평선 구름
function swell(c, W, H, base, edgeH, col, freq, phase, amp = 12) {
  const yAt = x => base - edgeH * Math.pow(Math.abs(x - W / 2) / (W / 2), 2.4) - amp * Math.sin(x * freq + phase);
  c.fillStyle = col; c.beginPath(); c.moveTo(0, yAt(0)); for (let x = 0; x <= W; x += 6) c.lineTo(x, yAt(x)); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill();
  return yAt;
}
function foam(c, W, yAt, from, to, lw, col) { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); for (let x = from; x <= to; x += 6) (x === from ? c.moveTo(x, yAt(x) + 2) : c.lineTo(x, yAt(x) + 2)); c.stroke(); }

// ── 癸 빗방울: 세 가지 파랑의 둥근 물방울 무리, 바닥 물웅덩이 물결
function drop(c, x, y, s, col) { c.fillStyle = col; c.beginPath(); c.moveTo(x, y - s * 1.6); c.bezierCurveTo(x + s * 0.2, y - s * 0.9, x + s, y - s * 0.3, x + s, y + s * 0.15); c.arc(x, y + s * 0.15, s, 0, Math.PI); c.bezierCurveTo(x - s, y - s * 0.3, x - s * 0.2, y - s * 0.9, x, y - s * 1.6); c.fill(); c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(x - s * 0.38, y + s * 0.05, s * 0.14, s * 0.3, 0.3, 0, Math.PI * 2); c.fill(); }

// ── 丁 촛불(3차): 어둠 속에서 촛불이 주변을 밝힘. 하단만 어둡게, forTime 뒤는 촛불 빛으로 환하게
function flame(c, x, y, h) {
  const g = c.createRadialGradient(x, y, 2, x, y, h * 4.2); g.addColorStop(0, 'rgba(255,214,140,.75)'); g.addColorStop(0.35, 'rgba(255,170,80,.28)'); g.addColorStop(1, 'rgba(255,150,60,0)');
  c.fillStyle = g; c.beginPath(); c.arc(x, y, h * 4.2, 0, Math.PI * 2); c.fill();
  const shape = (k, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(x, y - h * k); c.bezierCurveTo(x + h * 0.32 * k, y - h * 0.35 * k, x + h * 0.3 * k, y + h * 0.22 * k, x, y + h * 0.28 * k); c.bezierCurveTo(x - h * 0.3 * k, y + h * 0.22 * k, x - h * 0.32 * k, y - h * 0.35 * k, x, y - h * k); c.fill(); };
  shape(1, '#FF9A3C'); shape(0.8, '#FFC95E'); shape(0.55, '#FFF3C8');
  c.fillStyle = 'rgba(120,150,230,.5)'; c.beginPath(); c.ellipse(x, y + h * 0.2, h * 0.08, h * 0.08, 0, 0, Math.PI * 2); c.fill();
}
function pillar(c, x, base, h, w) {
  const top = base - h;
  const g = c.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#9E4A1C'); g.addColorStop(0.35, '#F09A4C'); g.addColorStop(0.6, '#E5823A'); g.addColorStop(1, '#7E3815');
  c.fillStyle = g; c.fillRect(x - w / 2, top, w, h);
  const v = c.createLinearGradient(0, top, 0, top + h * 0.6); v.addColorStop(0, 'rgba(255,214,150,.75)'); v.addColorStop(1, 'rgba(255,214,150,0)'); c.fillStyle = v; c.fillRect(x - w / 2, top, w, h * 0.6);
  c.fillStyle = '#FFC98A'; c.beginPath(); c.ellipse(x, top, w / 2, w * 0.13, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#F6B068'; c.beginPath(); c.ellipse(x + w * 0.42, top + 18, w * 0.07, 22, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#3A2418'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, top); c.quadraticCurveTo(x + 2, top - 8, x - 1, top - 14); c.stroke();
  flame(c, x, top - 14 - w * 0.55, w * 0.9);
}
function candles(ctx, W, H) {
  const c = ctx;
  // 어둠: 위에서 서서히 내려오는 짙은 밤빛
  const dk = c.createLinearGradient(0, 1300, 0, H); dk.addColorStop(0, 'rgba(48,28,30,0)'); dk.addColorStop(0.35, 'rgba(48,28,30,.55)'); dk.addColorStop(0.7, 'rgba(40,22,24,.9)'); dk.addColorStop(1, 'rgba(34,18,20,.97)');
  c.fillStyle = dk; c.fillRect(0, 1300, W, H - 1300);
  // 가운데 초 하나: 불꽃을 중심으로 동그랗게 퍼지는 빛
  const fx = W / 2, fy = 1682;
  [[620, 'rgba(255,170,90,.27)'], [420, 'rgba(255,190,115,.48)'], [250, 'rgba(255,214,150,.75)'], [130, 'rgba(255,236,190,.92)']].forEach(([rr, col]) => {
    const g = c.createRadialGradient(fx, fy, 0, fx, fy, rr); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,170,90,0)'); c.fillStyle = g; c.beginPath(); c.arc(fx, fy, rr, 0, Math.PI * 2); c.fill(); });
  // 탁자 면에 비친 빛
  c.save(); c.translate(fx, 1925); c.scale(1, 0.18); const tb = c.createRadialGradient(0, 0, 0, 0, 0, 420); tb.addColorStop(0, 'rgba(255,200,130,.9)'); tb.addColorStop(1, 'rgba(255,200,130,0)'); c.fillStyle = tb; c.beginPath(); c.arc(0, 0, 420, 0, Math.PI * 2); c.fill(); c.restore();
  pillar(c, fx, 1967, 210, 96); // 20% 아래로: 아래 끝은 카드 밖으로
  // 빛 입자: 불꽃 둘레에 반짝이는 점·별빛 (찰떡 박스 아래쪽 어둠에만)
  const pr = rnd(77), fly = 1682 - 14 - 96 * 0.55 + 10;
  c.save(); c.globalCompositeOperation = 'lighter';
  let n = 0, t = 0;
  while (n < 35 && t++ < 3000) {
    const a = pr() * Math.PI * 2, d = 50 + Math.pow(pr(), 0.8) * 420, x = fx + Math.cos(a) * d * 1.25, y = fly + Math.sin(a) * d * 0.75;
    if (y < 1610 || y > 1915 || (Math.abs(x - fx) < 60 && y > fly + 30)) continue; // 박스 위·초 몸통 위는 피함
    n++;
    const sz = 1.5 + Math.pow(pr(), 2.2) * 5, al = 0.45 + pr() * 0.5;
    const g = c.createRadialGradient(x, y, 0, x, y, sz * 4); g.addColorStop(0, `rgba(255,236,190,${al})`); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.beginPath(); c.arc(x, y, sz * 4, 0, Math.PI * 2); c.fill();
    dot(c, x, y, sz * 0.6, `rgba(255,250,230,${Math.min(1, al + 0.3)})`);
  }
  c.restore();
}

// ── 癸 빗방울(3차): 크기·위치·색이 제각각인 물방울
function rain2(ctx, W, H) {
  const c = ctx, r = rnd(4321), cols = ['#2F7DBA', '#5AAEDD', '#8EC6EA', '#B5D9F0'];
  c.fillStyle = 'rgba(205,229,245,.7)'; c.beginPath(); c.moveTo(0, 1880); c.bezierCurveTo(300, 1860, 780, 1900, W, 1870); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  const ripple = (x, y, s, a) => { c.strokeStyle = `rgba(90,174,221,${a})`; c.lineWidth = 3; [1, 0.6, 0.28].forEach(k => { c.beginPath(); c.ellipse(x, y, s * k, s * k * 0.26, 0, 0, Math.PI * 2); c.stroke(); }); };
  ripple(120, 1895, 90, 0.7); ripple(960, 1890, 100, 0.7); ripple(330, 1905, 46, 0.35); ripple(770, 1903, 58, 0.35); ripple(560, 1912, 30, 0.25);
  const placed = [];
  const blocked = (x, y, s) => (x > 120 && x < 960 && y > 1380 && y < 1620) || (x > 280 && x < 800 && y > 1740 && y < 1870) || (x > 170 && x < 910 && y < 1340) || y > 1880;
  let tries = 0;
  while (placed.length < 32 && tries++ < 4000) {
    const edge = r() < 0.5; // 모서리 쪽에 더 많이
    const x = edge ? (r() < 0.5 ? r() * 270 : W - r() * 270) : 120 + r() * 840;
    const y = 1240 + r() * 650, s = 4 + Math.pow(r(), 1.6) * 18;
    if (blocked(x, y, s) || placed.some(([px, py, ps]) => Math.hypot(px - x, py - y) < (ps + s) * (1.6 + r() * 1.6) + 10)) continue;
    placed.push([x, y, s]);
  }
  placed.forEach(([x, y, s]) => { const ci = s > 15 ? r() < 0.6 ? 0 : 1 : s > 9 ? 1 + Math.floor(r() * 2) : 2 + Math.floor(r() * 2); drop(c, x, y, s, cols[ci]); });
}

// ── 壬 바다(3차): 양옆 솟은 물결 없이 고른 물결 겹
function sea2(ctx, W, H) {
  const c = ctx, r = rnd(29), HY = 1700;
  const sky = c.createLinearGradient(0, 1480, 0, HY); sky.addColorStop(0, 'rgba(206,232,238,0)'); sky.addColorStop(1, 'rgba(206,232,238,.9)'); c.fillStyle = sky; c.fillRect(0, 1480, W, HY - 1480);
  const cloud = (x, y, s) => { c.fillStyle = 'rgba(240,248,236,.95)'; [[-0.6, 0, 0.35], [-0.15, -0.22, 0.5], [0.35, -0.08, 0.4], [0.75, 0.05, 0.28]].forEach(([dx, dy, rr]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, rr * s, Math.PI, 0); c.fill(); }); c.fillRect(x - s * 1.1, y - 1, s * 2.2, 8); };
  cloud(110, HY - 4, 110); cloud(950, HY - 4, 100); cloud(320, HY - 2, 46); cloud(760, HY - 2, 40);
  c.fillStyle = '#B4D9E0'; c.fillRect(0, HY, W, H - HY);
  for (let i = 0; i < 22; i++) { const x = r() * W, y = HY + 8 + r() * 50; c.fillStyle = 'rgba(255,255,255,.65)'; c.fillRect(x, y, 26 + r() * 60, 3); }
  const y1 = swell(c, W, H, 1785, 22, '#8EC0CD', 0.02, 0.4, 9); foam(c, W, y1, 0, W, 3, 'rgba(255,255,255,.7)');
  const y2 = swell(c, W, H, 1850, 26, '#6AA3B7', 0.017, 1.7, 11); foam(c, W, y2, 0, 260, 4, 'rgba(255,255,255,.85)'); foam(c, W, y2, 820, W, 4, 'rgba(255,255,255,.85)');
  mist(c, W, H, 1770, 0.5);
  const y3 = swell(c, W, H, 1905, 20, '#3F7896', 0.022, 2.9, 10); foam(c, W, y3, 0, W, 5, 'rgba(225,240,244,.9)');
  c.strokeStyle = 'rgba(210,235,240,.75)'; c.lineWidth = 3; c.lineCap = 'round';
  [[40, 1740, 90], [180, 1760, 60], [870, 1745, 90], [990, 1765, 60], [60, 1820, 100], [930, 1825, 100], [200, 1885, 70], [800, 1880, 70]].forEach(([x, y, w]) => { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + w / 2, y - 8, x + w, y); c.stroke(); });
  c.strokeStyle = 'rgba(60,100,130,.55)'; c.lineWidth = 4;
  [[150, 1500, 20], [205, 1540, 14], [920, 1480, 18], [960, 1520, 12]].forEach(([x, y, s]) => { c.beginPath(); c.moveTo(x - s, y); c.quadraticCurveTo(x - s / 2, y - s * 0.6, x, y); c.quadraticCurveTo(x + s / 2, y - s * 0.6, x + s, y); c.stroke(); });
}

S = { flowers, sun, candles, fields, jewels, sea2, rain2 };
}
// 천간 순서대로 (s = 0~9)
export function drawTypeBg(ctx, W, H, s) {
  const fns = [forest, S.flowers, S.sun, S.candles, mountains, S.fields, rocks, S.jewels, S.sea2, S.rain2];
  (fns[s] || forest)(ctx, W, H);
}
