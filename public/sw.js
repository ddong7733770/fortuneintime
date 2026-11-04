// 예전에 설치된 서비스 워커를 스스로 지우는 파일(홈 화면 추가 기능 삭제에 따른 정리용).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.registration.unregister()));
