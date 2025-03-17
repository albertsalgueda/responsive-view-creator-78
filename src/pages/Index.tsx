
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";
import Main3 from "@/components/Main3";
import Services1 from "@/components/Services1";
import Services2 from "@/components/Services2";
import Services3 from "@/components/Services3";
import Image1 from "@/components/Image1";
import Image2 from "@/components/Image2";
import Image3 from "@/components/Image3";
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
        <Image1 />
        <Image2 />
        <Image3 />
        <Main3 />
        <Services1 />
        <Services2 />
        <Services3 />
      </main>
    );
  }

  // On desktop, use a horizontal scrolling container with explicit overflow-x-auto class
  return (
    <div className="h-screen w-screen overflow-x-auto scrollbar-hide">
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
        <Image2 />
        <Image3 />
        <div className="h-screen w-1/2 flex-shrink-0">
          <Main3 />
        </div>
        <div className="h-screen w-2/3 flex-shrink-0">
          <Services1 />
        </div>
        <div className="h-screen w-2/3 flex-shrink-0">
          <Services2 />
        </div>
        <div className="h-screen w-2/3 flex-shrink-0">
          <Services3 />
        </div>
      </div>
    </div>
  );
};

export default Index;
