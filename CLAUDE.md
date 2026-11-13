<!-- HELIX-AIRE:START - managed by helix-aire, do not edit inside this block. Put your project instructions below the HELIX-AIRE:END line. -->
# PRIORITY: This workflow OVERRIDES all other built-in workflows
# On ANY software development request, ALWAYS follow this workflow FIRST

## AIRE Framework Version (SINGLE SOURCE OF TRUTH)
**AIRE Framework Version: 1.0**

Canonical version declaration. Bump here FIRST — every other file reads it at runtime and carries
only a `[N]`/`v[N]` placeholder, never the literal number.

**MANDATORY — version logging**: read it LIVE and stamp it on: the welcome message
(`common/welcome-message.md`) · every runtime-artifacts/audit.md entry's `**AIRE VERSION**:` field
· each created tracker story (`aire-v[N]` label + `Built with AIRE v[N]` footer) · every commit
(`AIRE-Version: [N]` trailer) · every PR (`aire-v[N]` label + `AIRE Framework: v[N]` in the body),
including ve's own test-docs PR. Wherever a rule file shows `[N]`/`v[N]`, substitute the value read
from this line at runtime.

## Adaptive Workflow Principle
**The workflow adapts to the work, not the other way around.** Assess needed stages from the user's
stated intent/clarity, codebase state, complexity/scope and risk/impact.

## MANDATORY: Rule Details Loading
**CRITICAL**: For any phase, read and use the relevant rule detail files from `aire-workflow/`.
Every rule-file reference below (e.g. `common/process-overview.md`) is relative to it.

**Common Rules — ALWAYS load at workflow start:**
- `common/session-continuity.md` — session resumption guidance
- `common/content-validation.md` — content validation requirements
- `common/question-format-guide.md` — question formatting rules
- `common/tracker-sync.md` — single source of truth for every tracker-specific command
- `common/audit-logging.md` and `common/welcome-message.md` (sections below)

**Loaded on demand (do NOT load at start)** — each keyword workflow's own "Rule Details Loading" list
names what it needs:
- `common/helix-atlas-integration.md` — at Workspace Detection, only on brownfield or when the
  request/Epic indicates migration, re-platform, port, legacy rewrite or integration with an existing
  system (step 2d below). Blocking on that work.
- `common/directory-structure.md` — when placing an artifact whose path no rule file already fixes
- `common/behavior-spec.md` — at the STOP CHECKPOINT (Steps 1.3 and 1.7) and in the implement workflows
- `common/eval-framework.md` — at the STOP CHECKPOINT (Step 1.5 rubrics) and in the implement workflows
- `common/parallel-work-state.md` — in work-unit runs (implement workflows, `pr-fix`, epic-* workflows)
- `common/process-overview.md` — only when an overview of the whole flow is needed
- `common/ci-pipeline-generation.md` — at the STOP CHECKPOINT, when the CI pipeline is generated
- `implementation/architecture-doc.md` — at the STOP CHECKPOINT, when `architecture.md` + rubric are written
- `implementation/specs-and-test-plans.md` — at the STOP CHECKPOINT, when every work unit's
  `.feature` contract and manual test plan are written and approved (Step 1.7)

## MANDATORY: Extensions Loading (Context-Optimized)
**CRITICAL**: At workflow start, scan `extensions/` recursively and load ONLY the lightweight
`*.opt-in.md` files — never a full rule file at this stage; that loads on demand, after the user opts
in during Requirements Analysis. An extension with no `*.opt-in.md` is always enforced — load it now.

- **Security Baseline is ALWAYS mandatory** — load `extensions/security/baseline/security-baseline.md`
  at workflow start for EVERY project, enforce as blocking. NEVER ask whether security applies; ignore
  any legacy opt-out in `## Extension Configuration`.
- **Playwright Test Automation is ALWAYS mandatory** — record `Enabled = Yes` at workflow start. Do
  NOT pre-load its rule file: the `playwright-implement` skill loads it when the UI gate runs.
- Enabled extension rules are hard constraints; non-compliance is a blocking finding. Rules
  irrelevant to the current stage are N/A (not blocking). Before enforcing any extension at ANY
  stage, check `Enabled` in `## Extension Configuration`; skip disabled ones and log the skip. Default
  to enforced.

Full mechanics (loading order, deferred loading, enforcement, compliance summary): `common/extensions-loading.md`.

