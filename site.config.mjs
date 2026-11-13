// forTime 사이트 설정 — 배포 전에 이 파일만 고치면 됩니다.
export default {
  // 실제 구매한 도메인 (끝에 / 없이)
  siteUrl: 'https://fortuneintime.pages.dev', // 도메인을 사면 그 주소(https://도메인)로 바꾸세요
  brand: 'forTime',

  // 문의 이메일 (정책 페이지와 문의 페이지에 표시됨)
  contactEmail: 'contact@fortuneintime.com',

  // 애드센스: 승인 후 'ca-pub-XXXXXXXXXXXXXXXX' 형태로 입력. 비워 두면 광고 자리만 표시됩니다.
  adsense: {
    client: '',
    // 애드센스에서 만든 광고 단위 ID (data-ad-slot 값)
    slots: {
      A: '', // 운명 바꾸기 카드 아래 (디스플레이)
      B: '', // 분야별 운세 아래 (인피드)
      C: '', // 행운 번호 뒤집은 뒤 (디스플레이)
      tab: '', // 궁합/타임머신/부적 탭 하단
      content: '', // 정적 운세 페이지 본문 중간
    },
  },

  // 구글 지도 API 키 ('지금 나에게 필요한 장소는?' 지도). 비워 두면 내장 세계지도를 씁니다.
  // Google Cloud에서 Maps JavaScript API를 켜고, 키 제한을 내 도메인(https://내도메인/*)으로 걸어 두세요.
  googleMapsKey: '',

  // Google Analytics 4 측정 ID (예: 'G-XXXXXXX'). 비워 두면 넣지 않습니다.
  ga4: '',


  // 이미지 파일 — 같은 이름으로 덮어쓰면 그대로 반영됩니다.
  images: {
    master: '/images/master.jpg', // 명인 해운정사
    hana: '/images/hana.jpg',     // 명인 하나 (연애·대인관계)
    dohan: '/images/dohan.jpg',   // 명인 도한 (직장·사업)
    charms: {
      achieve: '/images/charm/achieve.jpg',
      noble: '/images/charm/noble.jpg',
      health: '/images/charm/health.jpg',
      luck: '/images/charm/luck.jpg',
      peace: '/images/charm/peace.jpg',
      guard: '/images/charm/guard.jpg',
      allwell: '/images/charm/allwell.jpg',
      ward: '/images/charm/ward.jpg',
      wealth: '/images/charm/wealth.jpg',
      wish: '/images/charm/wish.jpg',
    },
  },
};
