# QA 记录 — Edition 02

核验日期：2026-11-12。测试针对本次完整重写；旧版测试与截图不作为新版结果。

## 已执行检查

| 检查                               | 实际结果                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| 严格 TypeScript / Production Build | 通过                                                                                             |
| ESLint / Prettier                  | 已通过，结果由 Actions 再次验证                                                                  |
| Playwright / Chromium              | **37 通过，0 失败，0 跳过，0 重试**；最终本地完整运行 56.4 秒                                    |
| 内容与资源                         | 10 个内容路由、页面 H1、全部挂载图片解码、同源请求与 JavaScript 错误检查通过                     |
| 响应式                             | 360 / 390 / 430 / 768 / 1024 / 1440 / 1920px；10 个内容路由无页面横向溢出                        |
| axe                                | 六个桌面页面、移动导航展开状态与移动比较页，WCAG 2 A/AA、2.1 AA、2.2 AA 规则未发现违规           |
| 交互                               | 比较、URL 恢复、差异、复制与失败回退、导航焦点、图集、滚动章节、工作流、接口、键盘、规格展开通过 |
| 资源处理                           | 20 项原始媒体 → 75 项 WebP；总计 5,850,684 字节；旧版 21 项图片已移除                            |
| 冷启动布局                         | 自动化断言首屏 CLS < 0.05 通过；Lighthouse 测得 0.001                                            |
| GitHub Pages 子路径                | 本地生产子路径验证通过；分享恢复、资源、导航、来源标签和规格脚注正常                             |
| 部署                               | 本次版本的线上发布与复核记录将在部署完成后附于下方                                               |

完整结果摘要见 [playwright-results.json](playwright-results.json)。浏览器截图与 trace 在工作流 browser-evidence artifact 中保存七天；压缩截图已提交至 docs/screenshots。

测试中实际修复了浅色背景小字对比度、非语义元素的 ARIA 标注、移动端 Sticky 阅读区，以及路由状态更新需要等待的测试同步问题。最终完整运行没有遗留失败。

## Lighthouse 实测

目标：本地生产预览首页 http://127.0.0.1:4173/。Lighthouse 13.6.0、无头 Chromium；桌面 preset 与默认模拟移动端各运行一次，顺序测量。不是线上测速，也不是实体手机测试。

| 指标                |  桌面 | 移动模拟 |
| ------------------- | ----: | -------: |
| Performance         |   100 |       97 |
| Accessibility       |   100 |      100 |
| Best Practices      |   100 |      100 |
| SEO                 |    92 |       92 |
| LCP                 |  0.5s |     2.4s |
| CLS                 | 0.001 |    0.001 |
| Total Blocking Time |   0ms |     70ms |

完整 JSON：[desktop](lighthouse/desktop.json)、[mobile](lighthouse/mobile.json)。摘要见 [performance-results.json](performance-results.json)。以上性能仅对应首页测量，不外推为所有页面成绩。机器负载、网络与实际设备会改变结果。

## 人工视觉复核

下列截图来自真实页面，已逐项查看。它们是视觉验收证据，未建立逐像素历史基线。

| 界面        | 证据与观察                                                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 首页桌面    | [1440px](screenshots/home-1440.webp)：标题与产品形成明确主次，后续章节按信息密度改变构图                                          |
| 首页移动    | [390px](screenshots/home-390.webp)：首屏先读标题与入口，再完整呈现设备                                                            |
| iPhone 故事 | [桌面](screenshots/iphone-1440.webp)、[移动](screenshots/iphone-390.webp)：深色引言、相机章节、图集、安静的规格区域               |
| Mac 故事    | [桌面](screenshots/mac-1440.webp)、[移动](screenshots/mac-390.webp)：浅色工程引言、工作流、显示与接口                             |
| 滚动章节    | [桌面](screenshots/narrative-desktop.webp)、[移动](screenshots/narrative-mobile.webp)：图片随章节切换；移动图框缩短，保留可读正文 |
| 工作流切换  | [视觉设计状态](screenshots/workflow-desktop.webp)：图片、软件名称和说明同步变化                                                   |
| 比较工具    | [桌面](screenshots/compare-1440.webp)、[移动](screenshots/compare-390.webp)：型号操作完整，移动表格独立横向滚动                   |
| 移动导航    | [展开状态](screenshots/navigation-mobile.webp)：完整入口、关闭按钮、焦点与滚动锁定                                                |

## 已知验证边界

- 未做真实 iOS / Android、Safari / Firefox 或屏幕阅读器实机测试；移动结果来自 Chromium 视口模拟。
- axe 零违规不等于全面无障碍认证。
- 自动截图没有像素回归基线；字体回退和中文排版可能因操作系统而变化。
- 官方媒体版权与许可边界记录在素材清单中，不属于软件测试可以证明的授权结论。
- 不对产品性能进行独立测量，不提供没有官方依据的排名、价格或百分比。
