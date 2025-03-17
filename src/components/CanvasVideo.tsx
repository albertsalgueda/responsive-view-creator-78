
import { useEffect, useRef } from "react";

interface CanvasVideoProps {
  mainVideoRef: React.RefObject<HTMLVideoElement>;
  className?: string;
}

const CanvasVideo = ({ mainVideoRef, className = "" }: CanvasVideoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const mainVideo = mainVideoRef.current;

    if (!canvas || !mainVideo) return;

    const drawCanvas = () => {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx && mainVideo) {
        // Only update canvas dimensions if they don't match video dimensions
        if (canvas.width !== mainVideo.videoWidth || canvas.height !== mainVideo.videoHeight) {
          canvas.width = mainVideo.videoWidth;
          canvas.height = mainVideo.videoHeight;
        }
        
        // Use optimized drawing settings
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(mainVideo, 0, 0, canvas.width, canvas.height);
      }
      animationFrameRef.current = requestAnimationFrame(drawCanvas);
    };

    const startDrawing = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      drawCanvas();
    };

    mainVideo.addEventListener('play', startDrawing);

    return () => {
      mainVideo.removeEventListener('play', startDrawing);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mainVideoRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover will-change-transform ${className}`}
      style={{ transform: 'translate3d(0,0,0)' }}
    />
  );
};

export default CanvasVideo;
