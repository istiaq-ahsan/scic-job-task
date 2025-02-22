# Task Management Application

A sleek, minimalistic Task Management Application that lets users add, edit, delete, and reorder tasks in real-time with a drag-and-drop interface. Built with a clean UI and fully responsive design for both desktop and mobile users.

## Live Demo

[View Live Demo](https://scic-job-task-73164.web.app/)

## Dependencies

- **Node.js** & **npm/yarn**
- **MongoDB**
- **Firebase**

## Technologies Used

- **Frontend:**
  - [Vite.js](https://vitejs.dev)
  - [React](https://reactjs.org)
  - [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (or a similar drag-and-drop library)
- **Backend:**
  - [Express.js](https://expressjs.com)
- **Database:**
  - [MongoDB](https://www.mongodb.com)
- **Authentication:**
  - [Firebase Authentication](https://firebase.google.com/products/auth)

## Project Overview

This application allows users to manage tasks in three distinct categories:

- **To-Do**
- **In Progress**
- **Done**

### Key Features & Requirements

1. **Authentication:**

   - Only authenticated users can access the app.
   - Uses Firebase Authentication (Google sign-in is sufficient).
   - On first login, stores user details (User ID, email, and display name) in the database.

2. **Task Management System:**

   - **CRUD Operations:** Users can add, edit, delete, and reorder tasks.
   - **Categories:** Each task belongs to one of three categories: To-Do, In Progress, or Done.
   - **Task Details:**
     - **Title:** Required, maximum 50 characters.
     - **Description:** Optional, maximum 200 characters.
     - **Timestamp:** Auto-generated upon creation.
     - **Category:** Indicates the task's current status.
   - **Real-Time Updates:** All changes are saved instantly to the database to ensure that the UI reflects the most recent task order.

3. **Database & Persistence:**

   - Utilizes MongoDB (accessed via an Express.js server) to store tasks.
   - Implements real-time updates using techniques such as:
     - MongoDB Change Streams,
     - WebSockets for live data synchronization,
     - Optimistic UI Updates or polling as a fallback.

4. **Frontend UI:**

   - Developed using Vite.js and React.
   - Incorporates a drag-and-drop library for an intuitive task management experience.
   - Designed with a maximum of four colors to maintain a clean, modern aesthetic.
   - Fully responsive and optimized for both desktop and mobile devices.

5. **Backend API Endpoints:**
   - `POST /tasks` – Add a new task.
   - `GET /tasks` – Retrieve all tasks for the logged-in user.
   - `PUT /tasks/:id` – Update task details (title, description, category).
   - `DELETE /tasks/:id` – Delete a task.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements. For major changes, open an issue first to discuss what you would like to change.
