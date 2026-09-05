/** Blushing Sands mesh gradient palette */
const REF = {
  bg: '#fbf8f4',
  ink: '#1a1a1a',

  coral: '#f28695',
  peach: '#f2bfb4',
  apricot: '#f1cca6',
  butter: '#f2e6b8',

  sky: '#8ecae6',
  skyDeep: '#5eb0d9',
  lavender: '#d4a8e8',
  lavenderDeep: '#c084ef',
  magenta: '#f0569a',
  magentaDeep: '#e8307a',
  sun: '#ffe566',
  sunDeep: '#ffd024',
  orange: '#ff9a4d',
  orangeDeep: '#ff7a2f',
  citrus: '#e4f052',
  citrusDeep: '#d4e030',
  coralDeep: '#ff7088',

  b1Core: '#f28695',
  b1Mid: '#f5a0ab',
  b1Soft: '#f7b8c0',
  b1Light: '#facfd5',
  b1Pale: '#fde8eb',

  b2Core: '#f2bfb4',
  b2Deep: '#e8a899',
  b2Light: '#f5d2ca',
  b2Pale: '#faede9',

  b3Pink: '#f28695',
  b3Core: '#f2bfb4',
  b3Yellow: '#f1cca6',
  b3Pale: '#faf0ea',

  b4Gold: '#f1cca6',
  b4Amber: '#e8ba8a',
  b4Violet: '#f2bfb4',
  b4Deep: '#d4a574',
  b4Charcoal: '#1a1a1a',

  b5Lime: '#f2e6b8',
  b5Forest: '#e8d89a',
  b5Pale: '#faf4e4',

  b6Core: '#f2bfb4',
  b6Cyan: '#f5dccf',
  b6Sky: '#f8ead8',
  b6Deep: '#f28695',
} as const;

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function radial(at: string, hex: string, alpha: number, fade = 'transparent 52%') {
  return `radial-gradient(circle at ${at}, ${rgba(hex, alpha)} 0%, ${fade})`;
}

function mesh(layers: Array<[string, string, number, string?]>) {
  return layers.map(([at, hex, alpha, fade]) => radial(at, hex, alpha, fade)).join(', ');
}

function linear(stops: Array<[string, number]>) {
  return `linear-gradient(145deg, ${stops.map(([hex, pos]) => `${hex} ${pos}%`).join(', ')})`;
}

export { REF, mesh, linear, rgba };
