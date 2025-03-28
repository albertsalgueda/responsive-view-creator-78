
import React from 'react';
import { useSectionColors } from '@/hooks/use-section-colors';

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  
  // Create a single text content to repeat
  const tickerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  // Increase repetitions even more to ensure no visible end
  const repetitions = 40;
  
  // Prevent wheel scroll when hovering over ticker
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
  };
  
  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-8 overflow-hidden z-50 flex items-center"
      style={{ 
        transition,
        overflowY: 'hidden'
      }}
      onWheel={handleWheel}
    >
      {/* Create a wrapper that allows seamless loop - make sure it's not constrained */}
      <div 
        className="ticker-track whitespace-nowrap overflow-y-hidden"
        style={{ 
          width: 'fit-content', 
          minWidth: '200%', // Ensure it's wider than viewport
          display: 'flex' 
        }}
      >
        {/* Use even more repetitions and make sure they're inline without gaps */}
        {Array(repetitions).fill(0).map((_, index) => (
          <span 
            key={index}
            className="inline-block text-small whitespace-nowrap"
            style={{ 
              color: textColor,
              transition
            }}
          >
            {tickerText}&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
