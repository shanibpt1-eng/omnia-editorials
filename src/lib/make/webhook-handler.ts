import crypto from 'crypto';

export interface MakeWebhookPayload {
  scenarioId: string;
  executionId: string;
  eventType: 'TRIGGER_DAILY_PIPELINE' | 'SYNC_CATALOGUE' | 'AUDIT_SEO';
  timestamp: string;
  parameters?: Record<string, any>;
}

export class MakeWebhookHandler {
  private secret: string | undefined;

  constructor() {
    this.secret = process.env.MAKE_WEBHOOK_SECRET;
  }

  /**
   * Verifies HMAC signature on incoming webhooks from Make (Integromat)
   */
  public verifySignature(rawBody: string, signature: string | null): boolean {
    if (!this.secret || this.secret.includes('xxxx')) {
      // In development / local testing without secret configured, allow safe simulation
      return true;
    }

    if (!signature) return false;

    const expectedSignature = crypto
      .createHmac('sha256', this.secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }

  /**
   * Returns Make.com scenario blueprint definitions
   */
  public getScenarios() {
    return [
      {
        id: 'scenario-daily-growth',
        name: 'Omnia Daily Growth & News Pipeline',
        trigger: 'Make Scheduler (Every day at 08:00 AM Gulf Standard Time)',
        steps: [
          '1. NewsData.io: Query UAE & Saudi bridal trends',
          '2. Omnia API: Request AI synthesis with verified 925 silver catalogue',
          '3. Higgsfield AI: Generate luxury editorial hero visual',
          '4. Quality Gate: Enforce 80% threshold policy',
          '5. Shopify Admin: Create staging blog draft',
          '6. Telegram Bot: Dispatch instant notification to admin team',
        ],
        status: 'READY_TO_CONNECT',
      },
      {
        id: 'scenario-catalogue-sync',
        name: 'Omnia Catalogue Price & Stock Monitor',
        trigger: 'Every 6 hours',
        steps: [
          '1. Shopify GraphQL: Read active inventory and prices',
          '2. Omnia Cache: Reconcile out-of-stock items',
          '3. Notification: Alert if featured bridal set goes out of stock',
        ],
        status: 'READY_TO_CONNECT',
      },
    ];
  }
}

export const makeWebhookHandler = new MakeWebhookHandler();
