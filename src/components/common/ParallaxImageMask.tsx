
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
      if (!containerRef.current) return;
      
      // Get the scrollable parent (ScrollArea)
      const scrollArea = containerRef.current.closest('.overflow-x-auto');
      if (!scrollArea) return;
      
      // Get current position information
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollAreaRect = scrollArea.getBoundingClientRect();
      
      // Calculate the container's position within the scroll area
      const containerRelativePos = containerRect.left - scrollAreaRect.left;
      
      // Calculate viewport center
      const viewportCenter = window.innerWidth / 2;
      
      // Calculate how far the container is from the center of the viewport
      // This will be positive when the container is to the right of center,
      // negative when it's to the left
      const distanceFromCenter = containerRect.left + (containerRect.width / 2) - viewportCenter;
      
      // Apply parallax effect based on distance from center
      // Adjust the divisor to control intensity (higher = less intense)
      const parallaxOffset = distanceFromCenter / -3;
      
      setScrollPosition(parallaxOffset);
      
      // Debug
      console.log("Container left:", containerRect.left, "Parallax offset:", parallaxOffset);
    };

    // Attach scroll handler to ScrollArea
    const scrollArea = containerRef.current?.closest('.overflow-x-auto');
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll, { passive: true });
      
      // Calculate immediately and on resize
      handleScroll();
      window.addEventListener("resize", handleScroll, { passive: true });
    }
    
    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
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
          width: "150%", // Wider image for parallax movement
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
