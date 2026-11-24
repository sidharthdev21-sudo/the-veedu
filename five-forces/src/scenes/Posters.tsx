import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Backdrop } from '../components/SceneShell';
import { FORCES, ForcesDiagram, SeriesTag, StatusBadge } from '../components/Series';
import { Check } from '../components/Icons';
import { STEPS } from './Method';
import { SECONDARY, PRIMARY, SUGGESTED, SourceCard } from './Sources';
import { DATA } from './Forces';
import { C } from '../theme';

const Title: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
  <div style={{ position: 'absolute', left: 110, top: 60 }}>
    <div className="eyebrow">{eyebrow}</div>
    <div className="serif" style={{ fontSize: 64 }}>{title}</div>
  </div>
);

/** Research methodology: the five steps with what each involved. */
export const MethodPoster: React.FC = () => (
  <AbsoluteFill className="stage">
    <Backdrop />
    <Title eyebrow="Aalayam by Anamika · Porter's Five Forces" title="Research methodology" />
    <div style={{ position: 'absolute', left: 110, top: 260, display: 'flex', gap: 24 }}>
      {STEPS.map((s, i) => (
        <div key={s.title} className="card" style={{ position: 'relative', width: 320, height: 560, padding: 32 }}>
          <div className="serif" style={{ width: 96, height: 96, borderRadius: '50%', background: C.rose, color: C.white, display: 'grid', placeItems: 'center', fontSize: 52 }}>{i + 1}</div>
          <div className="serif" style={{ fontSize: 38, lineHeight: 1.1, marginTop: 24 }}>{s.title}</div>
          <div style={{ height: 2, background: C.sand, margin: '22px 0' }} />
          {s.points.map((p) => <div key={p} style={{ display: 'flex', gap: 12, fontSize: 25, lineHeight: 1.35, marginBottom: 14 }}><span style={{ color: C.rose }}>●</span>{p}</div>)}
        </div>
      ))}
    </div>
    <SeriesTag />
  </AbsoluteFill>
);

/** Research sources: every source, what it gave us, and whether it was used, conducted or suggested. */
export const SourcesPoster: React.FC = () => (
  <AbsoluteFill className="stage">
    <Backdrop />
    <Title eyebrow="Aalayam by Anamika · Porter's Five Forces" title="Where we collected our data" />
    <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 180 }}>Secondary research</div>
    <div style={{ position: 'absolute', left: 110, top: 215, display: 'grid', gridTemplateColumns: 'repeat(3, 552px)', gap: 20 }}>
      {SECONDARY.map((s) => <SourceCard key={s.name} s={s} w={552} />)}
    </div>
    <div className="eyebrow" style={{ position: 'absolute', left: 110, top: 780 }}>Primary research</div>
    <div style={{ position: 'absolute', left: 110, top: 815, display: 'flex', gap: 16 }}>
      {PRIMARY.map((p) => (
        <div key={p.name} style={{ width: 280, padding: 18, borderRadius: 22, background: C.white, boxShadow: '0 8px 20px rgba(74,51,38,.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><p.Icon size={46} /><div style={{ fontSize: 23, fontWeight: 600, lineHeight: 1.15 }}>{p.name}</div></div>
          <div style={{ height: 12 }} />
          <StatusBadge s={p.status} size={18} />
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', left: 1290, top: 780 }}><SourceCard s={SUGGESTED} w={520} /></div>
  </AbsoluteFill>
);

/** The Five Forces framework with each force's meaning and the actions it points to. */
export const FrameworkPoster: React.FC = () => {
  const spots = [[710, 380], [710, 90], [110, 380], [1310, 380], [710, 690]];
  return (
    <AbsoluteFill className="stage">
      <Backdrop />
      <div style={{ position: 'absolute', left: 110, top: 50 }}>
        <div className="eyebrow">Aalayam by Anamika</div>
        <div className="serif" style={{ fontSize: 56 }}>Five Forces framework</div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        {[[960, 300, 960, 380], [610, 530, 710, 530], [1310, 530, 1210, 530], [960, 680, 960, 690]].map(([a, b, c, d], i) => (
          <path key={i} d={`M${a} ${b} L${c} ${d}`} stroke={C.rose} strokeWidth={6} strokeDasharray="2 14" strokeLinecap="round" />
        ))}
      </svg>
      {FORCES.map((F, i) => {
        const D = DATA[F.id], [x, y] = spots[i];
        return (
          <div key={F.id} className="card" style={{ left: x, top: y, width: 500, height: 290, padding: 26, border: i === 0 ? `3px solid ${C.rose}` : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><F.Icon size={50} /><div className="serif" style={{ fontSize: 32, lineHeight: 1.05 }}>{F.title}</div></div>
            <div className="label" style={{ fontSize: 22, marginTop: 10 }}>{D.meaning}</div>
            <div style={{ marginTop: 12 }}>
              {D.actions.map((a) => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, lineHeight: 1.45 }}><Check size={24} />{a}</div>)}
            </div>
          </div>
        );
      })}
      <div className="label" style={{ position: 'absolute', left: 110, top: 1010, fontSize: 20 }}>Actions are potential recommendations, not current capabilities</div>
      <SeriesTag />
    </AbsoluteFill>
  );
};

export { ForcesDiagram };
