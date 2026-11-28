// Episode 7 data. Everything shown in the video, copied from docs/research-report.md.
// Edit here and re-render. When real Aalayam data arrives, fill the `value` fields and flip the status.
// Status: actual · unquantified (real activity, no numbers) · unavailable · illustrative (worked example, NOT Aalayam data) · estimated (benchmark)

export type Status = 'actual' | 'unquantified' | 'unavailable' | 'illustrative' | 'estimated';

export const EVIDENCE: { t: string; d: string; s: Status }[] = [
  { t: 'Shopify store: 13 live products', d: 'Public catalogue, read 28 Nov 2026', s: 'actual' },
  { t: 'Size promise L–3XL', d: 'Owner notes and size guide · ₹1,000–1,700', s: 'actual' },
  { t: 'Policies and size guide', d: '5–7 day delivery · 30-day returns · WhatsApp fit help', s: 'actual' },
  { t: 'Instagram test campaign', d: '“Good results” · numbers to confirm', s: 'unquantified' },
  { t: 'Pop-up promoted, Kakkanad', d: 'Canva posters, Dec 2025 · two different dates', s: 'unquantified' },
  { t: 'Supplier trip across India', d: 'Confirmed by owner · no records in project', s: 'unquantified' },
  { t: 'Instagram insights', d: 'Public page needs a login · no export', s: 'unavailable' },
  { t: 'Store analytics and orders', d: 'Shopify connector needs sign-in', s: 'unavailable' },
  { t: 'Supplier quotes, MOQs, samples', d: 'Not in repository or Notion', s: 'unavailable' },
  { t: 'Interview notes', d: 'Held, not shared', s: 'unavailable' },
];

