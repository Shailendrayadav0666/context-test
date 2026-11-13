---
name: code-security-review
description: >
  Full-codebase security audit against the AIRE Security Baseline (SECURITY-01..16); writes a
  severity-ranked report to reports/code-security-reviews/.
when_to_use: >
  Trigger when the user says: "security review", "security audit", "OWASP scan",
  "find vulnerabilities", "check for security issues", "code security check",
  "security bugs", "secure code review", "run security baseline", "check security rules".
allowed-tools: Read Grep Glob Bash Write
---

# Code Security Review

Load and execute the agent instructions from:

```
aire-workflow/agents/code-security-review-agent.md
```

Read that file completely and follow every step defined in it.
