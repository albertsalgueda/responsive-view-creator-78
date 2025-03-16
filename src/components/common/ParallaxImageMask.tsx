
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
        // Get the horizontal scroll position of the window
        const scrollX = window.scrollX || window.pageXOffset;
        
        // Calculate the position of the container relative to the viewport
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate the parallax offset based on the container's position
        // Adjust the multiplier to control the parallax intensity
        const parallaxOffset = (rect.left - scrollX) * 0.1;
        
        setScrollPosition(parallaxOffset);
      }
    };

    // Add scroll event listener to window
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // For horizontal scrolling within ScrollArea
    const scrollableParent = containerRef.current?.closest('.overflow-x-auto');
    if (scrollableParent) {
      scrollableParent.addEventListener("scroll", handleScroll, { passive: true });
    }
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          transition: "transform 0.1s ease-out", // Smoother parallax movement
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
