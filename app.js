const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb://localhost:27017/todo_db';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


const todoRoutes = require('./routes/Task');

// ... (previous code)

app.use('/todos', todoRoutes);
