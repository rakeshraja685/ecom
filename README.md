# LuxeCart - Premium E-commerce Platform

A full-stack e-commerce application built with Next.js, Express, Postgres, and Redis.

## Features

- **Premium UI**: Glassmorphism design with Tailwind CSS.
- **Product Management**: Browse, search, and view product details.
- **Cart & Checkout**: Persistent cart (backend) and COD checkout with PDF invoice generation.
- **User Accounts**: Register, Login, and view Order History.
- **Admin Panel**: Dashboard stats, manage products, and view all orders.
- **Security**: JWT Auth, Helmet, CORS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express, Sequelize (ORM), Postgres, Redis.
- **DevOps**: Docker, Docker Compose.

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local dev without Docker)

## Setup & Running

### Using Docker (Recommended)

1.  Clone the repository.
2.  Create a `.env` file in `backend/` (see `backend/.env.example`).
3.  Run:
    ```bash
    docker-compose up --build
    ```
4.  Access the app:
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:5000`

### Local Development

#### Backend
1.  Navigate to `backend/`:
    ```bash
    cd backend
    npm install
    ```
2.  Set up Postgres and Redis (or use Docker for them).
3.  Run migrations/seed (if applicable) or let Sequelize sync.
4.  Start server:
    ```bash
    npm run dev
    ```

#### Frontend
1.  Navigate to `frontend/`:
    ```bash
    cd frontend
    npm install
    ```
2.  Start dev server:
    ```bash
    npm run dev
    ```

## Seeding Data

To seed the database with an admin user and sample products:

1.  Ensure backend is running.
2.  Run:
    ```bash
    cd backend
    node src/scripts/seed.js
    ```

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## API Documentation

- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Products**: `/api/products` (GET, POST, PUT, DELETE)
- **Orders**: `/api/orders` (POST, GET)
- **Cart**: `/api/cart` (GET, POST, DELETE, POST /merge)
- **Admin**: `/api/admin/stats`

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ecommerce
JWT_SECRET=supersecretkey
REDIS_URL=redis://localhost:6379
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
