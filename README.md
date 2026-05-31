# 🌱 GreenTrack Frontend

**GreenTrack** is a carbon emission tracking web application that helps individuals monitor, analyze, and reduce their environmental footprint. Users can log activities across multiple categories, set sustainability goals, and visualize their emission trends through an interactive dashboard.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Application Routes](#application-routes)
- [Authentication Flow](#authentication-flow)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [UI Architecture](#ui-architecture)
- [Activity Categories](#activity-categories)

---

## ✨ Features

### 🔐 Authentication
- **Email & Password** login and registration
- **Google OAuth2** sign-in
- **OTP-based** email verification during registration
- Forgot password and password reset flow
- JWT-based session management with persistent storage

### 📊 Dashboard
- **Period-based analytics** — filter by daily, weekly, monthly, or yearly
- **Emission statistics** — total CO₂e, total activities, and top-emitting category
- **Interactive charts** — pie chart (emissions by category), bar chart (category breakdown), and activity distribution chart
- **Category cards** — per-category emissions with activity counts and percentage of total
- **Insights panel** — trend detection (improvement vs. regression) with percentage change from previous period

### 🌍 Activity Tracking
- Log carbon-emitting activities under categories: **Travel**, **Energy**, **Purchases**
- Per-activity details: sub-type, quantity, unit, CO₂e emissions, description, location, date
- **Search & filter** activities by keyword or category
- Inline statistics: total emissions, total activities, average per activity
- **Edit** and **delete** activities with confirmation modal
- Fallback to mock data during API unavailability

### 🎯 Goals Management
- Set sustainability goals of types: **Category Reduction** and **Total Emissions Reduction**
- Track progress with animated progress bars (colour-coded by completion)
- Achievement badge for completed goals
- **Search & filter** goals by keyword or goal type
- Statistics: total goals, completed, and in-progress counts

### 💡 Recommendations *(Coming Soon)*
- Intelligent recommendation engine to provide personalized emission-reduction suggestions

### 💬 Feedback *(Coming Soon)*
- In-app feedback and suggestion submission system

### 🛠️ Admin Panel
- Emission factor management (admin-only access)
- Dedicated admin routes under `/admin`

### 👤 User Settings
- View and update profile details
- Account deletion

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org/) | ^15.5.9 |
| UI Library | [React](https://react.dev/) | 19.1.0 |
| Language | [TypeScript](https://www.typescriptlang.org/) | ^5 |
| Component Library | [MUI (Material UI)](https://mui.com/) | ^7.3.2 |
| Styling | [Styled Components](https://styled-components.com/) | ^6.1.19 |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) | ^2.9.0 |
| State Persistence | [Redux Persist](https://github.com/rt2zz/redux-persist) | ^6.0.0 |
| Date Utilities | [Day.js](https://day.js.org/) | ^1.11.18 |
| Icons | [MUI Icons](https://mui.com/material-ui/material-icons/) + [React Icons](https://react-icons.github.io/react-icons/) | ^7.3.2 / ^5.5.0 |
| Date Pickers | [MUI X Date Pickers](https://mui.com/x/react-date-pickers/) | ^8.12.0 |
| Fonts | Inter + Nunito (Google Fonts) | — |
| Build Tool | Turbopack (via Next.js) | — |
| Linting | ESLint | ^9 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (providers, fonts, theme)
│   ├── page.tsx                    # Landing / home page
│   ├── globals.css
│   ├── StyledComponentRegistry.tsx # SSR support for styled-components
│   │
│   ├── (main)/                     # Authenticated app shell
│   │   ├── layout.tsx              # Main layout (horizontal + vertical navbar)
│   │   ├── dashboard/              # Carbon dashboard with charts & insights
│   │   ├── activity/               # Activity list, create, and edit pages
│   │   ├── goals/                  # Goals list, create, and edit pages
│   │   ├── recommendations/        # Recommendations (WIP)
│   │   ├── feedback/               # Feedback (WIP)
│   │   ├── admin/                  # Admin panel (emission factors)
│   │   └── settings/               # User profile settings
│   │
│   ├── auth/                       # Public auth pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── otp/                    # OTP verification
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── terms-and-conditions/
│   │
│   ├── oauth2/redirect/            # OAuth2 callback handler
│   └── logout/
│
├── components/
│   ├── ThemeRegistry.tsx           # MUI theme provider
│   ├── Navbar/
│   │   ├── HorizontalNavbar.tsx    # Top fixed navigation bar
│   │   ├── VerticalNavbar.tsx      # Collapsible side navigation
│   │   └── navbar.style.ts         # Shared navbar styles & nav items config
│   ├── auth/
│   │   ├── AuthPageLayout.tsx      # Split-panel auth page wrapper
│   │   └── LoadingBackdrop.tsx     # Full-screen loading overlay
│   ├── featureComponents/
│   │   ├── DashboardCharts.tsx     # PieChart, BarChart, ActivityChart
│   │   └── userMenu.tsx            # User profile dropdown menu
│   ├── illustrations/              # SVG/JSX illustrations for auth pages
│   └── reusableComponents/
│       ├── StyledComponents.tsx    # Shared page-level styled components
│       ├── StatCard.tsx            # KPI stat display card
│       ├── PeriodSelector.tsx      # Daily/weekly/monthly/yearly toggle
│       ├── EmptyState.tsx          # Empty state placeholder
│       ├── WorkInProgress.tsx      # WIP placeholder for upcoming features
│       ├── InputSelectField.tsx
│       ├── DateSelectField.tsx
│       ├── DecimalField.tsx
│       └── PasswordField.tsx
│
├── configs/
│   ├── apiConfig.tsx               # API base URL, endpoints, header helpers
│   └── ReduxProvider.tsx           # Redux store + persist gate wrapper
│
├── constants/
│   ├── activityCategoryConstants.ts
│   ├── activitySubCategoryConstants.ts
│   ├── goalConstants.ts
│   └── regionDataConstants.ts
│
├── data/
│   ├── mockActivityData.ts         # Fallback mock activities
│   ├── mockDashboardData.ts        # Fallback mock dashboard data
│   └── mockGoalData.ts             # Fallback mock goals
│
├── model/
│   ├── DecisionModal.tsx           # Confirm/cancel dialog
│   ├── ActivitiesDetailsModal.tsx
│   └── MessageModal.tsx
│
├── services/
│   ├── activityService.ts          # CRUD for user activities
│   ├── authService.ts              # Login, register, logout
│   ├── dashboardService.ts         # Dashboard summary API
│   ├── goalService.ts              # CRUD for user goals
│   ├── emissionFactorService.ts    # Admin emission factor API
│   ├── userDetailsService.ts       # User profile API
│   ├── jwtToken.ts                 # JWT token utilities
│   ├── resendOtpService.ts
│   └── verifyOtpService.ts
│
├── store/
│   ├── store.tsx                   # Redux store configuration
│   └── features/slices/            # Redux slices (authSlice, etc.)
│
├── theme/
│   ├── theme.ts                    # MUI theme customisation
│   └── color.ts                    # Shared colour palette
│
├── types/
│   └── redux-persist.d.ts
│
└── utils/
    ├── CategoryIcons.tsx           # Activity category icon map
    ├── dashboardUtils.ts           # Colour helpers for dashboard charts
    └── validations.ts              # Email, password validation helpers
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Greentrack-Frontend

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the GreenTrack backend REST API |

---

## 🗺 Application Routes

### Public Routes (Auth)
| Route | Description |
|---|---|
| `/auth/login` | Sign in with email/password or Google |
| `/auth/register` | Create a new account |
| `/auth/otp` | OTP verification after registration |
| `/auth/forgot-password` | Request a password reset |
| `/auth/reset-password` | Set a new password |
| `/auth/terms-and-conditions` | Terms of service |
| `/oauth2/redirect` | Google OAuth2 callback (token capture) |

### Protected Routes (Main App)
| Route | Description |
|---|---|
| `/dashboard` | Carbon emission analytics & insights |
| `/activity` | View, create, edit, and delete activities |
| `/activity/create-activity` | Log a new activity |
| `/activity/edit/:id` | Edit an existing activity |
| `/goals` | View, create, edit, and delete goals |
| `/goals/create-goals` | Set a new sustainability goal |
| `/goals/edit/:id` | Edit an existing goal |
| `/recommendations` | Personalised recommendations *(WIP)* |
| `/feedback` | Submit feedback *(WIP)* |
| `/settings/user-details` | View and update profile |
| `/admin` | Admin dashboard |
| `/admin/emission-factor` | Manage emission factors |

---

## 🔐 Authentication Flow

```
Registration:
  /auth/register  →  POST /api/auth/initiate-registration
      → OTP sent to email
  /auth/otp  →  POST /api/auth/verifyOtpAndRegister
      → Account created → redirect to /dashboard

Login (Email/Password):
  /auth/login  →  POST /api/auth/login
      → JWT token stored in Redux (persisted to localStorage)
      → redirect to /dashboard

Login (Google OAuth2):
  /auth/login  →  redirect to /oauth2/authorization/google (backend)
      → Google consent → backend callback
      → /oauth2/redirect?token=<jwt>
      → Token captured, stored in Redux → redirect to /dashboard

Password Reset:
  /auth/forgot-password → request OTP
  /auth/otp             → verify OTP
  /auth/reset-password  → set new password
```

---

## 🗃 State Management

Redux Toolkit is used for global state, persisted to `localStorage` via **Redux Persist**.

```
store/
└── features/slices/
    └── authSlice      # JWT token, user info (firstName, lastName, email)
```

The persisted store survives page refreshes, keeping users logged in across sessions. The `PersistGate` component in `ReduxProvider.tsx` delays rendering until the persisted state is rehydrated.

---

## 🌐 API Integration

All API calls are made using the native `fetch` API. Endpoints are centralised in `src/configs/apiConfig.tsx`.

### Endpoint Groups

| Group | Base Path | Methods |
|---|---|---|
| Auth | `/api/auth/` | Login, Register, OTP verify, Logout, Refresh |
| User | `/api/user/` | Get & update profile, delete account |
| Activities | `/api/user/activities/` | Create, read, update, delete |
| Goals | `/api/user/goals/` | Create, read, update, delete |
| Dashboard | `/api/user/dashboard` | Summary & stats (by period) |
| Admin | `/api/admin/emission-factor` | Emission factor CRUD |
| OAuth | `/oauth2/authorization/google` | Google OAuth2 initiation |

### Request Pattern

```typescript
// JWT token is read from Redux and injected as a Bearer header
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
}
```

> **Note:** The activity and goals pages fall back to local mock data (`src/data/`) when the backend API is unavailable — useful for offline or early-stage development.

---

## 🎨 UI Architecture

### Layout

The authenticated shell uses a **dual-navbar layout**:

- **Horizontal Navbar** — fixed at the top (64px height), displays the GreenTrack logo, user profile, and notifications
- **Vertical Sidebar** — fixed on the left, collapsible between **80px** (icon-only) and **280px** (expanded with labels). Transitions use a smooth cubic-bezier animation.

### Theming & Styling

Styling is a hybrid approach:

| Approach | Usage |
|---|---|
| **Styled Components** | Page-specific layouts, reusable UI primitives, navbar |
| **MUI (Material UI)** | Form inputs, buttons, dialogs, snackbars, date pickers |
| **MUI Theme** | Custom colour palette and component overrides (`src/theme/`) |

### Colour Palette

| Colour | Hex | Role |
|---|---|---|
| Primary Blue | `#143d60` | Main brand colour, headings, sidebar |
| Secondary Blue | `#2a5f87` | Hover states, gradients |
| Accent Green | `#a0c878` | CTAs, active states, emission badges |
| Page Background | `#f5f7fa → #e8f5e9` | Gradient background |

### Typography

- **Nunito** — logo and display headings
- **Inter** — body and general UI text

---

## 🌍 Activity Categories

| Category | Code | Icon |
|---|---|---|
| Transportation | `TRAVEL` | 🚗 Car |
| Energy Usage | `ENERGY` | ⚡ Lightning Bolt |
| Purchases | `PURCHASES` | 🛍 Shopping Bag |

---

## 📈 Dashboard Charts

All charts are implemented as custom components in `src/components/featureComponents/DashboardCharts.tsx`:

| Chart | Description |
|---|---|
| **PieChart** | Proportional breakdown of emissions by category |
| **BarChart** | Side-by-side comparison of category emission values |
| **ActivityChart** | Activity count distribution across categories |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request
