
import { useEffect } from 'react';
import { useView } from '@/context/ViewContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSectionObserver = () => {
  const { currentSection, setCurrentSection } = useView();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Use different thresholds for mobile and desktop
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: isMobile ? 0.25 : 0.5, // Slightly lower thresholds for better transitions
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'video') {
            setCurrentSection('video');
          } else if (id === 'main1') {
            setCurrentSection('main1');
          } else if (id === 'main2') {
            setCurrentSection('main2');
          } else if (id === 'main3') {
            setCurrentSection('main3');
          } else if (id === 'services1' || id === 'services2' || id === 'services3') {
            setCurrentSection('services');
          } else if (id === 'contact') {
            setCurrentSection('contact');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Observe all sections
    const sections = [
      document.getElementById('video'),
      document.getElementById('main1'),
      document.getElementById('main2'),
      document.getElementById('main3'),
      document.getElementById('services1'),
      document.getElementById('services2'),
      document.getElementById('services3'),
      document.getElementById('contact')
    ];

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [setCurrentSection, isMobile]); // Keep isMobile as dependency

  return { currentSection };
};
