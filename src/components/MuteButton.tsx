
import { useIsMobile } from '@/hooks/use-mobile';
import { Volume, VolumeX } from "lucide-react";
import { useSectionColors } from '@/hooks/use-section-colors';
import { Button } from "@/components/ui/button";

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MuteButton = ({
  isMuted,
  onToggle
}: MuteButtonProps) => {
  const isMobile = useIsMobile();
  const { textColor, backgroundColor, transition } = useSectionColors();
  
  console.log("MuteButton rendered with isMuted:", isMuted);
  
  return (
    <div className="fixed bottom-0 right-0 p-2" style={{
      position: 'fixed',
      bottom: isMobile ? '20px' : '16px',
      right: '16px',
      zIndex: isMobile ? 40 : 9999 // Lower z-index on mobile, higher on desktop
    }}>
      <Button 
        onClick={() => {
          console.log("Mute button clicked, current state:", isMuted);
          onToggle();
        }} 
        className="w-[40px] h-[40px] rounded-sm hover:opacity-90 transition-all duration-500 flex items-center justify-center"
        style={{
          backgroundColor: textColor,
          color: backgroundColor,
          transition
        }}
      >
        {isMuted ? 
          <VolumeX size={20} strokeWidth={3} /> : 
          <Volume size={20} strokeWidth={3} />
        }
      </Button>
    </div>
  );
};

export default MuteButton;
