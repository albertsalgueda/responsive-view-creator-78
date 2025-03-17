
import { useState, useEffect } from 'react';
import { useView } from '@/context/ViewContext';

export const useBackgroundTransition = () => {
  const { currentSection } = useView();
  const [backgroundColor, setBackgroundColor] = useState('#132ABC');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.getElementById('video');
      const main1Section = document.getElementById('main1');
      
      if (!videoSection || !main1Section) return;
      
      const videoRect = videoSection.getBoundingClientRect();
      const main1Rect = main1Section.getBoundingClientRect();
      
      // Calculate position for color transition
      if (videoRect.bottom > 0 && main1Rect.top < window.innerHeight) {
        // Calculate transition progress based on how far we've scrolled from video to main1
        const totalDistance = videoRect.height;
        const scrolled = Math.min(Math.max(0, -videoRect.top), totalDistance);
        const progress = scrolled / totalDistance;
        
        setScrollProgress(progress);
      } else if (main1Rect.top >= window.innerHeight) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Interpolate between blue and pink
    const blueColor = { r: 19, g: 42, b: 188 }; // #132ABC
    const pinkColor = { r: 253, g: 176, b: 194 }; // #FDB0C2
    
    const r = Math.floor(blueColor.r + (pinkColor.r - blueColor.r) * scrollProgress);
    const g = Math.floor(blueColor.g + (pinkColor.g - blueColor.g) * scrollProgress);
    const b = Math.floor(blueColor.b + (pinkColor.b - blueColor.b) * scrollProgress);
    
    setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
  }, [scrollProgress]);

  return { backgroundColor };
};
