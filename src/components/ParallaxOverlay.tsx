
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const horizontalContainer = document.querySelector('.overflow-x-auto');
    if (horizontalContainer) {
      horizontalContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
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
  
  if (isMobile) {
    return <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden"></div>;
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full">
        <div 
          style={getParallaxStyle(1.1)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[15%] left-[130%]"
        >
          TEN
        </div>
        
        <div 
          style={getParallaxStyle(1.2)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[45%] left-[130%]"
        >
          THOUSAND
        </div>
        
        <div 
          style={getParallaxStyle(0.9)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[75%] left-[130%]"
        >
          ROBOTS
        </div>

        <div 
          style={getParallaxStyle(0.9)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[calc(25%-60px)] left-[280%]"
        >
          WE
        </div>
        
        <div 
          style={getParallaxStyle(1.1)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[50%] left-[310%]"
        >
          BELIEVE
        </div>
        
        <div 
          style={getParallaxStyle(1.2)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[60%] left-[330%]"
        >
          IN
        </div>
        
        <div 
          style={getParallaxStyle(1.2)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[20%] left-[400%]"
        >
          OUR
        </div>
        
        <div 
          style={getParallaxStyle(1.1)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[45%] left-[470%]"
        >
          SERVICES
        </div>
        
        <div 
          style={getParallaxStyle(0.9)}
          className="absolute font-barlow font-bold tracking-tighter text-[18px] top-[65%] left-[480%]"
        >
          ARE
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
