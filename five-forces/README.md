# Porter's Five Forces: how we analysed the competition · Aalayam by Anamika

Part 2 of the Business Research Explainer Series. A 3 min 57 s animated explainer (1920 × 1080, 30 fps), built with **Remotion** and **React**. It reuses the look and components of Part 1 (`../pestel-explainer`), which is left unchanged.

## Deliverables

| | File |
|---|---|
| Rendered video | `out/aalayam-five-forces.mp4` |
| Scene-by-scene storyboard | `docs/storyboard.md` |
| Full voiceover script | `docs/voiceover.md` (subtitles: `out/narration.srt`) |
| Research methodology | `deliverables/research-methodology.png` (animated in Scene 2) |
| Research sources | `deliverables/research-sources.png` (animated in Scene 3) |
| Five Forces framework | `deliverables/five-forces-framework.png` (animated in Scenes 1 and 4) |
| Business implications and recommendations | `deliverables/business-implications.png`, `docs/findings-and-recommendations.md` |

## Structure

```
src/
  Root.tsx, Video.tsx        the video plus four stills; one <Sequence> per scene; Part 1's scene transition
  timeline.json              when each scene and spoken line starts (generated)
  theme.ts, styles.css, fonts.ts      Part 1 palette and typography (DM Serif Display + Poppins)
  components/
    Series.tsx               FORCES, the Porter diagram, browser frame, Used / Conducted / Suggested badges, Part 2 tag
    ForceScene.tsx           shared six-step layout for each force
    SceneShell.tsx, anim.tsx, Woman.tsx, Icons.tsx, Garments.tsx   reused from Part 1 (+ new icons)
  scenes/
    Recap.tsx                continuing from PESTEL
    Method.tsx               research methodology (STEPS)
    Sources.tsx              where the data came from (SECONDARY, PRIMARY, SUGGESTED)
    Forces.tsx               the five forces (DATA holds every force's content)
    Insights.tsx             force → strategic direction (MAPPING)
    Conclusion.tsx           research journey; PESTEL + Five Forces together
    Posters.tsx              stand-alone methodology, sources and framework stills
scripts/
  narration.json             the script (on-screen and spoken spellings)
  build_audio.py             timeline + Part 1's music + mix mastered to −14 LUFS
```

To add verified findings, edit `observed` (and any other field) in `DATA` in `src/scenes/Forces.tsx`; the video and the posters both read it.

## Rebuild

```sh
npm install
# voice: one WAV per line id in audio/voice/ (Kokoro af_heart was used; a recorded voice works the same way)
python scripts/build_audio.py
npx remotion render FiveForces out/aalayam-five-forces.mp4
npx remotion still ResearchMethodology deliverables/research-methodology.png
npx remotion still ResearchSources deliverables/research-sources.png
npx remotion still FiveForcesFramework deliverables/five-forces-framework.png
npx remotion still BusinessImplications deliverables/business-implications.png
```