## MANDATORY: Content Validation
**CRITICAL**: Before creating ANY file, validate content per `common/content-validation.md`: Mermaid
diagram syntax · ASCII art diagrams (`common/ascii-diagram-standards.md`) · special-character escaping
· text alternatives for complex visual content · content parsing compatibility. Plus:
- **NEVER write the section-sign character "§" (U+00A7) in ANY file** — rule files, docs, specs,
  code, commit messages, PR bodies, tracker items. Write `Section 3` or just the number — "§" renders
  inconsistently across terminals, trackers and diff views.
- **In every message to the user, tracker comment and PR text, write "Verification Engineer" — never
  the shorthand "ve".** Identifiers keep it (`ve-list-work`, `/ve-implement`, `ve/…` branches, labels).

## MANDATORY: Question Format
**CRITICAL**: Follow `common/question-format-guide.md` for all question formatting — multiple-choice
(A–E), the `[Answer]:` tag, answer validation and ambiguity resolution.

**Four questions are CHAT-ONLY, never a question `.md` file**: Tracker Selection
(`common/tracker-sync.md`), Context Opt-In (`planning/workspace-detection.md` Step 4.7), CI/CD Opt-In (Step 1.2),
**Atlas Artifact Sync Opt-In** (`common/atlas-artifact-sync.md`). Ask
conversationally, persist only the ANSWER (to `runtime-artifacts/aire-state.md` + `audit.md`).

**The Section 4.1.2 CI/SonarQube setup gate (`common/ci-pipeline-generation.md`) is a stricter
exception — never summarize it, in a file, in chat, or via a multiple-choice tool.** It is a literal,
multi-paragraph setup-instruction block (`claude setup-token` steps, SonarCloud/Community steps, exact
secret names, how to add them in GitHub) the user must follow verbatim elsewhere; compressing it
deletes instructions they need. Emit it exactly as written, in full, as plain text, and read the reply
(`proceed`/`skip`/anything) as free text per Section 4.1.3 — never a lettered choice.

## MANDATORY: Custom Welcome Message
**CRITICAL**: On ANY software development request, load `common/welcome-message.md` and display the
complete message — ONCE at workflow start; do NOT reload it later (saves context).

## MANDATORY: Audit Trail, Session Identity & Timestamps
Complete contract in `common/audit-logging.md` — load at workflow start. MANDATORY for EVERY
workflow, stage, agent and skill. Non-negotiables:

- **Log EVERY user input** with the COMPLETE RAW INPUT — never summarized/paraphrased — plus every
  approval prompt (before asking) and every response (after receiving).
- **Every `runtime-artifacts/audit.md` entry carries `**User Email**:`** — operator's email, read LIVE
  and silently from session context, never asked, never a name, recorded ONLY there. Local audit
  templates ADD fields to the base format; NEVER drop this one.
- **Every timestamp from a real clock** at write time, ISO 8601 (`YYYY-MM-DDTHH:MM:SSZ`), via EXACTLY
  ONE command — `date -u +%Y-%m-%dT%H:%M:%SZ` or `Get-Date -AsUTC -Format "yyyy-MM-ddTHH:mm:ssZ"`.
  Never estimated, incremented, or copied forward.
- **Append only, chronological, to the END** of `runtime-artifacts/audit.md`. NEVER overwrite the
  file with its own contents plus additions — that duplicates the entire history.
- **Parallel-safe state**: work-unit runs write audit and state ONLY to
  `runtime-artifacts/stories/<unit-key>/`, never the shared files — `common/parallel-work-state.md`.
- **Every stage logs** its start, the user's input, each approval prompt (before asking) and the raw
  response (after receiving). Implementation-flow entries add `**TRACKER ITEM**:`, `**Epic Link**:`
  and `**AIRE VERSION**:`; self-healing entries add `**SH-LOOP**:`, `**Root cause**:` and
  `**Verification**:`.

# PLANNING PHASE

**Purpose**: Planning, requirements gathering, architectural decisions. **Focus**: WHAT and WHY.

**Stages**:
- Workspace Detection (ALWAYS)
- Reverse Engineering (CONDITIONAL — Brownfield only)
- Requirements Analysis (ALWAYS — Adaptive depth)
- User Stories (ALWAYS — no questions on team size or creation mode: `team_size` fixed at 2, all
  stories generated at once; the story set requires explicit human approval — GATE 1 — before push
  to the configured tracker, linked to the Parent Epic captured at workflow start)
