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
import { useVideoControl } from "@/hooks/useVideoControl";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const scrollProgress = useBackgroundTransition();
  
  // Get the global video control state to pass to the MuteButton
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
  const { isMuted, toggleMute } = useVideoControl(videos);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ViewProvider>
      <Navigation />
      <ParallaxOverlay />
      <SectionObserverWithBackground />
      {/* MuteButton placed at the root level outside of any scrollable container */}
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </ViewProvider>
  );
};

const SectionObserverWithBackground = () => {
  const { currentSection } = useSectionObserver();
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { backgroundColor, transition } = useSectionColors();
  
  useEffect(() => {
    if (isMobile || !scrollContainerRef.current) return;
    
    // Enhanced wheel event handler for smoother scrolling
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        
        // Make horizontal scrolling more responsive by adjusting the multiplier
        const scrollAmount = e.deltaY * 1.5;
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    };
    
    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      
      const scrollDistance = window.innerWidth * 0.5; // Scroll by half the viewport width
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollContainerRef.current.scrollBy({
          left: scrollDistance,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollContainerRef.current.scrollBy({
          left: -scrollDistance,
          behavior: 'smooth'
        });
      }
    };
    
    // Add drag-to-scroll functionality
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    
    const handleMouseDown = (e: MouseEvent) => {
      if (!scrollContainerRef.current) return;
      
      isDown = true;
      scrollContainerRef.current.style.cursor = 'grabbing';
      startX = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    };
    
    const handleMouseUp = () => {
      if (!scrollContainerRef.current) return;
      
      isDown = false;
      scrollContainerRef.current.style.cursor = 'auto';
    };
    
    const handleMouseLeave = () => {
      if (!scrollContainerRef.current) return;
      
      isDown = false;
      scrollContainerRef.current.style.cursor = 'auto';
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown || !scrollContainerRef.current) return;
      
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the multiplier for sensitivity
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
    
    const container = scrollContainerRef.current;
    
    // Add all event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      // Remove all event listeners on cleanup
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
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
        scrollSnapType: 'x mandatory'
      }}
    >
      <div className="flex h-screen">
        <div id="video" className="h-screen w-screen flex-shrink-0 scroll-snap-align-start">
          <VideoSection />
        </div>
        <div id="main1" className="h-screen w-screen flex-shrink-0 scroll-snap-align-start">
          <Main1 />
        </div>
        <Image1 />
        <div id="main2" className="h-screen w-screen flex-shrink-0 scroll-snap-align-start">
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
        <Image2 />
        <div id="main3" className="h-screen w-2/3 flex-shrink-0 scroll-snap-align-start">
          <Main3 />
        </div>
        <div id="services1" className="h-screen w-2/3 flex-shrink-0 scroll-snap-align-start">
          <Services1 />
        </div>
        <div id="services2" className="h-screen w-2/3 flex-shrink-0 scroll-snap-align-start">
          <Services2 />
        </div>
        <div id="services3" className="h-screen w-2/3 flex-shrink-0 scroll-snap-align-start">
          <Services3 />
        </div>
        <Image3 />
        <div id="contact" className="h-screen w-screen flex-shrink-0 scroll-snap-align-start">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Index;
