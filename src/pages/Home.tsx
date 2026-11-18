import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Media } from '../components/Media';
import { ArrowLink, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import { stories } from '../data/stories';
import { handleTabKey } from '../lib/tabs';
import LaunchHero from '../components/LaunchHero';
import { SceneMedia } from '../components/SceneMedia';
import type { Family } from '../types/product';

function Explorer() {
  const [family, setFamily] = useState<Family>('iphone');
  const [selected, setSelected] = useState('iphone-18-pro');
  const items = products.filter((product) => product.family === family);
  const product = items.find((item) => item.id === selected) ?? items[0];

  return (
    <section className="inventory wrap" id="objects">
      <div id="explorer">
        <div className="section-head inventory-heading" data-reveal="heading">
          <h2>型号索引</h2>
          <div
            className="segmented"
            role="tablist"
            aria-label="探索产品类型"
            onKeyDown={handleTabKey}
          >
            {(['iphone', 'mac'] as const).map((category) => (
              <button
                key={category}
                role="tab"
                id={'explore-tab-' + category}
                aria-selected={family === category}
                aria-controls="explore-panel"
                tabIndex={family === category ? 0 : -1}
                onClick={() => setFamily(category)}
              >
                {category === 'iphone' ? 'iPhone' : 'Mac'}
              </button>
            ))}
          </div>
        </div>
        <div className="inventory-layout">
          <div className="inventory-index" role="group" aria-label="选择探索型号">
            {items.map((item) => (
              <button
                key={item.id}
                aria-pressed={product.id === item.id}
                onClick={() => setSelected(item.id)}
              >
                <span>{item.name}</span>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            className="inventory-panel"
            role="tabpanel"
            id="explore-panel"
            aria-labelledby={'explore-tab-' + family}
          >
            <div className="inventory-photo">
              <SceneMedia id={product.heroMedia} sizes="(max-width: 760px) 90vw, 46vw" />
            </div>
            <div className="inventory-caption" key={product.id} data-scene-copy>
              <div>
                <p className="overline">{product.chip}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <ArrowLink to={productPath(product)}>查看产品</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="exhibition">
      <LaunchHero />
      <nav className="exhibition-index wrap" aria-label="首页展览章节">
        <span>继续探索</span>
        <Link to="#mac-studio">
          MacBook Pro <ArrowDown size={15} aria-hidden="true" />
        </Link>
        <Link to="#field-notes">
          iPhone 影像 <ArrowDown size={15} aria-hidden="true" />
        </Link>
        <Link to="#objects">
          型号索引 <ArrowDown size={15} aria-hidden="true" />
        </Link>
      </nav>

      <section className="desk-feature wrap" id="mac-studio">
        <div className="desk-feature-visual">
          <Media id="mac-pro-display" sizes="(max-width: 760px) 100vw, 64vw" reveal="image" />
        </div>
        <div className="desk-feature-content" data-reveal="heading">
          <p className="exhibit-label">MacBook Pro · M6</p>
          <h2>
            把工作台
            <br />
            带在身边。
          </h2>
          <p>在一块 14.2 英寸 Liquid Retina XDR 显示屏上剪辑、调色，也写下下一行代码。</p>
          <ArrowLink to="/mac/macbook-pro-m6#workflow">查看三个工作场景</ArrowLink>
        </div>
      </section>

      <section className="field-feature" id="field-notes">
        <div className="field-heading wrap" data-reveal="heading">
          <div>
            <p className="exhibit-label">iPhone 摄影</p>
            <h2>观察光线。</h2>
          </div>
          <p>从远处的山脊到夜色中的星空。通过官方样张，观察镜头在不同光线下记录的细节。</p>
        </div>
        <div className="field-image">
          <Media id="phone-pro-landscape" sizes="100vw" />
        </div>
        <div className="field-foot wrap">
          <p>Apple 公布的 iPhone 18 Pro 主摄样张</p>
          <ArrowLink to="/iphone/iphone-18-pro#camera">查看相机场景</ArrowLink>
        </div>
      </section>

      <Explorer />

      <section className="reading-section wrap" aria-labelledby="reading-title">
        <div className="section-head" data-reveal="heading">
          <h2 id="reading-title">设计观察</h2>
        </div>
        <div className="reading-list">
          {stories.map((story) => (
            <Link className="reading-link" to={'/journal/' + story.slug} key={story.slug}>
              <Media id={story.media} sizes="(max-width: 760px) 34vw, 240px" />
              <div>
                <span className="overline">{story.readTime}</span>
                <h3>{story.title}</h3>
                <p>{story.teaser}</p>
              </div>
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <CompareEntry />
    </div>
  );
}
