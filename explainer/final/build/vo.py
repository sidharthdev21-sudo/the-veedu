"""Generate the final case-study film voiceover with Kokoro TTS, one clip per scene.
Usage: python3 vo.py <model.onnx> <voices.bin> <outdir>"""
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, SPEED, LANG = "af_heart", 1.0, "en-us"
PAUSE = 0.55  # seconds of silence at each "//"
# Spoken text (respelled where the TTS mispronounces Kerala place names).
SCENES = [
    "Not everyone who travels to Koachee is on holiday. // Some come because someone they love has been admitted to hospital. And for the rest of the family, one question arrives quickly: where do we stay? // That's the moment I wanted to understand.",
    "I'm building The Veedu, an accommodation discovery platform for Kerala. My background is in UX design and running rental accommodation, and I already had a working prototype. // But a prototype isn't evidence. So before building any further, I set out to find whether it deserved to exist.",
    "My starting hypothesis was simple. Medical travellers and their families need things general booking platforms don't surface well: being close to the hospital, staying for weeks, and knowing the real cost. // I wrote down what would prove that wrong before I looked for anything that proved it right.",
    "The official data gave me context — and a warning. Kerala recorded around two and a half crore domestic tourist visits in 2025, and in 2023, Ernaakoolum, Koachee's district, led the state. About six point four lakh foreigners came to India for medical treatment in 2024. // But tourist visits aren't medical travellers. And the Ministry of Tourism doesn't keep state-wise medical tourism data. The number I needed most didn't exist.",
    "So I went to the ground: Amreeta Hospital and Aster Med-city, in the Edappally–Cheranalloor corridor. At Amreeta, one family member can stay in the patient's room, and other relatives are pointed to a guest house. I mapped twelve providers nearby, from budget rooms to a Marriott, and some already market to patients and bystanders. // So this wasn't an empty market. The question changed from whether there's supply, to what's missing.",
    "The reviews were where it got interesting. I could only read twenty-five excerpts, well short of the hundred I wanted, so I treat them as a signal, not a statistic. Guests praised staff and cleanliness. They complained about extra charges at checkout, and maintenance on longer stays. // And when reviewers mentioned the hospital, they wrote about distance. One guest house named after Amreeta was a twelve-minute walk to one guest — and a little away to another.",
    "That became the insight everything else builds on. Distance is why families choose a stay, and it's the fact listings state least consistently. // To size the market, I started with something I could count: over two thousand beds across the two hospitals. Every step after that is an explicit assumption. The base case projects around sixteen crore rupees a year in accommodation spend, with about eight crore a platform could realistically serve.",
    "Then the harder question: could a small pilot work? With ten partner properties and a twelve percent commission, the base case projects about seven lakh in platform revenue, and falls short of break-even, which needs around fifty-five bookings a month. // Short, cheap stays lose money on every booking. The model only works for longer stays — the same families the research pointed to. So the pilot should be small, founder-led, and built to measure, not to scale.",
    "From there, the strategy narrowed. The primary customer is an out-of-town family caring for a patient admitted at Amreeta or Aster Med-city. Their problem isn't finding a room. It's trusting the facts behind it. // So the position I want to earn is simple: know how far, how much, and for how long, before you call.",
    "I scored nine features on reach, impact, confidence and effort. The MVP keeps five: hospital-based discovery, verified distance to the entrance, all-in pricing for the whole family, dated verification, and tracked WhatsApp enquiries. // Online booking and payment can wait. And because my own prototype still shows straight-line distance, verification is the first thing to build.",
    "None of this is validated yet, so the next stage is a set of small experiments. Interview caregivers near both hospitals. Talk to hospital coordinators about how families are referred. Verify ten properties in person, and measure what it costs. // Then run a few weeks of WhatsApp-led matching, tracking how many enquiries become confirmed stays, and how many families go direct the next time.",
    "I haven't proven a business. What I've done is narrow an idea I care about into a specific customer, a specific problem, and a test small enough to run. // For me, that's the job. Not to be right at the start — but to find out, honestly and as cheaply as possible, what deserves to be built.",
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
