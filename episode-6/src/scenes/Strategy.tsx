import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Check, Trend, Globe, Scales, People, Arrow } from '../components/Icons';
import { ERRC, VALUE_BEFORE, VALUE_AFTER, VALUE_SUB, PLAN } from '../data';
import { C, alpha } from '../theme';
import { Note } from './Customer';

// ─── 9 · ERRC grid
export const Errc: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const out = interpolate(f, [l4.from - 8, l4.from + 4], [1, 0], clamp);
  const Q = [
    ['Eliminate', ERRC.E, C.violet, wordAt(l0, 'Eliminate')],
    ['Reduce', ERRC.R, C.cyan, l1.from - 4],
    ['Raise', ERRC.Ra, C.green, l2.from - 4],
    ['Create', ERRC.Cr, C.lime, l3.from - 4],
  ] as const;
  const strike = interpolate(f, [wordAt(l4, 'which everyone'), wordAt(l4, 'which everyone') + 20], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Heading step="Framework 3 · ERRC grid" title="What Aalayam changes in its offer" color={C.lime} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <div style={{ position: 'absolute', left: 110, top: 230, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 1700 }}>
          {Q.map(([t, items, c, at]) => {
            const lit = useLit(at);
            return (
              <Pop key={t} at={l0.from + 4 + ['Eliminate', 'Reduce', 'Raise', 'Create'].indexOf(t) * 4} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', height: 380, padding: '28px 34px', opacity: 0.35 + 0.65 * lit, borderColor: alpha(c, 0.15 + 0.6 * lit), boxShadow: `0 0 44px ${alpha(c, 0.12 * lit)}` }}>
                  <div className="head" style={{ fontSize: 50, color: c }}>{t}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
                    {items.map((x, j) => (
                      <Reveal key={x} at={at + 8 + j * 18} dir="left" style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 30, lineHeight: 1.25 }}><span style={{ width: 11, height: 11, borderRadius: 6, background: c, flex: 'none', marginTop: 12 }} />{x}</div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Pop>
            );
          })}
        </div>
      </div>
      <Reveal at={l4.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 240 }}>Value proposition transformation</div>
        <div className="card" style={{ left: 110, top: 300, width: 1700, padding: '36px 44px', borderColor: alpha(C.grey, 0.4) }}>
          <div className="muted" style={{ fontSize: 22, letterSpacing: '0.12em' }}>BEFORE · WHAT EVERYONE CLAIMS</div>
          <div style={{ position: 'relative', display: 'inline-block', marginTop: 10 }}>
            <div className="head" style={{ fontSize: 52, color: C.grey }}>“{VALUE_BEFORE}”</div>
            <div style={{ position: 'absolute', left: 0, top: '52%', height: 4, width: `${strike * 100}%`, background: C.violet }} />
          </div>
        </div>
        <Pop at={wordAt(l4, 'comfort co-ords')} style={{ left: 940 - 40, top: 500 }}><Arrow size={80} color={C.lime} style={{ transform: 'rotate(90deg)' }} /></Pop>
        <Pop at={wordAt(l4, 'comfort co-ords') + 8} style={{ left: 110, top: 610, width: 1700 }}>
          <div className="card" style={{ position: 'relative', padding: '40px 44px', borderColor: alpha(C.lime, 0.8), boxShadow: `0 0 70px ${alpha(C.lime, 0.2)}` }}>
            <div style={{ fontSize: 22, letterSpacing: '0.12em', color: C.lime }}>AFTER · AALAYAM’S PROPOSED PROMISE</div>
            <div className="head" style={{ fontSize: 76, marginTop: 10 }}>“{VALUE_AFTER}”</div>
            <div style={{ fontSize: 32, marginTop: 14 }}>{VALUE_SUB}</div>
          </div>
        </Pop>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 10 · Strategic synthesis
export const Synthesis: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3] = lines;
  const fw = [['Ansoff', 'Product development', C.cyan, Trend, 'Ansoff'], ['Blue Ocean', 'Fit confidence at a mid price', C.violet, Globe, 'Blue Ocean'], ['ERRC', 'Defines the offer', C.lime, Scales, 'defines']] as const;
  const risks = ['Split-size demand may be small', 'Stock can fall out of balance', 'Exchanges cost money', 'Founder time on WhatsApp'];
  const caps = ['Separate top and bottom stock', 'Measured garments', 'Shopify size options', 'WhatsApp time'];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Strategic synthesis" title="One decision from three frameworks" />
      <div style={{ position: 'absolute', left: 110, top: 225, display: 'flex', gap: 22, alignItems: 'center' }}>
        {fw.map(([t, d, c, I, w], i) => (
          <React.Fragment key={t}>
            <Pop at={wordAt(l0, w)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 518, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, borderColor: alpha(c, 0.6) }}>
                <IconBadge color={c} size={64}><I size={34} color={c} /></IconBadge>
                <div><div className="eyebrow" style={{ color: c, fontSize: 18 }}>{t}</div><div className="head" style={{ fontSize: 27, marginTop: 4, whiteSpace: 'nowrap' }}>{d}</div></div>
              </div>
            </Pop>
            {i < 2 && <Reveal at={wordAt(l0, fw[i + 1][4])} dir="left" style={{ position: 'relative' }}><span className="head" style={{ fontSize: 40, color: C.grey }}>+</span></Reveal>}
          </React.Fragment>
        ))}
      </div>
      <Reveal at={l1.from - 4} style={{ left: 110, top: 395, width: 1700 }}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
          <div className="card" style={{ position: 'relative', flex: 1, padding: '22px 30px', borderColor: alpha(C.grey, 0.4) }}>
            <div className="eyebrow" style={{ color: C.grey, fontSize: 18 }}>Kept from Episode 5</div>
            <div style={{ fontSize: 27, marginTop: 10 }}>Co-ords as hero · Kerala signature · evidence first · sarees regional · kurta sets pruned</div>
          </div>
          <div className="card" style={{ position: 'relative', flex: 1, padding: '22px 30px', borderColor: alpha(C.lime, 0.7) }}>
            <div className="eyebrow" style={{ color: C.lime, fontSize: 18 }}>New in Episode 6</div>
            <div style={{ fontSize: 27, marginTop: 10 }}>Customer pain points move <b style={{ color: C.lime }}>fit</b> from a supporting action to the core of the positioning</div>
          </div>
        </div>
      </Reveal>
      <Pop at={l2.from - 4} style={{ left: 110, top: 575, width: 820 }}>
        <div className="card" style={{ position: 'relative', padding: 32, height: 400, borderColor: alpha(C.violet, 0.6) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><IconBadge color={C.violet} size={70}><People size={38} color={C.violet} /></IconBadge><div><div className="eyebrow" style={{ color: C.violet, fontSize: 18 }}>Target customer</div><div className="head" style={{ fontSize: 34 }}>The fit-frustrated buyer</div></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26, fontSize: 27 }}>
            {['Women aged 24–38', 'Kerala and Malayali women in Indian metros', 'Buy everyday co-ords online at ₹1,000–1,700', 'Have struggled with fit, or use a tailor'].map((x) => <div key={x} style={{ display: 'flex', gap: 12 }}><Check size={30} color={C.violet} style={{ flex: 'none' }} />{x}</div>)}
          </div>
          <div style={{ position: 'absolute', right: 26, top: 26 }}><span className="badge" style={{ fontSize: 15, color: C.violet, border: `1.5px dashed ${alpha(C.violet, 0.7)}` }}>PERSONA · TO VALIDATE</span></div>
        </div>
      </Pop>
      <Pop at={l3.from - 4} style={{ left: 970, top: 575, width: 840 }}>
        <div className="card" style={{ position: 'relative', padding: 32, height: 400, borderColor: alpha(C.cyan, 0.5) }}>
          <div className="eyebrow" style={{ fontSize: 18 }}>Needs</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>{caps.map((x) => <span key={x} className="chip" style={{ fontSize: 22, padding: '8px 16px', borderColor: alpha(C.cyan, 0.5) }}>{x}</span>)}</div>
          <div className="eyebrow" style={{ fontSize: 18, color: C.violet, marginTop: 26 }}>Risks</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>{risks.map((x, i) => <Reveal key={x} at={wordAt(l3, ['split', 'stock', 'exchanges', 'test first'][i])} dir="none" style={{ position: 'relative' }}><span className="chip" style={{ fontSize: 22, padding: '8px 16px', borderColor: alpha(C.violet, 0.5) }}>{x}</span></Reveal>)}</div>
          <Reveal at={wordAt(l3, 'test first')} style={{ left: 32, bottom: 28 }}><div className="head" style={{ fontSize: 34, color: C.lime }}>So: test before scaling.</div></Reveal>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// ─── 11 · 90-day roadmap
