import { Link } from 'react-router-dom';
import { ArrowUpRight, Smartphone, Laptop, Columns2 } from 'lucide-react';
import { Media } from '../components/Media';
import { ArrowLink, CompareEntry } from '../components/UI';
import { products, productPath } from '../data/products';
import type { Family } from '../types/product';

export default function Collection({ family }: { family: Family }) {
  const items = products.filter((product) => product.family === family);
  const phone = family === 'iphone';

  return (
    <div className="model-collection wrap">
      <nav className="family-jump" id="models" aria-label="系列型号">
        {items.map((product) => (
          <Link key={product.id} to={'#' + product.id}>
            {phone ? <Smartphone aria-hidden="true" /> : <Laptop aria-hidden="true" />}
            {product.name.replace(' with M6', '').replace(' with M5', '')}
          </Link>
        ))}
        <Link to={'/compare?type=' + family}>
          <Columns2 aria-hidden="true" />
          比较机型
        </Link>
      </nav>
      <header className="family-heading">
        <h1>{phone ? 'iPhone' : 'Mac'}</h1>
        <p>{phone ? '探索各款 iPhone。' : '找到适合你的 Mac。'}</p>
      </header>
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
