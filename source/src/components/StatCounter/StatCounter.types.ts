export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
}
