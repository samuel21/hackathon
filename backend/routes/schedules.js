// schedules.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

// Create a new schedule
router.post('/', (req, res) => {
    const { user_id, name, description, due_date, category, priority, labels, start_time, end_time, status } = req.body;

    const query = `
        INSERT INTO Schedules (user_id, name, description, due_date, category, priority, labels, start_time, end_time, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [user_id, name, description, due_date, category, priority, labels, start_time, end_time, status || 'pending'], function(err) {
        if (err) {
            console.error('Error creating schedule:', err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Schedule created successfully', schedule_id: this.lastID });
        }
    });
});

// Get all schedules
router.get('/', (req, res) => {
    db.all('SELECT * FROM Schedules', [], (err, rows) => {
        if (err) {
            console.error('Error retrieving schedules:', err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Get a specific schedule by ID
router.get('/:id', (req, res) => {
    const scheduleId = req.params.id;

    db.get('SELECT * FROM Schedules WHERE schedule_id = ?', [scheduleId], (err, row) => {
        if (err) {
            console.error('Error retrieving schedule:', err.message);
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ message: 'Schedule not found' });
        } else {
            res.status(200).json(row);
        }
    });
});
// Update a schedule
router.put('/:id', (req, res) => {
    const scheduleId = req.params.id;
    const { name, description, due_date, category, priority, labels, start_time, end_time, status } = req.body;

    const query = `
        UPDATE Schedules
        SET name = ?, description = ?, due_date = ?, category = ?, priority = ?, labels = ?, start_time = ?, end_time = ?, status = ?
        WHERE schedule_id = ?
    `;

    db.run(query, [name, description, due_date, category, priority, labels, start_time, end_time, status || 'pending', scheduleId], function(err) {
        if (err) {
            console.error('Error updating schedule:', err.message);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Schedule not found' });
        } else {
            res.status(200).json({ message: 'Schedule updated successfully' });
        }
    });
});// Delete a schedule
router.delete('/:id', (req, res) => {
    const scheduleId = req.params.id;

    db.run('DELETE FROM Schedules WHERE schedule_id = ?', [scheduleId], function(err) {
        if (err) {
            console.error('Error deleting schedule:', err.message);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Schedule not found' });
        } else {
            res.status(200).json({ message: 'Schedule deleted successfully' });
        }
    });
});

module.exports = router;
