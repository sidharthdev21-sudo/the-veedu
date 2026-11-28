// Render review stills: node scripts/stills.mjs <outDir> <frame> [<frame> …]  (also writes a contact sheet if ffmpeg is present)
import path from 'path';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
const [outDir, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const browserExecutable = '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const composition = await selectComposition({ serveUrl, id: 'Episode8GTM', browserExecutable });
for (const fr of frames) {
  const output = path.resolve(outDir, `f${String(fr).padStart(5, '0')}.jpg`);
  await renderStill({ composition, serveUrl, frame: Number(fr), output, imageFormat: 'jpeg', jpegQuality: 85, browserExecutable });
  console.log(output);
}
