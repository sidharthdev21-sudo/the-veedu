import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FactorScene } from '../components/FactorScene';
import { Line, wordAt } from '../components/ui';
import { Pop, clamp } from '../components/anim';
import { Arrow, Bars, Building, Doc, Hanger, Heart, House, Leaf, Lock, NoBag, Phone, Box, Spool, Store, Tag } from '../components/Icons';
import { C, alpha } from '../theme';

type P = { lines: Line[] };
const grow = (f: number, a: number, d = 24) => interpolate(f, [a, a + d], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
const Row: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 22, ...style }}>{children}</div>
);

// ─── The findings, in one place, so the video and the findings poster stay identical.
export const DIMENSIONS = {
  political: {
    investigated: ['Textile policy', 'Make in India', 'GST', 'Import & export rules'],
    points: ['Active support for Indian textile manufacturing', "GST on clothing depends on the item's price"],
    matters: 'Shapes where Aalayam sources fabric and how it prices each collection.',
    recommendation: 'Understand tax and textile policy before pricing and choosing suppliers',
  },
  economic: {
    investigated: ['Inflation', 'Disposable income', 'Purchasing power', 'Fabric costs', 'Competition'],
    points: ['Shoppers are price-conscious', 'Fabric costs can change quickly', 'Strong online competition'],
    matters: 'Pricing must be clear, fair and carefully planned.',
    recommendation: 'Try affordable collections and outfit bundles',
  },
  social: {
    investigated: ['Fashion preferences', 'Comfort-led clothing', 'Lifestyle changes', 'Social media', 'Online shopping'],
    points: ['Comfort comes first, workdays to weekends', 'Social media drives style discovery'],
    matters: 'Fits a brand built on comfortable everyday fashion.',
    recommendation: 'Make comfortable everyday fashion the heart of the brand',
  },
  technological: {
    investigated: ['E-commerce platforms', 'AI recommendations', 'Digital marketing', 'Social commerce', 'Customer analytics'],
    points: ['Small brands can sell India-wide by phone', 'Data shows what customers like'],
    matters: 'A real chance for Aalayam to grow online.',
    recommendation: 'Explore AI-assisted marketing and personalised recommendations',
  },
  environmental: {
    investigated: ['Sustainable fabrics', 'Textile waste', 'Packaging', 'Sustainability awareness'],
    points: ['Shoppers care how clothes are made', 'Many single-use plastics are banned'],
    matters: 'Responsible choices build trust.',
    recommendation: 'Consider sustainable packaging and responsible sourcing',
  },
  legal: {
    investigated: ['Consumer protection', 'E-commerce rules', 'Product labelling', 'GST compliance', 'Data privacy'],
    points: ['Clear prices and return policies online', 'Proper labels, GST filed correctly', 'Customer data must be protected'],
    matters: 'Keeps the business safe and trusted.',
    recommendation: 'Make listings, prices, labels and online processes follow the rules',
  },
} as const;

export const Political: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame(), l1 = lines[1], D = DIMENSIONS.political;
  const g = grow(f, wordAt(l1, 'GST'));
  return (
    <FactorScene factor="political" lines={lines} investigated={[...D.investigated]} matters={D.matters} discovered={{
      points: [...D.points], visual: (
        <div>
          <Row>
            <Pop at={l1.from + 4} style={{ position: 'relative' }}><Building size={90} color={C.cyan} /></Pop>
            <Pop at={wordAt(l1, 'supports')} style={{ position: 'relative' }}><Arrow size={60} color={C.grey} /></Pop>
            <Pop at={wordAt(l1, 'textile')} style={{ position: 'relative' }}><Spool size={90} color={C.lime} /></Pop>
          </Row>
          <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[[220, 0.35], [380, 1]].map(([w, k], i) => (
              <Row key={i} style={{ gap: 0 }}>
                <div style={{ width: w as number, height: 40, borderRadius: '10px 0 0 10px', background: alpha(C.text, 0.16) }} />
                <div style={{ width: 20 + 70 * (k as number) * g, height: 40, borderRadius: '0 10px 10px 0', background: C.cyan, boxShadow: `0 0 14px ${alpha(C.cyan, 0.5)}` }} />
                <span className="muted" style={{ marginLeft: 16, fontSize: 22 }}>{i ? 'higher price' : 'lower price'}</span>
              </Row>
            ))}
            <div className="muted" style={{ fontSize: 20 }}><span style={{ color: C.cyan }}>■</span> GST share</div>
          </div>
        </div>
      ) }} />
  );
};

