// Episode 7 data. Everything shown in the video, copied from docs/research-report.md.
// Edit here and re-render. When real Aalayam data arrives, fill the `value` fields and flip the status.
// Status: actual · unquantified (real activity, no numbers) · unavailable · illustrative (worked example, NOT Aalayam data) · estimated (benchmark)

export type Status = 'actual' | 'unquantified' | 'unavailable' | 'illustrative' | 'estimated';

export const EVIDENCE: { t: string; d: string; s: Status }[] = [
  { t: 'Shopify store live', d: 'Owner notes · chosen over Dukaan and WooCommerce', s: 'actual' },
  { t: 'Size range L–3XL', d: 'Owner notes · ₹1,000–1,700', s: 'actual' },
  { t: 'Instagram test campaign', d: '“Good results” · numbers to confirm', s: 'unquantified' },
  { t: 'Pop-up promoted, Kakkanad', d: 'Canva posters, Dec 2025 · two different dates', s: 'unquantified' },
  { t: 'Supplier trip across India', d: 'Confirmed by owner · no records in project', s: 'unquantified' },
  { t: 'Instagram insights', d: 'No export or screenshots', s: 'unavailable' },
  { t: 'Shopify analytics and orders', d: 'Connector needs sign-in', s: 'unavailable' },
  { t: 'Supplier quotes, MOQs, samples', d: 'Not in repository or Notion', s: 'unavailable' },
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

/** ILLUSTRATIVE cost model. Price band is actual (₹1,000–1,700); every other input is illustrative. */
export const COST = { price: 1400, gst: 5, garment: 600, packaging: 40, shipping: 80, feePct: 2, returnRate: 20, twoWayShip: 160, targetMargin: 35, moq: 30 };
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
export const DASHBOARD = [
  { area: 'Audience', tiles: ['Reach', 'Engagement rate', 'Saves', 'Enquiries'] },
  { area: 'E-commerce', tiles: ['Sessions', 'Add-to-cart rate', 'Orders', 'Conversion rate'] },
  { area: 'Product', tiles: ['Interest', 'Sample status', 'Unit cost', 'Margin'] },
  { area: 'Supply chain', tiles: ['Identified', 'Samples', 'Approved', 'Avg lead time'] },
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
  { o: 'Store, content, an event and a supplier search all happened', i: 'Aalayam can operate as a business', a: 'Capture the evidence it produces' },
  { o: 'Every key metric is “to confirm”', i: 'Experiments ran; learning wasn’t recorded', a: 'Days 1–30: consolidate the data' },
  { o: 'The size range is L–3XL', i: 'The fit problem is a plus-size problem', a: 'L–3XL as a supplier gate; fit content' },
];
export const UNKNOWN = ['Content results by theme', 'Store funnel and orders', 'Pop-up outcome', 'Supplier quotes and MOQs', 'Real unit costs and margins'];

export const PLAN = [
  { d: 'Days 1–30', t: 'Organise', items: ['Reconnect Shopify; export 6 months', 'Log every past post', 'Record the pop-up outcome', 'Enter every supplier and stage'], kpi: ['% posts logged', 'Data completeness', 'Baseline funnel'] },
  { d: 'Days 31–60', t: 'Test', items: ['10–15 customer interviews', 'Samples from top 2–3 suppliers', 'Fit content with UTM links', 'Real unit economics'], kpi: ['Save and enquiry rate', 'Samples scored', 'Contribution margin'] },
  { d: 'Days 61–90', t: 'Decide', items: ['Score every product', 'Approve suppliers', 'Small batch, iterate or stop'], kpi: ['Scorecard result', 'Supplier approved', 'Batch sell-through'] },
];