- **Dependency Graph (ALWAYS — immediately after User Stories)** — records each story's `requires`
  dependencies; stories with no unfinished prerequisites are independently implementable in parallel
- Workflow Planning (ALWAYS)
- Application Design (CONDITIONAL)

## MANDATORY: Tracker Selection & Parent Epic Capture
aire asks ONCE which tracker to use — JIRA, ADO, GITHUB or LOCAL (no external tracker;
the local Story Tracker is authoritative) — BEFORE Parent Epic Capture. Skip and reuse if
`## Tracker` already exists (resumed project) — never re-ask. **NEVER infer/auto-select the tracker
from a pasted link (e.g. a Jira Epic URL) — ALWAYS ask and wait for the answer**, even if obvious. Full
mechanics: `common/tracker-sync.md` Section 1 — every tracker-facing rule dispatches on `## Tracker` →
`Type`. LOCAL is fully complete — zero external calls, ever (Section 12).

Users typically start with "using aire" + an existing Epic link or key. If provided, record it in the
`## Tracker` block in `runtime-artifacts/aire-state.md` (schema: `common/tracker-sync.md` Section 1 —
Type, Parent Epic, Epic URL, Project Key/Repo/Org). Rules:
- **Fetch the Epic content** per `common/tracker-sync.md` Section 2 (LOCAL: no fetch) into
  `spec/plans/epic-brief.md` — primary input to Requirements Analysis and User Stories.
- **Conflict rule**: a DIFFERENT recorded Epic (resumed project) → ask which to keep — NEVER overwrite.
- No Epic provided → don't block; User Stories Part 3 asks before any push (LOCAL: never asks).
- Single source of truth for linking pushed stories to this Epic, unless the user chose `none`
  (record `Parent Epic: none`).

---

## Workspace Detection (ALWAYS EXECUTE)

1. **MANDATORY**: Log the initial user request (complete raw input) in runtime-artifacts/audit.md, and
   stamp `**User Email**:` on every audit entry (silent, email-only — `common/audit-logging.md`)
2. Execute `planning/workspace-detection.md` — **its step order is the single source of truth**:
   a. State check (resume if `runtime-artifacts/aire-state.md` exists)
   b. **Tracker Selection** (skip if `## Tracker` is recorded), then Parent Epic Capture per the
      rules above — with an Epic link/key, write/merge `## Tracker` and fetch epic-brief.md
   c. Scan for code (brownfield/greenfield); resolve the code root — brownfield code outside `src/`
      is recorded once as `## Code Root` (`common/directory-structure.md`), never mass-moved; reuse
      existing RE artifacts found anywhere in the repo
   d. **HELIX MCP GATE (`common/helix-atlas-integration.md`)**: on brownfield, or when the
      request/Epic indicates **migration, re-platform, port, legacy rewrite or integration with an
      existing system**, Atlas is the source of existing-system truth. Resolve a Helix provider at
      runtime (never hardcode tool names) and record the binding. **If none resolves, emit the connect
      gate verbatim and HALT** — the user connects Helix, supplies exported Atlas docs, or approves local
      generation. Log the prompt and raw response. Greenfield, no existing system: skip silently.
   e. **Epic branch (automatic)** per `common/branching-strategy.md` — record the base branch, create
      `epic/<EPIC-ID>-<title>`, record `## Branching`. All work happens here; story branches cut from it
   f. Context folder + Context Opt-In (chat-only)
3. Determine next phase: Reverse Engineering (if brownfield and no artifacts) OR Requirements Analysis
4. **MANDATORY**: Log findings in runtime-artifacts/audit.md, then present the completion message
   (formats in workspace-detection.md) and proceed automatically

## Reverse Engineering (CONDITIONAL — Brownfield Only)

**ATLAS FIRST**: AIRE never re-derives documentation Atlas already holds. Reuse a local
`spec/plans/atlas-deep-dive.md`; otherwise pull Atlas's deep dive; if Atlas has none, present the
connect gate. The dispatch table and banners are in `common/helix-atlas-integration.md` Section 6.

Otherwise execute when existing code is detected and no prior RE artifacts exist; skip on
greenfield, or when prior artifacts exist anywhere in the repo.

Atlas content is a read-only input — never edit it to fit a plan. An Atlas/plan contradiction
is a finding to surface: follow Atlas, amend the AIRE-side artifact, say so plainly, log it.

