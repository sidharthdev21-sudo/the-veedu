import React from 'react';
import { Composition, Still } from 'remotion';
import { Positioning, SceneStill } from './Video';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Positioning" component={Positioning} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {/* stand-alone stills: each a finished scene frozen at its end */}
    <Still id="FourLevels" component={SceneStill} defaultProps={{ id: 'levels' }} width={1920} height={1080} />
    <Still id="CompetitorMatrix" component={SceneStill} defaultProps={{ id: 'matrix' }} width={1920} height={1080} />
    <Still id="PerceptualMap1" component={SceneStill} defaultProps={{ id: 'map1' }} width={1920} height={1080} />
    <Still id="PerceptualMap2" component={SceneStill} defaultProps={{ id: 'map2' }} width={1920} height={1080} />
    <Still id="Recommendations" component={SceneStill} defaultProps={{ id: 'recs' }} width={1920} height={1080} />
  </>
);
