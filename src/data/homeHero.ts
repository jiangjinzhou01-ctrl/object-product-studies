export const homeHeroViews = [
  {
    id: 'phone-pro-finishes',
    label: '四款配色',
    caption: 'iPhone 18 Pro 系列官方配色',
  },
  {
    id: 'phone-pro-hero',
    label: '正面与背面',
    caption: 'iPhone 18 Pro 与 Pro Max 官方合照',
  },
] as const;

// Match the stage width at each breakpoint so the preload and the image share a request.
export const homeHeroSizes =
  '(max-width: 760px) min(148vw, 760px), (max-width: 1100px) 110vw, min(1300px, 94vw)';
