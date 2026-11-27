"""Generate Episode 04 voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.1, "en-us"
PAUSE = 0.4  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "For families near a hospital, distance is why they choose a stay — and it's the fact listings state least consistently. // Even my own prototype shows straight-line distance. That's where the strategy starts.",
    "SWOT made the trade-off clear: rental experience and a working prototype, but no demand data and no bookings. On a GE–McKinsey grid, caregivers of admitted patients were the segment to invest in selectively. // BCG didn't apply — there's no market-share data to plot.",
    "ERRC defined the difference. Eliminate leisure content and discounts. Reduce the race for listing volume. Raise distance accuracy and all-in pricing. And create verified facts, with the date they were checked.",
    "On the research map, that's medical-stay focus with high information assurance. And Ansoff keeps growth disciplined: win one hospital cluster first.",
    "The primary customer: an out-of-town family caring for a patient admitted at Amreeta or Aster Med-city. Their problem isn't finding a room — it's trusting the facts behind it. // So the promise is: know how far, how much, and for how long, before you call.",
    "I scored nine features with RICE. Hospital search and WhatsApp already exist in the prototype, so they score high for little effort. Verified distance and clear pricing carry the most impact.",
    "The MVP: hospital-based discovery, verified distance, all-in pricing, verified details, and tracked WhatsApp enquiries. Long-stay and family filters come next. // Online booking and payments wait — costly to build, with little evidence they'd help.",
    "Underneath, a verification visit creates a facts record, every listing reads from it, and tracked enquiries make confirmed stays billable.",
    "So what should The Veedu build first? A verification layer, not more listings. Measured distance to the hospital entrance, an all-in family price, and the date it was checked. // It's the narrowest product that answers the strongest insight — and the cheapest way to learn whether families will trust it.",
]

def sentences(text):
    """Split into (sentence, pause_before) chunks; '//' adds a longer pause."""
    import re
    out = []
    for j, block in enumerate(text.split("//")):
        parts = [x for x in re.split(r"(?<=[.?!:])\s+", block.strip()) if x]
        for n, sent in enumerate(parts):
            out.append((sent, PAUSE if (j and n == 0) else (0.08 if out else 0.0)))
    return out

def main(model, voices, out):
    k = Kokoro(model, voices)
    info = []
    for i, text in enumerate(SCENES, 1):
        parts, marks, sr, pos = [], [], 24000, 0.0
        for sent, gap in sentences(text):
            audio, sr = k.create(sent, voice=VOICE, speed=SPEED, lang=LANG)
            if gap:
                parts.append(np.zeros(int(gap * sr), dtype=np.float32)); pos += gap
            marks.append({"at": round(pos, 2), "text": sent})
            parts.append(audio.astype(np.float32)); pos += len(audio) / sr
        a = np.concatenate(parts)
        sf.write(f"{out}/vo_{i}.wav", a, sr)
        info.append({"scene": i, "dur": round(len(a) / sr, 3), "marks": marks})
        print(i, info[-1]["dur"], [(m["at"], m["text"][:28]) for m in marks])
    json.dump(info, open(f"{out}/vo.json", "w"), indent=1)

if __name__ == "__main__":
    main(*sys.argv[1:4])
