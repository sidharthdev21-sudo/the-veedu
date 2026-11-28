import { Config } from '@remotion/cli/config';

// The container ships a Chromium; point Remotion at it instead of downloading one.
Config.setBrowserExecutable('/opt/pw-browsers/chromium-1243/chrome-linux64/chrome');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setConcurrency(4);
Config.setCodec('h264');
Config.setCrf(18);
