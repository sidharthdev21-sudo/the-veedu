"""Generate Episode 01 voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.0, "en-us"
PAUSE = 0.55  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "Not everyone who travels to Koachee is on holiday.",
    "I'm building The Veedu, an accommodation discovery platform for Kerala — starting with people coming to Koachee for medical treatment, and the families with them.",
    "My background is U X design, and running rental accommodation. That led me to a product question: // when the trip is for a hospital, does finding a stay work differently?",
    "My hypothesis: it does. A caregiver may need to stay close, for weeks, with clear costs and easy access — needs that general platforms may not surface. // But that's a hypothesis. Not a finding.",
    "Koachee is a sensible start. Kerala recorded around two and a half crore domestic tourist visits in 2025. And in 2023, Ernaakoolum — Koachee's district — led the state in both domestic and foreign visits.",
    "Nationally, about six point four lakh foreigners came to India for medical treatment in 2024. // But tourist visits aren't medical travellers. And the Ministry of Tourism doesn't keep state-wise data.",
    "So I can't yet say how many medical travellers stay in Koachee — or what they struggle with.",
    "That's what this research must establish. Is the problem real? Who feels it most? What do families use today? And is there a business? // Let's find out.",
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
