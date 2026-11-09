import { useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [
  ['/iphone', 'iPhone'],
  ['/mac', 'Mac'],
  ['/compare', '比较'],
  ['/about', '关于研究'],
] as const;
export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const close = () => {
    dialog.current?.close();
  };
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
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" to="/" aria-label="OBJECT 首页">
            OBJECT
            <span className="brand-square" />
          </Link>
          <span className="header-caption">
            PRODUCT STUDIES
            <br />
            <span>独立产品体验研究</span>
          </span>
          <nav className="desktop-nav" aria-label="主导航">
            {links.map(([path, label]) => (
              <NavLink key={path} to={path}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="edition" to="/about">
            VOL. 01 <ArrowUpRight size={13} />
          </Link>
          <button
            className="icon-button menu-trigger"
            ref={trigger}
            aria-label="打开导航"
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = 'hidden';
            }}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-labelledby="menu-title"
        onKeyDown={(e) => {
          if (e.key !== 'Tab') return;
          const items = Array.from(
            e.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'),
          );
          const first = items[0],
            last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="menu-head">
          <span id="menu-title" className="wordmark">
            OBJECT
            <span className="brand-square" />
          </span>
          <button className="icon-button" onClick={close} aria-label="关闭导航" autoFocus>
            <X />
          </button>
        </div>
        <span className="mono menu-label">EXPLORE THE COLLECTION</span>
        <nav aria-label="移动导航">
          <NavLink to="/" onClick={close}>
            <span>00</span>首页
            <ArrowUpRight />
          </NavLink>
          {links.map(([path, label], i) => (
            <NavLink key={path} to={path} onClick={close}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </NavLink>
          ))}
        </nav>
        <p className="menu-disclaimer">
          独立产品体验概念作品
          <br />
          Not affiliated with Apple Inc.
        </p>
      </dialog>
    </>
  );
}
