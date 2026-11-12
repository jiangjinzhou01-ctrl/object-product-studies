import { lazy, Suspense, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';
import Home from '../pages/Home';
const PhoneStory = lazy(() => import('../pages/PhoneStory'));
const MacStory = lazy(() => import('../pages/MacStory'));
const Collection = lazy(() => import('../pages/Collection'));
const Compare = lazy(() => import('../pages/Compare'));
const About = lazy(() => import('../pages/About'));
const Credits = lazy(() => import('../pages/Credits'));
const Article = lazy(() => import('../pages/Article'));
const NotFound = lazy(() => import('../pages/NotFound'));
const titles: Record<string, string> = {
  '/': 'Product Studies',
  '/iphone': 'iPhone Collection',
  '/mac': 'Mac Collection',
  '/iphone/iphone-18-pro': 'iPhone 18 Pro',
  '/mac/macbook-pro-m6': 'MacBook Pro M6',
  '/compare': '产品比较',
  '/about': '项目 Case Study',
  '/credits': '素材与事实来源',
};
function AppContent() {
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const initial = useRef(true);
  useReveal();
  useEffect(() => {
    document.title = `${titles[location.pathname] ?? '设计观察'} — OBJECT`;
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (!initial.current) main.current?.focus({ preventScroll: true });
    }
    initial.current = false;
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!location.hash) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      const node = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (node) {
        node.scrollIntoView({ behavior: 'instant' });
        clearInterval(timer);
      } else if (attempts++ > 25) clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, [location.pathname, location.hash]);
  return (
    <>
      <Navigation />
      <main ref={main} id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="route-loading" role="status">
              正在展开研究…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iphone" element={<Collection family="iphone" />} />
            <Route path="/mac" element={<Collection family="mac" />} />
            <Route path="/iphone/iphone-18-pro" element={<PhoneStory />} />
            <Route path="/mac/macbook-pro-m6" element={<MacStory />} />
            <Route path="/mac/macbook-pro-m5" element={<Navigate to="/mac" replace />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/journal/:slug" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
