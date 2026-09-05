import { PageTransition } from '../components/PageTransition';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { ProfileScrollAvatar } from '../components/ProfileScrollAvatar';
import { ProfileAvatarProvider } from '../context/ProfileAvatarContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { SITE } from '../data/projects';
import styles from './HomePage.module.css';

export function HomePage() {
  usePageTitle(`${SITE.name} — ${SITE.title}`);

  return (
    <PageTransition>
      <ProfileAvatarProvider>
        <Navigation />
        <main className={styles.main} id="main-content">
          <Hero />
        </main>
        <ProfileScrollAvatar />
        <Footer variant="finale" />
      </ProfileAvatarProvider>
    </PageTransition>
  );
}
