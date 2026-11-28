import { continueRender, delayRender, staticFile } from 'remotion';

// Self-hosted variable fonts (SIL Open Font License, see public/fonts/). Rendering waits until they are loaded.
const FONTS: [string, string][] = [
  ['Space Grotesk', 'fonts/SpaceGrotesk.ttf'],
  ['Inter', 'fonts/Inter.ttf'],
];
const handle = delayRender('Loading fonts');
Promise.all(
  FONTS.map(([family, file]) => new FontFace(family, `url(${staticFile(file)})`, { weight: '300 700' }).load().then((f) => document.fonts.add(f))),
)
  .then(() => continueRender(handle))
  .catch((err) => { console.error(err); continueRender(handle); });
