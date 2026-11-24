import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import './fonts';
import './styles.css';
import timeline from './timeline.json';
import type { Line } from './components/SceneShell';
import { C } from './theme';
import { Intro } from './scenes/Intro';
import { Political } from './scenes/Political';
import { Economic } from './scenes/Economic';
import { Social } from './scenes/Social';
import { Technological } from './scenes/Technological';
import { Environmental } from './scenes/Environmental';
import { Legal } from './scenes/Legal';
import { Conclusion } from './scenes/Conclusion';

const SCENES: Record<string, React.FC<{ lines: Line[] }>> = {
  intro: Intro, political: Political, economic: Economic, social: Social,
  technological: Technological, environmental: Environmental, legal: Legal, conclusion: Conclusion,
};
const OVERLAP = 14;   // frames: each scene slides in over the end of the previous one

/** Entry transition: the new scene slides up a little and fades in over the last frames of the old one. */
const Enter: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  if (first) return <>{children}</>;
  const p = interpolate(f, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3 });
  return (
    <AbsoluteFill style={{ opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.985 + 0.015 * p})` }}>{children}</AbsoluteFill>
  );
};

export const PestelExplainer: React.FC = () => (
  <AbsoluteFill style={{ background: C.ivory }}>
    {timeline.scenes.map((s, i) => {
      const Scene = SCENES[s.id];
      const shift = i === 0 ? 0 : OVERLAP;
      // lines are shifted by the overlap so each scene's own timing stays matched to the voice
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
