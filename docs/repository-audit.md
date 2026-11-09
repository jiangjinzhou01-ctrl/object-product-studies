# Repository audit · 2026-11-09

The initial `/workspace` contained no application repository, no package manifest, and no AGENTS.md. No unrelated contents were changed. Node 24, npm 11, GitHub CLI and Chromium are available. The authenticated GitHub owner was verified before choosing a new repository name.

Decision: create `/workspace/object-product-studies`, use React 19 + TypeScript 5.9 + Vite 7 with strict types, React Router hash routing for reliable GitHub Pages refreshes, CSS tokens and IntersectionObserver. No unneeded existing framework was replaced. The user explicitly selected GitHub Pages; Sites hosting is not used. Browser QA is explicitly required by the user and uses Playwright against a real Chromium page.
