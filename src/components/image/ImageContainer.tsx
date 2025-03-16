
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
    <div className="h-screen flex-shrink-0 bg-black flex justify-center items-center">
      <div className="h-screen">
        <ParallaxImageMask 
          imageSrc={imageSrc} 
          altText={altText}
          maskWidth={350} // Slightly increased width
        />
      </div>
    </div>
  );
};

export default ImageContainer;
