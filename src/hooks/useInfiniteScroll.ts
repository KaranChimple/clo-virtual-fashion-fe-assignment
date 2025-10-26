import { useEffect, useRef } from 'react';

export function useInfiniteScroll(callback: () => void, { enabled = true } = {}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) callback();
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [callback, enabled]);

  return ref;
}
