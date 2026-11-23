"""Original score, synthesised (no samples): 108 BPM, D major, I–vi–IV–V. A kalimba figure carries the film;
each force adds one instrument (woodblock, marimba bass, plucked counter-line, glockenspiel, pad, shaker).
Everything stops for the silence before the whip; the full ensemble returns on the finale downbeat, then thins
back to the kalimba alone. Reads events.json for the grid. Writes music/score.wav (48 kHz stereo)."""
import os, json, numpy as np, soundfile as sf
SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
ev = json.load(open(os.path.join(HERE, 'events.json'))); DUR = ev['dur']
C = next(e for e in ev['ev'] if e['type'] == 'cues')
B, BAR, S0, SEC, SIL, FIN = C['BEAT'], C['BAR'], C['S0'], C['SEC'], C['SIL'], C['FIN']
rng = np.random.default_rng(5)
NS = int((DUR + 2) * SR); out = np.zeros((NS, 2))
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
tt = lambda d: np.arange(int(d * SR)) / SR

def put(x, t, g=1., pan=0.):
    i = int(t * SR)
    if i >= NS or i < 0: return
    x = x[:NS - i] * g; l, r = np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)
    out[i:i + len(x), 0] += x * l; out[i:i + len(x), 1] += x * r

def env(d, a=.003, tau=.3):
    t = tt(d); return np.minimum(1, t / a) * np.exp(-t / tau) * np.minimum(1, (d - t) / .02)
def kalimba(m, v=.6):          # tine: fundamental + inharmonic overtone, short bright attack
    d = 1.6; t = tt(d); f = hz(m)
    x = np.sin(2 * np.pi * f * t) * env(d, .002, .55) + .35 * np.sin(2 * np.pi * f * 5.4 * t) * env(d, .001, .05) + .12 * np.sin(2 * np.pi * f * 2 * t) * env(d, .002, .3)
    return x * v
def marimba(m, v=.7):
    d = 1.2; t = tt(d); f = hz(m)
    x = np.sin(2 * np.pi * f * t) * env(d, .004, .4) + .3 * np.sin(2 * np.pi * f * 2 * t) * env(d, .003, .12) + .18 * np.sin(2 * np.pi * f * 3.9 * t) * env(d, .002, .05)
    return x * v
def woodblock(hi=True, v=.5):
    d = .12; t = tt(d); f = 1150 if hi else 900
    return (np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * f * 2.3 * t)) * env(d, .0008, .025) * v
def pluck(m, v=.5):            # soft plucked string: decaying harmonics, brighter at the start
    d = 1.0; t = tt(d); f = hz(m); x = np.zeros(len(t))
    for k in range(1, 7): x += np.sin(2 * np.pi * f * k * t) / k ** 1.3 * np.exp(-t * (3 + k * 2.2))
    return x * np.minimum(1, t / .002) * v
def glock(m, v=.4):
    d = 2.0; t = tt(d); f = hz(m)
    return (np.sin(2 * np.pi * f * t) * env(d, .001, .7) + .25 * np.sin(2 * np.pi * f * 2.76 * t) * env(d, .001, .15)) * v
def pad(ms, d, v=.12):
    t = tt(d); x = np.zeros(len(t))
    for m in ms:
        for det in (-.07, .07): x += np.sin(2 * np.pi * hz(m + det) * t) + .2 * np.sin(2 * np.pi * hz(m + det) * 2 * t)
    a = np.minimum(1, t / .6) * np.minimum(1, (d - t) / .5)
    return x * a * v / len(ms)
def shaker(v=.18):
    d = .07; n = rng.standard_normal(int(d * SR)); n = np.diff(np.diff(n, prepend=0), prepend=0)   # bright noise
    return n * env(d, .006, .02) * v

CH = [('D', 62, [62, 66, 69]), ('Bm', 59, [59, 62, 66]), ('G', 55, [55, 59, 62]), ('A', 57, [57, 61, 64])]
def bar(t, ci, layers, lvl=1.):
    name, root, tri = CH[ci % 4]
    r, th, fi = tri[0] + 12, tri[1] + 12, tri[2] + 12
    if 'kal' in layers:
        fig = [r, fi, r + 12, fi, th + 12, None, r + 12, fi]
        for i, m in enumerate(fig):
            if m is not None: put(kalimba(m, .55 if i % 2 == 0 else .42), t + i * B / 2, lvl, -.2 + .1 * (i % 3))
    if 'wood' in layers:
        for i in range(4): put(woodblock(i % 2 == 0, .45), t + i * B, lvl, .35)
    if 'mar' in layers:
        put(marimba(root - 12, .8), t, lvl, 0); put(marimba(root - 12 + 7, .5), t + 1.5 * B, lvl, .05); put(marimba(root - 12, .6), t + 2 * B, lvl, 0)
    if 'plk' in layers:
        for i, m in enumerate([th, fi, th, fi + 2 if ci % 4 == 3 else fi]): put(pluck(m - 12, .45), t + (i + .5) * B, lvl, .3)
    if 'glk' in layers:
        put(glock(r + 12, .35), t, lvl, .25)
        if ci % 2: put(glock(fi + 12, .25), t + 2.5 * B, lvl, .3)
    if 'pad' in layers: put(pad([m - 12 for m in tri], BAR + .4), t, lvl, 0)
    if 'shk' in layers:
        for i in range(16): put(shaker(.2 if i % 2 else .12), t + i * B / 4, lvl, -.35)

ORDER = ['wood', 'mar', 'plk', 'glk', 'pad', 'shk']
# intro: four bars of kalimba before the first force
for i in range(4): bar(S0 - (4 - i) * BAR, i, {'kal'}, .9)
# six forces, one more instrument each
for k in range(6):
    for i in range(4): bar(S0 + k * SEC + i * BAR, i, {'kal', *ORDER[:k + 1]})
# SIL → FIN: silence (the room clock owns it). Finale: everything, then thinning to the kalimba
put(glock(74 + 12, .5), FIN, 1, .2)
for i in range(3): bar(FIN + i * BAR, i, {'kal', *ORDER}, 1.)
bar(FIN + 3 * BAR, 3, {'kal', 'pad', 'glk'}, .9)
bar(FIN + 4 * BAR, 0, {'kal'}, .8)
END_T = FIN + 5 * BAR
for m, dt in [(74, 0), (78, .02), (81, .04)]: put(kalimba(m, .5), END_T + dt, 1, 0)
put(glock(86, .3), END_T, 1, .2)

# gentle stereo room: a few early reflections
wet = np.zeros_like(out)
for d, g in [(.023, .25), (.041, .2), (.067, .15), (.11, .1)]:
    k = int(d * SR); wet[k:, 0] += out[:-k, 1] * g; wet[k:, 1] += out[:-k, 0] * g
out = out + wet
out = out[:int(DUR * SR)]
out = out / (np.abs(out).max() + 1e-9) * .8
os.makedirs(os.path.join(HERE, 'music'), exist_ok=True)
sf.write(os.path.join(HERE, 'music', 'score.wav'), out.astype(np.float32), SR)
print('score', round(len(out) / SR, 2), 's')
