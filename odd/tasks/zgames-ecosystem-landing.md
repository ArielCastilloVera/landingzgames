# ZGames Ecosystem Landing

## Objective

Restore the landing to the supplied ZGAMES HTML and desktop screenshot's editorial visual system while accurately adapting its content to Proposal 2 and the technical functional brief.

## Problem and Why

The current landing explains the ecosystem but diverges from the supplied template's visual hierarchy. Its active stylesheet does not load FX Ambasans and its hero uses generic football imagery. The user wants the supplied template's composition restored, product content grounded in Proposal 2 and the technical brief, and mock image assets clearly named and placed.

## Authorized Scope

- Update the root `.gitignore` to ignore `/design/`.
- Rework landing composition and styles to match the template's black/green editorial hero, ticker, numbered sections, image gallery, green contact panel, and restrained footer while preserving modular Astro sections.
- Adapt current ecosystem/journey/capabilities content to Proposal 2 and verify claims against the technical brief; do not claim unverified live integrations or capabilities.
- Load the provided FX Ambasans font family across the page.
- Create separate, replaceable image mockups at `public/images/landing/hero-ecosystem.webp`, `ecosystem-platform.webp`, `operator-dashboard.webp`, and `customer-journey.webp`; use them respectively in the hero, ecosystem section, operator gallery, and customer-journey section.
- Use the supplied logo and brand assets where present; keep the PDFs themselves under ignored `design/`.
- Reformat touched Astro, TypeScript, and CSS into readable multiline code; preserve component boundaries and avoid needless abstractions or duplication.
- Preserve all pre-existing uncommitted work and the running dev server.
- No backend, API, tracking, external service integration, or dependency additions.

## Constraints and Source of Truth

- Proposal 2 defines the B2B message and ecosystem structure; the technical brief controls which features may be claimed; the visual-line PDF controls identity.
- Use official logo treatment, FX Ambasans where available, and black, `#E5E5E5`, and `#42C148`.
- Do not claim operational ZPay/Center integration, metrics, certifications, SLAs, APIs, coverage, or other unverified capabilities.
- TDD mode: Standard for this task, explicitly authorized by the user because no project TDD configuration or test runner exists. Exact functional check: `pnpm run build`. Runtime proof: visual desktop/mobile inspection using the already-running dev server.
- Route: delegated direct implementation; trigger: coordinated changes across multiple non-trivial Astro/data/style/assets files. One writer; parent owns review, verification, and commits.
- Forecast: more than 400 authored changed lines is likely because touched one-line source must become multiline and the landing is being structurally redesigned. Delivery strategy: `ask-on-risk`; chain strategy: `feature-branch-chain` (previously selected by the user for this feature branch). No PR was requested or created. Do not compress code or omit behavior/tests to reduce line count.

## Acceptance Criteria

- [ ] Landing follows the visual hierarchy of `design/ZGAMES_landing_desktop.png` and `design/ZGAMES_landing_propuesta.html` while explaining the ecosystem for operators, suppliers, and players.
- [ ] Diagram/product groups represent Jugadores/Sorti; PAN/Backoffice; SortiEngage, ZTickets, ZPay; Science 365 and Center.
- [ ] Journey, external integrations, and operator-specific demo/architecture CTA are clear and responsive.
- [ ] ZPay is identified as in development; no unsupported integrated payment journey or product claims appear.
- [ ] FX Ambasans is loaded and used site-wide; named mockup images are present at the specified paths and correct sections with appropriate alt text.
- [ ] Source touched by this work is readable multiline Astro/TypeScript/CSS with clear naming and no gratuitous abstractions.
- [ ] Astro build succeeds and desktop/mobile layouts are visually checked.

## Tasks

- [x] **ZG-01 — Ignore local design references**: added root `/design/`; `git check-ignore -v 'design/ZGAMES LINEA (1) (1).pdf'` confirms the PDF is ignored.
- [ ] **ZG-02 — Restore the template design**: implementation is present and builds, but committing/publishing FX Ambasans is paused because the supplied `iFonts-License.txt` says “Demo for Personal Use.” Confirm commercial web-embedding rights or authorize a commercially licensed alternative before finalizing font assets.
- [ ] **ZG-03 — Verify the landing**: `pnpm run build` and `pnpm exec prettier --check .` both pass; parent reran build. A static built-page audit found 15 in-page links, 4 images with non-empty alt text and existing output assets, and no broken anchor targets. Desktop/mobile browser inspection remains pending because the Browser plugin reports no available browser. Local dev server was started on `127.0.0.1:4321` after confirming none was running.
- [x] **ZG-04 — Match template header, logo, and button hover**: the supplied logo is used in header and footer; header/nav proportions, active underline, and CTA hover match the template's CSS transition. `pnpm run build`, `pnpm exec prettier --check .`, `git diff --check`, and static header/footer/logo/hover checks pass. Visual viewport inspection remains tracked under ZG-03; no commit was made per the current scoped instruction.

## Progress

- 2026-09-22: Read-only audit of all three PDFs and existing implementation completed.
- 2026-09-22: ZG-01 complete; the root design folder is ignored and the supplied PDF resolves to `.gitignore:36`.
- 2026-09-23: Landing source and four mockups implemented; FX Ambasans CSS is wired locally, but production/commit is paused pending clarification of the supplied demo-only font license.
- 2026-09-23: ZG-03 build and format checks pass; static link/image/accessibility checks pass; parent reran `pnpm run build` successfully. Dev server is now running at `http://127.0.0.1:4321`; Browser plugin discovery returned no browser, so viewport inspection is still pending.
- 2026-09-23: Native review STATUS refused before mutation (`operation_failed`, loopback permission); risk assessment was unassessable because the pre-existing task/font folders and new mock assets are untracked. Independent code review found no actionable issues. No native approval is claimed.
- 2026-09-23: Header now uses the supplied logo and template's 95px black bar, active-nav underline, and green CTA with gray-hover/2px lift. Hero CTA shares the same hover. Build, Prettier, diff whitespace, and static selector/asset checks pass. `astro:assets` image optimization required unavailable Sharp, so the imported local asset metadata is used directly without transformation. No commit was made.

## Next Step

Resolve the FX Ambasans commercial web-license question before staging or committing font files; if the license is not held, wait for authorization to use an alternative. Complete desktop/mobile visual inspection when a browser becomes available. Do not commit or claim full completion while these blockers remain.
