/**
 * The Vogue News — Backlink Intelligence & Editorial Outreach CRM Data
 * Tracks referring media domains, anchor texts, destination URLs, link attributes,
 * and editorial outreach pipeline for legitimate digital PR.
 * Zero spam submissions, zero automated link networks.
 */

export interface BacklinkRecord {
  id: string;
  referringDomain: string;
  sourceUrl: string;
  destinationUrl: string;
  anchorText: string;
  linkAttribute: 'dofollow' | 'nofollow' | 'sponsored' | 'ugc';
  domainAuthorityEst?: number;
  firstSeenDate: string;
  lastVerifiedDate: string;
  status: 'active' | 'lost' | 'broken' | 'redirected';
  statusCode: number;
  referralSessionsCount?: number;
}

export interface OutreachContact {
  id: string;
  publication: string;
  contactName: string;
  editorialRole: string;
  email: string;
  pitchTopic: string;
  pitchTopicAr: string;
  status: 'identified' | 'pitched' | 'negotiating' | 'published' | 'declined';
  lastActivityDate: string;
  notes: string;
}

export const MONITORED_BACKLINKS: BacklinkRecord[] = [
  {
    id: 'bl-gulfnews-01',
    referringDomain: 'gulfnews.com',
    sourceUrl: 'https://gulfnews.com/business/retail/omnia-stores-luxury-cart-drops-uae',
    destinationUrl: 'https://thevoguenews.com/editorials',
    anchorText: 'The Vogue News UAE Editorial Desk',
    linkAttribute: 'dofollow',
    domainAuthorityEst: 84,
    firstSeenDate: '2026-10-15',
    lastVerifiedDate: '2026-11-25',
    status: 'active',
    statusCode: 200,
    referralSessionsCount: 4120,
  },
  {
    id: 'bl-khaleejtimes-02',
    referringDomain: 'khaleejtimes.com',
    sourceUrl: 'https://khaleejtimes.com/lifestyle/fashion/modern-choker-neckline-revival-dubai',
    destinationUrl: 'https://thevoguenews.com/trending/what-to-know-about-the-statement-choker',
    anchorText: 'independent analysis in The Vogue News',
    linkAttribute: 'dofollow',
    domainAuthorityEst: 82,
    firstSeenDate: '2026-10-22',
    lastVerifiedDate: '2026-11-25',
    status: 'active',
    statusCode: 200,
    referralSessionsCount: 3290,
  },
  {
    id: 'bl-omniastores-03',
    referringDomain: 'omniastores.com',
    sourceUrl: 'https://omniastores.com/pages/press-coverage',
    destinationUrl: 'https://thevoguenews.com',
    anchorText: 'The Vogue News Independent Broadsheet',
    linkAttribute: 'dofollow',
    domainAuthorityEst: 45,
    firstSeenDate: '2026-09-01',
    lastVerifiedDate: '2026-11-25',
    status: 'active',
    statusCode: 200,
    referralSessionsCount: 8940,
  },
  {
    id: 'bl-zawya-04',
    referringDomain: 'zawya.com',
    sourceUrl: 'https://zawya.com/en/press-release/companies-news/dcl-silver-hallmarking-standards',
    destinationUrl: 'https://thevoguenews.com/editorial-policy',
    anchorText: 'The Vogue News Gemological Audit Standards',
    linkAttribute: 'nofollow',
    domainAuthorityEst: 78,
    firstSeenDate: '2026-11-05',
    lastVerifiedDate: '2026-11-25',
    status: 'active',
    statusCode: 200,
    referralSessionsCount: 840,
  },
  {
    id: 'bl-arabnews-05',
    referringDomain: 'arabnews.com',
    sourceUrl: 'https://arabnews.com/fashion/riyadh-fashion-week-jewellery-roundup',
    destinationUrl: 'https://thevoguenews.com/trending',
    anchorText: 'GCC Luxury Jewellery Journal',
    linkAttribute: 'dofollow',
    domainAuthorityEst: 81,
    firstSeenDate: '2026-10-28',
    lastVerifiedDate: '2026-11-25',
    status: 'active',
    statusCode: 200,
    referralSessionsCount: 1530,
  },
];

export const EDITORIAL_OUTREACH_PIPELINE: OutreachContact[] = [
  {
    id: 'outreach-harpers-01',
    publication: 'Harper’s Bazaar Arabia',
    contactName: 'Nour El-Din (Accessories Editor)',
    editorialRole: 'Senior Fashion & Accessories Editor',
    email: 'n.eldin@itp.com',
    pitchTopic: 'Exclusive Feature: The 2026/2027 Shift toward 925 Silver Demi-Fine on Gulf Red Carpets',
    pitchTopicAr: 'تقرير حصري: تحول عرائس وسيدات الخليج نحو الفضة 925 المطلية بالروديوم',
    status: 'negotiating',
    lastActivityDate: '2026-11-23',
    notes: 'Editor requested high-res imagery of the butterfly pavé chokers and DCL certification report.',
  },
  {
    id: 'outreach-thenational-02',
    publication: 'The National News UAE',
    contactName: 'Sarah Al-Hameli',
    editorialRole: 'Business & Retail Correspondent',
    email: 's.alhameli@thenationalnews.com',
    pitchTopic: 'Retail Economics: How Tabby and Instant Couriers Accelerated Online Jewellery in Dubai',
    pitchTopicAr: 'اقتصاديات التجزئة: كيف حفزت حلول الدفع والتوصيل مبيعات المجوهرات بدبي',
    status: 'pitched',
    lastActivityDate: '2026-11-24',
    notes: 'Submitted executive summary of TVN-RR-2026-002 research paper.',
  },
  {
    id: 'outreach-voguearabia-03',
    publication: 'Vogue Arabia',
    contactName: 'Miriam Sfeir',
    editorialRole: 'Jewellery & Watches Director',
    email: 'm.sfeir@nervora.com',
    pitchTopic: 'Haute Joaillerie vs Demi-Fine: Can Simulated Diamonds Equal Mined Stones in Optical Scintillation?',
    pitchTopicAr: 'مقارنة بصرية: هل تضاهي أحجار الزركون السويسرية بريق الألماس المنجم؟',
    status: 'published',
    lastActivityDate: '2026-11-12',
    notes: 'Syndicated feature published linking to The Vogue News statement choker review.',
  },
];
