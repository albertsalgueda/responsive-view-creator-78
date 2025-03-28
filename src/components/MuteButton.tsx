
import { useIsMobile } from '@/hooks/use-mobile';
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
        {isMuted ? (
          <svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1790_3476)">
              <path d="M16.2105 5V26H14L4.76061 19.0012H1V12H4.76025L14 5H16.2105Z" fill="currentColor"/>
              <path d="M20.5 12L28.5 20M28.5 12L20.5 20" stroke="currentColor" strokeWidth="2"/>
            </g>
            <defs>
              <clipPath id="clip0_1790_3476">
                <rect width="30" height="30" fill="currentColor"/>
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1790_3469)">
              <path d="M16.2105 5V26H14L4.76061 19.0012H1V12H4.76025L14 5H16.2105Z" fill="currentColor"/>
              <path d="M20 14L20 18" stroke="currentColor" strokeWidth="2"/>
              <path d="M24 12L24 20" stroke="currentColor" strokeWidth="2"/>
              <path d="M28 10L28 22" stroke="currentColor" strokeWidth="2"/>
            </g>
            <defs>
              <clipPath id="clip0_1790_3469">
                <rect width="30" height="30" fill="currentColor"/>
              </clipPath>
            </defs>
          </svg>
        )}
      </Button>
    </div>
  );
};

export default MuteButton;
