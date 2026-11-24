import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { clamp } from './anim';

const st = { stroke: C.brown, strokeWidth: 4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

/** A co-ord set (top + trousers) on a hanger, 240 × 420 box. */
export const CoordHanger: React.FC<{ x: number; y: number; scale?: number; color?: string; swing?: number }> = ({ x, y, scale = 1, color = C.rose, swing = 0 }) => {
  const f = useCurrentFrame();
  const rot = Math.sin(f / 18) * swing;
  return (
    <svg viewBox="0 0 240 420" width={240 * scale} height={420 * scale} style={{ position: 'absolute', left: x, top: y, overflow: 'visible', transform: `rotate(${rot}deg)`, transformOrigin: '50% 0%' }}>
      <path d="M120 6 Q136 6 136 20 Q136 30 120 36 L30 84 H210 L120 36" fill="none" {...st} />
      <path d="M70 80 L170 80 L214 118 L192 146 L172 130 L172 210 L68 210 L68 130 L48 146 L26 118 Z" fill={color} {...st} />
      <path d="M100 80 Q120 104 140 80" fill="none" {...st} />
      {[[96, 150], [140, 170], [118, 120], [86, 190], [150, 132]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={4} fill={C.white} />)}
      <path d="M72 222 H168 L176 412 H128 L120 290 L112 412 H64 Z" fill={color} {...st} />
      <path d="M72 238 H168" stroke={C.white} strokeWidth={4} opacity={0.6} />
    </svg>
  );
};

/** A folded saree with a border, drawn flat. 260 × 200 box. */
export const SareeFold: React.FC<{ x: number; y: number; scale?: number; color?: string; border?: string }> = ({ x, y, scale = 1, color = C.roseLight, border = C.roseDeep }) => (
  <svg viewBox="0 0 260 200" width={260 * scale} height={200 * scale} style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
    <rect x={10} y={110} width={240} height={80} rx={10} fill={color} {...st} />
    <rect x={10} y={168} width={240} height={14} fill={border} />
    <rect x={24} y={60} width={212} height={56} rx={10} fill={C.beige} {...st} />
    <rect x={24} y={98} width={212} height={10} fill={border} />
    <rect x={40} y={14} width={180} height={50} rx={10} fill={color} {...st} />
    {[60, 100, 140, 180].map((cx) => <circle key={cx} cx={cx} cy={40} r={5} fill={C.white} />)}
  </svg>
);

/** A clothing rack with a few garments. */
export const Rack: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 620 * scale, height: 560 * scale }}>
    <svg viewBox="0 0 620 560" width={620 * scale} height={560 * scale} style={{ position: 'absolute', overflow: 'visible' }}>
      <path d="M40 40 H580 M60 40 V540 M560 40 V540 M30 540 H90 M530 540 H590" fill="none" stroke={C.brownSoft} strokeWidth={10} strokeLinecap="round" />
    </svg>
    <CoordHanger x={60 * scale} y={34 * scale} scale={0.9 * scale} color={C.rose} swing={1.5} />
    <CoordHanger x={210 * scale} y={34 * scale} scale={0.9 * scale} color={C.beigeDeep} swing={1.2} />
    <CoordHanger x={360 * scale} y={34 * scale} scale={0.9 * scale} color={C.roseDeep} swing={1.8} />
  </div>
);

/** Line chart that draws itself between frames a and b. Values 0–1, left to right. */
export const LineChart: React.FC<{ x: number; y: number; w: number; h: number; values: number[]; a: number; b: number; label: string }> = ({ x, y, w, h, values, a, b, label }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [a, b], [0, 1], clamp);
  const pad = 40, pts = values.map((v, i) => [pad + (i / (values.length - 1)) * (w - 2 * pad), h - pad - v * (h - 2 * pad - 50)]);
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ');
  const len = pts.reduce((s, q, i) => (i ? s + Math.hypot(q[0] - pts[i - 1][0], q[1] - pts[i - 1][1]) : 0), 0);
  const end = pts[Math.min(pts.length - 1, Math.floor(p * (pts.length - 1) + 0.0001))];
  return (
    <div className="card" style={{ left: x, top: y, width: w, height: h }}>
      <div className="label" style={{ position: 'absolute', left: 32, top: 22 }}>{label}</div>
      <svg width={w} height={h} style={{ position: 'absolute', overflow: 'visible' }}>
        <path d={`M${pad} ${h - pad} H${w - pad}`} stroke={C.beigeDeep} strokeWidth={3} />
        <path d={d} fill="none" stroke={C.roseDeep} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
        {p > 0.98 && <path d={`M${end[0] - 22} ${end[1] - 4} L${end[0]} ${end[1]} L${end[0] - 4} ${end[1] + 22}`} fill="none" stroke={C.roseDeep} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" transform={`rotate(-40 ${end[0]} ${end[1]})`} />}
      </svg>
    </div>
  );
};

/** Bars that grow one after another from frame `a`. Values 0–1. */
export const BarChart: React.FC<{ x: number; y: number; w: number; h: number; values: number[]; a: number; label: string; highlight?: number }> = ({ x, y, w, h, values, a, label, highlight }) => {
  const f = useCurrentFrame();
  const n = values.length, gap = 26, bw = (w - 64 - gap * (n - 1)) / n, base = h - 36, top = 80;
  return (
    <div className="card" style={{ left: x, top: y, width: w, height: h }}>
      <div className="label" style={{ position: 'absolute', left: 32, top: 22 }}>{label}</div>
      <svg width={w} height={h} style={{ position: 'absolute' }}>
        {values.map((v, i) => {
          const p = interpolate(f, [a + i * 6, a + i * 6 + 20], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
          const bh = v * (base - top) * p;
          return <rect key={i} x={32 + i * (bw + gap)} y={base - bh} width={bw} height={bh} rx={10} fill={i === highlight ? C.rose : C.beigeDeep} />;
        })}
        <path d={`M24 ${base} H${w - 24}`} stroke={C.brownLine} strokeWidth={3} />
      </svg>
    </div>
  );
};

/** Where a word falls inside a spoken line, as a frame (scene-relative). Close enough for timing visuals to speech. */
export const wordAt = (line: { from: number; durationInFrames: number; text: string }, word: string, lead = 4) => {
  const i = line.text.indexOf(word);
  const frac = i < 0 ? 0 : i / line.text.length;
  return Math.round(line.from + frac * line.durationInFrames) - lead;
};
