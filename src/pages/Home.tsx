import { handleTabKey } from '../lib/tabs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { stories } from '../data/stories';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink, SectionHead, CompareEntry } from '../components/UI';
function Explorer() {
  const [family, setFamily] = useState<'iphone' | 'mac'>('iphone');
  const items = products.filter((p) => p.family === family);
  const [choice, setChoice] = useState('iphone-18-pro');
  const active = items.find((p) => p.id === choice) ?? items[0];
  return (
    <section className="explorer wrap" id="explorer">
      <SectionHead number="03" title="找到与你同频的物件。" caption="A CLOSER LOOK" />
      <div
        className="explorer-tabs"
        role="tablist"
        onKeyDown={handleTabKey}
        aria-label="探索产品类型"
      >
        {(['iphone', 'mac'] as const).map((f) => (
          <button
            role="tab"
            aria-selected={family === f}
            tabIndex={family === f ? 0 : -1}
            aria-controls="explorer-panel"
            id={`explore-${f}`}
            key={f}
            onClick={() => setFamily(f)}
          >
            {f === 'iphone' ? 'iPhone' : 'Mac'}
            <span>
              {products
                .filter((p) => p.family === f)
                .length.toString()
                .padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>
      <div
        className="explorer-panel"
        id="explorer-panel"
        role="tabpanel"
        aria-labelledby={`explore-${family}`}
      >
        <div className="explorer-photo">
          <Media key={active.id} id={active.heroMedia} />
          <span className="mono">FIG. {active.index} / FIELD PHOTOGRAPH</span>
        </div>
        <div className="explorer-detail">
          <div className="model-picker" aria-label="选择型号">
            {items.map((p) => (
              <button key={p.id} aria-pressed={active.id === p.id} onClick={() => setChoice(p.id)}>
                {p.name}
              </button>
            ))}
          </div>
          <div key={active.id} className="explorer-text">
            <span className="mono">OBJECT / {active.index}</span>
            <h3>{active.name}</h3>
            <p>{active.tagline}</p>
            <dl>
              {active.specifications
                .filter((s) => ['chip', 'display', 'weight'].includes(s.key))
                .map((s) => (
                  <div key={s.key}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
            </dl>
            <ArrowLink
              to={
                active.family === 'iphone' && active.id === 'iphone-18-pro'
                  ? '/iphone/iphone-18-pro'
                  : active.id === 'macbook-pro-m5'
                    ? '/mac/macbook-pro-m5'
                    : `/${family}#${active.id}`
              }
              solid
            >
              深入了解
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <section className="home-hero wrap">
        <div className="hero-topline">
          <Eyebrow>OBJECT / PRODUCT STUDIES</Eyebrow>
          <span className="mono">DESIGN IN EVERYDAY LIFE — VOL. 01</span>
        </div>
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <span className="mono hero-index">01 — AN INDEPENDENT PERSPECTIVE</span>
            <h1>
              Consider
              <br />
              the object<span>.</span>
            </h1>
            <p className="hero-statement">
              不止于科技。
              <br />
              更关于，我们如何感受日常。
            </p>
            <ArrowLink to="/iphone/iphone-18-pro" solid>
              探索 iPhone 18 Pro
            </ArrowLink>
            <div className="hero-small-note">
              <span className="small-rule" />
              对精密的观察。对设计的好奇。
              <br />
              一个独立的产品体验研究。
            </div>
          </div>
          <div className="home-hero-art">
            <div className="hero-photo-frame">
              <Media id="iphone-18-pro-black" priority sizes="(max-width: 700px) 100vw, 56vw" />
              <span className="photo-corner top-left" />
              <span className="photo-corner bottom-right" />
              <span className="hero-vertical mono">MATERIAL / FORM / EXPERIENCE</span>
              <Link className="hero-art-index" to="/iphone/iphone-18-pro">
                <span>STUDY 01</span>
                <strong>iPhone 18 Pro</strong>
                <ArrowUpRight size={22} />
              </Link>
            </div>
            <div className="hero-image-caption">
              <span>实物里的细节，值得被放大。</span>
              <Link to="/credits#iphone-18-pro-black">Farragutful / CC BY-SA 4.0 ↗</Link>
            </div>
          </div>
        </div>
        <div className="home-hero-bottom">
          <Link to="#selected">
            <ArrowDown size={15} />
            向下，发现更多
          </Link>
          <span className="mono">INDEPENDENT CONCEPT · NOT AFFILIATED WITH APPLE</span>
          <span className="mono">01 — 04</span>
        </div>
      </section>
      <section id="selected" className="selected-section wrap">
        <SectionHead number="01" title="被设计，亦被感知。" caption="SELECTED OBJECTS" />
        <div className="selected-mac">
          <div className="selected-mac-info" data-reveal>
            <Eyebrow>STUDY 02 / MACBOOK PRO</Eyebrow>
            <h2>
              为想法，
              <br />
              留出更大空间。
            </h2>
            <p>
              14 英寸 MacBook Pro · M5
              <br />
              从一块屏幕，到一整个工作流。
            </p>
            <ArrowLink to="/mac/macbook-pro-m5">阅读产品故事</ArrowLink>
            <span className="mono selected-no">02</span>
          </div>
          <Link
            to="/mac/macbook-pro-m5"
            className="selected-mac-image"
            aria-label="探索 MacBook Pro M5"
          >
            <Media id="mac-pro-14-m5" />
            <span className="image-overlay-label">
              MACBOOK PRO / 14″ / M5 <ArrowUpRight size={20} />
            </span>
          </Link>
        </div>
        <div className="selected-bottom">
          <Link to="/mac#macbook-air-15-m4" className="selected-air">
            <Media id="mac-air-15-m4" />
            <div>
              <span className="mono">STUDY 03 / MACBOOK AIR</span>
              <h3>轻装，亦有余地。</h3>
              <p>15 英寸 · M4</p>
            </div>
            <ArrowUpRight size={24} />
          </Link>
          <Link to="/iphone#iphone-17" className="selected-phone">
            <Media id="iphone-17-lavender" />
            <div>
              <span className="mono">STUDY 04 / IPHONE 17</span>
              <h3>生活的另一种底色。</h3>
              <p>Lavender / 薰衣草紫</p>
            </div>
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
      <section className="philosophy dark">
        <div className="wrap">
          <div className="philosophy-top">
            <Eyebrow light>02 / THE OBJECT PHILOSOPHY</Eyebrow>
            <span className="mono">TECHNOLOGY, WITH A HUMAN PERSPECTIVE.</span>
          </div>
          <h2 data-reveal>
            好的科技，
            <br />
            让复杂退后。
            <br />
            <span>让生活向前。</span>
          </h2>
          <div className="philosophy-bottom">
            <span className="philosophy-symbol" aria-hidden="true">
              ↗
            </span>
            <p>
              我们关心的，不只是下一代芯片。
              <br />
              是材质与触感，功能与直觉，
              <br />
              是一件物品如何安静地融入日常。
            </p>
            <ArrowLink to="/about">关于 OBJECT</ArrowLink>
          </div>
        </div>
      </section>
      <Explorer />
      <section className="stories-section wrap">
        <SectionHead number="04" title="从细节，读懂设计。" caption="NOTES & OBSERVATIONS" />
        <div className="story-grid">
          {stories.map((s) => (
            <Link key={s.slug} to={`/journal/${s.slug}`} className="story-link">
              <div className="story-image">
                <Media id={s.media} />
                <span className="story-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
              <div className="story-meta mono">
                <span>{s.category}</span>
                <span>{s.readTime}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.teaser}</p>
              <span className="story-read">
                阅读观察 <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CompareEntry />
      <section className="project-note wrap">
        <span className="mono">A NOTE ON THIS PROJECT</span>
        <p>
          真实产品。开放摄影。独立观点。
          <br />
          OBJECT 是一份设计与前端工程作品集，
          <br />
          也是一次对日常物品的认真观察。
        </p>
        <Link to="/credits">
          查看素材与事实来源 <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
