import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, Typed, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bars, Check, Mic, Search, Sheet, Store, Bulb, Scales } from '../components/Icons';
import { EvidenceChip } from '../components/Positioning';
import { POSITIONING, RECS } from '../data';
import { C, alpha } from '../theme';
import { SeriesTile } from './Opening';

export const Insights: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const cards = [
    { w: 'most crowded', t: 'Competes in the most crowded band', d: 'Co-ords at ₹1,000–2,000, sold on discounts', I: Bars, c: C.cyan },
    { w: 'strongest', t: 'Direct threats', d: 'Mass brands with marketplace reach', I: Store, c: C.violet },
    { w: 'tailors', t: 'Indirect pull', d: 'Tailors and local boutiques', I: Scales, c: C.lime },
  ];
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Insights" title="Where this leaves Aalayam" />
      <div style={{ position: 'absolute', left: 110, top: 250, display: 'flex', gap: 28 }}>
        {cards.map((k) => (
          <Pop key={k.t} at={wordAt(l0, k.w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', width: 548, height: 250, padding: 32, borderColor: alpha(k.c, 0.5) }}>
              <IconBadge color={k.c} size={72}><k.I size={40} color={k.c} /></IconBadge>
              <div className="head" style={{ fontSize: 32, marginTop: 18 }}>{k.t}</div>
              <div className="muted" style={{ fontSize: 24, marginTop: 6 }}>{k.d}</div>
            </div>
          </Pop>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 140, top: 520 }}><Reveal at={l0.from + 20} style={{ position: 'relative' }}><EvidenceChip kind="interpretation" /></Reveal></div>
      <Reveal at={l1.from - 4} style={{ left: 110, top: 590, width: 1700 }}>
        <div className="card" style={{ position: 'relative', padding: '40px 50px', borderColor: alpha(C.lime, 0.6), boxShadow: `0 0 60px ${alpha(C.lime, 0.12)}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span className="eyebrow" style={{ color: C.lime }}>Draft positioning statement</span>
            <span className="badge" style={{ fontSize: 18, color: C.violet, border: `1.5px dashed ${alpha(C.violet, 0.6)}` }}>DRAFT FOR VALIDATION</span>
          </div>
          <div style={{ marginTop: 22, minHeight: 200 }}>
            <Typed text={POSITIONING} a={wordAt(l1, 'for women')} b={l1.from + l1.durationInFrames} style={{ fontSize: 42, lineHeight: 1.35, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }} />
          </div>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

export const Recs: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Heading step="Recommendations" title="Four moves to test" color={C.lime} />
      <Reveal at={wordAt(l0, 'recommendations')} style={{ right: 110, top: 104 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 14, border: `2px solid ${C.lime}`, color: C.lime, background: alpha(C.lime, 0.06), fontSize: 22, fontWeight: 600 }}><Bulb size={30} color={C.lime} />Recommendations · not current capabilities</div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 270, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, width: 1700 }}>
        {RECS.map((r, i) => {
          const lit = useLit(wordAt(l1, r.w));
          return (
            <Pop key={r.t} at={l0.from + 6 + i * 5} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 300, padding: 40, borderColor: alpha(C.lime, 0.12 + 0.6 * lit), boxShadow: lit > 0.5 ? `0 0 50px ${alpha(C.lime, 0.14)}` : 'none', opacity: 0.4 + 0.6 * lit }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div className="head" style={{ width: 66, height: 66, borderRadius: 18, display: 'grid', placeItems: 'center', fontSize: 34, color: C.bg, background: lit > 0.5 ? C.lime : C.grey }}>{i + 1}</div>
                  <div className="head" style={{ fontSize: 38, lineHeight: 1.15 }}>{r.t}</div>
                </div>
                <div className="muted" style={{ fontSize: 28, marginTop: 24, lineHeight: 1.35 }}>{r.d}</div>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Close: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const steps = [['survey', 'Customer perception survey (50+)', Search], ['interviews', '10–15 customer interviews', Mic], ['price list', "Aalayam's own price list", Sheet]] as const;
  const tiles = [['PESTEL', 'Part 1', 'PESTEL', 'the environment', C.cyan], ['Five Forces', 'Part 2', 'Five Forces', 'the industry', C.violet], ['now we know', 'Part 3', 'Positioning', 'where Aalayam stands', C.lime]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Heading step="Next" title="Validate before deciding" color={C.green} />
        <div style={{ position: 'absolute', left: 110, top: 280, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {steps.map(([w, t, I]) => (
            <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontSize: 40, fontWeight: 500 }}>
                <IconBadge color={C.green} size={96}><I size={52} color={C.green} /></IconBadge>{t}
              </div>
            </Pop>
          ))}
        </div>
      </div>
      <Reveal at={l1.from - 6} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 130, top: 200, display: 'flex', gap: 60 }}>
          {tiles.map(([w, part, title, sub, c]) => (
            <Pop key={part} at={wordAt(l1, w)} style={{ position: 'relative' }}>
              <SeriesTile part={part} title={title} color={c} lit={1} w={500}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28 }}><Check size={36} color={c} />{sub}</div>
              </SeriesTile>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(l1, 'now we know') + 20} style={{ left: 0, top: 640, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 120, letterSpacing: '-0.02em' }}>Aalayam</div>
          <div style={{ fontSize: 26, letterSpacing: '0.5em', color: C.cyan, marginTop: 14, fontWeight: 500 }}>BY ANAMIKA · BUSINESS RESEARCH SERIES</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
