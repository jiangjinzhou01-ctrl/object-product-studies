import raw from './media.json';
import type { MediaAsset } from '../types/product';
const assets: MediaAsset[] = raw;
export function getMedia(id: string): MediaAsset {
  const asset = assets.find((a) => a.id === id);
  if (!asset) throw new Error(`Unknown media asset: ${id}`);
  return asset;
}
export const mediaAssets = assets;
export function mediaUrl(id: string, width = 960) {
  return `${import.meta.env.BASE_URL}assets/images/${id}-${width}.webp`;
}
