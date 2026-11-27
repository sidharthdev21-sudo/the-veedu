# The Veedu, Episode 03: "Is There a Business Here?"

**Market opportunity and business feasibility · video package**
Builds on Episode 01 (official data), Episode 02 (customer and competitor research) and the selected hospital cluster: **Amrita Hospital Kochi and Aster Medcity**.

> **Labels.** **Fact** = sourced. **Assumption** = my input, not measured. **Projection** = model output. Nothing here is actual revenue; The Veedu has made no bookings. The full model is `model/model.py`, which writes `model/model.json`. Every number below comes from it.

---

## 1. Why this model replaces the earlier estimate

The November 2026 market scan sized demand from **international** medical arrivals and a 2015 estimate of Kerala's share. That approach has two problems: it leaves out domestic families from other districts and states (Episode 02's priority segment), and it relies on a decade-old share figure. This model starts from something countable at the selected cluster, **inpatient beds**, and makes every step after that an explicit assumption. Kerala's total tourist visits are **not** used as demand.

**Limitation:** no hospital publishes how many inpatients come from outside daily-commute distance, or where their families stay. Those two inputs drive the model, so they're shown as scenario ranges.

---

## 2. Inputs

| Input | Conservative | Base | Optimistic | Type | Basis |
|---|---|---|---|---|---|
| Amrita Kochi beds | 1,450 | 1,450 | 1,450 | **Fact** | Amrita outreach page; Wikipedia [S1, S2] |
| Aster Medcity inpatient beds | 700 | 700 | 700 | **Fact** | Aster website: 800 beds = 700 inpatient + 100 daycare [S3] |
| Bed occupancy | 60% | 65% | 70% | **Fact used as proxy** | Aster Kerala cluster 64% (Q1 FY26), 69% (Q2 FY26) [S4]. Amrita doesn't publish occupancy |
| Families beyond daily-commute distance | 25% | 35% | 45% | **Assumption** | No public source. **Key uncertainty #1** |
| … of those needing a paid room | 30% | 40% | 50% | **Assumption** | Net of the in-room bystander, relatives and campus guest house (Ep02). **Key uncertainty #2** |
| Average nightly rate (market) | ₹1,500 | ₹2,200 | ₹2,800 | **Assumption** | Anchored to Ep02 listings: ~₹900 (OYO), ~₹1,900 (Sulu), ₹2,500 (Puthenkot 2BHK), ~₹4,151 (Casa Allay) |
| Self-arranged, mid-price share (SAM) | 40% | 50% | 60% | **Assumption** | Excludes hospital-arranged stays, relatives and luxury hotels |
| Partner properties | 8 | 10 | 14 | Pilot design | Founder-verifiable in person |
| Rooms per property | 3.5 | 4 | 4 | **Assumption** | Homestay/apartment scale |
| Partner nights sold via The Veedu | 10% | 18% | 25% | **Assumption** | New platform with no audience |
| Pilot nightly rate | ₹1,600 | ₹2,200 | ₹2,800 | **Assumption** | |
| Nights per booking | 4 | 6 | 8 | **Assumption** | Industry inpatient ALOS ≈ 3.1–3.6 days [S4, S5]; caregivers often arrive before admission and stay through discharge |
| Commission | 12% | 12% | 12% | Pilot design | Below the OTA range noted in the Nov 2026 scan |
| CAC per booking | ₹600 | ₹400 | ₹250 | **Assumption** | Hospital-desk referrals + search ads; unvalidated |
| Payment fee | 2% | 2% | 2% | **Assumption** | Typical Indian gateway |
| Support per booking | ₹150 | ₹150 | ₹150 | **Assumption** | |
| Verification per property | ₹5,000 | ₹5,000 | ₹5,000 | **Assumption** | Site visit, photos, **measured walking distance**, annual re-check |
| Fixed costs | ₹38,000/mo | ₹38,000/mo | ₹38,000/mo | **Assumption** | Part-time ops/support ₹25k, tools/hosting ₹8k, outreach ₹5k. **Founder time unpaid** |

---

## 3. Market sizing: TAM, SAM, SOM (projections, per year)

**Method:** beds × occupancy × 365 = patient bed-days. × families beyond commuting distance × needing a paid room = room-nights (TAM). × the self-arranged mid-price share = SAM. SOM = partner rooms × 365 × nights sold through The Veedu.

