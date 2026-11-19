'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, MessageSquare, Calculator, ChevronRight } from 'lucide-react';
import { navItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="border-b border-slate-800 bg-dark-950/95 backdrop-blur-xl md:hidden overflow-hidden"
        >
          <div className="space-y-1 px-4 pt-3 pb-6">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </Link>
              );
            })}

            {/* Quick Actions in Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
              <Button
                href="/calculator"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<Calculator className="h-4 w-4" />}
                onClick={onClose}
              >
                Онлайн-калькулятор сметы
              </Button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`https://t.me/${siteConfig.telegramBot}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-dark-800 px-3 py-2.5 text-xs font-medium text-slate-200 hover:text-white hover:border-cyan-500/40"
                >
                  <Send className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Telegram</span>
                </a>
                <a
                  href={siteConfig.maxBotLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-dark-800 px-3 py-2.5 text-xs font-medium text-slate-200 hover:text-white hover:border-amber-500/40"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
                  <span>MAX Бот</span>
                </a>
              </div>

              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-amber-400 pt-1"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
