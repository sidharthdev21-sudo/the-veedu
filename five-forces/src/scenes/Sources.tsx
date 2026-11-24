import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Backdrop, Line } from '../components/SceneShell';
import { Pop, Reveal } from '../components/anim';
import { Bag, Camera, Clipboard, Eye, Fabric, Laptop, SearchGlass, Speech, TrendLine, Doc } from '../components/Icons';
import { wordAt } from '../components/Garments';
import { Browser, SeriesTag, Status, StatusBadge } from '../components/Series';
import { C } from '../theme';

/**
 * Where the data came from. Status reflects what the team confirmed:
 * secondary sources used, primary research conducted, IndiaMART suggested (not used).
 */
export const SECONDARY: { name: string; got: string[]; Icon: React.FC<{ size?: number }>; status: Status; line: number; word: string }[] = [
  { name: 'Google Search', got: ['Industry information', 'Market reports', 'Competitor research', 'Trends'], Icon: SearchGlass, status: 'used', line: 1, word: 'Google Search' },
  { name: 'Myntra & AJIO', got: ['Product categories', 'Pricing', 'Customer reviews', 'Positioning'], Icon: Bag, status: 'used', line: 1, word: 'Myntra' },
  { name: 'Amazon India', got: ['Alternatives', 'Feedback', 'Price comparisons', 'Ratings'], Icon: Bag, status: 'used', line: 1, word: 'Amazon' },
  { name: 'Instagram', got: ['Independent brands', 'Marketing', 'Engagement'], Icon: Camera, status: 'used', line: 2, word: 'Instagram' },
  { name: 'Google Trends', got: ['Category interest', 'Interest over time', 'Emerging searches'], Icon: TrendLine, status: 'used', line: 2, word: 'Google Trends' },
  { name: 'Shopify & marketplaces', got: ['Launching online', 'E-commerce tools', 'Entry requirements'], Icon: Laptop, status: 'used', line: 2, word: 'Shopify' },
];
export const PRIMARY: { name: string; Icon: React.FC<{ size?: number }>; word: string; status: Status }[] = [
  { name: 'Customer interviews', Icon: Speech, word: 'customer interviews', status: 'conducted' },
  { name: 'Customer surveys', Icon: Clipboard, word: 'surveys', status: 'conducted' },
  { name: 'Supplier quotes & discussions', Icon: Doc, word: 'supplier', status: 'conducted' },
  { name: 'Competitor product observation', Icon: Eye, word: 'close look', status: 'conducted' },
];
export const SUGGESTED = { name: 'IndiaMART', got: ['Fabric suppliers', 'Garment manufacturers', 'Sourcing alternatives'], Icon: Fabric, status: 'suggested' as Status };

export const SourceCard: React.FC<{ s: (typeof SECONDARY)[number] | typeof SUGGESTED; w?: number }> = ({ s, w = 520 }) => (
  <div style={{ width: w, padding: 26, borderRadius: 24, background: s.status === 'suggested' ? 'transparent' : C.white, border: s.status === 'suggested' ? `3px dashed ${C.rose}` : `2px solid ${C.sand}`, boxShadow: s.status === 'suggested' ? 'none' : '0 10px 24px rgba(74,51,38,.08)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <s.Icon size={58} />
      <div style={{ flex: 1, fontSize: 32, fontWeight: 600 }}>{s.name}</div>
      <StatusBadge s={s.status} />
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
      {s.got.map((g) => <span key={g} style={{ fontSize: 22, padding: '6px 14px', borderRadius: 999, background: C.sand }}>{g}</span>)}
    </div>
  </div>
);

export const Sources: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, , , l3, l4] = lines;
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <div style={{ position: 'absolute', left: 110, top: 50 }}>
        <div className="eyebrow">Our data</div>
        <div className="serif" style={{ fontSize: 68 }}>Where did we collect our data?</div>
      </div>
      {/* secondary research, in a browser */}
      <Reveal at={l0.from} out={l3.from - 6} dir="up" style={{ left: 0, top: 0 }}>
        <Browser x={110} y={200} w={1700} h={800} url="secondary research · what we collected from each source">
          {SECONDARY.map((s, i) => (
            <Pop key={s.name} at={wordAt(lines[s.line], s.word)} style={{ left: 36 + (i % 3) * 552, top: 40 + Math.floor(i / 3) * 330 }}>
              <SourceCard s={s} />
            </Pop>
          ))}
        </Browser>
      </Reveal>
      {/* primary research, then the suggested extra source */}
      <Reveal at={l3.from} dir="up" style={{ left: 110, top: 220, width: 1700 }}>
        <div className="eyebrow">Primary research · checked against the online findings</div>
        <div style={{ display: 'flex', gap: 26, marginTop: 30 }}>
          {PRIMARY.map((p) => (
            <Pop key={p.name} at={wordAt(l3, p.word)} style={{ position: 'relative' }}>
              <div style={{ width: 400, height: 330, borderRadius: 28, background: C.white, boxShadow: '0 12px 28px rgba(74,51,38,.1)', padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p.Icon size={110} />
                <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2 }}>{p.name}</div>
                <div><StatusBadge s={p.status} /></div>
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
      <Pop at={wordAt(l4, 'IndiaMART')} style={{ left: 110, top: 690 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <SourceCard s={SUGGESTED} w={760} />
          <div className="label" style={{ width: 640 }}>Not used in this research: suggested for comparing fabric suppliers and manufacturers more widely.</div>
        </div>
      </Pop>
      <SeriesTag />
    </AbsoluteFill>
  );
};
