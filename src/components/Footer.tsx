import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { disclaimerEn, disclaimerZh } from '../data/site';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Link className="wordmark" to="/">
            OBJECT
            <span className="brand-mark" />
          </Link>
          <p>
            把目光留给设计，
            <br />
            把选择留给日常。
          </p>
          <button
            className="back-top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            回到顶部
            <ArrowUp size={17} />
          </button>
        </div>
        <div className="footer-nav">
          <div>
            <span className="overline">COLLECTION</span>
            <Link to="/iphone">iPhone</Link>
            <Link to="/mac">Mac</Link>
            <Link to="/compare">产品比较</Link>
          </div>
          <div>
            <span className="overline">PROJECT</span>
            <Link to="/about">项目与设计</Link>
            <Link to="/credits">影像与信息来源</Link>
            <a
              href={
                import.meta.env.VITE_SOURCE_REPOSITORY ||
                'https://github.com/jiangjinzhou01-ctrl/object-product-studies'
              }
              target="_blank"
              rel="noreferrer"
            >
              源代码
              <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="footer-statement">
            <span className="overline">AN INDEPENDENT PERSPECTIVE</span>
            <p>{disclaimerZh}</p>
            <p lang="en">{disclaimerEn}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OBJECT — PRODUCT STUDIES</span>
          <span>DESIGNED TO BE EXPLORED.</span>
          <span>EDITION 02</span>
        </div>
      </div>
    </footer>
  );
}
