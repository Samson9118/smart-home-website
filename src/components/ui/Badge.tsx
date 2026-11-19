import React from 'react';

export type BadgeVariant = 'amber' | 'cyan' | 'slate' | 'emerald' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  children,
  className = '',
  dot = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors';

  const variantStyles: Record<BadgeVariant, string> = {
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
    outline: 'bg-transparent text-slate-300 border border-slate-700',
  };

  const dotColors: Record<BadgeVariant, string> = {
    amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    cyan: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    slate: 'bg-slate-400',
    outline: 'bg-slate-400',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
