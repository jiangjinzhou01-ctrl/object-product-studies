import raw from './media.json';
import type { MediaAsset } from '../types/product';
export const mediaAssets: MediaAsset[] = raw;
export function getMedia(id: string): MediaAsset {
  const asset = mediaAssets.find((a) => a.id === id);
  if (!asset) throw new Error('Unknown media asset: ' + id);
  return asset;
}
export function mediaUrl(id: string, width = 960) {
  const asset = getMedia(id);
  const variant = asset.variants.find((v) => v.width >= width) ?? asset.variants.at(-1)!;
  return import.meta.env.BASE_URL + 'assets/images/' + variant.file;
}
