import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Tapis & abai ralat luaran "Script error." (biasanya dari Extension pengiklanan, penterjemah, atau kata laluan)
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    const msg = event.message || "";
    if (msg === "Script error." || msg.toLowerCase().includes("extension") || !event.filename) {
      event.preventDefault();
      event.stopPropagation();
      console.warn("Abai ralat cross-origin / browser extension:", event);
    }
  });
  
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason?.message || "";
    if (reason.toLowerCase().includes("extension") || reason === "Script error.") {
      event.preventDefault();
      event.stopPropagation();
      console.warn("Abai penolakan janji luaran:", event);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

