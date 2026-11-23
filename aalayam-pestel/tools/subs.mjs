// Export the burned-in subtitle timetable → out/subs.json (core/render/srt.py turns it into .srt)
import fs from 'fs'; import path from 'path';
const dir = path.resolve(process.argv[2]);
const { openDemo, closeServer } = await import(path.join(process.env.LIB, 'core/render/page.mjs'));
const { browser, page } = await openDemo(dir);
const subs = await page.evaluate(() => window.SUBS.map(s => ({ t0: +s.t0.toFixed(2), t1: +s.t1.toFixed(2), text: s.text })));
fs.writeFileSync(path.join(dir, 'out/subs.json'), JSON.stringify(subs, null, 1)); console.log('subs', subs.length);
await browser.close(); closeServer();
