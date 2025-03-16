
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import Image1 from "@/components/Image1";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <Image1 />
      </main>
    );
  }

  // On desktop, use a horizontal scrolling container
  return (
    <ScrollArea orientation="horizontal" className="h-screen w-screen overflow-x-auto scrollbar-hide">
      <div className="flex h-screen">
        <div className="h-screen w-screen flex-shrink-0">
          <Main1 />
        </div>
        <div className="h-screen w-screen flex-shrink-0">
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
        <Image1 />
      </div>
    </ScrollArea>
  );
};

export default Index;
