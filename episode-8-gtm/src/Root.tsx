import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode8GTM, SceneStill } from './Video';
import timeline from './timeline.json';

const S = (id: string, scene: string, line?: number) => <Still id={id} component={SceneStill} defaultProps={{ id: scene, line }} width={1920} height={1080} />;
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode8GTM" component={Episode8GTM} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {S('Intro', 'intro')}
    {S('What', 'what')}
    {S('Who', 'who')}
    {S('How', 'how')}
    {S('Launch', 'launch')}
    {S('RecordFive', 'why')}
    {S('RecordPosts', 'recordhow', 2)}
    {S('RecordEnquiries', 'recordhow', 3)}
    {S('RecordUTM', 'recordhow', 4)}
    {S('Decide', 'decide')}
    {S('Close', 'close', 1)}
  </>
);
