import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Arrow, Chat, Check, Globe, Heart, Mic, Search, Slides, Spark, Sheet, Doc, Bars } from '../components/Icons';
import { EvidenceChip } from '../components/Positioning';
import { OPPORTUNITIES, REVIEWS, SOURCES, THEMES } from '../data';
import { C, alpha } from '../theme';

/** An episode tile in the series row. */
export const EpisodeTile: React.FC<{ n: number; title: string; color: string; lit?: number; w?: number; children?: React.ReactNode }> = ({ n, title, color, lit = 1, w = 400, children }) => (
  <div className="card" style={{ position: 'relative', width: w, padding: 30, borderColor: alpha(color, 0.15 + 0.6 * lit), boxShadow: lit > 0.5 ? `0 0 44px ${alpha(color, 0.16)}` : 'none', opacity: 0.4 + 0.6 * lit }}>
    <div className="eyebrow" style={{ color }}>Episode {n}</div>
    <div className="head" style={{ fontSize: 38, marginTop: 6 }}>{title}</div>
    {children}
  </div>
);

// ─── 1 · Episode intro
export const Intro: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const ep4 = useLit(l2.from - 4);
  const qs = [['what they like', 'What do customers like?', C.green], ['frustrates', 'What frustrates them?', C.violet], ['still looking', 'What are they still looking for?', C.lime]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <div style={{ position: 'absolute', left: 110, top: 120, display: 'flex', gap: 28 }}>
        {[['PESTEL', C.cyan], ['Five Forces', C.violet], ['Positioning', C.lime]].map(([t, c], i) => (
          <Pop key={t} at={l0.from + i * 6} style={{ position: 'relative' }}><EpisodeTile n={i + 1} title={t} color={c} lit={i === 2 ? 1 : 0.6} /></Pop>
        ))}
        <Pop at={l2.from - 6} style={{ position: 'relative' }}><EpisodeTile n={4} title="Customers & market" color={C.cyan} lit={ep4} w={420} /></Pop>
      </div>
      {/* Episode 3's perceptual map, in miniature */}
      <Reveal at={l0.from + 20} out={l1.from - 4} style={{ left: 760, top: 400 }}>
        <svg width={460} height={340} viewBox="0 0 460 340">
          <path d="M40 300 H440 M40 300 V20" stroke={C.grey} strokeWidth={3} />
          {[[90, 260], [160, 200], [200, 230], [250, 180], [360, 90], [400, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill={C.cyan} />)}
          <circle cx={300} cy={60} r={14} fill="none" stroke={C.violet} strokeWidth={4} />
          <text x={240} y={330} fill={C.grey} fontSize={20} fontFamily="Inter">Episode 3 · perceptual map</text>
        </svg>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 470, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {qs.map(([w, t, c]) => (
          <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}>
            <div className="chip" style={{ fontSize: 40, padding: '18px 34px', color: c, borderColor: alpha(c, 0.6) }}>{t}</div>
          </Pop>
        ))}
      </div>
      <Reveal at={wordAt(l2, 'customer sentiment')} style={{ left: 1150, top: 520, width: 660 }}>
        <div className="card" style={{ position: 'relative', padding: 40, borderColor: alpha(C.cyan, 0.5) }}>
          <div className="eyebrow">This episode</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 24, fontSize: 36, fontWeight: 600 }}><Heart size={52} color={C.green} />Customer sentiment</div>
          <Pop at={wordAt(l2, 'size of the opportunity')} style={{ position: 'relative', marginTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 36, fontWeight: 600 }}><Bars size={52} color={C.lime} />TAM · SAM · SOM</div>
          </Pop>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 2 · What are customers saying?
const KIND = { Positive: C.green, Negative: C.violet, Mixed: C.cyan } as const;
const Stars: React.FC<{ r: number; color: string }> = ({ r, color }) => (
  <span style={{ display: 'inline-flex', gap: 3 }}>{[0, 1, 2, 3, 4].map((i) => <svg key={i} width={26} height={26} viewBox="0 0 100 100"><path d="M50 8 L61 36 L91 38 L68 57 L76 88 L50 71 L24 88 L32 57 L9 38 L39 36 Z" fill={r >= i + 0.75 ? color : r >= i + 0.25 ? alpha(color, 0.5) : alpha(C.text, 0.12)} /></svg>)}</span>
);

