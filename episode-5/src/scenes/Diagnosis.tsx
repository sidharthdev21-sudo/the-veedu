import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Heart, Search, Bars, Store, Chat, Globe, Hanger, Target } from '../components/Icons';
import { SWOT, TOWS, Tag } from '../data';
import { C, alpha } from '../theme';

const TAG: Record<Tag, [string, string]> = { F: ['FACT', C.green], P: ['PUBLIC', C.cyan], O: ['OWNER', C.lime], H: ['HYPOTHESIS', C.violet], M: ['MISSING', C.grey] };
export const TagChip: React.FC<{ tag: Tag }> = ({ tag }) => {
  const [l, c] = TAG[tag];
  return <span className="badge" style={{ fontSize: 15, padding: '3px 10px', color: c, border: `1.5px ${tag === 'H' || tag === 'M' ? 'dashed' : 'solid'} ${alpha(c, 0.6)}`, flex: 'none' }}>{l}</span>;
};
export const Provisional: React.FC<{ text?: string }> = ({ text = 'Provisional · no internal sales data · assumptions labelled' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 14, border: `2px dashed ${alpha(C.violet, 0.7)}`, color: C.violet, background: alpha(C.violet, 0.06), fontSize: 21, fontWeight: 600 }}>{text}</div>
);

