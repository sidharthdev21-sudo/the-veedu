import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, DrawPath, Heading, IconBadge, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Store, Tag as TagIcon, Spark, Hanger, Globe, People } from '../components/Icons';
import { OPPS, Quad, score, GROUPS, FACTORS, CURVES, CONCEPTS } from '../data';
import { C, alpha } from '../theme';
import { col, Note } from './Customer';

// ─── 5 · Ansoff Matrix
const QUADS: { q: Quad; t: string; d: string; c: string; x: number; y: number }[] = [
  { q: 'MP', t: 'Market penetration', d: 'Existing products · existing markets', c: C.cyan, x: 0, y: 0 },
  { q: 'PD', t: 'Product development', d: 'New products · existing markets', c: C.lime, x: 1, y: 0 },
  { q: 'MD', t: 'Market development', d: 'Existing products · new markets', c: C.violet, x: 0, y: 1 },
  { q: 'DV', t: 'Diversification', d: 'New products · new markets', c: C.grey, x: 1, y: 1 },
];
const STATUS: Record<string, [string, string]> = { avoid: ['AVOID', C.violet], waitlist: ['WAITLIST', C.cyan], 'not now': ['NOT NOW', C.grey], primary: ['TOP IDEA', C.lime] };
const StatusChip: React.FC<{ s?: string }> = ({ s }) => {
  if (!s) return null;
  const [t, c] = STATUS[s];
  return <span className="badge" style={{ fontSize: 14, padding: '2px 9px', color: s === 'primary' ? C.bg : c, background: s === 'primary' ? C.lime : 'transparent', border: `1.5px solid ${alpha(c, 0.7)}` }}>{t}</span>;
};

