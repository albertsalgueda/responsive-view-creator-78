
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
  const [lastScroll, setLastScroll] = useState({ x: 0, y: 0 });

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
    // Function to update parallax effect
    const updateParallax = () => {
      if (!containerRef.current || !imageRef.current) {
        return;
      }

      // Get scroll position
      const scrollX = isMobile ? 0 : window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      const scrollY = isMobile ? window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0 : 0;
      
      // Only update if scroll position changed
      if (scrollX !== lastScroll.x || scrollY !== lastScroll.y) {
        setLastScroll({ x: scrollX, y: scrollY });
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate relative position in the viewport
        let parallaxOffset;
        
        if (isMobile) {
          // Vertical parallax for mobile
          const relativePositionY = containerRect.top / viewportHeight;
          const parallaxAmountY = 50; // pixels to move vertically on mobile
          parallaxOffset = `translateY(${relativePositionY * parallaxAmountY}px)`;
        } else {
          // Horizontal parallax for desktop
          const relativePositionX = containerRect.left / viewportWidth;
          const parallaxAmountX = 100; // pixels to move horizontally on desktop
          parallaxOffset = `translateX(${relativePositionX * parallaxAmountX}px)`;
        }
        
        // Apply the transform directly to the image element
        imageRef.current.style.transform = parallaxOffset;
      }
    };
    
    // Set up IntersectionObserver to only apply parallax when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start listening for scroll events when visible
          window.addEventListener('scroll', updateParallax, { passive: true });
          
          if (!isMobile) {
            const scrollContainer = document.querySelector('.overflow-x-auto');
            if (scrollContainer) {
              scrollContainer.addEventListener('scroll', updateParallax, { passive: true });
            }
          }
          
          window.addEventListener('resize', updateParallax, { passive: true });
          
          // Initial update
          updateParallax();
        } else {
          // Remove listeners when not visible
          window.removeEventListener('scroll', updateParallax);
          
          if (!isMobile) {
            const scrollContainer = document.querySelector('.overflow-x-auto');
            if (scrollContainer) {
              scrollContainer.removeEventListener('scroll', updateParallax);
            }
          }
          
          window.removeEventListener('resize', updateParallax);
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
      
      window.removeEventListener('scroll', updateParallax);
      
      if (!isMobile) {
        const scrollContainer = document.querySelector('.overflow-x-auto');
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', updateParallax);
        }
      }
      
      window.removeEventListener('resize', updateParallax);
    };
  }, [isMobile, lastScroll]);

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
        className="absolute inset-0 w-[200%] h-[120%]"
        style={{
          left: "-50%",
          top: "-10%",
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
