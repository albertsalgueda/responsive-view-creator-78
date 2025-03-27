
import { useState, useRef, useCallback, useEffect } from "react";

export const useVideoControl = (initialVideos: string[], externalIsMuted: boolean) => {
  const initialVideoIndex = useRef(Math.floor(Math.random() * initialVideos.length));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex.current);
  const isTransitioning = useRef(false);

  // Use the external mute state directly
  const isMuted = externalIsMuted;

  const currentVideoUrl = initialVideos[currentVideoIndex];

  const handleVideoClick = useCallback(() => {
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    const nextIndex = (currentVideoIndex + 1) % initialVideos.length;
    console.log('Video click - Current index:', currentVideoIndex, 'Next index:', nextIndex);
    setCurrentVideoIndex(nextIndex);
    
    // Reset transition lock after a short delay
    setTimeout(() => {
      isTransitioning.current = false;
    }, 100);
  }, [currentVideoIndex, initialVideos.length]);

  const handleVideoEnded = useCallback(() => {
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    const nextIndex = (currentVideoIndex + 1) % initialVideos.length;
    console.log('Video ended - Current index:', currentVideoIndex, 'Next index:', nextIndex);
    setCurrentVideoIndex(nextIndex);
    
    // Reset transition lock after a short delay
    setTimeout(() => {
      isTransitioning.current = false;
    }, 100);
  }, [currentVideoIndex, initialVideos.length]);

  // Log the muted state for debugging
  useEffect(() => {
    console.log("useVideoControl - isMuted state:", isMuted);
  }, [isMuted]);

  return {
    currentVideoUrl,
    isMuted,
    handleVideoClick,
    handleVideoEnded
  };
};
