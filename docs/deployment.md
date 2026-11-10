# GitHub Pages deployment

## Current publication state

The public repository [jiangjinzhou01-ctrl/object-product-studies](https://github.com/jiangjinzhou01-ctrl/object-product-studies) exists and contains the project source on `main`. The connected GitHub integration has admin and push access to this repository. GitHub Actions has passed type checking, lint, formatting, production build and all 32 Playwright tests.

The workflow cannot create the Pages site: the Pages API returns `Resource not accessible by integration` (HTTP 403), including when `actions/configure-pages` uses its `enablement: true` option. Pages therefore has no live deployment yet. This is a GitHub integration API permission boundary; publishing has already been authorized by the project owner.

## Complete the deployment

1. Open [the repository's Pages settings](https://github.com/jiangjinzhou01-ctrl/object-product-studies/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions** and save. The connected API cannot perform this one-time Pages initialization.
3. In the repository's **Actions** tab, run **Validate and deploy OBJECT** with **Run workflow** on `main`. The same workflow will also run on subsequent pushes.

Never paste access tokens into chat or source files. The GitHub Actions workflow already has the required `pages: write` and `id-token: write` permissions for subsequent deployments.

For a different empty repository, from this folder:

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

The current `origin` is the project repository above. If it changes, inspect it with `git remote -v` first; do not overwrite an unrelated destination.

`.github/workflows/deploy.yml` validates, builds and runs browser tests before publication. It then builds with `VITE_BASE_PATH=/<actual-repository-name>/` and uploads `dist/`. Pages returns the final URL in the `deploy` job. Do not infer success from the URL's expected format. The expected project URL is `https://jiangjinzhou01-ctrl.github.io/object-product-studies/`; it is not live until a successful deployment is recorded.

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
