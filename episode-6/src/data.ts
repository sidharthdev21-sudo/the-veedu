// Episode 6 data. Every claim and score shown in the video, copied from docs/research-report.md.
// Edit here and re-render; the scenes only draw what is in this file.
// Labels: F verified fact · P public evidence · C customer review (other brands) · O owner-provided · H hypothesis · M missing.

export type Tag = 'F' | 'P' | 'C' | 'O' | 'H' | 'M';

/** Customer pain points: real public evidence about other brands' products, not about Aalayam. */
export const PAINS = [
  {
    t: 'Fit and sizing', color: 'violet',
    items: [
      { q: '“Trousers too small”', src: 'Myntra · cotton kurta set · 3.7★ from ~1.5k ratings', tag: 'C' as Tag },
      { q: '“No XS or S sizes”', src: 'Myntra · Anarkali set · 2.6★ from 111 ratings', tag: 'C' as Tag },
    ],
    stat: { v: '10 of 12', d: 'body points with poor fit, in a study of 400 plus-size women across 6 Indian cities', src: 'J. Fashion Marketing & Management, 2023', tag: 'P' as Tag },
  },
  {
    t: "Sets don't match bodies", color: 'cyan',
    items: [
      { q: 'Top and bottom often need different sizes', src: 'Co-ord buying guide (Rayaa Atelier)', tag: 'P' as Tag },
      { q: 'Trouser lengths suit only shorter women', src: 'Same guide', tag: 'P' as Tag },
      { q: 'A set is sold in one size for both pieces', src: 'Observed on competitor listings', tag: 'P' as Tag },
    ],
  },
  {
    t: 'Looks different at home', color: 'lime',
    items: [
      { q: '“Colour different from the picture”', src: 'Co-ord reviews, Jaipur Studio site', tag: 'C' as Tag },
      { q: '“Fabric is thin”', src: 'Same listing', tag: 'C' as Tag },
      { q: '“Colour bleeding, even in cold water”', src: 'Same listing', tag: 'C' as Tag },
      { q: 'Sheer fabric, weak stitching', src: 'Myntra · printed kurta set (Ep 4)', tag: 'C' as Tag },
    ],
  },
] as const;

export const JOURNEY = [
  { t: 'Browse', d: 'Likes a set' },
  { t: 'Doubt', d: 'Which size? Will it look like this?' },
  { t: 'Order two', d: 'To be safe' },
  { t: 'Return one', d: '20–30% of fashion orders come back' },
  { t: '…or a tailor', d: 'Pays again to fix the fit' },
];

/** Interview programme (designed; findings not yet available). */
export const SCREENER = [
  '15–20 women, aged 24–38',
  'Bought a co-ord online in the last 6 months',
  'Kerala and Indian metros',
  '3–4 who still prefer a tailor',
];
export const QUESTIONS = [
  { q: 'Tell me about the last outfit you returned. Why?', h: 'Fit drives returns', w: 'returned' },
  { q: 'Were your top and bottom the same size?', h: 'Many need split sizes', w: 'same size' },
  { q: 'What makes you trust a size online?', h: 'Measurements beat size charts', w: 'trust a size' },
  { q: 'When do you go to a tailor instead?', h: 'Tailor users are winnable', w: 'tailor instead' },
];

/** Ansoff opportunities. a = attractiveness, f = feasibility (1–5, research-based estimates). */
export type Quad = 'MP' | 'MD' | 'PD' | 'DV';
export const OPPS: { id: string; q: Quad; t: string; a: number; f: number; status?: 'avoid' | 'waitlist' | 'not now' | 'primary' }[] = [
  { id: 'PD1', q: 'PD', t: 'Fit-confident comfort co-ords', a: 5, f: 4, status: 'primary' },
  { id: 'MP1', q: 'MP', t: 'Fit-transparent product pages', a: 4, f: 5 },
  { id: 'MP2', q: 'MP', t: 'WhatsApp review and reorder loop', a: 4, f: 5 },
  { id: 'PD2', q: 'PD', t: 'Kerala everyday design layer', a: 4, f: 4 },
  { id: 'MD1', q: 'MD', t: 'Malayali women in Indian metros', a: 3, f: 4 },
  { id: 'MP3', q: 'MP', t: 'Customer try-on Reels', a: 3, f: 4 },
  { id: 'MD2', q: 'MD', t: 'NRI shipping', a: 4, f: 2, status: 'waitlist' },
  { id: 'MD3', q: 'MD', t: 'More marketplaces', a: 3, f: 3 },
  { id: 'PD3', q: 'PD', t: 'Pre-pleated everyday saree', a: 3, f: 3 },
  { id: 'MP4', q: 'MP', t: 'Deeper discounts', a: 2, f: 4, status: 'avoid' },
  { id: 'DV1', q: 'DV', t: 'Mother–daughter sets', a: 2, f: 2, status: 'not now' },
  { id: 'DV2', q: 'DV', t: 'Tailoring service', a: 2, f: 2, status: 'not now' },
  { id: 'DV3', q: 'DV', t: 'Handloom home textiles', a: 1, f: 2, status: 'not now' },
];
export const score = (o: { a: number; f: number }) => (o.a + o.f) / 2;

