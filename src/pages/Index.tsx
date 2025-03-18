
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { ViewProvider } from "@/context/ViewContext";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { useBackgroundTransition } from "@/hooks/use-background-transition";

const SectionObserver = () => {
  useSectionObserver();
  return null;
};

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const scrollProgress = useBackgroundTransition();
  
  // Calculate the background color based on scroll progress
  const getBgColor = () => {
    // Interpolate between brand-blue (#132ABC) and brand-pink (#FDB0C2)
    const r = Math.round(19 + (253 - 19) * scrollProgress);
    const g = Math.round(42 + (176 - 42) * scrollProgress);
    const b = Math.round(188 + (194 - 188) * scrollProgress);
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  const bgStyle = {
    background: getBgColor(),
    transition: 'background 0.1s ease-out',
  };

  useEffect(() => {
    setMounted(true);
    
    // Log the current background color for debugging
    console.info(`Current bg color: ${getBgColor()}`);
    console.info(`Current scrollProgress in Index: ${scrollProgress}`);
  }, [scrollProgress]);

  if (!mounted) return null;

  // On mobile, stack the components vertically
  if (isMobile) {
    return (
      <ViewProvider>
        <SectionObserver />
        <main className="min-h-screen" style={bgStyle}>
          <Navigation />
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
      </ViewProvider>
    );
  }

  // On desktop, use a horizontal scrolling container with explicit overflow-x-auto class
  return (
    <ViewProvider>
      <SectionObserver />
      <div className="h-screen w-screen overflow-x-auto scrollbar-hide" style={bgStyle}>
        <Navigation />
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
          <div id="main3" className="h-screen w-1/2 flex-shrink-0">
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
    </ViewProvider>
  );
};

export default Index;
