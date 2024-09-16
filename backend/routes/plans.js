const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

/*
router.get('/', (req, res) => {
    res.send('Plans route working');
});
*/

// Create a new work/learning plan
router.post('/', (req, res) => {
    const { user_id, task_name, task_type, priority, duration, due_date } = req.body;
    db.run(`INSERT INTO WorkLearningPlans (user_id, task_name, task_type, priority, duration, due_date) VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, task_name, task_type, priority, duration, due_date],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ plan_id: this.lastID });
        });
});

// Get all plans for a user
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM WorkLearningPlans WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(rows);
    });
});

// Update a plan
router.put('/:plan_id', (req, res) => {
    const { plan_id } = req.params;
    const { task_name, task_type, priority, duration, due_date } = req.body;
    db.run(`UPDATE WorkLearningPlans SET task_name = ?, task_type = ?, priority = ?, duration = ?, due_date = ? WHERE plan_id = ?`,
        [task_name, task_type, priority, duration, due_date, plan_id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ updated: this.changes });
        });
});

// Delete a plan
router.delete('/:plan_id', (req, res) => {
    const { plan_id } = req.params;
    db.run(`DELETE FROM WorkLearningPlans WHERE plan_id = ?`, [plan_id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deleted: this.changes });
    });
});

module.exports = router;
