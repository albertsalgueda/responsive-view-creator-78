
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
        {isMobile ? <div className="grid grid-cols-3 gap-4 h-full py-12 px-6">
            <div className="col-span-3 mt-16">
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-[11vh]">
                {title}
              </h1>
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition
          }} className="mt-6 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-[4vh] pt-[0px] pb-[12px] my-0">
                {subtitle}
              </p>
            </div>
            
            <div className="col-span-3 flex justify-end mb-6 fade-in-delay-2">
              <button onClick={scrollToMain3} className="px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
              backgroundColor: textColor,
              color: backgroundColor,
              transition: transition
            }}>
                {ctaText}
              </button>
            </div>
            
            <div className="col-start-2 col-span-2 mb-16">
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition,
            paddingTop: '24px'
          }} className="fade-in-delay-1 font-barlow font-medium text-[2.25vh]">
                This website was made with Ai (robots) and refined by humans (us). <span className="font-bold cursor-pointer hover:underline">See How.</span>
              </p>
            </div>
          </div> : <div className="grid grid-cols-12 h-full pt-0 pb-[40px] px-[40px]">
            {/* Empty columns 1-6 for top part */}
            <div className="col-span-6"></div>
            
            {/* Right side content in columns 7-12 */}
            <div className="col-span-6">
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition
          }} className="slide-in-left font-barlow font-medium text-[4vh] mt-[25vh]">
                {subtitle}
              </p>
            </div>
            
            {/* Title and button in columns 1-6, title anchored to bottom */}
            <div className="col-span-6 self-end flex flex-col">
              <div className="mb-6 fade-in">
                <button onClick={scrollToMain3} className="px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
              backgroundColor: textColor,
              color: backgroundColor,
              transition: transition
            }}>
                  {ctaText}
                </button>
              </div>
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-[13vh]">
                {title}
              </h1>
            </div>
            
            {/* Footnote in columns 10-12, anchored to bottom */}
            <div className="col-span-3 col-start-10 self-end">
              <p style={{
            lineHeight: 1.1,
            color: textColor,
            transition: transition
          }} className="slide-in-left font-barlow font-medium text-[2.25vh] pb-[5px]">
                This website was made with Ai (robots) and refined by humans (us). <span className="font-bold cursor-pointer hover:underline">See How.</span>
              </p>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main1;
