import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode4, SceneStill } from './Video';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode4" component={Episode4} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    <Still id="ReviewExamples" component={SceneStill} defaultProps={{ id: 'reviews' }} width={1920} height={1080} />
    <Still id="SentimentMethod" component={SceneStill} defaultProps={{ id: 'method' }} width={1920} height={1080} />
    <Still id="PainPoints" component={SceneStill} defaultProps={{ id: 'insights' }} width={1920} height={1080} />
    <Still id="TAM" component={SceneStill} defaultProps={{ id: 'tam' }} width={1920} height={1080} />
    <Still id="SAM" component={SceneStill} defaultProps={{ id: 'sam' }} width={1920} height={1080} />
    <Still id="SOM" component={SceneStill} defaultProps={{ id: 'som' }} width={1920} height={1080} />
    <Still id="Recommendations" component={SceneStill} defaultProps={{ id: 'close', line: 1 }} width={1920} height={1080} />
  </>
);
