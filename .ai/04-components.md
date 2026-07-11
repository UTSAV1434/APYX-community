# APYX Component Library

## Purpose

This document defines every reusable UI component used throughout the APYX platform.

Every page should be built using these components.

Never duplicate component functionality.

Always extend existing components before creating new ones.

---

# Layout Components

## Navbar

Purpose

Global navigation across the platform.

Features

- Sticky
- Responsive
- Glass background on scroll
- Mobile navigation drawer
- Active page indicator
- Search shortcut
- Authentication aware
- Smooth hide/reveal on scroll

States

- Transparent
- Scrolled
- Mobile
- Expanded

---

## Footer

Purpose

Global footer.

Contains

- Quick Links
- Social Links
- Contact
- Newsletter
- Copyright

---

## Section Container

Purpose

Maintain consistent spacing across every page.

Rules

- Max Width 1280px
- Responsive padding
- Vertical spacing follows design system

---

# Hero Components

## Hero Section

Purpose

Landing page introduction.

Contains

- Badge
- Heading
- Description
- Primary CTA
- Secondary CTA
- Hero Illustration
- Background Effects

---

## Hero Badge

Small reusable badge above hero heading.

---

## Hero CTA Group

Contains

Primary button

Secondary button

---

# Buttons

## Primary Button

Purpose

Main action.

Examples

Register

Join

Explore

Apply

---

## Secondary Button

Supporting action.

---

## Outline Button

Alternative action.

---

## Icon Button

Small icon-only interaction.

---

# Cards

## Event Card

Purpose

Display event summary.

Contains

- Banner
- Title
- Date
- Venue
- Category
- Status
- Register Button

States

- Upcoming
- Live
- Completed

---

## Featured Event Card

Large premium version.

Contains

Countdown

Speakers

Description

CTA

---

## Announcement Card

Contains

Title

Category

Date

Summary

Read More

Pinned state

---

## Gallery Card

Contains

Cover

Title

Media Count

Hover Preview

---

## Team Card

Contains

Photo

Name

Role

Social Links

---

## Partner Card

Contains

Logo

Description

Website

---

## Resource Card

Contains

Icon

Title

Category

Download

Open Link

---

# Content Components

## Timeline

Purpose

Display event schedule.

---

## Speaker Card

Purpose

Display mentors or speakers.

---

## Sponsor Grid

Purpose

Display sponsors.

---

## FAQ Accordion

Purpose

Display frequently asked questions.

---

## Testimonial Card

Purpose

Display community feedback.

---

# Navigation Components

## Sidebar

Admin navigation.

---

## Breadcrumb

Navigation helper.

---

## Pagination

Reusable pagination.

---

## Search

Global search.

Features

Live search

Keyboard shortcut

Suggestions

---

## Filters

Reusable filter component.

Supports

Events

Gallery

Resources

Announcements

---

# Form Components

## Input

## Textarea

## Select

## Date Picker

## Time Picker

## Upload

## Rich Text Editor

## Checkbox

## Radio

## Toggle

Every form element should have

- Label
- Helper Text
- Validation
- Error State

---

# Feedback Components

## Toast

Success

Warning

Error

Info

---

## Dialog

Confirmation dialog.

---

## Drawer

Mobile panel.

---

## Tooltip

Reusable helper.

---

## Empty State

Illustration

Message

Action

---

## Loading

Skeletons

Progress

Loading cards

---

## Error State

Friendly message

Retry action

---

# Dashboard Components

## Stats Card

Shows

Title

Value

Trend

Icon

---

## Activity Feed

Recent activity.

---

## Data Table

Search

Sorting

Pagination

Filters

---

## Analytics Chart

Reusable charts.

---

# Motion Components

Every reusable component should define

Hover Animation

Entrance Animation

Exit Animation

Focus Animation

Loading Animation

Reduced Motion Support

---

# Responsive Behaviour

Every component must define

Desktop

Tablet

Mobile

---

# Accessibility

Every component must support

Keyboard Navigation

Focus State

Screen Readers

ARIA Labels

Color Contrast

---

# Development Rules

Never hardcode colors.

Never duplicate components.

Prefer composition.

Keep components reusable.

Document props.

Write clean TypeScript.

Follow the Design System.

Maintain visual consistency across the platform.