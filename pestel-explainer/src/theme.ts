// One palette for the whole film: ivory and beige grounds, dark brown ink, muted rose accents, white highlights.
export const C = {
  ivory: '#FBF7F0',
  beige: '#EBDDCA',
  beigeDeep: '#D8C2A5',
  sand: '#F3EADC',
  brown: '#4A3326',
  brownSoft: '#7B5E4C',
  brownLine: '#A58873',
  rose: '#C98B8B',
  roseDeep: '#AD6C70',
  roseLight: '#EDCFCB',
  white: '#FFFFFF',
  skin: '#B98163',
  skinAlt: '#9E6A4E',
  skinLight: '#D2A07F',
  hair: '#2B1D16',
};

export const FONT = {
  serif: "'DM Serif Display', Georgia, serif",
  sans: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
};

export const FACTORS = [
  { id: 'political', letter: 'P', title: 'Political' },
  { id: 'economic', letter: 'E', title: 'Economic' },
  { id: 'social', letter: 'S', title: 'Social' },
  { id: 'technological', letter: 'T', title: 'Technological' },
  { id: 'environmental', letter: 'E', title: 'Environmental' },
  { id: 'legal', letter: 'L', title: 'Legal' },
] as const;
export type FactorId = (typeof FACTORS)[number]['id'];
