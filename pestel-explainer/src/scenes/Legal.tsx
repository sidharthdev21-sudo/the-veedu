import React from 'react';
import { FactorScene, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, useFloat } from '../components/anim';
import { Check, Doc, Heart, Lock, Scales, Shield, Tag } from '../components/Icons';
import { CoordHanger, wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { C } from '../theme';

/** A garment label: fabric, size, origin and care symbols. */
const GarmentLabel: React.FC = () => (
  <div style={{ width: 300, padding: '28px 30px', background: C.white, borderRadius: 18, border: `4px solid ${C.brown}`, boxShadow: '0 16px 34px rgba(74,51,38,.12)', fontSize: 26, lineHeight: 1.5 }}>
    <div className="serif" style={{ fontSize: 34, marginBottom: 6 }}>Aalayam</div>
    <div>100% Cotton</div>
    <div>Size M</div>
    <div>Made in India</div>
    <svg width={220} height={50} style={{ marginTop: 10 }}>
      <path d="M6 14 L14 40 H40 L48 14 Q36 22 27 14 Q18 22 6 14 Z" fill="none" stroke={C.brown} strokeWidth={3} />
      <path d="M70 40 L86 12 L102 40 Z" fill="none" stroke={C.brown} strokeWidth={3} />
      <rect x={124} y={12} width={30} height={28} fill="none" stroke={C.brown} strokeWidth={3} /><circle cx={139} cy={26} r={9} fill="none" stroke={C.brown} strokeWidth={3} />
      <path d="M176 38 H212 L206 18 H184 Z" fill="none" stroke={C.brown} strokeWidth={3} />
    </svg>
  </div>
);

export const Legal: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2, l3] = lines;
  const fl = useFloat(6, 80);
  return (
    <FactorScene
      factor="legal" lines={lines}
      means="The rules every business has to follow"
      affects={[
        { text: 'Clear prices and fair returns', icon: <Tag size={46} />, at: wordAt(l1, 'clear prices') },
        { text: 'Proper labels on every garment', icon: <Doc size={46} />, at: wordAt(l2, 'label') },
        { text: 'GST filed correctly', icon: <Check size={46} />, at: wordAt(l2, 'GST') },
        { text: 'Customer data kept safe', icon: <Lock size={46} />, at: wordAt(l2, 'data') },
      ]}
      consider={['Follow e-commerce rules', 'Label every product', 'Protect customer data']}
    >
      <Reveal at={l0.from} out={l1.from - 4} dir="none" style={{ left: 0, top: 0 }}>
        <Pop at={l0.from + 4} style={{ left: 300, top: 320 + fl }}><Scales size={320} /></Pop>
        <Pop at={l0.from + 16} style={{ left: 660, top: 560 }}><Doc size={180} /></Pop>
      </Reveal>
      {/* online shop page: clear price, fair returns, protected customer */}
      <Reveal at={l1.from} out={l2.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <div className="card" style={{ left: 110, top: 280, width: 540, height: 600 }}>
          <div style={{ position: 'absolute', left: 30, top: 30, width: 480, height: 320, borderRadius: 20, background: C.roseLight }}>
            <CoordHanger x={150} y={10} scale={0.72} color={C.rose} />
          </div>
          <div style={{ position: 'absolute', left: 34, top: 380, fontSize: 32, fontWeight: 600 }}>Rose co-ord set</div>
          <Pop at={wordAt(l1, 'clear prices')} style={{ left: 30, top: 440 }}><Chip size={26}>Price incl. all taxes</Chip></Pop>
          <Pop at={wordAt(l1, 'fair returns')} style={{ left: 30, top: 512 }}><Chip size={26} tone="rose">Easy returns</Chip></Pop>
        </div>
        <Pop at={wordAt(l1, 'consumer')} style={{ left: 720, top: 380 }}><Shield size={220} /></Pop>
        <Pop at={wordAt(l1, 'consumer') + 8} style={{ left: 690, top: 630 }}><Chip size={28}>Consumer protection</Chip></Pop>
      </Reveal>
      {/* label, GST, data */}
      <Reveal at={l2.from} out={l3.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <Pop at={wordAt(l2, 'label')} style={{ left: 110, top: 300 }}><GarmentLabel /></Pop>
        <Pop at={wordAt(l2, 'GST')} style={{ left: 520, top: 290 }}>
          <div style={{ position: 'relative' }}><Doc size={220} /><div style={{ position: 'absolute', left: 130, top: 140 }}><Check size={100} /></div></div>
          <div className="label" style={{ textAlign: 'center', marginTop: 6 }}>GST filed</div>
        </Pop>
        <Pop at={wordAt(l2, 'data')} style={{ left: 800, top: 560 }}>
          <Lock size={200} />
          <div className="label" style={{ textAlign: 'center', marginTop: 6 }}>Data safe</div>
        </Pop>
      </Reveal>
      {/* protected and trusted */}
      <Reveal at={l3.from} dir="up" style={{ left: 0, top: 0 }}>
        <Pop at={l3.from + 4} style={{ left: 560, top: 330 }}><Shield size={300} /></Pop>
        <Woman x={330} y={1010} size={470} pose="cheer" seed={6} />
        {[0, 1, 2].map((i) => <Pop key={i} at={wordAt(l3, 'confidence') + i * 6} style={{ left: 640 + i * 90, top: 700 - (i % 2) * 40 }}><Heart size={70} /></Pop>)}
      </Reveal>
    </FactorScene>
  );
};
