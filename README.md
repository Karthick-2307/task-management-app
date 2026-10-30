# TaskFlow - Full-Stack Modern Task Management Web Application

TaskFlow is a modern, responsive, and secure full-stack Task Management Web Application engineered with **React (Vite)**, **Tailwind CSS**, **Node.js (Express)**, and **MongoDB (Mongoose)**. It provides end-to-end task organization, intuitive status tracking, interactive statistic dashboards, user isolation, and JWT authentication.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- **JWT (JSON Web Token)** based stateless authentication.
- Password hashing using **bcryptjs** with 10 salt rounds.
- Private protected routes on both client (React Router) and server (Express auth middleware).
- Strict user-isolation: users can only view, update, or delete their own tasks.
- Input validation and sanitized database queries.

### 📋 Task Management (Full CRUD)
- **Create**: Specify task title, description, due date, priority (Low, Medium, High), status (Pending, In Progress, Completed), and customizable category tags (Work, Personal, Urgent, etc.).
- **Read**: View comprehensive task cards with status badges, priority dots, creation dates, and due date alerts.
- **Update**: Edit all task attributes, or instantly toggle completion status with a single click.
- **Delete**: Safe deletion protected by a confirmation dialog modal.

### 📊 Modern Dashboard
- Personalized greeting with the authenticated user's name.
- Real-time statistic cards: Total tasks, Pending, In Progress, Completed, and Overdue tasks.
- Interactive progress bar calculating overall completion rate percentage.
- Quick preview of recent tasks with direct action links.

### 🔍 Advanced Task Organization & Search
- Real-time search across task titles and descriptions.
- Multi-criteria filtering by **Status**, **Priority**, and **Category**.
- Dynamic sorting by **Creation Date**, **Due Date**, **Title**, or **Priority** (Ascending / Descending).
- **Kanban Board View**: Switch between standard Grid view and 3-column Kanban board (Pending, In Progress, Completed) with inline stage movement.
- **CSV Data Export**: One-click download of all filtered tasks as a `.csv` spreadsheet.
- Pagination controls for handling large task volumes cleanly.

### 🎨 Design & Experience
- Clean, responsive UI tailored for mobile, tablet, and desktop screens.
- **Dark Mode & Light Mode**: Persistent theme switcher with system preference detection.
- Accessible confirmation modals, loading skeletons, and interactive toast notifications.
- Empty states with guided calls-to-action.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Lucide React Icons |
| **Backend** | Node.js, Express.js, REST API, CORS, Dotenv |
| **Database** | MongoDB, Mongoose ODM |
| **Auth & Security** | JSON Web Tokens (JWT), bcryptjs |

---

## 📁 Project Structure

```text
task-management-app/
├── package.json              # Root package with concurrently dev scripts
├── README.md                 # Detailed documentation & setup guide
│
├── server/                   # Backend Express & MongoDB API
│   ├── .env.example          # Environment variables template
│   ├── .env                  # Environment config
│   ├── package.json          # Server dependencies
│   ├── server.js             # Express app entry point
│   ├── config/
│   │   └── db.js             # Mongoose database connection
│   ├── controllers/
│   │   ├── authController.js # Register, login, get current user
│   │   ├── taskController.js # CRUD, stats metrics, search & filters
│   │   └── userController.js # Profile updates & password change
│   ├── middleware/
│   │   ├── authMiddleware.js # Bearer token verification
│   │   └── errorMiddleware.js# 404 & centralized error handler
│   ├── models/
│   │   ├── User.js           # User schema & password hashing
│   │   └── Task.js           # Task schema with compound indexes
│   ├── routes/
│   │   ├── authRoutes.js     # /api/auth
│   │   ├── taskRoutes.js     # /api/tasks
│   │   └── userRoutes.js     # /api/users
│   └── utils/
│       └── generateToken.js  # JWT signing utility
│
└── client/                   # Frontend React & Vite application
    ├── .env.example          # Client environment template
    ├── .env                  # Client environment configuration
    ├── index.html            # HTML entry point with fonts & meta
    ├── package.json          # Frontend dependencies
    ├── vite.config.js        # Vite build & proxy configuration
    ├── tailwind.config.js    # Tailwind color palette & dark mode
    ├── postcss.config.js     # PostCSS plugins
    └── src/
        ├── main.jsx          # React DOM entry point
        ├── App.jsx           # Routing & layout structure
        ├── index.css         # Tailwind base styles & scrollbar
        ├── context/
        │   ├── AuthContext.jsx   # Authentication state & methods
        │   └── ThemeContext.jsx  # Dark/Light theme provider
        ├── services/
        │   ├── api.js            # Axios instance with interceptors
        │   ├── authService.js    # Auth HTTP calls
        │   └── taskService.js    # Tasks CRUD HTTP calls
        ├── utils/
        │   └── formatters.js     # Date formatters, CSV export, badges
        ├── components/
        │   ├── Navbar.jsx        # Top header with profile & theme toggle
        │   ├── Sidebar.jsx       # Responsive desktop/mobile sidebar
        │   ├── StatCard.jsx      # Metrics overview cards
        │   ├── TaskCard.jsx      # Individual task card
        │   ├── TaskForm.jsx      # Reusable form for create & edit
        │   ├── KanbanBoard.jsx   # 3-column drag-ready Kanban board
        │   ├── DeleteConfirmModal.jsx # Deletion confirmation popup
        │   ├── Pagination.jsx    # Numeric page navigator
        │   ├── Badge.jsx         # Priority, status, category badges
        │   ├── LoadingSpinner.jsx# Spinners & card skeletons
        │   ├── Toast.jsx         # Auto-dismissing toast alerts
        │   └── ProtectedRoute.jsx# Auth route guard
        ├── layouts/
        │   ├── DashboardLayout.jsx # Authenticated sidebar + topbar layout
        │   └── PublicLayout.jsx    # Landing & auth pages layout
        └── pages/
            ├── LandingPage.jsx   # Marketing hero & feature highlights
            ├── LoginPage.jsx     # User sign-in
            ├── RegisterPage.jsx  # User sign-up
            ├── DashboardPage.jsx # Analytics & recent activity
            ├── AllTasksPage.jsx  # Task list, search, filters & Kanban
            ├── CreateTaskPage.jsx# New task submission
            ├── EditTaskPage.jsx  # Existing task editor
            ├── ProfilePage.jsx   # Profile details & password change
            ├── SettingsPage.jsx  # Theme & preferences
            └── NotFoundPage.jsx  # 404 page
```

