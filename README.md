# OBJECT / Product Studies

独立消费科技产品体验研究。以真实产品、开放许可摄影、编辑设计和可验证的前端工程构建的作品集项目。

> Independent product experience concept. Unofficial design and engineering portfolio project. Not affiliated with or endorsed by Apple Inc.
>
> 独立产品体验概念作品，仅用于个人设计与工程作品集展示，与 Apple Inc. 无隶属、赞助或认可关系。

## 运行

Node.js 22.12+ 或 24 LTS，npm。

```bash
npm ci
npm run dev
```

打开终端打印的本地地址（默认 `http://localhost:5173`）。

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run preview -- --port 4173
npm run test:e2e
```

本环境使用 `/usr/bin/chromium`。其他机器执行 `npx playwright install chromium` 后用 `CI=1 npm run test:e2e`，或者用 `CHROMIUM_PATH` 指向自己的 Chromium/Chrome。

## 页面与真实交互

| 页面           | Hash 路由                             | 主要内容                                                  |
| -------------- | ------------------------------------- | --------------------------------------------------------- |
| 首页           | `/#/`                                 | 编辑式首屏、产品章节、产品探索器、技术观察、比较入口      |
| iPhone 分类    | `/#/iphone`                           | iPhone 18 Pro 与 iPhone 17 的真实图片、系列差异与型号导航 |
| iPhone 18 Pro  | `/#/iphone/iphone-18-pro`             | Sticky 摄影叙事、真实外观切换、芯片资料、规格与来源       |
| Mac 分类       | `/#/mac`                              | MacBook Pro M5、MacBook Air 15 英寸 M4 的产品关系         |
| MacBook Pro M5 | `/#/mac/macbook-pro-m5`               | 工作流切换、XDR 显示章节、M5 配置、接口索引               |
| 比较           | `/#/compare`                          | 同类别选择、替换、清除、差异过滤、重置、分享与 URL 恢复   |
| Case Study     | `/#/about`                            | 设计定位、信息架构、交互、工程与响应式策略                |
| 素材索引       | `/#/credits`                          | 摄影作者、文件来源、许可、修改说明、技术资料              |
| 技术观察 01    | `/#/journal/the-language-of-material` | 材料与产品观察                                            |
| 技术观察 02    | `/#/journal/a-display-in-context`     | 显示指标与使用情境                                        |

未知路由提供可返回首页的 404 页面。没有购物、支付、库存、账户或虚假购买渠道。

比较链接示例：`/#/compare?type=iphone&models=iphone-18-pro,iphone-17&diff=1`。

## 产品研究与素材取舍

核实日期为 **2026-11-09**。所有关键规格均关联官方来源 ID、URL 与核实日期。

- 保留 iPhone 18 Pro、iPhone 17。
- MacBook Pro M6 已有官方资料；研究范围内未取得可核验授权实拍，因此完整替换为有真实 CC0 摄影的 **14 英寸 MacBook Pro M5**，规格也相应替换。M5 是芯片名，不是 M5 Pro。
- MacBook Air M5 的候选实拍包含生成式清理元数据，编辑范围不明，予以排除；使用实际拍摄的 **15 英寸 MacBook Air M4**。
- 只提供 Black、Glacier 两种有对应真实照片的 iPhone 18 Pro 外观。切换时明确前/后视角，完整列出四种官方颜色。没有假 360°、重着色或模型渲染。
- 摄影为实物记录，部分含零售展示环境与连接线；照片内旧价格不是本网站的价格信息。

详见 [产品研究](docs/product-research.md)、[素材清单](docs/asset-register.md)、[Mac 研究原始记录](docs/mac-research.json)。

## 工程结构

```text
src/
  app/          路由、页面元信息、滚动和焦点恢复
  components/   导航、页脚、摄影、规格、基础 UI
  data/         严格类型产品数据、摄影元数据、编辑内容
  hooks/        可见性与滚动章节观察器
  lib/          标签键盘交互
  pages/        独立页面实现
  styles/       设计 tokens、响应式版式、动效与减少动态效果
  types/        产品类别判别联合类型
public/
  assets/images/  21 个已授权 WebP 响应式文件
  licenses/      字体和图标许可
scripts/        可重现的素材下载和格式处理
tests/         Playwright 流程、响应式、axe 与截图检查
 docs/          研究、许可、Case Study、QA 和部署记录
.github/workflows/deploy.yml
```

产品与参数没有散落在页面 JSX 中；`family` 区分手机与电脑。摄影与规格来源单独维护。外观照片来自本地 WebP，不依赖盗链。Inter Variable 字体本地托管，中文采用系统字体回退。

## 图像处理

原图不参与部署。仓库已包含可直接构建的响应式 WebP，无需重新下载即可运行。

```bash
node scripts/download-assets.mjs
npm run assets
```

下载仅按已核验文件的原始 URL 进行；遇到 429 会停止并提示 Retry-After，不自动重试。原图在被 Git 忽略的 `.cache/originals/`。处理脚本校正 EXIF 方向，生成 480 / 960 / 1600 像素版本，保留硬件细节。衍生照片遵循原许可，不适用代码 MIT 许可。

## 验证与局限

实际执行结果见 [QA 记录](docs/qa-results.md)。浏览器截图在 `reports/screenshots/`，主要验收图归档到 `docs/screenshots/`。本地 HTML 测试报告在 `playwright-report/index.html`；CI 会保存 7 天的浏览器证据。

没有声称对真实 iPhone、Android、Safari 或低性能移动硬件完成实机验证；当前自动化使用 Chromium 与视口/减少动态效果模拟。后续应补充自有摄影、多浏览器与真实用户任务测试。

## GitHub Pages

当前 GitHub 连接可以识别账户，但新建仓库请求返回 **HTTP 403: Resource not accessible by integration**。本地文件与 Actions 配置已准备；尚未宣称部署成功。详见 [部署步骤与权限记录](docs/deployment.md)。

仓库启用 Pages 的 GitHub Actions 模式后，推送 `main` 将执行类型检查、Lint、格式检查、生产构建、Playwright，再按仓库名称设置 `VITE_BASE_PATH` 并部署。

Hash 路由支持静态托管刷新，不需要 404 重写。CI 仅在真实仓库中构建时设置 `VITE_SOURCE_REPOSITORY` 并显示源码入口；未配置时页面提供有效的工程说明入口。仓库子目录下的图片、字体和脚本均通过 Vite base 或 `import.meta.env.BASE_URL` 定位。

## 许可

原创应用代码为 MIT，详见 [LICENSE](LICENSE)。照片分别采用 CC BY-SA 4.0 或 CC0，详见 [素材清单](docs/asset-register.md)。Inter 采用 SIL OFL 1.1，Lucide 采用 ISC。Apple 产品名称用于事实性说明，相关商标归各自所有者。
