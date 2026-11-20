# QA 记录

## iPhone 产品概览改版 · 2026-11-20

本地生产构建通过 TypeScript、ESLint、Prettier 和资源完整性检查。Chromium 156 执行 51 项 Playwright 测试，51 通过，0 失败，0 跳过。覆盖十个内容路由、360 至 1920px 七档宽度、三种视频尺寸、节省流量、减少动态效果、背景滚动暂停、四款外观、亮点叠化、搜索与键盘焦点、比较及 URL 刷新。axe 检查覆盖首页、两篇产品故事、比较、关于、来源与手机菜单。

首轮测试发现了信息栏链接形态、深色区链接对比度和搜索对话框的键盘焦点问题。调整后重新运行全套测试。首次打开首页会在 React 启动前请求对应视口的海报，播放器与预加载共用同一套尺寸条件。38 张源图的 132 个 WebP 共 7,225,108 字节，已逐文件核对格式和宽高。三个短片编码独立按需加载。

## 产品展览改版 · 2026-11-18

TypeScript、ESLint、Prettier 与生产构建通过。Chromium 在十个内容路由执行 44 项 Playwright 测试，覆盖七种宽度、导航、滚动叙事、工作流、比较和 axe WCAG A/AA 检查。首轮发现 768px 首屏图片撑宽页面与截图用例定位器过时，修正后全套通过。生产截图复核还发现大图继承了首屏样张的裁切规则，改为显示完整原图并增加回归断言。将山景的视差时间线绑定到展区后，新增了随页面滚动的回归验证。最终运行 44 通过、0 失败、0 跳过，耗时约 90 秒。

生产子路径检查确认，1440px 预加载 900px 主图，390px 和 768px 预加载 480px 主图。各视口均复用 HTML 发起的请求。本地字体、切图说明、键盘放大和关闭、滚动章节、山景视差、工作流、移动导航与比较链接刷新均通过。新增大图对话框在桌面与移动视口的 axe 检查均无违规。素材清单中的 21 个源条目和 75 个派生文件已核对，WebP 候选合计 5,794,304 字节。[子路径检查结果](exhibition-subpath.json)

| 界面       | 生产预览截图                                                                                                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 加载       | [站点启动](screenshots/exhibition-startup-390.webp) · [首图等待](screenshots/exhibition-loading-390.webp)                                                                                                                         |
| 首页       | [桌面](screenshots/exhibition-home-1440.webp) · [手机](screenshots/exhibition-home-390.webp) · [平板](screenshots/exhibition-home-768.webp)                                                                                       |
| iPhone     | [产品开场](screenshots/exhibition-iphone-1440.webp) · [手机滚动章节](screenshots/exhibition-narrative-390.webp) · [夜色样张](screenshots/exhibition-camera-1440.webp) · [低光大图](screenshots/exhibition-image-viewer-1440.webp) |
| Mac        | [产品开场](screenshots/exhibition-mac-1440.webp) · [视觉设计工作流](screenshots/exhibition-workflow-1440.webp)                                                                                                                    |
| 导航与比较 | [手机导航](screenshots/exhibition-navigation-390.webp) · [手机比较](screenshots/exhibition-compare-390.webp)                                                                                                                      |

Lighthouse 13.6 在本地生产首页测量桌面一次和移动模拟三次。移动性能为 86、92、95 分，中位数为 92。

| 指标     |   桌面 |   移动模拟 |
| -------- | -----: | ---------: |
| 性能     |    100 |      86–95 |
| 无障碍   |    100 |        100 |
| 最佳实践 |    100 |        100 |
| LCP      | 0.8 秒 | 2.9–3.3 秒 |
| CLS      | 0.0007 |     0.0004 |

检测版本与原始指标摘要见[本地执行结果](exhibition-local-results.json)。验证环境为 Chromium 模拟视口。Safari、Firefox 和实体移动设备仍待测试。

