import React from 'react';
import { Composition, Still } from 'remotion';
import { PestelResearch, SceneStill } from './Video';
import timeline from './timeline.json';
import { FlowchartPoster } from './scenes/FlowchartPoster';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PestelResearch" component={PestelResearch} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {/* stand-alone deliverables, each a finished scene frozen at its end */}
    <Still id="MethodologyFlowchart" component={FlowchartPoster} width={1920} height={1080} />
    <Still id="ResearchToolkit" component={SceneStill} defaultProps={{ id: 'toolkit' }} width={1920} height={1080} />
    <Still id="FindingsAndImplications" component={SceneStill} defaultProps={{ id: 'insights' }} width={1920} height={1080} />
  </>
);
