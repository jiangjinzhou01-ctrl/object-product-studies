import type { MediaAsset } from '../types/product';

export function imagePath(base: string, file: string, attempt = 0) {
  return base + 'assets/images/' + file + (attempt ? '?retry=' + attempt : '');
}

export function imageSrcSet(variants: MediaAsset['variants'], base: string, attempt = 0) {
  return variants
    .map(({ file, width }) => imagePath(base, file, attempt) + ' ' + width + 'w')
    .join(', ');
}
