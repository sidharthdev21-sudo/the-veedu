# Aalayam by Anamika: PESTEL explainer video

A 2 min 58 s animated explainer (1920 × 1080, 30 fps) of the PESTEL analysis for Aalayam by Anamika, built with **Remotion** and **React**.

- Final video: `out/aalayam-pestel-explainer.mp4`
- Storyboard: `docs/storyboard.md`
- Voiceover script: `docs/voiceover.md` (subtitles: `out/narration.srt`)

## Structure

```
src/
  Root.tsx, Video.tsx        composition: one <Sequence> per scene, the soundtrack, scene transitions
  timeline.json              when every scene and every spoken line starts (generated from the voice clips)
  theme.ts, styles.css       palette (ivory, beige, dark brown, muted rose, white), fonts, card and chip styles
  components/
    SceneShell.tsx           shared factor-scene layout: badge, "means / affects / consider" tracker and text card
    Woman.tsx                the animated character (poses: stand, wave, hold, think, cheer)
    Icons.tsx                factor icons and small line icons
    Garments.tsx             co-ord hanger, saree, clothing rack, line and bar charts, word timing helper
    anim.tsx                 Reveal, Pop, springs and easing
  scenes/                    Intro, Political, Economic, Social, Technological, Environmental, Legal, Conclusion
scripts/
  narration.json             the script, line by line
  build_audio.py             timeline + original music + mix mastered to −14 LUFS
  stills.mjs                 renders review stills
```

## Rebuild

```sh
npm install
# 1. voice (Kokoro, offline): writes audio/voice/<id>.wav — any TTS or a recorded voice works, one file per line id
# 2. timeline, music and mix
python scripts/build_audio.py
# 3. preview and render
npx remotion studio
npx remotion render PestelExplainer out/aalayam-pestel-explainer.mp4
```

To change a line: edit `scripts/narration.json`, regenerate that line's voice clip, rerun `build_audio.py`; the scenes follow the new timing automatically.

Animation is driven frame by frame in React (`useCurrentFrame`, `interpolate`, `spring`) rather than CSS keyframes, so every render is identical; CSS handles layout and styling. Remotion uses its own bundled FFmpeg to encode the MP4.
