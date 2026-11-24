import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp, useFloat } from '../components/anim';
import { FACTOR_ICON, Store } from '../components/Icons';
import { Rack, SareeFold, wordAt } from '../components/Garments';
import { Woman, useWalk } from '../components/Woman';
import { C, FACTORS } from '../theme';

/** Brand wordmark: "Aalayam" in the serif, "by Anamika" spaced out underneath. */
export const Wordmark: React.FC<{ size?: number; color?: string }> = ({ size = 150, color = C.brown }) => (
  <div style={{ textAlign: 'center', color }}>
    <div className="serif" style={{ fontSize: size, lineHeight: 1 }}>Aalayam</div>
    <div style={{ fontSize: size * 0.24, letterSpacing: '0.42em', fontWeight: 500, marginTop: size * 0.12, color: C.roseDeep }}>BY ANAMIKA</div>
  </div>
);

export const Intro: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const walk = useWalk(l0.from + 10, l0.from + 70, 2150, 1480);
  const fl = useFloat(6, 90);
  // "outside forces": arrows that press in towards the brand from every side
  const forces = interpolate(f, [wordAt(l1, 'changes'), wordAt(l1, 'changes') + 30], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* 1 · meet the brand */}
      <Reveal at={0} out={l1.from - 6} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <Reveal at={l0.from} dir="up" style={{ left: 0, top: 120, width: 1920 }}><Wordmark /></Reveal>
        <Reveal at={wordAt(l0, 'co-ords')} dir="left" style={{ left: 130, top: 470 }}><Rack x={0} y={0} scale={0.9} /></Reveal>
        <Pop at={wordAt(l0, 'sarees')} style={{ left: 700, top: 760 }}><SareeFold x={0} y={0} scale={1.1} /></Pop>
        <Woman x={walk.x} y={1010 + walk.hop} size={520} pose={f > l0.from + 70 ? 'wave' : 'stand'} />
        <Pop at={wordAt(l0, 'modern')} style={{ left: 1050, top: 420 }}><Chip tone="rose">For modern women</Chip></Pop>
      </Reveal>
      {/* 2 · the brand, and the world pushing in on it */}
      <Reveal at={l1.from} out={l3.from - 6} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          <circle cx={960} cy={560} r={250} fill={C.white} stroke={C.beigeDeep} strokeWidth={4} strokeDasharray="10 14" />
          {[...Array(8)].map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + 0.2, r0 = 520, r1 = 520 - 220 * forces + Math.sin(f / 10 + i) * 8;
            const x0 = 960 + Math.cos(a) * r0, y0 = 560 + Math.sin(a) * r0 * 0.8, x1 = 960 + Math.cos(a) * r1 * 0.62, y1 = 560 + Math.sin(a) * r1 * 0.55;
            return (
              <g key={i} opacity={forces}>
                <path d={`M${x0} ${y0} L${x1} ${y1}`} stroke={C.rose} strokeWidth={8} strokeLinecap="round" />
                <circle cx={x1} cy={y1} r={12} fill={C.rose} />
              </g>
            );
          })}
        </svg>
        <Pop at={l1.from + 4} style={{ left: 830, top: 410 + fl }}><Store size={260} /></Pop>
        <Reveal at={l1.from + 10} style={{ left: 0, top: 860, width: 1920, textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 56 }}>The brand… and everything around it</div>
        </Reveal>
        {/* 3 · PESTEL: a way to look at those forces */}
        <Reveal at={l2.from} style={{ left: 0, top: 110, width: 1920, textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 130, letterSpacing: '0.08em', color: C.roseDeep }}>PESTEL</div>
          <div style={{ fontSize: 36, fontWeight: 500, marginTop: -6 }}>A simple way to look at outside forces</div>
        </Reveal>
      </Reveal>
      {/* 4 · six letters, six forces */}
      <Reveal at={l3.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="serif" style={{ position: 'absolute', left: 0, top: 130, width: 1920, textAlign: 'center', fontSize: 86 }}>Six outside forces</div>
        {FACTORS.map((fa, i) => {
          const Icon = FACTOR_ICON[fa.id];
          const at = wordAt(l3, fa.title);
          return (
            <Pop key={fa.id} at={at} style={{ left: 130 + i * 282, top: 360 + Math.sin((f + i * 15) / 24) * 6 }}>
              <div className="card" style={{ position: 'relative', width: 250, height: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34 }}>
                <div className="serif" style={{ width: 96, height: 96, borderRadius: '50%', background: C.rose, color: C.white, display: 'grid', placeItems: 'center', fontSize: 58 }}>{fa.letter}</div>
                <div style={{ marginTop: 30 }}><Icon size={110} /></div>
                <div style={{ marginTop: 24, fontSize: fa.title.length > 11 ? 28 : 32, fontWeight: 600 }}>{fa.title}</div>
              </div>
            </Pop>
          );
        })}
      </Reveal>
    </AbsoluteFill>
  );
};
