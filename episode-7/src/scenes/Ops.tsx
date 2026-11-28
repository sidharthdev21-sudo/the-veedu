import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Check, Lock, Arrow } from '../components/Icons';
import { TOOLS, DASHBOARD, PRODUCT_CRITERIA, ILL_PRODUCTS, LADDER, decide, wScore, FINDINGS, UNKNOWN, PLAN } from '../data';
import { C, alpha } from '../theme';
import { StatusChip, Stamp, Awaiting } from './Journey';

// ─── 7 · Data strategy and dashboard
export const Dashboard: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const ac = [C.violet, C.cyan, C.lime, C.green];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Heading step="Data strategy" title="Simple tools, one source of truth" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        {(['implemented', 'recommended'] as const).map((s, k) => (
          <div key={s} style={{ position: 'absolute', left: 110 + k * 870, top: 250, width: 830 }}>
            <Reveal at={l0.from + k * 120} style={{ position: 'relative' }}>
              <span className="badge" style={{ fontSize: 20, color: k ? C.violet : C.green, border: `1.5px ${k ? 'dashed' : 'solid'} ${k ? C.violet : C.green}` }}>{k ? 'RECOMMENDED · NOT YET BUILT' : 'IMPLEMENTED'}</span>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
              {TOOLS.filter((t) => t.s === s).map((t, i) => (
                <Pop key={t.t} at={wordAt(l0, ['Shopify', 'Instagram', 'one shared', 'UTM'][Math.min(3, k * 2 + i)]) + (k && i === 2 ? 40 : 0)} style={{ position: 'relative' }}>
                  <div className="card" style={{ position: 'relative', padding: '24px 30px', borderColor: alpha(k ? C.violet : C.green, 0.5), borderStyle: k ? 'dashed' : 'solid' }}>
                    <div className="head" style={{ fontSize: 34 }}>{t.t}</div>
                  </div>
                </Pop>
              ))}
            </div>
          </div>
        ))}
        <Reveal at={wordAt(l0, 'UTM')} style={{ left: 110, top: 760, width: 1700 }}>
          <div className="card" style={{ position: 'relative', padding: '22px 30px', borderColor: alpha(C.lime, 0.5) }}>
            <div className="eyebrow" style={{ color: C.lime, fontSize: 18 }}>A UTM link traces a sale to its post</div>
            <div style={{ fontSize: 28, marginTop: 8, fontFamily: 'monospace' }}>…/products/co-ord?<span style={{ color: C.cyan }}>utm_source=instagram</span>&<span style={{ color: C.lime }}>utm_campaign=IG-014</span></div>
          </div>
        </Reveal>
      </div>
      <Reveal at={l1.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 235, width: 1700, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          {DASHBOARD.map((a, i) => (
            <Pop key={a.area} at={wordAt(l1, a.area.toLowerCase().replace('e-commerce', 'e-commerce'))} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 300, padding: '22px 26px', borderColor: alpha(ac[i], 0.5) }}>
                <div className="head" style={{ fontSize: 30, color: ac[i] }}>{a.area}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
                  {a.tiles.map((t) => (
                    <div key={t.t} style={{ borderRadius: 14, background: t.v ? alpha(C.green, 0.07) : alpha(C.text, 0.03), border: `1px solid ${t.v ? alpha(C.green, 0.4) : C.line}`, padding: '12px 16px' }}>
                      <div style={{ fontSize: 21 }}>{t.t}</div>
                      <div className="head" style={{ fontSize: 30, color: t.v ? C.green : C.grey, marginTop: 2 }}>{t.v ?? '—'}</div>
                      <div style={{ fontSize: 14, color: C.grey }}>{t.src ?? 'n · source · confidence'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Pop>
          ))}
        </div>
        <Pop at={wordAt(l2, 'awaiting data')} style={{ left: 1290, top: 110 }}><Stamp text="AWAITING DATA" color={C.lime} size={48} /></Pop>
        <Reveal at={l3.from} style={{ left: 110, top: 900, width: 1700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 26px', borderRadius: 18, border: `1.5px solid ${alpha(C.cyan, 0.5)}`, background: alpha(C.cyan, 0.05) }}>
            <Lock size={40} color={C.cyan} /><span style={{ fontSize: 27 }}>Privacy: no customer names, phones, addresses, order IDs or supplier contacts in shared sheets, or in this video</span>
          </div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 8 · Product validation
export const Validate: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const w = PRODUCT_CRITERIA.map((c) => c.w);
  const lc = [C.violet, C.grey, C.cyan, C.lime, C.green];
  const chosen = useLit(l2.from + 60);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="Product validation" title="Evidence decides what gets made" color={C.lime} />
      <div className="card" style={{ left: 110, top: 240, width: 720, padding: '26px 30px', borderColor: alpha(C.cyan, 0.4), opacity: useLit(l0.from) }}>
        <div className="eyebrow" style={{ fontSize: 19 }}>Product scorecard · 1–5 · weights = 100%</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
          {PRODUCT_CRITERIA.map((c, i) => (
            <Reveal key={c.c} at={l0.from + 60 + i * 26} dir="left" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 290, fontSize: 27 }}>{c.c}</span>
                <div style={{ width: 200, height: 18, borderRadius: 9, background: alpha(C.text, 0.06) }}><div style={{ width: 200 * c.w / 20, height: 18, borderRadius: 9, background: c.gate ? C.lime : alpha(C.cyan, 0.7) }} /></div>
                <span className="head" style={{ fontSize: 24 }}>{c.w}%</span>
                {c.gate && <span className="badge" style={{ fontSize: 13, color: C.bg, background: C.lime }}>GATE</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 880, top: 240, width: 930 }}>
        <Reveal at={l1.from - 4} style={{ position: 'relative' }}><div className="eyebrow" style={{ fontSize: 19 }}>Score → decision</div></Reveal>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {LADDER.map((s, i) => (
            <Pop key={s.t} at={l1.from + 30 + i * 14} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 178, height: 170, padding: 16, borderColor: alpha(lc[i], 0.6), background: i === 3 ? alpha(C.lime, 0.06 + 0.1 * chosen) : C.card, boxShadow: i === 3 ? `0 0 ${40 * chosen}px ${alpha(C.lime, 0.3 * chosen)}` : 'none' }}>
                <div className="head" style={{ fontSize: 26, color: lc[i], lineHeight: 1.1 }}>{s.t}</div>
                <div className="muted" style={{ fontSize: 19, marginTop: 10 }}>{s.r}</div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={l2.from - 4} style={{ position: 'relative', marginTop: 34 }}><StatusChip s="illustrative" size={17} /></Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 16 }}>
          {ILL_PRODUCTS.map((p, i) => {
            const sc = wScore(p.s, w), d = decide(sc), c = lc[d];
            return (
              <Pop key={p.t} at={wordAt(l2, i ? 'generic' : 'fit-confident')} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 24, borderColor: alpha(c, 0.7) }}>
                  <div style={{ flex: 1 }}><div className="head" style={{ fontSize: 30 }}>{p.t}</div><div className="muted" style={{ fontSize: 19, marginTop: 4, fontFamily: 'monospace' }}>{p.s.join(' · ')}</div></div>
                  <span className="head" style={{ fontSize: 54, color: c }}>{sc.toFixed(2)}</span>
                  <Arrow size={40} color={C.grey} />
                  <span className="head" style={{ fontSize: 28, color: c, width: 210 }}>{LADDER[d].t}</span>
                </div>
              </Pop>
            );
          })}
        </div>
        <Reveal at={wordAt(l2, 'matching')} style={{ position: 'relative', marginTop: 18 }}><div className="muted" style={{ fontSize: 22 }}>Consistent with Episode 5: prune generic kurta sets</div></Reveal>
      </div>
    </AbsoluteFill>
  );
};

