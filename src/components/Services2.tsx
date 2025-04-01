import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
interface Services2Props {
  titleText?: string;
  text?: string;
  columns?: string;
}
const Services2 = ({
  titleText = "Product.",
  text = "We design intelligent products that blend usability, beauty, and performance—powered by AI and built so people love them.",
  columns = '"We need to increase conversion"<p>"We need an engaging website and app"<p>"We need an omnichannel experience"<p>"We want a better self-service experience"<p>"We need to launch an MVP, fast"'
}: Services2Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  // Split columns text into array items
  const columnItems = columns.split('<p>');
  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0 flex flex-col">
        {isMobile ? <div className="grid grid-cols-3 gap-4 px-6 h-full py-0 pb-16">
            <div className="col-span-3 mt-16">
              <h1 className="font-extrabold font-barlow text-h1-mobile leading-heading" style={{
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition,
            marginTop: '-2vh'
          }}>
                {titleText}
              </h1>
              <p className="mt-6 pb-[24px] font-barlow font-medium text-text-medium leading-standard" style={{
            color: textColor,
            transition: transition
          }}>
                {text}
              </p>
              <div className="mt-4">
                <h3 className="mb-4 font-barlow font-bold text-text-small leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                  Product problems like...
                </h3>
                <div className="font-barlow font-medium text-text-small leading-standard" style={{
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
                <h1 className="font-extrabold font-barlow text-h1-desktop leading-heading mb-8" style={{
              fontWeight: 800,
              fontStyle: 'italic',
              color: textColor,
              transition: transition,
              marginTop: '0'
            }}>
                  {titleText}
                </h1>
                <p className="font-barlow font-medium text-text-medium leading-standard" style={{
              color: textColor,
              transition: transition
            }}>
                  {text}
                </p>
              </div>
            </div>
                
            {/* Problems we've solved section - aligned to bottom */}
            <div className="mt-auto mb-0">
              <h3 className="mb-4 font-barlow font-bold text-text-small leading-standard" style={{
            color: textColor,
            transition: transition
          }}>
                Product problems like...
              </h3>
              <div className="font-barlow font-medium mb-0 text-text-small leading-standard flex flex-col-reverse" style={{
            color: textColor,
            transition: transition,
            columnCount: 1,
            columnGap: '2rem',
            display: 'flex',
            width: '100%'
          }}>
                {columnItems.map((item, index) => <p key={index} className="mt-2">{item}</p>)}
              </div>
            </div>
          </div>}
      </div>
    </section>;
};
export default Services2;