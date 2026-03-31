# 🛒 Grocio - Grocery E-Commerce Platform

Grocio is a full-stack MERN (MongoDB, Express, React, Node.js) application built for seamless grocery shopping and inventory management.

---

## 🛠️ Project Setup

### 1. Prerequisites

* **Node.js**: Ensure you have Node.js installed.
* **MongoDB**: You will need a MongoDB Atlas account and connection string.
* **Cloudinary**: You will need an account for image hosting.

### 2. Installation
Open your terminal and run these commands:

**For the Server:**
```bash
cd server
npm install
```

**For the Client:**
```bash
cd client
npm install
```

### 3. Environment Configuration

Navigate to /server and open the .env file. Replace the placeholders with your own credentials:
```Plaintext
JWT_SECRET = "your_secret_string"
MONGODB_URI = "your_mongodb_connection_url"
CLOUDINARY_CLOUD_NAME = "your_cloud_name"
CLOUDINARY_API_KEY = "your_api_key"
CLOUDINARY_API_SECRET = "your_api_secret"
SELLER_EMAIL = "admin@example.com"
SELLER_PASSWORD = "your_password"
```

## ✨ Project Highlights & Features

* **User Authentication:** Secure login using **JWT Tokens.**

* **Product Management:** Full CRUD (Create, Read, Update, Delete) for grocery items.

* **Image Handling:** Cloud storage via **Cloudinary.**

* **Responsive UI:** Built with **React** and **Vite.**

## 🚀 Running the App

1. **Start Backend:** In `server`, run `npm run server`.
2. **Start Frontend:** In `client`, run `npm run dev`.