import { SITE } from '../data/projects';

type ProfilePhotoProps = {
  className?: string;
  wrapClassName?: string;
};

export function ProfilePhoto({ className = '', wrapClassName = '' }: ProfilePhotoProps) {
  return (
    <span className={`profilePhotoWrap ${wrapClassName}`.trim()}>
      <img
        src={SITE.profileImage}
        alt=""
        className={`profilePhoto ${className}`.trim()}
        width={662}
        height={1024}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
