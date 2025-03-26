
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
  const {
    textColor,
    transition
  } = useSectionColors();

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full">
        {isMobile ?
      // Mobile layout - anchored to top
      <div className="flex flex-col h-fit py-12 px-6 w-full items-start">
            <div className="w-full pt-6">
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition
          }} className="fade-in-delay-1 w-full font-barlow font-medium text-2xl">
                {subtitle}
              </p>
            </div>
          </div> :
      // Desktop layout - full screen with no scrolling
      <div className="flex flex-col h-full justify-between pr-[24%] w-full pt-[20vh] px-[40px]">
            <div className="">
              <div className="w-full">
                <p style={{
              lineHeight: 1.1,
              color: textColor,
              transition: transition
            }} className="slide-in-left w-full font-barlow font-medium text-[4vh]">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main3;
