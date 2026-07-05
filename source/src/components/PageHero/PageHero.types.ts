import { BreadcrumbItem } from '../Breadcrumb/Breadcrumb.types';

export interface PageHeroProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
  className?: string;
}
