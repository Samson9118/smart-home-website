import { Font } from '@react-pdf/renderer';

let isRegistered = false;

export function registerPdfFonts(): void {
  if (isRegistered) return;

  // In Next.js client-side, fonts from public/fonts/ are available at /fonts/...
  const isBrowser = typeof window !== 'undefined';
  const baseUrl = isBrowser && window.location?.origin ? window.location.origin : '';

  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: `${baseUrl}/fonts/Roboto-Regular.ttf`,
        fontWeight: 'normal',
      },
      {
        src: `${baseUrl}/fonts/Roboto-Bold.ttf`,
        fontWeight: 'bold',
      },
    ],
  });

  isRegistered = true;
}
