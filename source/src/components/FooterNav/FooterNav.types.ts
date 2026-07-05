export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterNavColumn {
  title: string;
  links: FooterNavLink[];
}

export interface FooterNavProps {
  columns: FooterNavColumn[];
  className?: string;
}
