import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:5021";

export const options = {
  scenarios: {
    public_pages_100k_readiness: {
      executor: "ramping-vus",
      gracefulRampDown: "2m",
      stages: [
        { duration: "2m", target: 1000 },
        { duration: "3m", target: 10000 },
        { duration: "5m", target: 50000 },
        { duration: "5m", target: 100000 },
        { duration: "5m", target: 100000 },
        { duration: "5m", target: 0 }
      ]
    }
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800", "p(99)<1500"],
    checks: ["rate>0.99"]
  }
};

export default function () {
  const pages = [
    "/",
    "/index.html",
    "/performance-test-report.html",
    "/api/health",
    "/api/ready",
    "/api/performance",
    "/api/public/settings",
    "/api/ai-tools",
    "/api/content"
  ];

  const path = pages[Math.floor(Math.random() * pages.length)];
  const response = http.get(`${BASE_URL}${path}`, {
    tags: { route: path }
  });

  check(response, {
    "status is 2xx/3xx": (res) => res.status >= 200 && res.status < 400,
    "response under 2 seconds": (res) => res.timings.duration < 2000
  });

  sleep(Math.random() * 2);
}
