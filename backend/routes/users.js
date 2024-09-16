const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

/*
// Define your routes here
router.get('/', (req, res) => {
    res.send('Users route working');
});
*/

// Create a new user
router.post('/', (req, res) => {
    const { name, email, password_hash, gender, age, married, kids, occupation, location, role } = req.body;
    const sql = `INSERT INTO Users (name, email, password_hash, gender, age, married, kids, occupation, location, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, email, password_hash, gender, age, married, kids, occupation, location, role], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ user_id: this.lastID });
    });
});

// Get all users
router.get('/', (req, res) => {
    const sql = `SELECT * FROM Users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a single user by ID
router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM Users WHERE user_id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

// Update a user
router.put('/:id', (req, res) => {
    const { name, email, password_hash, gender, age, married, kids, occupation, location, role } = req.body;
    const sql = `UPDATE Users SET name = ?, email = ?, password_hash = ?, gender = ?, age = ?, married = ?, kids = ?, occupation = ?, location = ?, role = ? WHERE user_id = ?`;
    db.run(sql, [name, email, password_hash, gender, age, married, kids, occupation, location, role, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// Delete a user
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM Users WHERE user_id = ?`;
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

module.exports = router;
