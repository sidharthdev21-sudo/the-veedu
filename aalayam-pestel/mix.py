"""Foley + VO + score → mix.wav, mastered to −14 LUFS (BS.1770 integrated, gated) with a true-peak ceiling of −1 dBTP.
Every stroke on the board makes its own marker sound; pans follow the stroke's screen position.
Layers: room tone + wall clock | foley (marker, magnet, cap, whips) | VO | score (ducked under VO)."""
import sys, os, json, numpy as np, soundfile as sf, soxr
LIB = os.environ['LIB']; sys.path.insert(0, LIB)
from core.audio.sfx import SR, bp, lp, hp, add, compress, limit
from core.audio import sampler as S
from scipy.signal import lfilter
HERE = os.path.dirname(os.path.abspath(__file__))
ev = json.load(open(os.path.join(HERE, os.environ.get('EVENTS', 'events.json')))); E = ev['ev']; DUR = ev['dur']
C = next(e for e in E if e['type'] == 'cues')
rng = np.random.default_rng(11)
NS = int((DUR + 1) * SR)
fol, room = np.zeros((NS, 2), np.float32), np.zeros((NS, 2), np.float32)
tt = lambda d: np.arange(int(d * SR)) / SR
def db(x): return 10 ** (x / 20)
def dec(d, tau): return np.exp(-tt(d) / tau)

_band = {}
def band(n, lo, hi):
    k = (lo, hi)
    if k not in _band: _band[k] = bp(rng.standard_normal(SR * 8), lo, hi, 2).astype(np.float32)
    b = _band[k]; i = int(rng.integers(0, len(b) - n - 1)); return b[i:i + n]
def marker(dur, length, kind, pen, z=1.):
    d = max(.03, dur); n = int(d * SR); u = np.linspace(0, 1, n)
    v = 1 - .8 * np.cos(2 * np.pi * u)
    a = (v / 1.8) ** .8 * np.minimum(1, u * d / .006) * np.minimum(1, (1 - u) * d / .012)
    br = {'navy': .96, 'teal': 1.06, 'red': 1.14}.get(pen, 1.)
    hiss = band(n, 2200 * br, 7500 * br) * (.55 + .45 * v / 1.8)
    body = band(n, 500 * br, 1500 * br) * .45
    grain = (rng.random(n) < .004 * (1 + v)) * rng.standard_normal(n) * .8
    x = (hiss + body + bp(grain, 1500, 6000)) * a
    if length > 140 and rng.random() < .28:                     # the dry-erase squeak
        s0 = rng.uniform(.15, .55) * d; sd = min(d - s0, rng.uniform(.06, .16))
        if sd > .03:
            m = int(sd * SR); ts = np.arange(m) / SR; f0 = rng.uniform(1500, 2600) * br
            f = f0 * (1 + .03 * np.sin(2 * np.pi * rng.uniform(7, 13) * ts))
            sq = (np.sin(2 * np.pi * np.cumsum(f) / SR) + .3 * np.sin(4 * np.pi * np.cumsum(f) / SR)) * np.sin(np.pi * ts / sd) ** 1.5 * .35
            i0 = int(s0 * SR); x[i0:i0 + m] += sq[:len(x) - i0]
    k = int(.004 * SR); x[:k] += bp(rng.standard_normal(k), 2500, 6500) * np.linspace(1, 0, k) * 1.4
    return x * .32 * min(1.3, z ** .5)
def tap(z=1.):
    n = int(.03 * SR); return bp(rng.standard_normal(n), 1800, 6000) * dec(.03, .004) * .36 * min(1.3, z ** .5)
def ring(fs, taus, amps, d):
    x = np.zeros(int(d * SR)); t = tt(d)
    for f, ta, am in zip(fs, taus, amps): x += np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * np.exp(-t / ta) * am
    return x
def magnet(big=0):
    d = .55; x = np.zeros(int(d * SR)); k = int(.005 * SR)
    x[:k] += bp(rng.standard_normal(k), 2000, 9000) * np.linspace(1, 0, k) * 1.5
    x += ring([830, 1370, 2210, 3120], [.07, .05, .035, .02], [.35, .25, .15, .08], d)
    x += ring([130 + 30 * big], [.1 + .08 * big], [.9 + .7 * big], d) * .9
    return x * (.55 + .4 * big)
