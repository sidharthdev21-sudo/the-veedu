import { continueRender, delayRender, staticFile } from 'remotion';

// Self-hosted fonts (SIL Open Font License, see public/fonts/). Rendering waits until they are loaded.
const FONTS: [string, string, string][] = [
  ['DM Serif Display', 'fonts/DMSerifDisplay-Regular.ttf', '400'],
  ['Poppins', 'fonts/Poppins-Regular.ttf', '400'],
  ['Poppins', 'fonts/Poppins-Medium.ttf', '500'],
  ['Poppins', 'fonts/Poppins-SemiBold.ttf', '600'],
];

const handle = delayRender('Loading fonts');
Promise.all(
  FONTS.map(([family, file, weight]) =>
    new FontFace(family, `url(${staticFile(file)})`, { weight }).load().then((f) => document.fonts.add(f)),
  ),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
