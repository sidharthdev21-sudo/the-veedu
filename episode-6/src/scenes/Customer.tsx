import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, IconBadge, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Hanger, Report, Target, Trend, Globe, Tag as TagIcon, Mic, People, Question, Chat, Arrow, Scales } from '../components/Icons';
import { PAINS, JOURNEY, SCREENER, QUESTIONS, Tag } from '../data';
import { C, alpha } from '../theme';

export const col = (k: string) => (C as Record<string, string>)[k] ?? C.grey;
const TAG: Record<Tag, [string, string]> = { F: ['FACT', C.green], P: ['PUBLIC', C.cyan], C: ['REVIEW', C.violet], O: ['OWNER', C.lime], H: ['HYPOTHESIS', C.violet], M: ['MISSING', C.grey] };
export const TagChip: React.FC<{ tag: Tag; size?: number }> = ({ tag, size = 15 }) => {
  const [l, c] = TAG[tag];
  return <span className="badge" style={{ fontSize: size, padding: '3px 10px', color: c, border: `1.5px ${tag === 'H' || tag === 'M' ? 'dashed' : 'solid'} ${alpha(c, 0.6)}`, flex: 'none' }}>{l}</span>;
};
export const Note: React.FC<{ text: string; color?: string; size?: number }> = ({ text, color = C.violet, size = 21 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 14, border: `2px dashed ${alpha(color, 0.7)}`, color, background: alpha(color, 0.06), fontSize: size, fontWeight: 600 }}>{text}</div>
);

