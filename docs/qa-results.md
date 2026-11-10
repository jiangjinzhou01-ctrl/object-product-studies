# QA results · 2026-11-09

## Final local checks

| Check                                 | Actual result                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Strict TypeScript project build       | Passed                                                                                                                         |
| ESLint                                | Passed, no errors or warnings                                                                                                  |
| Prettier                              | Passed                                                                                                                         |
| Production Vite build                 | Passed                                                                                                                         |
| Playwright / Chromium                 | **32 passed, 0 failed**, final full run 53.8 seconds                                                                           |
| axe WCAG 2 A/AA, 2.1 AA, 2.2 AA rules | Zero detected violations on six tested desktop pages                                                                           |
| Responsive layout                     | Eight main pages checked at 360, 390, 430, 768, 1024, 1440 and 1920px; no document horizontal overflow                         |
| Photography                           | All 21 WebP derivatives decoded; dimensions match the EXIF-corrected media records                                             |
| GitHub Pages subpath simulation       | Passed: prefixed images/fonts, navigation, refresh, model/differences URL, no local HTTP errors                                |
| GitHub Actions / live Pages           | Build, all 32 browser tests and artifact preparation passed; Pages initialization returned HTTP 403, so no live deployment yet |

The 32 tests cover ten content routes, same-category comparison selection/replacement/clearing/reset/sharing/reload/invalid URLs, mobile dialog focus cycling and Escape, keyboard color selection with fixed layout, scroll chapter changes, Mac workflow/port interactions, hash-compatible anchors, seven viewport widths, accessibility checks, reduced motion, horizontal table keyboard scrolling, tab arrow/Home/End behavior, visual state capture and cold-navigation layout stability.

Raw final Playwright results are archived in [playwright-results.json](playwright-results.json). The subpath verification record is [github-pages-smoke.json](github-pages-smoke.json). Automated axe checks do not establish complete WCAG conformance or replace assistive-technology user testing.

## Lighthouse measurements

Measured against the **local production build** with Lighthouse 13.6.0 and Headless Chromium 156. Desktop preset and default simulated mobile throttling were run separately. These are synthetic single-run measurements, not physical-phone or live-hosting results.

| Category                | Desktop | Simulated mobile |
| ----------------------- | ------: | ---------------: |
| Performance             |  **99** |           **83** |
| Accessibility           | **100** |          **100** |
| Best Practices          | **100** |          **100** |
| SEO                     |      92 |               92 |
| Cumulative Layout Shift |   **0** |            **0** |

Configuration, browser version, timing metrics and run timestamps are in [performance-results.json](performance-results.json). Full JSON reports: [desktop](lighthouse/desktop.json), [mobile](lighthouse/mobile.json). The original measurement outputs also remain in local `reports/`.

The initial measurement was desktop 89 / mobile 71, with CLS approximately 0.21. Lighthouse identified the footer moving from a short loading fallback to its final position. Reserving a full viewport for the route loading state removed the shift. A new cold-navigation regression check was added. The mobile LCP remains approximately 4.6 seconds under the selected simulation, so further improvement should prioritize earlier hero discovery and original photography optimized for its actual display composition.

## Failures found and fixed

The first 30-test pass had 23 passes and 7 failures. Fixes included readable secondary and accent contrast, valid ARIA labeling, explicit modal Tab cycling, and waiting for the URL-driven checkbox state rather than asserting during React's navigation transition. A subsequent resource-smoke timeout was traced to the test attempting to decode offscreen lazy images that had intentionally not loaded; it was corrected to inspect the actual visible region. Full-page screenshot capture explicitly loads photograph resources so captured pages contain real imagery.

All 32 tests passed after the fixes. There are no unresolved local build, lint or automated test failures.

## Visual inspection

The following real Chromium screenshots were opened and inspected for composition, crop, typography, information hierarchy and mobile behavior. Source changes corrected contrast, focus behavior, capture readiness and picture orientation. No static screenshot is used as the actual website UI.

- [Homepage desktop first screen](screenshots/home-1440.webp)
- [Homepage mobile first screen](screenshots/home-390.webp)
- [iPhone introduction](screenshots/iphone-hero-desktop.webp)
- [iPhone sticky narrative desktop](screenshots/iphone-narrative-desktop.webp)
- [iPhone sticky narrative mobile](screenshots/iphone-narrative-mobile.webp)
- [Mac introduction](screenshots/mac-hero-desktop.webp)
- [Mac display chapter](screenshots/mac-display-desktop.webp)
- [Compare desktop](screenshots/compare-desktop.webp)
- [Compare mobile](screenshots/compare-mobile.webp)
- [Open mobile navigation](screenshots/navigation-mobile.webp)

The intended MacBook Pro M6 visual review became a matching MacBook Pro M5 review following the documented photography fallback. No older image was relabeled M6. Full-size captures remain under `reports/screenshots/`; the committed WebP evidence is compressed and, for long pages, cropped to the relevant screen.

## Known limits and next checks

- No physical iPhone/Android device, low-end hardware, Safari, Firefox or screen-reader session was tested. Safe-area CSS is implemented; physical notched-device behavior remains to be verified.
- MacBook Pro M6 and MacBook Air M5 photo stories were intentionally replaced with exact photographed M5 Pro-laptop and M4 Air models. See [product research](product-research.md).
- Retail photography includes background objects, cables and old price labels. These are not website offers. Original commissioned photography is the highest-value next improvement.
- The public repository was created and source pushed. GitHub Actions run [42793343554](https://github.com/jiangjinzhou01-ctrl/object-product-studies/actions/runs/42793343554) passed typecheck, lint, format, production build and all 32 Playwright tests, then failed at Pages initialization. `actions/configure-pages` with `enablement: true` received `Resource not accessible by integration` (HTTP 403) while creating the Pages site. Select GitHub Actions once in repository Settings → Pages, then run the workflow. There is no live Pages URL until that deployment succeeds.
- The environment's Sites preview relay was unavailable. The user's required real-browser checks were executed using local Vite production servers and installed Chromium instead.
