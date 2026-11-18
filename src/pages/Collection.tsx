import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Media } from '../components/Media';
import { ArrowLink, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import type { Family } from '../types/product';

export default function Collection({ family }: { family: Family }) {
  const items = products.filter((product) => product.family === family);
  const phone = family === 'iphone';

  return (
    <div className="model-collection wrap">
      <section className="model-collection-head" data-reveal="heading">
        <div>
          <p className="exhibit-label">产品系列</p>
          <h1>
            {phone ? 'iPhone' : 'Mac'}
            <em>.</em>
          </h1>
        </div>
        <p>
          {phone
            ? '从双摄到三枚 Fusion 镜头，选择适合自己记录方式的 iPhone。'
            : '从无风扇的 MacBook Air 到带 XDR 显示屏的 MacBook Pro，找到与你的工作方式相配的设备。'}
        </p>
      </section>
      <nav className="model-collection-nav" id="models" aria-label="系列型号">
        {items.map((product) => (
          <Link key={product.id} to={'#' + product.id}>
            {product.name}
            <ArrowDown size={15} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <div className="model-rows">
        {items.map((product) => {
          const path = productPath(product);
          const hasStory = !path.includes('#');
          const other = items.find((item) => item.id !== product.id);
          const compare =
            '/compare?type=' + family + '&models=' + [product.id, other?.id].join(',');
          return (
            <section className="model-row" id={product.id} key={product.id}>
              <div className="model-row-visual" data-device={product.id}>
                <Media id={product.heroMedia} sizes="(max-width:760px) 94vw, 54vw" reveal="image" />
              </div>
              <div className="model-row-copy" data-reveal="heading">
                <p className="exhibit-label">{product.chip}</p>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <dl>
                  {product.specifications
                    .filter((spec) => ['display', 'chip', 'weight'].includes(spec.key))
                    .map((spec) => (
                      <div key={spec.key}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                </dl>
                <div className="model-row-actions">
                  {hasStory ? (
                    <ArrowLink to={path} solid className="study-cta">
                      阅读产品故事
                    </ArrowLink>
                  ) : (
                    <a
                      className="text-link"
                      href={product.referenceSources[0].url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      官方技术规格
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  )}
                  <ArrowLink to={compare}>加入比较</ArrowLink>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <CompareEntry />
    </div>
  );
}
