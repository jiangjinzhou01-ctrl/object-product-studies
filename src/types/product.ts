export type Family = 'iphone' | 'mac';
export interface ReferenceSource {
  id: string;
  title: string;
  url: string;
  verifiedAt: string;
}
export interface Specification {
  key: string;
  label: string;
  value: string;
  sourceId: string;
  note?: string;
}
export interface Finish {
  name: string;
  hex: string;
  mediaId?: string;
}
interface ProductBase {
  id: string;
  slug: string;
  name: string;
  family: Family;
  index: string;
  releaseDate: string;
  announcementDate: string;
  heroMedia: string;
  gallery: string[];
  availableFinishes: Finish[];
  referenceSources: ReferenceSource[];
  specifications: Specification[];
  tagline: string;
  description: string;
}
export interface PhoneProduct extends ProductBase {
  family: 'iphone';
  cameraSystem: 'dual' | 'pro';
  chip: string;
}
export interface MacProduct extends ProductBase {
  family: 'mac';
  cooling: 'active' | 'passive';
  chip: string;
  screenSize: 13 | 14 | 15;
}
export type Product = PhoneProduct | MacProduct;
export interface MediaAsset {
  id: string;
  filename: string;
  width: number;
  height: number;
  alt: string;
  author: string;
  source: string;
  originalUrl: string;
  license: string;
  licenseUrl: string;
  modifications: string;
  verifiedAt: string;
  webDisplayAllowed: boolean;
  attributionRequired: boolean;
}
