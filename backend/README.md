# Task and Time Tracking App Backend

## Tech Stack

## Architecture Overview
- **Models:**
  - `User`: Stores user info, hashed password, and references to tasks.
  - `Task`: Stores task title, description, status, and references to time logs.
  - `TimeLog`: Stores time tracking data for tasks (start/stop timestamps, duration).
- **Controllers:**
  - `authController`: Handles signup, login, JWT generation.
  - `taskController`: Handles CRUD for tasks.
  - `timeLogController`: Handles time tracking (start/stop, fetch logs).
  - `summaryController`: Computes daily summary stats.
- **Middleware:**
  - `auth`: Verifies JWT, attaches user to request.
  - `errorHandler`: Centralized error handling for API responses.

## Folder Structure
- `models/`: Mongoose schemas for User, Task, TimeLog
- `controllers/`: Business logic for each resource
- `routes/`: API route definitions
- `middleware/`: Auth and error handling
- `index.js`: Main Express app entry point


## Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder:
   ```env
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   node index.js
   ```

## API Endpoints
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT
- `POST /api/tasks` - Create a task
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `POST /api/timelogs/start` - Start time tracking for a task
- `POST /api/timelogs/stop` - Stop time tracking for a task
- `GET /api/timelogs` - Get all time logs
- `GET /api/timelogs/total/:taskId` - Get total time for a task
- `GET /api/summary/daily` - Get daily summary

## Testing Endpoints
All endpoints require a valid JWT (except signup/login). Use Postman, curl, or your frontend.

### Auth
- **Signup:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password"}'
  ```
- **Login:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password"}'
  # Response: { token: ... }
  ```

### Tasks (use JWT from login)
- **Get tasks:**
  ```bash
  curl -X GET http://localhost:5000/api/tasks -H "Authorization: Bearer <token>"
  ```
- **Create task:**
  ```bash
  curl -X POST http://localhost:5000/api/tasks -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"Task 1","description":"Desc"}'
  ```
- **Update task:**
  ```bash
  curl -X PUT http://localhost:5000/api/tasks/<id> -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"Updated"}'
  ```
- **Delete task:**
  ```bash
  curl -X DELETE http://localhost:5000/api/tasks/<id> -H "Authorization: Bearer <token>"
  ```

### Time Logs
- **Start tracking:**
  ```bash
  curl -X POST http://localhost:5000/api/timelogs/start -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"taskId":"<id>"}'
  ```
- **Stop tracking:**
  ```bash
  curl -X POST http://localhost:5000/api/timelogs/stop -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"taskId":"<id>"}'
  ```
- **Get logs:**
  ```bash
  curl -X GET http://localhost:5000/api/timelogs -H "Authorization: Bearer <token>"
  ```

### Daily Summary
- **Get summary:**
  ```bash
  curl -X GET http://localhost:5000/api/summary/daily -H "Authorization: Bearer <token>"
  ```

## Advanced Features
- Centralized error handling (middleware)
- Secure password hashing (bcrypt)
- JWT-based authentication for all protected routes
- Modular code structure for scalability


## Deployment
- You can deploy this backend to platforms like Heroku, Vercel, or Render.
- Ensure your MongoDB URI and JWT secret are set in environment variables.

## Troubleshooting
- If you get "Invalid token", log out and log back in to refresh your JWT.
- Check `.env` for correct `JWT_SECRET` and `MONGODB_URI`.
- Inspect backend logs for error details.

---

**Next Steps:**
- Build the frontend (React.js) component by component.
- Commit each change for a meaningful git history.
