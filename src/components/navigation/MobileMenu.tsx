
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerTitle } from "@/components/ui/drawer";
import { useSectionColors } from '@/hooks/use-section-colors';
import { TwoBarMenuIcon } from './TwoBarMenuIcon';
import { SmallLogo } from './SmallLogo';

interface MobileMenuProps {
  links: Array<{
    text: string;
    href: string;
  }>;
  handleNavLinkClick: (e: React.MouseEvent, href: string) => void;
}

const MobileMenu = ({ links, handleNavLinkClick }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { textColor, backgroundColor, transition } = useSectionColors();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2">
          <div style={{ 
            color: textColor,
            transition: transition
          }}>
            <TwoBarMenuIcon />
          </div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-none" style={{ 
        backgroundColor: backgroundColor,
        transition: transition
      }}>
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        
        <div className="flex flex-col h-full justify-between px-6 pb-4">
          <div className="flex items-center justify-between py-4 relative">
            <div 
              className="absolute left-1/2 -translate-x-1/2 h-1.5 w-[60px] rounded-full" 
              style={{ backgroundColor: textColor, transition: transition }}
            />
            <div className="flex-1"></div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="relative z-10">
                <X size={32} strokeWidth={4} style={{ color: textColor }} />
              </Button>
            </DrawerClose>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="flex flex-col gap-5 items-start w-full pb-8">
              {links.filter(link => link.text !== "let's talk").map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  style={{
                    lineHeight: 1.2,
                    color: textColor,
                    transition: transition
                  }} 
                  onClick={(e) => handleNavLinkClick(e, link.href)} 
                  className="text-base font-medium font-barlow uppercase hover:opacity-80 transition-all"
                >
                  {link.text}
                </a>
              ))}
              
              {links.find(link => link.text === "let's talk") && (
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavLinkClick(e, "#contact")} 
                  className="mt-4"
                >
                  <Button 
                    className="hover:opacity-90 transition-all duration-500 px-6 py-3 rounded-sm font-medium font-barlow text-base uppercase"
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
          </div>
          
          <div className="mt-auto pt-6 flex flex-col">
            <div className="border-t w-full mb-4 pt-4 flex justify-between items-end" style={{ borderColor: `${textColor}20` }}>
              <div style={{ color: textColor, transition: transition }} className="text-[2.25vh] font-barlow font-medium">
                10kR ©2025
              </div>
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: textColor, transition: transition }} className="hover:opacity-80 transition-all uppercase text-[2.25vh] font-barlow font-medium">
                  LinkedIn
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: textColor, transition: transition }} className="hover:opacity-80 transition-all uppercase text-[2.25vh] font-barlow font-medium">
                  Instagram
                </a>
              </div>
            </div>
            <div className="w-full h-auto">
              <SmallLogo />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
