
export interface TeamMember {
  name: string;
  title: string;
  image: string;
  background?: string;
  linkedin?: string;
}

export interface TeamProps {
  members?: TeamMember[];
}

export interface ProfileProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  isMobile?: boolean;
  className?: string;
}
