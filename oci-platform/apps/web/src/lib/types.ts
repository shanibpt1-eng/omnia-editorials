export interface AuthorProfile {
  name: string;
  role: string;
  credentials: string;
  avatar: string;
  experienceYears: number;
  bio: string;
}

export interface ReviewerProfile {
  name: string;
  role: string;
  affiliation: string;
}

export interface TestingMethodology {
  testingHours: number;
  assayMethod: string;
  humidityTest: string;
  aiDisclosure: string;
  editorialPurpose: string;
  transparencyNotice: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  publication: 'Vogue Arabia' | 'Harper\'s Bazaar Arabia' | 'Gulf News' | 'Khaleej Times' | 'The National' | 'Business Lifestyle' | 'Bridal Arabia' | 'L\'Officiel Arabia';
  category: 'Luxury & Fashion' | 'E-Commerce Trends' | 'Logistics & Tech' | 'All GCC News' | 'High Jewellery';
  categoryAr?: string;
  date: string;
  dateAr?: string;
  readTime: string;
  readTimeAr?: string;
  coverImage: string;
  excerpt: string;
  excerptAr?: string;
  contentHtml?: string;
  contentHtmlAr?: string;
  author?: AuthorProfile;
  factChecker?: ReviewerProfile;
  methodology?: TestingMethodology;
  aiSummary: {
    takeaway1: string;
    takeaway2: string;
    takeaway3: string;
    takeaway1Ar?: string;
    takeaway2Ar?: string;
    takeaway3Ar?: string;
  };
  citationText: string;
  citationTextAr?: string;
  originalSourceUrl: string;
  canonicalStoreUrl: string;
  featuredProduct?: {
    id: string;
    title: string;
    titleAr?: string;
    priceAed: number;
    priceSar: number;
    image: string;
    storeUrl: string;
  };
}

export interface LuxuryProduct {
  id: string;
  title: string;
  titleAr?: string;
  category: string;
  material: string;
  priceAed: number;
  priceSar: number;
  inStock: boolean;
  images: string[]; // [primary, hover, ...more]
  storeUrl: string;
  productUrl?: string; // direct per-product deep link
  badge?: string;
  specs: string[];
  rating?: number;
  reviewsCount?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
