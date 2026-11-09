import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    const register = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduced) el.classList.add('revealed');
        else observer.observe(el);
      });
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.getElementById('main')!, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);
}
