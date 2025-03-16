
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Main3Props {
  subtitle?: string;
}

const Main3 = ({
  subtitle = "We create value for businesses by creating valuable experiences for their customers. We provide comprehensive digital services, including brand, product, marketing and content creation, that helps brands evolve."
}: Main3Props) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return (
    <section className={`w-full bg-[#105A43] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full">
        {isMobile ?
          // Mobile layout - anchored to top
          <div className="flex flex-col min-h-screen py-12 px-6 w-full items-start">
            <div className="w-full pt-6">
              <p className="text-[#97ECCF] text-[2rem] fade-in-delay-1 w-full font-barlow font-medium">
                {subtitle}
              </p>
            </div>
          </div> :
          // Desktop layout - full screen with no scrolling
          <div className="flex flex-col h-full justify-between px-6 py-[32px] w-full">
            <div className="flex items-start pt-12 flex-1 py-0 w-full">
              <div className="w-full">
                <p className="text-[#97ECCF] text-2xl slide-in-right w-full font-barlow font-medium">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default Main3;
