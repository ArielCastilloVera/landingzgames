# ZGames Ecosystem Landing

## Objective
Replace the current brand-intro landing with an accurate, visually faithful B2B presentation of the connected ZGames ecosystem, using the three supplied PDFs as requirements and design references.

## Problem and Why
The current page focuses on brand identity and uses provisional CSS visuals, a recreated logo, Arial, and compressed one-line source. It does not explain the ecosystem or its verified product status. The user requested Proposal 2 alignment, PDF imagery, readable line breaks, clean code, and a local-only `design/` folder ignored by Git.

## Authorized Scope
- Update the root `.gitignore` to ignore `/design/`.
- Rework the landing composition, content, components, and styles to reflect Proposal 2 and the functional brief.
- Extract appropriate visual assets from the supplied brand/design PDF into `public/`; keep the PDFs themselves under ignored `design/`.
- Reformat touched Astro, TypeScript, and CSS into readable multiline code; preserve component boundaries and avoid needless abstractions or duplication.
- Preserve all pre-existing uncommitted work and the running dev server.
- No backend, API, tracking, external service integration, or dependency additions.

## Constraints and Source of Truth
- Proposal 2 defines the B2B message and ecosystem structure; the technical brief controls which features may be claimed; the visual-line PDF controls identity.
- Use official logo treatment, FX Ambasans where available, and black, `#E5E5E5`, and `#42C148`.
- Do not claim operational ZPay/Center integration, metrics, certifications, SLAs, APIs, coverage, or other unverified capabilities.
- TDD mode: Standard for this task, explicitly authorized by the user because no project TDD configuration or test runner exists. Exact functional check: `pnpm run build`. Runtime proof: visual desktop/mobile inspection using the already-running dev server.
- Route: delegated direct implementation; trigger: coordinated changes across multiple non-trivial Astro/data/style/assets files. One writer; parent owns review, verification, and commits.
- Forecast: more than 400 authored changed lines is likely because touched one-line source must become multiline and the landing is being structurally redesigned. Delivery strategy: `ask-on-risk`; ask the user to choose a chain strategy before the first over-budget commit if applicable. Do not compress code or omit behavior/tests to reduce line count.

## Acceptance Criteria
- [ ] Landing explains the ecosystem for operators, suppliers, and players, not just the ZGames brand.
- [ ] Diagram/product groups represent Jugadores/Sorti; PAN/Backoffice; SortiEngage, ZTickets, ZPay; Science 365 and Center.
- [ ] Journey, external integrations, and operator-specific demo/architecture CTA are clear and responsive.
- [ ] ZPay is identified as in development; no unsupported integrated payment journey or product claims appear.
- [ ] Relevant PDF imagery and official brand assets replace CSS placeholders/recreated mark; image alt text is appropriate.
- [ ] Source touched by this work is readable multiline Astro/TypeScript/CSS with clear naming and no gratuitous abstractions.
- [ ] `/design/` is ignored without ignoring unrelated nested folders.
- [ ] Astro build succeeds and desktop/mobile layouts are visually checked.

## Tasks
- [x] **ZG-01 — Ignore local design references**: added root `/design/`; `git check-ignore -v 'design/ZGAMES LINEA (1) (1).pdf'` confirms the PDF is ignored.
- [ ] **ZG-02 — Redesign the landing**: implement Proposal 2 content, verified claims, official PDF imagery/brand direction, responsive layout, and readable multiline source as one cohesive deliverable.
- [ ] **ZG-03 — Verify the landing**: run the build, inspect desktop/mobile, check links/anchors/accessibility basics, and record outcomes.

## Progress
- 2026-09-22: Read-only audit of all three PDFs and existing implementation completed.
- 2026-09-22: ZG-01 complete; the root design folder is ignored and the supplied PDF resolves to `.gitignore:36`.

## Next Step
Implement ZG-02 with one delegated writer, update this checklist and Engram mirror after the task completes, then run ZG-03 and close with reviewable work-unit commits on the feature branch.