| | Conservative | Base | Optimistic |
|---|---|---|---|
| Patient bed-days | 470,850 | 510,088 | 549,325 |
| **TAM** room-nights | 35,314 | 71,412 | 123,598 |
| **TAM** value | ₹5.3 cr | ₹15.7 cr | ₹34.6 cr |
| **SAM** room-nights | 14,126 | 35,706 | 74,159 |
| **SAM** value | ₹2.1 cr | ₹7.9 cr | ₹20.8 cr |
| **SOM** room-nights (pilot) | 1,022 | 2,628 | 5,110 |
| **SOM** gross booking value | ₹16.35 L | ₹57.82 L | ₹143.08 L |
| SOM as % of SAM | 7.2% | 7.4% | 6.9% |

**Reading it (Analysis):** the base case puts accommodation spend by out-of-town families around these two hospitals at about ₹16 crore a year, and the share a platform could serve at about ₹8 crore. These are inpatient-linked figures only. **Outpatients on extended treatment aren't sized** and would add demand. A year-one SOM of about 7% of SAM is **ambitious** for a new platform; it's the figure most worth testing.

---

## 4. Revenue models (base-case pilot volume: 438 bookings, ₹57.82 L GBV)

| Model | Projected revenue / yr | For | Against |
|---|---|---|---|
| Booking commission (12%) | ₹6.94 L | Paid only on results; familiar to hosts | Leakage: multi-week guests may rebook direct |
| Listing subscription (₹1,500/property/mo) | ₹1.80 L | Predictable; no leakage | Hard to sell before demand is proven |
| Lead fee (₹250/qualified enquiry, ~2 per booking) | ₹2.19 L | Fits WhatsApp/phone booking habits | Low value per lead; disputes over 'qualified' |
| Guest service fee (4% of booking) | ₹2.31 L | Charges for verification value directly | Adds cost for stressed, price-aware families |
| Hybrid (10% commission + ₹1,000 verified-listing fee/mo) | ₹6.98 L | Revenue from both sides; funds verification | Most complex to explain in a pilot |

**Recommendation:** run the pilot **commission-only at 12%**, so hosts pay nothing upfront and every rupee is tied to a real booking. Measure **leakage** (repeat or extended stays rebooked direct). If leakage is material, move to the **hybrid**, which earns about the same at pilot volume and charges hosts for the verification itself.

---

## 5. Pilot economics (projections)

| | Conservative | Base | Optimistic |
|---|---|---|---|
| Properties / rooms | 8 / 28 | 10 / 40 | 14 / 56 |
| Bookings a year | 256 | 438 | 639 |
| Value per booking | ₹6,400 | ₹13,200 | ₹22,400 |
| **Gross booking value** | ₹16.35 L | ₹57.82 L | ₹143.08 L |
| **Platform revenue** (12%) | ₹1.96 L | ₹6.94 L | ₹17.17 L |
| Contribution per booking | ₹-110 | ₹770 | ₹1,840 |
| **Contribution** (after CAC, payments, support) | ₹-0.28 L | ₹3.37 L | ₹11.75 L |
| **Contribution margin** (of revenue) | -14% | 49% | 68% |
| Fixed costs (incl. verification) | ₹4.96 L | ₹5.06 L | ₹5.26 L |
| **Year-one operating result** | ₹-5.24 L | ₹-1.69 L | ₹6.49 L |
| **Break-even bookings** / yr (/ month) | not reachable | 657 (55) | 286 (24) |
| **Break-even partner properties** | not reachable | 16 | 6 |
| Max CAC for positive contribution | ₹490 | ₹1,170 | ₹2,090 |

**Formulas:** contribution per booking = value per booking × (commission − payment fee) − support − CAC. Break-even bookings = fixed costs ÷ contribution per booking. Break-even properties = annual fixed costs ÷ (contribution per property − verification cost).

### Sensitivities (base case)

| Change | Contribution / booking | Break-even bookings / yr |
|---|---|---|
| Base (12% commission, ₹400 CAC, ₹38k/mo) | ₹770 | 657 |
| Commission 15% | ₹1,166 | 434 (projected: 438) |
| Commission 10% | ₹506 | 1000 |
| CAC ₹200 | ₹970 | 522 |
| Founder paid ₹50k/month | ₹770 | 1436 |

