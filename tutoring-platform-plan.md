# LinguaConnect — Online Language Tutoring Platform
## Complete End-to-End Execution Plan & Implementation Guide

---

# 1. PRODUCT OVERVIEW

## What We Are Building

LinguaConnect is a modern, web-based language tutoring marketplace focused initially on English and Spanish speaking classes. It connects students with qualified tutors for 1:1 and group sessions via live video. The MVP launches as a single-tutor platform and scales into a multi-tutor SaaS marketplace.

## Target Users

| Segment | Description |
|---|---|
| **Primary Students** | Adults (18–45) wanting conversational fluency in English or Spanish for career, travel, or personal growth |
| **Secondary Students** | Parents booking classes for children (8–17) |
| **Tutors (Phase 2+)** | Freelance language teachers seeking a platform to manage bookings, payments, and student relationships |

## Core Value Proposition

- **For Students:** Book affordable, flexible, live speaking classes with vetted tutors — no rigid schedules, no impersonal apps. Real conversation practice with real people.
- **For Tutors (future):** A turnkey platform to run your tutoring business — scheduling, payments, student management, and marketing handled for you.

---

# 2. FEATURE LIST (DETAILED)

## 2.1 Landing Page
- Hero section with clear value proposition and CTA ("Book Your Free Trial")
- Animated statistics (students taught, hours delivered, satisfaction rate)
- How-it-works section (3-step visual flow)
- Featured courses carousel
- Testimonials / social proof
- FAQ accordion
- Footer with links, social media, WhatsApp CTA

## 2.2 Course Listing & Details
- Grid/list view of available courses (e.g., "Business English," "Spanish for Travel")
- Filter by language, level (A1–C2), format (1:1 / group), price range
- Individual course detail page with syllabus, outcomes, tutor bio, pricing, and booking CTA
- "Related courses" recommendations

## 2.3 Tutor Profiles (Future-Ready)
- Profile page: photo, bio, languages, certifications, teaching style, availability calendar
- Rating and review summary
- "Book with this tutor" CTA
- Data model supports multiple tutors from day one — only UI is single-tutor initially

## 2.4 Booking System (1:1 + Group Classes)
- Interactive calendar showing available time slots (timezone-aware)
- 1:1 booking: student picks a slot, confirms, and pays
- Group classes: listed with date/time, seats remaining, join button
- Recurring booking option (weekly same slot)
- Cancellation/reschedule policy enforced in code (e.g., 24-hour notice)
- Calendar sync: Google Calendar / Outlook via ICS export

## 2.5 Payment Integration
- Stripe Checkout for card payments (global)
- PayPal as an alternative
- Support for one-time payments and class packages (5, 10, 20 sessions)
- Subscription model for unlimited group classes
- Invoices auto-generated and emailed
- Refund handling via admin dashboard
- Future: tutor payout splits via Stripe Connect

## 2.6 Student Dashboard
- Upcoming classes with join link (Zoom/Google Meet)
- Past classes and session notes
- Progress tracker (classes attended, streak, level progression)
- Payment history and receipts
- Profile and preferences (timezone, notification settings)
- Downloadable resources / homework

## 2.7 Admin Dashboard
- Overview metrics: bookings this week, revenue, new students, churn
- Manage courses (CRUD)
- Manage students (view profiles, notes, payment status)
- Manage schedule and availability
- View and respond to reviews
- Blog post editor (markdown-based)
- Revenue reports with date filters
- Future: multi-tutor management, commission tracking

## 2.8 Contact Us Page
- Contact form (name, email, message, language interest)
- Embedded Google Map (if physical location)
- WhatsApp click-to-chat button
- Email and social media links
- Auto-responder email on form submission

## 2.9 WhatsApp Integration
- Floating WhatsApp button on all pages (wa.me link)
- Booking confirmation sent via WhatsApp (Twilio or WhatsApp Business API)
- Class reminders 1 hour before via WhatsApp
- Future: WhatsApp chatbot for booking directly from chat

## 2.10 Reviews / Testimonials
- Students can leave a review after a completed class (1–5 stars + text)
- Reviews displayed on course pages and landing page
- Admin can moderate / feature reviews
- Aggregate rating calculated and displayed

## 2.11 Blog Section (SEO)
- Markdown-based blog with categories and tags
- SEO-optimized (meta tags, Open Graph, structured data)
- Categories: "Learning Tips," "Culture," "Grammar," "Student Stories"
- Each post has reading time, author, date, social share buttons
- Generates organic traffic for student acquisition

## 2.12 Chatbot (AI-Powered)
- Floating chat widget on all pages
- Answers common questions: pricing, scheduling, course recommendations
- Escalates to human (WhatsApp or email) when needed
- Powered by OpenAI API with a custom system prompt containing business FAQs
- Multilingual: responds in English or Spanish based on user preference

## 2.13 Email Automation
- Welcome email on signup
- Booking confirmation with calendar invite
- Class reminder (24h and 1h before)
- Post-class follow-up (review prompt + next class suggestion)
- Win-back email for inactive students (no booking in 14 days)
- Newsletter for blog updates and promotions
- Provider: Resend (free tier: 3,000 emails/month) or Mailgun

