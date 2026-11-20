import { Link } from 'react-router-dom';
import type { Ref } from 'react';
import { getMedia, mediaUrl } from '../data/media';
import { imageSrcSet } from '../lib/mediaSources';
import type { ImageSource } from '../types/product';
export function Media({
  id,
  priority = false,
  className = '',
  sizes = '(max-width: 760px) 100vw, 60vw',
  credit = false,
  alt,
  imageRef,
  attempt = 0,
  reveal,
  sources,
}: {
  id: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  credit?: boolean;
  alt?: string;
  imageRef?: Ref<HTMLImageElement>;
  attempt?: number;
  reveal?: 'image';
  sources?: readonly ImageSource[];
}) {
  const asset = getMedia(id);
  const base = import.meta.env.BASE_URL;
  const image = (
    <img
      ref={imageRef}
      src={mediaUrl(id, 960, attempt)}
      srcSet={imageSrcSet(asset.variants, base, attempt)}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt ?? asset.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
  return (
    <figure className={'media ' + className} data-reveal={reveal}>
      {sources?.length ? (
        <picture>
          {sources.map((source) => {
            const variant = getMedia(source.id);
            return (
              <source
                key={source.media}
                media={source.media}
                sizes={sizes}
                srcSet={imageSrcSet(variant.variants, base, attempt)}
                width={variant.width}
                height={variant.height}
              />
            );
          })}
          {image}
        </picture>
      ) : (
        image
      )}
      {credit && (
        <figcaption>
          <Link to={'/credits#' + id}>图像：{asset.author} ↗</Link>
        </figcaption>
      )}
    </figure>
  );
}
