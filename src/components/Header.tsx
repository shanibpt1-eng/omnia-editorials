'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Sparkles, ShoppingBag, ArrowUpRight, Menu, X, Server } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme, currency, setCurrency, language, setLanguage, t } = useLuxury();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core 5 consumer links for desktop navigation
  const desktopNavLinks = [
    { label: t.navHome, href: '/' },
    { label: t.navTrending, href: '/trending' },
    { label: t.navEditorials, href: '/editorials' },
    { label: t.navProducts, href: '/products' },
    { label: t.navAbout, href: '/about' },
  ];

  // Full links including developer/admin backend for mobile drawer
  const mobileNavLinks = [
    ...desktopNavLinks,
    { label: t.navBackend, href: '/backend' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* 1. Animated Top Announcement Ticker */}
      <div className="w-full bg-[#07090E] text-[#D4AF37] border-b border-[#D4AF37]/25 text-xs py-2 overflow-hidden relative">
        <div className="flex items-center whitespace-nowrap animate-ticker pause-hover">
          <span className="flex items-center mx-6 gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <strong className="tracking-widest uppercase font-semibold text-white">{t.tickerFlagship}</strong>
            <span className="px-1.5 py-0.5 rounded bg-black/60 border border-gold/40 text-gold font-mono font-bold">OMNIA-VIP15</span> {language === 'ar' ? 'للحصول على خصم 15% على omniastores.com' : 'for 15% Off at omniastores.com'}
          </span>
          <span className="text-[#D4AF37]/40">◆</span>
          <span className="flex items-center mx-6 gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <strong className="tracking-widest uppercase font-semibold">{t.tickerGccWire}</strong>
          </span>
          <span className="text-[#D4AF37]/40">◆</span>
          <span className="flex items-center mx-6 gap-2">
            <strong>{t.tickerParity}</strong>
          </span>
          <span className="text-[#D4AF37]/40">◆</span>
          <span className="flex items-center mx-6 gap-2">
            <strong>{t.tickerFulfillment}</strong>
          </span>
          <span className="text-[#D4AF37]/40">◆</span>
          <span className="flex items-center mx-6 gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <strong className="tracking-widest uppercase font-semibold text-white">{t.tickerFlagship}</strong>
            <span className="px-1.5 py-0.5 rounded bg-black/60 border border-gold/40 text-gold font-mono font-bold">OMNIA-VIP15</span>
          </span>
        </div>
      </div>

      {/* 2. Glassmorphic Luxury Navigation Bar */}
      <div className="backdrop-blur-xl bg-white/95 dark:bg-[#0A0D14]/92 border-b border-neutral-200 dark:border-[#D4AF37]/20 shadow-md dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[70px] sm:h-[74px] flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          
          {/* Official OMNIA Wordmark Logo */}
          <div className="flex items-center shrink-0 z-10">
            <Link href="/" className="flex items-center group py-1 shrink-0" aria-label="Omnia Stores Home">
              <Image
                src="/omnia-logo-white.png"
                alt="OMNIA"
                width={140}
                height={22}
                className="h-5 sm:h-6 md:h-7 w-auto object-contain hidden dark:block transition-all duration-300 group-hover:opacity-90 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                priority
              />
              <Image
                src="/omnia-logo-black.png"
                alt="OMNIA"
                width={140}
                height={22}
                className="h-5 sm:h-6 md:h-7 w-auto object-contain block dark:hidden transition-all duration-300 group-hover:opacity-80"
                priority
              />
            </Link>
          </div>

          {/* Center Desktop Navigation Links (Clean spacing with guaranteed zero collision) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 shrink min-w-0">
            {desktopNavLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-xs tracking-[0.12em] 2xl:tracking-[0.18em] uppercase transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    active
                      ? 'text-[#B8860B] dark:text-[#D4AF37] font-bold after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#B8860B] dark:after:via-[#D4AF37] after:to-transparent'
                      : 'text-neutral-900 dark:text-neutral-300 hover:text-black dark:hover:text-white font-semibold dark:font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.href === '/editorials' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block" />
                  )}
                </Link>
              );
            })}

            {/* KSA Flagship Link */}
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex relative py-1 text-xs tracking-[0.2em] uppercase text-[#B8860B] dark:text-[#D4AF37] hover:text-black dark:hover:text-[#F3E5AB] transition-colors items-center gap-1.5 font-bold dark:font-medium whitespace-nowrap group"
            >
              <span>{t.navKsaStore}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wider bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#8B6508] dark:text-[#D4AF37] rounded">
                SA
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          {/* Right Action Tools: Language Toggle, Currency Toggle, Theme Toggle, Main Flagship Storefront CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0 z-20">
            
            {/* Desktop Backend Hub Quick Shortcut (Visible on 2xl) */}
            <Link
              href="/backend"
              className="hidden 2xl:flex items-center gap-1 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold text-gold hover:bg-gold/10 text-[10px] font-mono uppercase tracking-wider transition-all"
              title="Backend & AI Operations Hub"
            >
              <Server className="w-3 h-3 text-gold" />
              <span>{t.navBackend}</span>
            </Link>

            {/* Bilingual Switcher (EN / عربي) */}
            <div className="flex items-center bg-black/40 dark:bg-white/[0.04] border border-neutral-300/80 dark:border-gold/30 rounded-full p-0.5 text-xs shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.4)]'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  language === 'ar'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.4)]'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="العربية (Arabic)"
              >
                عربي
              </button>
            </div>

            {/* Regional Currency Switcher */}
            <div className="flex items-center bg-black/40 dark:bg-white/[0.04] border border-neutral-300/80 dark:border-gold/30 rounded-full p-0.5 text-xs shadow-inner">
              <button
                onClick={() => setCurrency('AED')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  currency === 'AED'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.4)]'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="United Arab Emirates Dirham"
              >
                {t.dirham}
              </button>
              <button
                onClick={() => setCurrency('SAR')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  currency === 'SAR'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.4)]'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="Saudi Arabian Riyal"
              >
                {t.riyal}
              </button>
            </div>

            {/* Luxury Theme Segmented Switcher (Dark / Light) */}
            <div className="flex items-center bg-black/40 dark:bg-white/[0.04] border border-neutral-300/80 dark:border-gold/30 rounded-full p-0.5 text-xs shadow-inner">
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider flex items-center justify-center transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.4)]'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="Dark Theme"
                aria-label="Dark Theme"
              >
                <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#0A0D14]' : 'text-neutral-500 dark:text-neutral-400'}`} />
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider flex items-center justify-center transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.4)]'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="Light Theme"
                aria-label="Light Theme"
              >
                <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-[#0A0D14]' : 'text-neutral-500 dark:text-neutral-400'}`} />
              </button>
            </div>

            {/* Flagship Storefront CTA Button */}
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFBF54] to-[#C49B28] text-[#0A0D14] font-bold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase whitespace-nowrap shadow-[0_2px_15px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
              title="Visit official Omnia Stores boutique"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{t.shopStore}</span>
              <span className="sm:hidden">{t.shopStore}</span>
            </a>

            {/* Mobile / Tablet / Medium Laptop Hamburger Button (xl:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-neutral-800 dark:text-gold hover:bg-gold/10 border border-neutral-300/80 dark:border-gold/30 shrink-0 transition-colors z-20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet / Medium Laptop Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden px-4 sm:px-6 pt-3 pb-6 bg-white/98 dark:bg-[#0A0D14]/98 border-t border-neutral-200 dark:border-gold/20 flex flex-col gap-3 shadow-2xl animate-fadeIn">
            {/* Mobile Controls: Language, Currency, Theme */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-gold/15">
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">Preferences</span>
              
              <div className="flex items-center gap-2">
                {/* Mobile Language Switcher */}
                <div className="flex items-center bg-black/5 dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 rounded-full p-0.5 text-xs">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${language === 'en' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-700 dark:text-neutral-400'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${language === 'ar' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-700 dark:text-neutral-400'}`}
                  >
                    عربي
                  </button>
                </div>

                {/* Mobile Currency Switcher */}
                <div className="flex items-center bg-black/5 dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 rounded-full p-0.5 text-xs">
                  <button
                    onClick={() => setCurrency('AED')}
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${currency === 'AED' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-700 dark:text-neutral-400'}`}
                  >
                    {t.dirham}
                  </button>
                  <button
                    onClick={() => setCurrency('SAR')}
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${currency === 'SAR' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-700 dark:text-neutral-400'}`}
                  >
                    {t.riyal}
                  </button>
                </div>

                {/* Mobile Theme Switcher */}
                <div className="flex items-center bg-black/5 dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 rounded-full p-0.5 text-xs">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 ${theme === 'dark' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-700 dark:text-neutral-400'}`}
                  >
                    <Moon className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 ${theme === 'light' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-700 dark:text-neutral-400'}`}
                  >
                    <Sun className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-xs tracking-[0.2em] uppercase font-semibold transition-colors ${
                  pathname === link.href ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-neutral-900 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* KSA Flagship Link in Mobile Drawer */}
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 text-xs tracking-[0.2em] uppercase text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-between border-t border-neutral-200 dark:border-gold/15 pt-3 font-semibold"
            >
              <div className="flex items-center gap-2">
                <span>{t.navKsaStore}</span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wider bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#8B6508] dark:text-[#D4AF37] rounded">
                  SA
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Primary Mobile Store CTA */}
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold text-center text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-lg hover:opacity-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.visitFlagship}</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
