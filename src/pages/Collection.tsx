import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import { Eyebrow, CompareEntry, ArrowLink } from '../components/UI';
import { Media } from '../components/Media';
import type { Family } from '../types/product';
export default function Collection({ family }: { family: Family }) {
  const isPhone = family === 'iphone';
  const items = products.filter((p) => p.family === family);
  return (
    <>
      <section className={`collection-intro wrap ${!isPhone ? 'mac-collection-intro' : ''}`}>
        <div className="collection-kicker">
          <Eyebrow>THE {isPhone ? 'IPHONE' : 'MAC'} COLLECTION</Eyebrow>
          <span className="mono">
            {items.length.toString().padStart(2, '0')} OBJECTS / ONE PERSPECTIVE
          </span>
        </div>
        <div className="collection-heading">
          <h1>
            {isPhone ? (
              <>
                随身。
                <br />
                随心。
              </>
            ) : (
              <>
                想法，
                <br />
                自有空间。
              </>
            )}
          </h1>
          <div>
            <p>
              {isPhone ? '一件物品，无数种日常。' : '从随行笔记，到专注创作。'}
              <br />
              {isPhone
                ? '从影像、材质到性能，观察不同 iPhone 的表达。'
                : '以真实的屏幕、配置与连接，理解不同 Mac 的选择。'}
            </p>
            <nav className="collection-model-nav" aria-label="型号导航">
              {items.map((p) => (
                <Link key={p.id} to={`#${p.id}`}>
                  {p.name}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <div className="collection-products">
        {items.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            className={`collection-product ${i % 2 ? 'alternate' : ''}`}
          >
            <div className="wrap collection-product-grid">
              <div className="collection-photo">
                <Media id={p.heroMedia} priority={i === 0} credit />
                <span className="object-figure mono">
                  FIG. {p.index} / {p.releaseDate.slice(0, 4)}
                </span>
              </div>
              <div className="collection-product-info">
                <Eyebrow>OBJECT STUDY {p.index}</Eyebrow>
                <h2>{p.name}</h2>
                <h3>{p.tagline}</h3>
                <p>{p.description}</p>
                <dl className="collection-key-specs">
                  {p.specifications
                    .filter((s) =>
                      [
                        isPhone ? 'camera' : 'display',
                        'chip',
                        isPhone ? 'refresh' : 'weight',
                      ].includes(s.key),
                    )
                    .map((s) => (
                      <div key={s.key}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                </dl>
                <div className="collection-finishes">
                  <span className="caption">官方外观</span>
                  <div>
                    {p.availableFinishes.map((f) => (
                      <span
                        key={f.name}
                        className="color-dot"
                        style={{ background: f.hex }}
                        title={f.name}
                      >
                        <span className="sr-only">{f.name}</span>
                      </span>
                    ))}
                  </div>
                  <span className="caption">
                    {p.availableFinishes.map((f) => f.name).join(' / ')}
                  </span>
                </div>
                <div className="collection-actions">
                  {i === 0 ? (
                    <ArrowLink to={isPhone ? '/iphone/iphone-18-pro' : '/mac/macbook-pro-m5'} solid>
                      探索产品故事
                    </ArrowLink>
                  ) : (
                    <ArrowLink to={`/compare?type=${family}&models=${items[0].id},${p.id}`} solid>
                      查看规格比较
                    </ArrowLink>
                  )}
                  <a
                    className="text-link"
                    href={p.referenceSources[0].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    官方技术资料 ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="collection-context wrap">
        <Eyebrow>{isPhone ? 'THE DIFFERENCE IS IN THE DETAIL' : 'PRO OR AIR'}</Eyebrow>
        <h2>{isPhone ? '同样的视野，不同的表达。' : '工作方式，比标签更重要。'}</h2>
        <div className="context-columns">
          <div>
            <span className="mono">01 / {isPhone ? 'CAMERA' : 'WORKFLOW'}</span>
            <h3>{isPhone ? '从双镜头到三镜头' : '轻装出行 / 深度创作'}</h3>
            <p>
              {isPhone
                ? 'iPhone 17 配备 48MP 双 Fusion 相机；iPhone 18 Pro 的三镜头系统加入可变光圈主摄与独立长焦。依据拍摄需求理解差异。'
                : 'Air 适合重视轻便与大屏的日常安排；Pro 提供 Liquid Retina XDR、更多接口与主动散热设计。具体表现应以软件与工作负载为前提。'}
            </p>
          </div>
          <div>
            <span className="mono">02 / DISPLAY</span>
            <h3>{isPhone ? '流畅，是共同的起点' : '尺寸之外，还有显示技术'}</h3>
            <p>
              {isPhone
                ? '两款均配备 6.3 英寸 OLED 与最高 120Hz ProMotion。升级不一定发生在每一项参数上；相同点也值得清楚呈现。'
                : '15.3 英寸 Air 提供更大的桌面视野；14.2 英寸 Pro 则有 XDR 与 ProMotion。屏幕大小与显示能力，是两个独立的选择维度。'}
            </p>
          </div>
        </div>
        {!isPhone && (
          <p className="research-note">
            素材选择说明：本期以有可核验授权实拍的 MacBook Pro M5、MacBook Air M4 为研究对象。
            <Link to="/credits">阅读完整记录 ↗</Link>
          </p>
        )}
      </section>
      <CompareEntry family={family} />
    </>
  );
}
