// 절기(12절) 시각 표 생성: `node scripts/make-jieqi.mjs` → src/jieqi.js
// lunar-javascript(MIT)의 천문 계산으로 1899~2101년 12절(입춘·경칩·청명·입하·망종·소서·입추·백로·한로·입동·대설·소한)의 정확한 시각을 구해
// UTC 기준 분(1900-01-01 00:00 UTC부터)으로 저장합니다. 브라우저는 이 표만 쓰므로 큰 라이브러리를 내려받지 않습니다.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { Lunar } = require('lunar-javascript');
const JIE = { '立春': 1, '惊蛰': 2, '清明': 3, '立夏': 4, '芒种': 5, '小暑': 6, '立秋': 7, '白露': 8, '寒露': 9, '立冬': 10, '大雪': 11, '小寒': 0,
  LI_CHUN: 1, JING_ZHE: 2, DA_XUE: 11, XIAO_HAN: 0 }; // 값: 절이 여는 달의 지지 순서(0=丑월 시작인 소한 … 1=寅월 입춘 …)
const BASE = Date.UTC(1900, 0, 1);
const seen = new Map();
for (let y = 1898; y <= 2102; y++) {
  const t = Lunar.fromYmd(y, 6, 1).getJieQiTable();
  for (const [name, s] of Object.entries(t)) {
    if (!(name in JIE)) continue;
    // lunar-javascript의 시각은 중국 표준시(UTC+8)
    const ms = Date.UTC(s.getYear(), s.getMonth() - 1, s.getDay(), s.getHour(), s.getMinute(), s.getSecond()) - 8 * 3600e3;
    const min = Math.round((ms - BASE) / 60000);
    seen.set(min, JIE[name]);
  }
}
const list = [...seen.entries()].sort((a, b) => a[0] - b[0]).filter(([m]) => m >= (Date.UTC(1899, 0, 1) - BASE) / 60000 && m <= (Date.UTC(2102, 0, 1) - BASE) / 60000);
// 순서 검증: 지지 순서가 0,1,2,…,11,0… 으로 이어져야 함
for (let i = 1; i < list.length; i++) if ((list[i - 1][1] + 1) % 12 !== list[i][1]) throw new Error('절기 순서 오류 ' + i);
fs.writeFileSync(new URL('../src/jieqi.js', import.meta.url), `// 자동 생성 파일 (scripts/make-jieqi.mjs). 12절의 시각: 1900-01-01 00:00 UTC부터 지난 분(分)
// JIE_FIRST: 첫 항목의 절 번호(0=소한 1=입춘 2=경칩 … 11=대설), 이후 차례대로 1씩 증가
export const JIE_FIRST = ${list[0][1]};
export const JIE_MIN = [${list.map(x => x[0]).join(',')}];
`);
console.log('절기', list.length, '개, 첫 번호', list[0][1]);
