import type { ReactNode } from 'react';
import { ArrowUpRight, ChevronRight, ArrowRight } from 'lucide-react';
import { Media } from './Media';
import { Link } from 'react-router-dom';
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={'eyebrow' + (light ? ' light' : '')}>{children}</p>;
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
    <Link className={(solid ? 'button' : 'text-link') + ' ' + className} to={to}>
      {children}
      {solid ? <ArrowUpRight size={17} /> : <ChevronRight size={17} />}
    </Link>
  );
}
export function SectionHead({
  title,
  caption,
  link,
}: {
  number?: string;
  title: string;
  caption: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <p className="eyebrow">{caption}</p>
        <h2>{title}</h2>
      </div>
      {link && <ArrowLink to={link.to}>{link.label}</ArrowLink>}
    </div>
  );
}
export function CompareEntry() {
  return (
    <section className="compare-entry wrap">
      <div>
        <p className="eyebrow">找到真正适合你的那一款</p>
        <h2>
          放在一起。
          <br />
          <span>选择，更清楚。</span>
        </h2>
        <p>从屏幕、影像到便携性，看看你在意的不同。</p>
        <Link className="button" to="/compare">
          开始比较
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="compare-visual">
        <Media id="phone-17-detail" />
      </div>
    </section>
  );
}
export function Metric({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
      {note && <small>{note}</small>}
    </div>
  );
}
