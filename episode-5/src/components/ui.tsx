import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, alpha } from '../theme';
import { clamp, useFloat } from './anim';

export type Line = { id: string; text: string; from: number; durationInFrames: number };

/** Where a word falls inside a spoken line, as a scene-relative frame (by its position in the text). */
export const wordAt = (line: Line, word: string, lead = 4) => {
  const i = line.text.indexOf(word);
  return Math.round(line.from + (i < 0 ? 0 : i / line.text.length) * line.durationInFrames) - lead;
};

/** Dark background: a faint dot grid and two slow glows. */
export const Backdrop: React.FC<{ glow?: string; glow2?: string }> = ({ glow = C.cyan, glow2 = C.violet }) => {
  const a = useFloat(40, 600), b = useFloat(30, 760, 200);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${alpha(C.text, 0.07)} 1.6px, transparent 1.6px)`, backgroundSize: '44px 44px' }} />
      <div style={{ position: 'absolute', width: 1100, height: 1100, left: -380 + a, top: -520 + b, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(glow, 0.12)}, transparent 62%)` }} />
      <div style={{ position: 'absolute', width: 1200, height: 1200, left: 1100 - b, top: 300 + a, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(glow2, 0.10)}, transparent 62%)` }} />
    </AbsoluteFill>
  );
};

/** Scene heading: a numbered eyebrow and a title, top-left. */
export const Heading: React.FC<{ step: string; title: string; color?: string; at?: number }> = ({ step, title, color = C.cyan, at = 0 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 18], [0, 1], clamp);
  return (
    <div style={{ position: 'absolute', left: 110, top: 70, opacity: p, transform: `translateY(${(1 - p) * -16}px)` }}>
      <div className="eyebrow" style={{ color }}>{step}</div>
      <div className="head" style={{ fontSize: 64, marginTop: 8 }}>{title}</div>
    </div>
  );
};

/** A round icon holder with a soft glow in the accent colour. `on` lights it up. */
export const IconBadge: React.FC<{ color?: string; size?: number; on?: number; children: React.ReactNode }> = ({ color = C.cyan, size = 96, on = 1, children }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.3, flex: 'none', display: 'grid', placeItems: 'center',
    background: alpha(color, 0.08 + 0.06 * on), border: `1.5px solid ${alpha(color, 0.25 + 0.5 * on)}`,
    boxShadow: on > 0.5 ? `0 0 ${30 * on}px ${alpha(color, 0.25 * on)}` : 'none',
  }}>{children}</div>
);

export const UsedBadge: React.FC = () => (
  <span className="badge" style={{ background: alpha(C.green, 0.12), color: C.green, border: `1px solid ${alpha(C.green, 0.4)}` }}>● USED</span>
);
export const RecBadge: React.FC = () => (
  <span className="badge" style={{ background: alpha(C.violet, 0.12), color: C.violet, border: `1px dashed ${alpha(C.violet, 0.6)}` }}>◌ RECOMMENDED</span>
);

/** A line that draws itself between frames a and b, with a soft glow. `d` is an SVG path in stage pixels. */
export const DrawPath: React.FC<{ d: string; a: number; b: number; color?: string; width?: number; dashed?: boolean }> = ({ d, a, b, color = C.cyan, width = 4, dashed }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [a, b], [0, 1], clamp);
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <path d={d} pathLength={1} fill="none" stroke={alpha(color, 0.25)} strokeWidth={width * 3} strokeLinecap="round" strokeDasharray={`${p} 1`} style={{ filter: 'blur(6px)' }} />
      <path d={d} pathLength={1} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? undefined : `${p} 1`} opacity={dashed ? p : 1} style={dashed ? { strokeDasharray: '0.012 0.012' } : undefined} />
    </svg>
  );
};

/** Text that types itself out between frames a and b. */
export const Typed: React.FC<{ text: string; a: number; b: number; style?: React.CSSProperties }> = ({ text, a, b, style }) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [a, b], [0, text.length], clamp));
  return <span style={style}>{text.slice(0, n)}<span style={{ opacity: n < text.length && f >= a ? 1 : 0, color: C.cyan }}>▍</span></span>;
};

/** How "lit" something is: 0 before frame `at`, 1 a few frames after. */
export const useLit = (at: number, dur = 10) => {
  const f = useCurrentFrame();
  return interpolate(f, [at, at + dur], [0, 1], clamp);
};
