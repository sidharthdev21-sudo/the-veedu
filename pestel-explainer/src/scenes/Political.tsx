import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FactorScene, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp, useFloat } from '../components/anim';
import { Building, Doc, Spool, Tag } from '../components/Icons';
import { CoordHanger, wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { C } from '../theme';

export const Political: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const fl = useFloat(5, 80);
  const gst = wordAt(l1, 'GST'), rules = wordAt(l1, 'rules'), mii = wordAt(l1, 'Make in India');
  const tax = interpolate(f, [wordAt(l2, 'tax'), wordAt(l2, 'tax') + 30], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  return (
    <FactorScene
      factor="political" lines={lines}
      means="Decisions made by the government"
      affects={[
        { text: 'GST on clothing', icon: <Tag size={46} />, at: gst },
        { text: 'Textile industry rules', icon: <Doc size={46} />, at: rules },
        { text: 'Make in India support', icon: <Spool size={46} />, at: mii },
        { text: 'Tax changes move prices', icon: <Tag size={46} fill={C.roseLight} />, at: l2.from },
      ]}
      consider={['Track new policies', 'Use support for Indian textiles', 'Price with tax in mind']}
    >
      {/* government building, then the three policies it sends out */}
      <Reveal at={l0.from} out={l2.from - 6} dir="none" style={{ left: 0, top: 0, width: 1110, height: 1080 }}>
        <Pop at={l0.from + 4} style={{ left: 390, top: 260 + fl }}><Building size={300} /></Pop>
        <svg width={1110} height={1080} style={{ position: 'absolute' }}>
          {[[gst, 230, 720], [rules, 540, 800], [mii, 850, 720]].map(([at, x, y], i) => {
            const p = interpolate(f, [at, at + 16], [0, 1], clamp);
            return <path key={i} d={`M540 560 L${540 + (x - 540) * p} ${560 + (y - 560) * p}`} stroke={C.beigeDeep} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" />;
          })}
        </svg>
        <Pop at={gst} style={{ left: 110, top: 690 }}><Chip icon={<Tag size={48} />}>GST</Chip></Pop>
        <Pop at={rules} style={{ left: 380, top: 790 }}><Chip icon={<Doc size={48} />}>Textile rules</Chip></Pop>
        <Pop at={mii} style={{ left: 690, top: 690 }}><Chip icon={<Spool size={48} />}>Make in India</Chip></Pop>
      </Reveal>
      {/* an outfit and what the customer pays: the tax slice grows */}
      <Reveal at={l2.from - 2} dir="up" style={{ left: 0, top: 0, width: 1110, height: 1080 }}>
        <CoordHanger x={560} y={260} scale={1.05} swing={2} />
        <div style={{ position: 'absolute', left: 820, top: 520, transform: `rotate(${Math.sin(f / 14) * 6}deg)`, transformOrigin: '0 50%' }}>
          <Tag size={150} fill={C.white} />
        </div>
        <div style={{ position: 'absolute', left: 520, top: 760 }}>
          <div className="label" style={{ marginBottom: 12 }}>What the customer pays</div>
          <div style={{ display: 'flex', height: 64, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 20px rgba(74,51,38,.1)' }}>
            <div style={{ width: 360, background: C.brownSoft, color: C.white, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 600 }}>Price</div>
            <div style={{ width: 40 + 130 * tax, background: C.rose, color: C.white, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 600 }}>{tax > 0.6 ? 'Tax' : ''}</div>
          </div>
        </div>
      </Reveal>
      <Reveal at={l3.from} dir="right" dist={120} style={{ left: 0, top: 0 }}>
        <Woman x={290} y={1010} size={470} pose="hold" item={<g transform="translate(-10 -40)"><rect width={64} height={80} rx={8} fill={C.white} stroke={C.brown} strokeWidth={4} /><path d="M14 24 H50 M14 40 H50 M14 56 H38" stroke={C.brown} strokeWidth={4} strokeLinecap="round" /></g>} />
      </Reveal>
    </FactorScene>
  );
};
