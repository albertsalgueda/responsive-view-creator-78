
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';
import { useView } from '@/context/ViewContext';

export const useBackgroundTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(scrollProgress);
  const animationRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const { currentSection } = useView();
  
  // Smoothly animate to target value with immediate transition to pink
  const animateProgress = (targetValue: number) => {
    // If any scrolling happens, immediately go to pink (progress = 1)
    if (targetValue > 0) {
      targetValue = 1;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const animate = () => {
      const currentProgress = progressRef.current;
      const diff = targetValue - currentProgress;
      
      // If we're very close to the target or have reached it, set the final value
      if (Math.abs(diff) < 0.001) {
        progressRef.current = targetValue;
        setScrollProgress(targetValue);
        animationRef.current = null;
        return;
      }
      
      // Very fast transition - move directly to target
      const easeAmount = 0.5; // Higher value for faster transition
      const newProgress = currentProgress + diff * easeAmount;
      
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
        // When any scroll happens, immediately set to 1 (pink)
        if (videoRect.left < 0) {
          targetProgress = 1;
        } else {
          targetProgress = 0;
        }
      } else { // Mobile (vertical scroll)
        // When any scroll happens, immediately set to 1 (pink)
        if (videoRect.top < 0) {
          targetProgress = 1;
        } else {
          targetProgress = 0;
        }
      }
      
      // Smoothly animate to the target progress
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
  }, [isMobile, currentSection]);
  
  return scrollProgress;
};