**Execution**:
1. Load and execute all steps from `planning/reverse-engineering.md`: analyse all packages/components
   and generate business overview (covering business transactions), architecture, code structure, API
   docs, component inventory, interaction diagrams, technology stack and dependencies documentation
2. **Wait for Explicit Approval** (format in reverse-engineering.md) — DO NOT PROCEED until the user
   confirms.

## Requirements Analysis (ALWAYS EXECUTE — Adaptive Depth)

**Always executes**, depth varies by request clarity/complexity:
- **Minimal**: simple, clear request — just document intent analysis
- **Standard**: normal complexity — gather functional and non-functional requirements
- **Comprehensive**: complex, high-risk — detailed requirements with traceability

**Execution**:
1. Load and execute all steps from `planning/requirements-analysis.md` at the chosen depth — load the
   RE artifacts (brownfield) and, if captured, the Parent Epic brief (`spec/plans/epic-brief.md`,
   which defines what to build and is the primary input here); analyse intent; ask clarifying
   questions; generate `requirements.md`
2. **Wait for Explicit Approval** (format in requirements-analysis.md) — DO NOT PROCEED until the user
   confirms.
3. Commit the planning artifacts on the Epic branch and push (automatic — no PR here; the Epic PR is
   raised manually at cycle end via `pr-generator`)

## User Stories (ALWAYS EXECUTE)

**Always executes**, giving shared understanding, clear acceptance criteria and testable
specifications. Every project produces `stories.md` + `personas.md`, populates the Story Tracker in
`runtime-artifacts/aire-state.md`, and auto-pushes stories to the configured tracker on approval
(LOCAL: stays local). Stories reference the approved requirements by REQ-ID.

**Execution**:
1. Load all steps from `planning/user-stories.md`; load the RE artifacts (brownfield) and execute at
   the appropriate depth
2. **PART 1 - Planning**: NEVER ask team size — record the fixed default `team_size: 2` in
   `runtime-artifacts/aire-state.md` (reused by Dependency Graph, never asked there either) and tune
   granularity so ≥ 2 independent stories can run in parallel. Create the story plan with its
   questions, wait for answers, analyse ambiguities. The plan is announced, NOT approved
3. **PART 2 - Generation**: NEVER ask the creation mode — `story_creation_mode` is fixed at
   `all-at-once`. Generate every story in a single pass, then populate the Story Tracker (`Requires`
   filled in the next stage)
4. **GATE 1 — Story Set Approval (MANDATORY)**: announce the complete story set (user-stories.md
   Steps 19–20) and Wait for Explicit Approval — DO NOT PROCEED to Part 3 until the user chooses
   "Request Changes" or "Approve & Continue" (Step 21). A requested change is applied to
   `stories.md`/the Story Tracker, re-announced, and GATE 1 is presented again
5. **PART 3 - Push to the configured tracker (only after GATE 1 approval)**: follow user-stories.md
   Steps 24–28

> **Next**: Proceed immediately to **Dependency Graph** stage to map dependencies between all stories.

## Dependency Graph (ALWAYS EXECUTE — immediately after User Stories)

**Purpose**: Analyse story dependencies. Each story gets a `requires` list; stories whose
prerequisites are all Done can be implemented in parallel. Produces `spec/plans/dependency-graph.yml`
and stamps `Requires` onto every story in the Story Tracker and `stories.md`.

**This stage is also the single commit point for `stories.md`, `personas.md` AND
`dependency-graph.yml`** — User Stories generates/pushes-to-tracker but does NOT commit; all three are
committed and pushed to the Epic branch together here, once, before Workflow Planning starts.

**Execution**:
1. Load and execute all steps from `planning/dependency-graph-generation.md` — it defines the steps
   (reuse the fixed `team_size: 2` — NEVER ask it), the TRUE-PARALLELISM RULES for computing
   `requires`, the `dependency-graph.yml` schema and the Story Tracker table format (canonical
   columns: Requires, Tracker ID, Status, PR, Merged, Start, End, Recorded). **`requires` is INFERRED,
   never asked**
2. **AUTOMATIC — no gate**: announce the graph + ready-stories summary and PROCEED (enforced later by
   the Doability Gate and branch-cut merge check); a user correction is an interrupt. **MANDATORY**:
   log the graph, inferred edges and any correction