提交 `360a314` 的构建与 Pages 部署成功。运行器 Chrome 157 执行 44 项测试，耗时 56.3 秒。已用 Chromium 访问线上 1440、768 和 390 像素视口。复核首图请求复用、山景视差、切图放大、移动导航、产品章节与比较刷新，记录到的同源 HTTP 错误与 JavaScript 错误均为零。[发布流水线](https://github.com/jiangjinzhou01-ctrl/object-product-studies/actions/runs/44225397101) · [线上检查结果](exhibition-live-results.json)

[线上桌面首屏](screenshots/exhibition-live-home-1440.webp) · [线上手机首屏](screenshots/exhibition-live-home-390.webp)

## 动效与加载更新 · 2026-11-18

TypeScript、ESLint、Prettier 和生产构建通过。Chromium 中 **42 项 Playwright 测试全部通过**，涵盖十个内容页面、七种视口和原有无障碍检查。新增测试暂停 JavaScript 与首图请求，依次检查启动提示和图片等待状态，确认图像加载失败后可以重试。视角切换测试同时覆盖旧图保留与反向切换。首轮发布检查发现比较页说明文字淡入时对比度短暂下降。修正后文字和页面以位移入场，图片继续叠化。

在生产预览及 GitHub Pages 子路径复核首页。浏览器在 React 渲染前请求对应宽度的主图，随后复用该请求。在 1440 和 390 像素视口检查了首屏，另外确认了滚动进度、首屏视差、移动导航、相机与工作流切换。没有同源 HTTP 错误或 JavaScript 错误。

修正文字入场后，本地 Lighthouse 13.6 移动模拟实测性能 95、无障碍 100、最佳实践 100，LCP 为 2.8 秒，CLS 为 0.001。结果来自一次本地模拟。

[GitHub Actions 44208928689](https://github.com/jiangjinzhou01-ctrl/object-product-studies/actions/runs/44208928689) 使用运行器的 Chrome 157 完成 42 项测试和 Pages 部署。[线上新版](https://jiangjinzhou01-ctrl.github.io/object-product-studies/?v=65fa32a) 返回 HTTP 200。桌面和手机视口复核了启动提示、首图解码、滚动动效、移动导航、视角切换和产品章节，无同源 HTTP 或 JavaScript 错误。

[启动画面](screenshots/apple-startup.webp) · [产品图加载中](screenshots/apple-hero-loading.webp) · [移动首屏](screenshots/apple-hero-mobile.webp)

## Product Experience 3.0 的历史验证 · 2026-11-13

核验日期：2026-11-13。以下记录对应 2026-11-13 发布的视觉与交互版本。

## 实际执行结果

| 检查                  | 结果                                                                         |
| --------------------- | ---------------------------------------------------------------------------- |
| 严格 TypeScript       | 通过                                                                         |
| ESLint                | 通过                                                                         |
| Production Build      | 通过                                                                         |
| Prettier              | 提交前执行，Actions 再次核验                                                 |
| Playwright / Chromium | **40 通过、0 失败、0 跳过、0 重试**；完整运行 65.9 秒                        |
| 内容与资源            | 10 个内容路由、图片解码、同源请求、JavaScript 错误检查通过                   |
| 响应式                | 360 / 390 / 430 / 768 / 1024 / 1440 / 1920px，无页面横向溢出                 |
| 自动无障碍            | 六个桌面页面、移动导航展开状态和移动比较页的 axe WCAG A/AA 规则检查通过      |
| 核心交互              | 首屏视角、图集、相机场景、滚动章节、工作流、接口点选、比较和分享恢复均通过   |
| Pages 子路径          | 本地生产子路径验证通过：图片、中文字体、交互与刷新恢复正常                   |
| 图片                  | 20 个源图、73 个本地 WebP，合计 5,731,420 字节；透明留边裁切保留原始尺寸记录 |

测试覆盖移动导航焦点循环、Escape、滚动锁定；标签组方向键与 Home / End；比较选择、交换、清空、重置、非法 URL、分享与剪贴板失败回退；移动比较表同时显示两侧参数；减少动态效果偏好。

完整本地结果摘要见 [playwright-results.json](playwright-results.json)。发布流水线对实际提交再次执行完整检查；最终发布记录见项目 Actions。截图和 trace 随 browser-evidence artifact 保存七天。

## 视觉复核

已在真实 Chromium 页面中检查构图、图像比例、字体、文字重叠、留白、移动顺序和交互状态。截图为人工视觉复核证据，没有像素基线回归的声明。

| 界面            | 证据                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 首页桌面 / 移动 | [1440](screenshots/home-1440.webp) · [390](screenshots/home-390.webp)                                                        |
| iPhone 产品故事 | [桌面](screenshots/iphone-1440.webp) · [移动](screenshots/iphone-390.webp)                                                   |
| Mac 产品故事    | [桌面](screenshots/mac-1440.webp) · [移动](screenshots/mac-390.webp)                                                         |
| 滚动章节        | [桌面](screenshots/narrative-desktop.webp) · [移动](screenshots/narrative-mobile.webp)                                       |
| 相机场景切换    | [夜色场景](screenshots/camera.webp)                                                                                          |
| 真实接口点选    | [HDMI 状态](screenshots/ports.webp)                                                                                          |
| 比较工具        | [桌面](screenshots/compare-1440.webp) · [移动](screenshots/compare-390.webp) · [移动两列正文](screenshots/mobile-table.webp) |
| 导航抽屉        | [移动展开](screenshots/navigation-mobile.webp)                                                                               |
| 专业工作流      | [视觉设计状态](screenshots/workflow-desktop.webp)                                                                            |

自动化通过与性能分数不能代替审美判断。本次视觉工作围绕设备尺度、整幅画面、字体层级和内容节奏展开。

## Lighthouse 实测

本地生产首页 http://127.0.0.1:4173/，Lighthouse 13.6.0、无头 Chromium，桌面 preset 与默认模拟移动端各测一次。不是线上测速或实体手机测试。

| 指标                |  桌面 | 移动模拟 |
| ------------------- | ----: | -------: |
| Performance         |   100 |       90 |
| Accessibility       |   100 |      100 |
| Best Practices      |   100 |      100 |
| SEO                 |    92 |       92 |
| LCP                 |  0.8s |     3.6s |
| CLS                 | 0.003 |        0 |
| Total Blocking Time |   0ms |     70ms |

完整报告：[desktop](lighthouse/desktop.json)、[mobile](lighthouse/mobile.json)，摘要 [performance-results.json](performance-results.json)。只对应首页，不能外推所有页面或真实用户网络。

## 验证边界与后续

尚未完成真实 iOS / Android、Safari / Firefox 和屏幕阅读器实机测试，优先纳入下一次验证。中文子集缺少未来新增字符时会回退系统字体，更新界面后应重新运行字体子集脚本。

官方媒体的版权边界见素材清单；浏览器测试不能证明图像授权。本站没有独立测量硬件性能，也不提供无来源的性能排名。

## 线上发布与复核 · 2026-11-13

部署代码提交为 `7684444679488c4adb3dc545ea6ebecb60b3c183`。[GitHub Actions 43402663095](https://github.com/jiangjinzhou01-ctrl/object-product-studies/actions/runs/43402663095) 的 build 与 deploy 均成功，CI 中 40 项浏览器测试通过，耗时 28.5 秒。

[实际网站](https://jiangjinzhou01-ctrl.github.io/object-product-studies/?v=3) 已由真实 Chromium 访问，返回 HTTP 200。1440 与 390 视口检查了新首屏及图片加载、首屏视角、移动导航与 Escape、相机场景、真实接口点选、工作流、比较链接恢复和两列可见性，以及来源与字体许可链接；没有同源 HTTP 错误或 JavaScript 错误。

线上证据：[deployment-smoke.json](deployment-smoke.json) · [桌面首屏](screenshots/live-hero-desktop.webp) · [手机首屏](screenshots/live-hero-mobile.webp) · [手机导航](screenshots/live-menu-mobile.webp)。线上复核没有进行 Lighthouse 测量，前文性能数据仍仅属于本地生产首页。
