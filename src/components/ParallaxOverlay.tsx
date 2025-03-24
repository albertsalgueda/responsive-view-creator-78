
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
  
  // Calculate horizontal parallax effect based on scroll position
  // Changing the signs to make parallax move in the same direction as scroll
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
      <div className="relative w-full h-full">
        {/* TEN */}
        <div 
          style={getParallaxStyle(1.05)}
          className={`absolute font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[30%] left-[25%]' : 'text-[24px] top-[35%] left-[130%]'}`}
        >
          TEN
        </div>
        
        {/* THOUSAND */}
        <div 
          style={getParallaxStyle(1.1)}
          className={`absolute font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[40%] left-[35%]' : 'text-[24px] top-[45%] left-[130%]'}`}
        >
          THOUSAND
        </div>
        
        {/* ROBOTS */}
        <div 
          style={getParallaxStyle(0.9)}
          className={`absolute font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[50%] left-[30%]' : 'text-[24px] top-[55%] left-[130%]'}`}
        >
          ROBOTS
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
