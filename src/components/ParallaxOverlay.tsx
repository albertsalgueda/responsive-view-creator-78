
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
  
  // Removed conditional visibility check - text elements will always show
  
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
  
  // Removed conditional return - component will always render
  
  // Calculate horizontal parallax effect based on scroll position
  // Changed all factor values to 1 as requested
  const getParallaxStyle = (factor: number) => {
    // Removed the negative signs to reverse the direction
    const baseDelta = isMobile ? scrollPosition * factor : scrollPosition * factor;
    return {
      transform: `translateX(${-baseDelta}px)`, // Added negative sign here to reverse direction
      color: textColor,
      transition: transition
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Centered container for all parallax words */}
        <div className="relative flex flex-col items-center justify-center gap-4">
          {/* TEN */}
          <div 
            style={getParallaxStyle(1)} // Updated to 1
            className={`font-barlow font-extrabold italic tracking-tighter
                       ${isMobile ? 'text-[36px]' : 'text-[60px]'}`}
          >
            TEN
          </div>
          
          {/* THOUSAND */}
          <div 
            style={getParallaxStyle(1)} // Updated to 1
            className={`font-barlow font-extrabold italic tracking-tighter
                       ${isMobile ? 'text-[36px]' : 'text-[60px]'}`}
          >
            THOUSAND
          </div>
          
          {/* ROBOTS */}
          <div 
            style={getParallaxStyle(1)} // Updated to 1
            className={`font-barlow font-extrabold italic tracking-tighter
                       ${isMobile ? 'text-[36px]' : 'text-[60px]'}`}
          >
            ROBOTS
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
