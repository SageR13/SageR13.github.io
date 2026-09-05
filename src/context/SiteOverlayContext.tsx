import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { SidebarMenu } from '../components/SidebarMenu';

interface SiteOverlayContextValue {
  openMenu: () => void;
  closeMenu: () => void;
}

const SiteOverlayContext = createContext<SiteOverlayContextValue | null>(null);

export function SiteOverlayProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const value = useMemo(() => ({ openMenu, closeMenu }), [openMenu, closeMenu]);

  return (
    <SiteOverlayContext.Provider value={value}>
      {children}
      <SidebarMenu open={menuOpen} onClose={closeMenu} />
    </SiteOverlayContext.Provider>
  );
}

export function useSiteOverlay() {
  const ctx = useContext(SiteOverlayContext);
  if (!ctx) throw new Error('useSiteOverlay must be used within SiteOverlayProvider');
  return ctx;
}
