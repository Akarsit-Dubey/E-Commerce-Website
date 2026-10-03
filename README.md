# NOVA — Modern Essentials

> **A production-quality modern e-commerce experience built with Next.js (App Router), TypeScript, and Tailwind CSS.**
> Designed with a minimal, editorial aesthetic for a fictional premium lifestyle and fashion brand.

---

## ✦ Overview

**NOVA** is a fictional premium lifestyle and fashion e-commerce brand centered on the philosophy of *Refined Reduction* — creating permanent essentials crafted from double-faced virgin wool, Grade-A Mongolian cashmere, vegetable-tanned Portuguese leather, and Grade-5 titanium.

The project is engineered as an end-to-end frontend architecture with zero external backend dependencies initially, persisting client interactions (shopping bag, saved items, wishlist, order history, and color theme preferences) in localStorage. It serves as a benchmark for modern, production-grade frontend engineering, accessible interaction design, and editorial visual quality.

> [!NOTE]
> **Demo Flow Notice**: The checkout and payment process is entirely a client-side simulation. No payment methods are billed, and no financial data is processed.

---

## ✦ Key Features

### 1. Editorial Homepage
- **Announcement Bar**: Rotating micro-announcements with manual controls and dismissibility.
- **Sticky Responsive Navigation**: Translucent glass-morphic header with animated badge counters for cart and wishlist, live catalog search shortcut, dark mode toggle, and mobile drawer.
- **Editorial Hero**: Atmospheric imagery with dual primary and secondary calls to action, brand pillars, and material guarantees.
- **Shop By Discipline**: Curated tiles for *Clothing*, *Footwear*, *Bags & Carry*, *Accessories*, and *Daily Essentials*.
- **Curated Best Sellers & New Arrivals**: Instant tab-switching catalog showcase with quick add and wishlist shortcuts.
- **Promotional Material Spotlight**: Editorial feature highlighting nomadic Mongolian cashmere provenance.
- **Brand Story & Atelier Manifesto**: Interactive storytelling showcasing workshops in Porto, Biella, and Scotland.
- **Customer Testimonials**: Verified patron quotes with customer personas and star ratings.
- **Social Lifestyle Gallery**: `#LivingWithNOVA` curated editorial imagery.
- **Comprehensive Editorial Footer**: Integrated newsletter signup with instant coupon generation (`NOVA10`), currency indicator, and client care links.

### 2. Catalog & Discovery (`/shop`)
- **Real-Time Multi-Facet Filtering**:
  - Filter by category (*Clothing*, *Shoes*, *Bags*, *Accessories*, *Essentials*)
  - Interactive price range slider ($40 – $600+)
  - Size selectors (XS, S, M, L, XL, 40, 41, 42, 43, 44, One Size)
  - Color palette swatch filters with live color chips
  - Stock availability toggle ("In stock only")
  - Individual active filter dismiss chips and global "Clear All"
- **Interactive Sorting**: Featured, New Arrivals, Price (Low to High), Price (High to Low), and Highest Rated.
- **View Mode Toggle**: Switch between responsive 4-column editorial grid and detailed list view.
- **Responsive Mobile Drawer**: Full filter control panel accessible via sliding sheet on mobile devices.
- **Pagination & Load-More**: Smooth incremental loading with remaining product counter.

### 3. Product Detail Experience (`/products/[slug]`)
- **High-Resolution Gallery**: Multi-angle image preview with active thumbnail strip, arrow navigation, mobile swipe dots, and fullscreen lightbox modal.
- **Variant Selection**: Interactive color swatches and size selector buttons with real-time feedback.
- **Sizing Guide Modal**: Comprehensive measurements table in inches and centimeters.
- **Quantity Stepper**: Bound-limited item selector.
- **Interactive Add to Bag**: Micro-animation with loading and checkmark confirmation states, triggering the slide-out Cart Drawer.
- **Wishlist Integration**: Instant save/remove with animated heart icon.
- **Product Accordions**: Detailed construction specs, material provenance, shipping timelines, and textile care.
- **Customer Reviews System**: Average rating, distribution bars, verified buyer badges, and interactive "Write a Review" modal dialog.
- **Related & Recently Viewed**: Dynamically generated complementary items and client-persisted recently viewed products.

### 4. Dedicated Search Experience (`/search`)
- Live keyword matching across product titles, descriptions, categories, colors, and tags.
- Search suggestion chips for popular queries.
- Persisted recent search queries with one-click deletion and history clearing.
- Category pills and sorting controls directly on search results.
- Refined empty state with search reset.

### 5. Slide-Out Cart Drawer & Full Cart Page (`/cart`)
- Slide-over bag accessible from any route.
- Live free shipping progress bar calculated against the \$150 complimentary global threshold.
- Variant specifications, quantity steppers, item removal, and "Save for Later" shelf.
- Promotional coupon engine (valid codes: `NOVA10` for 10% off, `WELCOME20` for 20% off).
- Order cost calculations: Subtotal, dynamic promotional discounts, shipping calculation, estimated sales tax, and total.

