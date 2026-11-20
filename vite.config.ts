import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { filmPoster, filmSources, posterSizes } from './src/data/homeHero';
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
        const candidates = [...filmSources, { media: 'all', id: filmPoster }].map((source) => {
          const image = media.find((item) => item.id === source.id);
          if (!image) throw new Error('Missing film poster: ' + source.id);
          return { media: source.media, srcset: imageSrcSet(image.variants, base) };
        });
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
  const candidates = ${JSON.stringify(candidates)};
  link.imageSrcset = candidates.find((source) => matchMedia(source.media).matches).srcset;
  link.imageSizes = ${JSON.stringify(posterSizes)};
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
