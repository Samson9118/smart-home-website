import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { EstimateResult } from '@/lib/calculator/types';
import { registerPdfFonts } from '@/lib/pdf/fonts';
import { siteConfig } from '@/config/site';

// Ensure fonts are registered before rendering
registerPdfFonts();

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 9,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 35,
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: '#0F172A',
    paddingBottom: 12,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: '#D97706', // amber-600 for print readability
  },
  brandSubtitle: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  companyContacts: {
    textAlign: 'right',
  },
  contactText: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 1.5,
  },
  docTitleBlock: {
    marginBottom: 14,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
  },
  docMeta: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 2,
  },

  // --- Object Parameters Box ---
  paramsCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  paramsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  paramsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paramItem: {
    width: '32%',
    marginBottom: 4,
  },
  paramLabel: {
    fontSize: 7.5,
    color: '#64748B',
  },
  paramValue: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 1,
  },

  // --- Table ---
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 4.5,
    paddingHorizontal: 6,
  },
  tableRowEven: {
    backgroundColor: '#F8FAFC',
  },
  colNum: { width: '6%', textAlign: 'center' },
  colName: { width: '46%' },
  colBrand: { width: '14%', textAlign: 'center' },
  colQty: { width: '8%', textAlign: 'center' },
  colPrice: { width: '13%', textAlign: 'right' },
  colTotal: { width: '13%', textAlign: 'right', fontWeight: 'bold' },

  thText: {
    fontSize: 7.5,
    color: '#F8FAFC',
    fontWeight: 'bold',
  },
  tdText: {
    fontSize: 8,
    color: '#1E293B',
  },
  tdDesc: {
    fontSize: 6.5,
    color: '#64748B',
    marginTop: 1,
  },

  // --- Works & Installation Block ---
  worksBox: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  worksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  worksRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    marginTop: 3,
    fontWeight: 'bold',
  },

  // --- Grand Total Banner ---
  grandTotalBox: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#78350F',
    textTransform: 'uppercase',
  },
  grandTotalSub: {
    fontSize: 7.5,
    color: '#92400E',
    marginTop: 2,
  },
  grandTotalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B45309',
  },

  // --- Guarantees & Signatures Footer ---
  guaranteesBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
  guaranteeText: {
    fontSize: 7,
    color: '#475569',
    lineHeight: 1.3,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#94A3B8',
    height: 18,
    marginBottom: 3,
  },
  signatureLabel: {
    fontSize: 7,
    color: '#64748B',
  },

  // --- Page Number ---
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 35,
    right: 35,
    textAlign: 'center',
    fontSize: 7,
    color: '#94A3B8',
  },
});

interface EstimatePdfDocumentProps {
  estimate: EstimateResult;
  docNumber?: string;
  dateStr?: string;
}

