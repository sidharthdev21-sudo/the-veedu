"""Generate Episode 03 voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.06, "en-us"
PAUSE = 0.55  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "Kerala's tourist numbers can't tell me how many families need a room near a hospital. // So I started with something I could count: hospital beds.",
    "Amreeta Koachee lists about fourteen hundred and fifty beds. Aster Med-city, seven hundred inpatient beds. At Aster's reported Kerala occupancy, that's roughly half a million patient bed-days a year. // Everything after that is an assumption.",
    "In the base case: about seventy thousand room-nights, or sixteen crore rupees a year around these two hospitals. Around half is self-arranged, mid-priced stays a platform could serve — about eight crore. A ten-property pilot might reach seven percent of that.",
    "These are projections, not data. The two inputs that matter most — how many families live too far to commute, and how many need a paid room — have no public source. // Shift them, and the market ranges from five crore to thirty-five.",
    "I compared five revenue models. Commission earns the most at pilot scale — but a family staying three weeks can easily rebook direct. A hybrid, with a lower commission plus a verified-listing fee, earns about the same.",
    "The base pilot: ten properties, forty rooms, and eighteen percent of nights booked through The Veedu. That projects about fifty-eight lakh in bookings, and seven lakh in platform revenue.",
    "With lean fixed costs and unpaid founder time, break-even needs around fifty-five bookings a month, or sixteen properties. // The base case falls short.",
    "The conservative case loses money on every booking. The optimistic case breaks even with six properties. And at a fifteen percent commission, the base case roughly breaks even.",
    "So, does The Veedu deserve a pilot? Yes — a small, founder-led one. The numbers aren't proven, but they're close enough to test cheaply. // First, validate three things: how many out-of-town families need a paid room, what it costs to reach them through hospital desks, and whether they'll book through The Veedu instead of going direct.",
]

def sentences(text):
    """Split into (sentence, pause_before) chunks; '//' adds a longer pause."""
    import re
    out = []
    for j, block in enumerate(text.split("//")):
        parts = [x for x in re.split(r"(?<=[.?!:])\s+", block.strip()) if x]
        for n, sent in enumerate(parts):
            out.append((sent, PAUSE if (j and n == 0) else (0.12 if out else 0.0)))
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
