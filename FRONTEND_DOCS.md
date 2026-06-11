# Cetoh Frontend Architecture & Documentation

Welcome to the comprehensive documentation for the **Cetoh** frontend platform. This document covers the architecture, tech stack, routing strategy, testing infrastructure, and accessibility standards implemented across the application to provide a robust, production-ready environment.

---

## 1. Tech Stack & Ecosystem

The frontend is built using modern, highly performant tools tailored for a dynamic e-commerce and creator platform.

| Technology | Role |
| :--- | :--- |
| **React 19** | Core UI library. |
| **Vite 7** | Extremely fast frontend build tool and development server. |
| **@tanstack/react-router** | Type-safe, file-based routing mechanism. |
| **Tailwind CSS v4** | Utility-first styling with native CSS variables and nesting. |
| **Bun** | Package manager and JavaScript runtime for fast dependency installation. |
| **Playwright** | End-to-End (E2E) and Visual Regression Testing (VRT). |
| **Radix UI** | Unstyled, accessible UI primitives for dropdowns, dialogs, etc. |
| **Lucide React** | Scalable, tree-shaken SVG icon library. |

---

## 2. Core Architecture

### 2.1 File-Based Routing
We utilize `@tanstack/react-router` with its Vite plugin generator.
- All routes are defined inside the `src/routes/` directory.
- `__root.tsx` serves as the global shell, providing the `<Outlet />`, React Query provider, global skip-links, and the toast notifications.
- Dynamic routes use the `$` prefix (e.g., `products.$id.tsx`, `creators.$username.tsx`).
- A catch-all `$.tsx` provides a custom 404 Not Found experience.

### 2.2 SSR Prerendering (Shell Generation)
To ensure seamless deployment on static hosting platforms (like Vercel) without the dreaded "homepage flash" caused by SSR mismatch:
- A custom script `scripts/generate-html.mjs` runs during the build pipeline (`npm run build:static`).
- It temporarily spins up the compiled server entry, requests the root `/` path, and captures the HTML.
- It intentionally **strips out the pre-rendered body content** while retaining the injected `<head>`, meta tags, and script tags.
- This creates a perfectly clean `dist/client/index.html` shell that allows the client-side router to hydrate correctly on any route.

### 2.3 Performance Optimizations
The platform is heavily optimized for fast loading and responsiveness, especially on mobile devices:
- **Component Lazy Loading**: Heavy visual components (like `<Hero />` and `<HomeSections />` on the index page) are dynamically imported using `React.lazy()` and wrapped in `<Suspense>` boundaries.
- **Image Deferral**: Native `loading="lazy"` attributes are strictly applied to all heavy marketing assets and illustrations (`setup-person`, `avatarImg`, etc.) to prevent blocking the initial render.
- **Tree-Shaking**: Icons are imported strictly as named exports from `lucide-react` to minimize bundle size.

---

## 3. Styling & Design System

The application employs a custom "Neo-Brutalist" design aesthetic ("vibe") that relies heavily on vibrant colors, harsh borders, and distinct shadows.

### 3.1 Global Styles & Tailwind v4
- Configured purely via CSS variables in `src/styles/app.css` utilizing Tailwind v4's `@theme` directive.
- **Core Variables**: `--color-primary`, `--color-background`, `--color-surface`, `--color-border`.
- **Custom Utilities**:
  - `shadow-vibe`: A hard, unblurred shadow (`4px 4px 0px 0px var(--color-border)`).
  - `container-page`: A standardized maximum width wrapper with responsive padding.
  - `bg-tint-*`: Subtle pastel background colors used for decorative elements (`bg-tint-mint`, `bg-tint-peach`, `bg-tint-lilac`).

### 3.2 Unified Global Header
- All pages (both public marketing and interior application pages) import a single, unified `<SiteHeader />` from `src/components/site-layout.tsx`.
- This ensures that navigation items (Search, Cart, Marketplace, Categories, Pricing, Blog) are identical across all breakpoints, maintaining UI consistency and reducing component bloat.

---

## 4. Accessibility (a11y) Standards

We adhere to **WCAG 2 AA** compliance to ensure the platform is usable by everyone.

### 4.1 Global Landmark Navigation (Skip Links)
- A global "Skip to main content" link is mounted at the very top of `__root.tsx`. It remains visually hidden until focused via the keyboard (`Tab`).
- **Implementation**: Every single route component explicitly wraps its primary content in a `<main id="main-content">` tag. This guarantees that screen readers and keyboard users can bypass the `SiteHeader` directly to the page's core content, resolving a major SPA routing challenge.

### 4.2 Semantic HTML & State
- All interactive elements use proper semantic tags (`<button>`, `<a>`).
- Mobile menu toggles utilize `aria-expanded` and `aria-controls` to communicate their state to assistive technologies.
- A logical `<h1>` to `<h6>` heading hierarchy is strictly enforced on all pages.
- Focus rings are explicitly styled using `focus-visible:ring-2 focus-visible:ring-primary` so keyboard navigation is highly visible without compromising mouse user aesthetics.

### 4.3 Automated Auditing
- Accessibility is continually validated using `@axe-core/playwright`.
- The audit script (`node scripts/run-axe.mjs`) navigates through all production routes and fails if any violations are detected regarding contrast, ARIA landmarks, or HTML structure.

---

## 5. Testing Infrastructure

### Visual Regression Testing (VRT)
We employ Playwright to prevent unintended CSS overflows, layout shifts, or broken responsiveness.
- **Test File**: `e2e/vrt.spec.ts`
- **Coverage**: Evaluates critical routes (`/`, `/login`, `/signup`, `/marketplace`, `/pricing`).
- **Breakpoints**: Tests automatically run concurrently across:
  - `Desktop Chrome` (Standard viewport)
  - `Mobile Chrome` (Pixel 5 viewport)
- **Stability Mechanisms**: The testing script deliberately disables all CSS animations and transitions (`animations: "disabled"`) and waits for `networkidle` to guarantee that screenshots are perfectly deterministic and not affected by rotating globes or fading carousels.

**To run or update visual tests:**
```bash
# Run the tests against the current baseline snapshots
npx playwright test e2e/vrt.spec.ts

# Update the baseline snapshots (if UI changes are intentional)
npx playwright test e2e/vrt.spec.ts --update-snapshots
```

---

## 6. Directory Structure Overview

```text
ceto/
├── e2e/                     # Playwright visual regression tests
├── scripts/
│   ├── generate-html.mjs    # Prerendering build script
│   └── run-axe.mjs          # Axe accessibility auditor
├── src/
│   ├── assets/              # Static media (images, svgs, logos)
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Radix/CVA primitive UI components
│   │   ├── site-layout.tsx  # Unified global header/footer
│   │   ├── home-hero.tsx    # Extracted homepage hero for lazy-loading
│   │   └── home-sections.tsx# Heavy marketing content sections
│   ├── lib/                 # Utilities and mock data
│   ├── routes/              # TanStack router file-based definitions
│   │   ├── __root.tsx       # Global SPA shell and skip-link
│   │   └── index.tsx        # Entry homepage route
│   └── styles/
│       └── app.css          # Tailwind config and global CSS
├── package.json
└── playwright.config.ts     # Playwright settings (viewports, retries)
```

---
*Generated internally for the Cetoh engineering team to ensure high standards of UI delivery, accessibility, and performance.*
