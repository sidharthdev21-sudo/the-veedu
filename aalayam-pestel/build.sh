#!/bin/sh
# AALAYAM — PESTEL on the Board. Rebuilds the film from this folder and the Lemo-Opuscar library.
#   sh build.sh          (LIB = the library folder; voice lines are kept in voices/, see lines.json)
#   sh build.sh --vo     also re-synthesises the voice and its word timings
set -e
LIB=${LIB:-/root/lemo-opuscar}; export LIB
HERE=$(cd "$(dirname "$0")" && pwd); PY="$LIB/.venv/bin/python"
[ -f "$LIB/core/render/video.mjs" ] || { echo "set LIB to the Lemo-Opuscar library folder"; exit 1; }
sh "$HERE/tools/fonts.sh"
mkdir -p "$HERE/out"
cd "$LIB"
if [ "$1" = "--vo" ]; then
  $PY core/tts/tts.py "$HERE/lines.json" "$HERE/voices"
  $PY "$HERE/tools/align.py" "$HERE"
fi
node core/render/events.mjs "$HERE"
$PY "$HERE/music.py"
$PY "$HERE/mix.py"
node core/render/video.mjs "$HERE" --fps 24 --workers 4 --out "$HERE/out/video.mp4"
# mux (ffmpeg 6 is fine here: mix.py already mastered the audio to −14 LUFS / −1 dBTP)
ffmpeg -y -loglevel error -i "$HERE/out/video.mp4" -i "$HERE/out/mix.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$HERE/aalayam-pestel.mp4"
node "$HERE/tools/subs.mjs" "$HERE" && $PY core/render/srt.py "$HERE/out/subs.json" "$HERE/subtitles_en.srt"
node core/render/still.mjs "$HERE" 77.6 --q nosubs=1 --prefix poster_ --out "$HERE/out" && cp "$HERE/out/poster_77.6.jpg" "$HERE/poster.jpg"
# 9:16 Reel: the same timeline on a tall board (film.js picks the layout from the frame size)
node core/render/events.mjs "$HERE" --size 1080x1920 --out "$HERE/events_v.json"
EVENTS=events_v.json MIXOUT=mix_v.wav $PY "$HERE/mix.py"
node core/render/video.mjs "$HERE" --size 1080x1920 --fps 24 --workers 4 --out "$HERE/out/video_v.mp4"
ffmpeg -y -loglevel error -i "$HERE/out/video_v.mp4" -i "$HERE/out/mix_v.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$HERE/aalayam-pestel-reel.mp4"
node core/render/still.mjs "$HERE" 77.6 --size 1080x1920 --q nosubs=1 --prefix poster_v_ --out "$HERE/out" && cp "$HERE/out/poster_v_77.6.jpg" "$HERE/poster-reel.jpg"
echo "built $HERE/aalayam-pestel.mp4 and $HERE/aalayam-pestel-reel.mp4"
