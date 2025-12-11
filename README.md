# ⚡ Acorn Sports Club - Smart Court Booking Platform

A full-stack MERN application for managing sports facility scheduling, featuring **Multi-Resource Booking**, **Conflict Detection**, and a **Dynamic Pricing Engine**.

Designed to handle complex logic like ensuring courts, coaches, and equipment are available simultaneously without overlap.

---

## 🚀 Live Demo
- **Frontend Deployed URL:** [Paste your Vercel Link Here]
- **Backend API URL:** [Paste your Render Link Here]

---

## ✨ Key Features

### 1. 🧠 Smart Availability Logic (The "Brain")
- **Conflict Detection:** Prevents double bookings by checking start/end time overlaps in MongoDB.
- **Atomic Booking:** Ensures Court + Coach + Inventory are all available before confirming.

### 2. 💸 Dynamic Pricing Engine
- **Peak Hour Logic:** Automatic price surge (1.5x) between 6 PM - 9 PM.
- **Weekend Rules:** Extra surcharge added for Saturday & Sunday bookings.
- **Resource Costs:** Automatically adds costs for Coaches and Equipment.

### 3. 🛡️ Admin Dashboard
- **Glassmorphism UI:** Modern, translucent UI design with a Premium Dark Theme.
- **Booking Management:** View all bookings in a clean table format.
- **Actions:** Admins can **Cancel** or **Delete** bookings directly from the dashboard.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Glassmorphism CSS (Custom), Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ODM).
- **Tools:** Git, Postman, VS Code.

---

## ⚙️ Installation & Run Locally

Follow these steps to run the project on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/sports-booking-platform.git](https://github.com/YOUR_USERNAME/sports-booking-platform.git)
cd sports-booking-platform


cd backend
npm install

# Create a .env file in the backend folder and add:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

# Seed Database (To get initial Courts & Coaches)
node seed.js

# Start Server
npx nodemon server.js

cd frontend
npm install
npm run dev

 