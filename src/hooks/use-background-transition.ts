
import { useState, useEffect } from 'react';

export const useBackgroundTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Get video and main1 elements
      const videoSection = document.getElementById('video');
      const main1Section = document.getElementById('main1');
      
      if (!videoSection || !main1Section) return;
      
      const videoRect = videoSection.getBoundingClientRect();
      const main1Rect = main1Section.getBoundingClientRect();
      
      // Calculate how far we've scrolled between the two sections
      // When video is fully visible, progress is 0
      // When main1 is fully visible, progress is 1
      
      // If we're before video section or after main1 section, return early
      if (main1Rect.right < 0 || videoRect.left > window.innerWidth) {
        return;
      }
      
      // Calculate progress based on video section's position
      // When video is centered, progress is 0
      // When main1 is centered, progress is 1
      let progress = 0;
      
      if (window.innerWidth > 768) { // Desktop (horizontal scroll)
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
    
    window.addEventListener('scroll', handleScroll);
    // Also listen for horizontal scroll on desktop
    document.querySelector('.overflow-x-auto')?.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelector('.overflow-x-auto')?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollProgress;
};
