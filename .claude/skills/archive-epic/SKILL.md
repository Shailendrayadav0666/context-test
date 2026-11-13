---
name: archive-epic
description: >
  Closes an epic, bug or enhancement cycle: writes the cycle's RE delta, archives spec/, reports/,
  runtime-artifacts/ and tests/.evals/rubrics/ to aire-archives/<type>/<ID>-<slug>/, removes the
  live trees and commits onto the cycle PR. Never publishes to Atlas (that is stitch-delta).
when_to_use: >
  Trigger when the user says: "archive-epic", "archive the epic", "close the release
  cycle", "archive aire docs", "end of release archive", "wrap up this epic", "release archive".
allowed-tools: Read Grep Glob Bash Write Edit
---

# Archive Epic — Release Archive

Load `aire-workflow/agents/archive-epic-agent.md`, read it completely and follow every step in it.
That file is the single source of truth for this skill: the epic, bug and enhancement modes, the
readiness gates, the delta, the archive layout and its verification, the removal of the live trees,
the commit and PR, and the closing handoff.
