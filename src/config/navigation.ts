export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  children?: {
    title: string;
    href: string;
    desc?: string;
  }[];
}

export const navItems: NavItem[] = [
  { title: 'Главная', href: '/' },
  {
    title: 'Услуги',
    href: '/services',
    children: [
      { title: '💡 Умное освещение', href: '/services/lighting', desc: 'Свет без нуля, циркадные сценарии и mmWave радары' },
      { title: '🌡 Умный климат', href: '/services/climate', desc: 'Радиаторы, теплые полы, кондиционеры и датчики CO2' },
      { title: '🛡 Безопасность и протечки', href: '/services/security', desc: 'Шаровые электрокраны 12V, защита от потопа за 10 сек' },
      { title: '📹 Видеонаблюдение и замки', href: '/services/surveillance', desc: 'Смарт-замки Matter, умные домофоны и локальный NVR' },
    ],
  },
  { title: 'База знаний', href: '/knowledge', badge: 'Гид' },
  { title: 'Статьи', href: '/articles' },
  { title: 'Калькулятор сметы', href: '/calculator', badge: 'PDF' },
  { title: 'Портфолио', href: '/portfolio' },
  { title: 'Контакты', href: '/contacts' },
];
