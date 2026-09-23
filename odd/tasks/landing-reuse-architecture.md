# Landing Reuse Architecture

## Objective

Refactor the active Astro landing into a maintainable, reusable structure for future product pages without adding product-detail routes in this task.

## Problem and Why

The active landing is implemented largely inside `src/pages/index.astro`, while `src/components/` contains an unused legacy Spanish site with content keys incompatible with the current landing. The user wants shared content and behavior separated from presentation, shared card types outside cards, centralized color tokens for SVGs, English UI/code strings, no emoji, and an accessible hamburger navigation.

## Authorized Scope

- Retire the unused legacy component tree and create reusable Astro layout/section/UI components for the current English landing.
- Keep reusable copy/content in `src/data/site.ts`; place reusable browser behavior in `src/scripts/`; place shared card/product types in `src/types/`.
- Centralize site colors in one stylesheet and reference its CSS variables from styles and inline SVG icons. Keep `public/favicon.svg` light/dark adaptation as the explicitly approved standalone-SVG exception.
- Centralize only shared copy, routes, and IDs; keep descriptive CSS classes local to markup and styles.
- Replace the header's text menu control and arrow glyph with accessible SVG icon components. Preserve native, keyboard-operable navigation behavior and reflect expanded state.
- Keep visible copy, identifiers, IDs, and classes in English. Remove emoji and do not add an icon dependency.
- Do not create product detail pages, add backend behavior, add dependencies, or create/push PRs.
- Preserve the current landing's verified product claims and existing work on `feat/zgames-ecosystem-landing`.

## Constraints and Source of Truth

- TDD mode: Standard, carried forward from the active landing task; no project test runner is configured. Functional command: `pnpm build`; style command: `pnpm format:check`.
- Route: delegated direct implementation; trigger: coordinated changes across multiple non-trivial Astro, TypeScript, and CSS files. One writer; parent owns verification, commit, and review orchestration.
- Delivery strategy: `ask-on-risk`; chain strategy selected by user: `feature-branch-chain`. No PR or remote operation is authorized. Forecast exceeds 400 authored changed lines due to structural extraction/removal; treat 400 as an advisory slicing heuristic, not a cap.

## Acceptance Criteria

- [x] The active landing renders through reusable Astro components and a shared layout; obsolete legacy components have no remaining imports and are removed.
- [x] Shared content, browser behavior, and reusable card/product types reside in their respective data, scripts, and types modules; cards do not redeclare shared interfaces.
- [x] Site color values are defined in one token stylesheet and used by CSS and inline SVGs. The standalone favicon retains its explicit light/dark treatment.
- [x] The header has an accessible hamburger control with accurate expanded/collapsed state, keyboard operation, and English accessible labels.
- [x] Active UI text, IDs, classes, and identifiers are English; no emoji remain; shared strings/anchors are centralized only when genuinely reused.
- [x] No product-detail routes or new dependencies are added.
- [x] `pnpm format:check` and `pnpm build` pass; generated route/anchor and menu accessibility checks are recorded.

## Tasks

- [x] **LRA-01 — Refactor landing for reuse**: created the reusable layout, sections, data/types/scripts/color/icon modules; rebuilt the active page and header; retired incompatible legacy components; passed formatting/build and focused architecture checks.

## Progress

- 2026-09-22: Read-only architecture mapping confirmed the active page/legacy component mismatch and current icon/color boundaries. User selected retirement of the legacy tree, external behavior modules, shared-value-only centralization, no product routes in this phase, preservation of the favicon's light/dark variant, and `feature-branch-chain` as the future PR-chain strategy.
- 2026-09-22: LRA-01 implemented. `pnpm format`, `pnpm format:check`, and `pnpm build` passed; the build generated `/index.html`. Stale component-reference, emoji, and anchor checks passed. An independent reviewer found no remaining plan gaps after the shared `Product` type was added.
- 2026-09-22: Browserless navigation smoke test on Node 26 passed: initial label/state, expanded-state synchronization, Escape close and focus return, and close after link activation. Browser/assistive-technology rendering was not exercised.
- 2026-09-22: Independent verification found and reported an out-of-scope navigation initializer in the layout module; it was restored inside the rendered module script. Final bundle inspection confirmed the import and invocation are both bundled; final build passed.
- 2026-09-22: Removed the optional `theme-color` meta value so the design palette remains centralized; the browser chrome now uses its default theme color. Other SEO metadata and the standalone favicon remain intact.
- 2026-09-22: Native RDD preflight failed safely before mutation (`operation_failed`, pre-native permission error). Risk assessment was `high/unassessable` because canonical untracked inventory could not be obtained. Writer self-verification, parent format spot-check, independent code/build verification, and browserless navigation smoke test completed; no review authority was created.
- 2026-09-22: Work-unit commit created: `e9876d5` (`refactor(landing): extract reusable Astro components`). No push or PR was created.

## Next Step

LRA-01 is committed and verified on `feat/zgames-ecosystem-landing`; no further work remains in this task.
