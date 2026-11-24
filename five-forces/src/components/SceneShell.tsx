import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C } from '../theme';
import { useFloat } from './anim';

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

/** A small rounded label that sits on the illustration. */
export const Chip: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; tone?: 'white' | 'rose' | 'brown'; size?: number }> = ({ children, icon, tone = 'white', size = 32 }) => (
  <div className="chip" style={{ fontSize: size, background: tone === 'rose' ? C.rose : tone === 'brown' ? C.brown : C.white, color: tone === 'white' ? C.brown : C.white }}>
    {icon}{children}
  </div>
);
