import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({
    goalMinutes: 300,
    currentMinutes: 0,
    logs: []
  });

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
