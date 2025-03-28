
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

const Hero = ({
  title = "We are 10kR.",
  subtitle = "We are an AI-forward design studio—where people and robots collaborate together to build intelligent experiences that benefit us all.",
  ctaText = "SEE WHAT WE DO",
  ctaAction = () => console.log("CTA clicked")
}: HeroProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Disable scrolling on desktop
    if (!isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isMobile]);

  if (!mounted) return null;

  return (
    <section className={`w-full bg-brand-pink relative px-6 py-8 overflow-hidden font-barlow mb-10 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full">
        {isMobile ? (
          // Mobile layout
          <div className="flex flex-col min-h-screen justify-between py-12">
            <div className="mt-16">
              <h1 className="text-[13vh] font-extrabold text-brand-blue slide-in-left font-barlow leading-standard" style={{ fontWeight: 800, fontStyle: 'italic' }}>
                {title}
              </h1>
              <p className="text-brand-blue mt-6 text-[4vh] fade-in-delay-1 max-w-[90%] font-barlow font-medium leading-standard">
                {subtitle}
              </p>
            </div>
            <div className="mb-16 fade-in-delay-2 flex justify-end">
              <button
                onClick={ctaAction}
                className="bg-brand-blue text-white px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow leading-standard"
              >
                {ctaText}
              </button>
            </div>
          </div>
        ) : (
          // Desktop layout - full screen with no scrolling
          <div className="flex flex-col h-full justify-between py-12">
            <div className="flex items-center flex-1">
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="col-span-1">
                  {/* Left side content (empty on desktop based on reference) */}
                </div>
                <div className="col-span-1">
                  {/* Right side content */}
                  <p className="text-brand-blue text-[4vh] slide-in-right max-w-xl font-barlow font-medium leading-standard">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="fade-in mb-4">
                <button
                  onClick={ctaAction}
                  className="bg-brand-blue text-white px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all font-barlow leading-standard"
                >
                  {ctaText}
                </button>
              </div>
              <h1 className="text-[13vh] font-extrabold text-brand-blue slide-in-left font-barlow leading-standard" style={{ fontWeight: 800, fontStyle: 'italic' }}>
                {title}
              </h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
