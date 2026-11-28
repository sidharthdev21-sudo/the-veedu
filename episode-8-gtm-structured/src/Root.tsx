import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode8Structured, SceneStill } from './Video';
import timeline from './timeline.json';

const S = (id: string, scene: string, line?: number) => <Still id={id} component={SceneStill} defaultProps={{ id: scene, line }} width={1920} height={1080} />;
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode8Structured" component={Episode8Structured} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {S('Workflow', 'intro')}
    {S('FiveCs', 'fivec')}
    {S('Segments', 'segment')}
    {S('Targeting', 'target')}
    {S('PriceMap', 'position', 3)}
    {S('Positioning', 'position')}
    {S('FourPs', 'fourps')}
    {S('Journey', 'journey')}
    {S('Launch', 'launch')}
    {S('Budget', 'budget')}
    {S('RecordData', 'record')}
    {S('Measure', 'measure')}
  </>
);