### 6. Realistic Demo Checkout (`/checkout` & `/checkout/success`)
- Multi-step customer inputs: Contact details, shipping address, delivery tiers (Standard, Express, White Glove), and mock payment inputs.
- Client-side form validation with descriptive inline error feedback.
- Simulated order submission state with loading spinner.
- Persisted mock order generation with unique ID (e.g., `NV-892401`) stored directly in order archives.
- Dedicated `/checkout/success` order confirmation screen with delivery timeline and continuing action triggers.

### 7. Wishlist Archive (`/wishlist`)
- Persisted wishlist items across browser sessions.
- One-click "Move to Bag" action that automatically configures product defaults.
- Clean empty state with direct routing back to collection discovery.

### 8. Client Account Dashboard (`/account`)
- Tabbed interface:
  - **Orders**: Full order history cards with status pills, order item previews, pricing, and interactive **DHL Express tracking modal**.
  - **Personal Details**: Profile information and communication controls.
  - **Saved Addresses**: Address book with "Add New Address" modal dialog and default selector.
  - **Preferences**: Display currency, newsletter status, and security preferences.

### 9. Brand Story & FAQ (`/about` & `/faq`)
- **/about**: Editorial brand story exploring the philosophy of reduction, artisan provenance across Porto, Biella, and Scotland, and the NOVA Lifetime Craftsmanship Warranty.
- **/faq**: Multi-category accordion answering questions regarding shipping, returns, fabric care, and custom alterations.

### 10. Polished Dark Mode
- Intentional surface architecture using deep obsidian (`#0D0E11`), elevated cards (`#15171C`), and warm bronze accents (`#C9744D`).
- System preference synchronization and manual light/dark toggle persisted in localStorage.

---

## ✦ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework with Server Components, Static Site Generation (SSG), and image optimization |
| **React 19** | Modern hooks, concurrent rendering, and context providers |
| **TypeScript 5** | Strict type definitions across products, cart, orders, and UI |
| **Tailwind CSS v4** | Modern utility-first styling with custom CSS design tokens |
| **Lucide React** | Clean, minimalist icon system |
| **Framer Motion / Motion** | Subtle micro-interactions and transitions |
| **HTML5 & Web Storage** | SSR-safe `localStorage` abstraction for cross-session state |

---

## ✦ Architecture & Folder Structure

```
e-commerce/
├── app/
│   ├── layout.tsx              # Root layout with providers, navbar, cart drawer, footer
│   ├── page.tsx                # Editorial homepage
│   ├── globals.css             # Tailwind v4 theme tokens, light & dark mode surfaces
│   ├── not-found.tsx           # Custom 404 page
│   ├── shop/
│   │   ├── page.tsx            # Shop page (server wrapper with Suspense)
│   │   └── ShopClient.tsx      # Client filtering, sorting, view mode, load-more
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic PDP (SSG with generateStaticParams)
│   ├── search/
│   │   ├── page.tsx            # Search page (server wrapper with Suspense)
│   │   └── SearchClient.tsx    # Live search, recent queries, suggestions
│   ├── cart/
│   │   └── page.tsx            # Full dedicated shopping bag page
│   ├── checkout/
│   │   ├── page.tsx            # Multi-section simulated checkout
│   │   └── success/
│   │       └── page.tsx        # Order confirmation screen
│   ├── wishlist/
│   │   └── page.tsx            # Saved items archive
│   ├── account/
│   │   └── page.tsx            # Client dashboard (orders, addresses, profile)
│   ├── about/
│   │   └── page.tsx            # Editorial brand story & craftsmanship manifesto
│   └── faq/
│       └── page.tsx            # Categorized accordion FAQ
├── components/
│   ├── Providers.tsx           # Application-wide context provider wrapper
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button with variants & loading state
│   │   ├── Badge.tsx           # Semantic badges (Sale, New, Bestseller)
│   │   ├── RatingStars.tsx     # Star ratings with count
│   │   ├── Breadcrumbs.tsx     # Accessible breadcrumbs
│   │   ├── Modal.tsx           # Accessible modal dialog with focus trap
│   │   ├── Drawer.tsx          # Slide-out sheet panel
│   │   ├── Accordion.tsx       # Accessible accordion
│   │   └── Skeleton.tsx        # Pulsing skeleton placeholders
│   ├── layout/
│   │   ├── AnnouncementBar.tsx # Dismissible rotating notification bar
│   │   ├── Navbar.tsx          # Sticky responsive header with badge counters
│   │   ├── MobileNav.tsx       # Slide-out mobile navigation drawer
│   │   └── Footer.tsx          # Editorial footer with newsletter subscription
│   ├── home/
│   │   ├── EditorialHero.tsx   # Hero campaign section
│   │   ├── CategoryGrid.tsx    # Curated discipline tiles
│   │   ├── BestSellersSection.tsx # Tabbed bestsellers & new arrivals
│   │   ├── PromotionalBanner.tsx  # Mongolian cashmere editorial banner
│   │   ├── BrandStorySection.tsx  # Atelier craftsmanship section
│   │   ├── TestimonialsSection.tsx # Patron testimonials
│   │   └── SocialGallery.tsx   # Instagram-style lifestyle grid
│   ├── product/
│   │   ├── ProductCard.tsx     # Card with image crossfade, wishlist, quick add
│   │   ├── ProductGrid.tsx     # Grid and list view renderer with empty state
│   │   ├── ProductGallery.tsx  # PDP gallery with thumbnails & lightbox
│   │   ├── ProductDetailClient.tsx # PDP interactive state and variant pickers
│   │   ├── ProductFilters.tsx  # Multi-facet filters component
│   │   ├── ProductSort.tsx     # Sorting dropdown
│   │   ├── ProductReviews.tsx  # Reviews distribution and submission modal
│   │   ├── QuantitySelector.tsx# Stepper component
│   │   └── PriceDisplay.tsx    # Currency display with sale discounts
│   └── cart/
│       ├── CartDrawer.tsx      # Slide-out shopping bag drawer
│       └── CartItem.tsx        # Cart item row with steppers and save-for-later
├── hooks/
│   ├── useTheme.tsx            # Light/Dark mode state with localStorage sync
│   ├── useToast.tsx            # Notification toast system
│   ├── useCart.tsx             # Shopping bag context with promo codes and calculations
│   ├── useWishlist.tsx         # Wishlist context
│   ├── useRecentlyViewed.ts    # Recently viewed products tracker
│   └── useRecentSearches.ts    # Recent search queries history
├── types/
│   ├── product.ts              # Product, color, review, filter, sort types
│   ├── cart.ts                 # CartItem, SavedItem, CartSummary types
│   ├── order.ts                # Order, ShippingAddress, DeliveryMethod types
│   └── user.ts                 # UserProfile, SavedAddress types
├── data/
│   ├── products.ts             # 26 realistic products with full metadata
│   ├── categories.ts           # Categories and imagery metadata
│   ├── testimonials.ts         # Customer testimonials
│   ├── faq.ts                  # Categorized FAQ data
│   └── orders.ts               # Mock initial orders and user profile
└── lib/
    ├── utils.ts                # Class merging (cn), price formatting, slugify
    └── storage.ts              # Safe SSR-compliant localStorage wrapper
```

