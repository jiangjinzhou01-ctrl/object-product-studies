import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Media } from '../components/Media';
import { ArrowLink, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import { stories } from '../data/stories';
import { handleTabKey } from '../lib/tabs';
import LaunchHero from '../components/LaunchHero';
import Highlights from '../components/Highlights';
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
          <h2>探索各款机型。</h2>
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
    <div className="product-overview">
      <LaunchHero />
      <Highlights />
      <section className="desk-feature" id="mac-studio">
        <div className="desk-feature-content" data-reveal="heading">
          <h2>MacBook Pro</h2>
          <p>14 英寸，搭载 M6 芯片。</p>
          <Link className="primary-action" to="/mac/macbook-pro-m6">
            探索 MacBook Pro
          </Link>
          <Link className="blue-link" to="/mac/macbook-pro-m6#workflow">
            查看工作流
            <ChevronRight size={16} />
          </Link>
        </div>
        <Media id="mac-pro-hero" sizes="(max-width:734px) 100vw, min(1040px, 85vw)" />
      </section>

      <section className="field-feature" id="field-notes">
        <div className="field-heading wrap" data-reveal="heading">
          <div>
            <p className="exhibit-label">iPhone 18 Pro 摄影</p>
            <h2>镜头里的光。</h2>
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
              <Media id={story.media} sizes="(max-width: 760px) 90vw, 42vw" />
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
