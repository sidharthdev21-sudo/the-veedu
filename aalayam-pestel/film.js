// "AALAYAM — PESTEL on the Board". Whiteboard Explainer. One board; the brand is a magnet in the middle,
// six forces are drawn around it, one journey each, and the camera pulls back to see them as one map.
import * as W from './engine/wb.js';
import { clamp, lerp, TAU, mulberry } from '/core/lib.js';

export const NAVY = '#1f2a44', TEAL = '#1f8a8a', RED = '#c8363a';
export const BPM = 108, BEAT = 60 / BPM, BAR = 4 * BEAT;
export const S0 = 10.0, SEC = 4 * BAR;                       // factor k starts at S0 + k·SEC (on a bar line)
export const SK = [0, 1, 2, 3, 4, 5].map(k => S0 + k * SEC);
export const SIL = S0 + 6 * SEC;                              // 63.33: music stops
export const FIN = SIL + BAR;                                  // 65.56: whip lands, full ensemble
export const END = +(FIN + 13.5).toFixed(2);
const VOFF = 1.25;                                             // VO starts this long after its section's downbeat
export const VO = { v01: 1.0, v02: 3.6, v03: 6.2, v10: FIN + .6, v11: FIN + 6.6 };
['v04', 'v05', 'v06', 'v07', 'v08', 'v09'].forEach((id, k) => VO[id] = +(SK[k] + VOFF).toFixed(3));

const C = [4000, 2150];                                        // the brand magnet