**What the numbers suggest (Analysis):**
1. **Short, cheap stays don't work.** In the conservative case (4 nights at ₹1,600), commission per booking is below the cost of acquiring the booking, so each booking loses ₹110. The model only works for **multi-night stays**, the same caregiver segment Episode 02 identified.
2. **Commission and CAC matter more than partner count.** Moving from 12% to 15% roughly closes the base-case gap. Paying the founder a salary triples the break-even volume.
3. **The base pilot falls about ₹1.7 lakh short in year one.** That's a modest, knowable cost to validate demand, but only if founder time stays unpaid.

---

## 6. Conclusion

**Does The Veedu deserve a pilot? Yes, a small, founder-led one.** The base case doesn't break even, the conservative case loses money per booking, and the optimistic case is profitable. The spread is driven by assumptions a 3–6 month pilot can measure cheaply.

**Validate first, in this order:**
1. **Demand:** how many out-of-town families of admitted patients need a paid room (hospital-desk conversations, caregiver interviews, enquiry counts).
2. **CAC:** what it costs to reach them through hospital coordinators versus search. It must stay under about ₹1,170 per booking in the base case for each booking to make money (about ₹490 in the conservative case).
3. **Leakage:** whether families book through The Veedu, and rebook through it, instead of going direct.

---

## 7. Video package (about 2 minutes)

### 7a. Voiceover script
1. **Method**: Kerala's tourist numbers can't tell me how many families need a room near a hospital. So I started with something I could count: hospital beds.
2. **Beds → bed-days**: Amrita Kochi lists about fourteen hundred and fifty beds. Aster Medcity, seven hundred inpatient beds. At Aster's reported Kerala occupancy, that's roughly half a million patient bed-days a year. Everything after that is an assumption.
3. **TAM · SAM · SOM**: In the base case: about seventy thousand room-nights, or sixteen crore rupees a year around these two hospitals. Around half is self-arranged, mid-priced stays a platform could serve — about eight crore. A ten-property pilot might reach seven percent of that.
4. **Uncertainty**: These are projections, not data. The two inputs that matter most — how many families live too far to commute, and how many need a paid room — have no public source. Shift them, and the market ranges from five crore to thirty-five.
5. **Revenue models**: I compared five revenue models. Commission earns the most at pilot scale — but a family staying three weeks can easily rebook direct. A hybrid, with a lower commission plus a verified-listing fee, earns about the same.
6. **Pilot dashboard**: The base pilot: ten properties, forty rooms, and eighteen percent of nights booked through The Veedu. That projects about fifty-eight lakh in bookings, and seven lakh in platform revenue.
7. **Break-even**: With lean fixed costs and unpaid founder time, break-even needs around fifty-five bookings a month, or sixteen properties. The base case falls short.
8. **Scenarios**: The conservative case loses money on every booking. The optimistic case breaks even with six properties. And at a fifteen percent commission, the base case roughly breaks even.
9. **Conclusion**: So, does The Veedu deserve a pilot? Yes — a small, founder-led one. The numbers aren't proven, but they're close enough to test cheaply. First, validate three things: how many out-of-town families need a paid room, what it costs to reach them through hospital desks, and whether they'll book through The Veedu instead of going direct.

Narration rules: every money figure is introduced as a base-case projection (scene 3 opens with "In the base case", and scene 4 says "These are projections, not data"). "Fact" tags appear only on the bed counts and occupancy.

### 7b. Storyboard and visuals

