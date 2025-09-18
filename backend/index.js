require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
app.use(express.json());
// Explicitly allow local and deployed frontend origins for CORS
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://task-managment-omega-red.vercel.app' // Deployed Vercel frontend
  ],
  credentials: true
}));

connectDB();
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/task'));
app.use('/api/timelogs', require('./routes/timelog'));
app.use('/api/summary', require('./routes/summary'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(require('./middleware/errorHandler'));
