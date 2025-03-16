
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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

  // On desktop, use Carousel with proper horizontal scrolling settings
  return (
    <Carousel 
      className="h-screen w-screen overflow-visible" 
      opts={{
        align: "start",
        loop: false,
        dragFree: true,
        containScroll: "trimSnaps",
        axis: "x",
        slidesToScroll: 1,
        breakpoints: {
          "(min-width: 768px)": {
            active: true,
          }
        },
      }}
    >
      <CarouselContent className="h-screen -ml-0">
        <CarouselItem className="h-screen pl-0 w-screen flex-shrink-0">
          <Main1 />
        </CarouselItem>
        <CarouselItem className="h-screen pl-0 w-screen flex-shrink-0">
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Index;
