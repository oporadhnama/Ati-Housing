'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LightboxProps } from './Lightbox.types';

export const Lightbox: React.FC<LightboxProps> = ({
  src,
  alt,
  isOpen,
  onClose,
  onPrev,
  onNext,
  className = '',
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button on mount for screen readers
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-brand-gold p-2 bg-brand-navy bg-opacity-50 hover:bg-opacity-80 transition-all rounded-sm focus-visible:outline-brand-gold"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Controls */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold p-2 bg-brand-navy bg-opacity-50 hover:bg-opacity-80 transition-all rounded-sm focus-visible:outline-brand-gold"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold p-2 bg-brand-navy bg-opacity-50 hover:bg-opacity-80 transition-all rounded-sm focus-visible:outline-brand-gold"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image Container */}
      <div className="relative w-full max-w-5xl aspect-[4/3] max-h-[80vh] flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-contain"
          priority
        />
      </div>

      {/* Caption Alt strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-brand-navy bg-opacity-80 border border-border-subtle px-6 py-2 rounded-sm text-center">
        <p className="text-white text-xs font-body tracking-wider uppercase">
          {alt}
        </p>
      </div>
    </div>
  );
};
