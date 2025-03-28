
import React from 'react';
import { useSectionColors } from '@/hooks/use-section-colors';

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  
  // Create a single text content to repeat
  const tickerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  // Use 20 repetitions - should be more than enough to create a seamless appearance
  // 1000 might be too many and affect performance
  const repetitions = 20;
  
  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-8 overflow-hidden z-50 flex items-center"
      style={{ 
        transition,
        overflowY: 'hidden'
      }}
    >
      {/* Create a wrapper that allows seamless loop */}
      <div className="ticker-track whitespace-nowrap overflow-y-hidden">
        {/* Use a reasonable number of repetitions to ensure no visible end */}
        {Array(repetitions).fill(0).map((_, index) => (
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
