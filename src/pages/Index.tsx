import Navigation from "@/components/Navigation";
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import Main3 from "@/components/Main3";
import Main4 from "@/components/Main4";
import Team from "@/components/Team";
import Services1 from "@/components/Services1";
import Services2 from "@/components/Services2";
import Services3 from "@/components/Services3";
import Contact from "@/components/Contact";
import Image1 from "@/components/Image1";
import Image2 from "@/components/Image2";
import Image3 from "@/components/Image3";
import Image4 from "@/components/Image4";
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
  
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    console.log("Global mute toggle called, current state:", isMuted);
    setIsMuted(prevState => {
      const newState = !prevState;
      console.log("Setting new global mute state:", newState);
      return newState;
    });
  };
  
  useEffect(() => {
    setMounted(true);
    console.log("Index component initialized with isMuted:", isMuted);
  }, []);

  useEffect(() => {
    console.log("Index mute state changed to:", isMuted);
  }, [isMuted]);

  if (!mounted) return null;

  return (
    <ViewProvider>
      <Navigation />
      <ParallaxOverlay />
      <SectionObserverWithBackground isMuted={isMuted} toggleMute={toggleMute} />
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </ViewProvider>
  );
};

const SectionObserverWithBackground = ({ 
  isMuted, 
  toggleMute 
}: { 
  isMuted: boolean; 
  toggleMute: () => void;
}) => {
  const { currentSection } = useSectionObserver();
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { backgroundColor, transition } = useSectionColors();
  
  useEffect(() => {
    console.log("SectionObserverWithBackground received isMuted:", isMuted);
  }, [isMuted]);
  
  useEffect(() => {
    if (isMobile || !scrollContainerRef.current) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        scrollContainerRef.current.scrollLeft += delta;
      }
    };
    
    const container = scrollContainerRef.current;
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
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
      <main className="will-change-auto" style={bgStyle}>
        <div id="video" className="min-h-screen"><VideoSection isMuted={isMuted} /></div>
        <div id="main1" className="h-auto"><Main1 /></div>
        <Image1 />
        <div id="main2" className="h-auto">
          <Main2 
            title="Prompting human potential." 
            text1="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            text2="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
        <Image2 />
        <div id="main3" className="h-auto"><Main3 /></div>
        <div id="services1" className="h-auto"><Services1 /></div>
        <div id="services2" className="h-auto"><Services2 /></div>
        <div id="services3" className="h-auto"><Services3 /></div>
        <Image3 />
        <div id="team" className="h-auto"><Main4 /></div>
        <div id="team-members" className="h-auto"><Team /></div>
        <Image4 />
        <div id="contact" className="h-auto"><Contact /></div>
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
          <VideoSection isMuted={isMuted} />
        </div>
        <div id="main1" className="h-screen w-screen flex-shrink-0">
          <Main1 />
        </div>
        <Image1 />
        <div id="main2" className="h-screen w-screen flex-shrink-0">
          <Main2 
            title="Prompting human potential." 
            text1="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            text2="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
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
        <div id="team" className="h-screen w-2/3 flex-shrink-0">
          <Main4 />
        </div>
        <div id="team-members" className="h-screen w-fit flex-shrink-0" style={{ width: 'fit-content' }}>
          <Team />
        </div>
        <Image4 />
        <div id="contact" className="h-screen w-screen flex-shrink-0">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Index;
