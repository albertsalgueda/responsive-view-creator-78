
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface TeamProps {
  title?: string;
  text1?: string;
  text2?: string;
}

const Team = ({
  title = "Taste & talent.",
  text1 = "We're an (intentionally) small team of award-winning designers, storytellers & technologists.",
  text2 = "While machines analyze data, our unique perspectives, lived experiences and creativity shape art and innovation.",
}: TeamProps) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? <div className="grid grid-cols-3 gap-4 min-h-screen py-12 px-6">
            <div className="col-span-3 mt-16">
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-h1-mobile">
                {title}
              </h1>
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition
          }} className="mt-6 fade-in-delay-1 font-barlow font-medium text-text-medium">
                {text1}
              </p>
            </div>
            <div className="col-start-2 col-span-2 mt-8 fade-in-delay-2 font-barlow font-medium text-text-small" style={{
          lineHeight: 1.1,
          color: textColor,
          transition: transition
        }}>
              <p className="mb-16">{text2}</p>
            </div>
          </div> : <div className="flex flex-col h-full justify-end pt-[25vh] pb-[40px] px-[40px]">
            {/* Title at the top */}
            <div className="w-1/2 mb-auto">
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-h1-desktop">
                {title}
              </h1>
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition
          }} className="mt-6 text-text-medium slide-in-left font-barlow font-medium">
                {text1}
              </p>
            </div>
            
            {/* Text section at the bottom */}
            <div className="grid grid-cols-12 gap-8">
              {/* Text-2 */}
              <div className="col-span-4 col-start-9 flex flex-col justify-end">
                <p style={{
              lineHeight: 1.1,
              color: textColor,
              transition: transition
            }} className="text-text-medium slide-in-right font-barlow font-medium mb-0">
                  {text2}
                </p>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Team;
