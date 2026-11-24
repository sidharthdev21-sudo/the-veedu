import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import './fonts';
import './styles.css';
import timeline from './timeline.json';
import type { Line } from './components/ui';
import { C } from './theme';
import { Intro } from './scenes/Intro';
import { Approach } from './scenes/Approach';
import { Toolkit } from './scenes/Toolkit';
import { Political, Economic, Social, Technological, Environmental, Legal } from './scenes/Dimensions';
import { Insights } from './scenes/Insights';
import { Conclusion } from './scenes/Conclusion';

// Scene id (from scripts/narration.json) → component. Reorder or swap scenes here.
export const SCENES: Record<string, React.FC<{ lines: Line[] }>> = {
  intro: Intro, approach: Approach, toolkit: Toolkit,
  political: Political, economic: Economic, social: Social, technological: Technological, environmental: Environmental, legal: Legal,
  insights: Insights, conclusion: Conclusion,
};
const OVERLAP = 14;   // frames: each scene fades in over the end of the previous one

const Enter: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  if (first) return <>{children}</>;
  const p = interpolate(f, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3 });
  return <AbsoluteFill style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>{children}</AbsoluteFill>;
};

export const PestelResearch: React.FC = () => (
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

/** Renders one scene frozen at its last frame: used for the flowchart, toolkit and findings deliverables. */
export const SceneStill: React.FC<{ id: string }> = ({ id }) => {
  const s = timeline.scenes.find((x) => x.id === id)!;
  const Scene = SCENES[id];
  return (
    <Sequence from={-(s.durationInFrames - 2)} durationInFrames={s.durationInFrames}>
      <Scene lines={s.lines} />
    </Sequence>
  );
};
