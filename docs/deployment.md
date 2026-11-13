# GitHub Pages 部署

项目仓库：https://github.com/jiangjinzhou01-ctrl/object-product-studies

网站：https://jiangjinzhou01-ctrl.github.io/object-product-studies/

仓库与 Pages 在上一版已建立，本次重写继续发布到同一项目，不覆盖其他仓库。当前 v3.0 应用提交为 7684444，发布工作流 43402663095 已成功。实际线上复核记录见 [QA 记录](qa-results.md) 与 [浏览器证据](deployment-smoke.json)。

## 发布流程

推送 main，或在 Actions 中手动运行 Validate and deploy OBJECT。工作流依次执行 npm ci、严格类型检查、ESLint、Prettier、生产构建、Chromium 安装与 Playwright，随后重新以仓库子路径构建并部署。测试失败会阻止发布。

Settings → Pages → Source 使用 GitHub Actions。工作流仅给予 contents: read、pages: write、id-token: write，使用 GitHub 官方 Pages artifact / deploy Actions。

VITE_BASE_PATH 根据 github.event.repository.name 生成，当前为 /object-product-studies/。VITE_SOURCE_REPOSITORY 使用实际仓库地址。HashRouter 让所有分享链接和刷新请求仍落在 index.html，不需要 404 重写服务。

## 本地验证

```bash
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

没有本机 Chromium 时先执行 npx playwright install --with-deps chromium，并设置 CI=1。所有部署 WebP 与字体资源均在本地，不依赖浏览器向图片来源发起请求。

## 仓库迁移

若迁移至另一个仓库，先核实该仓库用途与权限，再修改 origin。工作流会自动读取新仓库名称。用户站点 YOUR_ACCOUNT.github.io 则应把 VITE_BASE_PATH 设为 /。更新页脚源代码地址与 README，验证实际子路径后再发布。

## 回滚

使用 Git revert 回退具体提交，再正常推送 main 触发完整验证与部署；不要 force push 覆盖历史。已有 Edition 01 内容仍保存在 Git 历史中。
