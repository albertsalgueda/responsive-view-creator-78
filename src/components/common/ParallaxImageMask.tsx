
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageMaskProps {
  imageSrc: string;
  altText: string;
  className?: string;
}

const ParallaxImageMask: React.FC<ParallaxImageMaskProps> = ({
  imageSrc,
  altText,
  className,
}) => {
  const [offset, setOffset] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      
      const rect = imageRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const centerPosition = windowWidth / 2;
      const imagePosition = rect.left + rect.width / 2;
      
      // Calculate how far the image is from the center as a percentage of the window width
      const distanceFromCenter = (imagePosition - centerPosition) / windowWidth;
      
      // Apply parallax effect (adjust the 100 value to control the intensity)
      const parallaxOffset = -distanceFromCenter * 100;
      setOffset(parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={imageRef}
      className={cn("relative overflow-hidden h-screen w-screen md:w-[600px] lg:w-[800px] xl:w-[1000px]", className)}
    >
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateX(${offset}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ParallaxImageMask;
