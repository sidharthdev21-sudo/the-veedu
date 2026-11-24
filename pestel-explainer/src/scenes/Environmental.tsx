import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FactorScene, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp, useFloat } from '../components/anim';
import { Box, Heart, Leaf, Recycle } from '../components/Icons';
import { wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { C } from '../theme';

/** A heap of fabric offcuts whose size follows `amount` (0–1). */
const Scraps: React.FC<{ x: number; y: number; amount: number }> = ({ x, y, amount }) => {
  const pieces = [
    [0, 0, 150, 60, -8, C.rose], [110, -10, 130, 56, 10, C.beigeDeep], [50, -50, 140, 54, 4, C.roseLight],
    [180, -48, 110, 50, -12, C.brownSoft], [-30, -46, 100, 48, 14, C.roseDeep], [80, -96, 130, 52, -6, C.beige],
    [10, -100, 90, 44, 18, C.rose], [150, -96, 100, 46, 8, C.roseLight], [70, -140, 110, 46, -10, C.beigeDeep],
  ] as const;
  const n = Math.round(amount * pieces.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      {pieces.slice(0, n).map(([px, py, w, h, r, col], i) => (
        <div key={i} style={{ position: 'absolute', left: px, top: py, width: w, height: h, borderRadius: 14, background: col, border: `4px solid ${C.brown}`, transform: `rotate(${r}deg)` }} />
      ))}
    </div>
  );
};

export const Environmental: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const fl = useFloat(8, 90);
  const waste = wordAt(l1, 'waste');
  const grow = interpolate(f, [waste - 10, waste + 30], [0, 1], clamp);
  const shrink = interpolate(f, [wordAt(l2, 'less waste'), wordAt(l2, 'less waste') + 30], [0, 0.6], clamp);
  const trust = interpolate(f, [wordAt(l3, 'trust'), wordAt(l3, 'trust') + 40], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  return (
    <FactorScene
      factor="environmental" lines={lines}
      means="Our planet, and fashion's impact on it"
      affects={[
        { text: 'Fashion creates textile waste', icon: <Recycle size={46} />, at: waste },
        { text: 'Shoppers ask how clothes are made', icon: <Heart size={46} />, at: wordAt(l1, 'shoppers') },
        { text: 'Greener fabrics and packaging matter', icon: <Leaf size={46} />, at: l2.from },
      ]}
      consider={['Choose natural fabrics', 'Cut waste', 'Use recyclable packaging']}
    >
      {/* a leafy planet */}
      <Reveal at={l0.from} out={l1.from - 4} dir="none" style={{ left: 0, top: 0 }}>
        <Pop at={l0.from + 4} style={{ left: 300, top: 330 + fl }}>
          <div style={{ width: 380, height: 380, borderRadius: '50%', background: C.roseLight, border: `6px solid ${C.brown}`, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 50, top: 60, width: 160, height: 90, borderRadius: 60, background: C.beige }} />
            <div style={{ position: 'absolute', left: 190, top: 200, width: 130, height: 80, borderRadius: 50, background: C.beige }} />
          </div>
        </Pop>
        {[[260, 300, -30], [620, 280, 30], [660, 640, 120]].map(([x, y, r], i) => (
          <Pop key={i} at={l0.from + 14 + i * 6} style={{ left: x, top: y }}><div style={{ transform: `rotate(${r + Math.sin((f + i * 20) / 20) * 8}deg)` }}><Leaf size={120} /></div></Pop>
        ))}
      </Reveal>
      {/* waste piles up; a shopper asks */}
      <Reveal at={l1.from} out={l3.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <Scraps x={180} y={900} amount={grow * (1 - shrink)} />
        <div style={{ position: 'absolute', left: 190, top: 985 }} className="label">Textile waste</div>
        <Woman x={830} y={1010} size={440} pose="think" outfit={C.beigeDeep} trim={C.brownSoft} skin={C.skinLight} seed={5} />
        <Pop at={wordAt(l1, 'ask')} out={l2.from - 4} style={{ left: 560, top: 400 }}><div className="chip" style={{ fontSize: 34 }}>How was this made?</div></Pop>
      </Reveal>
      {/* the greener options */}
      <Reveal at={l2.from} out={l3.from - 4} dir="none" style={{ left: 0, top: 0 }}>
        {[
          { w: 'Sustainable', I: Leaf, t: 'Natural fabrics', x: 120, y: 500 },
          { w: 'less waste', I: Recycle, t: 'Less waste', x: 300, y: 620 },
          { w: 'packaging', I: Box, t: 'Eco packaging', x: 120, y: 740 },
        ].map((o, i) => <Pop key={i} at={wordAt(l2, o.w)} style={{ left: o.x, top: o.y - 230 }}><Chip icon={<o.I size={56} />}>{o.t}</Chip></Pop>)}
      </Reveal>
      {/* small steps → more trust */}
      <Reveal at={l3.from} dir="up" style={{ left: 0, top: 0 }}>
        <Pop at={l3.from + 6} style={{ left: 170, top: 400 }}>
          <div style={{ position: 'relative' }}>
            <Box size={300} />
            <div style={{ position: 'absolute', left: 150, top: 150 }}><Leaf size={90} fill={C.roseLight} /></div>
          </div>
        </Pop>
        <div style={{ position: 'absolute', left: 560, top: 470 }}>
          <div className="label" style={{ marginBottom: 14 }}>Customer trust</div>
          <div style={{ width: 420, height: 44, borderRadius: 22, background: C.beige, overflow: 'hidden' }}>
            <div style={{ width: `${18 + 82 * trust}%`, height: '100%', borderRadius: 22, background: C.rose }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>{[0, 1, 2].map((i) => <div key={i} style={{ opacity: trust > (i + 1) / 3.5 ? 1 : 0.2 }}><Heart size={48} /></div>)}</div>
        </div>
      </Reveal>
    </FactorScene>
  );
};
