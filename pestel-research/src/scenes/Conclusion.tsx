import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, IconBadge, Line, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bulb, FACTOR_ICON, Question, Search, Sheet, Spark, Target } from '../components/Icons';
import { C, FACTORS, alpha } from '../theme';
import { Wordmark } from './Intro';

/** The whole research journey, in order. Each node lights when its words are spoken. */
export const JOURNEY = [
  { t: 'Business understanding', w: 'understand', I: Target, c: C.cyan },
  { t: 'Research questions', w: 'ask', I: Question, c: C.violet },
  { t: 'Information gathering', w: 'gather', I: Search, c: C.lime },
  { t: 'AI-assisted analysis', w: 'analyse', I: Spark, c: C.violet },
  { t: 'PESTEL classification', w: 'sort', I: Sheet, c: C.cyan },
  { t: 'Business insights', w: 'insights', I: Bulb, c: C.green },
];

export const Conclusion: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 8], [1, 0], clamp);
  const X = (i: number) => 110 + i * 290, Y = (i: number) => (i % 2 ? 560 : 400);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Reveal at={0} style={{ left: 110, top: 80 }}><div className="eyebrow" style={{ color: C.green }}>06 · Our research journey</div></Reveal>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          {JOURNEY.slice(1).map((_, i) => {
            const a = wordAt(l0, JOURNEY[i + 1].w), p = interpolate(f, [a - 12, a], [0, 1], clamp);
            const x0 = X(i) + 135, y0 = Y(i) + 80, x1 = X(i + 1) + 135, y1 = Y(i + 1) + 80;
            return <path key={i} d={`M${x0} ${y0} L${x0 + (x1 - x0) * p} ${y0 + (y1 - y0) * p}`} stroke={C.cyan} strokeWidth={4} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${C.cyan})` }} />;
          })}
        </svg>
        {JOURNEY.map((n, i) => {
          const at = wordAt(l0, n.w), lit = interpolate(f, [at, at + 10], [0, 1], clamp);
          return (
            <Pop key={n.t} at={at - 6} style={{ left: X(i), top: Y(i) }}>
              <div style={{ width: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <IconBadge color={n.c} size={160} on={lit}><n.I size={84} color={n.c} /></IconBadge>
                <div className="head" style={{ fontSize: 28, marginTop: 20, lineHeight: 1.2 }}>{n.t}</div>
              </div>
            </Pop>
          );
        })}
      </div>
      {/* back to the brand, now surrounded by its six understood forces */}
      <Reveal at={l1.from} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        {FACTORS.map((fa, i) => {
          const a = -Math.PI / 2 + (i / 6) * Math.PI * 2, x = 960 + Math.cos(a) * 560, y = 470 + Math.sin(a) * 300, Icon = FACTOR_ICON[fa.id];
          return (
            <Pop key={fa.id} at={l1.from + 6 + i * 4} style={{ left: x - 56, top: y - 56 }}>
              <IconBadge color={fa.color} size={112} on={1}><Icon size={58} color={fa.color} /></IconBadge>
            </Pop>
          );
        })}
        <div style={{ position: 'absolute', left: 0, top: 370, width: 1920 }}><Wordmark at={l1.from + 4} size={130} /></div>
        <Reveal at={wordAt(l1, 'better-informed')} style={{ left: 0, top: 870, width: 1920, textAlign: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 500 }}>Understand the outside world. <span style={{ color: C.green }}>Decide with confidence.</span></div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
