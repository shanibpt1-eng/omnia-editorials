import React from 'react';
import type { Metadata } from 'next';
import { getAggregatedMagazineWire, LiveMagazineFeedItem, MagazineWirePillar, PublisherChannelType } from '../../../../lib/magazine-wire';
import { OMNIA_ATELIER_BLOGS } from '../../../../data/magazine-editions-data';
import { PortalArticleReader } from '../../../../components/PortalArticleReader';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function strParam(val: string | string[] | undefined, fallback = ''): string {
  if (Array.isArray(val)) return val[0] || fallback;
  return val || fallback;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const atelierMatch = OMNIA_ATELIER_BLOGS.find((b) => b.slug === slug);
  if (atelierMatch) {
    return {
      title: `${atelierMatch.titleEn} | Omnia Atelier Journal | The Vogue News`,
      description: atelierMatch.excerptEn,
    };
  }
  const titleFromParam = strParam(sp.t);
  const pubFromParam = strParam(sp.p, 'The Vogue News');

  if (titleFromParam) {
    return {
      title: `${titleFromParam} | ${pubFromParam} Edition | The Vogue News`,
      description: strParam(sp.ex, `${titleFromParam} — Full portal editorial coverage and curated Omnia Stores pairing.`),
    };
  }

  return {
    title: `${slug.replace(/-/g, ' ')} | The Vogue News Magazine Portal`,
    description: 'International fashion, culture, luxury lifestyle & news editorial portal paired with Omnia Stores collections.',
  };
}

export default async function MagazineArticlePortalPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const wire = await getAggregatedMagazineWire();
  const atelierMatch = OMNIA_ATELIER_BLOGS.find((b) => b.slug === slug);
  const matched =
    atelierMatch
      ? ({
          id: atelierMatch.id,
          slug: atelierMatch.slug,
          publisher: 'Omnia Atelier Journal',
          publisherSlug: 'omnia-stores',
          channelType: 'magazine' as PublisherChannelType,
          homeUrl: 'https://omniastores.com/',
          pillar: 'jewellery' as MagazineWirePillar,
          title: atelierMatch.titleEn,
          excerpt: `${atelierMatch.excerptEn} ${atelierMatch.paragraphsEn.join(' ')}`,
          link: atelierMatch.backlinkUrl,
          publishedAt: '2026-11-28T10:00:00.000Z',
          publishedDisplay: atelierMatch.date,
          category: atelierMatch.categoryEn,
          author: atelierMatch.author,
          thumbnail: atelierMatch.coverImage,
        } satisfies LiveMagazineFeedItem)
      : wire.items.find((item) => item.slug === slug);

  const fallbackArticle: LiveMagazineFeedItem = {
    id: slug,
    slug,
    publisher: strParam(sp.p, matched?.publisher || 'Vogue'),
    publisherSlug: strParam(sp.ps, matched?.publisherSlug || 'vogue'),
    channelType: (strParam(sp.ct, matched?.channelType || 'magazine') as PublisherChannelType),
    homeUrl: strParam(sp.hu, matched?.homeUrl || 'https://www.vogue.com/'),
    pillar: (strParam(sp.pl, matched?.pillar || 'fashion') as MagazineWirePillar),
    title: strParam(sp.t, matched?.title || slug.replace(/-/g, ' ')),
    excerpt: strParam(
      sp.ex,
      matched?.excerpt ||
        'Editorial coverage from our international luxury publishing & news network, curated for Dubai, Riyadh, and global readers.'
    ),
    link: strParam(sp.lk, matched?.link || 'https://thevoguenews.com/magazine'),
    publishedAt: strParam(sp.da, matched?.publishedAt || new Date().toISOString()),
    publishedDisplay: strParam(
      sp.d,
      matched?.publishedDisplay ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    ),
    category: strParam(sp.c, matched?.category || 'Fashion & Culture'),
    author: strParam(sp.a, matched?.author || 'International Editorial Desk'),
    thumbnail: strParam(sp.im, matched?.thumbnail || '/ai-models/omnia-runway-model.jpg'),
  };

  const article = matched || fallbackArticle;
  const relatedArticles = wire.items.filter((it) => it.slug !== article.slug).slice(0, 6);

  return <PortalArticleReader article={article} relatedArticles={relatedArticles} />;
}
