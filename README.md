# Meetup App – Backend (Express + MongoDB)

This is the backend API for the Meetup App.  
It provides endpoints for listing, filtering, searching, and fetching event details.

---

## 📦 Project Structure

```

backend/
├── db/
│   └── db.connect.js        # MongoDB connection
├── models/
│   └── event.model.js       # Mongoose Event schema
├── events.json              # Optional seed data
├── server.js                # Express app & routes
├── .env.example             # Template for environment variables
└── README.md                # This file

````

---

## ⚙️ Setup Instructions

1. Navigate to backend folder:
   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file from example:

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your MongoDB URI:

   ```env
   MONGO_URI=mongodb://localhost:27017/meetup-app
   PORT=3000
   ```

   > If using MongoDB Atlas, paste your Atlas connection string.

5. Run the server:

   ```bash
   node index.js / npm run dev

   ```

   or with auto-reload:

   ```bash
   npx nodemon server.js
   ```

6. API runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ Seeding Data

To insert sample events from `events.json`:

1. In `index.js`, uncomment:

   ```js
   // seedData();
   ```
2. Run the server once.
3. Comment it again to prevent duplicates.

---

## 🌐 API Endpoints

### Get all events

```
GET /events
```

* **200 OK** → list of events
* **404 Not Found** → no events in DB

### Get event by ID

```
GET /events/id/:eventId
```

* **200 OK** → single event object
* **404 Not Found** → not found

### Filter by type

```
GET /events/type?type=Online
GET /events/type?type=Offline
GET /events/type=Both
```

* Default = Both (returns all)

### Search by keyword

```
GET /events/search?q=keyword
```

* Case-insensitive, partial matches in `title` or `tags`.
* Example: `q=machine` → matches **"AI & Machine Learning Summit"**

---

## 🔑 Environment Variables

Your `.env` should include:

```env
MONGO_URI=your-mongodb-uri-here
PORT=3000
```



---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)

---

 