// ─── 9 · What we learned
export const Learned: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3] = lines;
  const rows = FINDINGS;
  const at = [l0.from + 20, l1.from, l2.from + 30];
  const head = ['Observation', 'Interpretation', 'Action'];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Heading step="What we learned" title="Findings, and the questions still open" color={C.violet} />
      <div style={{ position: 'absolute', left: 110, top: 232, width: 1700, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {head.map((h, i) => <Reveal key={h} at={l0.from + i * 6} style={{ position: 'relative' }}><div className="eyebrow" style={{ fontSize: 18, color: [C.cyan, C.violet, C.lime][i] }}>{h}</div></Reveal>)}
      </div>
      <div style={{ position: 'absolute', left: 110, top: 280, width: 1700, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rows.map((r, k) => (
          <Reveal key={r.o} at={at[k]} dir="left" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              {[r.o, r.i, r.a].map((t, i) => (
                <div key={i} className="card" style={{ position: 'relative', height: 110, padding: '0 24px', display: 'flex', alignItems: 'center', borderColor: alpha([C.cyan, C.violet, C.lime][i], 0.45) }}>
                  <span style={{ fontSize: 26, fontWeight: i === 2 ? 700 : 500, lineHeight: 1.25 }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <Pop at={wordAt(l2, 'Until they are')} style={{ left: 110, top: 690 }}><Stamp text="“Good results” is a feeling, not a finding." color={C.lime} size={38} /></Pop>
      <Reveal at={l3.from - 4} style={{ left: 110, top: 820, width: 1700 }}>
        <div className="eyebrow" style={{ fontSize: 18, color: C.grey }}>Still unknown</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14 }}>
          {UNKNOWN.map((u, i) => <Pop key={u} at={l3.from + 20 + i * 14} style={{ position: 'relative' }}><span className="chip" style={{ fontSize: 25, padding: '12px 22px', borderStyle: 'dashed', borderColor: alpha(C.grey, 0.6) }}>? {u}</span></Pop>)}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 10 · Next steps
export const Next: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out = interpolate(f, [l3.from - 8, l3.from + 4], [1, 0], clamp);
  const at = [l0.from + 30, l1.from - 4, l2.from - 4];
  const cs = [C.cyan, C.violet, C.lime];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Heading step="Next steps" title="The next 90 days of validation" />
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          <line x1={110} y1={262} x2={110 + 1700 * interpolate(f, [l0.from, l2.from + 30], [0, 1], clamp)} y2={262} stroke={C.cyan} strokeWidth={4} style={{ filter: `drop-shadow(0 0 8px ${C.cyan})` }} />
        </svg>
        <div style={{ position: 'absolute', left: 110, top: 232, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, width: 1700 }}>
          {PLAN.map((ph, i) => (
            <Pop key={ph.d} at={at[i]} style={{ position: 'relative' }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: cs[i], boxShadow: `0 0 20px ${cs[i]}` }} />
              <div className="card" style={{ position: 'relative', marginTop: 24, padding: 30, height: 640, borderColor: alpha(cs[i], 0.55) }}>
                <div className="eyebrow" style={{ color: cs[i] }}>{ph.d}</div>
                <div className="head" style={{ fontSize: 52, marginTop: 4 }}>{ph.t}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
                  {ph.items.map((it) => <div key={it} style={{ display: 'flex', gap: 12, fontSize: 27, lineHeight: 1.3 }}><Check size={30} color={cs[i]} style={{ flex: 'none' }} />{it}</div>)}
                </div>
                <div style={{ position: 'absolute', left: 30, right: 30, bottom: 28 }}>
                  <div className="muted" style={{ fontSize: 17, letterSpacing: '0.12em' }}>KPIs · baseline first, no invented targets</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>{ph.kpi.map((k) => <span key={k} className="chip" style={{ fontSize: 20, padding: '6px 14px', borderColor: alpha(cs[i], 0.5) }}>{k}</span>)}</div>
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </div>
      <Reveal at={l3.from - 2} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 160, top: 220, width: 1600, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 62, lineHeight: 1.2 }}>We moved from <span style={{ color: C.grey }}>understanding the market</span> to <span style={{ color: C.cyan }}>testing the business</span>.</div>
          <Reveal at={wordAt(l3, 'The next step')} style={{ position: 'relative', marginTop: 34 }}>
            <div className="head" style={{ fontSize: 50, lineHeight: 1.25 }}>Next: a <span style={{ color: C.lime }}>repeatable, commercially viable</span> operating model.</div>
          </Reveal>
        </div>
        <Reveal at={wordAt(l3, 'operating model')} style={{ left: 0, top: 720, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 110, letterSpacing: '-0.02em' }}>Aalayam</div>
          <div style={{ fontSize: 24, letterSpacing: '0.5em', color: C.cyan, marginTop: 12, fontWeight: 500 }}>BY ANAMIKA · BUSINESS RESEARCH SERIES · EPISODE 7</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
