# APYX Design Tokens

Version: 1.0

Purpose

Design Tokens are the single source of truth for all visual values in APYX.

Never hardcode visual values.

Always use these tokens.

---

# Color Tokens

## Background

--background-primary

#050816

Main application background.

---

--background-secondary

#0B1023

Secondary sections.

---

--background-surface

#141B34

Cards.

Panels.

Containers.

---

--background-overlay

rgba(5,8,22,0.85)

Dialogs.

Drawers.

---

# Text

--text-primary

#FFFFFF

---

--text-secondary

#B5BED3

---

--text-muted

#7A859E

---

--text-disabled

#5C6478

---

# Border

--border-primary

#1F2947

---

--border-secondary

#2A3559

---

# Brand Colors

--brand-primary

#B026FF

---

--brand-secondary

#6D4AFF

---

--brand-accent

#2F7BFF

---

--brand-highlight

#14C8FF

---

# Status Colors

Success

#22C55E

Warning

#FACC15

Danger

#EF4444

Info

#3B82F6

---

# Gradient Tokens

Primary Gradient

#B026FF

↓

#6D4AFF

↓

#2F7BFF

↓

#14C8FF

---

Hero Gradient

Deep Purple

↓

Electric Blue

↓

Cyan

---

Glass Gradient

Transparent

↓

Surface

↓

Transparent

---

# Typography Tokens

Display

64px

H1

48px

H2

40px

H3

32px

H4

24px

Body Large

20px

Body

16px

Caption

14px

Small

12px

---

# Font Weights

Regular

400

Medium

500

Semibold

600

Bold

700

Extra Bold

800

---

# Line Heights

Compact

120%

Normal

150%

Relaxed

170%

---

# Letter Spacing

Tight

-2%

Normal

0%

Wide

2%

---

# Spacing Tokens

4

8

12

16

20

24

32

40

48

64

80

96

128

160

192

---

# Radius Tokens

XS

6px

Small

8px

Medium

12px

Large

16px

XL

20px

2XL

28px

Full

999px

---

# Shadow Tokens

Small

Cards

Medium

Dropdown

Large

Dialogs

XL

Hero

---

# Blur Tokens

Small

8px

Medium

16px

Large

24px

XL

32px

---

# Opacity

Disabled

40%

Muted

70%

Overlay

85%

Full

100%

---

# Motion Tokens

Instant

100ms

Fast

150ms

Medium

250ms

Standard

350ms

Slow

500ms

Scene

800ms

Hero

1200ms

---

# Easing

Entrance

cubic-bezier(0.16,1,0.3,1)

Exit

cubic-bezier(0.7,0,0.84,0)

Standard

ease-in-out

---

# Icon Sizes

Small

16px

Medium

20px

Default

24px

Large

32px

Hero

48px

---

# Avatar Sizes

Small

32px

Medium

40px

Large

56px

Hero

96px

---

# Button Heights

Small

40px

Medium

48px

Large

52px

XL

56px

---

# Input Heights

Small

40px

Default

52px

Large

60px

Textarea

160px

---

# Card Tokens

Padding

24px

Gap

16px

Radius

20px

Border

1px

Hover Lift

2px

---

# Z Index

Navigation

100

Dropdown

200

Drawer

300

Dialog

400

Toast

500

Tooltip

600

---

# Container Widths

Content

1280px

Full

1440px

Reading Width

720px

---

# Grid

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

---

# Responsive Breakpoints

Mobile

<640px

Tablet

640–1024px

Desktop

1024–1440px

Large Desktop

1440px+

---

# Performance Tokens

Target FPS

60

Maximum Simultaneous Animations

5

Maximum Blur

32px

Maximum Layout Shift

0.1

---

# Accessibility Tokens

Minimum Touch Target

44px

Minimum Contrast

WCAG AA

Reduced Motion

Supported

Keyboard Navigation

Required

---

# Token Rules

Never hardcode colors.

Never hardcode spacing.

Never hardcode radius.

Never hardcode shadows.

Never hardcode typography.

Never invent new tokens.

Always reference existing design tokens.

New tokens require documentation before implementation.