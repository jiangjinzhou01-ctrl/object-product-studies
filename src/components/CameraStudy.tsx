import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SceneMedia } from './SceneMedia';
import { ImageViewer } from './ImageViewer';
import { mediaUrl } from '../data/media';
import { handleTabKey } from '../lib/tabs';

const scenes = [
  {
    label: '风景',
    media: 'phone-pro-landscape',
    title: '山脊与阴影',
    detail:
      '沿着植被、裸岩和云层的交界细看。山谷的暗部和天空同时出现在这张 48MP Fusion 主摄样张里。',
  },
  {
    label: '夜色',
    media: 'phone-pro-night',
    title: '星空下的剪影',
    detail: '夜间模式样张里，星点的分布与地面的剪影同时可见。放大可以观察天空里的细节。',
  },
  {
    label: '低光',
    media: 'phone-pro-lowlight',
    title: '红与蓝之间',
    detail:
      '灯罩、人物和墙面的色彩来自同一个低光场景。主摄支持四档光圈，可按场景选择进光量与景深。',
  },
] as const;

export default function CameraStudy({ source }: { source: string }) {
  const [scene, setScene] = useState(0);
  const [presented, setPresented] = useState<string>(scenes[0].media);
  const visibleScene = scenes.find((item) => item.media === presented) ?? scenes[0];

  return (
    <section className="camera-section contact-sheet" id="camera">
      <div className="wrap">
        <div className="section-head" data-reveal="heading">
          <div>
            <p className="exhibit-label">Fusion 相机系统</p>
            <h2>光线的三种写法。</h2>
          </div>
          <p>将官方样张放在同一个取景框里，观察细节、阴影与色彩。</p>
        </div>
        <div className="contact-layout">
          <div
            className="contact-panel"
            id="camera-panel"
            role="tabpanel"
            aria-labelledby={'scene-tab-' + scene}
          >
            <div className="camera-scene-image">
              <SceneMedia
                id={scenes[scene].media}
                sizes="(max-width: 760px) 94vw, 68vw"
                onPresent={setPresented}
              />
              <ImageViewer id={visibleScene.media} label={visibleScene.title + ' · Apple 样张'} />
            </div>
            <div className="contact-caption">
              <div key={presented} data-scene-copy>
                <h3>{visibleScene.title}</h3>
                <p>{visibleScene.detail}</p>
              </div>
              <div className="aperture-note">
                <strong>ƒ/1.48–ƒ/4.0</strong>
                <span>主摄四档可变光圈</span>
              </div>
            </div>
          </div>
          <div
            className="contact-tabs"
            role="tablist"
            aria-label="选择影像场景"
            onKeyDown={handleTabKey}
          >
            {scenes.map((item, index) => (
              <button
                key={item.media}
                role="tab"
                id={'scene-tab-' + index}
                aria-controls="camera-panel"
                aria-selected={scene === index}
                tabIndex={scene === index ? 0 : -1}
                onClick={() => setScene(index)}
              >
                <img
                  src={mediaUrl(item.media, 480)}
                  width="150"
                  height="82"
                  alt=""
                  loading="lazy"
                />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="contact-source">
          <p>样张由 Apple 提供。画面效果与拍摄条件有关。</p>
          <a className="text-link light-link" href={source} target="_blank" rel="noreferrer">
            相机技术资料
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
