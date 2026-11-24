import React from 'react';
import { Composition } from 'remotion';
import { PestelExplainer } from './Video';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="PestelExplainer"
    component={PestelExplainer}
    durationInFrames={timeline.durationInFrames}
    fps={timeline.fps}
    width={1920}
    height={1080}
  />
);
