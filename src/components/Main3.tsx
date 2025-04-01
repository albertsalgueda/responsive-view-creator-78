
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Main3Props {
  title?: string;
  text?: string;
}

const Main3 = ({
  title = "Our services.",
  text = "Most teams don't need another list of services. They need real solutions to actual problems."
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
            <div className="col-span-3 mt-16">
              <h1 className="font-extrabold font-barlow text-h1-mobile leading-heading" style={{
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }}>
                {title}
              </h1>
              <p className="mt-6 font-barlow font-medium text-text-large-mobile leading-standard" style={{
            color: textColor,
            transition: transition
          }}>
                {text}
              </p>
            </div>
          </div> :
      // Desktop layout - full screen with no scrolling
      <div className="flex flex-col h-full justify-between px-[40px] pt-[25vh] pb-[40px]">
            <div className="w-full">
              <div className="col-span-8 col-start-1 w-2/3">
                <h1 className="font-extrabold font-barlow text-h1-desktop leading-heading mb-8" style={{
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition,
            marginTop: '0'
          }}>
                {title}
              </h1>
                <p className="font-barlow font-medium text-text-medium leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                  {text}
                </p>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main3;
