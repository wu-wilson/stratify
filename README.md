## ⚡ Overview

**Stratify** is a lightweight, intuitive Kanban board application built to help small teams manage tasks without the complexity of full enterprise tools.

## 🚀 Stack

#### Client

- React
- TypeScript
- SASS
- Firebase (Auth)

#### Backend

- Node.js / Express
- PostgreSQL

## 🛠️ Local Setup

#### 1. Clone the repository

```bash
git clone https://github.com/wu-wilson/stratify.git
cd stratify
```

#### 2. Setting up Firebase

1. Set up a new [Firebase](https://console.firebase.google.com/) project.
   1. Add [Authentication](https://firebase.google.com/docs/auth?hl=en-US&authuser=0&_gl=1*1h7if5a*_ga*MTQ3OTkxOTg5My4xNzQ4MTE4ODAy*_ga_CW55HF8NVT*czE3NjQ3MDAxMjUkbzE3JGcxJHQxNzY0NzAxMjA2JGo0NSRsMCRoMA..) to your new project with Google, Twitter, and GitHub as sign-in providers.
2. Add `https://localhost:5173/\_\_/auth/handler` as an authorized redirect URI and JS origin to your Firebase project's GCP service account.
3. Download a new private key for your Firebase service account from the Firebase console.
   1. Rename the file to `service-account.json`.
   2. Place the file in the `server/src/firebase`.

#### 3. Configure environment variables

Both the **client** and **server** require `.env` files. An example `.env.example` file is provided for both the client and server.

- **Client:** Firebase API keys. You can retrieve these from your project settings in the firebase console.

- **Server:** PSQL database configurations. You can retrieve these from your local database setup.

#### 4. Set up the PostgreSQL database

Make sure you have [PostgreSQL](https://www.postgresql.org/) installed and running locally. Then, run the psql queries in `server/init.example.sql`.

#### 5. Start the client and server

```bash
cd client
npm install
npm run dev
```

```bash
cd server
npm install
npm run dev
```
