"""Generate Episode 05 (validation roadmap) voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.03, "en-us"
PAUSE = 0.55  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "Everything so far has been desk research. The next milestone isn't building more. It's finding out whether the problem, and my product, hold up with real families and real hosts. // So the roadmap is four weeks, around one hospital: Aster Med-city, in Cheranalloor.",
    "Aster already offers accommodation assistance to international patients, so The Veedu has to add value beyond a list of nearby rooms. // Amreeta, in Ponekkara, is the second cluster — but only after the first pilot.",
    "I'm testing five hypotheses. That families struggle to compare stays by hospital distance, needs, duration and availability. That they need clearer information before contacting a host. That some prefer a home to a hotel for longer stays. That hosts will keep their details accurate in exchange for relevant enquiries. // And that The Veedu actually reduces the effort of shortlisting. None of these is proven.",
    "Before testing anything, I checked the live site. Today it has no published listings, and the location picker lists areas, not hospitals. Aster Med-city isn't in it. // So week one also means adding the hospital, and onboarding a few host-confirmed properties, so there's something real to test.",
    "Week one is discovery. Eight to twelve people who've recently arranged a stay for a family member's treatment in Koachee, and five to eight hosts, recruited through my own network and host referrals, not through the hospital. // The questions are about what they actually did, not what they'd like.",
    "Week two tests the real website with six to eight people. Find a place near Aster for five nights. Compare two properties. Work out how to contact the host. Then tell me what's still missing. // I'll watch without guiding, and a successful click isn't booking intent.",
    "Weeks three and four are a concierge pilot. I'll confirm ten to fifteen properties with their hosts, record real distance and travel time, and publish only what's been checked. Enquiries go through the existing WhatsApp flow, and a simple spreadsheet tracks every one.",
    "Success is defined before the pilot starts. Five of eight participants shortlist without help. At least ten properties with host-confirmed details. Hosts saying the enquiries are useful. // These are small-sample signals, not market validation.",
    "At the end of week four, the evidence decides the next step. If people find stays but don't trust them, verification comes first. If they can't find them, search and distance do. If hosts don't respond, onboarding is the problem. If families prefer the hospital's own recommendations, The Veedu should complement them. // And if there's no real value over today's search, I go back to the problem itself.",
    "The next milestone for The Veedu is not scaling the platform. It's proving that a small group of families can find suitable accommodation with less uncertainty, and that local hosts can reliably fulfil those enquiries. // Before expanding to more hospitals, or automating the whole workflow, the product needs evidence from real users and real accommodation providers.",
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
