'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Sparkles, ChevronRight, Filter } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { JEWELLERY_GLOSSARY, GlossaryTerm } from '../../data/jewellery-glossary-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function JewelleryGlossaryPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = JEWELLERY_GLOSSARY.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      term.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.termAr.includes(searchTerm) ||
      term.shortDefinitionEn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'معجم مصطلحات المجوهرات' : 'Jewellery & Gemology Glossary'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'المعجم العلمي الثنائي اللغة للمصطلحات' : 'BILINGUAL GEMOLOGICAL & METALLURGY LEXICON'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  معجم مصطلحات المجوهرات والأحجار الكريمة: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    المرجع العلمي الموثق باللغتين العربية والإنجليزية
                  </span>
                </>
              ) : (
                <>
                  The Jewellery & Gemology Glossary: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Definitive Bilingual Metallurgy & Gemstone Reference
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'قاموس شامل يغطي مصطلحات علم المعادن، وتقنيات الفحص الطيفي، وأنواع ترصيع الأحجار الكريمة، واشتراطات الدمغ الحكومي وفق معايير مختبر دبي المركزي.'
                : 'A comprehensive educational dictionary defining precious metal alloys, spectroscopic assay techniques, stone faceting patterns, and hallmarking terminologies in English and Arabic.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'ما هو الفرق العلمي بين الفضة الإسترلينية 925 والفضة المطلية بالروديوم؟' : 'What is the precise metallurgical distinction between 925 sterling silver and rhodium-plated silver?'}
          answer={isAr
            ? 'الفضة الإسترلينية 925 هي السبيكة الأساسية المكونة من 92.5% فضة نقية و7.5% نحاس. أما طلاء الروديوم فهو طبقة كهرومغناطيسية خارجية من معدن الروديوم النادر بسماكة 0.5 ميكرون تمنح القطعة لمعاناً عاكساً كالمرآة يطابق الذهب الأبيض وتمنع تفاعلها مع رطوبة الجو نهائياً.'
            : '925 sterling silver is the base core alloy comprising 92.5% elemental silver and 7.5% copper. Rhodium plating is a secondary electroplated outer barrier of pure platinum-group rhodium (typically 0.5 microns) that seals the silver against sulfur oxidation while imparting a cold mirror-chrome finish indistinguishable from 18K white gold.'}
          facts={[
            { label: isAr ? 'نقاء الفضة الأساسية' : 'Silver Purity', value: '92.5% Fine Silver' },
            { label: isAr ? 'سماكة الروديوم' : 'Rhodium Layer', value: '0.50 µm Molecular Barrier' },
            { label: isAr ? 'معيار الحماية' : 'Tarnish Immunity', value: 'Up to 3 Years Luster Retention' },
            { label: isAr ? 'فحص الاعتماد' : 'Verification Lab', value: 'Dubai Central Laboratory (DCL)' },
          ]}
        />

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs font-mono">
            {[
              { id: 'all', label: isAr ? 'كافة المصطلحات' : 'All Terms' },
              { id: 'metallurgy', label: isAr ? 'علم المعادن' : 'Metallurgy' },
              { id: 'gemology', label: isAr ? 'علم الأحجار' : 'Gemology' },
              { id: 'assay_certification', label: isAr ? 'الفحص والدمغ' : 'Assay & Hallmarks' },
              { id: 'craftsmanship', label: isAr ? 'فنون الصياغة' : 'Craftsmanship' },
              { id: 'pearls', label: isAr ? 'اللؤلؤ' : 'Pearls' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-gold text-black shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'بحث في المصطلحات والتعريفات...' : 'Search terms or concepts...'}
              className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Glossary Terms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-neutral-900/90 border border-gold/30 shadow-xl space-y-4 hover:border-gold transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-wider font-bold">
                    {isAr ? item.categoryAr : item.category.toUpperCase().replace('_', ' ')}
                  </span>
                  {item.pronunciation && (
                    <span className="text-[10px] font-mono text-neutral-400">/{item.pronunciation}/</span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-serif font-black text-white">
                    {item.termEn}
                  </h3>
                  <span className="text-sm font-serif font-bold text-gold block mt-0.5">
                    {item.termAr}
                  </span>
                </div>

                <p className="text-xs text-neutral-200 font-serif leading-relaxed">
                  {isAr ? item.shortDefinitionAr : item.shortDefinitionEn}
                </p>

                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">
                    {isAr ? 'التفسير العلمي المعمق:' : 'SCIENTIFIC CONTEXT:'}
                  </span>
                  <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                    {isAr ? item.fullExplanationAr : item.fullExplanationEn}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-400">
                <span className="text-gold font-semibold truncate max-w-[70%]">
                  {isAr ? `تطبيق: ${item.practicalContextAr}` : `Application: ${item.practicalContextEn}`}
                </span>
                <span className="text-neutral-500">{item.relatedTerms.slice(0, 2).join(' • ')}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
