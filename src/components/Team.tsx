
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

  const displayMembers = members.length > 0 ? members : [
    {
      name: "Neil Stoeckle",
      title: "Groovemeister",
      image: "/lovable-uploads/a35418fd-974d-4e03-9587-ec7ae9dbd183.png",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Stephen Clements",
      title: "Me ol' China",
      image: "/lovable-uploads/aca8975f-d718-455e-8a6f-48190ef3c177.png",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Stephanie Wiseman",
      title: "CEOmg",
      image: "/lovable-uploads/defd301a-11c7-4cab-9978-b3ebb7b67329.png",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Craig Kind",
      title: "Muh Fuh Word Genius",
      image: "/lovable-uploads/7bbf359f-8d38-472a-8de6-ece06dbdff9c.png",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Ashish Toshniwal",
      title: "Badical Radboy",
      image: "/lovable-uploads/3e5668e1-a8d0-450f-9b2a-0e28a8dfbbc9.png",
      linkedin: "https://linkedin.com"
    }
  ];

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
      className={`relative px-0 py-0 font-barlow mb-0 ${isMobile ? 'min-h-screen w-full' : 'h-screen w-fit'}`} 
    >
      <div className={`mx-auto h-full p-0 ${isMobile ? 'w-full' : 'w-fit'}`}>
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
