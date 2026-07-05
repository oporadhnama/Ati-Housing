export interface HeroCTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost';
}

export interface HeroStat {
  value: string | number;
  label: string;
}

export interface HeroSlide {
  headline: string;
  subheadline: string;
}

export interface HeroSectionProps {
  heading: string;
  subheading: string;
  ctas: HeroCTA[];
  backgroundImage: string | string[];
  slides?: HeroSlide[];
  stats?: HeroStat[];
  className?: string;
}
