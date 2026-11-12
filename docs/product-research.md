# OBJECT · Edition02 产品研究记录

文档复核日期：**2026-11-12（UTC）**。本记录对应当前 [phones.ts](../src/data/phones.ts)、[macs.ts](../src/data/macs.ts)、[media.json](../src/data/media.json) 和 [asset-definitions.json](asset-definitions.json)，替代 Edition01 的产品替换与 Commons 图片方案。当前范围为五款产品、20 张 Apple 官方公开图片；逐图来源、署名、权利状态及实际处理流程见 [素材登记](asset-register.md)。

本版按用户明确指示使用 Apple 公开媒体，用于非官方作品集。用户的使用指示不等于 Apple 授权，也不改变素材版权。旧版 MacBook Pro 14 英寸基础 M5、MacBook Air 15 英寸 M4 已不是当前研究对象；磁盘或历史文档中留存的旧素材不能用来证明当前机型的外观、规格或许可。

## 官方来源与日期

型号专属 Apple Support 规格页用于核对配置；对应 Newsroom 发布稿用于核对发布日期、首批上市时间、官方配色及图片归属。日期是官方发布记录，不表示所有市场同日上市或当前有货。

| 当前模型 ID / 产品                              | 官方技术规格                 | 官方发布稿                      | 发布日 / 首批上市日     | 源码记录的核查日期 |
| ----------------------------------------------- | ---------------------------- | ------------------------------- | ----------------------- | ------------------ |
| `iphone-18-pro` / iPhone 18 Pro                 | [Support 148590][p18-spec]   | [2026 年 9 月发布稿][p18-news]  | 2026-09-09 / 2026-09-18 | 2026-11-09         |
| `iphone-17` / iPhone 17                         | [Support 125089][p17-spec]   | [2025 年 9 月发布稿][p17-news]  | 2025-09-09 / 2025-09-19 | 2026-11-09         |
| `macbook-pro-m6` / MacBook Pro 14 英寸，基础 M6 | [Support 148300][pro-spec]   | [2026 年 10 月发布稿][pro-news] | 2026-10-27 / 2026-11-06 | 2026-11-11         |
| `macbook-air-13-m5` / MacBook Air 13 英寸，M5   | [Support 126320][air13-spec] | [2026 年 3 月发布稿][air-news]  | 2026-03-03 / 2026-03-11 | 2026-11-11         |
| `macbook-air-15-m5` / MacBook Air 15 英寸，M5   | [Support 126321][air15-spec] | [2026 年 3 月发布稿][air-news]  | 2026-03-03 / 2026-03-11 | 2026-11-11         |

证据与日期边界：

- 手机发布稿及图片对照来自 `.cache/rewrite-phone/18.html`、`17.html`、`selected.json`；20 张图片的元数据均记为 `verifiedAt: 2026-11-11`。这些日期不冒充本次访问日期，也不据文件修改时间推断下载日期。
- Mac 规格、发布稿和条款来自 `.cache/rewrite-mac/` 中的对应 HTML；[rewrite-mac-research.json](rewrite-mac-research.json) 记录了 2026-11-11 的来源 URL、响应状态、缓存路径、摘要及条件。本次读取这些缓存核对，不把先前研究中的下载、解码或目视检查计数写成本次执行结果。
- 2026-11-12 另对上表两份手机 Support URL 作只读 HTTPS GET，均返回 HTTP 200，最终 URL 与请求相同；核对规格、前置相机、续航和材料条件。此次响应未另存文件；`phones.ts` 的原核查日期未改。
- Mac 的补充规格页为 [Liquid Retina XDR 系列规格][pro-tech] 和 [MacBook Air 规格][air-tech]。前者包含多个芯片配置，必须逐列辨认；不能把系列页面中的其他芯片参数合并到基础 M6。

## 已核对的手机规格

下表复述当前数据中的数值，并补全来源条件。它不代表本站进行了实机测量或相机测试。

