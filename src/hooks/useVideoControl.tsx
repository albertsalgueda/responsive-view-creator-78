
import { useState, useRef, useCallback } from "react";

export const useVideoControl = (initialVideos: string[]) => {
  const initialVideoIndex = useRef(Math.floor(Math.random() * initialVideos.length));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex.current);
  const [isMuted, setIsMuted] = useState(true);
  const isTransitioning = useRef(false);

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

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    currentVideoUrl,
    isMuted,
    handleVideoClick,
    handleVideoEnded,
    toggleMute
  };
};
