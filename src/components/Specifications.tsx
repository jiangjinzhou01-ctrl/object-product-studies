import type { Product } from '../types/product';
import { ExternalLink } from 'lucide-react';
export default function Specifications({ product }: { product: Product }) {
  return (
    <section id="specifications" className="specifications wrap">
      <div className="spec-intro">
        <span className="mono">TECHNICAL INDEX / {product.index}</span>
        <h2>细节，经得起细看。</h2>
        <p>可核查的硬件资料。每一项参数，都保留来源。</p>
        <span className="caption">核实于 2026.11.09 · 规格可能因市场与配置而异</span>
      </div>
      <dl className="spec-list">
        {product.specifications.map((spec) => {
          const s = product.referenceSources.find((s) => s.id === spec.sourceId);
          return (
            <div key={spec.key}>
              <dt>{spec.label}</dt>
              <dd>
                {spec.value}
                {spec.note && <small>{spec.note}</small>}
                {s && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${spec.label}的 Apple 来源`}
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </dd>
            </div>
          );
        })}
        <div>
          <dt>首发上市</dt>
          <dd>
            {product.releaseDate}
            <a
              href={product.referenceSources.find((s) => s.id === 'launch')?.url}
              target="_blank"
              rel="noreferrer"
              aria-label="上市日期来源"
            >
              <ExternalLink size={13} />
            </a>
          </dd>
        </div>
      </dl>
      <details className="sources-detail">
        <summary>查看官方资料与核实记录</summary>
        {product.referenceSources.map((s) => (
          <p key={s.id}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.title} ↗
            </a>
            <span className="caption">核实日期：{s.verifiedAt}</span>
          </p>
        ))}
      </details>
    </section>
  );
}
