// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./database');
const createTaskRoutes = require('./routes/Task');
const Task = require('./models/Task'); // Correct the import statement

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Sync the models with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Routes
app.use('/api', createTaskRoutes(Task));

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
