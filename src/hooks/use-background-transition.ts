
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export const useBackgroundTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Optimized scroll handler with debouncing for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Get video and main1 elements
          const videoSection = document.getElementById('video');
          const main1Section = document.getElementById('main1');
          
          if (!videoSection || !main1Section) return;
          
          const videoRect = videoSection.getBoundingClientRect();
          const main1Rect = main1Section.getBoundingClientRect();
          
          // If we're before video section or after main1 section, return early
          if (main1Rect.right < 0 || videoRect.left > window.innerWidth) {
            ticking = false;
            return;
          }
          
          // Calculate progress based on video section's position
          let progress = 0;
          
          if (!isMobile) { // Desktop (horizontal scroll)
            // Calculate where the video section is relative to the viewport
            const videoWidth = videoRect.width;
            
            // If video is fully on screen (left edge at 0), progress is 0
            if (videoRect.left >= 0) {
              progress = 0;
            } 
            // If video is partially off screen to the left
            else if (videoRect.right > 0) {
              // Calculate how much of the video has scrolled off screen
              progress = Math.min(1, Math.abs(videoRect.left) / videoWidth);
            } 
            // If video is completely off screen
            else {
              progress = 1;
            }
          } else { // Mobile (vertical scroll)
            const totalHeight = videoRect.height;
            const scrolled = Math.abs(videoRect.top); // Get absolute value
            progress = Math.min(1, scrolled / (totalHeight * 0.7)); // Use 70% of height for better transition
          }
          
          setScrollProgress(progress);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // For desktop horizontal scrolling, we need to listen to the right container
    const scrollContainer = isMobile 
      ? window 
      : document.querySelector('.overflow-x-auto') || window;
    
    const scrollEvent = 'scroll';
    scrollContainer.addEventListener(scrollEvent, handleScroll, { passive: true });
    
    // Handle wheel events for desktop horizontal scrolling
    if (!isMobile) {
      const wheelHandler = () => {
        requestAnimationFrame(handleScroll);
      };
      scrollContainer.addEventListener('wheel', wheelHandler, { passive: true });
      
      return () => {
        scrollContainer.removeEventListener(scrollEvent, handleScroll);
        scrollContainer.removeEventListener('wheel', wheelHandler);
      };
    }
    
    // Initial calculation
    handleScroll();
    
    return () => {
      scrollContainer.removeEventListener(scrollEvent, handleScroll);
    };
  }, [isMobile]); 
  
  return scrollProgress;
};
