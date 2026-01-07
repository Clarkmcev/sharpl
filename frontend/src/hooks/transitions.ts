import { useEffect, useState, useRef } from "react";

interface AnimationOptions {
  delay?: number; // Delay before animation starts (ms)
  duration?: number; // Animation duration (ms)
  threshold?: number; // Intersection observer threshold (0-1)
}

/**
 * Custom hook to animate elements when they render or come into view
 * @param options - Animation configuration options
 * @returns Object with ref to attach to element and style for animation
 */
export function useAnimateOnRender(options: AnimationOptions = {}) {
  const { delay = 0, duration = 500, threshold = 0.1 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  return { ref: elementRef, style: animationStyle, isVisible };
}

/**
 * Hook for staggered animations of multiple elements in a list
 * @param index - Index of the element in the list
 * @param staggerDelay - Delay between each element (ms)
 * @param options - Animation configuration options
 * @returns Object with className string for inline animation
 */
export function useStaggeredAnimation(
  index: number,
  staggerDelay: number = 100,
  options: AnimationOptions = {}
) {
  const delay = (options.delay || 0) + index * staggerDelay;
  return useAnimateOnRender({ ...options, delay });
}

/**
 * Hook for animating list items with CSS classes (no refs needed)
 * Use this when mapping over arrays to animate items one by one
 * @param index - Index of the element in the list
 * @param staggerDelay - Delay between each element (ms)
 * @param duration - Animation duration (ms)
 */
export function useListItemAnimation(
  index: number,
  staggerDelay: number = 100,
  duration: number = 500
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * staggerDelay);

    return () => clearTimeout(timer);
  }, [index, staggerDelay]);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  return { style: animationStyle, isVisible };
}
