import { Link } from 'react-router-dom';
import type { Ref } from 'react';
import { getMedia, mediaUrl } from '../data/media';
import { imageSrcSet } from '../lib/mediaSources';
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
}) {
  const asset = getMedia(id);
  const base = import.meta.env.BASE_URL;
  return (
    <figure className={'media ' + className} data-reveal={reveal}>
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
      {credit && (
        <figcaption>
          <Link to={'/credits#' + id}>图像：{asset.author} ↗</Link>
        </figcaption>
      )}
    </figure>
  );
}
