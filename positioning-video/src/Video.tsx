import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import './fonts';
import './styles.css';
import timeline from './timeline.json';
import type { Line } from './components/ui';
import { C } from './theme';
import { Recap, Method } from './scenes/Opening';
import { Levels } from './scenes/Levels';
import { Matrix, Map1, Map2 } from './scenes/Analysis';
import { Insights, Recs, Close } from './scenes/Closing';

// Scene id (from scripts/narration.json) → component. Each scene is self-contained.
export const SCENES: Record<string, React.FC<{ lines: Line[] }>> = {
  recap: Recap, method: Method, levels: Levels, matrix: Matrix, map1: Map1, map2: Map2, insights: Insights, recs: Recs, close: Close,
};
const OVERLAP = 14;   // the Part 1 research video's transition: the new scene slides up and fades in

const Enter: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  if (first) return <>{children}</>;
  const p = interpolate(f, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3 });
  return <AbsoluteFill style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>{children}</AbsoluteFill>;
};

export const Positioning: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {timeline.scenes.map((s, i) => {
      const Scene = SCENES[s.id], shift = i === 0 ? 0 : OVERLAP;
      const lines = s.lines.map((l) => ({ ...l, from: l.from + shift }));
      return (
        <Sequence key={s.id} from={s.from - shift} durationInFrames={s.durationInFrames + shift} name={s.title}>
          <Enter first={i === 0}><Scene lines={lines} /></Enter>
        </Sequence>
      );
    })}
    <Audio src={staticFile('audio/mix.wav')} />
  </AbsoluteFill>
);

/** One scene frozen near its end: used for the stand-alone stills. */
export const SceneStill: React.FC<{ id: string }> = ({ id }) => {
  const s = timeline.scenes.find((x) => x.id === id)!;
  const Scene = SCENES[id];
  return (
    <Sequence from={-(s.durationInFrames - 2)} durationInFrames={s.durationInFrames}>
      <Scene lines={s.lines} />
    </Sequence>
  );
};
