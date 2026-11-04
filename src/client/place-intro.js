// '지금 나에게 필요한 장소는?' 출발 장면 (2D 픽셀, 7초)
// 지친 얼굴로 밤샘하던 내가 → 노트북과 책을 던져 버리고 → 캐리어를 끌고 공항으로 떠남
// 96×60 픽셀 캔버스를 화면 크기에 맞춰 확대해서 그림(image-rendering: pixelated)
import * as SFX from './sfx.js';

const W = 96, H = 60, FLOOR = 50;
export const INTRO_SEC = 7.2;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const easeOut = k => 1 - Math.pow(1 - k, 3);
const easeInOut = k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// 실제 시간(0~7.2초) → 장면 시간(0~6.55)
// 0~1.8 지침 · 1.8~3.3 던지고 점프 · 3.3~4.9 공항까지 걷기 · 4.9~5.2 공항 입장 · 1초 뒤 6.2~7.0 비행기 이륙 → 지도
const MAP = [[0, 0], [1.8, 1.3], [3.3, 2.8], [4.9, 4.4], [5.2, 4.55], [7.2, 6.55]];
const END = 6.55, T_ENTER = 4.4, T_IN = 4.55, T_PLANE = 5.55, T_PLANE_END = 6.4;
function sceneTime(t) {
  for (let i = 1; i < MAP.length; i++) {
    const [r0, s0] = MAP[i - 1], [r1, s1] = MAP[i];
    if (t <= r1) return s0 + (s1 - s0) * clamp((t - r0) / (r1 - r0), 0, 1);
  }
  return END;
}
const realTime = s => { for (let i = 1; i < MAP.length; i++) { const [r0, s0] = MAP[i - 1], [r1, s1] = MAP[i]; if (s <= s1) return r0 + (r1 - r0) * (s - s0) / (s1 - s0); } return INTRO_SEC; };

// 3×5 픽셀 글자
const FONT = {
  A: ['010', '101', '111', '101', '101'], I: ['111', '010', '010', '010', '111'], R: ['110', '101', '110', '101', '101'],
  P: ['110', '101', '110', '100', '100'], O: ['010', '101', '101', '101', '010'], T: ['111', '010', '010', '010', '010'],
};

function makeCanvas(el) {
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H; cv.className = 'pintro';
  el.innerHTML = ''; el.append(cv);
  const g = cv.getContext('2d');
  g.imageSmoothingEnabled = false;
  return { cv, g };
}

// 원래 색 구성(여러 색)
const COL = {
  sky: '#0E1430', star: '#F3E2B0', wall: '#1D2650', wall2: '#27306A', winSky: '#0B1028', moon: '#F3E2B0',
  desk: '#6B4A2E', deskTop: '#8A623D', floor: '#2C3768', roomFloor: '#232B5C', dash: '#C9A24A',
  laptop: '#9AA3B5', laptopDk: '#5E6678', glow: '#7FD1FF',
  skin: '#F2C9A0', hair: '#2A2238', shirt: '#6A7796', shirtHi: '#8FB5E8', pants: '#2E3550', shoe: '#14141C',
  eye: '#1A1A22', bag: '#9C86B5', blush: '#F09A9A', mouth: '#5A1E1E', tongue: '#D9534F',
  cloud: '#4A4F66', rain: '#7FA8D9', sweat: '#9FD3FF', bang: '#F3E2B0',
  case: '#C9A24A', caseDk: '#8A6A20', wheel: '#14141C',
  city: '#1B2350', cityLit: '#E8C547', term: '#2C3768', termGlass: '#7FD1FF', termRoof: '#C9A24A', plane: '#F3E2B0',
  books: ['#B3261E', '#3F7D5C', '#C9A24A', '#5E7BC9'],
};