def magnet_off():
    d = .35; x = lp(rng.standard_normal(int(d * SR)), 1800) * np.minimum(1, tt(d) / .15) * dec(d, .1) * .25
    k = int(.004 * SR); x[:k] += bp(rng.standard_normal(k), 2500, 8000) * .8; return x
def cap_pop():
    d = .25; x = np.zeros(int(d * SR)); k = int(.07 * SR)
    x[:k] += bp(rng.standard_normal(k), 1200, 5000) * np.linspace(.2, 1, k) * .35
    p = ring([1750, 3400], [.03, .012], [.8, .3], d - .07); x[k:k + len(p)] += p; return x * .6
def cap_on():
    d = .2; x = np.zeros(int(d * SR))
    for j, o in enumerate([0, .045]):
        i = int(o * SR); k = int(.006 * SR); x[i:i + k] += bp(rng.standard_normal(k), 2500, 9000) * np.linspace(1, 0, k) * (1 - .4 * j)
        r = ring([2600], [.015], [.4], .06); x[i:i + len(r)] += r
    return x * .7
def whoosh(d, v=1.):
    n = int(d * SR); t = tt(d); return bp(rng.standard_normal(n), 300, 2400) * np.sin(np.pi * t / d) ** 2 * .35 * v
def clock_tick(k):
    d = .25; y = np.zeros(int(d * SR)); k4 = int(.004 * SR); y[:k4] += bp(rng.standard_normal(k4), 3000, 9000) * 1.2
    y += ring([1250 if k % 2 else 1480, 2900], [.018, .01], [.35, .15], d); return y * .22
def put(buf, x, t, g=1., pan=0.):
    if 0 <= t < DUR: add(buf, np.asarray(x, np.float32), t, g, pan)

for e in E:
    ty, t = e['type'], e['t']; pan = e.get('pan', 0); z = e.get('z', 1); off = db(-9) if e.get('on', 1) == 0 else 1
    if ty in ('stroke', 'write', 'dash'): put(fol, marker(e['dur'], e['len'], ty, e.get('pen'), z), t, off * (.8 if ty == 'write' else 1.), pan)
    elif ty == 'tap': put(fol, tap(z), t, off, pan)
    elif ty == 'magnet': put(fol, magnet(e.get('big', 0)), t, 1.1, 0)
    elif ty == 'magnetOff': put(fol, magnet_off(), t, 1, 0)
    elif ty == 'cap': put(fol, cap_pop(), t, 1, .35)
    elif ty == 'capOn': put(fol, cap_on(), t, 1, .45)
by_pen = {}
for e in E:
    if e['type'] in ('stroke', 'write', 'dash', 'tap'): by_pen.setdefault(e['pen'], []).append(e)
for pen, L in by_pen.items():                                    # pens flying in and out of frame
    L.sort(key=lambda e: e['t'])
    for a, b in zip(L, L[1:]):
        if b['t'] - (a['t'] + a['dur']) > .75: put(fol, whoosh(.38, .35), a['t'] + a['dur'], 1, .5); put(fol, whoosh(.42, .45), b['t'] - .42, 1, .4)
    put(fol, whoosh(.42, .45), L[0]['t'] - .42, 1, .4)
for k, s in enumerate(C['SK']):                                   # each ride out from the brand
    if k: put(fol, whoosh(1.0, .45), s + .3, 1, 0)
put(fol, whoosh(.65, 1.1), C['FIN'] - .7, 1, 0)                   # the whip back after the silence
put(fol, whoosh(2.6, .45), C['FIN'] + 1.5, 1, 0)                  # the pull-back to the wall

# room: tone + a wall clock that owns the silence
rt = lp(rng.standard_normal(NS), 900) * .010 + lp(rng.standard_normal(NS), 180) * .012
room[:, 0] += rt; room[:, 1] += np.roll(rt, 311)
for k, t in enumerate(np.arange(C['SIL'] + .2, C['FIN'] - .6, C['BEAT'] * 2)): put(room, clock_tick(k), t, 1.2, -.45)
room = S.room(room, size=.35, mix=.25)

