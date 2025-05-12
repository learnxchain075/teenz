## ✅ Phase 1: Core Setup

### 1. **Project Initialization**

- [ ] Initialize Node.js project (with TypeScript)
- [ ] Setup Prisma + PostgreSQL
- [ ] Configure `.env` for DB, Stripe, Cloudinary, etc.
- [ ] Setup Express app (`index.ts`)
- [ ] Create basic folder structure as outlined

---

## 🔐 2. **Authentication & Security**

**Files:** `auth.routes.ts`, `auth.controller.ts`, `auth.service.ts`, `middleware/auth.ts`

- [ ] User registration/login/logout (JWT: access + refresh)
- [ ] Password hashing with bcrypt
- [ ] Refresh token flow
- [ ] Admin role + middleware (`admin.ts`)
- [ ] Rate limiting (`rateLimiter.ts`)
- [ ] GDPR routes: export/delete user data

---

## 🛍 3. **Product & Category Management**

**Files:** `product.routes.ts`, `product.controller.ts`, `product.service.ts`, `category.controller.ts`

- [ ] Create product/category models in Prisma
- [ ] CRUD APIs for products and categories
- [ ] Add SEO metadata fields (title, slug, description)
- [ ] Filtering, searching, sorting (query params)
- [ ] Integrate image uploads with Cloudinary/S3
- [ ] Protect admin routes

---

## 🛒 4. **Cart & Orders**

**Files:** `cart.routes.ts`, `cart.controller.ts`, `order.routes.ts`, `order.controller.ts`

- [ ] Add-to-cart, remove-from-cart (authenticated users)
- [ ] Persist cart in DB (user-cart relationship)
- [ ] Create order from cart
- [ ] Track order status (enum: pending → shipped → delivered)
- [ ] View order history per user

---

## 🎟️ 5. **Coupons**

**Files:** `coupon.controller.ts`, `coupon.routes.ts`

- [ ] Define `Coupon` model (as provided)
- [ ] Admin: create/update/delete coupons
- [ ] Public: list active coupons
- [ ] Cart: apply coupon → validate → calculate discount
- [ ] Track coupon usage count and expiry

---

## 💳 6. **Payments**

**Files:** `payments.routes.ts`, `payments.controller.ts`, `webhooks/stripe.ts`, `webhooks/razorpay.ts`

- [ ] Create checkout session (Stripe/Razorpay)
- [ ] Handle payment success/failure redirects
- [ ] Webhook listener → update order status
- [ ] Secure webhook endpoint (signature validation)

---

## 📧 7. **Emails**

**Files:** `email.service.ts`, `/emails/` folder

- [ ] Setup email provider (Resend/Mailgun/SMTP)
- [ ] Send order confirmation email
- [ ] Password reset flow (generate token + send email)
- [ ] Newsletter signup endpoint

---

## ⚙️ 8. **Admin APIs**

**Files:** `admin.routes.ts`, `admin.controller.ts`, `utils/exporter.ts`

- [ ] Dashboard metrics (orders, revenue, users, etc.)
- [ ] Admin CRUD: users, products, orders, reviews, coupons
- [ ] Export reports to CSV/Excel
- [ ] Protect routes with `admin` middleware

---

## 🚀 9. **Advanced Features**

### A. **Subscriptions**

**Files:** `subscription.routes.ts`, `subscription.service.ts`

- [ ] Create/manage subscription products
- [ ] Stripe recurring billing setup
- [ ] Track active subscriptions per user
- [ ] Webhook: handle renewals, failures, cancellations

---

### B. **Loyalty Program**

**Files:** `loyalty.service.ts`

- [ ] Track points per user (earn on orders)
- [ ] Define reward redemption rules
- [ ] Endpoint to view/redeem points

---

### C. **Analytics**

**Files:** `analytics.service.ts`

- [ ] Add endpoints for server-side tracking
- [ ] Log page views, product views, cart events, purchases
- [ ] Integrate Google/Facebook Pixel events

---

## ✅ Phase 3: Extra Enhancements (Optional but valuable)

### A. **i18n Support**

- [ ] Add `lang` param support in product/category APIs
- [ ] Implement DB-driven translations or integrate i18next

---

### B. **Multi-vendor Support**

- [ ] Add `Vendor` model
- [ ] Assign products to vendors
- [ ] Seller dashboard: view orders, payouts

---

### C. **CMS Integration**

- [ ] Create `BlogPost` model
- [ ] CRUD endpoints for CMS content
- [ ] Optional: integrate with Strapi/Sanity for headless CMS

---

### D. **AI Recommendations**

- [ ] Capture user behavior (view/purchase history)
- [ ] Generate product embeddings or use external APIs (e.g., Algolia Recommend)
- [ ] Return personalized product suggestions

---

### E. **ElasticSearch Integration**

- [ ] Sync product data to ElasticSearch
- [ ] Search endpoint using ES queries (full-text, relevance, facets)

---

### F. **Queue System (BullMQ)**

**Files:** `jobs/` folder

- [ ] Setup BullMQ + Redis
- [ ] Create job queues: email sending, data export, analytics
- [ ] Worker to process background tasks

---

### G. **GraphQL Layer (Optional)**

- [ ] Add Apollo Server
- [ ] Define GraphQL schema for products, auth, cart, etc.
- [ ] Optionally run REST + GraphQL side by side
