
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
  
  // Position the overlay based on current section
  const getOverlayPosition = () => {
    // Base styles for overlay
    let positionClasses = "fixed pointer-events-none z-10 overflow-hidden";
    
    if (isMobile) {
      // For mobile, adjust position to main1 section when applicable
      if (currentSection === 'main1') {
        const main1Element = document.getElementById('main1');
        if (main1Element) {
          const rect = main1Element.getBoundingClientRect();
          return `${positionClasses} top-0 left-0 w-full h-screen`;
        }
      }
      return `${positionClasses} inset-0 h-screen`;
    } else {
      // For desktop, position overlay over main1 section when applicable
      if (currentSection === 'main1') {
        const main1Element = document.getElementById('main1');
        if (main1Element) {
          return `${positionClasses} left-[100vw] top-0 w-screen h-screen`; // Position at second screen-width (main1 is after video)
        }
      }
      return `${positionClasses} inset-0 w-screen`;
    }
  };
  
  // Get font size based on section
  const getFontSize = () => {
    // Make text larger when in main1 section
    if (currentSection === 'main1') {
      return isMobile ? 'text-[48px]' : 'text-[80px]';
    }
    return isMobile ? 'text-[36px]' : 'text-[60px]';
  };
  
  return (
    <div className={getOverlayPosition()}>
      <div className="relative w-full h-full flex items-center justify-center">
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
    </div>
  );
};

export default ParallaxOverlay;