export async function build() {
  await W.loadFont('tech', 'fonts/EMSTech.json');
  const words = await (await fetch('voices/words.json')).json();
  const lines = await (await fetch('lines.json')).json();
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const at = (id, w, k = 0, which = 1) => {
    let n = 0; for (const x of words[id]) if (norm(x[0]).startsWith(norm(w)) && n++ === k) return VO[id] + x[which];
    throw new Error(`word ${w} not in ${id}`);
  };
  const atS = (id, w) => at(id, w, 0, 1), atE = (id, w) => at(id, w, 0, 2);

  const tl = new W.Timeline();
  const N = new W.Pen('navy', NAVY, { park: [2250, 1350] });
  const T = new W.Pen('teal', TEAL, { park: [2350, 1150] });
  const R = new W.Pen('red', RED, { park: [2150, 1450] });
  const PENS = [N, T, R];
  const D = (pen, shapes, a, b, o = {}) => tl.draw(pen, shapes, a, { by: b, ...o });
  const X = W.text;

  // ghosts of an old planning meeting, never fully wiped
  const ghosts = [], gR = mulberry(2024);
  for (let i = 0; i < 40; i++) {
    const x = gR() * 7600 + 200, y = gR() * 4100 + 200, k = gR();
    const o = { w: 12, alpha: .05 + gR() * .045, color: gR() < .2 ? '#8aa0c8' : '#9aa0a8' };
    if (k < .3) ghosts.push(...X(['Q3', 'mtg 4pm', 'SKU 12', 'ok!', 'Diwali?', 'v2', 'ship fri', 'reels', 'n = 40'][i % 9], x, y, { h: 50 + gR() * 40, ...o }));
    else if (k < .55) ghosts.push(W.circle(x, y, 40 + gR() * 110, o));
    else if (k < .8) ghosts.push(...W.arrow(x, y, x + (gR() - .5) * 500, y + (gR() - .5) * 300, o));
    else ghosts.push(W.line(x, y, x + 200 + gR() * 500, y + (gR() - .5) * 80, o));
  }

  // ═════════ HOOK: the magnet, the name, the tool (0–10)
  const DROP = .6;
  D(N, X('AALAYAM', C[0], 2420, { h: 150, w: 17, align: 'center' }), VO.v02 + .45, atE('v02', 'AALAYAM') + .25, { minGap: .03, maxGap: .08 });
  D(T, X('PESTEL', C[0], 1870, { h: 110, w: 13, align: 'center', spacing: 1.08 }), VO.v03 - .05, atE('v03', 'PESTEL') + .35, { minGap: .03, maxGap: .07 });
  D(N, X('six forces outside the brand', C[0], 2560, { h: 52, w: 7, align: 'center' }), atS('v03', 'six') - .05, atE('v03', 'brand') + .1, { minGap: .02, maxGap: .05 });

  // ═════════ SIX FORCES
  const REG = [
    { L: 'P', name: 'Political', ax: 450, ay: 850, vo: 'v04', icon: 'gov', line: [[3720, 2120], [3050, 1720], [2480, 1250]],
      lab: [['handloom support', 'handloom'], ['trade policy', 'trade'], ['sourcing', 'sourced', 1]] },
    { L: 'E', name: 'Economic', ax: 2950, ay: 650, vo: 'v05', icon: 'tag', line: [[4200, 2000], [4520, 1640], [4330, 1180]],
      lab: [['rising incomes', 'Incomes'], ['price-sensitive', 'price', 1], ['tax on clothing', 'tax']] },
    { L: 'S', name: 'Social', ax: 5550, ay: 850, vo: 'v06', icon: 'coord', line: [[4290, 2120], [4950, 1720], [5520, 1250]],
      lab: [['more women working', 'women'], ['comfort + Indian', 'comfort'], ['co-ords fit', 'Co', 1]] },
    { L: 'T', name: 'Technological', ax: 5550, ay: 3150, vo: 'v07', icon: 'phone', line: [[4380, 2400], [5000, 2820], [5520, 2960]],
      lab: [['Instagram + UPI', 'Instagram'], ['fast delivery', 'fast'], ['sell India-wide', 'sell', 1]] },
    { L: 'E', name: 'Environmental', ax: 2950, ay: 3350, vo: 'v08', icon: 'leaf', line: [[3580, 2420], [3420, 2850], [3650, 3060]],
      lab: [['where is it from?', 'where'], ['natural fibres', 'Natural', 1], ['less waste', 'waste']] },
    { L: 'L', name: 'Legal', ax: 450, ay: 3150, vo: 'v09', icon: 'scales', line: [[3620, 2400], [3000, 2820], [2480, 2960]],
      lab: [['consumer rules', 'Consumer'], ['clear returns', 'return'], ['data privacy', 'data', 1]] },
  ];
  const o9 = { w: 9 };
  const ICON = {
    gov: (x, y) => [W.poly([[x - 160, y - 70], [x, y - 175], [x + 160, y - 70], [x - 160, y - 70]], o9),
      ...[-110, -37, 37, 110].map(dx => W.line(x + dx, y - 45, x + dx, y + 120, o9)),
      W.line(x - 185, y + 150, x + 185, y + 150, o9), W.line(x - 160, y + 120, x + 160, y + 120, { w: 7 })],
    tag: (x, y) => [W.poly([[x - 170, y - 80], [x + 70, y - 80], [x + 175, y], [x + 70, y + 80], [x - 170, y + 80], [x - 170, y - 80]], o9),
      W.circle(x + 95, y, 16, { w: 7 }), W.curve([[x + 108, y - 10], [x + 170, y - 90], [x + 240, y - 120]], { w: 6 }),
      // a hand-made ₹: two bars, a bowl, a leg
      W.line(x - 125, y - 45, x - 10, y - 45, { w: 8 }), W.line(x - 125, y - 15, x - 10, y - 15, { w: 8 }),
      W.curve([[x - 120, y - 45], [x - 70, y - 45], [x - 45, y - 22], [x - 70, y + 2], [x - 122, y + 4]], { w: 8, smooth: 2 }),
      W.line(x - 120, y + 4, x - 50, y + 58, { w: 8 })],
    coord: (x, y) => [W.poly([[x - 60, y - 190], [x - 150, y - 160], [x - 190, y - 70], [x - 130, y - 55], [x - 110, y - 100], [x - 110, y + 10], [x + 110, y + 10], [x + 110, y - 100], [x + 130, y - 55], [x + 190, y - 70], [x + 150, y - 160], [x + 60, y - 190]], o9),
      W.curve([[x - 60, y - 190], [x, y - 140], [x + 60, y - 190]], { w: 8 }),
      W.poly([[x - 100, y + 40], [x + 100, y + 40], [x + 125, y + 260], [x + 25, y + 260], [x, y + 100], [x - 25, y + 260], [x - 125, y + 260], [x - 100, y + 40]], o9),
      ...[[-55, -110], [10, -70], [60, -120], [-30, -40], [45, -25]].map(([dx, dy]) => W.circle(x + dx, y + dy, 7, { w: 6 }))],
    phone: (x, y) => [W.roundRect(x - 100, y - 190, 200, 380, 34, o9), W.line(x - 25, y - 160, x + 25, y - 160, { w: 7 }),
      W.curve([[x, y + 40], [x - 60, y - 10], [x - 55, y - 60], [x - 15, y - 65], [x, y - 30]], { w: 8, smooth: 2 }),
      W.curve([[x, y - 30], [x + 15, y - 65], [x + 55, y - 60], [x + 60, y - 10], [x, y + 40]], { w: 8, smooth: 2 }),
      W.circle(x, y + 145, 16, { w: 6 })],
    leaf: (x, y) => [W.curve([[x - 150, y + 150], [x - 160, y - 20], [x - 20, y - 150], [x + 170, y - 170], [x + 130, y + 10], [x + 10, y + 140], [x - 150, y + 150]], { w: 9, smooth: 2 }),
      W.curve([[x - 190, y + 200], [x - 60, y + 40], [x + 140, y - 140]], { w: 7 }),
      ...[[-60, 40, -90, -40], [-10, -10, -20, -90], [30, -50, 40, -130], [-30, 10, 30, 70], [20, -40, 90, 10]].map(([a, b, c, d]) => W.line(x + a, y + b, x + c, y + d, { w: 6 }))],
    scales: (x, y) => {
      const pan = (px) => [W.line(px, y - 120, px - 45, y + 10, { w: 6 }), W.line(px, y - 120, px + 45, y + 10, { w: 6 }), W.arc(px, y + 10, 62, 0, Math.PI, { w: 8 })];
      return [W.line(x, y - 190, x, y + 160, o9), W.line(x - 100, y + 165, x + 100, y + 165, o9), W.line(x - 170, y - 125, x + 170, y - 115, o9), ...pan(x - 160), ...pan(x + 160), W.circle(x, y - 195, 14, { w: 7 })];
    },
  };

  const REGT = [];                                             // per section: framing + times, for camera and cues
  REG.forEach((g, k) => {
    const s = SK[k], vo = g.vo;
    D(T, W.curve(g.line, { w: 10, over: 10 }), s + .45, s + 1.3, { travel: 6000 });
    const letter = X(g.L, g.ax, g.ay, { h: 220, w: 22 });
    D(T, letter, s + 1.35, s + 1.85);
    const hx = g.ax + letter.width + 50;
    const head = X(g.name, hx, g.ay, { h: 110, w: 12 });
    const hEnd = Math.max(s + 2.1, atE(vo, g.name.slice(0, 5)) + .1);
    D(N, head, s + 1.35, hEnd, { minGap: .02, maxGap: .06 });
    const ic = ICON[g.icon](g.ax + 1700, g.ay + 60);
    // labels, each finishing on its keyword
    const labs = g.lab.map(([txt, kw, red], i) => {
      const y = g.ay + 200 + i * 105, pen = red ? R : N;
      const sh = [W.line(g.ax + 40, y - 24, g.ax + 85, y - 26, { w: 7 }), ...X(txt, g.ax + 115, y, { h: 62, w: 8 })];
      const t0 = Math.max(atS(vo, kw) - .15, hEnd + .05);
      return { pen, sh, t0, t1: t0 + clamp(txt.length * .045, .55, .95) };
    });
    // the icon goes in the first free navy gap of a second or more, else after the last navy label
    let icT = hEnd + .08; const navy = labs.filter(l => l.pen === N);
    for (const l of navy) { if (l.t0 - icT >= 1.0) break; icT = Math.max(icT, l.t1 + .08); }
    const icEnd = Math.min(icT + 1.1, s + SEC - .4);
    [...labs, { pen: N, sh: ic, t0: icT, t1: icEnd }].sort((p, q) => p.t0 - q.t0).forEach(l => D(l.pen, l.sh, l.t0, l.t1, { minGap: .02, maxGap: .05 }));
    tl.cue(s, 'section', { k });
    REGT.push({ cx: g.ax + 960, cy: g.ay + 95, s });
  });

  // ═════════ FINALE: arrows into the brand, the whole board, the circle
  const heads = REG.map(g => {                                  // arrowhead at the brand end of each line
    const [a, b] = g.line, dx = a[0] - b[0], dy = a[1] - b[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l, L = 60;
    return [W.line(a[0] - ux * L + uy * L * .6, a[1] - uy * L - ux * L * .6, a[0], a[1], { w: 10 }), W.line(a[0], a[1], a[0] - ux * L - uy * L * .6, a[1] - uy * L + ux * L * .6, { w: 10 })];
  });
  heads.forEach((h, i) => { const t = FIN + .1 + i * BEAT * .5; D(T, h, t, t + .22, { minGap: .02, maxGap: .04 }); });
  const CIRC0 = FIN + 8.1;
  D(R, W.circle(C[0], 2310, 760, { w: 14, ry: 420, a0: -2.5, lap: TAU + .35 }), CIRC0, CIRC0 + 1.5);
  D(N, X("designing for what's next", C[0], 2850, { h: 70, w: 9, align: 'center' }), atS('v11', 'design') - .1, atE('v11', 'next') + .4, { minGap: .02, maxGap: .05 });
  const CAPON = FIN + 12.0;
  tl.cue(.3, 'cap'); tl.cue(CAPON, 'capOn');
  tl.end();

  // ───────── the brand magnet: drops at the start, lifts and lands again on the finale downbeat
  const LIFT0 = FIN - .45;
  const magPose = t => {
    if (t < DROP - .3) return null;
    if (t < DROP) { const u = (t - DROP + .3) / .3; return { lift: 1 - u * u, y: -(1 - u) * 70 }; }
    if (t < LIFT0) return { lift: 0, y: 0 };
    if (t < FIN) { const u = (t - LIFT0) / (FIN - LIFT0), e = Math.sin(Math.PI * u); return { lift: e * .8, y: -e * 40 }; }
    return { lift: 0, y: 0 };
  };
  tl.cue(DROP, 'magnet'); tl.cue(LIFT0, 'magnetOff'); tl.cue(FIN, 'magnet', { big: 1 });
  function drawDisc(ctx, c, p) {
    const [sx, sy] = W.toScreen(c, C[0], C[1] + p.y), s = c.z, r = 125 * s, up = p.lift * 40 * s;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.save(); ctx.filter = `blur(${(8 + p.lift * 16) * s}px)`; ctx.fillStyle = `rgba(60,25,25,${.38 - p.lift * .16})`;
    ctx.beginPath(); ctx.ellipse(sx + (10 + up * .7), sy + (14 + up), r, r, 0, 0, TAU); ctx.fill(); ctx.restore();
    const y = sy - up, k = 1 + p.lift * .07;
    const g = ctx.createRadialGradient(sx - r * .35, y - r * .4, r * .08, sx, y, r * k);
    g.addColorStop(0, '#f39a92'); g.addColorStop(.45, RED); g.addColorStop(1, '#7e1c1f');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, y, r * k, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(sx, y, r * k * .72, 0, TAU); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(sx - r * .42, y - r * .48, r * .2, r * .09, -.7, 0, TAU); ctx.fill();
  }

  // ───────── camera (t, x, y, zoom, roll, ease)
  const keys = [[0, C[0], 2190, 2.3], [1.0, C[0], 2190, 2.22, 0, 's'], [5.4, C[0], 2300, 1.05, 0, 'io'], [6.1, C[0], 2250, 1.0, 0, 'l'], [S0, C[0], 2230, .95, 0, 'l']];
  REGT.forEach(({ cx, cy, s }, k) => {
    const mid = [lerp(C[0], cx, .35), lerp(C[1] + 80, cy, .35)];
    if (k > 0) keys.push([s + .55, mid[0], mid[1], .62, 0, 'io']);          // back towards the brand, where every journey starts
    keys.push([s + 1.55, cx, cy, .9, 0, 'io']);                              // ride the line out to the region
    keys.push([s + SEC - (k === 5 ? 0 : .02), cx + (k % 2 ? -25 : 25), cy + 10, .95, 0, 'l']);   // slow push while it fills
  });
  keys.push([FIN - .7, REGT[5].cx + 20, REGT[5].cy + 10, .955, 0, 'l']);        // hold in the silence
  keys.push([FIN - .12, C[0], 2290, 1.0, 0, 'io']);                           // whip back to the brand
  keys.push([FIN + 1.3, C[0], 2290, 1.0, 0, 'l']);
  keys.push([FIN + 4.4, C[0], 2290, .205, 0, 'io']);                          // the whole board, on the wall
  keys.push([FIN + 6.3, C[0], 2290, .2, 0, 'l']);
  keys.push([FIN + 8.0, C[0], 2420, .9, 0, 'io']);                           // back to the brand
  keys.push([END, C[0], 2430, .94, 0, 'l']);
  const cam = new W.Camera(keys);

  const board = new W.Board(tl, { ghosts });
  board.objs.push({ draw: (ctx, t, c) => { const p = magPose(t); if (p) drawDisc(ctx, c, p); } });
  if (!new URLSearchParams(location.search).has('nopens')) board.objs.push({ draw: (ctx, t, c) => { for (const p of PENS) W.drawMarker(ctx, p, W.penPose(p, t, cam), c, t); } });

  // ───────── subtitles: clause by clause from the word timings, written with the on-screen spelling
  const subs = [];
  for (const L of lines) {
    const ws = words[L.id], t0 = VO[L.id], text = L.sub;
    const parts = text.match(/[^,.:?]+[,.:?]*\s*/g).reduce((acc, p) => {
      const last = acc[acc.length - 1];
      if (last != null && ((last + p).trim().length <= 44 || ((last.trim().length < 22 || p.trim().length < 22) && (last + p).trim().length <= 80))) acc[acc.length - 1] += p; else acc.push(p); return acc; }, []);
    let wi = 0;
    for (const p of parts) {
      const n = p.trim().split(/\s+/).length, a = ws[wi], b = ws[Math.min(ws.length - 1, wi + n - 1)]; wi += n;
      subs.push({ t0: t0 + a[1] - .05, t1: t0 + b[2] + .4, text: p.trim() });
    }
  }
  for (let i = 0; i < subs.length; i++) {
    const nx = subs[i + 1] ? subs[i + 1].t0 - .04 : 1e9;
    subs[i].t1 = Math.min(Math.max(subs[i].t1, subs[i].t0 + 1.8), nx);
  }
  board.overlays.push({
    draw: (ctx, t) => {
      const s = subs.find(s => t >= s.t0 && t < s.t1); if (!s) return;
      const a = Math.min(1, (t - s.t0) / .12, (s.t1 - t) / .12);
      ctx.font = '44px AD';
      let rows = [s.text];
      if (ctx.measureText(s.text).width > 1250) {
        const ws = s.text.split(' '); let best = 1, bd = 1e9;
        for (let i = 1; i < ws.length; i++) { const d = Math.abs(ctx.measureText(ws.slice(0, i).join(' ')).width - ctx.measureText(ws.slice(i).join(' ')).width); if (d < bd) { bd = d; best = i; } }
        rows = [ws.slice(0, best).join(' '), ws.slice(best).join(' ')];
      }
      const w = Math.max(...rows.map(r => ctx.measureText(r).width)) + 64, h = 70 + (rows.length - 1) * 52, y0 = 1040 - h;
      ctx.globalAlpha = a * .9; ctx.fillStyle = '#fdfcf8'; ctx.shadowColor = 'rgba(30,30,40,.18)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 4;
      ctx.beginPath(); ctx.roundRect(960 - w / 2, y0, w, h, 14); ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.globalAlpha = a;
      ctx.fillStyle = RED; ctx.fillRect(960 - w / 2 + 22, y0 + h - 12, 36, 4);
      ctx.fillStyle = NAVY; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      rows.forEach((r, i) => ctx.fillText(r, 960, y0 + 37 + i * 52));
    }
  });
  if (new URLSearchParams(location.search).has('nosubs')) board.overlays.length = 0;

  // ───────── frame render with motion blur on fast moves
  const off = new OffscreenCanvas(1920, 1080), oc = off.getContext('2d');
  function render(ctx, t) {
    const dt = 1 / 24, a = cam.at(t), b = cam.at(Math.max(0, t - dt));
    const sp = Math.hypot((a.x - b.x) * a.z, (a.y - b.y) * a.z) + Math.abs(Math.log(a.z / b.z)) * 900;
    const n = sp > 14 ? Math.min(12, Math.ceil(sp * .5 / 4)) : 1;
    if (n === 1) { board.render(ctx, t, cam); return; }
    const ov = board.overlays; board.overlays = [];
    for (let i = 0; i < n; i++) { board.render(oc, t - dt * .5 * i / (n - 1), cam); ctx.globalAlpha = 1 / (i + 1); ctx.drawImage(off, 0, 0); }
    ctx.globalAlpha = 1; board.overlays = ov;
    for (const o of ov) { ctx.save(); o.draw(ctx, t); ctx.restore(); }
  }

  const ev = [...tl.ev, ...Object.entries(VO).map(([id, t]) => ({ t, type: 'vo', id }))].sort((a, b) => a.t - b.t);
  for (const e of ev) if (e.x != null) { const c = cam.at(e.t), [px, py] = W.toScreen(c, e.x, e.y); e.pan = +clamp((px - 960) / 1400, -.7, .7).toFixed(2); e.z = +c.z.toFixed(2); e.on = px > -100 && px < 2020 && py > -100 && py < 1180 ? 1 : 0; }
  return { dur: END, render, ev, subs, cues: { BPM, BEAT, BAR, S0, SEC, SK, SIL, FIN, DROP, LIFT0, CIRC0, CAPON } };
}
