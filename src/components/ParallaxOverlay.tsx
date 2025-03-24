
import React, { useEffect, useState } from 'react';
import { useView } from '@/context/ViewContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ParallaxOverlay: React.FC = () => {
  const { currentSection } = useView();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Only show when main1 is visible - no conditional hiding after
  const isVisible = currentSection === 'main1';
  
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
    
    window.addEventListener('scroll', handleScroll);
    
    const horizontalContainer = document.querySelector('.overflow-x-auto');
    if (horizontalContainer) {
      horizontalContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (horizontalContainer) {
        horizontalContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);
  
  if (!mounted) return null;
  
  // If not visible, don't render
  if (!isVisible) return null;
  
  // Calculate horizontal parallax effect based on scroll position
  // Reversed the factors (changed sign) to reverse the direction
  const getParallaxStyle = (factor: number) => {
    const baseDelta = isMobile ? scrollPosition * factor : scrollPosition * factor;
    return {
      transform: `translateX(${baseDelta}px)`,
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* TEN */}
        <div 
          style={getParallaxStyle(0.05)}
          className={`absolute text-brand-blue font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[15%] left-[5%]' : 'text-[24px] top-[15%] left-[10%]'}`}
        >
          TEN
        </div>
        
        {/* THOUSAND */}
        <div 
          style={getParallaxStyle(-0.08)}
          className={`absolute text-brand-blue font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[40%] right-[5%]' : 'text-[24px] top-[40%] right-[10%]'}`}
        >
          THOUSAND
        </div>
        
        {/* ROBOTS */}
        <div 
          style={getParallaxStyle(0.12)}
          className={`absolute text-brand-blue font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] bottom-[15%] left-[5%]' : 'text-[24px] bottom-[15%] left-[10%]'}`}
        >
          ROBOTS
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
