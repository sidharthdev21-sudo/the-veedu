# The Veedu, Episode 04: "From Research to Product"

**Product strategy and MVP prioritisation · video package**
Evidence base: Episode 01 (official data, problem framing), Episode 02 (12 providers, 25 review excerpts, perceptual map, segments), Episode 03 (bottom-up market sizing, pilot economics). No new market data is introduced here; this stage turns that evidence into product decisions.

> **Labels.** **Evidence** = from earlier episodes (sources there). **Decision** = my product call. **Estimate** = a judgement used for scoring. Nothing proposed here is launched. The existing prototype (`index.html`) is referenced only for what it does in code today.

---

## 1. The strongest insight (Evidence)

For families staying near a hospital, **distance is why they choose a stay, and it's the fact listings state least consistently** (Ep02 §4b: the same guest house is called "near", "~12 minutes' walk" and "a little away"; location is its lowest Booking.com sub-score). **Total price** is the second weak fact (Ep02: an extra-person fee excluded from the headline rate, extra charges raised at checkout).

**Prototype check:** the prototype ranks stays by **straight-line (haversine) distance** from the map pin to each hospital (`index.html`, the `haversineKm` calls in the hospital-distance and ranking logic). Straight-line distance understates real walking and driving routes, so the prototype currently has the same weakness the research found in the market. This is the first thing to change.

---

## 2. Framework use: what each one decided (and where it couldn't)

| Framework | Applied? | What it decided | Limitation |
|---|---|---|---|
| **SWOT** | Yes | The trade-off: real operating experience and a working prototype vs no demand data and no bookings. Strengths only matter if they're aimed at the weak facts (distance, price). | Strengths are self-assessed |
| **GE–McKinsey** | Yes, qualitatively | **Segment choice.** Caregivers of admitted patients = *invest selectively*. International patients = attractive, but the hospitals' international desks own the relationship. Short-visit patients = low differentiation. | No measured attractiveness or strength scores; placement is judgement from Ep02–03 |
| **BCG** | **No** | — | A single, unlaunched product with no market-share or growth data. Plotting it would be decoration, not analysis |
| **Ansoff** | Yes | **Growth sequence.** Penetration in the Amrita + Aster Medcity cluster only during the pilot. Product development (outpatient long-stay) and market development (other Kochi hospitals, then other cities) come later. Diversification isn't considered. | — |
| **Blue Ocean / ERRC** | Yes | **Differentiation hypothesis** (below), using the Ep02 perceptual map as the strategy canvas. | A hypothesis until caregivers confirm the factors they value |

### SWOT

| Strengths | Weaknesses |
|---|---|
| Hands-on rental-operations experience · UX background · working prototype (hospital search, distance to every hospital, attendant-bed / lift / kitchen tags, WhatsApp enquiry, host dashboard, calendar sync) | No demand data or bookings · solo founder · in-person verification doesn't scale · prototype distances are straight-line |
| **Opportunities** | **Threats** |
| Inconsistent distance and price information across listings (Ep02) · the hospital room fits one bystander, so other relatives need beds nearby (Ep02) · a base-case SAM of ~₹7.9 cr (Ep03, projected) | OTAs already publish "hotels near Amrita/Aster" pages · patient-positioned properties market directly · leakage on long stays (Ep03) · hospitals could expand guest houses |

### ERRC (differentiation hypothesis)

| Eliminate | Reduce |
|---|---|
| Leisure-style content, discount-led selling | The race for listing volume: fewer, verified stays around one cluster |
| **Raise** | **Create** |
| Distance accuracy (measured walk and drive to the entrance) · all-in pricing for the whole family | Verified facts **with the date they were checked**. Not offered by any listing in the Ep02 sample |

**Strategic risks** carried forward: (1) caregivers may value speed or price over verified facts; (2) verification cost per property may exceed what commission recovers; (3) leakage; (4) an OTA or hospital could add measured distances cheaply.

---

## 3. Product strategy (Decisions)

| | |
|---|---|
| **Primary customer** | An out-of-town family caring for a patient admitted at **Amrita Hospital Kochi or Aster Medcity**: more relatives than the room allows, staying days to weeks |
| **Core problem** | Not finding a room, but **trusting the facts behind it**: real distance, total cost for everyone, long-stay fit |
| **Positioning** | For families staying near a Kochi hospital, The Veedu is the stay-finder that **verifies what caregivers decide on**, unlike listings that only say "near the hospital" |
| **Value proposition** | *Know how far, how much, and for how long, before you call.* |
| **Business model** | Commission on **host-confirmed** stays (12% in the pilot, charged to the host; no guest fee). Move to the hybrid (10% + verified-listing fee) if leakage is material (Ep03) |
| **Initial geography** | The Edappally–Cheranalloor corridor: Amrita + Aster Medcity |

