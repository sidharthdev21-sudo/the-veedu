import React from 'react';
import { Composition, Still } from 'remotion';
import { Episode7, SceneStill } from './Video';
import timeline from './timeline.json';

const S = (id: string, scene: string, line?: number) => <Still id={id} component={SceneStill} defaultProps={{ id: scene, line }} width={1920} height={1080} />;
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Episode7" component={Episode7} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
    {S('EvidenceInventory', 'reality')}
    {S('ContentExperiments', 'audience')}
    {S('StoreJourney', 'store')}
    {S('SupplierPipeline', 'sourcing', 2)}
    {S('SupplierScorecard', 'sourcing')}
    {S('UnitEconomics', 'economics')}
    {S('OperatingLoop', 'connect', 2)}
    {S('DataModel', 'connect')}
    {S('DataStrategy', 'dashboard', 1)}
    {S('Dashboard', 'dashboard')}
    {S('ProductScorecard', 'validate')}
    {S('Findings', 'learned')}
    {S('Roadmap90', 'next', 3)}
  </>
);
