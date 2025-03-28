import { TeamMember } from './TeamMemberInterface';
import Profile from '../Profile';

interface TeamDesktopViewProps {
  displayMembers: TeamMember[];
}

const TeamDesktopView = ({ displayMembers }: TeamDesktopViewProps) => {
  return (
    <div className="relative h-full px-10 pt-[25vh] pb-[40px]" style={{ width: 'fit-content' }}>
      <div 
        className="flex items-start gap-5 fade-in-delay-1 h-full" 
        style={{ width: 'fit-content' }}
      >
        {displayMembers.map((member, index) => (
          <div 
            key={index} 
            className={`h-full inline-flex ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
          >
            <Profile 
              name={member.name} 
              role={member.title} 
              image={member.image}
              linkedin={member.linkedin} 
            />
          </div>
        ))}
      </div>
      
      <div className="absolute w-full h-full" style={{ display: 'none' }}>
        {/* We keep this code for future reference but it's currently not displayed */}
      </div>
    </div>
  );
};

export default TeamDesktopView;
