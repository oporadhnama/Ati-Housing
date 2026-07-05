import React from 'react';
import { DividerProps } from './Divider.types';

export const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return (
    <hr className={`border-t border-border-subtle my-6 ${className}`} />
  );
};
