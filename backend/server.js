require('dotenv').config();

const express = require('express');
const cors = require('cors');

const pool = require('./db/database');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Task Tracker API is running'
  });
});

app.get('/api/test-db', async (req, res) => {

  try {

    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Database connected successfully',
      time: result.rows[0].now
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Database connection failed'
    });

  }

});

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
