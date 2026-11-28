# Final film: build

`../the-veedu-case-study.mp4`: 1920×1080, 30 fps, 4:49, with a first-person AI voiceover (Kokoro `af_heart`, speed 1.0), a synthesised score and soft English subtitles (`the-veedu-case-study.srt`).

1. `python3 vo.py <model.onnx> <voices.bin> <vo_dir>`: the 12-scene narration, with sentence timestamps.
2. `python3 build.py <vo_dir>`: scene timing, soundtrack, subtitles and `mapdata.js` (from `kerala-districts.json`; regenerate it with `geo2svg.py` from the geohacker/kerala district GeoJSON).
3. Render `the-veedu-case-study.html` frame by frame with Playwright and pipe the frames to ffmpeg with `soundtrack.wav` and the `.srt` file. The method is the same as Episodes 01–04.

Open the HTML in a browser to preview it; add `?t=<seconds>` to the URL to jump to a time. To use a human voiceover, record `vo_1.wav` … `vo_12.wav`, update `vo.json` with each clip's duration and sentence start times, and re-run `build.py`.
