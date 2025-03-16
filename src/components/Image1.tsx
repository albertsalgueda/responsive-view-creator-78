
import React from "react";
import ParallaxImageMask from "@/components/common/ParallaxImageMask";

const Image1: React.FC = () => {
  return (
    <div className="h-screen flex-shrink-0 bg-black flex justify-center">
      <ParallaxImageMask 
        imageSrc="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
        altText="Woman sitting on a bed using a laptop"
      />
    </div>
  );
};

export default Image1;
