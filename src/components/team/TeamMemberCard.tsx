
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin } from 'lucide-react';
import { TeamMember } from './TeamMemberInterface';

interface TeamMemberCardProps {
  member: TeamMember;
  textColor: string;
  transition: string;
}

const TeamMemberCard = ({
  member,
  textColor,
  transition
}: TeamMemberCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-sm overflow-hidden mb-2">
        <Avatar className="w-32 h-32 rounded-sm">
          <AvatarImage 
            src={member.image} 
            alt={member.name} 
            onError={(e) => {
              console.error("Error loading team member card image:", member.image);
              e.currentTarget.src = "https://via.placeholder.com/500x500";
            }} 
          />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
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
          className="text-sm font-barlow font-medium whitespace-nowrap"
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
              className="w-4 h-4 mt-1" 
              style={{
                color: textColor,
                transition,
                borderRadius: '2px'
              }} 
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
