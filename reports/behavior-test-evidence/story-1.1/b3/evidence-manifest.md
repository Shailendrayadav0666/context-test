# Evidence Manifest — Behavioural tier B3 — story-1.1

| Field | Value |
|---|---|
| Work unit | Story 1.1 — Upgrade to Premium button with Premium details modal |
| Branch / head | story/1.1-upgrade-to-premium-button-with-premium-details-modal @ 532e230 (uncommitted working tree) · base 532e230 |
| Generated | 2026-11-13T09:33:45Z |
| AIRE version | 1.0 |
| Status | PASS |

## Commands run
| # | Command | Working directory | Exit code |
|---|---|---|---|
| 1 | `podman build -t aire-behavior:local -f tests/.evals/behavior/Containerfile .` | repo root | 0 |
| 2 | `podman run --rm -v "<repo>:/work:Z" -v /work/src/frontend/node_modules -w /work -e AIRE_STORY_KEY=story-1.1 aire-behavior:local "bash tests/.evals/behavior/run.sh b3"` | repo root (container /work) | 0 |

## Tools
| Tool | Version |
|---|---|
| podman | 5.8.7 |
| base image | docker.io/library/node:22-slim |
| vitest | 5.1.0 |
| @amiceli/vitest-cucumber | 8.0.0 |
| jsdom | 27.4.0 |

## Result
| Field | Value |
|---|---|
| Tier | B3 |
| Feature files in scope | spec/behavior/story-1.1.feature + spec/behavior.feature (0 scenarios — single-unit cycle, no cross-unit journeys by design) |
| Scenarios passed | 10/10 |
| Steps passed | 61/61 |
| `@AC` tags executed | 5/5 (AC-1, AC-2, AC-3, AC-4, AC-5) |
| Containerised | yes — containerised: true |
| Image ref + digest | localhost/aire-behavior:local · image id a6cc0db1f173 · digest sha256:db2e32af88f81063b842ea29609b3e40942e2c517b39e09ce370a165ddfffe64 |
| Pod members | none — the frontend scenarios need no datastore; the backend HTTP boundary is stubbed in tests/behavior/support/backend-stub.js |

### Scenarios
| Scenario | Tag | Steps | Result |
|---|---|---|---|
| Button is shown for an active Standard plan | @AC-1 | 4 | PASS |
| Button is hidden when the user has no active plan | @AC-1 | 4 | PASS |
| Button is hidden while billing data is loading | @AC-1 | 4 | PASS |
| Opening the Premium details modal | @AC-2 | 11 | PASS |
| Opening the modal with the keyboard | @AC-2 | 4 | PASS |
| Continue shows the coming-soon message and keeps Standard | @AC-3 | 5 | PASS |
| Cancel dismisses the modal without changes | @AC-4 | 5 | PASS |
| Close control dismisses the modal without changes | @AC-4 | 5 | PASS |
| Escape key dismisses the modal without changes | @AC-4 | 5 | PASS |
| The upgrade flow makes no network request | @AC-5 | 4 | PASS |

## Artifacts
| File | What it is |
|---|---|
| behavior-test-run.log | raw container output of the tier run |
| behavior-test-report.json | vitest JSON report (machine-readable) from the same run |

## Exceptions and notes
Runner bootstrapped this run (announced): @amiceli/vitest-cucumber (devDependency of src/frontend), src/frontend/vitest.behavior.config.js, tests/.evals/behavior/Containerfile and run.sh (template copied byte-for-byte, only the STACK-RESOLVED markers filled). Podman machine restarted once before the image build (VM had lost DNS/network; host network fine) — no gate result affected.
B3 ran because this is the last (and only) work unit of the cycle — single-unit epic, no other unit exists, so the all-other-PRs-merged condition is satisfied immediately (behavior-spec.md Section 6.1). REQ coverage: the cycle's REQ-IDs (REQ-F-01..05, REQ-NF-01..05) are traced through this story's @AC tags (spec/plans/stories.md); spec/behavior.feature carries no @REQ-tagged scenarios by design.

