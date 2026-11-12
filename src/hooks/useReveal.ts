import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const motion = getComputedStyle(document.documentElement);
    const duration = parseFloat(motion.getPropertyValue('--slow')) || 650;
    const easing = motion.getPropertyValue('--ease').trim() || 'ease-out';
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.animate(
              [
                { opacity: 0.55, transform: 'translateY(16px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration, easing },
            );
            observer.unobserve(e.target);
          }
      },
      { threshold: 0.15 },
    );
    const register = () =>
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          observer.observe(el);
        }
      });
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.getElementById('main')!, { subtree: true, childList: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);
}
