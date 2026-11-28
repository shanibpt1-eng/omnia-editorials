import React from 'react';
import type { Metadata } from 'next';
import { getAggregatedMagazineWire, LiveMagazineFeedItem, MagazineWirePillar, PublisherChannelType } from '../../../../lib/magazine-wire';
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
  const matched = wire.items.find((item) => item.slug === slug);

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
