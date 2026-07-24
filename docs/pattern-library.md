# Pattern Library

These patterns keep new pages consistent without introducing a page-builder abstraction.

## Editorial Page Header

Use `Section size="page"` with a centered `Container size="md"`. Keep one descriptive H1, a concise introduction, and an optional breadcrumb above it.

## Service Detail

Use this order:

1. Breadcrumb and page introduction.
2. Concerns or fit indicators.
3. Clinical approach.
4. What sessions can involve.
5. In-person and virtual availability.
6. Visible service-specific FAQs.
7. Related articles and services.
8. Consultation CTA.

Visible copy and structured data must agree. Do not publish clinical or insurance claims until the practice owner reviews them.

## Cards And Lists

Use the shared grid and container primitives. The complete card should be a coherent link target when it has one destination. Essential information must not depend on hover.

## Links

Use ordinary internal links for navigation, `CtaLink` for consultation
conversion points, and `TrackedExternalLink` for tracked off-site destinations.
Use `Button` for button elements and `buttonVariants()` when a link needs the
same pill treatment.

## Responsive Review

Review every new pattern at 375px, 768px, and desktop width. Verify heading order, keyboard focus, link purpose, tap targets, image cropping, and reduced motion.