// ── 장면 그리기 (t = 장면 시간 0~5)
function draw(g, t) {
  const R = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), w, h); };
  const text = (s, x, y, c) => { [...s].forEach((ch, n) => FONT[ch].forEach((row, j) => [...row].forEach((b, i) => { if (b === '1') R(x + n * 4 + i, y + j, 1, 1, c); }))); };

  // 인물 위치(월드 좌표)와 카메라
  const tJump = seg(t, 2.3, 2.7), tWalk = seg(t, 2.8, T_ENTER);
  let cx = 44;
  if (t >= 2.3) cx = lerp(44, 70, easeInOut(tJump));
  if (t >= 2.8) cx = lerp(70, 200, tWalk);
  const cam = clamp(cx - 46, 0, 154);
  const sx = wx => wx - cam;

  // 밤하늘 + 별
  R(0, 0, W, H, COL.sky);
  for (let i = 0; i < 18; i++) { const x = ((i * 37) % 130) - cam * 0.15; if (((t * 3 + i) % 5) > 0.6) R(((x % 110) + 110) % 110 - 7, (i * 13) % 22, 1, 1, COL.star); }
  // 도시 실루엣(느리게 흐름)
  for (let i = 0; i < 14; i++) {
    const bx = i * 14 - cam * 0.45, bw = 10 + (i * 7) % 5, bh = 12 + (i * 11) % 14;
    const x = ((bx % 196) + 196) % 196 - 20;
    R(x, FLOOR - bh, bw, bh, COL.city);
    for (let r = 0; r < bh - 4; r += 4) for (let c = 2; c < bw - 2; c += 3) if (((i + r + c) * 7) % 5 === 0) R(x + c, FLOOR - bh + 2 + r, 1, 1, COL.cityLit);
  }
  // 바닥과 도로
  R(0, FLOOR, W, H - FLOOR, COL.floor);
  for (let i = -1; i < 9; i++) { const x = ((i * 14 - cam) % 112 + 112) % 112 - 14; R(x, FLOOR + 5, 6, 1, COL.dash); }

  // 공항(오른쪽 끝): 이륙하는 비행기, 터미널과 AIRPORT 간판, 관제탑
  const ax = sx(170);
  if (ax < W + 2) {
    const kp = seg(t, T_PLANE, T_PLANE_END);
    if (kp > 0 && kp < 1) {
      const px = sx(lerp(200, 246, kp)), py = lerp(32, -8, kp * (0.55 + 0.45 * kp));
      R(px, py + 1, 13, 3, COL.plane); R(px + 13, py + 2, 2, 1, COL.plane); R(px, py - 2, 2, 3, COL.plane);   // 몸통·꼬리
      R(px + 5, py - 2, 3, 3, COL.plane); R(px + 4, py + 4, 5, 2, COL.plane);                                    // 날개
      for (let w = 0; w < 4; w++) R(px + 4 + w * 2, py + 2, 1, 1, '#7FD1FF');                                    // 창문
    }
    R(ax, 28, 52, FLOOR - 28, COL.term);
    R(ax - 2, 26, 56, 2, COL.termRoof);
    for (let c = 0; c < 6; c++) R(ax + 3 + c * 8, 32, 5, 7, COL.termGlass);
    R(ax + 25, 41, 10, 9, '#0B1028');                         // 출입문
    const open = t >= T_ENTER - 0.1 && t < T_IN + 0.25;
    R(ax + 26, 42, 8, 8, open ? '#F3E2B0' : t >= T_IN ? '#E8C547' : '#3A4680'); // 다가가면 문이 열리고, 들어간 뒤 닫힘
    if (!open) R(ax + 30, 42, 1, 8, '#0B1028');
    R(ax + 10, 18, 32, 8, COL.termRoof); R(ax + 11, 19, 30, 6, '#E8C547');
    R(ax + 12, 26, 1, 1, COL.caseDk); R(ax + 39, 26, 1, 1, COL.caseDk);
    text('AIRPORT', ax + 13, 20, '#141B36');                   // 간판
    R(ax + 58, 12, 4, FLOOR - 12, COL.term);                   // 관제탑
    R(ax + 55, 8, 10, 5, COL.termRoof); R(ax + 56, 9, 8, 2, COL.termGlass);
    if (Math.floor(t * 4) % 2) R(ax + 59, 6, 2, 2, '#E5484D');
  }

  // 방(왼쪽): 벽, 창문과 달, 새벽 3시 시계, 방문 틀
  const rx = sx(0);
  if (rx + 104 > 0) {
    R(rx - 10, 0, 112, FLOOR, COL.wall);
    R(rx - 10, FLOOR - 3, 112, 3, COL.wall2);
    R(rx - 10, FLOOR, 112, H - FLOOR, COL.roomFloor);
    R(rx + 68, 7, 18, 14, COL.wall2); R(rx + 69, 8, 16, 12, COL.winSky); R(rx + 76, 8, 1, 12, COL.wall2); R(rx + 69, 13, 16, 1, COL.wall2);
    R(rx + 80, 9, 3, 3, COL.moon); R(rx + 81, 9, 2, 1, COL.winSky);
    R(rx + 12, 8, 7, 7, COL.wall2); R(rx + 13, 9, 5, 5, '#E9E3D3'); R(rx + 15, 10, 1, 2, COL.eye); R(rx + 15, 11, 2, 1, COL.eye);
    R(rx + 98, 20, 4, FLOOR - 20, COL.wall2);
  }

  // 표정·자세 단계
  const mood = t < 1.3 ? 'tired' : t < 2.0 ? 'angry' : 'happy';
  const stand = seg(t, 1.3, 1.5);
  let ty = t < 1.3 ? 31 + (Math.floor(t * 2) % 2) : lerp(31, 28, stand);
  if (t >= 2.3 && t < 2.7) ty = 28 - Math.sin(Math.PI * tJump) * 9;
  if (t >= 2.8) ty = 28 - (Math.floor(t * 8) % 2);
  const arms = t >= 1.35 && t < 1.85 ? 'up' : t >= 2.8 ? 'pull' : t >= 2.3 && t < 2.7 ? 'up' : 'down';
  const walkF = t >= 2.8 ? Math.floor(t * 8) % 2 : -1;
  const pcx = sx(cx);

  // 머리 위 먹구름과 빗방울(지친 단계), 흩어지는 구름(던지는 단계)
  if (t < 1.9) {
    const k = seg(t, 1.45, 1.9);
    const blobs = [[-6, 0, 5, 3], [-3, -2, 6, 4], [2, -1, 5, 3], [-1, 1, 6, 2]];
    blobs.forEach(([x, y, w, h], i) => {
      const dx = (i - 1.5) * 18 * k, dy = -10 * k;
      if (k < 1 && (k < 0.5 || (Math.floor(t * 20) + i) % 2)) R(pcx + x + dx, 20 + y + dy, w, h, COL.cloud);
    });
    if (t < 1.3) for (let i = 0; i < 3; i++) { const yy = 24 + ((t * 18 + i * 3) % 7); R(pcx - 4 + i * 4, yy, 1, 2, COL.rain); }
  }

  const inside = t >= T_IN;
  if (!inside) drawPerson(R, pcx, ty, mood, t >= T_ENTER ? 'down' : arms, t >= T_ENTER ? -1 : walkF, t);

  // 캐리어
  if (t >= 2.7 && !inside) {
    const pop = seg(t, 2.7, 2.85), s = pop < 1 ? 0.5 + pop * 0.6 : 1;
    const cw = Math.round(7 * s), ch = Math.round(8 * s);
    const kx = pcx - 9 - (walkF === 1 ? 1 : 0), ky = FLOOR - ch - 1;
    R(kx, ky, cw, ch, COL.case); R(kx, ky + Math.round(3 * s), cw, 1, COL.caseDk); R(kx + 1, ky + 1, 1, ch - 2, '#E8C547');
    R(kx + cw - 1, ky - 4, 1, 4, COL.caseDk); R(kx + cw - 1, ky - 5, 3, 1, COL.caseDk);
    R(kx, FLOOR - 1, 2, 1, COL.wheel); R(kx + cw - 2, FLOOR - 1, 2, 1, COL.wheel);
    if (pop < 1) sparkle(R, kx + cw / 2, ky - 2, t);
  }

  // 책상과 노트북·책
  const dx = sx(32);
  if (dx + 30 > 0) {
    R(dx, 44, 28, 2, COL.deskTop); R(dx + 1, 46, 26, 1, COL.desk); R(dx + 2, 47, 2, 3, COL.desk); R(dx + 24, 47, 2, 3, COL.desk);
    if (t < 1.55) {
      R(dx + 8, 39, 9, 5, COL.laptop); R(dx + 9, 40, 7, 3, COL.laptopDk); R(dx + 7, 43, 11, 1, COL.laptop);
      if (Math.floor(t * 6) % 2) R(dx + 12, 41, 1, 1, COL.glow);
      COL.books.forEach((c, i) => R(dx + 1, 42 - i * 2, 6, 2, c));
      R(dx + 1, 34, 6, 2, COL.books[0]);
      R(dx + 20, 43, 5, 1, '#E9E3D3'); R(dx + 21, 42, 4, 1, '#E9E3D3');
    }
  }
  // 날아가는 노트북·책·종이
  if (t >= 1.55 && t < 2.6) {
    const k = seg(t, 1.55, 2.4), o = sx(44);
    const lx = o - 70 * k, ly = 38 - 30 * Math.sin(Math.PI * Math.min(1, k * 0.9)) + 20 * k * k;
    if (Math.floor(t * 14) % 2) { R(lx, ly, 9, 6, COL.laptop); R(lx + 1, ly + 1, 7, 4, COL.laptopDk); } else { R(lx, ly + 2, 11, 2, COL.laptop); }
    COL.books.forEach((c, i) => {
      const bk = clamp(k * (1.1 + i * 0.15), 0, 1);
      const bx = o + (18 + i * 14) * bk, by = 36 - (18 + i * 5) * Math.sin(Math.PI * bk * 0.8) + 14 * bk * bk;
      if ((Math.floor(t * 12) + i) % 2) R(bx, by, 5, 2, c); else R(bx + 1, by - 1, 2, 5, c);
    });
    for (let i = 0; i < 6; i++) {
      const pk = seg(t, 1.6 + i * 0.05, 2.6);
      const pxp = o - 10 + i * 6 + Math.sin(t * 10 + i) * 3, pyp = 30 - 12 * Math.sin(Math.PI * Math.min(1, pk * 1.4)) + 30 * pk;
      if (pk > 0 && pk < 1) R(pxp, pyp, 2, 2, '#E9E3D3');
    }
  }
  // 느낌표와 반짝임
  if (t >= 1.3 && t < 1.75) { R(pcx - 1, ty - 9, 2, 4, COL.bang); R(pcx - 1, ty - 4, 2, 1, COL.bang); }
  if (t >= 2.0 && t < 2.45) { sparkle(R, pcx - 7, ty + 1, t); sparkle(R, pcx + 7, ty - 2, t + 0.3); }
  if (t >= T_IN && t < T_IN + 0.35) { sparkle(R, pcx - 6, 40, t); sparkle(R, pcx + 6, 37, t + 0.2); } // 입장 반짝

  // 마지막은 어둡게 → 지도로 이어짐
  const f = seg(t, END - 0.3, END);
  if (f > 0) { g.globalAlpha = f; R(0, 0, W, H, '#0F1531'); g.globalAlpha = 1; }
}

