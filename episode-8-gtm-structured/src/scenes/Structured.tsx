import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, IconBadge, Line, Typed, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Hanger, People, Phone, Store, Chat, Search, Globe, Rupee, Check, Heart, Sheet, Lock, Arrow, Bars, Box, Trend, Target, Tag as TagIcon, Doc } from '../components/Icons';
import { WORKFLOW, FIVE_C, LENSES, SEGMENTS, PRICES, POSITIONING, FOUR_P, JOURNEY, FIX_FIRST, TIMELINE, BUDGET, budget, TABS, METRICS, Tag } from '../data';
import { C, alpha } from '../theme';

type IconT = React.FC<{ size?: number; color?: string; style?: React.CSSProperties }>;
const col = (k: string) => (C as Record<string, string>)[k] ?? C.grey;
const GC: Record<string, string> = { Understand: C.cyan, Choose: C.violet, Plan: C.lime, Launch: C.green, Learn: C.cyan };
const TAGS: Record<Tag, [string, string]> = { actual: ['AALAYAM DATA', C.green], research: ['RESEARCH', C.cyan], course: ['COURSE BENCHMARK', C.violet], example: ['EXAMPLE', C.violet], judgement: ['OUR ASSESSMENT', C.lime] };
const TagChip: React.FC<{ tag: Tag; size?: number }> = ({ tag, size = 15 }) => {
  const [t, c] = TAGS[tag];
  return <span className="badge" style={{ fontSize: size, padding: '3px 10px', color: c, border: `1.5px ${tag === 'example' || tag === 'judgement' ? 'dashed' : 'solid'} ${alpha(c, 0.7)}`, whiteSpace: 'nowrap' }}>{t}</span>;
};

/** Workflow progress bar shown at the top of every step. */
const Bar: React.FC<{ step: number }> = ({ step }) => {
  const p = useLit(0, 14);
  return (
    <div style={{ position: 'absolute', left: 110, top: 36, width: 1700, display: 'flex', gap: 8, opacity: p }}>
      {WORKFLOW.map((w, i) => {
        const on = i === step, done = i < step, c = GC[w.g];
        return (
          <div key={w.k} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: 8, borderRadius: 4, background: on ? c : done ? alpha(c, 0.5) : alpha(C.text, 0.08), boxShadow: on ? `0 0 14px ${c}` : 'none' }} />
            <div style={{ fontSize: 17, marginTop: 8, fontWeight: on ? 700 : 500, color: on ? c : done ? C.text : C.grey }}>{i + 1}. {w.k}</div>
          </div>
        );
      })}
    </div>
  );
};
const Head: React.FC<{ step: number; title: React.ReactNode; sub?: string; at?: number }> = ({ step, title, sub, at = 0 }) => (
  <>
    <Bar step={step} />
    <Reveal at={at} style={{ left: 110, top: 112, width: 1700 }}>
      <div className="head" style={{ fontSize: 60 }}>{title}</div>
      {sub && <div className="muted" style={{ fontSize: 26, marginTop: 4 }}>{sub}</div>}
    </Reveal>
  </>
);

