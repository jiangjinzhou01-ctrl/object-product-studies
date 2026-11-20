import type { ImageSource } from '../types/product';

export const filmPoster = 'phone-pro-poster-wide';
// object-fit: cover can paint a portrait photograph wider than its visible viewport.
export const posterSizes =
  '(max-width: 734px) max(100vw, 100svh), (max-width: 1068px) max(100vw, 110svh), max(100vw, 120svh)';
export const filmSources: readonly ImageSource[] = [
  { media: '(max-width: 734px)', id: 'phone-pro-poster-portrait' },
  { media: '(max-width: 1068px)', id: 'phone-pro-poster-medium' },
];

export const productFilm = {
  source: 'https://www.apple.com.cn/iphone-18-pro/',
  baseUrl:
    'https://www.apple.com.cn/105/media/us/iphone-18-pro/2026/591df885-5ee2-4173-86e6-401021249f7c/anim/hero/',
  verifiedAt: '2026-11-20',
  author: 'Apple Inc.',
  durationSeconds: 5,
  versions: [
    { media: '(max-width: 734px)', file: 'small.mp4', width: 736, height: 704 },
    { media: '(max-width: 1068px)', file: 'medium.mp4', width: 1068, height: 900 },
    { media: 'all', file: 'large.mp4', width: 1440, height: 1080 },
  ],
} as const;

export const highlights = [
  {
    id: 'phone-highlight-camera',
    label: '相机',
    title: '4800 万像素融合式主摄',
    detail: '四档可变光圈，调节进光量与景深。',
    sources: [{ media: '(max-width: 734px)', id: 'phone-highlight-camera-portrait' }],
    to: '/iphone/iphone-18-pro#camera',
    action: '探索相机系统',
  },
  {
    id: 'phone-highlight-chip',
    label: 'A20 Pro 芯片',
    title: 'A20 Pro 芯片',
    detail: '6 核 CPU 和 7 核 GPU，处理图像与游戏画面。',
    sources: [{ media: '(max-width: 734px)', id: 'phone-highlight-chip-portrait' }],
    to: '/iphone/iphone-18-pro#performance',
    action: '了解芯片',
  },
  {
    id: 'phone-highlight-colors',
    label: '四款配色',
    title: '铝金属一体成型机身',
    detail: '勃艮第酒红色、冰川蓝色、银色与黑色。',
    sources: [{ media: '(max-width: 734px)', id: 'phone-highlight-colors-portrait' }],
    to: '/iphone/iphone-18-pro#finishes',
    action: '查看各款外观',
  },
] as const;
