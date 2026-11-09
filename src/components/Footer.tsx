import { sourceRepository } from '../data/site';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <Link to="/" className="footer-logo">
          OBJECT<span>/01</span>
        </Link>
        <p>
          Objects of everyday.
          <br />
          Ideas beyond the ordinary.
        </p>
        <div className="footer-links">
          <Link to="/about">
            项目 Case Study <ArrowUpRight size={14} />
          </Link>
          <Link to="/credits">
            素材与事实来源 <ArrowUpRight size={14} />
          </Link>
          {sourceRepository ? (
            <a href={sourceRepository} target="_blank" rel="noreferrer">
              GitHub 源代码 <ArrowUpRight size={14} />
            </a>
          ) : (
            <Link to="/about#engineering">
              工程与交互说明 <ArrowUpRight size={14} />
            </Link>
          )}
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            回到顶部 ↑
          </button>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <div>
          <p>
            Independent product experience concept. Unofficial design and engineering portfolio
            project. Not affiliated with or endorsed by Apple Inc.
          </p>
          <p>
            独立产品体验概念作品，仅用于个人设计与工程作品集展示，与 Apple Inc.
            无隶属、赞助或认可关系。
          </p>
        </div>
        <span className="mono">
          © 2026 OBJECT
          <br />
          DESIGNED TO BE EXPLORED.
        </span>
      </div>
    </footer>
  );
}
