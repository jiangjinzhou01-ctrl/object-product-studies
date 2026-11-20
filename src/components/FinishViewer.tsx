import { useEffect, useState } from 'react';
import { SceneMedia } from './SceneMedia';
import { ImageViewer } from './ImageViewer';
import { phones } from '../data/phones';
import { mediaUrl } from '../data/media';

const finishes = phones[0].availableFinishes.flatMap((finish) =>
  finish.mediaId
    ? [
        {
          ...finish,
          id: finish.mediaId,
          sources: [{ media: '(max-width: 734px)', id: finish.mediaId + '-portrait' }],
        },
      ]
    : [],
);

export default function FinishViewer() {
  const [selected, setSelected] = useState(0);
  const [presented, setPresented] = useState(finishes[0].id);
  const finish = finishes[selected];
  const visible = finishes.find((item) => item.id === presented) ?? finishes[0];
  useEffect(() => {
    const next = finishes[(selected + 1) % finishes.length];
    const narrow = matchMedia(next.sources[0].media).matches;
    const image = new Image();
    image.fetchPriority = 'low';
    image.src = mediaUrl(narrow ? next.sources[0].id : next.id, innerWidth * devicePixelRatio);
  }, [selected]);
  return (
    <section className="finish-stage" id="finishes" aria-labelledby="finish-title">
      <div className="finish-art">
        <SceneMedia
          id={finish.id}
          sources={finish.sources}
          priority
          sizes="100vw"
          onPresent={setPresented}
        />
      </div>
      <div className="finish-content">
        <h1 id="finish-title">iPhone 18 Pro</h1>
        <p className="finish-heading">近看机身。</p>
        <p className="finish-detail">
          铝金属一体成型设计，
          <br />
          四种外观。
        </p>
        <fieldset className="finish-choices">
          <legend>选择机身颜色</legend>
          <div>
            {finishes.map((item, i) => (
              <label key={item.id} title={item.label}>
                <input
                  type="radio"
                  name="finish"
                  aria-label={item.label}
                  checked={i === selected}
                  onChange={() => setSelected(i)}
                />
                <span aria-hidden="true" style={{ backgroundColor: item.hex }} />
              </label>
            ))}
          </div>
        </fieldset>
        <p className="finish-caption" aria-live="polite">
          {visible.label}
        </p>
      </div>
      <ImageViewer id={visible.id} label={visible.label + ' iPhone 18 Pro'} />
    </section>
  );
}
