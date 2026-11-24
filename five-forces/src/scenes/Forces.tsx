import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { Line, Chip } from '../components/SceneShell';
import { Pop, clamp, useFloat } from '../components/anim';
import { Doc, Fabric, Heart, Laptop, Sewing, Star, Store, Tag, Cart, Bag } from '../components/Icons';
import { CoordHanger, SareeFold, wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { ForceData, ForceScene } from '../components/ForceScene';
import { C } from '../theme';

type P = { lines: Line[] };

/**
 * All five forces' content. Observations are general and structural (no rankings, shares, prices or statistics);
 * replace `observed` with the team's own verified findings when they are available.
 */
export const DATA: Record<string, ForceData> = {
  rivalry: {
    meaning: 'How intense the competition is',
    investigated: ['Competing brands', 'Pricing', 'Product categories', 'Brand differentiation', 'Reviews and ratings'],
    sources: [{ name: 'Myntra & AJIO', status: 'used' }, { name: 'Amazon India', status: 'used' }, { name: 'Instagram', status: 'used' }, { name: 'Competitor products', status: 'conducted' }],
    observed: 'Shoppers see many similar outfits side by side.',
    matters: 'Standing out is harder, and price alone is easy to copy.',
    actions: ['Recognisable brand identity', 'Comfort and design', 'Better customer experience', "Don't compete on price alone"],
  },
  entrants: {
    meaning: 'How easily new brands can start',
    investigated: ['Launching online', 'E-commerce platforms', 'Startup infrastructure', 'Digital marketing', 'Marketplace selling'],
    sources: [{ name: 'Shopify & marketplaces', status: 'used' }, { name: 'Instagram', status: 'used' }],
    observed: 'Starting an online clothing store is relatively easy.',
    matters: 'New competitors can appear quickly.',
    actions: ['Brand recognition', 'Customer loyalty', 'Consistent product identity', 'Go beyond basic products'],
  },
  suppliers: {
    meaning: 'How much control suppliers have',
    investigated: ['Fabric suppliers', 'Alternative manufacturers', 'Fabric costs', 'Minimum order quantities', 'Reliability and delivery'],
    sources: [{ name: 'Supplier quotes', status: 'conducted' }, { name: 'Supplier discussions', status: 'conducted' }, { name: 'IndiaMART', status: 'suggested' }],
    observed: 'Relying on a single supplier is a risk.',
    matters: 'Costs, quality and delivery depend on suppliers.',
    actions: ['More than one supplier', 'Compare sourcing costs', 'Keep quality standards', 'Less single-supplier dependence'],
  },
  buyers: {
    meaning: 'How much power customers have',
    investigated: ['Price sensitivity', 'Competing products', 'Customer reviews', 'Shopping preferences', 'Brand switching'],
    sources: [{ name: 'Amazon, Myntra & AJIO', status: 'used' }, { name: 'Google Trends', status: 'used' }, { name: 'Customer surveys', status: 'conducted' }, { name: 'Customer interviews', status: 'conducted' }],
    observed: 'With so many choices, customers can compare and switch easily.',
    matters: 'Customers have real power over price and loyalty.',
    actions: ['Better product quality', 'Transparent pricing', 'Build customer trust', 'Encourage repeat purchases'],
  },
  substitutes: {
    meaning: 'Other ways to meet the same need',
    investigated: ['Other clothing categories', 'Local boutiques', 'Offline retailers', 'Ethnic and western wear', 'Custom stitching'],
    sources: [{ name: 'Marketplace listings', status: 'used' }, { name: 'Competitor sites', status: 'used' }, { name: 'Customer interviews', status: 'conducted' }],
    observed: 'Customers always have other options.',
    matters: 'Aalayam has to be the natural choice.',
    actions: ['Understand customer needs', 'Distinctive designs', 'Comfort, value, practicality', 'A stronger value proposition'],
  },
};

/** Step start frames for a force: meaning, investigated, sources, observed, why it matters, action. */
const steps = (L: Line[], src: [number, string], action: [number, string]) => {
  const s = [L[0].from - 4, L[1].from - 4, wordAt(L[src[0]], src[1]), L[2].from - 4, L[3].from - 4, wordAt(L[action[0]], action[1])];
  for (let k = 1; k < 6; k++) s[k] = Math.max(s[k], s[k - 1] + 24);   // every step gets time on screen
  return s;
};

export const Rivalry: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame(), fl = useFloat(5, 80);
  const at = steps(lines, [1, 'Myntra'], [3, 'stand out']);
  return (
    <ForceScene force="rivalry" lines={lines} data={DATA.rivalry} at={at}>
      <Pop at={lines[0].from} style={{ left: 440, top: 330 + fl }}><Store size={230} /></Pop>
      {[[120, 260], [780, 250], [130, 560], [790, 560], [460, 600]].map(([x, y], i) => (
        <Pop key={i} at={lines[0].from + 10 + i * 5} style={{ left: x, top: y }}>
          <Store size={150} fill={i % 2 ? C.beigeDeep : C.beige} />
          <div style={{ position: 'absolute', left: 100, top: -16, transform: `rotate(${Math.sin((f + i * 30) / 10) * 10}deg)` }}><Tag size={70} /></div>
          <div style={{ position: 'absolute', left: 30, top: 150, display: 'flex', opacity: f > at[3] ? 1 : 0 }}>{[0, 1, 2].map((k) => <Star key={k} size={28} />)}</div>
        </Pop>
      ))}
    </ForceScene>
  );
};

