import http from "k6/http";
import { check, sleep } from "k6";

// 테스트 옵션 설정
export let options = {
  vus: 10, // 동시에 실행할 가상 사용자 수
  duration: "30s", // 테스트 실행 시간
};

// 기본 테스트 함수
export default function () {
  // 요청 보낼 URL
  const url = "https://www.google.co.kr/?hl=ko";

  // GET 요청 전송
  let response = http.get(url);

  // 응답 검사 (200 상태 코드 확인)
  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time is below 500ms": (r) => r.timings.duration < 500,
  });

  // 잠시 대기
  sleep(1);
}
