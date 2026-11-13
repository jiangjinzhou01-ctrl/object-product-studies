import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Media } from '../components/Media';
import { ArrowLink, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import { stories } from '../data/stories';
import { handleTabKey } from '../lib/tabs';
import { mediaUrl } from '../data/media';
import type { Family } from '../types/product';

function Explorer() {
  const [family, setFamily] = useState<Family>('iphone');
  const [selected, setSelected] = useState('iphone-18-pro');
  const items = products.filter((p) => p.family === family);
  const product = items.find((p) => p.id === selected) ?? items[0];
  return (
    <section className="explore-section wrap" id="explorer">
      <div className="section-head">
        <div>
          <p className="eyebrow">找到你的下一件日常</p>
          <h2>从喜欢，到适合。</h2>
        </div>
        <div
          className="segmented"
          role="tablist"
          aria-label="探索产品类型"
          onKeyDown={handleTabKey}
        >
          {(['iphone', 'mac'] as const).map((f) => (
            <button
              key={f}
              role="tab"
              id={'explore-tab-' + f}
              aria-selected={family === f}
              aria-controls="explore-panel"
              tabIndex={family === f ? 0 : -1}
              onClick={() => setFamily(f)}
            >
              {f === 'iphone' ? 'iPhone' : 'Mac'}
            </button>
          ))}
        </div>
      </div>
      <div
        className={'explorer-preview ' + (product.id === 'iphone-18-pro' ? 'is-dark' : '')}
        role="tabpanel"
        id="explore-panel"
        aria-labelledby={'explore-tab-' + family}
      >
        <div className="explorer-caption">
          <p className="eyebrow">{product.chip}</p>
          <h3>{product.name}</h3>
          <p>{product.tagline}</p>
          <ArrowLink to={productPath(product)} solid>
            查看产品
          </ArrowLink>
        </div>
        <Media key={product.id} id={product.heroMedia} sizes="(max-width: 760px) 80vw, 55vw" />
      </div>
      <div className="model-list" aria-label="选择探索型号">
        {items.map((p) => (
          <button key={p.id} aria-pressed={product.id === p.id} onClick={() => setSelected(p.id)}>
            <span className="model-dot" />
            {p.name}
          </button>
        ))}
      </div>
    </section>
  );
}
export default function Home() {
  const [view, setView] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = new Image();
      target.src = mediaUrl(view === 0 ? 'phone-pro-hero' : 'phone-pro-finishes', 1600);
    }, 1200);
    return () => clearTimeout(timer);
  }, [view]);
  return (
    <>
      <section className="launch-hero">
        <div className="launch-heading">
          <p>设计，触动每一天。</p>
          <h1>
            iPhone <span>18 Pro.</span>
          </h1>
        </div>
        <div className={'launch-visual view-' + view}>
          <Media
            id={view === 0 ? 'phone-pro-finishes' : 'phone-pro-hero'}
            priority
            sizes="(max-width:760px) 125vw, 88vw"
            key={view}
          />
        </div>
        <div className="launch-bottom">
          <p>
            从精密的轮廓，
            <br />
            到新的看世界方式。
          </p>
          <div className="hero-views" role="group" aria-label="选择首屏产品视角">
            <button aria-pressed={view === 0} onClick={() => setView(0)}>
              四款配色
            </button>
            <button aria-pressed={view === 1} onClick={() => setView(1)}>
              正面与背面
            </button>
          </div>
          <ArrowLink to="/iphone/iphone-18-pro" solid>
            探索 iPhone 18 Pro
          </ArrowLink>
        </div>
        <Link className="launch-scroll" to="#objects" aria-label="向下，发现更多">
          <ArrowDown size={17} />
        </Link>
        <p className="launch-credit">
          {view === 0 ? 'iPhone 18 Pro 系列官方配色' : 'iPhone 18 Pro 与 Pro Max 官方合照'}
        </p>
      </section>
      <section className="device-directory wrap" id="objects">
        <div>
          <p className="eyebrow">THE OBJECT COLLECTION</p>
          <h2>
            好设计，
            <br />
            就在日常。
          </h2>
        </div>
        <nav aria-label="发现产品">
          {[
            { id: 'iphone-17', title: 'iPhone', detail: '随身的灵感', to: '/iphone' },
            {
              id: 'macbook-pro-m6',
              title: 'MacBook Pro',
              detail: '尽兴去创造',
              to: '/mac/macbook-pro-m6',
            },
            {
              id: 'macbook-air-13-m5',
              title: 'MacBook Air',
              detail: '轻装，展开',
              to: '/mac#macbook-air-13-m5',
            },
          ].map((item) => (
            <Link key={item.id} to={item.to}>
              <Media
                id={products.find((p) => p.id === item.id)!.heroMedia}
                sizes="(max-width:760px) 40vw, 20vw"
              />
              <h3>{item.title}</h3>
              <p>
                {item.detail}
                <ChevronRight size={14} />
              </p>
            </Link>
          ))}
        </nav>
      </section>
      <section className="pro-launch">
        <div className="pro-launch-heading">
          <p className="eyebrow">MacBook Pro · M6</p>
          <h2>
            让想法，
            <br />
            <span>尽兴展开。</span>
          </h2>
          <div className="product-actions">
            <ArrowLink to="/mac/macbook-pro-m6" solid>
              探索 MacBook Pro
            </ArrowLink>
            <ArrowLink to="/compare?type=mac">比较 Mac 机型</ArrowLink>
          </div>
        </div>
        <Media id="mac-pro-hero" sizes="100vw" />
        <div className="pro-launch-notes wrap">
          <span>14.2 英寸 Liquid Retina XDR</span>
          <span>12 核 CPU · 12 核 GPU</span>
          <span>专业，从容随行。</span>
        </div>
      </section>
      <section className="air-launch">
        <div className="air-launch-heading">
          <p className="eyebrow">MacBook Air · M5</p>
          <h2>
            轻装。<span>大展身手。</span>
          </h2>
          <p>13 英寸或 15 英寸。把你的世界，随身展开。</p>
          <ArrowLink to="/mac#macbook-air-13-m5">认识 MacBook Air</ArrowLink>
        </div>
        <Media id="mac-air-hero" sizes="90vw" />
        <div className="air-facts wrap">
          <span>
            <strong>1.23 kg</strong>13 英寸机型重量
          </span>
          <span>
            <strong>11.3 mm</strong>机身厚度
          </span>
          <span>
            <strong>无风扇</strong>安静，也是设计的一部分
          </span>
        </div>
      </section>
      <section className="vision-section">
        <Media id="phone-pro-landscape" sizes="100vw" />
        <div className="vision-copy">
          <p className="eyebrow">iPhone 18 Pro · Fusion 相机系统</p>
          <h2>
            眼前的世界，
            <br />
            值得认真记录。
          </h2>
          <ArrowLink to="/iphone/iphone-18-pro#camera" solid>
            走近影像系统
          </ArrowLink>
        </div>
        <p className="vision-caption">Apple 公布的 iPhone 18 Pro 拍摄样张</p>
      </section>
      <Explorer />
      <section className="journal-section wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">深入一点</p>
            <h2>细节，值得看见。</h2>
          </div>
          <ArrowLink to="/journal/the-language-of-material">阅读设计观察</ArrowLink>
        </div>
        <div className="journal-grid">
          {stories.map((s) => (
            <Link to={'/journal/' + s.slug} className="journal-card" key={s.slug}>
              <div className="journal-image">
                <Media id={s.media} />
                <span className="image-link">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="journal-meta">
                <span>{s.category}</span>
                <span>{s.readTime}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.teaser}</p>
            </Link>
          ))}
        </div>
      </section>
      <CompareEntry />
      <div className="concept-note wrap">
        <span>OBJECT / Product Studies</span>
        <p>独立产品体验研究。非 Apple 官方网站。</p>
        <Link to="/about">
          关于本项目
          <ChevronRight size={13} />
        </Link>
      </div>
    </>
  );
}
