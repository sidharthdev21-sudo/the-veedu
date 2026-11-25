import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, Typed, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Globe, Report, Search, Sheet, Store, Target, Bars, Tag } from '../components/Icons';
import { EvidenceChip } from '../components/Positioning';
import { C, FACTORS, alpha } from '../theme';
import type { Evidence } from '../data';

/** A series tile: one part of the research series. */
export const SeriesTile: React.FC<{ part: string; title: string; color: string; lit: number; children?: React.ReactNode; w?: number }> = ({ part, title, color, lit, children, w = 480 }) => (
  <div className="card" style={{ position: 'relative', width: w, padding: 34, borderColor: alpha(color, 0.15 + 0.6 * lit), boxShadow: lit > 0.5 ? `0 0 50px ${alpha(color, 0.18)}` : 'none', opacity: 0.4 + 0.6 * lit }}>
    <div className="eyebrow" style={{ color }}>{part}</div>
    <div className="head" style={{ fontSize: 44, marginTop: 6 }}>{title}</div>
    {children && <div style={{ marginTop: 26 }}>{children}</div>}
  </div>
);

const MiniPestel: React.FC = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    {FACTORS.map((f) => <div key={f.id} className="head" style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 28, color: f.color, border: `1.5px solid ${alpha(f.color, 0.6)}` }}>{f.letter}</div>)}
  </div>
);
const MiniForces: React.FC = () => (
  <svg width={300} height={150} viewBox="0 0 300 150">
    {[[150, 75, 70, 34], [150, 18, 54, 22], [40, 75, 54, 22], [260, 75, 54, 22], [150, 132, 54, 22]].map(([x, y, w, h], i) => (
      <rect key={i} x={x - w} y={y - h / 2 - (i ? 0 : 0)} width={2 * w} height={h} rx={h / 2} fill={i ? 'none' : alpha(C.violet, 0.25)} stroke={C.violet} strokeWidth={2} />
    ))}
  </svg>
);

export const Recap: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const p1 = useLit(wordAt(l0, 'In Part 1')), p2 = useLit(wordAt(l0, 'In Part 2')), p3 = useLit(l1.from - 4);
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Reveal at={0} out={l2.from - 6} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <Pop at={wordAt(l0, 'In Part 1')} style={{ left: 130, top: 170 }}><SeriesTile part="Part 1" title="PESTEL" color={C.cyan} lit={p1}><MiniPestel /></SeriesTile></Pop>
        <Pop at={wordAt(l0, 'In Part 2')} style={{ left: 720, top: 170 }}><SeriesTile part="Part 2" title="Five Forces" color={C.violet} lit={p2}><MiniForces /></SeriesTile></Pop>
        <Pop at={l1.from - 6} style={{ left: 1310, top: 170 }}><SeriesTile part="Part 3" title="Competition" color={C.lime} lit={p3} w={480}><div className="muted" style={{ fontSize: 26 }}>&amp; positioning</div></SeriesTile></Pop>
        <Reveal at={l1.from + 4} style={{ left: 130, top: 640, width: 1660 }}>
          <div className="card" style={{ position: 'relative', padding: '40px 48px', borderColor: alpha(C.lime, 0.5) }}>
            <Typed text="Who does Aalayam really compete with, and where could it stand apart?" a={wordAt(l1, 'who exactly')} b={wordAt(l1, 'apart') + 12} style={{ fontSize: 50, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }} />
          </div>
        </Reveal>
      </Reveal>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="head" style={{ position: 'absolute', top: 170, width: 1920, textAlign: 'center', fontSize: 60 }}>Two research tools</div>
        {[{ w: 'four levels', t: 'Four levels of competition', d: 'Who competes for the same customer, directly and indirectly', c: C.cyan, ic: 'rings' }, { w: 'perceptual', t: 'Perceptual mapping', d: 'Where each brand sits in the customer’s mind', c: C.violet, ic: 'map' }].map((k, i) => (
          <Pop key={k.t} at={wordAt(l2, k.w)} style={{ left: 230 + i * 760, top: 340 }}>
            <div className="card" style={{ position: 'relative', width: 700, height: 460, padding: 44, borderColor: alpha(k.c, 0.55), boxShadow: `0 0 50px ${alpha(k.c, 0.14)}` }}>
              <svg width={200} height={170} viewBox="0 0 200 170">
                {k.ic === 'rings' ? [80, 60, 40, 20].map((r, j) => <circle key={r} cx={100} cy={85} r={r} fill="none" stroke={k.c} strokeWidth={3} opacity={0.35 + j * 0.2} />)
                  : <><path d="M20 150 H190 M20 150 V10" stroke={C.grey} strokeWidth={3} />{[[60, 110], [90, 90], [130, 60], [160, 40], [110, 120]].map(([x, y], j) => <circle key={j} cx={x} cy={y} r={8} fill={j === 2 ? 'none' : k.c} stroke={k.c} strokeWidth={3} />)}</>}
              </svg>
              <div className="head" style={{ fontSize: 46, marginTop: 24, color: k.c }}>{k.t}</div>
              <div className="muted" style={{ fontSize: 28, marginTop: 10, lineHeight: 1.35 }}>{k.d}</div>
            </div>
          </Pop>
        ))}
      </Reveal>
    </AbsoluteFill>
  );
};

