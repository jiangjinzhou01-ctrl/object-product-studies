export const homeHeroViews = [
  {
    id: 'phone-pro-spec',
    label: '四款配色',
    caption: '黑色、银色、冰川色、酒红色',
    source: 'Apple 技术规格',
  },
  {
    id: 'phone-pro-hero',
    label: '正面与背面',
    caption: 'iPhone 18 Pro 与 Pro Max 酒红色合照',
    source: 'Apple Newsroom',
  },
  {
    id: 'phone-pro-lowlight',
    label: '低光样张',
    caption: '48MP Fusion 主摄低光样张',
    source: 'Apple Newsroom',
  },
] as const;

// The display is 57% of the shared content width on desktop and full width on mobile.
export const homeHeroSizes =
  '(max-width: 760px) calc(100vw - 36px), (max-width: 1100px) 57vw, min(760px, 55vw)';
