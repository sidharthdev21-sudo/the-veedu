"""Word timings without a speech-to-text model: find the voiced stretches in each line (pauses > 110 ms),
split the text into clauses at punctuation, map clauses onto stretches, then spread words inside a clause
by letter count. Writes voices/words.json as {id: [[word, start, end], ...]}."""
import sys, os, json, re, numpy as np, soundfile as sf
D = sys.argv[1]
lines = json.load(open(os.path.join(D, 'lines.json')))
out = {}
for L in lines:
    y, sr = sf.read(os.path.join(D, 'voices', L['id'] + '.wav'))
    if y.ndim > 1: y = y.mean(1)
    hop = int(.01 * sr); fr = np.array([np.sqrt(np.mean(y[i:i + hop] ** 2)) for i in range(0, len(y) - hop, hop)])
    on = fr > max(fr.max() * .04, 1e-4)
    segs, i = [], 0                                    # voiced stretches, bridging gaps < 110 ms
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and (on[j] or (j + 11 < len(on) and on[j:j + 11].any())): j += 1
            segs.append([i * .01, j * .01]); i = j
        else: i += 1
    clauses = [c.strip() for c in re.findall(r'[^,.:?!]+[,.:?!]*', L['sub']) if c.strip()]
    # merge stretches until their count matches the clauses (merge the closest pair)
    while len(segs) > len(clauses):
        k = min(range(len(segs) - 1), key=lambda k: segs[k + 1][0] - segs[k][1]); segs[k][1] = segs[k + 1][1]; del segs[k + 1]
    if len(segs) < len(clauses):                       # fewer pauses than clauses: one stretch, split by letters
        a, b = segs[0][0], segs[-1][1]; tot = sum(len(c) for c in clauses); segs, t = [], a
        for c in clauses: d = (b - a) * len(c) / tot; segs.append([t, t + d]); t += d
    W = []
    for c, (a, b) in zip(clauses, segs):
        ws = c.split(); tot = sum(len(w) + 1 for w in ws); t = a
        for w in ws: d = (b - a) * (len(w) + 1) / tot; W.append([w, round(t, 3), round(t + d, 3)]); t += d
    out[L['id']] = W
    print(L['id'], len(clauses), 'clauses', [round(s[1] - s[0], 2) for s in segs])
json.dump(out, open(os.path.join(D, 'voices', 'words.json'), 'w'), indent=0)
