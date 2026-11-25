import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0 → 1 over `dur` frames starting at `at`, eased out. */
export const useProgress = (at: number, dur = 18) => {
  const f = useCurrentFrame();
  return interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing: ease });
};

/** A soft spring that starts at frame `at` (slight overshoot, settles in ~0.6 s). */
export const usePop = (at: number, damping = 13) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - at, fps, config: { damping, stiffness: 140, mass: 0.7 } });
};

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';
const offset = (dir: Dir, d: number): [number, number] =>
  dir === 'up' ? [0, d] : dir === 'down' ? [0, -d] : dir === 'left' ? [d, 0] : dir === 'right' ? [-d, 0] : [0, 0];

/** Fades and slides its children in at `at`; optionally out again at `out`. */
export const Reveal: React.FC<{
  at: number; out?: number; dir?: Dir; dist?: number; dur?: number; style?: React.CSSProperties; children: React.ReactNode;
}> = ({ at, out, dir = 'up', dist = 36, dur = 18, style, children }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing: ease });
  const q = out === undefined ? 0 : interpolate(f, [out, out + 12], [0, 1], { ...clamp, easing: ease });
  const [dx, dy] = offset(dir, dist);
  return (
    <div style={{ position: 'absolute', opacity: p * (1 - q), transform: `translate(${dx * (1 - p) - dx * 0.4 * q}px, ${dy * (1 - p) - dy * 0.4 * q}px)`, ...style }}>
      {children}
    </div>
  );
};

/** Scales its children in with a spring, around their centre. */
export const Pop: React.FC<{ at: number; out?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, out, style, children }) => {
  const f = useCurrentFrame();
  const s = usePop(at);
  const q = out === undefined ? 0 : interpolate(f, [out, out + 10], [0, 1], clamp);
  return (
    <div style={{ position: 'absolute', transform: `scale(${s * (1 - q * 0.3)})`, opacity: Math.min(1, s * 1.5) * (1 - q), ...style }}>
      {children}
    </div>
  );
};

/** Gentle idle motion so nothing on screen is ever completely frozen. */
export const useFloat = (amp = 6, period = 90, phase = 0) => {
  const f = useCurrentFrame();
  return Math.sin(((f + phase) / period) * Math.PI * 2) * amp;
};
