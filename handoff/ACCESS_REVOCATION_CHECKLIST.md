# Access Revocation Checklist

Per Sections 1.10, 7.6, 7.7, and 8.3 of the Master Services Agreement, Developer's access to all systems is revoked at Handoff. This document is the written confirmation required by §8.3.

Completed jointly by Client and Developer at the Handoff walkthrough.

## Checklist

- [ ] **Replit Workspace** — Developer's collaborator access removed by Client (Workspace → invite panel → remove `noah@labontedevelopment.com`). Verified Developer can no longer open the workspace.
- [ ] **GitHub repository** — repository transferred to Client-owned GitHub organization **with complete commit history**. Developer's membership/collaborator access removed. Verified via the repository's Access settings.
- [ ] **Sanity (project `mx8e8b7p`)** — Developer user removed from project members at manage.sanity.io; any API tokens created by Developer (including the write token used during content migration) revoked. Verified in Project → API → Tokens.
- [ ] **Replit Secrets rotated (recommended)** — `SANITY_WRITE_TOKEN` and `SESSION_SECRET` rotated by Client after Developer access removal.
- [ ] **HubSpot** — confirm Developer holds no user seat (none was created during the build; access was via Client-provided env vars only).
- [ ] **NetSuite** — confirm Developer holds no user account; integration tokens are Client-owned. Rotate consumer/token secrets if desired.
- [ ] **Google Analytics 4 / Search Console** — confirm Developer email is not listed as a user/owner.
- [ ] **Domain / DNS** — confirm Developer has no registrar or DNS access (never granted; DNS Cutover is Client/End Client responsibility).

## Confirmation

By signing below, Developer confirms in writing that its access to the Replit Workspace, GitHub repository, and all third-party service accounts has been fully revoked (§8.3).

| | Developer — LaBonte Development, LLC | Client — Horstman Networks Inc |
|---|---|---|
| Name | Noah LaBonte | Jason Horstman |
| Signature | ____________________ | ____________________ |
| Date | ____________________ | ____________________ |
