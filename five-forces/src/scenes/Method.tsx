import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Chip, Line } from '../components/SceneShell';
import { Pop, Reveal, clamp } from '../components/anim';
import { Check, Clipboard, Doc, Eye, Fabric, Gauge, Laptop, People, SearchGlass, Speech, Store, Tag, Bulb, Star } from '../components/Icons';
import { Rack, wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { FORCES, SeriesTag } from '../components/Series';
import { C } from '../theme';

/** The five research steps (shared with the stand-alone methodology still). */
export const STEPS = [
  { title: 'Business understanding', points: ["Aalayam's products, audience and business model", "Its place in Indian women's fashion"] },
  { title: 'Research questions', points: ['Questions for each of the five forces', 'What information is needed'] },
  { title: 'Data collection', points: ['Secondary: online platforms and industry sources', 'Primary: interviews, surveys, supplier talks'] },
  { title: 'Data organisation', points: ['Sorted under the five forces', 'Competitors, prices, products, feedback compared'] },
  { title: 'Analysis', points: ['Competitive pressures', 'Opportunities and threats', 'Recommendations'] },
];

export const Method: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, ...L] = lines;                                // L[0..4] = the five steps
  const starts = L.map((l) => l.from - 4);
  const cur = starts.filter((s) => f >= s).length - 1;
  const X = (i: number) => 150 + i * 350;
  const panel = (i: number) => ({ at: starts[i] + 8, out: i < 4 ? starts[i + 1] - 4 : undefined });
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <div style={{ position: 'absolute', left: 110, top: 64 }}>
        <div className="eyebrow">Step by step</div>
        <div className="serif" style={{ fontSize: 68 }}>How we approached the research</div>
      </div>
      {/* the five-node path */}
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        {[0, 1, 2, 3].map((i) => {
          const p = interpolate(f, [starts[i + 1] - 14, starts[i + 1]], [0, 1], clamp);
          return <path key={i} d={`M${X(i) + 150} 300 H${X(i) + 150 + 220 * p}`} stroke={C.rose} strokeWidth={6} strokeLinecap="round" strokeDasharray="2 14" />;
        })}
      </svg>
      {STEPS.map((s, i) => {
        const on = i === cur, done = i < cur;
        return (
          <Pop key={i} at={l0.from + 4 + i * 5} style={{ left: X(i) + 60, top: 230 }}>
            <div style={{ width: 180, textAlign: 'center' }}>
              <div className="serif" style={{ width: 140, height: 140, margin: '0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 64, background: on ? C.rose : done ? C.white : C.sand, color: on ? C.white : C.brown, boxShadow: on ? '0 14px 30px rgba(173,108,112,.35)' : '0 6px 14px rgba(74,51,38,.08)', transform: `scale(${on ? 1.06 : 1})` }}>
                {done ? <Check size={84} /> : i + 1}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, marginTop: 16, lineHeight: 1.2, color: on ? C.brown : C.brownSoft }}>{s.title}</div>
            </div>
          </Pop>
        );
      })}
      <div className="card" style={{ left: 110, top: 520, width: 1700, height: 470, opacity: interpolate(f, [starts[0] - 6, starts[0] + 8], [0, 1], clamp) }} />
      {/* 1 · business understanding */}
      <Reveal at={panel(0).at} out={panel(0).out} style={{ left: 110, top: 520, width: 1700, height: 470 }}>
        <Rack x={60} y={70} scale={0.6} />
        <Woman x={540} y={440} size={360} pose="wave" />
        <div style={{ position: 'absolute', left: 760, top: 70, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Pop at={wordAt(L[0], 'products')} style={{ position: 'relative' }}><Chip icon={<Tag size={44} />}>Products</Chip></Pop>
          <Pop at={wordAt(L[0], 'customers')} style={{ position: 'relative' }}><Chip icon={<People size={44} />}>Target audience</Chip></Pop>
          <Pop at={wordAt(L[0], 'customers') + 10} style={{ position: 'relative' }}><Chip icon={<Doc size={44} />}>Business model</Chip></Pop>
          <Pop at={wordAt(L[0], 'place')} style={{ position: 'relative' }}><Chip tone="rose">Place in Indian women's fashion</Chip></Pop>
        </div>
      </Reveal>
      {/* 2 · research questions */}
      <Reveal at={panel(1).at} out={panel(1).out} style={{ left: 110, top: 520, width: 1700, height: 470 }}>
        <div style={{ position: 'absolute', left: 80, top: 60, display: 'flex', gap: 26 }}>
          {FORCES.map((F, i) => (
            <Pop key={F.id} at={wordAt(L[1], 'each force') + i * 5} style={{ position: 'relative' }}>
              <div style={{ width: 280, height: 130, borderRadius: 24, background: C.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}><F.Icon size={56} /><span style={{ fontSize: 26, fontWeight: 600 }}>{F.short}</span></div>
            </Pop>
          ))}
        </div>
        <Reveal at={wordAt(L[1], 'like')} style={{ left: 80, top: 250 }}>
          <div className="chip" style={{ fontSize: 40, padding: '26px 40px', background: C.white, border: `3px solid ${C.roseLight}` }}>
            <span className="serif" style={{ fontSize: 60, color: C.rose }}>?</span>
            {(() => { const t = 'How easily can a shopper find a similar outfit somewhere else?'; const n = Math.round(interpolate(f, [wordAt(L[1], 'how easily'), wordAt(L[1], 'else') + 10], [0, t.length], clamp)); return t.slice(0, n); })()}
          </div>
        </Reveal>
      </Reveal>
      {/* 3 · data collection: online and in person */}
      <Reveal at={panel(2).at} out={panel(2).out} style={{ left: 110, top: 520, width: 1700, height: 470 }}>
        {[['online', 'Online · secondary research', 80], ['in person', 'In person · primary research', 880]].map(([w, t, x], k) => (
          <Pop key={w as string} at={wordAt(L[2], w as string)} style={{ left: x as number, top: 50 }}>
            <div style={{ width: 740, height: 370, borderRadius: 28, background: C.sand, padding: 34 }}>
              <div className="eyebrow">{t}</div>
              <div style={{ display: 'flex', gap: 28, marginTop: 40, alignItems: 'center' }}>
                {(k === 0 ? [Laptop, SearchGlass, Store] : [Speech, Clipboard, Fabric]).map((I, j) => (
                  <Pop key={j} at={wordAt(L[2], w as string) + 6 + j * 6} style={{ position: 'relative' }}><div style={{ background: C.white, borderRadius: 24, padding: 22 }}><I size={130} /></div></Pop>
                ))}
              </div>
            </div>
          </Pop>
        ))}
      </Reveal>
      {/* 4 · organise under the five forces */}
      <Reveal at={panel(3).at} out={panel(3).out} style={{ left: 110, top: 520, width: 1700, height: 470 }}>
        {FORCES.map((F, i) => (
          <div key={F.id} style={{ position: 'absolute', left: 60 + i * 325, top: 40, width: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 600 }}><F.Icon size={46} />{F.short}</div>
            {[0, 1, 2].map((k) => {
              const at = L[3].from + 6 + i * 5 + k * 9, p = interpolate(f, [at, at + 12], [0, 1], clamp);
              return <div key={k} style={{ height: 50, marginTop: 14, borderRadius: 14, background: k === 0 ? C.roseLight : C.sand, opacity: p, transform: `translateY(${(1 - p) * -60}px)` }} />;
            })}
          </div>
        ))}
        <div style={{ position: 'absolute', left: 60, top: 330, display: 'flex', gap: 18 }}>
          {['Competitors', 'Prices', 'Product types', 'Customer feedback'].map((t, i) => (
            <Pop key={t} at={wordAt(L[3], 'comparing') + i * 6} style={{ position: 'relative' }}><Chip size={30}>{t}</Chip></Pop>
          ))}
        </div>
      </Reveal>
      {/* 5 · analysis: pressure gauges (illustrative, no values) → recommendations */}
      <Reveal at={panel(4).at} style={{ left: 110, top: 520, width: 1700, height: 470 }}>
        {FORCES.map((F, i) => {
          const v = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(f / 9 + i * 1.7)) * interpolate(f, [L[4].from, L[4].from + 30], [0, 1], clamp);
          return (
            <div key={F.id} style={{ position: 'absolute', left: 60 + i * 230, top: 50, width: 200, textAlign: 'center' }}>
              <Gauge size={150} value={v} />
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>{F.short}</div>
            </div>
          );
        })}
        <div className="label" style={{ position: 'absolute', left: 60, top: 280, fontSize: 22 }}>Illustration of the process: no measured values</div>
        <Pop at={wordAt(L[4], 'recommendations')} style={{ left: 1240, top: 70 }}>
          <div style={{ width: 380, padding: 36, borderRadius: 28, background: C.rose, color: C.white }}>
            <Bulb size={80} fill={C.white} />
            <div className="serif" style={{ fontSize: 40, marginTop: 14 }}>Recommendations</div>
          </div>
        </Pop>
      </Reveal>
      <SeriesTag />
    </AbsoluteFill>
  );
};
