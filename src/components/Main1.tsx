
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
interface Main1Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
}
const Main1 = ({
  title = "We are 10kR.",
  subtitle = "The design studio of the future— where people and robots collaborate together to build intelligent experiences that benefit us all.",
  ctaText = "SEE WHAT WE DO",
  ctaAction = () => console.log("CTA clicked")
}: Main1Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    backgroundColor,
    transition
  } = useSectionColors();

  const scrollToMain3 = () => {
    const main3Element = document.getElementById('main3');
    if (main3Element) {
      if (isMobile) {
        main3Element.scrollIntoView({
          behavior: 'smooth'
        });
      } else {
        const scrollContainer = document.querySelector('.overflow-x-auto');
        if (scrollContainer) {
          const main3Position = main3Element.offsetLeft;
          scrollContainer.scrollTo({
            left: main3Position,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full">
        {isMobile ? <div className="flex flex-col justify-between py-12 px-6">
            <div className="mt-16">
              <h1 style={{
            lineHeight: 1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-6xl">
                {title}
              </h1>
              <p style={{
            lineHeight: 1,
            color: textColor,
            transition: transition
          }} className="mt-6 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-2xl pt-[0px] pb-[24px] my-0">
                {subtitle}
              </p>
            </div>
            <div className="mb-16 fade-in-delay-2 flex justify-end">
              <button onClick={scrollToMain3} className="px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
            backgroundColor: textColor,
            color: backgroundColor,
            transition: transition
          }}>
                {ctaText}
              </button>
            </div>
          </div> : <div className="flex flex-col h-full justify-between pt-[20vh] pb-[40px] px-[40px]">
            <div className="">
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="col-span-1">
                  {/* Left side content (empty on desktop based on reference) */}
                </div>
                <div className="col-span-1">
                  {/* Right side content */}
                  <p style={{
                lineHeight: 1,
                color: textColor,
                transition: transition
              }} className="slide-in-left max-w-xl font-barlow font-medium text-[5vh]">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="fade-in mb-4">
                <button onClick={scrollToMain3} className="px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
              backgroundColor: textColor,
              color: backgroundColor,
              transition: transition
            }}>
                  {ctaText}
                </button>
              </div>
              <h1 style={{
            lineHeight: 1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-8xl">
                {title}
              </h1>
            </div>
          </div>}
      </div>
    </section>;
};
export default Main1;
