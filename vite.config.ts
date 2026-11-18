import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { homeHeroSizes, homeHeroViews } from './src/data/homeHero';
import media from './src/data/media.json';
import { imageSrcSet } from './src/lib/mediaSources';

function preloadHomeImage(): Plugin {
  let base = '/';
  return {
    name: 'preload-home-image',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: 'pre',
      handler() {
        const cover = media.find((asset) => asset.id === homeHeroViews[0].id);
        if (!cover) throw new Error('The homepage image is missing from the media manifest.');
        // All hash routes share this HTML. Only the homepage needs this request.
        return [
          {
            tag: 'script',
            injectTo: 'head',
            children: `(() => {
  const route = location.hash.slice(1).split(/[?#]/)[0];
  if (route && route !== '/') return;
  const link = document.createElement('link');
  if (!('imageSrcset' in link)) return;
  link.rel = 'preload';
  link.as = 'image';
  link.imageSrcset = ${JSON.stringify(imageSrcSet(cover.variants, base))};
  link.imageSizes = ${JSON.stringify(homeHeroSizes)};
  link.fetchPriority = 'high';
  document.head.append(link);
})();`,
          },
        ];
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadHomeImage()],
  base: process.env.VITE_BASE_PATH || '/',
  build: { target: 'es2022', sourcemap: true },
});
