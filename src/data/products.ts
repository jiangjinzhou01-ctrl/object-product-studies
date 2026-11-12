import { phones } from './phones';
import { macs } from './macs';
import type { Product } from '../types/product';
export const products: Product[] = [phones[0], ...macs, phones[1]];
export function productPath(product: Product) {
  return product.id === 'iphone-18-pro'
    ? '/iphone/iphone-18-pro'
    : product.id === 'macbook-pro-m6'
      ? '/mac/macbook-pro-m6'
      : '/' + product.family + '#' + product.id;
}
