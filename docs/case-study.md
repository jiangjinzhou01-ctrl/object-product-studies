# OBJECT — independent design and engineering case study

## Goal and positioning

Build a complete, inspectable portfolio experience around real consumer technology. The project demonstrates an original editorial system, structured fact handling, purposeful interaction and reliable responsive implementation. It does not imply Apple employment, client work, affiliation or endorsement.

## Visual research and system

Product-first editorial design combines Swiss grid principles and magazine pacing. Warm paper, near-black technical chapters and a restrained orange index unify the site. An independent wordmark and large Inter typography establish identity. Chinese uses a modern system sans fallback. The desktop hero uses a twelve-column grid, with responsive spacing and distinct page compositions.

Real photographs govern layout decisions. Documentary retail photos are not disguised as studio renders. Hardware is neither generated nor recolored. Photography scarcity led to documented whole-model changes: MacBook Pro M5 and Air M4 replace requested M6 and M5 Air studies.

## Information architecture

Discovery begins at the homepage. Collection pages explain product relationships, product stories examine one object, and the compare desk supports a concrete selection task. Two editorial notes explain material and display context. Case Study and Credits expose the design decisions, facts and rights underlying the experience.

## Interaction and architecture

React 19, strict TypeScript, Vite, React Router, Lucide and CSS tokens. Page modules load by route. Shared products use a discriminated phone/Mac union, while source-aware specification rows and independent media records support comparison and visible provenance.

Phone storytelling uses IntersectionObserver to coordinate sticky photography with three real content chapters. The Mac story uses task tabs, a display composition, configuration context and an interface index. No fake rotation, charts or unverified benchmark claims are used.

The compare desk maintains category, two model slots and the differences filter in the URL. It supports empty states, replacing and clearing selections, reset, sharing with a clipboard fallback, and invalid/cross-category URL sanitation. Navigation uses a native modal dialog with explicit focus cycling, Escape and body scroll locking. Tabs support arrows and Home/End.

## Responsive and performance strategy

Mobile reorders the homepage and product features, replaces the Mac workflow sidebar with three touch tabs, and uses a smaller sticky photography stage. Compare scrolls inside a labeled region while the page avoids horizontal overflow. Core controls remain available without hover. Reduced motion disables nonessential animation.

The photograph pipeline corrects EXIF direction and creates three WebP sizes; image dimensions reserve space. Above-fold images load eagerly with high priority, later images lazily. Only needed Latin variable font data is locally hosted; Chinese uses installed system fonts. Original full-resolution photography is kept outside `public/` and not deployed.

## Engineering difficulties and validation

The main constraints were exact-model photography permissions, photographs with source-disclosed generative edits, EXIF direction, hash-compatible in-page links, keyboard focus cycling, and readable secondary typography. Browser tests exposed and drove fixes for contrast and ARIA naming. See [actual QA results](qa-results.md); do not treat design targets as measured scores.

## Next iterations

Commission original multi-angle photography, obtain exact newer-model photographs with explicit permission, test Safari and real mobile hardware, and conduct task-based user studies. Expand configurations only when reliable source data and usable imagery are available.

Independent product experience concept. Unofficial design and engineering portfolio project. Not affiliated with or endorsed by Apple Inc.

独立产品体验概念作品，仅用于个人设计与工程作品集展示，与 Apple Inc. 无隶属、赞助或认可关系。
