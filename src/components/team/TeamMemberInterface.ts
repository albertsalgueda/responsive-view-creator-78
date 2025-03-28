
export interface TeamMember {
  name: string;
  title?: string;
  bio?: string;
  image: string;
  linkedin?: string;
}

export interface TeamProps {
  members?: TeamMember[];
}

export interface ProfileProps {
  name: string;
  role: string;
  bio?: string;
  image: string;
  background?: string;
  linkedin?: string;
  isMobile: boolean;
  className?: string;
}
