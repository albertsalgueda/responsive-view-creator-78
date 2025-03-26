
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';

interface Services3Props {
  title?: string;
  subtitle?: string;
  description?: string;
  descriptionText?: string;
}

const Services3 = ({
  title = "Content",
  subtitle = "Content Strategy<br>Branded Content<br>Creative Production (Film, 3D, Photography, Animation)",
  description = "Social Media Content Creation<br>Generative AI & Virtual Production",
  descriptionText = "We craft AI-enhanced brand identities that merge strategic insight with cutting-edge creativity, building brands that are both timeless and future-proof"
}: Services3Props) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  return <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'h-fit' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? <div className="flex flex-col justify-between py-12 px-6">
            <div className="mt-16">
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow text-7xl">
                {title}
              </h1>
              <p style={{
                lineHeight: 1.3,
                color: textColor,
                transition: transition
              }} className="mt-3 fade-in-delay-1 max-w-[90%] font-barlow font-medium text-base">
                {descriptionText}
              </p>
              <div className="mt-6 fade-in-delay-1 font-barlow font-medium text-xl" style={{
            color: textColor,
            transition: transition
          }}>
                <p dangerouslySetInnerHTML={{
              __html: subtitle
            }} className="mb-4 text-sm" style={{
              lineHeight: 1.1
            }}></p>
                <p dangerouslySetInnerHTML={{
              __html: description
            }} className="text-sm" style={{
              lineHeight: 1.1
            }}></p>
              </div>
            </div>
          </div> : <div className="flex flex-col h-full px-6 pr-[25%] pt-[25vh] pb-[40px]">
            <div>
              <h1 style={{
            lineHeight: 1.1,
            fontWeight: 800,
            fontStyle: 'italic',
            color: textColor,
            transition: transition
          }} className="font-extrabold slide-in-left font-barlow mt-0 text-[13vh]">
                {title}
              </h1>
              <p style={{
                lineHeight: 1.3,
                color: textColor,
                transition: transition
              }} className="mt-2 slide-in-left max-w-full font-barlow font-medium text-[3vh]">
                {descriptionText}
              </p>
            </div>
            <div className="mt-auto">
              <div className="grid grid-cols-3 gap-8 text-xl font-barlow font-medium mb-0">
                <div className="flex flex-col justify-end slide-in-right" style={{
              color: textColor,
              transition: transition
            }}>
                  <p dangerouslySetInnerHTML={{
                __html: subtitle
              }} className="mb-0 text-[2.25vh]" style={{
                lineHeight: 1.1
              }}></p>
                </div>
                <div className="flex flex-col justify-end slide-in-right" style={{
              color: textColor,
              transition: transition
            }}>
                  <p dangerouslySetInnerHTML={{
                __html: description
              }} className="mb-0 text-[2.25vh]" style={{
                lineHeight: 1.1
              }}></p>
                </div>
                <div></div>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};

export default Services3;
