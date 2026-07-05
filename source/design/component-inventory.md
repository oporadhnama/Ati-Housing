# Component Inventory

This document lists every reusable UI component to be built under `/src/components/` for the ATI Housing rebuild.

---

## Component List

### 1. NavBar
*   **Path:** `/src/components/NavBar/NavBar.tsx`
*   **Props:** None
*   **Description:** Fixed navigation bar. Transparent overlay over the hero, transitions to solid navy on scroll. Features mobile hamburger triggers and language switches.

### 2. NavMobile
*   **Path:** `/src/components/NavMobile/NavMobile.tsx`
*   **Props:** `isOpen: boolean`, `onClose: () => void`
*   **Description:** Fullscreen responsive overlay drawer for mobile menu navigation.

### 3. HeroSection
*   **Path:** `/src/components/HeroSection/HeroSection.tsx`
*   **Props:** `heading: string`, `subheading: string`, `ctas: { label: string, href: string, variant: 'primary' | 'secondary' | 'ghost' }[]`, `backgroundImage: string`, `stats?: { value: string, label: string }[]`
*   **Description:** High-impact hero section containing text contents, dynamic CTAs, and a bottom trust indicators bar.

### 4. TrustBar
*   **Path:** `/src/components/TrustBar/TrustBar.tsx`
*   **Props:** `signals: string[]`
*   **Description:** Horizontal banner below the hero containing trust tags split by elegant gold line rules.

### 5. SearchFilterBar
*   **Path:** `/src/components/SearchFilterBar/SearchFilterBar.tsx`
*   **Props:** `onFilter: (filters: { type: string, size: string, purpose: string }) => void`, `isSticky?: boolean`
*   **Description:** Dropdown filtering interface (Plot Type, Size, Purpose) emitting search states to the wrapper grid.

### 6. PlotCard
*   **Path:** `/src/components/PlotCard/PlotCard.tsx`
*   **Props:** `tag: string`, `title: string`, `sizes: string[]`, `description: string`, `href: string`, `image: string`, `expanded?: boolean`
*   **Description:** Cards representing listing metadata. Displays tags (Badges), descriptive lines, and links.

### 7. PlotGrid
*   **Path:** `/src/components/PlotGrid/PlotGrid.tsx`
*   **Props:** `plots: any[]`
*   **Description:** Responsive visual grids grouping PlotCard structures, incorporating empty layout support.

### 8. AmenityItem
*   **Path:** `/src/components/AmenityItem/AmenityItem.tsx`
*   **Props:** `icon: string`, `name: string`, `description: string`, `features?: string[]`
*   **Description:** Visual tiles combining vector icons, captions, and localized descriptions.

### 9. AmenityGrid
*   **Path:** `/src/components/AmenityGrid/AmenityGrid.tsx`
*   **Props:** `amenities: any[]`, `expanded?: boolean`
*   **Description:** Visual grid layouts grouping multiple AmenityItem components (1-col mobile, 2-col tablet, 4-col desktop).

### 10. WhyATISection
*   **Path:** `/src/components/WhyATISection/WhyATISection.tsx`
*   **Props:** `heading: string`, `subheading: string`, `features: { title: string, text: string }[]`
*   **Description:** Dual-pane visual highlight block. Renders dark counters left, textual feature lists right.

### 11. StatCounter
*   **Path:** `/src/components/StatCounter/StatCounter.tsx`
*   **Props:** `value: number`, `suffix?: string`, `label: string`
*   **Description:** Numeric display that animates counts when scrolled into viewport view (supports reduced motion fallback).

### 12. TestimonialCard
*   **Path:** `/src/components/TestimonialCard/TestimonialCard.tsx`
*   **Props:** `quote: string`, `author: string`, `role: string`, `initials: string`
*   **Description:** Single block cards displaying quotes, reviewer text names, tags, and stylized text-initial badges.

### 13. TestimonialGrid
*   **Path:** `/src/components/TestimonialGrid/TestimonialGrid.tsx`
*   **Props:** `testimonials: any[]`
*   **Description:** 3-column layouts bundling Review / Testimonial cards. No sliders.

