import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../Button/Button';
import { BrochureDownloadButtonProps } from './BrochureDownloadButton.types';

export const BrochureDownloadButton: React.FC<BrochureDownloadButtonProps> = ({
  label,
  className = '',
}) => {
  return (
    <Button
      variant="secondary"
      href="/brochure.pdf"
      download="ATI_Model_Town_Brochure.pdf"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <Download className="w-4 h-4" />
      {label}
    </Button>
  );
};
