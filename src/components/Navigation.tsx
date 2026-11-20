import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import SiteSearch from './SiteSearch';
import { siteName } from '../data/site';
const links = [
  ['/iphone', 'iPhone'],
  ['/mac', 'Mac'],
  ['/journal/the-language-of-material', '设计观察'],
  ['/about', '关于项目'],
] as const;
export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    dialog.current?.close();
  }, [location.pathname, location.search]);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const unlock = () => {
      document.body.style.overflow = '';
      trigger.current?.focus();
    };
    d.addEventListener('close', unlock);
    return () => {
      d.removeEventListener('close', unlock);
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        跳至主要内容
      </a>
      <header
        className="site-header"
        data-dark={
          location.pathname === '/' ||
          location.pathname === '/iphone/iphone-18-pro' ||
          location.pathname === '/mac/macbook-pro-m6'
        }
      >
        <div className="header-inner">
          <Link to="/" className="wordmark" aria-label={siteName + ' 首页 · 独立产品研究'}>
            {siteName}
          </Link>
          <nav className="desktop-nav" aria-label="主导航">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/compare">产品比较</NavLink>
          </nav>
          <SiteSearch />
          <button
            ref={trigger}
            className="icon-button menu-trigger"
            aria-label="打开导航"
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = 'hidden';
            }}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-labelledby="menu-title"
        onKeyDown={(e) => {
          if (e.key !== 'Tab') return;
          const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button,a[href]'));
          const first = items[0],
            last = items.at(-1);
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="menu-head">
          <span id="menu-title" className="wordmark">
            {siteName}
            <span>独立产品研究</span>
          </span>
          <button
            className="icon-button"
            aria-label="关闭导航"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="移动导航">
          {[['/', '首页'], ...links, ['/compare', '产品比较']].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => dialog.current?.close()}>
              {label}
              <ChevronRight size={20} />
            </NavLink>
          ))}
        </nav>
        <p className="menu-note">
          独立产品体验概念作品。
          <br />
          Independent design & engineering study.
        </p>
      </dialog>
    </>
  );
}
