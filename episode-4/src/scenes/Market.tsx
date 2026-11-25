import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bars, Heart, Report, Target, Check } from '../components/Icons';
import { EvidenceChip } from '../components/Positioning';
import { MARKET, SAM_STEPS, SOM } from '../data';
import { C, alpha } from '../theme';
import { EpisodeTile } from './Customers';

const ease = (x: number) => 1 - (1 - x) ** 3;
const SourceNote: React.FC<{ text?: string }> = ({ text = 'Technopak Advisors, Industry Report on Apparel Market in India, 12 Aug 2025 · retail value · all India · FY' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><EvidenceChip kind="fact" /><span className="muted" style={{ fontSize: 21 }}>{text}</span></div>
);

/** TAM ⊃ SAM ⊃ SOM as nested glowing circles (not to scale). */
export const Nested: React.FC<{ cx: number; cy: number; lit: number[]; s?: number }> = ({ cx, cy, lit, s = 1 }) => {
  const rings = [[300, C.cyan, 'TAM', 'Total addressable'], [200, C.violet, 'SAM', 'Serviceable available'], [100, C.lime, 'SOM', 'Serviceable obtainable']] as const;
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      {rings.map(([r, c, t, d], i) => (
        <g key={t} opacity={0.2 + 0.8 * lit[i]}>
          <circle cx={cx} cy={cy + (300 - r) * s} r={r * s} fill={alpha(c, 0.06)} stroke={c} strokeWidth={3} style={{ filter: lit[i] > 0.5 ? `drop-shadow(0 0 12px ${alpha(c, 0.7)})` : 'none' }} />
          <text x={cx} y={cy + (300 - 2 * r) * s + 48 * s} textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={40 * s} fill={c}>{t}</text>
          <text x={cx} y={cy + (300 - 2 * r) * s + 78 * s} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={20 * s} fill={C.grey}>{d}</text>
        </g>
      ))}
    </svg>
  );
};

// ─── 6 · Why market sizing
export const Why: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1] = lines;
  const lit = ['TAM', 'SAM', 'SOM'].map((w) => interpolate(f, [wordAt(l1, w), wordAt(l1, w) + 10], [0, 1], clamp));
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Market sizing" title="How big is the opportunity?" />
      <div style={{ position: 'absolute', left: 110, top: 300, display: 'flex', flexDirection: 'column', gap: 30 }}>
        <Pop at={wordAt(l0, 'Sentiment')} style={{ position: 'relative' }}><div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 40 }}><IconBadge color={C.green} size={90}><Heart size={50} color={C.green} /></IconBadge>Sentiment · <span style={{ color: C.green }}>what people want</span></div></Pop>
        <Pop at={wordAt(l0, 'Market sizing')} style={{ position: 'relative' }}><div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 40 }}><IconBadge color={C.cyan} size={90}><Bars size={50} color={C.cyan} /></IconBadge>Market sizing · <span style={{ color: C.cyan }}>how big it is</span></div></Pop>
      </div>
      <Nested cx={1380} cy={560} lit={lit} s={1.05} />
    </AbsoluteFill>
  );
};

