'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Building2, Trees } from 'lucide-react';
import { SearchModalProps } from './SearchModal.types';

import { Link } from '@/navigation';
import { useRouter } from '@/navigation';

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // In a real app, this would route to a search results page.
      // For now, we'll route to plots if they search for plots, amenities if amenities, etc.
      // Since we don't have a dedicated search page, we just close it.
      const lq = query.toLowerCase();
      if (lq.includes('plot')) {
        router.push('/plots');
      } else if (lq.includes('amenit') || lq.includes('school') || lq.includes('hospital')) {
        router.push('/amenities');
      }
      onClose();
    }
  };

  const quickLinks = [
    { icon: <MapPin size={18} />, label: 'Residential Plots', href: '/plots' },
    { icon: <Building2 size={18} />, label: 'Commercial Plots', href: '/plots' },
    { icon: <Trees size={18} />, label: 'Amenities & Parks', href: '/amenities' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0b1420]/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[90%] max-w-2xl bg-surface-white rounded-2xl shadow-2xl border border-border-subtle overflow-hidden"
          >
            {/* Header / Input area */}
            <form onSubmit={handleSearch} className="relative flex items-center p-4 border-b border-border-subtle">
              <Search className="absolute left-6 text-brand-gold w-6 h-6" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for plots, amenities, location..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-text-primary text-lg md:text-xl pl-12 pr-12 py-3 placeholder-text-muted"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-6 p-2 text-text-muted hover:text-text-primary hover:bg-surface-cream rounded-full transition-colors focus:outline-brand-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="p-6 bg-surface-cream">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-col gap-2">
                {quickLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white text-text-primary transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-medium group-hover:text-brand-gold transition-colors">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