---

## ✦ Getting Started

### Prerequisites
- Node.js `v18.18+` or `v20+` or `v24+`
- npm `v9+` or `v10+`

### Installation
1. Clone or navigate to the repository directory:
```bash
cd e-commerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Runs the Next.js development server with Turbopack |
| `build` | `npm run build` | Compiles an optimized production build with SSG |
| `start` | `npm run start` | Starts the production server |
| `lint` | `npm run lint` | Runs ESLint for code quality and type checks |

---

## ✦ Design Decisions & System Aesthetics

1. **Restrained Color Palette**:
   - Light Mode: Warm off-white (`#FAF9F6`), charcoal (`#141416`), and warm terracotta accent (`#B25D38`).
   - Dark Mode: Rich obsidian (`#0D0E11`), elevated charcoal surface (`#15171C`), and glowing terracotta (`#C9744D`).
2. **Editorial Typography**: Generous tracking on navigation headers (`tracking-widest`), high-contrast headings with editorial proportions, and readable body text.
3. **Intentional Motion**: Micro-interactions on buttons (scale feedback on click), image crossfading on hover, and smooth drawer slide-ins without distracting bounce or excessive animations.
4. **Resilient Image Handling**: Next.js optimized `<Image>` components with defined dimensions, responsive `sizes`, and Unsplash remote pattern integration.

---

## ✦ Accessibility & UX Considerations

- **Semantic HTML**: `<header>`, `<main>`, `<nav>`, `<aside>`, `<article>`, `<section>`, and `<footer>` elements used purposefully throughout.
- **Accessible Form Controls**: All inputs have accessible `<label>` or `aria-label` tags.
- **Keyboard Navigation**: Modals and Drawers trap focus, close cleanly upon pressing `Escape`, and lock body scrolling while active.
- **Color Contrast**: Form controls, text surfaces, and buttons meet WCAG 2.1 AA standards in both light and dark modes.

---

## ✦ Future Backend Extensibility

The application architecture cleanly separates frontend presentation from data access:
- **`types/`** provides strict data contracts ready for any REST or GraphQL schema.
- **`data/products.ts`** can be substituted with direct API route fetchers (e.g. `fetch('/api/products')`) or headless CMS integrations (e.g., Shopify Storefront API, Medusa, Sanity, or Stripe).
- **`useCart` and `useWishlist`** hooks can swap localStorage persistence for authenticated session endpoints without requiring any changes to presentation components.

---

## ✦ License

This project is created for demonstration and portfolio purposes. All photography sourced via [Unsplash](https://unsplash.com) under the Unsplash License.
