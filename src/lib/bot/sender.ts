import { FormattedNotification } from './formatter';

export interface DispatchResult {
  telegram: boolean;
  max: boolean;
  error?: string;
}

/**
 * Sends notification to Telegram Bot via Telegram Bot API.
 */
export async function sendTelegramNotification(
  message: string,
  botToken?: string,
  chatId?: string
): Promise<boolean> {
  const token = botToken || process.env.TELEGRAM_BOT_TOKEN;
  const targetChatId = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !targetChatId) {
    // If not configured, log for local development/test environments
    console.warn('[TelegramBot] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in environment. Skipping send.');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
        parse_mode: 'MarkdownV2',
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[TelegramBot] API Error (${response.status}):`, errorBody);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[TelegramBot] Network / Execution Error:', err);
    return false;
  }
}

/**
 * Sends notification to MAX Bot via MAX API endpoint.
 */
export async function sendMaxNotification(
  message: string,
  maxToken?: string,
  chatId?: string
): Promise<boolean> {
  const token = maxToken || process.env.MAX_BOT_TOKEN;
  const targetChatId = chatId || process.env.MAX_CHAT_ID;

  if (!token || !targetChatId) {
    // Skip if not configured
    return false;
  }

  try {
    // Modular endpoint for MAX bot integration
    const url = `https://api.max.ru/v1/bot/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
      }),
    });

    return response.ok;
  } catch (err) {
    console.error('[MaxBot] Network / Execution Error:', err);
    return false;
  }
}

/**
 * High-level notification dispatcher to all configured channels.
 */
export async function notifyAdmins(notification: FormattedNotification): Promise<DispatchResult> {
  const telegramSuccess = await sendTelegramNotification(notification.telegramMarkdown);
  const maxSuccess = await sendMaxNotification(notification.plainText);

  return {
    telegram: telegramSuccess,
    max: maxSuccess,
  };
}
