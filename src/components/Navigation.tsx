import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerTitle } from "@/components/ui/drawer";
import { useView } from '@/context/ViewContext';
import { useSectionColors } from '@/hooks/use-section-colors';

interface NavigationProps {
  links?: Array<{
    text: string;
    href: string;
  }>;
}

const Navigation = ({
  links = [{
    text: "why",
    href: "#main2"
  }, {
    text: "what",
    href: "#main3"
  }, {
    text: "who",
    href: "#team"
  }, {
    text: "let's talk",
    href: "#contact"
  }]
}: NavigationProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { currentSection } = useView();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { textColor, backgroundColor, transition } = useSectionColors();

  useEffect(() => {
    setMounted(true);
  }, [isMobile]);
  
  useEffect(() => {
    if (!isMobile) {
      setIsVisible(true);
      return;
    }
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current && isVisible) {
          setIsVisible(false);
        }
        if (currentScrollY < lastScrollY.current && !isVisible) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, isMobile]);
  
  if (!mounted) return null;

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    const targetId = href.substring(1);
    
    if (isMobile) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({ 
          top: targetElement.offsetTop, 
          behavior: 'smooth' 
        });
        setOpen(false);
      }
    } else {
      const container = document.querySelector('.h-screen.w-screen.overflow-x-auto.scrollbar-hide');
      const targetElement = document.getElementById(targetId);
      
      if (container && targetElement) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        const scrollLeft = targetElement.offsetLeft;
        
        smoothHorizontalScroll(container as HTMLElement, container.scrollLeft, scrollLeft, 800);
      }
    }
  };

  const scrollToBeginning = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      const container = document.querySelector('.h-screen.w-screen.overflow-x-auto.scrollbar-hide');
      if (container) {
        smoothHorizontalScroll(container as HTMLElement, container.scrollLeft, 0, 800);
      }
    }
  };

  const scrollToEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) {
      window.scrollTo({ 
        top: document.body.scrollHeight, 
        behavior: 'smooth' 
      });
    } else {
      const container = document.querySelector('.h-screen.w-screen.overflow-x-auto.scrollbar-hide');
      if (container) {
        const targetPosition = container.scrollWidth - container.clientWidth;
        smoothHorizontalScroll(container as HTMLElement, container.scrollLeft, targetPosition, 800);
      }
    }
  };

  const smoothHorizontalScroll = (
    element: HTMLElement,
    start: number,
    target: number,
    duration: number
  ) => {
    const startTime = performance.now();
    const change = target - start;
    
    const easeInOutQuad = (t: number): number => {
      return t < 0.5 
        ? 2 * t * t 
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };
    
    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const eased = easeInOutQuad(progress);
      
      element.scrollLeft = start + change * eased;
      
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };

  const TwoBarMenuIcon = () => (
    <svg width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="12" width="48" height="8" rx="3" fill="currentColor"/>
      <rect y="28" width="48" height="8" rx="3" fill="currentColor"/>
    </svg>
  );

  const SmallLogo = () => <svg width="100%" height="100%" viewBox="0 0 343 153" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M165.99 38.1758C165.99 45.1565 164.316 51.5555 160.968 57.3727C157.474 63.19 152.889 67.8438 147.212 71.3342C141.389 74.6791 134.911 76.3515 127.778 76.3515H38.2119C31.079 76.3515 24.674 74.6791 18.9968 71.3342C13.174 67.8438 8.58858 63.19 5.24049 57.3727C1.74683 51.5555 3.05426e-07 45.1565 0 38.1758C-3.05426e-07 31.1951 1.74682 24.7961 5.24049 18.9788C8.58858 13.1616 13.174 8.58047 18.9968 5.23555C24.674 1.74519 31.079 3.83964e-06 38.2119 3.52814e-06L127.778 0C134.911 -3.11493e-07 141.389 1.74518 147.212 5.23554C152.889 8.58047 157.474 13.1616 160.968 18.9788C164.316 24.7961 165.99 31.1951 165.99 38.1758ZM137.168 38.1758C137.168 36.576 136.658 35.2671 135.639 34.2491C134.475 33.2311 133.164 32.7221 131.709 32.7221L34.0632 32.7221C32.462 32.7221 31.1518 33.2311 30.1328 34.2491C28.9683 35.2671 28.386 36.576 28.386 38.1758C28.386 39.7755 28.9683 41.1571 30.1328 42.3206C31.1518 43.3386 32.462 43.8476 34.0632 43.8476L131.709 43.8476C133.164 43.8476 134.475 43.3386 135.639 42.3206C136.658 41.1571 137.168 39.7755 137.168 38.1758Z" fill={textColor} />
      <path d="M266.567 152.703V0H299.975C307.836 0 315.042 1.96332 321.592 5.88997C328.143 9.6712 333.31 14.834 337.095 21.3784C341.026 27.7774 342.991 34.9763 342.991 42.975V68.4982C342.991 72.2795 342.045 77.2241 340.152 83.3322C338.26 89.2949 334.693 94.6759 329.453 99.4752V102.747L342.991 152.703H310.238L301.067 110.601H299.102V152.703H266.567ZM299.102 82.4597H300.849C303.469 82.4597 305.652 81.7325 307.399 80.2782C309.292 78.6784 310.238 74.7518 310.238 68.4982V42.3206C310.238 36.2124 309.292 32.3585 307.399 30.7588C305.652 29.159 303.469 28.3591 300.849 28.3591H299.102V82.4597Z" fill={textColor} />
      <path d="M176.97 152.703V0H209.505V43.6295H211.688L220.641 0H253.394V4.36295L231.559 66.3168V69.589L253.394 148.34V152.703H220.641L211.688 105.583H209.505V152.703H176.97Z" fill={textColor} />
      <path d="M135.639 152.612H163.806V89.5126H2.18315V124.491L30.9852 152.612H63.759V143.907L43.2868 121.927H135.639V152.612Z" fill={textColor} />
    </svg>;

  const MobileMenu = () => (
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
                  className="text-base font-bold tracking-tighter font-barlow hover:opacity-80 transition-all uppercase"
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
                    className="hover:opacity-90 transition-all duration-500 px-6 py-3 rounded-sm uppercase"
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
              <div style={{ color: textColor, transition: transition }} className="text-[2.25vh] font-barlow font-bold tracking-tighter">
                10kR ©2025
              </div>
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: textColor, transition: transition }} className="hover:opacity-80 transition-all uppercase text-[2.25vh] font-barlow font-bold tracking-tighter">
                  LinkedIn
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: textColor, transition: transition }} className="hover:opacity-80 transition-all uppercase text-[2.25vh] font-barlow font-bold tracking-tighter">
                  Instagram
                </a>
              </div>
            </div>
            <div className="w-full h-auto">
              <svg width="100%" height="100%" viewBox="0 0 343 153" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <path d="M165.99 38.1758C165.99 45.1565 164.316 51.5555 160.968 57.3727C157.474 63.19 152.889 67.8438 147.212 71.3342C141.389 74.6791 134.911 76.3515 127.778 76.3515H38.2119C31.079 76.3515 24.674 74.6791 18.9968 71.3342C13.174 67.8438 8.58858 63.19 5.24049 57.3727C1.74683 51.5555 3.05426e-07 45.1565 0 38.1758C-3.05426e-07 31.1951 1.74682 24.7961 5.24049 18.9788C8.58858 13.1616 13.174 8.58047 18.9968 5.23555C24.674 1.74519 31.079 3.83964e-06 38.2119 3.52814e-06L127.778 0C134.911 -3.11493e-07 141.389 1.74518 147.212 5.23554C152.889 8.58047 157.474 13.1616 160.968 18.9788C164.316 24.7961 165.99 31.1951 165.99 38.1758ZM137.168 38.1758C137.168 36.576 136.658 35.2671 135.639 34.2491C134.475 33.2311 133.164 32.7221 131.709 32.7221L34.0632 32.7221C32.462 32.7221 31.1518 33.2311 30.1328 34.2491C28.9683 35.2671 28.386 36.576 28.386 38.1758C28.386 39.7755 28.9683 41.1571 30.1328 42.3206C31.1518 43.3386 32.462 43.8476 34.0632 43.8476L131.709 43.8476C133.164 43.8476 134.475 43.3386 135.639 42.3206C136.658 41.1571 137.168 39.7755 137.168 38.1758Z" fill={textColor}/>
                <path d="M266.567 152.703V0H299.975C307.836 0 315.042 1.96332 321.592 5.88997C328.143 9.6712 333.31 14.834 337.095 21.3784C341.026 27.7774 342.991 34.9763 342.991 42.975V68.4982C342.991 72.2795 342.045 77.2241 340.152 83.3322C338.26 89.2949 334.693 94.6759 329.453 99.4752V102.747L342.991 152.703H310.238L301.067 110.601H299.102V152.703H266.567ZM299.102 82.4597H300.849C303.469 82.4597 305.652 81.7325 307.399 80.2782C309.292 78.6784 310.238 74.7518 310.238 68.4982V42.3206C310.238 36.2124 309.292 32.3585 307.399 30.7588C305.652 29.159 303.469 28.3591 300.849 28.3591H299.102V82.4597Z" fill={textColor}/>
                <path d="M176.97 152.703V0H209.505V43.6295H211.688L220.641 0H253.394V4.36295L231.559 66.3168V69.589L253.394 148.34V152.703H220.641L211.688 105.583H209.505V152.703H176.97Z" fill={textColor}/>
                <path d="M135.639 152.612H163.806V89.5126H2.18315V124.491L30.9852 152.612H63.759V143.907L43.2868 121.927H135.639V152.612Z" fill={textColor}/>
              </svg>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 w-full h-[80px] z-50 flex items-center justify-between px-6 transition-transform duration-700 ease-in-out ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
      style={{
        backgroundColor: isMobile && isVisible ? backgroundColor : 'transparent',
        transition: `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), ${transition}`
      }}
    >
      <a href="/" onClick={scrollToBeginning} className="h-full flex items-center hover:opacity-90 transition-all duration-500">
        <div className="h-[40px] w-[90px]">
          <SmallLogo />
        </div>
      </a>
      
      {isMobile ? <MobileMenu /> : 
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-10">
            {links.filter(link => link.text !== "let's talk").map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="text-base font-bold tracking-tighter font-barlow hover:opacity-80 transition-all uppercase"
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
                className="hover:opacity-90 transition-all duration-500 px-6 py-3 rounded-sm uppercase"
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
      }
    </nav>
  );
};

export default Navigation;
