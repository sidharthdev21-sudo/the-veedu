# Episode 4: Customer sentiment and TAM, SAM, SOM · Aalayam by Anamika

A 4 min 57 s explainer (1920 × 1080, 30 fps) in the exact dark palette, built with **Remotion** and **React**. Earlier episodes are separate projects and are unchanged.

| Deliverable | File |
|---|---|
| Rendered video | `out/aalayam-episode-4.mp4` |
| Storyboard and voiceover script | `docs/storyboard.md` (subtitles: `out/narration.srt`) |
| Review examples, methodology, pain points, TAM/SAM/SOM with formulas, recommendations | `docs/sentiment-and-market-sizing.md` |
| Stills | `deliverables/*.png` |
| Original review package | `docs/review-package.md` |

## Structure

```
src/data.ts                 every figure and example the video shows (edit here, then re-render)
src/scenes/Customers.tsx    intro, review examples, sources, sentiment method, insights → opportunities
src/scenes/Market.tsx       why market sizing, TAM, SAM, SOM, top-down vs bottom-up, close
src/components/             dark UI pieces, evidence chips, icons, animation helpers (from Episodes 1 and 3)
scripts/build_audio.py      timeline, music and mix mastered to −14 LUFS
```

To update the SOM with real numbers, change `SOM` in `src/data.ts` (and the narration line, if the totals change), then:

```sh
npm install
python scripts/build_audio.py          # only if the narration changed
npx remotion render Episode4 out/aalayam-episode-4.mp4
```
