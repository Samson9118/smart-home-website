'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Cpu, Send, PhoneCall, ChevronDown } from 'lucide-react';
import { navItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-all">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
            aria-label={`${siteConfig.name} - Главная`}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-amber-500 p-[1px] shadow-glow-cyan">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
                <Cpu className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">
                SmartHome<span className="text-amber-400">.Lab</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Zigbee • Matter • Thread
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.children && pathname.startsWith(item.href));

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative group"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                        isActive
                          ? 'text-cyan-400 bg-cyan-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {item.title}
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 w-80 pt-2 transition-all duration-200 ${
                        servicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl p-3 shadow-2xl space-y-1">
                        <Link
                          href="/services"
                          className="block px-3 py-2 text-xs font-bold text-amber-400 hover:bg-slate-900 rounded-lg"
                        >
                          Все услуги и готовые тарифы →
                        </Link>
                        <div className="h-px bg-slate-800/80 my-1" />
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block p-2.5 rounded-xl hover:bg-slate-900 transition-colors group/sub"
                          >
                            <div className="text-xs font-bold text-white group-hover/sub:text-cyan-400 transition-colors">
                              {sub.title}
                            </div>
                            {sub.desc && (
                              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                {sub.desc}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.title}
                  {item.badge && (
                    <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`https://t.me/${siteConfig.telegramBot}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 hover:text-white hover:bg-slate-800 hover:border-cyan-500/50 transition-colors"
              title="Написать в Telegram инженеру"
              aria-label="Telegram"
            >
              <Send className="h-4 w-4" />
            </a>

            <Button
              href="/calculator"
              variant="primary"
              size="sm"
            >
              Рассчитать смету
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-amber-400"
              aria-label="Позвонить инженеру"
            >
              <PhoneCall className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        currentPath={pathname}
      />
    </header>
  );
};
