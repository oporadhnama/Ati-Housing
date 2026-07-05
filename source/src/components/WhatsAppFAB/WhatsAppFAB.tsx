'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { WhatsAppFABProps } from './WhatsAppFAB.types';

export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({
  phoneNumber,
  message,
  className = '',
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  const prefersReduced = useReducedMotion();

  const [showTooltip, setShowTooltip] = useState(false);
  const [showAttentionPulse, setShowAttentionPulse] = useState(false);

  /* ── Fire attention pulse once after 8 seconds ── */
  useEffect(() => {
    if (prefersReduced) return;
    const timer = setTimeout(() => {
      setShowAttentionPulse(true);
      setTimeout(() => setShowAttentionPulse(false), 2000);
    }, 8000);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <div className={`fixed bottom-6 left-6 z-50 flex flex-row-reverse items-center justify-end gap-3 ${className}`}>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0b1420] text-white text-xs font-body font-medium px-3 py-2 rounded-sm shadow-lg whitespace-nowrap border border-brand-gold/20 pointer-events-none"
          >
            Chat with us on WhatsApp
            {/* Arrow */}
            <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-[#0b1420]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <div className="relative">
        {/* Attention pulse rings */}
        <AnimatePresence>
          {showAttentionPulse && !prefersReduced && (
            <>
              <motion.span
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                exit={{}}
                className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
              />
              <motion.span
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
                exit={{}}
                className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        {/* Continuous subtle ping */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={prefersReduced ? {} : { scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          className="relative flex items-center justify-center bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.35)] cursor-pointer hover:shadow-[0_8px_32px_rgba(37,211,102,0.45)] transition-shadow duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            className="w-6 h-6 fill-current relative z-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.407 1.46h.007c5.908 0 10.718-4.811 10.722-10.722.003-2.864-1.111-5.556-3.14-7.589C17.616 1.27 14.928.156 12.01.156c-5.905 0-10.718 4.811-10.722 10.723-.001 1.914.502 3.79 1.462 5.4l-.993 3.634 3.712-.975zm12.92-5.467c-.29-.145-1.716-.848-1.982-.945-.266-.096-.46-.145-.653.145-.193.29-.75.945-.918 1.135-.168.19-.336.213-.627.068-.29-.145-1.226-.452-2.336-1.442-.864-.77-1.447-1.72-1.616-2.01-.168-.29-.018-.448.128-.592.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.362-.024-.507-.073-.145-.653-1.573-.895-2.153-.236-.569-.475-.491-.653-.5-.168-.008-.362-.01-.556-.01-.193 0-.507.072-.772.362-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.802 1.182 2.995.145.193 2.043 3.12 4.949 4.373.69.298 1.23.476 1.65.61.696.22 1.33.19 1.83.115.558-.084 1.716-.7 1.961-1.374.246-.677.246-1.258.173-1.374-.074-.117-.267-.19-.557-.335z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
};
