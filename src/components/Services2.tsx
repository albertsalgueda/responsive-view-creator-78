import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Services2Props {
  title?: string;
  subtitle?: string;
  description?: string;
}

const Services2 = ({
  title = "Product",
  subtitle = "Brand strategy & identity<br>Brand creation<br>Brand positioning<br>Brand narrative<br>Naming",
  description = "Brand whatsits<br>Brand somethings<br>Brand wibble wobbles<br>Brand brand & more brand"
}: Services2Props) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const {
    textColor,
    transition
  } = useSectionColors();
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? 
          <div className="flex flex-col min-h-screen justify-between py-12 px-6">
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
              <div className="mt-6 fade-in-delay-1 font-barlow font-medium text-xl" style={{
                color: textColor,
                transition: transition
              }}>
                <p className="mb-4" dangerouslySetInnerHTML={{
                  __html: subtitle
                }}></p>
                <p dangerouslySetInnerHTML={{
                  __html: description
                }}></p>
              </div>
            </div>
          </div> 
        : 
          <div className="flex flex-col h-full px-6 pt-[144px] pb-[40px]">
            <div>
              <h1 style={{
                lineHeight: 1,
                fontWeight: 800,
                fontStyle: 'italic',
                color: textColor,
                transition: transition
              }} className="text-[4.5rem] font-extrabold slide-in-left font-barlow mt-0">
                {title}
              </h1>
            </div>
            <div className="mt-auto">
              <div className="grid grid-cols-3 gap-8 text-xl font-barlow font-medium mb-0">
                <div></div>
                <div className="flex flex-col justify-end slide-in-right" style={{
                  color: textColor,
                  transition: transition
                }}>
                  <p dangerouslySetInnerHTML={{
                    __html: subtitle
                  }} className="text-sm mb-0"></p>
                </div>
                <div className="flex flex-col justify-end slide-in-right" style={{
                  color: textColor,
                  transition: transition
                }}>
                  <p dangerouslySetInnerHTML={{
                    __html: description
                  }} className="text-sm mb-0"></p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>;
};

export default Services2;
