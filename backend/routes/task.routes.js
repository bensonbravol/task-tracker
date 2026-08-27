const express = require("express");
const router = express.Router();

const pool = require("../db/database");

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        priority,
        completed,
        created_at AS "createdAt"
      FROM tasks
      ORDER BY id ASC
    `);

    console.log('Tasks from database:', result.rows);

    res.json(result.rows);

  } catch (error) {
    console.error('DATABASE ERROR:', error);

    res.status(500).json({
      message: 'Failed to fetch tasks',
      error: error.message
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const result = await pool.query(
      `
      INSERT INTO tasks
        (title, description, priority)
      VALUES
        ($1, $2, $3)
      RETURNING
        id,
        title,
        description,
        priority,
        completed,
        created_at AS "createdAt"
      `,
      [title, description, priority],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await pool.query(
      `
      UPDATE tasks
      SET completed = $1
      WHERE id = $2
      RETURNING
        id,
        title,
        description,
        priority,
        completed,
        created_at AS "createdAt"
      `,
      [completed, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING id
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;