export const Ansoff: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4, l5] = lines;
  const qAt: Record<Quad, number> = { MP: l1.from - 4, MD: l2.from - 4, PD: l3.from - 4, DV: l4.from - 4 };
  const out = interpolate(f, [l5.from - 8, l5.from + 4], [1, 0], clamp);
  const X0 = 250, Y0 = 290, W = 780, H = 340, G = 20;
  const ranked = [...OPPS].sort((a, b) => score(b) - score(a) || b.a - a.a);
  const qc: Record<Quad, string> = { MP: C.cyan, MD: C.violet, PD: C.lime, DV: C.grey };
  const qn: Record<Quad, string> = { MP: 'Penetration', MD: 'Market dev.', PD: 'Product dev.', DV: 'Diversification' };
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Framework 1 · Ansoff Matrix" title="Four ways to grow" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Reveal at={l0.from + 10} style={{ left: X0, top: Y0 - 50, width: 2 * W + G, display: 'flex' }}>
          <div className="eyebrow" style={{ width: W + G, textAlign: 'center', fontSize: 20 }}>Existing products</div>
          <div className="eyebrow" style={{ width: W, textAlign: 'center', fontSize: 20, color: C.lime }}>New products</div>
        </Reveal>
        {['Existing markets', 'New markets'].map((t, i) => (
          <Reveal key={t} at={l0.from + 14} style={{ left: 110, top: Y0 + i * (H + G) + H / 2 - 20, width: 130 }}>
            <div className="eyebrow" style={{ fontSize: 18, color: i ? C.violet : C.cyan, lineHeight: 1.3 }}>{t.split(' ')[0]}<br />markets</div>
          </Reveal>
        ))}
        {QUADS.map((Q, k) => {
          const lit = useLit(qAt[Q.q]), items = OPPS.filter((o) => o.q === Q.q);
          return (
            <Pop key={Q.q} at={l0.from + 6 + k * 5} style={{ left: X0 + Q.x * (W + G), top: Y0 + Q.y * (H + G) }}>
              <div className="card" style={{ position: 'relative', width: W, height: H, padding: '22px 28px', borderColor: alpha(Q.c, 0.15 + 0.6 * lit), boxShadow: `0 0 44px ${alpha(Q.c, 0.12 * lit)}`, opacity: 0.4 + 0.6 * lit }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span className="head" style={{ fontSize: 36, color: Q.c }}>{Q.t}</span>
                  <span className="muted" style={{ fontSize: 19 }}>{Q.d}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
                  {items.map((o, j) => (
                    <Reveal key={o.id} at={qAt[Q.q] + 10 + j * 12} dir="left" style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 27, opacity: o.status === 'not now' || o.status === 'avoid' ? 0.7 : 1 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 5, background: Q.c, flex: 'none' }} />
                        <span style={{ textDecoration: o.status === 'avoid' ? 'line-through' : 'none' }}>{o.t}</span>
                        <StatusChip s={o.status} />
                        <span className="muted" style={{ marginLeft: 'auto', fontSize: 20, fontVariantNumeric: 'tabular-nums' }}>A{o.a} · F{o.f}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Pop>
          );
        })}
        <Reveal at={l0.from + 40} style={{ left: X0, top: 1015 }}><div className="muted" style={{ fontSize: 20 }}>A = attractiveness · F = feasibility · 1–5 · research-based estimates, not measurements</div></Reveal>
      </div>
      {/* ranking */}
      <Reveal at={l5.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 232 }}>Growth opportunity ranking · average of A and F</div>
        {ranked.map((o, i) => {
          const c = qc[o.q], p = interpolate(f, [l5.from + i * 3, l5.from + i * 3 + 24], [0, 1], clamp), top = o.status === 'primary';
          return (
            <div key={o.id} style={{ position: 'absolute', left: 110, top: 280 + i * 55, width: 1230, height: 48, display: 'flex', alignItems: 'center', gap: 16, opacity: p, borderRadius: 12, background: top ? alpha(C.lime, 0.1) : 'transparent', border: top ? `1.5px solid ${alpha(C.lime, 0.6)}` : '1.5px solid transparent', padding: '0 12px' }}>
              <span className="head muted" style={{ width: 40, fontSize: 24 }}>{o.status === 'avoid' ? '—' : i + 1 - (ranked.slice(0, i).some((x) => x.status === 'avoid') ? 1 : 0)}</span>
              <span style={{ width: 430, fontSize: 25, fontWeight: top ? 700 : 500, textDecoration: o.status === 'avoid' ? 'line-through' : 'none' }}>{o.t}</span>
              <span className="badge" style={{ width: 170, justifyContent: 'center', fontSize: 15, color: c, border: `1.5px solid ${alpha(c, 0.55)}` }}>{qn[o.q]}</span>
              <div style={{ width: 400, height: 18, borderRadius: 9, background: alpha(C.text, 0.06) }}><div style={{ width: 400 * (score(o) / 5) * p, height: 18, borderRadius: 9, background: top ? C.lime : alpha(c, 0.7) }} /></div>
              <span className="head" style={{ fontSize: 24, color: top ? C.lime : C.text, fontVariantNumeric: 'tabular-nums' }}>{score(o).toFixed(1)}</span>
            </div>
          );
        })}
        <Pop at={wordAt(l5, 'primary direction')} style={{ left: 1390, top: 280, width: 420 }}>
          <div className="card" style={{ position: 'relative', padding: 30, borderColor: alpha(C.lime, 0.8), boxShadow: `0 0 50px ${alpha(C.lime, 0.2)}` }}>
            <div className="eyebrow" style={{ color: C.lime, fontSize: 20 }}>Primary direction</div>
            <div className="head" style={{ fontSize: 42, marginTop: 8, lineHeight: 1.1 }}>Product development</div>
            <div style={{ fontSize: 23, marginTop: 14, lineHeight: 1.35 }}>Sell a better-fitting co-ord to the customers Aalayam already reaches</div>
          </div>
        </Pop>
        <Pop at={wordAt(l5, 'enablers')} style={{ left: 1390, top: 600, width: 420 }}>
          <div className="card" style={{ position: 'relative', padding: 30, borderColor: alpha(C.cyan, 0.6) }}>
            <div className="eyebrow" style={{ fontSize: 20 }}>Enablers, not the strategy</div>
            <div style={{ fontSize: 23, marginTop: 12, lineHeight: 1.4 }}>Fit-transparent pages · WhatsApp review loop</div>
            <div className="muted" style={{ fontSize: 20, marginTop: 10 }}>Score as high, but any rival can copy a size chart</div>
          </div>
        </Pop>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 6 · Competitive landscape
export const Landscape: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3] = lines;
  const at = [wordAt(l1, 'unbranded'), wordAt(l1, 'Mass'), l3.from - 4];
  const icons = [TagIcon, Store, Spark];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Heading step="Competitive landscape" title="How competitors actually compete" color={C.violet} />
      <div style={{ position: 'absolute', left: 110, top: 250, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, width: 1700 }}>
        {[GROUPS[0], GROUPS[1], GROUPS[2]].map((g, i) => {
          const c = col(g.color), I = icons[i];
          return (
            <Pop key={g.t} at={i === 0 ? at[1] - 10 : at[i]} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 420, padding: 32, borderColor: alpha(c, 0.5) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><IconBadge color={c} size={70}><I size={38} color={c} /></IconBadge><div className="head" style={{ fontSize: 34 }}>{g.t}</div></div>
                <div className="head" style={{ fontSize: 30, color: c, marginTop: 22 }}>{g.price}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
                  {g.facts.map((t) => <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 26 }}><span style={{ width: 9, height: 9, borderRadius: 5, background: c, flex: 'none' }} />{t}</div>)}
                </div>
              </div>
            </Pop>
          );
        })}
      </div>
      <Reveal at={wordAt(l1, 'almost everyone')} style={{ left: 110, top: 700 }}>
        <div className="head" style={{ fontSize: 34 }}>Shared practice: <span style={{ color: C.violet }}>one size for top and bottom</span>, high MRP, constant discounts</div>
      </Reveal>
      <Reveal at={l2.from - 4} style={{ left: 110, top: 790, width: 1700 }}>
        <div style={{ display: 'flex', gap: 26 }}>
          <div className="card" style={{ position: 'relative', flex: 1, padding: '26px 32px', borderColor: alpha(C.lime, 0.55), display: 'flex', alignItems: 'center', gap: 26 }}>
            <div className="head" style={{ fontSize: 68, color: C.lime, whiteSpace: 'nowrap' }}>20–30%</div>
            <div><div style={{ fontSize: 28 }}>of online fashion orders returned,<br />mostly for size and fit</div><div className="muted" style={{ fontSize: 18, marginTop: 6 }}>Indicative industry estimates · Unicommerce, Grant Thornton Bharat</div></div>
          </div>
          <Reveal at={l3.from + 20} style={{ position: 'relative', flex: 1 }}>
            <div className="card" style={{ position: 'relative', padding: '26px 32px', height: 150, borderColor: alpha(C.cyan, 0.55), display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: 30 }}>Fit flexibility exists, but <span style={{ color: C.cyan, fontWeight: 700 }}>only at premium prices</span>, slowly, without returns</div>
            </div>
          </Reveal>
        </div>
      </Reveal>
      <Reveal at={l0.from + 30} style={{ right: 110, top: 100 }}><Note color={C.cyan} text="Observed listings and policies · Episodes 3 and 6" /></Reveal>
    </AbsoluteFill>
  );
};

