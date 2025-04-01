
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
      title: "Head of Design",
      bio: "Visionary design leader blending storytelling, strategy and craft to shape the future of digital experiences.",
      image: "/lovable-uploads/22e2d6d3-0a4d-48d7-b306-80792636e616.png", // Updated Neil's image
      linkedin: "https://www.linkedin.com/in/neilstoeckle/"
    },
    {
      name: "Stephen Clements",
      title: "Chief Creative Officer",
      bio: "Design pioneer leading global creative organizations at the frontier of product and brand innovation for +20 years.",
      image: "/lovable-uploads/38784ffe-26ea-4b7b-9de9-eefb29627506.png", // Updated Stephen's image with the new one
      linkedin: "https://www.linkedin.com/in/clementss/"
    },
    {
      name: "Stephanie Wiseman",
      title: "CEOmg",
      bio: "Strategic leader known for scaling agencies, building world-class teams, and driving cultural impact through bold partnerships.",
      image: "/lovable-uploads/e1f502c4-f649-4cf0-b049-d36a7442ecf5.png", // Updated Stephanie's image
      linkedin: "https://www.linkedin.com/in/stephaniewiseman/"
    },
    {
      name: "Craig Kind",
      title: "Head of Studio",
      bio: "Award-winning creative director and studio head known for building high-impact content and innovation teams—and delivering globally resonant brand stories.",
      image: "/lovable-uploads/aacab860-2d76-4b1b-a88f-da4d14df4797.png", // Updated Craig's image with the new one
      linkedin: "https://www.linkedin.com/in/craigkind/"
    },
    {
      name: "Ashish Toshniwal",
      title: "Founder & President",
      bio: "Founder of YML, Silicon Valley's #1 agency, and the brain behind the platforms powering startups and Fortune 500s alike.",
      image: "/lovable-uploads/3e5668e1-a8d0-450f-9b2a-0e28a8dfbbc9.png",
      linkedin: "https://www.linkedin.com/in/ashishtoshniwal/"
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
