
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
  const [isMobile, setIsMobile] = useState(false);
  const [lastScroll, setLastScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateParallax = () => {
      if (!containerRef.current || !imageRef.current) {
        return;
      }

      let scrollX = 0;
      let scrollY = 0;
      
      if (isMobile) {
        scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      } else {
        const horizontalContainer = document.querySelector('.overflow-x-auto');
        if (horizontalContainer) {
          scrollX = horizontalContainer.scrollLeft;
        } else {
          scrollX = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        }
      }
      
      if (scrollX !== lastScroll.x || scrollY !== lastScroll.y) {
        setLastScroll({ x: scrollX, y: scrollY });
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let parallaxOffset;
        
        if (isMobile) {
          const relativePositionY = containerRect.top / viewportHeight;
          const parallaxAmountY = 50;
          parallaxOffset = `translateY(${relativePositionY * parallaxAmountY}px)`;
        } else {
          const relativePositionX = containerRect.left / viewportWidth;
          const parallaxAmountX = 100;
          parallaxOffset = `translateX(${relativePositionX * parallaxAmountX}px)`;
        }
        
        imageRef.current.style.transform = parallaxOffset;
      }
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.addEventListener('scroll', updateParallax, { passive: true });
          
          if (!isMobile) {
            const horizontalContainer = document.querySelector('.overflow-x-auto');
            if (horizontalContainer) {
              horizontalContainer.addEventListener('scroll', updateParallax, { passive: true });
            }
          }
          
          window.addEventListener('resize', updateParallax, { passive: true });
          
          updateParallax();
        } else {
          window.removeEventListener('scroll', updateParallax);
          
          if (!isMobile) {
            const horizontalContainer = document.querySelector('.overflow-x-auto');
            if (horizontalContainer) {
              horizontalContainer.removeEventListener('scroll', updateParallax);
            }
          }
          
          window.removeEventListener('resize', updateParallax);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    setTimeout(updateParallax, 100);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      
      window.removeEventListener('scroll', updateParallax);
      
      if (!isMobile) {
        const horizontalContainer = document.querySelector('.overflow-x-auto');
        if (horizontalContainer) {
          horizontalContainer.removeEventListener('scroll', updateParallax);
        }
      }
      
      window.removeEventListener('resize', updateParallax);
    };
  }, [isMobile, lastScroll]);

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
          className="w-full h-full object-cover"
          style={{
            transitionProperty: "transform",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxImageMask;
