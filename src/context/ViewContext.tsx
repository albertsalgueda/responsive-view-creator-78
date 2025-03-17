
import React, { createContext, useContext, useState, useEffect } from 'react';

type Section = 'main1' | 'main2' | 'main3' | 'services' | 'contact';

interface ViewContextType {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<Section>('main1');

  return (
    <ViewContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};
