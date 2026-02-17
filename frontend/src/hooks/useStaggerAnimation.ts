import { useEffect, useRef, useState } from "react";

interface UseStaggerAnimationOptions {
  delay?: number; // Delay between each item in ms
  duration?: number; // Animation duration in ms
  threshold?: number; // Intersection observer threshold
}

export function useStaggerAnimation<T extends HTMLElement>(
  index: number,
  options: UseStaggerAnimationOptions = {},
) {
  const { delay = 100, duration = 500, threshold = 0.1 } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply stagger delay based on index
          setTimeout(() => {
            setIsVisible(true);
          }, index * delay);

          observer.unobserve(element);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [index, delay, threshold]);

  return { ref, isVisible };
}
