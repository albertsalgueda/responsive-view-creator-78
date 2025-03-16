
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Main3Props {
  subtitle?: string;
}

const Main3 = ({
  subtitle = "The design studio of the future— where people and robots collaborate together to build intelligent experiences that benefit us all."
}: Main3Props) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return (
    <section className={`w-full bg-[#105A43] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full">
        {isMobile ?
          // Mobile layout
          <div className="flex flex-col min-h-screen justify-center py-12 px-6">
            <div className="mt-0">
              <p className="text-[#97ECCF] mt-6 text-xl fade-in-delay-1 max-w-[90%] font-barlow font-medium">
                {subtitle}
              </p>
            </div>
          </div> :
          // Desktop layout - full screen with no scrolling
          <div className="flex flex-col h-full justify-between px-6 py-[32px]">
            <div className="flex items-center justify-center flex-1 py-0">
              <div className="w-1/2">
                <p className="text-[#97ECCF] text-2xl slide-in-right max-w-xl font-barlow font-medium">
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
