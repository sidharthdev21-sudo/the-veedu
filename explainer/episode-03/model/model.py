"""The Veedu, Episode 03: bottom-up market sizing and pilot economics (INR).

Every input is tagged FACT (sourced) or ASSUMPTION. Run:  python3 model.py  -> prints tables, writes model.json
"""
import json, os

# ---------------- FACTS (sourced; see EPISODE-03 write-up) ----------------
BEDS_AMRITA = 1450        # FACT: Amrita Hospital Kochi, 1,450 beds (Amrita outreach page; Wikipedia)
BEDS_ASTER_IP = 700       # FACT: Aster Medcity, 800 beds = 700 inpatient + 100 daycare (Aster website)
# Aster Kerala cluster occupancy 64% (Q1 FY26) and 69% (Q2 FY26), FACT, Aster investor presentation Nov 2025.
# Amrita occupancy is not published, so the same range is applied as a proxy (ASSUMPTION).

SCEN = ["Conservative", "Base", "Optimistic"]
A = {  # ASSUMPTIONS by scenario
    "occupancy":        [0.60, 0.65, 0.70],   # proxy, bracketing Aster Kerala 64-69%
    "out_of_town":      [0.25, 0.35, 0.45],   # share of inpatient bed-days whose family lives beyond daily-commute distance
    "paid_stay":        [0.30, 0.40, 0.50],   # of those, share needing a paid room (not in-room bystander, relatives or campus guest house)
    "adr_market":       [1500, 2200, 2800],   # avg nightly rate, anchored to Ep02 listings (~₹900 OYO … ₹4,151 Casa Allay)
    "sam_share":        [0.40, 0.50, 0.60],   # self-arranged, budget-to-mid stays a curated platform could list
    # pilot (SOM)
    "properties":       [8, 10, 14],
    "rooms_per_prop":   [3.5, 4, 4],
    "platform_occ":     [0.10, 0.18, 0.25],   # share of partner room-nights sold through The Veedu
    "adr_pilot":        [1600, 2200, 2800],
    "nights_per_booking": [4, 6, 8],
    "commission":       [0.12, 0.12, 0.12],
    "cac":              [600, 400, 250],      # ₹ per booking (hospital-desk referrals + search ads), unvalidated
    "payment_fee":      [0.02, 0.02, 0.02],   # of GBV
    "support_per_booking": [150, 150, 150],
    "verify_per_property": [5000, 5000, 5000],  # site visit, photos, measured walking distance, annual re-check
    "fixed_monthly":    [38000, 38000, 38000],  # part-time ops/support ₹25k + tools/hosting ₹8k + outreach ₹5k; founder time unpaid
}

def cr(x): return x / 1e7
def lakh(x): return x / 1e5

out = []
for i, name in enumerate(SCEN):
    g = {k: v[i] for k, v in A.items()}
    bed_days = (BEDS_AMRITA + BEDS_ASTER_IP) * g["occupancy"] * 365
    tam_rn = bed_days * g["out_of_town"] * g["paid_stay"]
    tam = tam_rn * g["adr_market"]
    sam_rn = tam_rn * g["sam_share"]
    sam = sam_rn * g["adr_market"]

    rooms = g["properties"] * g["rooms_per_prop"]
    som_rn = rooms * 365 * g["platform_occ"]
    gbv = som_rn * g["adr_pilot"]
    bookings = som_rn / g["nights_per_booking"]
    value_per_booking = g["adr_pilot"] * g["nights_per_booking"]
    rev_per_booking = value_per_booking * g["commission"]
    var_per_booking = value_per_booking * g["payment_fee"] + g["support_per_booking"] + g["cac"]
    contrib_per_booking = rev_per_booking - var_per_booking
    revenue = bookings * rev_per_booking
    contribution = bookings * contrib_per_booking
    fixed = g["fixed_monthly"] * 12 + g["properties"] * g["verify_per_property"]
    operating_result = contribution - fixed
    be_bookings = fixed / contrib_per_booking if contrib_per_booking > 0 else None
    per_prop_contrib = (bookings / g["properties"]) * contrib_per_booking - g["verify_per_property"]
    be_props = (g["fixed_monthly"] * 12) / per_prop_contrib if per_prop_contrib > 0 else None
    max_cac = rev_per_booking - value_per_booking * g["payment_fee"] - g["support_per_booking"]

    out.append({
        "scenario": name, "inputs": g,
        "bed_days": round(bed_days), "tam_room_nights": round(tam_rn), "tam_inr": round(tam),
        "sam_room_nights": round(sam_rn), "sam_inr": round(sam),
        "rooms": rooms, "som_room_nights": round(som_rn), "som_share_of_sam": round(som_rn / sam_rn, 3),
        "gbv": round(gbv), "bookings": round(bookings), "value_per_booking": round(value_per_booking),
        "rev_per_booking": round(rev_per_booking), "contrib_per_booking": round(contrib_per_booking),
        "platform_revenue": round(revenue), "contribution": round(contribution),
        "contribution_margin_on_revenue": round(contribution / revenue, 3),
        "fixed_costs": round(fixed), "operating_result": round(operating_result),
        "breakeven_bookings_year": round(be_bookings) if be_bookings else None,
        "breakeven_bookings_month": round(be_bookings / 12) if be_bookings else None,
        "breakeven_properties": round(be_props + 0.4999) if be_props else None,  # round up
        "max_cac_for_positive_contribution": round(max_cac),
    })

