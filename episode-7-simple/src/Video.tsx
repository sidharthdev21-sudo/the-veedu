import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import './fonts';
import './styles.css';
import timeline from './timeline.json';
import type { Line } from './components/ui';
import { C } from './theme';

// Scene id (from scripts/narration.json) → component. Data lives in src/data.ts.
import { Intro, StoreToday, Working, Fix, Rule, Next } from './scenes/Simple';
export const SCENES: Record<string, React.FC<{ lines: Line[] }>> = {
  intro: Intro, store: StoreToday, working: Working, fix: Fix, rule: Rule, next: Next,
};
const OVERLAP = 14;

const Enter: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  if (first) return <>{children}</>;
  const p = interpolate(f, [0, OVERLAP], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3 });
  return <AbsoluteFill style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>{children}</AbsoluteFill>;
};

export const Episode7Simple: React.FC = () => (
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

/** A scene frozen at its end, or just before spoken line `line`: used for the deliverable stills. */
export const SceneStill: React.FC<{ id: string; line?: number }> = ({ id, line }) => {
  const s = timeline.scenes.find((x) => x.id === id)!;
  const Scene = SCENES[id];
  const t = line === undefined ? s.durationInFrames - 2 : s.lines[line].from - 12;
  return (
    <Sequence from={-t} durationInFrames={s.durationInFrames}>
      <Scene lines={s.lines} />
    </Sequence>
  );
};
