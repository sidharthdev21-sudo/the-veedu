# The Veedu: Validation Roadmap

### From a product hypothesis to a realistic Kochi pilot

> **Status: proposed, not yet run.** Nothing below is a finding. No interviews, usability tests, enquiries or bookings have taken place. The only first-hand evidence in this document is a check of the live website on **28 Nov 2026** (§2). Every other number is a plan or a proposed threshold.

Video: `the-veedu-episode-05.mp4` (3:12) · Pilot kit: `pilot-kit/` (research guides and tracking sheets) · Builds on Episodes 01–04 and the final case-study film.

---

## 1. A focused pilot area

| | |
|---|---|
| **Pilot 1** | **Aster Medcity, Cheranalloor / South Chittoor.** Its international patient services already list accommodation assistance (Aster DM Healthcare, International Patients). The Veedu therefore has to add value beyond listing nearby rooms, for example verified distance, host-confirmed readiness and an all-in price. |
| **Cluster 2 (later)** | **Amrita Hospital, Ponekkara, Edappally.** Evaluate only after Pilot 1 has reached its end-of-week-4 decision. |
| **Status** | Both are **proposed locations**, chosen for relevance. They are not evidence of demand. |

*Change from Episode 04:* the strategy treated Amrita + Aster as one cluster. This roadmap narrows the first pilot to Aster alone so that supply, outreach and measurement stay manageable.

---

## 2. Pre-flight: what the live prototype can test today (observed 28 Nov 2026)

I opened https://sidharthdev21-sudo.github.io/the-veedu/ and recorded it (the recording appears in the video at 0:57–1:15 and is saved in `build/footage/`).

| Observation | Implication for the roadmap |
|---|---|
| The public `properties` query returned **0 rows**; every search shows "0 stays" | Week 2 usability tasks can't be completed until real listings exist. **Onboard 3–5 host-confirmed properties in Week 1.** |
| The "Near" picker is fed by a `hospitals` table holding **12 areas** (Aluva, Cochin Airport, Edappally, Fort Kochi, Kakkanad, Kalamassery, Kaloor, Marine Drive, MG Road, Panampilly Nagar, Thripunithura, Vyttila) and **no hospitals** | Task A ("near Aster Medcity") isn't possible yet. **Add Aster Medcity as a search point** (and Amrita later). |
| Homepage copy: "Verified & ready: every home is checked before it's listed" | No verification process exists yet. Either make it true for pilot listings (§5) or soften the copy before testing. Week 2 also tests what users think "verified" means. |
| Distances are calculated as **straight-line** distance from the map pin (code, Episode 04) | Record **measured** walking and driving time in the verification sheet. Week 2 checks whether people read the displayed distance correctly. |
| My automated visits wrote a few rows to the `analytics_events` table before I blocked those calls | Exclude events from 28 Nov 2026 (about 05:50–06:40 UTC, headless Chromium) when analysing pilot analytics. |

---

## 3. Hypotheses to test (none proven)

| ID | Hypothesis | Tested in |
|---|---|---|
| **H1 · Discovery** | Families travelling for treatment find it hard to compare stays by hospital distance, family needs, stay length and availability. | Week 1 interviews · Week 2 Tasks A–B |
| **H2 · Trust & information** | Families need clearer information on readiness, amenities, accessibility, location and host reliability before contacting a property. | Week 1 · Week 2 Tasks C–D |
| **H3 · Long-stay suitability** | Some medical travellers prefer a home or serviced apartment to a hotel for stays of several days or weeks with family. | Week 1 interviews (question 9) |
| **H4 · Host willingness** | Local hosts will keep availability and details accurate in exchange for relevant enquiries. | Week 1 host interviews · Weeks 3–4 verification and response tracking |
| **H5 · Product usefulness** | Hospital-based search, property details and direct host contact reduce the effort of shortlisting. | Week 2 · Weeks 3–4 |

---

## 4. Phase one: understand the real journey (Week 1)

- **Sample:**
  - 8–12 people who recently arranged, or are now arranging, a stay for a family member's treatment in Kochi
  - 5–8 local hosts or serviced-apartment operators
  - a spread of stay lengths, party sizes and travel origins
- **Recruitment:** personal networks, hosts, local community contacts and voluntary referrals. **No hospital access or partnership is implied** unless permission has been obtained.
- **Method:** 20–30 minute interviews about **past behaviour** (guides in `pilot-kit/research-guides.md`). Hosts are asked about listing effort, enquiry quality, availability, cancellations and direct enquiries.
- **Pre-flight work this week:** add Aster Medcity as a search point, and publish 3–5 host-confirmed properties.
- **Output:** a synthesis board (themes → H1–H4 with supports / contradicts / unclear). Placeholders stay empty until interviews exist. **No invented quotes or personas.**

## 5. Phase two: test the actual website (Week 2)

- **Participants:** 6–8 people resembling the intended users. Recent caregivers come first; anyone else is **labelled a proxy**.
- **Tasks** on the live site:
  - **A:** five nights near Aster Medcity with two family members
  - **B:** compare two properties and shortlist one
  - **C:** check readiness and how to contact the host
  - **D:** say what information is still missing
