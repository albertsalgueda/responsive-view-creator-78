
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Services2Props {
  title?: string;
  subtitle?: string;
  description?: string;
}

const Services2 = ({
  title = "Product",
  subtitle = "Brand strategy & identity<br>Brand creation<br>Brand positioning<br>Brand narrative<br>Naming",
  description = "Brand whatsits<br>Brand somethings<br>Brand wibble wobbles<br>Brand brand & more brand",
}: Services2Props) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  if (!mounted) return null;
  
  return (
    <section className={`w-full bg-[#105A43] relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? 
          <div className="flex flex-col min-h-screen justify-between py-12 px-6">
            <div className="mt-16">
              <h1 className="text-[4.5rem] font-extrabold text-[#97ECCF] slide-in-left font-barlow" style={{
                lineHeight: 1,
                fontWeight: 800,
                fontStyle: 'italic'
              }}>
                {title}
              </h1>
              <div className="text-[#97ECCF] mt-6 fade-in-delay-1 font-barlow font-medium text-xl">
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: subtitle }}></p>
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </div>
            </div>
          </div> : 
          <div className="flex flex-col justify-between h-full px-6 py-[40px]">
            <div className="flex-1">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h1 
                    style={{
                      lineHeight: 1,
                      fontWeight: 800,
                      fontStyle: 'italic'
                    }} 
                    className="text-[4.5rem] font-extrabold text-[#97ECCF] slide-in-left font-barlow mt-10 my-0"
                  >
                    {title}
                  </h1>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="text-[#97ECCF] text-xl slide-in-right font-barlow font-medium mb-0">
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: subtitle }}></p>
                    <p dangerouslySetInnerHTML={{ __html: description }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default Services2;
