/** Six grainy mesh backdrop presets — ref/texturesAndCol.png */

export const MESH_PRESET_IDS = ['dawn', 'solar', 'pulse', 'orb', 'halo', 'sweep'] as const;

export type MeshPresetId = (typeof MESH_PRESET_IDS)[number];

export const PROJECT_MESH: Record<string, MeshPresetId> = {
  confident: 'dawn',
  talkit: 'pulse',
  blink: 'orb',
  'rock-on-raccoon': 'halo',
};

export function getProjectMesh(slug: string): MeshPresetId {
  return PROJECT_MESH[slug] ?? 'dawn';
}

export function meshOpacityForProgress(progress: number, index: number, total: number): number {
  const scaled = progress * (total - 1);
  const distance = Math.abs(scaled - index);
  return Math.max(0, 1 - distance);
}

export function meshIndexForProgress(progress: number, total: number): number {
  return Math.round(progress * (total - 1));
}
