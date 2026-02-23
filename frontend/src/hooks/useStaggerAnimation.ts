import { useEffect, useRef, useState } from "react";

interface UseStaggerAnimationOptions {
  delay?: number;
  duration?: number;
}

export function useStaggerAnimation<T extends HTMLElement>(
  index: number,
  options: UseStaggerAnimationOptions = {},
) {
  const { delay = 100 } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * delay);

    return () => clearTimeout(timer);
  }, [index, delay]);

  return { ref, isVisible };
}
