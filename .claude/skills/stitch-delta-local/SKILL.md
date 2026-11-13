---
name: stitch-delta-local
description: >
  Local (no-Atlas) counterpart of stitch-delta: after a cycle PR merges, refreshes the RE doc set
  in aire-archives/local-re/spec/plans/ against the merged code via a stitch-delta-local/<name>
  PR.
when_to_use: >
  Trigger when the user says: "stitch-delta-local", "stitch the delta locally", "refresh the local
  RE docs", "stitch local reverse engineering", "post-merge stitch without Atlas".
allowed-tools: Read Grep Glob Bash Write Edit
---

# Stitch Delta Local — Refresh the Locally Generated RE Docs

Use this instead of `/stitch-delta` when the cycle generated its RE docs locally (option B at the
Helix connect gate). The user decides by typing it; the skill never auto-detects which one applies.

Load `aire-workflow/agents/stitch-delta-local-agent.md`, read it completely and follow every step in
it. That file is the single source of truth for this skill.