/** Competitor groups: observed facts. */
export const GROUPS = [
  { t: 'Unbranded sellers', price: '₹498–549', facts: ['Same product form', 'Missing sizes on some listings', 'Low quality ratings'], color: 'grey' },
  { t: 'Mass D2C brands', price: '₹1,087–1,819 after 26–69% off', facts: ['Libas lists ~295 co-ords', 'One size for top and bottom', '7-day returns; exchange rules unclear'], color: 'violet' },
  { t: 'Premium / designer', price: '₹2,500–5,000+', facts: ['Custom fit offered', '3–4 weeks to deliver', 'Custom orders not returnable'], color: 'cyan' },
];

/** Strategy canvas (1–5). Research-based estimates for competitor groups; Aalayam = proposed targets. */
export const FACTORS = ['Price level', 'Discount reliance', 'Range breadth', 'Fit information', 'Fit flexibility', 'Fabric comfort', 'Regional identity', 'Personal fit help'];
export const CURVES = [
  { k: 'unbranded', t: 'Unbranded sellers', v: [1, 2, 4, 1, 1, 2, 1, 1], color: 'grey' },
  { k: 'mass', t: 'Mass D2C brands', v: [3, 5, 5, 3, 1, 3, 2, 1], color: 'violet' },
  { k: 'premium', t: 'Premium / designer', v: [5, 2, 3, 3, 4, 4, 4, 3], color: 'cyan' },
  { k: 'aalayam', t: 'Aalayam · proposed', v: [3, 1, 2, 5, 5, 4, 4, 5], color: 'lime' },
];

export const CONCEPTS = [
  { n: 1, t: 'Fit-confident comfort co-ords', who: 'Women 24–38 who struggle with online fit', ev: 3, evT: 'Strongest evidence', fate: 'Selected' },
  { n: 2, t: 'Kerala everyday', who: 'Malayali women wanting regional design for daily wear', ev: 1, evT: 'Weak evidence', fate: 'Design layer' },
  { n: 3, t: 'For "tailor-first" women', who: 'Women who skip ready-made for a tailor', ev: 0, evT: 'Hypothesis only', fate: 'Research later' },
];

export const ERRC = {
  E: ['Inflated MRP and constant “% off”', 'One size for the whole set'],
  R: ['Range: 6–8 core silhouettes a season', 'Dependence on marketplaces'],
  Ra: ['Fit information: garment measurements, model size, daylight photos', 'One free size exchange', 'Kerala design identity'],
  Cr: ['Split sizing, adjustable waist, two lengths', 'WhatsApp fit check with “fit memory”'],
};
export const VALUE_BEFORE = 'Comfortable, stylish, accessible women’s clothing';
export const VALUE_AFTER = 'Comfort co-ords that fit the first time';
export const VALUE_SUB = 'Choose top and bottom sizes separately · a Kerala touch · one honest price';

export const PLAN = [
  { d: 'Days 1–30', t: 'Validate', items: ['15–20 customer interviews', 'Survey: how often sizes differ', 'Audit 5 competitors', 'Record a Shopify baseline'], kpi: ['% with split sizes', 'Baseline conversion', 'Baseline size returns'] },
  { d: 'Days 31–60', t: 'Experiment', items: ['6-piece capsule on pre-order', 'Fit-transparent pages', 'WhatsApp fit check', 'One honest price'], kpi: ['Pre-orders', 'Conversion vs baseline', 'Split-size uptake'] },
  { d: 'Days 61–90', t: 'Decide', items: ['Compare with the baseline', 'Scale, iterate or stop', 'Next: Malayali women in metros'], kpi: ['Size-exchange rate', 'Exchange cost per order', 'Sell-through'] },
];
