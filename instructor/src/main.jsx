import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ProgressProvider } from './contexts/progressContext.jsx'; // Import provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressProvider> {
    /* Wrap app with provider */}
      <App />
    </ProgressProvider>
  </React.StrictMode>
);
