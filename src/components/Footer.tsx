import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { disclaimerEn, disclaimerZh } from '../data/site';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Link className="wordmark" to="/">
            OBJECT<span>PRODUCT STUDIES</span>
          </Link>
          <p>设计，触动每一天。</p>
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
            <ArrowUp size={16} />
          </button>
        </div>
        <div className="footer-nav">
          <div>
            <span className="overline">探索产品</span>
            <Link to="/iphone">iPhone</Link>
            <Link to="/mac">Mac</Link>
            <Link to="/compare">产品比较</Link>
          </div>
          <div>
            <span className="overline">关于项目</span>
            <Link to="/about">设计与工程</Link>
            <Link to="/credits">影像与资料来源</Link>
            <a
              href={
                import.meta.env.VITE_SOURCE_REPOSITORY ||
                'https://github.com/jiangjinzhou01-ctrl/object-product-studies'
              }
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="footer-statement">
            <p>{disclaimerZh}</p>
            <p lang="en">{disclaimerEn}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OBJECT. Independent product studies.</span>
          <Link to="/credits">第三方商标与图像归各自权利人所有。</Link>
        </div>
      </div>
    </footer>
  );
}
