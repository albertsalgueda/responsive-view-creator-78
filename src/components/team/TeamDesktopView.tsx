
import { TeamMember } from './TeamMemberInterface';
import ProfileNeil from '../Profile-Neil';
import ProfileStephen from '../Profile-Stephen';
import ProfileStephanie from '../Profile-Stephanie';
import ProfileCraig from '../Profile-Craig';
import ProfileAshish from '../Profile-Ashish';

interface TeamDesktopViewProps {
  displayMembers: TeamMember[];
}

const TeamDesktopView = ({ displayMembers }: TeamDesktopViewProps) => {
  return (
    <div className="relative h-full px-10 pt-[25vh]" style={{ width: 'fit-content' }}>
      <div className="flex items-end gap-5 fade-in-delay-1" style={{ position: 'relative', bottom: '40px', left: '10px', width: 'fit-content' }}>
        <div className="h-full inline-flex self-end">
          <ProfileStephanie 
            name={displayMembers[2].name} 
            role={displayMembers[2].title} 
            image={displayMembers[2].image} 
            background={displayMembers[2].background} 
            linkedin={displayMembers[2].linkedin} 
          />
        </div>
        <div className="h-full inline-flex self-start">
          <ProfileNeil 
            name={displayMembers[0].name} 
            role={displayMembers[0].title} 
            image={displayMembers[0].image} 
            background={displayMembers[0].background} 
            linkedin={displayMembers[0].linkedin} 
          />
        </div>
        <div className="h-full inline-flex self-start" style={{ marginTop: '0' }}>
          <ProfileStephen 
            name={displayMembers[1].name} 
            role={displayMembers[1].title} 
            image={displayMembers[1].image} 
            background={displayMembers[1].background} 
            linkedin={displayMembers[1].linkedin} 
          />
        </div>
        <div className="h-full inline-flex self-end">
          <ProfileCraig 
            name={displayMembers[3].name} 
            role={displayMembers[3].title} 
            image={displayMembers[3].image} 
            background={displayMembers[3].background} 
            linkedin={displayMembers[3].linkedin} 
          />
        </div>
        <div className="h-full inline-flex self-end">
          <ProfileAshish 
            name={displayMembers[4].name} 
            role={displayMembers[4].title} 
            image={displayMembers[4].image} 
            background={displayMembers[4].background} 
            linkedin={displayMembers[4].linkedin} 
          />
        </div>
      </div>
      
      <div className="absolute w-full h-full" style={{ display: 'none' }}>
              {/* We keep this code for future reference but it's currently not displayed */}
            </div>
    </div>
  );
};

export default TeamDesktopView;