# VO
lines = json.load(open(os.path.join(HERE, 'lines.json')))
vo_t = {e['id']: e['t'] for e in E if e['type'] == 'vo'}
vo_mono = np.zeros(NS, np.float32)
for L in lines:
    y, sr = sf.read(os.path.join(HERE, 'voices', L['id'] + '.wav'))
    if y.ndim > 1: y = y.mean(1)
    y = soxr.resample(y.astype(np.float32), sr, SR); i = int(vo_t[L['id']] * SR); vo_mono[i:i + len(y)] += y[:NS - i]
vo_mono = hp(vo_mono, 70); vo_mono = compress(vo_mono / (np.abs(vo_mono).max() + 1e-9) * .8, thr=.2, ratio=3.0, att=.004, rel=.1)
vo = np.stack([vo_mono, vo_mono], 1); vo = vo * .85 + S.room(vo, size=.2, mix=.1) * .15

# score, ducked under speech
mus, _ = sf.read(os.path.join(HERE, 'music', 'score.wav')); mus = mus[:NS]
if len(mus) < NS: mus = np.pad(mus, ((0, NS - len(mus)), (0, 0)))
envv = np.convolve(np.abs(vo_mono), np.ones(int(.05 * SR)) / int(.05 * SR), 'same'); on = (envv > .02).astype(np.float32)
att, rel = int(.06 * SR), int(.35 * SR); dk = np.zeros(NS, np.float32); g = 0.
for j in range(0, NS, 240):
    tg = on[j]; g += (tg - g) * (240 / att if tg > g else 240 / rel); dk[j:j + 240] = g
mus = mus * (1 - (1 - db(-8)) * dk)[:, None]

def rms(x): m = np.abs(x).max(1) > 1e-4; return float(np.sqrt(np.mean(x[m] ** 2))) if m.any() else 1.
vo_r, mu_r, fo_r = rms(vo), rms(mus), rms(fol)
mix = vo + mus * (vo_r / mu_r) * db(-8) + fol * (vo_r / fo_r) * db(-11) + room
mix = mix[:int(DUR * SR)]

# ───────── master: BS.1770 integrated loudness → −14 LUFS, then a true-peak ceiling of −1 dBTP
def lufs(x):
    b1, a1 = [1.53512485958697, -2.69169618940638, 1.19839281085285], [1.0, -1.69065929318241, 0.73248077421585]
    b2, a2 = [1.0, -2.0, 1.0], [1.0, -1.99004745483398, 0.99007225036621]
    y = lfilter(b2, a2, lfilter(b1, a1, x, axis=0), axis=0)
    blk, hop = int(.4 * SR), int(.1 * SR)
    ms = np.array([np.mean(y[i:i + blk] ** 2, 0).sum() for i in range(0, len(y) - blk, hop)])
    L = -.691 + 10 * np.log10(ms + 1e-12); g = ms[L > -70]
    rel = -.691 + 10 * np.log10(g.mean()) - 10
    return -.691 + 10 * np.log10(ms[(L > -70) & (L > rel)].mean())
for _ in range(3):
    mix = mix * db(-14 - lufs(mix))
    up = soxr.resample(mix, SR, SR * 4); tp = np.abs(up).max(); ceil = db(-1.2)
    if tp > ceil: mix = np.stack([limit(mix[:, c], ceil * .97) for c in range(2)], 1)
tp = np.abs(soxr.resample(mix, SR, SR * 4)).max()
if tp > db(-1.0): mix = mix * db(-1.05) / tp                     # last trim, if the limiter left an inter-sample peak
print('loudness', round(lufs(mix), 2), 'LUFS · true peak', round(20 * np.log10(np.abs(soxr.resample(mix, SR, SR * 4)).max()), 2), 'dBTP')
sf.write(os.path.join(HERE, 'out', os.environ.get('MIXOUT', 'mix.wav')), mix.astype(np.float32), SR, subtype='PCM_24')
