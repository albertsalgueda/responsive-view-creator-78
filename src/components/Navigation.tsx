
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useView } from '@/context/ViewContext';
import { useSectionColors } from '@/hooks/use-section-colors';
import Ticker from '@/components/Ticker';
import MobileMenu from '@/components/navigation/MobileMenu';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import { SmallLogo } from '@/components/navigation/SmallLogo';
import { smoothHorizontalScroll } from '@/utils/scrollUtils';

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

  const tickerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav 
        className={`w-full h-[80px] flex items-center justify-between px-6 transition-transform duration-700 ease-in-out ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
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
        
        {isMobile ? 
          <MobileMenu links={links} handleNavLinkClick={handleNavLinkClick} /> : 
          <DesktopNavigation 
            links={links} 
            handleNavLinkClick={handleNavLinkClick} 
            scrollToEnd={scrollToEnd} 
          />
        }
      </nav>
      
      <div className={`w-full transition-transform duration-700 ease-in-out ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
        <Ticker text={tickerText} />
      </div>
    </div>
  );
};

export default Navigation;
