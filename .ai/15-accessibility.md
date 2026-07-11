# APYX Accessibility Standards

Version: 1.0

---

# Purpose

Accessibility is a core product requirement.

Every user should be able to use APYX regardless of ability, device, or input method.

Accessibility is never optional.

It is part of quality.

---

# Accessibility Goals

Every page should be:

- Keyboard Accessible
- Screen Reader Friendly
- Mobile Friendly
- Color Blind Friendly
- Motion Accessible
- High Contrast
- Easy to Understand

---

# Compliance Target

Target Standard

WCAG 2.2 AA

Future Goal

WCAG AAA where practical.

---

# Keyboard Navigation

Every interactive element must support:

- Tab
- Shift + Tab
- Enter
- Escape
- Space

Never trap keyboard focus.

Focus order should follow the visual layout.

---

# Focus States

Every interactive element must have a visible focus indicator.

Requirements

- High contrast
- Clearly visible
- Never removed with CSS
- Consistent across the application

---

# Touch Targets

Minimum Size

44px × 44px

Preferred

48px × 48px

Buttons

Links

Icons

Menus

Cards

must all meet this requirement.

---

# Typography

Minimum Body Text

16px

Minimum Caption

14px

Never use tiny text.

Maintain comfortable line spacing.

---

# Color Contrast

Text

Minimum WCAG AA

Interactive Elements

Minimum WCAG AA

Important Information

Never communicate using color alone.

Always include text or icons.

---

# Images

Every image must include meaningful alt text.

Decorative images should have empty alt attributes.

Never leave alt text blank.

---

# Icons

Icons alone should never communicate important information.

Pair icons with labels where necessary.

---

# Forms

Every input requires:

- Label
- Placeholder (optional)
- Helper Text
- Error Message
- Success State

Error messages should explain how to fix the issue.

---

# Links

Every link should clearly describe its destination.

Avoid:

Click Here

Read More

Use:

View Upcoming Events

Download Resources

Meet the Team

---

# Headings

Use proper hierarchy.

Only one H1.

Follow:

H1

↓

H2

↓

H3

↓

H4

Never skip heading levels.

---

# Screen Readers

Support:

ARIA Labels

ARIA Descriptions

ARIA Expanded

ARIA Current

ARIA Live Regions

Accessible Names

---

# Navigation

Navigation should remain consistent.

Every page should include:

- Skip to Content
- Accessible Navigation
- Breadcrumbs where appropriate

---

# Motion Accessibility

Respect prefers-reduced-motion.

Disable:

Large transitions

Parallax

Continuous animation

Background movement

Keep functionality identical.

---

# Animations

Motion should never trigger discomfort.

Avoid:

Flashing

Rapid scaling

Fast rotations

Long continuous loops

---

# Tables

Every table should support:

Headers

Scope

Sorting

Keyboard Navigation

Responsive Layout

---

# Modals

Requirements

Trap Focus

Escape to Close

Restore Focus

Accessible Labels

---

# Notifications

Toast messages should be announced to screen readers.

Important notifications should remain visible long enough to read.

---

# Loading

Skeletons should be accessible.

Announce loading where appropriate.

Avoid indefinite loading states.

---

# Error Pages

Explain:

What happened

Why

How to recover

Provide a clear action.

---

# Search

Keyboard shortcut

Accessible suggestions

Clear labels

Visible focus

---

# Media

Videos

Captions

Transcripts

Images

Alt Text

Downloads

Accessible names

---

# Dashboard

Charts require text alternatives.

Tables require keyboard support.

Every action should remain accessible.

---

# Mobile Accessibility

Large touch targets.

Readable typography.

Simple navigation.

Avoid hidden interactions.

---

# Accessibility Testing

Test:

Keyboard Only

Screen Reader

Mobile

High Contrast

Reduced Motion

Zoom 200%

Dark Mode

---

# AI Rules

Whenever AI creates UI:

- Verify heading hierarchy.
- Verify keyboard navigation.
- Verify focus states.
- Verify contrast.
- Verify ARIA labels.
- Verify reduced motion.
- Verify touch targets.
- Verify alt text.

Accessibility must never be sacrificed for aesthetics.

---

# Final Principle

A premium product is an accessible product.

If a feature is beautiful but inaccessible, it is incomplete.