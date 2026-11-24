import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, IconBadge, Line, useLit } from './ui';
import { Pop, clamp } from './anim';
import { FACTOR_ICON } from './Icons';
import { C, FACTORS, FactorId, alpha } from '../theme';

/**
 * One PESTEL dimension, always in the same three steps:
 *   What we investigated (line 1) → What we discovered (line 2) → Why it matters to Aalayam (line 3).
 * Each column lights up while its line is spoken; `discovered` is a small animated illustration plus short findings.
 */
export const FactorScene: React.FC<{
  factor: FactorId; lines: Line[];
  investigated: string[];
  discovered: { visual: React.ReactNode; points: string[] };
  matters: string;
}> = ({ factor, lines, investigated, discovered, matters }) => {
  const f = useCurrentFrame();
  const idx = FACTORS.findIndex((x) => x.id === factor), F = FACTORS[idx], Icon = FACTOR_ICON[factor];
  const [l0, l1, l2] = lines;
  const lit = [useLit(l0.from - 4), useLit(l1.from - 4), useLit(l2.from - 4)];
  const active = f >= l2.from - 4 ? 2 : f >= l1.from - 4 ? 1 : 0;
  const head = interpolate(f, [0, 16], [0, 1], clamp);
  const col = (i: number, title: string, body: React.ReactNode, x: number, w: number) => (
    <div className="card" style={{
      left: x, top: 300, width: w, height: 650, padding: 40, opacity: 0.3 + 0.7 * lit[i],
      borderColor: alpha(F.color, i === active ? 0.6 : 0.12), boxShadow: i === active ? `0 0 50px ${alpha(F.color, 0.14)}` : 'none',
      transform: `translateY(${(1 - lit[i]) * 20}px)`,
    }}>
      <div className="eyebrow" style={{ color: i === active ? F.color : C.grey, fontSize: 22 }}>{['01', '02', '03'][i]} · {title}</div>
      <div style={{ marginTop: 30 }}>{body}</div>
    </div>
  );
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={F.color} />
      {/* header */}
      <div style={{ position: 'absolute', left: 110, top: 74, display: 'flex', alignItems: 'center', gap: 28, opacity: head }}>
        <IconBadge color={F.color} size={116}><Icon size={64} color={F.color} /></IconBadge>
        <div>
          <div className="eyebrow" style={{ color: F.color }}>04 · PESTEL dimension {idx + 1} of 6</div>
          <div className="head" style={{ fontSize: 76, lineHeight: 1.05, marginTop: 6 }}><span style={{ color: F.color }}>{F.letter}</span>{F.title.slice(1)}</div>
        </div>
      </div>
      {/* six-dot progress */}
      <div style={{ position: 'absolute', right: 110, top: 130, display: 'flex', gap: 14, opacity: head }}>
        {FACTORS.map((x, i) => (
          <div key={x.id} className="head" style={{ width: 54, height: 54, borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 26, color: i === idx ? C.bg : i < idx ? C.green : C.grey, background: i === idx ? F.color : 'transparent', border: `1.5px solid ${i === idx ? F.color : i < idx ? alpha(C.green, 0.5) : C.line}` }}>{x.letter}</div>
        ))}
      </div>
      {col(0, 'What we investigated', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {investigated.map((t, i) => (
            <Pop key={t} at={l0.from + 6 + i * 7} style={{ position: 'relative' }}>
              <div className="chip" style={{ fontSize: 28, borderColor: alpha(F.color, 0.35) }}><span style={{ width: 10, height: 10, borderRadius: 5, background: F.color }} />{t}</div>
            </Pop>
          ))}
        </div>
      ), 110, 500)}
      {col(1, 'What we discovered', (
        <div>
          <div style={{ position: 'relative', height: 270 }}>{discovered.visual}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
            {discovered.points.map((t, i) => (
              <Pop key={t} at={l1.from + 10 + i * Math.round(l1.durationInFrames / (discovered.points.length + 0.5))} style={{ position: 'relative' }}>
                <div style={{ fontSize: 30, lineHeight: 1.3, display: 'flex', gap: 14 }}><span style={{ color: F.color }}>→</span>{t}</div>
              </Pop>
            ))}
          </div>
        </div>
      ), 650, 620)}
      {col(2, 'Why it matters', (
        <Pop at={l2.from + 4} style={{ position: 'relative' }}>
          <div className="head" style={{ fontSize: 50, lineHeight: 1.15, fontWeight: 500 }}>{matters}</div>
          <div style={{ marginTop: 34, height: 6, width: 120, borderRadius: 3, background: F.color, boxShadow: `0 0 18px ${F.color}` }} />
        </Pop>
      ), 1310, 500)}
    </AbsoluteFill>
  );
};
