// The palette from the brief, plus two derived tones for borders and dimmed states.
export const C = {
  bg: '#08090C',        // Deep Obsidian: background
  card: '#0E1015',      // Charcoal: cards
  text: '#ECECF1',      // Soft White: primary text
  grey: '#A3A5B0',      // Cool Grey: secondary text
  cyan: '#6CF0FF',      // Electric Cyan: primary accent
  violet: '#B48CFF',    // Soft Violet: secondary accent
  lime: '#D4FF6A',      // Neon Lime: highlights
  green: '#5EE6A8',     // Success Green: success states
  line: 'rgba(236,236,241,0.10)',
  dim: 'rgba(163,165,176,0.35)',
};

export const FONT = {
  head: "'Space Grotesk', 'Inter', sans-serif",
  body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};

export const FACTORS = [
  { id: 'political', letter: 'P', title: 'Political', color: C.cyan },
  { id: 'economic', letter: 'E', title: 'Economic', color: C.violet },
  { id: 'social', letter: 'S', title: 'Social', color: C.lime },
  { id: 'technological', letter: 'T', title: 'Technological', color: C.cyan },
  { id: 'environmental', letter: 'E', title: 'Environmental', color: C.green },
  { id: 'legal', letter: 'L', title: 'Legal', color: C.violet },
] as const;
export type FactorId = (typeof FACTORS)[number]['id'];

/** Translucent version of a hex colour. */
export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
