
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Services1Props {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

const Services1 = ({
  title = "Our Services",
  subtitle = "Comprehensive digital solutions for modern businesses",
  description = "From brand identity to product development, we provide end-to-end services that bring your vision to life and connect with your audience.",
  ctaText = "LEARN MORE",
  ctaAction = () => console.log("Services CTA clicked")
}: Services1Props) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return (
    <section className={`w-full bg-[#105A43] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? 
          <div className="flex flex-col min-h-screen justify-between py-12 px-6">
            <div className="mt-16">
              <h1 className="text-[4.5rem] font-extrabold text-[#97ECCF] slide-in-left font-barlow" style={{
                lineHeight: 1,
                fontWeight: 800,
                fontStyle: 'italic'
              }}>
                {title}
              </h1>
              <p className="text-[#97ECCF] mt-6 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-xl">
                {subtitle}
              </p>
              <p className="text-[#97ECCF] mt-8 fade-in-delay-2 max-w-[66%] font-barlow font-medium ml-auto text-left text-base">
                {description}
              </p>
            </div>
            {ctaText && 
              <div className="mb-16 fade-in-delay-2 flex justify-end">
                <button 
                  onClick={ctaAction} 
                  className="bg-[#97ECCF] text-[#105A43] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow"
                >
                  {ctaText}
                </button>
              </div>
            }
          </div> : 
          <div className="flex flex-col justify-between h-full px-6 py-[40px]">
            <div className="flex-1">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h1 
                    style={{
                      lineHeight: 1,
                      fontWeight: 800,
                      fontStyle: 'italic'
                    }} 
                    className="text-[4.5rem] font-extrabold text-[#97ECCF] slide-in-left font-barlow mt-10 my-0"
                  >
                    {title}
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-12">
                  <div className="col-span-1 col-start-2 flex flex-col justify-end">
                    <p className="text-[#97ECCF] text-xl slide-in-right font-barlow font-medium mb-0">
                      {subtitle}
                    </p>
                  </div>
                  <div className="col-span-1 col-start-3 flex flex-col justify-end">
                    <p className="text-[#97ECCF] text-xl slide-in-right font-barlow font-medium mb-0">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {ctaText && 
              <div className="fade-in mt-4 flex justify-end mb-6">
                <button 
                  onClick={ctaAction} 
                  className="bg-[#97ECCF] text-[#105A43] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow"
                >
                  {ctaText}
                </button>
              </div>
            }
          </div>
        }
      </div>
    </section>
  );
};

export default Services1;
