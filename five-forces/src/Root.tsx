import React from 'react';
import { Composition, Still } from 'remotion';
import { FiveForces, SceneStill } from './Video';
import { MethodPoster, SourcesPoster, FrameworkPoster } from './scenes/Posters';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="FiveForces" component={FiveForces} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {/* stand-alone deliverables */}
    <Still id="ResearchMethodology" component={MethodPoster} width={1920} height={1080} />
    <Still id="ResearchSources" component={SourcesPoster} width={1920} height={1080} />
    <Still id="FiveForcesFramework" component={FrameworkPoster} width={1920} height={1080} />
    <Still id="BusinessImplications" component={SceneStill} defaultProps={{ id: 'insights', at: 1 }} width={1920} height={1080} />
  </>
);
