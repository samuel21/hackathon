const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("HackScheduler.db");
const router = express.Router();

router.get("/", (req, res) => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0]; // Get today's date in ISO format (YYYY-MM-DD)

  const summaryQuery = `
    SELECT 
      category,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks,
      COUNT(*) AS total_tasks
    FROM Schedules
    WHERE due_date = ?
    GROUP BY category
  `;

  const tasksQuery = `
    SELECT 
      category,
      name,
      status
    FROM Schedules
    WHERE due_date = ?
  `;

  db.all(summaryQuery, [todayDate], (err, summaryRows) => {
    if (err) {
      console.error("Error querying the database:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    db.all(tasksQuery, [todayDate], (err, tasksRows) => {
      if (err) {
        console.error("Error querying the database:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const report = summaryRows.reduce((acc, row) => {
        acc[row.category] = {
          completed_tasks: row.completed_tasks,
          total_tasks: row.total_tasks,
          tasks: [],
        };
        return acc;
      }, {});

      tasksRows.forEach((row) => {
        if (report[row.category]) {
          report[row.category].tasks.push({
            name: row.name,
            status: row.status,
          });
        }
      });

      res.json(report);
    });
  });
});

module.exports = router;
