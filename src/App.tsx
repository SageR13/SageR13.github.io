import { BrowserRouter } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { GradientBackdrop } from './components/GradientBackdrop';
import { SmoothScroll } from './components/SmoothScroll';
import { AppRoutes } from './components/AppRoutes';
import { HomeViewFilterProvider } from './context/HomeViewFilterContext';
import { SiteOverlayProvider } from './context/SiteOverlayContext';

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <HomeViewFilterProvider>
        <SiteOverlayProvider>
          <a href="#main-content" className="skipLink">
            Skip to content
          </a>
          <GradientBackdrop />
          <CustomCursor />
          <AppRoutes />
        </SiteOverlayProvider>
        </HomeViewFilterProvider>
      </SmoothScroll>
    </BrowserRouter>
  );
}
