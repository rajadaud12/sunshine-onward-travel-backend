# 🌍 Sunshine Onward Travel Backend

> **Modern Travel Platform Backend** - A comprehensive travel management system built with Node.js, Firebase, and Express for seamless booking, authentication, and real-time communication.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture & Key Features](#-architecture--key-features)
  - [Authentication & User Management](#1-authentication--user-management)
  - [Travel Booking System](#2-travel-booking-system)
  - [Real-Time Chat & Communication](#3-real-time-chat--communication)
  - [Firebase Integration](#4-firebase-integration)
  - [Email Notifications](#5-email-notifications)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
  - [Authentication (`/api/auth`)](#authentication-apiauth)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Server](#running-the-server)
  - [Building for Production](#building-for-production)
- [Security & Design Patterns](#-security--design-patterns)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Sunshine Onward Travel Backend** is a robust and scalable backend service for a modern travel platform. It provides secure user authentication, seamless booking management, real-time communication capabilities, and comprehensive travel itinerary management:

* 🔐 **Secure Authentication**: Firebase-based authentication with JWT token validation and refresh mechanisms.
* ✈️ **Travel Booking**: End-to-end booking management system for flights, hotels, and travel packages.
* 💬 **Real-Time Chat**: WebSocket-powered messaging for user-to-user and customer support communication.
* 🔥 **Firebase Integration**: Leverages Firebase Firestore for real-time data synchronization and Cloud Storage for media management.
* 📧 **Email Notifications**: Automated email notifications for bookings, confirmations, and updates.
* 🚀 **High Performance**: Built with Node.js, Express, and optimized middleware stack for rapid request handling.

---

## 🏛 Architecture & Key Features

```
                                  ┌────────────────────────┐
                                  │   Travel Mobile App    │
                                  │   (Flutter / Web)      │
                                  └───────────┬────────────┘
                                              │ HTTP / JSON
                                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SUNSHINE ONWARD TRAVEL BACKEND                         │
├─────────────────┬──────────────────┬──────────────────┬─────────────────────┤
│ Authentication  │  Booking Engine  │  Chat Service    │  Notifications      │
│  & User Mgmt    │  & Itineraries   │  Real-Time Sync  │  & Email Service    │
└────────┬────────┴────────┬─────────┴────────┬─────────┴──────────┬──────────┘
         │                 │                  │                    │
         ▼                 ▼                  ▼                    ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    ┌──────────────┐
  │   Firebase   │  │   Firestore  │  │  WebSocket   │    │ Email Service│
  │   Auth       │  │   Database   │  │  Server      │    │ (Nodemailer) │
  └──────────────┘  └──────────────┘  └──────────────┘    └──────────────┘
```

### 1. Authentication & User Management
* **Firebase Authentication**: Secure sign-up, login, and account management.
* **JWT Token Management**: Custom JWT token generation and validation for session management.
* **Multi-Factor Support**: Optional MFA support for enhanced security.
* **User Profile Management**: Comprehensive user profile endpoints for storing travel preferences and history.
* **Session Management**: Secure token refresh and session timeout mechanisms.

### 2. Travel Booking System
* **Booking Management**: Create, retrieve, update, and cancel travel bookings.
* **Itinerary Planning**: Detailed itinerary management with multi-leg trip support.
* **Availability Checking**: Real-time availability checks across partners.
* **Payment Integration**: Support for multiple payment methods and payment processing.
* **Booking History**: Comprehensive booking history and status tracking.

### 3. Real-Time Chat & Communication
* **WebSocket Integration**: Real-time bidirectional communication using WebSockets.
* **Message Persistence**: All messages stored in Firebase Firestore for history retrieval.
* **Typing Indicators**: Real-time "user is typing" notifications.
* **Message Status**: Read receipts and delivery status tracking.
* **Chat Rooms**: Support for group chats and one-to-one conversations.

### 4. Firebase Integration
* **Firestore Database**: Real-time NoSQL database for all application data.
* **Cloud Storage**: Secure storage for user photos, documents, and media files.
* **Firebase Realtime Updates**: Push notifications and real-time data synchronization.
* **Authentication Hooks**: Custom claims and user metadata management.

### 5. Email Notifications
* **Booking Confirmations**: Automated email confirmations for travel bookings.
* **Status Updates**: Real-time email notifications for booking status changes.
* **Reminders**: Pre-travel reminders and important alerts.
* **Customer Support**: Email templates for support communications.

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── firebase.js                # Firebase initialization & configuration
│   ├── features/
│   │   └── auth/
│   │       ├── auth.controller.js     # Authentication request handlers
│   │       ├── auth.routes.js         # Authentication route definitions
│   │       └── auth.service.js        # Authentication business logic
│   ├── middlewares/
│   │   └── auth.js                    # JWT verification & auth middleware
│   ├── utils/
│   │   └── sendEmail.js               # Email sending utilities
│   └── app.js                         # Express application setup
├── .env.example                       # Template for environment variables
├── .gitignore                         # Git ignore rules
├── index.js                           # Server entry point
├── package.json                       # Project metadata & dependencies
├── package-lock.json                  # Dependency lock file
├── google-services.json               # Firebase configuration (generated)
└── serviceAccountKey.json             # Firebase service account credentials
```

---

## 🔌 API Reference

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user account | `{ email, password, name }` |
| `POST` | `/api/auth/login` | Authenticate user and get JWT token | `{ email, password }` |
| `POST` | `/api/auth/logout` | Invalidate user session | `{ token }` |
| `POST` | `/api/auth/refresh-token` | Refresh expired JWT token | `{ refreshToken }` |
| `GET` | `/api/auth/profile` | Retrieve authenticated user profile | Auth header required |
| `PUT` | `/api/auth/profile` | Update user profile information | `{ name, phone, preferences }` |
| `POST` | `/api/auth/forgot-password` | Initiate password reset flow | `{ email }` |
| `POST` | `/api/auth/reset-password` | Complete password reset | `{ token, newPassword }` |
| `POST` | `/api/auth/verify-email` | Verify email address | `{ token }` |

### Booking (`/api/bookings`) *(Coming Soon)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | Retrieve user's travel bookings |
| `POST` | `/api/bookings` | Create a new travel booking |
| `GET` | `/api/bookings/:id` | Get booking details |
| `PUT` | `/api/bookings/:id` | Update booking |
| `DELETE` | `/api/bookings/:id` | Cancel booking |

### Chat (`/api/chat`) *(Coming Soon)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/chat/conversations` | List user conversations |
| `POST` | `/api/chat/messages` | Send a new message |
| `GET` | `/api/chat/messages/:conversationId` | Get conversation history |
| `WS` | `/ws/chat` | WebSocket endpoint for real-time messaging |

---

## 🛠 Getting Started

### Prerequisites

* **Node.js**: `v14.x` or higher
* **npm** or **yarn** package manager
* **Firebase Account**: Active Firebase project with Firestore database
* **Firebase Service Account Key**: Downloaded from Firebase Console
* **Email Service Provider**: (Nodemailer with Gmail, SendGrid, or equivalent)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajadaud12/sunshine-onward-travel-backend.git
cd sunshine-onward-travel-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase service account:
   - Download `serviceAccountKey.json` from Firebase Console
   - Place it in the root directory
   - Update the path in `src/config/firebase.js` if needed

### Environment Setup

1. Create a `.env` file from the template:
```bash
cp .env.example .env
```

2. Configure your environment variables:
```ini
# Server Configuration
PORT=3000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_DATABASE_URL=your_firebase_database_url
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@sunshineonwardtravel.com

# Application URLs
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_URL=mongodb://localhost:27017/travel_db

# Logging
LOG_LEVEL=debug
```

### Running the Server

* **Development Mode** (with auto-reload):
```bash
npm run dev
```

* **Production Mode**:
```bash
npm run build
npm start
```

Server will be running at `http://localhost:3000`.

### Testing & Verification

Run tests (when implemented):
```bash
npm test
```

Lint code:
```bash
npm run lint
```

---

## 🔒 Security & Design Patterns

* **Non-Custodial Architecture**: User passwords are encrypted and securely stored using bcrypt hashing.
* **JWT-Based Authentication**: Stateless authentication using JSON Web Tokens with expiration and refresh mechanisms.
* **Middleware Security**: Request validation, CORS protection, and rate limiting middleware.
* **Firebase Security Rules**: Strict Firestore security rules prevent unauthorized data access.
* **Environment Variables**: Sensitive credentials stored in `.env` files, never committed to version control.
* **Error Handling**: Comprehensive error handling with meaningful error messages and proper HTTP status codes.
* **Input Validation**: All user inputs validated and sanitized before processing.
* **HTTPS Only**: All production communications over encrypted HTTPS connections.

---

## 📦 Dependencies

### Core
- **express**: Web framework for Node.js
- **firebase-admin**: Firebase Admin SDK for backend services
- **cors**: Enable CORS middleware
- **body-parser**: Parse incoming request bodies
- **dotenv**: Environment variable management

### Authentication & Security
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing and verification

### Email & Communication
- **nodemailer**: Email sending service
- **socket.io**: Real-time bidirectional communication

### Utilities
- **axios**: HTTP client for API calls
- **moment**: Date and time manipulation

---

## 🚀 Deployment

### Heroku Deployment

1. Create a Heroku account and install Heroku CLI
2. Initialize Heroku:
```bash
heroku login
heroku create sunshine-onward-travel-api
```

3. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
# Add other environment variables...
```

4. Deploy:
```bash
git push heroku main
```

### Docker Deployment

Build and run with Docker:
```bash
docker build -t sunshine-travel-api .
docker run -p 3000:3000 --env-file .env sunshine-travel-api
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📧 Support

For support and inquiries, please contact: [daudraja185@gmail.com](mailto:daudraja185@gmail.com)

**Repository**: [https://github.com/rajadaud12/sunshine-onward-travel-backend](https://github.com/rajadaud12/sunshine-onward-travel-backend)
