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
  text = "We build brand identities that fuse strategic clarity with creative firepower—brands that are timeless, digital-native, and future-ready.",
  columns = ""We have a fantastic product but no brand story"<p>"We want to create a new category"<p>"We need to standout in a crowded marketplace"<p>"We need to look and feel unique"<p>"We need to look like a billion dollar company""
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
              <div className="mt-4">
                <h3 className="mb-4 fade-in-delay-1 font-barlow font-bold text-text-small leading-standard" style={{
                color: textColor,
                transition: transition
                }}>
                  Problems we've solved
                </h3>
                <div className="fade-in-delay-1 font-barlow font-medium text-text-small leading-standard" style={{
                color: textColor,
                transition: transition
                }}>
                  {columnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
                </div>
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
                
                <div className="mt-8">
                  <h3 className="mb-4 slide-in-right font-barlow font-bold text-text-small leading-standard" style={{
                  color: textColor,
                  transition: transition
                  }}>
                    Problems we've solved
                  </h3>
                  <div className="font-barlow font-medium mb-0 slide-in-right text-text-small leading-standard" style={{
                  color: textColor,
                  transition: transition,
                  columnCount: 1,
                  columnGap: '2rem',
                  display: 'block',
                  width: '100%'
                  }}>
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
