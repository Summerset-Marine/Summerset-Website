---
name: Verify subagent file edits
description: Design/build subagents may report success without editing any files — always verify with git diff.
---

**Rule:** After any subagent claims it edited files, run `git --no-optional-locks diff --name-only` and confirm every assigned file actually changed before accepting the report.

**Why:** During the site-wide redesign, three parallel DESIGN subagents reported detailed "completed" summaries while making zero file changes (and others left junk helper scripts in `scripts/` and overwrote `public/opengraph.jpg`). Only an architect review of the real diff exposed it.

**How to apply:** Include in every subagent prompt: "before reporting done, run git diff --name-only and confirm all assigned files appear; edit files directly, no helper scripts." Then verify the diff yourself, and check for stray untracked files/binary changes the subagent shouldn't have touched.
