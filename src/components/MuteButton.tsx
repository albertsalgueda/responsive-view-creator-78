
import { useIsMobile } from '@/hooks/use-mobile';
interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}
const MuteButton = ({
  isMuted,
  onToggle
}: MuteButtonProps) => {
  const isMobile = useIsMobile();
  return <div className="fixed bottom-0 right-0 p-4" style={{
    position: 'fixed',
    bottom: isMobile ? '20px' : '16px',
    right: '16px',
    zIndex: 999999
  }}>
      <button onClick={onToggle} className="w-[48px] h-[48px] bg-white rounded-md hover:bg-accent hover:text-accent-foreground hover:opacity-80 transition-all duration-500">
        {isMuted ? <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2105 12V33H21L11.7606 26.0012H8V19H11.7603L21 12H23.2105Z" fill="#1C1D1F" />
            <path d="M27.5 19L35.5 27M35.5 19L27.5 27" stroke="#1C1D1F" strokeWidth="2" />
          </svg> : <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2105 12V33H21L11.7606 26.0012H8V19H11.7603L21 12H23.2105Z" fill="#1C1D1F" />
            <path d="M27 21L27 25" stroke="#1C1D1F" strokeWidth="2" />
            <path d="M31 19L31 27" stroke="#1C1D1F" strokeWidth="2" />
            <path d="M35 17L35 29" stroke="#1C1D1F" strokeWidth="2" />
          </svg>}
      </button>
    </div>;
};
export default MuteButton;
