'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/films', label: '电影' },
  { href: '/characters', label: '人物' },
  { href: '/graph', label: '知识图谱' },
  { href: '/about', label: '关于' },
];

export default function Navigation() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const switchLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  const localeLabel = locale === 'zh-CN' ? 'English' : '简体中文';

  return (
    <nav className="bg-starwars-blue/80 backdrop-blur-sm border-b border-starwars-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl">🌌</span>
            <span className="text-starwars-gold font-bold text-xl tracking-wider">StarWars Wiki</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href === '/' ? '' : link.href}`;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(`/${locale}${link.href}`));
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-starwars-gold bg-starwars-black/40'
                      : 'text-starwars-white/80 hover:text-starwars-gold hover:bg-starwars-black/30'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Language Toggle */}
          <Link
            href={pathname.replace(`/${locale}`, `/${switchLocale}`)}
            className="px-3 py-1.5 rounded border border-starwars-gold/50 text-starwars-gold text-sm hover:bg-starwars-gold/10 transition-colors duration-200"
          >
            {localeLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}