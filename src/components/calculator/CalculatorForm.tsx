'use client';

import React from 'react';
import {
  Building2,
  Home,
  Cpu,
  Lightbulb,
  Thermometer,
  ShieldAlert,
  Blinds,
  Shield,
  Check,
} from 'lucide-react';
import {
  CalculatorInputs,
  PropertyType,
  HubType,
  BrandTier,
  SystemModuleKey,
} from '@/lib/calculator/types';
import { HUBS_CATALOG } from '@/lib/calculator/catalog';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onChange: (newInputs: CalculatorInputs) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  onChange,
}) => {
  const handlePropertyTypeChange = (propertyType: PropertyType) => {
    onChange({ ...inputs, propertyType });
  };

  const handleAreaChange = (areaVal: number) => {
    onChange({ ...inputs, area: areaVal });
  };

  const handleRoomsChange = (rooms: number) => {
    onChange({ ...inputs, rooms });
  };

  const handleBathroomsChange = (bathrooms: number) => {
    onChange({ ...inputs, bathrooms });
  };

  const handleHubChange = (hub: HubType) => {
    onChange({ ...inputs, hub });
  };

  const handleTierChange = (brandTier: BrandTier) => {
    onChange({ ...inputs, brandTier });
  };

  const handleModuleToggle = (moduleKey: SystemModuleKey) => {
    onChange({
      ...inputs,
      modules: {
        ...inputs.modules,
        [moduleKey]: !inputs.modules[moduleKey],
      },
    });
  };

  return (
    <div className="space-y-10">
      {/* 1. Тип объекта и базовые параметры */}
      <section className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
            1
          </span>
          <h2 className="text-lg font-bold text-white">Параметры объекта</h2>
        </div>

        {/* Выбор: Квартира или Дом */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handlePropertyTypeChange('apartment')}
            className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-semibold transition-all ${
              inputs.propertyType === 'apartment'
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-glow-cyan'
                : 'border-slate-800 bg-dark-950/70 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>Квартира</span>
          </button>

          <button
            type="button"
            onClick={() => handlePropertyTypeChange('house')}
            className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-semibold transition-all ${
              inputs.propertyType === 'house'
                ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-glow-amber'
                : 'border-slate-800 bg-dark-950/70 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Загородный дом</span>
          </button>
        </div>

        {/* Площадь объекта: Slider + Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="area-range" className="text-sm font-medium text-slate-300">
              Общая площадь объекта
            </label>
            <div className="flex items-center gap-1.5 bg-dark-950 border border-slate-700 rounded-lg px-3 py-1">
              <input
                id="area-number"
                type="number"
                min={15}
                max={500}
                value={inputs.area}
                onChange={(e) => handleAreaChange(Number(e.target.value))}
                className="w-16 bg-transparent text-right text-base font-bold text-cyan-400 focus:outline-none"
                aria-label="Площадь в квадратных метрах"
              />
              <span className="text-xs text-slate-400 font-medium">м²</span>
            </div>
          </div>
          <input
            id="area-range"
            type="range"
            min={15}
            max={300}
            step={5}
            value={inputs.area}
            onChange={(e) => handleAreaChange(Number(e.target.value))}
            className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            aria-label="Ползунок площади"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-1">
            <span>15 м²</span>
            <span>60 м²</span>
            <span>120 м²</span>
            <span>200 м²</span>
            <span>300+ м²</span>
          </div>
        </div>

        {/* Количество комнат и санузлов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Комнаты */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Количество жилых комнат
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  aria-label={`${num} комнат`}
                  onClick={() => handleRoomsChange(num)}
                  className={`h-10 rounded-xl border text-sm font-bold transition-all ${
                    inputs.rooms === num
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-glow-cyan'
                      : 'border-slate-800 bg-dark-950 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {num === 5 ? '5+' : num}
                </button>
              ))}
            </div>
          </div>

          {/* Санузлы */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Санузлы / зоны водоснабжения
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  aria-label={`${num} санузла`}
                  onClick={() => handleBathroomsChange(num)}
                  className={`h-10 rounded-xl border text-sm font-bold transition-all ${
                    inputs.bathrooms === num
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-glow-amber'
                      : 'border-slate-800 bg-dark-950 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {num === 4 ? '4+' : num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Выбор центрального контроллера / экосистемы */}
      <section className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
              2
            </span>
            <h2 className="text-lg font-bold text-white">Центральный хаб / Платформа</h2>
          </div>
          <span className="text-xs text-slate-400">«Мозги» системы</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {(Object.keys(HUBS_CATALOG) as HubType[]).map((hubKey) => {
            const hub = HUBS_CATALOG[hubKey];
            const isSelected = inputs.hub === hubKey;
            return (
              <div
                key={hubKey}
                onClick={() => handleHubChange(hubKey)}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-glow-cyan'
                    : 'border-slate-800 bg-dark-950/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      {hub.brand}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {hub.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug mb-1">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {hub.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Cpu className="h-3 w-3" /> Пусконаладка: {hub.setupCost.toLocaleString('ru-RU')} ₽
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 font-bold text-cyan-300">
                      <Check className="h-3.5 w-3.5" /> Выбран
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Брендовый сегмент оборудования */}
      <section className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
              3
            </span>
            <h2 className="text-lg font-bold text-white">Ценовой сегмент периферии</h2>
          </div>
          <span className="text-xs text-slate-400">Датчики, реле и приводы</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Budget */}
          <div
            data-testid="tier-budget"
            onClick={() => handleTierChange('budget')}
            className={`rounded-2xl border p-4 cursor-pointer transition-all ${
              inputs.brandTier === 'budget'
                ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                : 'border-slate-800 bg-dark-950/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Бюджет
              </span>
              <span className="text-[11px] text-slate-400">Эконом</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Sonoff & Tuya Zigbee</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Доступное беспроводное оборудование. Одноканальные силовые реле и базовые сенсоры для практичных решений.
            </p>
            <div className="text-[11px] text-slate-300 font-medium bg-dark-900 rounded-lg p-2 border border-slate-800">
              ✓ Максимум функций за минимальный бюджет
            </div>
          </div>

          {/* Optimum */}
          <div
            onClick={() => handleTierChange('optimum')}
            className={`relative rounded-2xl border p-4 cursor-pointer transition-all ${
              inputs.brandTier === 'optimum'
                ? 'border-amber-500 bg-amber-500/10 shadow-glow-amber'
                : 'border-slate-800 bg-dark-950/80 hover:border-slate-700'
            }`}
          >
            <div className="absolute -top-2.5 right-4 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black uppercase text-dark-950">
              Выбор 85% клиентов
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Оптимум
              </span>
              <span className="text-[11px] text-amber-300">Хит</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Aqara & Sonoff Pro</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Флагманский дизайн, премиальный пластик, двухканальные микрореле T2 и батареи до 3–5 лет работы.
            </p>
            <div className="text-[11px] text-slate-300 font-medium bg-dark-900 rounded-lg p-2 border border-slate-800">
              ✓ Идеальный баланс эстетики и надёжности
            </div>
          </div>

          {/* Premium */}
          <div
            onClick={() => handleTierChange('premium')}
            className={`rounded-2xl border p-4 cursor-pointer transition-all ${
              inputs.brandTier === 'premium'
                ? 'border-cyan-500 bg-cyan-500/10 shadow-glow-cyan'
                : 'border-slate-800 bg-dark-950/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Премиум
              </span>
              <span className="text-[11px] text-slate-400">Локальный топ</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Sprut & Aqara Pro</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Отечественные модули Sprut промышленного уровня, сенсоры качества воздуха CO2/VOC и радары присутствия FP2.
            </p>
            <div className="text-[11px] text-slate-300 font-medium bg-dark-900 rounded-lg p-2 border border-slate-800">
              ✓ Бескомпромиссная автономность и радары mmWave
            </div>
          </div>
        </div>
      </section>

      {/* 4. Выбор подключаемых систем */}
      <section className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
              4
            </span>
            <h2 className="text-lg font-bold text-white">Системы и автоматизации</h2>
          </div>
          <span className="text-xs text-slate-400">Включите нужные сценарии</span>
        </div>

        <div className="space-y-3">
          {/* Освещение */}
          <div
            onClick={() => handleModuleToggle('lighting')}
            className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
              inputs.modules.lighting
                ? 'border-amber-500/50 bg-amber-500/10'
                : 'border-slate-800 bg-dark-950/70 opacity-60'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Умное освещение и выключатели</h3>
                <input
                  type="checkbox"
                  checked={inputs.modules.lighting}
                  onChange={() => {}}
                  className="h-4 w-4 rounded accent-amber-500"
                  aria-label="Включить модуль освещения"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Скрытые микрореле в подрозетники, сценарии «Выключить всё» при уходе и мягкая ночная подсветка.
              </p>
            </div>
          </div>

          {/* Климат */}
          <div
            onClick={() => handleModuleToggle('climate')}
            className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
              inputs.modules.climate
                ? 'border-cyan-500/50 bg-cyan-500/10'
                : 'border-slate-800 bg-dark-950/70 opacity-60'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <Thermometer className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Климат-контроль и радиаторы</h3>
                <input
                  type="checkbox"
                  checked={inputs.modules.climate}
                  onChange={() => {}}
                  className="h-4 w-4 rounded accent-cyan-500"
                  aria-label="Включить модуль климата"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Покомнатный контроль температуры через датчики, термоголовки на батареи и автоматизация кондиционеров.
              </p>
            </div>
          </div>

          {/* Защита от протечек */}
          <div
            onClick={() => handleModuleToggle('leakage')}
            className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
              inputs.modules.leakage
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-slate-800 bg-dark-950/70 opacity-60'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Защита от протечек с автоперекрытием</h3>
                <input
                  type="checkbox"
                  checked={inputs.modules.leakage}
                  onChange={() => {}}
                  className="h-4 w-4 rounded accent-emerald-500"
                  aria-label="Включить модуль защиты от протечек"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Беспроводные датчики под мойками/ваннами + краны с сервоприводами. Моментальное перекрытие за 5-10 секунд без интернета.
              </p>
            </div>
          </div>

          {/* Электрокарнизы */}
          <div
            onClick={() => handleModuleToggle('curtains')}
            className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
              inputs.modules.curtains
                ? 'border-purple-500/50 bg-purple-500/10'
                : 'border-slate-800 bg-dark-950/70 opacity-60'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <Blinds className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Электрокарнизы и шторы</h3>
                <input
                  type="checkbox"
                  checked={inputs.modules.curtains}
                  onChange={() => {}}
                  className="h-4 w-4 rounded accent-purple-500"
                  aria-label="Включить модуль штор"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Бесшумные электроприводы для штор и жалюзи. Открытие по будильнику, закрытие на ночь и по фразе «Алиса, закрой шторы».
              </p>
            </div>
          </div>

          {/* Безопасность */}
          <div
            onClick={() => handleModuleToggle('security')}
            className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
              inputs.modules.security
                ? 'border-blue-500/50 bg-blue-500/10'
                : 'border-slate-800 bg-dark-950/70 opacity-60'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Безопасность и контроль доступа</h3>
                <input
                  type="checkbox"
                  checked={inputs.modules.security}
                  onChange={() => {}}
                  className="h-4 w-4 rounded accent-blue-500"
                  aria-label="Включить модуль безопасности"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Датчики открытия входной двери и окон, датчики движения и присутствия с оповещениями в Telegram при отсутствии хозяев.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