const EVIDENCE: [Evidence, string][] = [['fact', 'verified fact'], ['observed', 'observed'], ['interpretation', 'interpretation'], ['hypothesis', 'hypothesis'], ['recommendation', 'recommendation']];

export const Method: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [, l1, l2, l3] = lines;
  const brief = [['co-ord', 'Co-ord sets & sarees', Tag], ['women', 'Women aged 20–40', Target], ['about one', '≈ ₹1,000–1,700', Bars], ['online', 'Online-first (Shopify)', Store], ['online', 'Kerala → India → NRI', Globe]] as const;
  const sources = [['Nykaa', 'Nykaa Fashion'], ['Flipkart', 'Flipkart'], ['Amazon', 'Amazon India'], ['brand websites', 'Brand websites'], ['news', 'News & brand profiles']] as const;
  const copy = interpolate(f, [wordAt(l2, 'recorded'), wordAt(l2, 'recorded') + 30], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Method" title="How we researched it" />
      {/* the brief */}
      <Reveal at={l1.from - 6} style={{ left: 110, top: 250 }}>
        <div className="card" style={{ position: 'relative', width: 760, padding: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="eyebrow">Starting point · Aalayam's brief</div>
            <span className="badge" style={{ color: C.violet, border: `1.5px dashed ${alpha(C.violet, 0.6)}`, fontSize: 18 }}>FROM THE BRIEF</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 30 }}>
            {brief.map(([w, t, I], i) => (
              <Reveal key={t} at={wordAt(l1, w) + (i === 4 ? 14 : 0)} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 34, fontWeight: 500 }}><IconBadge size={64} on={0.6}><I size={34} /></IconBadge>{t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
      {/* where we looked */}
      <div style={{ position: 'absolute', left: 950, top: 250, width: 860 }}>
        <Reveal at={l2.from - 6} style={{ position: 'relative' }}><div className="eyebrow" style={{ color: C.lime }}>Where we looked</div></Reveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24 }}>
          {sources.map(([w, t], i) => (
            <Pop key={t} at={wordAt(l2, w)} style={{ position: 'relative' }}>
              <div className="chip" style={{ fontSize: 28, borderColor: alpha(C.lime, 0.5) }}>{i < 3 ? <Search size={32} color={C.lime} /> : i === 3 ? <Globe size={32} color={C.lime} /> : <Report size={32} color={C.lime} />}{t}</div>
            </Pop>
          ))}
        </div>
        {/* a listing price copied into the research sheet */}
        <Reveal at={wordAt(l2, 'recorded') - 6} style={{ position: 'relative', marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div className="card" style={{ position: 'relative', width: 330, padding: 24 }}>
              <div className="muted" style={{ fontSize: 20 }}>Product listing</div>
              <div style={{ fontSize: 26, fontWeight: 600, marginTop: 6 }}>Cotton-blend co-ord</div>
              <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8, color: C.cyan, transform: `translateX(${copy * 40}px)`, opacity: 1 - copy * 0.6 }}>₹1,480 <span className="muted" style={{ fontSize: 22, fontWeight: 500, textDecoration: 'line-through' }}>₹1,999</span></div>
            </div>
            <div className="card" style={{ position: 'relative', width: 330, padding: 24, borderColor: alpha(C.cyan, 0.5 * copy) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Sheet size={30} /><span className="muted" style={{ fontSize: 20 }}>Research sheet</span></div>
              <div style={{ fontSize: 26, marginTop: 10, opacity: copy }}>Libas · <b style={{ color: C.cyan }}>₹1,480</b> · 26% off</div>
              <div className="muted" style={{ fontSize: 18, marginTop: 6, opacity: copy }}>listing seen 24 Nov 2026</div>
            </div>
          </div>
        </Reveal>
      </div>
      {/* every point labelled */}
      <Reveal at={l3.from - 6} style={{ left: 110, top: 870, width: 1700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span className="muted" style={{ fontSize: 26, marginRight: 10 }}>Every point is labelled</span>
          {EVIDENCE.map(([k, w]) => <Pop key={k} at={wordAt(l3, w)} style={{ position: 'relative' }}><EvidenceChip kind={k} size={22} /></Pop>)}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
