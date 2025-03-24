
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
  const getParallaxStyle = (factor: number) => {
    const baseDelta = isMobile ? scrollPosition * factor : scrollPosition * factor;
    return {
      transform: `translateX(${-baseDelta}px)`,
      color: textColor,
      transition: transition
    };
  };
  
  // Only render the overlay when we're in the main1 section
  if (currentSection !== 'main1') {
    return null;
  }
  
  // Get font size based on section
  const getFontSize = () => {
    return isMobile ? 'text-[48px]' : 'text-[80px]';
  };
  
  // Position exactly in main1 section
  const getOverlayPosition = () => {
    if (isMobile) {
      // For mobile, position relative to main1
      const main1Element = document.getElementById('main1');
      if (main1Element) {
        return "fixed inset-0 pointer-events-none z-10 flex items-center justify-center";
      }
    }
    
    // For desktop, position at the second screen (main1 is after video)
    return "fixed inset-0 pointer-events-none z-10 flex items-center justify-center";
  };
  
  return (
    <div className={getOverlayPosition()}>
      {/* Centered container for all parallax words */}
      <div className="relative flex flex-col items-center justify-center gap-4">
        {/* TEN */}
        <div 
          style={getParallaxStyle(1)}
          className={`font-barlow font-extrabold italic tracking-tighter ${getFontSize()}`}
        >
          TEN
        </div>
        
        {/* THOUSAND */}
        <div 
          style={getParallaxStyle(1)}
          className={`font-barlow font-extrabold italic tracking-tighter ${getFontSize()}`}
        >
          THOUSAND
        </div>
        
        {/* ROBOTS */}
        <div 
          style={getParallaxStyle(1)}
          className={`font-barlow font-extrabold italic tracking-tighter ${getFontSize()}`}
        >
          ROBOTS
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
