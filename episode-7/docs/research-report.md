# Episode 7 · Business Validation, Design & Operating Model
## Aalayam by Anamika · Business Research Series

**Question:** *Can Aalayam operate as a real clothing business? What did the move from research to real-world activity teach us, and what should be decided next?*

**Status: provisional. The video was produced on 28 Nov 2026, on the owner's instruction, with the real data still unavailable (an "awaiting data" version).** The audit in section 1 found that **most of the performance data from Aalayam's real activities is not available in this project**: Instagram insights, Shopify analytics and supplier records. This report therefore:
1. documents what *actually exists*,
2. builds the data model, frameworks and dashboard that the real data should flow into, and
3. uses **clearly labelled illustrative values** only where a worked example is needed.

> Every illustrative value is marked **"Illustrative assumption: not actual Aalayam business data."** Nothing in this report is a measured Aalayam result unless it is labelled **Actual**.

### Evidence status labels

| Label | Meaning |
|---|---|
| **Actual** | Taken from Aalayam's own records (Notion notes, Canva files, owner statements) |
| **Actual, unquantified** | A real activity or outcome, but without numbers |
| **Incomplete** | Exists, but missing fields or confirmation |
| **Estimated** | Our estimate or an industry benchmark |
| **Illustrative** | A worked example only; not Aalayam data |
| **Unavailable** | Not found, or not accessible from this project |

---

## 1. Evidence inventory (audit, 27 Nov 2026)

**Where we looked:** the project repository (all folders); the Notion workspace connected to this session; the Canva account connected to this session; the Shopify connector; the public store domain; and a public web search.

| # | Source | Type of data | Period | What it can tell us | Status |
|---|---|---|---|---|---|
| E1 | Notion: "Aalayam by Anamika: D2C fashion store" (project page) | Owner's project notes | Last edited 23 Nov 2026 | Store live on Shopify (chosen over Dukaan and WooCommerce); catalogue of co-ords, kurtas and sarees; **sizes L–3XL**; price ₹1,000–1,700; SKU format `AAL-TYPE-COLOR-SIZE`; brand voice "honest, no fake urgency"; a UX and conversion review was run; a first Instagram campaign "produced good results" | **Actual**; metrics marked "⚠️ TO CONFIRM" by the owner |
| E2 | Canva: three Aalayam poster designs | Social and event creative | Created 12 Dec 2025 | Messaging ("Feel the comfort. Flaunt the style.", "Cotton Comfy Wear", "Style that moves with you"); a **live pop-up at Olive Courtyard, Kakkanad** | **Actual**, but the posters give **two different dates** (15 Dec, 4–9 PM; and 16 Dec, 4 PM), and whether the event took place is not recorded |
| E3 | Owner answers (Episode 5) | Business facts | Nov 2026 | Portfolio; four channels (Shopify, Instagram/WhatsApp, marketplaces, exhibitions); NRI not live | **Actual** |
| E4 | The Episode 7 brief | Owner statement | 2025–2026 | Social pages created and content published; Shopify store built; **travel across India to find ready-made suppliers**; sourcing information collected | **Actual, unquantified**: activities confirmed; records not in the project |
| E5 | Instagram / Facebook insights | Reach, engagement, saves, profile visits, link taps | — | Audience validation | **Unavailable**: no export or screenshot in the project, and no connector |
| E6 | Shopify analytics and orders | Sessions, funnel, orders, revenue | — | Store validation | **Unavailable**: the Shopify connector needs the owner to sign in again; the store domain did not resolve from this environment |
| E7 | Public store pages (aalayambyanamika.com) | Catalogue, prices, policies | — | Product and policy audit | **Unavailable**: not reachable from this environment, and not found by public web search |
| E8 | Supplier notes, quotations, catalogues, samples | Sourcing records | — | Supply-chain feasibility | **Unavailable**: nothing in the repository or Notion ("sourcing", "supplier", "MOQ" all return nothing) |
| E9 | Product photos and design assets | Creative | — | Product presentation audit | **Unavailable** (only the three posters in E2) |
| E10 | Customer interview notes | Qualitative | — | Customer needs | **Unavailable** (held, per Episode 4, but not shared) |
| E11 | Episodes 1–6 research | Market, competitors, customers, strategy | 2025–2026 | Strategic hypotheses to test | **Actual** (secondary research; see earlier reports) |

