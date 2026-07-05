import { AmenityItemProps } from '../AmenityItem/AmenityItem.types';

export interface AmenityGridProps {
  amenities: AmenityItemProps[];
  expanded?: boolean;
  className?: string;
}
// Note: Icon options map to the key strings parsed in AmenityItem
