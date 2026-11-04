// Cloudflare Pages 고급 모드 워커: /api/geo 하나만 처리하고 나머지는 정적 파일을 그대로 돌려줍니다.
// 접속 IP로 Cloudflare가 추정한 대략의 위치(도시 수준)를 알려 주며, 아무것도 저장하지 않습니다.
// _routes.json 덕분에 /api/*와 옛 12시진 주소에만 실행되어 무료 요청 한도를 아낍니다.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/geo') {
      const cf = request.cf || {};
      const body = {
        lat: cf.latitude ? Number(cf.latitude) : null,
        lon: cf.longitude ? Number(cf.longitude) : null,
        city: cf.city || '',
        country: cf.country || '',
        tz: cf.timezone || '',
      };
      return new Response(JSON.stringify(body), {
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      });
    }
    // 삭제된 12시진 페이지(/언어/hour/…)는 각 언어 첫 화면으로 보냄
    const m = url.pathname.match(/^\/(ko|ja|zh|en|es|id)\/hour(\/|$)/);
    if (m) return Response.redirect(`${url.origin}/${m[1]}/`, 301);
    return env.ASSETS.fetch(request);
  },
};