for r in out:
    print(f"\n== {r['scenario']} ==")
    print(f"  bed-days {r['bed_days']:,} | TAM {r['tam_room_nights']:,} RN = ₹{cr(r['tam_inr']):.1f} cr | SAM {r['sam_room_nights']:,} RN = ₹{cr(r['sam_inr']):.1f} cr")
    print(f"  pilot {r['inputs']['properties']} props/{r['rooms']:.0f} rooms | SOM {r['som_room_nights']:,} RN ({r['som_share_of_sam']:.1%} of SAM) | GBV ₹{lakh(r['gbv']):.1f} L | {r['bookings']} bookings")
    print(f"  revenue ₹{lakh(r['platform_revenue']):.2f} L | contrib/booking ₹{r['contrib_per_booking']} | contribution ₹{lakh(r['contribution']):.2f} L ({r['contribution_margin_on_revenue']:.0%} of revenue)")
    print(f"  fixed ₹{lakh(r['fixed_costs']):.2f} L | result ₹{lakh(r['operating_result']):.2f} L | BE bookings/yr {r['breakeven_bookings_year']} (/mo {r['breakeven_bookings_month']}) | BE props {r['breakeven_properties']} | max CAC ₹{r['max_cac_for_positive_contribution']}")

json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "model.json"), "w"), indent=1, ensure_ascii=False)

# ---------------- Revenue model comparison (base-case pilot volume) ----------------
b = out[1]; g = b["inputs"]
rev_models = [
    ("Booking commission (12%)", b["gbv"] * 0.12, "Paid only on results; familiar to hosts", "Leakage: multi-week guests may rebook direct"),
    ("Listing subscription (₹1,500/property/mo)", g["properties"] * 1500 * 12, "Predictable; no leakage", "Hard to sell before demand is proven"),
    ("Lead fee (₹250/qualified enquiry, ~2 per booking)", b["bookings"] * 2 * 250, "Fits WhatsApp/phone booking habits", "Low value per lead; disputes over 'qualified'"),
    ("Guest service fee (4% of booking)", b["gbv"] * 0.04, "Charges for verification value directly", "Adds cost for stressed, price-aware families"),
    ("Hybrid (10% commission + ₹1,000 verified-listing fee/mo)", b["gbv"] * 0.10 + g["properties"] * 1000 * 12, "Revenue from both sides; funds verification", "Most complex to explain in a pilot"),
]
print("\n== Revenue models at base-case pilot volume ==")
for n, v, pro, con in rev_models:
    print(f"  {n}: ₹{lakh(v):.2f} L/yr")

# ---------------- Sensitivities (base case) ----------------
def be_for(commission=0.12, fixed_monthly=38000, cac=400):
    vpb = b["value_per_booking"]
    c = vpb * commission - vpb * 0.02 - 150 - cac
    fixed = fixed_monthly * 12 + g["properties"] * 5000
    return round(c), round(fixed / c)
sens = {
    "commission_15": be_for(commission=0.15),
    "commission_10": be_for(commission=0.10),
    "founder_paid_50k": be_for(fixed_monthly=88000),
    "cac_200": be_for(cac=200),
}
print("\n== Sensitivities (base): (contribution/booking, break-even bookings/yr) ==")
for k, v in sens.items(): print(" ", k, v)

json.dump({"scenarios": out, "revenue_models": [{"model": n, "annual_inr": round(v), "pro": p, "con": c} for n, v, p, c in rev_models],
           "sensitivities_base": sens}, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "model.json"), "w"), indent=1, ensure_ascii=False)
