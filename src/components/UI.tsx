import type { ReactNode } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={'eyebrow' + (light ? ' light' : '')}>
      <span aria-hidden="true" />
      {children}
    </p>
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
    <Link className={(solid ? 'button' : 'text-link') + ' ' + className} to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionHead({
  number,
  title,
  caption,
  link,
}: {
  number: string;
  title: string;
  caption: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <span className="overline">
          {number} / {caption}
        </span>
        <h2>{title}</h2>
      </div>
      {link && <ArrowLink to={link.to}>{link.label}</ArrowLink>}
    </div>
  );
}
export function CompareEntry() {
  return (
    <section className="compare-entry wrap">
      <span className="overline">A LITTLE PERSPECTIVE</span>
      <div>
        <h2>
          适合你的，
          <br />
          <span>才是刚刚好。</span>
        </h2>
        <p>
          从屏幕到重量，从影像到连接。
          <br />
          放在一起，找到日常真正需要的不同。
        </p>
        <Link className="button" to="/compare">
          开始比较
          <ArrowRight size={18} />
        </Link>
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
