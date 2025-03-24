
import { useView } from '@/context/ViewContext';

export const useSectionColors = () => {
  const { currentSection } = useView();
  
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

  return {
    textColor: getNavColor(),
    backgroundColor: getBackgroundColor(),
    transition: 'color 0.8s ease-out, background-color 0.8s ease-out' // Slightly faster transition for mobile
  };
};
