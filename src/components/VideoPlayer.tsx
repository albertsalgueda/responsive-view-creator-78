
import { useRef, useEffect, forwardRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onEnded: () => void;
  isMuted: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, onEnded, isMuted, className = "", style = {} }, ref) => {
    const localRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
      console.log('Video URL changed to:', videoUrl);
      
      const video = localRef.current;
      if (video) {
        // Stop any existing playback and clear memory
        video.pause();
        video.currentTime = 0;
        video.src = videoUrl;
        
        // Only preload metadata initially to reduce memory usage
        video.preload = "metadata";
        video.load();

        const handleLoadedMetadata = () => {
          // Switch to auto preload only when metadata is loaded
          video.preload = "auto";
          console.log('Video metadata loaded:', videoUrl);
        };

        const handleLoadedData = () => {
          console.log('Video loaded successfully:', videoUrl);
          // Only play if this video element is still mounted with the same URL
          if (video.src === videoUrl) {
            video.play().catch(e => console.error('Play error:', e));
          }
        };
        
        const handlePlay = () => {
          console.log('Video started playing:', videoUrl);
        };

        const handleEnded = () => {
          console.log('Video ended, triggering onEnded:', videoUrl);
          onEnded();
        };
        
        const handleError = (e: Event) => {
          console.error('Video loading error:', e);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('play', handlePlay);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);

        // Cleanup function
        return () => {
          console.log('Cleaning up video:', videoUrl);
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('play', handlePlay);
          video.removeEventListener('ended', handleEnded);
          video.removeEventListener('error', handleError);
          video.pause();
          video.src = '';
          video.load();
          
          // Release any object URLs if they were used
          if (video.src.startsWith('blob:')) {
            URL.revokeObjectURL(video.src);
          }
        };
      }
    }, [videoUrl, onEnded]);

    return (
      <video
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          localRef.current = node;
        }}
        autoPlay
        muted={isMuted}
        loop={false}
        playsInline
        className={`w-full h-full object-cover ${className}`}
        style={{ 
          willChange: 'transform', 
          transform: 'translate3d(0,0,0)',
          ...style 
        }}
        src={videoUrl}
        onEnded={onEnded}
      />
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
