# OBJECT · Edition02 素材登记

文档复核日期：**2026-11-13（UTC）**。本登记覆盖 [asset-definitions.json](asset-definitions.json) 与 [media.json](../src/data/media.json) 当前共同列出的 **20 张源图、73 个 WebP 派生文件**：9 张手机 Newsroom 图、8 张 Mac Newsroom 图、3 张 Apple Support 图。不是旧版七张 Commons 照片的登记，也不是研究缓存中全部候选的清单。

全部素材依用户明确指示用于非官方作品集。它们是 Apple 公开提供的产品图或样张，**不属于 CC、CC0 或公共领域，本项目未取得独立 Apple 授权**。旧版照片的作者和许可不能转移到本版素材；代码、字体与图标的许可也不覆盖这些图片。

## 来源、署名与日期

逐图 `source` 是介绍图片的官方网页；`originalUrl` 是实际下载的文件 URL。下表的来源代号指向完整官方 URL，缓存路径相对于仓库根目录。

| 来源代号         | 官方页面与发布信息                         | 已读取的 HTML                               |
| ---------------- | ------------------------------------------ | ------------------------------------------- |
| [N18][N18]       | iPhone 18 Pro / Pro Max 发布稿，2026-09-09 | `.cache/rewrite-phone/18.html`              |
| [N17][N17]       | iPhone 17 发布稿，2025-09-09               | `.cache/rewrite-phone/17.html`              |
| [NPro][NPro]     | MacBook Pro 14 英寸 M6 发布稿，2026-10-27  | `.cache/rewrite-mac/pro-m6-news.html`       |
| [NAir][NAir]     | MacBook Air M5 发布稿，2026-03-03          | `.cache/rewrite-mac/air-m5-news.html`       |
| [SPro][SPro]     | MacBook Pro 14 英寸 M6 型号规格页          | `.cache/rewrite-mac/pro-m6-support.html`    |
| [SAir13][SAir13] | MacBook Air 13 英寸 M5 型号规格页          | `.cache/rewrite-mac/air-13-m5-support.html` |
| [SAir15][SAir15] | MacBook Air 15 英寸 M5 型号规格页          | `.cache/rewrite-mac/air-15-m5-support.html` |

20 条素材记录的 `verifiedAt` 均为 **2026-11-11**；本次于 2026-11-12 重新比对定义、媒体清单、缓存 HTML 和本地文件。Mac 的既有抓取记录与附带条款索引见 [rewrite-mac-research.json](rewrite-mac-research.json)；手机选图记录见 `.cache/rewrite-phone/selected.json`。不把本次缓存复核写成重新下载全部官方文件。

登记署名全部为 **Apple Inc.**，表示官方发布方；未核定个人摄影师或图像制作者。权利归 Apple Inc. 及／或相关许可方，官方设备图的制作方式未由本次证据确立。四张手机影像样张的拍摄机型来自 Apple alt／图注，不意味着本站拍摄或独立验证了成像效果。

## 权利状态

