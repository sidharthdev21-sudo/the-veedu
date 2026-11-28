import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, IconBadge, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Phone, Store, Globe, People, Hanger, Chat, Heart, Rupee, Check, Doc, Question } from '../components/Icons';
import { C, alpha } from '../theme';

// Real numbers from the live store's public catalogue (read 28 Nov 2026). See ../episode-7/docs/research-report.md, section 4A.
const COORDS_FULL = [false, false, false, false, false, false, true, true, false]; // 9 co-ords; 2 listed in all of L–3XL
const PAGES = 13, PAGES_WITH_MEASUREMENTS = 1;

const Title: React.FC<{ text: React.ReactNode; at?: number; top?: number; size?: number }> = ({ text, at = 0, top = 110, size = 76 }) => (
  <Reveal at={at} style={{ left: 0, top, width: 1920, textAlign: 'center' }}><div className="head" style={{ fontSize: size, lineHeight: 1.15 }}>{text}</div></Reveal>
);
const Big: React.FC<{ icon: React.FC<{ size?: number; color?: string }>; t: string; d?: string; c: string; at: number; w?: number }> = ({ icon: I, t, d, c, at, w = 400 }) => (
  <Pop at={at} style={{ position: 'relative' }}>
    <div className="card" style={{ position: 'relative', width: w, padding: '40px 30px', textAlign: 'center', borderColor: alpha(c, 0.6), boxShadow: `0 0 50px ${alpha(c, 0.14)}` }}>
      <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={c} size={130}><I size={74} color={c} /></IconBadge></div>
      <div className="head" style={{ fontSize: 44, marginTop: 28 }}>{t}</div>
      {d && <div className="muted" style={{ fontSize: 28, marginTop: 10 }}>{d}</div>}
    </div>
  </Pop>
);

// ─── 1 · Intro
export const Intro: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <Reveal at={l0.from} style={{ left: 0, top: 120, width: 1920, textAlign: 'center' }}><div className="eyebrow">Aalayam by Anamika · Episode 7</div></Reveal>
      <Title at={wordAt(l0, 'can Aalayam')} top={180} text={<>Can Aalayam work as a<br /><span style={{ color: C.lime }}>real business?</span></>} />
      <div style={{ position: 'absolute', left: 0, top: 520, width: 1920, display: 'flex', justifyContent: 'center', gap: 30 }}>
        <Big icon={Phone} t="Instagram posts" c={C.violet} at={wordAt(l1, 'Instagram')} />
        <Big icon={Store} t="Online store" c={C.cyan} at={wordAt(l1, 'online store')} />
        <Big icon={Globe} t="Supplier trip" c={C.lime} at={wordAt(l1, 'travelled')} />
        <Big icon={People} t="Pop-up event" c={C.green} at={wordAt(l1, 'pop-up')} />
      </div>
    </AbsoluteFill>
  );
};

// ─── 2 · The store today
export const StoreToday: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Title at={l0.from} text="The store today" />
      <Pop at={wordAt(l1, 'Thirteen')} style={{ left: 260, top: 300 }}>
        <div className="head" style={{ fontSize: 280, lineHeight: 1, color: C.cyan }}>13</div>
        <div className="head" style={{ fontSize: 48, marginTop: 6 }}>products live</div>
      </Pop>
      <Reveal at={wordAt(l1, 'Most are')} style={{ left: 900, top: 330, width: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}><IconBadge color={C.lime} size={100}><Hanger size={56} color={C.lime} /></IconBadge><div className="head" style={{ fontSize: 46 }}>Mostly cotton<br />co-ord sets</div></div>
      </Reveal>
      <Reveal at={wordAt(l1, 'priced')} style={{ left: 900, top: 520, width: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}><IconBadge color={C.violet} size={100}><Rupee size={56} color={C.violet} /></IconBadge><div className="head" style={{ fontSize: 54 }}>₹1,000 – ₹1,700</div></div>
      </Reveal>
      <Reveal at={l2.from - 4} style={{ left: 0, top: 790, width: 1920 }}>
        <div className="muted" style={{ textAlign: 'center', fontSize: 30 }}>The brand promise</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20 }}>
          {['Comfortable', 'Sizes L to 3XL', 'Honest price'].map((t, i) => (
            <Pop key={t} at={wordAt(l2, ['comfortable', 'sizes', 'honest'][i])} style={{ position: 'relative' }}>
              <span className="chip" style={{ fontSize: 42, padding: '18px 40px', borderColor: alpha(C.lime, 0.7), color: C.lime }}>{t}</span>
            </Pop>
          ))}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 3 · What's working