**Two prototype items conflict with this strategy and should change before any pilot:**
1. The homepage says "Verified & ready" and "Verified homes…", but no verification process exists yet. **Don't make this claim publicly until a verification visit and checked date stand behind each listing.**
2. The enquiry flow says "no booking fees". That's still true for guests, but hosts must agree to the commission on confirmed stays *before* listing, or the business model has no way to collect.

---

## 4. MVP prioritisation

### RICE (estimates)

Reach = families expected to use the feature per pilot quarter. Impact = 0.25–3. Confidence = strength of evidence from Ep01–03. Effort = person-weeks, **counting what already exists in the prototype**.

| Feature | Reach | Impact | Confidence | Effort | RICE | Note |
|---|---|---|---|---|---|---|
| Tracked WhatsApp enquiry | 400 | 1 | 90% | 0.5 | **720** | WhatsApp enquiry + event logging exist; add host confirmation |
| Hospital-based discovery | 400 | 2 | 80% | 1 | **640** | Exists; switch ranking to verified distance |
| Verified distance & location | 400 | 3 | 80% | 2 | **480** | Core insight (Ep02) |
| Clear all-in pricing | 400 | 2 | 80% | 1.5 | **427** | Extra-person fee complaints (Ep02) |
| Verified accommodation details | 400 | 3 | 60% | 3 | **240** | The "create" in ERRC; needs a field process |
| Long-stay filters | 200 | 2 | 50% | 1 | 200 | Monthly note and kitchen tag exist; filter doesn't |
| Family-friendly information | 250 | 1 | 50% | 1 | 125 | "Sleeps" and attendant-bed tag exist |
| Trust & safety information | 400 | 1 | 30% | 2 | 60 | Safety never raised in the 25-excerpt sample |
| Online booking & payment | 400 | 1 | 40% | 6 | 27 | Highest effort; behaviour change unproven |

### MoSCoW (the decision)

| Must (MVP) | Should (next) | Could (after interviews) | Won't (for now) |
|---|---|---|---|
| Hospital-based discovery · **Verified distance to the entrance** · **All-in pricing for the family** · Verified details, dated · Tracked WhatsApp enquiry | Long-stay filters · Family-friendly information | Trust & safety information | Online booking & payment |

**Why included:** the five Musts are the smallest set that (a) answers the strongest insight (distance, price), (b) makes the differentiation real (dated verification) and (c) makes the business model work (tracked enquiry, so confirmed stays can be billed).
**Why excluded:** long-stay and family filters are useful but secondary to trusting the core facts; their data partly exists already. Trust and safety has no evidence behind it yet, so ask caregivers first. Online booking and payment is the most expensive item with the least evidence, and it also gives The Veedu the most to lose if leakage happens anyway.

---

## 5. Product architecture (MVP)

```
[To build]  Verification visit ──► Facts record (walk/drive time to entrance, all-in price, stay terms, checked date)
                                          │
[Prototype] Hospital search & listings ◄──┘  (rank by verified distance instead of straight-line)
                                          │
[Prototype] WhatsApp enquiry (logged) ────► [To build] Host-confirmed stay ──► 12% commission invoice
[Prototype] Host dashboard (properties, availability, Airbnb calendar sync)
```

