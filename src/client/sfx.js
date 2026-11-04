// 귀여운 효과음: 소리 파일 없이 Web Audio로 직접 만듦(8비트 게임 느낌)
// begin()은 반드시 사용자가 누른 순간(클릭) 안에서 불러야 소리가 남(브라우저 자동재생 규칙)
// 모든 시간은 begin()을 부른 순간부터의 초
let ctx = null, master = null, base = 0, noiseBuf = null;
const KEY = 'ttf.sfx';

export function isOn() { try { return localStorage.getItem(KEY) !== 'off'; } catch { return true; } }
export function setOn(v) { try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch { /* 저장 불가 */ } if (!v) stop(); }

export function begin() {
  if (!isOn()) { master = null; return false; }
  try {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    ctx = ctx || new AC();
    if (ctx.state === 'suspended') ctx.resume();
    master = ctx.createGain(); master.gain.value = 0.22; master.connect(ctx.destination);
    base = ctx.currentTime + 0.03;
    if (!noiseBuf) { noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    return true;
  } catch { master = null; return false; }
}
export function stop() {
  if (!ctx || !master) return;
  const m = master; master = null;
  try { m.gain.cancelScheduledValues(ctx.currentTime); m.gain.setTargetAtTime(0, ctx.currentTime, 0.04); setTimeout(() => m.disconnect(), 400); } catch { /* 무시 */ }
}

// 음 하나: 파형, 시작, 길이, 시작·끝 주파수, 크기
function tone(type, at, dur, f0, f1 = f0, vol = 0.5) {
  if (!master) return;
  const t = base + at, o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.02);
}
// 잡음(바람·엔진 소리)
function noise(at, dur, { type = 'bandpass', f0 = 800, f1 = f0, q = 1, vol = 0.4, attack = 0.02, release = 0.1 } = {}) {
  if (!master) return null;
  const t = base + at, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; s.loop = true;
  f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.setValueAtTime(vol, t + Math.max(attack, dur - release)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + dur + 0.05);
  return f;
}
const N = n => 440 * Math.pow(2, (n - 69) / 12); // MIDI 번호 → 주파수

export const tick = at => tone('square', at, 0.03, 2200, 2200, 0.12);
export const sigh = at => { tone('triangle', at, 0.75, 520, 210, 0.35); noise(at, 0.7, { f0: 900, f1: 400, vol: 0.06 }); };
export const alert = at => { tone('square', at, 0.07, N(79), N(79), 0.25); tone('square', at + 0.08, 0.1, N(86), N(86), 0.25); };
export const whoosh = at => noise(at, 0.38, { f0: 600, f1: 3200, q: 2, vol: 0.35, release: 0.2 });
export const bonk = (at, k = 1) => tone('sine', at, 0.14, 320 * k, 140 * k, 0.5);
export const sparkle = at => [84, 88, 91, 96].forEach((n, i) => tone('triangle', at + i * 0.06, 0.12, N(n), N(n), 0.28));
export const boing = at => tone('sine', at, 0.26, 260, 760, 0.45);
export const pop = at => { tone('sine', at, 0.09, 950, 380, 0.5); tone('triangle', at + 0.05, 0.08, N(84), N(84), 0.2); };
export const chime = at => { tone('sine', at, 0.38, N(76), N(76), 0.35); tone('sine', at + 0.34, 0.5, N(72), N(72), 0.35); };
export const takeoff = at => noise(at, 1.2, { type: 'lowpass', f0: 300, f1: 1800, vol: 0.18, attack: 0.3, release: 0.5 });
// 걷는 동안 흐르는 짧은 멜로디와 발소리, 캐리어 바퀴 소리
export function walkTune(at, dur) {
  const mel = [72, 76, 79, 76, 77, 81, 79, 0, 72, 76, 79, 84, 83, 79, 81, 0];
  const step = 0.18, n = Math.floor(dur / step);
  for (let i = 0; i < n; i++) {
    const m = mel[i % mel.length];
    if (m) tone('square', at + i * step, step * 0.8, N(m), N(m), 0.11);
    if (i % 2 === 0) tone('triangle', at + i * step, 0.05, 180, 120, 0.25);
  }
  noise(at, dur, { f0: 2500, q: 6, vol: 0.03, attack: 0.1, release: 0.2 });
}
// 지도 비행: 엔진 소리(낮은 웅웅 + 바람), 가까워졌다 멀어지는 느낌, 도착하면 딩동
export function flight(dur) {
  if (!master) return;
  const t = base;
  const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  o.type = 'sawtooth'; o.frequency.setValueAtTime(95, t); o.frequency.linearRampToValueAtTime(130, t + dur * 0.5); o.frequency.linearRampToValueAtTime(100, t + dur);
  f.type = 'lowpass'; f.frequency.value = 420;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.5);
  g.gain.setValueAtTime(0.16, t + dur - 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + dur + 0.05);
  const nf = noise(0, dur, { type: 'lowpass', f0: 500, f1: 500, vol: 0.2, attack: 0.5, release: 0.7 });
  if (nf) { nf.frequency.setValueAtTime(500, t); nf.frequency.linearRampToValueAtTime(1600, t + dur * 0.5); nf.frequency.linearRampToValueAtTime(600, t + dur); }
  chime(dur + 0.05);
}
