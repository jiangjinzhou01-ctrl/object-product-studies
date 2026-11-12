import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import type { Family } from '../types/product';
export default function Collection({ family }: { family: Family }) {
  const items = products.filter((p) => p.family === family),
    phone = family === 'iphone';
  return (
    <>
      <section
        className={'collection-intro wrap ' + (phone ? 'phone-collection' : 'mac-collection')}
      >
        <div className="collection-title">
          <Eyebrow>{phone ? 'IPHONE' : 'MAC'} / THE COLLECTION</Eyebrow>
          <h1>
            {phone ? (
              <>
                口袋里的，
                <br />
                <em>无限可能。</em>
              </>
            ) : (
              <>
                你的下一张，
                <br />
                <em>创作桌面。</em>
              </>
            )}
          </h1>
          <p>
            {phone
              ? '以熟悉的手感，记录全新的世界。两种选择，各有自己的日常。'
              : '从随身出发，到专注创造。找到与你工作方式同频的那一台。'}
          </p>
          <Link className="text-link" to="#models">
            发现各个型号
            <ArrowDown size={17} />
          </Link>
        </div>
        <div className="collection-hero-photo">
          <Media
            id={phone ? 'phone-17-hero' : 'mac-air-hero'}
            priority
            sizes="(max-width:760px) 100vw, 55vw"
          />
          <span className="overline">{phone ? 'IPHONE 17 / LAVENDER' : 'MACBOOK AIR / M5'}</span>
        </div>
      </section>
      <div className="collection-model-nav wrap" id="models">
        <span className="overline">EXPLORE THE LINEUP</span>
        <nav aria-label="系列型号">
          {items.map((p) => (
            <Link key={p.id} to={'#' + p.id}>
              {p.name}
              <ArrowDown size={12} />
            </Link>
          ))}
        </nav>
      </div>
      <div className="collection-studies">
        {items.map((p, i) => (
          <section
            id={p.id}
            key={p.id}
            className={'collection-study ' + (p.id === 'iphone-18-pro' ? 'dark-study' : '')}
          >
            <div className="wrap collection-study-grid">
              <div className="collection-study-photo">
                <Media id={p.heroMedia} sizes="(max-width:760px) 100vw, 55vw" />
              </div>
              <div className="collection-study-copy">
                <span className="overline">
                  0{i + 1} / {p.chip.toUpperCase()}
                </span>
                <h2>{p.name}</h2>
                <h3>{p.tagline}</h3>
                <p>{p.description}</p>
                <dl>
                  {p.specifications
                    .filter((s) => ['display', 'chip', 'weight'].includes(s.key))
                    .map((s) => (
                      <div key={s.key}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                </dl>
                <div className="collection-links">
                  {['iphone-18-pro', 'macbook-pro-m6'].includes(p.id) ? (
                    <ArrowLink to={productPath(p)} solid>
                      阅读产品故事
                    </ArrowLink>
                  ) : (
                    <a
                      className="button"
                      href={p.referenceSources[0].url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      了解官方规格
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  <ArrowLink
                    to={
                      '/compare?type=' +
                      family +
                      '&models=' +
                      p.id +
                      ',' +
                      items.find((a) => a.id !== p.id)!.id
                    }
                  >
                    加入比较
                  </ArrowLink>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="selection-guide wrap">
        <Eyebrow>CHOOSE WITH INTENTION</Eyebrow>
        <div>
          <h2>{phone ? '你想怎样，记录生活？' : '你习惯在哪里，开始工作？'}</h2>
          <div className="selection-columns">
            {(phone
              ? [
                  [
                    '更主动的创作',
                    'iPhone 18 Pro 的可变光圈与三枚 Fusion 相机，为重视影像控制的人提供更多选择。',
                  ],
                  [
                    '更轻盈的日常',
                    'iPhone 17 以 177g 机身、双 Fusion 相机和 ProMotion，在便携与日常体验间找到平衡。',
                  ],
                ]
              : [
                  [
                    '移动，是日常的一部分',
                    'MacBook Air 的无风扇设计、13 与 15 英寸两种尺寸，适合在不同地点展开工作。',
                  ],
                  [
                    '专注，需要完整的工作台',
                    'MacBook Pro 配备 Liquid Retina XDR 显示屏、HDMI 与 SDXC，适合依赖专业屏幕与连接的工作流。',
                  ],
                ]
            ).map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CompareEntry />
    </>
  );
}
