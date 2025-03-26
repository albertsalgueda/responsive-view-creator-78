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
  const [mounted, setMounted] = useState(false);
  const {
    textColor,
    backgroundColor,
    transition
  } = useSectionColors();
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
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
  if (!mounted) return null;
  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full">
        {isMobile ? <div className="flex flex-col min-h-screen justify-between py-12 px-6">
            <div className="mt-16">
              <h1 className="text-[4.5rem] font-extrabold slide-in-left font-barlow" style={{
            lineHeight: 1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }}>
                {title}
              </h1>
              <p className="mt-6 text-xl fade-in-delay-1 max-w-[90%] font-barlow font-medium" style={{
            color: textColor,
            transition: transition
          }}>
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
          </div> : <div className="flex flex-col h-full justify-between pt-[144px] pb-[40px] px-[40px]">
            <div className="">
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="col-span-1">
                  {/* Left side content (empty on desktop based on reference) */}
                </div>
                <div className="col-span-1">
                  {/* Right side content */}
                  <p style={{
                color: textColor,
                transition: transition
              }} className="slide-in-left max-w-xl font-barlow font-medium text-3xl">
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