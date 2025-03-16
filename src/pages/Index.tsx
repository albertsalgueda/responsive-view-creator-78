
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  // On desktop, place them side by side with horizontal scrolling
  return (
    <ScrollArea className="h-screen w-screen">
      <div className="flex flex-row h-screen" style={{ width: "200vw" }}>
        <div className="w-screen h-full flex-shrink-0">
          <Main1 />
        </div>
        <div className="w-screen h-full flex-shrink-0">
          <Main2 
            title="Prompting human potential." 
            subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
            description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
            ctaText=""
          />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Index;
