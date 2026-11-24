import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bulb, FACTOR_ICON, Spark, Store } from '../components/Icons';
import { wordAt } from '../components/Garments';
import { C, FACTORS } from '../theme';
import { Wordmark } from './Intro';

export const Conclusion: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const CX = 960, CY = 520, R = 340;
  // which factors light up for each word of "Rules, money, people, technology and the planet"
  const lit: Record<string, number> = {
    political: wordAt(l1, 'Rules'), legal: wordAt(l1, 'Rules'), economic: wordAt(l1, 'money'),
    social: wordAt(l1, 'people'), technological: wordAt(l1, 'technology'), environmental: wordAt(l1, 'planet'),
  };
  const ringOut = l3.from - 6;
  const ring = interpolate(f, [ringOut, ringOut + 14], [1, 0], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* six forces around the brand */}
      <div style={{ position: 'absolute', inset: 0, opacity: ring, transform: `scale(${0.9 + 0.1 * ring})` }}>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          {FACTORS.map((fa, i) => {
            const a = -Math.PI / 2 + (i / 6) * Math.PI * 2, p = interpolate(f, [l0.from + 10 + i * 5, l0.from + 30 + i * 5], [0, 1], clamp);
            const x = CX + Math.cos(a) * R * 1.25, y = CY + Math.sin(a) * R;
            return <path key={fa.id} d={`M${CX} ${CY} L${CX + (x - CX) * p} ${CY + (y - CY) * p}`} stroke={f > lit[fa.id] ? C.rose : C.beigeDeep} strokeWidth={6} strokeDasharray="2 16" strokeLinecap="round" />;
          })}
        </svg>
        <Pop at={l0.from} style={{ left: CX - 150, top: CY - 150 }}>
          <div style={{ width: 300, height: 300, borderRadius: '50%', background: C.white, boxShadow: '0 20px 44px rgba(74,51,38,.14)', display: 'grid', placeItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <Store size={130} />
              <div className="serif" style={{ fontSize: 40, marginTop: 4 }}>Aalayam</div>
            </div>
          </div>
        </Pop>
        {FACTORS.map((fa, i) => {
          const a = -Math.PI / 2 + (i / 6) * Math.PI * 2, x = CX + Math.cos(a) * R * 1.25, y = CY + Math.sin(a) * R;
          const Icon = FACTOR_ICON[fa.id], on = f > lit[fa.id] && f < l2.from + 10;
          const glow = interpolate(f, [lit[fa.id], lit[fa.id] + 8], [0, 1], clamp) * (f < l2.from + 10 ? 1 : 0);
          return (
            <Pop key={fa.id} at={l0.from + 8 + i * 5} style={{ left: x - 105, top: y - 80 }}>
              <div style={{ width: 210, height: 160, borderRadius: 28, background: on ? C.rose : C.white, color: on ? C.white : C.brown, boxShadow: '0 12px 28px rgba(74,51,38,.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + glow * 0.08})` }}>
                <Icon size={70} color={on ? C.white : C.brown} fill={on ? C.roseDeep : undefined} />
                <div style={{ fontSize: fa.title.length > 11 ? 24 : 28, fontWeight: 600, marginTop: 8 }}>{fa.title}</div>
              </div>
            </Pop>
          );
        })}
        <Pop at={wordAt(l2, 'better decisions')} style={{ left: 120, top: 900 }}><Chip icon={<Bulb size={56} />}>Better decisions</Chip></Pop>
        <Pop at={wordAt(l2, 'opportunities')} style={{ left: 1340, top: 900 }}><Chip icon={<Spark size={50} />} tone="rose">New opportunities</Chip></Pop>
      </div>
      {/* the closing card */}
      <Reveal at={l3.from} dir="up" style={{ left: 0, top: 150, width: 1920, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 26 }}>
          {FACTORS.map((fa, i) => (
            <Pop key={fa.id} at={l3.from + 4 + i * 4} style={{ position: 'relative' }}>
              <div style={{ width: 210, textAlign: 'center' }}>
                <div className="serif" style={{ width: 120, height: 120, margin: '0 auto', borderRadius: '50%', background: C.rose, color: C.white, display: 'grid', placeItems: 'center', fontSize: 70 }}>{fa.letter}</div>
                <div style={{ fontSize: 26, fontWeight: 600, marginTop: 16 }}>{fa.title}</div>
              </div>
            </Pop>
          ))}
        </div>
        <div className="serif" style={{ fontSize: 60, marginTop: 50 }}>Six simple questions about the world outside</div>
      </Reveal>
      <Reveal at={l3.from + l3.durationInFrames + 4} style={{ left: 0, top: 700, width: 1920 }}><Wordmark size={110} /></Reveal>
    </AbsoluteFill>
  );
};