### What the audit changes

- **A new, important fact (E1): Aalayam's size range is L–3XL.** Episodes 5–6 did not know this. It sharpens Episode 6's fit strategy: the fit-frustrated customer is specifically **the plus-size customer**, which makes the Episode 6 study of 400 plus-size Indian women (poor fit at 10 of 12 body points) directly relevant. It also means competitors' plus-size lines (for example Libas's 2XL–6XL range) are the relevant comparison, not their whole catalogue.
- **The owner's own notes mark every key metric "TO CONFIRM".** The business has run real experiments, but their results have not yet been recorded in a form that supports decisions. **That is the central finding of this episode.**

---

## 2. Business data model

One operating system joins five entities through shared IDs. Templates are in `../data/` as CSV files, ready for a spreadsheet.

```
CONTENT (content_id) ──utm_campaign──▶ SHOPIFY SESSIONS ──▶ ORDERS (order lines carry sku)
     │                                                        │
     └──content_id──▶ ENQUIRIES (DMs, WhatsApp, events) ◀────┘
PRODUCTS (sku = AAL-TYPE-COLOR-SIZE) ──supplier_id──▶ SUPPLIERS
```

### A. Content data: `content_log.csv`

| Field | Where it comes from | Needs extra tracking? |
|---|---|---|
| Content ID, platform, date, format, product, concept, **content group**, audience | Kept manually when posting | Yes, a manual log (2 minutes per post) |
| Reach, views/impressions, likes, comments, shares, saves, profile visits | Instagram Insights (per post, professional account) | No |
| Link clicks | Instagram reports link-sticker taps (Stories) and external link taps (profile) | Partly: not per feed post |
| Website sessions from the content | Shopify, **only if links carry UTM tags** (`utm_source=instagram&utm_campaign=<content_id>`) | **Yes: UTM links** |
| Enquiries | DMs, WhatsApp and event conversations | **Yes: an enquiry log** (`enquiries.csv`) |
| Orders attributed | Shopify order referrer or UTM; or a discount code per campaign | **Yes: UTM or codes** |

### B. Product data: `products.csv`

Fields: product ID · **SKU** (the existing `AAL-TYPE-COLOR-SIZE` format) · category · name · design concept · target customer · supplier ID · fabric · size range · purchase cost · packaging · shipping · payment fee · GST rate · selling price · gross margin · MOQ · lead time · availability · feedback · status (idea → sample requested → sample received → listed → live → discontinued).

**No product costs are available.** Cost fields stay empty until real quotations are entered.

### C. Shopify data: `shopify_daily.csv`

Fields: date · sessions · traffic source · UTM campaign · landing page · product views · sessions with add-to-cart · sessions reaching checkout · orders · revenue · AOV · conversion rate · abandoned checkouts · new and returning customers.

These come straight from Shopify Analytics. Once the connector is signed in again, these ShopifyQL queries would fill the table:

```
FROM sessions SHOW sessions, sessions_with_cart_additions, sessions_that_reached_checkout,
  sessions_that_completed_checkout, conversion_rate TIMESERIES week SINCE -180d UNTIL today
FROM sessions SHOW sessions, conversion_rate GROUP BY referrer_source, utm_campaign SINCE -180d UNTIL today
FROM sales SHOW orders, net_sales, average_order_value GROUP BY product_title SINCE -180d UNTIL today
```

### D. Supplier data: `suppliers.csv`

