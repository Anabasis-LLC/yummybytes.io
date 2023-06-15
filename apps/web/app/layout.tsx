// 3rd party
import { Inter, Secular_One, Space_Mono } from 'next/font/google';

// lib
import { Shell } from '../components/shell';

// css
import 'ui/globals.css';

/**
 * Fonts
 */

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const serif = Secular_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-secular-one',
  display: 'swap',
});

const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

/**
 * RootLayout
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <body className="h-full">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
