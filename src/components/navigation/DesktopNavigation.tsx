
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSectionColors } from '@/hooks/use-section-colors';

interface DesktopNavigationProps {
  links: Array<{
    text: string;
    href: string;
  }>;
  handleNavLinkClick: (e: React.MouseEvent, href: string) => void;
  scrollToEnd: (e: React.MouseEvent) => void;
}

const DesktopNavigation = ({ links, handleNavLinkClick, scrollToEnd }: DesktopNavigationProps) => {
  const { textColor, backgroundColor, transition } = useSectionColors();
  
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-10">
        {links.filter(link => link.text !== "let's talk").map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            onClick={(e) => handleNavLinkClick(e, link.href)}
            className="text-base font-medium font-barlow hover:opacity-80 transition-all uppercase"
            style={{
              color: textColor,
              transition: transition
            }}
          >
            {link.text}
          </a>
        ))}
      </div>
      
      {links.find(link => link.text === "let's talk") && (
        <a href="#contact" onClick={scrollToEnd}>
          <Button 
            className="hover:opacity-90 transition-all duration-500 px-6 py-3 rounded-sm font-medium font-barlow text-base"
            style={{
              backgroundColor: textColor,
              color: backgroundColor,
              transition: transition
            }}
          >
            LET'S TALK
          </Button>
        </a>
      )}
    </div>
  );
};

export default DesktopNavigation;
