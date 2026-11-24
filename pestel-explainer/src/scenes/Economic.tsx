import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FactorScene, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp, useFloat } from '../components/anim';
import { Rupee, Store, Tag, Wallet } from '../components/Icons';
import { LineChart, wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { C } from '../theme';

/** A see-saw: "Price" on one side, "Value" on the other; it levels out at frame `at`. */
const Balance: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const f = useCurrentFrame();
  const tilt = interpolate(f, [at, at + 40], [-14, 0], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 }) + Math.sin(f / 20) * (f > at + 40 ? 1 : 0);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 620, height: 420 }}>
      <svg width={620} height={420} style={{ position: 'absolute', overflow: 'visible' }}>
        <path d="M310 380 L270 300 H350 Z" fill={C.brownSoft} />
        <g transform={`rotate(${tilt} 310 300)`}>
          <rect x={40} y={290} width={540} height={18} rx={9} fill={C.brown} />
          <rect x={60} y={190} width={180} height={100} rx={18} fill={C.white} stroke={C.brown} strokeWidth={4} />
          <rect x={380} y={190} width={180} height={100} rx={18} fill={C.rose} stroke={C.brown} strokeWidth={4} />
          <text x={150} y={252} textAnchor="middle" fontFamily="Poppins" fontWeight={600} fontSize={34} fill={C.brown}>Price</text>
          <text x={470} y={252} textAnchor="middle" fontFamily="Poppins" fontWeight={600} fontSize={34} fill={C.white}>Value</text>
        </g>
      </svg>
    </div>
  );
};

export const Economic: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const fl = useFloat(6, 70);
  const shopper = wordAt(l1, 'shoppers');
  return (
    <FactorScene
      factor="economic" lines={lines}
      means="Money: what things cost and what people can spend"
      affects={[
        { text: 'Inflation pushes fabric costs up', icon: <Rupee size={46} />, at: wordAt(l1, 'inflation') },
        { text: 'Shoppers think twice', icon: <Wallet size={46} />, at: shopper },
        { text: 'Many brands compete on price', icon: <Store size={46} />, at: l2.from },
      ]}
      consider={['Price carefully', 'Plan for rising fabric costs', 'Show clear value']}
    >
      {/* money in, money out */}
      <Reveal at={l0.from} out={l1.from - 4} dir="none" style={{ left: 0, top: 0 }}>
        <Pop at={l0.from + 4} style={{ left: 250, top: 380 + fl }}><Wallet size={300} /></Pop>
        {[0, 1, 2, 3].map((i) => {
          const at = wordAt(l0, 'cost') + i * 7;
          const y = interpolate(f, [at, at + 14], [-260, 0], { ...clamp, easing: (t) => t * t });
          return <div key={i} style={{ position: 'absolute', left: 640, top: 700 - i * 46 + y, opacity: f > at ? 1 : 0 }}><Rupee size={130} /></div>;
        })}
      </Reveal>
      {/* fabric costs rise; the shopper hesitates */}
      <Reveal at={l1.from} out={l2.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <LineChart x={100} y={270} w={640} h={420} values={[0.12, 0.2, 0.18, 0.34, 0.45, 0.62, 0.85]} a={wordAt(l1, 'fabric')} b={wordAt(l1, 'fabric') + 40} label="Fabric cost" />
      </Reveal>
      <Reveal at={l1.from + 6} out={l3.from - 4} dir="right" dist={140} style={{ left: 0, top: 0 }}>
        <Woman x={860} y={1010} size={440} pose="think" outfit={C.beigeDeep} trim={C.brownSoft} skin={C.skinLight} seed={2} />
        <Pop at={shopper + 6} style={{ left: 770, top: 420 }}>
          <div className="chip" style={{ fontSize: 36 }}>Hmm… maybe later</div>
        </Pop>
      </Reveal>
      {/* competition: many shops, many price tags */}
      <Reveal at={l2.from} out={l3.from - 4} dir="none" style={{ left: 0, top: 0 }}>
        {[[110, 300], [340, 250], [570, 300], [200, 560], [450, 560]].map(([x, y], i) => (
          <Pop key={i} at={l2.from + 4 + i * 6} style={{ left: x, top: y + Math.sin((f + i * 20) / 16) * 5 }}>
            <Store size={170} />
            <div style={{ position: 'absolute', left: 110, top: -10, transform: `rotate(${Math.sin((f + i * 30) / 9) * 10}deg)` }}><Tag size={80} /></div>
          </Pop>
        ))}
      </Reveal>
      {/* the answer: balance price and value */}
      <Reveal at={l3.from} dir="up" style={{ left: 0, top: 0 }}>
        <Balance x={220} y={330} at={l3.from + 20} />
        <div style={{ position: 'absolute', left: 300, top: 780 }}><Chip tone="rose">Fair price, clear value</Chip></div>
      </Reveal>
    </FactorScene>
  );
};
