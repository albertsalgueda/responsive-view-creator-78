
import { useRef } from "react";
import { useVideoControl } from "@/hooks/useVideoControl";
import VideoMaskGrid from "./VideoMaskGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import Ticker from "./Ticker";

interface VideoSectionProps {
  isMuted: boolean;
}

const VideoSection = ({ isMuted }: VideoSectionProps) => {
  const isMobile = useIsMobile();
  const videos = [
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427234/1_Perfume_bgcjis.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427238/2_SuperHero_wqmla0.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427236/3_CarCommercial_tkijvf.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427234/4_Cereal_tof0fd.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427240/5_OldMan4_w1fg8m.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427235/6_motel2_cmfw3s.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427232/7_Rapper2_n3p3eo.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737427233/8_Anime2_brrj38.mp4",
    "https://res.cloudinary.com/dxqekn6h5/video/upload/f_auto,q_auto/v1737578062/9_Honeybee_y34id6.mp4"
  ];

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  
  // Log the isMuted prop for debugging
  console.log("VideoSection received isMuted:", isMuted);
  
  const {
    currentVideoUrl,
    isMuted: videoIsMuted,
    handleVideoClick,
    handleVideoEnded
  } = useVideoControl(videos, isMuted);
  
  // Update muted state in video element directly through the ref
  // This ensures the muted attribute is properly set on the HTML video element
  if (mainVideoRef.current) {
    mainVideoRef.current.muted = isMuted;
    console.log("Setting video.muted =", isMuted, "on the HTML video element");
  }
  
  return (
    <div id="video" className={isMobile ? "w-full min-h-screen relative" : "w-screen h-screen shrink-0 relative"}>
      {/* Position the VideoMaskGrid to leave space for ticker */}
      <div className={`absolute inset-0 ${!isMobile ? "bottom-[112px]" : "bottom-[32px]"} flex items-center justify-center`}>
        <VideoMaskGrid
          videoUrl={currentVideoUrl}
          isMuted={isMuted}
          onVideoClick={handleVideoClick}
          onVideoEnded={handleVideoEnded}
          mainVideoRef={mainVideoRef}
        />
      </div>
      <Ticker />
    </div>
  );
};

export default VideoSection;
