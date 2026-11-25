import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode6, SceneStill } from './Video';
import timeline from './timeline.json';

const S = (id: string, scene: string, line?: number) => <Still id={id} component={SceneStill} defaultProps={{ id: scene, line }} width={1920} height={1080} />;
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode6" component={Episode6} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {S('PainPoints', 'voice', 4)}
    {S('CustomerJourney', 'voice')}
    {S('InterviewProgramme', 'interviews')}
    {S('AnsoffMatrix', 'ansoff', 5)}
    {S('GrowthRanking', 'ansoff')}
    {S('CompetitorLandscape', 'landscape')}
    {S('BlueOceanConcepts', 'blueocean')}
    {S('StrategyCanvas', 'canvas')}
    {S('ERRCGrid', 'errc', 4)}
    {S('ValueProposition', 'errc')}
    {S('Synthesis', 'synthesis')}
    {S('Roadmap90', 'roadmap')}
  </>
);
