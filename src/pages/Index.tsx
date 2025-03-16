
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // On desktop, use Carousel for horizontal scrolling with better trackpad support
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Carousel 
        className="h-screen w-screen" 
        opts={{
          align: "start",
          dragFree: true,
          skipSnaps: true,
          loop: false,
          dragThreshold: 10, // Lower threshold for easier trackpad dragging
        }}
      >
        <CarouselContent className="h-screen">
          <CarouselItem className="h-screen">
            <Main1 />
          </CarouselItem>
          <CarouselItem className="h-screen">
            <Main2 
              title="Prompting human potential." 
              subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
              description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
              ctaText=""
            />
          </CarouselItem>
        </CarouselContent>
        
        {/* Navigation buttons */}
        <CarouselPrevious className="left-4 z-10" />
        <CarouselNext className="right-4 z-10" />
      </Carousel>
      
      {/* Additional navigation instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 flex items-center space-x-4">
        <span>← Swipe or use arrow keys →</span>
      </div>
    </div>
  );
};

export default Index;
