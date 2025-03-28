
import React from 'react';
import { useSectionColors } from '@/hooks/use-section-colors';

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  
  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-8 overflow-hidden z-50 flex items-center"
      style={{ 
        transition
      }}
    >
      <div className="ticker-track whitespace-nowrap">
        <span 
          className="inline-block text-small"
          style={{ 
            color: textColor,
            transition
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&nbsp;&nbsp;&nbsp;
        </span>
        <span 
          className="inline-block text-small"
          style={{ 
            color: textColor,
            transition
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&nbsp;&nbsp;&nbsp;
        </span>
        <span 
          className="inline-block text-small"
          style={{ 
            color: textColor,
            transition
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&nbsp;&nbsp;&nbsp;
        </span>
        <span 
          className="inline-block text-small"
          style={{ 
            color: textColor,
            transition
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
};

export default Ticker;
