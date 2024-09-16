const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

/*
router.get('/', (req, res) => {
    res.send('Hobbies route working');
});
*/

// Create a new hobby
router.post('/', (req, res) => {
    const { user_id, hobby_name, preferred_duration } = req.body;
    db.run(`INSERT INTO Hobbies (user_id, hobby_name, preferred_duration) VALUES (?, ?, ?)`,
        [user_id, hobby_name, preferred_duration],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ hobby_id: this.lastID });
        });
});

// Get all hobbies for a user
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM Hobbies WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(rows);
    });
});

// Update a hobby
router.put('/:hobby_id', (req, res) => {
    const { hobby_id } = req.params;
    const { hobby_name, preferred_duration } = req.body;
    db.run(`UPDATE Hobbies SET hobby_name = ?, preferred_duration = ? WHERE hobby_id = ?`,
        [hobby_name, preferred_duration, hobby_id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ updated: this.changes });
        });
});

// Delete a hobby
router.delete('/:hobby_id', (req, res) => {
    const { hobby_id } = req.params;
    db.run(`DELETE FROM Hobbies WHERE hobby_id = ?`, [hobby_id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deleted: this.changes });
    });
});

module.exports = router;
