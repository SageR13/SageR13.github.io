export const DESIGN_TOOLS = [
  { id: 'figma', name: 'Figma' },
  { id: 'framer', name: 'Framer' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'blender', name: 'Blender' },
  { id: 'arduino', name: 'Arduino' },
  { id: 'adobe', name: 'Adobe CC' },
] as const;

export type DesignToolId = (typeof DESIGN_TOOLS)[number]['id'];
