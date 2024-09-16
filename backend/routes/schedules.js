const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

/*
router.get('/', (req, res) => {
    res.send('Schedules route working');
});
*/

// Create a new schedule
router.post('/', (req, res) => {
    const { user_id, task_name, start_time, end_time, task_type, status } = req.body;
    db.run(`INSERT INTO Schedules (user_id, task_name, start_time, end_time, task_type, status) VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, task_name, start_time, end_time, task_type, status],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ schedule_id: this.lastID });
        });
});

// Get all schedules for a user
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM Schedules WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(rows);
    });
});

// Update a schedule
router.put('/:schedule_id', (req, res) => {
    const { schedule_id } = req.params;
    const { task_name, start_time, end_time, task_type, status } = req.body;
    db.run(`UPDATE Schedules SET task_name = ?, start_time = ?, end_time = ?, task_type = ?, status = ? WHERE schedule_id = ?`,
        [task_name, start_time, end_time, task_type, status, schedule_id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ updated: this.changes });
        });
});

// Delete a schedule
router.delete('/:schedule_id', (req, res) => {
    const { schedule_id } = req.params;
    db.run(`DELETE FROM Schedules WHERE schedule_id = ?`, [schedule_id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deleted: this.changes });
    });
});

module.exports = router;
