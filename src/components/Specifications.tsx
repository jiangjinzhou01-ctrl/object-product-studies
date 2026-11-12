import { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import type { Product } from '../types/product';
export default function Specifications({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const specs = expanded ? product.specifications : product.specifications.slice(0, 6);
  return (
    <section className="specifications wrap" id="specifications">
      <div className="spec-heading">
        <span className="overline">THE DETAILS / TECHNICAL INDEX</span>
        <h2>细节，都有依据。</h2>
        <p>
          {product.name}
          <br />
          发布于 {product.releaseDate}
        </p>
        <a
          className="text-link"
          href={product.referenceSources[0].url}
          target="_blank"
          rel="noreferrer"
        >
          官方技术规格
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div>
        <dl className="spec-list">
          {specs.map((s) => (
            <div key={s.key}>
              <dt>{s.label}</dt>
              <dd>
                {s.value}
                {s.note && <small>{s.note}</small>}
              </dd>
            </div>
          ))}
        </dl>
        <button
          className="spec-expand"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '收起参数' : '查看全部参数'}
          {expanded ? <Minus size={18} /> : <Plus size={18} />}
        </button>
        <p className="spec-note">
          数据核查：{product.referenceSources[0].verifiedAt} ·
          配置、测试条件与地区差异请以官方资料为准。
        </p>
      </div>
    </section>
  );
}
