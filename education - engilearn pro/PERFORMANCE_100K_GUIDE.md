# EngiLearn 100,000 User Performance Guide

This project is now prepared for performance testing, but 100,000 simultaneous users must be proven on production-class infrastructure. Do not claim real 100k capacity until the k6 test passes on the deployed URL.

## What Was Optimized

- Static CSS, JS, images, fonts, PDFs, JSON, and CSV files now receive one-year immutable cache headers.
- Service worker uses cache-first delivery for static assets with background refresh.
- `/api/performance` exposes runtime, memory, cache, database, and limit status.
- `/api/health` and `/api/ready` support uptime and readiness monitoring.
- API rate limits and auth rate limits are configurable through environment variables.
- Compression and Helmet security headers are enabled.

## 100k Load Test

Install k6:

```bash
winget install k6
```

Run against local server for a small smoke test:

```bash
k6 run tests/k6-100k-users.js
```

Run against production or tunnel:

```bash
k6 run -e BASE_URL=https://your-domain.com tests/k6-100k-users.js
```

For real 100,000 virtual users, use distributed/cloud k6 or multiple load generators. A laptop cannot honestly generate or measure 100,000 users alone.

## Pass Conditions For 10/10 Claim

- Error rate below 1%.
- p95 response time below 800 ms.
- p99 response time below 1500 ms.
- No backend crashes.
- MongoDB CPU, RAM, connection pool, and slow query metrics stay healthy.
- Payment, OTP, login, admin, PYQ, and repeated-question flows stay functional.
- Lighthouse Core Web Vitals pass on mobile and desktop.

## Infrastructure Needed

- Production hosting with autoscaling.
- MongoDB Atlas indexes, connection limits, backups, and monitoring.
- CDN in front of static assets and PDFs.
- Redis/Upstash for distributed sessions and rate limiting.
- Object storage for uploaded videos/PDFs.
- WAF, DDoS protection, and bot protection.
- APM monitoring such as Grafana, New Relic, Datadog, or Prometheus.
