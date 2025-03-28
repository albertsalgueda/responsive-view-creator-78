
import { useEffect, useRef, useState } from 'react';
import { useSectionColors } from '@/hooks/use-section-colors';

interface TickerProps {
  text: string;
}

const Ticker = ({ text }: TickerProps) => {
  const { textColor, transition } = useSectionColors();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(30); // seconds

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      // Calculate animation duration based on text length
      const textWidth = textRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;
      
      // Adjust duration based on text length (longer text = longer duration)
      const calculatedDuration = (textWidth / containerWidth) * 15;
      setAnimationDuration(Math.max(calculatedDuration, 15));
    }
  }, [text]);

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden w-full h-6" // 24px height
    >
      <div 
        ref={textRef}
        className="inline-block whitespace-nowrap animate-marquee"
        style={{ 
          animation: `marquee ${animationDuration}s linear infinite`,
          color: textColor,
          transition: transition
        }}
      >
        <span className="text-small" style={{ lineHeight: 1 }}>{text}</span>
        <span className="text-small ml-10" style={{ lineHeight: 1 }}>{text}</span>
      </div>
    </div>
  );
};

export default Ticker;
