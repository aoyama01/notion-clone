# Notion Clone Development

This repository is a Notion-like memo management application created based on the Udemy course “[Full-Stack Development: Build a Production-Level Notion Clone Web App with the MERN Stack](https://www.udemy.com/course/notion-fullstack-webdev).”  
The instructor’s code is publicly available on GitHub ([server](https://github.com/Shin-sibainu/notion-clone-server), [client](https://github.com/Shin-sibainu/notion-clone-client)).  
This repository builds on that foundation with additional custom modifications and extensions.

---

## Overview

- **Frontend**

  Uses React (Vite) + TypeScript.

- **Backend**

  Uses Node.js (Express) + TypeScript.

- **Database**

  Connects to MongoDB via Mongoose.

- **Authentication**

  Implements token-based authentication with JWT (JSON Web Token).

- **State Management**

  Uses Redux Toolkit to centrally manage memo and user information.

---

## Main Features

1. **User Authentication**

   - User registration
   - Login / Logout
   - Authentication via JWT

2. **Memo Management**

   - Create new memos
   - List and view memo details
   - Update memos (title, body, emoji)
   - Delete memos

3. **Sidebar**

   - Displays username and logout button
   - Shows all saved memos
   - Allows easy identification of memos with emojis

4. **Other (Planned Features)**

   - Favorites: Mark memos as favorites and sort them
   - Drag & Drop for memos (e.g., using react-beautiful-dnd)
   - Typing effects (aiming for a UX similar to [Power Mode](https://github.com/hoovercj/vscode-power-mode))

---

## Technologies Used

- **Frontend**

  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Material UI (MUI)](https://mui.com/)

- **Backend**

  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)

- **Database**

  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)

- **Authentication**

  - [JWT](https://jwt.io/)

- **Validation**

  - [express-validator](https://express-validator.github.io/docs/)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/aoyama01/notion-clone
cd notion-clone
```

## Setup Instructions

### 2. Configure environment variables

To configure MongoDB connection info and other settings, create a `.env` file in the `server` directory and define the variables like this:

```dotenv
MONGODB_URL=your_mongodb_connection_string
SECRET_KEY=any_string_for_password_encryption
TOKEN_SECRET_KEY=any_string_for_jwt
```

### 3. Set up the frontend

```bash
cd client
npm install
npm run dev
```

By default, port 5173 will be used. You can access the app at http://localhost:5173.

### 4. Set up the backend

```bash
cd ../server
npm install
npm run dev
```

By default, port 5000 will be used. The frontend accesses the API via http://localhost:5000/api/v1.

## Directory Structure (Partial)

```bash
.
├── client             // Frontend (React + Vite + TypeScript)
│   ├── src
│   ├── public
│   └── package.json
├── server             // Backend (Express + TypeScript)
│   ├── src
│   └── package.json
├── .gitignore
└── README.md          // This document
```

## References

[Full-Stack Development: Build a Production-Level Notion Clone Web App with the MERN Stack](https://www.udemy.com/course/notion-fullstack-webdev/?couponCode=KEEPLEARNING)

[notion-clone-server repository](https://github.com/Shin-sibainu/notion-clone-server)

[notion-clone-client repository](https://github.com/Shin-sibainu/notion-clone-client)
