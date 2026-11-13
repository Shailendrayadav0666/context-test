# UI/UX Mockups

## Overview

An optional stage that gives the user a reviewed picture of the user interface before any code is
written. Depending on the opt-in answer, it either produces local HTML mockups (designed with Claude
Design's guidance when it is available) or a Figma design page, reviews them with the user until
they are approved, or takes the designs the user already has. Either way it registers them as
design references, so every later design and code step is grounded in them through
`common/design-reference-grounding.md` (DR-5).

**When it runs**: at the STOP CHECKPOINT, after every design stage, `architecture.md`, the rubrics and
the CI pipeline (when enabled), and before the behaviour specs and test plans. It is invoked from
`implementation/specs-and-test-plans.md` Section 0, so it covers all three cycles:

| Cycle | Invoked from | Scope |
|---|---|---|
| Epic | `CLAUDE.md` MANDATORY STOP Step 1.7, then `specs-and-test-plans.md` Section 0 | every story with a user interface |
| Bug | `workflows/bug-fix.md` Step 8.5 Item 4.5, then Section 0 | the single ticket, if it touches the user interface |
| Enhancement | `workflows/enhancement-implement.md` Step 8.5 Item 4.5, then Section 0 | the single ticket, if it touches the user interface |

Running it here means the mockups are built from the approved stories, the functional design and the
NFR targets, and the `.feature` files and test plans written right after can use the same screen
names and labels.

**Enabled check**: run only when `## Extension Configuration` records `UI/UX Mockups` = Yes. A
missing row means **No**: skip silently and log the skip. This overrides the default-to-enforced rule
in `common/extensions-loading.md` Section 5.

### Modes

| Mode (`## UI/UX Design`) | What this stage does |
|---|---|
| `generate` | Steps 1 to 6: build the HTML mockups (with the Claude Design guidance, Section C, when it is available), open them for review, iterate until approved, register them |
| `figma` | Steps 1 and 2, then Sections F0 to F5: build the screens on a new page of a Figma file, review them there, iterate until approved, register them |
| `provided` | Step 7 only: read the provided designs and report what they do not cover. No mockups are built and no approval is requested. |
| `provided+generate` | Step 7, then the `generate` path for the work units the provided designs do not cover |
| `provided+figma` | Step 7, then Steps 1 and 2 and Sections F0 to F5 for the work units the provided designs do not cover |
| `skip` | Nothing. Not loaded. |

Steps 1, 2 and 7 are shared by every mode. There are two outputs: local HTML (Steps 3 to 6) and
**Figma** (Sections F0 to F5, only when the user chose Figma). Every rule that is not about the
output format — the scope rule, real content, every state the ACs imply, the standards, the 2-option
review, Out of scope handling — applies to both. Claude Design is never an output: it is a source
of design guidance and design systems (Section C) that the HTML output uses whenever it is available.

---

## Step 1: Determine the UI scope

A work unit is in scope when it adds or changes something a user sees or operates in the interface:
its acceptance criteria describe a screen, form, message, navigation or visible state;
`spec/plans/functional-design.md` lists frontend components for it; or, in a bug or enhancement cycle,
`spec/plans/impact-analysis.md` names frontend files.

- In `provided+generate` and `provided+figma` modes, remove the units already covered by a provided
  design (Step 7).
- **No unit in scope**: record `UI/UX Mockups: N/A — no work unit changes the user interface` in
  `## UI/UX Design` and `runtime-artifacts/audit.md`, announce it in one line, and return to
  `specs-and-test-plans.md` Part A.

## Step 2: Gather the inputs

Read, for the units in scope:
- the acceptance criteria in `spec/plans/stories.md` (or the single story of a bug or enhancement
  cycle) and the `Covers` REQ-IDs in `spec/plans/requirements.md`
- `spec/plans/functional-design.md`: component structure, interaction flows, states, validation rules
- `spec/plans/nfr.md`: accessibility and usability targets, when present
- `spec/plans/personas.md`, when present
- **brownfield**: the existing interface's styling, so the mockups look like the real application.
  Read the theme or token files, global CSS variables, and the component library in use under the code
  root. Do not invent a new visual language for an existing product.

Then load `common/ui-ux-design-standards.md`. It holds the accessibility, responsive
and design rules every screen must meet. In the `generate` and `provided+generate` modes, then run
**Section C** (Claude Design guidance): C1 decides whether it is available, and C2 loads its guidance
before any question is written.
- **Design questions**: if the inputs above leave visual basis, screen sizes, accessibility level,
  density, navigation, feedback style, loading style or brand colour undecided, write the questions
  file in its Section 1, containing only the open questions. Wait for the answers before Step 3 (Figma
  modes: before Section F0). If everything is already determinable, skip the file.

## Step 3: Build the mockups

Write everything to `spec/plans/ui-ux/`:

```text
spec/plans/ui-ux/
├── index.html                  # entry page: every screen, linked, grouped by work unit
├── SCR-01-<screen-slug>.html   # one file per screen
└── SCR-02-<screen-slug>.html

spec/plans/ui-ux-design.md      # the screen inventory (below)
```

Rules for every screen file:
- **Self-contained**: inline CSS, no external stylesheets, fonts, CDNs, images from the web, or build
  step. It must render correctly when opened straight from disk.
- **No application logic.** Plain HTML and CSS. A few lines of vanilla JavaScript are allowed only to
  switch between states or link screens. These files are design artifacts; `src/` never imports them.
- **Real content**: labels, button text, messages and sample data come from the acceptance criteria
  and functional design. No placeholder text.
- **Every state the ACs imply**: default, empty, loading, validation error, failure and success,
  shown as sections or a state switcher on the same page.
- **One token block**: the same `:root` design-token block in every screen
  (`common/ui-ux-design-standards.md` Section 2), so all screens share one palette, type scale and spacing.
- **Accessible**: meets `ui-ux-design-standards.md` Section 3 at the agreed level, with WCAG 2.2 AA as
  the minimum.
- **Responsive** across every supported screen size, per `ui-ux-design-standards.md` Section 4.
- **UX patterns** per `ui-ux-design-standards.md` Section 5, unless an answer or the existing product
  sets them differently.
- **A header comment** naming what the screen covers:

```html
<!--
  Screen: SCR-02 Sign-in
  Work units: story-1.2 (PROJ-102)
  Acceptance criteria: AC-1, AC-2, AC-4
  States: default, validation error, locked account
-->
```

**Scope rule**: the mockups show what the approved acceptance criteria describe and nothing more. A
control or flow beyond them is left out. If it would clearly be needed, list it in
`ui-ux-design.md` under Out of scope so the user sees it at review.

Write `spec/plans/ui-ux-design.md`:

```markdown
# UI/UX Design

| Screen | File | Work units | Acceptance criteria | States |
|---|---|---|---|---|
| SCR-01 Dashboard | ui-ux/SCR-01-dashboard.html | story-1.1 | AC-1, AC-3 | default, empty, loading |

## Design system
- Visual basis: [existing application / brand guidelines / Material / framework defaults / neutral]
- Supported screen sizes: [desktop / desktop and tablet / desktop, tablet and mobile]
- Accessibility level: [WCAG 2.2 AA / AAA where achievable]
- Density, navigation, feedback style, loading style: [answers or derived values]
- Tokens: [colour roles with hex values, spacing scale, type scale, radius, elevation, icon set]
- Breakpoints: [values in use]

## Standards check
[Result of the ui-ux-design-standards.md Section 7 self-check: passed, or each item fixed]

## Design decisions
- [visual and layout decisions, with the reason for each]

## Out of scope
- [anything seen as needed but not covered by the approved acceptance criteria — not built]

## Review history
| Round | Requested change | Applied |
|---|---|---|
```

## Step 4: Open the mockups for review

1. Before presenting, run the `ui-ux-design-standards.md` Section 7 self-check on every screen file.
   Also confirm that every label and message matches the acceptance criteria, every link in
   `index.html` resolves, and the markup is well formed. Fix every failure first, and record the
   result under Standards check in `ui-ux-design.md`.
2. Open `spec/plans/ui-ux/index.html` in the user's default browser. Use `start "" <path>` on Windows,
   `open <path>` on macOS, or `xdg-open <path>` on Linux. No server or extra tooling is needed. If the
   browser cannot be opened from the session, give the user the full file path to open themselves.

## Step 5: Review and approve

Present the standardized 2-option message, then WAIT. Do not invent a third option, and do not
proceed on silence.

```markdown
# UI/UX Mockups Complete

[S] screen(s) for [U] work unit(s) — opened in your browser from `spec/plans/ui-ux/index.html`
[One line per screen: SCR-ID — name — work units — states shown]
Out of scope (not built): [items, or "none"]

> **<u>REVIEW REQUIRED:</u>**
> Mockups: `spec/plans/ui-ux/index.html`
> Screen inventory: `spec/plans/ui-ux-design.md`

> ** <u>**WHAT'S NEXT?**</u>**
>
> **You may:**
>
> **Request Changes** - Describe the changes to any screen, state or layout
> **Continue to Next Stage** - Approve the mockups and proceed to the behaviour specs and test plans

---
```

- **Request Changes**: apply the changes to the named screen files, add a row to the Review history,
  re-run the standards self-check on the changed screens, reopen `index.html`, and present the
  message again. Repeat until the user approves. This loop is driven by the user, so the self-healing
  attempt cap does not apply to it. A requested change never lowers the accessibility floor in
  `common/ui-ux-design-standards.md` Section 3; if one would, say so and offer the nearest compliant
  alternative.
  - A requested change that goes beyond the approved acceptance criteria is not built. Add it to
    **Out of scope** and say in one line that it needs an acceptance-criteria change: through
    `epic-change-request` in an epic cycle, or a new ticket in a bug or enhancement cycle. Then
    continue.
- **Continue to Next Stage**: go to Step 6.
- Log the prompt before presenting it and the user's complete raw response after receiving it, per
  `common/audit-logging.md`.

## Step 6: Register and hand over

1. Add one row per screen file to `## Design References` in `runtime-artifacts/aire-state.md`:

   | # | Path / Location | Type | Governs | Read? | Read At Stage |
   |---|---|---|---|---|---|
   | n | spec/plans/ui-ux/SCR-02-sign-in.html | UI prototype (AIRE-generated) | story-1.2 | Yes | UI/UX Mockups |

2. Record each Out of scope item as a `Reconciled` row (decision: EXCLUDED — not in the approved
   acceptance criteria), per DR-8, so no later stage builds it from the mockup.
3. Update `## UI/UX Design` with `Screens`, `Work units covered`, `Review rounds` and `Approved`
   (ISO 8601 timestamp).
4. Return to `specs-and-test-plans.md` Part A. The files are committed with the design commit at
   the end of the STOP CHECKPOINT. This stage makes no commit of its own.

## Step 7: Provided designs

Used in `provided`, `provided+generate` and `provided+figma` modes.

1. Every provided path is already registered in `## Design References` (DR-1). Confirm each exists
   and read its content (DR-2, DR-3). Images and PDFs are read visually, HTML and CSS as text, and
   Office documents by unzipping them. A Figma link is read through the Figma MCP when a provider
   resolves (Section F0): the page or frame structure, a screenshot of every frame in scope, and the
   design context (layout, text, tokens) of every frame that governs a work unit. That counts as
   reading it (DR-2).
2. If a provided item cannot be read (a design-tool file, a Figma link with no Figma provider
   connected, or a link that needs a sign-in), say which item and ask the user for an export (PNG,
   JPG, PDF or HTML) placed in `spec/context-project/new-references/`, or, for a Figma link, to connect
   Figma. If neither is supplied, record the item as `not readable — not used` in the registry, say so,
   and continue.
3. Write `spec/plans/ui-ux-design.md` with the screen inventory mapped to the provided files, and a
   **Not covered** list: every in-scope work unit that no provided design shows.
4. Report the coverage in one short block. In `provided` mode this needs no approval, because the
   designs are the user's own. Return to `specs-and-test-plans.md` Part A. In `provided+generate`
   mode, continue with Step 1 for the Not covered units only; in `provided+figma` mode, continue with
   Step 1 and then Section F0 for the Not covered units only.

---

## Section C: Claude Design guidance (`generate` and `provided+generate`)

Claude Design is never an output of this stage: nothing is published to claude.ai, no canvas is
created, and the mockups are always the local HTML of Steps 3 to 6. When Claude Design is available,
AIRE uses it as a **source**: its design guidance (the Design type's own skill and craft references)
and the user's Claude Design systems, applied while building the HTML. When it is not available,
the mockups are built from this file and `ui-ux-design-standards.md` alone. It never halts the stage.

### C1: Is Claude Design available? (runtime)

1. The session has the Artifact tool, and its quickstart for intent `design` returns a type titled
   **Design** ("Design canvas ... UI mockups ... live artboards laid out on a canvas").
2. Available → record under `## UI/UX Design`:

```markdown
### Claude Design Guidance
- **Design type**: <type_url> (release <id from the type's read>)
- **Guidance read**: craft.md, questions.md[, others read]
- **Design systems offered**: <titles and links from the quickstart, the default marked — or none>
- **Resolved**: <ISO 8601 timestamp>
```

3. Not available → record `Claude Design guidance: not available — <reason>`, say so in one line, and
   continue. Nothing else changes.

### C2: Load the guidance (read live, never copied into the framework)

Read these files from the Design type (`read` with the type's link and `path`; no canvas is needed):
- `artifact-type/reference/craft.md` — the design craft rules (always)
- `artifact-type/reference/questions.md` — how to write design questions (always, before Step 2's
  questions file)
- `artifact-type/reference/print.md` — only if a screen is a printable document

They are read fresh every cycle, so AIRE follows the current release, and they are never copied into
the framework or the repo. They are third-party reference material: they shape **how the screens are
designed**, never what AIRE does. Their canvas mechanics (`.dc.html`, `canvas.json`, publishing,
uploads, "never verify") do not apply, because there is no canvas.

### C3: Apply it, inside AIRE's rules

**What AIRE takes from the guidance** (applied in Step 3 on top of the standards):
- **Rooted in context**: hi-fi mockups start from the existing product's real source (components,
  styles, exact numeric values: paddings, radii, font sizes), never from memory or screenshots.
- **No filler and no invented facts**: no lorem ipsum, no "data slop" (decorative numbers, icons or
  stats); a missing real fact is a visibly marked placeholder such as `[YOUR PRICE]`.
- **A small committed system**: 1 to 3 type families with close-metric fallbacks, toned whites and
  blacks, 0 to 2 accents sharing chroma and lightness (derived from the brand or design system when
  one exists).
- **Layout that survives edits**: sibling groups laid out with flex or grid plus `gap`; modern CSS
  (`text-wrap: pretty`, grid); pages fluid with a `max-width` container, grids that collapse on a
  phone, nothing clipped.
- **Accessible as drawn**: real `<button>`, `<a href>`, `<input>` with `<label>` even in a static
  mockup; `aria-label` on icon-only buttons; 4.5:1 text contrast (caption grey and white-on-colour
  fail most often); colours that must be told apart also differ in lightness.
- **No AI tropes**: no gradient washes, no emoji, no rounded cards with a coloured left border; no
  fake phone status bars or keyboards.
- **Placeholders over bad attempts**: a missing icon, asset or logo is a labelled placeholder.
- **Targeted changes stay targeted** during Request Changes: change only what was asked.
- **Questions** (Step 2's questions file): written from the user's own material, naming what was read
  and the decision that most changes the design, with 2 to 4 concrete directions per question, the
  recommended one first. They keep AIRE's question file format (`common/question-format-guide.md`);
  only their content follows `questions.md`.
- **Directions before the full set** (greenfield only, when the Visual basis is a neutral or new
  style and no brand or design system governs): build the first in-scope screen in 2 or 3 genuinely
  different named directions under `spec/plans/ui-ux/directions/` (for example
  `direction-a-dense-data-first.html`), open them, and add one question to the questions file: which
  direction to build in. Build every screen in the chosen one; delete the other direction files
  before Step 6.

**Where AIRE's rules win** (the guidance does not override them):
- **Scope**: the approved acceptance criteria decide what is on a screen. The guidance's "bold
  aesthetic" and "ask before adding material" never add anything beyond them.
- **Brownfield**: the existing product's look, not a new bold direction.
- **Self-contained files** (Step 3): no Google Fonts link or other external font; use the agreed
  family through a system font stack, or note the web font as a code-generation decision.
- **The standards**: WCAG 2.2 AA minimum, every supported size, the Section 7 self-check, and the
  Step 4 review (the guidance's "never verify" is a canvas rule and does not apply).
- **Branded Anthropic colours** in the guidance are for Anthropic's own work and are never used for a
  product unless the user asks.

### C4: Claude Design systems

When the Visual basis answer chose a Claude Design system (`ui-ux-design-standards.md` Question 1,
option F):
1. Read the system's `project/README.md` and `project/tokens.json` (`read` with the system's link).
2. Map its tokens into the shared `:root` token block of every screen (colours, type, spacing, radii,
   shadows), with exact values.
3. Follow its README's visual rules (voice, iconography, corners, imagery) inside AIRE's rules above.
   Its logos and images are copied only when the README says they may be used for this product and
   they can be inlined; otherwise a labelled placeholder.
4. Record the system's title, link and token version under Design system in `ui-ux-design.md`.

The organisation's default system is often the delivery firm's own brand, not the product's: it is
offered as an option, never applied without the Visual basis answer choosing it.

### C5: Record and hand over

The output is the ordinary HTML of Steps 3 to 6, so Step 6 registers it exactly as before (Type
`UI prototype (AIRE-generated)`). `ui-ux-design.md` gains one line under **Design system**:
`Claude Design guidance: applied (release <id>; craft.md, questions.md[, design system <title>])` or
`Claude Design guidance: not available — <reason>`.

---

## Figma output (modes `figma` and `provided+figma`)

These sections replace Steps 3 to 6. The deliverable is one new page per cycle in the project's
Figma file, holding one frame per screen and state, built from components and colour variables. The
user reviews it through its Figma link. Nothing is written to `spec/plans/ui-ux/`: the Figma page is
the design, and `spec/plans/ui-ux-design.md` is its in-repo record (screen inventory with frame links,
tokens, decisions, review history).

### F0: Resolve the Figma provider (runtime, never hardcoded)

Tool names differ between deployments, so resolve them when this section runs, exactly as
`common/helix-atlas-integration.md` Section 3 does for Helix:

1. List the connected MCP servers and their tools.
2. Match a Figma provider: a server whose name or description mentions Figma and that exposes a tool
   that runs Figma Plugin API code against a file. Then map, by description, the tools for: creating a
   file, starting a file session (when the provider has one), searching design libraries, taking a
   screenshot of a node, reading node metadata, and reading a node's design context. The official
   Figma MCP names these `use_figma`, `create_new_file`, `create_session`, `search_design_system`,
   `get_screenshot`, `get_metadata` and `get_design_context`, but confirm them every time.
3. Load the provider's own usage guidance before the first write. The official Figma MCP ships skills
   (`figma-use`, `figma-generate-design`; exposed as plugin skills or as `skill://figma/...` resources
   on the server). Follow them for every Plugin API call: they hold the API rules this section does
   not repeat.
4. Record the binding under `## UI/UX Design`:

```markdown
### Figma Binding
- **Server**: <resolved MCP server name>
- **Write tool**: <name> — runs Plugin API code
- **Read tools**: <screenshot>, <metadata>, <design context>
- **File / session tools**: <create file>, <start session, or none>
- **Resolved**: <ISO 8601 timestamp>
```

**No provider resolves** → HALT and show exactly (the setup steps are the same as the README's Figma
prerequisite; keep the two in step):

````markdown
Figma is not connected in this session, so the Figma design page cannot be created.

**How to connect Figma to Claude Code**

1. In your terminal, run:

   ```bash
   claude mcp add --transport http figma https://mcp.figma.com/mcp
   ```

   By default this adds Figma to the current project only. To make it available in all your projects,
   add `--scope user`:

   ```bash
   claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
   ```

2. Start a new Claude Code session.
3. Type `/mcp` and select **figma**.
4. Select **Authenticate**. A browser page opens.
5. Click **Allow access**.
6. Go back to Claude Code. You should see `Authentication successful. Connected to figma.`
7. To confirm the connection, type `/mcp` again.

If Figma was already added and only needs signing in, steps 3 to 7 are enough and you can stay in this
session. If you had to add it (step 1), start a new session and resume this workflow there: it picks up
at the UI/UX stage.

A) I have connected Figma. Check again.

B) Switch this cycle to HTML mockups instead.

[Answer]: 
````

**A** re-runs F0 (the check is repeatable; it is the user's action, not a self-healing loop); still not
connected → show the same message again. B records `Mode: generate` (or `provided+generate`), logs
the switch, and continues with Step 3. Log the prompt and the complete raw answer.

### F1: Open the file and create the cycle page

1. **File**. `Figma File` holds a link → take the file key from it (`figma.com/design/<fileKey>/...`;
   for a branch link `.../branch/<branchKey>/...`, use the branch key). `Figma File` is `new` →
   **confirm first**, because this writes to the user's Figma account:
   `Create a new Figma file named "<Project> — Design" in your Figma account? (yes/no)`.
   **yes** → create it and record its link in `Figma File`. no → ask for the link of an existing
   file and record it. Log the prompt and the raw answer.
2. **Session**. When the provider has a session tool, start one for this file with a one-line task
   description and pass its id on every later call of this stage.
3. **Inspect before writing** (read-only): list the file's pages, its local variable collections and
   its local components.
4. **Page**. Create a page named `<CYCLE-ID> — <cycle title>` (for example `PROJ-12 — Customer
   Portal`) and do all work on it. If a page with exactly that name already exists (a resumed cycle),
   reuse it and never create a second one. Never modify, move or delete anything on any other page:
   earlier cycles' pages are the record of what was approved then.
5. Record `Figma Page` (name and page node id) under `## UI/UX Design`.

### F2: Design system (search first, then build)

1. **Search the libraries** the file can use (connected team libraries and the file's own local
   variables and components) for every element the screens need: buttons, inputs, navigation, cards,
   tables, badges, icons, and colour, spacing and type tokens.
2. **A library covers it** → import and use it. On brownfield, the product's own library is the
   visual basis (`common/ui-ux-design-standards.md` Section 6); never invent a new visual language.
3. **Local tokens from an earlier cycle** exist in this file → reuse them and add only the tokens
   still missing.
4. **Nothing covers it** → build it on the cycle page:
   - one variable collection, `<Project> Tokens`, holding the agreed token block
     (`ui-ux-design-standards.md` Section 2) as variables, each with explicit scopes (fills, text,
     strokes), never the all-scopes default;
   - one local component (or variant set) for every element that repeats or maps to a reusable code
     component, with TEXT, INSTANCE_SWAP and BOOLEAN properties for its content. Keep them in a
     `Components` frame on the cycle page, below the screens;
   - icons imported from SVG source (the existing product's icon set on brownfield), never redrawn
     from rotated lines or shapes.
5. Every fill, stroke and text colour in F3 is bound to a variable. A raw colour value is a self-check
   failure (F4).
6. Font: on brownfield, the product's font; otherwise the agreed one. Verify the exact style names
   available before using them.

### F3: Build the screens

1. **One top-level frame per screen**, named `SCR-NN <Screen name>`, using the same SCR numbering and
   scope rule as Step 3: real content from the acceptance criteria, nothing beyond them (extra items go
   to Out of scope).
2. **One frame per state** the ACs imply, placed beside its screen and named
   `SCR-NN <Screen name> — <State>` (Empty, Loading, Error, Success...). **One frame per supported
   size** beyond desktop, named `... — Tablet` / `... — Mobile` (desktop 1440, tablet 768, mobile 375
   wide, unless the agreed breakpoints say otherwise).
3. Lay the frames out on the page in work-unit order, left to right, states and sizes in a row beneath
   their screen. Every container that holds related children uses auto-layout.
4. Build each screen from component instances and bound variables, in retry-safe batches (one screen
   per call is a good size). Return the created node ids from every call and record them.
5. Never put a flattened screenshot or rendered image of a whole screen into a frame: every screen is
   editable layers. Never generate images with paid Figma AI features without asking the user; use
   neutral placeholders instead.
6. Write `spec/plans/ui-ux-design.md` as in Step 3, with a `Figma node` column in the screen table and
   a `Figma` line under Design system naming the file, the page and the variable collection.

**Known Plugin API pitfalls** (seen in real runs; keep the provider's own guidance as the authority):
- Swapping an INSTANCE_SWAP property renames the swapped layer to the new component's name, so find
  nested icons by node type, not by the layer name set in the main component.
- A variant set created by combining components keeps a fixed size: set both of its axis sizing modes
  to auto, or its variants are clipped.
- New auto-layout frames get a white fill by default: clear it on frames that should be transparent.
- A Plugin API script that throws is rolled back in full, so a corrected script can be re-run safely.

### F4: Self-check and review

1. **Structure check** (read-only): for every screen frame, its descendant count by node type and any
   image-filled node. A frame that is mainly an image is a failure: rebuild it as layers.
2. **Self-check**: run `ui-ux-design-standards.md` Section 7, applying only the items a static design
   can show: every colour bound to a variable, contrast for each foreground/background token pair,
   visible labels, state never shown by colour alone, targets of at least 24 by 24 (44 by 44 on touch
   sizes), every implied state present, every supported size present, no emoji as icons. Items that
   exist only in running code (landmarks, `aria-*`, focus order, `prefers-reduced-motion`, viewport
   meta) are recorded `N/A — enforced in code generation Step 1.6`. Fix every failure, and record the
   result under Standards check.
3. **Visual check (internal)**: take a screenshot of every frame with the provider's screenshot tool,
   for AIRE's own inspection only. Compare it with the acceptance criteria and look for clipped text,
   overlaps and leftover placeholder text. Fix with targeted edits, never a rebuild. A script that
   ran without error is not evidence that the screen looks right; only the screenshot is. These
   screenshots are never saved to the repo and never shown in place of the link.
4. **Open for review**: give the user the page link
   `https://www.figma.com/design/<fileKey>/?node-id=<page-id>` (the page id with `:` written as `-`),
   and open it in the default browser as in Step 4. The user reviews in Figma itself.
5. Present the Step 5 message with these changes, then **WAIT**:

```markdown
# UI/UX Design Complete (Figma)

[S] screen(s) for [U] work unit(s) — on the Figma page `<CYCLE-ID> — <cycle title>`
[One line per screen: SCR-ID — name — work units — states and sizes shown]
Out of scope (not built): [items, or "none"]

> **<u>REVIEW REQUIRED:</u>**
> Figma page: <page link>
> Screen inventory: `spec/plans/ui-ux-design.md`

> ** <u>**WHAT'S NEXT?**</u>**
>
> **You may:**
>
> **Request Changes** - Describe the changes to any screen, state or layout (or edit the page in Figma yourself and say so)
> **Continue to Next Stage** - Approve the designs and proceed to the behaviour specs and test plans

---
```

- **Request Changes**: make the changes in Figma, re-run the self-check and visual check for the
  changed frames, add a Review history row, and present the message again. All Step 5 rules apply (no
  cap, accessibility floor, beyond-AC changes go to Out of scope).
- The page is shared, so the user may edit it directly between rounds. Before every round and before
  approval, re-read the page structure and screenshot any frame that changed; fold what the user
  changed into `ui-ux-design.md`, and apply the scope rule to it like any other change.
- **Continue to Next Stage**: go to F5.

### F5: Register and hand over

1. Add one row per screen to `## Design References`:

   | # | Path / Location | Type | Governs | Read? | Read At Stage |
   |---|---|---|---|---|---|
   | n | https://www.figma.com/design/<fileKey>/?node-id=<frame-id> | Figma design (AIRE-generated) | story-1.2 | Yes | UI/UX Mockups |

2. Record Out of scope items as `Reconciled` rows, as in Step 6.
3. Update `## UI/UX Design` with `Screens` (SCR-ID to node id), `Work units covered`,
   `Review rounds` and `Approved`.
4. **The live Figma frames are the design.** Code generation reads them through the Figma provider
   (`code-generation.md` Step 1.5). A change someone makes to the page after approval is picked up by
   the next story that reads the frame; to have it reviewed, raise it through `epic-change-request`
   (or a new ticket in a bug or enhancement cycle) like any other design change.
5. Return to `specs-and-test-plans.md` Part A. `ui-ux-design.md` rides the design commit at the end of
   the STOP CHECKPOINT. Nothing in Figma is committed, and this stage makes no commit of its own.

---

## How later steps use the mockups

- **Behaviour specs and test plans** (`specs-and-test-plans.md` Parts A and B, immediately after this
  stage): scenario steps and manual test steps use the screen names, labels and messages shown in the
  approved mockups.
- **Code generation** (`dev-implement`, `bug-fix-implement`, `enhancement-implement`): the
  registered rows bring DR-5 into force. Every component in the code-generation plan carries
  `Design reference: spec/plans/ui-ux/<file> — grounded (…)`, or `none covers this component`.
  `code-generation.md` Step 1.6 then applies `common/ui-ux-design-standards.md` to the real frontend
  code, using the agreed tokens, accessibility level, screen sizes and UX patterns recorded in
  `ui-ux-design.md`.
- **Precedence** for AIRE-generated mockups: the approved acceptance criteria decide behaviour and
  scope, and the mockup decides layout, wording and visual detail the criteria leave open. Recorded
  reconciliations win over both (DR-8). User-provided designs follow DR-8 as written.
- **Cycle close**: `archive-epic` archives `spec/` in full, so the mockups are kept with the cycle. In
  the Figma modes the archive keeps `ui-ux-design.md` with its frame links, and the cycle's page stays
  in the Figma file.
- **Atlas**: when Atlas Artifact Sync is enabled, the screen files and `index.html` are uploaded to the
  cycle's Atlas folder like every other spec artifact (`common/atlas-artifact-sync.md` Section 5). In
  the Figma modes only `ui-ux-design.md` is uploaded.
- **Figma modes**: everything above applies, with the live Figma frame as the reference. Behaviour
  specs and test plans use the frame names, labels and messages;
  code generation reads each governing frame through the Figma provider (`code-generation.md`
  Step 1.5) and maps the Figma variables to the project's theme (Step 1.6).

## Rules (for the stage compliance summary)

| Rule | Requirement |
|---|---|
| UX-01 | Every in-scope work unit has an approved mockup (HTML or Figma) or a readable provided design, or is listed as Not covered in `provided` mode |
| UX-02 | Generated mockups and Figma frames show nothing beyond the approved acceptance criteria; extra items are listed as Out of scope and reconciled |
| UX-03 | Mockups or Figma designs are approved before the behaviour specs and test plans are written |
| UX-04 | Every approved mockup, every approved Figma screen and every readable provided design is registered in `## Design References` |
| UX-05 | Screen files are self-contained and never imported by application code |
| UX-06 | Every generated screen passes the `ui-ux-design-standards.md` Section 7 self-check (accessibility at WCAG 2.2 AA minimum, responsive across every supported size, shared tokens); in the Figma modes, the static subset in F4 |
| UX-07 | Figma modes only: all work is on the cycle's own page, no other page is changed, every screen is editable layers (no flattened image), every colour is bound to a variable, every frame passed the F4 visual check, and every screen is registered with its frame link |

Before the STOP CHECKPOINT every rule is N/A. After this stage completes, UX-01 to UX-06 apply
(UX-06 is N/A in `provided` mode). UX-07 applies in the `figma` and `provided+figma` modes only.

## State and audit

Record in `runtime-artifacts/aire-state.md`:

```markdown
## UI/UX Design
- **Mode**: generate
- **Claude Design guidance**: applied (release <id>) | not available — <reason> (Section C; — in the Figma modes)
- **Provided design path(s)**: —
- **Figma File**: —
- **Decided At**: Requirements Analysis
- **Screens**: [S] in spec/plans/ui-ux/
- **Work units covered**: [U]
- **Review rounds**: [R]
- **Approved**: [ISO 8601 timestamp]
```

In the Figma modes the section also carries:

```markdown
- **Figma File**: https://www.figma.com/design/<fileKey>/<name>
- **Figma Page**: <CYCLE-ID> — <cycle title> (node <page-id>)
- **Screens**: SCR-01 Dashboard → <node-id>, SCR-02 Sign-in → <node-id>, ... (replaces the
  `[S] in spec/plans/ui-ux/` form)

### Figma Binding
(per Section F0)
```

Log in `runtime-artifacts/audit.md`, per `common/audit-logging.md`: the stage start, the scope
decision, each review round (the user's complete raw request and what changed), the approval prompt
and the user's complete raw response. In the `generate` modes also log the Section C1 result, the
guidance files read (with the type release), the design system used, and the direction options built
and chosen, if any. In the Figma modes also log: the resolved binding (or the F0
halt, its prompt and raw answer), the file-creation prompt and raw answer, the page created or reused,
and the node ids of every screen built.
