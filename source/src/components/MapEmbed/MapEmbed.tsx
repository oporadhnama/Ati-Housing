import React from 'react';
import { MapEmbedProps } from './MapEmbed.types';

export const MapEmbed: React.FC<MapEmbedProps> = ({ title, className = '' }) => {
  // Safe Google Maps Embed coordinates url targeting Ati Model Town, Keraniganj
  const mapSource = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.8809986341235!2d90.31683417606828!3d23.715938578696865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755953046f48a1d%3A0xe543383a1523c91c!2sAti%20Model%20Town!5e0!3m2!1sen!2sbd!4v1718536838320!5m2!1sen!2sbd";

  return (
    <div className={`w-full overflow-hidden border border-border-subtle bg-surface-cream relative min-h-[350px] ${className}`}>
      <iframe
        title={title}
        src={mapSource}
        width="100%"
        height="100%"
        className="absolute inset-0 border-0 filter grayscale opacity-80 contrast-125 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
