import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, IconBadge, Line, wordAt } from '../components/ui';
import { Pop, Reveal, clamp, useFloat } from '../components/anim';
import { FACTOR_ICON, Hanger, Sheet } from '../components/Icons';
import { C, FACTORS, alpha } from '../theme';

/** "Aalayam · by Anamika", revealed left to right. Reused by the conclusion. */
export const Wordmark: React.FC<{ at: number; size?: number }> = ({ at, size = 140 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 30], [0, 100], clamp);
  return (
    <div style={{ textAlign: 'center', clipPath: `inset(0 ${100 - p}% 0 0)` }}>
      <div className="head" style={{ fontSize: size, lineHeight: 1, letterSpacing: '-0.02em' }}>Aalayam</div>
      <div style={{ fontSize: size * 0.2, letterSpacing: '0.5em', marginTop: size * 0.16, color: C.cyan, fontWeight: 500 }}>BY ANAMIKA</div>
    </div>
  );
};

const WORLD = ['tax', 'prices', 'trends', 'technology', 'the planet', 'the law'];

export const Intro: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const pull = interpolate(f, [l1.from - 8, l1.from + 26], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  const fl = useFloat(5, 90);
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* 1 · the brand, close up, then pulled back into a node in the grid */}
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1 - 0.55 * pull}) translateY(${-60 * pull}px)`, opacity: 1 - interpolate(f, [l2.from - 10, l2.from + 6], [0, 1], clamp) }}>
        <div style={{ position: 'absolute', left: 0, top: 330, width: 1920 }}><Wordmark at={l0.from} /></div>
        <Pop at={wordAt(l0, 'co-ords')} style={{ left: 620, top: 700 }}><IconBadge size={120} color={C.cyan}><Hanger size={74} /></IconBadge></Pop>
        <Pop at={wordAt(l0, 'sarees')} style={{ left: 900, top: 700 }}><IconBadge size={120} color={C.violet}><Hanger size={74} color={C.violet} /></IconBadge></Pop>
        <Pop at={wordAt(l0, 'women')} style={{ left: 1180, top: 700 }}><IconBadge size={120} color={C.lime}><span className="head" style={{ fontSize: 30, color: C.lime }}>IN</span></IconBadge></Pop>
        <div style={{ position: 'absolute', left: 0, top: 860, width: 1920, textAlign: 'center', fontSize: 30, opacity: interpolate(f, [wordAt(l0, 'comfortable'), wordAt(l0, 'comfortable') + 15], [0, 1], clamp) * (1 - pull) }} className="muted">
          Comfortable co-ords and sarees for women
        </div>
      </div>
      {/* the bigger world around it */}
      {WORLD.map((w, i) => {
        const a = (i / WORLD.length) * Math.PI * 2 - Math.PI / 2, at = wordAt(l1, w);
        const p = interpolate(f, [at, at + 14], [0, 1], clamp) * (1 - interpolate(f, [l2.from - 10, l2.from + 6], [0, 1], clamp));
        const x = 960 + Math.cos(a) * 640 + Math.sin(f / 40 + i) * 10, y = 500 + Math.sin(a) * 330 + Math.cos(f / 50 + i) * 8;
        return (
          <React.Fragment key={w}>
            <svg width={1920} height={1080} style={{ position: 'absolute', opacity: p * 0.6 }}>
              <path d={`M${960 + Math.cos(a) * 300} ${470 + Math.sin(a) * 160} L${x} ${y}`} stroke={alpha(C.cyan, 0.4)} strokeWidth={2} strokeDasharray="4 10" />
            </svg>
            <div className="chip" style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * p})`, opacity: p, color: i % 2 ? C.violet : C.cyan }}>{w}</div>
          </React.Fragment>
        );
      })}
      {/* 3 · the project board */}
      <Reveal at={l2.from} out={l3.from - 6} style={{ left: 560, top: 300 }}>
        <div className="card" style={{ position: 'relative', width: 800, height: 420, padding: 44, boxShadow: `0 0 60px ${alpha(C.cyan, 0.12)}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><Sheet size={46} /><span className="eyebrow">Project board</span></div>
          <div className="head" style={{ fontSize: 76, marginTop: 30 }}>PESTEL research</div>
          <div className="muted" style={{ fontSize: 30, marginTop: 12 }}>Aalayam by Anamika · external environment</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ flex: 1, height: 10, borderRadius: 5, background: C.line }} />)}</div>
        </div>
      </Reveal>
      {/* 4 · six forces */}
      <Reveal at={l3.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="head" style={{ position: 'absolute', left: 0, top: 190, width: 1920, textAlign: 'center', fontSize: 60 }}>Six outside forces</div>
        {FACTORS.map((fa, i) => {
          const Icon = FACTOR_ICON[fa.id], at = wordAt(l3, fa.title);
          return (
            <Pop key={fa.id} at={at} style={{ left: 145 + i * 276, top: 380 + fl * (i % 2 ? 1 : -1) }}>
              <div className="card" style={{ position: 'relative', width: 250, height: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 36, borderColor: alpha(fa.color, 0.45), boxShadow: `0 0 40px ${alpha(fa.color, 0.15)}` }}>
                <div className="head" style={{ fontSize: 76, color: fa.color, lineHeight: 1 }}>{fa.letter}</div>
                <div style={{ marginTop: 26 }}><Icon size={84} color={fa.color} /></div>
                <div style={{ marginTop: 26, fontSize: fa.title.length > 11 ? 26 : 30, fontWeight: 600 }}>{fa.title}</div>
              </div>
            </Pop>
          );
        })}
      </Reveal>
    </AbsoluteFill>
  );
};
