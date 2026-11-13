import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Media } from './Media';
import { mediaUrl } from '../data/media';
import { handleTabKey } from '../lib/tabs';
const scenes = [
  {
    label: '风景',
    media: 'phone-pro-landscape',
    title: '把辽阔，留进细节。',
    body: 'Apple 公布的 4800 万像素 Fusion 主摄样张。从近处纹理到远方山脊，让目光在画面中慢慢探索。',
    caption: 'iPhone 18 Pro 官方风景样张',
  },
  {
    label: '夜色',
    media: 'phone-pro-night',
    title: '夜深，目光依然清晰。',
    body: 'Apple 公布的夜间模式样张。成像效果受光线、拍摄设置与环境影响，这里展示的是一种记录夜色的视角。',
    caption: 'iPhone 18 Pro 官方夜间模式样张',
  },
  {
    label: '低光',
    media: 'phone-pro-lowlight',
    title: '光少一点，表达不减。',
    body: 'Apple 公布的可变光圈低光样张。主摄提供四档光圈，为进光量与景深增加主动选择的空间。',
    caption: 'iPhone 18 Pro 官方低光样张',
  },
];
export default function CameraStudy({ source }: { source: string }) {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const image = new Image();
    image.src = mediaUrl(scenes[(scene + 1) % scenes.length].media, 1600);
  }, [scene]);
  return (
    <section className="camera-section" id="camera">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow light">Fusion 相机系统</p>
            <h2>
              每一种光，
              <br />
              都有表达。
            </h2>
          </div>
          <div
            className="camera-scene-tabs"
            role="tablist"
            aria-label="选择影像场景"
            onKeyDown={handleTabKey}
          >
            {scenes.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                id={'scene-tab-' + i}
                aria-controls="camera-panel"
                aria-selected={scene === i}
                tabIndex={scene === i ? 0 : -1}
                onClick={() => setScene(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div
          className="camera-browser"
          id="camera-panel"
          role="tabpanel"
          aria-labelledby={'scene-tab-' + scene}
        >
          <div className="camera-scene-image">
            <Media id={scenes[scene].media} key={scene} sizes="(max-width:760px) 100vw, 65vw" />
          </div>
          <div className="camera-scene-copy">
            <span className="overline">48MP FUSION</span>
            <h3>{scenes[scene].title}</h3>
            <p>{scenes[scene].body}</p>
            <div className="aperture-note">
              <strong>ƒ/1.48 — ƒ/4.0</strong>
              <span>主摄四档可变光圈</span>
            </div>
            <a className="text-link light-link" href={source} target="_blank" rel="noreferrer">
              阅读相机技术资料
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <p className="media-caption" aria-live="polite">
          {scenes[scene].caption} · Apple 提供，非本站拍摄或独立测试。
        </p>
      </div>
    </section>
  );
}
