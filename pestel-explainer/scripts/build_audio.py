"""Builds the timeline and the soundtrack for the PESTEL explainer.

1. Reads the narration (scripts/narration.json) and the voice clips (audio/voice/<id>.wav).
2. Lays the lines out on a timeline (src/timeline.json): every scene and every line gets a start frame at 30 fps,
   so the Remotion scenes can time their animations to the words.
3. Writes a soft, original instrumental (felt piano + warm pad, F major, 76 BPM), ducks it under the voice,
   and masters the mix to -14 LUFS with a -1 dBTP ceiling → public/audio/mix.wav.
4. Writes the narration as subtitles (out/narration.srt) and as a plain script (docs/voiceover.md).

Run with a Python that has numpy, scipy, soundfile and soxr:  python scripts/build_audio.py
"""
import json, os, numpy as np, soundfile as sf, soxr
from scipy.signal import lfilter, butter, sosfilt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS, SR = 30, 48000
LEAD, LINE_GAP, TAIL = 0.7, 0.3, 0.6          # seconds: before the first line, between lines, after the last line

scenes = json.load(open(os.path.join(ROOT, 'scripts', 'narration.json')))
clips = {}
for sc in scenes:
    for ln in sc['lines']:
        y, sr = sf.read(os.path.join(ROOT, 'audio', 'voice', ln[0] + '.wav'))
        if y.ndim > 1: y = y.mean(1)
        clips[ln[0]] = soxr.resample(y.astype(np.float32), sr, SR)

# ───────── timeline
t, tl = 0.0, []
for sc in scenes:
    s0 = t; t += LEAD; lines = []
    for i, ln in enumerate(sc['lines']):
        if i: t += LINE_GAP
        d = len(clips[ln[0]]) / SR
        lines.append({'id': ln[0], 'text': ln[1], 'start': t, 'dur': d}); t += d
    t += TAIL
    tl.append({'id': sc['scene'], 'title': sc['title'], 'start': s0, 'end': t, 'lines': lines})
TOTAL = t + 1.2                                   # a short hold on the final frame
fr = lambda s: int(round(s * FPS))
out_tl = {'fps': FPS, 'durationInFrames': fr(TOTAL), 'scenes': []}
for sc in tl:
    st = fr(sc['start'])
    end = fr(sc['end']) if sc is not tl[-1] else fr(TOTAL)
    out_tl['scenes'].append({'id': sc['id'], 'title': sc['title'], 'from': st, 'durationInFrames': end - st,
                             'lines': [{'id': l['id'], 'text': l['text'], 'from': fr(l['start']) - st, 'durationInFrames': fr(l['dur'])} for l in sc['lines']]})
json.dump(out_tl, open(os.path.join(ROOT, 'src', 'timeline.json'), 'w'), indent=1)
print(f'timeline: {TOTAL:.1f} s, {fr(TOTAL)} frames')

# ───────── voice track
NS = int((TOTAL + .5) * SR)
voice = np.zeros(NS, np.float32)
for sc in tl:
    for l in sc['lines']:
        i = int(l['start'] * SR); c = clips[l['id']]; voice[i:i + len(c)] += c[:NS - i]
voice = sosfilt(butter(2, 80, 'high', fs=SR, output='sos'), voice)
def compress(x, thr_db=-24, ratio=3.0, ms=8):     # smooth the voice's peaks so it can sit at a steady level
    from scipy.ndimage import maximum_filter1d            # peak envelope: hold over the window, then smooth
    a = 1 - np.exp(-1 / (.002 * SR)); env = lfilter([a], [1, a - 1], maximum_filter1d(np.abs(x), int(ms / 1000 * SR) * 2 + 1))
    thr = 10 ** (thr_db / 20) * np.abs(x).max(); g = np.where(env > thr, (thr / np.maximum(env, 1e-9)) ** (1 - 1 / ratio), 1.0)
    return x * g
voice = compress(compress(voice, -26, 3.0, 12), -12, 6.0, 1.5)   # level, then catch the transients

# ───────── music: felt piano arpeggios over a warm pad
rng = np.random.default_rng(3)
BPM = 76; BEAT = 60 / BPM; BAR = 4 * BEAT
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
tt = lambda d: np.arange(int(d * SR)) / SR
mus = np.zeros((NS, 2))
def put(x, at, g=1., pan=0.):
    i = int(at * SR)
    if i >= NS: return
    x = x[:NS - i] * g; mus[i:i + len(x), 0] += x * np.sqrt((1 - pan) / 2); mus[i:i + len(x), 1] += x * np.sqrt((1 + pan) / 2)
def piano(m, v=.5, d=2.4):                        # soft "felt" piano: muted hammer, gentle decay, few harmonics
    t = tt(d); f = hz(m); x = np.zeros(len(t))
    for k, a in enumerate([1, .42, .18, .08], 1): x += a * np.sin(2 * np.pi * f * k * t * (1 + .0004 * k * k)) * np.exp(-t * (1.6 + k * 1.1))
    att = np.minimum(1, t / .012); rel = np.minimum(1, (d - t) / .2)
    return x * att * rel * v
def pad(ms, d, v=.08):
    t = tt(d); x = np.zeros(len(t))
    for m in ms:
        for det in (-.06, .06): x += np.sin(2 * np.pi * hz(m + det) * t) + .25 * np.sin(2 * np.pi * hz(m + det) * 2 * t + 1)
    x = sosfilt(butter(2, 1400, 'low', fs=SR, output='sos'), x)
    return x * np.minimum(1, t / 1.2) * np.minimum(1, (d - t) / 1.2) * v / len(ms)
