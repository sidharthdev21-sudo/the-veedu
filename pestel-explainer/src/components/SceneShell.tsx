import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FACTORS, FactorId } from '../theme';
import { clamp, Reveal, useFloat } from './anim';
import { Check } from './Icons';

export type Line = { id: string; text: string; from: number; durationInFrames: number };

/** The warm paper background with slow-drifting soft shapes. */
export const Backdrop: React.FC<{ tint?: string }> = ({ tint = C.beige }) => {
  const a = useFloat(18, 400), b = useFloat(14, 520, 130);
  return (
    <AbsoluteFill style={{ background: C.ivory }}>
      <div style={{ position: 'absolute', width: 900, height: 900, borderRadius: '50%', background: tint, opacity: 0.55, left: -260 + a, top: 380 + b }} />
      <div style={{ position: 'absolute', width: 620, height: 620, borderRadius: '50%', background: C.sand, left: 1420 - b, top: -260 + a }} />
      <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: `3px solid ${C.roseLight}`, left: 1660 + b, top: 860 - a }} />
    </AbsoluteFill>
  );
};

const STEPS = ['What it means', 'How it affects Aalayam', 'What to consider'];

/**
 * Shared frame for the six factor scenes: badge and title, the three-step tracker, and a text card that
 * moves through "what it means → how it affects Aalayam → what to consider" in time with the narration.
 * The illustration (children) owns the left two-thirds of the frame.
 */
export const FactorScene: React.FC<{
  factor: FactorId; lines: Line[]; means: string;
  affects: { text: string; icon?: React.ReactNode; at: number }[];
  consider: string[]; children: React.ReactNode;
}> = ({ factor, lines, means, affects, consider, children }) => {
  const f = useCurrentFrame();
  const idx = FACTORS.findIndex((x) => x.id === factor);
  const F = FACTORS[idx];
  const s1 = lines[1].from - 6, s2 = lines[3].from - 6;
  const step = f >= s2 ? 2 : f >= s1 ? 1 : 0;
  const badge = interpolate(f, [4, 22], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* header */}
      <div style={{ position: 'absolute', left: 90, top: 64, display: 'flex', alignItems: 'center', gap: 28, opacity: badge, transform: `translateY(${(1 - badge) * -20}px)` }}>
        <div style={{ width: 108, height: 108, borderRadius: '50%', background: C.rose, color: C.white, display: 'grid', placeItems: 'center', fontSize: 64 }} className="serif">{F.letter}</div>
        <div>
          <div className="eyebrow">Factor {idx + 1} of 6</div>
          <div className="serif" style={{ fontSize: 76, lineHeight: 1.05, color: C.brown }}>{F.title}</div>
        </div>
      </div>
      {/* step tracker */}
      <div style={{ position: 'absolute', right: 90, top: 92, display: 'flex', gap: 18, opacity: badge }}>
        {STEPS.map((s, i) => {
          const on = i === step, done = i < step;
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 999, background: on ? C.white : 'transparent', boxShadow: on ? '0 8px 20px rgba(74,51,38,.10)' : 'none', fontSize: 24, fontWeight: on ? 600 : 500, color: on ? C.brown : C.brownLine }}>
              {done ? <Check size={26} /> : <div style={{ width: 22, height: 22, borderRadius: '50%', border: `3px solid ${on ? C.rose : C.beigeDeep}`, background: on ? C.rose : 'transparent' }} />}
              {s}
            </div>
          );
        })}
      </div>
      {/* illustration */}
      {children}
      {/* text card */}
      <div className="card" style={{ left: 1150, top: 250, width: 680, height: 640, overflow: 'hidden' }}>
        <Reveal at={lines[0].from - 4} out={s1} style={{ left: 56, top: 64, width: 570 }}>
          <div className="eyebrow">{STEPS[0]}</div>
          <div className="serif" style={{ fontSize: 66, lineHeight: 1.12, marginTop: 26 }}>{means}</div>
        </Reveal>
        <Reveal at={s1 + 8} out={s2} style={{ left: 56, top: 64, width: 580 }}>
          <div className="eyebrow">{STEPS[1]}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 34 }}>
            {affects.map((a, i) => (
              <Reveal key={i} at={a.at} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 40, fontWeight: 500, lineHeight: 1.22 }}>
                  <div style={{ width: 76, height: 76, flex: 'none', borderRadius: 20, background: C.sand, display: 'grid', placeItems: 'center' }}>{a.icon}</div>
                  {a.text}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal at={s2 + 8} style={{ left: 56, top: 64, width: 580 }}>
          <div className="eyebrow">{STEPS[2]}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 30 }}>
            {consider.map((c, i) => (
              <Reveal key={c} at={s2 + 16 + i * 26} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 42, fontWeight: 500, lineHeight: 1.22 }}>
                  <Check size={58} style={{ flex: 'none' }} />{c}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};

/** A small rounded label that sits on the illustration. */
export const Chip: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; tone?: 'white' | 'rose' | 'brown'; size?: number }> = ({ children, icon, tone = 'white', size = 32 }) => (
  <div className="chip" style={{ fontSize: size, background: tone === 'rose' ? C.rose : tone === 'brown' ? C.brown : C.white, color: tone === 'white' ? C.brown : C.white }}>
    {icon}{children}
  </div>
);
