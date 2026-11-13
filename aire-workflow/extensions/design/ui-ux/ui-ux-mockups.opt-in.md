# UI/UX Mockups — Opt-In

**Extension**: UI/UX Mockups

## Opt-In Prompt

The following question is automatically included in the Requirements Analysis clarifying questions
when this extension is loaded. Include exactly ONE of the two variants below, chosen when the questions
file is written:

- **Variant 1**: no design has been provided yet. `## Context Project` records `New References: No`,
  and `## Design References` has no row of Type `UI prototype`, `mockup or screenshot`,
  `Figma design` or `Figma design (exact match)`.
- **Variant 2**: designs were already provided, at the Context question or anywhere earlier.
  Substitute `[path]` with the recorded path(s).

### Variant 1

```markdown
## Question: UI/UX Mockups
Once the design stages are complete, should the user interface be designed for your review before development begins?

A) Yes, design mockups with Claude Design for review

B) Yes, design it in Figma. After [Answer]: add the link of the Figma file to add this cycle's design page to, or write `new` to create a new Figma file[LAST-FILE-HINT]

C) No, designs already exist. Place them in spec/context-project/new-references/ (or paste a Figma link) and enter the path after [Answer]:

D) No, skip this step

X) Other (please describe after [Answer]: tag below)

[Answer]: 
```

`[LAST-FILE-HINT]`: before writing the file, look for a `**Figma File**:` line in the most recent
archived cycle state (`aire-archives/*/*/runtime-artifacts/aire-state.md`, newest by its folder's last
commit). If one exists, substitute ` (last used: <that link>)` so the project keeps one Figma file with
one page per cycle. Otherwise substitute nothing.

### Variant 2

```markdown
## Question: UI/UX Mockups
The designs provided at [path] will be used as the reference for development. Should the screens those designs do not cover also be designed?

A) No, use the provided designs only

B) Yes, design mockups with Claude Design for the screens not covered

C) Yes, design the screens not covered in Figma. After [Answer]: add the Figma file link, or write `new`

X) Other (please describe after [Answer]: tag below)

[Answer]: 
```

## Recording the answer

| Variant | Answer | `## Extension Configuration` | `## UI/UX Design` Mode |
|---|---|---|---|
| 1 | A | `UI/UX Mockups` = Yes | `generate` |
| 1 | B (with a link or `new`) | `UI/UX Mockups` = Yes | `figma` |
| 1 | C (with a path or Figma link) | `UI/UX Mockups` = Yes | `provided` |
| 1 | D | `UI/UX Mockups` = No | `skip` |
| 2 | A | `UI/UX Mockups` = Yes | `provided` |
| 2 | B | `UI/UX Mockups` = Yes | `provided+generate` |
| 2 | C (with a link or `new`) | `UI/UX Mockups` = Yes | `provided+figma` |

- A Variant 1 C answer without a path, or with a path that does not exist, is incomplete: say so
  and ask for the path again, as a follow-up in the clarification file.
- A Figma answer (Variant 1 B, Variant 2 C) with neither a `figma.com/design/...` link nor
  `new` is incomplete in the same way: ask for one of the two as a follow-up.
- **Figma check at answer time** (the stage itself re-checks): when a Figma mode is recorded, check
  whether a Figma MCP provider resolves, per `ui-ux-mockups.md` Section F0. If none does, say that
  Figma is not connected in this session and show the How to connect Figma to Claude Code steps
  from the F0 halt message (steps 1 to 7 and the note after them, without the A/B choice), so the user
  can connect it before the design stage runs. Do not halt here.
- The Figma file link itself is NOT a design reference: it is the place AIRE writes to, not a
  description of the target state. Do not register it under `## Design References`.
- A path given in the answer is a design reference. Register it and read it immediately, per
  `common/design-reference-grounding.md` DR-1 and DR-2.
- **When no `UI/UX Mockups` row exists** (for example a cycle resumed from before this extension
  existed), treat it as No. This extension is never run by default.

Write the section in `runtime-artifacts/aire-state.md`:

```markdown
## UI/UX Design
- **Mode**: [generate | figma | provided | provided+generate | provided+figma | skip]
- **Provided design path(s)**: [exact path(s) — or —]
- **Figma File**: [the link given, `new`, or — when the mode is not a Figma mode]
- **Decided At**: Requirements Analysis
```
