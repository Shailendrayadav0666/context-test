---
name: ve-implement
description: >
  Writes the Verification Engineer's black-box manual test plan for one story from its acceptance
  criteria into spec/test-plans/<TICKET-ID>-<title>/; when standalone it raises its own ve/ PR. No
  code, no status change. Also run in workflow mode at the STOP CHECKPOINT.
when_to_use: >
  Trigger when the user says: "/ve-implement 1.2", "/ve-implement PROJ-123", "/ve-implement",
  "Test Plan for story 1.2", "generate test steps for story 1.2",
  "manual test cases for PROJ-123", "test plan for this story",
  "test cases from acceptance criteria", "Verification Engineer this story", "run ve-implement", "ve-implement".
allowed-tools: Read Grep Glob Bash Write
---

# ve Implement — Test Plan (per story)

Load `aire-workflow/agents/ve-implement-agent.md`, read it completely and follow every step in it.
Resolve the mode first, per the agent's Mode Detection: STANDALONE when the Verification Engineer typed
the trigger, WORKFLOW when the STOP CHECKPOINT or an implement workflow passes `mode: workflow`.
