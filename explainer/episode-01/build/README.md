# Episode 01: motion-graphics build

These files produce `../the-veedu-episode-01.mp4`: 1920×1080, 30 fps, about 89 s, with an AI voiceover, a music bed and a soft English subtitle track.

| File | What it does |
|---|---|
| `vo.py` | Generates the voiceover with [Kokoro](https://github.com/thewh1teagle/kokoro-onnx), an open-weight TTS model, using the `af_heart` voice. It writes one clip per scene plus sentence timestamps. Place names are respelled phonetically for the TTS ("Koachee", "Ernaakoolum"). The subtitles show the correct spelling. |
| `build.py` | Lays out the scene timing from the voiceover, then builds the soundtrack: the voice, a synthesised ambient pad that ducks under speech, a drop to near-silence at the "≠" moment, a low drone under the data gap, soft UI ticks and a water texture. It also writes `episode-01.srt`. |
| `episode-01.html` | The motion graphics. Open it in a browser to preview; add `?t=40` to the URL to jump to a time in seconds. |
| `geo2svg.py`, `kerala-districts.json` | Kerala district outlines for the map scenes, converted from the census-based GeoJSON in [geohacker/kerala](https://github.com/geohacker/kerala). |

## Rebuild

```bash
pip install kokoro-onnx soundfile
```

Download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the kokoro-onnx GitHub releases page (`model-files-v1.0`), then run:

```bash
python3 vo.py kokoro-v1.0.onnx voices-v1.0.bin <vo_dir>
```

```bash
python3 build.py <vo_dir>
```

Finally, render the frames with Playwright and pipe them to ffmpeg, together with `soundtrack.wav` and `episode-01.srt`.

To swap in a human voiceover, record one WAV per scene (`vo_1.wav` … `vo_8.wav`), update `vo.json` with each clip's duration and sentence start times, and re-run `build.py`. The scene timings follow the voice.
