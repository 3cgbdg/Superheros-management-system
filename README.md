# Superheroes Management System

A professional Full-Stack application for managing superheroes, built with modern web technologies and a focus on scalability and clean architecture.

## 🚀 Quick Start

### 1. Database Setup
The project uses PostgreSQL. You can start it using Docker:
```bash
docker-compose up -d
```

### 2. Backend Setup (NestJS)
```bash
cd backend
npm install
# Configure .env (DATABASE_URL, CORS_ORIGIN, etc.)
npx prisma migrate dev --name init
npm run start:dev
```

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
# Ensure backend is running at http://localhost:3001
npm run dev
```

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15+, TypeScript, Material UI (MUI), Tailwind CSS, TanStack Query v5, React Hook Form, Zod, React-Toastify.
- **Backend**: NestJS, Prisma ORM, PostgreSQL.
- **Tools**: Docker, ESLint, Prettier.

---

## 📐 Architecture & Key Features (1000% Professional)

### Component Organization (Atomic Design)
All pages are refactored into modular, atomic components (e.g., `HeroActionHeader`, `HeroInfoSection`, `HeroImageGallery`). This ensures:
- Clear separation of concerns.
- Easy maintainability and testing.
- High scalability for adding new features.

### Advanced State Management
- **Server State**: Centralized via **TanStack Query** with global configurations for caching, retries, and stale times.
- **Form State**: Robustly handled by **React Hook Form** with **Zod** schema validation for both client and server parity.

### Async Middleware & Interceptors
- **Axios Interceptors**: Global request/response middleware for centralized error handling and automated Toast notifications.
- **NestJS Interceptors**:
    - `LoggingInterceptor`: Performance tracking and request logging.
    - `TransformInterceptor`: Standardizes all API responses into a unified `ApiResponse<T>` format.
    - `HttpExceptionFilter`: Global exception mapping for consistent error responses.

### Intelligent Data Management
- **Image Syncing**: Automatic deletion of "orphaned" images from the database when removed from a hero's profile.
- **Data Integrity**: Enforced `@unique` constraints on image URLs and case-insensitive uniqueness for superpowers.

---

## 📝 Assumptions Made

1. **Mandatory Content**: Every superhero profile must contain at least one image and one superpower to be considered valid.
2. **URL Uniqueness**: Each image URL is unique to a single hero (cannot be shared across heroes).
3. **Connectivity**: The application assumes the backend is running on port `3001` and the frontend on port `3000` by default.
4. **Environment**: It is assumed that the user has Node.js and Docker installed for standard local development.

---

## 📸 Screenshots & Logs
Detailed walkthroughs and task logs can be found in the `.gemini/antigravity/brain/` directory.
