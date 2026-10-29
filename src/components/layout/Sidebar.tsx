'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/context';
import {
  LayoutDashboard,
  Store,
  Gem,
  BookOpen,
  CalendarCheck,
  FileCode,
  Globe2,
  HelpCircle,
  Search,
  Share2,
  TicketPercent,
  Link2,
  Cpu,
  Settings,
  Sparkles,
  ExternalLink,
  Video,
  Newspaper,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { activeStoreId, language } = useStore();

  const isArabic = language === 'ar';

  const navItems = [
    {
      title: isArabic ? 'نظرة عامة' : 'Overview',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      title: isArabic ? 'خط الأتمتة الشامل' : 'Growth Pipeline',
      href: '/pipeline',
      icon: Sparkles,
      badge: 'Auto',
    },
    {
      title: isArabic ? 'المتاجر والربط' : 'Stores & Shopify',
      href: '/stores',
      icon: Store,
    },
    {
      title: isArabic ? 'كتالوج المجوهرات' : 'Products & Catalogue',
      href: '/products',
      icon: Gem,
    },
    {
      title: isArabic ? 'استوديو المحتوى' : 'Content Studio',
      href: '/content-studio',
      icon: BookOpen,
      badge: 'AI Slice',
    },
    {
      title: isArabic ? 'استوديو Higgsfield AI' : 'Higgsfield AI Studio',
      href: '/higgsfield',
      icon: Video,
      badge: 'Video & 8K',
    },
    {
      title: isArabic ? 'نشر المدونات HTML' : 'HTML Blogs & Auto-Publish',
      href: '/blog-automation',
      icon: FileCode,
      badge: 'Bulk',
    },
    {
      title: isArabic ? 'شبكة المدونات المستقلة' : 'Editorial Blog Network',
      href: '/editorial-network',
      icon: Globe2,
      badge: '1,002',
    },
    {
      title: isArabic ? 'صحيفة الأخبار (news.1fill)' : 'Digital Newspaper (1fill)',
      href: '/newsroom',
      icon: Newspaper,
      badge: 'Public',
    },
    {
      title: isArabic ? 'بوابة المدونة والمجلة الفاخرة' : 'Luxury Editorial Portal',
      href: 'http://localhost:3001',
      icon: Sparkles,
      badge: 'Live :3001',
      external: true,
    },
    {
      title: isArabic ? 'محرك الأسئلة الشائعة' : 'FAQ Engine',
      href: '/faqs',
      icon: HelpCircle,
    },
    {
      title: isArabic ? 'تحسين SEO / AEO' : 'SEO / AEO Engine',
      href: '/seo',
      icon: Search,
    },
    {
      title: isArabic ? 'روابط الأفلييت' : 'Affiliate Links',
      href: '/affiliates',
      icon: Share2,
    },
    {
      title: isArabic ? 'الكوبونات والخصومات' : 'Discounts & Vouchers',
      href: '/discounts',
      icon: TicketPercent,
    },
    {
      title: isArabic ? 'إدارة الباك لينك' : 'Backlink CRM',
      href: '/backlinks',
      icon: Link2,
    },
    {
      title: isArabic ? 'سجلات الأتمتة' : 'Automation Runs',
      href: '/automation-runs',
      icon: Cpu,
    },
    {
      title: isArabic ? 'الإعدادات والأمان' : 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#23252e] bg-[#121318] flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#23252e]">
        <Link href="/" className="flex flex-col gap-1.5 group">
          <img
            src="/omnia-logo-white.png"
            alt="OMNIA STORES"
            className="h-7 w-auto object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-widest uppercase text-luxury-gold">
              Growth Intelligence
            </span>
            <span className="text-[9px] text-neutral-500 uppercase tracking-wider">OS v2.0</span>
          </div>
        </Link>

        {/* Current Active Store Badge */}
        <div className="mt-3.5 px-2.5 py-1.5 rounded-md bg-[#1a1c23] border border-[#262833] flex items-center justify-between">
          <span className="text-xs font-mono text-luxury-platinum">
            {activeStoreId === 'OMNIA_COM' ? 'omniastores.com' : 'omniastores.ae'}
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item: any) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-luxury-gold hover:text-luxury-gold-light hover:bg-[#1a1b22] border border-luxury-gold/30 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-luxury-gold animate-pulse" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-luxury-gold/15 text-luxury-gold-light font-semibold border border-luxury-gold/25'
                  : 'text-luxury-muted hover:text-luxury-ivory hover:bg-[#1a1b22]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-luxury-gold' : 'text-luxury-muted'}`} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#23252e] bg-[#0e0f13]">
        <div className="flex items-center justify-between text-xs text-luxury-muted">
          <span>Enterprise v2.4</span>
          <a
            href={activeStoreId === 'OMNIA_COM' ? 'https://omniastores.com' : 'https://omniastores.ae'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-luxury-gold transition-colors"
          >
            Storefront <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}
