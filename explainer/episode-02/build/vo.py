"""Generate Episode 02 voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.06, "en-us"
PAUSE = 0.55  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "Search for a hotel near Amreeta Hospital, and booking sites already have a page for it. // So the real question isn't whether options exist. It's what families actually use — and what they still can't see.",
    "Right now, families piece it together. At Amreeta, one family member can stay in the patient's room, and other relatives are pointed to a guest house on campus. Aster's international desk helps arrange hotels. Everyone else turns to booking apps, private flats, or relatives.",
    "I mapped twelve providers around Aster Med-city and Amreeta: budget rooms, serviced apartments, guest houses, a Marriott. Some already market directly to patients and bystanders. // So The Veedu wouldn't be starting in an empty market.",
    "Then I read the reviews. Twenty-five readable excerpts — well short of my target of a hundred, because most review pages weren't accessible. So this is a signal, not a statistic.",
    "Staff and cleanliness drew the most praise. The complaints were practical: extra-person charges at checkout, broken AC and water supply, small rooms, no food on site. // Safety never came up in this sample.",
    "Six reviews mentioned the hospital — and they were mostly about distance. At one guest house named after Amreeta, a guest called it a twelve-minute walk. Another said it was a little away. Location was its lowest-scored category.",
    "Plotting every option shows a pattern. General hotels have the most consistent information. The options built closest to medical needs often have the least.",
    "The segment worth investigating first: families from outside Koachee with a patient admitted for days or weeks. More people than the hospital room allows, staying longer than a typical guest.",
    "So here's the strongest insight. Distance is why these families choose a stay — and it's the fact listings state least consistently. // The question for The Veedu: can it verify what caregivers decide on, well enough to be trusted over a listing that already says near Amreeta?",
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
