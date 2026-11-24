import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Line } from '../components/SceneShell';
import { Pop, Reveal, clamp } from '../components/anim';
import { Bulb, Check, Clipboard, Doc, People, SearchGlass, Spark, Store } from '../components/Icons';
import { wordAt } from '../components/Garments';
import { ForcesDiagram, SeriesTag } from '../components/Series';
import { PestelRing } from './Recap';
import { C } from '../theme';

/** The research journey, lit word by word. */
export const JOURNEY = [
  { t: 'Business understanding', w: 'understand', I: People },
  { t: 'Research questions', w: 'ask', I: Doc },
  { t: 'Data collection', w: 'collect', I: SearchGlass },
  { t: 'Five Forces analysis', w: 'analyse', I: Clipboard },
  { t: 'Competitive insights', w: 'find', I: Spark },
  { t: 'Business recommendations', w: 'turn', I: Bulb },
];

export const Conclusion: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1] = lines;
  const out = interpolate(f, [l1.from - 10, l1.from + 6], [1, 0], clamp);
  const pestel = wordAt(l1, 'Through PESTEL'), forces = wordAt(l1, "Through Porter"), together = wordAt(l1, 'Together');
  const join = interpolate(f, [together, together + 30], [0, 1], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* the journey */}
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <div style={{ position: 'absolute', left: 110, top: 60 }}>
          <div className="eyebrow">Our research journey</div>
          <div className="serif" style={{ fontSize: 68 }}>From questions to recommendations</div>
        </div>
        {JOURNEY.map((n, i) => {
          const at = wordAt(l0, n.w), lit = interpolate(f, [at, at + 10], [0, 1], clamp);
          return (
            <Pop key={n.t} at={4 + i * 4} style={{ left: 120 + i * 290, top: 380 + (i % 2) * 140 }}>
              <div style={{ width: 250, textAlign: 'center', opacity: 0.4 + 0.6 * lit }}>
                <div style={{ width: 150, height: 150, margin: '0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: lit > 0.5 ? C.rose : C.white, boxShadow: '0 12px 26px rgba(74,51,38,.12)' }}>
                  {lit > 0.5 && i < JOURNEY.length - 1 && f > wordAt(l0, JOURNEY[i + 1].w) ? <Check size={80} fill={C.white} color={C.rose} /> : <n.I size={86} />}
                </div>
                <div style={{ fontSize: 28, fontWeight: 600, marginTop: 18, lineHeight: 1.2 }}>{n.t}</div>
              </div>
            </Pop>
          );
        })}
      </div>
      {/* PESTEL + Five Forces, together around the brand */}
      <Reveal at={l1.from - 8} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <div style={{ position: 'absolute', inset: 0, transform: 'translateX(-430px) scale(0.6)', transformOrigin: '960px 480px', opacity: interpolate(f, [pestel, pestel + 12], [0, 1], clamp) }}>
          <PestelRing cx={960} cy={480} r={380} at={pestel} />
        </div>
        <div style={{ opacity: interpolate(f, [forces, forces + 12], [0, 1], clamp) }}>
          <ForcesDiagram x={1440} y={480} scale={0.58} popAt={forces} />
        </div>
        <Reveal at={pestel} style={{ left: 230, top: 785, width: 600, textAlign: 'center' }}><div className="serif" style={{ fontSize: 38 }}>PESTEL · the outside environment</div></Reveal>
        <Reveal at={forces} style={{ left: 1140, top: 785, width: 600, textAlign: 'center' }}><div className="serif" style={{ fontSize: 38 }}>Five Forces · the competition</div></Reveal>
        <Pop at={together + 6} style={{ left: 850, top: 370, transform: `scale(${join})` }}><Store size={220} /></Pop>
        <div style={{ position: 'absolute', left: 820, top: 470, width: 280, height: 6, borderRadius: 3, background: C.rose, opacity: join * 0.5 }} />
        <Reveal at={together + 30} style={{ left: 0, top: 880, width: 1920, textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 76, lineHeight: 1 }}>Aalayam</div>
          <div style={{ fontSize: 22, letterSpacing: '0.42em', fontWeight: 500, color: C.roseDeep, marginTop: 10 }}>BY ANAMIKA · BUSINESS RESEARCH SERIES · PART 2</div>
        </Reveal>
      </Reveal>
      <SeriesTag />
    </AbsoluteFill>
  );
};
