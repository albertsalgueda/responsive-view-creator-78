
import React from "react";
import ParallaxImageMask from "@/components/common/ParallaxImageMask";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageContainerProps {
  imageSrc?: string;
  altText?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ 
  imageSrc = "/lovable-uploads/cf66afd3-7f04-4d0b-849b-e13cafc76054.png",
  altText = "Beach lifeguard tower"
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-screen flex-shrink-0 flex justify-center items-center">
      <div className="h-screen">
        <ParallaxImageMask 
          imageSrc={imageSrc} 
          altText={altText}
        />
      </div>
    </div>
  );
};

export default ImageContainer;
