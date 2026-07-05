import React from 'react';
import { Link } from '@/navigation';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  type = 'button',
  children,
  className = '',
  disabled = false,
  download,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-body font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-sm';

  const variantStyles = {
    primary: 'bg-brand-gold hover:bg-brand-gold-dark text-white border border-transparent shadow-sm',
    secondary: 'border border-brand-navy hover:bg-brand-navy hover:text-white text-brand-navy bg-transparent',
    ghost: 'text-brand-navy hover:bg-surface-cream bg-transparent border-transparent',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} onClick={onClick} download={download}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
