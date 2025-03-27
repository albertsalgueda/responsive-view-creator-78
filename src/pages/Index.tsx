
import Navigation from "@/components/Navigation";
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import Main3 from "@/components/Main3";
import Services1 from "@/components/Services1";
import Services2 from "@/components/Services2";
import Services3 from "@/components/Services3";
import Contact from "@/components/Contact";
import Image1 from "@/components/Image1";
import Image2 from "@/components/Image2";
import Image3 from "@/components/Image3";
import VideoSection from "@/components/VideoSection";
import ParallaxOverlay from "@/components/ParallaxOverlay";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";
import { ViewProvider } from "@/context/ViewContext";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { useBackgroundTransition } from "@/hooks/use-background-transition";
import { useSectionColors } from "@/hooks/use-section-colors";
import MuteButton from "@/components/MuteButton";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const scrollProgress = useBackgroundTransition();
  
  // State for muting/unmuting videos
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    console.log("Global mute toggle called, current state:", isMuted);
    setIsMuted(prev => !prev);
  };
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ViewProvider>
      <Navigation />
      <ParallaxOverlay />
      <SectionObserverWithBackground isMuted={isMuted} />
      {/* MuteButton at the root level */}
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </ViewProvider>
  );
};

const SectionObserverWithBackground = ({ isMuted }: { isMuted: boolean }) => {
  const { currentSection } = useSectionObserver();
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { backgroundColor, transition } = useSectionColors();
  
  useEffect(() => {
    if (isMobile || !scrollContainerRef.current) return;
    
    // Improved wheel event handler for horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        
        // Determine scroll direction and amount
        // Use deltaY for vertical wheels and deltaX for horizontal wheels
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        
        // Apply scroll with a multiplier for better response
        scrollContainerRef.current.scrollLeft += delta;
      }
    };
    
    const container = scrollContainerRef.current;
    
    // Add wheel event listener
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      // Remove wheel event listener on cleanup
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile]);
  
  const bgStyle = {
    background: backgroundColor,
    transition: transition,
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)'
  };

  if (isMobile) {
    return (
      <main className="min-h-screen will-change-auto" style={bgStyle}>
        <div id="video"><VideoSection /></div>
        <div id="main1"><Main1 /></div>
        <Image1 />
        <div id="main2">
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
        <Image2 />
        <div id="main3"><Main3 /></div>
        <div id="services1"><Services1 /></div>
        <div id="services2"><Services2 /></div>
        <div id="services3"><Services3 /></div>
        <Image3 />
        <div id="contact"><Contact /></div>
      </main>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-screen overflow-x-auto scrollbar-hide will-change-auto"
      style={{ 
        ...bgStyle,
        cursor: 'auto',
      }}
    >
      <div className="flex h-screen">
        <div id="video" className="h-screen w-screen flex-shrink-0">
          <VideoSection />
        </div>
        <div id="main1" className="h-screen w-screen flex-shrink-0">
          <Main1 />
        </div>
        <Image1 />
        <div id="main2" className="h-screen w-screen flex-shrink-0">
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
        <Image2 />
        <div id="main3" className="h-screen w-2/3 flex-shrink-0">
          <Main3 />
        </div>
        <div id="services1" className="h-screen w-2/3 flex-shrink-0">
          <Services1 />
        </div>
        <div id="services2" className="h-screen w-2/3 flex-shrink-0">
          <Services2 />
        </div>
        <div id="services3" className="h-screen w-2/3 flex-shrink-0">
          <Services3 />
        </div>
        <Image3 />
        <div id="contact" className="h-screen w-screen flex-shrink-0">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Index;
