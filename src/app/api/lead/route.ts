import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/calculator/schema';
import { globalRateLimiter } from '@/lib/security/rateLimiter';
import { formatLeadMessage } from '@/lib/bot/formatter';
import { notifyAdmins } from '@/lib/bot/sender';

export async function POST(request: NextRequest) {
  try {
    // 1. Extract Client IP for rate-limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    // 2. In-Memory Sliding Window Rate Limiting
    const rateLimit = globalRateLimiter.check(clientIp);
    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil(rateLimit.resetTimeMs / 1000);
      return NextResponse.json(
        {
          error: 'Слишком много запросов. Пожалуйста, подождите немного перед следующей отправкой.',
          retryAfterSec,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSec),
          },
        }
      );
    }

    // 3. Body Parsing & Safe JSON Extraction
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Некорректный JSON в теле запроса' },
        { status: 400 }
      );
    }

    // 4. Anti-spam Honeypot Trap (Check before schema validation)
    // If honeypot is filled, return silent 200 without sending spam to admin chat
    if (typeof body === 'object' && body !== null && 'honeypot' in body) {
      const hp = (body as Record<string, unknown>).honeypot;
      if (typeof hp === 'string' && hp.trim() !== '') {
        console.warn(`[AntiSpam] Bot submission blocked by honeypot from IP ${clientIp}`);
        return NextResponse.json(
          { success: true, message: 'Заявка успешно принята' },
          { status: 200 }
        );
      }
    }

    // 5. Zod Validation
    const validation = leadFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Неверные данные формы',
          fieldErrors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = validation.data;

    // 6. Format notification and dispatch to bots
    const formattedMessage = formatLeadMessage(leadData);
    await notifyAdmins(formattedMessage);

    // 7. Successful Response
    return NextResponse.json(
      {
        success: true,
        message: 'Заявка успешно принята! Инженер свяжется с вами в течение 15 минут.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /api/lead] Unhandled Error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера. Пожалуйста, повторите позже.' },
      { status: 500 }
    );
  }
}
