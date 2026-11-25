import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import './fonts';
import './styles.css';
import timeline from './timeline.json';
import type { Line } from './components/ui';
import { C } from './theme';
import { Intro, Reviews, Sources, Method, Insights } from './scenes/Customers';
import { Why, Tam, Sam, Som, Compare, Close } from './scenes/Market';

// Scene id (from scripts/narration.json) → component. Each scene is a separate, editable module.
export const SCENES: Record<string, React.FC<{ lines: Line[] }>> = {
  intro: Intro, reviews: Reviews, sources: Sources, method: Method, insights: Insights,
  why: Why, tam: Tam, sam: Sam, som: Som, compare: Compare, close: Close,
};
const OVERLAP = 14;

const Enter: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  if (first) return <>{children}</>;
  const p = interpolate(f, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3 });
  return <AbsoluteFill style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>{children}</AbsoluteFill>;
};

export const Episode4: React.FC = () => (
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

/** One scene frozen near its end: used for the deliverable stills. */
export const SceneStill: React.FC<{ id: string; line?: number }> = ({ id, line }) => {
  const s = timeline.scenes.find((x) => x.id === id)!;
  const Scene = SCENES[id];
  // freeze at the scene's end, or just before spoken line `line` starts
  const t = line === undefined ? s.durationInFrames - 2 : s.lines[line].from - 12;
  return (
    <Sequence from={-t} durationInFrames={s.durationInFrames}>
      <Scene lines={s.lines} />
    </Sequence>
  );
};
