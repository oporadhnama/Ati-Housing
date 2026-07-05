'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { TeamGridProps } from './TeamGrid.types';
import { Mail } from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const TeamGrid: React.FC<TeamGridProps> = ({ className = '' }) => {
  const t = useTranslations('About.team');

  // We will dynamically fetch translated lists using raw or standard structure
  // Since we populated board with 6 items and mgmt with 4 items:
  const boardItems = [
    { image: '/images/team/team_2_1.webp', id: 0 },
    { image: '/images/team/team_2_2.webp', id: 1 },
    { image: '/images/team/team_2_3.webp', id: 2 },
    { image: '/images/team/team_2_4.webp', id: 3 },
    { image: '/images/team/team_2_5.webp', id: 4 },
    { image: '/images/team/team_2_6.webp', id: 5 },
  ];

  const mgmtItems = [
    { image: '/images/team/team_1_1.webp', id: 0 },
    { image: '/images/team/team_1_2.webp', id: 1 },
    { image: '/images/team/team_1_3.webp', id: 2 },
    { image: '/images/team/team_1_4.webp', id: 3 },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const renderCard = (item: { image: string; id: number }, pathKey: 'board' | 'mgmt') => {
    const name = t(`${pathKey}.${item.id}.name`);
    const role = t(`${pathKey}.${item.id}.role`);

    return (
      <motion.div
        key={item.image}
        variants={cardVariants}
        whileHover={{ y: -6 }}
        className="bg-white border border-border-subtle group overflow-hidden transition-all duration-300 hover:border-brand-gold hover:shadow-xl flex flex-col"
      >
        {/* Photo Container */}
        <div className="relative aspect-[3/4] w-full bg-brand-navy overflow-hidden">
          <Image
            src={item.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Staggered micro-animation gradient & social overlay */}
          <div className="absolute inset-0 bg-brand-navy bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-sm bg-brand-gold hover:bg-white text-brand-navy hover:text-brand-gold transition-colors duration-300 flex items-center justify-center shadow-md"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-sm bg-brand-gold hover:bg-white text-brand-navy hover:text-brand-gold transition-colors duration-300 flex items-center justify-center shadow-md"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Text Container */}
        <div className="p-5 flex flex-col flex-grow text-center">
          <h4 className="font-display font-bold text-brand-navy text-base tracking-tight mb-1 group-hover:text-brand-gold transition-colors duration-200">
            {name}
          </h4>
          <p className="text-text-muted text-xs font-body uppercase tracking-wider">
            {role}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`space-y-16 ${className}`}>
      {/* Board of Directors Section */}
      <div className="space-y-8">
        <div className="border-b border-border-subtle pb-4">
          <h3 className="font-display font-bold text-2xl text-brand-navy">
            {t('boardTitle')}
          </h3>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {boardItems.map((item) => renderCard(item, 'board'))}
        </motion.div>
      </div>

      {/* Management Committee Section */}
      <div className="space-y-8">
        <div className="border-b border-border-subtle pb-4">
          <h3 className="font-display font-bold text-2xl text-brand-navy">
            {t('mgmtTitle')}
          </h3>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {mgmtItems.map((item) => renderCard(item, 'mgmt'))}
        </motion.div>
      </div>
    </div>
  );
};
