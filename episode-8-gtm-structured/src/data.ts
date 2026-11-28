// Episode 8 (structured) data: every fact shown on screen, with its source. Edit here and re-render.
// tag: 'actual' = Aalayam's own store/notes · 'research' = cited study or report · 'course' = Module 5 benchmark · 'example' = illustrative, not Aalayam data · 'judgement' = our assessment

export type Tag = 'actual' | 'research' | 'course' | 'example' | 'judgement';

export const WORKFLOW = [
  { k: '5Cs', g: 'Understand' }, { k: 'Segment', g: 'Choose' }, { k: 'Target', g: 'Choose' }, { k: 'Position', g: 'Choose' },
  { k: '4Ps', g: 'Plan' }, { k: 'Journey', g: 'Plan' }, { k: 'Launch', g: 'Launch' }, { k: 'Budget', g: 'Launch' }, { k: 'Record', g: 'Learn' }, { k: 'Measure', g: 'Learn' },
];

export const FIVE_C = [
  { c: 'Customers', big: '10 of 12', d: 'body points with poor fit, in a study of 400 plus-size Indian women', src: 'J. Fashion Marketing & Mgmt, 2023', tag: 'research' as Tag },
  { c: 'Company', big: '13', d: 'products live · honest prices · WhatsApp size check', src: 'Aalayam store, 28 Nov 2026', tag: 'actual' as Tag },
  { c: 'Context', big: '~12%', d: 'yearly growth in women’s clothing · online share 20% → 25%', src: 'Technopak, Aug 2025', tag: 'research' as Tag },
  { c: 'Collaborators', big: '4', d: 'key partners: suppliers · Shopify · WhatsApp · Kochi venues', src: 'Owner notes', tag: 'actual' as Tag },
  { c: 'Competitors', big: '26–69%', d: 'off MRP at big brands, with hundreds of styles', src: 'Listings, Episodes 3 and 6', tag: 'research' as Tag },
];

export const LENSES = [
  { t: 'Geographic', e: 'Kerala · Malayali women in big cities', w: 'By place' },
  { t: 'Demographic', e: 'Women 25–40 · sizes L to 3XL', w: 'By age and size' },
  { t: 'Behavioural', e: 'Has returned clothes that didn’t fit', w: 'By behaviour' },
  { t: 'Psychographic', e: 'Comfort first · no fuss · values honesty', w: 'by mindset' },
];

/** Targeting map. x = Aalayam's strength, y = attractiveness (0–1). Judgement from research. */
export const SEGMENTS = [
  { t: 'Plus-size women in Kerala', x: 0.85, y: 0.85, v: 'MAIN TARGET', c: 'lime', w: 'Plus-size women in Kerala' },
  { t: 'Malayali women in big cities', x: 0.6, y: 0.7, v: 'NEXT', c: 'cyan', w: 'big cities come' },
  { t: 'Festival shoppers', x: 0.55, y: 0.42, v: 'SEASONAL', c: 'violet', w: 'Festival' },
  { t: 'Overseas buyers', x: 0.22, y: 0.72, v: 'LATER', c: 'grey', w: 'Overseas' },
  { t: 'Everyone else', x: 0.15, y: 0.3, v: 'AVOID', c: 'grey', w: 'everyone else' },
];

/** Price landscape (₹). Observed listings, Episodes 3 and 6. */
export const PRICES = [
  { t: 'Unbranded sets', lo: 498, hi: 549, note: 'marketplace listings', c: 'grey', w: 'Unbranded' },
  { t: 'Big brands (after discount)', lo: 1087, hi: 1819, note: 'shown as 26–69% off MRP', c: 'violet', w: 'Big brands' },
  { t: 'Premium labels', lo: 2500, hi: 3000, note: '₹2,500 and up', c: 'cyan', w: 'Premium' },
  { t: 'Aalayam', lo: 1000, hi: 1700, note: 'no fake MRP · real measurements · L to 3XL', c: 'lime', w: 'Aalayam sits' },
];
export const POSITIONING = 'For women who wear L to 3XL and are tired of guessing sizes online, Aalayam makes soft cotton co-ords that fit the first time, with honest prices and size help on WhatsApp.';

export const FOUR_P = [
  { p: 'Product', items: ['6-piece capsule', 'Every style in L, XL, 2XL, 3XL', 'Measurements on every page'] },
  { p: 'Price', items: ['₹1,000 – ₹1,700 (median ₹1,200)', 'No inflated MRP', '30-day returns'] },
  { p: 'Place', items: ['Own store first', 'WhatsApp for size help', 'Try-on days in Kochi', 'Marketplaces: bestsellers only'] },
  { p: 'Promotion', items: ['Reels with real women', '12 nano creators, flat fee', 'Google for local searches'] },
];

export const JOURNEY = [
  { s: 'Notice', a: 'Attention', touch: 'Reel: same set on L to 3XL', kpi: 'Reach', w: 'notices' },
  { s: 'Check', a: 'Interest', touch: 'Size guide highlight', kpi: 'Saves', w: 'checks' },
  { s: 'Want', a: 'Desire', touch: 'Product page with measurements', kpi: 'Add to cart', w: 'wants it' },
  { s: 'Buy', a: 'Action', touch: 'WhatsApp size check → order', kpi: 'Size checks → orders', w: 'orders' },
  { s: 'Come back', a: 'Satisfaction', touch: 'Day-7 “how does it fit?”', kpi: 'Reviews · repeat', w: 'seven days' },
];

export const FIX_FIRST = [
  { v: '2 of 9', t: 'co-ords come in every size from L to 3XL', w: 'two of nine' },
  { v: '1 of 13', t: 'product pages show garment measurements', w: 'one of thirteen' },
  { v: '2', t: 'banner claims to confirm: “30% discount”, “international shipping”', w: 'Those get fixed' },
];
export const TIMELINE = [
  { d: 'T-45', t: 'Lock 6 styles · confirm suppliers make L–3XL', w: 'Forty-five' },
  { d: 'T-30', t: 'Samples tested on real women', w: 'Thirty days' },
  { d: 'T-14', t: 'Waitlist opens · teaser Reels', w: 'Fourteen' },
  { d: 'T0', t: 'Launch to the waitlist first', w: 'launch to' },
];

/** ILLUSTRATIVE budget, not Aalayam data. Replace with real numbers after 30 days. */
export const BUDGET = { orders: 30, conv: 0.01, cpc: 10, creators: 12, creatorFee: 3000, contribution: 367 };
export const budget = (b = BUDGET) => { const visits = b.orders / b.conv; const spend = visits * b.cpc; return { visits, spend, cpo: spend / b.orders, creators: b.creators * b.creatorFee }; };

export const TABS = ['Posts', 'Enquiries', 'Orders', 'Products', 'Suppliers'];
export const METRICS = [
  { s: 'Notice', m: 'Reach', f: 'people who saw it' },
  { s: 'Check', m: 'Save rate', f: 'saves ÷ reach' },
  { s: 'Want', m: 'Add-to-cart rate', f: 'carts ÷ visits' },
  { s: 'Buy', m: 'Size check → order', f: 'orders ÷ size checks' },
  { s: 'Come back', m: 'Size exchanges', f: 'exchanges ÷ orders' },
];
