import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { homeHeroSizes, homeHeroViews } from '../data/homeHero';
import { SceneMedia } from './SceneMedia';
import { ArrowLink } from './UI';

export default function LaunchHero() {
  const [view, setView] = useState(0);
  const [presented, setPresented] = useState<string | null>(null);
  const caption = homeHeroViews.find((entry) => entry.id === presented)?.caption;

  return (
    <section className="launch-hero">
      <div className="launch-heading">
        <p>设计，触动每一天。</p>
        <h1>
          iPhone <span>18 Pro.</span>
        </h1>
      </div>
      <div className="launch-visual">
        <SceneMedia
          id={homeHeroViews[view].id}
          priority
          sizes={homeHeroSizes}
          onPresent={setPresented}
        />
      </div>
      <div className="launch-bottom">
        <p>
          从精密的轮廓，
          <br />
          到新的看世界方式。
        </p>
        <div className="hero-views" role="group" aria-label="选择首屏产品视角">
          {homeHeroViews.map((entry, index) => (
            <button key={entry.id} aria-pressed={view === index} onClick={() => setView(index)}>
              {entry.label}
            </button>
          ))}
        </div>
        <ArrowLink to="/iphone/iphone-18-pro" solid>
          探索 iPhone 18 Pro
        </ArrowLink>
      </div>
      <Link className="launch-scroll" to="#objects" aria-label="向下，发现更多">
        <ArrowDown size={17} />
      </Link>
      {caption && <p className="launch-credit">{caption}</p>}
    </section>
  );
}
