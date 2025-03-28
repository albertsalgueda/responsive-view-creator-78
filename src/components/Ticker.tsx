
import { useSectionColors } from '@/hooks/use-section-colors';

interface TickerProps {
  text: string;
}

const Ticker = ({ text }: TickerProps) => {
  const { textColor, transition } = useSectionColors();
  
  return (
    <div className="absolute left-0 bottom-0 w-full h-6 overflow-hidden">
      <div 
        className="whitespace-nowrap inline-block animate-marquee"
        style={{ 
          color: textColor,
          transition: transition
        }}
      >
        <span className="text-small leading-none inline-block">{text} {text}</span>
      </div>
    </div>
  );
};

export default Ticker;
