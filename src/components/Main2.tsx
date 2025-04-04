
import { useState, useEffect, useLayoutEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
import { useView } from '@/context/ViewContext';
interface Main2Props {
  title?: string;
  text1?: string;
  text2?: string;
  ctaText?: string;
  ctaAction?: () => void;
}
const Main2 = ({
  title = "Our story.",
  text1 = "For 15 years, we built one of Silicon Valley's most influential digital product agencies from startup to $100M ARR. Along the way, we partnered with visionary clients—many of whom we now call friends—to create category-defining products across industries from automotive to healthcare to finance.",
  text2 = "Now reunited at the forefront of AI, we're building a new kind of agency—one designed to help the world's most ambitious brands reach their highest potential.",
  ctaText = "",
  ctaAction = () => console.log("CTA clicked")
}: Main2Props) => {
  const isMobile = useIsMobile();
  const {
    currentSection
  } = useView();
  const {
    textColor,
    transition
  } = useSectionColors();

  // Add force update mechanism to help with rendering
  const [key, setKey] = useState(0);

  // Force re-render once on mount to help with syncing
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setKey(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Force another re-render after layout changes and when section changes
  useEffect(() => {
    console.log("Main2 rendered with layout:", isMobile ? "mobile" : "desktop", "current section:", currentSection);
    const forceUpdateTimer = setTimeout(() => {
      setKey(k => k + 1);
    }, 500);
    return () => clearTimeout(forceUpdateTimer);
  }, [isMobile, currentSection]);

  // Add a layout effect to ensure immediate update
  useLayoutEffect(() => {
    console.log("Main2 layout effect triggered");
    setKey(k => k + 1);
  }, [isMobile]);
  const titleStyle = {
    fontWeight: 800,
    fontStyle: 'italic',
    color: textColor,
    transition: transition
  };
  const textStyle = {
    color: textColor,
    transition: transition
  };
  const buttonStyle = {
    backgroundColor: textColor,
    transition: transition
  };
  return <section key={key} className={`w-full relative overflow-hidden font-barlow ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="w-full mx-auto h-full p-0">
        {isMobile ? <div className="grid grid-cols-3 gap-4 min-h-screen py-12 px-6">
            <div className="col-span-3 mt-16">
              <h1 className="font-extrabold font-barlow text-h1-mobile leading-standard" style={titleStyle}>
                {title}
              </h1>
              <p className="mt-6 font-barlow font-medium text-text-medium leading-standard" style={textStyle}>
                {text1}
              </p>
            </div>
            <div className="col-start-2 col-span-2 mt-8 font-barlow font-medium text-text-small leading-standard" style={textStyle}>
              <p className="mb-16">{text2}</p>
            </div>
            {ctaText && <div className="col-span-3 mt-auto mb-16 flex justify-end">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow leading-standard" style={buttonStyle}>
                  {ctaText}
                </button>
              </div>}
          </div> : <div className="grid grid-cols-12 gap-8 h-full pt-0 pb-[40px] px-[40px] pt-[25vh]">
            <div className="col-span-6 col-start-1 self-start">
              <h1 style={titleStyle} className="font-extrabold font-barlow text-h1-desktop leading-standard">
                {title}
              </h1>
            </div>
            
            <div className="col-span-4 col-start-5 self-end">
              <p style={textStyle} className="text-text-small font-barlow font-medium mb-0 leading-standard">
                {text1}
              </p>
            </div>
            
            <div className="col-span-4 col-start-9 self-end">
              <p style={textStyle} className="text-text-small font-barlow font-medium mb-0 leading-standard">
                {text2}
              </p>
            </div>
            
            {ctaText && <div className="col-span-12 self-end flex justify-end mb-6">
                <button onClick={ctaAction} className="text-[#2A0C41] px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow leading-standard" style={buttonStyle}>
                  {ctaText}
                </button>
              </div>}
          </div>}
      </div>
    </section>;
};
export default Main2;