export const Roadmap: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const at = [l0.from - 4, l1.from - 4, l2.from - 4];
  const cs = [C.cyan, C.violet, C.lime];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="Roadmap" title="The next 90 days" />
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <line x1={110} y1={260} x2={110 + 1700 * interpolate(f, [l0.from, l2.from + 30], [0, 1], clamp)} y2={260} stroke={C.cyan} strokeWidth={4} style={{ filter: `drop-shadow(0 0 8px ${C.cyan})` }} />
      </svg>
      <div style={{ position: 'absolute', left: 110, top: 230, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, width: 1700 }}>
        {PLAN.map((ph, i) => (
          <Pop key={ph.d} at={at[i]} style={{ position: 'relative' }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, background: cs[i], boxShadow: `0 0 20px ${cs[i]}` }} />
            <div className="card" style={{ position: 'relative', marginTop: 24, padding: 32, height: 640, borderColor: alpha(cs[i], 0.55) }}>
              <div className="eyebrow" style={{ color: cs[i] }}>{ph.d}</div>
              <div className="head" style={{ fontSize: 52, marginTop: 4 }}>{ph.t}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
                {ph.items.map((it) => <div key={it} style={{ display: 'flex', gap: 12, fontSize: 27, lineHeight: 1.3 }}><Check size={30} color={cs[i]} style={{ flex: 'none' }} />{it}</div>)}
              </div>
              <div style={{ position: 'absolute', left: 32, right: 32, bottom: 30 }}>
                <div className="muted" style={{ fontSize: 18, letterSpacing: '0.12em' }}>KPIs</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>{ph.kpi.map((k) => <span key={k} className="chip" style={{ fontSize: 20, padding: '6px 14px', borderColor: alpha(cs[i], 0.5) }}>{k}</span>)}</div>
              </div>
            </div>
          </Pop>
        ))}
      </div>
      <Pop at={wordAt(l2, 'scale, iterate')} style={{ left: 1260, top: 150 }}>
        <div style={{ display: 'flex', gap: 10 }}>{[['Scale', C.green], ['Iterate', C.cyan], ['Stop', C.violet]].map(([t, c]) => <span key={t} className="badge" style={{ fontSize: 22, color: c, border: `1.5px solid ${c}` }}>{t}</span>)}</div>
      </Pop>
      <Reveal at={l3.from} style={{ left: 110, top: 990 }}><Note color={C.lime} text="No invented targets · every goal is set against Aalayam’s own Days 1–30 baseline" /></Reveal>
    </AbsoluteFill>
  );
};

