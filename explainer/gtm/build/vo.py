"""Generate the GTM strategy film voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.06, "en-us"
PAUSE = 0.55  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "Families arrive in Koachee with someone they love in a hospital bed. None of them are looking for a holiday. // They're looking for certainty. This is how The Veedu goes to market to give it to them.",
    "Five stages of research came down to one insight. Distance is why families choose a stay, and it's the fact listings state least consistently. // That one finding drives every decision that follows.",
    "So we don't go to market everywhere. We start with one hospital, Aster Med-city, and one customer: an out-of-town family caring for a patient who's admitted. More people than the hospital room allows, staying longer than a typical guest.",
    "Our position is simple. The Veedu is the stay-finder that checks what caregivers decide on: the walking time to the hospital entrance, the all-in price for the whole family, and whether a place works for weeks. // Not near the hospital. Checked, and dated.",
    "That promise is the brand. Calm, local, honest. Checked, so you don't have to. // Which means the first marketing task isn't an ad. It's removing any claim we can't yet prove.",
    "Pricing follows the same logic. For a caregiver, the real price is time, effort and risk, so families pay nothing. Hosts list free during the pilot, then pay twelve percent on confirmed stays: less than the big platforms, and only when it works.",
    "Every message climbs from feature to benefit. A measured walking time becomes: you can reach your mother in minutes. One all-in price becomes: no surprise at checkout. // This is a high-stakes decision, so we lead with evidence, not hype.",
    "We go where the need shows up. Search, when a family types the hospital's name. WhatsApp, where they actually decide. Walk-time videos, filmed from the hospital gate to every door. And answer-ready pages for AI search. // Social media supports. It doesn't lead.",
    "The launch is soft on purpose. Ten to fifteen properties, every one checked in person. A short pre-launch to fix the site and verify supply. Then go live, watch every enquiry, and fix fast, because first impressions stick.",
    "The pilot budget is about twenty-five thousand rupees, built ground-up from a target of forty qualified enquiries. // That's an assumption, and the cost per stay will start high. We treat it as the price of learning, not a growth engine.",
    "The real engine is a loop. Every checked stay produces better data. Better data ranks and earns trust. Trust brings more families, and more hosts. // Over time, that dataset of verified facts becomes the moat a copycat can't buy.",
    "It all runs on a ninety-day plan with two gates. Prepare. Soft launch. Grow the loop. Then monetise. Money is committed only after each gate is passed.",
    "That's the go-to-market. One hospital. One promise. One loop. // Win it honestly, then earn the next.",
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
