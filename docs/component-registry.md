# Component Registry

Use this registry before creating a component. Components are source-owned and
follow a shadcn-style composition contract while retaining CSS Modules.

## Component Contract

- Every component is a direct child folder of `src/components`.
- Primitive roots forward native element props, merge `className` with `cn()`,
  expose explicit variants, and publish a stable `data-slot`.
- Structured UI uses compound exports so the rendered hierarchy stays visible
  at the call site.
- Domain blocks may accept content data, but must compose the primitives below.

## Layout Primitives

- `section` — vertical rhythm and background tone.
- `container` — shared gutters and maximum widths.
- `grid`, `stack`, `action-group` — responsive layout and spacing.
- `page-shell` — standard page root and entrance behavior.
- `content-section` — Section + Container/GridContainer composition.
- `immersive-page-header` — shared full-bleed home/contact geometry with
  `ImmersivePageHeaderContent`, `ImmersivePageHeaderNavigation`, and
  `ImmersivePageHeaderJumpLink` compound slots.

## Compound Content

- `content-header` — `ContentHeader`, `ContentHeaderEyebrow`,
  `ContentHeaderTitle`, `ContentHeaderDescription`, and
  `ContentHeaderActions`.
- `page-header` — `PageHeader`, `PageHeaderBreadcrumbs`,
  `PageHeaderContent`, `PageHeaderEyebrow`, `PageHeaderTitle`, and
  `PageHeaderDescription`. `PageHeaderTitle` always renders the page H1.
- `disclosure-list` — `DisclosureList`, `DisclosureItem`,
  `DisclosureTrigger`, `DisclosureEyebrow`, `DisclosureTitle`, and
  `DisclosureContent`.
- `form-field` — `Field`, `FieldLabel`, `FieldDescription`, `FieldError`,
  `Input`, and `Textarea`.
- `typography` — canonical `Heading`, `Eyebrow`, and `Text` roles.
- `portable-content` — visible Sanity Portable Text with safe link support.

## Actions

- `button` — `Button` for button elements and `buttonVariants()` for links.
- `cta-link` — button-styled internal consultation links with analytics.
- `text-link` — consistent inline navigation treatment.
- `tracked-external-link` — external destinations with analytics.
- `pagination` — shared accessible numbered pagination.

## Navigation And Metadata

- `site-header`, `site-footer` — public-site chrome.
- `breadcrumbs`, `breadcrumb-trail` — visible hierarchy and matching JSON-LD.
- `json-ld` — safely serialized structured-data script output.
- `header-sentinel` — transparent-header scroll boundary.

## Media, Cards, And Brand

- `background-image-layer`, `circular-portrait` — responsive Sanity imagery.
- `divider-grid`, `editorial-link-card`, `specialty-card` — reusable content
  blocks.
- `flower-mark`, `hero-badge`, `specialty-glyph`, `arrow-up-right` —
  brand-specific visual primitives.

## Domain Blocks

- `cta-section` — consultation call-to-action band.
- `status-page`, `error-content` — shared error and not-found presentation.

## Creation Rule

Extend an existing primitive or compound component before creating a new one.
Keep route-specific composition in its matching `src/page-modules/` folder
until it is reused. Promote repeated UI into `src/components/`. Do not
hide a reusable hierarchy behind `heading`, `intro`, `multiline`, or similar
configuration props when named compound children make the structure clearer.
