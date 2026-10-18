# 🏠 Quick Rent - Modern Property Rental & Booking Platform

A full-stack rental marketplace web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **HeroUI**, **Better Auth**, and **Stripe**. 

QuickRent empowers tenants to discover, filter, and reserve rental properties with online card checkout, while providing property owners and administrators with purpose-built dashboards to manage listings, booking requests, financial transactions, user roles, and reviews.

<p align="center">
  <img width="800" alt="Quick-Rent Banner" src="https://github.com/user-attachments/assets/341ba444-ba67-4090-b937-52a843b20af0" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/HeroUI-v3-000000?style=for-the-badge" alt="HeroUI" />
  <img src="https://img.shields.io/badge/Better_Auth-1.6-purple?style=for-the-badge" alt="Better Auth" />
  <img src="https://img.shields.io/badge/MongoDB-7.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## 🌐 Live Links & Repositories

- **Live Application:** [https://quick-rent-ecru.vercel.app](https://quick-rent-ecru.vercel.app)
- **Frontend / Full-stack Repository:** [https://github.com/WahiduzzamanSakib/Quick-Rent](https://github.com/WahiduzzamanSakib/Quick-Rent)
- **Backend API Repository:** [https://github.com/WahiduzzamanSakib/Quick-Rent-Server](https://github.com/WahiduzzamanSakib/Quick-Rent-Server)

---

## ⭐ Main Highlights

- ⚡ **Next.js 16 App Router & React 19:** Utilizing modern server & client components, dynamic routing, nested layouts, and Next.js route handlers.
- 🔐 **Multi-Role Authentication (RBAC):** Better Auth integration with MongoDB adapter, JWT tokens, Email/Password login, and Google OAuth with role-based access for `TENANT`, `OWNER`, and `ADMIN`.
- 💳 **Stripe Checkout Payment Flow:** Secure online payments with metadata tracking, automated reservation creation upon successful checkout callback, and transaction logging.
- 🔍 **Real-Time Property Discovery:** Multi-criteria filtering by location, property type, price range, and sorting with client/server pagination.
- 📊 **Owner Analytics Dashboard:** Financial and property insights powered by **Recharts** showing total earnings, active listings, and booking statistics.
- 🛡️ **Comprehensive Admin Suite:** Moderate properties (approve/reject), manage user roles and account statuses (block/unblock), inspect all platform bookings, review transactions, and moderate reviews.
- 📸 **ImgBB Image Upload:** Owners can upload property photos directly via ImgBB API or provide direct image URLs with instant preview.
- 🎨 **Modern UI/UX:** Styled using Tailwind CSS v4 and HeroUI components with smooth Framer Motion micro-interactions.

---

## 🚀 Key Features

### 🌍 1. Public Experience & Marketplace
- **Dynamic Landing Page:** Features a modern Hero Banner, Trust Badges, Verified Featured Properties, Platform Stats, Recently Added Properties, "How It Works" step-by-step guide, Top Locations carousel, Testimonials, FAQ accordion, and Call to Action.
- **Advanced Property Search & Filter:** Filter listings by City/Location, Property Type (Apartment, House, Studio, Villa, etc.), Minimum/Maximum Price, and sort by price or newest listings.
- **Property Details Page:** In-depth property info including amenities, bedrooms, bathrooms, rent breakdown, owner details, location, and verified tenant reviews.
- **Interactive Booking Modal:** Date picker for check-in and check-out with automatic total days and total rent calculation.
- **Property Reviews:** Tenants can leave star ratings and written reviews after bookings.
- **Wishlist / Favorites:** Add or remove favorite properties with one-click toggles.

### 👤 2. Tenant Dashboard
- **Profile Center:** View account details, role badge, profile avatar, and edit profile information via modal.
- **My Bookings:** Real-time tracking of all booked properties, statuses (`Pending`, `Approved`, `Rejected`), rent breakdown, and booking cancellation.
- **Favorites:** Quick access to saved properties with instant removal option.
- **Payment Success Verification:** Stripe webhook / callback handler that captures session metadata and registers the booking record in the database.

### 🏡 3. Owner Dashboard
- **Overview & Analytics:** Real-time earnings summary, total listed properties, total booking requests, and an interactive **Recharts** earnings graph.
- **Add New Property:** Full property listing form supporting title, description, category, location, monthly rent, bedrooms, bathrooms, and dual photo upload (ImgBB API upload or direct link).
- **My Properties:** Manage owner-owned listings with edit property modal and deletion confirmation alert.
- **Booking Requests:** Review incoming tenant reservation requests with one-click **Approve** or **Reject** actions.

### 🛡️ 4. Admin Management Dashboard
- **Profile Overview:** View admin identity and system credentials.
- **Property Moderation:** Review all submitted properties across the platform; approve or reject listings before they go live; edit or delete any property.
- **User Role & Status Management:** View all registered accounts, change roles between `TENANT`, `OWNER`, and `ADMIN`, and toggle account blocking status (`isBlocked`).
- **All Bookings:** Monitor all tenant reservations site-wide with real-time status management.
- **Financial Transactions:** Complete ledger of paid bookings, total accumulated platform revenue, and Stripe transaction references.
- **Review Moderation:** Global review management with review stats, rating distributions, and the ability to delete inappropriate reviews.

---

## 🛠️ Tech Stack & Architecture

### Frontend & App Framework
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/) / React DOM 19
- **Design & Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [@heroui/react](https://heroui.com/) & `@heroui/styles`
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/), [@gravity-ui/icons](https://gravity-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms & Notifications:** [React Hook Form](https://react-hook-form.com/), [React Toastify](https://fkhadra.github.io/react-toastify/)

### Authentication & Backend Integrations
- **Authentication:** [Better Auth](https://www.better-auth.com/) (`better-auth`, `@better-auth/mongo-adapter`, `@better-auth/client`)
- **Token Security:** Better Auth JWT Plugin (`jwt()`)
- **Database:** [MongoDB](https://www.mongodb.com/) (using official `mongodb` Node driver)
- **Payment Gateway:** [Stripe](https://stripe.com/) (`stripe` Node SDK & `@stripe/stripe-js`)
- **Image Hosting:** [ImgBB API](https://api.imgbb.com/)
- **External REST API:** Express.js Backend (`NEXT_PUBLIC_API_URL`)

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (version `18.x` or higher, `20.x` recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- A running [MongoDB](https://www.mongodb.com/) database instance
- A [Stripe](https://stripe.com/) account for payment processing
- An [ImgBB](https://imgbb.com/) account for an API key

### 1. Clone the Repository
```bash
git clone https://github.com/WahiduzzamanSakib/Quick-Rent.git
cd Quick-Rent
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the required configurations:

```env
# MongoDB Connection String (Used by Better Auth)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quickrent-Platform?retryWrites=true&w=majority

# Better Auth Configuration
BETTER_AUTH_SECRET=your_super_secret_better_auth_key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (Optional / For Social Login)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# External Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# ImgBB API for Image Uploads
NEXT_PUBLIC_IMAGEBB_API_KEY=your_imgbb_api_key
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot module reloading at `localhost:3000` |
| `npm run build` | Compiles and builds the production-ready application |
| `npm run start` | Boots up the production server after building |
| `npm run lint` | Runs Next.js ESLint to verify code quality and consistency |

---

## 🔒 Role-Based Access Control (RBAC)

| Role | Access Level & Permissions |
| :--- | :--- |
| **Guest / Public** | Browse landing page, search & filter properties, view property details, read reviews, access login & registration. |
| **TENANT** | Book properties with Stripe checkout, view booking history and statuses, manage favorite listings, post reviews, edit tenant profile. |
| **OWNER** | Access Owner Dashboard with revenue analytics, list new properties (with ImgBB image upload), edit/delete owned properties, approve or reject incoming tenant booking requests. |
| **ADMIN** | Full administrative access: moderate all properties (verify, approve, reject), manage user accounts and permissions, monitor all bookings, inspect financial transactions, and moderate reviews. |

---

## 👨‍💻 Author

**Md Waheduzzaman**

- **GitHub:** [@WahiduzzamanSakib](https://github.com/WahiduzzamanSakib)
- **LinkedIn:** [Md waheduzzaman](https://www.linkedin.com/in/waheduzzaman-md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
