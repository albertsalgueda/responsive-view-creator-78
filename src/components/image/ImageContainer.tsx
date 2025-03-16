
import React from "react";
import ParallaxImageMask from "@/components/common/ParallaxImageMask";

interface ImageContainerProps {
  imageSrc?: string;
  altText?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ 
  imageSrc = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  altText = "Parallax showcase image"
}) => {
  return (
    <div className="h-screen flex-shrink-0 bg-black flex justify-center">
      <div className="h-screen">
        <ParallaxImageMask 
          imageSrc={imageSrc} 
          altText={altText}
          // We'll let the ParallaxImageMask handle the width based on screen size
        />
      </div>
    </div>
  );
};

export default ImageContainer;
