
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface ParallaxOptions {
  speed: number;
  reverse?: boolean;
}

export const useProfileParallax = ({ speed, reverse = false }: ParallaxOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!ref.current || speed === 0) return;
    
    const handleScroll = () => {
      if (!ref.current) return;
      
      let scrollPosition = 0;
      
      if (isMobile) {
        scrollPosition = window.scrollY;
      } else {
        const horizontalContainer = document.querySelector('.overflow-x-auto');
        if (horizontalContainer) {
          scrollPosition = horizontalContainer.scrollLeft;
        }
      }
      
      const rect = ref.current.getBoundingClientRect();
      const elementPosition = isMobile ? rect.top : rect.left;
      const viewportSize = isMobile ? window.innerHeight : window.innerWidth;
      
      // Calculate how far the element is from the center of the viewport
      const distanceFromCenter = elementPosition - viewportSize / 2;
      
      // Apply the parallax effect
      const parallaxValue = distanceFromCenter * speed * (reverse ? -0.02 : 0.02);
      setOffset(parallaxValue);
    };
    
    // Initial calculation
    setTimeout(handleScroll, 100);
    
    // Add scroll event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const horizontalContainer = document.querySelector('.overflow-x-auto');
    if (horizontalContainer) {
      horizontalContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (horizontalContainer) {
        horizontalContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [speed, reverse, isMobile]);
  
  return { ref, style: { transform: `translateY(${offset}px)` } };
};
