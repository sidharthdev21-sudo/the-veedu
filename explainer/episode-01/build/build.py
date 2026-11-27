"""Assemble Episode 01: scene timing, map data, soundtrack (VO + music bed + UI accents) and subtitles.

Usage: python3 build.py <vo_dir>
  <vo_dir> holds vo_1.wav … vo_8.wav and vo.json from vo.py.
Writes timing.js, mapdata.js, soundtrack.wav and episode-01.srt next to this script.
"""
import json, sys, os
import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 48000
LEAD = [1.4, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35]   # silence before VO in each scene
TAIL = [0.55, 0.5, 0.5, 0.55, 0.5, 0.6, 0.5, 0.7]        # hold after VO
END_CARD = 3.6
# Display text for subtitles (the VO uses phonetic respellings of place names).
SUBS = {"Koachee": "Kochi", "Ernaakoolum": "Ernakulam", "U X": "UX"}


def load(path):
    a, sr = sf.read(path, dtype="float32")
    if a.ndim > 1: a = a.mean(axis=1)
    if sr != SR:
        x = np.arange(0, len(a), sr / SR)
        a = np.interp(x, np.arange(len(a)), a).astype(np.float32)
    return a


def timing(vo):
    scenes, t = [], 0.0
    for i, v in enumerate(vo):
        dur = LEAD[i] + v["dur"] + TAIL[i]
        scenes.append({"start": round(t, 3), "dur": round(dur, 3), "vo": round(t + LEAD[i], 3)})
        t += dur
    scenes.append({"start": round(t, 3), "dur": END_CARD, "vo": None})
    return scenes, round(t + END_CARD, 3)


def note(f, n, a=0.0):  # midi helper
    return 440.0 * 2 ** ((n - 69) / 12)


def pad(total, scenes):
    """Soft ambient pad: four-chord loop in D major, slow attack, gentle shimmer."""
    t = np.arange(int(total * SR)) / SR
    out = np.zeros_like(t)
    chords = [[50, 57, 66, 73, 76], [47, 54, 62, 69, 73], [43, 50, 59, 66, 69], [45, 52, 59, 64, 73]]  # Dmaj9 Bm9 Gmaj9 Asus2
    span = 6.86  # two bars at 70 BPM
    for k in range(int(total // span) + 2):
        c = chords[k % 4]
        t0 = k * span
        i0, i1 = int(max(0, t0 - 1.5) * SR), int(min(total, t0 + span + 2.0) * SR)
        if i0 >= len(t): break
        tt = t[i0:i1] - t0
        env = np.clip((tt + 1.5) / 2.5, 0, 1) * np.clip((span + 2.0 - tt) / 2.5, 0, 1)
        for j, m in enumerate(c):
            f = note(0, m)
            amp = 0.05 / (1 + j * 0.35)
            out[i0:i1] += amp * env * (np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * f * 1.003 * tt + j))
        # soft bell on each chord change
        bi = int(t0 * SR)
        if bi < len(t):
            bt = t[bi:bi + int(4 * SR)] - t0
            f = note(0, c[-1] + 12)
            out[bi:bi + len(bt)] += 0.035 * np.exp(-bt * 1.4) * np.sin(2 * np.pi * f * bt)
    # slow tremolo + crude low-pass (moving average) for warmth
    out *= 0.85 + 0.15 * np.sin(2 * np.pi * 0.13 * t)
    kern = np.ones(24) / 24
    out = np.convolve(out, kern, mode="same")
    # scene-specific dynamics
    gain = np.ones_like(t)
    def ramp(a, b, g0, g1):
        i, j = int(a * SR), int(b * SR)
        gain[i:j] = np.linspace(g0, g1, max(1, j - i))
    s6, s7, s9 = scenes[5], scenes[6], scenes[8]
    neq = s6["start"] + 7.8                      # the "≠" moment: near-silence for ~1 s
    ramp(neq - 0.3, neq, 1, 0.1); ramp(neq, neq + 1.0, 0.1, 0.1); ramp(neq + 1.0, neq + 2.0, 0.1, 1)
    ramp(s7["start"], s7["start"] + 0.8, 1, 0.55); ramp(s7["start"] + 0.8, s7["start"] + s7["dur"], 0.55, 0.55)
    ramp(s7["start"] + s7["dur"], s7["start"] + s7["dur"] + 1.0, 0.55, 1)
    ramp(total - 2.2, total, 1, 0)               # fade out at the end
    ramp(0, 2.0, 0, 1)                           # fade in
    return (out * gain).astype(np.float32)


def drone(total, scenes):
    """Low held tone under the 'data gap' scene."""
    t = np.arange(int(total * SR)) / SR
    s = scenes[6]
    env = np.clip((t - s["start"]) / 1.2, 0, 1) * np.clip((s["start"] + s["dur"] + 0.6 - t) / 1.2, 0, 1)
    return (0.05 * env * np.sin(2 * np.pi * 73.4 * t) * (0.8 + 0.2 * np.sin(2 * np.pi * 0.5 * t))).astype(np.float32)


def noise_bed(total, spans, level):
    """Filtered noise: water / room ambience in given spans."""
    rng = np.random.default_rng(7)
    n = rng.standard_normal(int(total * SR)).astype(np.float32)
    n = np.convolve(n, np.ones(200) / 200, mode="same")  # dark, soft
    t = np.arange(len(n)) / SR
    env = np.zeros_like(t)
    for a, b in spans:
        env += np.clip((t - a) / 1.5, 0, 1) * np.clip((b - t) / 1.5, 0, 1)
    return (level * n * env * (0.7 + 0.3 * np.sin(2 * np.pi * 0.2 * t))).astype(np.float32)


def tick(length=0.08, f=1400):
    t = np.arange(int(length * SR)) / SR
    return (np.sin(2 * np.pi * f * t) * np.exp(-t * 60) * 0.06).astype(np.float32)


def whoosh(length=0.9):
    rng = np.random.default_rng(3)
    n = rng.standard_normal(int(length * SR)).astype(np.float32)
    n = np.convolve(n, np.ones(60) / 60, mode="same")
    t = np.linspace(0, 1, len(n))
    return (n * np.sin(np.pi * t) ** 2 * 0.35).astype(np.float32)


def place(buf, clip, at):
    i = int(at * SR)
    if i >= len(buf): return
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i]


