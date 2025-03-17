import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface ContactProps {
  title?: string;
  description?: string;
  callToAction?: string;
  callToActionText?: string;
}

const Contact = ({
  title = "Our dream clients aren't brands— they're people. Bold, brave, curious and forever obsessed with building meaningful experiences.",
  description = "If that sounds like you, we would love to work together.",
  callToAction = "#contact",
  callToActionText = "LET'S TALK",
}: ContactProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return (
    <section className={`w-full bg-[#0A2DD1] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full">
        {isMobile ? (
          // Mobile layout
          <div className="flex flex-col min-h-screen justify-between p-6">
            <div className="mt-16">
              <h2 className="text-[2.5rem] font-medium text-[#FFB0C9] slide-in-left font-barlow" style={{
                lineHeight: 1.1,
              }}>
                {title}
              </h2>
              
              <p className="text-[#FFB0C9] mt-8 fade-in-delay-1 font-barlow font-medium text-base">
                {description}
              </p>
              
              <div className="mt-6 fade-in-delay-2">
                <a href={callToAction}>
                  <Button 
                    className="bg-[#FFB0C9] text-[#0A2DD1] hover:bg-opacity-90 transition-all font-barlow px-6 py-3 rounded-sm font-medium text-base"
                  >
                    {callToActionText}
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="pb-16">
              <div className="my-8 border-t border-[#FFB0C9] opacity-30"></div>
              
              <div className="flex justify-between items-center">
                <p className="text-[#FFB0C9] text-sm font-barlow">10kR ©2025</p>
                <div className="flex flex-col items-end gap-2">
                  <a href="https://linkedin.com" className="text-[#FFB0C9] font-barlow text-sm hover:underline">LINKEDIN</a>
                  <a href="https://instagram.com" className="text-[#FFB0C9] font-barlow text-sm hover:underline">INSTAGRAM</a>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="text-[#FFB0C9] text-[12rem] font-bold leading-none" style={{ marginBottom: "-3rem" }}>
                  <span style={{ 
                    display: "inline-block", 
                    fontWeight: 800, 
                    transform: "scale(0.9, 1)",
                    transformOrigin: "left bottom"
                  }}>10KR</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout
          <div className="flex flex-col h-full justify-between px-6 py-[32px]">
            <div className="flex items-start pt-12 flex-1 py-0 w-full">
              <div className="w-full grid grid-cols-2 gap-12">
                <div className="col-span-1">
                  <h2 className="text-[4rem] font-medium text-[#FFB0C9] slide-in-left font-barlow" style={{
                    lineHeight: 1.1,
                  }}>
                    {title}
                  </h2>
                </div>
                
                <div className="col-span-1 flex flex-col">
                  <p className="text-[#FFB0C9] text-xl slide-in-right font-barlow font-medium mb-8">
                    {description}
                  </p>
                  
                  <div className="fade-in-delay-1">
                    <a href={callToAction}>
                      <Button 
                        className="bg-[#FFB0C9] text-[#0A2DD1] hover:bg-opacity-90 transition-all font-barlow px-6 py-3 rounded-sm font-medium text-base"
                      >
                        {callToActionText}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-end pb-4">
              <div className="text-[#FFB0C9] text-sm font-barlow">
                10kR ©2025
              </div>
              
              <div className="flex flex-col items-start gap-2">
                <a href="https://linkedin.com" className="text-[#FFB0C9] font-barlow text-sm hover:underline">LINKEDIN</a>
                <a href="https://instagram.com" className="text-[#FFB0C9] font-barlow text-sm hover:underline">INSTAGRAM</a>
              </div>
              
              <div className="text-[#FFB0C9] text-[16rem] font-bold leading-none" style={{ marginBottom: "-3rem" }}>
                <span style={{ 
                  display: "inline-block", 
                  fontWeight: 800, 
                  transform: "scale(0.9, 1)",
                  transformOrigin: "right bottom"
                }}>10KR</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
