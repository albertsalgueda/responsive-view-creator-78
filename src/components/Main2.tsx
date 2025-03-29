
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
  title = "The creative potential of AI",
  text1 = "For 15 years, we built one of Silicon Valley's most influential digital product agencies from startup to $100M ARR. Along the way, we partnered with visionary clients—many of whom we now call friends—to create category-defining products across industries from automotive to healthcare to finance.",
  text2 = "Now reunited at the forefront of AI, we're building a new kind of agency—one designed to help the world's most ambitious brands reach their highest potential.",
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
        {isMobile ? <div className="grid grid-cols-3 gap-4 min-h-screen py-12 px-6">
            <div className="col-span-3 mt-16">
              <h1 className="font-extrabold slide-in-left font-barlow text-h1-mobile leading-standard" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition
            }}>
                {title}
              </h1>
              <p className="mt-6 fade-in-delay-1 font-barlow font-medium text-text-small leading-standard" style={{
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
            {ctaText && <div className="col-span-3 mt-auto mb-16 fade-in-delay-2 flex justify-end">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow leading-standard" style={{
              backgroundColor: textColor,
              transition: transition
            }}>
                  {ctaText}
                </button>
              </div>}
          </div> : <div className="flex flex-col h-full justify-end pt-[25vh] pb-[40px] px-[40px]">
            {/* Title at the top */}
            <div className="w-1/2 mb-auto">
              <h1 className="font-extrabold slide-in-left font-barlow text-h1-desktop leading-standard" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition
            }}>
                {title}
              </h1>
            </div>
            
            {/* Text sections at the bottom - removed mb-[40px] */}
            <div className="grid grid-cols-12 gap-8">
              {/* Text column 1 */}
              <div className="col-span-4 col-start-5 flex flex-col justify-end">
                <p className="text-text-small slide-in-right font-barlow font-medium mb-0 leading-standard" style={{
                color: textColor,
                transition: transition
              }}>
                  {text1}
                </p>
              </div>
              
              {/* Text column 2 */}
              <div className="col-span-4 col-start-9 flex flex-col justify-end">
                <p className="text-text-small slide-in-right font-barlow font-medium mb-0 leading-standard" style={{
                color: textColor,
                transition: transition
              }}>
                  {text2}
                </p>
              </div>
            </div>
            
            {/* CTA Button */}
            {ctaText && <div className="fade-in flex justify-end mb-6">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow leading-standard" style={{
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
