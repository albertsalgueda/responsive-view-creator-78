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
const TeamMobileView = ({
  displayMembers,
  textColor,
  transition
}: TeamMobileViewProps) => {
  return <div className="grid grid-cols-6 gap-8 px-0 w-full py-0">
      <div className="col-span-6 grid grid-cols-6 gap-8 mt-24 px-6 pb-[24] my-0">
        {/* Stephanie - spans all 6 columns */}
        <div className="col-span-6">
          <ProfileStephanie name={displayMembers[2].name} role={displayMembers[2].title} image={displayMembers[2].image} linkedin={displayMembers[2].linkedin} isMobile={true} className="" />
        </div>
        
        {/* Neil - spans columns 1-4 */}
        <div className="col-span-4">
          <ProfileNeil name={displayMembers[0].name} role={displayMembers[0].title} image={displayMembers[0].image} linkedin={displayMembers[0].linkedin} isMobile={true} className="w-full" />
        </div>
        
        {/* Empty space for columns 5-6 */}
        <div className="col-span-2"></div>
        
        {/* Empty space for columns 1-2 */}
        <div className="col-span-2"></div>
        
        {/* Craig - spans columns 3-6 */}
        <div className="col-span-4">
          <ProfileCraig name={displayMembers[3].name} role={displayMembers[3].title} image={displayMembers[3].image} linkedin={displayMembers[3].linkedin} isMobile={true} className="w-full" />
        </div>
        
        {/* Stephen - spans all 6 columns */}
        <div className="col-span-6">
          <ProfileStephen name={displayMembers[1].name} role={displayMembers[1].title} image={displayMembers[1].image} linkedin={displayMembers[1].linkedin} isMobile={true} className="w-full" />
        </div>
        
        {/* Ashish - spans columns 1-4 */}
        <div className="col-span-4">
          <ProfileAshish name={displayMembers[4].name} role={displayMembers[4].title} image={displayMembers[4].image} linkedin={displayMembers[4].linkedin} isMobile={true} className="w-full" />
        </div>
        
        {/* Empty space for columns 5-6 */}
        <div className="col-span-2"></div>
      </div>
    </div>;
};
export default TeamMobileView;