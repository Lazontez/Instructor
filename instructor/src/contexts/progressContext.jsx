import React, { createContext, useContext, useState } from 'react';

// Create the context
const ProgressContext = createContext();

// Context provider
export const ProgressProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <ProgressContext.Provider value={{ tasks, setTasks }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook for consuming the context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
