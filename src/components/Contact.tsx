
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface ContactProps {
  title?: string;
  subtitle?: string;
  callToAction?: string;
  year?: string;
}

const Contact = ({
  title = "Our dream clients aren't brands— they're people. Bold, brave, curious and forever obsessed with building meaningful experiences.",
  subtitle = "If that sounds like you, we would love to work together.",
  callToAction = "LET'S TALK",
  year = "10kR ©2025"
}: ContactProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return (
    <section className={`w-full bg-[#132ABC] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? 
          <div className="flex flex-col min-h-screen justify-between py-12 px-6">
            <div className="mt-16">
              <h1 className="text-4xl font-medium text-brand-pink slide-in-left font-barlow leading-tight" style={{
                fontWeight: 500,
              }}>
                {title}
              </h1>
              <p className="text-brand-pink mt-12 fade-in-delay-1 font-barlow font-medium text-xl">
                {subtitle}
              </p>
              <div className="mt-6 fade-in-delay-2">
                <Button
                  className="bg-brand-pink hover:bg-brand-pink/90 text-[#132ABC] font-medium px-6 py-3 rounded-sm"
                  onClick={() => console.log("Let's talk button clicked")}
                >
                  {callToAction}
                </Button>
              </div>
            </div>
            <div className="mb-16">
              <div className="font-medium text-brand-pink fade-in-delay-2 text-sm">
                {year}
              </div>
              <div className="mt-4">
                <a href="https://linkedin.com" className="text-brand-pink block font-medium text-sm hover:underline mb-2">LINKEDIN</a>
                <a href="https://instagram.com" className="text-brand-pink block font-medium text-sm hover:underline">INSTAGRAM</a>
              </div>
            </div>
          </div> : 
          <div className="flex flex-col justify-between h-full px-6 py-[40px]">
            <div className="flex-1">
              <div className="h-full flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-8 mt-10">
                  <div className="col-span-1">
                    <h1 className="text-4xl font-medium text-brand-pink slide-in-left font-barlow leading-tight">
                      {title}
                    </h1>
                  </div>
                  <div>
                    {/* Empty column for spacing */}
                  </div>
                  <div className="col-span-1">
                    <p className="text-brand-pink slide-in-right text-xl font-barlow font-medium mb-6">
                      {subtitle}
                    </p>
                    <div className="fade-in" style={{ animationDelay: '0.3s' }}>
                      <Button
                        className="bg-brand-pink hover:bg-brand-pink/90 text-[#132ABC] font-medium px-6 py-3 rounded-sm"
                        onClick={() => console.log("Let's talk button clicked")}
                      >
                        {callToAction}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="font-medium text-brand-pink fade-in-delay-2 text-sm">
                    {year}
                  </div>
                  <div className="flex items-center gap-6">
                    <a href="https://linkedin.com" className="text-brand-pink font-medium text-sm hover:underline fade-in-delay-2">LINKEDIN</a>
                    <a href="https://instagram.com" className="text-brand-pink font-medium text-sm hover:underline fade-in-delay-2">INSTAGRAM</a>
                  </div>
                  <div className="text-brand-pink text-[10rem] font-extrabold opacity-90">
                    <div className="fade-in-delay-1" style={{ fontWeight: 800, fontStyle: 'italic' }}>
                      10KR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default Contact;