Fields: anonymised supplier ID · city and state · categories · ready-made availability · MOQ · unit price range · sample availability · fabric information · size range · **L–3XL available (yes/no)** · customisation · lead time · payment and shipping terms · quality note · **stage** · stage date · score · main risk. Contact details are kept in a separate private file, never in the shared sheet.

**Supplier stages: each is a separate, dated status, never assumed.**

| Stage | Meaning | Evidence needed to tick it |
|---|---|---|
| 1. Identified | Name and location known | A note |
| 2. Contacted | A conversation happened | Date of the call or visit |
| 3. Information collected | MOQ, price, lead time, sizes known | A written quote or notes |
| 4. Sample received | A physical sample in hand | Photo plus date |
| 5. Evaluated | Scored on the scorecard (section 5) | A completed score |
| 6. Selected | Chosen for a product | A decision note |
| 7. Order placed | A purchase order sent | PO or invoice |

### E. Enquiries: `enquiries.csv`

Fields: date · channel · source content · product · **question type** (size, price, fabric, delivery, availability) · size asked · converted (yes/no). **No names or phone numbers are stored.**

---

## 3. Social media audience validation

### What exists

- **Actual, unquantified:** a first Instagram campaign was run and, in the owner's words, "produced good results, enough to commit to a wider go-to-market plan" (E1). No reach, engagement or click figures are recorded.
- **Actual creative (E2):** the brand-message posters and the pop-up event promotion.

**So none of the analysis questions** (which format, concept or theme performed best) **can be answered yet.** Saying "good results" without numbers is exactly the gap this episode should close.

### Content experiment framework (ready for the real data)

| Group | Example from Aalayam | What it tests |
|---|---|---|
| Product-focused | A co-ord on a plain background, price shown | Is the product itself appealing? |
| Styling and outfits | One set styled three ways | Do people use Aalayam as inspiration (saves)? |
| Fabric and comfort | "Cotton Comfy Wear" close-ups (E2 messaging) | Does comfort drive interest? |
| **Fit and size (L–3XL)** | Real-size models, measurements on screen | Does fit proof drive enquiries? (the Episode 6 hypothesis) |
| Brand story | Founder, Kochi, "honest fits, fair prices" | Does the story build follows and trust? |
| Event and promotional | Olive Courtyard pop-up posters (E2) | Do events drive visits and enquiries? |

### Metrics per group (calculated only when the data exists)

| Metric | Formula | Why this denominator |
|---|---|---|
| Engagement rate by reach | (likes + comments + shares + saves) ÷ reach × 100 | Removes the advantage of posts that simply reached more people |
| Save rate | saves ÷ reach × 100 | Signals "I want to come back to this": inspiration or purchase intent |
| Share rate | shares ÷ reach × 100 | Word of mouth |
| Profile-visit rate | profile visits ÷ reach × 100 | Curiosity about the brand |
| Link-click rate | link clicks ÷ reach × 100 | Intent to shop |
| Enquiry rate | enquiries ÷ reach × 1,000 | Purchase conversations per thousand people reached |
| Content-to-site conversion | orders ÷ UTM sessions × 100 | Only with UTM links |

**Fair-comparison rules:** compare groups only with **at least 5 posts each**; compare within the same period (follower count changes); note any paid boost separately (it inflates reach); and use medians as well as averages, because one viral post skews an average.

### From observation to action (template)

| Observation (data) | Interpretation (possible) | Implication | Action |
|---|---|---|---|
| *e.g. fit-and-size posts have the highest enquiry rate* | Plus-size customers may be looking for fit proof | Fit content can drive sales, not just likes | Put measurements and real-size models in every product post; test for 4 weeks |
| *e.g. styling posts get the most saves but few clicks* | Used as inspiration, not as a buying trigger | Good for reach, weak for sales | Add "shop this look" links with UTMs |

*Both rows are templates showing the method. They are not findings.*

---

## 4. Shopify store as a digital product

**Actual (E1):** built on Shopify after comparing Dukaan and WooCommerce; a structured SKU system; brand-voice copy; a **UX and conversion review was carried out**, but its findings are not recorded in the project. **The store itself and its analytics could not be accessed in this session.**

