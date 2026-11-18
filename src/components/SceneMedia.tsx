import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Media } from './Media';

interface Frame {
  id: string;
  key: string;
  attempt: number;
}

interface PresentedFrames {
  current: Frame;
  outgoing: Frame | null;
}

/** Keep the previous photograph on screen until the incoming one can be painted. */
export function SceneMedia({
  id,
  sizes,
  priority = false,
  onPresent,
}: {
  id: string;
  sizes?: string;
  priority?: boolean;
  onPresent?: (id: string) => void;
}) {
  const [frames, setFrames] = useState<PresentedFrames | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [retry, setRetry] = useState({ id: '', attempt: 0 });
  const pendingImage = useRef<HTMLImageElement>(null);
  const attempt = retry.id === id ? retry.attempt : 0;
  const requestKey = id + ':' + attempt;
  const current = frames?.current ?? null;
  const ready = current?.key === requestKey;
  const failed = failure === requestKey;
  const waiting = !ready && !failed;
  const layers = ready
    ? [frames?.outgoing ?? null, current]
    : [current, { id, key: requestKey, attempt }];

  useEffect(() => {
    const image = pendingImage.current;
    if (!waiting || !image) return;

    const target = image;
    let settled = false;
    function finish(success: boolean) {
      if (settled) return;
      settled = true;
      if (!success) {
        setFailure(requestKey);
        return;
      }
      setFrames((previous) => ({
        current: { id, key: requestKey, attempt },
        outgoing: previous?.current ?? null,
      }));
      onPresent?.(id);
    }

    async function loaded() {
      // An already loaded image can still be awaiting decode, especially on a cold visit.
      await target.decode?.().catch(() => undefined);
      finish(target.naturalWidth > 0);
    }

    function failedToLoad() {
      finish(false);
    }

    image.addEventListener('load', loaded);
    image.addEventListener('error', failedToLoad);
    if (image.complete) {
      queueMicrotask(() => {
        if (image.naturalWidth) void loaded();
        else failedToLoad();
      });
    }

    // Other scenes are lazy-loaded and may legitimately be off screen for longer.
    const limit = priority ? window.setTimeout(failedToLoad, 12_000) : undefined;
    return () => {
      settled = true;
      window.clearTimeout(limit);
      image.removeEventListener('load', loaded);
      image.removeEventListener('error', failedToLoad);
    };
  }, [attempt, id, onPresent, priority, requestKey, waiting]);

  return (
    <div className="scene-media" data-presented={Boolean(current)}>
      {layers.map((layer) => {
        if (!layer) return null;
        const visible = layer.key === current?.key;
        const pending = !ready && !visible;
        return (
          <div
            key={layer.key}
            className="scene-layer"
            data-media={layer.id}
            data-frame={visible ? 'current' : pending ? 'pending' : 'outgoing'}
            aria-hidden={!visible}
          >
            <Media
              id={layer.id}
              sizes={sizes}
              priority={priority}
              attempt={layer.attempt}
              imageRef={pending && waiting ? pendingImage : undefined}
            />
          </div>
        );
      })}
      {waiting && (priority || current) && (
        <div className="scene-status" role="status">
          <span className="load-track" aria-hidden="true" />
          <span>{current ? '正在加载新画面' : '正在加载产品图'}</span>
        </div>
      )}
      {failed && (
        <div className="scene-status">
          <span role="status">图像暂时无法加载</span>
          <button className="scene-retry" onClick={() => setRetry({ id, attempt: attempt + 1 })}>
            <RotateCcw size={14} aria-hidden="true" />
            重新加载图像
          </button>
        </div>
      )}
    </div>
  );
}
