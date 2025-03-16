
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobile && containerRef.current) {
      const container = containerRef.current;
      
      const handleWheel = (e: WheelEvent) => {
        if (container) {
          e.preventDefault();
          // Use deltaY (vertical scroll) to scroll horizontally
          // Multiply by 2 for smoother/faster scrolling
          container.scrollLeft += e.deltaY * 2;
        }
      };
      
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isMobile, mounted]);

  if (!mounted) return null;

  // On mobile, stack the components vertically
  if (isMobile) {
    return (
      <main className="min-h-screen">
        <Main1 />
        <Main2 
          title="Prompting human potential." 
          subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
          description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
          ctaText=""
        />
      </main>
    );
  }

  // On desktop, place them side by side with horizontal scrolling
  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
    >
      <div className="flex flex-row h-screen" style={{ width: "200vw" }}>
        <div className="w-screen h-full flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
          <Main1 />
        </div>
        <div className="w-screen h-full flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
