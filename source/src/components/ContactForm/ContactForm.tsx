'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { ContactFormProps } from './ContactForm.types';
import { Button } from '../Button/Button';

// Validation Schema mirroring backend requirements
const createContactSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(2, {
      message: t.has('validationName') ? t('validationName') : 'Name must be at least 2 characters.',
    }).max(80),
    phone: z.string().regex(/^01[3-9]\d{8}$/, {
      message: t.has('validationPhone') ? t('validationPhone') : 'Invalid Bangladesh phone number. (e.g. 017XXXXXXXX)',
    }),
    email: z.string().email({
      message: t.has('validationEmail') ? t('validationEmail') : 'Invalid email address.',
    }).optional().or(z.literal('')),
    plotType: z.enum(['general', 'avenue', 'commercial', 'hospital']).optional().or(z.literal('')),
    plotSize: z.string().max(30).optional().or(z.literal('')),
    message: z.string().max(500).optional().or(z.literal('')),
  });

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const t = useTranslations('Contact');
  const schema = createContactSchema(t);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      plotType: '',
      plotSize: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(t('successMessage'));
        reset();
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('A network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-surface-white border border-border-subtle p-6 md:p-8 rounded-sm ${className}`}>
      <h3 className="font-display font-bold text-brand-navy text-2xl tracking-tight mb-6 uppercase border-b border-border-subtle pb-4">
        {t('headline')}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name field */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-navy block mb-2" htmlFor="form-name">
            {t('formName')} <span className="text-brand-gold">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            {...register('name')}
            className={`w-full bg-surface-cream text-text-primary text-xs font-semibold px-4 py-3 border rounded-sm focus:outline-none focus:border-brand-gold transition-colors ${
              errors.name ? 'border-red-500' : 'border-border-subtle'
            }`}
            placeholder="e.g. Kamrul Hasan"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="text-red-500 text-[10px] mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-navy block mb-2" htmlFor="form-phone">
            {t('formPhone')} <span className="text-brand-gold">*</span>
          </label>
          <input
            id="form-phone"
            type="tel"
            {...register('phone')}
            className={`w-full bg-surface-cream text-text-primary text-xs font-semibold px-4 py-3 border rounded-sm focus:outline-none focus:border-brand-gold transition-colors ${
              errors.phone ? 'border-red-500' : 'border-border-subtle'
            }`}
            placeholder="e.g. 018XXXXXXXX"
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span id="phone-error" className="text-red-500 text-[10px] mt-1 block">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Email field */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-navy block mb-2" htmlFor="form-email">
            {t('formEmail')}
          </label>
          <input
            id="form-email"
            type="email"
            {...register('email')}
            className={`w-full bg-surface-cream text-text-primary text-xs font-semibold px-4 py-3 border border-border-subtle rounded-sm focus:outline-none focus:border-brand-gold transition-colors`}
            placeholder="e.g. info@example.com"
          />
          {errors.email && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.email.message}</span>
          )}
        </div>

        {/* Two-column selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Plot Type */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-brand-navy block mb-2" htmlFor="form-plot-type">
              {t('formPlotType')}
            </label>
            <div className="relative">
              <select
                id="form-plot-type"
                {...register('plotType')}
                className="w-full bg-surface-cream text-text-primary text-xs font-semibold px-4 py-3 border border-border-subtle rounded-sm appearance-none focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="general">General Plot</option>
                <option value="avenue">Avenue Plot</option>
                <option value="commercial">Commercial Plot</option>
                <option value="hospital">Hospital Plot</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Plot Size */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-brand-navy block mb-2" htmlFor="form-plot-size">
              {t('formPlotSize')}
            </label>
            <input
              id="form-plot-size"
              type="text"
              {...register('plotSize')}
              className="w-full bg-surface-cream text-text-primary text-xs font-semibold px-4 py-3 border border-border-subtle rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="e.g. 5 Katha"
            />
          </div>
        </div>

        {/* Message field */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-navy block mb-2" htmlFor="form-message">
            {t('formMessage')}
          </label>
          <textarea
            id="form-message"
            {...register('message')}
            rows={4}
            className="w-full bg-surface-cream text-text-primary text-xs font-semibold px-4 py-3 border border-border-subtle rounded-sm focus:outline-none focus:border-brand-gold transition-colors resize-none"
            placeholder="Type your message here..."
          />
        </div>

        {/* Alerts */}
        {success && (
          <div className="p-4 bg-green-50 text-green-800 border-l-4 border-green-600 text-xs font-semibold rounded-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 text-red-800 border-l-4 border-red-600 text-xs font-semibold rounded-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full mt-4"
        >
          {isSubmitting ? 'Sending Request...' : t('btnSubmit')}
        </Button>
      </form>
    </div>
  );
};
