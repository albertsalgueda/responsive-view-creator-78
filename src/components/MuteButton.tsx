
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
  const { backgroundColor, transition } = useSectionColors();
  
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
        className="w-[40px] h-[40px] bg-white rounded-md hover:opacity-80 transition-all duration-500 flex items-center justify-center"
        style={{
          transition
        }}
        variant="outline"
        size="icon"
      >
        {isMuted ? 
          <VolumeX size={24} strokeWidth={3} style={{ color: backgroundColor }} /> : 
          <Volume size={24} strokeWidth={3} style={{ color: backgroundColor }} />
        }
      </Button>
    </div>
  );
};

export default MuteButton;
