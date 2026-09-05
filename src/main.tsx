import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/refColors.css';
import './styles/global.css';
import './styles/spongyTexture.css';
import './styles/pearlGlass.css';
import './styles/profilePhoto.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
