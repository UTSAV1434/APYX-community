import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Outfit for headings — loaded via next/font/google
import { Outfit, Playfair_Display } from 'next/font/google';

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