def srt(vo, scenes):
    def ts(x):
        ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
        return f"{h:02}:{m:02}:{s:02},{ms:03}"
    lines, n = [], 1
    for i, v in enumerate(vo):
        marks = v["marks"]
        for k, mk in enumerate(marks):
            a = scenes[i]["vo"] + mk["at"]
            b = scenes[i]["vo"] + (marks[k + 1]["at"] - 0.05 if k + 1 < len(marks) else v["dur"])
            text = mk["text"]
            for x, y in SUBS.items(): text = text.replace(x, y)
            lines.append(f"{n}\n{ts(a)} --> {ts(b)}\n{text}\n"); n += 1
    return "\n".join(lines)


def main(vo_dir):
    vo = json.load(open(os.path.join(vo_dir, "vo.json")))
    scenes, total = timing(vo)
    open(os.path.join(HERE, "timing.js"), "w").write(f"window.TIMING = {json.dumps({'scenes': scenes, 'total': total})};\n")
    geo = json.load(open(os.path.join(HERE, "kerala-districts.json")))
    open(os.path.join(HERE, "mapdata.js"), "w").write(f"window.MAP = {json.dumps(geo)};\n")

    n = int(total * SR)
    voice = np.zeros(n, np.float32)
    for i in range(len(vo)):
        place(voice, load(os.path.join(vo_dir, f"vo_{i+1}.wav")), scenes[i]["vo"])

    music = pad(total, scenes) + drone(total, scenes)
    # duck music ~5 dB under speech (smoothed speech envelope)
    env = np.convolve(np.abs(voice), np.ones(int(0.25 * SR)) / int(0.25 * SR), mode="same")
    duck = 1 - 0.44 * np.clip(env / (env.max() * 0.15 + 1e-9), 0, 1)
    duck = np.convolve(duck, np.ones(int(0.3 * SR)) / int(0.3 * SR), mode="same")
    music *= duck

    fx = np.zeros(n, np.float32)
    fx += noise_bed(total, [(0, scenes[0]["start"] + scenes[0]["dur"] + 0.5), (scenes[8]["start"] - 0.5, total)], 0.9)
    S = lambda k, x: scenes[k]["start"] + x
    for at in [S(1, 0.7), S(1, 2.4), S(1, 3.7), S(1, 5.0), S(3, 4.0), S(3, 4.8), S(3, 5.6),
               S(4, 3.6 + 1.6), S(5, 0.6 + 1.6), S(7, 2.56), S(7, 3.96), S(7, 5.3), S(7, 7.06)]:
        place(fx, tick(), at)
    for at in [S(4, 0.0), S(6, 0.2)]:
        place(fx, whoosh(), at)

    mix = voice * 1.0 + music * 0.55 + fx
    mix /= max(1e-9, np.abs(mix).max()) / 0.89
    sf.write(os.path.join(HERE, "soundtrack.wav"), mix, SR)
    open(os.path.join(HERE, "episode-01.srt"), "w").write(srt(vo, scenes))
    print("total", total, "s;", [round(s["start"], 2) for s in scenes])


if __name__ == "__main__":
    main(sys.argv[1])
