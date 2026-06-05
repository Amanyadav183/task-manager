# Personal Task Manager

## Project Title & Brief Description

**Personal Task Manager – Studio Graphene Take-Home Assignment**

This project is a full-stack Personal Task Manager application built as part of the Studio Graphene take-home assignment. The application allows users to create, edit, delete, search, filter, and manage tasks through a modern and responsive user interface. Tasks can be marked as active or completed, include due dates, and are persisted using a JSON file on the backend. The application also includes task statistics, overdue task highlighting, and a dark/light mode toggle.

---

## Live Demo Links

### Frontend (Vercel)

https://task-manager-two-ochre-42.vercel.app

### Backend API (Render)

https://task-manager-0u8q.onrender.com

### GitHub Repository

https://github.com/Amanyadav183/task-manager

---

## Tech Stack

### Frontend

* **React** – Component-based UI development.
* **Vite** – Fast development server and optimized production builds.
* **Tailwind CSS** – Utility-first CSS framework used for responsive and modern styling.
* **Axios** – HTTP client used for communication with the backend API.

### Backend

* **Node.js** – JavaScript runtime environment.
* **Express.js** – Lightweight framework for building REST APIs.
* **UUID** – Generates unique identifiers for tasks.

### Data Storage

* **JSON File Persistence** – Tasks are stored in a local JSON file (`tasks.json`) for simplicity and portability.

### Deployment

* **Render** – Backend deployment.
* **Vercel** – Frontend deployment.

---

## How to Run Locally

### Prerequisites

* Node.js (v18 or later recommended)
* npm

### Clone Repository

```bash
git clone https://github.com/Amanyadav183/task-manager.git
cd task-manager
```

### Backend Setup

```bash
cd server
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd task-manager/client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Documentation

### Base URL

```text
http://localhost:5000/api/tasks
```

---

### Get All Tasks

**Method**

```http
GET /api/tasks
```

**Response**

```json
[
  {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2026-06-30",
    "completed": false,
    "createdAt": "2026-06-04T18:24:16.974Z"
  }
]
```

---

### Create Task

**Method**

```http
POST /api/tasks
```

**Request Body**

```json
{
  "title": "Build Task Manager",
  "description": "Complete take-home assignment",
  "dueDate": "2026-06-30"
}
```

**Response**

```json
{
  "id": "uuid",
  "title": "Build Task Manager",
  "description": "Complete take-home assignment",
  "dueDate": "2026-06-30",
  "completed": false,
  "createdAt": "2026-06-04T18:24:16.974Z"
}
```

---

### Update Task

**Method**

```http
PUT /api/tasks/:id
```

**Request Body**

```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "dueDate": "2026-07-01"
}
```

**Response**

```json
{
  "id": "uuid",
  "title": "Updated Title",
  "description": "Updated Description",
  "dueDate": "2026-07-01",
  "completed": false
}
```

---

### Toggle Task Completion

**Method**

```http
PATCH /api/tasks/:id/toggle
```

**Response**

```json
{
  "id": "uuid",
  "completed": true
}
```

---

### Delete Task

**Method**

```http
DELETE /api/tasks/:id
```

**Response**

```json
{
  "message": "Task deleted successfully"
}
```

---

## Project Structure

```text
task-manager/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterBar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── server/
│   ├── data/
│   │   └── tasks.json
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── utils/
│   │   └── fileHandler.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

### Folder Responsibilities

* **client/** – React frontend application.
* **components/** – Reusable UI components.
* **services/** – API communication layer.
* **server/** – Express backend application.
* **routes/** – API endpoint definitions.
* **utils/** – File handling utilities.
* **data/** – JSON file used for task persistence.

---

## Next Steps

Given additional development time, the following improvements would be implemented:

1. User authentication and authorization.
2. Database integration using PostgreSQL or MongoDB instead of JSON file storage.
3. Task categories, priorities, and tags.
4. Drag-and-drop task organization.
5. Due date reminders and notifications.
6. Unit and integration testing using Jest and React Testing Library.
7. Docker support for simplified deployment.
8. Better analytics and productivity insights.
9. Real-time synchronization across devices.
10. Accessibility improvements and keyboard shortcuts.

### Notes

The current implementation uses JSON file persistence as required for the assignment. On Render's free tier, data may reset if the service is redeployed because the platform uses an ephemeral filesystem.
