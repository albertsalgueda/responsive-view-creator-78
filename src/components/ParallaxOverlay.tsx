
import React, { useEffect, useState } from 'react';
import { useView } from '@/context/ViewContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

const ParallaxOverlay: React.FC = () => {
  const { currentSection } = useView();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { textColor, transition } = useSectionColors();
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (isMobile) {
        setScrollPosition(window.scrollY);
      } else {
        const horizontalContainer = document.querySelector('.overflow-x-auto');
        if (horizontalContainer) {
          setScrollPosition(horizontalContainer.scrollLeft);
        }
      }
    };
    
    // Add event listeners with passive: true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const horizontalContainer = document.querySelector('.overflow-x-auto');
    if (horizontalContainer) {
      horizontalContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (horizontalContainer) {
        horizontalContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);
  
  if (!mounted) return null;
  
  const getParallaxStyle = (factor: number) => {
    const baseDelta = isMobile ? scrollPosition * factor : scrollPosition * factor;
    return {
      transform: `translateX(${-baseDelta}px)`,
      color: textColor,
      transition: transition
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="absolute top-[15vh] w-[300vw] whitespace-nowrap" style={getParallaxStyle(0.2)}>
        <span className="text-[14vw] font-extrabold font-barlow italic tracking-tight pr-8">
          DESIGN STUDIO OF THE FUTURE
        </span>
        <span className="text-[14vw] font-extrabold font-barlow italic tracking-tight">
          DESIGN STUDIO OF THE FUTURE
        </span>
      </div>
      
      <div className="absolute top-[30vh] w-[300vw] whitespace-nowrap" style={getParallaxStyle(0.1)}>
        <span className="text-[14vw] font-extrabold font-barlow italic tracking-tight pr-8">
          AI POWERED EXPERIENCES
        </span>
        <span className="text-[14vw] font-extrabold font-barlow italic tracking-tight">
          AI POWERED EXPERIENCES
        </span>
      </div>
      
      <div className="absolute top-[45vh] w-[300vw] whitespace-nowrap" style={getParallaxStyle(0.3)}>
        <span className="text-[14vw] font-extrabold font-barlow italic tracking-tight pr-8">
          PROMPT HUMAN POTENTIAL
        </span>
        <span className="text-[14vw] font-extrabold font-barlow italic tracking-tight">
          PROMPT HUMAN POTENTIAL
        </span>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
