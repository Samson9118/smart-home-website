import { Font } from '@react-pdf/renderer';
import path from 'node:path';

let isRegistered = false;

export function registerPdfFonts(): void {
  if (isRegistered) return;

  const isBrowser = typeof window !== 'undefined';

  const regularFontPath = isBrowser
    ? `${window.location.origin}/fonts/Roboto-Regular.ttf`
    : path.resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf');

  const boldFontPath = isBrowser
    ? `${window.location.origin}/fonts/Roboto-Bold.ttf`
    : path.resolve(process.cwd(), 'public/fonts/Roboto-Bold.ttf');

  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: regularFontPath,
        fontWeight: 'normal',
      },
      {
        src: boldFontPath,
        fontWeight: 'bold',
      },
    ],
  });

  isRegistered = true;
}
