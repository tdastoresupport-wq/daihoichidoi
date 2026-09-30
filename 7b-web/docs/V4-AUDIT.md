# V4 AUDIT — 7B Interactive Web Presentation
Date: 2026-10-01 | Method: source read (all files) + live browser (snapshot/screenshot/console/Lighthouse) | Build: check 0 errors, vite build PASS

## A. Architecture
Svelte 5 runes, `src/lib/*.svelte.ts` stores, scenes as components, `{#key}` remount routing, 1920×1080 CSS-scale canvas. Sound. No router/deps beyond GSAP.

## B. Game logic — VERIFIED IN BROWSER
Open → answer Q1 correct → piece unlock + progress 1/9; Q9 manual reveal + MC confirm → 2/9; lucky Q8 → 3/9 + chest. Grading, completion, back-navigation all work.

## C. State model
`scene/activeCell/status[9]/revealed/lastResult`, `completedCount` derived. Sound; `presented` correctly does NOT auto-complete (MC confirms). Lucky auto-completes on open (per spec).

## D. UX flow
Opening → Directions(5) → Lobby → Game ⇄ Lobby → Closing. Keyboard F/M/Esc/arrows verified in code; Space/Enter double-fire safe (preventDefault cancels native click).

## E–H. Visual / Layout / Type / Color
Matches V2 bible (navy/sapphire/cyan/gold, Paytone One + Bricolage, hero artwork, Nova-7B). Mystery board identical tiles ✓ (no category leak). Lighthouse a11y 100, best-practices 100.

## I. Artwork
All referenced assets exist. Unused on disk (not bundled): `fig-tam-giac.svg` (V1), `scene-rebus-puzzle.jpg`, `directions-06.jpg`. Q6 answer TBD (QA-PENDING, correct per rules).

## J. Animation
GSAP scene/stagger/select/flip/confetti; reduced-motion guards present.

## K. Audio
Waiting loop + WebAudio SFX + Q6 probe/fallback. Autoplay unlock on gesture; music confirmed "đang phát" in browser.

## L. Performance
JS 149KB gzip 56KB; images ~8MB local JPG (no preload stalls observed); backdrop-filter heavy but static scenes. Perf trace pending in V4 QA.

## M. Accessibility
Focus-visible present; all controls named; input has aria-label but no id/name (console issue); completed tiles don't expose state to AT.

## N. Projector readiness
1920×1080 verified full-bleed, ≥24px type, safe area respected. Grand modal is `position:fixed` OUTSIDE the scaled canvas (inconsistent on non-1080 screens).

## O. Browser/runtime risks
Google Fonts + mp3 + modules require HTTP — double-clicking `dist/index.html` (file://) = blank page. No offline font fallback.

## Prioritized findings
### P0
1. `--r-xl` used (Directions glass card) but NOT defined → border-radius silently 0. [static CONFIRMED → FIXED]
2. ~~Confetti invisible under modal~~ INVALID on re-check: `.canvas` transform creates stacking context; body-level fixed canvas z-60 paints above it. No change.
3. Grand reveal auto-fires 500ms after 9th completion even mid-answer-read in game scene (hijack). [code CONFIRMED → FIXED: fire only on lobby]
4. No offline fonts; file:// = blank page. [code CONFIRMED → FIXED fonts self-hosted; file:// documented as must-serve-HTTP]
5. Esc with grand modal open leaves modal over lobby. [code CONFIRMED → FIXED]
6. `probeClip` false-positive: preview SPA fallback returns 200 for missing clip → fallback banner never shows. [browser CONFIRMED → FIXED via content-type check]
### P1
6. `transition: all` ×13 (13 sites).
7. Accepted-list hygiene: dead diacritic entry, duplicate; norm only applied to input.
8. Answer input missing id/name (console issue).
9. Completed tiles don't expose "đã mở" to AT.
10. Grand modal outside canvas scale system.
11. Q6 fallback path never browser-tested; wrong-answer path never browser-tested.
### P2
12. Unused asset files on disk (documented, not bundled — no action required).
13. SEO meta (67) — kiosk app, low value.
14. Clip overlap (repeated play), no ducking under waiting music.
15. Ambient motion missing (§20 V4: slow light drift).
16. Missing-img fallback (§25: onerror hide).