## 2.14 Notifications
- In-app notification bell (new bookings, reminders, messages)
- Email notifications (configurable by user)
- WhatsApp notifications for class reminders
- Push notifications (future, with PWA support)

## 2.15 Multi-Language Support (English / Spanish)
- Full UI translated in English and Spanish
- Language toggle in header
- Blog posts can have language variants
- SEO: hreflang tags for search engine localization
- Implementation: next-intl or i18next

---

# 3. FREE HOSTING + MVP SETUP

## Step-by-Step Free Hosting Strategy

### Frontend Hosting: Vercel (Free Tier)
- **Why:** Built for Next.js. Automatic deployments from GitHub. Custom domains. SSL included. Generous free tier (100 GB bandwidth, serverless functions included).
- **Setup:**
  1. Push code to GitHub
  2. Connect repo to Vercel
  3. Auto-deploys on every push to `main`

### Database: Supabase (Free Tier)
- **Why:** Postgres database, built-in auth, real-time subscriptions, RESTful API auto-generated, 500 MB storage free.
- **Setup:**
  1. Create Supabase project
  2. Define tables via Supabase dashboard or migrations
  3. Use Supabase JS client in Next.js

### Backend: Next.js API Routes + Supabase Edge Functions
- **Why:** No separate server needed. API routes run as serverless functions on Vercel. Supabase Edge Functions handle background tasks (e.g., sending emails).
- **Cost:** Free within Vercel and Supabase free tiers.

### File Storage: Supabase Storage (Free Tier)
- **Why:** 1 GB free. Stores profile images, course materials, blog images.

### Email: Resend (Free Tier)
- **Why:** 3,000 emails/month free. Modern API, great DX, works well with Next.js.

### Domain Strategy
| Phase | Domain | Cost |
|---|---|---|
| MVP | `linguaconnect.vercel.app` | Free |
| Launch | `linguaconnect.com` (or `.io`) | ~$12/year via Namecheap or Cloudflare Registrar |
| Custom email | `hello@linguaconnect.com` via Zoho Mail free tier | Free (up to 5 users) |

### Video Calls
- MVP: Use Zoom or Google Meet links (free). Tutor manually creates links.
- Phase 2: Integrate Zoom API or embed Daily.co / Jitsi for in-app video.

---

# 4. TECH STACK (WITH JUSTIFICATION)

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Full-stack React framework. SSR for SEO. API routes eliminate separate backend. Deploys free on Vercel. Massive ecosystem. |
| **Language** | TypeScript | Catches bugs early. Better DX with autocompletion. Industry standard for scalable apps. |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS for speed. shadcn/ui gives polished, accessible components without vendor lock-in (you own the code). |
| **Database** | PostgreSQL via Supabase | Relational data fits tutoring (users, bookings, courses). Supabase adds auth, real-time, and auto-generated APIs. Free tier is generous. |
| **Auth** | Supabase Auth | Email/password + Google OAuth. Row-level security for multi-tenant data. No extra service needed. |
| **Payments** | Stripe | Global leader. Excellent docs. Supports one-time, subscriptions, and marketplace payouts (Connect). Free to integrate; pay-per-transaction. |
| **Booking/Calendar** | Custom-built with `date-fns` + Supabase | No SaaS booking tool needed. Store availability as time slots in Postgres. Timezone handling with `date-fns-tz`. |
| **Email** | Resend + React Email | Resend has a generous free tier. React Email lets you build emails as React components — same DX as the rest of the app. |
| **Chatbot** | OpenAI API (GPT-4o-mini) | Cost-effective ($0.15/1M input tokens). Custom system prompt with business context. Streaming responses for good UX. |
| **CMS (Blog)** | MDX files in repo or Supabase | MDX = Markdown + React components. No external CMS needed for MVP. Move to a headless CMS later if needed. |
| **i18n** | next-intl | Purpose-built for Next.js App Router. Handles routing, formatting, and message bundles. |
| **Analytics** | Plausible or Umami (self-hosted) | Privacy-friendly, no cookie banners needed. Umami can self-host free on Vercel + Supabase. |
| **WhatsApp** | wa.me links (MVP) → Twilio (Scale) | wa.me links are free and zero-code. Twilio WhatsApp API for automated messages later. |
| **Video** | Zoom/Meet links (MVP) → Daily.co (Scale) | No integration needed for MVP. Daily.co has a free tier with 10K minutes/month for embedded video. |

---

# 5. SYSTEM ARCHITECTURE

