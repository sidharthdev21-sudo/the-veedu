import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { C } from '../theme';

export type Pose = 'stand' | 'wave' | 'hold' | 'think' | 'cheer';

/**
 * A simple, friendly character: an Indian woman in a co-ord set (or a saree drape).
 * Drawn in a 200 × 420 box; place it with x/y (feet centre) and size (height in px).
 * `item` is drawn in her right hand when the pose is 'hold'.
 */
export const Woman: React.FC<{
  x: number; y: number; size?: number; outfit?: string; trim?: string; skin?: string;
  pose?: Pose; saree?: boolean; flip?: boolean; seed?: number; item?: React.ReactNode; style?: React.CSSProperties;
}> = ({ x, y, size = 420, outfit = C.rose, trim = C.roseDeep, skin = C.skin, pose = 'stand', saree = false, flip = false, seed = 0, item, style }) => {
  const f = useCurrentFrame() + seed * 37;
  const bob = Math.sin(f / 22) * 2.2;                              // breathing
  const blink = (f % 110) < 5 ? 0.15 : 1;
  const wave = Math.sin(f / 5) * 16;
  // arm angles (degrees from straight down; positive = away from the body)
  const [l, r] =
    pose === 'wave' ? [12, 150 + wave] :
    pose === 'hold' ? [12, 62] :
    pose === 'think' ? [12, 140] :
    pose === 'cheer' ? [150 + Math.sin(f / 7) * 8, 150 - Math.sin(f / 7) * 8] : [10, 10];
  const s = size / 420;
  const arm = (side: -1 | 1, ang: number) => (
    <g transform={`translate(${100 + side * 40} 122) rotate(${side * ang})`}>
      <rect x={-11} y={-6} width={22} height={pose === 'think' && side === 1 ? 78 : 96} rx={11} fill={outfit} />
      <circle cx={0} cy={pose === 'think' && side === 1 ? 80 : 98} r={12} fill={skin} />
    </g>
  );
  return (
    <div style={{ position: 'absolute', left: x - 100 * s, top: y - 420 * s, width: 200 * s, height: 420 * s, transform: flip ? 'scaleX(-1)' : undefined, ...style }}>
      <svg viewBox="0 0 200 420" width={200 * s} height={420 * s} style={{ overflow: 'visible' }}>
        <ellipse cx={100} cy={414} rx={62} ry={8} fill={C.brown} opacity={0.12} />
        <g transform={`translate(0 ${bob})`}>
          {/* legs: trousers of the co-ord, or the saree's pleats */}
          {saree ? (
            <path d="M58 222 L142 222 L156 400 L44 400 Z" fill={outfit} />
          ) : (
            <>
              <path d="M62 226 L98 226 L94 392 L70 392 Z" fill={outfit} />
              <path d="M102 226 L138 226 L130 392 L106 392 Z" fill={outfit} />
            </>
          )}
          <ellipse cx={80} cy={398} rx={20} ry={8} fill={C.brown} />
          <ellipse cx={120} cy={398} rx={20} ry={8} fill={C.brown} />
          {arm(-1, l)}
          {/* top */}
          <path d="M62 112 Q100 100 138 112 L148 232 Q100 244 52 232 Z" fill={outfit} />
          <path d="M52 226 Q100 238 148 226" stroke={trim} strokeWidth={6} fill="none" />
          {[[84, 150], [112, 168], [92, 196], [122, 138], [72, 182]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3.2} fill={C.white} opacity={0.7} />
          ))}
          {saree && <path d="M64 114 Q118 160 146 236 L128 240 Q104 176 60 128 Z" fill={trim} opacity={0.9} />}
          {/* neck, head, hair */}
          <rect x={90} y={90} width={20} height={24} rx={8} fill={skin} />
          <circle cx={132} cy={34} r={20} fill={C.hair} />
          <circle cx={100} cy={58} r={36} fill={skin} />
          <path d="M64 58 Q64 18 102 20 Q138 22 136 56 Q118 36 92 40 Q74 44 64 58 Z" fill={C.hair} />
          <ellipse cx={87} cy={62} rx={4} ry={5 * blink} fill={C.hair} />
          <ellipse cx={113} cy={62} rx={4} ry={5 * blink} fill={C.hair} />
          <path d="M90 76 Q100 84 110 76" stroke={C.hair} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <circle cx={100} cy={46} r={3} fill={C.roseDeep} />
          <circle cx={65} cy={70} r={4} fill={C.roseLight} />
          <circle cx={135} cy={70} r={4} fill={C.roseLight} />
          {arm(1, r)}
          {pose === 'hold' && item && <g transform="translate(176 192)">{item}</g>}
        </g>
      </svg>
    </div>
  );
};

/** Walks a character in from off-screen between frames a and b. */
export const useWalk = (a: number, b: number, from: number, to: number) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moving = f > a && f < b;
  return { x, hop: moving ? Math.abs(Math.sin(f / 4)) * -8 : 0 };
};
