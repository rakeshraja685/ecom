# TechMart - Full-Stack E-commerce Application

A production-ready e-commerce application built with Next.js 14, Node.js/Express, and PostgreSQL.

## Features

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: PostgreSQL, Redis (for caching/sessions).
- **Auth**: JWT Authentication with Role-Based Access Control (Admin/User).
- **Payment**: Cash on Delivery (COD) workflow.
- **Admin Panel**: Hidden route (`/admin`) for product management.

## Prerequisites

- Docker & Docker Compose
- Node.js 18+

## Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    cd e-commerce
    ```

2.  **Start Infrastructure (Postgres + Redis)**
    ```bash
    docker compose up -d postgres redis
    ```

3.  **Setup Backend**
    ```bash
    cd server
    npm install
    
    # Create Database and Run Migrations
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    
    # Seed Initial Data (Admin User + Products)
    node src/seeders/initial_seed.js
    
    # Start Server
    npm run dev
    ```
    Backend runs on `http://localhost:5000`.

4.  **Setup Frontend**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```
    Frontend runs on `http://localhost:3000`.

## Default Credentials

- **Admin User**:
    - Email: `admin@techmart.com`
    - Password: `admin123`

## API Endpoints

- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/orders` - Create order (COD)
- `GET /api/orders` - Get user orders

## Admin Panel

Access at `http://localhost:3000/admin`. You must be logged in as the Admin user.
