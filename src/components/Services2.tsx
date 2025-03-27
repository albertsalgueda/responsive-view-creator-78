
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
interface Services2Props {
  titleText?: string;
  descriptionText?: string;
  columnsText?: string;
}
const Services2 = ({
  titleText = "Product",
  descriptionText = "We craft AI-enhanced brand identities that merge strategic insight with cutting-edge creativity, building brands that are both timeless and future-proof.",
  columnsText = "Product Strategy & Management<p>User Research & Testing<p>Website Design & Development<p>Mobile App Design & Development<p>Motion & Interaction Design<br>Design Systems<p>Concept Proofing & Prototyping"
}: Services2Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  // Process mixed <p> and <br> tags
  const processColumnsText = (text: string) => {
    // First replace <br> with <p> for consistency
    const normalizedText = text.replace(/<br>/g, '<p>');
    // Split by <p> and render as paragraphs
    return normalizedText.split('<p>').map((item, index) => <p key={index} className={isMobile ? "mb-2" : "mb-3"}>{item}</p>);
  };
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
          }} className="font-extrabold slide-in-left font-barlow text-[11vh]">
                {titleText}
              </h1>
              <p style={{
            lineHeight: 1.3,
            color: textColor,
            transition: transition
          }} className="mt-3 pb-[24px] fade-in-delay-1 font-barlow font-medium text-[3vh]">
                {descriptionText}
              </p>
            </div>
            <div className="col-start-2 col-span-2 mb-6">
              <div className="fade-in-delay-1 font-barlow font-medium text-[2.25vh]" style={{
            color: textColor,
            transition: transition,
            columnCount: 1,
            lineHeight: 1.1
          }}>
                {processColumnsText(columnsText)}
              </div>
            </div>
          </div> : <div className="flex flex-col h-full px-6 pr-[25%] pt-[25vh] pb-[40px] justify-between">
            <div>
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition,
            marginTop: '-2vh'
          }} className="font-extrabold slide-in-left font-barlow mt-0 text-[13vh]">
                {titleText}
              </h1>
              <p style={{
            lineHeight: 1.3,
            color: textColor,
            transition: transition
          }} className="mt-2 pb-[24px] slide-in-left max-w-full font-barlow font-medium text-[3vh]">
                {descriptionText}
              </p>
            </div>
            <div className="mb-0 flex flex-col justify-end">
              <div className="text-[2.25vh] font-barlow font-medium mb-0 slide-in-right" style={{
            color: textColor,
            transition: transition,
            columnCount: 2,
            columnGap: '2rem',
            lineHeight: 1.1
          }}>
                {processColumnsText(columnsText)}
              </div>
            </div>
          </div>}
      </div>
    </section>;
};
export default Services2;