| # | Visual | Colour logic |
|---|---|---|
| 1 | "Kerala tourist visits" struck through, then "≠ medical-stay demand", then **hospital beds** | Cyan headline |
| 2 | **Bottom-up animation:** 1,450 + 700 beds (Fact tags) × ~65% occupancy (Fact, used as proxy) = ~510,000 bed-days (count-up); then a "From here on: assumptions" tag | Cyan facts; lime tag |
| 3 | **Nested TAM/SAM/SOM circles** (₹15.7 cr ⊃ ₹7.9 cr ⊃ ₹58 L) beside the calculation chain; assumption values in lime | Cyan market figures, lime assumptions |
| 4 | Two key-assumption cards (25–45%, 30–50%) + **scenario bars** for TAM (₹5.3 / 15.7 / 34.6 cr) | Lime assumptions, violet scenarios |
| 5 | **Revenue model comparison:** five horizontal bars; commission and hybrid in cyan, others grey; a "Leakage risk" note | Cyan, violet tag |
| 6 | **Pilot dashboard:** 6 input tiles (assumptions in lime) and 4 output tiles (bookings 438, GBV ₹57.8 L, revenue ₹6.94 L, contribution ₹3.37 L); a "Projected" tag | Lime inputs, cyan revenue |
| 7 | **Break-even chart:** the contribution line rises to meet the fixed-cost line at 657 bookings; the projected 438 is marked in violet with a shaded gap; side cards | Cyan line, violet projection |
| 8 | **Scenario comparison table:** 3 columns × 6 rows; positive outcomes in green; sensitivity chip (15% commission) in green | Violet headers, green viable outcomes |
| 9 | Conclusion: "**Yes**: small and founder-led." (green) + three "Validate first" cards | Green verdict, lime validations |
| End | Wordmark card | |

### 7c. AI B-roll prompts (optional, to cut between data scenes)
Shared suffix: *cinematic 16:9, 24fps, low-key lighting, deep blue-black shadows (#08090C), subtle cyan rim light, restrained grade, film grain, no text, no logos, no identifiable faces.*
- **Scene 1:** wide dusk exterior of a large modern hospital campus in Kochi seen from across a road, lit windows, traffic light trails, slow push-in. + suffix
- **Scene 6:** a small, tidy homestay room at night (bed, side table, window with city lights), warm lamp, static shot. + suffix
- **Scene 9:** first light over Kochi backwaters, slow rise. + suffix

Negative prompt: text, numbers, charts, logos, hospital signage, faces, patients, medical procedures.

### 7d. Sound design and transitions
- Music: the same synthesised ambient bed as Episodes 01–02, ducked about 5 dB under the voice. A low sustained tone sits under scene 4 (uncertainty). The music drops to near-silence for about 1 s after "The base case falls short."
- Soft ticks on each tile, bar and row reveal; airy whooshes on the bed-days result, the circle reveal, the chart line draw and the "Validate first" turn.
- Transitions: 0.4 s cross-fades between scenes. Within scenes, elements rise 22 px with an ease-out and count-ups ease in and out. The fifth-to-sixth scene move keeps the same panel grid so the eye stays anchored.

---

## 8. Sources

| ID | Source | URL |
|---|---|---|
| S1 | Amrita Hospital Kochi: 1,450-bed hospital (Amrita outreach page) | https://www.amrita.edu/admissions/health-sciences/outreach |
| S2 | Wikipedia: Amrita Hospital, Kochi (1,450 beds) | https://en.wikipedia.org/wiki/Amrita_Hospital,_Kochi |
| S3 | Aster DM Healthcare: Aster Medcity (800 beds; 700 inpatient + 100 daycare) | https://asterdmhealthcare.in/about-us/our-services/astermedcity |
| S4 | Aster DM Healthcare investor presentations (Kerala occupancy 64% Q1 FY26, 69% Q2 FY26; group ALOS 3.1 days) | https://www.asterdmhealthcare.in/fileadmin/Investorspresentation06112025.pdf · https://www.asterdmhealthcare.in/fileadmin/Q1_FY26_Investor_PPT.pdf |
| S5 | Business Today, reporting ICRA (hospital ALOS ~3.6 days, occupancy ~65% FY23) | https://www.businesstoday.in/amp/industry/top-story/story/revival-of-medical-tourism-boosts-indias-hospital-industry-icra-394509-2023-08-17 |
| S6 | Episode 02 research (listing price anchors, review findings, guest-house and bystander rules) | `../episode-02/EPISODE-02-RESEARCH-AND-PRODUCTION.md` |
| S7 | Episode 01 (official tourism and medical-arrival data; why tourist visits ≠ demand) | `../episode-01/EPISODE-01-PRODUCTION-PACKAGE.md` |

**Verification note:** as in Episode 02, figures were taken from search extracts of these pages, because direct page access was blocked in this environment. Bed counts vary by source (Aster Medcity is listed at 670 beds on older pages; its own site gives 800 including daycare). Check both before publishing.