3. **MANDATORY — Epic Branch Commit & Push** (`planning/dependency-graph-generation.md` Step 9,
   automatic, no gate): commit `spec/plans/stories.md`, `spec/plans/personas.md`,
   `spec/plans/dependency-graph.yml`, `runtime-artifacts/aire-state.md` and
   `runtime-artifacts/audit.md` on the Epic branch (`AIRE-Version: [N]` trailer) and push to origin.
   No PR is raised here. Log the commit hash and push confirmation. If push fails, tell the user to
   push manually before proceeding.

---

## MANDATORY: Tracker Sync Rule (applies everywhere a story status changes)

Full rule: `common/tracker-sync.md` Section 4. On every Story Tracker status change, a `—`/`LOCAL`
Tracker ID updates the local tracker only; a real tracker ID also transitions the issue, confirm-first
and verified. The exception is the claim at `dev-implement` story pick, which moves both sides to
`In Development` automatically. The story stays there until its PR merges.

**Epic Status Sync** (skip silently when `Parent Epic: none` or `Type: LOCAL`):
- **First story starts** → also transition the Parent Epic to "In Development" — automatic, verified, announced, logged.
- **All stories done** (every PR merged, last story at `Ready for Testing`) → confirm-first to
  move the Epic to "Ready for Testing". If any PR is still open, do NOT move it — report the open PRs
  and keep everything In Development.

Story↔Parent-Epic links (User Stories Part 3) are automatic, since GATE 1 already approved them, and
verified. NEVER update only one side.

---

## MANDATORY: Atlas Artifact Sync (opt-in)
Asked once after the cycle branch is created (`common/atlas-artifact-sync.md`). While `Enabled: Yes`,
run its Section 5 pass before every commit, in every workflow, agent and skill. Never blocks.

---

## Workflow Planning (ALWAYS EXECUTE)

1. Load all steps from `planning/workflow-planning.md` and the content validation rules from
   `common/content-validation.md`; load all prior context (RE artifacts if brownfield, intent analysis,
   requirements if executed, user stories)
2. Execute: determine which phases run and at what depth, create the multi-package change sequence (if
   brownfield), generate the workflow visualization. **MANDATORY**: validate all content (Mermaid
   syntax included) before file creation, per content-validation.md
3. **AUTOMATIC — no gate**: present the plan per workflow-planning.md Step 9 (stages can be
   added/removed any time) and proceed; each selected stage keeps its own approval
4. **MANDATORY**: Log the finalized plan and any user change in runtime-artifacts/audit.md

## Application Design (CONDITIONAL)

**Execute IF**: new components/services needed · component methods or business rules need definition
· service layer design required · component dependencies need clarification

**Skip IF**: changes within existing component boundaries · no new components or methods · pure
implementation changes

**Execution**:
1. Load all steps from `planning/application-design.md` and the RE artifacts (if brownfield); execute
   at the appropriate depth (minimal/standard/comprehensive)
2. **Wait for Explicit Approval**: present the detailed completion message (format in
   application-design.md) — DO NOT PROCEED until the user confirms.

## Transition to IMPLEMENTATION PHASE

