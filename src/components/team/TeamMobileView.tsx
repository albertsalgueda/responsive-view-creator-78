
import { TeamMember } from './TeamMemberInterface';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin } from 'lucide-react';

interface TeamMobileViewProps {
  displayMembers: TeamMember[];
  textColor: string;
  transition: string;
}

const TeamMobileView = ({ displayMembers, textColor, transition }: TeamMobileViewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 min-h-screen py-12 px-6">
      <div className="grid grid-cols-1 gap-6 mt-24">
        {displayMembers.map((member, index) => (
          <div key={index} className="fade-in-delay-2 flex items-center space-x-4">
            <div 
              className="rounded-lg overflow-hidden relative"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-20 h-20 object-cover absolute inset-0 rounded-lg" 
                onError={(e) => {
                  console.error("Error loading direct team member image:", member.image);
                  e.currentTarget.src = "https://via.placeholder.com/500x500";
                }} 
              />
              <Avatar className="w-20 h-20 rounded-lg opacity-0">
                <AvatarImage 
                  src={member.image} 
                  alt={member.name} 
                  onError={(e) => {
                    console.error("Error loading team member image:", member.image);
                    e.currentTarget.src = "https://via.placeholder.com/500x500";
                  }} 
                />
                <AvatarFallback className="opacity-100">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 
                style={{
                  color: textColor,
                  transition
                }} 
                className="font-bold text-lg whitespace-nowrap"
              >
                {member.name}
              </h3>
              <p 
                style={{
                  color: textColor,
                  transition
                }} 
                className="text-sm whitespace-nowrap"
              >
                {member.title}
              </p>
              {member.linkedin && (
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin 
                    className="w-4 h-4 mt-1 rounded-sm" 
                    style={{
                      color: textColor,
                      transition
                    }} 
                  />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMobileView;
