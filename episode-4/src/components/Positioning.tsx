import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { C, alpha } from '../theme';
import { clamp } from './anim';
import type { Evidence } from '../data';

const EV: Record<Evidence, { label: string; color: string; dashed?: boolean }> = {
  fact: { label: 'Verified fact', color: C.green },
  observed: { label: 'Observed', color: C.cyan },
  interpretation: { label: 'Interpretation', color: C.grey },
  hypothesis: { label: 'Hypothesis', color: C.violet, dashed: true },
  assumption: { label: 'Assumption', color: C.grey, dashed: true },
  recommendation: { label: 'Recommendation', color: C.lime },
};

/** The evidence label used across the analysis and the video. */
export const EvidenceChip: React.FC<{ kind: Evidence; size?: number }> = ({ kind, size = 20 }) => {
  const e = EV[kind];
  return (
    <span className="badge" style={{ fontSize: size, color: e.color, background: alpha(e.color, 0.1), border: `1.5px ${e.dashed ? 'dashed' : 'solid'} ${alpha(e.color, 0.6)}` }}>
      {e.label.toUpperCase()}
    </span>
  );
};

/** Persistent banner on both maps. */
export const HypothesisBanner: React.FC<{ text?: string }> = ({ text = 'Initial hypothesis · not measured customer perception' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 14, border: `2px dashed ${alpha(C.violet, 0.7)}`, color: C.violet, background: alpha(C.violet, 0.06), fontSize: 22, fontWeight: 600 }}>
    {text}
  </div>
);

/** Plot area shared by both maps (stage pixels). */
export const PLOT = { x0: 300, x1: 1640, y0: 250, y1: 900 };

/** Axes with ticks; `draw` 0→1 animates the axis lines in. */
export const Axes: React.FC<{ xLabel: string; yLabel: string; ticks: { x: number; label: string }[]; xEnds?: [string, string]; draw: number }> = ({ xLabel, yLabel, ticks, xEnds, draw }) => {
  const { x0, x1, y0, y1 } = PLOT;
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      {ticks.map((t) => <line key={t.label} x1={t.x} y1={y0} x2={t.x} y2={y1} stroke={C.line} strokeWidth={1.5} opacity={draw} />)}
      {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={x0} y1={y1 - (y1 - y0) * k} x2={x1} y2={y1 - (y1 - y0) * k} stroke={C.line} strokeWidth={1.5} opacity={draw} />)}
      <line x1={x0} y1={y1} x2={x0 + (x1 - x0) * draw} y2={y1} stroke={C.grey} strokeWidth={3} />
      <line x1={x0} y1={y1} x2={x0} y2={y1 - (y1 - y0) * draw} stroke={C.grey} strokeWidth={3} />
      <g opacity={draw} fontFamily="Inter, sans-serif" fill={C.grey}>
        {ticks.map((t) => <text key={t.label} x={t.x} y={y1 + 34} textAnchor="middle" fontSize={22}>{t.label}</text>)}
        {xEnds && <><text x={x0} y={y1 + 34} fontSize={22}>{xEnds[0]}</text><text x={x1} y={y1 + 34} fontSize={22} textAnchor="end">{xEnds[1]}</text></>}
        <text x={(x0 + x1) / 2} y={y1 + 76} textAnchor="middle" fontSize={26} fontWeight={600} fill={C.text}>{xLabel}</text>
        <text transform={`translate(${x0 - 50} ${(y0 + y1) / 2}) rotate(-90)`} textAnchor="middle" fontSize={26} fontWeight={600} fill={C.text}>{yLabel}</text>
      </g>
    </svg>
  );
};

/** A brand on a map: a dot (and a range bar when the observed prices span a range), popping in at `at`. */
export const MapPoint: React.FC<{ x: number; y: number; x2?: number; label: string; at: number; color?: string; labelDx?: number; labelDy?: number; dim?: number }> = ({ x, y, x2, label, at, color = C.cyan, labelDx = 18, labelDy = 8, dim = 1 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 12], [0, 1], clamp);
  const cx = x2 !== undefined ? (x + x2) / 2 : x;
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: p * dim }}>
      {x2 !== undefined && x2 > x && <line x1={x} y1={y} x2={x + (x2 - x) * p} y2={y} stroke={color} strokeWidth={8} strokeLinecap="round" opacity={0.6} />}
      <circle cx={cx} cy={y} r={11 * (0.6 + 0.4 * p)} fill={color} style={{ filter: `drop-shadow(0 0 8px ${alpha(color, 0.8)})` }} />
      <text x={cx + labelDx} y={y + labelDy} fontFamily="Inter, sans-serif" fontSize={26} fontWeight={600} fill={C.text}>{label}</text>
    </svg>
  );
};

/** Aalayam's proposed position: a hollow, pulsing violet ring (never a filled dot). */
export const ProposedRing: React.FC<{ x: number; y: number; at: number; x0?: number; x1?: number; label?: string; labelDx?: number; labelDy?: number }> = ({ x, y, at, x0, x1, label = 'Aalayam · proposed', labelDx = -40, labelDy = -34 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 14], [0, 1], clamp), pulse = 1 + 0.08 * Math.sin(f / 8);
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: p }}>
      {x0 !== undefined && x1 !== undefined && <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.violet} strokeWidth={5} strokeDasharray="10 10" strokeLinecap="round" />}
      <circle cx={x} cy={y} r={18 * pulse} fill={C.bg} stroke={C.violet} strokeWidth={5} style={{ filter: `drop-shadow(0 0 12px ${C.violet})` }} />
      <text x={x + labelDx} y={y + labelDy} fontFamily="Space Grotesk, sans-serif" fontSize={28} fontWeight={600} fill={C.violet}>{label}</text>
    </svg>
  );
};

/** A soft highlighted zone (crowded area or gap). */
export const Zone: React.FC<{ x: number; y: number; w: number; h: number; color: string; label: string; at: number; ellipse?: boolean; labelY?: number }> = ({ x, y, w, h, color, label, at, ellipse, labelY }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 18], [0, 1], clamp), pulse = 0.85 + 0.15 * Math.sin(f / 14);
  return (
    <>
      <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: ellipse ? '50%' : 24, background: alpha(color, 0.12 * pulse), border: `2px solid ${alpha(color, 0.45)}`, opacity: p }} />
      <div style={{ position: 'absolute', left: x, top: labelY ?? y + h + 10, width: w, textAlign: 'center', fontSize: 22, fontWeight: 600, color, opacity: p }}>{label}</div>
    </>
  );
};

// ─── scales
export const priceX = (p: number) => PLOT.x0 + (PLOT.x1 - PLOT.x0) * (Math.log(p) - Math.log(400)) / (Math.log(8000) - Math.log(400));
export const valY = (v: number) => PLOT.y1 - (PLOT.y1 - PLOT.y0) * v / 100;
export const valX = (v: number) => PLOT.x0 + (PLOT.x1 - PLOT.x0) * v / 100;
