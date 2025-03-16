
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
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollX, setLastScrollX] = useState(0);

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
    if (isMobile) return; // Don't apply parallax on mobile
    
    // Function to update parallax effect
    const updateParallax = () => {
      const scrollContainer = document.querySelector('.overflow-x-auto');
      
      if (!containerRef.current || !imageRef.current || !scrollContainer) {
        return;
      }
      
      // Get scroll position from the container
      const scrollX = scrollContainer.scrollLeft;
      
      // Only update if scroll position changed
      if (scrollX !== lastScrollX) {
        setLastScrollX(scrollX);
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Calculate relative position in the viewport (0 to 1)
        const relativePositionInViewport = containerRect.left / viewportWidth;
        
        // Apply parallax offset based on position 
        // Adjust the multiplier to control the effect intensity
        const parallaxAmount = 100; // pixels to move
        const parallaxOffset = relativePositionInViewport * parallaxAmount;
        
        // Apply the transform directly to the image element
        imageRef.current.style.transform = `translateX(${parallaxOffset}px)`;
      }
    };
    
    // Set up IntersectionObserver to only apply parallax when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start listening for scroll events when visible
          const scrollContainer = document.querySelector('.overflow-x-auto');
          if (scrollContainer) {
            scrollContainer.addEventListener('scroll', updateParallax, { passive: true });
            window.addEventListener('resize', updateParallax, { passive: true });
            
            // Initial update
            updateParallax();
          }
        } else {
          // Remove listeners when not visible
          const scrollContainer = document.querySelector('.overflow-x-auto');
          if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', updateParallax);
            window.removeEventListener('resize', updateParallax);
          }
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% is visible
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Run updateParallax initially
    updateParallax();
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      
      const scrollContainer = document.querySelector('.overflow-x-auto');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateParallax);
        window.removeEventListener('resize', updateParallax);
      }
    };
  }, [isMobile, lastScrollX]);

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
        className="absolute inset-0 w-[200%] h-[120%]" // Increased width and height
        style={{
          left: "-50%", // Positioned further left
          top: "-10%", // Moved up slightly to ensure no edges show
        }}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "300ms, 200ms",
            transitionTimingFunction: "ease-out",
          }}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default ParallaxImageMask;
