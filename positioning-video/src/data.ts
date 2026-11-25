// Everything the video states, in one place, copied from the published Part 3 analysis ("Aalayam Competitive Landscape").
// Prices are single listings seen on 24 Nov 2026 (marketplaces or brand pages found via search), not full ranges.

export type Evidence = 'fact' | 'observed' | 'interpretation' | 'hypothesis' | 'recommendation';

export const LEVELS = [
  { n: 1, title: 'Brand competition', kind: 'Direct', items: ['Libas', 'Janasya', 'Juniper', 'Pink Fort', 'Unbranded co-ords', 'Suta (sarees)'] },
  { n: 2, title: 'Industry competition', kind: 'Indirect', items: ['Fabindia', 'Mulmul', 'Westside', 'Zudio'] },
  { n: 3, title: 'Product-form competition', kind: 'Indirect', items: ['Custom stitching', 'Tailor-made outfits', 'Dress material'] },
  { n: 4, title: 'Generic need competition', kind: 'Indirect', items: ['Local boutique', 'Rental', 'Second-hand', 'Own wardrobe'] },
];

export const MATRIX = [
  { brand: 'Libas', cats: 'Co-ords, kurta sets', price: '₹1,480 – 1,799', off: '26–55%', note: 'Mass reach · Nykaa, own site' },
  { brand: 'Janasya', cats: 'Cotton co-ords', price: '₹1,087 – 1,819', off: '44–69%', note: 'Marketplace, discount-led' },
  { brand: 'Juniper', cats: 'Co-ords, kurta sets', price: '₹1,204', off: '57%', note: 'Embroidered, festive-leaning' },
  { brand: 'Pink Fort', cats: 'Co-ords', price: '₹1,798', off: '60%', note: 'Silk blend, dressier' },
  { brand: 'Unbranded', cats: 'Co-ords', price: '₹498 – 549', off: 'up to 77%', note: 'Price anchor' },
  { brand: 'Bunaai', cats: 'Co-ords, suit sets', price: "Couldn't confirm", off: '—', note: 'Kept off the maps' },
  { brand: 'Mulmul', cats: 'Supima co-ords', price: "Couldn't confirm", off: '—', note: 'Kept off the price map' },
];

/** Map 1: price (₹, log scale) × design (0–100, our interpretation). `range` = observed listings. */
export const MAP1 = [
  { name: 'Unbranded', range: [498, 549], y: 15 },
  { name: 'Janasya', range: [1087, 1819], y: 35 },
  { name: 'Juniper', range: [1204, 1204], y: 55 },
  { name: 'Libas', range: [1480, 1799], y: 48 },
  { name: 'Pink Fort', range: [1798, 1798], y: 62 },
  { name: 'Fabindia*', range: [3399, 3399], y: 66 },
  { name: 'Suta (sarees)', range: [2500, 5000], y: 82 },
];
export const AALAYAM_PRICE: [number, number] = [1000, 1700];   // from the brief, not observed

/** Map 2: mass (0) → niche (100) × basic everyday (0) → comfort-led lifestyle (100). Analytical placements. */
export const MAP2 = [
  { name: 'Unbranded', x: 5, y: 18 },
  { name: 'Janasya', x: 20, y: 45 },
  { name: 'Libas', x: 20, y: 30 },
  { name: 'Juniper', x: 31, y: 24 },
  { name: 'Pink Fort', x: 45, y: 30 },
  { name: 'Suta · premium', x: 70, y: 72 },
  { name: 'Mulmul · premium', x: 80, y: 82 },
];
export const AALAYAM_MAP2 = { x: 58, y: 86 };

export const POSITIONING =
  'For women who want everyday clothes that feel as good as they look, Aalayam offers comfortable co-ords and sarees, rooted in Kerala, at honest prices, showing exactly what you’re buying.';

export const RECS = [
  { t: 'Prove comfort on every product page', d: 'Fabric, feel, measurements, true-to-size notes', w: 'provable' },
  { t: 'One honest price', d: 'Instead of inflated MRPs and permanent discounts', w: 'honest price' },
  { t: 'Kerala-rooted design signature', d: 'One recognisable look across co-ords and sarees', w: 'Kerala' },
  { t: 'Fit help vs tailoring', d: 'Size advice before purchase, alteration-friendly cuts', w: 'fit help' },
];
