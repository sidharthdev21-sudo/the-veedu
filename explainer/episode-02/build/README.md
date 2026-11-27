# Episode 02: motion-graphics build

These files produce `../the-veedu-episode-02.mp4`: 1920×1080, 30 fps, 120 s, with an AI voiceover, a music bed and a soft English subtitle track. The pipeline is the same as Episode 01 (see `../../episode-01/build/README.md`).

- `vo.py`: the voiceover script (Kokoro TTS, `af_heart` voice, speed 1.06). Place names are respelled for the TTS; the subtitles use the correct spelling.
- `build.py`: scene timing from the voiceover, the soundtrack (music ducks under the voice and dips at "a little away"; a low tone sits under the closing question) and `episode-02.srt`.
- `episode-02.html`: the motion graphics. Open it in a browser to preview; add `?t=<seconds>` to the URL to jump to a time. The provider cards, sentiment counts and map positions are defined at the top of the script, and they match `../EPISODE-02-RESEARCH-AND-PRODUCTION.md` §2, §4 and §5.
