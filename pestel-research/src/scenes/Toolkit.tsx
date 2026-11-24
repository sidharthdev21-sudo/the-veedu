import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, RecBadge, UsedBadge, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bars, Chat, Check, Globe, Mic, Report, Search, Sheet, Slides, Spark, Trend } from '../components/Icons';
import { C, alpha } from '../theme';

/**
 * The research toolkit. `used: true` marks what the team confirmed they used; the "recommended next" list is kept
 * separate so the video never presents a recommendation as something that was done.
 */
export const TOOLS = [
  { name: 'Google Search', job: 'Finding reports, articles and market trends', icon: Search, color: C.cyan, line: 1, word: 'Google Search' },
  { name: 'Government websites', job: 'Reliable facts on GST, textile policy and consumer rules', icon: Globe, color: C.cyan, line: 1, word: 'government' },
  { name: 'Google Trends', job: 'How search interest in styles changes', icon: Trend, color: C.lime, line: 2, word: 'Google Trends' },
  { name: 'Industry reports', job: 'The Indian apparel market and online shopping', icon: Report, color: C.lime, line: 2, word: 'industry' },
  { name: 'Claude', job: 'Organising and summarising findings, spotting patterns', icon: Spark, color: C.violet, line: 3, word: 'Claude' },
  { name: 'ChatGPT', job: 'Brainstorming questions, drafting recommendations', icon: Chat, color: C.violet, line: 3, word: 'ChatGPT' },
  { name: 'Google Sheets', job: 'Sorting findings under the six PESTEL headings', icon: Sheet, color: C.green, line: 4, word: 'Google Sheets' },
  { name: 'Canva / slides', job: 'Structuring and presenting the analysis', icon: Slides, color: C.green, line: 4, word: 'Canva' },
].map((t) => ({ ...t, used: true }));

export const RECOMMENDED = [
  { name: 'Customer interviews', job: 'Hear directly what shoppers want', icon: Mic },
  { name: "Aalayam's own sales data", job: 'Test the findings against real orders', icon: Bars },
];

export const ToolCard: React.FC<{ t: (typeof TOOLS)[number]; lit: number; x: number; y: number }> = ({ t, lit, x, y }) => (
  <div className="card" style={{ left: x, top: y, width: 400, height: 238, padding: 28, borderColor: alpha(t.color, 0.12 + 0.45 * lit), boxShadow: lit > 0.5 ? `0 0 40px ${alpha(t.color, 0.15)}` : 'none', opacity: 0.4 + 0.6 * lit }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconBadge color={t.color} size={74} on={lit}><t.icon size={40} color={t.color} /></IconBadge>
      {lit > 0.5 && <UsedBadge />}
    </div>
    <div className="head" style={{ fontSize: 32, marginTop: 20 }}>{t.name}</div>
    <div className="muted" style={{ fontSize: 23, lineHeight: 1.35, marginTop: 8 }}>{t.job}</div>
  </div>
);

export const Toolkit: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, , , , , l5] = lines;
  const check = wordAt(l5, 'checked');
  const rec = wordAt(l5, 'recommend');
  const pos = (i: number) => ({ x: 110 + (i % 4) * 430, y: 240 + Math.floor(i / 4) * 310 });
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Heading step="03 · Toolkit" title="Our research toolkit" />
      {TOOLS.map((t, i) => {
        const at = wordAt(lines[t.line], t.word);
        const lit = useLit(at);
        const { x, y } = pos(i);
        return <Pop key={t.name} at={l0.from + 4 + i * 3} style={{ left: 0, top: 0 }}><ToolCard t={t} lit={lit} x={x} y={y} /></Pop>;
      })}
      {/* fact-check: the AI cards are checked against the original sources */}
      <div style={{ position: 'absolute', left: 110, top: 509, height: 4, borderRadius: 2, width: 830 * interpolate(f, [check, check + 20], [0, 1], clamp), background: C.green, boxShadow: `0 0 14px ${C.green}` }} />
      <Pop at={check + 14} style={{ left: 240, top: 484 }}>
        <div className="chip" style={{ fontSize: 26, color: C.green, borderColor: alpha(C.green, 0.6), background: C.bg }}><Check size={34} color={C.green} />AI output checked against original sources</div>
      </Pop>
      {/* recommended next: clearly separate from what was used */}
      <Reveal at={rec} style={{ left: 110, top: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <div className="eyebrow" style={{ color: C.violet, width: 230 }}>Recommended next</div>
          {RECOMMENDED.map((r, i) => (
            <Pop key={r.name} at={rec + 6 + i * 8} style={{ position: 'relative' }}>
              <div style={{ width: 640, height: 150, borderRadius: 24, border: `2px dashed ${alpha(C.violet, 0.55)}`, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
                <IconBadge color={C.violet} size={74}><r.icon size={40} color={C.violet} /></IconBadge>
                <div style={{ flex: 1 }}>
                  <div className="head" style={{ fontSize: 30 }}>{r.name}</div>
                  <div className="muted" style={{ fontSize: 22, marginTop: 4 }}>{r.job}</div>
                </div>
                <RecBadge />
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