// ─── 7 · Blue Ocean opportunities
export const BlueOcean: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const sel = useLit(wordAt(l2, 'The first'));
  const icons = [Hanger, Globe, People];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Heading step="Framework 2 · Blue Ocean Strategy" title="Create value, don’t just compete" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        {[
          ['Red ocean', 'Beat rivals on the same factors', ['Lower price', 'Deeper discounts', 'More styles'], C.violet, l0.from + 10],
          ['Blue ocean', 'Offer value the market isn’t offering', ['Solve an unmet need', 'Win noncustomers', 'Make rivals less relevant'], C.cyan, wordAt(l0, 'what value')],
        ].map(([t, d, items, c, at], i) => (
          <Reveal key={t as string} at={at as number} dir={i ? 'right' : 'left'} style={{ left: 110 + i * 870, top: 280, width: 830 }}>
            <div className="card" style={{ position: 'relative', height: 560, padding: 44, borderColor: alpha(c as string, 0.6), background: `linear-gradient(160deg, ${alpha(c as string, 0.1)}, ${C.card} 60%)` }}>
              <div className="head" style={{ fontSize: 64, color: c as string }}>{t as string}</div>
              <div style={{ fontSize: 32, marginTop: 14 }}>{d as string}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44 }}>
                {(items as string[]).map((x) => <div key={x} style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 32 }}><span style={{ width: 12, height: 12, borderRadius: 6, background: c as string }} />{x}</div>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal at={l1.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 236 }}>Three potential concepts</div>
        <div style={{ position: 'absolute', left: 110, top: 290, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, width: 1700 }}>
          {CONCEPTS.map((k, i) => {
            const c = [C.lime, C.violet, C.cyan][i], I = icons[i], chosen = i === 0;
            const dim = i === 0 ? 1 : 1 - 0.35 * sel;
            return (
              <Pop key={k.t} at={wordAt(l1, ['fit-confident', 'Kerala', 'winning'][i])} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', height: 540, padding: 34, opacity: dim, borderColor: alpha(c, chosen ? 0.4 + 0.5 * sel : 0.45), boxShadow: chosen ? `0 0 ${60 * sel}px ${alpha(C.lime, 0.25 * sel)}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><IconBadge color={c} size={70}><I size={38} color={c} /></IconBadge><div className="head" style={{ fontSize: 30, color: c }}>Concept {k.n}</div></div>
                  <div className="head" style={{ fontSize: 40, marginTop: 22, lineHeight: 1.15 }}>{k.t}</div>
                  <div className="muted" style={{ fontSize: 25, marginTop: 14, lineHeight: 1.3 }}>{k.who}</div>
                  <div style={{ position: 'absolute', left: 34, right: 34, bottom: 34 }}>
                    <div className="muted" style={{ fontSize: 19, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Evidence</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>{[0, 1, 2].map((j) => <div key={j} style={{ flex: 1, height: 12, borderRadius: 6, background: j < k.ev ? c : alpha(C.text, 0.08) }} />)}</div>
                    <div style={{ fontSize: 23, marginTop: 10 }}>{k.evT}</div>
                    <div className="badge" style={{ marginTop: 16, fontSize: 16, color: C.violet, border: `1.5px dashed ${alpha(C.violet, 0.7)}` }}>POTENTIAL · NOT PROVEN</div>
                  </div>
                  <Pop at={wordAt(l2, i === 1 ? 'design layer' : 'The first') + (i === 2 ? 10 : 0)} style={{ right: 24, top: 24 }}>
                    <span className="badge" style={{ fontSize: 17, color: chosen ? C.bg : c, background: chosen ? C.lime : 'transparent', border: `1.5px solid ${c}` }}>{k.fate.toUpperCase()}</span>
                  </Pop>
                </div>
              </Pop>
            );
          })}
        </div>
        <Reveal at={wordAt(l2, 'None')} style={{ left: 110, top: 880 }}>
          <div className="head" style={{ fontSize: 34 }}>Taken forward: <span style={{ color: C.lime }}>Concept 1</span>, with Concept 2’s Kerala detail as its design layer</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 8 · Strategy canvas
const CX = (i: number) => 330 + i * 200;
const CY = (v: number) => 840 - (v - 1) * 115;
export const Canvas: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3] = lines;
  const at = [l1.from + 4, wordAt(l1, 'mass brands'), l2.from, l3.from + 10];
  const path = (v: number[]) => v.map((y, i) => `${i ? 'L' : 'M'}${CX(i)} ${CY(y)}`).join(' ');
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="Blue Ocean · strategy canvas" title="Where the value curves overlap, and break away" color={C.lime} />
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v} opacity={useLit(l0.from + v * 3)}>
            <line x1={260} x2={1790} y1={CY(v)} y2={CY(v)} stroke={C.line} strokeWidth={1.5} />
            <text x={230} y={CY(v) + 8} fill={C.grey} fontSize={22} textAnchor="end" fontFamily="Inter">{v}</text>
          </g>
        ))}
        <text x={150} y={CY(3)} fill={C.grey} fontSize={20} transform={`rotate(-90 150 ${CY(3)})`} textAnchor="middle" fontFamily="Inter" opacity={useLit(l0.from + 10)}>Offering level (1 low · 5 high)</text>
      </svg>
      {FACTORS.map((t, i) => (
        <Reveal key={t} at={l0.from + 20 + i * 4} style={{ left: CX(i) - 95, top: 870, width: 190, textAlign: 'center' }}>
          <div style={{ fontSize: 22, lineHeight: 1.2, fontWeight: i >= 3 && i <= 4 || i === 7 ? 700 : 500, color: i >= 3 && i <= 4 || i === 7 ? C.lime : C.text }}>{t}</div>
        </Reveal>
      ))}
      {CURVES.map((cv, k) => {
        const c = col(cv.color);
        return (
          <React.Fragment key={cv.k}>
            <DrawPath d={path(cv.v)} a={at[k]} b={at[k] + 40} color={c} width={cv.k === 'aalayam' ? 6 : 4} />
            {cv.v.map((v, i) => (
              <Pop key={i} at={at[k] + 4 + i * 5} style={{ left: CX(i) - 10, top: CY(v) - 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: C.bg, border: `4px solid ${c}`, boxShadow: cv.k === 'aalayam' ? `0 0 14px ${c}` : 'none' }} />
              </Pop>
            ))}
          </React.Fragment>
        );
      })}
      <div style={{ position: 'absolute', left: 1240, top: 205, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 26px' }}>
        {CURVES.map((cv, k) => (
          <Reveal key={cv.k} at={at[k]} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: cv.k === 'aalayam' ? 700 : 500 }}><span style={{ width: 28, height: 5, borderRadius: 3, background: col(cv.color) }} />{cv.t}</div>
          </Reveal>
        ))}
      </div>
      <Pop at={wordAt(l1, 'same shape')} style={{ left: 260, top: 250 }}>
        <div className="badge" style={{ fontSize: 20, color: C.violet, border: `1.5px solid ${alpha(C.violet, 0.7)}`, background: alpha(C.bg, 0.8) }}>Same shape: high on discounts and range, low on fit</div>
      </Pop>
      <Pop at={wordAt(l3, 'far more')} style={{ left: 260, top: 300 }}>
        <div className="badge" style={{ fontSize: 22, color: C.bg, background: C.lime }}>The gap: fit confidence at a mid price</div>
      </Pop>
      <Reveal at={l0.from + 30} style={{ left: 260, top: 975 }}>
        <div className="muted" style={{ fontSize: 20 }}>Competitor groups: research-based estimates from listings, policies and reviews, not customer ratings · Aalayam: proposed targets, not current performance</div>
      </Reveal>
    </AbsoluteFill>
  );
};
