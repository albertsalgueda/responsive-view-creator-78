
import { useRef } from "react";
import { useVideoControl } from "@/hooks/useVideoControl";
import VideoMaskGrid from "./VideoMaskGrid";
import MuteButton from "./MuteButton";
import { useIsMobile } from "@/hooks/use-mobile";

const VideoSection = () => {
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
  const {
    currentVideoUrl,
    isMuted,
    handleVideoClick,
    handleVideoEnded,
    toggleMute
  } = useVideoControl(videos);

  return (
    <div id="video" className={isMobile ? "w-full min-h-screen relative" : "w-screen h-screen shrink-0 relative"}>
      <VideoMaskGrid
        videoUrl={currentVideoUrl}
        isMuted={isMuted}
        onVideoClick={handleVideoClick}
        onVideoEnded={handleVideoEnded}
        mainVideoRef={mainVideoRef}
      />
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </div>
  );
};

export default VideoSection;
