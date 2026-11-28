# Episode 05: build

`../the-veedu-episode-05.mp4`: 1920×1080, 30 fps, 3:12, with an AI voiceover (Kokoro `af_heart`, speed 1.03), a music bed and soft subtitles.

1. `python3 vo.py <model.onnx> <voices.bin> <vo_dir>`, then `python3 build.py <vo_dir>` to produce the timing, soundtrack, `episode-05.srt` and `mapdata.js`.
2. Render `episode-05.html` frame by frame (as in earlier episodes) to a base video.
3. Overlay the real screen recording `footage/live-site-2026-11-28.mp4` (1152×720) into scene 4's browser frame. Scene 4 starts at 56.68 s:

```
ffmpeg -i base.mp4 -i footage/live-site-2026-11-28.mp4 -filter_complex "[1:v]trim=0:18.5,setpts=PTS-STARTPTS,format=yuva420p,fade=in:st=0.3:d=0.5:alpha=1,fade=out:st=17.9:d=0.5:alpha=1,setpts=PTS+56.68/TB[r];[0:v][r]overlay=96:236:enable='between(t,56.68,75.2)':eof_action=pass,format=yuv420p[v]" -map "[v]" -map 0:a -map 0:s -c:v libx264 -crf 18 -c:a copy -c:s copy out.mp4
```

The recording was made with Playwright against the live GitHub Pages site on 28 Nov 2026, with the site's analytics calls blocked so the test traffic wasn't logged.
