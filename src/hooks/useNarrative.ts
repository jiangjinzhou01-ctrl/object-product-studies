import { useEffect, useRef, useState } from 'react';
export function useNarrative() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.chapter));
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 },
    );
    container.current?.querySelectorAll('[data-chapter]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return { container, active };
}
