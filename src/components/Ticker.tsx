
import { useSectionColors } from "@/hooks/use-section-colors";
import { useEffect, useRef } from "react";

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For debugging the color transitions
    console.log("Ticker color updated:", textColor);
  }, [textColor]);

  return (
    <div 
      className="absolute bottom-0 left-0 w-full h-[32px] overflow-hidden"
      style={{ maxWidth: '100vw' }}
    >
      <div 
        ref={tickerRef}
        className="whitespace-nowrap text-small flex items-center h-full w-max animate-ticker"
        style={{ 
          color: textColor,
          transition: transition
        }}
      >
        <span className="mr-8 inline-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <span className="mr-8 inline-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <span className="mr-8 inline-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <span className="mr-8 inline-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <span className="mr-8 inline-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
      </div>
    </div>
  );
};

export default Ticker;
