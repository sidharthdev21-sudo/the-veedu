# How we conducted a PESTEL analysis: Aalayam by Anamika

An animated explainer (1920 × 1080, 30 fps, about 3 min 56 s) showing how the PESTEL research for Aalayam by Anamika was done, from understanding the business to business insights. Built with **Remotion** and **React**.

## Deliverables

| | File |
|---|---|
| Rendered video | `out/aalayam-pestel-research.mp4` |
| Scene-by-scene storyboard | `docs/storyboard.md` |
| Full voiceover script | `docs/voiceover.md` (subtitles: `out/narration.srt`) |
| Research methodology flowchart | `deliverables/methodology-flowchart.png` |
| Research toolkit visual | `deliverables/research-toolkit.png` |
| PESTEL findings and business implications | `deliverables/findings-and-implications.png`, `docs/findings.md` |

## Structure

```
src/
  Root.tsx                 the video plus three stills (flowchart, toolkit, findings)
  Video.tsx                one <Sequence> per scene, the soundtrack, scene transitions
  timeline.json            when each scene and spoken line starts (generated from the voice clips)
  theme.ts, styles.css     the palette from the brief, fonts, card/chip/badge styles
  components/
    ui.tsx                 backdrop, headings, icon badges, Used / Recommended badges, typing text, word timing
    FactorScene.tsx        shared PESTEL layout: investigated → discovered → why it matters
    Icons.tsx              generic line icons
    anim.tsx               Reveal, Pop, springs and easing
  scenes/
    Intro.tsx              introduction
    Approach.tsx           research methodology (STEPS holds the four steps)
    Toolkit.tsx            research tools (TOOLS = used, RECOMMENDED = suggested next)
    Dimensions.tsx         the six PESTEL dimensions (DIMENSIONS holds all findings and recommendations)
    Insights.tsx           findings → potential recommendations
    Conclusion.tsx         the research journey
    FlowchartPoster.tsx    stand-alone methodology flowchart
scripts/
  narration.json           the script, line by line (on-screen spelling and spoken spelling)
  build_audio.py           timeline + original music + mix mastered to −14 LUFS
  stills.mjs               review stills
```

To change content, edit the data at the top of each scene (`STEPS`, `TOOLS`, `RECOMMENDED`, `DIMENSIONS`, `JOURNEY`). The video and the poster stills read the same data, so they stay consistent.

## Rebuild

```sh
npm install
# 1. voice: one WAV per line id in audio/voice/ (Kokoro was used; a recorded voice works the same way)
# 2. timeline, music and mix
python scripts/build_audio.py
# 3. preview, render the video and the stills
npx remotion studio
npx remotion render PestelResearch out/aalayam-pestel-research.mp4
npx remotion still MethodologyFlowchart deliverables/methodology-flowchart.png
npx remotion still ResearchToolkit deliverables/research-toolkit.png
npx remotion still FindingsAndImplications deliverables/findings-and-implications.png
```

Animation is driven frame by frame in React (`useCurrentFrame`, `interpolate`, `spring`), not CSS keyframes, so every render is identical; CSS handles layout and styling. Remotion encodes the MP4 with its bundled FFmpeg.
