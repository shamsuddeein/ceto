# Cetoh — Frontend

> **The largest creator platform in Africa.**  
> Sell digital products, services, subscriptions, courses, tickets and more — to anyone, anywhere in the world.

---

## Tech Stack

| Tool                                         | Purpose                                    |
| -------------------------------------------- | ------------------------------------------ |
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework (SSR + routing) |
| [React 19](https://react.dev)                | UI library                                 |
| [Tailwind CSS v4](https://tailwindcss.com)   | Styling                                    |
| [Vite](https://vitejs.dev)                   | Build tool                                 |
| [Bun](https://bun.sh)                        | Package manager & runtime                  |
| [TypeScript](https://www.typescriptlang.org) | Type safety                                |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.0 installed
- Node.js ≥ 18 (for tooling compatibility)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/shamsuddeein/ceto.git
cd ceto

# Install dependencies
bun install

# Start the dev server (http://localhost:3000)
bun run dev
```

### Build for Production

```bash
bun run build
```

---

## Project Structure

```
ceto/
├── public/
│   ├── favicon.ico          # Browser tab icon
│   └── favicon.png          # Apple touch icon
├── src/
│   ├── assets/              # Images, logos, illustrations
│   │   ├── logo.png
│   │   ├── marketplace-preview.png
│   │   ├── ebook-cover.jpg
│   │   ├── setup-person.jpg
│   │   └── avatar-{1,2,3}.jpg
│   ├── routes/
│   │   ├── __root.tsx       # Root shell — head, meta tags, fonts
│   │   └── index.tsx        # Landing page (all sections)
│   └── styles/
│       └── app.css          # Global CSS + Tailwind tokens
├── vite.config.ts
├── package.json
└── bunfig.toml
```

---

## Landing Page Sections

| Section                | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| **SiteHeader**         | Sticky navbar with nav links, EN switcher, Log In + Start Selling |
| **Hero**               | Full-width dark green hero with headline and CTA                  |
| **MarketplaceExplore** | Marketplace screenshot preview                                    |
| **SellableTypes**      | 6-card grid of sellable product types                             |
| **SetupSteps**         | 3-step "how it works" with photo                                  |
| **PaymentGateways**    | 12 payment gateway logos + 3D globe SVG                           |
| **SalesTools**         | Affiliates, Sales Page, Automated Follow-ups cards                |
| **Integrations**       | Facebook Pixel, Mailchimp, ConvertKit, Kartra, Zapier             |
| **Testimonials**       | 5-slide carousel with customer quotes                             |
| **EbookCTA**           | Free ebook download CTA with 3D book mockup                       |
| **PressAndFinalCTA**   | Press logos + final sign-up CTA card                              |
| **SiteFooter**         | 4-column footer with links, social icons, EN switcher             |

---

## Environment

No environment variables are required for the frontend. API base URLs and keys are expected to be injected at build time when connecting to a backend.

---

## Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

© 2026 Cetoh. All rights reserved.
