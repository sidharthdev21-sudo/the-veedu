import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Backdrop, IconBadge } from '../components/ui';
import { Arrow } from '../components/Icons';
import { STEPS } from './Approach';
import { C, alpha } from '../theme';

/** Stand-alone research methodology flowchart: all four steps with what each involved. */
export const FlowchartPoster: React.FC = () => (
  <AbsoluteFill className="stage">
    <Backdrop />
    <div style={{ position: 'absolute', left: 110, top: 80 }}>
      <div className="eyebrow">Aalayam by Anamika · PESTEL research</div>
      <div className="head" style={{ fontSize: 64, marginTop: 8 }}>Research methodology</div>
    </div>
    <div style={{ position: 'absolute', left: 110, top: 240, display: 'flex', alignItems: 'stretch', gap: 18 }}>
      {STEPS.map((s, i) => (
        <React.Fragment key={s.n}>
          <div style={{ width: 380, minHeight: 600, borderRadius: 26, background: C.card, border: `1.5px solid ${alpha(s.color, 0.55)}`, boxShadow: `0 0 40px ${alpha(s.color, 0.12)}`, padding: 34 }}>
            <IconBadge color={s.color} size={90}><s.icon size={50} color={s.color} /></IconBadge>
            <div className="eyebrow" style={{ color: s.color, marginTop: 26, fontSize: 22 }}>Step {s.n}</div>
            <div className="head" style={{ fontSize: 36, lineHeight: 1.15, marginTop: 6 }}>{s.title}</div>
            <div style={{ height: 1, background: C.line, margin: '26px 0' }} />
            {s.points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 14, fontSize: 25, lineHeight: 1.35, marginBottom: 16, color: C.text }}>
                <span style={{ color: s.color }}>•</span>{p}
              </div>
            ))}
          </div>
          {i < 3 && <div style={{ display: 'grid', placeItems: 'center' }}><Arrow size={36} color={C.cyan} /></div>}
        </React.Fragment>
      ))}
    </div>
    <div className="muted" style={{ position: 'absolute', left: 110, top: 940, fontSize: 26 }}>
      Business understanding → Research questions → Information gathering → AI-assisted analysis → PESTEL classification → Business insights
    </div>
  </AbsoluteFill>
);
