
**SmartBite — Food Waste Reduction App**

 Overview

**SmartBite** is an AI-powered food waste reduction app that helps users make the most of their leftover ingredients.
It suggests recipes using ingredients you already have and promotes better food management to reduce waste.

Built during a hackathon using **React**, **Node.js**, **Express**, **PostgreSQL**, and **OpenAI API**, this app demonstrates how AI and sustainability can work hand-in-hand.

---

## 🚀 **Features**

✅ AI-based recipe generation using ingredients you input
✅ Manage leftover food items with expiry & discounts
✅ Responsive, modern UI with React + Tailwind
✅ RESTful backend with Express and Prisma ORM
✅ Docker-based deployment for full-stack setup
✅ PostgreSQL database for persistent storage

---

## 🏗️ **Project Structure**

```
smartbite/
├─ backend/          # Express + Prisma API
├─ frontend/         # React + Vite + Tailwind UI
├─ docker-compose.yml
└─ README.md
```

---

## ⚙️ **Tech Stack**

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Frontend   | React, Vite, Tailwind CSS, Axios |
| Backend    | Node.js, Express, Prisma         |
| Database   | PostgreSQL                       |
| AI         | OpenAI GPT API                   |
| Deployment | Docker & Docker Compose          |

---

## 💡 **Setup Instructions**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rampujitha-123/smartbite.git
cd smartbite
```

---

### 2️⃣ Configure Backend Environment

Inside the `/backend` folder, create a `.env` file:

```bash
DATABASE_URL=postgresql://postgres:postgres@db:5432/smartbite
OPENAI_API_KEY=sk-your_openai_key_here
PORT=4000
```

---

### 3️⃣ Run with Docker (Recommended)

Ensure Docker is installed, then run:

```bash
docker-compose up --build
```

This will start:

* PostgreSQL → port `5432`
* Backend → port `4000`
* Frontend → port `5173`

Visit your app at 👉 [http://localhost:5173](http://localhost:5173)

---

### 4️⃣ Run Without Docker (Manual Setup)

#### 🧠 Backend:

```bash
cd backend
npm install
npx prisma migrate deploy
npm run dev
```

#### 🌐 Frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧪 **API Endpoints**

| Method  | Endpoint                  | Description                    |
| ------- | ------------------------- | ------------------------------ |
| `GET`   | `/api/items`              | Get all items                  |
| `POST`  | `/api/items`              | Add a new item                 |
| `PATCH` | `/api/items/:id/discount` | Apply discount to an item      |
| `POST`  | `/api/recipes`            | Generate AI recipe suggestions |

Example:

```json
{
  "ingredients": ["tomato", "cheese", "bread"]
}
```

---

## 🎨 **Frontend Pages**

| Page    | Description                       |
| ------- | --------------------------------- |
| Home    | View available food items         |
| Recipes | Generate recipes from ingredients |

---

## 🛠️ **Docker Services Summary**

| Service  | Port | Description         |
| -------- | ---- | ------------------- |
| db       | 5432 | PostgreSQL database |
| backend  | 4000 | Express API server  |
| frontend | 5173 | React web app       |

---

## 📦 **Environment Variables**

| Variable         | Location      | Description                  |
| ---------------- | ------------- | ---------------------------- |
| `DATABASE_URL`   | backend/.env  | PostgreSQL connection string |
| `OPENAI_API_KEY` | backend/.env  | Your OpenAI API key          |
| `VITE_API_URL`   | frontend/.env | Backend API base URL         |

---

## 🌍 **Deployment Tips**

You can deploy easily using:

* **Render / Railway** (Docker support)
* **Vercel (Frontend)** + **Render (Backend)** combo
* Use GitHub Actions for CI/CD automation

---

## 💬 **Contributors**

👩‍💻 **Ram Pujitha Nidamanuri**
Project Developer & Hackathon Participant

---

## 🏁 **License**

This project is licensed under the **MIT License**.
Feel free to use, modify, and share it with proper attribution.

---

Would you like me to also generate a **GitHub Actions (CI/CD workflow)** YAML file for automatic Docker-based deployment to a platform like **Render**, **Railway**, or **AWS EC2**?
