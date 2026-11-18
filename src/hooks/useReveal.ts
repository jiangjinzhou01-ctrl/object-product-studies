import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !('IntersectionObserver' in window)) return;

    const selector = '[data-reveal]:not([data-revealed])';
    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    );

    function observe(element: Element) {
      if (observed.has(element)) return;
      observed.add(element);
      observer.observe(element);
    }

    main.querySelectorAll(selector).forEach(observe);
    // Lazy routes and toggled panels can arrive after the route's first render.
    const mutations = new MutationObserver((changes) => {
      for (const { addedNodes } of changes) {
        for (const node of addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(selector)) observe(node);
          node.querySelectorAll(selector).forEach(observe);
        }
      }
    });
    mutations.observe(main, { subtree: true, childList: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);
}
