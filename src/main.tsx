
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force a clean render
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
