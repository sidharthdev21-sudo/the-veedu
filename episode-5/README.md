# Episode 5 · Strategic portfolio analysis: SWOT, BCG & GE–McKinsey

Aalayam by Anamika, Business Research Series. A 4 min 10 s explainer (1920 × 1080, 30 fps) in the Episode 4 dark palette, built with **Remotion** and **React**. Earlier episodes are separate folders and are unchanged.

| Deliverable | File |
|---|---|
| Research report: inputs, evidence labels, SWOT, TOWS, BCG, GE scoring, synthesis, top three priorities, experiments, 90-day plan, missing data, sources | `docs/research-report.md` |
| Storyboard and narration | `docs/storyboard.md` (subtitles: `out/narration.srt`) |
| Rendered video | `out/aalayam-episode-5.mp4` |
| Matrix stills | `deliverables/*.png` |

## Structure

```
src/data.ts                    SWOT, TOWS, BCG, GE criteria and scores, priorities, 90-day plan (edit here)
src/scenes/Diagnosis.tsx       recap, strategic question, SWOT, TOWS
src/scenes/Portfolio.tsx       BCG matrix, GE scoring and 9-box, synthesis, priorities and roadmap, close
src/components/                dark UI, evidence chips, icons, animation helpers (from Episodes 1, 3 and 4)
scripts/narration.json         narration (on-screen and spoken spellings)
scripts/build_audio.py         timeline, music and mix (−14 LUFS)
```

GE weighted scores are calculated from `ATTRACT` and `STRENGTH` in `src/data.ts`, so changing a score or weight updates the tables and the 9-box together. When Aalayam's real sales and share data arrive, update `BCG` and the strength scores and re-render:

```sh
npm install
npx remotion render Episode5 out/aalayam-episode-5.mp4
```
