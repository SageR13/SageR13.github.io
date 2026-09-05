import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type HomeViewFilter = 'all' | 'about' | 'work';

type HomeViewFilterContextValue = {
  filter: HomeViewFilter;
  setFilter: (filter: HomeViewFilter) => void;
  onHome: boolean;
};

const HomeViewFilterContext = createContext<HomeViewFilterContextValue | null>(null);

function parseFilter(pathname: string, hash: string): HomeViewFilter {
  if (pathname !== '/') return 'all';
  if (hash === '#about') return 'about';
  if (hash === '#work') return 'work';
  return 'all';
}

export function HomeViewFilterProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';
  const filter = parseFilter(location.pathname, location.hash);

  const setFilter = useCallback(
    (next: HomeViewFilter) => {
  if (next === 'all') {
    navigate({ pathname: '/', hash: '' });
    return;
  }

      navigate(`/#${next}`);
    },
    [navigate],
  );

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      onHome,
    }),
    [filter, onHome, setFilter],
  );

  return <HomeViewFilterContext.Provider value={value}>{children}</HomeViewFilterContext.Provider>;
}

export function useHomeViewFilter() {
  return useContext(HomeViewFilterContext);
}
