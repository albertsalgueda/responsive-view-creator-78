
import { TeamMember } from './TeamMemberInterface';
import Profile from '../Profile';

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
          <div 
            key={index} 
            className="fade-in-delay-2 flex items-center"
          >
            <Profile 
              name={member.name} 
              role={member.title} 
              image={member.image}
              linkedin={member.linkedin} 
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMobileView;
