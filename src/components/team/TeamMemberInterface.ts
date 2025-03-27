
export interface TeamMember {
  name: string;
  title: string;
  image: string;
  background: string;
  linkedin?: string;
}

export interface TeamProps {
  members?: TeamMember[];
}