PROG = [(53, [53, 57, 60]), (50, [50, 53, 57]), (46, [46, 50, 53]), (48, [48, 52, 55])]   # F – Dm – B♭ – C
FIG = [0, 2, 1, 2, 0, 2, 1, 2]                    # chord-tone indices for 8 eighth notes
nbar = int(TOTAL / BAR) + 1
for b in range(nbar):
    t0 = b * BAR; root, tri = PROG[b % 4]
    put(pad([m - 12 for m in tri] + [root - 24], BAR + 1.4), t0, 1, 0)
    for i, k in enumerate(FIG):
        m = tri[k] + 12 + (12 if i in (3, 7) and b % 2 else 0)
        put(piano(m, .32 if i % 4 == 0 else .22), t0 + i * BEAT / 2 + rng.uniform(0, .012), 1, -.25 + .5 * (k / 2))
    if b % 2 == 0: put(piano(tri[2] + 24, .16, 3.0), t0 + BEAT * 2.5, 1, .3)   # a high answering note every other bar
fade = int(3 * SR); mus[-fade:] *= np.linspace(1, 0, fade)[:, None]; mus[:int(1.5 * SR)] *= np.linspace(0, 1, int(1.5 * SR))[:, None]
wet = np.zeros_like(mus)                          # a little room
for d, g in [(.031, .3), (.053, .22), (.089, .16), (.137, .1)]:
    k = int(d * SR); wet[k:, 0] += mus[:-k, 1] * g; wet[k:, 1] += mus[:-k, 0] * g
mus = mus + wet

# duck the music under speech
env = np.convolve(np.abs(voice), np.ones(int(.05 * SR)) / int(.05 * SR), 'same'); on = (env > .01).astype(np.float32)
g, dk = 0., np.zeros(NS, np.float32); att, rel = int(.08 * SR), int(.6 * SR)
for j in range(0, NS, 240):
    g += (on[j] - g) * (240 / att if on[j] > g else 240 / rel); dk[j:j + 240] = g
def rms(x): m = np.abs(x) > 1e-4; return float(np.sqrt(np.mean(x[m] ** 2)))
mus *= rms(voice) / rms(mus) * 10 ** (-14 / 20)   # music sits ~14 dB under the voice…
mus *= (1 - (1 - 10 ** (-5 / 20)) * dk)[:, None]  # …and 5 dB further down while someone is speaking
mix = np.stack([voice, voice], 1) + mus

# ───────── master to -14 LUFS (ITU BS.1770, gated), true peak ≤ -1 dBTP
def lufs(x):
    y = lfilter([1.0, -2.0, 1.0], [1.0, -1.99004745483398, 0.99007225036621],
                lfilter([1.53512485958697, -2.69169618940638, 1.19839281085285], [1.0, -1.69065929318241, 0.73248077421585], x, axis=0), axis=0)
    blk, hop = int(.4 * SR), int(.1 * SR)
    ms = np.array([np.mean(y[i:i + blk] ** 2, 0).sum() for i in range(0, len(y) - blk, hop)])
    L = -.691 + 10 * np.log10(ms + 1e-12); g = ms[L > -70]; rel = -.691 + 10 * np.log10(g.mean()) - 10
    return -.691 + 10 * np.log10(ms[(L > -70) & (L > rel)].mean())
def soft_limit(x, ceil):                          # smooth gain reduction above the ceiling (5 ms look-ahead)
    a = np.abs(x).max(1); need = np.minimum(1, ceil / np.maximum(a, 1e-9))
    w = int(.005 * SR); k = np.ones(2 * w + 1) / (2 * w + 1)
    gmin = np.minimum.reduce([np.roll(need, s) for s in range(-w, w + 1, max(1, w // 8))])
    return x * np.convolve(gmin, k, 'same')[:, None]
for _ in range(3):
    mix *= 10 ** ((-14 - lufs(mix)) / 20)
    tp = np.abs(soxr.resample(mix, SR, SR * 4)).max()
    if tp > 10 ** (-1.2 / 20): mix = soft_limit(mix, 10 ** (-1.5 / 20))
tp = np.abs(soxr.resample(mix, SR, SR * 4)).max()
if tp > 10 ** (-1 / 20): mix *= 10 ** (-1.05 / 20) / tp
mix = mix[:int(TOTAL * SR)]
os.makedirs(os.path.join(ROOT, 'public', 'audio'), exist_ok=True)
sf.write(os.path.join(ROOT, 'public', 'audio', 'mix.wav'), mix.astype(np.float32), SR, subtype='PCM_24')
print(f'mix: {lufs(mix):.1f} LUFS, true peak {20 * np.log10(np.abs(soxr.resample(mix, SR, SR * 4)).max()):.1f} dBTP')

# ───────── subtitles and script
def ts(s): h, r = divmod(s, 3600); m, r = divmod(r, 60); return f'{int(h):02}:{int(m):02}:{int(r):02},{int(round((r % 1) * 1000)) % 1000:03}'
n, srt, md = 0, [], ['# Voiceover script', '', f'Voice: Kokoro (af_heart, US English), speed 1.05. Total length {int(TOTAL // 60)}:{int(TOTAL % 60):02}.', '']
for sc in tl:
    md += [f"## {sc['title']}  ({int(sc['start'] // 60)}:{int(sc['start'] % 60):02})", '']
    for l in sc['lines']:
        n += 1; srt += [str(n), f"{ts(l['start'])} --> {ts(l['start'] + l['dur'] + .3)}", l['text'], '']
        md.append(l['text'])
    md.append('')
os.makedirs(os.path.join(ROOT, 'out'), exist_ok=True)
open(os.path.join(ROOT, 'out', 'narration.srt'), 'w').write('\n'.join(srt))
open(os.path.join(ROOT, 'docs', 'voiceover.md'), 'w').write('\n'.join(md))
