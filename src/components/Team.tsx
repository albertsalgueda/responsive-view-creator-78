
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
  title?: string;
  text1?: string;
  text2?: string;
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
  title = "Meet the team.",
  text1 = "The creative minds behind our innovative products.",
  text2 = "Our team brings diverse perspectives and expertise to create extraordinary experiences.",
  members = defaultMembers,
}: TeamProps) => {
  const isMobile = useIsMobile();
  const { textColor, transition } = useSectionColors();

  return (
    <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4 min-h-screen py-12 px-6">
            <div className="mt-16">
              <h1 
                style={{
                  lineHeight: 1.1,
                  fontWeight: 800,
                  fontStyle: 'italic',
                  color: textColor,
                  transition: transition,
                  marginTop: '-2vh'
                }} 
                className="font-extrabold slide-in-left font-barlow text-h1-mobile"
              >
                {title}
              </h1>
              <p 
                style={{
                  lineHeight: 1.3,
                  color: textColor,
                  transition: transition
                }} 
                className="mt-3 fade-in-delay-1 font-barlow font-medium text-text-medium"
              >
                {text1}
              </p>
              <p 
                style={{
                  lineHeight: 1.1,
                  color: textColor,
                  transition: transition
                }} 
                className="mt-3 fade-in-delay-2 font-barlow font-medium text-text-small"
              >
                {text2}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mt-6">
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
            <div className="absolute top-[20vh] left-[40px] w-full">
              <h1 
                style={{
                  lineHeight: 1.1,
                  fontWeight: 800,
                  fontStyle: 'italic',
                  color: textColor,
                  transition: transition,
                  marginTop: '-2vh'
                }} 
                className="font-extrabold slide-in-left font-barlow text-h1-desktop"
              >
                {title}
              </h1>
              <p 
                style={{
                  lineHeight: 1.3,
                  color: textColor,
                  transition: transition
                }} 
                className="mt-6 slide-in-left font-barlow font-medium text-text-medium w-1/2"
              >
                {text1}
              </p>
              <p 
                style={{
                  lineHeight: 1.1,
                  color: textColor,
                  transition: transition
                }} 
                className="mt-3 slide-in-left font-barlow font-medium text-text-small w-1/3"
              >
                {text2}
              </p>
            </div>
            
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
