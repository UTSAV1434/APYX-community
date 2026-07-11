# APYX Performance Standards

Version: 1.0

---

# Purpose

Performance is a feature.

Every interaction should feel instant.

The user should never wait unless absolutely necessary.

Performance should never be sacrificed for visual effects.

---

# Performance Goals

Overall Experience

- Fast
- Responsive
- Smooth
- Stable
- Predictable

---

# Lighthouse Goals

Performance

95+

Accessibility

100

Best Practices

100

SEO

100

---

# Core Web Vitals

Largest Contentful Paint (LCP)

Target

< 2.5s

Ideal

< 1.8s

---

Interaction to Next Paint (INP)

Target

< 200ms

Ideal

< 100ms

---

Cumulative Layout Shift (CLS)

Target

< 0.1

Ideal

0.00

---

# JavaScript

Keep JavaScript minimal.

Avoid unnecessary libraries.

Code split large features.

Use dynamic imports where appropriate.

---

# Images

Use Next.js Image.

Preferred Formats

- AVIF
- WebP

Lazy load images below the fold.

Compress all images.

Never upload oversized assets.

Use responsive image sizes.

---

# Fonts

Use local fonts whenever possible.

Preload primary fonts.

Limit the number of font families.

Limit the number of font weights.

Use font-display: swap.

---

# Icons

Use SVG.

Prefer Lucide Icons.

Avoid image icons.

---

# CSS

Use Tailwind utility classes.

Avoid unused CSS.

Avoid duplicate styles.

Use design tokens.

---

# Animations

Target 60 FPS.

Animate only:

- transform
- opacity

Avoid animating:

- width
- height
- margin
- padding
- top
- left

Use GPU acceleration.

---

# Scroll Performance

Smooth scrolling must never reduce responsiveness.

Avoid excessive scroll listeners.

Throttle expensive operations.

---

# Network

Reduce unnecessary API requests.

Cache repeated requests.

Use optimistic UI where appropriate.

Batch requests when possible.

---

# Data Fetching

Use Server Components where appropriate.

Use Suspense.

Show skeleton loaders.

Cache stable content.

Revalidate only when necessary.

---

# Bundle Size

Monitor bundle size regularly.

Remove unused dependencies.

Prefer tree-shakable libraries.

Avoid duplicate packages.

---

# Loading Strategy

Critical content first.

Secondary content later.

Lazy load:

- Images
- Videos
- Gallery
- Heavy components

---

# Caching

Cache:

- Static assets
- Fonts
- Images
- API responses where appropriate

Use CDN caching.

---

# Database

Only fetch required fields.

Paginate large datasets.

Index frequently queried fields.

Avoid unnecessary queries.

---

# Mobile Performance

Prioritize:

Fast startup.

Responsive interactions.

Low memory usage.

Battery efficiency.

---

# SEO Performance

Server-side rendering where appropriate.

Metadata for every page.

Structured data where relevant.

Optimized Open Graph tags.

Readable URLs.

---

# Error Recovery

Gracefully recover from failures.

Retry failed requests when appropriate.

Show meaningful feedback.

---

# Monitoring

Track:

- Performance
- Errors
- API failures
- Slow pages
- Largest assets

Review metrics regularly.

---

# AI Rules

Whenever AI generates code:

- Minimize JavaScript.
- Avoid unnecessary dependencies.
- Prefer reusable components.
- Lazy load heavy features.
- Keep bundle size small.
- Preserve smooth scrolling.
- Maintain 60 FPS.
- Optimize before adding effects.

---

# Performance Checklist

Before deployment verify:

✔ Images optimized

✔ Fonts optimized

✔ Lighthouse 95+

✔ Core Web Vitals pass

✔ No layout shifts

✔ Lazy loading implemented

✔ Bundle analyzed

✔ No unused dependencies

✔ Mobile performance verified

✔ Accessibility maintained

---

# Final Principle

Beautiful interfaces are useless if they are slow.

Performance is part of the user experience.

Every millisecond matters.