import { Link } from 'react-router-dom';
import { getMedia, mediaUrl } from '../data/media';
export function Media({
  id,
  priority = false,
  className = '',
  sizes = '(max-width: 760px) 100vw, 60vw',
  credit = false,
  alt,
}: {
  id: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  credit?: boolean;
  alt?: string;
}) {
  const asset = getMedia(id);
  return (
    <figure className={'media ' + className}>
      <img
        src={mediaUrl(id)}
        srcSet={asset.variants
          .map((v) => import.meta.env.BASE_URL + 'assets/images/' + v.file + ' ' + v.width + 'w')
          .join(', ')}
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
