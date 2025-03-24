
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
  
  // Define colors based on currentSection to match Navigation
  const getTextColor = () => {
    switch (currentSection) {
      case 'video':
        return '#FDB0C2'; // Pink for video section
      case 'main1':
        return '#132ABC'; // Blue
      case 'main2':
        return '#FFBD89'; // Coral
      case 'main3':
      case 'services':
        return '#97ECCF'; // Green Light
      case 'contact':
        return '#FDB0C2'; // Pink
      default:
        return '#132ABC'; // Default to Blue
    }
  };

  const textColor = getTextColor();
  
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
  const getParallaxStyle = (factor: number) => {
    const baseDelta = isMobile ? scrollPosition * factor : scrollPosition * factor;
    return {
      transform: `translateX(${-baseDelta}px)`,
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* TEN */}
        <div 
          style={{
            ...getParallaxStyle(0.1),
            color: textColor,
            transition: 'color 1.2s ease-out', // Match the exact transition time of Navigation
          }}
          className={`absolute font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[30%] left-[25%]' : 'text-[24px] top-[35%] left-[30%]'}`}
        >
          TEN
        </div>
        
        {/* THOUSAND */}
        <div 
          style={{
            ...getParallaxStyle(0.16),
            color: textColor,
            transition: 'color 1.2s ease-out',
          }}
          className={`absolute font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[40%] left-[35%]' : 'text-[24px] top-[45%] left-[40%]'}`}
        >
          THOUSAND
        </div>
        
        {/* ROBOTS */}
        <div 
          style={{
            ...getParallaxStyle(0.24),
            color: textColor,
            transition: 'color 1.2s ease-out',
          }}
          className={`absolute font-barlow font-extrabold italic tracking-tighter
                     ${isMobile ? 'text-[24px] top-[50%] left-[30%]' : 'text-[24px] top-[55%] left-[35%]'}`}
        >
          ROBOTS
        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;
