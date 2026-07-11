# APYX Technical Architecture

Version: 1.0

---

# Purpose

This document defines the technical architecture of APYX.

Every engineer and AI assistant must follow these standards when building new features.

The architecture should remain:

- Scalable
- Maintainable
- Reusable
- Performant
- Easy to understand

---

# Core Stack

Frontend

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- Framer Motion
- shadcn/ui

Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

Deployment

- Vercel

Version Control

- Git
- GitHub

---

# Architecture Philosophy

Prefer

Reusable components.

Small functions.

Feature-based organization.

Server Components whenever possible.

Composition over inheritance.

Never duplicate logic.

---

# Recommended Folder Structure

app/

components/

features/

hooks/

lib/

services/

types/

styles/

public/

docs/

---

# Components

Component hierarchy

UI Components

↓

Shared Components

↓

Feature Components

↓

Page Components

Never create duplicate components.

---

# Feature Architecture

Each feature should contain

components/

hooks/

actions/

types/

utils/

Example

features/events/

components/

actions/

hooks/

types/

utils/

---

# State Management

Local State

React State

Server State

Server Components

Global State

Only when necessary.

Avoid unnecessary global state.

---

# API Layer

Every API call should pass through reusable service functions.

Never fetch directly inside random components.

Structure

services/

events.ts

gallery.ts

announcements.ts

team.ts

resources.ts

---

# Database

Never query more data than required.

Always paginate large datasets.

Always validate input.

Never expose sensitive information.

---

# Authentication

Authentication must remain centralized.

Never duplicate authentication logic.

Protect admin routes.

Protect server actions.

---

# Server Actions

Every mutation should use:

Validation

Authorization

Error Handling

Revalidation

Logging where appropriate.

---

# Forms

Every form should have

Validation

Loading

Error

Success

Accessibility

---

# Error Handling

Every async operation requires

Loading State

Error State

Success State

Retry where appropriate.

---

# Logging

Development

Console logging allowed.

Production

Meaningful logging only.

Never expose sensitive data.

---

# TypeScript

Use strict typing.

Avoid "any".

Prefer interfaces.

Document complex types.

---

# Naming Convention

Components

PascalCase

Functions

camelCase

Hooks

useSomething

Files

kebab-case

Types

PascalCase

Constants

UPPER_CASE

---

# Styling

Only Tailwind.

No inline styles unless necessary.

Never hardcode colors.

Use design tokens.

---

# Animations

Framer Motion

Default.

GSAP

Only when Framer Motion cannot achieve the interaction.

---

# Images

Use Next/Image.

Optimize.

Lazy load.

Use AVIF/WebP.

---

# Icons

Lucide Icons.

Consistent sizing.

Never mix icon libraries unnecessarily.

---

# Accessibility

Accessibility is mandatory.

Keyboard support.

Screen readers.

Reduced motion.

Focus states.

---

# Performance

Server Components first.

Client Components only when needed.

Lazy loading.

Code splitting.

Image optimization.

Bundle optimization.

---

# Security

Validate all user input.

Never trust client input.

Protect admin actions.

Never expose secrets.

Use environment variables.

---

# Testing

Every feature should support

Unit testing

Integration testing

Manual testing

Accessibility testing

---

# Documentation

Every major feature should include

Purpose

Dependencies

Usage

Limitations

Future improvements

---

# AI Development Rules

Before changing code

1. Read the documentation.

2. Understand the feature.

3. Preserve architecture.

4. Reuse existing code.

5. Never duplicate logic.

6. Maintain consistency.

7. Follow naming conventions.

8. Preserve backend contracts.

9. Respect performance standards.

10. Follow the Design Bible.

---

# Final Principle

Every new feature should make the project cleaner than before.

If implementation increases complexity without providing value, redesign it.