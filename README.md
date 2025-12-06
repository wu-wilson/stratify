## ⚡ Overview

**Stratify** is a lightweight, intuitive Kanban board application built to help small teams manage tasks without the complexity of full enterprise tools.

## 🎬 Video Demo

[![Stratify Video Demo](https://img.youtube.com/vi/L6OkIlJknIc/maxresdefault.jpg)](https://www.youtube.com/watch?v=L6OkIlJknIc)

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

#### 2. Generate SSL Certs

Follow these [instructions](https://github.com/wu-wilson/stratify/tree/master/certs) to download SSL certs in the certs directory.

#### 3. Set up Firebase

1. **Create a Firebase project**  
   Go to the [Firebase console](https://console.firebase.google.com/) and set up a new project.

2. **Enable authentication**  
   Add [Authentication](https://firebase.google.com/docs/auth) with the following sign-in providers:

   - Google
   - Twitter
   - GitHub

3. **Configure redirect URI**  
   Add the following as an authorized redirect URI in your Firebase project:

   ```bash
   https://localhost:5173/__/auth/handler
   ```

4. **Set up the service account**
   - Download a new private key for your Firebase service account.
   - Rename the downloaded JSON file to `service-account.json`.
   - Place the file in `server/src/firebase`.

#### 4. Configure environment variables

Both the **client** and **server** require `.env` files. Fill out the values in the provided `.env.example` files and rename them to `.env`.

- **Client:** Firebase API keys. You can retrieve these from your project settings in the firebase console.

- **Server:** PSQL database configurations. You can retrieve these from your local database setup.

#### 5. Set up the PostgreSQL database

1. Make sure you have [PostgreSQL](https://www.postgresql.org/) installed and running locally.
2. Run the SQL queries in `server/init.example.sql` to initialize the database.

#### 6. Start the client and server

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