## High-Level Architecture (Text Diagram)

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                         │
│  Next.js App (React + TypeScript + Tailwind + shadcn)   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │ Landing  │ │ Courses  │ │ Student  │ │  Admin    │  │
│  │ Page     │ │ & Booking│ │Dashboard │ │ Dashboard │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Next.js API Routes (Serverless)          │    │
│  │                                                  │    │
│  │  /api/bookings    → CRUD bookings                │    │
│  │  /api/courses     → CRUD courses                 │    │
│  │  /api/payments    → Stripe webhooks              │    │
│  │  /api/chat        → OpenAI streaming proxy       │    │
│  │  /api/contact     → Form submission + email      │    │
│  │  /api/reviews     → CRUD reviews                 │    │
│  └──────────┬──────────────────┬────────────────────┘    │
└─────────────┼──────────────────┼────────────────────────┘
              │                  │
     ┌────────▼────────┐  ┌─────▼──────────┐
     │   SUPABASE      │  │  EXTERNAL APIs  │
     │                  │  │                 │
     │  ┌────────────┐  │  │  Stripe         │
     │  │ PostgreSQL │  │  │  OpenAI         │
     │  │ Database   │  │  │  Resend         │
     │  └────────────┘  │  │  Twilio (future)│
     │  ┌────────────┐  │  │  Zoom API       │
     │  │    Auth    │  │  │  (future)       │
     │  └────────────┘  │  └────────────────┘
     │  ┌────────────┐  │
     │  │  Storage   │  │
     │  │  (files)   │  │
     │  └────────────┘  │
     │  ┌────────────┐  │
     │  │ Real-time  │  │
     │  │ (notifs)   │  │
     │  └────────────┘  │
     └─────────────────┘
```

## Data Flow Examples

**Booking Flow:**
Student selects slot → API validates availability → Stripe Checkout session created → Student pays → Stripe webhook confirms payment → Booking record created in DB → Confirmation email via Resend → WhatsApp reminder scheduled

**Auth Flow:**
Student clicks "Sign Up" → Supabase Auth creates user → JWT token returned → Stored in HTTP-only cookie → Middleware validates on each request → Row-level security filters data per user

## Scalability Approach

1. **Serverless by default:** Vercel functions auto-scale. No server management.
2. **Database connection pooling:** Supabase uses PgBouncer. Handles concurrent connections.
3. **CDN-first:** Static pages and images served from Vercel's edge CDN globally.
4. **Incremental Static Regeneration (ISR):** Course pages and blog posts rebuild on demand, not on every request.
5. **Multi-tenant data model:** `tutor_id` foreign key on all relevant tables from day one. Adding tutors requires no schema changes.

---

# 6. STEP-BY-STEP IMPLEMENTATION PLAN

## Phase 1: MVP (Weeks 1–3) — FREE

**Goal:** Launch a live website where students can discover courses, book a trial class, and contact you.

### Week 1: Foundation
- [ ] Initialize Next.js 14 project with TypeScript, Tailwind, shadcn/ui
- [ ] Set up GitHub repo and connect to Vercel for auto-deploy
- [ ] Create Supabase project (database + auth)
- [ ] Define initial database schema (users, courses, bookings)
- [ ] Build global layout: header (nav + language toggle), footer
- [ ] Build landing page (hero, how-it-works, testimonials, FAQ, CTA)

### Week 2: Core Pages + Booking
- [ ] Build course listing page (grid with filters)
- [ ] Build individual course detail page
- [ ] Build booking page with interactive calendar (availability from Supabase)
- [ ] Integrate Stripe Checkout for payments
- [ ] Set up Stripe webhook to confirm bookings
- [ ] Build contact page with form (submissions saved to Supabase + email via Resend)
- [ ] Add floating WhatsApp button

### Week 3: Polish + Launch
- [ ] Add SEO: meta tags, Open Graph images, sitemap.xml, robots.txt
- [ ] Add Google Analytics or Umami
- [ ] Set up multi-language (English + Spanish) with next-intl
- [ ] Mobile responsiveness pass
- [ ] Performance optimization (image compression, lazy loading)
- [ ] Write 2–3 initial blog posts (MDX)
- [ ] Launch on custom domain

**MVP Cost: $0** (domain optional at $12/year)

---

## Phase 2: Core Platform (Weeks 4–8)

**Goal:** Authenticated students with dashboards, full booking lifecycle, and admin tools.

### Week 4–5: Authentication + Student Dashboard
- [ ] Implement Supabase Auth (email/password + Google OAuth)
- [ ] Build sign-up / sign-in pages
- [ ] Build student dashboard: upcoming classes, past classes, profile
- [ ] Add payment history and receipt download
- [ ] Build "my bookings" with cancel/reschedule functionality

### Week 6–7: Admin Dashboard
- [ ] Build admin layout with sidebar navigation
- [ ] Course management: create, edit, delete courses
- [ ] Booking management: view all bookings, filter by date/status
- [ ] Student list with search and notes
- [ ] Revenue dashboard: charts (Recharts) showing bookings and revenue over time
- [ ] Availability management: set weekly recurring slots + block dates

### Week 8: Payments V2 + Reviews
- [ ] Add class packages (buy 5/10/20 sessions, credits system)
- [ ] Implement review system: students rate classes, admin moderates
- [ ] Display reviews on course pages
- [ ] Post-class automated email (review request + next class suggestion)
- [ ] Set up email automation sequences (welcome, reminder, win-back)

---

## Phase 3: Advanced Features (Weeks 9–14)

**Goal:** AI chatbot, automation, analytics, and multi-tutor readiness.

### Week 9–10: AI Chatbot
- [ ] Build chat widget component (floating, expandable)
- [ ] Create API route proxying to OpenAI (GPT-4o-mini)
- [ ] Write system prompt with business context, FAQs, and course info
- [ ] Implement streaming responses
- [ ] Add "Talk to a human" escalation (opens WhatsApp)
- [ ] Multilingual: detect language and respond accordingly

### Week 11–12: Automation + Notifications
- [ ] WhatsApp notifications via Twilio (booking confirmation, reminders)
- [ ] In-app notification system (bell icon, real-time via Supabase)
- [ ] Calendar sync: generate .ics files for Google Calendar / Outlook
- [ ] Automated class reminders (24h + 1h before)

### Week 13–14: Multi-Tutor Preparation
- [ ] Tutor registration and onboarding flow
- [ ] Tutor profile pages (public)
- [ ] Tutor dashboard: manage own availability, view own bookings/revenue
- [ ] Admin: approve/reject tutor applications
- [ ] Stripe Connect: split payments between platform and tutor
- [ ] Search and filter courses by tutor

---

# 7. UI/UX DESIGN GUIDELINES

## Design Philosophy
Warm, approachable, and professional. The platform should feel like a welcoming language school — not a cold SaaS tool. Use rounded shapes, friendly typography, and vibrant accent colors that nod to the cultures behind the languages.

## Homepage Sections (In Order)
1. **Hero:** Bold headline, sub-headline, "Book a Free Trial" CTA, background with subtle animated gradient or illustrated pattern
2. **Social Proof Bar:** Logos, stats ("500+ students," "4.9★ rating," "12 countries")
3. **How It Works:** 3-step visual (Choose a course → Book a slot → Join live class)
4. **Featured Courses:** Card carousel with course image, title, level, price, rating
5. **About the Tutor:** Photo, bio, certifications, teaching philosophy
6. **Testimonials:** Student quotes with photos, star ratings, carousel
7. **Blog Preview:** Latest 3 posts
8. **FAQ:** Accordion with common questions
9. **CTA Banner:** "Ready to start speaking?" with booking button
10. **Footer:** Navigation, contact info, social links, language toggle

## Color Palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary | Warm Indigo | `#4F46E5` | CTAs, links, active states |
| Secondary | Sunset Coral | `#F97316` | Accents, highlights, badges |
| Background | Soft Cream | `#FAFAF5` | Page background |
| Surface | White | `#FFFFFF` | Cards, modals |
| Text Primary | Charcoal | `#1E1E2E` | Headings, body text |
| Text Secondary | Slate | `#64748B` | Captions, metadata |
| Success | Emerald | `#10B981` | Confirmations, available slots |
| Warning | Amber | `#F59E0B` | Alerts, low availability |
| Error | Rose | `#EF4444` | Errors, cancellations |

