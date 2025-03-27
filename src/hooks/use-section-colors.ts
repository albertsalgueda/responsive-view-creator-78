
import { useView } from '@/context/ViewContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSectionColors = () => {
  const { currentSection } = useView();
  const isMobile = useIsMobile();
  
  // Define colors based on currentSection - same logic as in Navigation
  const getNavColor = () => {
    switch (currentSection) {
      case 'video':
        return '#FDB0C2'; // Pink for video section
      case 'main1':
        return '#132ABC'; // Blue
      case 'main2':
        return '#FFBD89'; // Coral
      case 'main3':
      case 'services':
        return '#97ECCF'; // Green Light
      case 'contact':
        return '#FDB0C2'; // Pink
      default:
        return '#132ABC'; // Default to Blue
    }
  };

  // Get background color based on the current section (inverse of text color)
  const getBackgroundColor = () => {
    switch (currentSection) {
      case 'main1':
        return '#FDB0C2'; // Pink background when menu is blue
      case 'contact':
        return '#132ABC'; // Blue background when menu is pink
      case 'main2':
        return '#2A0C41'; // Purple when menu is yellow/coral
      case 'main3':
      case 'services':
        return '#105A43'; // Dark green when menu is light green
      case 'video':
        return '#132ABC'; // Blue background when menu is pink
      default:
        return '#132ABC'; // Default to blue
    }
  };

  // Get drag bar color - it should match the text color with 40% opacity
  const getDragBarColor = () => {
    // Return the same color as text, opacity will be applied where used
    return getNavColor();
  };

  // Use uniform transition speed that works well on both mobile and desktop
  const getTransitionSpeed = () => {
    return isMobile 
      ? 'color 0.4s ease-out, background-color 0.4s ease-out' 
      : 'color 0.8s ease-out, background-color 0.8s ease-out';
  };

  return {
    textColor: getNavColor(),
    backgroundColor: getBackgroundColor(),
    dragBarColor: getDragBarColor(),
    transition: getTransitionSpeed()
  };
};
