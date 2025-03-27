
import { useIsMobile } from '@/hooks/use-mobile';
import { Volume, VolumeX } from "lucide-react";

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MuteButton = ({
  isMuted,
  onToggle
}: MuteButtonProps) => {
  const isMobile = useIsMobile();
  return <div className="fixed bottom-0 right-0 p-2" style={{
    position: 'fixed',
    bottom: isMobile ? '20px' : '16px',
    right: '16px',
    zIndex: 999999
  }}>
      <button 
        onClick={onToggle} 
        className="w-[40px] h-[40px] bg-white rounded-md hover:bg-accent hover:text-accent-foreground hover:opacity-80 transition-all duration-500 flex items-center justify-center"
      >
        {isMuted ? 
          <VolumeX size={24} strokeWidth={2} /> : 
          <Volume size={24} strokeWidth={2} />
        }
      </button>
    </div>;
};

export default MuteButton;
