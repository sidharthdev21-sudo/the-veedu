import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, Line, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { LEVELS } from '../data';
import { C, alpha } from '../theme';

const COL = [C.cyan, C.violet, C.lime, C.green];
// the words that bring each item in, per level (matched to the narration)
const WORDS = [
  ['Libas', 'Janasya', 'Juniper', 'Pink Fort', 'unbranded', 'Suta'],
  ['Fabindia', 'Mulmul', 'Westside', 'Zudio'],
  ['custom', 'tailor-made', 'dress material'],
  ['local boutique', 'renting', 'second-hand', 'wardrobe'],
];

/** Four rings around Aalayam. `lit[i]` 0–1 for ring i (0 = innermost, brand competition). */
export const Rings: React.FC<{ cx: number; cy: number; lit: number[]; scale?: number }> = ({ cx, cy, lit, scale = 1 }) => {
  const f = useCurrentFrame();
  const R = [120, 200, 280, 360].map((r) => r * scale);
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      {[3, 2, 1, 0].map((i) => (
        <circle key={i} cx={cx} cy={cy} r={R[i]} fill={alpha(COL[i], 0.04 + 0.08 * lit[i])} stroke={COL[i]} strokeWidth={2 + 2 * lit[i]} opacity={0.25 + 0.75 * lit[i]}
          style={{ filter: lit[i] > 0.5 ? `drop-shadow(0 0 ${10 + 4 * Math.sin(f / 10)}px ${alpha(COL[i], 0.7)})` : 'none' }} />
      ))}
      <circle cx={cx} cy={cy} r={62 * scale} fill={C.card} stroke={C.text} strokeWidth={2} />
      <text x={cx} y={cy + 10 * scale} textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={600} fontSize={30 * scale} fill={C.text}>Aalayam</text>
      {[0, 1, 2, 3].map((i) => (
        <text key={i} x={cx} y={cy - R[i] + 30 * scale} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={600} fontSize={22 * scale} fill={COL[i]} opacity={0.3 + 0.7 * lit[i]}>{i + 1}</text>
      ))}
    </svg>
  );
};

export const Levels: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, ...L] = lines;
  const lit = L.map((l) => interpolate(f, [l.from - 6, l.from + 10], [0, 1], clamp));
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Tool 1" title="The four levels of competition" />
      {/* direct vs indirect */}
      <Reveal at={l0.from} out={L[0].from - 8} style={{ left: 110, top: 300, width: 1700 }}>
        <div style={{ display: 'flex', gap: 40 }}>
          {[{ w: 'Direct', t: 'Direct', d: 'A similar product, the same customer, a similar price', c: C.cyan }, { w: 'Indirect', t: 'Indirect', d: 'The same need, met in a different way', c: C.violet }].map((k) => (
            <Pop key={k.t} at={wordAt(l0, k.w)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 820, height: 420, padding: 50, borderColor: alpha(k.c, 0.6), boxShadow: `0 0 50px ${alpha(k.c, 0.14)}` }}>
                <div className="head" style={{ fontSize: 84, color: k.c }}>{k.t}</div>
                <div style={{ fontSize: 40, marginTop: 30, lineHeight: 1.3 }}>{k.d}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
      {/* the rings and their members */}
      <Reveal at={L[0].from - 8} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <Rings cx={520} cy={600} lit={lit} scale={1.02} />
        <div style={{ position: 'absolute', left: 1000, top: 210, width: 820, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {LEVELS.map((lv, i) => (
            <div key={lv.n} className="card" style={{ position: 'relative', padding: '22px 28px', borderColor: alpha(COL[i], 0.15 + 0.6 * lit[i]), opacity: 0.3 + 0.7 * lit[i] }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="head" style={{ fontSize: 32, color: COL[i] }}>{lv.n} · {lv.title}</div>
                <span className="badge" style={{ fontSize: 18, color: i === 0 ? C.cyan : C.grey, border: `1.5px solid ${alpha(i === 0 ? C.cyan : C.grey, 0.5)}` }}>{lv.kind.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                {lv.items.map((it, j) => (
                  <Pop key={it} at={wordAt(L[i], WORDS[i][j])} style={{ position: 'relative' }}>
                    <span style={{ display: 'inline-block', padding: '7px 16px', borderRadius: 999, fontSize: 24, fontWeight: 500, background: alpha(COL[i], 0.1), border: `1px solid ${alpha(COL[i], 0.4)}` }}>{it}</span>
                  </Pop>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* direct → indirect gradient along the radius */}
        <div style={{ position: 'absolute', left: 140, top: 990, width: 760, opacity: lit[3] }}>
          <div style={{ height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, marginTop: 8 }}><span style={{ color: C.cyan }}>Direct (centre)</span><span style={{ color: C.violet }}>Indirect (outer rings)</span></div>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