| 项目             | iPhone 18 Pro                             | iPhone 17                                                            |
| ---------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| 芯片 / CPU / GPU | A20 Pro / 6 核 / 7 核                     | A19 / 6 核 / 5 核                                                    |
| 显示屏           | 6.3 英寸 OLED；标准矩形对角线 6.27 英寸   | 6.3 英寸 OLED；标准矩形对角线 6.27 英寸                              |
| 分辨率 / 刷新率  | 2622 × 1206；ProMotion 自适应最高 120Hz   | 2622 × 1206；ProMotion 自适应最高 120Hz                              |
| 后置相机         | 三枚 48MP Fusion：主摄、超广角、长焦      | 两枚 48MP Fusion：主摄、超广角                                       |
| 主摄光圈         | 可变光圈 ƒ/1.48、ƒ/1.8、ƒ/2.8、ƒ/4.0      | ƒ/1.6                                                                |
| 前置相机         | 18MP Center Stage                         | 18MP Center Stage                                                    |
| 存储容量         | 256GB / 512GB / 1TB / 2TB                 | 256GB / 512GB                                                        |
| 重量             | 211g                                      | 177g                                                                 |
| 高 × 宽 × 厚     | 150.0 × 71.9 × 8.75mm                     | 149.6 × 71.5 × 7.95mm                                                |
| 视频播放上限     | 最长 36 小时，发布稿限定为 eSIM-only 机型 | 最长 30 小时                                                         |
| 机身材料         | 铝金属一体式设计                          | 铝金属；官方仅在 Black、Mist Blue、Sage、Lavender 后注明融色玻璃背板 |
| 官方配色         | Black、Silver、Glacier、Burgundy          | Black、White、Mist Blue、Sage、Lavender                              |

显示屏实际可视面积小于标准矩形。续航是 Apple 公布的测试上限，受型号、设置、网络及使用条件影响；手机的“视频播放”与 Mac 的“视频流播放”不是同一测试指标。源码已保留 iPhone 18 Pro 的 eSIM-only 条件，不能扩展到全部地区版本，也不能把 Pro Max 的 45 小时写入 18 Pro。

源码中的配色十六进制值是界面色块，不是 Apple 发布的校色色值。配色名称得到来源支持，不等于每种颜色都有单独、同角度的机型图片；合照不能冒充某一颜色的独立实拍。

## 已核对的 Mac 规格

MacBook Pro 的研究对象是 **14 英寸机身、基础 M6 芯片**。它不是 M5 Pro／M5 Max 芯片配置；也不能借用另一款 PROLED XDR 产品的触控、OLED、Dynamic Island 或 Thunderbolt 5 声明。

| 项目           | MacBook Pro 14 英寸 · M6    | MacBook Air 13 英寸 · M5              | MacBook Air 15 英寸 · M5              |
| -------------- | --------------------------- | ------------------------------------- | ------------------------------------- |
| CPU / GPU      | 12 核 / 12 核               | 10 核 / 8 核或 10 核                  | 10 核 / 10 核                         |
| 统一内存       | 16GB / 24GB / 32GB          | 16GB / 24GB / 32GB                    | 16GB / 24GB / 32GB                    |
| SSD            | 1TB / 2TB / 4TB             | 512GB / 1TB / 2TB / 4TB               | 512GB / 1TB / 2TB / 4TB               |
| 显示屏         | 14.2 英寸 Liquid Retina XDR | 13.6 英寸 Liquid Retina               | 15.3 英寸 Liquid Retina               |
| 分辨率         | 3024 × 1964                 | 2560 × 1664                           | 2880 × 1864                           |
| 刷新率         | ProMotion 自适应最高 120Hz  | 当前型号规格页未给出数值，数据省略    | 当前型号规格页未给出数值，数据省略    |
| 重量           | 1.55kg                      | 1.23kg                                | 1.51kg                                |
| 宽 × 深 × 高   | 312.6 × 221.2 × 15.5mm      | 304.1 × 215.0 × 11.3mm                | 340.4 × 237.6 × 11.5mm                |
| 摄像头         | 12MP Center Stage           | 12MP Center Stage                     | 12MP Center Stage                     |
| Thunderbolt 4  | 3 个，最高 40Gb/s           | 2 个，最高 40Gb/s                     | 2 个，最高 40Gb/s                     |
| HDMI / SDXC    | 均配备                      | 均未配备                              | 均未配备                              |
| 视频流播放上限 | 最长 24 小时                | 最长 18 小时                          | 最长 18 小时                          |
| 无线连接       | Wi-Fi 7 / Bluetooth 6       | Wi-Fi 7 / Bluetooth 6                 | Wi-Fi 7 / Bluetooth 6                 |
| 官方配色       | Space Black、Silver         | Sky Blue、Silver、Starlight、Midnight | Sky Blue、Silver、Starlight、Midnight |

上市时点与型号配置分别由发布稿和 Support 规格页支撑。容量列表表示可选配置，不保证每种内存与 SSD 组合在每个市场均可购买；格式化后的可用容量更少。重量会因配置及制造工艺而异，屏幕对角线按标准矩形测量，Wi-Fi 7 可用性有地区限制。

Mac 续航条件须随数值理解：Pro 为 Apple 2026 年 9 月测试的预生产基础 M6、12 核 CPU／12 核 GPU、32GB 内存、1TB SSD；Air 为 2026 年 1 月测试的预生产 13 英寸 10 核 CPU／8 核 GPU，以及 15 英寸 10 核 CPU／10 核 GPU，均为 16GB 内存、512GB SSD。视频流测试使用 Wi-Fi 下 Safari 播放 1080p 内容，屏幕亮度设为最低以上八格，关闭键盘背光；实际续航随使用条件变化。这些条件来自对应 Support 页面脚注，不能解释成日常工作时长或本站成绩。

