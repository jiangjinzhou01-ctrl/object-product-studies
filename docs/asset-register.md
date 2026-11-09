# Photography asset register

All seven photographs were checked on **2026-11-09**. The rendered website provides this same credit index at `/#/credits`. No hotlinking, generated hardware, recoloring or Apple-hosted image downloads are used.

| File / derivatives                                                           | Author          | Source                                                                                            | License                                                                 | Web display | Attribution                   |
| ---------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------- | ----------------------------- |
| `iphone-18-pro-glacier.jpg` → `iphone-18-pro-glacier-480/960/1600.webp`      | Kyu3a           | [File page](<https://commons.wikimedia.org/wiki/File:IPhone_18_Pro_(Glacier_model)_-_1.jpg>)      | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)          | Allowed     | Required                      |
| `iphone-18-pro-black.jpg` → `iphone-18-pro-black-480/960/1600.webp`          | Farragutful     | [File page](https://commons.wikimedia.org/wiki/File:IPhone_18_Pro_-_black_01.jpg)                 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)          | Allowed     | Required                      |
| `iphone-18-pro-rear.jpg` → `iphone-18-pro-rear-480/960/1600.webp`            | 茅野ふたば      | [File page](https://commons.wikimedia.org/wiki/File:IPhone_18_Pro_rear.jpg)                       | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)          | Allowed     | Required                      |
| `iphone-17-lavender.jpg` → `iphone-17-lavender-480/960/1600.webp`            | AzureSaturn     | [File page](<https://commons.wikimedia.org/wiki/File:IPhone_17_(Lavender)_-_Backside.jpg>)        | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en)         | Allowed     | Not required; credited anyway |
| `iphone-17-sage.jpg` → `iphone-17-sage-480/960/1600.webp`                    | Ahmad Ali Karim | [File page](<https://commons.wikimedia.org/wiki/File:Sage_iPhone_17_(cropped).jpg>)               | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en)         | Allowed     | Not required; credited anyway |
| `mac-pro-14-m5-space-black-original.jpg` → `mac-pro-14-m5-480/960/1600.webp` | AzureSaturn     | [File page](<https://commons.wikimedia.org/wiki/File:MacBook_Pro_(14-inch,_M5,_Space_Black).jpg>) | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | Allowed     | Not required; credited anyway |
| `mac-air-15-m4-silver-original.jpg` → `mac-air-15-m4-480/960/1600.webp`      | AzureSaturn     | [File page](<https://commons.wikimedia.org/wiki/File:MacBook_Air_(15-inch,_M4,_Silver).jpg>)      | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | Allowed     | Not required; credited anyway |

All derivatives are resized, EXIF-auto-oriented and converted to WebP. Layout may crop images with CSS `object-fit`; no hardware or finish is altered. CC BY-SA derivatives remain offered under CC BY-SA 4.0 with author, source, license link and this modification statement. CC0 files retain CC0 status.

Original URLs, checked dates and metadata are in `docs/asset-definitions.json` and `src/data/media.json`. Original filenames are descriptive local download names; Wikimedia file names remain in the source URLs. Reproduce the files with `node scripts/download-assets.mjs` and `npm run assets`.

Excluded: the candidate 13-inch MacBook Air M5 photograph had source-disclosed generative Clean Up metadata with unknown edit extent. It is neither shipped nor shown. No M6 photograph was replaced by an unlabeled M5 photograph.

Inter Variable is SIL OFL 1.1; Lucide is ISC. Their full licenses are shipped under `public/licenses/`. Chinese glyphs are supplied by the device operating system.
