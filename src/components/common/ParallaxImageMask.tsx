
import React, { useEffect, useRef, useState } from "react";

interface ParallaxImageMaskProps {
  imageSrc: string;
  altText?: string;
  maskWidth?: number;
}

const ParallaxImageMask: React.FC<ParallaxImageMaskProps> = ({
  imageSrc,
  altText = "Parallax image",
  maskWidth = 320,
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
        // First try to find the ScrollArea container
        const scrollArea = document.querySelector('.overflow-x-auto');
        if (scrollArea) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollAreaRect = scrollArea.getBoundingClientRect();
          const viewportOffset = rect.left - scrollAreaRect.left;
          
          // Apply a gentler parallax effect
          setScrollPosition(viewportOffset * 0.1);
        }
      }
    };

    // Get the scrollable container
    const scrollableContainer = document.querySelector('.overflow-x-auto');
    
    if (scrollableContainer) {
      scrollableContainer.addEventListener("scroll", handleScroll, { passive: true });
      // Initial calculation
      handleScroll();
    }
    
    return () => {
      if (scrollableContainer) {
        scrollableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden w-full h-full"
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