// ─── 1 · Recap
export const Recap: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const cards = [['praised comfort', 'Comfort praised', Heart, C.green], ['struggled with fit', 'Fit struggles', Hanger, C.violet], ['doubted', 'Photos doubted', Search, C.cyan], ['two thousand', 'SAM ≈ ₹2,330 crore', Bars, C.lime]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Episode 4 · recap" title="What we learned about customers and the market" />
      <div style={{ position: 'absolute', left: 110, top: 300, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, width: 1700 }}>
        {cards.map(([w, t, I, c]) => (
          <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', height: 280, padding: 34, borderColor: alpha(c, 0.5) }}>
              <IconBadge color={c} size={84}><I size={46} color={c} /></IconBadge>
              <div className="head" style={{ fontSize: 36, marginTop: 30, lineHeight: 1.15 }}>{t}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l1.from - 4} style={{ left: 0, top: 700, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 76 }}>Now: <span style={{ color: C.lime }}>decide where to focus</span></div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 2 · The strategic question
export const Question: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const units = [['co-ord sets', 'Co-ord sets'], ['sarees', 'Sarees'], ['kurta sets', 'Kurta sets / kurtis']] as const;
  const channels = [['website', 'Website (Shopify)', Store], ['Instagram', 'Instagram / WhatsApp', Chat], ['marketplaces', 'Marketplaces', Search], ['exhibitions', 'Exhibitions', Globe]] as const;
  const split = interpolate(f, [wordAt(l1, 'invest equally'), wordAt(l1, 'invest equally') + 30], [0, 1], clamp);
  const fw = [['SWOT', 'Diagnose the position', C.cyan], ['BCG', 'Growth vs share', C.violet], ['GE-McKinsey', 'Attractiveness vs strength', C.lime]] as const;
  const out1 = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Heading step="The strategic question" title="Where should Aalayam focus its resources?" />
      <div style={{ position: 'absolute', inset: 0, opacity: out1 }}>
        <div style={{ position: 'absolute', left: 110, top: 260 }}>
          <div className="eyebrow">Portfolio</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
            {units.map(([w, t]) => <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 32, padding: '16px 30px', borderColor: alpha(C.cyan, 0.6) }}>{t}</div></Pop>)}
          </div>
          <div className="eyebrow" style={{ marginTop: 40, color: C.violet }}>Channels</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
            {channels.map(([w, t, I]) => <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 28, borderColor: alpha(C.violet, 0.5) }}><I size={34} color={C.violet} />{t}</div></Pop>)}
          </div>
        </div>
        {/* limited resources: one budget can't cover 3 × 4 equally */}
        <Reveal at={wordAt(l1, 'invest equally') - 6} style={{ left: 110, top: 640, width: 1700 }}>
          <div className="muted" style={{ fontSize: 28 }}>One small team, one budget</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14, height: 70 }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ flex: 1 + split * (i === 0 ? 1.6 : i === 1 ? 0.3 : -0.6), borderRadius: 14, background: alpha([C.lime, C.cyan, C.violet][i], 0.25 + 0.4 * split), border: `1.5px solid ${alpha([C.lime, C.cyan, C.violet][i], 0.6)}` }} />)}
          </div>
          <div className="head" style={{ fontSize: 40, marginTop: 24, opacity: split }}>Can't invest equally in everything, so <span style={{ color: C.lime }}>choose</span>.</div>
        </Reveal>
      </div>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 290, display: 'flex', gap: 30 }}>
          {fw.map(([t, d, c], i) => (
            <Pop key={t} at={wordAt(l2, t)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 546, height: 330, padding: 40, borderColor: alpha(c, 0.6), boxShadow: `0 0 50px ${alpha(c, 0.14)}` }}>
                <div className="eyebrow" style={{ color: c }}>Framework {i + 1}</div>
                <div className="head" style={{ fontSize: 60, color: c, marginTop: 14 }}>{t}</div>
                <div style={{ fontSize: 32, marginTop: 20 }}>{d}</div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={l3.from - 4} style={{ left: 110, top: 720 }}><Provisional /></Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 3 · SWOT
const QUAD = [['S', 'Strengths', 'Internal', C.green], ['W', 'Weaknesses', 'Internal', C.violet], ['O', 'Opportunities', 'External', C.cyan], ['T', 'Threats', 'External', C.lime]] as const;
export const Swot: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, ...L] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Framework 1 · SWOT" title="Strategic diagnosis" />
      <div style={{ position: 'absolute', left: 110, top: 220, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 22, width: 1700, height: 790 }}>
        {QUAD.map(([k, name, kind, c], i) => {
          const lit = useLit(L[i].from - 4);
          return (
            <Pop key={k} at={l0.from + 4 + i * 4} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 384, padding: '26px 32px', borderColor: alpha(c, 0.15 + 0.6 * lit), boxShadow: lit > 0.5 ? `0 0 44px ${alpha(c, 0.14)}` : 'none', opacity: 0.35 + 0.65 * lit }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <span className="head" style={{ fontSize: 56, color: c, lineHeight: 1 }}>{k}</span>
                  <span className="head" style={{ fontSize: 34 }}>{name}</span>
                  <span className="muted" style={{ fontSize: 20, marginLeft: 'auto' }}>{kind}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
                  {SWOT[k].map((it, j) => (
                    <Reveal key={it.t} at={L[i].from + 6 + j * Math.round(L[i].durationInFrames / 5)} dir="left" style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 27, lineHeight: 1.25 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 5, background: c, flex: 'none' }} />
                        <span style={{ flex: 1 }}>{it.t}</span><TagChip tag={it.tag} />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 4 · TOWS
export const Tows: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, ...L] = lines;
  const col: Record<string, string> = { SO: C.lime, WO: C.cyan, ST: C.violet, WT: C.green };
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Heading step="TOWS" title="From diagnosis to action" color={C.lime} />
      <Reveal at={l0.from} style={{ left: 110, top: 210 }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 26 }} className="muted">Pair each internal factor with each external one <span style={{ color: C.text }}>→ four kinds of strategy</span></div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 290, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, width: 1700 }}>
        {TOWS.map((s, i) => {
          const lit = useLit(L[i].from - 4), c = col[s.k];
          return (
            <Pop key={s.k} at={L[i].from - 4} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 330, padding: 38, borderColor: alpha(c, 0.2 + 0.5 * lit), boxShadow: `0 0 50px ${alpha(c, 0.12 * lit)}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div className="head" style={{ width: 96, height: 96, borderRadius: 24, display: 'grid', placeItems: 'center', fontSize: 40, color: C.bg, background: c }}>{s.k}</div>
                  <div className="muted" style={{ fontSize: 26 }}>{s.name}</div>
                </div>
                <div className="head" style={{ fontSize: 42, lineHeight: 1.2, marginTop: 34 }}>{s.t}</div>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export { Target };
