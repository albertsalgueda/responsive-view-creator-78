
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Main4Props {
  title?: string;
  text1?: string;
  text2?: string;
}

const Main4 = ({
  title = "Taste & talent.",
  text1 = "We're an (intentionally) small team of award-winning designers, storytellers & technologists.",
  text2 = "It's our people's unique perspectives, lived experiences and creativity that shape our work and give it its soul.",
}: Main4Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-fit h-auto' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? <div className="grid grid-cols-3 gap-4 h-auto py-12 px-6">
            <div className="col-span-3 mt-16">
              <h1 className="font-extrabold slide-in-left font-barlow text-h1-mobile leading-heading" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition,
              marginTop: '-2vh'
            }}>
                {title}
              </h1>
              <p className="mt-3 fade-in-delay-1 font-barlow font-medium text-text-medium leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                {text1}
              </p>
            </div>
            <div className="col-start-2 col-span-2 mt-8 fade-in-delay-2 font-barlow font-medium text-text-small leading-standard" style={{
            color: textColor,
            transition: transition
          }}>
              <p className="mb-16">{text2}</p>
            </div>
          </div> : <div className="flex flex-col h-full justify-between pt-[25vh] pb-[40px] px-[40px]">
            {/* Title and Text-1 in top section */}
            <div className="w-full">
              <div className="col-span-8 col-start-1 w-2/3">
                <h1 className="font-extrabold slide-in-left font-barlow text-h1-desktop leading-heading mb-8" style={{
                fontWeight: 800,
                fontStyle: 'italic',
                color: textColor,
                transition: transition,
                marginTop: '-2vh'
              }}>
                  {title}
                </h1>
                <p className="slide-in-left font-barlow font-medium text-text-medium leading-standard" style={{
                color: textColor,
                transition: transition
              }}>
                  {text1}
                </p>
              </div>
            </div>
            
            {/* Text-2 at the bottom */}
            <div className="grid grid-cols-12 gap-8">
              {/* Empty space to maintain grid structure */}
              <div className="col-span-6 col-start-1"></div>
              
              {/* Text-2 spanning columns 7-12 */}
              <div className="col-span-6 col-start-7 flex flex-col justify-end">
                <p className="text-text-small slide-in-right font-barlow font-medium mb-0 leading-standard" style={{
                color: textColor,
                transition: transition
              }}>
                  {text2}
                </p>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main4;
