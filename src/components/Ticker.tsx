
import { useSectionColors } from "@/hooks/use-section-colors";
import { useEffect, useRef, useState } from "react";

const Ticker = () => {
  const { textColor, transition } = useSectionColors();
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track cloned elements for cleanup
  const [clones, setClones] = useState<HTMLElement[]>([]);

  // The ticker text content
  const tickerText = "From the folks who… Built a $100M ARR Design & Innovation Agency • Launched the 51st App in the App Store • Designed Xbox's First Interface • Launched 2 x Unicorn IPOs • Created the World's First AI Creative Director • Reimagined Audi's Automotive Digital Evosystem • Built The AI Platform That Supercharges Entrepreneurs • Produced the Viral Steph Curry Anthem • Launched Nike's Acclaimed Run London Campaign • Created The World's Coolest Basketball Court";

  useEffect(() => {
    const container = containerRef.current;
    const ticker = tickerRef.current;
    
    if (!container || !ticker) return;
    
    // Reset any previous clones on re-render
    clones.forEach(clone => clone.remove());
    setClones([]);
    
    // Function to check if an element needs to be cloned
    const checkPosition = () => {
      const containerWidth = container.offsetWidth;
      const tickerWidth = ticker.scrollWidth;
      
      // We need at least enough copies to fill the container twice
      // (one for viewing, one for scrolling in)
      const neededCopies = Math.ceil(containerWidth * 2 / tickerWidth) + 1;
      
      const currentClones = Array.from(ticker.querySelectorAll('.ticker-clone'));
      
      // Create additional clones if needed
      if (currentClones.length < neededCopies) {
        const span = ticker.querySelector('span');
        if (!span) return;
        
        const newClones: HTMLElement[] = [];
        
        for (let i = currentClones.length; i < neededCopies; i++) {
          const clone = span.cloneNode(true) as HTMLElement;
          clone.classList.add('ticker-clone');
          ticker.appendChild(clone);
          newClones.push(clone);
        }
        
        setClones(prev => [...prev, ...newClones]);
      }
    };
    
    // Check if we need to add clones initially
    checkPosition();
    
    // Create the infinite scrolling effect
    let animationId: number;
    let lastTimestamp = 0;
    const speed = 50; // pixels per second
    let progress = 0;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      if (elapsed > 0) {
        // Move the ticker based on elapsed time
        progress += (speed * elapsed) / 1000;
        
        if (ticker.firstElementChild) {
          const firstElement = ticker.firstElementChild as HTMLElement;
          
          // When the first element is scrolled out of view, move it to the end
          if (progress >= firstElement.offsetWidth) {
            ticker.appendChild(firstElement);
            progress = 0;
            
            // Re-check if we need more clones
            checkPosition();
          }
          
          // Apply the movement
          ticker.style.transform = `translateX(${-progress}px)`;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationId = requestAnimationFrame(animate);
    
    // Handle resize events
    const handleResize = () => {
      checkPosition();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clones.forEach(clone => clone.remove());
    };
  }, [clones]);

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-[32px] overflow-hidden"
      style={{ maxWidth: '100vw' }}
    >
      <div 
        ref={tickerRef}
        className="whitespace-nowrap text-small flex items-center h-full w-max"
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
