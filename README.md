# OBJECT / Product Studies — Product Experience

一个完整的独立消费科技产品体验作品集。以真实型号、可追溯的官方产品图、编辑式设计与可验证的前端交互，组织产品与日常使用之间的关系。

[在线网站](https://jiangjinzhou01-ctrl.github.io/object-product-studies/) · [GitHub](https://github.com/jiangjinzhou01-ctrl/object-product-studies) · [Case Study](docs/case-study.md) · [测试记录](docs/qa-results.md)

> Independent product experience concept. Unofficial design and engineering portfolio project. Not affiliated with or endorsed by Apple Inc.
>
> 独立产品体验概念作品，仅用于个人设计与工程作品集展示，与 Apple Inc. 无隶属、赞助或认可关系。

## 本地运行

使用 Node.js 24 LTS、npm：

```bash
npm ci
npm run dev
```

开发地址默认 http://localhost:5173。生产预览：

```bash
npm run build
npm run preview -- --port 4173
```

## 页面与交互

| 页面              | Hash 路由                           | 已实现                                                         |
| ----------------- | ----------------------------------- | -------------------------------------------------------------- |
| 首页              | /#/                                 | 可切换视角的设备首屏、产品目录、交互探索器、设计观察、比较入口 |
| iPhone 系列       | /#/iphone                           | iPhone 18 Pro 与 iPhone 17、型号锚点、选择建议                 |
| iPhone 18 Pro     | /#/iphone/iphone-18-pro             | 三章滚动叙事、相机场景切换、图集、展开规格                     |
| Mac 系列          | /#/mac                              | M6 MacBook Pro、13/15 英寸 M5 Air、用途与尺寸区别              |
| MacBook Pro M6    | /#/mac/macbook-pro-m6               | 工作流标签、XDR、真实接口点选、规格                            |
| 比较              | /#/compare                          | 同类双型号选择、交换、清空、重置、差异筛选、分享与 URL 恢复    |
| 项目 / Case Study | /#/about                            | 原创视觉、信息结构、交互与工程策略                             |
| 来源索引          | /#/credits                          | 产品事实、20 项图像、作者、版权与来源链接                      |
| 设计观察          | /#/journal/the-language-of-material | 材料观察                                                       |
| 设计观察          | /#/journal/a-display-in-context     | 显示指标与使用情境                                             |

未知路径提供 404。旧版 Mac M5 故事地址转向新版 Mac 系列。移动导航具有焦点循环、Escape 关闭与滚动锁定；标签组支持方向键、Home、End。比较 URL 示例：

```text
/#/compare?type=mac&models=macbook-pro-m6,macbook-air-15-m5&diff=1
```

缺少官方数据的规格显示为空，不会计入已知差异。没有购买、库存、支付或账号登录流程。

## 数据与图像

产品事实与来源位于 `src/data/phones.ts`、`src/data/macs.ts`，规格通过 sourceId 关联来源 URL 和核查日期。手机资料核查于 2026-11-09，Mac 与本版图像核查于 2026-11-11。展示范围为 base M6 的 14 英寸 MacBook Pro，而非 M6 Pro 芯片机型。

本版按用户要求使用 Apple 公开新闻稿与技术支持产品图，**版权归 Apple，不是 CC 或公共领域素材**。相关媒体条款、来源及使用范围见[素材清单](docs/asset-register.md)。本站没有取得单独图像授权；代码的 MIT 许可不覆盖第三方图像。官方产品图、产品合照与摄影样张明确区分，不使用 AI 硬件、假 360° 或重着色变体。

20 个原始媒体条目生成 73 个 WebP 版本。三张 Mac PNG 裁切透明留边，保留原始尺寸记录。图片通过 srcset / sizes 按需加载，并保留尺寸；首屏高优先级，其他图片懒加载。原始文件不进入部署目录。重新处理：

```bash
node scripts/download-assets.mjs
npm run assets
```

下载依赖 Apple 来源继续可用；构建、测试和部署使用已跟踪的 WebP，不需要外部图片服务。

中文字体使用 Noto Sans SC 400 / 600 的本地 WOFF2 子集，许可与生成记录见 `docs/font-sources.json`。更新中文界面后可执行 `python -m pip install fonttools brotli` 与 `python scripts/prepare-chinese-fonts.py` 重新生成；构建不依赖此任务或外网字体。

## 架构

React 19、严格 TypeScript、Vite、React Router、Lucide、原生 CSS Tokens。首页直接加载，其余页面按路由拆分。动画使用 CSS、IntersectionObserver 与 Web Animations API，尊重 prefers-reduced-motion。

```text
src/
  app/          路由、标题、焦点与锚点恢复
  components/   导航、媒体、规格、共享编辑组件
  pages/        各页面的独立构图与交互
  data/         产品、图像、文章、来源
  hooks/        滚动叙事与进入动效
  styles/       Tokens、响应式设计
  types/        产品类别与媒体类型
tests/          Playwright + axe
scripts/        可复现图片处理
docs/           研究、素材、Case Study、测试证据、部署
```

## 验证

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

本环境 Chromium 路径为 /usr/bin/chromium。其他机器先执行 `npx playwright install chromium`，再使用 `CI=1 npm run test:e2e`，或通过 CHROMIUM_PATH 指定浏览器。40 项浏览器用例覆盖 10 个内容路由、核心交互、七种视口、自动无障碍规则与截图；移动比较表同时呈现两侧数值。实际通过数量、性能报告及限制均以[QA 记录](docs/qa-results.md)为准。

## 发布与后续

GitHub Actions 在 main 更新后执行检查与浏览器测试，再以仓库实际名称设置 Vite base 并部署 Pages。HashRouter 支持静态站点刷新与分享。详见[部署说明](docs/deployment.md)。

下一步优先补充真实 iOS / Safari / Android 设备与屏幕阅读器验证，再收集用户研究和完善对应颜色的独立产品摄影。自动化结果不等于全部真实设备通过。
