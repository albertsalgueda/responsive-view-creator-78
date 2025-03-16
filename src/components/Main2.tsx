
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  if (!mounted) return null;
  return <section className={`w-full bg-[#2A0C41] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full">
        {isMobile ?
      // Mobile layout
      <div className="flex flex-col min-h-screen justify-between py-12 px-6">
            <div className="mt-16">
              <h1 className="text-[4.5rem] font-extrabold text-[#FFB889] slide-in-left font-barlow" style={{
            lineHeight: 1,
            fontWeight: 800,
            fontStyle: 'italic'
          }}>
                {title}
              </h1>
              <p className="text-[#FFB889] mt-6 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-xl">
                {subtitle}
              </p>
              <p className="text-[#FFB889] mt-8 text-lg fade-in-delay-2 max-w-[90%] font-barlow font-medium ml-auto text-left">
                {description}
              </p>
            </div>
            {ctaText && <div className="mb-16 fade-in-delay-2 flex justify-end">
                <button onClick={ctaAction} className="bg-[#FFB889] text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow">
                  {ctaText}
                </button>
              </div>}
          </div> :
      // Desktop layout - full screen with no scrolling
      <div className="flex flex-col justify-between h-full py-12 px-6">
            <div className="flex-1">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h1 className="text-[4.5rem] font-extrabold text-[#FFB889] slide-in-left font-barlow mt-10" style={{
                lineHeight: 1,
                fontWeight: 800,
                fontStyle: 'italic'
              }}>
                    {title}
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-12 mb-20 justify-end">
                  <div className="col-span-1 col-start-2 flex flex-col justify-end">
                    <p className="text-[#FFB889] text-xl slide-in-right font-barlow font-medium self-end">
                      {subtitle}
                    </p>
                  </div>
                  <div className="col-span-1 col-start-3 flex flex-col justify-end">
                    <p className="text-[#FFB889] text-xl slide-in-right font-barlow font-medium">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {ctaText && <div className="fade-in mt-4 flex justify-end mb-6">
                <button onClick={ctaAction} className="bg-[#FFB889] text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow">
                  {ctaText}
                </button>
              </div>}
          </div>}
      </div>
    </section>;
};
export default Main2;