export const Working: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2] = lines;
  const strike = interpolate(f, [wordAt(l1, 'No product'), wordAt(l1, 'No product') + 20], [0, 1], clamp);
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} glow2={C.cyan} />
      <Title at={l0.from} text={<><span style={{ color: C.green }}>✓</span> What’s working</>} />
      <Pop at={l1.from - 4} style={{ left: 140, top: 280, width: 790 }}>
        <div className="card" style={{ position: 'relative', height: 640, padding: 50, borderColor: alpha(C.green, 0.6) }}>
          <div className="head" style={{ fontSize: 56, color: C.green }}>Honest prices</div>
          <div style={{ marginTop: 50, textAlign: 'center' }}>
            <div className="muted" style={{ fontSize: 26, marginBottom: 10 }}>Common elsewhere (example)</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span className="head muted" style={{ fontSize: 54 }}>MRP ₹2,999 · 60% off</span>
              <div style={{ position: 'absolute', left: 0, top: '52%', height: 6, width: `${strike * 100}%`, background: C.violet }} />
            </div>
            <div className="muted" style={{ fontSize: 26, marginTop: 30, opacity: strike }}>Aalayam (typical co-ord)</div>
            <div className="head" style={{ fontSize: 120, color: C.text, opacity: strike }}>₹1,200</div>
          </div>
          <div style={{ fontSize: 32, marginTop: 50, textAlign: 'center' }}>No fake “original price” on any product</div>
        </div>
      </Pop>
      <Pop at={l2.from - 4} style={{ left: 990, top: 280, width: 790 }}>
        <div className="card" style={{ position: 'relative', height: 640, padding: 50, borderColor: alpha(C.green, 0.6) }}>
          <div className="head" style={{ fontSize: 56, color: C.green }}>Size help on WhatsApp</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 50 }}>
            <Reveal at={wordAt(l2, 'send')} dir="left" style={{ position: 'relative', alignSelf: 'flex-end' }}>
              <div style={{ padding: '20px 28px', borderRadius: '24px 24px 6px 24px', background: alpha(C.cyan, 0.15), fontSize: 34 }}>Bust 42 · Waist 38 · Hip 46</div>
            </Reveal>
            <Reveal at={wordAt(l2, 'tells them')} dir="right" style={{ position: 'relative', alignSelf: 'flex-start' }}>
              <div style={{ padding: '20px 28px', borderRadius: '24px 24px 24px 6px', background: alpha(C.green, 0.18), fontSize: 34, display: 'flex', alignItems: 'center', gap: 14 }}><Chat size={40} color={C.green} />We suggest XL</div>
            </Reveal>
          </div>
          <div className="muted" style={{ fontSize: 24, marginTop: 60, textAlign: 'center' }}>Example conversation · the offer is on the store’s size guide</div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// ─── 4 · What to fix
