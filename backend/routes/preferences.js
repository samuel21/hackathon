const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

/*
router.get('/', (req, res) => {
    res.send('Preferences route working');
});
*/

// Create a new preference
router.post('/', (req, res) => {
    const { user_id, work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end } = req.body;
    db.run(`INSERT INTO UserPreferences (user_id, work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ preference_id: this.lastID });
        });
});

// Get all preferences for a user
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM UserPreferences WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(rows);
    });
});

// Update a preference
router.put('/:preference_id', (req, res) => {
    const { preference_id } = req.params;
    const { work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end } = req.body;
    db.run(`UPDATE UserPreferences SET work_hours_start = ?, work_hours_end = ?, preferred_break_length = ?, hobbies = ?, preferred_learning_time = ?, preferred_workout_time = ?, sleep_schedule_start = ?, sleep_schedule_end = ? WHERE preference_id = ?`,
        [work_hours_start, work_hours_end, preferred_break_length, hobbies, preferred_learning_time, preferred_workout_time, sleep_schedule_start, sleep_schedule_end, preference_id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ updated: this.changes });
        });
});

// Delete a preference
router.delete('/:preference_id', (req, res) => {
    const { preference_id } = req.params;
    db.run(`DELETE FROM UserPreferences WHERE preference_id = ?`, [preference_id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deleted: this.changes });
    });
});

module.exports = router;