function sparkle(R, x, y, t) {
  const on = Math.floor(t * 12) % 2;
  R(x, y - (on ? 2 : 1), 1, on ? 5 : 3, '#F3E2B0'); R(x - (on ? 2 : 1), y, on ? 5 : 3, 1, '#F3E2B0');
}

// 인물: 머리 9×8, 몸 7×8, 다리 6. cx는 몸 가운데, ty는 머리 위쪽
function drawPerson(R, cx, ty, mood, arms, walkF, t) {
  const P = (dx, dy, c, w = 1, h = 1) => R(cx + dx, ty + dy, w, h, c);
  const legY = 16;
  if (ty > 29.5) { /* 앉아 있을 때는 다리가 책상 뒤에 가려짐 */ }
  else if (walkF === -1) { P(-3, legY, COL.pants, 2, 5); P(1, legY, COL.pants, 2, 5); P(-3, legY + 5, COL.shoe, 3, 1); P(1, legY + 5, COL.shoe, 3, 1); }
  else if (walkF === 0) { P(-4, legY, COL.pants, 2, 5); P(2, legY, COL.pants, 2, 5); P(-5, legY + 5, COL.shoe, 3, 1); P(2, legY + 5, COL.shoe, 3, 1); }
  else { P(-2, legY, COL.pants, 2, 5); P(0, legY, COL.pants, 2, 5); P(-2, legY + 5, COL.shoe, 3, 1); P(0, legY + 5, COL.shoe, 3, 1); }
  P(-3, 8, COL.shirt, 7, 8);
  P(-1, 8, mood === 'happy' ? COL.shirtHi : '#5A6680', 3, 1);
  if (arms === 'up') { P(-5, 3, COL.shirt, 2, 6); P(4, 3, COL.shirt, 2, 6); P(-5, 2, COL.skin, 2, 1); P(4, 2, COL.skin, 2, 1); }
  else if (arms === 'pull') { P(4, 9, COL.shirt, 1, 5); P(4, 14, COL.skin); P(-4, 9, COL.shirt, 1, 2); P(-5, 11, COL.shirt, 1, 1); P(-6, 12, COL.skin); }
  else { P(-4, 9, COL.shirt, 1, 5); P(4, 9, COL.shirt, 1, 5); P(-4, 14, COL.skin); P(4, 14, COL.skin); }
  P(-4, 0, COL.skin, 9, 8);
  P(-4, 0, COL.hair, 9, 2); P(-4, 2, COL.hair, 1, 2); P(4, 2, COL.hair, 1, 2);
  if (mood === 'tired') {
    P(-4, 2, COL.hair, 3, 1); P(3, 0, COL.hair, 2, 3);
    P(-3, 4, COL.eye, 2, 1); P(2, 4, COL.eye, 2, 1);
    P(-3, 5, COL.bag, 2, 1); P(2, 5, COL.bag, 2, 1);
    P(0, 6, COL.mouth); P(-1, 7, COL.mouth); P(1, 7, COL.mouth);
    if (Math.floor(t * 2.5) % 3 === 0) P(5, 3, COL.sweat, 1, 2);
  } else if (mood === 'angry') {
    P(-3, 2, COL.eye); P(-2, 3, COL.eye); P(3, 2, COL.eye); P(2, 3, COL.eye);
    P(-2, 4, COL.eye); P(2, 4, COL.eye);
    P(-1, 6, COL.mouth, 3, 2); P(0, 7, COL.tongue);
  } else {
    P(-3, 4, COL.eye); P(-2, 3, COL.eye); P(-1, 4, COL.eye);
    P(1, 4, COL.eye); P(2, 3, COL.eye); P(3, 4, COL.eye);
    P(-2, 6, COL.mouth); P(-1, 7, COL.mouth, 3, 1); P(2, 6, COL.mouth);
    P(-4, 6, COL.blush); P(4, 6, COL.blush);
  }
}