### 14. GalleryGrid
*   **Path:** `/src/components/GalleryGrid/GalleryGrid.tsx`
*   **Props:** `images: { src: string, alt: string, category: string }[]`
*   **Description:** Grid display with category buttons (Master Plan, Roads, Amenities, Life). Handles clicks to trigger lightboxes.

### 15. Lightbox
*   **Path:** `/src/components/Lightbox/Lightbox.tsx`
*   **Props:** `src: string`, `alt: string`, `isOpen: boolean`, `onClose: () => void`, `onPrev?: () => void`, `onNext?: () => void`
*   **Description:** Fully keyboard navigable lightbox modal (supports ESC key and arrows).

### 16. ContactForm
*   **Path:** `/src/components/ContactForm/ContactForm.tsx`
*   **Props:** None
*   **Description:** Handles client message inputs (Zod validated, uses React Hook Form), posting submissions to `/api/contact`.

### 17. MapEmbed
*   **Path:** `/src/components/MapEmbed/MapEmbed.tsx`
*   **Props:** `title: string`
*   **Description:** Accessible greyscale map panel. Wraps the Google Maps iframe securely.

### 18. CTABand
*   **Path:** `/src/components/CTABand/CTABand.tsx`
*   **Props:** `heading: string`, `subheading: string`, `buttonLabel: string`, `href: string`
*   **Description:** Dark navy full-width banner layouts containing title rows, summaries, and action anchors.

### 19. FooterNav
*   **Path:** `/src/components/FooterNav/FooterNav.tsx`
*   **Props:** `links: { label: string, href: string }[]`
*   **Description:** Grid links structure displaying site routes for footer columns.

### 20. Footer
*   **Path:** `/src/components/Footer/Footer.tsx`
*   **Props:** None
*   **Description:** Master page footer layout displaying logo markings, descriptions, navigation, social pins, and copyrights.

### 21. SectionHeader
*   **Path:** `/src/components/SectionHeader/SectionHeader.tsx`
*   **Props:** `eyebrow?: string`, `title: string`, `subtitle?: string`, `darkBg?: boolean`
*   **Description:** Section header headers, displaying top badges, headlines, and descriptions.

### 22. Button
*   **Path:** `/src/components/Button/Button.tsx`
*   **Props:** `variant: 'primary' | 'secondary' | 'ghost'`, `size?: 'sm' | 'md' | 'lg'`, `onClick?: () => void`, `href?: string`, `type?: 'button' | 'submit'`, `children: React.ReactNode`
*   **Description:** Reusable polymorphic button wrapper. Supporting multiple style sheets.

### 23. Badge
*   **Path:** `/src/components/Badge/Badge.tsx`
*   **Props:** `text: string`, `variant?: 'gold' | 'navy'`
*   **Description:** Minor indicators highlighting categories.

### 24. Divider
*   **Path:** `/src/components/Divider/Divider.tsx`
*   **Props:** None
*   **Description:** Visual 1px dividers styled using `border-subtle` colors.

### 25. LanguageToggle
*   **Path:** `/src/components/LanguageToggle/LanguageToggle.tsx`
*   **Props:** None
*   **Description:** Switcher toggles, updating locales (stored in cookies / local storage).

### 26. WhatsAppFAB
*   **Path:** `/src/components/WhatsAppFAB/WhatsAppFAB.tsx`
*   **Props:** `phoneNumber: string`, `message: string`
*   **Description:** Floating action buttons linking to WhatsApp web clients.

### 27. BrochureDownloadButton
*   **Path:** `/src/components/BrochureDownloadButton/BrochureDownloadButton.tsx`
*   **Props:** `label: string`
*   **Description:** Triggers brochure streams, dispatching events to GA4.

### 28. PageHero
*   **Path:** `/src/components/PageHero/PageHero.tsx`
*   **Props:** `title: string`, `breadcrumbs: { label: string, href?: string }[]`
*   **Description:** Visual blocks for inner views (About, Contact, Gallery, etc.).

### 29. Breadcrumb
*   **Path:** `/src/components/Breadcrumb/Breadcrumb.tsx`
*   **Props:** `items: { label: string, href?: string }[]`
*   **Description:** Aria-labeled accessibility-compliant breadcrumb tracking routes.
