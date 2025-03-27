
import { useIsMobile } from '@/hooks/use-mobile';
import { useSectionColors } from '@/hooks/use-section-colors';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin } from 'lucide-react';
import ProfileNeil from './Profile-Neil';
import ProfileStephen from './Profile-Stephen';
import ProfileStephanie from './Profile-Stephanie';
import ProfileCraig from './Profile-Craig';
import { useEffect } from 'react';

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
    background: "#FDB0C2",
    // pink
    linkedin: "https://linkedin.com"
  }, {
    name: "Stephen Clements",
    title: "Me ol' China",
    image: "/lovable-uploads/35e452fd-ea52-4223-948d-79dd2bd00b0a.png",
    background: "#97ECCF",
    // green
    linkedin: "https://linkedin.com"
  }, {
    name: "Stephanie Wiseman",
    title: "CEOmg",
    image: "/lovable-uploads/8c33a416-6372-49ce-822a-c56bbb42a47c.png",
    background: "#FFBD89",
    // coral
    linkedin: "https://linkedin.com"
  }, {
    name: "Craig Kind",
    title: "Muh Fuh Word Genius",
    image: "/lovable-uploads/40349571-793d-487f-8d19-1a987f373b43.png",
    background: "#4EACF2",
    // blue
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

  return <section className={`w-fit relative px-0 py-0 font-barlow mb-0 ${isMobile ? 'min-h-screen' : 'h-screen'}`} style={{ width: 'fit-content' }}>
      <div className="w-fit mx-auto h-full p-0" style={{ width: 'fit-content' }}>
        {isMobile ? <div className="grid grid-cols-1 gap-4 min-h-screen py-12 px-6">            
            <div className="grid grid-cols-1 gap-6 mt-24">
              {displayMembers.map((member, index) => <div key={index} className="fade-in-delay-2 flex items-center space-x-4">
                  <div className="rounded-lg overflow-hidden relative" style={{
              background: member.background
            }}>
                    <img src={member.image} alt={member.name} className="w-20 h-20 object-cover absolute inset-0 rounded-lg" onError={e => {
                console.error("Error loading direct team member image:", member.image);
                e.currentTarget.src = "https://via.placeholder.com/500x500";
              }} />
                    <Avatar className="w-20 h-20 rounded-lg opacity-0">
                      <AvatarImage src={member.image} alt={member.name} onError={e => {
                  console.error("Error loading team member image:", member.image);
                  e.currentTarget.src = "https://via.placeholder.com/500x500";
                }} />
                      <AvatarFallback className="opacity-100">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 style={{
                color: textColor,
                transition
              }} className="font-bold text-lg whitespace-nowrap">
                      {member.name}
                    </h3>
                    <p style={{
                color: textColor,
                transition
              }} className="text-sm whitespace-nowrap">
                      {member.title}
                    </p>
                    {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mt-1 rounded-sm" style={{
                  color: textColor,
                  transition
                }} />
                      </a>}
                  </div>
                </div>)}
            </div>
          </div> : <div className="relative h-full px-10 pt-[25vh]" style={{ width: 'fit-content' }}>            
            <div className="flex items-start gap-5 fade-in-delay-1" style={{ position: 'relative', bottom: '40px', left: '10px', width: 'fit-content' }}>
              <div className="h-full inline-flex mr-5">
                <ProfileStephanie 
                  name={displayMembers[2].name} 
                  role={displayMembers[2].title} 
                  image={displayMembers[2].image} 
                  background={displayMembers[2].background} 
                  linkedin={displayMembers[2].linkedin} 
                />
              </div>
              <div className="h-full inline-flex">
                <ProfileNeil 
                  name={displayMembers[0].name} 
                  role={displayMembers[0].title} 
                  image={displayMembers[0].image} 
                  background={displayMembers[0].background} 
                  linkedin={displayMembers[0].linkedin} 
                />
              </div>
              <div className="h-full inline-flex align-top" style={{ marginTop: '25vh' }}>
                <ProfileStephen 
                  name={displayMembers[1].name} 
                  role={displayMembers[1].title} 
                  image={displayMembers[1].image} 
                  background={displayMembers[1].background} 
                  linkedin={displayMembers[1].linkedin} 
                />
              </div>
              <div className="h-full inline-flex">
                <ProfileCraig 
                  name={displayMembers[3].name} 
                  role={displayMembers[3].title} 
                  image={displayMembers[3].image} 
                  background={displayMembers[3].background} 
                  linkedin={displayMembers[3].linkedin} 
                />
              </div>
            </div>
            
            <div className="absolute w-full h-full" style={{
          display: 'none'
        }}>
              {/* We keep this code for future reference but it's currently not displayed */}
            </div>
          </div>}
      </div>
    </section>;
};

const TeamMemberCard = ({
  member,
  textColor,
  transition
}: {
  member: TeamMember;
  textColor: string;
  transition: string;
}) => {
  return <div className="flex flex-col">
      <div className="rounded-2xl overflow-hidden mb-2" style={{
      background: member.background
    }}>
        <Avatar className="w-32 h-32 rounded-2xl">
          <AvatarImage src={member.image} alt={member.name} onError={e => {
          console.error("Error loading team member card image:", member.image);
          e.currentTarget.src = "https://via.placeholder.com/500x500";
        }} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 style={{
        color: textColor,
        transition
      }} className="font-bold text-lg whitespace-nowrap">
          {member.name}
        </h3>
        <p style={{
        color: textColor,
        transition
      }} className="text-sm whitespace-nowrap">
          {member.title}
        </p>
        {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4 mt-1 rounded-sm" style={{
          color: textColor,
          transition
        }} />
          </a>}
      </div>
    </div>;
};

export default Team;
