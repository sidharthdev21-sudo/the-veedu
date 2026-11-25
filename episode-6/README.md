# Episode 6 · Growth Strategy & Blue Ocean Opportunities

Aalayam by Anamika, Business Research Series. An explainer of about 5 min 47 s (1920 × 1080, 30 fps) covering customer pain points, an interview programme, the Ansoff Matrix, Blue Ocean Strategy and the ERRC grid. It uses the Episode 4–5 dark palette and is built with **Remotion** and **React**. Earlier episodes are separate folders and are unchanged.

| Deliverable | File |
|---|---|
| Research report: evidence labels, customer pain points, interview programme, competitor research, Ansoff and ranking, strategy canvas, Blue Ocean concepts, ERRC, synthesis, recommendation, 90-day roadmap, missing data, sources | `docs/research-report.md` |
| Storyboard and narration | `docs/storyboard.md` (subtitles: `out/narration.srt`) |
| Rendered video | `out/aalayam-episode-6.mp4` |
| Framework stills (12) | `deliverables/*.png` |

## Structure

```
src/data.ts                 pain points, interview questions, Ansoff scores, canvas values, concepts, ERRC, plan (edit here)
src/scenes/Customer.tsx     recap, growth challenge, customer pain points and journey, interview programme
src/scenes/Growth.tsx       Ansoff matrix and ranking, competitive landscape, Blue Ocean concepts, strategy canvas
src/scenes/Strategy.tsx     ERRC grid and value proposition, synthesis, 90-day roadmap, close
scripts/narration.json      narration (on-screen and spoken spellings)
scripts/build_audio.py      timeline, music and mix (−14 LUFS)
```

The ranking is calculated from the `a` and `f` scores in `OPPS`, and the canvas from `CURVES`, so editing `src/data.ts` updates the visuals. Once interview findings or customer ratings exist, replace the estimates and re-render:

```sh
npm install
npx remotion render Episode6 out/aalayam-episode-6.mp4
```
