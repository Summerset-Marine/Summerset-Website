---
name: Sanity Studio deploy from Replit
description: How to deploy the Sanity Studio when `sanity deploy` hangs in this environment
---

`npx sanity deploy` hangs indefinitely after "Verifying local content..." in this Replit environment (the tarball upload step never completes/reports). The Studio data token needs the `sanity.project/deployStudio` grant — the regular write token is not enough (a separate SANITY_DEPLOY_TOKEN secret exists for this).

**Working fallback:** build with `npx sanity build`, then upload the dist manually:

```bash
cd artifacts/sanity-studio/dist && tar -czf /tmp/studio-dist.tar.gz .
curl -X POST "https://api.sanity.io/v2024-08-01/user-applications/<appId>/deployments" \
  -H "Authorization: Bearer $SANITY_DEPLOY_TOKEN" \
  -F "isAutoUpdating=false" -F "version=<studioVersion>" \
  -F "tarball=@/tmp/studio-dist.tar.gz;type=application/gzip"
```

- The appId is in `sanity.cli.ts` (`deployment.appId`).
- Tar from inside `dist` with `.` so all entries share one base dir — the API rejects tarballs whose files aren't under a single base directory.
- Verify via `GET /v2024-08-01/projects/<projectId>/user-applications` → `activeDeployment.deployedAt`/`size`. The studio root 302-redirects to the sanity.io dashboard for unauthenticated requests — that's normal, not a failure.

**Why:** several detached/backgrounded `sanity deploy` runs all stalled at the same step; the manual API upload succeeded immediately.

**Gotcha:** never run the CLI under `script -c "... $TOKEN ..."` — script echoes the full command line (including the token) into its log.
