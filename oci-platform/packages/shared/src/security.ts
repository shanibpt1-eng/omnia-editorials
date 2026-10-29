import * as crypto from 'crypto';

/**
 * AES-256-GCM Encryption helper for organization secrets vault.
 * Protects third-party API keys (Shopify tokens, SERP keys, Sentry).
 */
export class SecretVault {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 12;

  public static encrypt(plainText: string, masterKeyHex: string): string {
    const key = Buffer.from(masterKeyHex, 'hex');
    if (key.length !== 32) {
      throw new Error('Master encryption key must be 32 bytes (64 hex characters)');
    }

    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Format: iv:authTag:encryptedPayload
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  public static decrypt(encryptedBundle: string, masterKeyHex: string): string {
    const key = Buffer.from(masterKeyHex, 'hex');
    if (key.length !== 32) {
      throw new Error('Master encryption key must be 32 bytes (64 hex characters)');
    }

    const parts = encryptedBundle.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted bundle format');
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex!, 'hex');
    const authTag = Buffer.from(authTagHex!, 'hex');

    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex!, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

/**
 * SSRF-Safe URL validator ensuring outgoing requests cannot target private IP blocks,
 * loopback devices, AWS metadata endpoints (169.254.169.254), or Docker networks.
 */
export function isSafeExternalUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Localhost and loopback
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return false;
    }

    // Cloud metadata
    if (hostname === '169.254.169.254') {
      return false;
    }

    // Private IPv4 ranges (RFC 1918)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = hostname.match(ipv4Regex);
    if (match) {
      const b1 = parseInt(match[1]!, 10);
      const b2 = parseInt(match[2]!, 10);
      if (b1 === 10) return false; // 10.0.0.0/8
      if (b1 === 172 && b2 >= 16 && b2 <= 31) return false; // 172.16.0.0/12
      if (b1 === 192 && b2 === 168) return false; // 192.168.0.0/16
      if (b1 === 0) return false;
    }

    return true;
  } catch {
    return false;
  }
}
