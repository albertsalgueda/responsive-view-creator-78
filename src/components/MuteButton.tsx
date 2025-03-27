
import { useIsMobile } from '@/hooks/use-mobile';
import { Volume, VolumeX } from "lucide-react";
import { useSectionColors } from '@/hooks/use-section-colors';

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MuteButton = ({
  isMuted,
  onToggle
}: MuteButtonProps) => {
  const isMobile = useIsMobile();
  const { backgroundColor, transition } = useSectionColors();
  
  return <div className="fixed bottom-0 right-0 p-2" style={{
    position: 'fixed',
    bottom: isMobile ? '20px' : '16px',
    right: '16px',
    zIndex: 999999
  }}>
      <button 
        onClick={onToggle} 
        className="w-[40px] h-[40px] rounded-md hover:opacity-80 transition-all duration-500 flex items-center justify-center"
        style={{
          backgroundColor,
          transition,
          color: 'white'
        }}
      >
        {isMuted ? 
          <VolumeX size={24} strokeWidth={2} /> : 
          <Volume size={24} strokeWidth={2} />
        }
      </button>
    </div>;
};

export default MuteButton;
