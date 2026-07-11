# APYX Animation Specifications

> Version: 1.0

## Purpose

This document defines the motion language for APYX. Every animation
should improve usability, reinforce hierarchy, and create a premium
experience.

------------------------------------------------------------------------

# 1. Motion Principles

-   Motion must have a purpose.
-   Consistency over novelty.
-   Fast enough to feel responsive.
-   Never distract from content.
-   Accessibility always takes priority.

Avoid: - Excessive bounce - Random rotations - Long delays - Flashing
effects - Continuous distracting movement

------------------------------------------------------------------------

# 2. Motion Tokens

## Durations

  Token              Value
  --------------- --------
  Instant            100ms
  Fast               150ms
  Medium             250ms
  Standard           350ms
  Slow               500ms
  Large Scene        800ms
  Hero Timeline     1200ms

## Easing

Entrance: `cubic-bezier(0.16,1,0.3,1)`

Exit: `cubic-bezier(0.7,0,0.84,0)`

Standard: `ease-in-out`

Spring: - Stiffness: 200 - Damping: 25

------------------------------------------------------------------------

# 3. Performance Budget

Target FPS: 60

Animate only: - transform - opacity - filter (sparingly)

Avoid animating: - width - height - top - left - margin - padding

Maximum simultaneous major animations: 5

------------------------------------------------------------------------

# 4. Global Scroll

-   Smooth scrolling
-   Progressive reveal
-   One dominant section at a time
-   Sections transition naturally
-   No abrupt appearance

------------------------------------------------------------------------

# 5. Navbar

Idle: Transparent over hero.

On Scroll: - Glass background - Blur - Subtle shadow

Scroll Down: Hide.

Scroll Up: Reveal.

Links: - Fade - Underline grow - Active indicator

Mobile: Slide-in drawer with blurred backdrop.

------------------------------------------------------------------------

# 6. Hero Timeline

0ms Background appears.

150ms Badge fades in.

300ms Heading appears.

500ms Description fades in.

700ms Primary CTA.

850ms Secondary CTA.

1000ms Hero visual.

1200ms Ambient motion starts.

------------------------------------------------------------------------

# 7. Section Reveal

Trigger: 20% visible.

Animation: - Opacity 0 → 1 - TranslateY 24px → 0

Duration: 600ms

Run once.

------------------------------------------------------------------------

# 8. Buttons

Hover: - Lift 2px - Scale 1.02 - Shadow increase - Glow (primary)

Press: Scale 0.98

Disabled: Opacity 50%

Loading: Spinner or progress.

------------------------------------------------------------------------

# 9. Cards

Hover: - Lift - Border highlight - Shadow - Image scale 1.03

Entrance: Stagger 80ms.

------------------------------------------------------------------------

# 10. Forms

Focus: Border highlight.

Error: Subtle shake.

Success: Check animation.

Validation: Real-time where appropriate.

------------------------------------------------------------------------

# 11. Search

Open: Fade + Scale.

Focus input automatically.

Results: Stagger reveal.

------------------------------------------------------------------------

# 12. Gallery

Hover: Scale 1.05.

Overlay fades.

Lightbox: Zoom transition.

------------------------------------------------------------------------

# 13. Statistics

Animate numbers from 0 once when visible.

------------------------------------------------------------------------

# 14. Timeline

Progress line grows.

Cards reveal in order.

------------------------------------------------------------------------

# 15. Dialogs

Open: Fade + Scale.

Close: Fade.

Backdrop: Blur.

------------------------------------------------------------------------

# 16. Page Transitions

Fade between pages.

Small translate.

Avoid white flashes.

------------------------------------------------------------------------

# 17. Dashboard

Minimal animation.

Fast interactions.

No decorative motion.

------------------------------------------------------------------------

# 18. Accessibility

Respect prefers-reduced-motion.

Keep all interactions usable without animation.

Visible focus states.

------------------------------------------------------------------------

# 19. Library Guidelines

Primary: - Framer Motion

Advanced: - GSAP (only if necessary)

Smooth Scroll: - Lenis

Never mix animation systems for the same interaction.

------------------------------------------------------------------------

# 20. AI Rules

Before implementing: - Read the Design Bible. - Follow design tokens. -
Never invent new durations. - Never invent new easing. - Reuse motion
primitives. - Optimize for performance first. - Maintain consistency
across every page.
