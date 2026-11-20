import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { highlights } from '../data/homeHero';
import { SceneMedia } from './SceneMedia';
import { ImageViewer } from './ImageViewer';
import { handleTabKey } from '../lib/tabs';

export default function Highlights() {
  const [index, setIndex] = useState(0);
  const [presented, setPresented] = useState<string>(highlights[0].id);
  const start = useRef<{ x: number; y: number } | null>(null);
  const selected = highlights[index];
  const visible = highlights.find((item) => item.id === presented) ?? highlights[0];
  function move(direction: number) {
    setIndex((current) => (current + direction + highlights.length) % highlights.length);
  }
  return (
    <section className="highlights" id="highlights" aria-labelledby="highlights-title">
      <div className="wrap">
        <div className="highlights-heading">
          <h2 id="highlights-title">看看亮点。</h2>
          <Link className="blue-link" to="#objects" aria-label="向下，发现更多">
            探索其他型号 <ChevronRight size={16} />
          </Link>
        </div>
        <div
          className="highlight-tabs"
          role="tablist"
          aria-label="产品亮点"
          onKeyDown={handleTabKey}
        >
          {highlights.map((item, i) => (
            <button
              type="button"
              role="tab"
              key={item.id}
              id={'highlight-tab-' + i}
              aria-selected={index === i}
              aria-controls="highlight-panel"
              tabIndex={index === i ? 0 : -1}
              onClick={() => setIndex(i)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id="highlight-panel"
          role="tabpanel"
          aria-labelledby={'highlight-tab-' + index}
          className="highlight-panel"
          onTouchStart={(event) => {
            const finger = event.touches[0];
            start.current = { x: finger.clientX, y: finger.clientY };
          }}
          onTouchCancel={() => {
            start.current = null;
          }}
          onTouchEnd={(event) => {
            const origin = start.current;
            start.current = null;
            if (!origin) return;
            const dx = event.changedTouches[0].clientX - origin.x;
            const dy = event.changedTouches[0].clientY - origin.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
          }}
        >
          <SceneMedia
            id={selected.id}
            sources={selected.sources}
            sizes="87.5vw"
            onPresent={setPresented}
          />
          <div className="highlight-copy" key={visible.id} data-scene-copy>
            <h3>{visible.title}</h3>
            <p>{visible.detail}</p>
            <Link className="blue-link" to={visible.to}>
              {visible.action}
              <ChevronRight size={16} />
            </Link>
          </div>
          <ImageViewer id={visible.id} label={visible.title} />
        </div>
        <div className="highlight-controls">
          <span aria-live="polite">
            {index + 1} / {highlights.length}
          </span>
          <button type="button" aria-label="上一个亮点" onClick={() => move(-1)}>
            <ChevronLeft />
          </button>
          <button type="button" aria-label="下一个亮点" onClick={() => move(1)}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
