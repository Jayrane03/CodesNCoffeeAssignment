# 🎫 AI-Powered Ticket Management System

A full-stack ticket management system built with modern web technologies.
It supports complete CRUD operations, status tracking, filtering, and a mock AI module for intelligent ticket analysis.

---

# 🚀 Tech Stack

### Frontend

* React (Vite)
* Zustand (state management)
* Tailwind CSS
* ShadCN UI
* React Router
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# 📦 Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd project-folder
```

---

## 2. Install Dependencies

### Frontend

```bash
cd client
pnpm install
pnpm dev
```

### Backend

```bash
cd server
pnpm install
pnpm start
```

---

## 3. Environment Variables

Create `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

# 🗄️ Database Schema

## Ticket Schema

```js
{
  title: String,
  description: String,
  priority: String, // low | medium | high
  status: String,   // open | in-progress | closed
  createdAt: Date
}
```

### Design Decisions

* `status` controls ticket lifecycle
* `priority` helps sorting/decision making
* Simple schema for scalability and clarity

---

# 🌱 Seed Data

You can insert sample tickets manually or via MongoDB:

```js
{
  title: "Login Issue",
  description: "User unable to login",
  priority: "high",
  status: "open"
}
```

---

# 🔌 API Design

## Base URL

```
/api/tickets
```

### Endpoints

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| POST   | /        | Create ticket   |
| GET    | /        | Get all tickets |
| PUT    | /:id     | Update ticket   |
| DELETE | /:id     | Delete ticket   |

---

### Example Request

```json
POST /api/tickets
{
  "title": "Payment issue",
  "description": "Payment failed",
  "priority": "high"
}
```

---

# 🖥️ Frontend Structure

```
src/
├── pages/
│   ├── Dashboard.jsx
│   ├── CreateTicket.jsx
│   ├── EditTicket.jsx
│   ├── TicketDetails.jsx
├── components/
│   ├── TicketCard.jsx
│   ├── Filters.jsx
│   ├── AIPanel.jsx
│   ├── layout/
├── store/
│   ├── ticketStore.js
```

### Architecture Decisions

* Zustand for global state
* Component-based modular structure
* Separation of UI, logic, and API

---

# 🤖 AI Feature Design

A mock AI module simulates intelligent analysis:

```js
exports.generateAI = async (ticket) => {
  return {
    summary: `Issue: ${ticket.title}`,
    sentiment: "Frustrated",
    suggestedPriority: "High",
    nextAction: "Check logs",
    confidenceScore: 0.85
  };
};
```

### Why Mock AI?

* No dependency on external APIs
* Faster development
* Demonstrates AI integration logic

---

# ⚠️ Known Limitations

* No authentication system
* Mock AI (not real ML model)
* No pagination
* No real-time updates (WebSockets)

---

# 🔮 Future Improvements

* Integrate real AI (OpenAI / ML model)
* Add authentication (JWT)
* Add role-based access
* Add pagination & search
* Deploy on cloud (AWS / Vercel)

---

# 🧠 Architecture Note

The system follows a **client-server architecture**:

* Frontend handles UI and state
* Backend handles API and database
* Zustand manages global state efficiently
* REST APIs ensure scalability

---

# 🤝 AI Usage Disclosure

### Written by Me

* Core logic
* UI structure
* State management
* API integration

### AI Assisted

* UI improvements
* Debugging issues
* Code optimization suggestions

---

# ⚖️ Trade-offs

* Used mock AI instead of real API → faster but less powerful
* Simple schema → easier but less flexible
* No auth → faster development but less secure

---

# 📈 Scalability Considerations

* Can scale with:

  * Microservices architecture
  * Load balancing
  * Database indexing
  * Caching (Redis)

---

# 🎯 Conclusion

This project demonstrates:

* Full CRUD operations
* Clean UI/UX
* State management
* API design
* AI integration (mock)

---

# 👨‍💻 Author

Jay Rane
