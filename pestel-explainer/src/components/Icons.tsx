import React from 'react';
import { C } from '../theme';

// Simple line icons on a 100 × 100 grid: dark-brown strokes, optional rose or beige fills.
type P = { size?: number; color?: string; fill?: string; style?: React.CSSProperties };
const Svg: React.FC<P & { children: React.ReactNode }> = ({ size = 100, style, children }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible', ...style }}>{children}</svg>
);
const st = (color = C.brown, w = 5) => ({ stroke: color, strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const });

export const Building: React.FC<P> = ({ color, fill = C.beige, ...p }) => (
  <Svg {...p}>
    <path d="M14 36 L50 14 L86 36 Z" fill={fill} {...st(color)} />
    {[26, 42, 58, 74].map((x) => <rect key={x} x={x - 4} y={42} width={8} height={36} fill={C.white} {...st(color, 4)} />)}
    <path d="M12 84 H88 M18 40 H82" fill="none" {...st(color)} />
  </Svg>
);
export const Wallet: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <rect x={12} y={28} width={76} height={54} rx={10} fill={fill} {...st(color)} />
    <path d="M20 28 L66 14 L72 28" fill="none" {...st(color)} />
    <rect x={60} y={46} width={28} height={18} rx={6} fill={C.white} {...st(color, 4)} />
    <circle cx={70} cy={55} r={3} fill={color || C.brown} />
  </Svg>
);
export const People: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <circle cx={34} cy={34} r={12} fill={fill} {...st(color)} />
    <circle cx={66} cy={34} r={12} fill={C.beige} {...st(color)} />
    <path d="M12 82 Q14 54 34 54 Q54 54 56 82" fill={fill} {...st(color)} />
    <path d="M44 82 Q46 54 66 54 Q86 54 88 82" fill={C.beige} {...st(color)} />
  </Svg>
);
export const Phone: React.FC<P> = ({ color, fill = C.white, ...p }) => (
  <Svg {...p}>
    <rect x={28} y={8} width={44} height={84} rx={10} fill={fill} {...st(color)} />
    <path d="M44 18 H56" fill="none" {...st(color, 4)} />
    <circle cx={50} cy={80} r={4} fill={color || C.brown} />
  </Svg>
);
export const Leaf: React.FC<P> = ({ color, fill = C.beige, ...p }) => (
  <Svg {...p}>
    <path d="M20 80 Q16 30 80 18 Q86 74 30 80 Z" fill={fill} {...st(color)} />
    <path d="M14 88 Q40 56 70 30" fill="none" {...st(color, 4)} />
  </Svg>
);
export const Scales: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <path d="M50 14 V84 M30 86 H70 M18 28 H82" fill="none" {...st(color)} />
    <path d="M18 28 L8 56 H28 Z M82 28 L72 56 H92 Z" fill={fill} {...st(color, 4)} />
    <circle cx={50} cy={14} r={5} fill={color || C.brown} />
  </Svg>
);
export const Check: React.FC<P> = ({ color = C.white, fill = C.rose, ...p }) => (
  <Svg {...p}>
    <circle cx={50} cy={50} r={44} fill={fill} />
    <path d="M30 52 L44 66 L72 36" fill="none" {...st(color, 9)} />
  </Svg>
);
export const Tag: React.FC<P & { text?: string }> = ({ color, fill = C.white, text, ...p }) => (
  <Svg {...p}>
    <path d="M10 30 H64 L90 50 L64 70 H10 Z" fill={fill} {...st(color)} />
    <circle cx={70} cy={50} r={5} fill="none" {...st(color, 4)} />
    {text && <text x={36} y={58} textAnchor="middle" fontSize={22} fontWeight={600} fill={color || C.brown} fontFamily="Poppins">{text}</text>}
  </Svg>
);
export const Doc: React.FC<P> = ({ color, fill = C.white, ...p }) => (
  <Svg {...p}>
    <path d="M22 8 H62 L80 26 V92 H22 Z" fill={fill} {...st(color)} />
    <path d="M62 8 V26 H80 M32 44 H70 M32 58 H70 M32 72 H56" fill="none" {...st(color, 4)} />
  </Svg>
);
export const Spool: React.FC<P> = ({ color, fill = C.rose, ...p }) => (
  <Svg {...p}>
    <rect x={24} y={12} width={52} height={10} rx={4} fill={C.beige} {...st(color)} />
    <rect x={24} y={78} width={52} height={10} rx={4} fill={C.beige} {...st(color)} />
    <rect x={32} y={22} width={36} height={56} fill={fill} {...st(color)} />
    {[32, 42, 52, 62, 72].map((y) => <path key={y} d={`M32 ${y} L68 ${y - 6}`} {...st(C.white, 3)} />)}
  </Svg>
);
export const Cart: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <path d="M8 18 H22 L32 66 H80 L88 32 H26" fill={fill} {...st(color)} />
    <circle cx={38} cy={80} r={7} fill={C.white} {...st(color, 4)} />
    <circle cx={74} cy={80} r={7} fill={C.white} {...st(color, 4)} />
  </Svg>
);
export const Box: React.FC<P> = ({ color, fill = C.beige, ...p }) => (
  <Svg {...p}>
    <path d="M14 34 L50 18 L86 34 V74 L50 90 L14 74 Z" fill={fill} {...st(color)} />
    <path d="M14 34 L50 50 L86 34 M50 50 V90" fill="none" {...st(color, 4)} />
  </Svg>
);
export const Recycle: React.FC<P> = ({ color, ...p }) => (
  <Svg {...p}>
    {[0, 120, 240].map((a) => (
      <g key={a} transform={`rotate(${a} 50 50)`}>
        <path d="M34 26 A30 30 0 0 1 72 28" fill="none" {...st(color)} />
        <path d="M66 18 L74 30 L60 32" fill="none" {...st(color)} />
      </g>
    ))}
  </Svg>
);
export const Lock: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <path d="M32 44 V32 Q32 14 50 14 Q68 14 68 32 V44" fill="none" {...st(color)} />
    <rect x={22} y={44} width={56} height={44} rx={10} fill={fill} {...st(color)} />
    <circle cx={50} cy={62} r={5} fill={color || C.brown} />
    <path d="M50 66 V76" {...st(color, 5)} />
  </Svg>
);
export const Shield: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <path d="M50 8 L84 22 V48 Q84 76 50 92 Q16 76 16 48 V22 Z" fill={fill} {...st(color)} />
    <path d="M34 50 L46 62 L68 38" fill="none" {...st(color, 6)} />
  </Svg>
);
export const Spark: React.FC<P> = ({ color, fill = C.rose, ...p }) => (
  <Svg {...p}>
    <path d="M50 6 Q54 46 94 50 Q54 54 50 94 Q46 54 6 50 Q46 46 50 6 Z" fill={fill} {...st(color, 3)} />
  </Svg>
);
export const Bulb: React.FC<P> = ({ color, fill = C.roseLight, ...p }) => (
  <Svg {...p}>
    <path d="M50 8 Q80 8 80 38 Q80 54 64 66 V76 H36 V66 Q20 54 20 38 Q20 8 50 8 Z" fill={fill} {...st(color)} />
    <path d="M38 84 H62 M42 92 H58" fill="none" {...st(color)} />
  </Svg>
);
export const Heart: React.FC<P> = ({ color, fill = C.rose, ...p }) => (
  <Svg {...p}>
    <path d="M50 86 Q12 60 12 36 Q12 16 32 16 Q44 16 50 30 Q56 16 68 16 Q88 16 88 36 Q88 60 50 86 Z" fill={fill} {...st(color, 3)} />
  </Svg>
);
export const Star: React.FC<P> = ({ color, fill = C.rose, ...p }) => (
  <Svg {...p}>
    <path d="M50 8 L61 36 L91 38 L68 57 L76 88 L50 71 L24 88 L32 57 L9 38 L39 36 Z" fill={fill} {...st(color, 3)} />
  </Svg>
);
export const Store: React.FC<P> = ({ color, fill = C.white, ...p }) => (
  <Svg {...p}>
    <rect x={14} y={40} width={72} height={48} fill={fill} {...st(color)} />
    <path d="M8 40 L16 16 H84 L92 40 Z" fill={C.rose} {...st(color)} />
    {[24, 40, 56, 72].map((x) => <path key={x} d={`M${x} 16 L${x - 4} 40`} {...st(C.white, 3)} />)}
    <rect x={40} y={60} width={20} height={28} fill={C.beige} {...st(color, 4)} />
  </Svg>
);
export const House: React.FC<P> = ({ color, fill = C.white, ...p }) => (
  <Svg {...p}>
    <path d="M14 48 L50 18 L86 48 V86 H14 Z" fill={fill} {...st(color)} />
    <rect x={42} y={60} width={16} height={26} fill={C.roseLight} {...st(color, 4)} />
  </Svg>
);
export const Gear: React.FC<P> = ({ color, fill = C.beige, ...p }) => (
  <Svg {...p}>
    {[...Array(8)].map((_, i) => <rect key={i} x={44} y={6} width={12} height={20} rx={3} fill={fill} {...st(color, 4)} transform={`rotate(${i * 45} 50 50)`} />)}
    <circle cx={50} cy={50} r={28} fill={fill} {...st(color)} />
    <circle cx={50} cy={50} r={10} fill={C.white} {...st(color, 4)} />
  </Svg>
);
export const Rupee: React.FC<P> = ({ color, fill = C.rose, ...p }) => (
  <Svg {...p}>
    <circle cx={50} cy={50} r={42} fill={fill} {...st(color)} />
    <path d="M34 30 H66 M34 44 H66 M36 30 Q60 30 60 44 Q60 58 38 58 L62 76" fill="none" {...st(C.white, 6)} />
  </Svg>
);

export const FACTOR_ICON: Record<string, React.FC<P>> = {
  political: Building, economic: Wallet, social: People, technological: Phone, environmental: Leaf, legal: Scales,
};