## Typography
- **Headings:** `DM Serif Display` (warm, editorial, language/culture feel)
- **Body:** `DM Sans` (clean, modern, great readability)
- **Accent/Code:** `JetBrains Mono` (for pricing, stats)

## Layout Principles
- Max content width: 1280px, centered
- Section padding: 80px vertical on desktop, 48px on mobile
- Card border-radius: 16px
- Subtle shadows: `0 1px 3px rgba(0,0,0,0.08)`
- Generous whitespace between sections
- All interactive elements have hover/focus states with smooth transitions

---

# 8. MONETIZATION STRATEGY

## Model A: Commission Model (Recommended for MVP)
- Platform takes 15–20% of each booking
- Tutor receives 80–85%
- Simple to implement via Stripe Connect
- Aligns incentives: platform earns when tutors earn

## Model B: Subscription Model
- Students pay monthly: Basic ($29/mo, 4 group classes), Pro ($79/mo, 4 group + 2 private), Unlimited ($149/mo)
- Predictable recurring revenue
- Higher customer lifetime value
- Requires enough content to justify subscription

## Model C: Hybrid (Recommended for Scale)
- Group classes available via subscription
- 1:1 classes pay-per-session (commission model)
- Class packages (buy 10, get 1 free) for retention
- Premium add-ons: pronunciation analysis, recorded feedback, custom curriculum

## Additional Revenue Streams
- Featured tutor listings (tutors pay for visibility)
- Corporate plans (B2B language training)
- Digital products (e-books, flashcard packs, recorded masterclasses)
- Affiliate partnerships (language learning apps, textbooks)

---

# 9. SCALING PLAN

## MVP → SaaS Marketplace Roadmap

