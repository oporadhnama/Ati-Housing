export interface SearchFilters {
  type: string;
  size: string;
  purpose: string;
}

export interface SearchFilterBarProps {
  onFilter?: (filters: SearchFilters) => void;
  isSticky?: boolean;
  noBorderBottom?: boolean;
  className?: string;
}
// Note: Options for the search dropdown elements are translated inside the component using next-intl