// 장면에 맞춘 소리(실제 시간 기준, 초)
function scoreSounds() {
  const at = s => realTime(s);
  [0.1, 0.6, 1.1, 1.6].forEach(x => SFX.tick(x));             // 새벽 시계 소리
  SFX.sigh(0.7);                                              // 휴… 하는 한숨
  SFX.alert(at(1.3));                                         // 느낌표
  SFX.whoosh(at(1.55)); SFX.bonk(at(1.75)); SFX.bonk(at(1.9), 0.8);
  SFX.sparkle(at(2.0));                                       // 반짝
  SFX.boing(at(2.3));                                         // 점프
  SFX.pop(at(2.7));                                           // 캐리어 등장
  SFX.walkTune(at(2.8), at(T_ENTER) - at(2.8));              // 신나는 발걸음
  SFX.pop(at(T_IN));                                          // 문 안으로 쏙
  SFX.chime(at(T_IN) + 0.2);                                  // 공항 안내음
  SFX.takeoff(at(T_PLANE));                                   // 1초 뒤 이륙
}

// 대기 화면: 첫 장면을 멈춘 채로
export function drawIntroIdle(el) { const { g } = makeCanvas(el); draw(g, 0.2); }
// 특정 시점(장면 시간)의 한 장면만 그림(미리보기·점검용)
export function drawIntroAt(el, t) { const { g } = makeCanvas(el); draw(g, t); }

// 출발 장면 재생(7초). 화면을 누르면 건너뛰기
export function playIntro(el, { reduce = false } = {}) {
  if (reduce) return Promise.resolve();
  const { cv, g } = makeCanvas(el);
  SFX.begin(); scoreSounds();
  return new Promise(resolve => {
    let t0 = null, skip = false, done = false;
    cv.addEventListener('click', () => { skip = true; SFX.stop(); }, { once: true });
    const step = now => {
      if (done) return;
      if (t0 === null) t0 = now;
      let t = (now - t0) / 1000;
      if (skip) t = INTRO_SEC;
      draw(g, sceneTime(Math.min(t, INTRO_SEC)));
      if (t >= INTRO_SEC) { done = true; resolve(); return; }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
