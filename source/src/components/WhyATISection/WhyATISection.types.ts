export interface WhyFeature {
  title: string;
  text: string;
}

export interface WhyStat {
  value: string;
  label: string;
}

export interface WhyATISectionProps {
  heading: string;
  subheading?: string;
  features: WhyFeature[];
  stats: WhyStat[];
  className?: string;
}
// Note: Icon classes inside features list are mapped sequentially to support line icons
