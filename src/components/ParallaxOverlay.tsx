
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
        // For mobile, track vertical scroll
        setScrollPosition(window.scrollY);
      } else {
        // For desktop, track horizontal scroll
        const horizontalContainer = document.querySelector('.overflow-x-auto');
        if (horizontalContainer) {
          setScrollPosition(horizontalContainer.scrollLeft);
        }
      }
    };
    
    // Add event listeners with passive: true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const horizontalContainer = document.querySelector('.overflow-x-auto');
    if (horizontalContainer && !isMobile) {
      horizontalContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (horizontalContainer && !isMobile) {
        horizontalContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);
  
  if (!mounted) return null;
  
  const getParallaxStyle = (factor: number) => {
    if (isMobile) {
      // Vertical parallax for mobile devices
      const parallaxY = scrollPosition * factor;
      return {
        transform: `translateY(${-parallaxY}px)`,
        color: textColor,
        transition: transition
      };
    } else {
      // Horizontal parallax for desktop
      const parallaxX = scrollPosition * factor;
      return {
        transform: `translateX(${-parallaxX}px)`,
        color: textColor,
        transition: transition
      };
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* First row of parallel text */}
        <div 
          style={getParallaxStyle(0.15)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[15%] left-[5%]' : 'top-[15%] left-[130%]'}`}
        >
          TEN
        </div>
        
        <div 
          style={getParallaxStyle(0.2)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[25%] left-[25%]' : 'top-[45%] left-[130%]'}`}
        >
          THOUSAND
        </div>
        
        <div 
          style={getParallaxStyle(0.1)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[35%] left-[15%]' : 'top-[75%] left-[130%]'}`}
        >
          ROBOTS
        </div>

        {/* Second row of parallel text */}
        <div 
          style={getParallaxStyle(0.12)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[45%] left-[35%]' : 'top-[25%] left-[260%]'}`}
        >
          WE
        </div>
        
        <div 
          style={getParallaxStyle(0.18)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[55%] left-[20%]' : 'top-[50%] left-[290%]'}`}
        >
          BELIEVE
        </div>
        
        <div 
          style={getParallaxStyle(0.22)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[65%] left-[40%]' : 'top-[60%] left-[310%]'}`}
        >
          IN
        </div>
        
        {/* Third row of parallel text */}
        <div 
          style={getParallaxStyle(0.13)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[75%] left-[10%]' : 'top-[20%] left-[420%]'}`}
        >
          OUR
        </div>
        
        <div 
          style={getParallaxStyle(0.19)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[85%] left-[30%]' : 'top-[45%] left-[490%]'}`}
        >
          SERVICES
        </div>
        
        <div 
          style={getParallaxStyle(0.24)}
          className={`absolute font-barlow font-bold tracking-tighter text-[18px]
                     ${isMobile ? 'top-[95%] left-[45%]' : 'top-[65%] left-[500%]'}`}
        >
          ARE
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
