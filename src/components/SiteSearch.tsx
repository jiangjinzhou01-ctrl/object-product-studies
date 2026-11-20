import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { products, productPath } from '../data/products';
import { stories } from '../data/stories';

const entries = [
  ...products.map((p) => ({
    title: p.name,
    terms: p.chip + ' ' + p.description,
    to: productPath(p),
  })),
  { title: '比较机型', terms: 'iPhone Mac 产品比较 硬件规格', to: '/compare' },
  ...stories.map((s) => ({ title: s.title, terms: s.teaser, to: '/journal/' + s.slug })),
];
export default function SiteSearch() {
  const modal = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState('');
  const location = useLocation();
  useEffect(() => {
    modal.current?.close();
  }, [location.pathname, location.hash]);
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = terms.length
    ? entries.filter((item) =>
        terms.every((term) => (item.title + ' ' + item.terms).toLocaleLowerCase().includes(term)),
      )
    : entries.slice(0, 4);
  return (
    <>
      <button
        type="button"
        ref={trigger}
        className="search-trigger"
        aria-label="搜索本站"
        aria-haspopup="dialog"
        onClick={() => {
          setQuery('');
          modal.current?.showModal();
          input.current?.focus();
        }}
      >
        <Search size={17} />
      </button>
      <dialog
        className="site-search"
        ref={modal}
        aria-labelledby="search-title"
        onClose={() => trigger.current?.focus({ preventScroll: true })}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.currentTarget.close();
          }
        }}
        onClick={(event) => {
          if (event.target === modal.current) modal.current?.close();
        }}
      >
        <div className="search-content">
          <div className="search-head">
            <h2 id="search-title">搜索本站</h2>
            <button
              aria-label="关闭搜索"
              className="icon-button"
              onClick={() => modal.current?.close()}
            >
              <X size={20} />
            </button>
          </div>
          <label className="search-input">
            <Search aria-hidden="true" />
            <input
              ref={input}
              type="search"
              aria-label="搜索产品或专题"
              placeholder="搜索产品或专题"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p aria-live="polite">
            {terms.length
              ? matches.length
                ? '找到 ' + matches.length + ' 个结果'
                : '没有找到相关结果'
              : '快速链接'}
          </p>
          <ul>
            {matches.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={() => modal.current?.close()}>
                  {item.title}
                  <ChevronRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
