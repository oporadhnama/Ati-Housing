import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  download?: string;
}
