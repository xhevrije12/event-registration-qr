# CineCloud - Digital Movie Ticketing & QR Check-in System 🎬🍿

This is an individual project developed for the **Cloud Computing / Mobile Cloud Computing 2026** course at AAB College. The platform provides a cloud-based solution for movie ticket reservations and automated QR code entry validation.

## 👤 Author

- **Xhevrije Xhelili** — [@xhevrije12](https://github.com/xhevrije12)
- **Status:** Final Year Student, Computer Science at AAB College

---

## 🌟 Project Overview

CineCloud is designed to simplify the cinema experience using modern cloud technologies:

- **Movie Dashboard:** A dynamic interface displaying movies fetched from a cloud database.
- **Individual Booking:** A user-friendly form for reserving tickets for specific shows.
- **QR Generation:** Each reservation automatically generates a unique QR code for the user.
- **Validation System:** Backend logic to simulate real-time ticket scanning and check-in.
- **Cloud Infrastructure:** Integrated with MongoDB Atlas (AWS Frankfurt) and deployed on cloud hosting.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + Tailwind CSS 4 |
| Backend | Node.js + Express 5 |
| Database | MongoDB Atlas (Cloud — AWS Frankfurt) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| QR Code | `qrcode` (generation) + `jsQR` (scanning) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render.com |

---

## ☁️ Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | https://cinecloud-eight.vercel.app |
| 🔌 Backend API | https://cinecloud-api.onrender.com |
| 🗄️ Database | MongoDB Atlas — AWS Frankfurt |

> **Note:** The backend runs on Render's free tier. If the API is sleeping, the first request may take 30–60 seconds to wake up.

---

## 📂 Project Structure

```
CineCloud/
├── client/                          # Frontend — React + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NewsTicker.jsx
│   │   │   └── StaffRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthProvider.jsx
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── MoviePage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── ConfirmationPage.jsx
│   │   │   ├── CheckinPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── StaffLoginPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend — Node.js + Express
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── movieController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Movie.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── movieRoutes.js
│   ├── index.js
│   ├── seed.js
│   └── package.json
│
├── AI-log.txt                       # AI interaction logs (Mandatory)
├── vercel.json
└── README.md
```

---

## ⚙️ Environment Variables

### Backend — `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/cinecloud
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
STAFF_CODE=staff2025
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files to the repository.** Both are included in `.gitignore`.

---

## 🚀 Running Locally

### Prerequisites

- Node.js v20+
- npm v9+
- A MongoDB Atlas account (free tier is sufficient)

### 1. Clone the repository

```bash
git clone https://github.com/xhevrije12/event-registration-qr.git
cd event-registration-qr
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create `server/.env` with the variables listed above, then:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Seed the Database (optional — adds 12 sample movies)

```bash
cd server
node seed.js
```

### 4. Setup the Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Then:

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔌 API Endpoints

### Movies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get movie by ID |
| POST | `/api/movies` | Add a new movie |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create a booking + generate QR |
| POST | `/api/bookings/checkin` | Validate QR and check in |
| GET | `/api/bookings/stats` | Get booking statistics |

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/staff-login` | Staff login with code |

---

## 🧭 User Flow

```
Visitor                             Staff
   │                                  │
   ▼                                  ▼
Browse Movies              /staff-login (code: staff2025)
   │                                  │
   ▼                                  ▼
Select Movie + Showtime      /checkin page
   │                                  │
   ▼                                  ▼
Fill Booking Form         Upload QR screenshot
   │                                  │
   ▼                                  ▼
Receive QR Code           jsQR scans & validates
   │                                  │
   ▼                                  ▼
Print / Screenshot        ✅ Check-in confirmed
```

---

## ☁️ Cloud Services Used

| Service | Provider | Purpose |
|---|---|---|
| Database | MongoDB Atlas (AWS Frankfurt) | Cloud NoSQL database |
| Backend Hosting | Render.com | Node.js API deployment |
| Frontend Hosting | Vercel | React app deployment |
| JWT Auth | jsonwebtoken | Stateless authentication |

---

## 🚢 Deployment Guide

### Backend (Render.com)

1. Connect GitHub repo to Render
2. Set **Root Directory** to `server`
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `node index.js`
5. Add all environment variables from `server/.env`

### Frontend (Vercel)

1. Connect GitHub repo to Vercel
2. Set **Root Directory** to `client`
3. Set **Framework Preset** to `Vite`
4. Add environment variable: `VITE_API_URL` = `https://cinecloud-api.onrender.com`
5. Deploy

---

## 🧪 Testing the Application

### As a Visitor
1. Open the live URL
2. Browse the movie list
3. Click **Rezervo →** on any movie
4. Fill in your name, email, select a showtime and number of seats
5. Submit — you will receive a QR code
6. Print or screenshot the QR code

### As Staff
1. Navigate to `/staff-login`
2. Enter staff code: `staff2025`
3. Go to `/checkin`
4. Upload the QR screenshot
5. The system validates and marks the ticket as used

### Admin Dashboard
- Navigate to `/admin` to view live booking statistics, check-in rates, and revenue

---

## ⚠️ Known Limitations

- Payment processing is not implemented (bookings are free/simulated)
- Render free tier may have cold starts (up to 60s delay on first request)
- QR scanning requires uploading a screenshot (no live camera scanning)
- No email confirmation sent to the customer after booking

---

## 📸 Screenshots

> See the `/screenshots` folder in the repository.

---

## 🤖 AI Usage

AI tools (Claude by Anthropic) were used during development for debugging, code suggestions, and deployment guidance. All interactions are logged in `AI-log.txt` as required.
