import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink, SectionHead, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import { stories } from '../data/stories';
import { handleTabKey } from '../lib/tabs';
import type { Family } from '../types/product';
function Explorer() {
  const [family, setFamily] = useState<Family>('iphone');
  const [selected, setSelected] = useState('iphone-18-pro');
  const items = products.filter((p) => p.family === family);
  const product = items.find((p) => p.id === selected) ?? items[0];
  return (
    <section className="explore-section wrap" id="explorer">
      <SectionHead number="03" caption="FIND YOUR EVERYDAY" title="你的日常，需要什么？" />
      <div className="explorer">
        <div className="explorer-control">
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
          <div className="model-list" aria-label="选择探索型号">
            {items.map((p, i) => (
              <button
                key={p.id}
                aria-pressed={product.id === p.id}
                onClick={() => setSelected(p.id)}
              >
                <span>0{i + 1}</span>
                <strong>{p.name}</strong>
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
          <p className="small-copy">
            让使用习惯，决定产品的意义。
            <br />
            选一个型号，从细节开始了解。
          </p>
        </div>
        <div
          className={'explorer-preview ' + (product.id === 'iphone-18-pro' ? 'is-dark' : '')}
          role="tabpanel"
          id="explore-panel"
          aria-labelledby={'explore-tab-' + family}
        >
          <Media key={product.id} id={product.heroMedia} sizes="(max-width: 760px) 100vw, 52vw" />
          <div className="explorer-caption">
            <span className="overline">
              {product.chip} / {product.family.toUpperCase()}
            </span>
            <h3>{product.tagline}</h3>
            <ArrowLink to={productPath(product)}>查看产品</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <section className="home-cover">
        <div className="cover-topline">
          <span>AN INDEPENDENT PRODUCT JOURNAL</span>
          <span>VOL. 02 — 2026</span>
        </div>
        <div className="cover-stage">
          <div className="cover-copy">
            <Eyebrow light>OBJECT / PRODUCT STUDIES</Eyebrow>
            <h1>
              与日常，
              <br />
              重新相遇<span>。</span>
            </h1>
            <p>
              一件熟悉的物品，值得一次新的注视。
              <br />
              从设计、影像，到触手可及的每个细节。
            </p>
            <ArrowLink to="/iphone/iphone-18-pro" solid>
              探索 iPhone 18 Pro
            </ArrowLink>
            <span className="cover-study">
              STUDY 01 <span>iPhone 18 Pro 系列</span>
            </span>
          </div>
          <Media
            className="cover-image"
            id="phone-pro-hero"
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
          <Link className="cover-scroll" to="#objects">
            <ArrowDown size={16} />
            向下，发现更多
          </Link>
          <span className="cover-caption">iPhone 18 Pro 与 Pro Max / Apple 产品图</span>
        </div>
      </section>
      <section className="object-index wrap" id="objects">
        <div className="index-label">
          <span className="overline">THE COLLECTION</span>
          <p>值得多看一眼。</p>
        </div>
        <div className="index-items">
          {products
            .filter((p) => ['macbook-pro-m6', 'macbook-air-13-m5', 'iphone-17'].includes(p.id))
            .map((p) => (
              <Link key={p.id} to={productPath(p)}>
                <Media id={p.heroMedia} sizes="180px" />
                <div>
                  <span className="overline">{p.family === 'mac' ? p.chip : 'A19'}</span>
                  <h2>{p.name}</h2>
                  <p>{p.id === 'macbook-pro-m6' ? '为创造，留出空间。' : p.tagline}</p>
                </div>
                <ArrowUpRight size={18} />
              </Link>
            ))}
        </div>
      </section>
      <section className="manifesto wrap">
        <Eyebrow>01 / A CLOSER LOOK</Eyebrow>
        <div>
          <h2>
            设计的意义，
            <br />
            在被使用时发生。
          </h2>
          <p>
            口袋里的镜头，桌面上的工作台。我们关注的不只是一组参数，更是它们如何进入生活，让记录、表达与创造，自然而然。
          </p>
          <ArrowLink to="/about">认识这项研究</ArrowLink>
        </div>
        <span className="manifesto-note">
          FORM. FUNCTION.
          <br />
          EVERYDAY LIFE.
        </span>
      </section>
      <section className="mac-feature">
        <div className="wrap">
          <div className="feature-heading">
            <Eyebrow>02 / MACBOOK PRO WITH M6</Eyebrow>
            <h2>
              想法很大。
              <br />
              <span>空间，刚好。</span>
            </h2>
            <div>
              <p>
                把专注交给创作。
                <br />
                14 英寸 MacBook Pro，为下一次投入准备。
              </p>
              <ArrowLink to="/mac/macbook-pro-m6">探索 MacBook Pro</ArrowLink>
            </div>
          </div>
          <Link
            className="feature-photo"
            to="/mac/macbook-pro-m6"
            aria-label="阅读 MacBook Pro M6 产品故事"
          >
            <Media id="mac-pro-hero" sizes="100vw" />
            <span className="image-link">
              <ArrowUpRight />
            </span>
          </Link>
          <div className="feature-foot">
            <span>MACBOOK PRO / 14-INCH</span>
            <span>精密，服务于自由。</span>
            <span>STUDY 02</span>
          </div>
        </div>
      </section>
      <Explorer />
      <section className="journal-section wrap">
        <SectionHead
          number="04"
          title="设计，值得细读。"
          caption="FIELD NOTES"
          link={{ to: '/journal/the-language-of-material', label: '阅读设计观察' }}
        />
        <div className="journal-grid">
          {stories.map((s, i) => (
            <Link to={'/journal/' + s.slug} className="journal-card" key={s.slug}>
              <div className="journal-image">
                <Media id={s.media} />
                <span className="image-link">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="journal-meta">
                <span>{s.category}</span>
                <span>{s.readTime}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.teaser}</p>
              <span className="journal-number">0{i + 1}</span>
            </Link>
          ))}
        </div>
      </section>
      <CompareEntry />
      <section className="closing-note wrap">
        <span className="brand-mark" />
        <p>看见产品，也看见产品背后的选择。</p>
        <Link to="/credits">
          关于影像与信息
          <ArrowRight size={15} />
        </Link>
      </section>
    </>
  );
}
