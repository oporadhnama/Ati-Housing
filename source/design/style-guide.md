# ATI Housing Website Style Guide

This style guide establishes the visual rules and patterns for the rebuilt ATI Housing website. All pages and components must strictly conform to these rules.

---

## 1. Typography

The design system uses two primary typefaces:
*   **Display Font:** `Cormorant Garamond` (Google Font) — Used for headlines and premium section titles.
*   **Body & UI Font (English):** `Inter` (Google Font) — Used for body copy, labels, forms, and secondary text.
*   **Body & UI Font (Bangla):** `Hind Siliguri` (Google Font) — Used for all Bengali texts. **No system font fallback is permitted.**

### Type Scale

| Name | Font Family | Size (px) | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| Display Hero | Cormorant Garamond | 80px | 1.1 | Bold (700) | Main desktop hero titles |
| Display H1 | Cormorant Garamond | 64px | 1.15 | Bold (700) | Secondary page heroes |
| Display H2 | Cormorant Garamond | 48px | 1.2 | SemiBold (600) | Major section headers |
| Display H3 | Cormorant Garamond | 36px | 1.25 | SemiBold (600) | Subsections, card groups |
| Heading 4 | Inter | 24px | 1.3 | Medium (500) | Cards, forms headings |
| Heading 5 | Inter | 18px | 1.4 | Medium (500) | Small highlights |
| Label Large | Inter | 14px | 1.4 | SemiBold (600) | Navigation links, CTAs |
| Body Main | Inter / Hind Siliguri | 16px | 1.6 | Regular (400) | Standard paragraphs |
| Body Medium | Inter / Hind Siliguri | 14px | 1.5 | Regular (400) | Captions, card body |
| Body Small | Inter / Hind Siliguri | 13px | 1.5 | Regular (400) | Meta details, descriptions |
| Micro / UI | Inter / Hind Siliguri | 12px | 1.4 | Regular (400) | Form helper texts, tags |

---

## 2. Spacing System

Our spacing system is based on a **4px base unit** to ensure mathematical consistency across all viewports.

*   `4px` — Micro-spacing (inline icons, text tags)
*   `8px` — Inner element gaps (label to input, header to subline)
*   `12px` — Compact groups (meta rows, tags container)
*   `16px` — Standard gutters, small card padding
*   `24px` — General padding (cards, forms), button margins
*   `32px` — Section subsection breaks, large card spacing
*   `48px` — Medium section padding (desktop layout blocks)
*   `64px` — Standard section padding (top & bottom)
*   `96px` — Large section padding (hero bottoms, transitions)
*   `128px` — Max viewport block gaps

---

## 3. Color Usage Rules

*   **Brand Navy (`#192B45`)**: Used as the primary canvas for dark states, hero sections, footers, and large visual container bands. Promotes authority, reliability, and security.
*   **Brand Gold (`#B8975A`)**: Used exclusively for accents, primary buttons, icons, borders, and active highlights. **Never** used as body text color due to contrast limitations on white/light backgrounds.
*   **Surface Cream (`#F7F4EE`)**: The primary backdrop for light content sections (e.g. amenities grid, why-ati benefits). Distinguishes content from pure white surface elements.
*   **Surface White (`#FFFFFF`)**: Used for interactive surfaces, cards, input text areas, and header navbars.
*   **Text Primary (`#1C1C1E`)** on light backgrounds; **White (`#FFFFFF`)** on dark backgrounds.
*   **Text Muted (`#6B7280`)**: Secondary info only. Keep font size above 14px to maintain readability.
*   **Border Subtle (`rgba(184,151,90,0.18)`)**: Used for 1px separators, borders on cards, and clean grid separators.

---

## 4. Reusable UI Elements

### Buttons

Buttons support three primary variants. All hover states transition over `200ms` using `cubic-bezier(0.16, 1, 0.3, 1)`.

1.  **Primary Button:**
    *   *Normal:* Gold background (`#B8975A`), White text, sharp edges (`radius: 2px` or `0px`).
    *   *Hover:* Darker Gold (`#8C6E3C`) background.
2.  **Secondary Button:**
    *   *Normal:* Navy outline (`1px border`), Transparent background, Navy text.
    *   *Hover:* Navy background (`#192B45`), White text.
3.  **Ghost Button:**
    *   *Normal:* Transparent background, Navy text (or Gold text).
    *   *Hover:* Light tint backdrop.

### Cards & Form Fields

*   **Radii:** Kept near-zero (`2px` for small indicators, `0px` for standard layout blocks). No bubbly/rounded corners.
*   **Light Surface Cards:** Must use a `1px` border with `border-subtle` (`rgba(184,151,90,0.18)`). **Do not use drop shadows on white/cream backgrounds.**
*   **Dark Surface Cards:** May use the card shadow token (`0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`) to elevate cards off dark backgrounds.
*   **Form Inputs:** Single-line subtle borders (`border-subtle`). On focus, swap border to `#B8975A` and add a gold focus ring outline (`offset-2`).

---

## 5. Animation & Motion Principles

Animations must be subtle, intentional, and performant.

*   **Micro-interactions (Hovers, Clicks):** `200ms` transition, ease-out curve.
*   **Page/Section Entry:** `400ms` duration, `ease-out`. Fade-in and subtle slide-up (no more than `15px`).
*   **Prohibited Motion Patterns:**
    *   ❌ Bouncy, playful elastic animations.
    *   ❌ Auto-playing carousel sliders (slider UX is excluded).
    *   ❌ Uncontrolled infinity loops.
*   **Reduced Motion:** Respect `prefers-reduced-motion` settings. Disable all slides, translates, and count-up animations for these users.

---

## 6. Media & Image Treatments

*   **next/image:** All images must use the Next.js `Image` component with optimization enabled.
*   **Overlays:** All hero images must have a custom linear-gradient overlay: `linear-gradient(to top, rgba(25, 43, 69, 0.8) 0%, rgba(25, 43, 69, 0.4) 60%, rgba(25, 43, 69, 0.2) 100%)`.
*   **Ratio:** Plot/Amenity cards must render in a strict `4:3` aspect ratio.
*   **Logo:** Full color logo on light backgrounds; pure white variant on dark backgrounds.
