export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface GalleryGridProps {
  images: GalleryImage[];
  className?: string;
}
