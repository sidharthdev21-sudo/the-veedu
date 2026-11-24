import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, Typed, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Arrow, Check, Doc, Flow, Globe, Question, Report, Search, Target, Trend, People } from '../components/Icons';
import { C, FACTORS, alpha } from '../theme';

/** The four research steps. Exported so the stand-alone flowchart poster uses exactly the same content. */
export const STEPS = [
  { n: '1', title: 'Understand the business', icon: Target, color: C.cyan,
    points: ['Products, customers and business model', 'Position in Indian women\'s fashion'] },
  { n: '2', title: 'Identify external factors', icon: Question, color: C.violet,
    points: ['Break PESTEL into six categories', 'Write questions for a clothing brand'] },
  { n: '3', title: 'Collect information', icon: Search, color: C.lime,
    points: ['Government reports and publications', 'Industry and market reports', 'Fashion trends', 'Consumer and e-commerce behaviour'] },
  { n: '4', title: 'Analyse the findings', icon: Flow, color: C.green,
    points: ['Spot opportunities and threats', 'Check relevance to Aalayam', 'Turn observations into implications'] },
];

/** One node of the flowchart: lit (current), done (green tick) or waiting. */
export const StepNode: React.FC<{ i: number; lit: number; done: boolean; x: number; y: number; w?: number }> = ({ i, lit, done, x, y, w = 360 }) => {
  const S = STEPS[i], Icon = S.icon, col = done ? C.green : S.color;
  return (
    <div className="card" style={{ left: x, top: y, width: w, height: 150, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 22, borderColor: alpha(col, 0.15 + 0.6 * lit), boxShadow: lit > 0.5 ? `0 0 44px ${alpha(col, 0.22 * lit)}` : 'none', opacity: 0.45 + 0.55 * lit }}>
      <IconBadge color={col} size={84} on={lit}>{done ? <Check size={46} color={C.green} /> : <Icon size={46} color={col} />}</IconBadge>
      <div>
        <div className="eyebrow" style={{ color: col, fontSize: 20 }}>Step {S.n}</div>
        <div className="head" style={{ fontSize: 30, lineHeight: 1.15, marginTop: 4 }}>{S.title}</div>
      </div>
    </div>
  );
};

