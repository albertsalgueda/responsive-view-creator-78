
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  background: string;
  linkedin?: string;
}

interface TeamProps {
  members?: TeamMember[];
}

const defaultMembers: TeamMember[] = [
  {
    name: "Neil Stoeckle",
    title: "Founder",
    image: "/placeholder.svg",
    background: "#FDB0C2", // pink
    linkedin: "https://linkedin.com"
  },
  {
    name: "Stephen Clements",
    title: "Founder",
    image: "/placeholder.svg",
    background: "#132ABC", // blue
    linkedin: "https://linkedin.com"
  },
  {
    name: "Stephanie Wiseman",
    title: "Founder",
    image: "/placeholder.svg",
    background: "#FFBD89", // coral
    linkedin: "https://linkedin.com"
  },
  {
    name: "Craig Kind",
    title: "Founder",
    image: "/placeholder.svg",
    background: "#97ECCF", // green
    linkedin: "https://linkedin.com"
  },
  {
    name: "Ashish Toshniwal",
    title: "Founder",
    image: "/placeholder.svg",
    background: "#2A0831", // purple
    linkedin: "https://linkedin.com"
  }
];

const Team = ({
  members = defaultMembers,
}: TeamProps) => {
  const isMobile = useIsMobile();
  const { textColor, transition } = useSectionColors();

  return (
    <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4 min-h-screen py-12 px-6">            
            <div className="grid grid-cols-1 gap-6 mt-24">
              {members.map((member, index) => (
                <div key={index} className="fade-in-delay-2 flex items-center space-x-4">
                  <div 
                    className="rounded-lg overflow-hidden"
                    style={{ background: member.background }}
                  >
                    <Avatar className="w-20 h-20 rounded-lg">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 
                      style={{ color: textColor, transition }}
                      className="font-bold text-lg"
                    >
                      {member.name}
                    </h3>
                    <p 
                      style={{ color: textColor, transition }}
                      className="text-sm"
                    >
                      {member.title}
                    </p>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mt-1" style={{ color: textColor, transition }} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-full">            
            {/* Layout for team members in a scattered pattern */}
            <div className="absolute w-full h-full">
              {/* Neil */}
              <div className="absolute top-[20%] left-[35%] fade-in-delay-1">
                <TeamMemberCard member={members[0]} textColor={textColor} transition={transition} />
              </div>
              
              {/* Stephen */}
              <div className="absolute top-[20%] right-[10%] fade-in-delay-1">
                <TeamMemberCard member={members[1]} textColor={textColor} transition={transition} />
              </div>
              
              {/* Stephanie */}
              <div className="absolute top-[50%] left-[10%] fade-in-delay-1">
                <TeamMemberCard member={members[2]} textColor={textColor} transition={transition} />
              </div>
              
              {/* Craig */}
              <div className="absolute bottom-[30%] left-[40%] fade-in-delay-2">
                <TeamMemberCard member={members[3]} textColor={textColor} transition={transition} />
              </div>
              
              {/* Ashish */}
              <div className="absolute bottom-[25%] right-[15%] fade-in-delay-2">
                <TeamMemberCard member={members[4]} textColor={textColor} transition={transition} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Separate component for displaying a team member card
const TeamMemberCard = ({ 
  member, 
  textColor, 
  transition 
}: { 
  member: TeamMember, 
  textColor: string, 
  transition: string 
}) => {
  return (
    <div className="flex flex-col">
      <div 
        className="rounded-2xl overflow-hidden mb-2"
        style={{ background: member.background }}
      >
        <Avatar className="w-32 h-32 rounded-2xl">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 
          style={{ color: textColor, transition }}
          className="font-bold text-lg"
        >
          {member.name}
        </h3>
        <p 
          style={{ color: textColor, transition }}
          className="text-sm"
        >
          {member.title}
        </p>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4 mt-1" style={{ color: textColor, transition }} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Team;
