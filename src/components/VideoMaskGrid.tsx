
import { useEffect, useState } from "react";
import VideoMask from "./VideoMask";
import VideoPlayer from "./VideoPlayer";
import CanvasVideo from "./CanvasVideo";

interface VideoMaskGridProps {
  videoUrl: string;
  isMuted: boolean;
  onVideoClick: () => void;
  onVideoEnded: () => void;
  mainVideoRef: React.RefObject<HTMLVideoElement>;
}

const VideoMaskGrid = ({ 
  videoUrl, 
  isMuted, 
  onVideoClick, 
  onVideoEnded,
  mainVideoRef 
}: VideoMaskGridProps) => {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const checkMobilePortrait = () => {
      const isMobile = window.innerWidth <= 768;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsMobilePortrait(isMobile && isPortrait);
    };

    checkMobilePortrait();
    window.addEventListener('resize', checkMobilePortrait);
    window.addEventListener('orientationchange', checkMobilePortrait);

    return () => {
      window.removeEventListener('resize', checkMobilePortrait);
      window.removeEventListener('orientationchange', checkMobilePortrait);
    };
  }, []);

  // Log mute state changes for debugging
  useEffect(() => {
    console.log("VideoMaskGrid received isMuted:", isMuted);
    
    // Force update the video muted state if we have the ref
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = isMuted;
      console.log("VideoMaskGrid directly setting video.muted =", isMuted);
    }
  }, [isMuted, mainVideoRef]);

  const maskCount = isMobilePortrait ? 4 : 1;
  const gapSize = 4; // 4px gap between masks

  return (
    <div className="h-full pb-[32px]"> {/* Added pb-[32px] to create space for the ticker */}
      {Array.from({ length: maskCount }).map((_, index) => (
        <VideoMask
          key={index}
          index={index}
          maskCount={maskCount}
          gapSize={gapSize}
          onClick={onVideoClick}
        >
          <div className="w-full h-full relative">
            {index === 0 ? (
              <VideoPlayer
                videoUrl={videoUrl}
                onEnded={onVideoEnded}
                isMuted={isMuted}
                ref={mainVideoRef}
                className="w-full h-full object-cover"
                style={{ 
                  willChange: 'transform',
                  transform: 'translate3d(0,0,0)'
                }}
              />
            ) : (
              <CanvasVideo 
                mainVideoRef={mainVideoRef}
                className="transform-gpu"
              />
            )}
          </div>
        </VideoMask>
      ))}
    </div>
  );
};

export default VideoMaskGrid;
