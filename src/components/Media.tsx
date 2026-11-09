import { Link } from 'react-router-dom';
import { getMedia, mediaUrl } from '../data/media';
export function Media({
  id,
  priority = false,
  className = '',
  sizes = '(max-width: 700px) 100vw, 60vw',
  credit = false,
}: {
  id: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  credit?: boolean;
}) {
  const a = getMedia(id);
  return (
    <figure className={`media ${className}`}>
      <img
        src={mediaUrl(id)}
        srcSet={[480, 960, 1600].map((w) => `${mediaUrl(id, w)} ${w}w`).join(', ')}
        sizes={sizes}
        width={a.width}
        height={a.height}
        alt={a.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
      {credit && (
        <figcaption>
          <Link to={`/credits#${id}`}>
            摄影：{a.author} · {a.license} ↗
          </Link>
        </figcaption>
      )}
    </figure>
  );
}
