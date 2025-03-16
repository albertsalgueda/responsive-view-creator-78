
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
      // Get the scrollable container
      const scrollContainer = document.querySelector('.overflow-x-auto');
      
      if (!containerRef.current || !scrollContainer) {
        return;
      }
      
      // Get the necessary measurements
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      
      // Calculate the container's position relative to the scroll container
      const relativePosition = containerRect.left - scrollContainerRect.left;
      
      // Calculate the viewport width to normalize the parallax effect
      const viewportWidth = window.innerWidth;
      
      // Create a parallax effect based on position
      // We multiply by a small factor to make the effect subtle
      // Normalize by viewport width to make it consistent across screen sizes
      const parallaxOffset = relativePosition * -0.08 * (viewportWidth / 1920);
      
      setScrollPosition(parallaxOffset);
    };

    // Find the scrollable container
    const scrollContainer = document.querySelector('.overflow-x-auto');
    
    if (scrollContainer) {
      // Add scroll event listener
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
      // Calculate initial position
      handleScroll();
      
      // Also listen to window resize as it might affect positioning
      window.addEventListener('resize', handleScroll, { passive: true });
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
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
          transition: "transform 0.05s ease-out" // Smooth transition but not too slow
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