After Application Design is approved (or Workflow Planning when it's skipped), proceed directly to the
**IMPLEMENTATION PHASE**. Its design stages run **once at system level**, scoped to the **intake
brief** at `spec/plans/epic-brief.md` (written from the configured tracker's Epic, or from the user's
requirements/natural-language description). Log the transition.

---

# IMPLEMENTATION PHASE

**Purpose**: Detailed design, NFR implementation and code generation. **Focus**: HOW to build it.

**Stages**:

1. **System-Level DESIGN stages** (below) — single pass, scoped to the intake brief; no code.
2. **MANDATORY STOP CHECKPOINT** (below) — `architecture.md` and its rubric, the CI pipeline when the
   user opts in, and every work unit's `.feature` contract and manual test plan (one approval), then
   HALT. Code generation never starts on its own.
3. **Development Handoff, then Code Generation per story** — only via the `dev-implement` keyword
   (`workflows/dev-implement.md`), with Code Review and Remediate run automatically inside it.

Test plans are authored at the STOP CHECKPOINT and executed and signed off by the Verification Engineer
(`ve-list-work`) once each story's PR merges.

---

## System-Level DESIGN Stages (Single Pass)

**These DESIGN stages execute in sequence, ONCE for the whole system, scoped to the intake brief
captured at workflow start. Code Generation is NOT part of them** — it happens later, per-story, via
`dev-implement`, after the STOP CHECKPOINT.

**Primary inputs for EVERY design stage**: `epic-brief.md` (defines WHAT to build) · `requirements.md`
· `stories.md` + `## Story Tracker` · Application Design artifacts if that stage ran · Atlas
existing-system truth when the Helix MCP is bound — on brownfield the existing architecture is the
**starting state**, and the design records the delta from it.

### The stages

| Stage | Rule file | Execute IF | Skip IF |
|---|---|---|---|
| **Functional Design** | `implementation/functional-design.md` | New data models/schemas · complex business logic · business rules need detailed design | Simple logic changes · no new business logic |
| **NFR Requirements** | `implementation/nfr-requirements.md` | Performance/security/scalability considerations · tech stack selection required | No NFR requirements · stack determined |
| **NFR Design** | `implementation/nfr-design.md` | NFR Requirements executed · patterns to incorporate | No NFR requirements · NFR Requirements skipped |
| **Infrastructure Design** | `implementation/infrastructure-design.md` | Infra services need mapping · deployment/cloud resources required | No infra changes · already defined |

### Execution pattern — IDENTICAL for all four stages

1. Load all steps from the stage's rule file (table above) and execute it for the whole system
2. **MANDATORY**: Present the standardized 2-option completion message from that stage's rule
   file — DO NOT invent a 3-option menu or other navigation pattern
3. **Wait for Explicit Approval**: the user chooses "Request Changes" or "Continue to Next Stage" —
   DO NOT PROCEED until they confirm.

> **End of the System-Level DESIGN stages.** Once completed (or skipped), DO NOT generate code.
> Proceed to the mandatory STOP CHECKPOINT below.

---

## MANDATORY STOP — After Infrastructure Design, Before Code Generation

**This is a hard halt.** After design stages complete (Infrastructure Design done or skipped), the
workflow MUST stop and wait. Code Generation MUST NOT start automatically. Present the Development
Handoff below, then block until the user invokes `dev-implement`.

1. **MANDATORY**: Log reaching the stop CHECKPOINT.
1.2. **CI/CD Setup Opt-In (ASK-FIRST, CHAT-ONLY — same pattern as Tracker Selection)**: before loading
   `common/ci-pipeline-generation.md` or generating any CI/CD file. **Skip and reuse if
   `## CI/CD Configuration` already exists** in `runtime-artifacts/aire-state.md` — never re-ask. If
   `.github/workflows/agentic-eval-pipeline.yml` already exists, do NOT ask: record `Enabled: Yes`
   `Source: pre-existing` and go to Step 1.6. Otherwise ask exactly
   `Set up the CI/CD eval pipeline for this project? (yes/no)` and record `Enabled: Yes|No` with
   `Source: user opt-in|user opt-out`, logging the question + raw answer in `runtime-artifacts/audit.md`.
   On **no**: SKIP Steps 1.6 and 4 entirely — never load `common/ci-pipeline-generation.md`, and
   never generate the pipeline, `sonar-project.properties`, or any `tests/.evals/scripts/*` CI script.
1.3. **WRITE `spec/behavior.feature`** (automatic, no gate) per `common/behavior-spec.md` Section 3 —
   the cross-story journeys that belong to no single story, `@REQ-<id>` tagged, written ONCE per cycle;
   what the B3 tier runs on the last work unit. Genuine cross-unit journeys only, never copies of
   per-story scenarios; if none exist, record that explicitly.
1.4. **WRITE `spec/plans/architecture.md`** (MANDATORY, automatic, no gate) per
   `implementation/architecture-doc.md` — **assembled from the approved design artifacts and Atlas
   truth, never authored fresh**; a skipped stage says so explicitly rather than being filled with an
   invented decision. Before the design commit, assert both ALWAYS inline Mermaid diagrams
   (Section 2.1 — System Context + Component Architecture, plus an `erDiagram` when a store/schema
   changed) and Section 10 Verifiable Constraints (3–8 entries, weights summing to 1.0) are present
   and valid per `common/content-validation.md`; missing/unparseable → fix before committing.
   Section 10 is what makes the blocking J1 gate fair. Version it and log it.
1.5. **Derive the rubrics** (automatic, no gate) per `implementation/architecture-doc.md` Section 4 and
   `common/eval-framework.md` Section 3: `tests/.evals/rubrics/architecture-rubric.json` **mechanically
   from `architecture.md` Section 10** (`rubricVersion` **equal to** the `architecture.md` version),
   plus `security-rubric.json` and `tests/.evals/config.json` when absent. **Artifact Ownership
   (`common/directory-structure.md`) — create if missing, never regenerate**: deterministically, on the
   cycle branch; never push to base, never raise a `[CI]` PR, never halt because base wasn't
   bootstrapped. Never hand-write or hand-edit a rubric — edit Section 10 and regenerate. Nothing
   derivable → Section 3 fallback chain, J1 recorded `N/A` (never blocks). Log it.
1.6. **Generate the CI pipeline** (CONDITIONAL on Step 1.2 `Enabled: Yes`) per
   `common/ci-pipeline-generation.md` — built for THIS project from its own build files and the
   `tests/.evals/config.json` thresholds, **validated before committing** (Section 4.0), committed **on
   the cycle branch** (Section 2.1, never pushed to base, never a separate `[CI]` PR), idempotent, plus
   the generated `tests/.evals/scripts/*`. Its **SonarQube setup gate (Section 4.1.2) is the ONE
   sanctioned halt inside CI generation** — emit it verbatim and HALT for `proceed`/`skip`. Never
   write a token into any file. CI re-verifies the local gates, never relaxes them.
1.7. **WRITE EVERY WORK UNIT'S BEHAVIOUR SPEC + MANUAL TEST PLAN** (MANDATORY, ONE approval gate) per
   `implementation/specs-and-test-plans.md` — the LAST design artifacts, written before any code
   exists. For every story in the `## Story Tracker` (bug/enhancement cycles: the single ticket):
   (a) `spec/behavior/<unit>.feature` per `common/behavior-spec.md` Section 2 — one `@AC-<n>`-tagged
   scenario per acceptance criterion, failure paths included; (b) `spec/test-plans/<TICKET-ID>-<title>/`
   by invoking the `ve-implement` skill in WORKFLOW MODE (never re-implemented; no `ve/…` branch,
   no PR — the files ride this checkpoint's own commit). Run the blocking coverage check (every AC has
   ≥1 scenario AND ≥1 test case), then present the standardized 2-option completion message and
   **WAIT** for `Request Changes` / `Continue to Next Stage`; log the prompt and complete raw response.
   Scope derivation, NOT ve sign-off — ve signs off each unit with `ve-list-work`.
2. Mark in `runtime-artifacts/aire-state.md`: `Design complete — awaiting dev-implement`.
3. **Commit + push the design artifacts on the Epic branch (automatic — unblocks ve)**: stage
   `spec/**` (Step 1.3's `behavior.feature`, Step 1.4's `architecture.md`, and Step 1.7's
   `behavior/` + `test-plans/`), `tests/.evals/**` (Step 1.5's files, plus Step 1.6's when it ran),
   `runtime-artifacts/aire-state.md`, `runtime-artifacts/audit.md`. Commit with an `AIRE-Version: [N]`
   trailer and push. If push fails, tell the user to push manually — **ve cannot start until this
   branch is on origin**.
4. **Epic-level pre-handoff smoke test** (CONDITIONAL on `Enabled: Yes` — SKIPPED entirely, and
   announced, when `Enabled: No`; automatic, HARD HALT on exhaustion) per
   `common/ci-pipeline-generation.md` Section 4.0.6: run `tests/.evals/scripts/smoke-test-epic.{sh,ps1}`
   against the epic branch just pushed. It proves the environment is viable to build on, not that the
   pipeline's delta-scoped logic is correct. On exhaustion the scratch PR stays open and
   **Development Handoff does NOT happen** until resolved.
5. Present the Development Handoff message (below).
6. **HALT.** Do not proceed to Code Generation or any later stage until the user types `dev-implement`

## Development Handoff — Use `dev-implement` to Build Each Story

At Step 5 above, load `common/development-handoff.md` and emit its message verbatim — that file
carries the template and substitution rules. Never ship an unsubstituted placeholder. Log the handoff,
then HALT.

---

# KEYWORD WORKFLOWS

**On any keyword below, read `workflows/<file>` and follow it exactly.** CLAUDE.md routes only.

| Keyword | When | File |
|---|---|---|
| `dev-implement` | Build one story — the only way code generation starts | `dev-implement.md` |
| `ticket-implement <TICKET-ID>` | An existing ticket — bug OR enhancement (omit the ID for LOCAL, describe it inline) | `ticket-implement.md` |
| `epic-enhance <TICKET-ID \| description>` | Epic cycle open; **behaviour** changed | `epic-enhance.md` |
| `epic-bugfix <TICKET-ID \| description>` | Epic cycle open; **a defect** in what the epic built | `epic-bugfix.md` |
| `epic-change-request <TICKET-ID \| description \| --from-requirements \| --from-spec <path>>` | Epic cycle open; **a requirement** changed — versions `requirements.md`, one staged gate | `epic-change-request.md` |
| `pr-fix [PR-NUMBER]` | A rejected `[STORY]`/`[BUG]`/`[ENH]` PR — fixed from its comments, same PR updated | `pr-fix.md` |
| `code-review` | Review one story or all stories — REVIEWER, read-only | `code-review.md` |
| `remediate` | Fix what a review report found — DEV, code-editing | `remediate.md` |

- The three mid-epic workflows each deliver the change as one `[STORY]` PR into the epic branch,
  updating affected earlier stories' specs, test plans and tests.
- **`code-review` / `remediate`** also run automatically inside every implement workflow. **NEVER
  auto-run them standalone** — after a story's PR is raised, *suggest* both. Log every response.

---

## Key Principles

- **Adaptive Execution** — run only the stages that add value; complex changes get full treatment,
  simple changes stay efficient.
- **Transparent Planning** — always show the execution plan first; the user may add or remove stages
  any time.
- **Progress Tracking** — record executed and skipped stages in `runtime-artifacts/aire-state.md`.
- **Bounded Self-Healing** — every automatic fix loop is capped at 3 attempts (SH-1 … SH-7,
  `common/self-heal-limit-guidance.md` Section 0); on exhaustion the run HALTS for a manual fix.
  A failing gate is never skipped, weakened or carried forward — and never left unrun: the work-unit
  guard (`templates/hooks/check-work-unit.sh`) refuses such a commit; `--no-verify` is forbidden. **One named exception**: the epic-level smoke
  test's watch loop (`common/ci-pipeline-generation.md` Section 4.0.6) is UNBOUNDED, terminating only
  via `auto-fix-agent.*`'s own `retryLimitForSelfRepair` exhaustion or a genuine fix — never license
  to uncap any OTHER loop.

## MANDATORY: Plan-Level Checkbox Enforcement

**NEVER complete work without updating the plan checkboxes.** Immediately after finishing ANY step in
a plan file, mark it `[x]` — in the SAME interaction where the work completed. No exceptions. Two
levels: plan-level tracks progress within a stage, stage-level tracks overall progress in
`runtime-artifacts/aire-state.md`; both update in the same interaction as the work.

## Directory Structure

**CRITICAL RULE — five roots, nothing outside them**:
- **`src/`** — ALL application code, greenfield AND brownfield. If a brownfield repo keeps code
  elsewhere, record that root ONCE as `## Code Root` in `runtime-artifacts/aire-state.md` and treat it
  as `src/`. Never a second code location; never mass-move an existing tree.
- **`tests/`** — `unit/`, `behavior/` (Gherkin step definitions), `e2e/` (Playwright)
- **`spec/`** — specs/docs ONLY, never a source file: `behavior.feature` (once per cycle) plus
  `plans/` (planning and design docs, RE docs, `delta/`), `spec-generation/` (plan and question
  files), `behavior/` (one `.feature` per work unit), `test-plans/`, `playwright-specs/` (Planner
  plans; the `.spec.ts` files are test code in `tests/e2e/`) and the human-authored
  `context-project/` (read only at a user-supplied path). `spec/` is cycle-scoped: `archive-epic`
  archives and removes it, so base carries no `spec/` between cycles.
- **`reports/`** — generated OUTPUTS ONLY: `unit-test-evidence/`, `behavior-test-evidence/`,
  `api-contract-test-evidence/`, `eval-evidence/`, `reviews/`, `code-security-reviews/`,
  `ticket-summary/`, `pr-feedback/`. `.feature` contracts live in `spec/behavior/`, never here.
- **`tests/.evals/`** — `config.json`, `rubrics/`, `scripts/`
- CONDITIONAL on the `## CI/CD Configuration` opt-in:
  **`.github/workflows/agentic-eval-pipeline.yml`** (`common/ci-pipeline-generation.md`) — absent
  entirely when the user opted out
- Structure inside `src/`: see `implementation/code-generation.md` for patterns by project type

**Full canonical layout**: `common/directory-structure.md` — load on demand to place an artifact whose
path isn't already fixed by the rule file you're following.
<!-- HELIX-AIRE:END -->
