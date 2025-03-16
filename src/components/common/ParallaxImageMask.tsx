
import React, { useEffect, useRef, useState } from "react";

interface ParallaxImageMaskProps {
  imageSrc: string;
  altText?: string;
  maskWidth?: number;
}

const ParallaxImageMask: React.FC<ParallaxImageMaskProps> = ({
  imageSrc,
  altText = "Parallax image",
  maskWidth = 320, // Changed default from 480 to 320
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // Look specifically for ScrollArea element which has the overflow-x-auto class
        const scrollAreaElement = document.querySelector('.overflow-x-auto');
        
        if (scrollAreaElement) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollElementRect = scrollAreaElement.getBoundingClientRect();
          
          // Calculate relative position (distance from left edge of scroll container)
          const relativePosition = rect.left - scrollElementRect.left;
          
          // Adjust parallax intensity - smaller number = gentler effect
          const parallaxIntensity = 0.1;
          setScrollPosition(relativePosition * parallaxIntensity);
          
          // Debug info
          console.log('Scroll detected, new position:', relativePosition * parallaxIntensity);
        }
      }
    };

    // Get reference to the scroll container
    const scrollableParent = document.querySelector('.overflow-x-auto');
    
    if (scrollableParent) {
      // Add the scroll event listener to the correct element
      scrollableParent.addEventListener("scroll", handleScroll, { passive: true });
      
      // Initial position calculation
      handleScroll();
      
      // Debug info
      console.log('Scroll listener attached to:', scrollableParent);
    } else {
      console.log('Could not find scroll container with .overflow-x-auto class');
    }
    
    return () => {
      if (scrollableParent) {
        scrollableParent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        width: isMobile ? '100vw' : `${maskWidth}px`, 
        height: "100vh" 
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateX(${scrollPosition}px)`,
          width: "150%", // Increase width to prevent cropping during parallax
          height: "100%",
          left: "-25%", // Center the wider image
          transition: "transform 0.1s ease-out" // Add smooth transition for parallax
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default ParallaxImageMask;
