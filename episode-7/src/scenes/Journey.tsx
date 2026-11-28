import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, Typed, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Store, Search, Heart, Chat, Arrow, Check, Hanger, Report, Phone } from '../components/Icons';
import { EVIDENCE, POSTERS, GROUPS, FORMULAS, JOURNEY, CHECKLIST, pZero, Status } from '../data';
import { C, alpha } from '../theme';

const ST: Record<Status, [string, string, boolean]> = {
  actual: ['ACTUAL', C.green, false], unquantified: ['ACTUAL · NO NUMBERS', C.lime, true], unavailable: ['UNAVAILABLE', C.grey, true],
  illustrative: ['ILLUSTRATIVE · NOT ACTUAL DATA', C.violet, true], estimated: ['ESTIMATED', C.cyan, true],
};
export const StatusChip: React.FC<{ s: Status; size?: number }> = ({ s, size = 15 }) => {
  const [t, c, dash] = ST[s];
  return <span className="badge" style={{ fontSize: size, padding: '3px 11px', color: c, border: `1.5px ${dash ? 'dashed' : 'solid'} ${alpha(c, 0.7)}`, flex: 'none', whiteSpace: 'nowrap' }}>{t}</span>;
};
export const Stamp: React.FC<{ text: string; color?: string; size?: number }> = ({ text, color = C.lime, size = 34 }) => (
  <div className="head" style={{ display: 'inline-block', padding: '12px 26px', border: `3px solid ${color}`, borderRadius: 14, color, fontSize: size, transform: 'rotate(-2deg)', background: alpha(color, 0.06) }}>{text}</div>
);
export const Awaiting: React.FC<{ size?: number }> = ({ size = 20 }) => <span style={{ fontSize: size, color: C.grey, fontStyle: 'italic' }}>awaiting data</span>;

