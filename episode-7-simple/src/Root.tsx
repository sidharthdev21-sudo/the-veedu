import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode7Simple, SceneStill } from './Video';
import timeline from './timeline.json';

const S = (id: string, scene: string, line?: number) => <Still id={id} component={SceneStill} defaultProps={{ id: scene, line }} width={1920} height={1080} />;
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode7Simple" component={Episode7Simple} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {S('Intro', 'intro')}
    {S('Store', 'store')}
    {S('Working', 'working')}
    {S('FixSizes', 'fix', 2)}
    {S('FixPages', 'fix', 3)}
    {S('FixResults', 'fix')}
    {S('Rule', 'rule')}
    {S('Next', 'next', 4)}
  </>
);
