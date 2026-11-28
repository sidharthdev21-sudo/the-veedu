import React from 'react';
import { C } from '../theme';

// Thin line icons on a 100 × 100 grid. Generic symbols only: no company logos.
export type IconProps = { size?: number; color?: string; style?: React.CSSProperties };
const Svg: React.FC<IconProps & { children: React.ReactNode }> = ({ size = 80, color = C.cyan, style, children }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible', ...style }}>
    {children}
  </svg>
);
type I = React.FC<IconProps>;

export const Building: I = (p) => <Svg {...p}><path d="M14 38 L50 14 L86 38 Z M12 86 H88 M18 42 H82" />{[28, 44, 56, 72].map((x) => <path key={x} d={`M${x} 48 V78`} />)}</Svg>;
export const Rupee: I = (p) => <Svg {...p}><circle cx={50} cy={50} r={40} /><path d="M34 32 H66 M34 46 H66 M36 32 Q60 32 60 46 Q60 60 38 60 L62 76" /></Svg>;
export const People: I = (p) => <Svg {...p}><circle cx={34} cy={34} r={12} /><circle cx={68} cy={36} r={10} /><path d="M12 82 Q14 54 34 54 Q54 54 56 82 M58 82 Q60 58 70 56 Q86 56 88 82" /></Svg>;
export const Phone: I = (p) => <Svg {...p}><rect x={28} y={8} width={44} height={84} rx={10} /><path d="M44 18 H56" /><circle cx={50} cy={80} r={3} /></Svg>;
export const Leaf: I = (p) => <Svg {...p}><path d="M20 80 Q16 30 80 18 Q86 74 30 80 Z" /><path d="M14 88 Q40 56 70 30" /></Svg>;
export const Scales: I = (p) => <Svg {...p}><path d="M50 14 V84 M30 86 H70 M18 28 H82 M18 28 L8 56 H28 Z M82 28 L72 56 H92 Z" /></Svg>;
export const Search: I = (p) => <Svg {...p}><circle cx={42} cy={42} r={26} /><path d="M62 62 L86 86" /></Svg>;
export const Globe: I = (p) => <Svg {...p}><circle cx={50} cy={50} r={38} /><path d="M12 50 H88 M50 12 Q30 50 50 88 Q70 50 50 12" /></Svg>;
export const Trend: I = (p) => <Svg {...p}><path d="M10 86 H90 M10 86 V14" /><path d="M20 70 L38 52 L52 62 L80 28" /><path d="M66 28 H80 V42" /></Svg>;
export const Report: I = (p) => <Svg {...p}><path d="M22 8 H62 L80 26 V92 H22 Z M62 8 V26 H80" /><path d="M34 78 V66 M46 78 V56 M58 78 V62 M70 78 V48" /></Svg>;
export const Spark: I = (p) => <Svg {...p}><path d="M50 8 Q54 46 92 50 Q54 54 50 92 Q46 54 8 50 Q46 46 50 8 Z" /></Svg>;
export const Chat: I = (p) => <Svg {...p}><path d="M14 20 H86 V66 H44 L26 82 V66 H14 Z" /><path d="M30 38 H70 M30 50 H56" /></Svg>;
export const Sheet: I = (p) => <Svg {...p}><rect x={12} y={16} width={76} height={68} rx={6} /><path d="M12 36 H88 M12 56 H88 M38 16 V84 M64 16 V84" /></Svg>;
export const Slides: I = (p) => <Svg {...p}><rect x={10} y={14} width={80} height={54} rx={6} /><path d="M50 68 V84 M34 88 L50 76 L66 88 M24 54 L40 38 L52 48 L74 28" /></Svg>;
export const Store: I = (p) => <Svg {...p}><path d="M14 42 V86 H86 V42 M8 42 L18 16 H82 L92 42 Z M42 86 V62 H58 V86" /></Svg>;
export const Box: I = (p) => <Svg {...p}><path d="M14 34 L50 18 L86 34 V74 L50 90 L14 74 Z M14 34 L50 50 L86 34 M50 50 V90" /></Svg>;
export const Doc: I = (p) => <Svg {...p}><path d="M22 8 H62 L80 26 V92 H22 Z M62 8 V26 H80 M32 44 H70 M32 58 H70 M32 72 H56" /></Svg>;
export const Lock: I = (p) => <Svg {...p}><path d="M32 44 V32 Q32 14 50 14 Q68 14 68 32 V44" /><rect x={22} y={44} width={56} height={44} rx={10} /><path d="M50 60 V72" /></Svg>;
export const Shield: I = (p) => <Svg {...p}><path d="M50 8 L84 22 V48 Q84 76 50 92 Q16 76 16 48 V22 Z M34 50 L46 62 L68 38" /></Svg>;
export const Check: I = (p) => <Svg {...p}><path d="M22 52 L42 72 L80 30" /></Svg>;
export const Tag: I = (p) => <Svg {...p}><path d="M10 30 H64 L90 50 L64 70 H10 Z" /><circle cx={70} cy={50} r={5} /></Svg>;
export const Spool: I = (p) => <Svg {...p}><path d="M24 14 H76 M24 86 H76 M32 14 V86 M68 14 V86 M32 34 L68 28 M32 50 L68 44 M32 66 L68 60" /></Svg>;
export const Bulb: I = (p) => <Svg {...p}><path d="M50 8 Q80 8 80 38 Q80 54 64 66 V76 H36 V66 Q20 54 20 38 Q20 8 50 8 Z M38 86 H62" /></Svg>;
export const Question: I = (p) => <Svg {...p}><circle cx={50} cy={50} r={40} /><path d="M38 38 Q38 24 50 24 Q64 24 64 38 Q64 48 50 52 V60" /><circle cx={50} cy={74} r={2} /></Svg>;
export const Mic: I = (p) => <Svg {...p}><rect x={36} y={10} width={28} height={50} rx={14} /><path d="M24 46 Q24 72 50 72 Q76 72 76 46 M50 72 V88 M36 88 H64" /></Svg>;
export const Bars: I = (p) => <Svg {...p}><path d="M10 88 H90 M24 88 V60 M44 88 V36 M64 88 V48 M84 88 V18" /></Svg>;
export const Heart: I = (p) => <Svg {...p}><path d="M50 84 Q14 60 14 36 Q14 18 32 18 Q44 18 50 32 Q56 18 68 18 Q86 18 86 36 Q86 60 50 84 Z" /></Svg>;
export const House: I = (p) => <Svg {...p}><path d="M14 48 L50 18 L86 48 V86 H14 Z M42 86 V62 H58 V86" /></Svg>;
export const Hanger: I = (p) => <Svg {...p}><path d="M50 30 Q50 16 60 16 Q68 16 68 24 Q68 30 50 40 L10 72 H90 L50 40" /></Svg>;
export const Target: I = (p) => <Svg {...p}><circle cx={50} cy={50} r={38} /><circle cx={50} cy={50} r={22} /><circle cx={50} cy={50} r={6} /></Svg>;
export const Flow: I = (p) => <Svg {...p}><rect x={8} y={36} width={24} height={28} rx={6} /><rect x={68} y={36} width={24} height={28} rx={6} /><path d="M32 50 H68 M58 42 L68 50 L58 58" /></Svg>;
export const NoBag: I = (p) => <Svg {...p}><path d="M26 34 H74 L70 88 H30 Z M38 34 Q38 18 50 18 Q62 18 62 34" /><path d="M14 14 L86 86" /></Svg>;
export const Arrow: I = (p) => <Svg {...p}><path d="M10 50 H86 M66 30 L86 50 L66 70" /></Svg>;

export const FACTOR_ICON: Record<string, I> = {
  political: Building, economic: Rupee, social: People, technological: Phone, environmental: Leaf, legal: Scales,
};
