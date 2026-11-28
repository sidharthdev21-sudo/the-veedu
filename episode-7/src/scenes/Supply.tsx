import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, DrawPath, Heading, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { SUPPLIER_STAGES, CRITERIA, ILL_SUPPLIERS, wScore, COST, costModel, LOOP, ENTITIES, coords, SIZES, PROMISE, fullPromise } from '../data';
import { C, alpha } from '../theme';
import { StatusChip, Stamp } from './Journey';

// A stylised outline of India (not to scale), in a 560 × 640 box.
const INDIA: [number, number][] = [[0.38, 0], [0.47, 0.04], [0.5, 0.12], [0.58, 0.19], [0.72, 0.26], [0.86, 0.27], [0.98, 0.3], [1, 0.36], [0.9, 0.4], [0.82, 0.38], [0.77, 0.45], [0.68, 0.52], [0.6, 0.6], [0.55, 0.7], [0.49, 0.84], [0.43, 1], [0.37, 0.9], [0.32, 0.76], [0.28, 0.62], [0.22, 0.54], [0.1, 0.5], [0.02, 0.44], [0.1, 0.38], [0.2, 0.31], [0.24, 0.22], [0.3, 0.12]];
const MX = 140, MY = 260, MW = 560, MH = 640;
const P = (x: number, y: number) => [MX + x * MW, MY + y * MH] as const;
const KOCHI = P(0.4, 0.93);
const PINS = [P(0.22, 0.36), P(0.33, 0.27), P(0.4, 0.1), P(0.66, 0.43), P(0.46, 0.72)];

