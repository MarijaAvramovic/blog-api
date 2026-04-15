# blog-api 
A RESTful API for a blog platform built with Express and Prisma.
It handles users, posts, and comments with authentication using JWT.

🚀 Features
🔐 Authentication with JWT
👤 Users (admin & basic roles)
📝 Create, edit, delete posts
📢 Publish / unpublish posts
💬 Add and manage comments
📅 Timestamps for posts and comments
🔒 Protected routes (admin only)
🛠️ Tech Stack
Node.js
Express
Prisma ORM
PostgreSQL (or any Prisma-supported DB)
jsonwebtoken (JWT)
📦 Models Overview
User
username
role (ADMIN or BASIC)
Post
title
content
published (true/false)
createdAt
Comment
username (required)
content
createdAt
🔐 Authentication
Login returns a JWT
Client stores token (e.g. localStorage)
Send token in requests:
Authorization: Bearer <token>
Protected routes require a valid token
📌 API Endpoints (Example)
Auth
POST /api/login
Posts
GET /api/posts
POST /api/posts (admin)
PUT /api/posts/:id (admin)
DELETE /api/posts/:id (admin)
PATCH /api/posts/:id/publish
Comments
POST /api/comments
DELETE /api/comments/:id (admin)
⚙️ Setup
git clone https://github.com/your-username/blog-api.git
cd blog-api
npm install
▶️ Run Server
npm run dev


Used Postman to test endpoints:

Send GET, POST, PUT, DELETE requests
Add JWT in headers for protected routes
 
💡 Notes
Unpublished posts are stored but hidden from public users
Only admins can create/edit/delete posts
Comments require a username

Create new account or use username: marijaa psw:123456 as basic/admin role.