
import { TeamMember } from './TeamMemberInterface';
import ProfileNeil from '../Profile-Neil';
import ProfileStephen from '../Profile-Stephen';
import ProfileStephanie from '../Profile-Stephanie';
import ProfileCraig from '../Profile-Craig';
import ProfileAshish from '../Profile-Ashish';

interface TeamMobileViewProps {
  displayMembers: TeamMember[];
  textColor: string;
  transition: string;
}

const TeamMobileView = ({ displayMembers, textColor, transition }: TeamMobileViewProps) => {
  return (
    <div className="grid grid-cols-6 gap-8 min-h-screen py-12 px-0 w-full">
      <div className="flex flex-col items-start gap-10 mt-24 col-span-6 px-6">
        {/* Stephanie - spans all 6 columns */}
        <div className="col-span-6 w-full">
          <ProfileStephanie 
            name={displayMembers[2].name} 
            role={displayMembers[2].title} 
            image={displayMembers[2].image}
            linkedin={displayMembers[2].linkedin}
            isMobile={true}
            className="col-span-6"
          />
        </div>
        
        {/* Neil - spans columns 1-4 */}
        <div className="col-span-4 w-full">
          <ProfileNeil 
            name={displayMembers[0].name} 
            role={displayMembers[0].title} 
            image={displayMembers[0].image}
            linkedin={displayMembers[0].linkedin}
            isMobile={true}
            className="col-span-4"
          />
        </div>
        
        {/* Craig - spans columns 3-6 (needs special handling) */}
        <div className="col-start-3 col-span-4 w-full justify-self-end">
          <ProfileCraig 
            name={displayMembers[3].name} 
            role={displayMembers[3].title} 
            image={displayMembers[3].image}
            linkedin={displayMembers[3].linkedin}
            isMobile={true}
            className="col-span-4"
          />
        </div>
        
        {/* Stephen - spans all 6 columns */}
        <div className="col-span-6 w-full">
          <ProfileStephen 
            name={displayMembers[1].name} 
            role={displayMembers[1].title} 
            image={displayMembers[1].image}
            linkedin={displayMembers[1].linkedin}
            isMobile={true}
            className="col-span-6"
          />
        </div>
        
        {/* Ashish - spans columns 1-4 */}
        <div className="col-span-4 w-full">
          <ProfileAshish 
            name={displayMembers[4].name} 
            role={displayMembers[4].title} 
            image={displayMembers[4].image}
            linkedin={displayMembers[4].linkedin}
            isMobile={true}
            className="col-span-4"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamMobileView;