// ─── 4 · The sourcing journey
export const Sourcing: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, lc, l1, l2, l3] = lines;
  const out = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  const covOut = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const co = coords();
  const outline = 'M' + INDIA.map(([x, y]) => P(x, y).join(' ')).join(' L') + ' Z';
  const w = CRITERIA.map((c) => c.w);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="The sourcing journey" title="Can Aalayam source the right garments?" color={C.lime} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <DrawPath d={outline} a={l0.from} b={l0.from + 60} color={alpha(C.cyan, 0.7)} width={3} />
        {PINS.map(([x, y], i) => (
          <React.Fragment key={i}>
            <DrawPath d={`M${KOCHI[0]} ${KOCHI[1]} Q ${(KOCHI[0] + x) / 2 + 80} ${(KOCHI[1] + y) / 2} ${x} ${y}`} a={wordAt(l0, 'travelled') + i * 10} b={wordAt(l0, 'travelled') + i * 10 + 40} color={alpha(C.lime, 0.6)} width={2} dashed />
            <Pop at={wordAt(l0, 'travelled') + i * 10 + 30} style={{ left: x - 16, top: y - 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, border: `3px solid ${C.lime}`, background: C.bg, display: 'grid', placeItems: 'center', color: C.lime, fontWeight: 700, fontSize: 18 }}>?</div>
            </Pop>
          </React.Fragment>
        ))}
        <Pop at={l0.from + 40} style={{ left: KOCHI[0] - 14, top: KOCHI[1] - 14 }}><div style={{ width: 28, height: 28, borderRadius: 14, background: C.cyan, boxShadow: `0 0 20px ${C.cyan}` }} /></Pop>
        <Reveal at={l0.from + 46} style={{ left: KOCHI[0] + 26, top: KOCHI[1] - 18 }}><div className="head" style={{ fontSize: 26, color: C.cyan }}>Kochi · base</div></Reveal>
        <Reveal at={wordAt(l0, 'travelled') + 80} style={{ left: 110, top: 940 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><StatusChip s="unquantified" /><span className="muted" style={{ fontSize: 20 }}>Stylised map · cities visited to be confirmed · no supplier names shown</span></div>
        </Reveal>
        <div style={{ position: 'absolute', left: 900, top: 250, width: 910, opacity: covOut }}>
          <Reveal at={lc.from - 4} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><div className="head" style={{ fontSize: 34 }}>A sourcing signal in the catalogue</div><StatusChip s="actual" size={14} /></div>
            <div className="muted" style={{ fontSize: 21, marginTop: 6 }}>Co-ord sizes listed · promise = L to 3XL (highlighted)</div>
          </Reveal>
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', gap: 8, marginLeft: 330 }}>{SIZES.map((z) => <div key={z} className="head" style={{ width: 92, textAlign: 'center', fontSize: 20, color: PROMISE.includes(z) ? C.lime : C.grey }}>{z}</div>)}</div>
            {co.map((c, i) => {
              const full = fullPromise(c), one = c.sizes.length === 1;
              return (
                <Reveal key={c.t} at={lc.from + 20 + i * 8} dir="left" style={{ position: 'relative', marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 322, fontSize: 21, fontWeight: full ? 700 : 500, color: full ? C.green : C.text, whiteSpace: 'nowrap' }}>{c.t}</div>
                    {SIZES.map((z) => { const has = c.sizes.includes(z); return <div key={z} style={{ width: 92, height: 34, borderRadius: 8, background: has ? alpha(PROMISE.includes(z) ? C.lime : C.grey, 0.75) : alpha(C.text, 0.04), border: `1px solid ${PROMISE.includes(z) ? alpha(C.lime, 0.3) : C.line}` }} />; })}
                    {full && <span className="badge" style={{ fontSize: 13, color: C.green, border: `1.5px solid ${C.green}` }}>FULL</span>}
                    {one && <span className="badge" style={{ fontSize: 13, color: C.violet, border: `1.5px dashed ${C.violet}` }}>1 SIZE</span>}
                  </div>
                </Reveal>
              );
            })}
            <Reveal at={wordAt(lc, 'only two')} style={{ position: 'relative', marginTop: 20 }}>
              <div style={{ fontSize: 26 }}><b style={{ color: C.green }}>{co.filter(fullPromise).length} of {co.length}</b> cover all of L–3XL · <b style={{ color: C.violet }}>{co.filter((c) => c.sizes.length === 1).length}</b> listed in one size</div>
              <div className="muted" style={{ fontSize: 19, marginTop: 6 }}>Possible small ready-made lots: a hypothesis, to be confirmed by the owner</div>
            </Reveal>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 900, top: 250, width: 910, opacity: 1 - covOut }}>
          <Reveal at={l1.from - 4} style={{ position: 'relative' }}><div className="head" style={{ fontSize: 36 }}>Finding a supplier <span style={{ color: C.lime }}>isn’t validating one</span></div></Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 26 }}>
            {SUPPLIER_STAGES.map((s, i) => (
              <Reveal key={s} at={l1.from + 60 + i * 26} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div className="head" style={{ width: 54, height: 54, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 26, color: C.bg, background: interpolate(i, [0, 6], [0, 1]) > 0.5 ? C.lime : C.cyan, opacity: 1 - i * 0.07 }}>{i + 1}</div>
                  <div className="card" style={{ position: 'relative', padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 700, whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 28 }}>{s}</span><span className="muted" style={{ fontSize: 20 }}>count: –</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="card" style={{ left: 110, top: 240, width: 820, padding: '24px 30px', borderColor: alpha(C.cyan, 0.4) }}>
          <div className="eyebrow" style={{ fontSize: 20 }}>Weighted supplier scorecard · 1–5 · weights = 100%</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 18 }}>
            {CRITERIA.map((c, i) => (
              <Reveal key={c.c} at={l2.from + 30 + i * 9} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 300, fontSize: 25, fontWeight: c.gate ? 700 : 500, color: c.gate ? C.lime : C.text }}>{c.c}</span>
                  <div style={{ width: 340, height: 18, borderRadius: 9, background: alpha(C.text, 0.06) }}><div style={{ width: 340 * c.w / 20, height: 18, borderRadius: 9, background: c.gate ? C.lime : alpha(C.cyan, 0.7) }} /></div>
                  <span className="head" style={{ fontSize: 24 }}>{c.w}%</span>
                  {c.gate && <span className="badge" style={{ fontSize: 14, color: C.bg, background: C.lime }}>GATE</span>}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal at={wordAt(l2, 'gate')} style={{ position: 'relative', marginTop: 18 }}><div style={{ fontSize: 22 }}>Score 1 on L–3XL or quality → <b style={{ color: C.violet }}>rejected</b>, however cheap</div></Reveal>
        </div>
        <div style={{ position: 'absolute', left: 980, top: 240, width: 830, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Reveal at={l3.from - 4} style={{ position: 'relative' }}><StatusChip s="illustrative" size={18} /></Reveal>
          {ILL_SUPPLIERS.map((s, i) => {
            const sc = wScore(s.s, w), fail = s.s[3] <= 1, c = fail ? C.violet : C.green;
            return (
              <Pop key={s.id} at={l3.from + 20 + i * 40} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', padding: 28, height: 300, borderColor: alpha(c, 0.7) }}>
                  <div className="head" style={{ fontSize: 36 }}>{s.id}</div>
                  <div className="muted" style={{ fontSize: 24, marginTop: 4 }}>{s.d}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 24 }}>
                    <span className="head" style={{ fontSize: 72, color: fail ? C.grey : C.green }}>{sc.toFixed(2)}</span><span className="muted" style={{ fontSize: 24 }}>weighted score</span>
                  </div>
                  <div className="head" style={{ fontSize: 30, color: c, marginTop: 8 }}>{fail ? '✕ Fails the L–3XL gate → rejected' : '✓ Passes → request samples'}</div>
                </div>
              </Pop>
            );
          })}
          <Reveal at={wordAt(l3, "haven't been")} style={{ position: 'relative' }}><div className="muted" style={{ fontSize: 22 }}>Real trip quotes not yet recorded · no real supplier is scored</div></Reveal>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 5 · Unit economics (illustrative)
export const Economics: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const m = costModel();
  const bars: { t: string; v: number; kind: 'total' | 'minus' }[] = [
    { t: 'Price (actual)', v: COST.price, kind: 'total' }, { t: 'GST 5%', v: COST.price - m.net, kind: 'minus' }, { t: 'Net', v: m.net, kind: 'total' },
    { t: 'Garment', v: COST.garment, kind: 'minus' }, { t: 'Packaging', v: COST.packaging, kind: 'minus' }, { t: 'Shipping', v: COST.shipping, kind: 'minus' },
    { t: 'Fees 2%', v: m.fee, kind: 'minus' }, { t: 'Returns', v: m.ret, kind: 'minus' }, { t: 'Left', v: m.contrib, kind: 'total' },
  ];
  const Y0 = 880, SC = 520 / COST.price;
  let level = 0;
  const geo = bars.map((b) => { if (b.kind === 'total') { level = b.v; return { top: level, bot: 0 }; } const g = { top: level, bot: level - b.v }; level -= b.v; return g; });
  const rs = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Heading step="Commercial feasibility" title="Do the numbers work?" color={C.lime} />
      <Reveal at={l0.from + 30} style={{ right: 110, top: 100 }}><StatusChip s="illustrative" size={20} /></Reveal>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <line x1={110} x2={1290} y1={Y0} y2={Y0} stroke={C.line} strokeWidth={2} />
      </svg>
      {bars.map((b, i) => {
        const at = l1.from + i * 22, p = interpolate(f, [at, at + 16], [0, 1], clamp), g = geo[i];
        const x = 120 + i * 130, h = (g.top - g.bot) * SC, c = b.kind === 'total' ? (i === 8 ? C.lime : C.cyan) : C.violet;
        return (
          <div key={b.t} style={{ position: 'absolute', left: x, top: Y0 - g.top * SC, width: 104, height: h * p, background: alpha(c, b.kind === 'total' ? 0.85 : 0.55), borderRadius: 8, opacity: p, boxShadow: i === 8 ? `0 0 30px ${alpha(C.lime, 0.4)}` : 'none' }}>
            <div className="head" style={{ position: 'absolute', top: -38, width: 104, textAlign: 'center', fontSize: 22, color: c }}>{b.kind === 'minus' ? '−' : ''}{rs(b.v)}</div>
          </div>
        );
      })}
      {bars.map((b, i) => <Reveal key={b.t} at={l1.from + i * 22} style={{ left: 120 + i * 130, top: Y0 + 14, width: 104, textAlign: 'center' }}><div style={{ fontSize: 19, lineHeight: 1.15 }}>{b.t}</div></Reveal>)}
      <Reveal at={wordAt(l1, 'about a third')} style={{ left: 120, top: 965 }}>
        <div style={{ fontSize: 24 }}>Contribution = {rs(m.contrib)} ÷ {rs(m.net)} ≈ <b style={{ color: C.lime }}>{Math.floor(m.margin)}%</b> · returns allowance = {COST.returnRate}% × {rs(COST.twoWayShip)} two-way shipping</div>
      </Reveal>
      <Pop at={l2.from} style={{ left: 1350, top: 250, width: 460 }}>
        <div className="card" style={{ position: 'relative', padding: 28, borderColor: alpha(C.lime, 0.7), boxShadow: `0 0 40px ${alpha(C.lime, 0.15)}` }}>
          <div className="eyebrow" style={{ color: C.lime, fontSize: 18 }}>Maximum garment cost</div>
          <div className="head" style={{ fontSize: 72, marginTop: 6 }}>≈ {rs(Math.round(m.breakEven / 10) * 10)}</div>
          <div style={{ fontSize: 23, marginTop: 6, lineHeight: 1.35 }}>for a {COST.targetMargin}% margin at {rs(COST.price)}</div>
          <div className="muted" style={{ fontSize: 18, marginTop: 10, fontFamily: 'monospace' }}>net × (1 − 35%) − other costs</div>
        </div>
      </Pop>
      <Pop at={l3.from} style={{ left: 1350, top: 590, width: 460 }}>
        <div className="card" style={{ position: 'relative', padding: 28, borderColor: alpha(C.violet, 0.7) }}>
          <div className="eyebrow" style={{ color: C.violet, fontSize: 18 }}>Cash tied up per style</div>
          <div className="head" style={{ fontSize: 64, marginTop: 6 }}>{rs(m.cash)}</div>
          <div style={{ fontSize: 23, marginTop: 6 }}>{COST.moq} units × {rs(COST.garment)} · across L, XL, 2XL, 3XL</div>
          <div className="muted" style={{ fontSize: 19, marginTop: 10 }}>Must sell before the next order</div>
        </div>
      </Pop>
      <Reveal at={l0.from + 40} style={{ left: 110, top: 220 }}><div className="muted" style={{ fontSize: 22 }}>Price ₹1,200 = actual median co-ord price (store catalogue) · every cost below is illustrative, a placeholder for a real quote</div></Reveal>
    </AbsoluteFill>
  );
};