export const Reviews: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4, l5] = lines;
  const words = [['comfort', 'comfort'], ['fabric', 'fabric'], ['fit', 'fit'], ['sizing', 'sizing'], ['durability', 'durability'], ['price', 'price'], ['pictures', 'looks like the photo']] as const;
  const cardAt = [l3.from - 4, l4.from - 4, l5.from - 4];
  const out1 = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} glow2={C.violet} />
      <Heading step="Customer sentiment" title="What are customers saying?" />
      {/* reviews → themes */}
      <div style={{ position: 'absolute', inset: 0, opacity: out1 }}>
        <Reveal at={l0.from} style={{ left: 110, top: 260, width: 760 }}>
          <div className="card" style={{ position: 'relative', padding: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Chat size={48} /><span className="eyebrow">Sentiment analysis</span></div>
            <div style={{ fontSize: 36, lineHeight: 1.35, marginTop: 20 }}>Reading what people say in reviews, comments and conversations, and working out <span style={{ color: C.cyan }}>how they feel</span>.</div>
          </div>
        </Reveal>
        {[0, 1, 2, 3].map((i) => {
          const at = l0.from + 30 + i * 18, p = interpolate(f, [at, at + 40], [0, 1], clamp);
          return <div key={i} style={{ position: 'absolute', left: 160 + i * 170, top: 640 + Math.sin(i * 2) * 30 - p * 40, opacity: p * (1 - p * 0.4) }}><Chat size={70} color={[C.green, C.violet, C.cyan, C.grey][i]} /></div>;
        })}
        <div style={{ position: 'absolute', left: 1000, top: 260, width: 820, display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          {words.map(([w, t]) => (
            <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 36, padding: '16px 30px', borderColor: alpha(C.cyan, 0.5) }}>{t}</div></Pop>
          ))}
        </div>
      </div>
      {/* three review cards */}
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 220, display: 'flex', alignItems: 'center', gap: 16 }}>
          <EvidenceChip kind="observed" />
          <span className="muted" style={{ fontSize: 24 }}>Public Myntra listings · other brands · examples only · summaries, not quotes</span>
        </div>
        <div style={{ position: 'absolute', left: 110, top: 300, display: 'flex', gap: 30 }}>
          {REVIEWS.map((r, i) => {
            const c = KIND[r.kind], lit = useLit(cardAt[i]);
            return (
              <Pop key={r.id} at={cardAt[i]} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', width: 546, height: 600, padding: 38, borderColor: alpha(c, 0.2 + 0.5 * lit), boxShadow: `0 0 50px ${alpha(c, 0.14 * lit)}`, display: 'flex', flexDirection: 'column' }}>
                  <span className="badge" style={{ alignSelf: 'flex-start', fontSize: 24, color: C.bg, background: c, padding: '8px 18px' }}>{r.kind.toUpperCase()}</span>
                  <div style={{ fontSize: 30, fontWeight: 600, marginTop: 28, lineHeight: 1.25 }}>{r.product}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
                    <Stars r={r.rating} color={c} /><span style={{ fontSize: 28, fontWeight: 700, color: c }}>{r.rating}</span><span className="muted" style={{ fontSize: 22 }}>{r.count} ratings</span>
                  </div>
                  <div style={{ fontSize: 30, lineHeight: 1.4, marginTop: 30, flex: 1 }}>{r.summary}</div>
                  <div className="muted" style={{ fontSize: 19, lineHeight: 1.4, borderTop: `1px solid ${C.line}`, paddingTop: 16 }}>Source: myntra.com · listing {r.id}<br />Viewed 25 Nov 2026 · summary of reviews</div>
                </div>
              </Pop>
            );
          })}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 3 · Where we collected feedback
const SOURCE_ICON: Record<string, React.FC<{ size?: number; color?: string }>> = {
  Myntra: Search, 'Amazon India': Search, AJIO: Search, Instagram: Chat, YouTube: Slides, 'Customer interviews': Mic, 'Customer surveys': Sheet,
};
export const Sources: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const at = (n: string) => (n === 'Customer interviews' ? wordAt(l1, 'interviews') : n === 'Customer surveys' ? wordAt(l1, 'surveys') : wordAt(l0, n));
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Heading step="Our data" title="Where we collected feedback" />
      <div style={{ position: 'absolute', left: 110, top: 250, display: 'grid', gridTemplateColumns: 'repeat(4, 405px)', gap: 26 }}>
        {SOURCES.map((s) => {
          const I = SOURCE_ICON[s.name], used = s.status === 'used', col = s.type === 'Primary' ? C.lime : C.cyan;
          return (
            <Pop key={s.name} at={at(s.name)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 300, padding: 30, borderColor: used ? alpha(col, 0.5) : alpha(C.violet, 0.6), borderStyle: used ? 'solid' : 'dashed', background: used ? C.card : 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconBadge color={used ? col : C.violet} size={70}><I size={38} color={used ? col : C.violet} /></IconBadge>
                  <span className="badge" style={{ fontSize: 18, color: used ? C.green : C.violet, border: `1.5px ${used ? 'solid' : 'dashed'} ${alpha(used ? C.green : C.violet, 0.6)}` }}>{used ? '● USED' : '◌ PROPOSED'}</span>
                </div>
                <div className="head" style={{ fontSize: 34, marginTop: 22 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 24, marginTop: 6 }}>{s.what}</div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '0.1em', marginTop: 14, color: col }}>{s.type.toUpperCase()}</div>
              </div>
            </Pop>
          );
        })}
        <Reveal at={wordAt(l0, 'secondary')} style={{ position: 'relative' }}>
          <div style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18, fontSize: 26 }}>
            <div><span style={{ color: C.cyan, fontWeight: 700 }}>Secondary</span> · what's already public</div>
            <div><span style={{ color: C.lime, fontWeight: 700 }}>Primary</span> · what we asked ourselves</div>
          </div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};