// ─── 0 · Intro: the workflow
export const Intro: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const groups = ['Understand', 'Choose', 'Plan', 'Launch', 'Learn'];
  const gw = { Understand: 'study the situation', Choose: 'choose the customer', Plan: 'plan the offer', Launch: 'launch it', Learn: 'record the data' } as Record<string, string>;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Reveal at={l0.from} style={{ left: 0, top: 90, width: 1920, textAlign: 'center' }}><div className="eyebrow">Aalayam by Anamika · Episode 8 · Go-to-market strategy</div></Reveal>
      <div style={{ position: 'absolute', left: 0, top: 160, width: 1920, display: 'flex', justifyContent: 'center', gap: 24 }}>
        {([['WHAT', 'we sell', Hanger, C.lime, 'what we sell'], ['WHO', 'we sell to', People, C.cyan, 'who we sell'], ['HOW', 'we reach them', Phone, C.violet, 'how we reach']] as const).map(([t, d, I, c, w]) => (
          <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', width: 440, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20, borderColor: alpha(c, 0.6) }}>
              <IconBadge color={c} size={80}><I size={44} color={c} /></IconBadge>
              <div><div className="head" style={{ fontSize: 44, color: c }}>{t}</div><div style={{ fontSize: 26 }}>{d}</div></div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l1.from - 4} style={{ left: 0, top: 400, width: 1920, textAlign: 'center' }}><div className="head" style={{ fontSize: 44 }}>The workflow: <span style={{ color: C.lime }}>10 steps in 5 stages</span></div></Reveal>
      <div style={{ position: 'absolute', left: 110, top: 490, width: 1700, display: 'flex', gap: 18 }}>
        {groups.map((g) => {
          const steps = WORKFLOW.map((w, i) => ({ ...w, i })).filter((w) => w.g === g), c = GC[g];
          return (
            <Pop key={g} at={wordAt(l1, gw[g])} style={{ position: 'relative', flex: steps.length }}>
              <div className="card" style={{ position: 'relative', padding: 22, height: 420, borderColor: alpha(c, 0.6) }}>
                <div className="eyebrow" style={{ color: c, fontSize: 20 }}>{g}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
                  {steps.map((s) => <div key={s.k} style={{ padding: '16px 18px', borderRadius: 14, background: alpha(c, 0.1), border: `1px solid ${alpha(c, 0.4)}`, fontSize: 28, fontWeight: 600 }}><span style={{ color: c }}>{s.i + 1}.</span> {s.k}</div>)}
                </div>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 1 · 5Cs
export const FiveC: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3, l4] = lines;
  const at = [l1.from - 4, l2.from - 4, l3.from - 4, l4.from - 4, wordAt(l4, 'Competitors')];
  const icons: IconT[] = [People, Store, Trend, Globe, Target];
  const cs = [C.violet, C.lime, C.cyan, C.green, C.violet];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Head step={0} title="Understand the situation: the 5Cs" sub="Real facts, with their sources" at={l0.from} />
      <div style={{ position: 'absolute', left: 110, top: 270, width: 1700, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
        {FIVE_C.map((c, i) => {
          const I = icons[i];
          return (
            <Pop key={c.c} at={at[i]} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 680, padding: '28px 24px', borderColor: alpha(cs[i], 0.55) }}>
                <IconBadge color={cs[i]} size={76}><I size={42} color={cs[i]} /></IconBadge>
                <div className="head" style={{ fontSize: 34, marginTop: 20 }}>{c.c}</div>
                <div className="head" style={{ fontSize: 64, color: cs[i], marginTop: 24, lineHeight: 1 }}>{c.big}</div>
                <div style={{ fontSize: 25, marginTop: 14, lineHeight: 1.35 }}>{c.d}</div>
                <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
                  <TagChip tag={c.tag} size={13} />
                  <div className="muted" style={{ fontSize: 17, marginTop: 8 }}>{c.src}</div>
                </div>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 2 · Segment
export const Segment: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const icons: IconT[] = [Globe, People, Box, Heart];
  const cs = [C.cyan, C.lime, C.green, C.violet];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Head step={1} title="Split the market into groups" sub="Four lenses from the strategy framework" at={l0.from} />
      <div style={{ position: 'absolute', left: 110, top: 280, width: 1700, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        {LENSES.map((s, i) => {
          const I = icons[i];
          return (
            <Pop key={s.t} at={wordAt(l1, s.w)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 330, padding: 40, borderColor: alpha(cs[i], i === 3 ? 0.9 : 0.55), boxShadow: i === 3 ? `0 0 50px ${alpha(cs[i], 0.2)}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}><IconBadge color={cs[i]} size={96}><I size={52} color={cs[i]} /></IconBadge><div className="head" style={{ fontSize: 48, color: cs[i] }}>{s.t}</div></div>
                <div style={{ fontSize: 38, marginTop: 34, lineHeight: 1.3 }}>{s.e}</div>
                {i === 3 && <div style={{ position: 'absolute', right: 30, top: 30 }}><span className="badge" style={{ fontSize: 16, color: C.bg, background: C.violet }}>MOST POWERFUL</span></div>}
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 3 · Target
export const TargetScene: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const X0 = 300, Y0 = 280, W = 900, H = 680;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Head step={2} title="Choose who to focus on" sub="How attractive is each group × how well can Aalayam serve it?" at={l0.from} />
      <svg width={1920} height={1080} style={{ position: 'absolute', opacity: useLit(l0.from + 20) }}>
        <rect x={X0 + W / 2} y={Y0} width={W / 2} height={H / 2} fill={alpha(C.lime, 0.07)} />
        <rect x={X0} y={Y0} width={W} height={H} fill="none" stroke={C.line} strokeWidth={2} />
        <line x1={X0 + W / 2} x2={X0 + W / 2} y1={Y0} y2={Y0 + H} stroke={C.line} strokeDasharray="8 8" />
        <line x1={X0} x2={X0 + W} y1={Y0 + H / 2} y2={Y0 + H / 2} stroke={C.line} strokeDasharray="8 8" />
        <text x={X0 + W / 2} y={Y0 + H + 50} fill={C.grey} fontSize={24} textAnchor="middle" fontFamily="Inter">How well Aalayam can serve it →</text>
        <text x={X0 - 40} y={Y0 + H / 2} fill={C.grey} fontSize={24} textAnchor="middle" fontFamily="Inter" transform={`rotate(-90 ${X0 - 40} ${Y0 + H / 2})`}>How attractive the group is →</text>
        <text x={X0 + W - 20} y={Y0 + 36} fill={C.lime} fontSize={22} textAnchor="end" fontFamily="Inter" fontWeight={700}>FOCUS HERE</text>
      </svg>
      {SEGMENTS.map((s, i) => {
        const c = col(s.c), x = X0 + s.x * W, y = Y0 + (1 - s.y) * H, big = i === 0;
        return (
          <Pop key={s.t} at={wordAt(l1, s.w)} style={{ left: x - (big ? 34 : 24), top: y - (big ? 34 : 24) }}>
            <div style={{ width: big ? 68 : 48, height: big ? 68 : 48, borderRadius: 40, background: alpha(c, 0.85), boxShadow: big ? `0 0 30px ${c}` : 'none' }} />
            <div style={{ position: 'absolute', left: big ? 84 : 62, top: big ? 6 : -2, whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{s.t}</div>
              <span className="badge" style={{ fontSize: 15, color: big ? C.bg : c, background: big ? C.lime : 'transparent', border: `1.5px solid ${c}` }}>{s.v}</span>
            </div>
          </Pop>
        );
      })}
      <Reveal at={l1.from + 30} style={{ left: 1400, top: 600, width: 410 }}>
        <div className="card" style={{ position: 'relative', padding: 28, borderColor: alpha(C.lime, 0.6) }}>
          <div className="eyebrow" style={{ color: C.lime, fontSize: 18 }}>Main target</div>
          <div className="head" style={{ fontSize: 32, marginTop: 8, lineHeight: 1.2 }}>Women 25–40 who wear L to 3XL, in Kerala</div>
          <div style={{ fontSize: 22, marginTop: 14, lineHeight: 1.4 }}>Underserved on fit · reachable on Instagram and WhatsApp · close to our Kochi base</div>
          <div style={{ marginTop: 16 }}><TagChip tag="judgement" size={14} /></div>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 4 · Position
export const Position: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const out = interpolate(f, [l3.from - 8, l3.from + 4], [1, 0], clamp);
  const X = (p: number) => 160 + (p / 3000) * 1560;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Head step={3} title="Own a place in her mind" sub="Co-ord set prices in the market (observed listings)" at={l0.from} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          <line x1={160} x2={1720} y1={860} y2={860} stroke={C.line} strokeWidth={3} />
          {[0, 500, 1000, 1500, 2000, 2500, 3000].map((p) => <text key={p} x={X(p)} y={900} fill={C.grey} fontSize={22} textAnchor="middle" fontFamily="Inter">₹{p.toLocaleString('en-IN')}{p === 3000 ? '+' : ''}</text>)}
        </svg>
        {PRICES.map((p, i) => {
          const c = col(p.c), me = p.t === 'Aalayam', y = [700, 560, 700, 400][i];
          return (
            <Pop key={p.t} at={me ? wordAt(l2, p.w) : wordAt(l1, p.w)} style={{ left: X(p.lo), top: y }}>
              <div style={{ width: Math.max(X(p.hi) - X(p.lo), 60), height: 46, borderRadius: 12, background: alpha(c, me ? 0.85 : 0.4), border: `2px solid ${c}`, boxShadow: me ? `0 0 30px ${alpha(c, 0.5)}` : 'none' }} />
              <div style={{ marginTop: 10, whiteSpace: 'nowrap' }}>
                <div className="head" style={{ fontSize: me ? 36 : 28, color: me ? C.lime : C.text }}>{p.t} · ₹{p.lo.toLocaleString('en-IN')}{p.t === 'Premium labels' ? '+' : '–' + p.hi.toLocaleString('en-IN')}</div>
                <div className="muted" style={{ fontSize: 22 }}>{p.note}</div>
              </div>
            </Pop>
          );
        })}
        <Reveal at={wordAt(l2, 'stands apart')} style={{ left: 1150, top: 300, width: 660 }}>
          <div className="card" style={{ position: 'relative', padding: '22px 28px', borderColor: alpha(C.lime, 0.6) }}>
            <div className="head" style={{ fontSize: 30 }}>Same price zone, <span style={{ color: C.lime }}>different promise</span></div>
            <div style={{ fontSize: 23, marginTop: 8 }}>Competitors fight on discounts and range. Aalayam competes on fit.</div>
          </div>
        </Reveal>
      </div>
      <Reveal at={l3.from - 2} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 160, top: 300, width: 1600, textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: C.lime }}>Positioning</div>
          <div className="head" style={{ fontSize: 110, color: C.lime, marginTop: 10 }}>“Fits the first time.”</div>
          <div style={{ fontSize: 32, marginTop: 40, lineHeight: 1.45 }}>{POSITIONING}</div>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 5 · 4Ps
export const FourPs: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, ...L] = lines;
  const icons: IconT[] = [Hanger, Rupee, Store, Phone];
  const cs = [C.lime, C.cyan, C.green, C.violet];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Head step={4} title="Plan the offer: the 4Ps" sub="The marketing mix" at={l0.from} />
      <div style={{ position: 'absolute', left: 110, top: 260, width: 1700, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {FOUR_P.map((p, i) => {
          const I = icons[i], lit = useLit(L[i].from - 4);
          return (
            <Pop key={p.p} at={L[i].from - 4} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', height: 360, padding: '30px 36px', borderColor: alpha(cs[i], 0.25 + 0.5 * lit), boxShadow: `0 0 40px ${alpha(cs[i], 0.12 * lit)}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><IconBadge color={cs[i]} size={80}><I size={44} color={cs[i]} /></IconBadge><div className="head" style={{ fontSize: 50, color: cs[i] }}>{p.p}</div></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
                  {p.items.map((x, j) => <Reveal key={x} at={L[i].from + 6 + j * 14} dir="left" style={{ position: 'relative' }}><div style={{ display: 'flex', gap: 14, fontSize: 30 }}><Check size={34} color={cs[i]} style={{ flex: 'none' }} />{x}</div></Reveal>)}
                </div>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 6 · Customer journey (AIDAS)
export const Journey: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const icons: IconT[] = [Phone, Search, Doc, Chat, Heart];
  const cs = [C.violet, C.cyan, C.lime, C.green, C.violet];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Head step={5} title="Map her journey" sub="The AIDAS model: a message and a number for every stage" at={l0.from} />
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <line x1={200} x2={200 + 1520 * interpolate(f, [l1.from, l1.from + l1.durationInFrames], [0, 1], clamp)} y1={440} y2={440} stroke={alpha(C.cyan, 0.6)} strokeWidth={4} strokeDasharray="12 10" />
      </svg>
      <div style={{ position: 'absolute', left: 110, top: 290, width: 1700, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
        {JOURNEY.map((j, i) => {
          const I = icons[i];
          return (
            <Pop key={j.s} at={wordAt(l1, j.w)} style={{ position: 'relative' }}>
              <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={cs[i]} size={130}><I size={70} color={cs[i]} /></IconBadge></div>
              <div className="card" style={{ position: 'relative', marginTop: 22, height: 400, padding: 24, textAlign: 'center', borderColor: alpha(cs[i], 0.5) }}>
                <div className="eyebrow" style={{ fontSize: 16, color: cs[i] }}>{j.a}</div>
                <div className="head" style={{ fontSize: 40, marginTop: 6 }}>{j.s}</div>
                <div style={{ fontSize: 24, marginTop: 18, lineHeight: 1.35 }}>{j.touch}</div>
                <Reveal at={l2.from + i * 8} style={{ left: 20, right: 20, bottom: 24 }}>
                  <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14 }}><div className="muted" style={{ fontSize: 16, letterSpacing: '0.1em' }}>WATCH</div><div className="head" style={{ fontSize: 26, color: cs[i], marginTop: 4 }}>{j.kpi}</div></div>
                </Reveal>
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 7 · Launch
export const Launch: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} glow2={C.lime} />
      <Head step={6} title="Launch small, fix the basics first" sub="A soft launch: one capsule, a waitlist, then scale" at={l0.from} />
      <Reveal at={l1.from - 4} style={{ left: 110, top: 270, width: 1700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span className="eyebrow" style={{ color: C.violet, fontSize: 20 }}>Fix first: from the live store today</span><TagChip tag="actual" size={14} /></div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          {FIX_FIRST.map((x) => (
            <Pop key={x.t} at={wordAt(l1, x.w)} style={{ position: 'relative', flex: 1 }}>
              <div className="card" style={{ position: 'relative', height: 200, padding: '22px 26px', borderColor: alpha(C.violet, 0.6) }}>
                <div className="head" style={{ fontSize: 58, color: C.violet }}>{x.v}</div>
                <div style={{ fontSize: 25, marginTop: 6, lineHeight: 1.3 }}>{x.t}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <line x1={200} x2={200 + 1520 * interpolate(f, [l2.from, l2.from + l2.durationInFrames - 20], [0, 1], clamp)} y1={640} y2={640} stroke={C.green} strokeWidth={5} style={{ filter: `drop-shadow(0 0 8px ${C.green})` }} />
      </svg>
      <div style={{ position: 'absolute', left: 110, top: 605, width: 1700, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {TIMELINE.map((t, i) => (
          <Pop key={t.d} at={wordAt(l2, t.w)} style={{ position: 'relative' }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: i === 3 ? C.lime : C.green, display: 'grid', placeItems: 'center', margin: '0 auto', boxShadow: `0 0 20px ${i === 3 ? C.lime : C.green}` }}><span className="head" style={{ color: C.bg, fontSize: 22 }}>{t.d}</span></div>
            <div className="card" style={{ position: 'relative', marginTop: 20, height: 210, padding: 24, textAlign: 'center', borderColor: alpha(i === 3 ? C.lime : C.green, 0.5) }}>
              <div style={{ fontSize: 28, lineHeight: 1.35 }}>{t.t}</div>
            </div>
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── 8 · Budget (illustrative)
export const Budget: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const b = budget();
  const rs = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
  const chain: [string, string, string][] = [
    [`${BUDGET.orders} orders`, 'goal per month', 'thirty orders'],
    [`÷ ${BUDGET.conv * 100}% buy`, '1 visit in 100', 'one visit'],
    [`= ${b.visits.toLocaleString('en-IN')} visits`, 'needed', 'three thousand'],
    [`× ${rs(BUDGET.cpc)} a click`, 'cost per visit', 'ten rupees'],
    [`= ${rs(b.spend)}`, 'per month on ads', 'thirty thousand rupees'],
  ];
  const ok = b.cpo < BUDGET.contribution;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Head step={7} title="Set the budget from a goal" sub="Ground-up budgeting: work backwards from the orders you need" at={l0.from} />
      <Reveal at={l0.from + 60} style={{ right: 110, top: 125 }}><TagChip tag="example" size={20} /></Reveal>
      <div style={{ position: 'absolute', left: 110, top: 290, width: 1700, display: 'flex', alignItems: 'center', gap: 14 }}>
        {chain.map(([t, d, w], i) => (
          <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative', flex: 1 }}>
            <div className="card" style={{ position: 'relative', height: 200, padding: '26px 20px', textAlign: 'center', borderColor: alpha(i === 4 ? C.lime : C.cyan, i === 4 ? 0.8 : 0.45), boxShadow: i === 4 ? `0 0 40px ${alpha(C.lime, 0.2)}` : 'none' }}>
              <div className="head" style={{ fontSize: 42, color: i === 4 ? C.lime : C.text }}>{t}</div>
              <div className="muted" style={{ fontSize: 24, marginTop: 10 }}>{d}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l1.from + 60} style={{ left: 110, top: 520 }}><div className="muted" style={{ fontSize: 22 }}>Plus creators: {BUDGET.creators} nano creators × {rs(BUDGET.creatorFee)} = {rs(b.creators)} a quarter (course range ₹1K–5K per post)</div></Reveal>
      <Reveal at={l2.from - 4} style={{ left: 110, top: 600, width: 1700 }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <div className="card" style={{ position: 'relative', flex: 1, padding: 30, borderColor: alpha(C.violet, 0.6) }}>
            <div className="muted" style={{ fontSize: 24 }}>Ad cost per order</div>
            <div className="head" style={{ fontSize: 72, color: C.violet }}>{rs(b.cpo)}</div>
            <div className="muted" style={{ fontSize: 20 }}>{rs(b.spend)} ÷ {BUDGET.orders} orders</div>
          </div>
          <div className="card" style={{ position: 'relative', flex: 1, padding: 30, borderColor: alpha(C.cyan, 0.6) }}>
            <div className="muted" style={{ fontSize: 24 }}>What one order earns after costs</div>
            <div className="head" style={{ fontSize: 72, color: C.cyan }}>≈ {rs(BUDGET.contribution)}</div>
            <div className="muted" style={{ fontSize: 20 }}>At the real median price ₹1,200, with example costs (Episode 7)</div>
          </div>
          <Pop at={wordAt(l2, "If it doesn't")} style={{ position: 'relative', flex: 1 }}>
            <div className="card" style={{ position: 'relative', height: '100%', padding: 30, borderColor: alpha(ok ? C.green : C.lime, 0.8), boxShadow: `0 0 40px ${alpha(C.lime, 0.15)}` }}>
              <div className="head" style={{ fontSize: 44, color: ok ? C.green : C.lime }}>{ok ? '✓ Pays' : '✕ Doesn’t pay yet'}</div>
              <div style={{ fontSize: 26, marginTop: 14, lineHeight: 1.35 }}>Fix the store first, so more visitors buy, before spending more on ads</div>
            </div>
          </Pop>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 9 · Record data
export const Record: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const flow: [IconT, string, string, string][] = [[Phone, 'Post', 'Reel 12 with a tracking tag', C.violet], [Store, 'Visit', 'Shopify sees: from Reel 12', C.cyan], [Box, 'Order', 'Order counted for Reel 12', C.lime]];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.green} />
      <Head step={8} title="Record the data" sub="Last time, the results weren’t written down" at={l0.from} />
      <Reveal at={l1.from - 4} style={{ left: 110, top: 270, width: 1700 }}>
        <div className="card" style={{ position: 'relative', padding: '18px 28px', fontFamily: 'monospace', fontSize: 30, borderColor: alpha(C.lime, 0.5) }}>
          aalayambyanamika.com/products/co-ord<span style={{ color: C.lime }}><Typed text="?utm_source=instagram&utm_campaign=reel-12" a={l1.from + 6} b={l1.from + 60} /></span>
        </div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 390, width: 1700, display: 'flex', alignItems: 'center', gap: 20 }}>
        {flow.map(([I, t, d, c], i) => (
          <React.Fragment key={t}>
            <Pop at={wordAt(l1, ['tracking tag', 'into the store', 'each order'][i])} style={{ position: 'relative', flex: 1 }}>
              <div className="card" style={{ position: 'relative', padding: 24, display: 'flex', alignItems: 'center', gap: 18, borderColor: alpha(c, 0.6) }}>
                <IconBadge color={c} size={76}><I size={42} color={c} /></IconBadge>
                <div><div className="head" style={{ fontSize: 36 }}>{t}</div><div className="muted" style={{ fontSize: 22 }}>{d}</div></div>
              </div>
            </Pop>
            {i < 2 && <Arrow size={50} color={C.grey} />}
          </React.Fragment>
        ))}
      </div>
      <Reveal at={l2.from - 4} style={{ left: 110, top: 560, width: 1100 }}>
        <div className="card" style={{ position: 'relative', overflow: 'hidden', borderColor: alpha(C.cyan, 0.5) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 28px' }}><Sheet size={44} color={C.cyan} /><span className="head" style={{ fontSize: 34 }}>One shared sheet · five tabs</span></div>
          <div style={{ display: 'flex', gap: 4, padding: '0 18px 18px' }}>
            {TABS.map((t, i) => <Pop key={t} at={l2.from + 30 + i * 10} style={{ position: 'relative', flex: 1 }}><div style={{ textAlign: 'center', padding: '18px 0', fontSize: 26, fontWeight: 600, borderRadius: 12, background: alpha([C.violet, C.green, C.cyan, C.lime, C.violet][i], 0.18), border: `1px solid ${alpha([C.violet, C.green, C.cyan, C.lime, C.violet][i], 0.5)}` }}>{t}</div></Pop>)}
          </div>
        </div>
        <Reveal at={wordAt(l2, 'No customer')} style={{ position: 'relative', marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderRadius: 16, border: `2px solid ${alpha(C.cyan, 0.5)}` }}><Lock size={40} color={C.cyan} /><span style={{ fontSize: 28 }}>No customer names or phone numbers in the sheet</span></div>
        </Reveal>
      </Reveal>
      <Pop at={wordAt(l2, 'every Monday')} style={{ left: 1290, top: 560, width: 520 }}>
        <div className="card" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', borderColor: alpha(C.green, 0.7) }}>
          <div className="head" style={{ background: C.green, color: C.bg, fontSize: 34, padding: '14px 0' }}>EVERY MONDAY</div>
          <div className="head" style={{ fontSize: 120, lineHeight: 1, paddingTop: 16 }}>30</div>
          <div className="head muted" style={{ fontSize: 34, padding: '4px 0 24px' }}>minutes to update</div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// ─── 10 · Measure and decide
export const Measure: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const cs = [C.violet, C.cyan, C.lime, C.green, C.violet];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Head step={9} title="Measure, then decide" sub="One number per journey stage" at={l0.from} />
      <div style={{ position: 'absolute', left: 110, top: 270, width: 1700, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
        {METRICS.map((m, i) => (
          <Pop key={m.m} at={l1.from + 10 + i * 16} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', height: 250, padding: 24, textAlign: 'center', borderColor: alpha(cs[i], 0.55) }}>
              <div className="eyebrow" style={{ fontSize: 16, color: cs[i] }}>{m.s}</div>
              <div className="head" style={{ fontSize: 34, marginTop: 10, lineHeight: 1.15 }}>{m.m}</div>
              <div style={{ fontSize: 22, marginTop: 14, fontFamily: 'monospace', color: cs[i] }}>{m.f}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l2.from - 4} style={{ left: 110, top: 580, width: 1700 }}>
        <div className="card" style={{ position: 'relative', padding: '22px 30px', borderColor: alpha(C.cyan, 0.5) }}>
          <span className="head" style={{ fontSize: 34 }}>Rule: wait about <span style={{ color: C.cyan }}>4 weeks</span> and <span style={{ color: C.cyan }}>a few hundred visits</span> before deciding</span>
        </div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 730, width: 1700, display: 'flex', gap: 22 }}>
        {[['Scale', 'what works', C.green, 'scale'], ['Change', 'what’s close', C.lime, 'change'], ['Stop', 'what isn’t working', C.violet, 'stop']].map(([t, d, c, w]) => (
          <Pop key={t} at={wordAt(l2, w)} style={{ position: 'relative', flex: 1 }}>
            <div className="card" style={{ position: 'relative', padding: '28px 32px', textAlign: 'center', borderColor: alpha(c, 0.8), boxShadow: `0 0 40px ${alpha(c, 0.15)}` }}>
              <div className="head" style={{ fontSize: 60, color: c }}>{t}</div>
              <div style={{ fontSize: 30, marginTop: 4 }}>{d}</div>
            </div>
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Close
export const Close: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0] = lines;
  const words: [string, string, string][] = [['Know the situation', 'know the', C.cyan], ['Choose her', 'choose her', C.violet], ['Stand apart', 'stand apart', C.violet], ['Launch small', 'launch small', C.green], ['Write it down', 'write it', C.cyan], ['Decide with data', 'decide with', C.lime]];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Bar step={10} />
      <Reveal at={l0.from} style={{ left: 0, top: 160, width: 1920, textAlign: 'center' }}><div className="eyebrow">Aalayam’s go-to-market</div></Reveal>
      <div style={{ position: 'absolute', left: 0, top: 230, width: 1920, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, padding: '0 200px' }}>
        {words.map(([t, w, c], i) => (
          <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
            <span className="chip" style={{ fontSize: 46, padding: '20px 40px', borderColor: alpha(c, 0.7), color: c }}>{i + 1}. {t}</span>
          </Pop>
        ))}
      </div>
      <Reveal at={l0.from + l0.durationInFrames - 10} style={{ left: 0, top: 690, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 110, letterSpacing: '-0.02em' }}>Aalayam</div>
        <div style={{ fontSize: 24, letterSpacing: '0.5em', color: C.cyan, marginTop: 12, fontWeight: 500 }}>BY ANAMIKA · EPISODE 8 · GO-TO-MARKET</div>
      </Reveal>
    </AbsoluteFill>
  );
};
