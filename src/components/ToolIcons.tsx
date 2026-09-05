import type { ComponentType } from 'react';
import type { DesignToolId } from '../data/tools';

type ToolIconProps = {
  className?: string;
};

export function FigmaToolIcon({ className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#1abcfe" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8" />
      <path fill="#0acf83" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4" />
      <path fill="#ff7262" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4" />
      <path fill="#f24e1e" d="M12 0h4a4 4 0 0 1 0 8h-4V0" />
      <path fill="#a259ff" d="M20 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
    </svg>
  );
}

export function FramerToolIcon({ className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#0055ff" d="M4 4h16v7H12l8 9H4V4z" />
    </svg>
  );
}

export function CursorToolIcon({ className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0f1117" />
      <path fill="#f5f5f5" d="M7 6.5 16.5 11 11.5 12.5 10 17.5 7 6.5z" />
    </svg>
  );
}

export function BlenderToolIcon({ className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#e87d0d" />
      <circle cx="12" cy="9" r="2.4" fill="#fff" />
      <path
        fill="#fff"
        d="M8.2 14.1c1.2-1.1 2.8-1.8 4.5-1.8h3.3c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4h-3.3c-1 .1-1.9.5-2.6 1.1-.4.4-1 .4-1.4 0-.5-.4-.5-1.1-.5-2.1z"
      />
    </svg>
  );
}

export function ArduinoToolIcon({ className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#008184" />
      <path
        fill="#fff"
        d="M8.2 12c0-2.1 1.7-3.8 3.8-3.8 1.1 0 2.1.5 2.8 1.2l-1.1 1.1c-.5-.5-1.1-.8-1.8-.8-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.3 1.8-.8l1.1 1.1c-.7.7-1.7 1.2-2.8 1.2-2.1 0-3.8-1.7-3.8-3.8zm7.8 0c0-2.1 1.7-3.8 3.8-3.8 1.1 0 2.1.5 2.8 1.2l-1.1 1.1c-.5-.5-1.1-.8-1.8-.8-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.3 1.8-.8l1.1 1.1c-.7.7-1.7 1.2-2.8 1.2-2.1 0-3.8-1.7-3.8-3.8z"
      />
    </svg>
  );
}

export function AdobeToolIcon({ className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#ff0000" />
      <path
        fill="#fff"
        d="M7.2 16.5 9.8 8.5h2.1l2.6 8h-1.8l-.6-1.9H9.6l-.6 1.9H7.2zm3.1-3.4-.9-2.8-.9 2.8h1.8zm6.2 3.4V8.5H19v8h-2.5z"
      />
    </svg>
  );
}

const TOOL_ICON_MAP: Record<DesignToolId, ComponentType<ToolIconProps>> = {
  figma: FigmaToolIcon,
  framer: FramerToolIcon,
  cursor: CursorToolIcon,
  blender: BlenderToolIcon,
  arduino: ArduinoToolIcon,
  adobe: AdobeToolIcon,
};

export function DesignToolIcon({ id, className }: ToolIconProps & { id: DesignToolId }) {
  const Icon = TOOL_ICON_MAP[id];
  return <Icon className={className} />;
}
