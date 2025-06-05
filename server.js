require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Simple HTML page to show API is running
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          h1 {
            color: #333;
          }
          .endpoints {
            text-align: left;
            background: #f5f5f5;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Task Management API</h1>
        <p>The API is running successfully! 🚀</p>
        <div class="endpoints">
          <h2>Available Endpoints:</h2>
          <ul>
            <li>GET /api/tasks - Get all tasks</li>
            <li>POST /api/tasks - Create a new task</li>
            <li>PUT /api/tasks/:id - Toggle task completion</li>
            <li>DELETE /api/tasks/:id - Delete a task</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 