下表三个类别用于后面的逐图登记。共同的 `licenseUrl` 是 [Apple 知识产权索引](https://www.apple.com/legal/intellectual-property/)，不是开放许可证或特定图片授权书。

| 类别       | 已见证据                                                                           | 当前使用边界                                                                           |
| ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 手机新闻稿 | 9 张文件均由相应 Newsroom 页面公开提供；本次没有取得对应手机 ZIP 的附带许可证据。  | 保留 Apple 版权与来源，不借用 Mac ZIP 的条件来声称手机图已获许可。                     |
| Mac 新闻稿 | 对应的两份官方 ZIP 均含 `LEGAL_NOTICE.rtf`；当前使用的是同一图像的文章 JPEG 版本。 | ZIP 中确认的是附条件的个人／编辑、非商业使用条款；没有独立授权或更宽泛的文章图片许可。 |
| Support    | 3 张 PNG 来自独立的 Support 规格页和 `cdsassets.apple.com`。                       | 未找到针对这些 PNG 的作品集转载许可；**不继承 Newsroom ZIP 条款**。                    |

两份 Mac ZIP 的官方地址与缓存分别为：

- [14 英寸 M6 MacBook Pro 媒体包][pro-zip] → `.cache/rewrite-mac/pro-m6-news.zip`；条款位于 `.cache/rewrite-mac/pro-m6-news/LEGAL_NOTICE.rtf`。
- [M5 MacBook Air 图片包][air-zip] → `.cache/rewrite-mac/air-m5-news.zip`；条款位于 `.cache/rewrite-mac/air-m5-news/LEGAL_NOTICE.rtf`。

两份通知内容相同，明确要求 “the use is personal or editorial and non-commercial”，并规定未经 Apple 明确许可，不得以任何方式全部或部分改变、修改图像、视频或音频。已读通知没有为缩放、裁切、格式转换写出例外；研究记录也未记载取得修改许可。下文如实记载当前 WebP 转换与显示裁切，不据此声称它们已经获得许可。ZIP 中所附条款的证据范围不能扩展为所有 Apple 图片的通用许可证。

Support 的参考规则为 [Apple 网站使用条款][site-terms] 与 [商标和版权使用指南][ip-guidelines]，相应缓存为 `.cache/rewrite-mac/website-terms.html`、`copyright-guidelines.html`。公开可访问、署名以及个人用途均不自动证明可重新发布图片。

当前 `media.json` 对全部图像写入 `webDisplayAllowed: null`、`attributionRequired: true`。前者保留未确认状态，不代表已获准；后者是项目的署名策略，不应声称每项均有已核实的强制署名条款。已读 Mac ZIP 通知没有指定固定署名措辞。建议显示“图像：Apple / Apple Newsroom”或“图像：Apple / Apple Support”，与实际来源一致。

## 20 张素材的逐项登记

本地下载名均位于 `.cache/press/`；表中的“文件”链接是逐条复制的 `originalUrl`，不是 ZIP 原件链接。所有行的核查日期字段均为 2026-11-11，本次复核日期为 2026-11-12。

| 序号 / 素材 ID             | 本地下载名                | 具体内容及机型归属                                                               | 来源 / 文件                         | 登记署名   | 权利类别   |
| -------------------------- | ------------------------- | -------------------------------------------------------------------------------- | ----------------------------------- | ---------- | ---------- |
| 01 / `phone-pro-hero`      | `phone-pro-hero.jpg`      | 酒红色 18 Pro 正面与 18 Pro Max 背面合照；不能把两台都称为 18 Pro。              | [N18][N18] / [文件][image-01]       | Apple Inc. | 手机新闻稿 |
| 02 / `phone-pro-finishes`  | `phone-pro-finishes.jpg`  | 18 Pro 的 Black、Silver、Glacier、Burgundy 官方配色合照。                        | [N18][N18] / [文件][image-02]       | Apple Inc. | 手机新闻稿 |
| 03 / `phone-pro-lowlight`  | `phone-pro-lowlight.jpg`  | Apple 标为由 18 Pro 的 48MP Fusion 主摄拍摄的低光样张。                          | [N18][N18] / [文件][image-03]       | Apple Inc. | 手机新闻稿 |
| 04 / `phone-pro-night`     | `phone-pro-night.jpg`     | Apple 标为由 18 Pro 夜间模式拍摄的人物剪影与星空样张。                           | [N18][N18] / [文件][image-04]       | Apple Inc. | 手机新闻稿 |
| 05 / `phone-pro-landscape` | `phone-pro-landscape.jpg` | Apple 标为由 18 Pro 拍摄的山景样张。                                             | [N18][N18] / [文件][image-05]       | Apple Inc. | 手机新闻稿 |
| 06 / `phone-17-hero`       | `phone-17-hero.jpg`       | 两台 iPhone 17 展示正反面；该图官方 alt 未逐台注明颜色。                         | [N17][N17] / [文件][image-06]       | Apple Inc. | 手机新闻稿 |
| 07 / `phone-17-detail`     | `phone-17-detail.jpg`     | iPhone 17 侧面与全配色展示；并非单个颜色的独立特写。                             | [N17][N17] / [文件][image-07]       | Apple Inc. | 手机新闻稿 |
| 08 / `phone-17-finishes`   | `phone-17-finishes.jpg`   | iPhone 17 直立的 Lavender、Mist Blue、Sage、White、Black 合照。                  | [N17][N17] / [文件][image-08]       | Apple Inc. | 手机新闻稿 |
| 09 / `phone-17-landscape`  | `phone-17-landscape.jpg`  | Apple 标为由 iPhone 17 拍摄的海岸风景样张。                                      | [N17][N17] / [文件][image-09]       | Apple Inc. | 手机新闻稿 |
| 10 / `mac-pro-hero`        | `mac-pro-hero.jpg`        | 14 英寸基础 M6 MacBook Pro 半开侧面，背景为 M6 字样。                            | [NPro][NPro] / [文件][image-10]     | Apple Inc. | Mac 新闻稿 |
| 11 / `mac-pro-motion`      | `mac-pro-motion.jpg`      | 14 英寸 M6 MacBook Pro 展示 Adobe After Effects 项目。                           | [NPro][NPro] / [文件][image-11]     | Apple Inc. | Mac 新闻稿 |
| 12 / `mac-pro-code`        | `mac-pro-code.jpg`        | 14 英寸 M6 MacBook Pro 展示 Xcode；不是本站编译测试。                            | [NPro][NPro] / [文件][image-12]     | Apple Inc. | Mac 新闻稿 |
| 13 / `mac-pro-design`      | `mac-pro-design.jpg`      | 14 英寸 M6 MacBook Pro 展示 Pixelmator Pro。                                     | [NPro][NPro] / [文件][image-13]     | Apple Inc. | Mac 新闻稿 |
| 14 / `mac-pro-display`     | `mac-pro-display.jpg`     | 14 英寸 M6 MacBook Pro 的 Liquid Retina XDR 屏幕展示。                           | [NPro][NPro] / [文件][image-14]     | Apple Inc. | Mac 新闻稿 |
| 15 / `mac-pro-ports`       | `mac-pro-ports.jpg`       | 14 英寸 M6 MacBook Pro 两侧接口展示；速率须依据规格页。                          | [NPro][NPro] / [文件][image-15]     | Apple Inc. | Mac 新闻稿 |
| 16 / `mac-air-hero`        | `mac-air-hero.jpg`        | M5 Air 展示 Adobe Photoshop；图注未明确 13 或 15 英寸，不能指定单一尺寸。        | [NAir][NAir] / [文件][image-16]     | Apple Inc. | Mac 新闻稿 |
| 17 / `mac-air-pair`        | `mac-air-pair.jpg`        | 左侧 13 英寸 M5 Air / Starlight；右侧 15 英寸 M5 Air / Sky Blue，官方 alt 明确。 | [NAir][NAir] / [文件][image-17]     | Apple Inc. | Mac 新闻稿 |
| 18 / `mac-pro-front`       | `mac-pro-front.png`       | Support 确认的 14 英寸 M6 MacBook Pro 正面与背板组合，透明留白图。               | [SPro][SPro] / [文件][image-18]     | Apple Inc. | Support    |
| 19 / `mac-air-13-front`    | `mac-air-13-front.png`    | Support 确认的 13 英寸 M5 Air，黄色屏幕图案；不据此认定某一机身配色。            | [SAir13][SAir13] / [文件][image-19] | Apple Inc. | Support    |
| 20 / `mac-air-15-front`    | `mac-air-15-front.png`    | Support 确认的 15 英寸 M5 Air，黄色屏幕图案；不与 13 英寸图互换。                | [SAir15][SAir15] / [文件][image-20] | Apple Inc. | Support    |

`phone-pro-hero` 包含 Pro Max，不能将合照两侧都标成 18 Pro。`mac-air-hero` 不能凭文件名或外观确定单一尺寸；两张 Air Support 图则各有独立型号证据。手机配色合照不会因界面选择颜色而变成该颜色的独立照片；本流程不生成或重着色缺失款式。

## 实际尺寸与派生文件

输入尺寸来自 `.cache/press/` 文件元数据，并与 `media.json` 对照；下表尺寸不是 Mac ZIP 的高分辨率原件尺寸。输出路径统一为 `public/assets/images/<素材 ID>-<宽度>.webp`，宽高按原比例缩放。

| 素材 ID               | 输入格式 / 宽 × 高（px）           | 实际 WebP 宽度（px）    |
| --------------------- | ---------------------------------- | ----------------------- |
| `phone-pro-hero`      | JPEG / 1306 × 1829                 | 480 / 960 / 1306        |
| `phone-pro-finishes`  | JPEG / 1960 × 1400                 | 480 / 960 / 1600 / 1960 |
| `phone-pro-lowlight`  | JPEG / 1960 × 1470                 | 480 / 960 / 1600 / 1960 |
| `phone-pro-night`     | JPEG / 1960 × 1470                 | 480 / 960 / 1600 / 1960 |
| `phone-pro-landscape` | JPEG / 1960 × 1470                 | 480 / 960 / 1600 / 1960 |
| `phone-17-hero`       | JPEG / 1306 × 1828                 | 480 / 960 / 1306        |
| `phone-17-detail`     | JPEG / 1960 × 1102                 | 480 / 960 / 1600 / 1960 |
| `phone-17-finishes`   | JPEG / 1960 × 1102                 | 480 / 960 / 1600 / 1960 |
| `phone-17-landscape`  | JPEG / 1960 × 1470                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-hero`        | JPEG / 1960 × 1103                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-motion`      | JPEG / 1960 × 1307                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-code`        | JPEG / 1960 × 1307                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-design`      | JPEG / 1960 × 1307                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-display`     | JPEG / 1960 × 1307                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-ports`       | JPEG / 1960 × 1307                 | 480 / 960 / 1600 / 1960 |
| `mac-air-hero`        | JPEG / 1960 × 1308                 | 480 / 960 / 1600 / 1960 |
| `mac-air-pair`        | JPEG / 1960 × 1308                 | 480 / 960 / 1600 / 1960 |
| `mac-pro-front`       | 透明 PNG / 1000 × 1000 → 979 × 379 | 480 / 960 / 979         |
| `mac-air-13-front`    | 透明 PNG / 1000 × 1000 → 820 × 496 | 480 / 820               |
| `mac-air-15-front`    | 透明 PNG / 1000 × 1000 → 847 × 514 | 480 / 847               |

当前 17 张 Newsroom 输入文件已是 Apple 的文章版本：两张手机竖图宽 1306px，其余宽 1960px。Mac 研究缓存另外保存了 ZIP 中宽 3840px 的对应原件，但当前下载／处理脚本没有从 ZIP 解包取图；不能把文章图登记成 3840px，也不能声称生成了 2000px 的输出。三张 Support 输入是 1000 × 1000 的透明 PNG，仅裁切透明留边，不重绘设备，也不放大到超过裁切后的图像宽度。原始宽高保留为 originalWidth / originalHeight。

## 当前图片处理流程

1. **定义输入**：[docs/asset-definitions.json](asset-definitions.json) 给出 ID、alt、`source`、`originalUrl`、`originalFile`、作者、版权文字及日期。当前 20 条记录共有 7 个来源页面。
2. **本地缓存**：[scripts/download-assets.mjs](../scripts/download-assets.mjs) 读取定义，创建 `.cache/press/`，对缺失文件调用 `curl --fail --location --max-time 60 --output <路径> <originalUrl>`。已有文件直接跳过；脚本本身没有校验和比对或强制刷新步骤，也没有读取 ZIP 的实现。
3. **生成响应式图片**：[scripts/process-assets.mjs](../scripts/process-assets.mjs) 用 Sharp 读取元数据，以自动方向后的宽高为基准，候选宽度为 `[480, 960, 1600, min(源宽, 2000)]`，删除超过源宽的值、去重并排序。每份输出执行 `.rotate()` 自动应用 EXIF 方向、按宽等比缩小且 `withoutEnlargement: true`，再以 `quality: 86`、`effort: 5` 转为 WebP。三张带 trimTransparent 标记的 Support PNG 先裁切透明留边，再据实际尺寸缩放，派生文件名含 -trim-。没有重着色、设备生成或背景生成；源文件不被覆盖。
4. **写出清单**：处理脚本把文件写入 `public/assets/images/`，并覆盖生成 `src/data/media.json`，保留定义字段，补充源尺寸、各派生尺寸／文件名、处理说明和权利状态字段。当前为 20 条媒体记录、73 个被引用的 WebP 文件；磁盘中其他旧文件不因此算入本登记。
5. **页面读取**：[src/data/media.ts](../src/data/media.ts) 从本地派生文件选取满足请求宽度的第一档，默认请求 960px，不足则取最大档；[Media.tsx](../src/components/Media.tsx) 输出 `srcSet`、`sizes`、固有尺寸和 alt，常规懒加载，优先图即时加载，并异步解码。图片通过站点本地路径提供；Apple URL 用于来源与文件链接，不用作 `<img>` 热链。
6. **显示裁切**：CSS 默认 contain，设备舞台、样张与接口图按构图使用 cover 或溢出隐藏。透明留边裁切和 CSS 显示裁切均记入处理记录；不改变产品设计或颜色。用户界面与资源已在真实 Chromium 中验证，结果见 qa-results.md。

复现：node scripts/download-assets.mjs，随后 npm run assets。原始来源保持不变，变动的是衍生图像的透明画布范围。当前 73 份图片已在浏览器页面中按需加载；元数据保留每个候选的实际宽高。

## 本次核对结果与已知偏差

- 20 条定义与 20 条媒体记录按 ID 一一对应，所有共享字段一致；20 个 `originalUrl` 均能在对应 `source` 的缓存 HTML 中找到。
- `.cache/press/` 中 20 份输入与各自手机研究缓存、Mac 文章预览缓存或 Support 缓存逐文件 SHA-256 相同；原始尺寸与未裁切媒体记录相符，裁切项另存原始与衍生尺寸，清单引用的 73 个 WebP 路径均存在。新的裁切尺寸由 Sharp 输出结果写入。
- 没有发现把旧代 M5 MacBook Pro／M4 Air 图片当成当前 M6／M5 产品登记的情况；有多机型合照与尺寸未标明的系列图，已在逐项登记中明确边界。
- 复核发现 Credits 曾将 Support 素材概括为 Newsroom；已修正概述，并将链接统一为“原始页面”。实际 source 字段始终指向对应来源。
- iPhone 17 的材料字段已补充官方融色玻璃背板的配色范围，见 [产品研究记录](product-research.md)。素材 ID、文件名和来源页不能补足该规格条件。

旧版 Commons 文件、未采用的缓存候选和它们的许可不列入本版 20 图。Inter Variable、Noto Sans SC（SIL OFL 1.1）及 Lucide（ISC）是另外的字体／图标依赖，参见 `public/licenses/`；其许可不适用于本登记的 Apple 图片。

[N18]: https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/
[N17]: https://www.apple.com/newsroom/2025/09/apple-debuts-iphone-17/
[NPro]: https://www.apple.com/newsroom/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/
[NAir]: https://www.apple.com/newsroom/2026/03/apple-introduces-the-new-macbook-air-with-m5/
[SPro]: https://support.apple.com/en-us/148300
[SAir13]: https://support.apple.com/en-us/126320
[SAir15]: https://support.apple.com/en-us/126321
[image-01]: https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-2up-260909_inline.jpg.large_2x.jpg
[image-02]: https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-color-lineup-260909_big.jpg.large_2x.jpg
[image-03]: https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-photography-aperture-low-light-260909_big.jpg.large_2x.jpg
[image-04]: https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-photography-Night-mode-260909_big.jpg.large_2x.jpg
[image-05]: https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-photography-Fusion-Main-48MP-260909_big.jpg.large_2x.jpg
[image-06]: https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-hero-250909_inline.jpg.large_2x.jpg
[image-07]: https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-lineup-250909_big.jpg.large_2x.jpg
[image-08]: https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-color-lineup-250909_big.jpg.large_2x.jpg
[image-09]: https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-48MP-Fusion-1x-photography-250909_big.jpg.large_2x.jpg
[image-10]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Apple-MacBook-Pro-14-in-with-M6-hero-261027_big.jpg.large_2x.jpg
[image-11]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Apple-MacBook-Pro-14-in-with-M6-Adobe-After-Effects-261027_big.jpg.large_2x.jpg
[image-12]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Apple-MacBook-Pro-14-in-with-M6-Xcode-261027_big.jpg.large_2x.jpg
[image-13]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Apple-MacBook-Pro-14-in-with-M6-Pixelmator-Pro-261027_big.jpg.large_2x.jpg
[image-14]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Apple-MacBook-Pro-14-in-with-M6-Liquid-Retina-XDR-display-261027_big.jpg.large_2x.jpg
[image-15]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Apple-MacBook-Pro-14-in-with-M6-connectivity-261027_big.jpg.large_2x.jpg
[image-16]: https://www.apple.com/newsroom/images/2026/03/apple-introduces-the-new-macbook-air-with-m5/article/Apple-MacBook-Air-hero-260303_big.jpg.large_2x.jpg
[image-17]: https://www.apple.com/newsroom/images/2026/03/apple-introduces-the-new-macbook-air-with-m5/article/Apple-MacBook-Air-13-inch-and-15-inch-260303_big.jpg.large_2x.jpg
[image-18]: https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/macbook-pro-14-inch-m6.png
[image-19]: https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/macbook-air-13-inch-m5.png
[image-20]: https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/macbook-air-15-inch-m5.png
[pro-zip]: https://www.apple.com/newsroom/images/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/article/Media-of-Apple-MacBook-Pro-14-in-with-M6-261027.zip
[air-zip]: https://www.apple.com/newsroom/images/2026/03/apple-introduces-the-new-macbook-air-with-m5/article/Images-of-Apple-MacBook-Air-260303.zip
[site-terms]: https://www.apple.com/legal/internet-services/terms/site.html
[ip-guidelines]: https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html
