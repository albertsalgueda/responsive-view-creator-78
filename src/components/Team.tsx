import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin } from 'lucide-react';
import Profile from './Profile';
import { useEffect, useState } from 'react';

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
    image: "/lovable-uploads/f34e0bc8-b159-4351-8da9-0d3aa6828578.jpg",
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
  const [imageStatuses, setImageStatuses] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    members.forEach(member => {
      const img = new Image();
      img.onload = () => {
        console.log(`Successfully preloaded image for ${member.name}:`, member.image);
        setImageStatuses(prev => ({...prev, [member.image]: true}));
      };
      img.onerror = () => {
        console.error(`Failed to preload image for ${member.name}:`, member.image);
        setImageStatuses(prev => ({...prev, [member.image]: false}));
      };
      img.src = member.image;
      
      console.log(`Complete URL for ${member.name}:`, new URL(member.image, window.location.href).href);
    });
  }, [members]);

  return (
    <section className={`w-full relative px-0 py-0 overflow-hidden font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
      <div className="max-w-7xl w-full mx-auto h-full p-0">
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4 min-h-screen py-12 px-6">            
            <div className="grid grid-cols-1 gap-6 mt-24">
              {members.map((member, index) => (
                <TeamMemberMobile 
                  key={index} 
                  member={member} 
                  textColor={textColor} 
                  transition={transition} 
                  imageLoaded={imageStatuses[member.image]}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-full">            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fade-in-delay-1">
              <Profile 
                name={members[0].name}
                role={members[0].title}
                image={members[0].image}
                background={members[0].background}
                linkedin={members[0].linkedin}
              />
            </div>
            
            <div className="absolute w-full h-full" style={{ display: 'none' }}>
              <div className="absolute top-[20%] left-[35%] fade-in-delay-1">
                <TeamMemberCard member={members[0]} textColor={textColor} transition={transition} />
              </div>
              
              <div className="absolute top-[20%] right-[10%] fade-in-delay-1">
                <TeamMemberCard member={members[1]} textColor={textColor} transition={transition} />
              </div>
              
              <div className="absolute top-[50%] left-[10%] fade-in-delay-1">
                <TeamMemberCard member={members[2]} textColor={textColor} transition={transition} />
              </div>
              
              <div className="absolute bottom-[30%] left-[40%] fade-in-delay-2">
                <TeamMemberCard member={members[3]} textColor={textColor} transition={transition} />
              </div>
              
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

const TeamMemberMobile = ({ 
  member, 
  textColor, 
  transition,
  imageLoaded
}: { 
  member: TeamMember, 
  textColor: string, 
  transition: string,
  imageLoaded?: boolean
}) => {
  const [imgSrc, setImgSrc] = useState(member.image);
  const [error, setError] = useState(false);
  
  return (
    <div className="fade-in-delay-2 flex items-center space-x-4">
      <div 
        className="rounded-lg overflow-hidden relative"
        style={{ background: member.background }}
      >
        {!error ? (
          <img 
            src={imgSrc}
            alt={member.name}
            className="w-20 h-20 object-cover rounded-lg"
            onLoad={() => console.log("Team member image loaded:", imgSrc)}
            onError={(e) => {
              console.error("Error loading team member image:", imgSrc);
              setError(true);
              setImgSrc("/placeholder.svg");
            }}
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center text-xl font-bold bg-gray-200 rounded-lg">
            {member.name.charAt(0)}
          </div>
        )}
        
        {process.env.NODE_ENV !== 'production' && (
          <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white p-1 text-xs rounded-br">
            {imageLoaded ? "✅" : "❌"}
          </div>
        )}
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
            <Linkedin className="w-4 h-4 mt-1 rounded-sm" style={{ color: textColor, transition }} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Team;