**What to build first:** the **verification layer**. That means a field checklist and facts record (measured walking and driving time to the hospital's main entrance, an all-in nightly price for a stated family size, stay terms, and the date checked in person), shown on every listing and used for ranking. It's the narrowest product that answers the strongest insight and the cheapest way to learn whether families trust it.

---

## 6. Video package (about 2 minutes)

### 6a. Voiceover (first person)
1. **Insight:** For families near a hospital, distance is why they choose a stay, and it's the fact listings state least consistently. Even my own prototype shows straight-line distance. That's where the strategy starts.
2. **Opportunity:** SWOT made the trade-off clear: rental experience and a working prototype, but no demand data and no bookings. On a GE–McKinsey grid, caregivers of admitted patients were the segment to invest in selectively. BCG didn't apply: there's no market-share data to plot.
3. **Differentiation:** ERRC defined the difference. Eliminate leisure content and discounts. Reduce the race for listing volume. Raise distance accuracy and all-in pricing. And create verified facts, with the date they were checked.
4. **Positioning:** On the research map, that's medical-stay focus with high information assurance. And Ansoff keeps growth disciplined: win one hospital cluster first.
5. **Customer:** The primary customer is an out-of-town family caring for a patient admitted at Amrita or Aster Medcity. Their problem isn't finding a room; it's trusting the facts behind it. So the promise is: know how far, how much, and for how long, before you call.
6. **RICE:** I scored nine features with RICE. Hospital search and WhatsApp already exist in the prototype, so they score high for little effort. Verified distance and clear pricing carry the most impact.
7. **MVP:** The MVP is hospital-based discovery, verified distance, all-in pricing, verified details, and tracked WhatsApp enquiries. Long-stay and family filters come next. Online booking and payments wait: costly to build, with little evidence they'd help.
8. **Architecture:** Underneath, a verification visit creates a facts record, every listing reads from it, and tracked enquiries make confirmed stays billable.
9. **Build first:** So what should The Veedu build first? A verification layer, not more listings. Measured distance to the hospital entrance, an all-in family price, and the date it was checked. It's the narrowest product that answers the strongest insight, and the cheapest way to learn whether families will trust it.

### 6b. Storyboard and on-screen text

| # | Visual | On-screen text | Colour |
|---|---|---|---|
| 1 | Insight headline; two comparison cards | "Distance is why families choose a stay, and the least consistent fact in listings." · *My prototype today: straight-line distance* vs *What families need: measured walk & drive to the entrance, checked in person* | Cyan |
| 2 | **Animated SWOT** (2×2) + **GE–McKinsey 3×3** with four segment dots; BCG "not applied" chip | Segment A "invest selectively"; C "hospitals own this relationship" | Cyan / violet |
| 3 | **ERRC grid**, quadrants reveal on cue | Eliminate · Reduce · Raise · Create; tag "Hypothesis · to be tested with caregivers" | Violet / cyan |
| 4 | **Positioning map** (from Ep02) with a dashed target ring; **Ansoff** 2×2, penetration lit | "The Veedu · target: a position to earn, not held" | Violet dots, cyan target |
| 5 | Strategy card: six rows | Customer · Problem · Positioning · Value proposition · Business model · Geography | Cyan emphasis |
| 6 | **RICE interface**: nine rows, score bars; "in prototype" and "highest impact" tags | Column headers + scores | Cyan bars |
| 7 | **MoSCoW columns**; **MVP feature cards** in the Must column | Must · Should · Could · Won't | **Lime** = the final MVP decision |
| 8 | **Product architecture**: six nodes, "In prototype" vs "To build" tags; footnote "none of this is launched or validated" | Node labels | Lime for "to build" |
| 9 | "Build first" + three lime cards; **concept wireframe** with bracketed placeholders ([measured] min, ₹[total], [date]), labelled "Concept wireframe · not a live product" | "A verification layer, not more listings." | **Lime** |

**No fake screenshots:** the only UI shown is a dashed-outline concept wireframe with placeholder values, explicitly labelled.

### 6c. AI B-roll prompts (optional)
Shared suffix: *cinematic 16:9, 24fps, low-key lighting, deep blue-black shadows (#08090C), subtle cyan rim light, film grain, no text, no logos, no UI, no identifiable faces.*
- **Scene 1:** a person measuring a walk at dusk, seen from behind, along a pavement toward the distant lit entrance of a large hospital, a phone timer glow in hand. Handheld. + suffix
- **Scene 7:** overhead shot of index cards being sorted into four columns on a dark desk, hands only, warm lamp. + suffix
- **Scene 9:** close-up of a notebook checklist being ticked beside house keys on a doorstep at first light. + suffix

### 6d. Sound and transitions
- The same ambient bed as Episodes 01–03, ducked under the voice. A brief near-silence after "straight-line distance". A low tone under the SWOT and limitation scene.
- Ticks on quadrant, row and card reveals; whooshes on scene changes into ERRC, RICE and Build first.
- 0.4 s cross-fades between scenes. The positioning map reuses Ep02's layout so viewers recognise it. The RICE-to-MoSCoW transition keeps feature names identical so the eye can follow them into columns.
