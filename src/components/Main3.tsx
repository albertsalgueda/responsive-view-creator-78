
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
        <div className={`flex flex-col ${isMobile ? 'min-h-screen py-12' : 'h-full py-[32px]'} px-6 w-full`}>
          <div className={`${isMobile ? 'pt-6' : 'pt-12'} w-full`}>
            <p className="text-[#97ECCF] text-[2rem] fade-in-delay-1 w-full font-barlow font-medium max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main3;
