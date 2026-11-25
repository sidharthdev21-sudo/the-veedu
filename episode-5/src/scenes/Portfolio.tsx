import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Backdrop, Heading, Line, useLit, wordAt } from '../components/ui';
import { Pop, Reveal, clamp } from '../components/anim';
import { Check } from '../components/Icons';
import { ATTRACT, BCG, GROWTH_CUTOFF, PLAN, PRIORITIES, STRENGTH, UNITS, weighted } from '../data';
import { C, alpha } from '../theme';
import { Provisional } from './Diagnosis';

const UC = [C.lime, C.violet, C.cyan];   // co-ords, kurta sets, sarees
const ease = (x: number) => 1 - (1 - x) ** 3;

// ─── 5 · BCG growth–share
const BX0 = 300, BX1 = 1260, BY0 = 250, BY1 = 900;
const gy = (g: number) => BY1 - (g / 20) * (BY1 - BY0);
export const Bcg: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3] = lines;
  const draw = interpolate(f, [l0.from, l0.from + 30], [0, 1], clamp);
  const band = useLit(wordAt(l2, "can't be measured"), 16);
  const quad = useLit(wordAt(l3, 'Question Marks'), 14);
  const xs = [960, 1170, 1060];
  const anchorEnd = [true, true, false];
  const growAt = [wordAt(l1, 'sets grow'), wordAt(l1, 'separates'), wordAt(l1, 'sarees about eight')];
  const midX = (BX0 + BX1) / 2;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.violet} />
      <Heading step="Framework 2 · BCG" title="Growth–share matrix" color={C.violet} />
      <div style={{ position: 'absolute', right: 110, top: 104 }}><Provisional text="Provisional · market share not measurable" /></div>
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
        <g opacity={draw}>
          {/* quadrant tints */}
          <rect x={BX0} y={BY0} width={midX - BX0} height={gy(GROWTH_CUTOFF) - BY0} fill={alpha(C.green, 0.05)} />
          <rect x={midX} y={BY0} width={BX1 - midX} height={gy(GROWTH_CUTOFF) - BY0} fill={alpha(C.cyan, 0.06 + 0.06 * quad)} />
          <rect x={BX0} y={gy(GROWTH_CUTOFF)} width={midX - BX0} height={BY1 - gy(GROWTH_CUTOFF)} fill={alpha(C.lime, 0.04)} />
          <rect x={midX} y={gy(GROWTH_CUTOFF)} width={BX1 - midX} height={BY1 - gy(GROWTH_CUTOFF)} fill={alpha(C.violet, 0.06 + 0.06 * quad)} />
          <line x1={BX0} y1={gy(GROWTH_CUTOFF)} x2={BX1} y2={gy(GROWTH_CUTOFF)} stroke={C.grey} strokeWidth={2} strokeDasharray="8 8" />
          <line x1={midX} y1={BY0} x2={midX} y2={BY1} stroke={C.grey} strokeWidth={2} strokeDasharray="8 8" />
          <rect x={BX0} y={BY0} width={BX1 - BX0} height={BY1 - BY0} fill="none" stroke={C.grey} strokeWidth={2.5} />
          {[0, 5, 10, 15, 20].map((g) => <text key={g} x={BX0 - 14} y={gy(g) + 8} textAnchor="end" fontSize={22} fill={C.grey} fontFamily="Inter">{g}%</text>)}
          <text x={BX0 + 16} y={BY0 + 40} fontSize={30} fontWeight={700} fill={C.green} fontFamily="Space Grotesk">Star</text>
          <text x={midX + 16} y={BY0 + 40} fontSize={30} fontWeight={700} fill={C.cyan} fontFamily="Space Grotesk">Question Mark</text>
          <text x={BX0 + 16} y={BY1 - 20} fontSize={30} fontWeight={700} fill={C.lime} fontFamily="Space Grotesk">Cash Cow</text>
          <text x={midX + 16} y={BY1 - 20} fontSize={30} fontWeight={700} fill={C.violet} fontFamily="Space Grotesk">Dog</text>
          <text x={BX0 + 16} y={gy(GROWTH_CUTOFF) - 12} fontSize={20} fill={C.grey} fontFamily="Inter">10% growth cut-off</text>
          <text x={(BX0 + BX1) / 2} y={BY1 + 46} textAnchor="middle" fontSize={24} fontWeight={600} fill={C.text} fontFamily="Inter">Relative market share · high ← 1.0 → low</text>
          <text transform={`translate(${BX0 - 80} ${(BY0 + BY1) / 2}) rotate(-90)`} textAnchor="middle" fontSize={24} fontWeight={600} fill={C.text} fontFamily="Inter">Market growth (CAGR FY24–29P)</text>
        </g>
        {/* "share not measurable" band: every unit assumed ≪ 1 */}
        <rect x={midX + 140} y={BY0 + 60} width={BX1 - midX - 160} height={BY1 - BY0 - 100} rx={18} fill="none" stroke={C.violet} strokeWidth={2.5} strokeDasharray="10 10" opacity={band} />
        <text x={(midX + 140 + BX1 - 20) / 2} y={BY1 - 56} textAnchor="middle" fontSize={20} fill={C.violet} opacity={band} fontFamily="Inter">share assumed ≪ 1 · not measured</text>
        {BCG.map((u, i) => {
          const p = interpolate(f, [growAt[i], growAt[i] + 14], [0, 1], clamp);
          const y0 = gy(u.growth[0]), y1 = gy(u.growth[1]);
          return (
            <g key={u.unit} opacity={p}>
              {y0 !== y1 && <line x1={xs[i]} y1={y0} x2={xs[i]} y2={y1} stroke={UC[i]} strokeWidth={10} strokeLinecap="round" opacity={0.55} />}
              <circle cx={xs[i]} cy={(y0 + y1) / 2} r={16} fill={UC[i]} style={{ filter: `drop-shadow(0 0 10px ${alpha(UC[i], 0.8)})` }} />
              <text x={anchorEnd[i] ? xs[i] - 26 : xs[i] + 24} y={(y0 + y1) / 2 + 8} textAnchor={anchorEnd[i] ? 'end' : 'start'} fontSize={24} fontWeight={600} fill={C.text} fontFamily="Inter">{u.unit.split(' /')[0]}</text>
            </g>
          );
        })}
      </svg>
      {/* classification panel */}
      <div style={{ position: 'absolute', left: 1330, top: 250, width: 490, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {BCG.map((u, i) => (
          <Pop key={u.unit} at={wordAt(l3, i === 2 ? 'provisional Dog' : 'Question Marks') + i * 4} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', padding: '22px 26px', borderColor: alpha(UC[i], 0.55) }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: UC[i] }}>{u.unit}</div>
              <div style={{ fontSize: 22, marginTop: 6 }}>Growth {u.growth[0] === u.growth[1] ? `${u.growth[0]}%` : `${u.growth[0]}–${u.growth[1]}%`} · <b>{u.quad}</b></div>
              <div className="muted" style={{ fontSize: 21, marginTop: 4 }}>→ {u.action}</div>
            </div>
          </Pop>
        ))}
        <Reveal at={wordAt(l3, 'no Stars')} style={{ position: 'relative' }}>
          <div className="muted" style={{ fontSize: 21, lineHeight: 1.4 }}>No Stars or Cash Cows: normal for an early-stage brand. Followers and product counts are <b style={{ color: C.text }}>not</b> market share.</div>
        </Reveal>
      </div>
      <div className="muted" style={{ position: 'absolute', left: BX0, top: 1000, fontSize: 18 }}>Growth: Technopak, Aug 2025 (sets 10.7%, mix &amp; match 15.5%, sarees 8.3%). Co-ords shown as a range; kurtis sit in mix &amp; match.</div>
    </AbsoluteFill>
  );
};

