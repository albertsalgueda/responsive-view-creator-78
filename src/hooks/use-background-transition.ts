
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';
import { useView } from '@/context/ViewContext';

export const useBackgroundTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(scrollProgress);
  const animationRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const { currentSection } = useView();
  
  // Smoothly animate to target value
  const animateProgress = (targetValue: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const animate = () => {
      const currentProgress = progressRef.current;
      const diff = targetValue - currentProgress;
      
      // If we're very close to the target or have reached it, set the final value
      if (Math.abs(diff) < 0.01) {
        progressRef.current = targetValue;
        setScrollProgress(targetValue);
        animationRef.current = null;
        return;
      }
      
      // Smooth easing - move 10% of remaining distance each frame
      const newProgress = currentProgress + diff * 0.1;
      progressRef.current = newProgress;
      setScrollProgress(newProgress);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
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
      let targetProgress = 0;
      
      if (!isMobile) { // Desktop (horizontal scroll)
        // Calculate where the video section is relative to the viewport
        // When it's fully visible (left edge at 0), progress should be 0
        // When it's moving out (right edge at 0), progress should be 1
        const videoWidth = videoRect.width;
        
        // If video is fully on screen (left edge at 0), progress is 0
        if (videoRect.left >= 0) {
          targetProgress = 0;
        } 
        // If video is partially off screen to the left
        else if (videoRect.right > 0) {
          // Calculate how much of the video has scrolled off screen
          targetProgress = Math.min(1, Math.abs(videoRect.left) / videoWidth);
        } 
        // If video is completely off screen
        else {
          targetProgress = 1;
        }
      } else { // Mobile (vertical scroll)
        const totalHeight = videoRect.height;
        const scrolled = -videoRect.top;
        targetProgress = Math.max(0, Math.min(1, scrolled / totalHeight));
      }
      
      // Smoothly animate to the target progress instead of setting directly
      animateProgress(targetProgress);
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
      // Clean up any ongoing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, currentSection]); // Add currentSection as dependency to trigger recalculation
  
  return scrollProgress;
};