const Mini: React.FC<{ at: number; icon?: React.ReactNode; children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({ at, icon, children, color = C.text, style }) => (
  <Pop at={at} style={{ position: 'relative', ...style }}>
    <div className="chip" style={{ fontSize: 32, padding: '16px 28px', color }}>{icon}{children}</div>
  </Pop>
);

export const Approach: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const starts = [l1.from - 4, l2.from - 4, l3.from - 4, l4.from - 4];
  const cur = starts.filter((s) => f >= s).length - 1;   // -1 before step 1
  const X = [110, 540, 970, 1400], Y = 250;
  const panel = (i: number) => ({ at: starts[i] + 8, out: i < 3 ? starts[i + 1] - 4 : undefined });
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="02 · Method" title="How we approached the research" />
      {/* connector + nodes */}
      {[0, 1, 2].map((i) => {
        const p = interpolate(f, [starts[i + 1] - 14, starts[i + 1]], [0, 1], clamp);
        return <div key={i} style={{ position: 'absolute', left: X[i] + 360, top: Y + 74, width: 70 * p, height: 3, background: C.cyan, boxShadow: `0 0 12px ${C.cyan}` }} />;
      })}
      {STEPS.map((_, i) => (
        <Pop key={i} at={l0.from + 4 + i * 5} style={{ left: 0, top: 0 }}>
          <StepNode i={i} x={X[i]} y={Y} lit={i === cur ? interpolate(f, [starts[i], starts[i] + 10], [0, 1], clamp) : i < cur ? 0.6 : 0} done={i < cur} />
        </Pop>
      ))}
      {/* detail panel for the current step */}
      <div className="card" style={{ left: 110, top: 460, width: 1690, height: 520, opacity: interpolate(f, [starts[0] - 6, starts[0] + 8], [0, 1], clamp) }} />
      <Reveal at={panel(0).at} out={panel(0).out} style={{ left: 170, top: 520, width: 1580 }}>
        <div className="eyebrow">What does Aalayam do?</div>
        <div style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
          <Mini at={wordAt(l1, 'sells')} icon={<Doc size={40} />}>Products</Mini>
          <Mini at={wordAt(l1, 'who')} icon={<People size={40} />}>Target customers</Mini>
          <Mini at={wordAt(l1, 'sells', 0) + 30} icon={<Flow size={40} />}>Business model</Mini>
        </div>
        <Pop at={wordAt(l1, 'fits')} style={{ position: 'relative', marginTop: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 36 }}>
            <Target size={56} color={C.lime} /> Positioning: <span style={{ color: C.lime, fontWeight: 600 }}>Indian women's fashion</span>
          </div>
        </Pop>
      </Reveal>
      <Reveal at={panel(1).at} out={panel(1).out} style={{ left: 170, top: 520, width: 1580 }}>
        <div className="eyebrow" style={{ color: C.violet }}>Six categories → research questions</div>
        <div style={{ display: 'flex', gap: 18, marginTop: 36 }}>
          {FACTORS.map((fa, i) => (
            <Pop key={fa.id} at={wordAt(l2, 'six') + i * 4} style={{ position: 'relative' }}>
              <div className="head" style={{ width: 92, height: 92, borderRadius: 22, display: 'grid', placeItems: 'center', fontSize: 50, color: fa.color, border: `1.5px solid ${alpha(fa.color, 0.6)}`, background: alpha(fa.color, 0.08) }}>{fa.letter}</div>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(l2, 'like')} style={{ position: 'relative', marginTop: 44 }}>
          <div className="card" style={{ position: 'relative', padding: '28px 36px', display: 'inline-flex', alignItems: 'center', gap: 22, borderColor: alpha(C.violet, 0.5) }}>
            <Question size={52} color={C.violet} />
            <Typed text="How does GST affect the price of an outfit?" a={wordAt(l2, 'how does')} b={wordAt(l2, 'outfit') + 10} style={{ fontSize: 40, fontWeight: 500 }} />
          </div>
        </Reveal>
      </Reveal>
      <Reveal at={panel(2).at} out={panel(2).out} style={{ left: 170, top: 520, width: 1580 }}>
        <div className="eyebrow" style={{ color: C.lime }}>Where the information came from</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 36, width: 1500 }}>
          {[
            { w: 'government', t: 'Government publications', I: Globe },
            { w: 'industry', t: 'Industry & market reports', I: Report },
            { w: 'fashion', t: 'Fashion trends', I: Trend },
            { w: 'news', t: 'Online shopping behaviour', I: Search },
          ].map((s) => (
            <Pop key={s.t} at={wordAt(l3, s.w)} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '22px 28px', borderRadius: 20, background: alpha(C.lime, 0.05), border: `1px solid ${alpha(C.lime, 0.3)}`, fontSize: 36, fontWeight: 500 }}>
                <s.I size={54} color={C.lime} />{s.t}
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
      <Reveal at={panel(3).at} style={{ left: 170, top: 520, width: 1580 }}>
        <div className="eyebrow" style={{ color: C.green }}>For every finding</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34, marginTop: 50 }}>
          <Pop at={wordAt(l4, 'finding')} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 36, padding: '20px 32px' }}><Doc size={46} />Finding</div></Pop>
          <Pop at={wordAt(l4, 'opportunity')} style={{ position: 'relative' }}><Arrow size={60} color={C.grey} /></Pop>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Pop at={wordAt(l4, 'opportunity')} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 34, color: C.green, borderColor: alpha(C.green, 0.6) }}>Opportunity</div></Pop>
            <Pop at={wordAt(l4, 'threat')} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 34, color: C.violet, borderColor: alpha(C.violet, 0.6) }}>Threat</div></Pop>
          </div>
          <Pop at={wordAt(l4, 'what does')} style={{ position: 'relative' }}><Arrow size={60} color={C.grey} /></Pop>
          <Pop at={wordAt(l4, 'what does') + 6} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 36, padding: '20px 32px', color: C.lime, borderColor: alpha(C.lime, 0.6) }}>What it means for Aalayam</div></Pop>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
