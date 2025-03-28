
import { forwardRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useSectionColors } from '@/hooks/use-section-colors';
import { ProfileProps } from './team/TeamMemberInterface';

const LinkedInIcon = () => (
  <svg 
    viewBox="0 0 455 455" 
    className="w-6 h-6 rounded-sm"
    fill="currentColor"
  >
    <g>
      <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M246.4,204.35v-0.665c-0.136,0.223-0.324,0.446-0.442,0.665H246.4z"/>
      <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M0,0v455h455V0H0z M141.522,378.002H74.016V174.906h67.506V378.002z
        M107.769,147.186h-0.446C84.678,147.186,70,131.585,70,112.085c0-19.928,15.107-35.087,38.211-35.087
        c23.109,0,37.31,15.159,37.752,35.087C145.963,131.585,131.32,147.186,107.769,147.186z M385,378.002h-67.524V269.345
        c0-27.291-9.756-45.92-34.195-45.92c-18.664,0-29.755,12.543-34.641,24.693c-1.776,4.34-2.24,10.373-2.24,16.459v113.426h-67.537
        c0,0,0.905-184.043,0-203.096H246.4v28.779c8.973-13.807,24.986-33.547,60.856-33.547c44.437,0,77.744,29.02,77.744,91.398V378.002
        z"/>
    </g>
  </svg>
);

const ProfileCraig = forwardRef<HTMLDivElement, ProfileProps>(
  ({ name, role, image, background, linkedin, isMobile, className }, ref) => {
    const { textColor, transition } = useSectionColors();
    
    // Use a placeholder image if none provided
    const defaultPlaceholder = "https://via.placeholder.com/500x500";
    
    // Add proper handling for image paths
    let imageUrl = image || defaultPlaceholder;
    
    // Make sure file extension is correct for specific known files
    if (imageUrl.includes('f34e0bc8-b159-4351-8da9-0d3aa6828578')) {
      imageUrl = imageUrl.replace('.jpg', '.png');
    }
    
    console.log("Profile-Craig component rendering with image URL:", imageUrl);
    
    if (isMobile) {
      return (
        <div ref={ref} className={cn("flex flex-col", className)}>
          <div className="flex flex-col items-start">
            <div className="w-[30vh] h-[30vh] rounded-lg overflow-hidden flex-shrink-0 relative mb-4">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover absolute inset-0" 
                onError={e => {
                  console.error("Error loading direct image:", imageUrl);
                  e.currentTarget.src = defaultPlaceholder;
                }} 
              />
              
              {/* Keep Avatar as fallback */}
              <Avatar className="w-full h-full rounded-lg opacity-0">
                <AvatarImage src={imageUrl} alt={name} className="object-cover w-full h-full" onError={e => {
                  console.error("Error loading avatar image:", imageUrl);
                  e.currentTarget.src = defaultPlaceholder;
                }} />
                <AvatarFallback className="text-7xl opacity-100">{name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex flex-col items-start">
              <h3 className="text-text-large-mobile font-barlow font-black italic text-left" style={{
                color: textColor,
                transition
              }}>{name}</h3>
              <p className="text-text-medium font-barlow mt-2 text-left" style={{
                color: textColor,
                transition
              }}>{role}</p>
              
              {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block hover:opacity-80 transition-opacity" aria-label={`${name}'s LinkedIn profile`}>
                  <div className="w-10 h-10 flex items-center justify-center border border-current rounded-lg overflow-hidden" style={{
                    color: textColor,
                    transition
                  }}>
                    <LinkedInIcon />
                  </div>
                </a>}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        ref={ref}
        className={cn("h-full inline-flex flex-col justify-end", className)}
      >
        <div className="flex items-start gap-6">
          <div 
            className="w-[30vh] h-[30vh] rounded-lg overflow-hidden flex-shrink-0 relative"
          >
            <img 
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                console.error("Error loading direct image:", imageUrl);
                e.currentTarget.src = defaultPlaceholder;
              }}
            />
            
            {/* Keep Avatar as fallback */}
            <Avatar className="w-full h-full rounded-lg opacity-0">
              <AvatarImage 
                src={imageUrl} 
                alt={name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  console.error("Error loading avatar image:", imageUrl);
                  e.currentTarget.src = defaultPlaceholder;
                }}
              />
              <AvatarFallback className="text-7xl opacity-100">{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex flex-col justify-end h-[30vh]">
            <h3 
              className="text-text-large-desktop font-barlow font-black italic whitespace-nowrap"
              style={{ color: textColor, transition }}
            >{name}</h3>
            <p 
              className="text-text-medium font-barlow mt-2 whitespace-nowrap"
              style={{ color: textColor, transition }}
            >{role}</p>
            
            {linkedin && (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-block hover:opacity-80 transition-opacity"
                aria-label={`${name}'s LinkedIn profile`}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center border border-current rounded-lg overflow-hidden"
                  style={{ color: textColor, transition }}
                >
                  <LinkedInIcon />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProfileCraig.displayName = "ProfileCraig";

export default ProfileCraig;