// ─── 6 · Connecting the business
export const Connect: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  const cx = 960, cy = 610, R = 320;
  const pos = LOOP.map((_, i) => { const a = -Math.PI / 2 + (i / LOOP.length) * Math.PI * 2; return [cx + R * 1.45 * Math.cos(a), cy + R * Math.sin(a)]; });
  const spin = interpolate(f, [l1.from, l1.from + 240], [0, 1], clamp);
  const cols = [C.violet, C.lime, C.cyan, C.green, C.cyan, C.violet, C.lime];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Connecting the business" title="One loop, not three activities" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          <ellipse cx={cx} cy={cy} rx={R * 1.45} ry={R} fill="none" stroke={alpha(C.cyan, 0.25)} strokeWidth={3} strokeDasharray="10 12" />
          <circle cx={cx + R * 1.45 * Math.cos(-Math.PI / 2 + spin * Math.PI * 2)} cy={cy + R * Math.sin(-Math.PI / 2 + spin * Math.PI * 2)} r={12} fill={C.lime} style={{ filter: `drop-shadow(0 0 12px ${C.lime})` }} opacity={spin > 0 && spin < 1 ? 1 : 0} />
        </svg>
        {LOOP.map((t, i) => (
          <Pop key={t} at={l1.from + Math.round(i * 34)} style={{ left: pos[i][0] - 160, top: pos[i][1] - 42 }}>
            <div className="card" style={{ position: 'relative', width: 320, height: 84, display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', borderColor: alpha(cols[i], 0.7) }}>
              <div className="head" style={{ width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 22, color: C.bg, background: cols[i], flex: 'none' }}>{i + 1}</div>
              <span className="head" style={{ fontSize: 26 }}>{t}</span>
            </div>
          </Pop>
        ))}
        <Reveal at={l0.from + 6} style={{ left: cx - 300, top: cy - 30, width: 600, textAlign: 'center' }}><div className="head" style={{ fontSize: 40, color: C.grey }}>Aalayam’s operating loop</div></Reveal>
      </div>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 236 }}>One data model · five tables · shared keys</div>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          {[0, 1, 2, 3].map((i) => <line key={i} x1={110 + i * 345 + 310} y1={430} x2={110 + (i + 1) * 345} y2={430} stroke={C.cyan} strokeWidth={3} opacity={useLit(l2.from + 40 + i * 20)} />)}
        </svg>
        {ENTITIES.map((e, i) => (
          <Pop key={e.t} at={l2.from + 10 + i * 20} style={{ left: 110 + i * 345, top: 300 }}>
            <div className="card" style={{ position: 'relative', width: 310, height: 260, padding: 24, borderColor: alpha(C.cyan, 0.5) }}>
              <div className="head" style={{ fontSize: 36 }}>{e.t}</div>
              <div className="badge" style={{ marginTop: 14, fontSize: 18, color: C.lime, border: `1.5px solid ${alpha(C.lime, 0.6)}`, fontFamily: 'monospace' }}>key: {e.k}</div>
              <div className="muted" style={{ fontSize: 22, marginTop: 16, lineHeight: 1.35 }}>{e.f}</div>
            </div>
          </Pop>
        ))}
        <Reveal at={l2.from + 120} style={{ left: 110, top: 590 }}><div className="muted" style={{ fontSize: 22 }}>Templates ready: content_log · enquiries · shopify_daily · products · suppliers (CSV, spreadsheet-ready)</div></Reveal>
        <div style={{ position: 'absolute', left: 110, top: 780, display: 'flex', gap: 22 }}>
          {['Designing without demand', 'Sourcing without margins', 'Launching without learning'].map((t, i) => (
            <Pop key={t} at={wordAt(l3, ['designs', 'sources', 'launches'][i])} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 552, padding: '26px 30px', borderColor: alpha(C.violet, 0.6), display: 'flex', alignItems: 'center', gap: 18 }}>
                <span className="head" style={{ fontSize: 40, color: C.violet }}>✕</span><span className="head" style={{ fontSize: 30 }}>{t}</span>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={l3.from - 4} style={{ left: 110, top: 670 }}><Stamp text="Without the loop" color={C.violet} size={28} /></Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
