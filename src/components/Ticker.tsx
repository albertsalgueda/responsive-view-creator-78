
import { useState, useEffect, useRef } from 'react';
import { useSectionColors } from '@/hooks/use-section-colors';

interface TickerProps {
  text: string;
}

const Ticker = ({ text }: TickerProps) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const { textColor, transition } = useSectionColors();
  
  useEffect(() => {
    const tickerElement = tickerRef.current;
    if (!tickerElement) return;
    
    const animateTicker = () => {
      if (!tickerElement) return;
      
      if (tickerElement.scrollLeft >= tickerElement.scrollWidth / 2) {
        tickerElement.scrollLeft = 0;
      } else {
        // Reduced scroll increment from 1 to 0.5 for slower movement
        tickerElement.scrollLeft += 0.5;
      }
      
      requestAnimationFrame(animateTicker);
    };
    
    const animationId = requestAnimationFrame(animateTicker);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="w-full h-[32px] overflow-hidden flex items-center" 
      style={{ 
        transition
      }}
    >
      <div 
        ref={tickerRef}
        className="whitespace-nowrap overflow-hidden"
        style={{
          color: textColor,
          transition
        }}
      >
        <span className="text-text-small font-barlow inline-block pr-8">{text}</span>
        <span className="text-text-small font-barlow inline-block pr-8">{text}</span>
      </div>
    </div>
  );
};

export default Ticker;
