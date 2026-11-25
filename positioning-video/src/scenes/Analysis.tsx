import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, Line, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Axes, EvidenceChip, HypothesisBanner, MapPoint, PLOT, ProposedRing, Zone, priceX, valX, valY } from '../components/Positioning';
import { AALAYAM_MAP2, AALAYAM_PRICE, MAP1, MAP2, MATRIX } from '../data';
import { C, alpha } from '../theme';

// ─── Competitor matrix
export const Matrix: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const cols = [['Brand', 250], ['Categories', 320], ['Observed price', 300], ['% off MRP', 210], ['Note', 520]] as const;
  const rowAt = (i: number) => (i < 4 ? wordAt(l1, MATRIX[i].brand) : i === 4 ? wordAt(l1, 'unbranded') : l3.from + (i - 5) * 10);
  const offLit = interpolate(f, [l2.from - 4, l2.from + 14], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="Research" title="The competitor matrix" />
      <Reveal at={l0.from} style={{ left: 110, top: 230, width: 1700 }}>
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '18px 30px', background: alpha(C.text, 0.04), fontSize: 20, fontWeight: 600, letterSpacing: '0.1em', color: C.grey }}>
            {cols.map(([t, w]) => <div key={t} style={{ width: w, color: t === '% off MRP' && offLit > 0.5 ? C.lime : C.grey }}>{t.toUpperCase()}</div>)}
          </div>
          {MATRIX.map((r, i) => {
            const p = interpolate(f, [rowAt(i), rowAt(i) + 10], [0, 1], clamp), unk = r.price.startsWith('Couldn');
            return (
              <div key={r.brand} style={{ display: 'flex', alignItems: 'center', padding: '18px 30px', borderTop: `1px solid ${C.line}`, fontSize: 28, opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>
                <div style={{ width: 250, fontWeight: 600 }}>{r.brand}</div>
                <div style={{ width: 320 }} className="muted">{r.cats}</div>
                <div style={{ width: 300, color: unk ? C.grey : C.cyan, fontWeight: 600, fontStyle: unk ? 'italic' : 'normal' }}>{r.price}</div>
                <div style={{ width: 210, fontWeight: 600, color: r.off === '—' ? C.grey : C.lime, opacity: r.off === '—' ? 1 : 0.35 + 0.65 * offLit }}>{r.off}</div>
                <div style={{ width: 520, fontSize: 24 }} className="muted">{r.note}</div>
              </div>
            );
          })}
        </div>
      </Reveal>
      <Reveal at={l1.from + 4} style={{ left: 110, top: 960 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 22 }} className="muted"><EvidenceChip kind="observed" />Single listings seen on 24 Nov 2026, not full price ranges. Branded listings: 26–69% off.</div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── Map 1: price × design
const TICKS1 = [500, 1000, 2000, 4000, 8000].map((p) => ({ x: priceX(p), label: `₹${p.toLocaleString('en-IN')}` }));
export const Map1: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const draw = interpolate(f, [l0.from, l0.from + 30], [0, 1], clamp);
  const lift = interpolate(f, [wordAt(l2, 'stand out'), wordAt(l2, 'stand out') + 30], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  const banner = 1 + 0.08 * interpolate(f, [l3.from, l3.from + 10, l3.from + 40], [0, 1, 0], clamp);
  const aY = valY(42 + 24 * lift);
  const dots = MAP1.map((b, i) => ({ ...b, at: b.name.startsWith('Suta') ? wordAt(l1, 'Suta') : l0.from + 30 + i * 6 }));
  const off: Record<string, [number, number]> = { 'Juniper': [-120, -18], 'Libas': [22, 34], 'Pink Fort': [18, -12], 'Janasya': [-40, 42], 'Unbranded': [18, 40] };
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Tool 2 · Map 1" title="Price × design" />
      <div style={{ position: 'absolute', right: 110, top: 104, transform: `scale(${banner})`, transformOrigin: 'right center' }}><Reveal at={l0.from + 10} style={{ position: 'relative' }}><HypothesisBanner /></Reveal></div>
      <Axes draw={draw} ticks={TICKS1} xLabel="Price · affordable → premium (observed listings, log scale)" yLabel="Basic → design-led" />
      <Zone x={priceX(1000) - 10} y={valY(68)} w={priceX(2000) - priceX(1000) + 30} h={valY(26) - valY(68)} color={C.cyan} label="crowded · discount-led" at={wordAt(l1, 'crowded')} />
      {dots.map((b) => {
        const [dx, dy] = off[b.name] ?? [18, 8];
        return <MapPoint key={b.name} x={priceX(b.range[0])} x2={b.range[1] !== b.range[0] ? priceX(b.range[1]) : undefined} y={valY(b.y)} label={b.name} at={b.at} color={b.name.startsWith('Suta') || b.name.startsWith('Fab') ? C.violet : C.cyan} labelDx={dx} labelDy={dy} />;
      })}
      <ProposedRing x={(priceX(AALAYAM_PRICE[0]) + priceX(AALAYAM_PRICE[1])) / 2} y={aY} x0={priceX(AALAYAM_PRICE[0])} x1={priceX(AALAYAM_PRICE[1])} at={l2.from} labelDx={-260} labelDy={-26} />
      <Pop at={wordAt(l2, 'stand out') + 20} style={{ left: priceX(420), top: valY(86) - 30 }}>
        <div className="chip" style={{ fontSize: 24, color: C.violet, borderColor: alpha(C.violet, 0.6) }}>↑ needs a stronger design signature</div>
      </Pop>
      <div className="muted" style={{ position: 'absolute', left: PLOT.x0, top: 1030, fontSize: 18 }}>*Fabindia: lehenga-set listing, not a co-ord. Bunaai and Mulmul left off: no confirmed rupee price.</div>
    </AbsoluteFill>
  );
};

// ─── Map 2: reach × comfort
export const Map2: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out1 = interpolate(f, [l1.from - 8, l1.from], [1, 0], clamp);
  const draw = interpolate(f, [l1.from, l1.from + 30], [0, 1], clamp);
  const move = interpolate(f, [wordAt(l3, 'gap'), wordAt(l3, 'gap') + 30], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Heading step="Tool 2 · Map 2" title="Reach × comfort" />
      {/* why a second map: comfort is hidden by price × design */}
      <Reveal at={l0.from} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080, opacity: out1 }}>
        <div style={{ position: 'absolute', left: 0, top: 360, width: 1920, textAlign: 'center' }}>
          <div className="muted" style={{ fontSize: 34 }}>Price × design hides Aalayam's core promise</div>
          <Pop at={wordAt(l0, 'comfort')} style={{ position: 'relative', marginTop: 30 }}><span className="head" style={{ fontSize: 120, color: C.lime, textShadow: `0 0 40px ${alpha(C.lime, 0.5)}` }}>Comfort</span></Pop>
        </div>
      </Reveal>
      <div style={{ opacity: draw }}>
        <div style={{ position: 'absolute', right: 110, top: 104 }}><HypothesisBanner /></div>
      </div>
      <Axes draw={draw} ticks={[]} xEnds={['Mass market', 'Niche']} xLabel="Mass-market appeal → niche positioning" yLabel="Basic everyday → comfort-led lifestyle" />
      {MAP2.map((b, i) => {
        const premium = b.name.includes('premium');
        const at = premium ? wordAt(l2, b.name.startsWith('Mulmul') ? 'Mulmul' : 'Suta') : wordAt(l2, 'in Aalayam') + i * 5;
        const lab: Record<string, [number, number]> = { 'Libas': [18, 34], 'Juniper': [18, 38], 'Unbranded': [18, -16] };
        const [dx, dy] = lab[b.name] ?? [18, 8];
        return <MapPoint key={b.name} x={valX(b.x)} y={valY(b.y)} label={b.name} at={at} color={premium ? C.violet : C.cyan} labelDx={dx} labelDy={dy} />;
      })}
      <Zone x={valX(40)} y={valY(97)} w={valX(76) - valX(40)} h={valY(74) - valY(97)} color={C.lime} label="gap · comfort-led + distinct identity + accessible price" at={wordAt(l3, 'gap')} ellipse labelY={valY(97) - 40} />
      <ProposedRing x={valX(30 + (AALAYAM_MAP2.x - 30) * move)} y={valY(55 + (AALAYAM_MAP2.y - 55) * move)} at={l3.from} label="Aalayam · proposed · ₹1,000–1,700" labelDx={-380} labelDy={58} />
    </AbsoluteFill>
  );
};
