export * from './types.js';
export * from './security.js';

export const OCI_SYSTEM_CONSTANTS = {
  VERSION: '1.0.0',
  PLATFORM_NAME: 'Omnia Content Intelligence',
  API_PREFIX: '/api/v1',
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'ar'] as const,
  JEWELLERY_MATERIAL: '925 Sterling Silver',
  PRIMARY_CURRENCY: 'AED',
  OFFICIAL_STORE_DOMAINS: ['omniastores.com', 'omniastores.ae'] as const,
};
