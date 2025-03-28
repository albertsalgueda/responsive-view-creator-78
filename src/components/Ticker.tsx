
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
          From the folks who… Built a $100M ARR Design & Innovation Agency • Launched the 51st App in the App Store • Designed Xbox's First Interface • Launched 2 x Unicorn IPOs • Created the World's First AI Creative Director • Reimagined Audi's Automotive Digital Evosystem • Built The AI Platform That Supercharges Entrepreneurs • Produced the Viral Steph Curry Anthem • Launched Nike's Acclaimed Run London Campaign • Created The World's Coolest Basketball Court
        </span>
        <span className="mr-8 inline-block">
          From the folks who… Built a $100M ARR Design & Innovation Agency • Launched the 51st App in the App Store • Designed Xbox's First Interface • Launched 2 x Unicorn IPOs • Created the World's First AI Creative Director • Reimagined Audi's Automotive Digital Evosystem • Built The AI Platform That Supercharges Entrepreneurs • Produced the Viral Steph Curry Anthem • Launched Nike's Acclaimed Run London Campaign • Created The World's Coolest Basketball Court
        </span>
      </div>
    </div>
  );
};

export default Ticker;
