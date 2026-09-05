import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatedRoutes } from './PageTransition';
import { HomePage } from '../pages/HomePage';
import { ProjectPage } from '../pages/ProjectPage';

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatedRoutes>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </AnimatedRoutes>
  );
}
