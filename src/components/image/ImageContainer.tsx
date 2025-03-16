
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
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <ParallaxImageMask 
        imageSrc={imageSrc} 
        altText={altText}
        maskWidth={320}
      />
    </div>
  );
};

export default ImageContainer;
