import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generatedHeadshot, setGeneratedHeadshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetApp = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setGeneratedHeadshot(null);
    setIsLoading(false);
    setError(null);
  };

  const value = {
    uploadedImage,
    setUploadedImage,
    selectedStyle,
    setSelectedStyle,
    generatedHeadshot,
    setGeneratedHeadshot,
    isLoading,
    setIsLoading,
    error,
    setError,
    resetApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
