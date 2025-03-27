
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
import { useEffect } from 'react';
import { TeamProps, TeamMember } from './team/TeamMemberInterface';
import TeamMobileView from './team/TeamMobileView';
import TeamDesktopView from './team/TeamDesktopView';

const defaultMembers: TeamMember[] = [];

const Team = ({
  members = defaultMembers
}: TeamProps) => {
  const isMobile = useIsMobile();
  const {
    textColor,
    transition
  } = useSectionColors();

  const displayMembers = members.length > 0 ? members : [{
    name: "Neil Stoekle",
    title: "Groovemeister",
    image: "/lovable-uploads/f34e0bc8-b159-4351-8da9-0d3aa6828578.png",
    linkedin: "https://linkedin.com"
  }, {
    name: "Stephen Clements",
    title: "Me ol' China",
    image: "/lovable-uploads/35e452fd-ea52-4223-948d-79dd2bd00b0a.png",
    linkedin: "https://linkedin.com"
  }, {
    name: "Stephanie Wiseman",
    title: "CEOmg",
    image: "/lovable-uploads/8c33a416-6372-49ce-822a-c56bbb42a47c.png",
    linkedin: "https://linkedin.com"
  }, {
    name: "Craig Kind",
    title: "Muh Fuh Word Genius",
    image: "/lovable-uploads/40349571-793d-487f-8d19-1a987f373b43.png",
    linkedin: "https://linkedin.com"
  }, {
    name: "Ashish Toshniwal",
    title: "Badical Radboy",
    image: "/lovable-uploads/151462d5-20f1-493c-b299-e7c36d8c2faa.png",
    linkedin: "https://linkedin.com"
  }];

  console.log("Team component rendering with", members.length > 0 ? "actual team members" : "placeholder members");

  useEffect(() => {
    if (displayMembers.length > 0) {
      displayMembers.forEach(member => {
        const img = new Image();
        img.src = member.image;
        img.onload = () => console.log("Profile image preloaded successfully:", member.image);
        img.onerror = e => console.error("Failed to preload profile image:", member.image, e);
      });
    }
  }, [displayMembers]);

  return (
    <section 
      className={`w-fit relative px-0 py-0 font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`} 
      style={{ width: 'fit-content' }}
    >
      <div className="w-fit mx-auto h-full p-0" style={{ width: 'fit-content' }}>
        {isMobile ? (
          <TeamMobileView 
            displayMembers={displayMembers} 
            textColor={textColor} 
            transition={transition} 
          />
        ) : (
          <TeamDesktopView displayMembers={displayMembers} />
        )}
      </div>
    </section>
  );
};

export default Team;
