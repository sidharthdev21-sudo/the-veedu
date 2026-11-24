import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FactorScene, Line, Chip } from '../components/SceneShell';
import { Pop, Reveal, clamp } from '../components/anim';
import { Cart, Heart, House, People, Phone, Star } from '../components/Icons';
import { wordAt, CoordHanger } from '../components/Garments';
import { Woman } from '../components/Woman';
import { C } from '../theme';

/** A phone showing a fashion post that collects likes. */
const FeedPhone: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const f = useCurrentFrame();
  const likes = Math.round(interpolate(f, [at + 10, at + 70], [12, 248], clamp));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 330, height: 620, borderRadius: 48, background: C.brown, padding: 16, boxShadow: '0 24px 50px rgba(74,51,38,.25)' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 34, background: C.ivory, overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '22px 20px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.rose }} />
          <div style={{ fontSize: 22, fontWeight: 600 }}>aalayam</div>
        </div>
        <div style={{ position: 'relative', height: 330, background: C.roseLight }}>
          <CoordHanger x={70} y={10} scale={0.72} color={C.roseDeep} swing={1} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px', fontSize: 24, fontWeight: 600 }}>
          <Heart size={34} /> {likes}
        </div>
        <div style={{ padding: '0 20px', fontSize: 20, color: C.brownSoft }}>New co-ord drop ✨</div>
      </div>
    </div>
  );
};

export const Social: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const insta = wordAt(l2, 'Instagram'), reviews = wordAt(l2, 'reviews'), phones = wordAt(l2, 'phones');
  return (
    <FactorScene
      factor="social" lines={lines}
      means="People: how they live, what they like and how they shop"
      affects={[
        { text: 'Comfort matters, from work to weekend', icon: <People size={50} />, at: wordAt(l1, 'comfortable') },
        { text: 'Fashion is found on Instagram', icon: <Heart size={46} />, at: insta },
        { text: 'Real reviews build trust', icon: <Star size={46} />, at: reviews },
        { text: 'Shopping happens on phones', icon: <Phone size={50} />, at: phones },
      ]}
      consider={['Design for comfort', 'Follow trends closely', 'Be where customers are']}
    >
      {/* three women: live, like, shop */}
      <Reveal at={l0.from} out={l1.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        {[
          { x: 240, o: C.rose, t: C.roseDeep, s: C.skin, w: 'live', I: House },
          { x: 560, o: C.beigeDeep, t: C.brownSoft, s: C.skinLight, w: 'like', I: Heart },
          { x: 880, o: C.roseDeep, t: C.brown, s: C.skinAlt, w: 'shop', I: Cart },
        ].map((p, i) => (
          <React.Fragment key={i}>
            <Woman x={p.x} y={1000} size={420} outfit={p.o} trim={p.t} skin={p.s} seed={i} saree={i === 1} pose={i === 2 ? 'wave' : 'stand'} />
            <Pop at={wordAt(l0, p.w)} style={{ left: p.x - 60, top: 330 }}><div style={{ background: C.white, borderRadius: 28, padding: 12, boxShadow: '0 10px 24px rgba(74,51,38,.12)' }}><p.I size={96} /></div></Pop>
          </React.Fragment>
        ))}
      </Reveal>
      {/* work → weekend: one outfit that does both */}
      <Reveal at={l1.from} out={l2.from - 4} dir="up" style={{ left: 0, top: 0 }}>
        <Woman x={560} y={1010} size={500} pose="wave" />
        <Pop at={wordAt(l1, 'look')} style={{ left: 110, top: 380 }}><Chip>Looks good</Chip></Pop>
        <Pop at={wordAt(l1, 'comfortable')} style={{ left: 700, top: 460 }}><Chip tone="rose">Feels comfortable</Chip></Pop>
        <Pop at={wordAt(l1, 'workdays')} style={{ left: 130, top: 620 }}><Chip size={28}>Workdays</Chip></Pop>
        <Pop at={wordAt(l1, 'weekends')} style={{ left: 760, top: 680 }}><Chip size={28}>Weekends</Chip></Pop>
      </Reveal>
      {/* discover, trust, buy — on the phone */}
      <Reveal at={l2.from} dir="up" style={{ left: 0, top: 0 }}>
        <FeedPhone x={150} y={300} at={insta} />
        {[0, 1, 2, 3, 4].map((i) => {
          const t0 = insta + 10 + i * 9, p = interpolate(f, [t0, t0 + 50], [0, 1], clamp);
          return <div key={i} style={{ position: 'absolute', left: 430 + i * 22, top: 600 - p * 260, opacity: p > 0 && p < 1 ? 1 - p : 0 }}><Heart size={44 + i * 4} /></div>;
        })}
        <Pop at={reviews} style={{ left: 560, top: 380 }}>
          <div className="chip" style={{ flexDirection: 'column', alignItems: 'flex-start', borderRadius: 24, gap: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={34} />)}</div>
            <div style={{ fontSize: 28 }}>“So comfy, loved the fit!”</div>
          </div>
        </Pop>
        <Pop at={phones} style={{ left: 600, top: 640 }}><Chip icon={<Cart size={50} />} tone="white">Added to cart</Chip></Pop>
      </Reveal>
    </FactorScene>
  );
};
