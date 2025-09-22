import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppLoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppLoadingContext = createContext<AppLoadingContextType | undefined>(undefined);

export const useAppLoading = () => {
  const context = useContext(AppLoadingContext);
  if (!context) {
    throw new Error('useAppLoading must be used within an AppLoadingProvider');
  }
  return context;
};

export const AppLoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Start in a loading state

  return (
    <AppLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppLoadingContext.Provider>
  );
};
