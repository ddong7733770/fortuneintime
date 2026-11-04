// 전 세계 국가 목록과 진태양시 보정값 생성: `node scripts/make-countries.mjs` → src/countries.js
// 보정값(분) = 나라 중심 경도 × 4 − 표준시 기준 경도(시간대 오프셋). 시간대가 여러 개인 나라는 0(보정 안 함).
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const wc = require('world-countries');
const ct = require('countries-and-timezones');

// 사람이 살지 않는 지역은 제외
const SKIP = new Set(['AQ', 'BV', 'HM', 'GS', 'UM', 'TF', 'IO', 'PN']);
// 대표 도시 기준으로 직접 정한 값(기존 값 유지)
const MANUAL = { KR: -32, JP: 19, CN: -14, TW: 6, HK: 36, US: 0, ES: -75, MX: -36, ID: 7 };

const out = {};
for (const c of wc) {
  const code = c.cca2;
  if (SKIP.has(code)) continue;
  if (code in MANUAL) { out[code] = MANUAL[code]; continue; }
  const tzs = (ct.getCountry(code)?.timezones || []).map(t => ct.getTimezone(t)?.utcOffset).filter(v => v !== undefined);
  const offsets = [...new Set(tzs)];
  if (offsets.length !== 1 || !c.latlng) { out[code] = 0; continue; }
  out[code] = Math.round(c.latlng[1] * 4 - offsets[0]);
  if (Math.abs(out[code]) > 180) out[code] = 0; // 비정상 값 방지
}
const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => (a < b ? -1 : 1)));
fs.writeFileSync(new URL('../src/countries.js', import.meta.url), `// 자동 생성 파일 (scripts/make-countries.mjs). 나라 코드 → 진태양시 보정(분)
export const COUNTRY_SOLAR = ${JSON.stringify(sorted)};
`);
console.log('countries:', Object.keys(sorted).length);
