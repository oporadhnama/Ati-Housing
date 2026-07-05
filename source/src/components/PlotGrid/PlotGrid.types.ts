import { PlotCardProps } from '../PlotCard/PlotCard.types';

export interface PlotGridProps {
  plots: PlotCardProps[];
  expanded?: boolean;
  className?: string;
}
