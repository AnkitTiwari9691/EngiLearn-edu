# EngiLearn Scale Readiness

## Current Protection

- Static frontend assets are delivered with long-lived CDN caching.
- Public read APIs use short CDN caching with stale responses during refresh.
- Production write requests fail safely when no durable database is connected.
- `/api/ready` reports whether the production database is ready.
- API responses include request IDs and sampled structured latency logs.
- Vercel Function memory and duration are explicitly configured.

## Required Before High-Traffic Launch

The current backend still reads and writes one large application snapshot. This is not safe for heavy concurrent writes because multiple serverless instances can overwrite each other.

1. Replace `readDb()` and `writeDb()` snapshot operations with atomic MongoDB collection queries.
2. Store sessions and distributed rate limits in Redis or Upstash.
3. Move uploaded files to object storage such as Vercel Blob or S3.
4. Use MongoDB Atlas autoscaling, connection limits, indexes, backups, and multi-region replicas.
5. Enable Vercel Fluid Compute, multi-region failover, WAF, bot protection, and spend controls.
6. Configure runtime log drains, error alerts, uptime checks, and database alerts.
7. Run staged load tests at 1k, 10k, 100k, then the required peak. Fix errors and capacity limits at each stage.

No application can honestly guarantee two million simultaneous users without production load testing and sufficient paid infrastructure.
