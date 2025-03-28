
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Main3Props {
  text?: string;
}

const Main3 = ({
  text = "We provide comprehensive digital services, including brand, product, marketing and content creation, that helps brands evolve."
}: Main3Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-fit h-auto' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full">
        {isMobile ?
          // Mobile layout - content-based height with padding
          <div className="grid grid-cols-3 gap-4 h-auto py-16 px-6">
            <div className="col-span-3 pt-6 py-0">
              <p style={{
                lineHeight: 1.2,
                color: textColor,
                transition: transition
              }} className="fade-in-delay-1 font-barlow font-medium text-text-large-mobile">
                {text}
              </p>
            </div>
          </div> :
          // Desktop layout - full screen with no scrolling
          <div className="flex flex-col h-full justify-between pr-[25%] w-full pt-[25vh] px-[40px]">
            <div className="">
              <div className="w-full">
                <p style={{
                  lineHeight: 1.2,
                  color: textColor,
                  transition: transition,
                  width: '100%'
                }} className="slide-in-left font-barlow font-medium text-text-large-desktop">
                  {text}
                </p>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main3;