Air 发布稿明确写出无风扇设计，与 `cooling: 'passive'` 一致。Pro 的型号规格页与发布稿没有提供足以单独确认散热分类的明确表述，因此已删除未核实的 cooling 字段，不推断风扇数量、噪声或持续功耗。

## 图片归属与证据边界

当前 20 张图为 9 张手机 Newsroom 图片、8 张 Mac Newsroom 图片及 3 张型号专属 Support PNG。所有 `originalUrl` 都在其 `source` 对应的缓存 HTML 中出现；当前定义与生成后的媒体记录中相同字段一致，未发现这 20 对 URL 的交叉机型错配。

- `phone-pro-hero` 的 Apple alt 明确写明：酒红色 iPhone 18 Pro 正面与酒红色 iPhone 18 Pro Max 背面同框。它可用于系列介绍，但不能描述为两台 18 Pro，或据背面判断 18 Pro 的尺寸；产品库仍只有 18 Pro。
- `phone-pro-lowlight`、`phone-pro-night`、`phone-pro-landscape` 和 `phone-17-landscape` 是 Apple 标注拍摄机型的样张，不是本站拍摄，不是设备外观照，也不证明本站完成过成像质量对比。
- 六张 MacBook Pro Newsroom 图均来自 14 英寸 M6 发布稿；屏幕中的 After Effects、Xcode、Pixelmator Pro 是官方展示内容，不构成本站性能测试。
- `mac-air-hero` 只确认 M5 Air 系列与 Photoshop 场景，官方图注未指明单独尺寸；`mac-air-pair` 明确为左侧 13 英寸 Starlight 与右侧 15 英寸 Sky Blue。两张图不能被重标为任意尺寸或配色。
- `mac-pro-front`、`mac-air-13-front`、`mac-air-15-front` 分别由 Support 页面标题、图片 alt 和文件 URL 确认机型。其 1000 × 1000 透明 PNG 包含留白，不能按全屏高分辨率摄影素材描述。

## 保留省略的事实

本次没有生成性能排名、跑分、百分比分数或主观评分，也没有做实机测试。官方宣传中的性能增幅不转写为本站研究结论；价格、地区库存和未来功能计划不进入本产品规格记录。

Air 的数字刷新率保持省略。基础 M6 的内存带宽未进入当前比较字段：来源区分 16GB 配置的 153GB/s 与 24GB／32GB 配置的 170GB/s，不能将“最高 170GB/s”概括为全配置数值。屏幕峰值亮度、外接显示器模式、快充、包装适配器和再生材料比例等虽在官方页面有条件说明，本记录不另行扩展成无条件的比较指标；“机壳铝材 100% 再生”也不表示整机全部材料均为再生材料。

官方产品图的制作方法未由本次证据确立，不称为独立摄影师实拍；个人摄影师身份也未核定。没有依据图片文件名推断未写明的型号、尺寸、颜色或软件。旧版基础 M5 的 MacBook Pro 照片、M4 Air 照片及来源披露生成式 Clean Up 的旧候选，不属于本版 20 张登记素材；不把旧研究的筛选结果扩展为“网上不存在其他可用图片”。

## 复核后已修正

- iPhone 17 材料字段改为“铝金属与玻璃背板”，脚注保留融色玻璃适用的四款配色，不扩展至 White。
- Credits 的概述与链接改为同时覆盖新闻稿和技术支持资料，使用“原始页面”标签。
- 基础 M6 MacBook Pro 的未确认 cooling 分类已从数据删除；MacProduct 将该字段设为可选，Air 继续保留来源明确的无风扇分类。

上述数值与所读官方来源一致。本结论限于五款产品记录的字段，不代表完整技术规格或所有地区配置均已审计。

[p18-spec]: https://support.apple.com/en-asia/148590
[p18-news]: https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/
[p17-spec]: https://support.apple.com/en-us/125089
[p17-news]: https://www.apple.com/newsroom/2025/09/apple-debuts-iphone-17/
[pro-spec]: https://support.apple.com/en-us/148300
[pro-news]: https://www.apple.com/newsroom/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/
[air13-spec]: https://support.apple.com/en-us/126320
[air15-spec]: https://support.apple.com/en-us/126321
[air-news]: https://www.apple.com/newsroom/2026/03/apple-introduces-the-new-macbook-air-with-m5/
[pro-tech]: https://www.apple.com/macbook-pro/liquid-retina-xdr-display/specs/
[air-tech]: https://www.apple.com/macbook-air/specs/
