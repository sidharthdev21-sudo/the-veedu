# Episode 03: build

`../the-veedu-episode-03.mp4`: 1920×1080, 30 fps, about 120 s, with an AI voiceover, a music bed and soft subtitles. The pipeline is the same as Episodes 01–02.

1. Run `python3 ../model/model.py`. This is the market and pilot model; it writes `model.json`. The on-screen figures in `episode-03.html` are copied from it, so update both if an input changes.
2. Run `python3 vo.py <model.onnx> <voices.bin> <vo_dir>` to generate the voiceover (Kokoro `af_heart`).
3. Run `python3 build.py <vo_dir>` to build the scene timing, soundtrack and `episode-03.srt`.
4. Render `episode-03.html` frame by frame with Playwright and mux it with ffmpeg, as in Episode 01.
