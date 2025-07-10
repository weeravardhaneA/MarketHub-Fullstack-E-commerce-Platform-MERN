# MarketHub - Fullstack E-commerce Platform (MERN)

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

MarketHub is a full-featured e-commerce platform enabling multi-vendor marketplaces. Sellers can create personalized stores while buyers discover unique products across different shops. Built with the MERN stack with JWT authentication, responsive design, and role-based access control.

**Status**: Active Development (Core features implemented, enhancements in progress)

## Key Features

### 🔒 Authentication System
- JWT-based authentication with refresh tokens
- Role-based authorization (Buyer/Seller/Admin)
- Email verification via OTP
- Password hashing with bcrypt
- Protected routes with token verification

### 🛍️ E-commerce Functionality
- Seller store creation with image uploads
- Product browsing across multiple stores
- Shopping cart functionality
- Responsive product displays
- Store management dashboard

### ⚙️ Technical Implementation
- **Frontend**: 
  - React with React Router
  - Context API for state management
  - Axios for API communication
  - Tailwind CSS for responsive UI
  - Toast notifications
- **Backend**:
  - Express.js REST API
  - MongoDB with Mongoose ODM
  - Middleware architecture
  - Cookie-based session management
  - ImgBB image hosting integration

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local instance
- ImgBB API key (for image uploads)


### Roadmap & In-Progress Features

- Payment gateway integration
- Order management system
- Product review/rating system
- Admin analytics dashboard
- Real-time notifications