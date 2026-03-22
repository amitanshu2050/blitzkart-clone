

## Plan: Replicate BlitzKart E-Commerce App

### What This Builds
A full grocery delivery e-commerce app with storefront (home, products, cart, checkout, orders), inventory/dispatch management dashboards, admin panel with sidebar, login with user/admin roles, dark/light theme, and animations.

### Implementation Steps

**Step 1: Install dependencies**
Add `framer-motion`, `@fontsource/space-grotesk`, `@fontsource/dm-sans`, and `recharts` to package.json.

**Step 2: Update design system**
- Replace `index.css` with BlitzKart's green/lime brand colors, dark mode as default, custom fonts (Space Grotesk headings, DM Sans body), shake animation
- Replace `tailwind.config.ts` with brand color utilities (`brand-dark`, `brand-charcoal`, `brand-lime`, `brand-speed`) and font families

**Step 3: Create types (2 files)**
- `src/types/inventory.ts` - Product interface for inventory
- `src/types/dispatch.ts` - Order/OrderStatus types for dispatch

**Step 4: Create contexts (4 files)**
- `AuthContext` - user profile with localStorage persistence, login/logout, role (user/admin)
- `CartContext` - cart items, add/remove/update quantity, totals
- `OrderContext` - order placement with simulated status progression (confirmed -> preparing -> out_for_delivery -> delivered), cancellation logic
- `ThemeContext` - light/dark toggle with localStorage persistence

**Step 5: Create data files (3 files)**
- `src/data/products.ts` - 56 products across 5 categories (Grocery, Snacks, Household, Electronics, Beauty) plus Navratri special items. Image imports will use Unsplash placeholder URLs since binary assets cannot be copied.
- `src/data/mockInventory.ts` - 10 mock inventory items
- `src/data/mockDispatch.ts` - 8 mock dispatch orders with riders

**Step 6: Create lib and hooks (3 files)**
- `src/lib/delivery.ts` - delivery fee logic with Navratri free delivery promo
- `src/hooks/useInventory.ts` - inventory filtering, stock adjustment
- `src/hooks/useDispatch.ts` - dispatch filtering, rider assignment, status advancement

**Step 7: Create storefront components (8 files)**
- `Navbar` - search with product suggestions, cart badge, theme toggle, profile dropdown with auth
- `HeroSection` - hero banner with framer-motion animations
- `CategoryGrid` - 5 category cards with navigation
- `FeaturedProducts` - best sellers grid
- `NavratriSpecial` - seasonal promo section with special products
- `PromoBanner` - promotional offer banner
- `ProductCard` - product card with add-to-cart, quantity controls
- `Footer` - site footer with links

**Step 8: Create admin components (2 files)**
- `AdminLayout` - flex layout with sidebar + outlet
- `AdminSidebar` - navigation sidebar with sections (Overview, Commerce, Logistics, System)

**Step 9: Create inventory components (4 files)**
- `InventoryHeader`, `InventoryStats`, `InventoryFilters`, `InventoryTable`

**Step 10: Create dispatch components (5 files)**
- `statusConfig`, `DispatchHeader`, `DispatchStats`, `DispatchFilters`, `DispatchTable`

**Step 11: Create pages (15 files)**
- Storefront: `Index`, `Login` (with role toggle, profile view when logged in), `Products` (with category/search filtering), `Cart`, `Checkout` (address form + payment), `Orders` (real-time status tracking with countdown), `Inventory`, `Dispatch`
- Admin: `AdminDashboard` (stats + recent orders), `AdminOrders`, `AdminProducts`, `AdminSellers`, `AdminDelivery`, `AdminCoverage`, `AdminAnalytics`, `AdminSettings`

**Step 12: Update App.tsx routing**
Wrap with `AuthProvider`, `ThemeProvider`, `CartProvider`, `OrderProvider`. Add all routes including admin routes under `AdminLayout`.

**Step 13: Update index.html**
Set title to "BlitzKart" and add favicon reference.

### Image Handling
The repo has ~60 binary image assets (product PNGs, category JPGs, hero image). These cannot be copied directly. All product and category images will use high-quality Unsplash placeholder URLs that match the product types (groceries, electronics, beauty, etc.).

### Total: ~45 new/modified files