export const EstimatePdfDocument: React.FC<EstimatePdfDocumentProps> = ({
  estimate,
  docNumber = 'КП-2026-081',
  dateStr,
}) => {
  const currentDate =
    dateStr ||
    new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const { inputs, equipment, totalEquipmentPrice, installationPrice, setupPrice, totalWorksPrice, totalPrice, estimatedDays } = estimate;

  const propertyTypeLabel = inputs.propertyType === 'house' ? 'Загородный дом' : 'Квартира';

  const brandTierLabels: Record<string, string> = {
    budget: 'Бюджет (Sonoff / Tuya Zigbee)',
    optimum: 'Оптимум (Aqara / Sonoff)',
    premium: 'Премиум (Sprut / Aqara Pro)',
  };

  const hubName = equipment.find((e) => e.category === 'hub')?.name || 'Home Assistant';

  return (
    <Document title={`Смета SmartHome Lab - ${docNumber}`} author={siteConfig.name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>
              SmartHome<Text style={styles.brandAccent}>.Lab</Text>
            </Text>
            <Text style={styles.brandSubtitle}>
              Проектирование и монтаж беспроводного умного дома
            </Text>
          </View>
          <View style={styles.companyContacts}>
            <Text style={styles.contactText}>Тел: {siteConfig.phone}</Text>
            <Text style={styles.contactText}>Email: {siteConfig.email}</Text>
            <Text style={styles.contactText}>Telegram: @{siteConfig.telegramBot}</Text>
            <Text style={styles.contactText}>{siteConfig.url.replace(/^https?:\/\//, '')}</Text>
          </View>
        </View>

        {/* Document Title */}
        <View style={styles.docTitleBlock}>
          <Text style={styles.docTitle}>
            КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ / СПЕЦИФИКАЦИЯ № {docNumber}
          </Text>
          <Text style={styles.docMeta}>
            Дата расчёта: {currentDate} • Срок действия условий: 30 календарных дней
          </Text>
        </View>

        {/* Object Parameters Card */}
        <View style={styles.paramsCard}>
          <Text style={styles.paramsTitle}>Параметры объекта и архитектура системы</Text>
          <View style={styles.paramsGrid}>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Тип объекта:</Text>
              <Text style={styles.paramValue}>{propertyTypeLabel}</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Площадь объекта:</Text>
              <Text style={styles.paramValue}>{inputs.area} м²</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Комнат / Санузлов:</Text>
              <Text style={styles.paramValue}>{inputs.rooms} комн. / {inputs.bathrooms} с/у</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Центральный хаб:</Text>
              <Text style={styles.paramValue}>{hubName}</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Сегмент периферии:</Text>
              <Text style={styles.paramValue}>{brandTierLabels[inputs.brandTier] || inputs.brandTier}</Text>
            </View>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Плановый срок монтажа:</Text>
              <Text style={styles.paramValue}>
                {estimatedDays === 1 ? '1 рабочий день' : `${estimatedDays} рабочих дня`}
              </Text>
            </View>
          </View>
        </View>

        {/* Specification Table */}
        <Text style={styles.sectionTitle}>1. Спецификация оборудования и модулей</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colNum]}>№</Text>
            <Text style={[styles.thText, styles.colName]}>Наименование позиции</Text>
            <Text style={[styles.thText, styles.colBrand]}>Бренд</Text>
            <Text style={[styles.thText, styles.colQty]}>Кол-во</Text>
            <Text style={[styles.thText, styles.colPrice]}>Цена, ₽</Text>
            <Text style={[styles.thText, styles.colTotal]}>Сумма, ₽</Text>
          </View>

          {/* Table Rows */}
          {equipment.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <View
                key={item.id}
                style={[styles.tableRow, isEven ? styles.tableRowEven : {}]}
                wrap={false}
              >
                <Text style={[styles.tdText, styles.colNum]}>{index + 1}</Text>
                <View style={styles.colName}>
                  <Text style={styles.tdText}>{item.name}</Text>
                  <Text style={styles.tdDesc}>{item.description}</Text>
                </View>
                <Text style={[styles.tdText, styles.colBrand]}>{item.brand}</Text>
                <Text style={[styles.tdText, styles.colQty]}>{item.quantity} шт.</Text>
                <Text style={[styles.tdText, styles.colPrice]}>
                  {item.unitPrice.toLocaleString('ru-RU')}
                </Text>
                <Text style={[styles.tdText, styles.colTotal]}>
                  {item.totalPrice.toLocaleString('ru-RU')}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Works, Installation & Setup Box */}
        <Text style={styles.sectionTitle}>2. Монтажные и пусконаладочные работы</Text>
        <View style={styles.worksBox}>
          <View style={styles.worksRow}>
            <Text style={styles.tdText}>
              Чистовой монтаж беспроводного оборудования (установка реле в подрозетники, датчиков, сервоприводов)
            </Text>
            <Text style={styles.tdText}>{installationPrice.toLocaleString('ru-RU')} ₽</Text>
          </View>
          <View style={styles.worksRow}>
            <Text style={styles.tdText}>
              Пусконаладочные работы, настройка локального сервера/хаба, программирование логики сценариев и голосового управления
            </Text>
            <Text style={styles.tdText}>{setupPrice.toLocaleString('ru-RU')} ₽</Text>
          </View>
          <View style={styles.worksRowTotal}>
            <Text style={[styles.tdText, { fontWeight: 'bold' }]}>Итого за монтаж и пусконаладку:</Text>
            <Text style={[styles.tdText, { fontWeight: 'bold' }]}>{totalWorksPrice.toLocaleString('ru-RU')} ₽</Text>
          </View>
        </View>

        {/* Grand Total Box */}
        <View style={styles.grandTotalBox}>
          <View>
            <Text style={styles.grandTotalLabel}>ИТОГО ПО СМЕТЕ (ОБОРУДОВАНИЕ + РАБОТЫ):</Text>
            <Text style={styles.grandTotalSub}>
              Оборудование: {totalEquipmentPrice.toLocaleString('ru-RU')} ₽ • Монтаж и пусконаладка: {totalWorksPrice.toLocaleString('ru-RU')} ₽
            </Text>
          </View>
          <Text style={styles.grandTotalAmount}>{totalPrice.toLocaleString('ru-RU')} ₽</Text>
        </View>

        {/* Guarantees Box */}
        <View style={styles.guaranteesBox}>
          <Text style={styles.guaranteeText}>
            • Гарантия на всё оборудование и выполненные монтажные работы составляет 24 месяца по официальному договору.{'\n'}
            • Система работает 100% локально по протоколам Zigbee 3.0 / Matter и сохраняет сценарии при отключении интернета.{'\n'}
            • В стоимость пусконаладки включено обучение пользователя и сопровождение инженера в течение первых 30 дней.
          </Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>
              Инженер-проектировщик {siteConfig.name} / М.П.
            </Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>
              С условиями сметы ознакомлен (Заказчик)
            </Text>
          </View>
        </View>

        {/* Page Footer */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Страница ${pageNumber} из ${totalPages} • ${siteConfig.name} • ${siteConfig.phone}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
