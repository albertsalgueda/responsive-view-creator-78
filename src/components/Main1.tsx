import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Main1Props {
  title?: string;
  text?: string;
  ctaText?: string;
  ctaAction?: () => void;
  footnote?: React.ReactNode;
}

const Main1 = ({
  title = "We are 10kR.",
  text = "An AI-forward design agency—where humans and machines build intelligent experiences together.",
  ctaText = "SEE WHAT WE DO",
  ctaAction = () => console.log("CTA clicked"),
  footnote = <>
      This website was made by AI (robots) and refined by humans (us). <a href="https://medium.com/ux-planet/ultimate-guide-to-color-in-ux-ui-design-de8eb104b5d3" target="_blank" rel="noopener noreferrer" className="font-barlow font-bold hover:opacity-80 transition-opacity">
        See How.
      </a>
    </>
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
              <h1 className="font-extrabold slide-in-left font-barlow text-h1-mobile leading-standard" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition
            }}>
                {title}
              </h1>
              <p className="mt-6 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-text-large-mobile pt-[0px] pb-[12px] my-0 leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                {text}
              </p>
            </div>
            
            <div className="col-span-3 flex justify-end mb-6 fade-in-delay-2">
              <button onClick={scrollToMain3} className="px-6 py-3 rounded-sm font-barlow font-bold tracking-tighter text-base hover:opacity-90 transition-all duration-500 leading-standard" style={{
              backgroundColor: textColor,
              color: backgroundColor,
              transition: transition
            }}>
                {ctaText}
              </button>
            </div>
            
            <div className="col-start-2 col-span-2 mb-16">
              <p className="fade-in-delay-1 font-barlow font-medium text-text-small leading-standard" style={{
              color: textColor,
              transition: transition,
              paddingTop: '24px'
            }}>
                {footnote}
              </p>
            </div>
          </div> : <div className="grid grid-cols-12 h-full pt-0 pb-[40px] px-[40px]">
            <div className="col-span-6 self-start"></div>
            
            <div className="col-span-6 self-start pt-[25vh]">
              <p className="slide-in-left font-barlow font-medium text-text-large-desktop leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                {text}
              </p>
            </div>
            
            <div className="col-span-6 self-end flex flex-col">
              <div className="mb-6 fade-in">
                <button onClick={scrollToMain3} className="px-6 py-3 rounded-sm font-barlow font-bold tracking-tighter text-base hover:opacity-90 transition-all duration-500 leading-standard" style={{
                backgroundColor: textColor,
                color: backgroundColor,
                transition: transition
              }}>
                  {ctaText}
                </button>
              </div>
              <h1 className="font-extrabold slide-in-left font-barlow text-h1-desktop leading-standard" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition
            }}>
                {title}
              </h1>
            </div>
            
            <div className="col-span-3 col-start-10 self-end">
              <p className="slide-in-left font-barlow font-medium text-text-small leading-standard pb-[5px]" style={{
              color: textColor,
              transition: transition
            }}>
                {footnote}
              </p>
            </div>
          </div>}
      </div>
    </section>;
};

export default Main1;
