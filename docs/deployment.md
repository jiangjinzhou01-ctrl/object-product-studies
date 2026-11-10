# GitHub Pages deployment

## Current publication state

The public repository [jiangjinzhou01-ctrl/object-product-studies](https://github.com/jiangjinzhou01-ctrl/object-product-studies) contains the project source on `main`. The live website is [jiangjinzhou01-ctrl.github.io/object-product-studies](https://jiangjinzhou01-ctrl.github.io/object-product-studies/).

On 2026-11-10 the owner enabled Pages once in repository Settings after the connected integration received HTTP 403 creating the Pages site. The `workflow_dispatch` run [42803732341](https://github.com/jiangjinzhou01-ctrl/object-product-studies/actions/runs/42803732341) then completed successfully: typecheck, lint, formatting, both builds, all 32 Playwright tests, Pages artifact upload and deployment. A production smoke check confirmed HTTP 200, loaded hero photography, working iPhone and compare routes, and mobile navigation at 390px. No same-origin requests failed and no browser JavaScript errors occurred.

## Ongoing deployments

Push a commit to `main`, or use **Actions → Validate and deploy OBJECT → Run workflow**. The workflow runs the full validation suite, builds with the repository subpath, and publishes through GitHub Pages.

The one-time Pages source setting is **Settings → Pages → Build and deployment → Source: GitHub Actions**. It is now configured. The workflow has `pages: write` and `id-token: write` permissions.

For a different empty repository, from this folder:

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

The current `origin` is the project repository above. If it changes, inspect it with `git remote -v` first; do not overwrite an unrelated destination.

`.github/workflows/deploy.yml` validates, builds and runs browser tests before publication. It then builds with `VITE_BASE_PATH=/<actual-repository-name>/` and uploads `dist/`. Pages returns the final URL in the `deploy` job; the live URL above was confirmed by a successful run and an HTTP 200 check.

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
