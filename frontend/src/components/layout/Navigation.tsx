'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: '首页', labelEn: 'Home' },
  { href: '/films', label: '电影', labelEn: 'Films' },
  { href: '/characters', label: '人物', labelEn: 'Characters' },
  { href: '/graph', label: '知识图谱', labelEn: 'Graph' },
  { href: '/about', label: '关于', labelEn: 'About' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(zh-CN|en-US)/);
  const locale = localeMatch ? localeMatch[1] : 'zh-CN';

  const switchLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  const localeLabel = locale === 'zh-CN' ? 'EN' : '中文';

  return (
    <nav className="bg-starwars-blue/90 backdrop-blur-md border-b border-starwars-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            {/* Star Wars icon */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-8 h-8 text-starwars-gold transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-starwars-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-starwars-gold font-bold text-xl tracking-wider">Star Wars Wiki</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const href = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(`/${locale}${link.href}`));
              const linkLabel = locale === 'zh-CN' ? link.label : link.labelEn;

              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'text-starwars-gold bg-starwars-black/40'
                      : 'text-starwars-white/80 hover:text-starwars-gold hover:bg-starwars-black/30'
                  }`}
                >
                  {linkLabel}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-starwars-gold rounded-full" />
                  )}
                  {/* Hover underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-starwars-gold scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''}`} />
                </Link>
              );
            })}
          </div>

          {/* Right side - Language Toggle + Mobile menu */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <Link
              href={pathname.replace(`/${locale}`, `/${switchLocale}`)}
              className="px-3 py-1.5 rounded border border-starwars-gold/50 text-starwars-gold text-sm font-medium hover:bg-starwars-gold/10 hover:border-starwars-gold transition-all duration-200 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {localeLabel}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-starwars-white/80 hover:text-starwars-gold hover:bg-starwars-black/30 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-starwars-gold/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const href = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(`/${locale}${link.href}`));
                const linkLabel = locale === 'zh-CN' ? link.label : link.labelEn;

                return (
                  <Link
                    key={link.href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-starwars-gold bg-starwars-black/40'
                        : 'text-starwars-white/80 hover:text-starwars-gold hover:bg-starwars-black/30'
                    }`}
                  >
                    {linkLabel}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}