### Customer journey framework

| Stage | Questions | Data source | Status |
|---|---|---|---|
| **1. Acquisition** | Where do visitors come from: Instagram, direct, search, referral, campaign? | `sessions` by `referrer_source`, `utm_campaign` | Unavailable |
| **2. Discovery** | Is it clear in 5 seconds that Aalayam sells comfortable co-ords and sarees in L–3XL? Clear navigation, prices, mobile layout? | Store review (checklist below); landing-page bounce rate | Unavailable (store not reachable) |
| **3. Evaluation** | Fabric, **garment measurements**, model size, true-colour photos, delivery time, return policy, reviews | Product-page review; product views ÷ sessions | Unavailable |
| **4. Purchase** | Add-to-cart → checkout → purchase drop-offs | `sessions_with_cart_additions`, `sessions_that_reached_checkout`, `sessions_that_completed_checkout` | Unavailable |
| **5. Retention** | Repeat purchases, returning customers, return rate, feedback | `returning_customer_rate`, refunds, survey | Too early to measure meaningfully: needs at least 90 days and dozens of orders |

### Product-page evaluation checklist (from Episodes 4 and 6)

| Item | Why (customer evidence) |
|---|---|
| Garment measurements for each size, L–3XL | Fit is the top complaint (Episodes 4 and 6) |
| Model's height and size worn | Helps a customer judge fit |
| Fabric composition, opacity, lining | "Fabric is thin", "sheer" complaints |
| Daylight, unedited photos | "Colour different from the picture" |
| Delivery time and return or exchange policy near the Buy button | Reduces the risk of ordering |
| Reviews (once there are some) | No public reviews yet (Episode 5) |

### What zero or low sales would, and would not, mean

**Do not read a lack of orders as product failure until there has been enough traffic.**

**Worked example (Estimated: a benchmark, not Aalayam data).** Assume a true conversion rate of 1%, a commonly cited order of magnitude for small apparel stores. The chance of seeing **zero orders by luck alone** is:

- after 100 sessions: 0.99¹⁰⁰ ≈ **37%**
- after 300 sessions: 0.99³⁰⁰ ≈ **5%**

**Rule:** treat conversion conclusions as unreliable below about 300 product-focused sessions. Look first at the earlier stages (product views, add-to-cart): they produce signals with far less traffic.

---

## 5. Supply chain evaluation

**Actual, unquantified (E4):** the team travelled to different parts of India to identify ready-made garment suppliers and collected sourcing information. **Not available:** which cities, how many suppliers, quotations, MOQs, samples. **So no supplier is scored here.** The model below is the template, demonstrated with an illustrative example.

### Weighted supplier scorecard (weights add to 100%)

