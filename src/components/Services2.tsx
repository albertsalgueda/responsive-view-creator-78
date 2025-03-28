
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Services2Props {
  titleText?: string;
  text?: string;
  columns?: string;
}

const Services2 = ({
  titleText = "Product",
  text = "We craft AI-enhanced brand identities that merge strategic insight with cutting-edge creativity, building brands that are both timeless and future-proof.",
  columns = "Product Strategy & Management<p>User Research & Testing<p>Website Design & Development<p>Mobile App Design & Development<p>Motion & Interaction Design<p>Design Systems<p>Concept Proofing & Prototyping"
}: Services2Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  // Split columns text into array items
  const columnItems = columns.split('<p>');
  
  // Split items for two columns on desktop
  const halfwayIndex = Math.ceil(columnItems.length / 2);
  const firstColumnItems = columnItems.slice(0, halfwayIndex);
  const secondColumnItems = columnItems.slice(halfwayIndex);

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0 flex flex-col">
        {isMobile ? <div className="grid grid-cols-3 gap-4 px-6 h-full py-0">
            <div className="col-span-3 mt-16">
              <h1 className="font-extrabold slide-in-left font-barlow text-h1-mobile leading-heading" style={{
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition,
            marginTop: '-2vh'
          }}>
                {titleText}
              </h1>
              <p className="mt-3 pb-[24px] fade-in-delay-1 font-barlow font-medium text-text-medium leading-standard" style={{
            color: textColor,
            transition: transition
          }}>
                {text}
              </p>
            </div>
            <div className="col-start-2 col-span-2 mb-6 mt-auto">
              <div className="fade-in-delay-1 font-barlow font-medium text-text-small flex flex-col-reverse leading-standard" style={{
            color: textColor,
            transition: transition
          }}>
                {columnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
              </div>
            </div>
          </div> : <div className="flex flex-col h-full justify-between px-[40px] pt-[25vh] pb-[40px]">
            {/* Title and Text in top section */}
            <div className="w-full">
              <div className="col-span-8 col-start-1 w-2/3">
                <h1 className="font-extrabold slide-in-left font-barlow text-h1-desktop leading-heading mb-8" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition,
              marginTop: '-2vh'
            }}>
                  {titleText}
                </h1>
                <p className="slide-in-left font-barlow font-medium text-text-medium leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                  {text}
                </p>
              </div>
            </div>
            
            {/* Services list at the bottom */}
            <div className="grid grid-cols-12 gap-8">
              {/* Service items */}
              <div className="col-span-12 col-start-1 flex flex-col justify-end">
                <div className="grid grid-cols-2 gap-8 font-barlow font-medium mb-0 slide-in-right text-text-small leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                  <div className="flex flex-col-reverse">
                    {firstColumnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
                  </div>
                  <div className="flex flex-col-reverse">
                    {secondColumnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Services2;
