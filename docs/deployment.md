# GitHub Pages deployment

## Observed account access

On 2026-11-09 the authenticated GitHub account was verified as `jiangjinzhou01-ctrl`. The requested new name `object-product-studies` was checked and did not resolve to an existing accessible repository.

Creation was attempted through the authenticated GitHub CLI (GraphQL) and the documented REST `POST /user/repos`. Both were rejected by GitHub with `Resource not accessible by integration` (REST HTTP 403). The installed GitHub connector was also discovered and checked for a creation capability; it exposes no repository creation operation. This is an account/integration permission limit, not a user confirmation gate. No unrelated repository was used or overwritten.

No remote repository, Pages site or public deployment URL is claimed as created.

## Complete the deployment

1. Create an empty **public** GitHub repository in your account. Recommended project name: `object-product-studies`. Do not initialize it with a README if pushing this complete source.
2. Grant the connected GitHub integration access to the new repository. Never paste access tokens into chat or source files.
3. Configure **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. From this folder, after committing the local source:

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

If `origin` already exists, inspect it with `git remote -v` first; do not overwrite an unrelated destination. Existing repositories should receive this source in an isolated branch or directory after review.

`.github/workflows/deploy.yml` validates, builds and runs browser tests before publication. It then builds with `VITE_BASE_PATH=/<actual-repository-name>/` and uploads `dist/`. Pages returns the final URL in the `deploy` job. Do not infer success from the URL's expected format.

HashRouter supports refresh and shareable selections without host rewrites. All media uses the Vite base. For a user-site repository (`YOUR_ACCOUNT.github.io`) use `VITE_BASE_PATH=/` in the workflow instead; repository project sites use the default name-based path.

## Local production verification

```bash
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

On a fresh CI runner install Chromium with `npx playwright install --with-deps chromium`. The supplied workflow does so. Source WebP files are tracked, so the CI build requires no Commons access or credentials.
