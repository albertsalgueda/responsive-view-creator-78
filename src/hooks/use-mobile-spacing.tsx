
import { useIsMobile } from './use-mobile';

interface MobileSpacing {
  sectionPadding: string;
  contentTopMargin: string;
  contentBottomMargin: string;
  itemSpacing: string;
}

export function useMobileSpacing(): MobileSpacing {
  const isMobile = useIsMobile();
  
  // We return standard values for mobile spacing
  // These can be used consistently across components
  return {
    sectionPadding: isMobile ? 'py-16 px-6' : '',
    contentTopMargin: isMobile ? 'mt-8' : '',
    contentBottomMargin: isMobile ? 'mb-8' : '',
    itemSpacing: isMobile ? 'gap-8' : '',
  };
}
