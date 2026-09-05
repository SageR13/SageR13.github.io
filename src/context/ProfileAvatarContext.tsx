import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

type ProfileAvatarContextValue = {
  sourceRef: RefObject<HTMLDivElement>;
  targetRef: RefObject<HTMLDivElement>;
  progress: number;
  setProgress: (progress: number) => void;
};

const ProfileAvatarContext = createContext<ProfileAvatarContextValue | null>(null);

export function ProfileAvatarProvider({ children }: { children: ReactNode }) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const value = useMemo(
    () => ({
      sourceRef,
      targetRef,
      progress,
      setProgress,
    }),
    [progress],
  );

  return <ProfileAvatarContext.Provider value={value}>{children}</ProfileAvatarContext.Provider>;
}

export function useProfileAvatar() {
  return useContext(ProfileAvatarContext);
}