// ─── 1 · Recap
export const Recap: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const cards = [['co-ords', 'Co-ords are the hero', 'Best on SWOT, BCG and GE', Hanger, C.lime], ['sarees', 'Sarees stay a Kerala line', 'Regional, not national', Target, C.violet], ['evidence', 'Evidence before scale', 'Track sales, returns, reviews', Report, C.cyan]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Heading step="Episode 5 · recap" title="Where to focus" />
      <div style={{ position: 'absolute', left: 110, top: 290, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, width: 1700 }}>
        {cards.map(([w, t, d, I, c]) => (
          <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', height: 300, padding: 38, borderColor: alpha(c, 0.55) }}>
              <IconBadge color={c} size={84}><I size={46} color={c} /></IconBadge>
              <div className="head" style={{ fontSize: 40, marginTop: 30 }}>{t}</div>
              <div className="muted" style={{ fontSize: 26, marginTop: 10 }}>{d}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l1.from + 30} style={{ left: 0, top: 720, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 80 }}>Now: <span style={{ color: C.lime }}>how do we grow?</span></div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 2 · The growth challenge
export const Challenge: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const out = interpolate(f, [l2.from - 8, l2.from + 4], [1, 0], clamp);
  const thin = interpolate(f, [wordAt(l0, 'every new'), wordAt(l0, 'thinner')], [0, 1], clamp);
  const tags = [['₹1,087', '−56%'], ['₹1,204', '−57%'], ['₹1,480', '−26%'], ['₹1,798', '−60%'], ['₹1,819', '−44%'], ['₹498', '−77%']];
  const tools = [['Ansoff Matrix', 'Which growth direction', C.cyan, Trend], ['Blue Ocean', 'Value rivals don’t offer', C.violet, Globe], ['ERRC grid', 'What exactly to change', C.lime, Scales]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Heading step="The growth challenge" title="More isn’t the same as growth" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        {/* one team, many directions */}
        <Reveal at={l0.from} style={{ left: 110, top: 250, width: 800 }}>
          <div className="eyebrow" style={{ color: C.violet }}>One team · one budget</div>
          {['More products', 'More markets', 'More channels', 'More categories'].map((t, i) => (
            <Reveal key={t} at={l0.from + 20 + i * 14} dir="left" style={{ position: 'relative', marginTop: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 560 * (1 - thin * (0.55 + i * 0.08)), height: 54, borderRadius: 12, background: alpha(C.violet, 0.5 - thin * 0.3), border: `1.5px solid ${alpha(C.violet, 0.7)}` }} />
                <span style={{ fontSize: 28 }}>{t}</span>
              </div>
            </Reveal>
          ))}
          <Reveal at={wordAt(l0, 'thinner')} style={{ position: 'relative', marginTop: 34 }}><div className="head" style={{ fontSize: 36 }}>Every new direction spreads it <span style={{ color: C.violet }}>thinner</span>.</div></Reveal>
        </Reveal>
        {/* look-alike price tags */}
        <Reveal at={l1.from - 4} style={{ left: 1010, top: 250, width: 800 }}>
          <div className="eyebrow">Look-alike co-ord listings</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 22 }}>
            {tags.map(([p, d], i) => (
              <Pop key={p} at={l1.from + 6 + i * 6} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', padding: '22px 20px', textAlign: 'center', borderColor: alpha(i === 5 ? C.grey : C.cyan, 0.35) }}>
                  <TagIcon size={40} color={i === 5 ? C.grey : C.cyan} />
                  <div className="head" style={{ fontSize: 40, marginTop: 8 }}>{p}</div>
                  <div className="badge" style={{ marginTop: 10, color: C.bg, background: C.lime, fontSize: 20 }}>{d} off MRP</div>
                </div>
              </Pop>
            ))}
          </div>
          <Reveal at={wordAt(l1, 'twenty-six')} style={{ position: 'relative', marginTop: 24 }}><div className="muted" style={{ fontSize: 22 }}>Listings observed in Episode 3 · last tag: unbranded marketplace set</div></Reveal>
        </Reveal>
      </div>
      <Reveal at={l2.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 110, top: 250, width: 1700 }}>
          <div className="head" style={{ fontSize: 58, lineHeight: 1.2 }}>How can Aalayam grow, and stand out,<br /><span style={{ color: C.lime }}>without competing only on price?</span></div>
        </div>
        <div style={{ position: 'absolute', left: 110, top: 520, display: 'flex', gap: 30 }}>
          {tools.map(([t, d, c, I], i) => (
            <Pop key={t} at={wordAt(l2, i === 0 ? 'Ansoff' : i === 1 ? 'Blue' : 'grid')} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 546, height: 300, padding: 40, borderColor: alpha(c, 0.6), boxShadow: `0 0 50px ${alpha(c, 0.14)}` }}>
                <IconBadge color={c} size={76}><I size={42} color={c} /></IconBadge>
                <div className="head" style={{ fontSize: 50, color: c, marginTop: 24 }}>{t}</div>
                <div style={{ fontSize: 28, marginTop: 10 }}>{d}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 3 · Customer pain points
export const Voice: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const out = interpolate(f, [l4.from - 8, l4.from + 4], [1, 0], clamp);
  const at = [l1.from - 4, l2.from - 4, l3.from - 4];
  const step = (i: number) => [wordAt(l4, 'Doubt'), wordAt(l4, 'order two'), wordAt(l4, 'return one'), wordAt(l4, 'or pay'), wordAt(l4, 'or pay') + 30][i];
  const jIcons = [Hanger, Question, People, Arrow, Scales];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Heading step="Customer voice" title="What customers complain about" color={C.violet} />
      <Reveal at={l0.from + 40} style={{ right: 110, top: 100 }}><Note text="Real public reviews and research · other brands, not Aalayam" /></Reveal>
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <div style={{ position: 'absolute', left: 110, top: 240, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, width: 1700 }}>
          {PAINS.map((p, i) => {
            const c = col(p.color), lit = useLit(at[i]);
            return (
              <Pop key={p.t} at={at[i]} style={{ position: 'relative' }}>
                <div className="card" style={{ position: 'relative', height: 740, padding: '30px 30px', borderColor: alpha(c, 0.2 + 0.5 * lit), boxShadow: `0 0 44px ${alpha(c, 0.1 * lit)}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div className="head" style={{ width: 62, height: 62, borderRadius: 18, display: 'grid', placeItems: 'center', fontSize: 34, color: C.bg, background: c }}>{i + 1}</div>
                    <div className="head" style={{ fontSize: 36 }}>{p.t}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
                    {p.items.map((it, j) => (
                      <Reveal key={it.q} at={at[i] + 14 + j * 22} dir="left" style={{ position: 'relative' }}>
                        <div style={{ borderLeft: `3px solid ${alpha(c, 0.7)}`, paddingLeft: 18 }}>
                          <div style={{ fontSize: 29, lineHeight: 1.25, fontWeight: 600 }}>{it.q}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}><TagChip tag={it.tag} size={13} /><span className="muted" style={{ fontSize: 19 }}>{it.src}</span></div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  {'stat' in p && (
                    <Reveal at={wordAt(l1, 'study')} style={{ left: 30, right: 30, bottom: 30 }}>
                      <div style={{ background: alpha(c, 0.1), border: `1.5px solid ${alpha(c, 0.5)}`, borderRadius: 18, padding: 22 }}>
                        <div className="head" style={{ fontSize: 60, color: c, lineHeight: 1 }}>{p.stat.v}</div>
                        <div style={{ fontSize: 23, marginTop: 10, lineHeight: 1.3 }}>{p.stat.d}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}><TagChip tag={p.stat.tag} size={13} /><span className="muted" style={{ fontSize: 18 }}>{p.stat.src}</span></div>
                      </div>
                    </Reveal>
                  )}
                </div>
              </Pop>
            );
          })}
        </div>
      </div>
      {/* the familiar journey */}
      <Reveal at={l4.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 270, color: C.violet }}>A familiar online journey</div>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          <line x1={250} y1={480} x2={250 + 1420 * interpolate(f, [l4.from, step(4)], [0, 1], clamp)} y2={480} stroke={alpha(C.violet, 0.7)} strokeWidth={4} strokeDasharray="10 10" />
        </svg>
        {JOURNEY.map((j, i) => {
          const I = jIcons[i], bad = i >= 2, c = bad ? C.violet : C.cyan;
          return (
            <Pop key={j.t} at={i === 0 ? l4.from + 4 : step(i - 1)} style={{ left: 110 + i * 355, top: 400, width: 290, textAlign: 'center' }}>
              <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={c} size={160}><I size={86} color={c} /></IconBadge></div>
              <div className="head" style={{ fontSize: 40, marginTop: 26 }}>{j.t}</div>
              <div className="muted" style={{ fontSize: 24, marginTop: 8, lineHeight: 1.3 }}>{j.d}</div>
            </Pop>
          );
        })}
        <Reveal at={wordAt(l4, 'It costs')} style={{ left: 110, top: 800, width: 1700 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div className="card" style={{ position: 'relative', flex: 1, padding: '24px 32px', borderColor: alpha(C.violet, 0.5) }}><span className="head" style={{ fontSize: 34 }}>Customer: </span><span style={{ fontSize: 30 }}>time, effort, a tailor’s fee</span></div>
            <div className="card" style={{ position: 'relative', flex: 1, padding: '24px 32px', borderColor: alpha(C.lime, 0.5) }}><span className="head" style={{ fontSize: 34 }}>Brand: </span><span style={{ fontSize: 30 }}>two-way shipping, lost sale, unsold stock</span></div>
          </div>
          <div className="muted" style={{ fontSize: 20, marginTop: 14 }}>Return rate: indicative industry estimates (Unicommerce, Grant Thornton Bharat), not a measured Aalayam figure</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 4 · Customer interviews
export const Interviews: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Heading step="Primary research" title="Customer interview programme" />
      <Reveal at={l0.from + 10} style={{ left: 110, top: 250, width: 640 }}>
        <div className="card" style={{ position: 'relative', padding: 36, height: 600, borderColor: alpha(C.cyan, 0.5) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><IconBadge color={C.cyan} size={76}><People size={42} color={C.cyan} /></IconBadge><div><div className="eyebrow">Who we talk to</div><div className="head" style={{ fontSize: 36 }}>Screener</div></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 34 }}>
            {SCREENER.map((s, i) => (
              <Reveal key={s} at={wordAt(l0, ['fifteen', 'bought', 'recently', 'tailor'][i])} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 30 }}><span style={{ width: 12, height: 12, borderRadius: 6, background: C.cyan, flex: 'none' }} />{s}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
      <div style={{ position: 'absolute', left: 790, top: 250, width: 1020, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Reveal at={l1.from - 4} style={{ position: 'relative' }}><div className="eyebrow" style={{ color: C.violet }}>Each question tests a hypothesis</div></Reveal>
        {QUESTIONS.map((q, i) => (
          <Pop key={q.q} at={wordAt(l1, q.w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 22, borderColor: alpha(C.violet, 0.4) }}>
              <Mic size={40} color={C.violet} style={{ flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 29, fontWeight: 600 }}>“{q.q}”</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}><span className="muted" style={{ fontSize: 21 }}>Tests H{i + 1}:</span><span style={{ fontSize: 22, color: C.violet }}>{q.h}</span></div>
              </div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l2.from} style={{ left: 110, top: 900, width: 1700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Chat size={44} color={C.lime} />
          <Note color={C.lime} size={24} text="Founder interviews held · notes not yet analysed · findings shown here are a plan to test, not results" />
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
