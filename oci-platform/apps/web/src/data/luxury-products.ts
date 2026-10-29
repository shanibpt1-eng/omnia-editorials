import { LuxuryProduct } from "../lib/types";
import productsData from "./mirrored-products.json";

export const LUXURY_PRODUCTS: LuxuryProduct[] = productsData as unknown as LuxuryProduct[];

export const CATEGORIES = [
  "Luxury Sets",
  "Silver Sets",
  "Chokers Collection",
  "Pearl Sets & Jewellery",
  "Tennis Bracelets & Collection",
  "Rings & Solitaires",
  "Earrings (Drops & Clips)",
  "Necklaces & Pendants",
  "Long Chain Sets",
  "Omnia Brooches",
  "Hair Accessories & Clips",
  "Golden Sets & 18K Plated",
] as const;

export type CategoryName = typeof CATEGORIES[number];

export interface CategoryMeta {
  name: CategoryName;
  subtitle: string;
  collectionUrl: string;
  count: number;
}

export const CATEGORY_METADATA: CategoryMeta[] = [
  {
    name: "Luxury Sets",
    subtitle: "Signature Dubai High Glamour Sets",
    collectionUrl: "https://omniastores.com/collections/luxury-sets",
    count: 48,
  },
  {
    name: "Silver Sets",
    subtitle: "Heirloom 925 Bridal & Royal Sets",
    collectionUrl: "https://omniastores.com/collections/silver-sets",
    count: 48,
  },
  {
    name: "Chokers Collection",
    subtitle: "Imperial Micro-Prong Collar Chokers",
    collectionUrl: "https://omniastores.com/collections/chokers-collection",
    count: 48,
  },
  {
    name: "Pearl Sets & Jewellery",
    subtitle: "Arabian Gulf High-Luster Pearls",
    collectionUrl: "https://omniastores.com/collections/pearl-sets",
    count: 48,
  },
  {
    name: "Tennis Bracelets & Collection",
    subtitle: "Double-Safety Latch Eternity Lines",
    collectionUrl: "https://omniastores.com/collections/tennis-bracelet",
    count: 48,
  },
  {
    name: "Rings & Solitaires",
    subtitle: "Comfort-Fit Solitaires & Eternity Bands",
    collectionUrl: "https://omniastores.com/collections/rings",
    count: 48,
  },
  {
    name: "Earrings (Drops & Clips)",
    subtitle: "Chandeliers, Clips & Teardrop Drops",
    collectionUrl: "https://omniastores.com/collections/earrings",
    count: 48,
  },
  {
    name: "Necklaces & Pendants",
    subtitle: "Solitaire Pendants & Layered Chains",
    collectionUrl: "https://omniastores.com/collections/necklaces",
    count: 48,
  },
  {
    name: "Long Chain Sets",
    subtitle: "75cm Layerable Abaya Draping Chains",
    collectionUrl: "https://omniastores.com/collections/long-chain-sets",
    count: 48,
  },
  {
    name: "Omnia Brooches",
    subtitle: "Artisan Arabesque Filigree Scarf Pins",
    collectionUrl: "https://omniastores.com/collections/omnia-brooches",
    count: 48,
  },
  {
    name: "Hair Accessories & Clips",
    subtitle: "Royal Tiara Clips & Bridal Accents",
    collectionUrl: "https://omniastores.com/collections/hair-accessories",
    count: 48,
  },
  {
    name: "Golden Sets & 18K Plated",
    subtitle: "Warm 18K Gold Dipped 925 Silver",
    collectionUrl: "https://omniastores.com/collections/golden-sets",
    count: 48,
  },
];

export function getProductsByCategory(category: CategoryName): LuxuryProduct[] {
  return LUXURY_PRODUCTS.filter(p => p.category === category);
}
