
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Clear any existing content and force a clean render
const rootElement = document.getElementById("root");
if (rootElement) {
  // Clear previous content
  rootElement.innerHTML = '';
  
  // Create new root and render app
  const root = createRoot(rootElement);
  root.render(<App />);
  
  console.log("Application root render triggered at", new Date().toISOString());
}