// ─── 6 · GE–McKinsey
const ScoreTable: React.FC<{ title: string; rows: typeof ATTRACT; at: number; color: string }> = ({ title, rows, at, color }) => {
  const f = useCurrentFrame();
  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', padding: '16px 28px', background: alpha(C.text, 0.04), fontSize: 20, fontWeight: 600, letterSpacing: '0.08em', color: C.grey }}>
        <div style={{ width: 640, color }}>{title.toUpperCase()}</div><div style={{ width: 160, textAlign: 'right' }}>WEIGHT</div>
        {UNITS.map((u, i) => <div key={u} style={{ width: 280, textAlign: 'right', color: UC[i] }}>{u.toUpperCase()}</div>)}
      </div>
      {rows.map((r, k) => {
        const p = interpolate(f, [at + k * 8, at + k * 8 + 10], [0, 1], clamp);
        return (
          <div key={r.c} style={{ display: 'flex', alignItems: 'center', padding: '13px 28px', borderTop: `1px solid ${C.line}`, fontSize: 27, opacity: 0.2 + 0.8 * p }}>
            <div style={{ width: 640 }}>{r.c}</div><div style={{ width: 160, textAlign: 'right' }} className="muted">{r.w}%</div>
            {r.s.map((s, i) => <div key={i} style={{ width: 280, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{s}</div>)}
          </div>
        );
      })}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 28px', borderTop: `2px solid ${alpha(color, 0.5)}`, fontSize: 30, fontWeight: 700, opacity: interpolate(f, [at + rows.length * 8, at + rows.length * 8 + 12], [0, 1], clamp) }}>
        <div style={{ width: 640 }}>Weighted score</div><div style={{ width: 160, textAlign: 'right' }} className="muted">100%</div>
        {UNITS.map((u, i) => <div key={u} style={{ width: 280, textAlign: 'right', color: UC[i] }}>{weighted(rows, i).toFixed(2)}</div>)}
      </div>
    </div>
  );
};

const GX0 = 330, GX1 = 1110, GY0 = 260, GY1 = 900;
const sx = (s: number) => GX0 + ((s - 1) / 4) * (GX1 - GX0);
const ay = (a: number) => GY1 - ((a - 1) / 4) * (GY1 - GY0);
export const Ge: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const tablesOut = interpolate(f, [l3.from - 8, l3.from + 4], [1, 0], clamp);
  const t1Out = interpolate(f, [l2.from - 8, l2.from + 2], [1, 0], clamp);
  const mid = useLit(l4.from, 16);
  const cell = (cx: number, cy: number) => {
    const v = cx + cy;   // 0..4 (strength band + attractiveness band)
    return v >= 3 ? [C.green, 'Invest / grow'] : v === 2 ? [C.cyan, 'Selectively invest'] : [C.violet, 'Harvest / reposition'];
  };
  const bandW = (GX1 - GX0) / 3, bandH = (GY1 - GY0) / 3;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <Heading step="Framework 3 · GE–McKinsey" title="Attractiveness × strength" color={C.lime} />
      <Reveal at={l0.from} out={l1.from - 6} style={{ left: 110, top: 280, width: 1700 }}>
        <div style={{ fontSize: 40, lineHeight: 1.4 }}>BCG uses <b style={{ color: C.violet }}>two</b> measures. GE–McKinsey weighs <b style={{ color: C.lime }}>twelve</b>, split into</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 40 }}>
          {['Industry attractiveness · 6 criteria', 'Competitive strength · 6 criteria'].map((t, i) => <div key={t} className="chip" style={{ fontSize: 36, padding: '20px 36px', borderColor: alpha([C.cyan, C.lime][i], 0.6) }}>{t}</div>)}
        </div>
        <div className="muted" style={{ fontSize: 26, marginTop: 40 }}>Scale 1–5 · weights add to 100% per dimension · attractiveness: medium confidence · strength: low confidence (no internal data)</div>
      </Reveal>
      <div style={{ position: 'absolute', inset: 0, opacity: tablesOut }}>
        <div style={{ position: 'absolute', left: 110, top: 250, width: 1700, opacity: t1Out }}><Reveal at={l1.from - 4} style={{ position: 'relative' }}><ScoreTable title="Industry attractiveness" rows={ATTRACT} at={l1.from} color={C.cyan} /></Reveal></div>
        <div style={{ position: 'absolute', left: 110, top: 250, width: 1700 }}><Reveal at={l2.from} style={{ position: 'relative' }}><ScoreTable title="Competitive strength" rows={STRENGTH} at={l2.from + 4} color={C.lime} /></Reveal></div>
      </div>
      <Reveal at={l3.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          {[0, 1, 2].map((cx) => [0, 1, 2].map((cy) => {
            const [c] = cell(cx, cy), isMid = cx === 1 && cy === 1;
            return <rect key={`${cx}${cy}`} x={GX0 + cx * bandW + 3} y={GY1 - (cy + 1) * bandH + 3} width={bandW - 6} height={bandH - 6} rx={12} fill={alpha(c as string, 0.08 + (isMid ? 0.1 * mid : 0))} stroke={alpha(c as string, isMid ? 0.3 + 0.6 * mid : 0.3)} strokeWidth={isMid ? 2 + 2 * mid : 1.5} />;
          }))}
          {[0, 1, 2].map((cx) => [0, 1, 2].map((cy) => {
            const [c, t] = cell(cx, cy);
            return <text key={`t${cx}${cy}`} x={GX0 + cx * bandW + 14} y={GY1 - cy * bandH - 16} fontSize={18} fill={c as string} opacity={0.8} fontFamily="Inter">{t}</text>;
          }))}
          <g fontFamily="Inter" fill={C.grey} fontSize={20}>
            {['Low', 'Medium', 'High'].map((t, i) => <text key={t} x={GX0 + (i + 0.5) * bandW} y={GY1 + 32} textAnchor="middle">{t}</text>)}
            {['Low', 'Medium', 'High'].map((t, i) => <text key={`y${t}`} x={GX0 - 16} y={GY1 - (i + 0.5) * bandH + 6} textAnchor="end">{t}</text>)}
          </g>
          <text x={(GX0 + GX1) / 2} y={GY1 + 70} textAnchor="middle" fontSize={24} fontWeight={600} fill={C.text} fontFamily="Inter">Competitive strength →</text>
          <text transform={`translate(${GX0 - 110} ${(GY0 + GY1) / 2}) rotate(-90)`} textAnchor="middle" fontSize={24} fontWeight={600} fill={C.text} fontFamily="Inter">Industry attractiveness →</text>
          {UNITS.map((u, i) => {
            const a = weighted(ATTRACT, i), s = weighted(STRENGTH, i), p = interpolate(f, [wordAt(l3, ['Co-ords', 'Kurta sets', 'Sarees'][i]), wordAt(l3, ['Co-ords', 'Kurta sets', 'Sarees'][i]) + 14], [0, 1], { ...clamp, easing: ease });
            return (
              <g key={u} opacity={p}>
                <circle cx={sx(s)} cy={ay(a)} r={18} fill={UC[i]} style={{ filter: `drop-shadow(0 0 10px ${alpha(UC[i], 0.8)})` }} />
                              </g>
            );
          })}
        </svg>
        <div style={{ position: 'absolute', left: 1250, top: 270, width: 570, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {UNITS.map((u, i) => (
            <Pop key={u} at={wordAt(l3, ['Co-ords', 'Kurta sets', 'Sarees'][i])} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', padding: '20px 26px', borderColor: alpha(UC[i], 0.55) }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: UC[i], display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ width: 20, height: 20, borderRadius: 10, background: UC[i], boxShadow: `0 0 10px ${UC[i]}` }} />{u}</div>
                <div style={{ fontSize: 22, marginTop: 6 }}>Attractiveness <b>{weighted(ATTRACT, i).toFixed(2)}</b> · Strength <b>{weighted(STRENGTH, i).toFixed(2)}</b></div>
                <div className="muted" style={{ fontSize: 20, marginTop: 4 }}>{['Centre, nearest invest/grow', 'Centre, nearest harvest: prune', 'Centre: focused, regional'][i]}</div>
              </div>
            </Pop>
          ))}
          <Reveal at={l4.from} style={{ position: 'relative' }}>
            <div style={{ fontSize: 24, lineHeight: 1.4 }}><b style={{ color: C.cyan }}>All three in the middle band.</b> <span className="muted">No category has earned heavy investment yet; strength must be proven.</span></div>
          </Reveal>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 7 · Synthesis
export const Synthesis: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1, l2] = lines;
  const agree = useLit(wordAt(l1, 'agree'), 14), differ = useLit(wordAt(l2, 'disagree'), 14);
  const rows = [
    ['SWOT', ['Hero line (SO)', 'Prune (WT)', 'Kerala strength (S)']],
    ['BCG', ['Question Mark', 'Question Mark, crowded', 'Dog (provisional)']],
    ['GE–McKinsey', ['3.60 / 3.40 · top', '3.25 / 2.75 · lowest', '3.40 / 3.15 · middle']],
    ['Verdict', ['Focus here', 'Narrow to bestsellers', 'Focused Kerala line']],
  ] as const;
  const hi = [agree, agree, differ], hc = [C.green, C.green, C.violet];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.green} glow2={C.violet} />
      <Heading step="Synthesis" title="Where the frameworks agree, and where they don't" />
      <Reveal at={l0.from} style={{ left: 110, top: 250, width: 1700 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px repeat(3, 1fr)', gap: 16 }}>
          <div />
          {UNITS.map((u, i) => (
            <div key={u} style={{ padding: '14px 20px', borderRadius: 16, border: `2px solid ${alpha(hc[i], 0.15 + 0.75 * hi[i])}`, boxShadow: `0 0 40px ${alpha(hc[i], 0.18 * hi[i])}`, fontSize: 30, fontWeight: 700, color: UC[i] }}>
              {u}{hi[i] > 0.5 && <span style={{ float: 'right', fontSize: 18, color: hc[i] }}>{i < 2 ? 'AGREE' : 'DIFFER'}</span>}
            </div>
          ))}
          {rows.map(([fw, cells], r) => (
            <React.Fragment key={fw}>
              <div className="head" style={{ fontSize: 30, padding: '24px 0', color: r === 3 ? C.lime : C.text }}>{fw}</div>
              {cells.map((c, i) => (
                <Pop key={c} at={l0.from + 6 + r * 8 + i * 3} style={{ position: 'relative' }}>
                  <div className="card" style={{ position: 'relative', padding: '24px 22px', fontSize: 28, fontWeight: r === 3 ? 700 : 500, color: r === 3 ? C.lime : C.text, borderColor: r === 3 ? alpha(C.lime, 0.5) : C.line }}>{c}</div>
                </Pop>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 8 · Priorities and 90-day plan
export const Plan: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const [l0, l1, l2, l3, l4] = lines;
  const out = interpolate(f, [l4.from - 8, l4.from + 4], [1, 0], clamp);
  const pAt = [l1.from - 4, l2.from - 4, l3.from - 4];
  const phaseAt = [wordAt(l4, 'measure'), wordAt(l4, 'test'), wordAt(l4, 're-score')];
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.lime} glow2={C.cyan} />
      <div style={{ position: 'absolute', inset: 0, opacity: out }}>
        <Heading step="Recommendation" title="Three strategic priorities" color={C.lime} />
        <div style={{ position: 'absolute', left: 110, top: 260, display: 'flex', flexDirection: 'column', gap: 26, width: 1700 }}>
          {PRIORITIES.map((p, i) => (
            <Pop key={p.n} at={pAt[i]} style={{ position: 'relative' }}>
              <div className="card" style={{ position: 'relative', padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 34, borderColor: alpha(C.lime, 0.5) }}>
                <div className="head" style={{ width: 110, height: 110, borderRadius: 28, display: 'grid', placeItems: 'center', fontSize: 64, color: C.bg, background: C.lime, flex: 'none' }}>{p.n}</div>
                <div><div className="head" style={{ fontSize: 46 }}>{p.t}</div><div className="muted" style={{ fontSize: 28, marginTop: 8 }}>{p.d}</div></div>
              </div>
            </Pop>
          ))}
        </div>
        <Reveal at={l0.from + 10} style={{ left: 110, top: 960 }}><div className="muted" style={{ fontSize: 22 }}>Recommendations, not current capabilities · re-score once real data arrives</div></Reveal>
      </div>
      <Reveal at={l4.from - 4} dir="none" style={{ left: 0, top: 0, width: 1920, height: 1080 }}>
        <Heading step="Roadmap" title="The next 90 days" color={C.cyan} at={l4.from - 4} />
        <svg width={1920} height={1080} style={{ position: 'absolute' }}>
          <line x1={110} y1={300} x2={110 + 1700 * interpolate(f, [l4.from, l4.from + 60], [0, 1], clamp)} y2={300} stroke={C.cyan} strokeWidth={4} style={{ filter: `drop-shadow(0 0 8px ${C.cyan})` }} />
        </svg>
        <div style={{ position: 'absolute', left: 110, top: 270, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, width: 1700 }}>
          {PLAN.map((ph, i) => (
            <Pop key={ph.d} at={phaseAt[i]} style={{ position: 'relative' }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: [C.cyan, C.violet, C.lime][i], boxShadow: `0 0 20px ${[C.cyan, C.violet, C.lime][i]}` }} />
              <div className="card" style={{ position: 'relative', marginTop: 30, padding: 34, height: 520, borderColor: alpha([C.cyan, C.violet, C.lime][i], 0.55) }}>
                <div className="eyebrow" style={{ color: [C.cyan, C.violet, C.lime][i] }}>{ph.d}</div>
                <div className="head" style={{ fontSize: 54, marginTop: 6 }}>{ph.t}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26 }}>
                  {ph.items.map((it) => <div key={it} style={{ display: 'flex', gap: 12, fontSize: 27, lineHeight: 1.3 }}><Check size={30} color={[C.cyan, C.violet, C.lime][i]} style={{ flex: 'none' }} />{it}</div>)}
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

// ─── 9 · Close
export const Close: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const [l0, l1] = lines;
  const eps = [['PESTEL', C.cyan], ['Five Forces', C.violet], ['Positioning', C.lime], ['Customers & market', C.green], ['Portfolio strategy', C.cyan]] as const;
  return (
    <AbsoluteFill className="stage">
      <Backdrop glow={C.cyan} glow2={C.lime} />
      <Reveal at={l0.from} style={{ left: 0, top: 180, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 84, lineHeight: 1.1 }}>Strategy is choosing<br /><span style={{ color: C.lime }}>where not to spend.</span></div>
      </Reveal>
      <div style={{ position: 'absolute', left: 110, top: 520, display: 'flex', gap: 20 }}>
        {eps.map(([t, c], i) => (
          <Pop key={t} at={l1.from + i * 5} style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'relative', width: 324, padding: 24, borderColor: alpha(c, i === 4 ? 0.8 : 0.35), boxShadow: i === 4 ? `0 0 40px ${alpha(c, 0.2)}` : 'none' }}>
              <div className="eyebrow" style={{ color: c, fontSize: 18 }}>Episode {i + 1}</div>
              <div className="head" style={{ fontSize: 30, marginTop: 4 }}>{t}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Reveal at={l1.from + 40} style={{ left: 0, top: 740, width: 1920, textAlign: 'center' }}>
        <div className="head" style={{ fontSize: 110, letterSpacing: '-0.02em' }}>Aalayam</div>
        <div style={{ fontSize: 24, letterSpacing: '0.5em', color: C.cyan, marginTop: 12, fontWeight: 500 }}>BY ANAMIKA · BUSINESS RESEARCH SERIES · EPISODE 5</div>
      </Reveal>
    </AbsoluteFill>
  );
};
