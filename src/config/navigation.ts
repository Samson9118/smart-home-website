export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const navItems: NavItem[] = [
  { title: 'Главная', href: '/' },
  { title: 'Услуги', href: '/services' },
  { title: 'Калькулятор сметы', href: '/calculator', badge: 'Онлайн' },
  { title: 'Портфолио', href: '/portfolio' },
  { title: 'Контакты', href: '/contacts' },
];
