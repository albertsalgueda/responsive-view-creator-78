
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
interface Main2Props {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
}
const Main2 = ({
  title = "Prompting human potential.",
  subtitle = "What if AI wasn't designed to be prompted? What if it was designed to prompt us?",
  description = "Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential.",
  ctaText = "SEE WHAT WE DO",
  ctaAction = () => console.log("CTA clicked")
}: Main2Props) => {
  const isMobile = useIsMobile();
  // const [mounted, setMounted] = useState(false);
  const {
    textColor,
    transition
  } = useSectionColors();

  // useEffect(() => {
  //   setMounted(true);
  // }, [isMobile]);

  // if (!mounted) return null;

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? <div className="flex flex-col min-h-screen py-12 px-6">
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
            color: textColor,
            transition: transition
          }} className="mt-6 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-2xl">
                {subtitle}
              </p>
              <p className="mt-8 fade-in-delay-2 max-w-[66%] font-barlow font-medium ml-auto text-left text-base" style={{
            color: textColor,
            transition: transition
          }}>
                {description}
              </p>
            </div>
            {ctaText && <div className="mt-auto mb-16 fade-in-delay-2 flex justify-end">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow" style={{
            backgroundColor: textColor,
            transition: transition
          }}>
                  {ctaText}
                </button>
              </div>}
          </div> : <div className="flex flex-col h-full pt-[20vh] pb-[40px] px-[40px]">
            <div className="flex-1 flex flex-col">
              <h1 style={{
            lineHeight: 1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow mt-0 text-8xl">
                {title}
              </h1>
              
              <div className="mt-auto grid grid-cols-3 gap-12">
                <div className="col-span-1 col-start-2 flex flex-col justify-end">
                  <p className="text-xl slide-in-right font-barlow font-medium mb-0" style={{
                color: textColor,
                transition: transition
              }}>
                    {subtitle}
                  </p>
                </div>
                <div className="col-span-1 col-start-3 flex flex-col justify-end">
                  <p className="text-xl slide-in-right font-barlow font-medium mb-0" style={{
                color: textColor,
                transition: transition
              }}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
            
            {ctaText && <div className="fade-in mt-4 flex justify-end mb-6">
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