// ─── 1 · From strategy to reality
export const Reality: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const out = interpolate(f, [l3.from - 8, l3.from + 4], [1, 0], clamp);
  const eps = ['PESTEL', 'Five Forces', 'Positioning', 'Customers', 'Portfolio', 'Growth'];
  const rowAt = [wordAt(l3, 'store is live'), wordAt(l3, 'size range'), wordAt(l3, 'Instagram'), wordAt(l3, 'pop-up'), wordAt(l3, 'travelled'), l4.from + 6, wordAt(l4, 'supplier records') - 20, wordAt(l4, 'supplier records')];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Episode 7 · Business validation" title="From strategy to reality" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <div style={{ position: 'absolute', left: 110, top: 250, display: 'flex', gap: 16 }}>
          {eps.map((t, i) => (
            <Pop key={t} at={l0.from + 4 + i * 6} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 268, padding: '20px 22px', borderColor: alpha(C.cyan, 0.3) }}>
                <div className="eyebrow" style={{ fontSize: 16 }}>Episode {i + 1}</div><div className="head" style={{ fontSize: 28, marginTop: 4 }}>{t}</div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(l0, 'one idea')} style={{ left: 110, top: 420, width: 1700 }}>
          <div className="card" style={{ position: 'relative', padding: '28px 36px', borderColor: alpha(C.lime, 0.7), boxShadow: `0 0 50px ${alpha(C.lime, 0.15)}` }}>
            <div className="eyebrow" style={{ color: C.lime, fontSize: 18 }}>Where the research pointed</div>
            <div className="head" style={{ fontSize: 50, marginTop: 6 }}>Comfortable co-ords that fit, at an honest price</div>
          </div>
        </Reveal>
        <Reveal at={wordAt(l1, 'moved')} style={{ left: 110, top: 650, width: 1700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <div className="head" style={{ fontSize: 64, color: C.grey }}>Studying the market</div>
            <Arrow size={90} color={C.lime} />
            <div className="head" style={{ fontSize: 64, color: C.lime }}>Testing the business</div>
          </div>
        </Reveal>
        <Reveal at={l2.from} style={{ left: 110, top: 820 }}>
          <div style={{ fontSize: 32 }} className="muted">What we did · what evidence it produced · what it still can’t tell us</div>
        </Reveal>
      </div>
      <Reveal at={l3.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 232 }}>Evidence inventory · project audit, Nov 2026</div>
        <div style={{ position: 'absolute', left: 110, top: 280, width: 1700, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 26px' }}>
          {EVIDENCE.map((e, i) => (
            <Reveal key={e.t} at={rowAt[i]} dir="left" style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 118, padding: '20px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: alpha(e.s === 'actual' ? C.green : e.s === 'unquantified' ? C.lime : C.grey, 0.4), opacity: e.s === 'unavailable' ? 0.75 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span className="head" style={{ fontSize: 30, flex: 1 }}>{e.t}</span><StatusChip s={e.s} /></div>
                <div className="muted" style={{ fontSize: 22, marginTop: 6 }}>{e.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Pop at={wordAt(l4, 'first finding') - 30} style={{ left: 110, top: 880 }}>
          <Stamp text="Every key metric: TO CONFIRM" />
        </Pop>
        <Reveal at={wordAt(l4, 'first finding')} style={{ left: 760, top: 900 }}>
          <div style={{ fontSize: 30 }}>← Finding #1: <b>the evidence gap</b></div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 2 · Testing the audience
export const Audience: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const out = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  const ladder = [['Stop', Search, 'make people stop'], ['Save', Heart, 'save'], ['Ask', Chat, 'ask a question'], ['Visit', Store, 'visit the store']] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Heading step="Testing the audience" title="Social content as a market experiment" color={C.violet} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 232, color: C.violet, opacity: useLit(l0.from) }}>Aalayam’s own creative, Dec 2025 · wording re-typeset</div>
        <div style={{ position: 'absolute', left: 110, top: 280, display: 'flex', gap: 26 }}>
          {POSTERS.map((p, i) => (
            <Pop key={p.h} at={l0.from + 20 + i * 12} style={{ position: 'relative' }}>
              <div style={{ width: 540, height: 360, borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: `linear-gradient(150deg, ${alpha([C.lime, C.cyan, C.violet][i], 0.16)}, ${C.card} 70%)`, border: `1.5px solid ${alpha([C.lime, C.cyan, C.violet][i], 0.5)}` }}>
                <div className="eyebrow" style={{ fontSize: 17, color: [C.lime, C.cyan, C.violet][i] }}>{p.k}</div>
                <div><div className="head" style={{ fontSize: 50, lineHeight: 1.1 }}>{p.h}</div><div style={{ fontSize: 30, marginTop: 10 }}>{p.s}</div></div>
                <div className="head" style={{ fontSize: 26, letterSpacing: '0.2em', color: C.grey }}>AALAYAM</div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={l1.from - 4} style={{ left: 110, top: 700, width: 1700 }}>
          <div className="head" style={{ fontSize: 34 }}>The goal wasn’t likes. It was to learn what makes people…</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 30 }}>
            {ladder.map(([t, I, w], i) => (
              <React.Fragment key={t}>
                <Pop at={wordAt(l1, w)} style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><IconBadge color={C.violet} size={80}><I size={44} color={C.violet} /></IconBadge><span className="head" style={{ fontSize: 44 }}>{t}</span></div>
                </Pop>
                {i < 3 && <Reveal at={wordAt(l1, ladder[i + 1][2])} dir="left" style={{ position: 'relative' }}><Arrow size={50} color={C.grey} /></Reveal>}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 232, color: C.violet }}>Content experiment groups</div>
        <div style={{ position: 'absolute', left: 110, top: 280, width: 900, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {GROUPS.map((g, i) => (
            <Pop key={g.t} at={l2.from + 20 + i * 14} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 150, padding: '22px 26px', borderColor: alpha(i === 3 ? C.lime : C.violet, i === 3 ? 0.7 : 0.4) }}>
                <div className="head" style={{ fontSize: 30, color: i === 3 ? C.lime : C.text }}>{g.t}</div>
                <div className="muted" style={{ fontSize: 22, marginTop: 8 }}>{g.q}</div>
                <div style={{ position: 'absolute', right: 20, top: 20 }}><Awaiting size={16} /></div>
              </div>
            </Pop>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 1060, top: 280, width: 750, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {FORMULAS.map((m, i) => (
            <Pop key={m.t} at={l3.from + 10 + i * 18} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', padding: '20px 26px', borderColor: alpha(C.cyan, 0.4) }}>
                <div className="head" style={{ fontSize: 28, color: C.cyan }}>{m.t}</div>
                <div style={{ fontSize: 23, marginTop: 6, fontFamily: 'monospace' }}>{m.f}</div>
              </div>
            </Pop>
          ))}
          <Reveal at={l3.from + 90} style={{ position: 'relative' }}><div className="muted" style={{ fontSize: 20 }}>Compare groups only with 5+ posts each, in the same period, with paid boosts noted</div></Reveal>
        </div>
        <Pop at={wordAt(l4, "can't guide")} style={{ left: 110, top: 900 }}><Stamp text="“Good results” ≠ data" color={C.violet} /></Pop>
        <Reveal at={wordAt(l4, 'Logged results')} style={{ left: 620, top: 915 }}><div style={{ fontSize: 32 }}>Logged results can guide decisions.</div></Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 3 · The digital store
export const StoreScene: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const icons = [Phone, Search, Hanger, Store, Heart];
  const p100 = pZero(100), p300 = pZero(300);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Heading step="Building the digital store" title="The store as a digital product" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Reveal at={l0.from + 6} style={{ left: 110, top: 250, width: 820 }}>
          <div className="card" style={{ position: 'relative', height: 640, overflow: 'hidden', borderColor: alpha(C.cyan, 0.4) }}>
            <div style={{ height: 46, background: alpha(C.text, 0.05), display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px' }}>{[C.violet, C.lime, C.green].map((c) => <span key={c} style={{ width: 13, height: 13, borderRadius: 7, background: alpha(c, 0.7) }} />)}<span className="muted" style={{ fontSize: 18, marginLeft: 16 }}>Aalayam store · stylised wireframe</span></div>
            <div style={{ padding: 30 }}>
              <div className="head" style={{ fontSize: 40 }}>Comfortable co-ords and sarees</div>
              <div className="muted" style={{ fontSize: 24, marginTop: 8 }}>Sizes L–3XL · ₹1,000–1,700</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 28 }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ height: 280, borderRadius: 16, background: alpha([C.lime, C.cyan, C.violet][i], 0.1), border: `1.5px solid ${alpha([C.lime, C.cyan, C.violet][i], 0.3)}`, display: 'grid', placeItems: 'center' }}><Hanger size={70} color={alpha([C.lime, C.cyan, C.violet][i], 0.6)} /></div>)}
              </div>
            </div>
          </div>
        </Reveal>
        <div style={{ position: 'absolute', left: 990, top: 250, width: 820 }}>
          <Reveal at={wordAt(l0, 'Shopify')} style={{ position: 'relative' }}>
            <div className="eyebrow" style={{ fontSize: 20 }}>Platform choice · actual</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              {['Shopify', 'Dukaan', 'WooCommerce'].map((t, i) => <span key={t} className="chip" style={{ fontSize: 30, padding: '12px 24px', color: i ? C.grey : C.bg, background: i ? 'transparent' : C.cyan, borderColor: i ? alpha(C.grey, 0.4) : C.cyan, textDecoration: i ? 'line-through' : 'none' }}>{t}</span>)}
            </div>
          </Reveal>
          <Reveal at={wordAt(l0, 'SKU')} style={{ position: 'relative', marginTop: 70 }}>
            <div className="eyebrow" style={{ fontSize: 20 }}>One SKU format · actual</div>
            <div className="head" style={{ fontSize: 58, marginTop: 14, fontFamily: 'monospace', color: C.lime }}><Typed text="AAL-TYPE-COLOR-SIZE" a={wordAt(l0, 'SKU')} b={wordAt(l0, 'SKU') + 40} /></div>
            <div className="muted" style={{ fontSize: 24, marginTop: 12 }}>e.g. AAL-COORD-OLIVE-XL · stock stays traceable as the range grows</div>
          </Reveal>
        </div>
      </div>
      <Reveal at={l1.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 240, display: 'flex', gap: 18 }}>
          {JOURNEY.map((s, i) => {
            const I = icons[i], hi = i === 2 && f >= l2.from - 4;
            return (
              <Pop key={s.t} at={wordAt(l1, s.t.toLowerCase())} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', width: 325, height: 250, padding: 24, borderColor: alpha(hi ? C.lime : C.cyan, hi ? 0.8 : 0.4), boxShadow: hi ? `0 0 40px ${alpha(C.lime, 0.2)}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><IconBadge color={hi ? C.lime : C.cyan} size={56}><I size={30} color={hi ? C.lime : C.cyan} /></IconBadge><span className="eyebrow" style={{ fontSize: 16 }}>Stage {i + 1}</span></div>
                  <div className="head" style={{ fontSize: 32, marginTop: 14 }}>{s.t}</div>
                  <div className="muted" style={{ fontSize: 20, marginTop: 6 }}>{s.m}</div>
                  <div style={{ position: 'absolute', left: 24, bottom: 18 }}><Awaiting size={18} /></div>
                </div>
              </Pop>
            );
          })}
        </div>
        <Reveal at={l2.from - 4} style={{ left: 110, top: 530, width: 900 }}>
          <div className="card" style={{ position: 'relative', padding: 30, height: 440, borderColor: alpha(C.lime, 0.5) }}>
            <div className="eyebrow" style={{ color: C.lime, fontSize: 20 }}>Evaluation: what earns trust (Episodes 4 and 6)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
              {CHECKLIST.map((t, i) => <Reveal key={t} at={l2.from + 20 + i * 22} dir="left" style={{ position: 'relative' }}><div style={{ display: 'flex', gap: 12, fontSize: 28 }}><Check size={32} color={C.lime} style={{ flex: 'none' }} />{t}</div></Reveal>)}
            </div>
          </div>
        </Reveal>
        <Reveal at={l3.from - 4} style={{ left: 1050, top: 530, width: 760 }}>
          <div className="card" style={{ position: 'relative', padding: 30, height: 440, borderColor: alpha(C.cyan, 0.5) }}>
            <div className="eyebrow" style={{ fontSize: 20 }}>Is no sale a failure? Chance of 0 orders by luck</div>
            {[[100, p100], [300, p300]].map(([n, p], i) => (
              <div key={n} style={{ marginTop: i ? 26 : 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 27 }}><span>{n} sessions</span><span className="head" style={{ color: i ? C.green : C.lime }}>≈ {Math.round(p * 100)}%</span></div>
                <div style={{ height: 24, borderRadius: 12, background: alpha(C.text, 0.06), marginTop: 10 }}><div style={{ height: 24, borderRadius: 12, width: `${p * 100 * interpolate(f, [l3.from + i * 20, l3.from + 40 + i * 20], [0, 1], clamp)}%`, background: i ? C.green : C.lime }} /></div>
              </div>
            ))}
            <div style={{ fontSize: 22, marginTop: 30, lineHeight: 1.35 }}>Below ~300 sessions, read add-to-cart, not orders</div>
            <div style={{ marginTop: 16 }}><StatusChip s="estimated" /> <span className="muted" style={{ fontSize: 17 }}>assumes 1% true conversion · formula 0.99ⁿ</span></div>
          </div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
