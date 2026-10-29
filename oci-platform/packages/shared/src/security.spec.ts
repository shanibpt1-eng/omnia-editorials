import { describe, it, expect } from 'vitest';
import { SecretVault, isSafeExternalUrl } from './security.js';

describe('Security Utilities', () => {
  const masterKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

  it('encrypts and decrypts secrets accurately using AES-256-GCM', () => {
    const rawSecret = 'shpat_live_shopify_token_secure_999';
    const encrypted = SecretVault.encrypt(rawSecret, masterKey);

    expect(encrypted).not.toContain(rawSecret);
    expect(encrypted.split(':')).toHaveLength(3);

    const decrypted = SecretVault.decrypt(encrypted, masterKey);
    expect(decrypted).toBe(rawSecret);
  });

  it('rejects invalid or unsafe SSRF target URLs', () => {
    expect(isSafeExternalUrl('http://localhost:3000/admin')).toBe(false);
    expect(isSafeExternalUrl('http://127.0.0.1:5432')).toBe(false);
    expect(isSafeExternalUrl('http://169.254.169.254/latest/meta-data/')).toBe(false);
    expect(isSafeExternalUrl('http://192.168.1.1/router')).toBe(false);
    expect(isSafeExternalUrl('http://10.0.0.1/internal')).toBe(false);

    expect(isSafeExternalUrl('https://omniastores.com')).toBe(true);
    expect(isSafeExternalUrl('https://gulfnews.com')).toBe(true);
    expect(isSafeExternalUrl('https://api.openai.com/v1/models')).toBe(true);
  });
});
