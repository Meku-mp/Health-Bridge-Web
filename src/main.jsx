import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Make sure Tailwind is imported here
import App from './App.jsx'; // Assuming App.jsx is the main component with the sidebar

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  {/* Your main App component */}
  </StrictMode>
);
