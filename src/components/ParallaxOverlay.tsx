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
      <div className="relative w-full h-full">
        <div 
          style={getParallaxStyle(1.1)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[10%] left-[25%]' : 'text-[18px] top-[15%] left-[130%]'}`}
        >
          TEN
        </div>
        
        <div 
          style={getParallaxStyle(1.2)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[40%] left-[35%]' : 'text-[18px] top-[45%] left-[130%]'}`}
        >
          THOUSAND
        </div>
        
        <div 
          style={getParallaxStyle(0.9)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[70%] left-[30%]' : 'text-[18px] top-[75%] left-[130%]'}`}
        >
          ROBOTS
        </div>

        <div 
          style={getParallaxStyle(0.9)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[25%] left-[40%]' : 'text-[18px] top-[25%] left-[260%]'}`}
        >
          WE
        </div>
        
        <div 
          style={getParallaxStyle(1.1)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[50%] left-[45%]' : 'text-[18px] top-[50%] left-[290%]'}`}
        >
          BELIEVE
        </div>
        
        <div 
          style={getParallaxStyle(1.2)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[60%] left-[40%]' : 'text-[18px] top-[60%] left-[310%]'}`}
        >
          IN
        </div>
        
        <div 
          style={getParallaxStyle(0.9)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[20%] left-[50%]' : 'text-[18px] top-[20%] left-[420%]'}`}
        >
          OUR
        </div>
        
        <div 
          style={getParallaxStyle(1.1)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[45%] left-[55%]' : 'text-[18px] top-[45%] left-[490%]'}`}
        >
          SERVICES
        </div>
        
        <div 
          style={getParallaxStyle(1.2)}
          className={`absolute font-barlow font-bold tracking-tighter
                     ${isMobile ? 'text-[18px] top-[65%] left-[50%]' : 'text-[18px] top-[65%] left-[500%]'}`}
        >
          ARE
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