// ─── 4 · How we analysed it
const STEPS = [['Collect', Search], ['Clean', Check], ['Classify', Sheet], ['Tag themes', Doc], ['Insights', Spark]] as const;
export const Method: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const starts = [wordAt(l1, 'collect'), wordAt(l1, 'clean'), wordAt(l2, 'classify'), wordAt(l2, 'tag the themes'), l3.from];
  const cur = starts.filter((s) => f >= s).length - 1;
  const lanes = [['Positive', C.green], ['Negative', C.violet], ['Neutral', C.grey], ['Mixed', C.cyan]] as const;
  const strike = interpolate(f, [wordAt(l1, 'template'), wordAt(l1, 'template') + 20], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} />
      <Heading step="Method" title="How we analysed it" color={C.violet} />
      <div style={{ position: 'absolute', left: 110, top: 240, display: 'flex', alignItems: 'center', gap: 14 }}>
        {STEPS.map(([t, I], i) => (
          <React.Fragment key={t}>
            <Pop at={l0.from + 4 + i * 5} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 300, height: 130, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px', borderColor: alpha(C.violet, i === cur ? 0.8 : 0.15), boxShadow: i === cur ? `0 0 40px ${alpha(C.violet, 0.25)}` : 'none', opacity: i <= cur || cur < 0 ? 1 : 0.45 }}>
                <IconBadge color={i < cur ? C.green : C.violet} size={70} on={i === cur ? 1 : 0.3}>{i < cur ? <Check size={40} color={C.green} /> : <I size={38} color={C.violet} />}</IconBadge>
                <div><div className="eyebrow" style={{ color: C.violet, fontSize: 18 }}>Step {i + 1}</div><div className="head" style={{ fontSize: 30 }}>{t}</div></div>
              </div>
            </Pop>
            {i < 4 && <Arrow size={26} color={i < cur ? C.violet : C.dim} />}
          </React.Fragment>
        ))}
      </div>
      <div className="card" style={{ left: 110, top: 420, width: 1700, height: 560, opacity: interpolate(f, [starts[0] - 6, starts[0] + 8], [0, 1], clamp) }} />
      {/* collect + clean */}
      <Reveal at={starts[0]} out={starts[2] - 4} style={{ left: 170, top: 470, width: 1580 }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {['Soft fabric, fits well', 'Duplicate review', 'Too sheer for office', 'Buy now!!! visit link', 'Sizing runs small', '(mention the fabric) is good'].map((t, i) => {
            const bad = i === 1 || i === 3, tmpl = i === 5, gone = bad ? interpolate(f, [starts[1] + 10 + i * 4, starts[1] + 24 + i * 4], [0, 1], clamp) : 0;
            return (
              <Pop key={t} at={starts[0] + i * 5} style={{ position: 'relative' }}>
                <div style={{ padding: '20px 28px', borderRadius: 18, background: alpha(C.text, 0.04), border: `1px solid ${tmpl ? alpha(C.violet, 0.4 + 0.5 * strike) : C.line}`, fontSize: 30, opacity: 1 - gone * 0.85, transform: `translateY(${gone * 40}px)`, textDecoration: tmpl && strike > 0.5 ? 'line-through' : 'none', textDecorationColor: C.violet, color: tmpl ? alpha(C.text, 1 - 0.4 * strike) : C.text }}>
                  {t}{bad && gone > 0.5 && <span style={{ color: C.violet, fontSize: 22, marginLeft: 12 }}>removed</span>}
                </div>
              </Pop>
            );
          })}
        </div>
        <Reveal at={wordAt(l1, 'template')} style={{ position: 'relative', marginTop: 34 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26 }}><EvidenceChip kind="observed" /><span className="muted">Unfilled template text appeared in real reviews on a Myntra listing: a sign they may not be genuine.</span></div>
        </Reveal>
      </Reveal>
      {/* classify + tag */}
      <Reveal at={starts[2]} out={starts[4] - 4} style={{ left: 170, top: 470, width: 1580 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          {lanes.map(([t, c], i) => (
            <Pop key={t} at={starts[2] + 6 + i * 6} style={{ position: 'relative' }}>
              <div style={{ width: 370, padding: '18px 22px', borderRadius: 18, border: `1.5px solid ${alpha(c, 0.6)}`, background: alpha(c, 0.06) }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: c }}>{t}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>{[0, 1, 2].slice(0, 3 - (i % 2)).map((k) => <div key={k} style={{ width: 70, height: 16, borderRadius: 8, background: alpha(c, 0.5) }} />)}</div>
              </div>
            </Pop>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 50 }}>
          {THEMES.map((t, i) => {
            const w = ['comfort', 'fabric', 'fit and sizing', 'transparency', 'colour', 'price', 'delivery', 'returns'][i];
            return <Pop key={t} at={wordAt(l2, w)} style={{ position: 'relative' }}><div className="chip" style={{ fontSize: 30, borderColor: alpha(C.violet, 0.55), color: C.text }}>#{t}</div></Pop>;
          })}
        </div>
      </Reveal>
      {/* insights */}
      <Reveal at={starts[4]} style={{ left: 170, top: 480, width: 1580 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26 }}>
          {[['What customers value', 'value', C.green], ['What they complain about', 'complain', C.violet], ['What they wish existed', 'wish', C.lime]].map(([t, w, c]) => (
            <Pop key={t} at={wordAt(l3, w)} style={{ position: 'relative' }}>
              <div style={{ height: 220, padding: 30, borderRadius: 22, border: `1.5px solid ${alpha(c, 0.6)}`, background: alpha(c, 0.06), display: 'flex', alignItems: 'flex-end' }}>
                <div className="head" style={{ fontSize: 40, color: c, lineHeight: 1.15 }}>{t}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 5 · Customer insights → opportunities
export const Insights: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out1 = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  const bars = [['Comfort & soft fabric', 'Comfort', C.green, 'Most praised', 0.9], ['Fit & sizing', 'Fit', C.violet, 'Most frustration', 0.75], ['Photo vs reality', 'colour', C.cyan, 'Creates doubt', 0.6]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.green} />
      <Heading step="Insights" title="From pain points to opportunities" color={C.lime} />
      <div style={{ position: 'absolute', inset: 0, opacity: out1 }}>
        <Reveal at={l0.from} style={{ left: 110, top: 240 }}><div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><EvidenceChip kind="interpretation" /><span className="muted" style={{ fontSize: 24 }}>Themes from an illustrative sample of listings · not a market measurement</span></div></Reveal>
        <div style={{ position: 'absolute', left: 110, top: 330, display: 'flex', flexDirection: 'column', gap: 46 }}>
          {bars.map(([t, w, c, note, v]) => {
            const at = wordAt(l1, w), p = interpolate(f, [at, at + 24], [0, 1], { ...clamp, easing: (x) => 1 - (1 - x) ** 3 });
            return (
              <div key={t} style={{ opacity: Math.min(1, p * 2) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 1300, fontSize: 34, fontWeight: 600 }}><span>{t}</span><span style={{ color: c }}>{note}</span></div>
                <div style={{ width: 1300, height: 26, borderRadius: 13, background: alpha(C.text, 0.06), marginTop: 14 }}>
                  <div style={{ width: `${v * 100 * p}%`, height: '100%', borderRadius: 13, background: c, boxShadow: `0 0 18px ${alpha(c, 0.6)}` }} />
                </div>
              </div>
            );
          })}
          <div className="muted" style={{ fontSize: 20 }}>Bar lengths show order of emphasis only; no percentages are claimed.</div>
        </div>
      </div>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 240, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {OPPORTUNITIES.map((o) => (
            <Pop key={o.opp} at={wordAt(l2, o.w)} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
                <div style={{ width: 560, padding: '18px 26px', borderRadius: 18, border: `1.5px solid ${alpha(C.violet, 0.5)}`, fontSize: 32 }}>{o.pain}</div>
                <Arrow size={44} color={C.lime} />
                <div style={{ width: 860, padding: '18px 26px', borderRadius: 18, background: alpha(C.lime, 0.08), border: `1.5px solid ${alpha(C.lime, 0.6)}`, fontSize: 32, fontWeight: 600, color: C.lime }}>{o.opp}</div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(l3, 'potential opportunities')} style={{ left: 110, top: 900 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 24px', borderRadius: 14, border: `2px dashed ${alpha(C.violet, 0.7)}`, color: C.violet, fontSize: 26, fontWeight: 600 }}>Potential opportunities · to be validated with Aalayam's own customers</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

export { Globe };
