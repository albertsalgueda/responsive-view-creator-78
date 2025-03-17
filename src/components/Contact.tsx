
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

  const Logo = () => (
    <svg width="100%" height="100%" viewBox="0 0 343 153" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M165.99 38.1758C165.99 45.1565 164.316 51.5555 160.968 57.3727C157.474 63.19 152.889 67.8438 147.212 71.3342C141.389 74.6791 134.911 76.3515 127.778 76.3515H38.2119C31.079 76.3515 24.674 74.6791 18.9968 71.3342C13.174 67.8438 8.58858 63.19 5.24049 57.3727C1.74683 51.5555 3.05426e-07 45.1565 0 38.1758C-3.05426e-07 31.1951 1.74682 24.7961 5.24049 18.9788C8.58858 13.1616 13.174 8.58047 18.9968 5.23555C24.674 1.74519 31.079 3.83964e-06 38.2119 3.52814e-06L127.778 0C134.911 -3.11493e-07 141.389 1.74518 147.212 5.23554C152.889 8.58047 157.474 13.1616 160.968 18.9788C164.316 24.7961 165.99 31.1951 165.99 38.1758ZM137.168 38.1758C137.168 36.576 136.658 35.2671 135.639 34.2491C134.475 33.2311 133.164 32.7221 131.709 32.7221L34.0632 32.7221C32.462 32.7221 31.1518 33.2311 30.1328 34.2491C28.9683 35.2671 28.386 36.576 28.386 38.1758C28.386 39.7755 28.9683 41.1571 30.1328 42.3206C31.1518 43.3386 32.462 43.8476 34.0632 43.8476L131.709 43.8476C133.164 43.8476 134.475 43.3386 135.639 42.3206C136.658 41.1571 137.168 39.7755 137.168 38.1758Z" fill="#FFB0C9"/>
      <path d="M266.567 152.703V0H299.975C307.836 0 315.042 1.96332 321.592 5.88997C328.143 9.6712 333.31 14.834 337.095 21.3784C341.026 27.7774 342.991 34.9763 342.991 42.975V68.4982C342.991 72.2795 342.045 77.2241 340.152 83.3322C338.26 89.2949 334.693 94.6759 329.453 99.4752V102.747L342.991 152.703H310.238L301.067 110.601H299.102V152.703H266.567ZM299.102 82.4597H300.849C303.469 82.4597 305.652 81.7325 307.399 80.2782C309.292 78.6784 310.238 74.7518 310.238 68.4982V42.3206C310.238 36.2124 309.292 32.3585 307.399 30.7588C305.652 29.159 303.469 28.3591 300.849 28.3591H299.102V82.4597Z" fill="#FFB0C9"/>
      <path d="M176.97 152.703V0H209.505V43.6295H211.688L220.641 0H253.394V4.36295L231.559 66.3168V69.589L253.394 148.34V152.703H220.641L211.688 105.583H209.505V152.703H176.97Z" fill="#FFB0C9"/>
      <path d="M135.639 152.612H163.806V89.5126H2.18315V124.491L30.9852 152.612H63.759V143.907L43.2868 121.927H135.639V152.612Z" fill="#FFB0C9"/>
    </svg>
  );
  
  return (
    <section className={`w-full bg-[#0A2DD1] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full">
        {isMobile ? (
          // Mobile layout
          <div className="flex flex-col min-h-screen justify-between p-6">
            <div className="mt-16">
              <h2 className="text-xl font-medium text-[#FFB0C9] slide-in-left font-barlow" style={{
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
                    className="bg-[#FFB0C9] text-[#0A2DD1] hover:bg-[#FFB0C9]/80 transition-all font-barlow px-6 py-3 rounded-sm font-medium text-base"
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
              
              <div className="mt-6 w-full" style={{ maxWidth: "200px", height: "auto" }}>
                <Logo />
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout
          <div className="flex flex-col h-full justify-between px-6 py-[32px]">
            <div className="flex items-start pt-12 flex-1 py-0 w-full">
              <div className="w-full grid grid-cols-2 gap-12">
                <div className="col-span-1">
                  <h2 className="text-2xl font-medium text-[#FFB0C9] slide-in-left font-barlow" style={{
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
                        className="bg-[#FFB0C9] text-[#0A2DD1] hover:bg-[#FFB0C9]/80 transition-all font-barlow px-6 py-3 rounded-sm font-medium text-base"
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
              
              <div style={{ width: "280px", height: "auto" }}>
                <Logo />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
