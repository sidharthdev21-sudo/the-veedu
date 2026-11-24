import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Line } from '../components/SceneShell';
import { Pop, Reveal, clamp, useFloat } from '../components/anim';
import { Store } from '../components/Icons';
import { wordAt } from '../components/Garments';
import { ForcesDiagram, SeriesTag } from '../components/Series';
import { C, FACTORS } from '../theme';

/** Part 1's PESTEL ring around the brand. Reused in the conclusion. */
export const PestelRing: React.FC<{ cx: number; cy: number; r?: number; fade?: number; at?: number }> = ({ cx, cy, r = 300, fade = 0, at = 0 }) => (
  <>
    {FACTORS.map((fa, i) => {
      const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
      return (
        <Pop key={fa.id} at={at + i * 4} style={{ left: cx + Math.cos(a) * r * 1.3 - 52, top: cy + Math.sin(a) * r - 52 }}>
          <div className="serif" style={{ width: 104, height: 104, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 54, background: fade > 0.5 ? 'transparent' : C.rose, color: fade > 0.5 ? C.roseDeep : C.white, border: `3px solid ${C.rose}`, opacity: 1 - fade * 0.5 }}>{fa.letter}</div>
        </Pop>
      );
    })}
  </>
);

const OTHERS = [[260, 600, C.beigeDeep], [520, 660, C.sand], [1300, 660, C.beige], [1560, 600, C.beigeDeep]] as const;

export const Recap: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const fade = interpolate(f, [l1.from - 10, l1.from + 10], [0, 1], clamp);
  const fl = useFloat(5, 90);
  const words = ['rivalry', 'new entrants', 'suppliers', 'buyers', 'substitutes'].map((w) => wordAt(l2, w));
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* Part 1: the outside world */}
      <Reveal at={0} out={l2.from - 8} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <Reveal at={l0.from} style={{ left: 0, top: 70, width: 1920, textAlign: 'center' }}>
          <div className="eyebrow">Part 1 · PESTEL</div>
          <div className="serif" style={{ fontSize: 64, marginTop: 6, opacity: 1 - fade }}>The outside world</div>
        </Reveal>
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - fade * 0.85 }}><PestelRing cx={960} cy={560} at={l0.from + 6} fade={fade} /></div>
        <Pop at={l0.from} style={{ left: 830, top: 440 + fl }}><Store size={260} /></Pop>
        {/* the competition: a street of other (unnamed) shops */}
        {OTHERS.map(([x, y, col], i) => (
          <Pop key={i} at={l1.from + 10 + i * 6} style={{ left: x, top: y }}><Store size={150} fill={col} /></Pop>
        ))}
        <div style={{ position: 'absolute', left: 120, top: 870, width: 1680, height: 6, borderRadius: 3, background: C.beigeDeep, opacity: fade }} />
        {[['who else', 'Who else is selling?', 120, 200], ['how much power', 'How much power do customers and suppliers have?', 520, 300], ['how easy', 'How easy is it to join in?', 1220, 200]].map(([w, t, x, y]) => (
          <Pop key={w as string} at={wordAt(l1, w as string)} style={{ left: x as number, top: y as number }}>
            <div className="chip" style={{ fontSize: 34, background: C.white }}>{t}</div>
          </Pop>
        ))}
      </Reveal>
      {/* Porter's Five Forces */}
      <Reveal at={l2.from - 4} style={{ left: 0, top: 60, width: 1920, textAlign: 'center' }}>
        <div className="eyebrow">Part 2</div>
        <div className="serif" style={{ fontSize: 76, marginTop: 6 }}>Porter's Five Forces</div>
      </Reveal>
      <Reveal at={l2.from} dir="none" style={{ left: 0, top: 0 }}>
        <ForcesDiagram x={960} y={600} scale={1.1} litAt={[words[0], ...words.slice(1)]} popAt={l2.from + 4} />
      </Reveal>
      <SeriesTag />
    </AbsoluteFill>
  );
};
