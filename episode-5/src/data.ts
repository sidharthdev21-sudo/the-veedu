// Episode 5 data. Every number and claim shown in the video, copied from docs/research-report.md.
// Edit here and re-render; the scenes only draw what is in this file.
// Labels: F verified fact · P public evidence · O owner-provided · H hypothesis · M missing.

export type Tag = 'F' | 'P' | 'O' | 'H' | 'M';
export type Evidence = 'fact' | 'observed' | 'interpretation' | 'hypothesis' | 'assumption' | 'recommendation';

export const SWOT = {
  S: [
    { t: 'Accessible price at the ₹1,200 mid-price benchmark', tag: 'O' as Tag },
    { t: 'Comfort-first promise', tag: 'O' as Tag },
    { t: 'Kerala roots: South India buys 49.3% of sarees', tag: 'F' as Tag },
    { t: 'Four channels already live', tag: 'O' as Tag },
  ],
  W: [
    { t: 'No public reviews or listings yet', tag: 'P' as Tag },
    { t: 'No category-level sales data', tag: 'M' as Tag },
    { t: 'Small team, 3 categories × 4 channels', tag: 'H' as Tag },
    { t: 'Kurta sets: the most commoditised line', tag: 'P' as Tag },
  ],
  O: [
    { t: "Women's apparel +11.9% a year", tag: 'F' as Tag },
    { t: 'Online share rising 20% → 25%', tag: 'F' as Tag },
    { t: 'Sets +10.7%, separates +15.5%', tag: 'F' as Tag },
    { t: 'Fit and photo pain points to solve', tag: 'P' as Tag },
  ],
  T: [
    { t: 'Discounts up to 69% off MRP', tag: 'P' as Tag },
    { t: '₹500 unbranded co-ord sets', tag: 'P' as Tag },
    { t: 'Value retail expanding (Zudio, Yousta)', tag: 'F' as Tag },
    { t: 'Costly e-commerce returns', tag: 'F' as Tag },
  ],
};

export const TOWS = [
  { k: 'SO', name: 'Strengths × Opportunities', t: 'Hero line: comfort co-ords with a Kerala design signature', w: 'Strengths with' },
  { k: 'WO', name: 'Weaknesses × Opportunities', t: 'Build social proof · measure everything', w: 'Weaknesses with' },
  { k: 'ST', name: 'Strengths × Threats', t: 'Compete on transparency and one honest price', w: 'Strengths against' },
  { k: 'WT', name: 'Weaknesses × Threats', t: 'Prune generic kurta sets · avoid the price war', w: 'weaknesses against' },
];

/** BCG: market growth (CAGR FY24–29P, Technopak). Relative share not measurable; assumed ≪ 1 for all. */
export const BCG = [
  { unit: 'Co-ord sets', growth: [10.7, 15.5], quad: 'Question Mark', action: 'Invest selectively', share: 0.18 },
  { unit: 'Kurta sets / kurtis', growth: [10.7, 15.5], quad: 'Question Mark', action: 'Test selectively', share: 0.1 },
  { unit: 'Sarees', growth: [8.3, 8.3], quad: 'Dog (provisional)', action: 'Focus regionally', share: 0.14 },
];
export const GROWTH_CUTOFF = 10;

/** GE–McKinsey weighted scoring (1–5). Weights add to 100% per dimension. */
export const UNITS = ['Co-ords', 'Kurta sets', 'Sarees'];
export const ATTRACT = [
  { c: 'Market size', w: 20, s: [3, 4, 5] },
  { c: 'Market growth', w: 20, s: [4, 3, 2] },
  { c: 'Online suitability', w: 15, s: [4, 4, 3] },
  { c: 'Low competitive intensity', w: 20, s: [3, 2, 3] },
  { c: 'Regional and long-term fit', w: 15, s: [4, 3, 5] },
  { c: 'Price-band fit (margin proxy)', w: 10, s: [4, 4, 2] },
];
export const STRENGTH = [
  { c: 'Differentiation potential', w: 25, s: [4, 2, 3] },
  { c: 'Product quality and design', w: 15, s: [3, 3, 3] },
  { c: 'Customer sentiment', w: 15, s: [3, 3, 3] },
  { c: 'Price competitiveness', w: 15, s: [3, 2, 4] },
  { c: 'Channel strength', w: 15, s: [3, 3, 4] },
  { c: 'Repeat-purchase potential', w: 15, s: [4, 4, 2] },
];
export const weighted = (rows: { w: number; s: number[] }[], i: number) => rows.reduce((a, r) => a + (r.w / 100) * r.s[i], 0);

export const PRIORITIES = [
  { n: 1, t: 'Comfort co-ords as the hero category', d: 'Kerala design signature · fit and fabric transparency · online-first' },
  { n: 2, t: 'Sarees as a focused Kerala line', d: 'Exhibitions and Instagram · no national push yet' },
  { n: 3, t: 'Build the evidence engine', d: 'Sales, returns, repeat and reviews tracked · prune kurta sets' },
];
export const PLAN = [
  { d: 'Days 1–30', t: 'Measure', items: ['Tag orders by category and channel', 'Return-reason form', 'Review requests on WhatsApp', 'Measurements on top 10 co-ords'] },
  { d: 'Days 31–60', t: 'Test', items: ['6-piece Kerala co-ord capsule', 'Fit-transparent product pages', 'One Kerala saree exhibition', 'NRI waitlist page'] },
  { d: 'Days 61–90', t: 'Decide', items: ['Re-score BCG and GE with real data', 'Prune kurta-set SKUs', 'Shift budget to the winner', 'Set next-quarter targets'] },
];
