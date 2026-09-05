import { useEffect, useRef } from 'react';
import styles from './ProjectBlockMedia.module.css';

interface ProjectBlockMediaProps {
  image: string;
  video?: string;
  className?: string;
  playOnHover?: boolean;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
}

export function ProjectBlockMedia({
  image,
  video,
  className,
  playOnHover = true,
  priority = false,
  fit = 'cover',
  objectPosition = 'center',
}: ProjectBlockMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaClass = className ? `${styles.poster} ${className}` : styles.poster;
  const videoClass = className
    ? `${styles.video} ${styles.videoVisible} ${className}`
    : `${styles.video} ${styles.videoVisible}`;
  const mediaStyle = {
    objectFit: fit,
    objectPosition,
  } as const;
  const rootStyle = {
    backgroundImage: `url("${image}")`,
    backgroundSize: fit,
    backgroundPosition: objectPosition,
    backgroundRepeat: 'no-repeat',
  } as const;

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !video || !playOnHover) return;

    const hoverTarget = element.closest('a') ?? element.parentElement;
    if (!hoverTarget) return;

    const canHover = window.matchMedia('(hover: hover)').matches;

    const play = () => {
      if (!canHover) return;
      void element.play().catch(() => {});
    };

    const pause = () => {
      if (!canHover) return;
      element.pause();
      element.currentTime = 0;
    };

    hoverTarget.addEventListener('mouseenter', play);
    hoverTarget.addEventListener('mouseleave', pause);
    hoverTarget.addEventListener('focusin', play);
    hoverTarget.addEventListener('focusout', pause);

    return () => {
      hoverTarget.removeEventListener('mouseenter', play);
      hoverTarget.removeEventListener('mouseleave', pause);
      hoverTarget.removeEventListener('focusin', play);
      hoverTarget.removeEventListener('focusout', pause);
    };
  }, [video, playOnHover]);

  if (video) {
    return (
      <span className={styles.root} style={rootStyle}>
        <img
          src={image}
          alt=""
          className={mediaClass}
          style={mediaStyle}
          draggable={false}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <video
          ref={videoRef}
          src={video}
          poster={image}
          className={playOnHover ? videoClass : className}
          style={mediaStyle}
          loop
          muted
          playsInline
          preload={playOnHover ? 'none' : 'metadata'}
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <span className={styles.root} style={rootStyle}>
      <img
        src={image}
        alt=""
        className={className}
        style={mediaStyle}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </span>
  );
}
