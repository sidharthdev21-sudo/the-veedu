const q = new URLSearchParams(location.search);
const W = await import('./engine/wb.js');
W.SCR.w = innerWidth; W.SCR.h = innerHeight;                 // 1920×1080, or 1080×1920 for the vertical cut
const cv = document.getElementById('c'); cv.width = innerWidth; cv.height = innerHeight;
const mod = await import('./film.js');
await document.fonts.load('44px AD');
const F = await mod.build();
const ctx = document.getElementById('c').getContext('2d');
window.DUR = F.dur; window.EV = [...F.ev, { t: 0, type: 'cues', ...F.cues }]; window.SUBS = F.subs || [];
window.render = t => F.render(ctx, t);
window.READY = true;
