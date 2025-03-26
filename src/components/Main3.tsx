
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Main3Props {
  subtitle?: string;
}

const Main3 = ({
  subtitle = "We provide comprehensive digital services, including brand, product, marketing and content creation, that helps brands evolve."
}: Main3Props) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const {
    textColor,
    transition
  } = useSectionColors();

  useEffect(() => {
    setMounted(true);
  }, [isMobile]);

  if (!mounted) return null;

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full">
        {isMobile ?
      // Mobile layout - anchored to top
      <div className="flex flex-col min-h-screen py-12 px-6 w-full items-start">
            <div className="w-full pt-6">
              <p className="text-[2rem] fade-in-delay-1 w-full font-barlow font-medium" style={{
            color: textColor,
            transition: transition
          }}>
                {subtitle}
              </p>
            </div>
          </div> :
      // Desktop layout - full screen with no scrolling
      <div className="flex flex-col h-full justify-between px-6 w-full py-[144px]">
            <div className="">
              <div className="w-full">
                <p style={{
              color: textColor,
              transition: transition
            }} className="slide-in-right w-full font-barlow font-medium text-3xl">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main3;
