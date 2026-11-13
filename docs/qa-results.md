# QA 记录 — Product Experience 3.0

核验日期：2026-11-13。以下记录针对当前视觉与交互版本，先前版本的成绩不作为当前结果。

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
