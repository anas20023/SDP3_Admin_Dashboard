# 🎨 Suggestion Sharing Platform – Frontend (Admin Dashboard)

This repository contains the **frontend (admin dashboard)** of the Suggestion Sharing Platform, built using **React, Vite, and Tailwind CSS**.
It provides an intuitive interface for managing users, suggestions, analytics, and platform moderation.

---

## 🚀 Project Overview

The frontend is a **Single Page Application (SPA)** designed to:

* Interact with backend REST APIs
* Provide admin controls for moderation
* Visualize platform data and analytics
* Deliver a responsive and modern UI

---

## 🎯 Objectives

* Build a fast and responsive admin dashboard
* Efficiently manage server state and UI state
* Provide clean data visualization
* Ensure smooth user experience

---

## ✨ Features

### 🧑‍💼 Admin Dashboard

* Overview of platform statistics
* Quick access to key actions

### 💡 Suggestion Management

* View all suggestions
* Approve / reject suggestions
* Delete inappropriate content

### 👥 User Management

* View registered users
* Manage user roles and access

### 📊 Analytics

* Data visualization using charts
* Insights into platform activity

### 🔔 Notifications

* Toast notifications for actions and feedback

---

## 🏗️ Tech Stack

| Layer            | Technology       |
| ---------------- | ---------------- |
| Framework        | React 19         |
| Build Tool       | Vite             |
| Routing          | React Router DOM |
| State Management | Zustand          |
| Server State     | React Query      |
| HTTP Client      | Axios            |
| Styling          | Tailwind CSS     |
| Charts           | Recharts         |
| Icons            | Lucide React     |
| Notifications    | React Toastify   |

---

## 📂 Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # Page-level components
├── routes/            # Route configuration
├── hooks/             # Custom React hooks
├── store/             # Zustand state store
├── services/          # API service functions
├── utils/             # Helper functions
│
├── App.jsx
├── main.jsx
```

---

## 🔌 API Integration

The frontend communicates with the backend via REST APIs:

* Authentication APIs
* Suggestion management APIs
* Admin control APIs

All requests are handled using **Axios** and managed via **React Query** for caching and synchronization.

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/your-repo/admin-dashboard.git

# Navigate to project
cd admin-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌐 Environment Variables

Example `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🧪 Testing

* Manual UI testing
* API integration testing
* State and component behavior validation

---

## ⚠️ Limitations

* No offline support
* Limited role-based UI restrictions
* Depends on backend availability

---

## 🔮 Future Improvements

* Role-based UI permissions
* Dark mode support
* Performance optimization
* Advanced analytics dashboards
* Component testing (Jest / React Testing Library)

---

## 👥 Team

| Name                     | Role              |
| ------------------------ | ----------------- |
| Anas Ibn Belal           | Backend Developer |
| Miel Mahmud Sifat        | Flutter Developer |
| Ratul Hossain Sadi       | Flutter Developer |
| Abdullah Al Masum Badhon | Tester            |
| Arif Billah Rifat        | UI/UX Designer    |

---

## 📄 License

Educational project. Uses open-source technologies.
