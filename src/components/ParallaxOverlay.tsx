
import React, { useEffect, useState } from 'react';
import { useView } from '@/context/ViewContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ParallaxOverlay: React.FC = () => {
  const { currentSection } = useView();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Only show the overlay when Main1 is in view
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
  
  // Calculate parallax effect based on scroll position
  const getParallaxStyle = (baseDelay: number) => {
    const baseDelta = isMobile ? scrollPosition * 0.2 : scrollPosition * 0.1;
    return {
      transform: `translateY(${baseDelta}px)`,
      transition: 'opacity 1.2s ease-out',
      opacity: isVisible ? 1 : 0
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* TEN */}
        <div 
          style={getParallaxStyle(0)}
          className={`absolute text-brand-blue opacity-10 font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[10rem] top-[15%] left-[5%]' : 'text-[15rem] top-[15%] left-[10%]'}`}
        >
          TEN
        </div>
        
        {/* THOUSAND */}
        <div 
          style={getParallaxStyle(0.1)}
          className={`absolute text-brand-blue opacity-10 font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[5rem] top-[40%] right-[5%]' : 'text-[10rem] top-[40%] right-[10%]'}`}
        >
          THOUSAND
        </div>
        
        {/* ROBOTS */}
        <div 
          style={getParallaxStyle(0.2)}
          className={`absolute text-brand-blue opacity-10 font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[7rem] bottom-[15%] left-[5%]' : 'text-[12rem] bottom-[15%] left-[10%]'}`}
        >
          ROBOTS
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
