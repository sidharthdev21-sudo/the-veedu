# Who Aalayam competes with: four levels of competition and perceptual mapping

Part 3 of the Aalayam by Anamika business research series. A 3 min 45 s explainer (1920 × 1080, 30 fps) in the dark research style of Part 1 (`../pestel-research`), built with **Remotion** and **React**. Its content comes from the Part 3 analysis page (`../competitive-positioning/index.html`).

| | File |
|---|---|
| Rendered video | `out/aalayam-positioning.mp4` |
| Storyboard | `docs/storyboard.md` |
| Voiceover script | `docs/voiceover.md` (subtitles: `out/narration.srt`) |
| Stills | `deliverables/four-levels.png`, `competitor-matrix.png`, `perceptual-map-price-design.png`, `perceptual-map-reach-comfort.png`, `recommendations.png` |

## Structure

```
src/
  data.ts                  everything the video states: levels, matrix rows, map placements, positioning, recommendations
  Video.tsx, Root.tsx      scenes in sequence + the soundtrack; five stills
  components/
    Positioning.tsx        evidence chips, hypothesis banner, map axes, points, Aalayam's proposed ring, zones
    ui.tsx, anim.tsx, Icons.tsx   reused from the Part 1 research video
  scenes/
    Opening.tsx            series recap; how we researched it
    Levels.tsx             the four levels of competition
    Analysis.tsx           competitor matrix; map 1 (price × design); map 2 (reach × comfort)
    Closing.tsx            insights and positioning; recommendations; next steps
scripts/
  narration.json           the script (on-screen and spoken spellings)
  build_audio.py           timeline, music and mix mastered to −14 LUFS
```

To update a price or a placement, edit `src/data.ts` and re-render. When customer survey results arrive, replace the `MAP1`/`MAP2` placements with the survey averages and remove the hypothesis banner.

## Rebuild

```sh
npm install
python scripts/build_audio.py        # needs one WAV per line id in audio/voice/
npx remotion render Positioning out/aalayam-positioning.mp4
npx remotion still PerceptualMap1 deliverables/perceptual-map-price-design.png
```
