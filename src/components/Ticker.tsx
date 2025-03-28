
import React from 'react';
import { useSectionColors } from '@/hooks/use-section-colors';

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  
  // Create a single text content to repeat
  const tickerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-8 overflow-hidden z-50 flex items-center"
      style={{ 
        transition,
        overflowY: 'hidden'
      }}
    >
      {/* Create a wrapper that's double the width to allow seamless loop */}
      <div className="ticker-track whitespace-nowrap overflow-y-hidden">
        {/* Repeat the text multiple times to ensure no gaps */}
        {Array(8).fill(0).map((_, index) => (
          <span 
            key={index}
            className="inline-block text-small"
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
