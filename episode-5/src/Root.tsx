import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode5, SceneStill } from './Video';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode5" component={Episode5} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    <Still id="SWOT" component={SceneStill} defaultProps={{ id: 'swot' }} width={1920} height={1080} />
    <Still id="TOWS" component={SceneStill} defaultProps={{ id: 'tows' }} width={1920} height={1080} />
    <Still id="BCG" component={SceneStill} defaultProps={{ id: 'bcg' }} width={1920} height={1080} />
    <Still id="GEAttractiveness" component={SceneStill} defaultProps={{ id: 'ge', line: 2 }} width={1920} height={1080} />
    <Still id="GEStrength" component={SceneStill} defaultProps={{ id: 'ge', line: 3 }} width={1920} height={1080} />
    <Still id="GENineBox" component={SceneStill} defaultProps={{ id: 'ge' }} width={1920} height={1080} />
    <Still id="Synthesis" component={SceneStill} defaultProps={{ id: 'synthesis' }} width={1920} height={1080} />
    <Still id="Priorities" component={SceneStill} defaultProps={{ id: 'plan', line: 4 }} width={1920} height={1080} />
    <Still id="Roadmap90" component={SceneStill} defaultProps={{ id: 'plan' }} width={1920} height={1080} />
  </>
);
