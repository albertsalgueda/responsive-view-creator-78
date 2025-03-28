
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Services1Props {
  titleText?: string;
  text?: string;
  columns?: string;
}

const Services1 = ({
  titleText = "Brand",
  text = "We craft AI-enhanced brand identities that merge strategic insight with cutting-edge creativity, building brands that are both timeless and future-proof.",
  columns = "Brand Creation & Refreshes<p>Brand Narrative & Naming<p>Visual Identity<p>Brand Strategy<p>Brand Voice & Tone<p>Category Creation & Positioning"
}: Services1Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  // Split columns text into array items
  const columnItems = columns.split('<p>');

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0 flex flex-col">
        {isMobile ? <div className="grid grid-cols-3 gap-4 px-6 h-full py-0">
            <div className="col-span-3 mt-16">
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition,
            marginTop: '-2vh'
          }} className="font-extrabold slide-in-left font-barlow text-h1-mobile">
                {titleText}
              </h1>
              <p style={{
            lineHeight: 1.3,
            color: textColor,
            transition: transition
          }} className="mt-3 pb-[24px] fade-in-delay-1 font-barlow font-medium text-text-medium">
                {text}
              </p>
            </div>
            <div className="col-start-2 col-span-2 mb-6 mt-auto"> 
              <div className="fade-in-delay-1 font-barlow font-medium text-text-small flex flex-col-reverse" style={{
            color: textColor,
            transition: transition,
            lineHeight: 1.1
          }}>
                {columnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
              </div>
            </div>
          </div> : <div className="flex flex-col h-full justify-between px-[40px] pt-[25vh] pb-[40px]">
            {/* Title and Text in top section */}
            <div className="w-full">
              <div className="col-span-8 col-start-1 w-2/3">
                <h1 style={{
              lineHeight: 1.1,
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition,
              marginTop: '-2vh'
            }} className="font-extrabold slide-in-left font-barlow text-h1-desktop mb-8">
                  {titleText}
                </h1>
                <p style={{
              lineHeight: 1.3,
              color: textColor,
              transition: transition
            }} className="slide-in-left font-barlow font-medium text-text-medium">
                  {text}
                </p>
              </div>
            </div>
            
            {/* Services list at the bottom */}
            <div className="grid grid-cols-12 gap-8">
              {/* Service items */}
              <div className="col-span-12 col-start-1 flex flex-col justify-end">
                <div className="font-barlow font-medium mb-0 slide-in-right text-text-small" style={{
              color: textColor,
              transition: transition,
              columnCount: 2,
              columnGap: '2rem',
              lineHeight: 1.1,
              display: 'block',
              width: '100%'
            }}>
                  <div className="flex flex-col-reverse">
                    {columnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Services1;
