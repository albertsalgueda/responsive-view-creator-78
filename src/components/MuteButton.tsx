
interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MuteButton = ({ isMuted, onToggle }: MuteButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-3 w-[60px] h-[60px] z-50 hover:opacity-80 transition-opacity duration-500"
    >
      {isMuted ? (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="44" height="44" fill="white"/>
          <path d="M23.2105 12V33H21L11.7606 26.0012H8V19H11.7603L21 12H23.2105Z" fill="#1C1D1F"/>
          <path d="M27.5 19L35.5 27M35.5 19L27.5 27" stroke="#1C1D1F" strokeWidth="2"/>
        </svg>
      ) : (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="44" height="44" fill="white"/>
          <path d="M23.2105 12V33H21L11.7606 26.0012H8V19H11.7603L21 12H23.2105Z" fill="#1C1D1F"/>
          <path d="M27 21L27 25" stroke="#1C1D1F" strokeWidth="2"/>
          <path d="M31 19L31 27" stroke="#1C1D1F" strokeWidth="2"/>
          <path d="M35 17L35 29" stroke="#1C1D1F" strokeWidth="2"/>
        </svg>
      )}
    </button>
  );
};

export default MuteButton;