/** ACTUAL: public store catalogue (aalayambyanamika.com/products.json), read 28 Nov 2026. */
export const CATALOGUE = [
  { t: 'Half Collar Cotton', type: 'Co-ord', p: 1200, sizes: ['M', 'L', 'XXL'], d: '26 Jul' },
  { t: 'Blue Cotton', type: 'Co-ord', p: 1000, sizes: ['L'], d: '26 Jul' },
  { t: 'Orange Cotton', type: 'Co-ord', p: 1000, sizes: ['L'], d: '26 Jul' },
  { t: 'Rani Embroidered', type: 'Co-ord', p: 1500, sizes: ['L'], d: '26 Jul' },
  { t: 'White Embroidered', type: 'Co-ord', p: 1000, sizes: ['M'], d: '26 Jul' },
  { t: 'Dark Green Embroidered', type: 'Co-ord', p: 1200, sizes: ['XL'], d: '26 Jul' },
  { t: 'Beige Floral Block-Print', type: 'Co-ord', p: 1500, sizes: ['M', 'L', 'XL', 'XXL', 'XXXL'], d: '2 Aug' },
  { t: 'Mustard Floral Watercolor', type: 'Co-ord', p: 1500, sizes: ['L', 'XL', 'XXL', 'XXXL'], d: '2 Aug' },
  { t: 'Brown Floral Block-Print', type: 'Co-ord', p: 1700, sizes: ['M', 'L', 'XL', 'XXL'], d: '2 Aug' },
  { t: 'Teal Anarkali 3-piece', type: 'Kurta set', p: 2000, sizes: ['M', 'L', 'XL', 'XXXL'], d: '2 Aug' },
  { t: 'Classic Stripe Onam Saree', type: 'Saree', p: 900, sizes: ['One size'], d: '9 Aug' },
  { t: 'Set Mundu', type: 'Set mundu', p: 850, sizes: ['One size'], d: '10 Aug' },
  { t: 'Ajrakh Flared Skirt', type: 'Skirt', p: 1500, sizes: ['Free size'], d: '29 Aug' },
];
export const SIZES = ['M', 'L', 'XL', 'XXL', 'XXXL'];
export const PROMISE = ['L', 'XL', 'XXL', 'XXXL'];
export const coords = () => CATALOGUE.filter((c) => c.type === 'Co-ord');
export const fullPromise = (c: { sizes: string[] }) => PROMISE.every((z) => c.sizes.includes(z));
export const median = (a: number[]) => { const b = [...a].sort((x, y) => x - y), m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
/** ACTUAL page-content counts across the 13 product pages. */
export const PAGE_AUDIT = [
  { t: 'Size guide with WhatsApp fit check', v: 'Live', ok: true },
  { t: 'Garment measurements on product page', v: '1 of 13', ok: false },
  { t: 'Fabric named (cotton)', v: '6 of 13', ok: false },
  { t: 'Wash-care instructions', v: '5 of 13', ok: false },
  { t: 'Colour-variation note', v: '2 of 13', ok: false },
  { t: 'Inflated MRP shown', v: '0 of 13', ok: true },
  { t: 'SKU in AAL-TYPE-COLOR-SIZE format', v: '11 of 13', ok: false },
];
export const POLICIES = [
  { t: 'Delivery', v: 'Pan-India in 5–7 days' }, { t: 'Returns', v: '30 days, unworn with tags' }, { t: 'Help', v: 'WhatsApp chat · “replies within a few hours”' },
];
export const FLAGS = [
  { t: 'Announcement bar: “30% discount”', d: 'No product shows a discounted price' },
  { t: 'Announcement bar: “International shipping available”', d: 'Owner said NRI shipping was not live (Ep 5)' },
];

/** Real wording from Aalayam's Canva designs (Dec 2025), re-typeset. */
export const POSTERS = [
  { h: 'Feel the comfort.', s: 'Flaunt the style.', k: 'Brand message' },
  { h: 'Cotton Comfy Wear', s: 'Style that moves with you', k: 'Fabric and comfort' },
  { h: 'Live at Olive Courtyard', s: 'Kakkanad · 15 or 16 December', k: 'Event promotion' },
];
export const GROUPS = [
  { t: 'Product', q: 'Is the product appealing?' },
  { t: 'Styling', q: 'Is it used as inspiration?' },
  { t: 'Fabric and comfort', q: 'Does comfort drive interest?' },
  { t: 'Fit and size, L–3XL', q: 'Does fit proof drive enquiries?' },
  { t: 'Brand story', q: 'Does the story build trust?' },
  { t: 'Events', q: 'Do events drive visits?' },
];
export const FORMULAS = [
  { t: 'Engagement rate', f: '(likes + comments + shares + saves) ÷ reach × 100' },
  { t: 'Save rate', f: 'saves ÷ reach × 100' },
  { t: 'Enquiry rate', f: 'enquiries ÷ reach × 1,000' },
  { t: 'Link-click rate', f: 'link clicks ÷ reach × 100' },
];

export const JOURNEY = [
  { t: 'Acquisition', m: 'Sessions by source and UTM' },
  { t: 'Discovery', m: 'Landing-page bounce rate' },
  { t: 'Evaluation', m: 'Product views ÷ sessions' },
  { t: 'Purchase', m: 'Add to cart → checkout → order' },
  { t: 'Retention', m: 'Repeat and return rate' },
];
export const CHECKLIST = ['Garment measurements, L to 3XL', 'Model height and size worn', 'Fabric, opacity, lining', 'Daylight, unedited photos', 'Delivery time and returns near Buy', 'Reviews, once collected'];
/** Chance of zero orders by luck if the true conversion rate is CONV (estimated benchmark). */
export const CONV = 0.01;
export const pZero = (sessions: number) => Math.pow(1 - CONV, sessions);

export const SUPPLIER_STAGES = ['Identified', 'Contacted', 'Info collected', 'Sample received', 'Evaluated', 'Selected', 'Order placed'];
/** Supplier scorecard. Weights add to 100. */
export const CRITERIA = [
  { c: 'Quality', w: 20 }, { c: 'Product relevance', w: 15 }, { c: 'Unit cost', w: 15 }, { c: 'L–3XL availability', w: 10, gate: true },
  { c: 'MOQ', w: 10 }, { c: 'Lead time', w: 10 }, { c: 'Fabric information', w: 5 }, { c: 'Consistency', w: 5 }, { c: 'Communication', w: 5 }, { c: 'Logistics and terms', w: 5 },
];
/** ILLUSTRATIVE suppliers: not real Aalayam suppliers. Scores in CRITERIA order. */
export const ILL_SUPPLIERS = [
  { id: 'SUP-ILL-A', d: 'Cheaper · sizes S–XL only', s: [4, 4, 5, 1, 3, 4, 3, 3, 4, 3] },
  { id: 'SUP-ILL-B', d: 'Higher price · sizes S–3XL', s: [4, 4, 3, 5, 4, 3, 4, 3, 4, 3] },
];
export const wScore = (s: number[], w: number[]) => s.reduce((a, x, i) => a + x * w[i] / 100, 0);

/** Cost model. Price = ACTUAL median co-ord price (₹1,200); every other input is ILLUSTRATIVE. */
export const COST = { price: 1200, gst: 5, garment: 600, packaging: 40, shipping: 80, feePct: 2, returnRate: 20, twoWayShip: 160, targetMargin: 35, moq: 30 };
export const costModel = (c = COST) => {
  const net = c.price / (1 + c.gst / 100);
  const fee = c.price * c.feePct / 100;
  const ret = c.returnRate / 100 * c.twoWayShip;
  const contrib = net - c.garment - c.packaging - c.shipping - fee - ret;
  const other = c.packaging + c.shipping + fee + ret;
  return { net, fee, ret, contrib, margin: contrib / net * 100, breakEven: net * (1 - c.targetMargin / 100) - other, cash: c.moq * c.garment };
};

export const LOOP = ['Audience insight', 'Design decision', 'Supplier feasibility', 'Product selection', 'Store and content', 'Audience response', 'Business learning'];
export const ENTITIES = [
  { t: 'Content', k: 'content_id', f: 'Reach · saves · enquiries' },
  { t: 'Enquiries', k: 'content_id', f: 'Question type · size asked' },
  { t: 'Shopify', k: 'UTM · SKU', f: 'Sessions · cart · orders' },
  { t: 'Products', k: 'SKU', f: 'Cost · price · margin' },
  { t: 'Suppliers', k: 'supplier_id', f: 'MOQ · lead time · stage' },
];

export const TOOLS: { t: string; s: 'implemented' | 'recommended' }[] = [
  { t: 'Shopify analytics', s: 'implemented' }, { t: 'Instagram Insights', s: 'implemented' }, { t: 'SKU system AAL-TYPE-COLOR-SIZE', s: 'implemented' },
  { t: 'One shared sheet, five tabs', s: 'recommended' }, { t: 'UTM links on every post', s: 'recommended' }, { t: 'Weekly dashboard', s: 'recommended' },
];
export const DASHBOARD: { area: string; tiles: { t: string; v?: string; src?: string }[] }[] = [
  { area: 'Audience', tiles: [{ t: 'Reach' }, { t: 'Engagement rate' }, { t: 'Saves' }, { t: 'Enquiries' }] },
  { area: 'E-commerce', tiles: [{ t: 'Sessions' }, { t: 'Add-to-cart rate' }, { t: 'Orders' }, { t: 'Conversion rate' }] },
  { area: 'Product', tiles: [{ t: 'Products live', v: '13', src: 'n=13 · catalogue · high' }, { t: 'Co-ord median price', v: '₹1,200', src: 'n=9 · catalogue · high' }, { t: 'Full L–3XL co-ords', v: '2 of 9', src: 'n=9 · catalogue · high' }, { t: 'Measurements on page', v: '1 of 13', src: 'n=13 · catalogue · high' }] },
  { area: 'Supply chain', tiles: [{ t: 'Identified' }, { t: 'Samples' }, { t: 'Approved' }, { t: 'Avg lead time' }] },
];

export const PRODUCT_CRITERIA = [
  { c: 'Customer relevance', w: 20 }, { c: 'Audience interest', w: 20 }, { c: 'Differentiation', w: 15 },
  { c: 'Supplier feasibility', w: 20, gate: true }, { c: 'Unit economics', w: 15, gate: true }, { c: 'Operational risk', w: 10 },
];
/** ILLUSTRATIVE product scores, in PRODUCT_CRITERIA order. */
export const ILL_PRODUCTS = [
  { t: 'Fit-confident co-ord, L–3XL', s: [5, 3, 4, 3, 3, 3] },
  { t: 'Generic printed kurta set', s: [2, 3, 1, 4, 3, 4] },
];
export const LADDER = [
  { t: 'Stop: fix gate', r: 'Gate fails' }, { t: 'Reject or improve', r: 'Below 3.0' }, { t: 'Test concept', r: '3.0–3.4' },
  { t: 'Request samples', r: '3.5–3.9' }, { t: 'Small batch', r: '4.0+, all ≥ 3' },
];
export const decide = (s: number) => (s >= 4 ? 4 : s >= 3.5 ? 3 : s >= 3 ? 2 : 1);

export const FINDINGS = [
  { o: '13 live products, honest prices, a size guide with WhatsApp fit help', i: 'The store already applies Episode 6 ideas', a: 'Add garment measurements to all 13' },
  { o: 'Only 2 of 9 co-ords listed in all of L–3XL', i: 'The plus-size promise isn’t yet delivered', a: 'Make L–3XL a supplier gate' },
  { o: 'Every key metric is “to confirm”', i: 'Experiments ran; learning wasn’t recorded', a: 'Days 1–30: consolidate the data' },
];
export const UNKNOWN = ['Content results by theme', 'Store funnel and orders', 'Pop-up outcome', 'Supplier quotes and MOQs', 'Real unit costs and margins'];

export const PLAN = [
  { d: 'Days 1–30', t: 'Organise', items: ['Reconnect store analytics', 'Log every past post', 'Record the pop-up outcome', 'Enter every supplier', 'Measurements on all 13 products'], kpi: ['% posts logged', 'Data completeness', 'Baseline funnel'] },
  { d: 'Days 31–60', t: 'Test', items: ['10–15 customer interviews', 'Samples from top 2–3 suppliers', 'Fit content with UTM links', 'Real unit economics'], kpi: ['Save and enquiry rate', 'Samples scored', 'Contribution margin'] },
  { d: 'Days 61–90', t: 'Decide', items: ['Score every product', 'Approve suppliers', 'Small batch, iterate or stop'], kpi: ['Scorecard result', 'Supplier approved', 'Batch sell-through'] },
];
