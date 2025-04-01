import { useSectionColors } from "@/hooks/use-section-colors";
import { useEffect, useRef, useState } from "react";

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  
  // The ticker text content
  const tickerText = "From the Folks That… Built a $100M ARR Design & Innovation Agency • Launched the 51st App in the App Store • Designed Xbox's First Interface • Launched 2x Unicorn IPOs • Created the World's First AI Creative Director • Reimagined Audi's Automotive Digital Ecosystem • Built the AI Platform That Supercharges Entrepreneurs • Produced the Viral Steph Curry Anthem • Launched Nike's Acclaimed Run London • Created the World's Coolest Basketball Court • Helped Drive Universal Music's Data Transformation • Won Customer Experience Agency of the Year";

  useEffect(() => {
    const container = containerRef.current;
    const ticker = tickerRef.current;
    
    if (!container || !ticker) return;
    
    // Clone the first text element to ensure continuous scrolling
    const createClones = () => {
      const containerWidth = container.offsetWidth;
      const firstItem = ticker.firstElementChild as HTMLElement;
      
      if (!firstItem) return;
      
      const itemWidth = firstItem.offsetWidth;
      
      // Calculate how many clones we need to fill the container at least twice
      const neededCopies = Math.ceil((containerWidth * 2) / itemWidth) + 1;
      
      // Remove any existing clones
      const existingClones = ticker.querySelectorAll('.clone-item');
      existingClones.forEach(clone => clone.remove());
      
      // Create new clones
      for (let i = 0; i < neededCopies; i++) {
        const clone = firstItem.cloneNode(true) as HTMLElement;
        clone.classList.add('clone-item');
        ticker.appendChild(clone);
      }
    };
    
    // Initialize clones
    createClones();
    
    // Set up the animation
    let lastTimestamp = 0;
    const speed = 50; // pixels per second
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      if (elapsed > 0) {
        // Update progress based on elapsed time
        progressRef.current += (speed * elapsed) / 1000;
        
        if (ticker.firstElementChild) {
          const firstElement = ticker.firstElementChild as HTMLElement;
          
          // When the first element is scrolled out of view, move it to the end
          if (progressRef.current >= firstElement.offsetWidth) {
            ticker.appendChild(firstElement);
            progressRef.current = 0;
          }
          
          // Apply the movement
          ticker.style.transform = `translateX(${-progressRef.current}px)`;
        }
      }
      
      // Continue the animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle resize events
    const handleResize = () => {
      createClones();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-[32px] overflow-hidden"
      style={{ maxWidth: '100vw' }}
    >
      <div 
        ref={tickerRef}
        className="whitespace-nowrap text-text-small flex items-center h-full w-max"
        style={{ 
          color: textColor,
          transition: transition
        }}
      >
        <span className="mr-8 inline-block">
          {tickerText}
        </span>
      </div>
    </div>
  );
};

export default Ticker;
