import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [
  ['/iphone', 'iPhone'],
  ['/mac', 'Mac'],
  ['/journal/the-language-of-material', '设计观察'],
  ['/about', '关于 OBJECT'],
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
        className={
          'site-header' +
          (['/', '/iphone/iphone-18-pro', '/mac/macbook-pro-m6'].includes(location.pathname)
            ? ' immersive-header'
            : '')
        }
      >
        <div className="header-inner">
          <Link to="/" className="wordmark" aria-label="OBJECT 首页">
            OBJECT
            <span>PRODUCT STUDIES</span>
          </Link>
          <nav className="desktop-nav" aria-label="主导航">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-compare" to="/compare">
            产品比较
            <ArrowUpRight size={15} />
          </Link>
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
            OBJECT
            <span>PRODUCT STUDIES</span>
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
        <p className="overline">探索 OBJECT</p>
        <nav aria-label="移动导航">
          {[['/', '首页'], ...links, ['/compare', '产品比较']].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => dialog.current?.close()}>
              {label}
              <ArrowUpRight />
            </NavLink>
          ))}
        </nav>
        <p className="menu-note">
          对产品的观察，对日常的好奇。
          <br />
          Independent design & engineering study.
        </p>
      </dialog>
    </>
  );
}