### Stage 1: Single Tutor (Month 1–3)
- You are the only tutor
- Validate demand, refine course offerings, collect testimonials
- Build the platform with multi-tutor data model (just don't expose the UI yet)

### Stage 2: Invite-Only Tutors (Month 4–6)
- Invite 3–5 trusted tutors
- Enable tutor profiles and individual dashboards
- Implement Stripe Connect for automated payouts
- Test and refine the multi-tutor experience

### Stage 3: Open Marketplace (Month 7–12)
- Tutor application and verification flow
- Search and discovery (filter by language, specialty, rating, price, availability)
- Tutor analytics dashboard
- Platform takes commission on all transactions

### Stage 4: Mobile App (Month 12+)
- React Native or Expo (shares logic with Next.js)
- Push notifications for class reminders
- In-app video calling
- Offline access to resources and notes

### Stage 5: Enterprise & API (Month 18+)
- White-label solution for language schools
- API for third-party integrations
- Corporate training portal with team management
- Advanced analytics and reporting

---

# 10. RISKS + SOLUTIONS

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| **Low initial traffic** | No bookings | High | SEO blog content, social media, free trial classes, WhatsApp marketing, referral program |
| **Supabase free tier limits** | Database downtime | Medium | Monitor usage. Upgrade to Pro ($25/mo) when nearing limits. Budget for this by month 3. |
| **Stripe account restrictions** | Can't process payments | Low | Provide complete business documentation upfront. Have PayPal as backup. |
| **Video call quality issues** | Bad student experience | Medium | Use Zoom/Meet (proven reliability) for MVP. Add Daily.co for embedded video later. |
| **Multi-timezone scheduling bugs** | Double bookings, wrong times | High | Store all times in UTC. Display in user's local timezone. Use `date-fns-tz`. Write thorough tests for timezone edge cases. |
| **Tutor no-shows (marketplace)** | Trust erosion | Medium | Require tutors to confirm 1h before. Automatic refund policy. Rating system penalizes no-shows. |
| **OpenAI API costs** | Unexpected bills | Low | Use GPT-4o-mini (cheapest). Set monthly spending cap. Cache common Q&A responses. |
| **GDPR / data privacy** | Legal liability | Medium | Supabase stores data in EU region (configurable). Add privacy policy and cookie consent. Implement data deletion on request. |
| **Competitor undercutting** | Price pressure | Medium | Differentiate on quality, personal touch, community. Avoid race to bottom on price. |
| **Feature creep** | Delayed launch | High | Strictly follow phased plan. Launch MVP in 3 weeks. Get real users before adding features. |

---

# 11. SUB-PROMPTS FOR IMPLEMENTATION

Below are ready-to-use prompts for each implementation task. Copy and paste directly into the appropriate tool.

---

## SUB-PROMPT 1: Website UI Design (for Figma / Framer)

```
Design a modern, warm, and professional website for "LinguaConnect" — an online
language tutoring platform for English and Spanish speaking classes.

BRAND IDENTITY:
- Tone: Warm, approachable, professional, multicultural
- Primary color: #4F46E5 (warm indigo), Secondary: #F97316 (sunset coral)
- Background: #FAFAF5 (soft cream), Cards: white with subtle shadows
- Headings font: DM Serif Display, Body: DM Sans
- Border radius: 16px on cards, 8px on buttons
- Illustrations style: Flat, diverse characters in conversation scenarios

PAGES TO DESIGN (Desktop + Mobile):
1. Homepage: Hero with CTA, social proof bar, how-it-works (3 steps),
   featured courses (card grid), tutor profile section, testimonials carousel,
   blog preview, FAQ accordion, CTA banner, footer
2. Course Listing: Filter sidebar (language, level, format, price), course cards
   in grid, pagination
3. Course Detail: Course image, title, description, syllabus, tutor info,
   pricing, available slots calendar, reviews, related courses
4. Booking Page: Calendar date picker, time slot selector, booking summary,
   Stripe checkout
5. Student Dashboard: Sidebar nav, upcoming classes cards, past classes table,
   progress stats, profile settings
6. Admin Dashboard: Sidebar nav, KPI cards (revenue, bookings, students),
   charts, course management table, booking list
7. Sign In / Sign Up: Clean forms, Google OAuth button, password reset
8. Contact Page: Form, map, WhatsApp button, email/social links
9. Blog listing + Blog post detail

DESIGN SYSTEM:
- Create a component library: buttons (primary, secondary, ghost), input fields,
  cards, badges, modals, dropdowns, avatars, navigation, footer
- All components should have hover, focus, active, and disabled states
- Responsive breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop)

Make it feel like a premium language school website, not a generic SaaS.
```

---

## SUB-PROMPT 2: Frontend Code Generation (Next.js)

```
Build a Next.js 14 (App Router) frontend for "LinguaConnect," an online language
tutoring platform. Use TypeScript, Tailwind CSS, and shadcn/ui.

PROJECT STRUCTURE:
src/
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx          # Landing page
│   │   ├── courses/
│   │   │   ├── page.tsx      # Course listing
│   │   │   └── [slug]/page.tsx # Course detail
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog listing
│   │   │   └── [slug]/page.tsx # Blog post
│   │   └── contact/page.tsx
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── dashboard/            # Student dashboard (protected)
│   │   ├── page.tsx          # Overview
│   │   ├── bookings/page.tsx
│   │   ├── profile/page.tsx
│   │   └── layout.tsx
│   ├── admin/                # Admin dashboard (protected)
│   │   ├── page.tsx
│   │   ├── courses/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── students/page.tsx
│   │   └── layout.tsx
│   ├── api/                  # API routes
│   │   ├── bookings/route.ts
│   │   ├── courses/route.ts
│   │   ├── chat/route.ts
│   │   ├── contact/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   └── reviews/route.ts
│   ├── layout.tsx            # Root layout
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── landing/              # Landing page sections
│   ├── booking/              # Booking calendar, slot picker
│   ├── dashboard/            # Dashboard widgets
│   └── shared/               # Header, footer, chatbot widget
├── lib/
│   ├── supabase/             # Supabase client + helpers
│   ├── stripe.ts             # Stripe helpers
│   ├── utils.ts              # General utilities
│   └── constants.ts
├── messages/                 # i18n translation files
│   ├── en.json
│   └── es.json
└── types/                    # TypeScript types

LANDING PAGE REQUIREMENTS:
- Hero section: gradient background, headline "Speak English & Spanish with
  Confidence", subheading, two CTAs ("Book Free Trial" primary, "View Courses"
  secondary), decorative SVG shapes
- Stats bar: animated counter for "500+ Students", "1000+ Classes", "4.9 Rating"
- How it works: 3-step horizontal flow with icons
- Course cards: image, title, level badge, price, rating, "Book Now" button
- Testimonials: horizontal carousel with avatar, quote, name, rating
- FAQ: accordion component
- All sections animate on scroll entry using Intersection Observer

BOOKING CALENDAR:
- Month view calendar showing available dates (green dots)
- Click date to see available time slots
- Timezone selector (auto-detect user's timezone)
- Slot shows time, duration, price
- "Book Now" redirects to Stripe Checkout
- Handle loading, error, and empty states

Make all components responsive and accessible (ARIA labels, keyboard navigation).
Use next-intl for internationalization with English and Spanish.
```

---

## SUB-PROMPT 3: Backend API Generation

```
Create the backend API routes for LinguaConnect using Next.js 14 API Routes
(App Router) with Supabase as the database and auth provider.

ENVIRONMENT VARIABLES NEEDED:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- OPENAI_API_KEY
- RESEND_API_KEY

API ENDPOINTS:

1. COURSES
   GET    /api/courses          → List all active courses (public, with filters)
   GET    /api/courses/[slug]   → Get course by slug (public)
   POST   /api/courses          → Create course (admin only)
   PATCH  /api/courses/[id]     → Update course (admin only)
   DELETE /api/courses/[id]     → Soft delete course (admin only)

2. BOOKINGS
   GET    /api/bookings         → List user's bookings (authenticated)
   POST   /api/bookings         → Create booking + Stripe checkout session
   PATCH  /api/bookings/[id]    → Cancel or reschedule (24h policy)
   GET    /api/bookings/admin   → List all bookings (admin only)

3. AVAILABILITY
   GET    /api/availability     → Get available slots for a date range (public)
   POST   /api/availability     → Set availability (admin/tutor only)
   DELETE /api/availability/[id]→ Remove slot (admin/tutor only)

4. PAYMENTS
   POST   /api/webhooks/stripe  → Handle Stripe webhook events
                                  (checkout.session.completed,
                                   payment_intent.succeeded,
                                   payment_intent.failed)

5. REVIEWS
   GET    /api/reviews          → List reviews for a course
   POST   /api/reviews          → Submit review (authenticated, after class)
   PATCH  /api/reviews/[id]     → Moderate review (admin only)

6. CONTACT
   POST   /api/contact          → Submit contact form, save to DB, send email

7. CHAT
   POST   /api/chat             → Streaming response from OpenAI with business
                                  context as system prompt

8. AUTH (handled by Supabase, but add middleware)
   - Middleware checks auth on /dashboard/* and /admin/* routes
   - Admin routes additionally check user role === 'admin'

IMPORTANT PATTERNS:
- Validate all inputs with Zod schemas
- Return consistent error format: { error: string, code: string }
- Use Supabase Row-Level Security for data isolation
- Rate limit /api/chat and /api/contact (use in-memory store for MVP)
- All dates stored as UTC ISO strings
- Stripe webhook verifies signature before processing
- Log all errors to console (structured JSON for observability later)

Generate complete, production-ready TypeScript code for each endpoint.
```

---

## SUB-PROMPT 4: Database Schema Design

```
Design a PostgreSQL database schema for LinguaConnect (online language tutoring
platform) using Supabase. Include Row-Level Security policies.

TABLES:

1. profiles (extends Supabase auth.users)
   - id: UUID (FK to auth.users.id, PK)
   - role: ENUM ('student', 'tutor', 'admin')
   - full_name: TEXT NOT NULL
   - avatar_url: TEXT
   - timezone: TEXT DEFAULT 'UTC'
   - preferred_language: TEXT DEFAULT 'en'
   - phone: TEXT
   - bio: TEXT
   - created_at: TIMESTAMPTZ DEFAULT now()
   - updated_at: TIMESTAMPTZ DEFAULT now()

2. courses
   - id: UUID PK DEFAULT gen_random_uuid()
   - tutor_id: UUID FK profiles(id) NOT NULL
   - slug: TEXT UNIQUE NOT NULL
   - title: TEXT NOT NULL
   - description: TEXT
   - language: ENUM ('english', 'spanish')
   - level: ENUM ('A1','A2','B1','B2','C1','C2')
   - format: ENUM ('one_on_one', 'group')
   - max_students: INT DEFAULT 1
   - duration_minutes: INT DEFAULT 60
   - price_cents: INT NOT NULL
   - currency: TEXT DEFAULT 'usd'
   - image_url: TEXT
   - is_active: BOOLEAN DEFAULT true
   - created_at / updated_at: TIMESTAMPTZ

3. availability_slots
   - id: UUID PK
   - tutor_id: UUID FK profiles(id)
   - start_time: TIMESTAMPTZ NOT NULL
   - end_time: TIMESTAMPTZ NOT NULL
   - is_recurring: BOOLEAN DEFAULT false
   - recurrence_rule: TEXT (iCal RRULE format, nullable)
   - is_booked: BOOLEAN DEFAULT false
   - created_at: TIMESTAMPTZ
   CONSTRAINT: end_time > start_time
   INDEX on (tutor_id, start_time) WHERE is_booked = false

4. bookings
   - id: UUID PK
   - student_id: UUID FK profiles(id)
   - course_id: UUID FK courses(id)
   - slot_id: UUID FK availability_slots(id)
   - status: ENUM ('pending','confirmed','completed','cancelled','no_show')
   - stripe_session_id: TEXT
   - stripe_payment_intent_id: TEXT
   - amount_cents: INT
   - currency: TEXT
   - meeting_url: TEXT
   - notes: TEXT
   - cancelled_at: TIMESTAMPTZ
   - cancellation_reason: TEXT
   - created_at / updated_at: TIMESTAMPTZ
   INDEX on (student_id, status)
   INDEX on (course_id, created_at)

5. reviews
   - id: UUID PK
   - booking_id: UUID FK bookings(id) UNIQUE
   - student_id: UUID FK profiles(id)
   - course_id: UUID FK courses(id)
   - rating: INT CHECK (rating >= 1 AND rating <= 5)
   - comment: TEXT
   - is_featured: BOOLEAN DEFAULT false
   - is_visible: BOOLEAN DEFAULT true
   - created_at: TIMESTAMPTZ

6. contact_submissions
   - id: UUID PK
   - name: TEXT NOT NULL
   - email: TEXT NOT NULL
   - message: TEXT NOT NULL
   - language_interest: TEXT
   - status: ENUM ('new', 'responded', 'closed')
   - created_at: TIMESTAMPTZ

7. class_packages
   - id: UUID PK
   - name: TEXT (e.g., "10 Class Pack")
   - total_credits: INT
   - price_cents: INT
   - currency: TEXT
   - is_active: BOOLEAN

8. student_credits
   - id: UUID PK
   - student_id: UUID FK profiles(id)
   - package_id: UUID FK class_packages(id)
   - remaining_credits: INT
   - purchased_at: TIMESTAMPTZ
   - expires_at: TIMESTAMPTZ

9. blog_posts
   - id: UUID PK
   - slug: TEXT UNIQUE
   - title: TEXT
   - content: TEXT (markdown)
   - excerpt: TEXT
   - cover_image_url: TEXT
   - author_id: UUID FK profiles(id)
   - language: TEXT
   - tags: TEXT[]
   - is_published: BOOLEAN DEFAULT false
   - published_at: TIMESTAMPTZ
   - created_at / updated_at: TIMESTAMPTZ

10. notifications
    - id: UUID PK
    - user_id: UUID FK profiles(id)
    - type: ENUM ('booking_confirmed','class_reminder','review_request',
                  'payment_received','general')
    - title: TEXT
    - message: TEXT
    - is_read: BOOLEAN DEFAULT false
    - metadata: JSONB
    - created_at: TIMESTAMPTZ
    INDEX on (user_id, is_read, created_at DESC)

ROW-LEVEL SECURITY POLICIES:
- profiles: Users can read all profiles. Users can update only their own.
- courses: Anyone can read active courses. Only tutors/admins can insert/update.
- bookings: Students see only their own. Tutors see bookings for their courses.
  Admins see all.
- reviews: Anyone can read visible reviews. Students can insert for their own
  completed bookings. Admins can update (moderate).
- notifications: Users see only their own.

Generate the complete SQL migration file with CREATE TABLE statements, indexes,
RLS policies, and trigger functions for updated_at timestamps.
```

---

## SUB-PROMPT 5: Chatbot Implementation

```
Build an AI-powered chatbot for LinguaConnect (language tutoring platform) using
Next.js API routes and the OpenAI API (GPT-4o-mini). The chatbot should answer
student questions about courses, pricing, scheduling, and general language
learning.

SYSTEM PROMPT FOR THE CHATBOT:
"You are Lumi, the friendly AI assistant for LinguaConnect — an online platform
for English and Spanish speaking classes. You help prospective and current
students with questions about:

- Available courses (English speaking, Spanish speaking, Business English,
  Conversational Spanish, Exam Prep)
- Pricing: 1:1 classes start at $25/hour, group classes at $12/session.
  Packages: 5 classes for $110, 10 for $200, 20 for $360.
- Class format: Live video calls via Zoom/Google Meet, 60 min for 1:1,
  45 min for group (max 6 students)
- Levels: Beginner (A1-A2), Intermediate (B1-B2), Advanced (C1-C2)
- Schedule: Classes available Mon-Sat, 8am-9pm EST. Students pick their own slot.
- Free trial: First 30-minute class is free for new students.
- Cancellation: Free cancellation up to 24 hours before. After that, credit is
  used.

Tone: Warm, encouraging, helpful. Use simple language. If you don't know
something specific, say 'Let me connect you with our team for details!' and
suggest they click the WhatsApp button or email hello@linguaconnect.com.

Always respond in the same language the student writes in (English or Spanish).
Keep responses concise (2-4 sentences max unless they ask for detail).
End with a helpful follow-up question or CTA when appropriate."

FRONTEND COMPONENT:
- Floating chat bubble in bottom-right corner (expand/collapse)
- Chat window: message list, input field, send button
- Messages stream in word-by-word (SSE from API)
- User messages right-aligned (indigo), bot messages left-aligned (white card)
- "Lumi" avatar (sparkle emoji or small icon) next to bot messages
- "Talk to a human" button opens WhatsApp link
- Typing indicator while waiting for response
- Chat history persists in component state (not across sessions for MVP)
- Accessible: keyboard navigable, screen reader friendly

BACKEND API ROUTE (/api/chat):
- Accept POST with { messages: [{role, content}] }
- Prepend system prompt
- Call OpenAI chat completions with stream: true
- Return Server-Sent Events (SSE) response
- Rate limit: max 20 messages per IP per hour
- Input validation: reject messages > 500 characters
- Error handling: return friendly error message if API fails

Generate the complete React component and API route in TypeScript.
```

---

## SUB-PROMPT 6: SEO Content Generation

```
Generate SEO-optimized blog content for LinguaConnect, an online English and
Spanish tutoring platform. Create 5 blog post outlines with full content for
the first 2 posts.

TARGET KEYWORDS (primary + secondary for each post):

Post 1: "how to improve English speaking skills"
  Secondary: practice English conversation online, English fluency tips
  Word count: 1500-2000 words

Post 2: "mejores formas de practicar español" (Best ways to practice Spanish)
  Secondary: clases de español en línea, hablar español con fluidez
  Word count: 1500-2000 words (written entirely in Spanish)

Post 3 (outline only): "benefits of online language tutoring vs apps"
  Secondary: online tutor vs Duolingo, live language classes online

Post 4 (outline only): "business English phrases for meetings"
  Secondary: professional English vocabulary, English for work

Post 5 (outline only): "how to prepare for IELTS speaking test"
  Secondary: IELTS speaking tips, IELTS practice online

FOR EACH POST INCLUDE:
- SEO title tag (under 60 characters)
- Meta description (under 160 characters)
- H1 (matches search intent)
- H2 subheadings (6-8 per post)
- Internal links to course pages (e.g., "Check out our [Conversational English
  course](/courses/conversational-english)")
- External links to authoritative sources (1-2 per post)
- CTA at end: "Ready to practice? Book your free trial class today."
- Open Graph title and description
- Schema markup suggestion (Article type)
- Estimated reading time

Write in a conversational, encouraging tone. Target intermediate English/Spanish
learners. Avoid jargon. Use short paragraphs (2-3 sentences max).
```

---

## SUB-PROMPT 7: Landing Page Copywriting

```
Write all the copy for the LinguaConnect landing page. The platform offers live
online English and Spanish speaking classes with expert tutors.

TARGET AUDIENCE: Adults (18-45) who want to improve their conversational
fluency for career, travel, or personal growth. They've tried apps like Duolingo
but want real human practice.

BRAND VOICE: Warm, confident, encouraging. Like a supportive friend who happens
to be a language expert. Avoid corporate jargon. Use "you" frequently.

SECTIONS TO WRITE:

1. HERO
   - Headline (8 words max, powerful, benefit-driven)
   - Subheadline (2 sentences max, expand on the promise)
   - Primary CTA button text
   - Secondary CTA button text

2. SOCIAL PROOF BAR
   - 4 stat items with labels (e.g., "500+ Students Worldwide")

3. HOW IT WORKS
   - Section headline
   - 3 steps, each with: icon suggestion, title (4 words max), description
     (1 sentence)

4. FEATURED COURSES SECTION
   - Section headline
   - Section subheadline (1 sentence)
   - 4 course card descriptions (title + 1-sentence tagline each):
     a) Conversational English
     b) Business English
     c) Spanish for Beginners
     d) Advanced Spanish Discussion

5. ABOUT THE TUTOR
   - Section headline
   - Bio paragraph (4-5 sentences, first person, warm and credentialed)
   - 3 credential badges (e.g., "TEFL Certified", "5+ Years Experience",
     "Native Speaker")

6. TESTIMONIALS
   - Write 4 realistic student testimonials (2-3 sentences each)
   - Include first name, country, and course taken

7. FAQ
   - Write 8 Q&A pairs covering: free trial, pricing, scheduling, class format,
     cancellation, levels, technology needed, group vs private

8. FINAL CTA BANNER
   - Headline (compelling, urgency without being pushy)
   - Subheadline (1 sentence)
   - CTA button text

9. FOOTER
   - Tagline (under 10 words)

Provide all copy in BOTH English and Spanish (for i18n).
```

---

# APPENDIX: Quick Reference Commands

```bash
# Initialize project
npx create-next-app@latest linguaconnect --typescript --tailwind --app --src-dir
cd linguaconnect

# Install core dependencies
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js
npm install next-intl date-fns date-fns-tz zod resend
npm install recharts lucide-react

# Install shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card input dialog dropdown-menu avatar badge
npx shadcn@latest add accordion tabs calendar select textarea toast

# Install dev dependencies
npm install -D @types/node prettier eslint-config-prettier

# Set up Supabase locally (optional)
npx supabase init
npx supabase start

# Deploy to Vercel
npm i -g vercel
vercel
```

---

*This document is a living blueprint. Update it as decisions are made and features are built. The phased approach ensures you launch fast, learn from real users, and scale with confidence.*
