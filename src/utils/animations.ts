
import { useEffect, useState } from 'react';

export function usePageTransition() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Mount animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    pageTransitionClass: `transition-all duration-450 ease-in-out-expo transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`,
    isVisible
  };
}

export function useSectionTransition(delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return {
    sectionTransitionClass: `section-transition ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`,
    isVisible
  };
}

export function useStaggeredEntrance(items: any[], baseDelay: number = 100) {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    items.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleIndices(prev => [...prev, index]);
      }, baseDelay * (index + 1));
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [items, baseDelay]);
  
  return {
    isItemVisible: (index: number) => visibleIndices.includes(index),
    visibleIndices
  };
}

export function useProgressiveScroll(steps: number, currentStep: number) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    setScrollProgress((currentStep / steps) * 100);
  }, [currentStep, steps]);
  
  return {
    progressStyle: { width: `${scrollProgress}%` },
    scrollProgress
  };
}