// ─── 7 · TAM
export const Tam: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const W = 1600, total = MARKET.womens;
  const grow = interpolate(f, [l0.from, l0.from + 30], [0, 1], { ...clamp, easing: ease });
  const split = interpolate(f, [wordAt(l1, 'sarees') - 10, wordAt(l1, 'sarees') + 10], [0, 1], clamp);
  const tamOn = interpolate(f, [wordAt(l2, 'TAM'), wordAt(l2, 'TAM') + 14], [0, 1], clamp);
  let x = 0;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Step 1 · TAM" title="Total addressable market" />
      <Reveal at={l0.from} style={{ left: 110, top: 250, width: 1700 }}>
        <div className="muted" style={{ fontSize: 28 }}>Indian women's apparel · FY2024</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 6 }}>
          <span className="head" style={{ fontSize: 96, color: C.cyan }}>₹2,298 bn</span>
          <Pop at={wordAt(l0, 'four trillion')} style={{ position: 'relative' }}><span style={{ fontSize: 36 }} className="muted">→ ₹4,029 bn by FY2029 <span style={{ fontSize: 24 }}>(projection, 11.9% CAGR)</span></span></Pop>
        </div>
      </Reveal>
      {/* the market bar, split into categories; only sarees + sets stay lit */}
      <div style={{ position: 'absolute', left: 110, top: 470, width: W * grow, height: 120, display: 'flex', gap: 4 * split, overflow: 'hidden', borderRadius: 18 }}>
        {MARKET.categories.map((c) => {
          const w = (c.v / total) * W, keep = c.keep;
          x += w;
          return (
            <div key={c.name} style={{ width: w, flex: 'none', height: '100%', background: keep ? alpha(C.cyan, 0.25 + 0.55 * split) : alpha(C.cyan, 0.25 - 0.17 * split), borderRight: `1px solid ${C.bg}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', opacity: split > 0 ? 1 : 1 }}>
              <div style={{ fontSize: 22, fontWeight: 600, opacity: split, color: keep ? C.bg : C.grey, whiteSpace: 'nowrap' }}>{c.name}</div>
              <div style={{ fontSize: 22, opacity: split, color: keep ? C.bg : C.grey }}>₹{c.v} bn</div>
            </div>
          );
        })}
      </div>
      <Reveal at={wordAt(l1, 'sarees')} style={{ left: 110, top: 620, width: 1600 }}>
        <div style={{ fontSize: 30 }}>Aalayam sells <b style={{ color: C.cyan }}>sarees</b> and <b style={{ color: C.cyan }}>sets</b> (co-ords assumed within "sets"), so the rest is outside its TAM.</div>
      </Reveal>
      <Pop at={wordAt(l2, 'TAM')} style={{ left: 110, top: 720 }}>
        <div className="card" style={{ position: 'relative', padding: '30px 44px', borderColor: alpha(C.cyan, 0.4 + 0.5 * tamOn), boxShadow: `0 0 60px ${alpha(C.cyan, 0.2 * tamOn)}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <span className="head" style={{ fontSize: 48 }}>TAM</span>
            <span style={{ fontSize: 34 }} className="muted">₹564 bn + ₹415 bn =</span>
            <span className="head" style={{ fontSize: 76, color: C.cyan }}>₹979 bn</span>
            <span className="muted" style={{ fontSize: 26 }}>≈ ₹97,900 crore · FY2024 · → ₹1,532 bn by FY2029</span>
          </div>
        </div>
      </Pop>
      <div style={{ position: 'absolute', left: 110, top: 960 }}><SourceNote /></div>
    </AbsoluteFill>
  );
};

// ─── 8 · SAM
export const Sam: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const at = [l0.from, wordAt(l1, 'twenty percent'), wordAt(l2, 'mid-price'), wordAt(l3, 'forty-four')];
  const widths = [1600, 1280, 1000, 820];
  const samOn = interpolate(f, [wordAt(l3, 'SAM'), wordAt(l3, 'SAM') + 14], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Heading step="Step 2 · SAM" title="Serviceable available market" color={C.violet} />
      <div style={{ position: 'absolute', left: 110, top: 240, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {SAM_STEPS.map((s, i) => {
          const p = interpolate(f, [at[i], at[i] + 18], [0, 1], { ...clamp, easing: ease }), last = i === 3;
          const col = last ? C.violet : C.cyan;
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 26, opacity: Math.min(1, p * 1.5) }}>
              <div style={{ width: widths[i] * (0.6 + 0.4 * p), height: 118, borderRadius: 18, background: alpha(col, last ? 0.12 + 0.18 * samOn : 0.1), border: `1.5px solid ${alpha(col, 0.6)}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', boxShadow: last ? `0 0 50px ${alpha(C.violet, 0.25 * samOn)}` : 'none' }}>
                <div>
                  <div style={{ fontSize: 22, color: C.grey }}>{s.factor ? `${s.factor} · ` : ''}{s.label}</div>
                  <div className="head" style={{ fontSize: last ? 54 : 46, color: col }}>₹{s.v.toLocaleString('en-IN', { maximumFractionDigits: 1 })} bn{last && <span style={{ fontSize: 28, color: C.text }}> ≈ ₹2,330 crore</span>}</div>
                </div>
                <EvidenceChip kind={s.ev} size={18} />
              </div>
            </div>
          );
        })}
      </div>
      <Reveal at={wordAt(l3, 'SAM')} style={{ left: 1000, top: 700, width: 810 }}>
        <div className="card" style={{ position: 'relative', padding: 28, fontSize: 22, lineHeight: 1.5 }}>
          <div className="eyebrow" style={{ color: C.violet, fontSize: 18 }}>Assumptions</div>
          <div style={{ marginTop: 8 }}>• 20% online share and 27% mid-price share applied to sarees and sets (report gives them for women's apparel and all apparel)</div>
          <div>• 44% ≈ women 20–40 among adults; assumes spending follows population</div>
          <div className="muted">FY2029 projection: ≈ ₹46.3 bn (25% online, 27.5% mid-price)</div>
        </div>
      </Reveal>
      <div className="muted" style={{ position: 'absolute', left: 110, top: 760, fontSize: 18 }}>Bar widths not to scale</div>
      <div style={{ position: 'absolute', left: 110, top: 960 }}><SourceNote text="Online and mid-price shares: Technopak, Aug 2025 · Age share: Technopak population data (FY2024)" /></div>
    </AbsoluteFill>
  );
};

// ─── 9 · SOM, bottom-up
const fmt = (n: number) => n.toLocaleString('en-IN');
export const Som: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const terms = [['Women reached', 'reach'], ['× Visit rate', 'share who buy'], ['× Conversion', 'share who buy'], ['× Orders / year', 'how often'], ['× Order value', 'average order']] as const;
  const yearsAt = wordAt(l2, 'two and a half'), revAt = wordAt(l3, 'fifty lakh');
  const rows: [string, (i: number) => string, string, number][] = [
    ['Women reached', (i) => fmt(SOM.reach[i]), C.cyan, yearsAt],
    ['New buyers (6% visit × 1.5% buy)', (i) => fmt(SOM.newBuyers[i]), C.cyan, wordAt(l2, 'two thousand two hundred')],
    ['Returning buyers (25%)', (i) => fmt(SOM.returning[i]), C.cyan, wordAt(l2, 'returning')],
    ['Active customers', (i) => fmt(SOM.active[i]), C.cyan, wordAt(l2, 'returning') + 10],
    ['Revenue (1.3 orders × ₹1,500), before returns', (i) => `₹${SOM.revenueLakh[i]} lakh`, C.lime, revAt],
  ];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="Step 3 · SOM" title="What Aalayam could realistically win" color={C.lime} />
      <Reveal at={l0.from} style={{ left: 1290, top: 104 }}><div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}><EvidenceChip kind="assumption" /><span className="muted" style={{ fontSize: 22 }}>Planning example, not Aalayam data</span></div></Reveal>
      <div style={{ position: 'absolute', left: 110, top: 240, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', width: 1700 }}>
        <span className="head" style={{ fontSize: 34, color: C.lime }}>Revenue =</span>
        {terms.map(([t, w], i) => (
          <Pop key={t} at={wordAt(l1, w) + (i === 2 ? 8 : 0)} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 28, borderColor: alpha(C.cyan, 0.5) }}>{t}</div></Pop>
        ))}
      </div>
      <Reveal at={yearsAt - 6} style={{ left: 110, top: 360, width: 1700 }}>
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '16px 30px', background: alpha(C.text, 0.04), fontSize: 20, fontWeight: 600, letterSpacing: '0.1em', color: C.grey }}>
            <div style={{ width: 760 }}>THREE-YEAR PLAN</div>{['YEAR 1', 'YEAR 2', 'YEAR 3'].map((y) => <div key={y} style={{ width: 300, textAlign: 'right' }}>{y}</div>)}
          </div>
          {rows.map(([label, val, c, at]) => {
            const p = interpolate(f, [at, at + 12], [0, 1], clamp);
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', padding: '20px 30px', borderTop: `1px solid ${C.line}`, fontSize: 30, opacity: 0.25 + 0.75 * p }}>
                <div style={{ width: 760 }}>{label}</div>
                {[0, 1, 2].map((i) => <div key={i} style={{ width: 300, textAlign: 'right', fontWeight: 700, color: c, fontVariantNumeric: 'tabular-nums' }}>{val(i)}</div>)}
              </div>
            );
          })}
        </div>
      </Reveal>
      <Reveal at={revAt + 10} style={{ left: 110, top: 900, width: 1700 }}>
        <div className="muted" style={{ fontSize: 22 }}>Customers (cyan) and revenue (lime) are counted separately. After an assumed 25% returns, Year 3 ≈ ₹38.5 lakh. That's about 285 orders a month, within reach of a small team.</div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 10 · Top-down vs bottom-up
export const Compare: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0] = lines;
  const p1 = interpolate(f, [wordAt(l0, 'one percent'), wordAt(l0, 'one percent') + 24], [0, 1], { ...clamp, easing: ease });
  const p2 = interpolate(f, [wordAt(l0, 'bottom-up'), wordAt(l0, 'bottom-up') + 24], [0, 1], { ...clamp, easing: ease });
  const strike = interpolate(f, [wordAt(l0, 'far more'), wordAt(l0, 'far more') + 14], [0, 1], clamp);
  const W = 1300;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} />
      <Heading step="Cross-check" title="Top-down vs bottom-up" />
      <Reveal at={l0.from} style={{ left: 110, top: 250 }}><div style={{ fontSize: 34 }}>Year 3 bottom-up SOM is about <b style={{ color: C.lime }}>0.02% of SAM</b></div></Reveal>
      <div style={{ position: 'absolute', left: 110, top: 400, display: 'flex', flexDirection: 'column', gap: 60 }}>
        <div style={{ opacity: Math.min(1, p1 * 2) }}>
          <div style={{ fontSize: 30, marginBottom: 14 }} className="muted">Top-down shortcut: "1% of SAM"</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <div style={{ position: 'relative', width: W * p1, height: 70, borderRadius: 14, background: alpha(C.grey, 0.25) }}>
              <div style={{ position: 'absolute', left: 0, top: 33, height: 4, width: `${strike * 100}%`, background: C.violet }} />
            </div>
            <span className="head" style={{ fontSize: 46, color: C.grey, textDecoration: strike > 0.5 ? 'line-through' : 'none' }}>₹23 crore</span>
          </div>
        </div>
        <div style={{ opacity: Math.min(1, p2 * 2) }}>
          <div style={{ fontSize: 30, marginBottom: 14 }}>Bottom-up plan, Year 3</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <div style={{ width: Math.max(10, W * (0.513 / 23.3) * p2), height: 70, borderRadius: 14, background: C.lime, boxShadow: `0 0 24px ${alpha(C.lime, 0.6)}` }} />
            <span className="head" style={{ fontSize: 46, color: C.lime }}>₹0.51 crore</span>
          </div>
        </div>
      </div>
      <Reveal at={wordAt(l0, 'replaced')} style={{ left: 110, top: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26 }}><Check size={36} color={C.green} />Every input can be swapped for Aalayam's real reach, conversion, order value and repeat rate.</div>
      </Reveal>
      <div className="muted" style={{ position: 'absolute', left: 110, top: 1000, fontSize: 18 }}>Bars drawn to scale</div>
    </AbsoluteFill>
  );
};

// ─── 11 · Business insights and close
export const Close: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const items = [['Priority segment', 'Women aged 20–40', 'women aged', Target], ['Focus', 'Comfortable everyday sets and sarees', 'comfortable', Heart], ['Improve', 'Fit and fabric information', 'fit and fabric', Report], ['Plan', 'Growth from real numbers', 'real numbers', Bars]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Heading step="What this means" title="Where Aalayam could focus" color={C.lime} />
        <div style={{ position: 'absolute', left: 110, top: 260, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, width: 1700 }}>
          {items.map(([k, v, w, I]) => (
            <Pop key={k} at={wordAt(l0, w)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 220, padding: 34, display: 'flex', alignItems: 'center', gap: 28, borderColor: alpha(C.lime, 0.45) }}>
                <IconBadge color={C.lime} size={100}><I size={56} color={C.lime} /></IconBadge>
                <div><div className="eyebrow" style={{ color: C.lime }}>{k}</div><div className="head" style={{ fontSize: 40, marginTop: 6 }}>{v}</div></div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={l0.from + 30} style={{ left: 110, top: 770 }}><div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><EvidenceChip kind="recommendation" /><span className="muted" style={{ fontSize: 24 }}>Test first: size guidance and true-to-life photos · validate with Aalayam's own customers</span></div></Reveal>
      </div>
      <Reveal at={l1.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 170, display: 'flex', gap: 26 }}>
          {[[1, 'PESTEL', C.cyan, 'competitive'], [2, 'Five Forces', C.violet, 'competitive'], [3, 'Positioning', C.lime, 'competitive'], [4, 'Customers & market', C.green, 'sentiment']].map(([n, t, c, w]) => (
            <Pop key={t as string} at={wordAt(l1, w as string) + (n as number) * 4} style={{ position: 'relative' }}><EpisodeTile n={n as number} title={t as string} color={c as string} w={400} /></Pop>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 110, top: 470, display: 'flex', gap: 40, fontSize: 30 }}>
          {[['competitive', 'Understood the market', C.lime], ['sentiment', 'Began to understand the customer', C.green], ['TAM', 'Estimated the opportunity', C.cyan]].map(([w, t, c]) => (
            <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Check size={36} color={c} />{t}</div></Pop>
          ))}
        </div>
        <Reveal at={l2.from + 10} style={{ left: 0, top: 660, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 120, letterSpacing: '-0.02em' }}>Aalayam</div>
          <div style={{ fontSize: 26, letterSpacing: '0.5em', color: C.cyan, marginTop: 14, fontWeight: 500 }}>BY ANAMIKA · BUSINESS RESEARCH SERIES · EPISODE 4</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