// ─── 12 · Close
export const Close: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const eps = [['PESTEL', C.cyan], ['Five Forces', C.violet], ['Positioning', C.lime], ['Customers & market', C.green], ['Portfolio', C.cyan], ['Growth strategy', C.lime]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Reveal at={l0.from} style={{ left: 0, top: 170, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 84, lineHeight: 1.1 }}>Grow by solving what customers<br />complain about most. <span style={{ color: C.lime }}>Make fit the promise.</span></div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 520, display: 'flex', gap: 16 }}>
        {eps.map(([t, c], i) => (
          <Pop key={t} at={l1.from + i * 5} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', width: 270, padding: 22, borderColor: alpha(c, i === 5 ? 0.8 : 0.35), boxShadow: i === 5 ? `0 0 40px ${alpha(c, 0.2)}` : 'none' }}>
              <div className="eyebrow" style={{ color: c, fontSize: 17 }}>Episode {i + 1}</div>
              <div className="head" style={{ fontSize: 28, marginTop: 4 }}>{t}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l1.from + 40} style={{ left: 0, top: 740, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 110, letterSpacing: '-0.02em' }}>Aalayam</div>
        <div style={{ fontSize: 24, letterSpacing: '0.5em', color: C.cyan, marginTop: 12, fontWeight: 500 }}>BY ANAMIKA · BUSINESS RESEARCH SERIES · EPISODE 6</div>
      </Reveal>
    </AbsoluteFill>
  );
};
