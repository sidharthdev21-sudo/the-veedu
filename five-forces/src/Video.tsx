import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import './fonts';
import './styles.css';
import timeline from './timeline.json';
import type { Line } from './components/SceneShell';
import { C } from './theme';
import { Recap } from './scenes/Recap';
import { Method } from './scenes/Method';
import { Sources } from './scenes/Sources';
import { Rivalry, Entrants, Suppliers, Buyers, Substitutes } from './scenes/Forces';
import { Insights } from './scenes/Insights';
import { Conclusion } from './scenes/Conclusion';

// Scene id (from scripts/narration.json) → component. Each scene is self-contained and editable on its own.
export const SCENES: Record<string, React.FC<{ lines: Line[] }>> = {
  recap: Recap, method: Method, sources: Sources,
  rivalry: Rivalry, entrants: Entrants, suppliers: Suppliers, buyers: Buyers, substitutes: Substitutes,
  insights: Insights, conclusion: Conclusion,
};
const OVERLAP = 14;   // same scene transition as Part 1: the new scene slides up and fades in

const Enter: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  if (first) return <>{children}</>;
  const p = interpolate(f, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3 });
  return <AbsoluteFill style={{ opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.985 + 0.015 * p})` }}>{children}</AbsoluteFill>;
};

export const FiveForces: React.FC = () => (
  <AbsoluteFill style={{ background: C.ivory }}>
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

/** One scene frozen at a given point (0–1 through it): used for the stand-alone deliverable stills. */
export const SceneStill: React.FC<{ id: string; at?: number }> = ({ id, at = 1 }) => {
  const s = timeline.scenes.find((x) => x.id === id)!;
  const Scene = SCENES[id];
  const t = Math.min(s.durationInFrames - 2, Math.round(at * s.durationInFrames));
  return (
    <Sequence from={-t} durationInFrames={s.durationInFrames}>
      <Scene lines={s.lines} />
    </Sequence>
  );
};
