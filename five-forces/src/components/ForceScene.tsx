import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Line } from './SceneShell';
import { Reveal, clamp } from './anim';
import { Check } from './Icons';
import { FORCES, ForceId, SeriesTag, Status, StatusBadge } from './Series';
import { C } from '../theme';

export const STEP_NAMES = ['Meaning', 'What we investigated', 'Where we looked', 'What we observed', 'Why it matters', 'Action to consider'];

export type ForceData = {
  meaning: string;
  investigated: string[];
  sources: { name: string; status: Status }[];
  observed: string;
  matters: string;
  actions: string[];
};

/**
 * One force, always in the same six steps (meaning → investigated → sources → observed → why it matters → action).
 * `at` gives the frame each step starts, so the card follows the narration. The illustration (children) fills the left.
 */
export const ForceScene: React.FC<{ force: ForceId; lines: Line[]; data: ForceData; at: number[]; children: React.ReactNode }> = ({ force, data, at, children }) => {
  const f = useCurrentFrame();
  const i = FORCES.findIndex((x) => x.id === force), F = FORCES[i];
  const step = at.filter((a) => f >= a).length - 1;
  const head = interpolate(f, [2, 20], [0, 1], clamp);
  const panel = (k: number) => ({ at: at[k] + 4, out: k < 5 ? at[k + 1] - 2 : undefined });
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      {/* header */}
      <div style={{ position: 'absolute', left: 90, top: 60, display: 'flex', alignItems: 'center', gap: 26, opacity: head, transform: `translateY(${(1 - head) * -20}px)` }}>
        <div className="serif" style={{ width: 108, height: 108, borderRadius: '50%', background: C.rose, color: C.white, display: 'grid', placeItems: 'center', fontSize: 64 }}>{F.n}</div>
        <div>
          <div className="eyebrow">Force {F.n} of 5</div>
          <div className="serif" style={{ fontSize: 64, lineHeight: 1.05 }}>{F.title}</div>
        </div>
      </div>
      {/* six-step tracker */}
      <div style={{ position: 'absolute', right: 90, top: 78, width: 680, opacity: head }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          {STEP_NAMES.map((s, k) => (
            <div key={s} style={{ width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 600, background: k === step ? C.rose : k < step ? C.white : 'transparent', color: k === step ? C.white : C.brownSoft, border: `3px solid ${k <= step ? C.rose : C.beigeDeep}` }}>
              {k < step ? <Check size={30} /> : k + 1}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right', marginTop: 10, fontSize: 24, fontWeight: 600, color: C.roseDeep }}>{step >= 0 ? STEP_NAMES[step] : ''}</div>
      </div>
      {children}
      {/* the step card */}
      <div className="card" style={{ left: 1150, top: 240, width: 680, height: 690, overflow: 'hidden' }}>
        <Reveal at={panel(0).at} out={panel(0).out} style={{ left: 54, top: 56, width: 570 }}>
          <div className="eyebrow">{STEP_NAMES[0]}</div>
          <div className="serif" style={{ fontSize: 64, lineHeight: 1.12, marginTop: 24 }}>{data.meaning}</div>
        </Reveal>
        <Reveal at={panel(1).at} out={panel(1).out} style={{ left: 54, top: 56, width: 570 }}>
          <div className="eyebrow">{STEP_NAMES[1]}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 30 }}>
            {data.investigated.map((t, k) => (
              <Reveal key={t} at={at[1] + 8 + k * 6} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 36, fontWeight: 500 }}><span style={{ width: 14, height: 14, borderRadius: 7, background: C.rose }} />{t}</div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal at={panel(2).at} out={panel(2).out} style={{ left: 54, top: 56, width: 570 }}>
          <div className="eyebrow">{STEP_NAMES[2]}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
            {data.sources.map((s, k) => (
              <Reveal key={s.name} at={at[2] + 8 + k * 6} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontSize: 32, fontWeight: 500, padding: '14px 20px', borderRadius: 18, background: C.sand }}>{s.name}<StatusBadge s={s.status} size={18} /></div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal at={panel(3).at} out={panel(3).out} style={{ left: 54, top: 56, width: 570 }}>
          <div className="eyebrow">{STEP_NAMES[3]}</div>
          <div className="serif" style={{ fontSize: 56, lineHeight: 1.15, marginTop: 24 }}>{data.observed}</div>
          <div className="label" style={{ marginTop: 30, fontSize: 22 }}>A general observation, not a measured statistic</div>
        </Reveal>
        <Reveal at={panel(4).at} out={panel(4).out} style={{ left: 54, top: 56, width: 570 }}>
          <div className="eyebrow">{STEP_NAMES[4]}</div>
          <div className="serif" style={{ fontSize: 60, lineHeight: 1.12, marginTop: 24 }}>{data.matters}</div>
        </Reveal>
        <Reveal at={panel(5).at} style={{ left: 54, top: 56, width: 580 }}>
          <div className="eyebrow">{STEP_NAMES[5]}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 30 }}>
            {data.actions.map((t, k) => (
              <Reveal key={t} at={at[5] + 8 + k * 8} dir="left" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 36, fontWeight: 500, lineHeight: 1.2 }}><Check size={52} style={{ flex: 'none' }} />{t}</div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
      <SeriesTag />
    </AbsoluteFill>
  );
};
