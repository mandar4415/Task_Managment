# Task & Time Tracking App (Frontend)

## Overview

A modern productivity dashboard built with React and Chakra UI. Features include:
- Task management (add, edit, delete, mark complete)
- Time tracking (start/stop timer)
- Daily summary (tasks completed, time tracked, progress bar)
- Responsive, autosaved UI with best practices (2025)

## Tech Stack
- React.js (CRA)
- Chakra UI (component library)
- React Router (routing)
- Custom theme

## Folder Structure
- `src/`
  - `components/`: Reusable UI components (Navbar, DashboardLayout, TaskList, TaskForm, EditTaskModal, TimeTracker, DailySummary)
  - `pages/`: Main pages (Login, Signup, Dashboard, TimeLogs, Summary)
  - `theme.js`: Chakra UI custom theme
  - `App.js`: Main app, routing, layout

## Components
- **Navbar**: Top navigation bar, links to Dashboard, TimeLogs, Summary, Logout
- **DashboardLayout**: Sidebar navigation, main content area
- **TaskList**: Displays tasks, supports edit/delete
- **TaskForm**: Add new tasks
- **EditTaskModal**: Modal for editing tasks
- **TimeTracker**: Start/stop time tracking for tasks
- **DailySummary**: Shows daily productivity summary

## Pages
- **Login**: User authentication, stores JWT in localStorage
- **Signup**: User registration
- **Dashboard**: Main productivity dashboard, task CRUD, time tracking
- **TimeLogs**: Displays all time logs, fetches from backend
- **Summary**: Shows daily summary stats, charts, reminders

## State Management
- Uses React `useState` and `useEffect` for local state
- JWT token stored in `localStorage` for authentication
- API calls use `fetch` with Authorization header
- Error handling: Displays backend error messages in UI

## Routing
- Uses React Router for navigation between pages
- Protected routes: Redirects to login if JWT is missing/invalid

## UI/UX
- Responsive, modern design with Chakra UI
- Sidebar navigation, modals for edit/delete
- Productivity charts and reminders


## Setup
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the frontend:
   ```powershell
   npm start
   ```
3. The app runs at `http://localhost:3000` by default.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend:
   ```bash
   npm start
   ```
3. Ensure backend is running and proxy is set in `package.json`


## API Integration
- Connects to Express backend via RESTful endpoints (`/api/tasks`, `/api/timelogs`).
- Uses browser-native `fetch` for API calls.
- Update backend URL in `Dashboard.js` if needed for deployment.


## Deployment
- Build for production:
   ```powershell
   npm run build
   ```
- Deploy the `build` folder to your preferred static hosting (Vercel, Netlify, etc).


## UI/UX
- Chakra UI v2.8.1 for modern design
- Responsive layout (sidebar, navbar, dashboard)
- Loading and error states for robust UX


## Further Improvements
- Add authentication and user profiles
- Integrate real-time updates
- Enhance charts and analytics

## Troubleshooting
- If you see "Invalid token", log out and log back in
- If API requests fail, check backend server and proxy config

## Customization
- Modify `theme.js` for custom colors and fonts
- Add new components/pages in `src/components` or `src/pages`

---
For backend setup, see the main project README.
