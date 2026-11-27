# Episode 04: build

`../the-veedu-episode-04.mp4`: 1920×1080, 30 fps, about 119 s, with an AI voiceover (Kokoro `af_heart`, speed 1.1), a music bed and soft subtitles. The pipeline is the same as Episodes 01–03: `vo.py`, then `build.py <vo_dir>`, then a Playwright frame render muxed with ffmpeg. The RICE inputs, GE–McKinsey placements and architecture nodes are defined at the top of the script in `episode-04.html`, and they match `../EPISODE-04-PRODUCT-STRATEGY.md`.
