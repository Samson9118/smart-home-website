import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'cyan' | 'outline' | 'ghost' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 font-semibold shadow-glow-amber hover:from-amber-400 hover:to-amber-500 hover:shadow-lg focus:ring-amber-500 active:scale-[0.98]',
    cyan:
      'bg-gradient-to-r from-cyan-500 to-cyan-600 text-dark-950 font-semibold shadow-glow-cyan hover:from-cyan-400 hover:to-cyan-500 hover:shadow-lg focus:ring-cyan-500 active:scale-[0.98]',
    secondary:
      'bg-dark-800 text-slate-100 border border-slate-700/80 hover:bg-dark-700 hover:border-slate-600 focus:ring-slate-500 active:scale-[0.98]',
    outline:
      'border border-cyan-500/40 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-400 focus:ring-cyan-500 active:scale-[0.98]',
    glass:
      'bg-dark-800/60 backdrop-blur-md border border-white/10 text-slate-100 hover:bg-dark-700/80 hover:border-white/20 shadow-glow-glass focus:ring-cyan-500 active:scale-[0.98]',
    ghost:
      'text-slate-300 hover:text-white hover:bg-dark-800/50 focus:ring-slate-600',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
