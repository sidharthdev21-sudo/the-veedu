import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, IconBadge, Line, Typed, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Hanger, People, Phone, Store, Chat, Search, Globe, Rupee, Check, Heart, Sheet, Doc, Lock, Arrow, Bars, Box, Question } from '../components/Icons';
import { C, alpha } from '../theme';

type IconT = React.FC<{ size?: number; color?: string; style?: React.CSSProperties }>;
const Title: React.FC<{ text: React.ReactNode; at?: number; top?: number; size?: number }> = ({ text, at = 0, top = 110, size = 74 }) => (
  <Reveal at={at} style={{ left: 0, top, width: 1920, textAlign: 'center' }}><div className="head" style={{ fontSize: size, lineHeight: 1.15 }}>{text}</div></Reveal>
);
const Eyebrow: React.FC<{ text: string; at?: number; color?: string }> = ({ text, at = 0, color = C.cyan }) => (
  <Reveal at={at} style={{ left: 0, top: 70, width: 1920, textAlign: 'center' }}><div className="eyebrow" style={{ color }}>{text}</div></Reveal>
);
const Card: React.FC<{ icon: IconT; t: string; d?: string; c: string; at: number; w?: number; h?: number }> = ({ icon: I, t, d, c, at, w = 520, h }) => (
  <Pop at={at} style={{ position: 'relative' }}>
    <div className="card" style={{ position: 'relative', width: w, height: h, padding: '34px 30px', textAlign: 'center', borderColor: alpha(c, 0.6), boxShadow: `0 0 50px ${alpha(c, 0.12)}` }}>
      <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={c} size={110}><I size={62} color={c} /></IconBadge></div>
      <div className="head" style={{ fontSize: 42, marginTop: 24, lineHeight: 1.15 }}>{t}</div>
      {d && <div className="muted" style={{ fontSize: 28, marginTop: 10 }}>{d}</div>}
    </div>
  </Pop>
);
const Row: React.FC<{ children: React.ReactNode; top: number; gap?: number }> = ({ children, top, gap = 30 }) => (
  <div style={{ position: 'absolute', left: 0, top, width: 1920, display: 'flex', justifyContent: 'center', gap }}>{children}</div>
);
const Example: React.FC = () => <span className="badge" style={{ fontSize: 16, color: C.violet, border: `1.5px dashed ${alpha(C.violet, 0.7)}` }}>EXAMPLE</span>;

// ─── 1 · What is go-to-market?
export const Intro: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Eyebrow text="Aalayam by Anamika · Episode 8" at={l0.from} />
      <Title at={l0.from + 4} top={150} text={<>A great product nobody hears about<br /><span style={{ color: C.violet }}>doesn’t sell.</span></>} />
      <Reveal at={wordAt(l0, 'go-to-market')} style={{ left: 0, top: 380, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 46 }}>A <span style={{ color: C.lime }}>go-to-market strategy</span> answers three questions</div>
      </Reveal>
      <Row top={500}>
        <Card icon={Hanger} t="WHAT" d="are we selling?" c={C.lime} at={wordAt(l1, 'What are')} />
        <Card icon={People} t="WHO" d="are we selling to?" c={C.cyan} at={wordAt(l1, 'Who are')} />
        <Card icon={Phone} t="HOW" d="will we reach them?" c={C.violet} at={wordAt(l1, 'how will')} />
      </Row>
    </AbsoluteFill>
  );
};

// ─── 2 · What we sell
export const What: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Eyebrow text="Question 1 · What" color={C.lime} />
      <Title at={l0.from} text="What we sell" />
      <Row top={260}>
        <Card icon={Hanger} t="Cotton co-ord sets" c={C.lime} at={wordAt(l0, 'cotton')} />
        <Card icon={People} t="Sizes L to 3XL" c={C.cyan} at={wordAt(l0, 'sizes')} />
        <Card icon={Rupee} t="₹1,000 – ₹1,700" c={C.violet} at={wordAt(l0, 'priced')} />
      </Row>
      <Reveal at={wordAt(l1, 'fit the first')} style={{ left: 0, top: 660, width: 1920, textAlign: 'center' }}>
        <div className="muted" style={{ fontSize: 30 }}>One clear promise</div>
        <div className="head" style={{ fontSize: 96, color: C.lime, marginTop: 4 }}>“Fits the first time.”</div>
      </Reveal>
      <Row top={900} gap={20}>
        {[['Real measurements', 'measurements'], ['Honest prices', 'honest'], ['Size help on WhatsApp', 'size help']].map(([t, w]) => (
          <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}><span className="chip" style={{ fontSize: 34, padding: '14px 32px', borderColor: alpha(C.lime, 0.6) }}>✓ {t}</span></Pop>
        ))}
      </Row>
    </AbsoluteFill>
  );
};

