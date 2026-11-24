import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, Line, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bulb } from '../components/Icons';
import { DIMENSIONS } from './Dimensions';
import { C, FACTORS, alpha } from '../theme';

/** "Potential recommendations: not current capabilities", on screen the whole time the board is visible. */
export const Disclaimer: React.FC = () => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 24px', borderRadius: 14, border: `2px solid ${C.lime}`, color: C.lime, fontSize: 24, fontWeight: 600, background: alpha(C.lime, 0.06) }}>
    <Bulb size={32} color={C.lime} />Potential recommendations: not current capabilities
  </div>
);

/** One row: factor → its key finding → a potential recommendation. `at` is when it appears. */
export const InsightRow: React.FC<{ i: number; at: number; y: number }> = ({ i, at, y }) => {
  const f = useCurrentFrame();
  const F = FACTORS[i], D = DIMENSIONS[F.id];
  const p = interpolate(f, [at + 6, at + 22], [0, 1], clamp);
  return (
    <Reveal at={at} dir="left" style={{ left: 110, top: y, width: 1700 }}>
      <div style={{ display: 'flex', alignItems: 'center', height: 104, gap: 24 }}>
        <div className="head" style={{ width: 70, height: 70, borderRadius: 18, display: 'grid', placeItems: 'center', fontSize: 36, color: F.color, border: `1.5px solid ${alpha(F.color, 0.6)}`, background: alpha(F.color, 0.08) }}>{F.letter}</div>
        <div style={{ width: 560, fontSize: 26, lineHeight: 1.3 }} className="muted">{D.points[0]}</div>
        <div style={{ width: 140, height: 3, background: `linear-gradient(90deg, ${alpha(F.color, 0.2)}, ${F.color})`, transform: `scaleX(${p})`, transformOrigin: 'left' }} />
        <div style={{ fontSize: 0, width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: `14px solid ${F.color}`, opacity: p }} />
        <div style={{ flex: 1, fontSize: 30, fontWeight: 600, lineHeight: 1.25, opacity: p }}>{D.recommendation}</div>
      </div>
    </Reveal>
  );
};

export const Insights: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3] = lines;
  const times = [wordAt(l1, 'Political'), wordAt(l1, 'Economic'), wordAt(l2, 'Social'), wordAt(l2, 'Technological'), wordAt(l3, 'Environmental'), wordAt(l3, 'Legal')];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Heading step="05 · Insights" title="From research to business insights" color={C.lime} />
      <Reveal at={wordAt(l0, 'recommendations')} style={{ left: 110, top: 200 }}><Disclaimer /></Reveal>
      <Reveal at={l0.from} style={{ left: 110, top: 290, width: 1700 }}>
        <div style={{ display: 'flex', gap: 24, fontSize: 22, fontWeight: 600, letterSpacing: '0.12em', color: C.grey }}>
          <div style={{ width: 70 }} /><div style={{ width: 560 }}>KEY FINDING</div><div style={{ width: 178 }} /><div>POTENTIAL RECOMMENDATION</div>
        </div>
        <div style={{ height: 1, background: C.line, marginTop: 16 }} />
      </Reveal>
      {FACTORS.map((_, i) => <InsightRow key={i} i={i} at={times[i]} y={345 + i * 112} />)}
    </AbsoluteFill>
  );
};