- **Measures:**
  - relevant property found
  - time to shortlist
  - hospital distance understood correctly
  - meaning of "verified" in the participant's own words
  - missing information
  - confidence to contact the host (1–5)
- **Rule:** observe without guiding. **A click isn't booking intent.** No real enquiries are sent during sessions.
- **Sheet:** `pilot-kit/usability-observation-sheet.csv`

## 6. Phase three: concierge pilot (Weeks 3–4)

The prototype doesn't support a complete booking workflow, and this phase doesn't pretend it does. It's a **concierge MVP**: the user sees a simple website, while verification and follow-up are done by hand.

1. Identify 10–15 properties within a defined radius of Aster Medcity.
2. Contact each host and confirm current details: occupancy readiness, amenities, capacity, price including extra guests, and availability.
3. **Measure** walking and driving time to the hospital entrance, and record the date checked.
4. **Publish only checked properties.**
5. Route genuine enquiries to hosts through the **existing WhatsApp contact flow**.
6. Track host response, and whether the traveller got useful information (`pilot-kit/enquiry-tracker.csv`).

**A booking is only recorded as completed if it actually happened and the participant has consented to the outcome being used.**

## 7. Success criteria, defined before running (proposed, not results)

| Metric | Proposed signal |
|---|---|
| Task completion | At least 5 of 8 usability participants shortlist a suitable property without help |
| Search usefulness | Participants can explain why the shortlisted property fits their stated needs |
| Information clarity | Participants understand property readiness, hospital distance and host contact details |
| Host participation | At least 10 properties have accurate, host-confirmed listing information |
| Enquiry quality | Hosts report that enquiries contain enough information to respond usefully |
| Host response | Track the share of genuine enquiries answered within 24 hours (baseline, no target yet) |
| User confidence | Participants say whether the site reduced uncertainty compared with their previous search |

These are **small-sample, directional signals**. They are not statistically representative and are not market validation.

## 8. Decision after validation (end of Week 4)

| If… | Then prioritise… |
|---|---|
| Users find suitable properties but **don't trust** the information | Verification standards, photos, amenities, host-response information, transparent listing details |
| Users **struggle to find** suitable properties | Hospital-based search, filters, distance display, property comparison |
| Hosts receive enquiries but **don't respond** | Host onboarding, response expectations, enquiry quality, availability upkeep |
| Users **prefer hospital-provided recommendations** | How The Veedu can complement hospital accommodation support rather than replace it |
| Users see **no meaningful value** over their current search | Revisit the core problem; narrow or change the proposition |

Every decision is written in `pilot-kit/decision-log.csv` with a link to the evidence behind it.

## 9. Reflection

> The next milestone for The Veedu is not scaling the platform. It is proving that a small group of families can find suitable accommodation with less uncertainty, and that local hosts can reliably fulfil those enquiries. Before expanding to more hospitals or automating the entire workflow, the product needs evidence from real users and real accommodation providers.

---

## Video: Episode 05 (3:12)

| # | Time | Scene | Visual | Artefact shown |
|---|---|---|---|---|
| 1 | 0:00 | Four-week roadmap | Timeline: Week 1 → Week 2 → Weeks 3–4 → end of Week 4 | Roadmap |
| 2 | 0:17 | Pilot area | Schematic corridor map: Aster (cyan, pilot 1), Amrita (violet dashed, later) | — |
| 3 | 0:31 | Hypotheses | H1–H5 cards, each tagged "Untested" | — |
| 4 | 0:57 | Pre-flight | **Real screen recording of the live site** in a browser frame + callouts (0 listings; picker lists areas, not hospitals; Aster not listed; Week 1 prep) | Live site |
| 5 | 1:15 | Week 1 | Sample cards, past-behaviour questions, **empty synthesis board** | Interview guide, synthesis board |
| 6 | 1:33 | Week 2 | **Usability observation sheet** (Tasks A–D, empty cells) + measures | Observation sheet |
| 7 | 1:49 | Weeks 3–4 | **Property verification sheet** + **enquiry tracker** (placeholders) | Verification sheet, enquiry tracker |
| 8 | 2:05 | Success criteria | Proposed-signal table (lime = key thresholds), "Proposed · not results" | Criteria |
| 9 | 2:20 | Decision tree | Five "if → then" branches | Decision tree |
| 10 | 2:44 | Reflection | Closing statement + **decision log** (empty) | Decision log |

Colour rules: cyan guides attention; violet marks hypotheses, caveats and "later"; lime marks key thresholds and the decision actions. **Success Green is unused, because nothing has succeeded yet.** AI imagery is optional and supporting only. Prompts that fit the series: *a person with a clipboard at the gate of a small Kerala homestay at first light, seen from behind*; *hands writing on blank sticky notes on a dark wall, warm lamp*. Always add the series negatives: no faces, no hospital signage, no medical imagery.
