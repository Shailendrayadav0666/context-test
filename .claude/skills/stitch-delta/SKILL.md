---
name: stitch-delta
description: >
  After a cycle PR merges, runs on base and refreshes the Atlas deep dive against the merged code
  using the archived cycle delta(s); records each in aire-archives/stitch-ledger.md via a
  stitch-delta/<name> PR.
when_to_use: >
  Trigger when the user says: "stitch-delta", "stitch the delta", "stitch deltas",
  "apply pending deltas", "refresh the deep dive", "update the deep dive on Atlas",
  "publish the cycle delta to Atlas", "post-merge stitch".
allowed-tools: Read Grep Glob Bash Write Edit
---

# Stitch Delta — Refresh the Atlas Deep Dive to the Current Face of the Application

Load `aire-workflow/agents/stitch-delta-agent.md`, read it completely and follow every step in it.
That file is the single source of truth for this skill.
