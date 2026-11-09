import type { ReactNode } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? 'is-light' : ''}`}>
      <span className="index-dot" />
      {children}
    </div>
  );
}
export function ArrowLink({
  to,
  children,
  solid = false,
  className = '',
}: {
  to: string;
  children: ReactNode;
  solid?: boolean;
  className?: string;
}) {
  return (
    <Link to={to} className={`${solid ? 'button-solid' : 'arrow-link'} ${className}`}>
      {children}
      {solid ? <ArrowUpRight size={17} /> : <ArrowRight size={18} />}
    </Link>
  );
}
export function SectionHead({
  number,
  title,
  caption,
}: {
  number: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="section-head">
      <span className="mono">{number} /</span>
      <h2>{title}</h2>
      {caption && <p>{caption}</p>}
    </div>
  );
}
export function CompareEntry({ family = 'iphone' }: { family?: 'iphone' | 'mac' }) {
  return (
    <section className="compare-entry wrap">
      <div>
        <Eyebrow>THE RIGHT OBJECT</Eyebrow>
        <h2>
          不同的日常。
          <br />
          找到你的那一款。
        </h2>
        <p>把细节并排，让选择清晰。</p>
      </div>
      <ArrowLink to={`/compare?type=${family}`} solid>
        开始比较
      </ArrowLink>
      <span aria-hidden="true" className="compare-mark">
        ↗
      </span>
    </section>
  );
}