export const Economic: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame(), l1 = lines[1], D = DIMENSIONS.economic;
  const p = grow(f, wordAt(l1, 'fabric'), 30);
  const pts = [[0, 150], [80, 130], [160, 138], [240, 100], [320, 80], [400, 40]];
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ');
  return (
    <FactorScene factor="economic" lines={lines} investigated={[...D.investigated]} matters={D.matters} discovered={{
      points: [...D.points], visual: (
        <div>
          <svg width={460} height={170} style={{ overflow: 'visible' }}>
            <path d="M0 170 H440" stroke={C.line} strokeWidth={2} />
            <path d={d} pathLength={1} fill="none" stroke={C.violet} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${p} 1`} style={{ filter: `drop-shadow(0 0 8px ${C.violet})` }} />
            <text x={410} y={30} fill={C.grey} fontSize={20} fontFamily="Inter">fabric cost</text>
          </svg>
          <Row style={{ marginTop: 22, gap: 18 }}>
            {[0, 1, 2, 3, 4].map((i) => <Pop key={i} at={wordAt(l1, 'competition') + i * 4} style={{ position: 'relative' }}><Store size={64} color={i === 2 ? C.violet : C.grey} /></Pop>)}
          </Row>
        </div>
      ) }} />
  );
};

export const Social: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame(), l1 = lines[1], D = DIMENSIONS.social;
  const sm = wordAt(l1, 'social media');
  return (
    <FactorScene factor="social" lines={lines} investigated={[...D.investigated]} matters={D.matters} discovered={{
      points: [...D.points], visual: (
        <Row style={{ gap: 50 }}>
          <Pop at={wordAt(l1, 'Comfort')} style={{ position: 'relative', textAlign: 'center' }}>
            <Hanger size={130} color={C.lime} />
            <div className="muted" style={{ fontSize: 22, marginTop: 8 }}>workday → weekend</div>
          </Pop>
          <Pop at={sm} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: 150, height: 240 }}>
              <Phone size={240} color={C.text} style={{ position: 'absolute', left: -45, top: 0 }} />
              {[0, 1, 2, 3].map((i) => {
                const q = interpolate(f, [sm + 8 + i * 8, sm + 50 + i * 8], [0, 1], clamp);
                return <div key={i} style={{ position: 'absolute', left: 40 + (i % 2) * 40, top: 150 - q * 160, opacity: q > 0 && q < 1 ? 1 - q : 0 }}><Heart size={40} color={C.lime} /></div>;
              })}
            </div>
          </Pop>
        </Row>
      ) }} />
  );
};

export const Technological: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame(), l1 = lines[1], D = DIMENSIONS.technological;
  const reach = wordAt(l1, 'reach'), data = wordAt(l1, 'data');
  return (
    <FactorScene factor="technological" lines={lines} investigated={[...D.investigated]} matters={D.matters} discovered={{
      points: [...D.points], visual: (
        <div style={{ position: 'relative', width: 540, height: 260 }}>
          <Pop at={l1.from + 2} style={{ left: 0, top: 30 }}><Phone size={170} color={C.cyan} /></Pop>
          {[[230, 20], [320, 110], [230, 190]].map(([x, y], i) => {
            const q = grow(f, reach + i * 6, 20);
            return (
              <React.Fragment key={i}>
                <Pop at={reach + i * 4} style={{ left: x, top: y }}><House size={60} color={C.grey} /></Pop>
                {q > 0 && q < 1 && <div style={{ position: 'absolute', left: 110 + (x - 110) * q, top: 100 + (y - 100) * q - Math.sin(q * Math.PI) * 40 }}><Box size={36} color={C.cyan} /></div>}
              </React.Fragment>
            );
          })}
          <Pop at={data} style={{ left: 420, top: 70 }}><Bars size={110} color={C.lime} /></Pop>
        </div>
      ) }} />
  );
};

export const Environmental: React.FC<P> = ({ lines }) => {
  const l1 = lines[1], D = DIMENSIONS.environmental;
  return (
    <FactorScene factor="environmental" lines={lines} investigated={[...D.investigated]} matters={D.matters} discovered={{
      points: [...D.points], visual: (
        <Row style={{ gap: 60, marginTop: 20 }}>
          <Pop at={wordAt(l1, 'care')} style={{ position: 'relative', textAlign: 'center' }}><Leaf size={140} color={C.green} /><div className="muted" style={{ fontSize: 22, marginTop: 8 }}>how it's made</div></Pop>
          <Pop at={wordAt(l1, 'banned')} style={{ position: 'relative', textAlign: 'center' }}><NoBag size={140} color={C.violet} /><div className="muted" style={{ fontSize: 22, marginTop: 8 }}>single-use plastic</div></Pop>
        </Row>
      ) }} />
  );
};

export const Legal: React.FC<P> = ({ lines }) => {
  const l1 = lines[1], D = DIMENSIONS.legal;
  return (
    <FactorScene factor="legal" lines={lines} investigated={[...D.investigated]} matters={D.matters} discovered={{
      points: [...D.points], visual: (
        <Row style={{ gap: 30, alignItems: 'flex-start' }}>
          <Pop at={wordAt(l1, 'clear prices')} style={{ position: 'relative' }}>
            <div style={{ width: 260, padding: 18, borderRadius: 18, border: `1px solid ${C.line}`, background: alpha(C.text, 0.03) }}>
              <div style={{ height: 90, borderRadius: 12, background: alpha(C.violet, 0.12), display: 'grid', placeItems: 'center' }}><Hanger size={64} color={C.violet} /></div>
              <div style={{ fontSize: 20, marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}><Tag size={26} color={C.violet} />Price incl. taxes</div>
              <div style={{ fontSize: 20, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}><Doc size={26} color={C.violet} />Returns policy</div>
            </div>
          </Pop>
          <Pop at={wordAt(l1, 'label')} style={{ position: 'relative', marginTop: 20 }}><Tag size={90} color={C.lime} /></Pop>
          <Pop at={wordAt(l1, 'protect')} style={{ position: 'relative', marginTop: 20 }}><Lock size={90} color={C.green} /></Pop>
        </Row>
      ) }} />
  );
};
