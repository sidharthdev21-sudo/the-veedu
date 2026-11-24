import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FactorScene, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp } from '../components/anim';
import { Box, Cart, Gear, House, Phone, Spark, Store } from '../components/Icons';
import { BarChart, CoordHanger, wordAt } from '../components/Garments';
import { Woman } from '../components/Woman';
import { C } from '../theme';

export const Technological: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const store = wordAt(l1, 'online'), social = wordAt(l1, 'social'), post = wordAt(l1, 'purchase');
  const ai = wordAt(l2, 'AI'), analytics = wordAt(l2, 'analytics');
  const houses = [[140, 760], [380, 820], [660, 820], [900, 760]];
  return (
    <FactorScene
      factor="technological" lines={lines}
      means="Tools that help a business grow"
      affects={[
        { text: 'An online store reaches all of India', icon: <Store size={50} />, at: store },
        { text: 'A post can become a purchase', icon: <Cart size={50} />, at: social },
        { text: 'AI suggests the right outfit', icon: <Spark size={46} />, at: ai },
        { text: 'Analytics show what customers love', icon: <Gear size={46} />, at: analytics },
      ]}
      consider={['Make shopping smooth', 'Use data to decide', 'Sell where customers scroll']}
    >
      {/* gears turning */}
      <Reveal at={l0.from} out={l1.from - 4} dir="none" style={{ left: 0, top: 0 }}>
        <div style={{ position: 'absolute', left: 260, top: 380, transform: `rotate(${f * 1.2}deg)` }}><Gear size={320} /></div>
        <div style={{ position: 'absolute', left: 560, top: 290, transform: `rotate(${-f * 1.8 + 20}deg)` }}><Gear size={200} fill={C.roseLight} /></div>
        <div style={{ position: 'absolute', left: 620, top: 560, transform: `rotate(${-f * 1.5}deg)` }}><Gear size={150} fill={C.white} /></div>
      </Reveal>
      {/* online store: parcels travel to homes; a post turns into an order */}
      <Reveal at={l1.from} out={l2.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <Pop at={store} style={{ left: 420, top: 290 }}><Store size={240} /></Pop>
        {houses.map(([x, y], i) => {
          const t0 = store + 14 + i * 8, p = interpolate(f, [t0, t0 + 26], [0, 1], { ...clamp, easing: (t) => t * (2 - t) });
          const bx = 520 + (x - 520) * p, by = 440 + (y - 120 - 440) * p - Math.sin(p * Math.PI) * 120;
          return (
            <React.Fragment key={i}>
              <Pop at={store + 6 + i * 4} style={{ left: x, top: y }}><House size={130} /></Pop>
              {p > 0 && p < 1 && <div style={{ position: 'absolute', left: bx, top: by }}><Box size={70} /></div>}
            </React.Fragment>
          );
        })}
        <Pop at={social} style={{ left: 120, top: 330 }}><Chip icon={<Phone size={46} />}>Post</Chip></Pop>
        <Pop at={post} style={{ left: 760, top: 330 }}><Chip icon={<Cart size={46} />} tone="rose">Purchase</Chip></Pop>
      </Reveal>
      {/* AI picks + analytics */}
      <Reveal at={l2.from} out={l3.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <div className="card" style={{ left: 90, top: 270, width: 560, height: 420 }}>
          <div className="label" style={{ position: 'absolute', left: 30, top: 20 }}>Picked for you</div>
          {[C.beigeDeep, C.rose, C.brownSoft].map((col, i) => {
            const pick = i === 1 && f > ai + 20;
            return (
              <div key={i} style={{ position: 'absolute', left: 26 + i * 176, top: 80, width: 160, height: 300, borderRadius: 20, background: pick ? C.roseLight : C.sand, outline: pick ? `5px solid ${C.rose}` : 'none' }}>
                <CoordHanger x={8} y={14} scale={0.6} color={col} />
              </div>
            );
          })}
          <Pop at={ai + 20} style={{ left: 290, top: 52 }}><Spark size={70} /></Pop>
        </div>
        <BarChart x={600} y={560} w={460} h={360} values={[0.45, 0.9, 0.6, 0.35]} a={analytics} highlight={1} label="What customers love" />
      </Reveal>
      <Reveal at={l3.from} dir="right" dist={120} style={{ left: 0, top: 0 }}>
        <Woman x={330} y={1010} size={480} pose="hold" outfit={C.roseDeep} trim={C.brown} skin={C.skinAlt} seed={3} item={<g transform="translate(-14 -50)"><rect width={44} height={78} rx={8} fill={C.brown} /><rect x={5} y={8} width={34} height={58} rx={4} fill={C.roseLight} /></g>} />
        <Pop at={l3.from + 20} style={{ left: 600, top: 420 }}><Chip icon={<Cart size={46} />}>Smooth checkout</Chip></Pop>
        <Pop at={wordAt(l3, 'data')} style={{ left: 640, top: 580 }}><Chip icon={<Gear size={46} />} tone="rose">Smarter choices</Chip></Pop>
      </Reveal>
    </FactorScene>
  );
};
