// Everything Episode 4 states, copied from docs/review-package.md.
// Market figures: Technopak Advisors, "Industry Report on Apparel Market in India and South India", 12 Aug 2025
// (prepared for RSB Retail India Ltd). Retail value, INR, all India, financial years. Revenue, not customers.

export type Evidence = 'fact' | 'observed' | 'interpretation' | 'hypothesis' | 'assumption' | 'recommendation';

/** Public Myntra listings (other brands), viewed via search results 25 Nov 2026. Summaries, not verbatim quotes. */
export const REVIEWS = [
  { kind: 'Positive', product: 'Anouk floral thread-work cotton kurta set', rating: 4.4, count: '2.9k', summary: 'Soft, breathable fabric · comfortable fit · stitching holds up', id: '29880536' },
  { kind: 'Negative', product: 'Anouk printed cotton kurta with trousers', rating: 3.7, count: '1.5k', summary: 'Sheer fabric · trousers too small · weak stitching', id: '14925564' },
  { kind: 'Mixed', product: 'Anouk striped cotton kurta with palazzos', rating: 4.4, count: '7.2k', summary: 'Soft and breathable · but sizing ran tight', id: '14399800' },
] as const;

export const SOURCES = [
  { name: 'Myntra', what: 'Reviews, fit, fabric', status: 'used', type: 'Secondary' },
  { name: 'Amazon India', what: 'Complaints, value', status: 'used', type: 'Secondary' },
  { name: 'AJIO', what: 'Satisfaction, preferences', status: 'used', type: 'Secondary' },
  { name: 'Instagram', what: 'Comments, questions', status: 'used', type: 'Secondary' },
  { name: 'YouTube', what: 'Review and haul videos', status: 'used', type: 'Secondary' },
  { name: 'Customer interviews', what: 'Direct feedback, unmet needs', status: 'used', type: 'Primary' },
  { name: 'Customer surveys', what: 'Test themes at scale', status: 'proposed', type: 'Primary' },
] as const;

export const THEMES = ['Comfort', 'Fabric', 'Fit & sizing', 'Transparency', 'Colour', 'Price', 'Delivery', 'Returns'];

export const OPPORTUNITIES = [
  { pain: 'Fit complaints', opp: 'Clearer size guidance', w: 'clearer size' },
  { pain: 'Fabric complaints', opp: 'Better material choices', w: 'better fabric' },
  { pain: 'Comfort is praised', opp: 'Comfort-led design', w: 'comfort-led' },
  { pain: 'Price doubts', opp: 'A clear value story', w: 'honest value' },
  { pain: '"Looks different online"', opp: 'True-to-life photos, transparent descriptions', w: 'true-to-life' },
];

// ─── market sizing (₹ billion, FY2024 unless noted)
export const MARKET = {
  womens: 2298, womens29: 4029,
  categories: [
    { name: 'Sarees', v: 564, keep: true }, { name: 'Sets', v: 415, keep: true }, { name: 'Mix & match', v: 297, keep: false },
    { name: 'Lehenga', v: 198, keep: false }, { name: 'Innerwear', v: 428, keep: false }, { name: 'Western, denim & other', v: 396, keep: false },
  ],
  tam: 979, tam29: 1532,
};
export const SAM_STEPS = [
  { label: 'TAM · sarees + sets', v: 979, factor: '', ev: 'fact' as Evidence },
  { label: 'Online', v: 195.8, factor: '× 20%', ev: 'fact' as Evidence },
  { label: 'Mid-price', v: 52.9, factor: '× 27%', ev: 'fact' as Evidence },
  { label: 'Women 20–40', v: 23.3, factor: '× 44%', ev: 'hypothesis' as Evidence },
];

/** Bottom-up SOM, three-year plan. Planning assumptions, not Aalayam data. */
export const SOM = {
  reach: [500000, 1200000, 2500000], visit: 0.06, conv: 0.015, repeat: 0.25, orders: 1.3, aov: 1500, returns: 0.25,
  newBuyers: [450, 1080, 2250], returning: [0, 112, 382], active: [450, 1192, 2632],
  revenueLakh: [8.8, 23.2, 51.3], netLakh: [6.6, 17.4, 38.5],
};
