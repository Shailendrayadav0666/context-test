---
name: playwright-implement
description: >
  Turns one story's approved manual test plan into Playwright UI tests by orchestrating
  Playwright's own Planner/Generator/Healer agents, runs them headed, and pushes to the
  integration branch. UI only; also run in workflow mode by the implement workflows.
when_to_use: >
  Trigger when the user says: "/playwright-implement 1.2", "/playwright-implement AT-898",
  "/playwright-implement", "automate this story's tests", "generate playwright scripts for story 1.2",
  "turn the Test Plan plan into automation", "playwright automation for AT-898",
  "run playwright tests for this story", "playwright-implement".
allowed-tools: Read Grep Glob Bash Write Edit Agent
---

# Playwright Implement — orchestrates Playwright's own Planner/Generator/Healer for ONE story

Load `aire-workflow/agents/playwright-implement-agent.md`, read it completely and follow every step in
it, in order; it loads `aire-workflow/extensions/testing/playwright-automation/playwright-automation.md`
itself. Resolve the mode first, per the agent's Mode Detection: STANDALONE when the user typed the
trigger, WORKFLOW when an implement workflow passes `mode: workflow`.
