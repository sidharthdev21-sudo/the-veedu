import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, Typed, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Store, Search, Heart, Chat, Arrow, Check, Hanger, Report, Phone } from '../components/Icons';
import { EVIDENCE, POSTERS, GROUPS, FORMULAS, JOURNEY, pZero, Status, CATALOGUE, coords, median, PAGE_AUDIT, POLICIES, FLAGS } from '../data';
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
  const rowAt = [wordAt(l3, 'store is live'), wordAt(l3, 'size range'), wordAt(l3, 'size range') + 20, wordAt(l3, 'Instagram'), wordAt(l3, 'pop-up'), wordAt(l3, 'travelled'), l4.from + 6, wordAt(l4, 'store analytics'), wordAt(l4, 'supplier records'), wordAt(l4, 'supplier records') + 14];
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
        <div style={{ position: 'absolute', left: 110, top: 280, width: 1700, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 26px' }}>
          {EVIDENCE.map((e, i) => (
            <Reveal key={e.t} at={rowAt[i]} dir="left" style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 100, padding: '14px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: alpha(e.s === 'actual' ? C.green : e.s === 'unquantified' ? C.lime : C.grey, 0.4), opacity: e.s === 'unavailable' ? 0.75 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span className="head" style={{ fontSize: 30, flex: 1 }}>{e.t}</span><StatusChip s={e.s} /></div>
                <div className="muted" style={{ fontSize: 22, marginTop: 6 }}>{e.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Pop at={wordAt(l4, 'still to confirm')} style={{ left: 110, top: 890 }}>
          <Stamp text="Every key metric: TO CONFIRM" />
        </Pop>
        <Reveal at={wordAt(l4, 'So we')} style={{ left: 760, top: 905 }}>
          <div style={{ fontSize: 30 }}>So: analyse <b style={{ color: C.cyan }}>what’s public</b>, build the system for the rest</div>
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

// ─── 3 · The digital store: public catalogue (ACTUAL)
export const StoreScene: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const co = coords(), prices = co.map((c) => c.p), med = median(prices);
  const X = (p: number) => 150 + (p - 800) / 1300 * 900;
  const tc: Record<string, string> = { 'Co-ord': C.lime, 'Kurta set': C.violet, Saree: C.cyan, 'Set mundu': C.cyan, Skirt: C.green };
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Building the digital store" title="What the live store actually shows" />
      <Reveal at={l0.from + 20} style={{ right: 110, top: 100 }}><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><StatusChip s="actual" size={18} /><span className="muted" style={{ fontSize: 20 }}>Public catalogue · read 28 Nov 2026</span></div></Reveal>
      <Reveal at={l0.from + 40} style={{ left: 110, top: 232 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><span className="eyebrow" style={{ fontSize: 18 }}>Listed</span>
          {[['26 Jul', 6], ['2 Aug', 4], ['9–10 Aug', 2], ['29 Aug', 1]].map(([d, n]) => <span key={d as string} className="chip" style={{ fontSize: 21, padding: '6px 16px', borderColor: alpha(C.cyan, 0.5) }}>{d} · {n}</span>)}
          <span className="muted" style={{ fontSize: 19 }}>· no new listings since 29 Aug</span>
        </div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 290, width: 1700, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {CATALOGUE.map((c, i) => (
          <Pop key={c.t} at={l1.from + 10 + i * 9} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', height: 112, padding: '14px 18px', borderColor: alpha(tc[c.type], 0.45) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="eyebrow" style={{ fontSize: 14, color: tc[c.type] }}>{c.type}</span><span className="head" style={{ fontSize: 22 }}>₹{c.p.toLocaleString('en-IN')}</span></div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.t}</div>
              <div className="muted" style={{ fontSize: 17, marginTop: 4 }}>{c.sizes.join(' · ')}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l2.from - 4} style={{ left: 110, top: 720, width: 1000 }}>
        <div className="eyebrow" style={{ fontSize: 18, color: C.lime }}>Co-ord prices (n = 9)</div>
        <svg width={1000} height={150} style={{ marginTop: 6 }}>
          <line x1={150} x2={1050} y1={70} y2={70} stroke={C.line} strokeWidth={3} transform="translate(-100 0)" />
          {[1000, 1200, 1500, 1700].map((p) => <text key={p} x={X(p) - 100} y={120} fill={C.grey} fontSize={20} textAnchor="middle" fontFamily="Inter">₹{p.toLocaleString('en-IN')}</text>)}
          {prices.map((p, i) => { const k = prices.slice(0, i).filter((q) => q === p).length; return <circle key={i} cx={X(p) - 100} cy={70 - k * 22} r={10} fill={C.lime} opacity={interpolate(f, [l2.from + i * 5, l2.from + i * 5 + 10], [0, 1], clamp)} />; })}
          <line x1={X(med) - 100} x2={X(med) - 100} y1={0} y2={90} stroke={C.cyan} strokeWidth={3} strokeDasharray="6 6" opacity={useLit(wordAt(l2, 'median'))} />
          <text x={X(med) - 90} y={18} fill={C.cyan} fontSize={22} fontFamily="Inter" fontWeight={700} opacity={useLit(wordAt(l2, 'median'))}>median ₹{med.toLocaleString('en-IN')}</text>
        </svg>
      </Reveal>
      <Pop at={wordAt(l2, 'inflated')} style={{ left: 1160, top: 730, width: 650 }}>
        <div className="card" style={{ position: 'relative', padding: '18px 26px', borderColor: alpha(C.green, 0.6) }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><span className="head" style={{ fontSize: 44, color: C.green }}>0 of 13</span><span style={{ fontSize: 25 }}>show an inflated MRP</span></div>
          <div className="muted" style={{ fontSize: 19, marginTop: 4 }}>Episode 6’s “one honest price”, already in practice</div>
        </div>
      </Pop>
      <Pop at={l3.from} style={{ left: 1160, top: 880, width: 650 }}>
        <div className="card" style={{ position: 'relative', padding: '18px 26px', borderColor: alpha(C.violet, 0.6) }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><span className="head" style={{ fontSize: 44, color: C.violet }}>11 of 13</span><span style={{ fontSize: 25 }}>SKUs follow AAL-TYPE-COLOR-SIZE</span></div>
          <div className="muted" style={{ fontSize: 19, marginTop: 4 }}>2 Onam listings: no SKU, no product type</div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// ─── 4 · The store journey and product-page audit
export const StoreAudit: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const icons = [Phone, Search, Hanger, Store, Heart];
  const polOut = interpolate(f, [l4.from - 8, l4.from + 4], [1, 0], clamp);
  const p100 = pZero(100), p300 = pZero(300);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Heading step="The store as a digital product" title="The customer journey, audited" />
      <div style={{ position: 'absolute', left: 110, top: 232, display: 'flex', gap: 16 }}>
        {JOURNEY.map((s, i) => {
          const I = icons[i], hi = i === 2 && f >= l1.from - 4;
          return (
            <Pop key={s.t} at={wordAt(l0, s.t.toLowerCase())} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 328, height: 170, padding: '18px 22px', borderColor: alpha(hi ? C.lime : C.cyan, hi ? 0.8 : 0.4), boxShadow: hi ? `0 0 40px ${alpha(C.lime, 0.2)}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><IconBadge color={hi ? C.lime : C.cyan} size={48}><I size={26} color={hi ? C.lime : C.cyan} /></IconBadge><span className="head" style={{ fontSize: 28 }}>{s.t}</span></div>
                <div className="muted" style={{ fontSize: 19, marginTop: 10 }}>{s.m}</div>
                <div style={{ marginTop: 8 }}>{i === 2 ? <span style={{ fontSize: 17, color: C.lime }}>audited below</span> : <Awaiting size={17} />}</div>
              </div>
            </Pop>
          );
        })}
      </div>
      <Reveal at={l1.from - 4} style={{ left: 110, top: 440, width: 930 }}>
        <div className="card" style={{ position: 'relative', padding: '24px 30px', height: 560, borderColor: alpha(C.lime, 0.5) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span className="eyebrow" style={{ color: C.lime, fontSize: 18 }}>Evaluation · 13 product pages</span><StatusChip s="actual" size={14} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
            {PAGE_AUDIT.map((a, i) => (
              <Reveal key={a.t} at={(i === 0 ? wordAt(l1, 'size guide') : i < 3 ? wordAt(l2, i === 1 ? 'garment' : 'cotton') : l2.from + 60 + i * 14)} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', borderRadius: 12, background: alpha(a.ok ? C.green : C.violet, 0.07) }}>
                  <span style={{ fontSize: 26, color: a.ok ? C.green : C.violet, width: 26 }}>{a.ok ? '✓' : '!'}</span>
                  <span style={{ fontSize: 25, flex: 1 }}>{a.t}</span>
                  <span className="head" style={{ fontSize: 28, color: a.ok ? C.green : C.violet }}>{a.v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
      <div style={{ position: 'absolute', left: 1080, top: 440, width: 730, opacity: polOut }}>
        <Reveal at={l3.from - 4} style={{ position: 'relative' }}>
          <div className="card" style={{ position: 'relative', padding: '22px 28px', borderColor: alpha(C.cyan, 0.5) }}>
            <div className="eyebrow" style={{ fontSize: 18 }}>Policies · actual</div>
            {POLICIES.map((p) => <div key={p.t} style={{ display: 'flex', gap: 12, fontSize: 24, marginTop: 12 }}><span className="muted" style={{ width: 110 }}>{p.t}</span><span>{p.v}</span></div>)}
          </div>
        </Reveal>
        {FLAGS.map((fl, i) => (
          <Pop key={fl.t} at={wordAt(l3, i ? 'international' : 'thirty percent')} style={{ position: 'relative', marginTop: 16 }}>
            <div className="card" style={{ position: 'relative', padding: '18px 26px', borderColor: alpha(C.lime, 0.7), borderStyle: 'dashed' }}>
              <div style={{ fontSize: 23, fontWeight: 700, color: C.lime }}>⚑ {fl.t}</div>
              <div style={{ fontSize: 20, marginTop: 4 }}>{fl.d} · <i>to confirm</i></div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l4.from - 2} style={{ left: 1080, top: 440, width: 730 }}>
        <div className="card" style={{ position: 'relative', padding: 30, height: 560, borderColor: alpha(C.cyan, 0.5) }}>
          <div className="eyebrow" style={{ fontSize: 19 }}>Is no sale a failure? Chance of 0 orders by luck</div>
          {[[100, p100], [300, p300]].map(([n, p], i) => (
            <div key={n} style={{ marginTop: i ? 28 : 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}><span>{n} sessions</span><span className="head" style={{ color: i ? C.green : C.lime }}>≈ {Math.round(p * 100)}%</span></div>
              <div style={{ height: 24, borderRadius: 12, background: alpha(C.text, 0.06), marginTop: 10 }}><div style={{ height: 24, borderRadius: 12, width: `${p * 100 * interpolate(f, [l4.from + i * 20, l4.from + 40 + i * 20], [0, 1], clamp)}%`, background: i ? C.green : C.lime }} /></div>
            </div>
          ))}
          <div style={{ fontSize: 24, marginTop: 34, lineHeight: 1.35 }}>Below ~300 sessions, read add-to-cart, not orders</div>
          <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center' }}><StatusChip s="estimated" /><span className="muted" style={{ fontSize: 17 }}>assumes 1% true conversion · 0.99ⁿ</span></div>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