export const Fix: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const show = (a: number, b?: number) => interpolate(f, [a - 6, a + 8], [0, 1], clamp) * (b === undefined ? 1 : interpolate(f, [b - 10, b], [1, 0], clamp));
  const step = f >= l3.from - 4 ? 3 : f >= l2.from - 4 ? 2 : f >= l1.from - 4 ? 1 : 0;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} glow2={C.lime} />
      <Title at={l0.from} text={<><span style={{ color: C.violet }}>!</span> What to fix</>} />
      <div style={{ position: 'absolute', left: 0, top: 230, width: 1920, display: 'flex', justifyContent: 'center', gap: 16 }}>
        {[1, 2, 3].map((n) => <div key={n} className="head" style={{ width: 64, height: 64, borderRadius: 32, display: 'grid', placeItems: 'center', fontSize: 30, color: n <= step ? C.bg : C.grey, background: n === step ? C.violet : n < step ? alpha(C.violet, 0.4) : 'transparent', border: `2px solid ${alpha(C.violet, 0.6)}`, opacity: useLit(l0.from + 10) }}>{n}</div>)}
      </div>
      {/* 1 · sizes */}
      <div style={{ position: 'absolute', inset: 0, opacity: show(l1.from, l2.from) }}>
        <div className="head" style={{ position: 'absolute', top: 340, width: 1920, textAlign: 'center', fontSize: 56 }}>Not every style comes in every size</div>
        <div style={{ position: 'absolute', top: 470, width: 1920, display: 'flex', justifyContent: 'center', gap: 22 }}>
          {COORDS_FULL.map((full, i) => (
            <Pop key={i} at={l1.from + 10 + i * 6} style={{ position: 'relative' }}>
              <div style={{ width: 150, height: 190, borderRadius: 22, display: 'grid', placeItems: 'center', background: full ? alpha(C.green, 0.15) : alpha(C.text, 0.04), border: `2px solid ${full ? C.green : C.line}` }}>
                <Hanger size={90} color={full && f > wordAt(l1, 'only two') ? C.green : C.grey} />
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(l1, 'only two')} style={{ left: 0, top: 720, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 64 }}><span style={{ color: C.green }}>2 of 9</span> co-ord sets come in all of L, XL, 2XL and 3XL</div>
        </Reveal>
      </div>
      {/* 2 · product pages */}
      <div style={{ position: 'absolute', inset: 0, opacity: show(l2.from, l3.from) }}>
        <div className="head" style={{ position: 'absolute', top: 340, width: 1920, textAlign: 'center', fontSize: 56 }}>Shoppers can’t see the garment’s measurements</div>
        <div style={{ position: 'absolute', top: 470, width: 1920, display: 'flex', justifyContent: 'center', gap: 14 }}>
          {Array.from({ length: PAGES }).map((_, i) => (
            <Pop key={i} at={l2.from + 10 + i * 4} style={{ position: 'relative' }}>
              <div style={{ width: 104, height: 150, borderRadius: 14, display: 'grid', placeItems: 'center', background: i < PAGES_WITH_MEASUREMENTS ? alpha(C.green, 0.15) : alpha(C.text, 0.04), border: `2px solid ${i < PAGES_WITH_MEASUREMENTS ? C.green : C.line}` }}>
                <Doc size={60} color={i < PAGES_WITH_MEASUREMENTS ? C.green : C.grey} />
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(l2, 'Only one')} style={{ left: 0, top: 690, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 64 }}>Only <span style={{ color: C.green }}>1 of 13</span> product pages shows them</div>
          <div className="muted" style={{ fontSize: 34, marginTop: 16 }}>And fit is what shoppers worry about most</div>
        </Reveal>
      </div>
      {/* 3 · results not recorded */}
      <div style={{ position: 'absolute', inset: 0, opacity: show(l3.from) }}>
        <div className="head" style={{ position: 'absolute', top: 340, width: 1920, textAlign: 'center', fontSize: 56 }}>Results weren’t written down</div>
        <Pop at={wordAt(l3, 'campaign')} style={{ left: 560, top: 460, width: 800 }}>
          <div className="card" style={{ position: 'relative', padding: '40px 50px', borderColor: alpha(C.violet, 0.6) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><Phone size={54} color={C.violet} /><span className="head" style={{ fontSize: 42 }}>First Instagram campaign</span></div>
            <div style={{ fontSize: 38, marginTop: 30 }}>Result: <span style={{ color: C.green }}>“went well”</span></div>
            <div style={{ fontSize: 38, marginTop: 16, display: 'flex', alignItems: 'center', gap: 14 }}>Numbers: <Question size={52} color={C.violet} /><span className="muted" style={{ fontSize: 30 }}>not recorded</span></div>
          </div>
        </Pop>
        <Reveal at={wordAt(l3, 'Without numbers')} style={{ left: 0, top: 860, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 46 }}>Without numbers, you can’t tell <span style={{ color: C.lime }}>what really worked</span></div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};

// ─── 5 · A simple rule
export const Rule: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const qs = [[Heart, 'Do customers want it?', 'customers want', C.violet], [Hanger, 'Can a supplier make it in L to 3XL?', 'supplier', C.cyan], [Rupee, 'Is there money left after costs?', 'money left', C.lime]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.violet} />
      <Title at={l0.from} text="Before adding a new product, ask:" size={68} />
      <div style={{ position: 'absolute', left: 0, top: 260, width: 1920, display: 'flex', justifyContent: 'center', gap: 30 }}>
        {qs.map(([I, t, w, c], i) => (
          <Pop key={t} at={wordAt(l1, w)} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', width: 530, height: 360, padding: 40, textAlign: 'center', borderColor: alpha(c, 0.6) }}>
              <div style={{ display: 'grid', placeItems: 'center' }}><IconBadge color={c} size={120}><I size={66} color={c} /></IconBadge></div>
              <div className="head" style={{ fontSize: 42, marginTop: 30, lineHeight: 1.2 }}><span style={{ color: c }}>{i + 1}.</span> {t}</div>
            </div>
          </Pop>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 0, top: 690, width: 1920, display: 'flex', justifyContent: 'center', gap: 30 }}>
        <Pop at={wordAt(l2, 'Three yeses')} style={{ position: 'relative' }}>
          <div className="card" style={{ position: 'relative', width: 805, padding: '36px 44px', borderColor: alpha(C.green, 0.8), boxShadow: `0 0 50px ${alpha(C.green, 0.18)}` }}>
            <div className="head" style={{ fontSize: 40, color: C.green }}>3 × YES</div>
            <div className="head" style={{ fontSize: 46, marginTop: 8 }}>→ Order a small batch and test it</div>
          </div>
        </Pop>
        <Pop at={wordAt(l2, 'Any no')} style={{ position: 'relative' }}>
          <div className="card" style={{ position: 'relative', width: 805, padding: '36px 44px', borderColor: alpha(C.violet, 0.8) }}>
            <div className="head" style={{ fontSize: 40, color: C.violet }}>Any NO</div>
            <div className="head" style={{ fontSize: 46, marginTop: 8 }}>→ Fix it first, or skip it</div>
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

// ─── 6 · Next 90 days + close
export const Next: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const out = interpolate(f, [l4.from - 8, l4.from + 4], [1, 0], clamp);
  const steps = [
    ['Write it down', ['Every post', 'Every enquiry', 'Every supplier', 'Measurements on every product'], C.cyan, l1.from - 4, Doc],
    ['Test', ['Talk to customers', 'Get supplier samples', 'Try new posts'], C.violet, l2.from - 4, People],
    ['Decide', ['Launch a small batch', 'Change the plan', 'Or stop'], C.lime, l3.from - 4, Check],
  ] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Title at={l0.from} text="The next 90 days" />
        <div style={{ position: 'absolute', left: 0, top: 270, width: 1920, display: 'flex', justifyContent: 'center', gap: 30 }}>
          {steps.map(([t, items, c, at, I], i) => (
            <Pop key={t} at={at} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', width: 530, height: 640, padding: 42, borderColor: alpha(c, 0.6) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><IconBadge color={c} size={90}><I size={50} color={c} /></IconBadge><div><div className="eyebrow" style={{ color: c, fontSize: 20 }}>Step {i + 1}</div><div className="head" style={{ fontSize: 46 }}>{t}</div></div></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 44 }}>
                  {items.map((x) => <div key={x} style={{ display: 'flex', gap: 16, fontSize: 34, lineHeight: 1.25 }}><Check size={38} color={c} style={{ flex: 'none' }} />{x}</div>)}
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </div>
      <Reveal at={l4.from - 2} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', left: 160, top: 220, width: 1600, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 62, lineHeight: 1.2 }}>From <span style={{ color: C.grey }}>understanding the market</span><br />to <span style={{ color: C.cyan }}>testing the business</span>.</div>
          <Reveal at={wordAt(l4, 'Next')} style={{ position: 'relative', marginTop: 34 }}>
            <div className="head" style={{ fontSize: 50 }}>Next: a business that works, <span style={{ color: C.lime }}>again and again</span>.</div>
          </Reveal>
        </div>
        <Reveal at={wordAt(l4, 'again and again')} style={{ left: 0, top: 720, width: 1920, textAlign: 'center' }}>
          <div className="head" style={{ fontSize: 110, letterSpacing: '-0.02em' }}>Aalayam</div>
          <div style={{ fontSize: 24, letterSpacing: '0.5em', color: C.cyan, marginTop: 12, fontWeight: 500 }}>BY ANAMIKA · EPISODE 7 · THE SHORT VERSION</div>
        </Reveal>
      </Reveal>
    </AbsoluteFill>
  );
};