export const Entrants: React.FC<P> = ({ lines }) => {
  const at = steps(lines, [1, 'Shopify'], [3, 'loyalty']);
  return (
    <ForceScene force="entrants" lines={lines} data={DATA.entrants} at={at}>
      <Pop at={lines[0].from} style={{ left: 120, top: 280 }}>
        <div style={{ position: 'relative' }}>
          <Laptop size={360} />
          <div style={{ position: 'absolute', left: 120, top: 120, padding: '10px 20px', borderRadius: 999, background: C.rose, color: C.white, fontSize: 24, fontWeight: 600 }}>Launch store</div>
        </div>
      </Pop>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Pop key={i} at={at[3] + i * 7} style={{ left: 520 + (i % 3) * 190, top: 300 + Math.floor(i / 3) * 210 }}><Store size={140} fill={i === 0 ? C.rose : C.white} /></Pop>
      ))}
      <Pop at={at[5]} style={{ left: 140, top: 680 }}><Chip icon={<Heart size={44} />} tone="rose">Customers who come back</Chip></Pop>
    </ForceScene>
  );
};

export const Suppliers: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame();
  const at = steps(lines, [1, 'supplier quotes'], [3, 'compare']);
  const more = interpolate(f, [at[5], at[5] + 20], [0, 1], clamp);
  const nodes = [[200, 300, 0], [200, 520, 1], [200, 740, 1]] as const;
  return (
    <ForceScene force="suppliers" lines={lines} data={DATA.suppliers} at={at}>
      <svg width={1100} height={1080} style={{ position: 'absolute' }}>
        {nodes.map(([x, y, extra], i) => <path key={i} d={`M${x + 160} ${y + 40} L760 ${520}`} stroke={C.rose} strokeWidth={6} strokeDasharray="2 14" strokeLinecap="round" opacity={extra ? more : 1} />)}
      </svg>
      {nodes.map(([x, y, extra], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y - 50, opacity: extra ? more : 1, transform: `scale(${extra ? 0.8 + 0.2 * more : 1})` }}>
          <Pop at={lines[0].from + 6} style={{ position: 'relative' }}><Fabric size={160} fill={[C.rose, C.beigeDeep, C.roseDeep][i]} /></Pop>
        </div>
      ))}
      <Pop at={lines[0].from} style={{ left: 700, top: 420 }}><Store size={220} /></Pop>
      <Pop at={at[1]} style={{ left: 760, top: 260 }}><Doc size={110} /></Pop>
      <Pop at={at[3]} style={{ left: 420, top: 860 }}><Chip tone="white">One supplier = one point of failure</Chip></Pop>
    </ForceScene>
  );
};

export const Buyers: React.FC<P> = ({ lines }) => {
  const f = useCurrentFrame();
  const at = steps(lines, [1, 'showed'], [3, 'Good quality']);
  const swipe = Math.floor(Math.max(0, f - at[1]) / 30) % 3;
  return (
    <ForceScene force="buyers" lines={lines} data={DATA.buyers} at={at}>
      <Woman x={260} y={1000 - 230} size={440} pose="hold" item={<g transform="translate(-14 -50)"><rect width={44} height={78} rx={8} fill={C.brown} /><rect x={5} y={8} width={34} height={58} rx={4} fill={C.roseLight} /></g>} />
      {[C.rose, C.beigeDeep, C.roseDeep].map((col, i) => {
        const on = i === swipe;
        return (
          <div key={i} style={{ position: 'absolute', left: 480 + i * 190, top: 300 + (on ? -16 : 0), width: 170, height: 300, borderRadius: 22, background: on ? C.white : C.sand, boxShadow: on ? '0 16px 30px rgba(74,51,38,.15)' : 'none' }}>
            <CoordHanger x={14} y={14} scale={0.58} color={col} />
            <div style={{ position: 'absolute', left: 14, bottom: 12, fontSize: 20, fontWeight: 600, color: C.brownSoft }}>Brand {String.fromCharCode(65 + i)}</div>
          </div>
        );
      })}
      <Pop at={at[3]} style={{ left: 520, top: 640 }}><div className="chip" style={{ fontSize: 28 }}>{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={30} />)} Reviews compared</div></Pop>
      <Pop at={at[5]} style={{ left: 820, top: 220 }}><Cart size={110} /></Pop>
    </ForceScene>
  );
};

export const Substitutes: React.FC<P> = ({ lines }) => {
  const L0 = lines[0];
  const at = steps(lines, [1, 'listings'], [3, 'comfort']);
  const alts = [
    { w: 'boutiques', t: 'Local boutique', el: <Store size={130} fill={C.beigeDeep} />, x: 120, y: 260 },
    { w: 'tailored', t: 'Custom stitching', el: <Sewing size={130} />, x: 760, y: 260 },
    { w: 'different styles', t: 'Ethnic wear', el: <div style={{ position: 'relative', width: 180, height: 140 }}><SareeFold x={0} y={0} scale={0.68} /></div>, x: 110, y: 600 },
    { w: 'different styles', t: 'Western wear', el: <Bag size={130} fill={C.beige} />, x: 790, y: 600 },
  ];
  return (
    <ForceScene force="substitutes" lines={lines} data={DATA.substitutes} at={at}>
      <Pop at={L0.from} style={{ left: 440, top: 330 }}><div style={{ position: 'relative', width: 240, height: 420 }}><CoordHanger x={0} y={0} swing={2} /></div></Pop>
      {alts.map((a, i) => (
        <Pop key={a.t} at={wordAt(L0, a.w) + (i === 3 ? 8 : 0)} style={{ left: a.x, top: a.y }}>
          <div style={{ textAlign: 'center' }}>{a.el}<div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>{a.t}</div></div>
        </Pop>
      ))}
    </ForceScene>
  );
};
