export interface TelegramNotificationParams {
  title: string;
  message: string;
  level?: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
  actionUrl?: string;
  actionText?: string;
}

export interface TelegramDispatchResult {
  success: boolean;
  messageId?: number;
  simulated: boolean;
  status: string;
}

export class TelegramBotDispatcher {
  private botToken: string | undefined;
  private chatId: string | undefined;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID;
  }

  /**
   * Dispatches a structured notification to configured Telegram chat or channel
   */
  public async sendNotification(params: TelegramNotificationParams): Promise<TelegramDispatchResult> {
    const { title, message, level = 'INFO', actionUrl, actionText = 'View in Dashboard' } = params;

    const emojiMap = {
      INFO: 'ℹ️',
      SUCCESS: '✨💎',
      WARNING: '⚠️',
      CRITICAL: '🚨',
    };

    const emoji = emojiMap[level] || '🔔';

    // Format message with Telegram HTML
    let text = `<b>${emoji} OMNIA STORES GROWTH PLATFORM</b>\n\n`;
    text += `<b>${title}</b>\n`;
    text += `${message}\n\n`;
    text += `<i>Timestamp: ${new Date().toUTCString()}</i>`;

    if (actionUrl) {
      text += `\n🔗 <a href="${actionUrl}">${actionText}</a>`;
    }

    if (this.botToken && this.chatId && !this.botToken.includes('xxxx')) {
      try {
        const res = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: false,
          }),
        });

        const data = await res.json();
        if (data.ok) {
          return {
            success: true,
            messageId: data.result?.message_id,
            simulated: false,
            status: 'Delivered to live Telegram channel',
          };
        } else {
          throw new Error(data.description || 'Telegram API returned error');
        }
      } catch (err: any) {
        console.warn('Telegram Bot API dispatch error:', err.message);
        return {
          success: false,
          simulated: false,
          status: `Telegram API Error: ${err.message}`,
        };
      }
    }

    // Graceful simulation when token not yet configured in .env.local
    console.log(`[TELEGRAM SIMULATED DISPATCH] -> Chat: ${this.chatId || 'default-chat'}\n${text}`);
    return {
      success: true,
      simulated: true,
      status: 'Simulated (Configure TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID in .env.local for live delivery)',
    };
  }
}

export const telegramBot = new TelegramBotDispatcher();
