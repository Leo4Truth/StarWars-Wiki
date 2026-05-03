import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StarWars Wiki',
  description: 'A bilingual wiki for the Star Wars franchise',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-starwars-black text-starwars-white min-h-screen">{children}</body>
    </html>
  );
}