
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export const useBackgroundTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      // Get video and main1 elements
      const videoSection = document.getElementById('video');
      const main1Section = document.getElementById('main1');
      
      if (!videoSection || !main1Section) return;
      
      const videoRect = videoSection.getBoundingClientRect();
      const main1Rect = main1Section.getBoundingClientRect();
      
      // If we're before video section or after main1 section, return early
      if (main1Rect.right < 0 || videoRect.left > window.innerWidth) {
        return;
      }
      
      // Calculate progress based on video section's position
      let progress = 0;
      
      if (!isMobile) { // Desktop (horizontal scroll)
        const totalWidth = videoRect.width;
        const scrolled = -videoRect.left;
        progress = Math.max(0, Math.min(1, scrolled / totalWidth));
      } else { // Mobile (vertical scroll)
        const totalHeight = videoRect.height;
        const scrolled = -videoRect.top;
        progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      }
      
      setScrollProgress(progress);
    };
    
    // For desktop horizontal scrolling, we need to listen to the right container
    const scrollContainer = isMobile 
      ? window 
      : document.querySelector('.overflow-x-auto') || window;
    
    const scrollEvent = 'scroll';
    scrollContainer.addEventListener(scrollEvent, handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      scrollContainer.removeEventListener(scrollEvent, handleScroll);
    };
  }, [isMobile]); // Add isMobile as dependency
  
  return scrollProgress;
};
