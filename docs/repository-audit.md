# Repository audit — Product Experience 3.0

本次视觉与交互重构基于 cfd7d19。开始时工作区干净，建立 redesign/product-first 分支后修改；没有覆盖其他项目或用户未提交内容。未发现适用的 AGENTS.md。

复用 React 19、TypeScript、Vite、React Router、Lucide、Sharp、Playwright、axe、ESLint 与 Prettier。新增本地 Noto Sans SC 子集及其 OFL 许可，没有引入三维、重型动效或远程字体运行依赖。原有产品事实、GitHub 远程与 Pages 发布基础继续使用。

重构覆盖首页、两条产品故事、分类、比较、共享导航页脚和全站样式。新增相机场景组件、真实接口点选、字体生成脚本与透明图留边处理；浏览器用例更新为 40 项。现有测试和来源文档按当前版本更新，旧提交仍可追溯。

实际浏览器验收使用 Chromium 与生产预览。开发地址不是部署证明；Pages 子路径在本地单独验证，发布以 Actions 结果及线上复核为准。
