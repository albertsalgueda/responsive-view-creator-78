import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
interface Services1Props {
  titleText?: string;
  descriptionText?: string;
  columnsText?: string;
}
const Services1 = ({
  titleText = "Brand",
  descriptionText = "We craft AI-enhanced brand identities that merge strategic insight with cutting-edge creativity, building brands that are both timeless and future-proof.",
  columnsText = "Brand Creation & Refreshes<br>Brand Narrative & Naming<br>Visual Identity<br>Brand Strategy<br>Brand Voice & Tone<br>Category Creation & Positioning"
}: Services1Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();
  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0 flex flex-col">
        {isMobile ? <div className="flex flex-col justify-between py-12 px-6 h-full">
            <div className="mt-16">
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition,
            marginTop: '-2vh'
          }} className="font-extrabold slide-in-left font-barlow text-7xl">
                {titleText}
              </h1>
              <p style={{
            lineHeight: 1.3,
            color: textColor,
            transition: transition
          }} className="mt-3 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-base">
                {descriptionText}
              </p>
            </div>
            <div className="mb-6 flex flex-col justify-end"> 
              <div className="fade-in-delay-1 font-barlow font-medium text-sm" style={{
            color: textColor,
            transition: transition,
            columnCount: 1,
            lineHeight: 1.1
          }} dangerouslySetInnerHTML={{
            __html: columnsText
          }}>
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
          }} className="mt-2 slide-in-left max-w-full font-barlow font-medium text-[3vh]">
                {descriptionText}
              </p>
            </div>
            <div className="mb-0 flex flex-col justify-end mt-auto">
              <div style={{
            color: textColor,
            transition: transition,
            columnCount: 2,
            columnGap: '2rem',
            lineHeight: 1.1
          }} dangerouslySetInnerHTML={{
            __html: columnsText.replace(/<br>/g, '<br><span style="display: block; margin-bottom: 1vh;"></span>')
          }} className="text-[2.25vh] font-barlow font-medium mb-0 slide-in-right align-bottom">
              </div>
            </div>
          </div>}
      </div>
    </section>;
};
export default Services1;