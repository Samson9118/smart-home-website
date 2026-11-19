import { ValidatedLeadForm } from '@/lib/calculator/schema';
import { calculateEstimate } from '@/lib/calculator/calculate';
import { escapeTelegramMarkdown, escapeHtml } from '@/lib/security/sanitize';

export interface FormattedNotification {
  telegramMarkdown: string;
  plainText: string;
  html: string;
}

export function formatLeadMessage(lead: ValidatedLeadForm): FormattedNotification {
  const currentDate = new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const messengerLabels: Record<string, string> = {
    telegram: 'Telegram',
    max: 'MAX Мессенджер',
    phone: 'Телефонный звонок',
  };

  const chosenMessenger = messengerLabels[lead.messenger] || lead.messenger;

  // Header
  let md = `🔔 *НОВАЯ ЗАЯВКА С САЙТА*\n\n`;
  md += `📅 *Дата:* ${escapeTelegramMarkdown(currentDate)}\n`;
  md += `👤 *Имя клиента:* ${escapeTelegramMarkdown(lead.name)}\n`;
  md += `📞 *Телефон:* ${escapeTelegramMarkdown(lead.phone)}\n`;
  md += `💬 *Способ связи:* ${escapeTelegramMarkdown(chosenMessenger)}\n`;

  if (lead.contactHandle) {
    md += `🏷 *Никнейм:* ${escapeTelegramMarkdown(lead.contactHandle)}\n`;
  }

  if (lead.comment) {
    md += `📝 *Комментарий:* ${escapeTelegramMarkdown(lead.comment)}\n`;
  }

  // Calculator Estimate details if present
  if (lead.calculatorInputs) {
    const estimate = calculateEstimate(lead.calculatorInputs);
    const propType = estimate.inputs.propertyType === 'house' ? 'Загородный дом' : 'Квартира';

    const brandTierLabels: Record<string, string> = {
      budget: 'Бюджет (Sonoff / Tuya)',
      optimum: 'Оптимум (Aqara / Sonoff)',
      premium: 'Премиум (Sprut / Aqara Pro)',
    };

    const hubName = estimate.equipment.find((e) => e.category === 'hub')?.name || estimate.inputs.hub;

    const activeModules: string[] = [];
    if (estimate.inputs.modules.lighting) activeModules.push('💡 Свет');
    if (estimate.inputs.modules.climate) activeModules.push('🌡 Климат');
    if (estimate.inputs.modules.leakage) activeModules.push('💧 Протечки');
    if (estimate.inputs.modules.curtains) activeModules.push('🪟 Шторы');
    if (estimate.inputs.modules.security) activeModules.push('🛡 Охрана');

    md += `\n🏠 *ПАРАМЕТРЫ ОБЪЕКТА И СМЕТА:*\n`;
    md += `• *Тип:* ${escapeTelegramMarkdown(propType)} (${estimate.inputs.area} м², ${estimate.inputs.rooms} комн\\., ${estimate.inputs.bathrooms} с/у)\n`;
    md += `• *Хаб:* ${escapeTelegramMarkdown(hubName)}\n`;
    md += `• *Сегмент:* ${escapeTelegramMarkdown(brandTierLabels[estimate.inputs.brandTier] || estimate.inputs.brandTier)}\n`;
    md += `• *Системы:* ${escapeTelegramMarkdown(activeModules.join(', ') || 'Только хаб')}\n\n`;

    md += `💰 *РАСЧЁТ СТОИМОСТИ:*\n`;
    md += `• Оборудование (${estimate.equipment.length} поз.): *${estimate.totalEquipmentPrice.toLocaleString('ru-RU')} ₽*\n`;
    md += `• Чистовой монтаж: *${estimate.installationPrice.toLocaleString('ru-RU')} ₽*\n`;
    md += `• Пусконаладка и сценарии: *${estimate.setupPrice.toLocaleString('ru-RU')} ₽*\n`;
    md += `• *ИТОГО ПО СМЕТЕ:* *${estimate.totalPrice.toLocaleString('ru-RU')} ₽*\n`;
    md += `⏱ *Срок реализации:* ~${estimate.estimatedDays === 1 ? '1 день' : `${estimate.estimatedDays} дня`}\n`;
  }

  // Plain Text Version
  const plainText = md.replace(/[*_\\]/g, '');

  // HTML Version
  const html = `
    <b>🔔 НОВАЯ ЗАЯВКА С САЙТА</b><br/><br/>
    <b>Дата:</b> ${escapeHtml(currentDate)}<br/>
    <b>Клиент:</b> ${escapeHtml(lead.name)} (${escapeHtml(lead.phone)})<br/>
    <b>Связь:</b> ${escapeHtml(chosenMessenger)} ${lead.contactHandle ? `(${escapeHtml(lead.contactHandle)})` : ''}<br/>
    ${lead.comment ? `<b>Комментарий:</b> ${escapeHtml(lead.comment)}<br/>` : ''}
  `;

  return {
    telegramMarkdown: md,
    plainText,
    html,
  };
}
