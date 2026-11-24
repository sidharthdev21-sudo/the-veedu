import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { clamp, Pop } from './anim';
import { Bag, Fabric, Store, StorePlus, Swap } from './Icons';

// ─── The five forces, in one place
export const FORCES = [
  { id: 'rivalry', n: 1, title: 'Competitive rivalry', short: 'Rivalry', Icon: Store },
  { id: 'entrants', n: 2, title: 'Threat of new entrants', short: 'New entrants', Icon: StorePlus },
  { id: 'suppliers', n: 3, title: 'Bargaining power of suppliers', short: 'Suppliers', Icon: Fabric },
  { id: 'buyers', n: 4, title: 'Bargaining power of buyers', short: 'Buyers', Icon: Bag },
  { id: 'substitutes', n: 5, title: 'Threat of substitutes', short: 'Substitutes', Icon: Swap },
] as const;
export type ForceId = (typeof FORCES)[number]['id'];

/** Small "Part 2" series tag, bottom-right of every scene. */
export const SeriesTag: React.FC = () => (
  <div style={{ position: 'absolute', right: 60, bottom: 40, fontSize: 20, fontWeight: 600, letterSpacing: '0.14em', color: C.brownLine }}>
    BUSINESS RESEARCH SERIES · PART 2
  </div>
);

/** Source / research status badges. */
export type Status = 'used' | 'conducted' | 'suggested';
export const StatusBadge: React.FC<{ s: Status; size?: number }> = ({ s, size = 20 }) => {
  const look = {
    used: { bg: C.brown, fg: C.white, label: 'USED', border: 'none' },
    conducted: { bg: C.rose, fg: C.white, label: 'CONDUCTED', border: 'none' },
    suggested: { bg: 'transparent', fg: C.roseDeep, label: 'SUGGESTED NEXT', border: `2px dashed ${C.rose}` },
  }[s];
  return (
    <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, fontSize: size, fontWeight: 600, letterSpacing: '0.06em', background: look.bg, color: look.fg, border: look.border, whiteSpace: 'nowrap' }}>
      {look.label}
    </span>
  );
};

/**
 * Porter's diagram: rivalry in the middle, new entrants above, suppliers left, buyers right, substitutes below.
 * `litAt[i]` = frame at which force i lights up (omit for always lit); `focus` = the force to emphasise.
 */
export const ForcesDiagram: React.FC<{ x: number; y: number; scale?: number; litAt?: number[]; focus?: number; popAt?: number }> = ({ x, y, scale = 1, litAt, focus, popAt = 0 }) => {
  const f = useCurrentFrame();
  const pos = [[0, 0], [0, -1], [-1, 0], [1, 0], [0, 1]];        // rivalry, entrants, suppliers, buyers, substitutes
  const W = 330, H = 230;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
      <svg width={2 * W + 400} height={2 * H + 300} style={{ position: 'absolute', left: -W - 200, top: -H - 150, overflow: 'visible' }}>
        {[1, 2, 3, 4].map((i) => {
          const on = litAt ? interpolate(f, [litAt[i], litAt[i] + 12], [0, 1], clamp) : 1;
          const [dx, dy] = pos[i];
          return <path key={i} d={`M${W + 200 + dx * W * 0.72} ${H + 150 + dy * H * 0.7} L${W + 200 + dx * 150} ${H + 150 + dy * 90}`} stroke={C.rose} strokeWidth={6} strokeLinecap="round" strokeDasharray="2 14" opacity={on} />;
        })}
      </svg>
      {FORCES.map((F, i) => {
        const [dx, dy] = pos[i];
        const on = litAt ? interpolate(f, [litAt[i], litAt[i] + 12], [0, 1], clamp) : 1;
        const hi = focus === undefined || focus === i;
        const centre = i === 0;
        return (
          <Pop key={F.id} at={popAt + i * 4} style={{ left: dx * W - (centre ? 150 : 135), top: dy * H - (centre ? 90 : 62) }}>
            <div style={{
              width: centre ? 300 : 270, height: centre ? 180 : 124, borderRadius: centre ? 90 : 26,
              background: on > 0.5 && hi ? (centre ? C.rose : C.white) : C.sand, color: centre && on > 0.5 && hi ? C.white : C.brown,
              boxShadow: hi ? '0 12px 28px rgba(74,51,38,.12)' : 'none', opacity: hi ? 1 : 0.45,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `scale(${1 + 0.06 * on * (focus === i ? 1 : 0)})`,
            }}>
              <F.Icon size={centre ? 64 : 54} />
              <div style={{ fontSize: centre ? 30 : 26, fontWeight: 600, lineHeight: 1.15, maxWidth: 160 }}>{F.short}</div>
            </div>
          </Pop>
        );
      })}
    </div>
  );
};

/** A simple browser window frame with an address bar. Children fill its body. */
export const Browser: React.FC<{ x: number; y: number; w: number; h: number; url: string; children?: React.ReactNode }> = ({ x, y, w, h, url, children }) => (
  <div className="card" style={{ left: x, top: y, width: w, height: h, overflow: 'hidden' }}>
    <div style={{ height: 64, background: C.sand, display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px' }}>
      {[C.rose, C.beigeDeep, C.brownLine].map((c) => <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
      <div style={{ marginLeft: 20, flex: 1, height: 38, borderRadius: 19, background: C.white, display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 22, color: C.brownSoft }}>{url}</div>
    </div>
    <div style={{ position: 'relative', height: h - 64 }}>{children}</div>
  </div>
);
