# Appointment Management System (EMR Feature)

A full-stack feature implementation for an Electronic Medical Record (EMR) system. This dashboard manages patient appointments with a responsive React frontend and a Python-based backend simulation, demonstrating cloud-native architectural patterns.

## 🚀 Live Demo
**https://appointment-dashboard-zeta.vercel.app/**

---

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
* **Backend Logic:** Python 3.x (Simulating AWS Lambda)
* **State Management:** Custom React Hooks (Simulating AWS AppSync subscriptions)
* **Architecture:** Component-based, Mobile-First, Dark Mode enabled

---

## 🏗️ Architecture & Design Decisions

### 1. The "AppSync" Simulation Strategy
Per the assignment requirements to mimic an **AWS AppSync + Aurora** environment without spinning up actual cloud resources, I implemented a strict separation of concerns:

* **Frontend (The Client):** The `useAppointments.js` hook acts as the **AppSync Client**. It intercepts user actions (like "Confirm Appointment") and manages the **Optimistic UI state**, providing instant feedback while simulating network latency.
* **Backend (The Resolver):** The `appointment_service.py` script serves as the **Lambda Resolver**. It defines the strict data contract and implements the business logic for filtering and status mutations.

### 2. State Management
Instead of simple prop drilling, I used a centralized hook (`useAppointments`) to manage the "Source of Truth." This ensures that the Calendar widget, Tab filters, and List view always stay synchronized without complex Redux boilerplate.

### 3. Dark Mode Support
I implemented a `class`-based dark mode strategy using Tailwind CSS. The state is persisted at the root `App` component level and cascades down to all child components (Calendar, Cards, Sidebar), ensuring a consistent visual experience.

---

## 🌟 Key Features
* **Dashboard Analytics:** Real-time calculation of "Today," "Upcoming," and "Confirmed" appointments.
* **Smart Filtering:** Filter appointments by Date (using the Calendar) or Status (using Tabs).
* **Optimistic Mutations:** "Confirm" or "Cancel" actions update the UI instantly.
* **Interactive Calendar:** Custom-built mini calendar with month navigation and date selection.
* **Responsive Sidebar:** Collapsible navigation that works on both Desktop and Mobile.

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
* Node.js (v16+)
* Python (v3.8+)

### 1. Start the Frontend
The React application runs on Vite for fast hot-reloading.


# Install dependencies
`npm install`

# Run development server
`npm run dev`
Open http://localhost:5173 to view the dashboard.

2. Verify Backend Logic
The Python script verifies the data contract and mutation logic required for the backend assignment task.

Bash

# Run the simulation script
python appointment_service.py
This will output the mock data query results and demonstrate a successful status update transaction.

📂 Project Structure
├── src/
│   ├── components/      # UI Building Blocks (Cards, Calendar, Sidebar)
│   ├── hooks/           # Business Logic (useAppointments.js)
│   ├── services/        # API Adapters
│   └── App.jsx          # Main Layout & State Orchestrator
├── appointment_service.py # Python Backend Logic (Task 1)
└── README.md            # Documentation
