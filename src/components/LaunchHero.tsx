import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { homeHeroSizes, homeHeroViews } from '../data/homeHero';
import { ImageViewer } from './ImageViewer';
import { SceneMedia } from './SceneMedia';

export default function LaunchHero() {
  const [view, setView] = useState(0);
  const [presented, setPresented] = useState<string>(homeHeroViews[0].id);
  const activeView = homeHeroViews.find((entry) => entry.id === presented) ?? homeHeroViews[0];

  return (
    <section className="launch-hero wrap" aria-labelledby="launch-title">
      <div className="launch-heading">
        <p className="exhibit-label">
          <span aria-hidden="true" />
          产品展览
        </p>
        <h1 id="launch-title">
          iPhone <em>18 Pro.</em>
        </h1>
      </div>
      <div className="launch-display">
        <div className="launch-visual" id="launch-visual">
          <SceneMedia
            id={homeHeroViews[view].id}
            priority
            sizes={homeHeroSizes}
            onPresent={setPresented}
          />
          <ImageViewer id={activeView.id} label={activeView.caption} />
        </div>
        <div className="launch-controls">
          <div className="hero-views" role="group" aria-label="选择首屏产品视角">
            {homeHeroViews.map((entry, index) => (
              <button
                key={entry.id}
                aria-pressed={view === index}
                aria-controls="launch-visual"
                onClick={() => setView(index)}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <Link className="launch-source" to={'/credits#' + activeView.id}>
            {activeView.source}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <p className="launch-credit" aria-live="polite">
          {activeView.caption}
        </p>
      </div>
      <div className="launch-description">
        <p>铝金属一体式机身，三枚 48MP Fusion 镜头。近看它的边缘、光泽与取景方式。</p>
        <div className="launch-actions">
          <Link className="button" to="/iphone/iphone-18-pro">
            探索 iPhone 18 Pro
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link className="launch-scroll text-link" to="#objects" aria-label="向下，发现更多">
            产品索引
            <ArrowDown size={17} aria-hidden="true" />
          </Link>
        </div>
        <dl className="launch-specs">
          <div>
            <dt>主摄</dt>
            <dd>48 MP</dd>
          </div>
          <div>
            <dt>最高刷新率</dt>
            <dd>120 Hz</dd>
          </div>
          <div>
            <dt>芯片</dt>
            <dd>A20 Pro</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
