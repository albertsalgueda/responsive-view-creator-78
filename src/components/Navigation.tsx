
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { X, Instagram, Linkedin } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useView } from '@/context/ViewContext';

interface NavigationProps {
  links?: Array<{
    text: string;
    href: string;
  }>;
}

const Navigation = ({
  links = [{
    text: "why we're here",
    href: "#video"
  }, {
    text: "what we do",
    href: "#main2"
  }, {
    text: "who we are",
    href: "#main3"
  }, {
    text: "let's talk",
    href: "#contact"
  }]
}: NavigationProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    currentSection
  } = useView();

  const getNavColor = () => {
    switch (currentSection) {
      case 'video':
        return '#FDB0C2';
      case 'main1':
        return '#132ABC';
      case 'main2':
        return '#FFBD89';
      case 'main3':
      case 'services':
        return '#97ECCF';
      case 'contact':
        return '#FDB0C2';
      default:
        return '#132ABC';
    }
  };
  const navColor = getNavColor();
  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  if (!mounted) return null;

  // Find only the "let's talk" link for desktop view
  const letsTalkLink = links.find(link => link.text === "let's talk");

  // Custom 2-bar menu icon
  const TwoBarMenuIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="12" width="48" height="4" rx="2" fill="currentColor"/>
      <rect y="32" width="48" height="4" rx="2" fill="currentColor"/>
    </svg>
  );

  const SmallLogo = () => <svg width="100%" height="100%" viewBox="0 0 343 153" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M165.99 38.1758C165.99 45.1565 164.316 51.5555 160.968 57.3727C157.474 63.19 152.889 67.8438 147.212 71.3342C141.389 74.6791 134.911 76.3515 127.778 76.3515H38.2119C31.079 76.3515 24.674 74.6791 18.9968 71.3342C13.174 67.8438 8.58858 63.19 5.24049 57.3727C1.74683 51.5555 3.05426e-07 45.1565 0 38.1758C-3.05426e-07 31.1951 1.74682 24.7961 5.24049 18.9788C8.58858 13.1616 13.174 8.58047 18.9968 5.23555C24.674 1.74519 31.079 3.83964e-06 38.2119 3.52814e-06L127.778 0C134.911 -3.11493e-07 141.389 1.74518 147.212 5.23554C152.889 8.58047 157.474 13.1616 160.968 18.9788C164.316 24.7961 165.99 31.1951 165.99 38.1758ZM137.168 38.1758C137.168 36.576 136.658 35.2671 135.639 34.2491C134.475 33.2311 133.164 32.7221 131.709 32.7221L34.0632 32.7221C32.462 32.7221 31.1518 33.2311 30.1328 34.2491C28.9683 35.2671 28.386 36.576 28.386 38.1758C28.386 39.7755 28.9683 41.1571 30.1328 42.3206C31.1518 43.3386 32.462 43.8476 34.0632 43.8476L131.709 43.8476C133.164 43.8476 134.475 43.3386 135.639 42.3206C136.658 41.1571 137.168 39.7755 137.168 38.1758Z" fill={navColor} />
      <path d="M266.567 152.703V0H299.975C307.836 0 315.042 1.96332 321.592 5.88997C328.143 9.6712 333.31 14.834 337.095 21.3784C341.026 27.7774 342.991 34.9763 342.991 42.975V68.4982C342.991 72.2795 342.045 77.2241 340.152 83.3322C338.26 89.2949 334.693 94.6759 329.453 99.4752V102.747L342.991 152.703H310.238L301.067 110.601H299.102V152.703H266.567ZM299.102 82.4597H300.849C303.469 82.4597 305.652 81.7325 307.399 80.2782C309.292 78.6784 310.238 74.7518 310.238 68.4982V42.3206C310.238 36.2124 309.292 32.3585 307.399 30.7588C305.652 29.159 303.469 28.3591 300.849 28.3591H299.102V82.4597Z" fill={navColor} />
      <path d="M176.97 152.703V0H209.505V43.6295H211.688L220.641 0H253.394V4.36295L231.559 66.3168V69.589L253.394 148.34V152.703H220.641L211.688 105.583H209.505V152.703H176.97Z" fill={navColor} />
      <path d="M135.639 152.612H163.806V89.5126H2.18315V124.491L30.9852 152.612H63.759V143.907L43.2868 121.927H135.639V152.612Z" fill={navColor} />
    </svg>;

  const LargeLogo = () => <svg width="100%" height="100%" viewBox="0 0 128 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M99.3323 0H0V64H99.3323V0Z" fill="#132ABC" />
      <path d="M23.4038 14.2842C23.4038 16.8354 22.9788 19.2042 22.1284 21.3905C21.2781 23.5769 20.086 25.387 18.5519 26.8211C16.9504 28.2552 15.1311 29.2772 13.0949 29.8876H50.0137C47.9774 29.2772 46.1902 28.2552 44.6521 26.8211C43.1141 25.387 41.9221 23.5769 41.0757 21.3905C40.2295 19.2042 39.8063 16.8354 39.8063 14.2842C39.8063 11.733 40.2295 9.36425 41.0757 7.17782C41.9221 4.99155 43.1141 3.18148 44.6521 1.74754C46.1902 0.31361 47.9774 -0.708353 50.0137 -1.31875H13.0949C15.1311 -0.708353 16.9504 0.31361 18.5519 1.74754C20.086 3.18148 21.2781 4.99155 22.1284 7.17782C22.9788 9.36425 23.4038 11.733 23.4038 14.2842Z" fill="#FDB0C2" />
      <path d="M95.5225 13.8913H64.1768V15.2368H95.5225V13.8913Z" fill="#FDB0C2" />
      <path d="M87.7485 44.4316V15.8875H100.9V44.4316H87.7485Z" fill="#FDB0C2" />
      <path d="M118.052 44.4316V15.8875H128V44.4316H118.052Z" fill="#FDB0C2" />
      <path d="M100.9 15.8875H118.052V25.8353H100.9V15.8875Z" fill="#FDB0C2" />
      <path d="M100.9 30.1263H118.052V44.4316H100.9V30.1263Z" fill="#FDB0C2" />
    </svg>;

  const FullWidthLogo = () => <svg width="100%" height="100%" viewBox="0 0 343 153" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M165.99 38.1758C165.99 45.1565 164.316 51.5555 160.968 57.3727C157.474 63.19 152.889 67.8438 147.212 71.3342C141.389 74.6791 134.911 76.3515 127.778 76.3515H38.2119C31.079 76.3515 24.674 74.6791 18.9968 71.3342C13.174 67.8438 8.58858 63.19 5.24049 57.3727C1.74683 51.5555 3.05426e-07 45.1565 0 38.1758C-3.05426e-07 31.1951 1.74682 24.7961 5.24049 18.9788C8.58858 13.1616 13.174 8.58047 18.9968 5.23555C24.674 1.74519 31.079 3.83964e-06 38.2119 3.52814e-06L127.778 0C134.911 -3.11493e-07 141.389 1.74518 147.212 5.23554C152.889 8.58047 157.474 13.1616 160.968 18.9788C164.316 24.7961 165.99 31.1951 165.99 38.1758ZM137.168 38.1758C137.168 36.576 136.658 35.2671 135.639 34.2491C134.475 33.2311 133.164 32.7221 131.709 32.7221L34.0632 32.7221C32.462 32.7221 31.1518 33.2311 30.1328 34.2491C28.9683 35.2671 28.386 36.576 28.386 38.1758C28.386 39.7755 28.9683 41.1571 30.1328 42.3206C31.1518 43.3386 32.462 43.8476 34.0632 43.8476L131.709 43.8476C133.164 43.8476 134.475 43.3386 135.639 42.3206C136.658 41.1571 137.168 39.7755 137.168 38.1758Z" fill="#132ABC"/>
      <path d="M266.567 152.703V0H299.975C307.836 0 315.042 1.96332 321.592 5.88997C328.143 9.6712 333.31 14.834 337.095 21.3784C341.026 27.7774 342.991 34.9763 342.991 42.975V68.4982C342.991 72.2795 342.045 77.2241 340.152 83.3322C338.26 89.2949 334.693 94.6759 329.453 99.4752V102.747L342.991 152.703H310.238L301.067 110.601H299.102V152.703H266.567ZM299.102 82.4597H300.849C303.469 82.4597 305.652 81.7325 307.399 80.2782C309.292 78.6784 310.238 74.7518 310.238 68.4982V42.3206C310.238 36.2124 309.292 32.3585 307.399 30.7588C305.652 29.159 303.469 28.3591 300.849 28.3591H299.102V82.4597Z" fill="#132ABC"/>
      <path d="M176.97 152.703V0H209.505V43.6295H211.688L220.641 0H253.394V4.36295L231.559 66.3168V69.589L253.394 148.34V152.703H220.641L211.688 105.583H209.505V152.703H176.97Z" fill="#132ABC"/>
      <path d="M135.639 152.612H163.806V89.5126H2.18315V124.491L30.9852 152.612H63.759V143.907L43.2868 121.927H135.639V152.612Z" fill="#132ABC"/>
    </svg>;

  const MobileMenu = () => <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2">
          <div style={{ 
            color: navColor,
            transition: 'color 1.2s ease-out' 
          }}>
            <TwoBarMenuIcon />
          </div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] bg-brand-pink border-none py-8 flex flex-col justify-between">
        <div className="flex flex-col items-start pt-16 px-6">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
              <X size={32} className="text-brand-blue" />
            </Button>
          </DrawerClose>
          <div className="flex flex-col gap-5 items-start w-full">
            {links.map((link, index) => <a key={index} href={link.href} style={{
            lineHeight: 1.2
          }} onClick={() => setOpen(false)} className="text-3xl font-extrabold font-barlow italic font-weight-800 hover:opacity-80 transition-all text-brand-blue">
                {link.text}
              </a>)}
          </div>
        </div>
        
        <div className="px-6 pb-6 flex flex-col">
          <div className="border-t border-brand-blue/20 w-full mb-4 pt-4 flex justify-between items-end">
            <div className="text-brand-blue text-sm">
              10kR ©2025
            </div>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:opacity-80 transition-all uppercase text-sm">
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:opacity-80 transition-all uppercase text-sm">
                Instagram
              </a>
            </div>
          </div>
          <div className="w-full h-auto">
            <svg width="100%" height="100%" viewBox="0 0 343 153" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M165.99 38.1758C165.99 45.1565 164.316 51.5555 160.968 57.3727C157.474 63.19 152.889 67.8438 147.212 71.3342C141.389 74.6791 134.911 76.3515 127.778 76.3515H38.2119C31.079 76.3515 24.674 74.6791 18.9968 71.3342C13.174 67.8438 8.58858 63.19 5.24049 57.3727C1.74683 51.5555 3.05426e-07 45.1565 0 38.1758C-3.05426e-07 31.1951 1.74682 24.7961 5.24049 18.9788C8.58858 13.1616 13.174 8.58047 18.9968 5.23555C24.674 1.74519 31.079 3.83964e-06 38.2119 3.52814e-06L127.778 0C134.911 -3.11493e-07 141.389 1.74518 147.212 5.23554C152.889 8.58047 157.474 13.1616 160.968 18.9788C164.316 24.7961 165.99 31.1951 165.99 38.1758ZM137.168 38.1758C137.168 36.576 136.658 35.2671 135.639 34.2491C134.475 33.2311 133.164 32.7221 131.709 32.7221L34.0632 32.7221C32.462 32.7221 31.1518 33.2311 30.1328 34.2491C28.9683 35.2671 28.386 36.576 28.386 38.1758C28.386 39.7755 28.9683 41.1571 30.1328 42.3206C31.1518 43.3386 32.462 43.8476 34.0632 43.8476L131.709 43.8476C133.164 43.8476 134.475 43.3386 135.639 42.3206C136.658 41.1571 137.168 39.7755 137.168 38.1758Z" fill="#132ABC"/>
              <path d="M266.567 152.703V0H299.975C307.836 0 315.042 1.96332 321.592 5.88997C328.143 9.6712 333.31 14.834 337.095 21.3784C341.026 27.7774 342.991 34.9763 342.991 42.975V68.4982C342.991 72.2795 342.045 77.2241 340.152 83.3322C338.26 89.2949 334.693 94.6759 329.453 99.4752V102.747L342.991 152.703H310.238L301.067 110.601H299.102V152.703H266.567ZM299.102 82.4597H300.849C303.469 82.4597 305.652 81.7325 307.399 80.2782C309.292 78.6784 310.238 74.7518 310.238 68.4982V42.3206C310.238 36.2124 309.292 32.3585 307.399 30.7588C305.652 29.159 303.469 28.3591 300.849 28.3591H299.102V82.4597Z" fill="#132ABC"/>
              <path d="M176.97 152.703V0H209.505V43.6295H211.688L220.641 0H253.394V4.36295L231.559 66.3168V69.589L253.394 148.34V152.703H220.641L211.688 105.583H209.505V152.703H176.97Z" fill="#132ABC"/>
              <path d="M135.639 152.612H163.806V89.5126H2.18315V124.491L30.9852 152.612H63.759V143.907L43.2868 121.927H135.639V152.612Z" fill="#132ABC"/>
            </svg>
          </div>
        </div>
      </DrawerContent>
    </Drawer>;

  return <nav className="fixed top-0 left-0 w-full h-[80px] bg-transparent z-50 flex items-center justify-between px-6 transition-colors duration-1200">
      <a href="/" className="h-full flex items-center">
        <div className="h-[40px] w-[90px]">
          <SmallLogo />
        </div>
      </a>
      
      {isMobile ? <MobileMenu /> : 
        <div className="flex items-center gap-8">
          {letsTalkLink && (
            <a href={letsTalkLink.href} 
               className="font-barlow font-extrabold italic font-weight-800 hover:opacity-80 transition-all" 
               style={{
                 color: navColor,
                 transition: 'color 1.2s ease-out',
                 lineHeight: 1.2
               }}>
              {letsTalkLink.text}
            </a>
          )}
        </div>
      }
    </nav>;
};

export default Navigation;
