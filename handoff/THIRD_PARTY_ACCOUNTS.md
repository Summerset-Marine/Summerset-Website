# Third-Party Account Inventory

Every external service the Site depends on, per Exhibit A §A.5. All accounts are (or must be, per Section 8.1 of the Agreement) owned by Horstman Networks Inc or Summerset Marine Construction, LLC, registered to their email addresses and billing instruments. Developer is a user only where noted.

> Fill in the "Account owner / login email" column with the Client's actual account details at Handoff — Developer does not hold these credentials.

| Service | Purpose | Account owner | Login email | Billing | Developer access at Handoff |
|---|---|---|---|---|---|
| **Replit** (this workspace) | Hosting, build, and dev environment. Site is built entirely in this Client-owned workspace | Client | ____________ | Client | Invited collaborator — **revoke at Handoff** |
| **Sanity** (project `mx8e8b7p`, dataset `production`) | CMS — projects, testimonials, blog, market pages, FAQ, lift media, team | Client / End Client | ____________ | Free/growth plan per Client | Developer token used during build — **revoke token & remove user at Handoff** |
| **GitHub** (repository) | Source code + commit history. Transferred to Client-owned organization at Handoff | Client | ____________ | Client | **Transferred; Developer access removed** |
| **HubSpot** | Form submissions (consultation, contact, service request), CRM Deal creation, optional tracking script | End Client | ____________ | End Client | None — configured via env vars only |
| **NetSuite** | Live lift inventory (SuiteQL + webhook) | End Client | ____________ | End Client | None — configured via env vars only |
| **Google Analytics 4** | Analytics & conversion tracking | End Client | ____________ | n/a (free) | None |
| **Google Search Console** | Sitemap submission, indexing (recommended post-go-live) | End Client | ____________ | n/a (free) | None |
| **Domain registrar / DNS** (summersetmarine.com) | DNS Cutover — outside Developer scope per §2.4 | End Client | ____________ | End Client | None |
| **Rippling ATS** | Careers page links out to Client's ATS | End Client | ____________ | End Client | None |
| **Google Maps embeds** | Location map embeds (keyless iframe embeds) | n/a | n/a | n/a | None |

## Environment variables by service

See `artifacts/summerset-marine/.env.example` and `artifacts/api-server/.env.example` for the complete variable reference, including each variable's purpose and where its value comes from.