---

## ⚙️ Prerequisites

Before running the application, make sure you have the following installed on your machine:
- **Node.js** (v16.x or higher, v18+ recommended)
- **npm** (v8.x or higher)
- **MongoDB** (Local MongoDB Community Server running on `mongodb://localhost:27017` OR a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud cluster URI).

---

## 🚀 Installation & Setup

### 1. Clone or Open the Project
Navigate to the project root folder:
```bash
cd task-management-app
```

---

### 2. Backend Setup (`server`)

1. Open the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Configure environment variables in `server/.env`:
   ```ini
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_here_123456
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
   > **Note on MongoDB**: If you are using MongoDB Atlas, set `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority`.

3. Start the backend server:
   ```bash
   # Development mode with hot-reloading (nodemon)
   npm run dev

   # Or standard production mode
   npm start
   ```
   You should see:
   ```text
   Server running in development mode on port 5000
   MongoDB Connected: localhost
   ```

---

### 3. Frontend Setup (`client`)

1. Open a new terminal window, navigate into `client`, and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Verify or edit environment variables in `client/.env`:
   ```ini
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

### 4. Running Both Simultaneously (Root Command)
From the root directory:
```bash
npm install
npm run dev
```
*(This starts both the backend API on port `5000` and the Vite client on port `5173` concurrently).*

---

## 📡 REST API Documentation

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`) | No |
| `POST` | `/api/auth/login` | Login with credentials (`email`, `password`) | No |
| `GET` | `/api/auth/me` | Retrieve current authenticated user profile | Yes (Bearer Token) |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Description | Auth Required | Query Parameters |
|---|---|---|---|---|
| `POST` | `/api/tasks` | Create a new task | Yes | - |
| `GET` | `/api/tasks` | List tasks with filters & pagination | Yes | `search`, `status`, `priority`, `category`, `sortBy`, `sortOrder`, `page`, `limit` |
| `GET` | `/api/tasks/stats` | Dashboard statistics & metrics summary | Yes | - |
| `GET` | `/api/tasks/:id` | Get details for a single task | Yes | - |
| `PUT` | `/api/tasks/:id` | Update task fields | Yes | - |
| `DELETE` | `/api/tasks/:id` | Delete a specific task | Yes | - |

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/users/profile` | Get full user profile | Yes |
| `PUT` | `/api/users/profile` | Update profile information (`name`, `email`) | Yes |
| `PUT` | `/api/users/change-password` | Change password (`currentPassword`, `newPassword`) | Yes |

---

## 📸 Screenshots & UI Preview

### 1. Landing Page
- Modern marketing hero section with feature grid and instant call-to-action buttons.

### 2. Dashboard
- Total, Pending, In Progress, Completed, and Overdue metric cards with a real-time completion percentage progress bar.

### 3. Task Management (List & Kanban Views)
- Search bar, status/priority/category dropdown filters, sorting controls, pagination, and toggleable 3-column Kanban board.

### 4. Dark & Light Theme
- Seamless theme switching supporting custom high-contrast palettes for both day and night productivity.

---

## 🛡️ Security Best Practices Implemented
1. **Never Plaintext**: Passwords salted and hashed with bcrypt before storing.
2. **User Isolation**: Every database query filters by `userId: req.user._id`.
3. **No ID Spoofing**: Users cannot view, modify, or delete tasks belonging to others.
4. **Token Expiry & Auto-Refresh**: Tokens expire in 30 days and unauthorized requests trigger automatic session clearing.
5. **CORS Whitelist**: API restricts origins to authorized client domains.
