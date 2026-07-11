# APYX Development Rules

## Purpose

These rules define how every feature, page, component and animation must be implemented.

They override personal preferences and should always be followed.

---

# Core Principles

- Functionality first.
- Consistency over creativity.
- Reusability over duplication.
- Performance over unnecessary effects.
- Accessibility is mandatory.
- Mobile-first thinking.

---

# Backend Rules

Never modify:

- Database schema
- Authentication
- API contracts
- Business logic
- Routing

unless explicitly requested.

---

# Component Rules

Always reuse existing components.

Never duplicate a component.

If a new variation is needed,

extend the existing component.

---

# Styling Rules

Never hardcode:

- Colors
- Border radius
- Shadows
- Font sizes
- Spacing

Always use design system tokens.

---

# Layout Rules

Always use the shared layout components.

Maintain consistent spacing.

Never invent page-specific layouts without documentation.

---

# Motion Rules

Motion must support usability.

Never animate for decoration alone.

Prefer:

- Fade
- Translate
- Scale

Avoid:

- Excessive rotation
- Bounce
- Flashing effects

---

# Forms

Every form must include:

- Validation
- Error messages
- Success feedback
- Loading state

---

# Buttons

Every button must have:

Hover

Focus

Pressed

Disabled

Loading

states.

---

# Cards

Every card should support:

Hover

Loading

Empty

Responsive

---

# Loading

Skeletons preferred.

Avoid full-page spinners.

---

# Error Handling

Every async action should have:

- Loading
- Error
- Success

states.

---

# Accessibility

Keyboard navigation

Visible focus

ARIA labels

Screen reader support

Reduced motion support

---

# Performance

Lazy load images.

Optimize animations.

Minimize JavaScript.

Avoid layout shifts.

---

# Code Quality

TypeScript only.

No "any" unless unavoidable.

Reusable hooks.

Reusable utilities.

Clean folder structure.

Meaningful names.

---

# AI Instructions

Before generating code:

Read all documentation inside the docs folder.

Follow:

Brand

Design System-

Motion

Components

Pages

Rules

Never ignore project documentation.

Never introduce a new design language.

Maintain consistency across the platform.