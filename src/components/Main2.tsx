import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
interface Main2Props {
  title?: string;
  text1?: string;
  text2?: string;
  ctaText?: string;
  ctaAction?: () => void;
}
const Main2 = ({
  title = "Prompting human potential.",
  text1 = "What if AI wasn't designed to be prompted? What if it was designed to prompt us?",
  text2 = "Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential.",
  ctaText = "SEE WHAT WE DO",
  ctaAction = () => console.log("CTA clicked")
}: Main2Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();
  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? <div className="grid grid-cols-3 gap-4 px-6 py-[24px]">
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
            {ctaText && <div className="col-span-3 mt-auto mb-16 fade-in-delay-2 flex justify-end">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
            backgroundColor: textColor,
            transition: transition
          }}>
                  {ctaText}
                </button>
              </div>}
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
            </div>
            
            {/* Text sections at the bottom - removed mb-[40px] */}
            <div className="grid grid-cols-12 gap-8">
              {/* Text column 1 */}
              <div className="col-span-4 col-start-5 flex flex-col justify-end">
                <p style={{
              lineHeight: 1.1,
              color: textColor,
              transition: transition
            }} className="text-text-medium slide-in-right font-barlow font-medium mb-0">
                  {text1}
                </p>
              </div>
              
              {/* Text column 2 */}
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
            
            {/* CTA Button */}
            {ctaText && <div className="fade-in flex justify-end mb-6">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
            backgroundColor: textColor,
            transition: transition
          }}>
                  {ctaText}
                </button>
              </div>}
          </div>}
      </div>
    </section>;
};
export default Main2;