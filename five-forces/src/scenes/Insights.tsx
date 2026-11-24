import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Line } from '../components/SceneShell';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bulb, Spark } from '../components/Icons';
import { wordAt } from '../components/Garments';
import { FORCES, SeriesTag } from '../components/Series';
import { C } from '../theme';

/** Force → strategic direction (from the brief). */
export const MAPPING = [
  'Brand differentiation',
  'Customer loyalty and brand recognition',
  'Better sourcing strategy',
  'Customer experience and perceived value',
  'Stronger product positioning',
];

export const Banner: React.FC = () => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 26px', borderRadius: 16, border: `3px solid ${C.rose}`, background: C.white, color: C.roseDeep, fontSize: 26, fontWeight: 600 }}>
    <Bulb size={36} />Recommendations: not current capabilities
  </div>
);

export const Insights: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const times = [wordAt(l1, 'Rivalry'), wordAt(l1, 'New entrants'), wordAt(l1, 'Supplier'), wordAt(l2, 'Buyer'), wordAt(l2, 'substitutes')];
  const meet = interpolate(f, [l3.from, l3.from + 30], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <div style={{ position: 'absolute', left: 110, top: 50 }}>
        <div className="eyebrow">From research to strategy</div>
        <div className="serif" style={{ fontSize: 68 }}>From findings to business insights</div>
      </div>
      <Reveal at={wordAt(l0, 'recommendations')} style={{ left: 110, top: 190 }}><Banner /></Reveal>
      {FORCES.map((F, i) => {
        const p = interpolate(f, [times[i] + 4, times[i] + 20], [0, 1], clamp), y = 300 + i * 136;
        return (
          <React.Fragment key={F.id}>
            <Reveal at={times[i]} dir="left" style={{ left: 110, top: y }}>
              <div className="card" style={{ position: 'relative', width: 440, height: 112, display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px' }}><F.Icon size={60} /><span style={{ fontSize: 30, fontWeight: 600 }}>{F.title.replace('Bargaining power of', 'Power of')}</span></div>
            </Reveal>
            <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
              <path d={`M560 ${y + 56} H${560 + 120 * p}`} stroke={C.rose} strokeWidth={6} strokeLinecap="round" />
              {p > 0.95 && <path d={`M668 ${y + 44} L682 ${y + 56} L668 ${y + 68}`} fill="none" stroke={C.rose} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />}
              <path d={`M1240 ${y + 56} C 1330 ${y + 56}, 1330 600, 1420 600`} fill="none" stroke={C.roseLight} strokeWidth={5} pathLength={1} strokeDasharray={`${meet} 1`} />
            </svg>
            <div style={{ position: 'absolute', left: 700, top: y, width: 540, height: 112, display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 600, lineHeight: 1.2, opacity: p }}>{MAPPING[i]}</div>
          </React.Fragment>
        );
      })}
      <Pop at={l3.from + 18} style={{ left: 1420, top: 440 }}>
        <div style={{ width: 400, padding: 40, borderRadius: 32, background: C.rose, color: C.white, boxShadow: '0 20px 40px rgba(173,108,112,.35)' }}>
          <Spark size={80} fill={C.white} />
          <div className="serif" style={{ fontSize: 50, lineHeight: 1.1, marginTop: 16 }}>A sustainable competitive advantage</div>
          <div style={{ fontSize: 24, marginTop: 14, opacity: 0.9 }}>Hard to copy, built over time</div>
        </div>
      </Pop>
      <SeriesTag />
    </AbsoluteFill>
  );
};