| Criterion | Weight | Why this weight for Aalayam |
|---|---|---|
| Quality (stitching, fabric, finish, from a sample) | 20% | Comfort and fit are the brand promise |
| Product relevance (co-ords and sarees in Aalayam's style) | 15% | Must fit the positioning |
| Unit cost | 15% | Must leave a margin within ₹1,000–1,700 |
| **L–3XL size availability and grading** | 10% | The core of the brand (E1); many suppliers stop at XL |
| MOQ | 10% | Small batches limit inventory risk |
| Lead time | 10% | Affects reorders and cash |
| Fabric information (composition, GSM) | 5% | Needed for honest product pages |
| Consistency (batch to batch) | 5% | Repeat orders must match the sample |
| Communication | 5% | A small team needs a responsive partner |
| Logistics and payment terms | 5% | Cash flow and delivery to Kochi |
| **Total** | **100%** | |

**Scale:** 1 = unacceptable · 2 = weak, major issue · 3 = acceptable · 4 = good · 5 = excellent. **Gate rule:** a score of 1 on quality or on L–3XL availability rejects the supplier, whatever the total.

### Illustrative example: *Illustrative assumption, not actual Aalayam business data*

| | SUP-ILL-A | SUP-ILL-B |
|---|---|---|
| Profile | Ready-made cotton co-ords, sizes S–XL only | Ready-made co-ords, S–3XL, higher price |
| Quality (20) | 4 | 4 |
| Relevance (15) | 4 | 4 |
| Unit cost (15) | 5 | 3 |
| L–3XL (10) | **1 → gate fails** | 5 |
| MOQ (10) | 3 | 4 |
| Lead time (10) | 4 | 3 |
| Fabric info (5) | 3 | 4 |
| Consistency (5) | 3 | 3 |
| Communication (5) | 4 | 4 |
| Terms (5) | 3 | 3 |
| **Weighted score** | 3.60, but **rejected** (no L–3XL) | **3.75 → request samples** |

*The lesson of the example: a cheap supplier can score well overall and still be wrong for Aalayam, because the size gate matters more than price.*

### Supplier comparison table (to be filled with real, anonymised data)

| Supplier | Location | Category | MOQ | Unit price | Lead time | Quality status | Sample status | Score | Main risk |
|---|---|---|---|---|---|---|---|---|---|
| SUP-01 | *to confirm* | | | | | | | | |

### Commercial feasibility: transparent cost model

*Illustrative assumption: not actual Aalayam business data. Replace each input with a real quotation.*

| Input | Value | Basis |
|---|---|---|
| Selling price (incl. GST) | ₹1,400 | Middle of Aalayam's stated ₹1,000–1,700 band (Actual band) |
| GST on apparel | 5% | Rate for garments up to ₹2,500 after the Sept 2025 revision. **Verify with an accountant.** |
| Net revenue | ₹1,400 ÷ 1.05 = **₹1,333** | Calculated |
| Purchase cost | ₹600 | Illustrative |
| Packaging | ₹40 | Illustrative |
| Outbound shipping | ₹80 | Illustrative |
| Payment gateway fee | 2% of ₹1,400 = ₹28 | Typical Indian gateway rate (Estimated) |
| Returns allowance | 20% return rate × ₹160 two-way shipping = ₹32 | 20% is the low end of industry estimates (Episode 6) |
| **Contribution per unit** | 1,333 − 600 − 40 − 80 − 28 − 32 = **₹553** | Calculated |
| **Contribution margin** | 553 ÷ 1,333 = **≈ 41%** | Calculated |

**Break-even purchase cost for a 35% margin:** 1,333 − 0.35 × 1,333 − 180 ≈ **₹687** (where 180 = packaging + shipping + fee + returns). Any real quote above about ₹690 at this price needs a higher price, a cheaper supplier or lower costs.

**Inventory risk:** MOQ × purchase cost is cash tied up per style. *Illustrative:* MOQ of 30 units across L–3XL × ₹600 = **₹18,000 per style**. Ten styles is ₹1.8 lakh before a single sale. Unsold stock in the larger sizes is a real risk if sizes are bought evenly without knowing the demand mix.

---

## 6. Connecting audience, design and supply chain

```
Audience insight → product/design decision → supplier feasibility → product selection
       ↑                                                                    ↓
Business learning ← audience response ← digital product presentation (store + content)
```

**What this loop prevents:**
- **Designing without demand:** a style chosen because the team likes it, not because content or enquiries showed interest.
- **Sourcing without viability:** a supplier chosen on price who can't make L–3XL, or whose cost leaves no margin.
- **Launching without measurement:** stock bought before there is any way to tell what sold and why.

### Product validation scorecard

| Criterion | Weight | Evidence used |
|---|---|---|
| Customer relevance (a real pain point) | 20% | Reviews, interviews, enquiries |
| Audience interest | 20% | Saves, enquiries, pre-orders for that concept |
| Competitive differentiation | 15% | Strategy canvas (Episode 6) |
| Supplier feasibility (L–3XL, quality, MOQ) | 20% | Supplier scorecard |
| Unit economics (contribution margin) | 15% | Cost model |
| Operational risk (inverse: 5 = low risk) | 10% | Stock, lead time, complexity |

### Decision rules

| Result | Decision |
|---|---|
| Any **gate fails**: unit economics below 3, or supplier feasibility below 2 | **Reject**, or fix the gap first |
| Weighted score below 3.0 | **Improve the concept** or reject |
| 3.0–3.4 | **Test the concept**: content and a waitlist, with no stock yet |
| 3.5–3.9 | **Request samples** and negotiate with suppliers |
| 4.0 or above, with every criterion at least 3 | **Launch a small batch** (one MOQ) |

### Illustrative application: *Illustrative assumption, not actual Aalayam business data*

| Product | Relevance | Interest | Diff. | Supplier | Economics | Risk | Score | Decision |
|---|---|---|---|---|---|---|---|---|
| Fit-confident cotton co-ord, L–3XL (Episode 6 concept) | 5 | 3 (unknown → neutral) | 4 | 3 | 3 | 3 | **3.55** | Request samples |
| Generic printed kurta set | 2 | 3 | 1 | 4 | 3 | 4 | **2.80** | Reject (consistent with Episode 5's pruning) |

Calculation for the co-ord: 0.20×5 + 0.20×3 + 0.15×4 + 0.20×3 + 0.15×3 + 0.10×3 = 1.00 + 0.60 + 0.60 + 0.60 + 0.45 + 0.30 = **3.55**.

---

## 7. Data strategy

### Sources and tools: implemented vs recommended

| Source | Tool | Status |
|---|---|---|
| E-commerce, orders, funnel | Shopify Analytics | **Implemented** (store live, E1); data not yet reviewed |
| Social performance | Instagram Insights | **Implemented** (account active); not yet logged |
| SKU naming | `AAL-TYPE-COLOR-SIZE` | **Implemented** (E1) |
| Content log, enquiries, products, suppliers | One Google Sheet with five tabs (the CSV templates) | **Recommended** |
| Campaign attribution | UTM links on every bio, story and ad link | **Recommended** |
| Weekly dashboard | A sheet summary tab, or Looker Studio on top of it | **Recommended** |
| Automated connections (Shopify → sheet) | — | **Future**, only once volume justifies it |

**Weekly routine (about 30 minutes):** copy last week's Instagram post metrics into the content log; export Shopify's weekly sessions and funnel; log enquiries daily (1 minute each); update supplier stages after every contact.

### Data quality rules

| Risk | Rule |
|---|---|
| Missing data | An empty cell stays empty; never fill it with a guess |
| Duplicates | One row per content ID, order or supplier |
| Inconsistent product names | Use the SKU as the key, never the product name |
| Wrong attribution | Without UTM or a code, write "unattributed" |
| Small samples | Show "n" next to every rate; no conclusions below the thresholds in sections 3–4 |
| Short periods | Compare at least 4 weeks against at least 4 weeks; note festivals and events |
| Unverified feedback | Tag feedback as "verified buyer" or "unverified" |

### Privacy

Collect only what a decision needs: no names, phones or addresses in analysis sheets. Customer data stays in Shopify. Supplier contacts live in a private file, and the shared sheet uses SUP-IDs. The video shows **no customer or supplier identities**.

---

## 8. Business validation dashboard (prototype)

All values are **empty until real data is entered**. The video shows the structure only, with "awaiting data".

| Audience | E-commerce | Product | Supply chain |
|---|---|---|---|
| Reach · engagement rate · saves · shares · profile visits · enquiries | Sessions · product views · add-to-cart rate · checkout rate · orders · conversion · revenue | Interest per product · sample status · cost · price · margin · availability | Suppliers identified → contacted → info → samples → evaluated → approved · average lead time · MOQ · sourcing cost |

Each tile shows: value · n (sample size) · period · source · confidence (high / medium / low / awaiting).

---

## 9. Business validation findings

| # | Observation | Interpretation | Implication | Action |
|---|---|---|---|---|
| 1 | Store live; Instagram test run; pop-up promoted; suppliers visited (Actual) | Aalayam has moved from desk research to real operations | The business can now generate first-hand evidence | Capture it systematically |
| 2 | Every key metric is "TO CONFIRM"; no analytics or supplier records in the project (Actual) | Experiments ran, but learning wasn't recorded | Decisions risk resting on impressions ("good results") | **Days 1–30: consolidate data** |
| 3 | Size range is L–3XL (Actual) | Positioning is plus-size comfort, which matches the fit pain point | Fit proof and supplier size coverage become critical | Make L–3XL a supplier gate; fit content |
| 4 | The pop-up posters give two different dates (Actual) | Small version-control gaps happen in a busy launch | Shows why one source of truth matters | Single content calendar |
| 5 | No supplier is documented past "identified/visited" (Actual) | Supply feasibility is not yet proven | Can't confirm margins or MOQ risk | Request samples from the top suppliers; fill the scorecard |

### Still unknown (needed before any scaling decision)

- Instagram results by post and content group
- Store sessions, funnel and orders to date
- Cities visited, number of suppliers, quotes, MOQs and samples
- Real product costs and margins
- What happened at the pop-up (visitors, enquiries, sales)
- Interview themes

### Biggest risks before scaling

Buying stock without demand data · a supplier that can't grade L–3XL consistently · margins squeezed by returns and shipping · deciding on unrecorded "good results" · founder time spread across every channel.

---

## 10. 90-day validation roadmap

| Phase | Actions | KPIs (definitions, not invented targets) |
|---|---|---|
| **Days 1–30: Organise and validate** | Re-connect Shopify; export 6 months of analytics · log every past Instagram post into the content log · record pop-up outcomes · enter every supplier and stage · audit the product pages against the checklist · shortlist the top 3 product opportunities | % of posts logged · data completeness per tab · baseline sessions, add-to-cart and checkout rates · suppliers at each stage |
| **Days 31–60: Test** | 10–15 customer interviews (Episode 6 guide, plus L–3XL fit) · request samples from the top 2–3 suppliers · fit-content experiment (5+ posts per group, UTM links) · improve product pages (measurements, model size) · build real unit economics from the quotes | Save, enquiry and link-click rates by group · samples received and scored · contribution margin per shortlisted product |
| **Days 61–90: Decide** | Score each product on the validation scorecard · compare suppliers · review feedback · **launch one small batch, iterate or stop** | Scorecard result per product · supplier approved (yes/no) · sell-through of the small batch (if launched) |

---

## 11. What we need from the owner to complete this episode

To replace templates with real analysis, please share any of these (screenshots are fine):

1. **Instagram Insights**: the post list with reach, likes, saves, shares, profile visits (Professional dashboard → Content you shared; or Meta Business Suite → Insights → Export).
2. **Shopify**: sign in again to the Shopify connector in claude.ai connector settings, or export Analytics → Reports → "Sessions over time", "Conversion rate breakdown" and "Sales by product" as CSV.
3. **Sourcing trip**: the cities visited, and per supplier (anonymised is fine) categories, MOQ, price range, sizes offered, lead time and sample status.
4. **Pop-up**: which date it happened, rough footfall, enquiries and sales.
5. **Product costs**: purchase cost per product, packaging and shipping.

## 12. Sources

- Notion workspace: "Aalayam by Anamika: D2C fashion store" project page (owner notes, last edited 23 Nov 2026)
- Canva: "Poster - Aalayam Women's Comfort Wear", "Aalayam", and an untitled design (created 12 Dec 2025)
- Episodes 1–6 reports in this repository; the Technopak report (Aug 2025) for market context
- GST on apparel (verify): CBIC rate notifications after the GST Council's 56th meeting (Sept 2025)
- Return-rate estimates: see the Episode 6 sources (Unicommerce, Grant Thornton Bharat, via ClickPost)