// ─── 3 · Who we sell to
export const Who: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const steps = [['All women', 'Not everyone', 880], ['Who wear L to 3XL', 'wear L', 790], ['Aged 25 to 40', 'twenty-five', 700], ['In Kerala and India’s big cities', 'Kerala', 640]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.violet} />
      <Eyebrow text="Question 2 · Who" />
      <Title at={l0.from} text="Who we sell to" />
      <div style={{ position: 'absolute', left: 110, top: 270, width: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {steps.map(([t, w, wd], i) => (
          <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
            <div style={{ width: wd, padding: '24px 0', whiteSpace: 'nowrap', borderRadius: 20, textAlign: 'center', background: alpha(C.cyan, 0.08 + i * 0.06), border: `2px solid ${alpha(C.cyan, 0.3 + i * 0.15)}` }}>
              <span className="head" style={{ fontSize: i === 0 ? 34 : 36, color: i === 0 ? C.grey : C.text, textDecoration: i === 0 ? 'line-through' : 'none' }}>{t}</span>
            </div>
          </Pop>
        ))}
      </div>
      <Pop at={wordAt(l1, 'Picture Anu')} style={{ left: 1060, top: 270, width: 750 }}>
        <div className="card" style={{ position: 'relative', padding: 44, borderColor: alpha(C.violet, 0.7), boxShadow: `0 0 60px ${alpha(C.violet, 0.15)}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <IconBadge color={C.violet} size={110}><Heart size={60} color={C.violet} /></IconBadge>
            <div><div className="head" style={{ fontSize: 60 }}>Anu, 32</div><Example /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 36 }}>
            {[['XL top · 2XL pant', 'XL top'], ['Has sent back clothes that didn’t fit', 'sent back'], ['Trusts real women more than models', 'trusts']].map(([t, w]) => (
              <Reveal key={t} at={wordAt(l1, w)} dir="left" style={{ position: 'relative' }}><div style={{ display: 'flex', gap: 16, fontSize: 36, lineHeight: 1.25 }}><Check size={40} color={C.violet} style={{ flex: 'none' }} />{t}</div></Reveal>
            ))}
          </div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// ─── 4 · How we reach her
export const How: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const ch: [IconT, string, string, string, string][] = [
    [Phone, 'Instagram Reels', 'Real women in every size', 'Instagram', C.violet],
    [Chat, 'WhatsApp size check', 'Help choosing a size', 'WhatsApp', C.green],
    [Store, 'Our own store', 'Every link lands here', 'own online', C.cyan],
    [Search, 'Google', 'For people searching nearby', 'Google', C.lime],
    [People, 'Small creators', 'Who wear our sizes', 'creators', C.violet],
    [Globe, 'Try-on days in Kochi', 'Touch, try, buy', 'try-on', C.cyan],
  ];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.cyan} />
      <Eyebrow text="Question 3 · How" color={C.violet} />
      <Title at={l0.from} text={<>Reach her <span style={{ color: C.violet }}>where she already is</span></>} />
      <div style={{ position: 'absolute', left: 160, top: 260, width: 1600, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
        {ch.map(([I, t, d, w, c]) => (
          <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', height: 330, padding: 34, textAlign: 'center', borderColor: alpha(c, 0.55) }}>
              <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={c} size={110}><I size={60} color={c} /></IconBadge></div>
              <div className="head" style={{ fontSize: 40, marginTop: 24 }}>{t}</div>
              <div className="muted" style={{ fontSize: 27, marginTop: 8 }}>{d}</div>
            </div>
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── 5 · Launch in three steps
export const Launch: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const st: [string, string, string, IconT][] = [['Get noticed', 'Step one', C.cyan, Bars], ['First order', 'Step two', C.violet, Box], ['Come back', 'Step three', C.lime, Heart]];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Eyebrow text="The launch" color={C.lime} />
      <Title at={l0.from} text={<>Launch <span style={{ color: C.lime }}>small</span>, and learn</>} />
      <Row top={250} gap={20}>
        {st.map(([t, w, c, I], i) => (
          <React.Fragment key={t}>
            <Card icon={I} t={t} d={w} c={c} at={wordAt(l1, w)} w={470} />
            {i < 2 && <Reveal at={wordAt(l1, st[i + 1][1])} dir="left" style={{ position: 'relative', alignSelf: 'center' }}><Arrow size={70} color={C.grey} /></Reveal>}
          </React.Fragment>
        ))}
      </Row>
      <Reveal at={l2.from - 4} style={{ left: 0, top: 640, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 44 }}>Start with <span style={{ color: C.lime }}>6 styles</span>, each in every size</div>
      </Reveal>
      <Row top={740} gap={22}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Pop key={i} at={l2.from + 20 + i * 8} style={{ position: 'relative' }}>
            <div style={{ width: 220, padding: '20px 10px', borderRadius: 20, textAlign: 'center', background: alpha(C.lime, 0.07), border: `2px solid ${alpha(C.lime, 0.5)}` }}>
              <Hanger size={70} color={C.lime} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>{['L', 'XL', '2XL', '3XL'].map((z) => <span key={z} style={{ fontSize: 18, fontWeight: 700, padding: '3px 7px', borderRadius: 8, background: alpha(C.lime, 0.8), color: C.bg }}>{z}</span>)}</div>
            </div>
          </Pop>
        ))}
      </Row>
    </AbsoluteFill>
  );
};

// ─── 6 · Why record data
export const Why: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const tabs: [string, IconT, string, string][] = [['Posts', Phone, C.violet, 'every post'], ['Enquiries', Chat, C.green, 'every enquiry'], ['Orders', Box, C.cyan, 'every order'], ['Products', Hanger, C.lime, 'every product'], ['Suppliers', Globe, C.violet, 'every supplier']];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Eyebrow text="Recording data" />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Title at={l0.from} top={170} text={<>A plan only works if you can<br /><span style={{ color: C.cyan }}>see what’s working</span></>} />
        <Pop at={wordAt(l0, 'last time')} style={{ left: 560, top: 480, width: 800 }}>
          <div className="card" style={{ position: 'relative', padding: '36px 46px', borderColor: alpha(C.violet, 0.6) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><Phone size={50} color={C.violet} /><span className="head" style={{ fontSize: 40 }}>First Instagram campaign</span></div>
            <div style={{ fontSize: 36, marginTop: 24 }}>Result: <span style={{ color: C.green }}>“went well”</span></div>
            <div style={{ fontSize: 36, marginTop: 12, display: 'flex', alignItems: 'center', gap: 14 }}>Numbers: <Question size={48} color={C.violet} /><span className="muted" style={{ fontSize: 28 }}>not written down</span></div>
          </div>
        </Pop>
      </div>
      <Reveal at={l1.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <Title at={l1.from} top={150} text={<>Record <span style={{ color: C.cyan }}>five things</span></>} />
        <Row top={300} gap={24}>
          {tabs.map(([t, I, c, w]) => (
            <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 300, padding: '30px 20px', textAlign: 'center', borderColor: alpha(c, 0.6) }}>
                <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={c} size={100}><I size={56} color={c} /></IconBadge></div>
                <div className="head" style={{ fontSize: 40, marginTop: 20 }}>{t}</div>
              </div>
            </Pop>
          ))}
        </Row>
        <Reveal at={wordAt(l1, 'one shared')} style={{ left: 260, top: 640, width: 1400 }}>
          <div className="card" style={{ position: 'relative', overflow: 'hidden', borderColor: alpha(C.cyan, 0.5) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 30px' }}><Sheet size={46} color={C.cyan} /><span className="head" style={{ fontSize: 36 }}>One shared sheet</span></div>
            <div style={{ display: 'flex', gap: 4, padding: '0 20px', borderTop: `1px solid ${C.line}` }}>
              {tabs.map(([t, , c], i) => <div key={t} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: 28, fontWeight: 600, color: i === 0 ? C.bg : C.text, background: i === 0 ? c : alpha(c, 0.12), borderRadius: '0 0 12px 12px' }}>{t}</div>)}
            </div>
            <div style={{ height: 20 }} />
          </div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 7 · How to record
const Cells: React.FC<{ cols: string[]; c: string; at: number; fill: number }> = ({ cols, c, at, fill }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 18, overflow: 'hidden', border: `1.5px solid ${alpha(c, 0.5)}` }}>
    <div style={{ display: 'flex' }}>{cols.map((h, i) => <Reveal key={h} at={at + i * 8} dir="none" style={{ position: 'relative', flex: 1 }}><div style={{ padding: '18px 10px', textAlign: 'center', fontSize: 26, fontWeight: 700, background: alpha(c, 0.18), borderRight: `1px solid ${C.line}` }}>{h}</div></Reveal>)}</div>
    {[0, 1].map((r) => <div key={r} style={{ display: 'flex' }}>{cols.map((h, i) => <div key={h} style={{ flex: 1, height: 64, borderTop: `1px solid ${C.line}`, borderRight: `1px solid ${C.line}`, background: r === 0 && i < fill ? alpha(c, 0.1) : 'transparent', display: 'grid', placeItems: 'center', color: c, fontSize: 26 }}>{r === 0 && i < fill ? '✎' : ''}</div>)}</div>)}
  </div>
);
export const RecordHow: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const show = (a: number, b?: number) => interpolate(f, [a - 6, a + 8], [0, 1], clamp) * (b === undefined ? 1 : interpolate(f, [b - 10, b], [1, 0], clamp));
  const step = f >= l4.from - 4 ? 4 : f >= l3.from - 4 ? 3 : f >= l2.from - 4 ? 2 : f >= l1.from - 4 ? 1 : 0;
  const fill1 = Math.floor(interpolate(f, [l1.from + 30, l1.from + l1.durationInFrames], [0, 6], clamp));
  const fill2 = Math.floor(interpolate(f, [l2.from + 30, l2.from + l2.durationInFrames], [0, 5], clamp));
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} glow2={C.cyan} />
      <Eyebrow text="Recording data" />
      <Title at={l0.from} text="Recording is simple" />
      <Row top={220} gap={16}>
        {[1, 2, 3, 4].map((n) => <div key={n} className="head" style={{ width: 60, height: 60, borderRadius: 30, display: 'grid', placeItems: 'center', fontSize: 28, color: n <= step ? C.bg : C.grey, background: n === step ? C.green : n < step ? alpha(C.green, 0.4) : 'transparent', border: `2px solid ${alpha(C.green, 0.6)}`, opacity: useLit(l0.from + 10) }}>{n}</div>)}
      </Row>
      <div style={{ position: 'absolute', inset: 0, opacity: show(l1.from, l2.from) }}>
        <div className="head" style={{ position: 'absolute', top: 340, width: 1920, textAlign: 'center', fontSize: 50 }}><Phone size={50} color={C.violet} style={{ verticalAlign: 'middle' }} /> After each post: <span style={{ color: C.violet }}>6 numbers</span> from Instagram</div>
        <div style={{ position: 'absolute', left: 160, top: 470, width: 1600 }}><Cells cols={['Reach', 'Likes', 'Saves', 'Shares', 'Profile visits', 'Link clicks']} c={C.violet} at={l1.from + 10} fill={fill1} /></div>
        <Reveal at={l1.from + 60} style={{ left: 0, top: 720, width: 1920, textAlign: 'center' }}><div className="muted" style={{ fontSize: 30 }}>Found under each post → “View insights”</div></Reveal>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: show(l2.from, l3.from) }}>
        <div className="head" style={{ position: 'absolute', top: 340, width: 1920, textAlign: 'center', fontSize: 50 }}><Chat size={50} color={C.green} style={{ verticalAlign: 'middle' }} /> For every message</div>
        <div style={{ position: 'absolute', left: 160, top: 470, width: 1600 }}><Cells cols={['Date', 'Channel', 'Asked about', 'Her size', 'Ordered?']} c={C.green} at={l2.from + 10} fill={fill2} /></div>
        <Pop at={wordAt(l2, 'No names')} style={{ left: 560, top: 730, width: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '20px 30px', borderRadius: 18, border: `2px solid ${alpha(C.cyan, 0.6)}`, background: alpha(C.cyan, 0.06) }}><Lock size={46} color={C.cyan} /><span className="head" style={{ fontSize: 36 }}>No names, no phone numbers</span></div>
        </Pop>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: show(l3.from, l4.from) }}>
        <div className="head" style={{ position: 'absolute', top: 340, width: 1920, textAlign: 'center', fontSize: 50 }}>A <span style={{ color: C.lime }}>tracking tag</span> on every link</div>
        <Reveal at={l3.from + 10} style={{ left: 160, top: 480, width: 1600 }}>
          <div className="card" style={{ position: 'relative', padding: '34px 40px', borderColor: alpha(C.lime, 0.5), fontFamily: 'monospace', fontSize: 38, textAlign: 'center' }}>
            …/products/co-ord<span style={{ color: C.lime }}><Typed text="?utm_source=instagram&utm_campaign=reel-12" a={l3.from + 20} b={l3.from + 80} /></span>
          </div>
        </Reveal>
        <Reveal at={l3.from + 90} style={{ left: 0, top: 690, width: 1920, textAlign: 'center' }}><div style={{ fontSize: 36 }}>Shopify then shows: <b style={{ color: C.lime }}>this visit came from Reel 12</b></div></Reveal>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: show(l4.from) }}>
        <Pop at={l4.from} style={{ left: 660, top: 350, width: 600 }}>
          <div className="card" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', borderColor: alpha(C.cyan, 0.7), boxShadow: `0 0 60px ${alpha(C.cyan, 0.2)}` }}>
            <div className="head" style={{ background: C.cyan, color: C.bg, fontSize: 40, padding: '18px 0' }}>EVERY MONDAY</div>
            <div className="head" style={{ fontSize: 150, padding: '20px 0 0', lineHeight: 1 }}>30</div>
            <div className="head muted" style={{ fontSize: 40, paddingBottom: 30 }}>minutes</div>
          </div>
        </Pop>
        <Reveal at={l4.from + 30} style={{ left: 0, top: 820, width: 1920, textAlign: 'center' }}><div style={{ fontSize: 36 }}>Update the sheet · look at the week · note one lesson</div></Reveal>
      </div>
    </AbsoluteFill>
  );
};

// ─── 8 · From records to decisions
export const Decide: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const m: [string, string, string, string, IconT][] = [
    ['Save rate', 'saves ÷ reach', 'Is the content useful?', 'save our posts', Heart],
    ['Size check → order', 'orders ÷ size checks', 'Does our help convert?', 'size checks', Chat],
    ['Size exchanges', 'exchanges ÷ orders', 'Does it really fit?', 'different size', Hanger],
  ];
  const cs = [C.violet, C.green, C.lime];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Eyebrow text="Recording → deciding" color={C.violet} />
      <Title at={l0.from} text="Watch three numbers" />
      <Row top={250}>
        {m.map(([t, fml, q, w, I], i) => (
          <Pop key={t} at={wordAt(l0, w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', width: 520, height: 420, padding: 36, textAlign: 'center', borderColor: alpha(cs[i], 0.6) }}>
              <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={cs[i]} size={100}><I size={56} color={cs[i]} /></IconBadge></div>
              <div className="head" style={{ fontSize: 44, marginTop: 22 }}>{t}</div>
              <div style={{ fontSize: 28, marginTop: 12, fontFamily: 'monospace', color: cs[i] }}>{fml}</div>
              <div className="muted" style={{ fontSize: 28, marginTop: 18 }}>{q}</div>
            </div>
          </Pop>
        ))}
      </Row>
      <Pop at={l1.from} style={{ left: 360, top: 740, width: 1200 }}>
        <div className="card" style={{ position: 'relative', padding: '30px 40px', textAlign: 'center', borderColor: alpha(C.lime, 0.8), boxShadow: `0 0 50px ${alpha(C.lime, 0.15)}` }}>
          <div className="head" style={{ fontSize: 46 }}>Rule: <span style={{ color: C.lime }}>don’t judge too early</span></div>
          <div style={{ fontSize: 32, marginTop: 12 }}>Wait about <b>4 weeks</b> and <b>a few hundred visits</b> before deciding</div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// ─── 9 · Close
export const Close: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1] = lines;
  const out = interpolate(f, [l1.from - 8, l1.from + 4], [1, 0], clamp);
  const st: [string, string, IconT, string][] = [['Fix the basics', C.cyan, Doc, 'fix the basics'], ['Launch small', C.violet, Hanger, 'launch small'], ['Measure and decide', C.lime, Check, 'measure']];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Title at={l0.from} text="The next 90 days" />
        <Row top={330}>{st.map(([t, c, I, w]) => <Card key={t} icon={I} t={t} c={c} at={wordAt(l0, w)} />)}</Row>
      </div>
      <Reveal at={l1.from - 2} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 0, top: 200, width: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          {[['Know who you’re for.', 'Know who', C.cyan], ['Reach her where she is.', 'Reach her', C.violet], ['Write it all down.', 'Write it', C.green], ['Then decide.', 'Then decide', C.lime]].map(([t, w, c]) => (
            <Reveal key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}><div className="head" style={{ fontSize: 66, color: c }}>{t}</div></Reveal>
          ))}
        </div>
        <Reveal at={l1.from + l1.durationInFrames - 10} style={{ left: 0, top: 780, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 96, letterSpacing: '-0.02em' }}>Aalayam</div>
          <div style={{ fontSize: 22, letterSpacing: '0.5em', color: C.cyan, marginTop: 10, fontWeight: 500 }}>BY ANAMIKA · EPISODE 8 · GO-TO-MARKET</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
