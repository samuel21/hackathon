const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

router.get('/', (req, res) => {
    res.send('Checkins route working');
});


// Create a new check-in
router.post('/', (req, res) => {
    const { user_id, checkin_type, work_plan, health_plan, family_plan, checkin_date } = req.body;
    db.run(`INSERT INTO UserCheckIns (user_id, checkin_type, work_plan, health_plan, family_plan, checkin_date) VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, checkin_type, work_plan, health_plan, family_plan, checkin_date],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ checkin_id: this.lastID });
        });
});

// Get all check-ins for a user
/*router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM UserCheckIns WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(rows);
    });
});
*/
// Update a check-in
router.put('/:checkin_id', (req, res) => {
    const { checkin_id } = req.params;
    const { checkin_type, work_plan, health_plan, family_plan, checkin_date } = req.body;
    db.run(`UPDATE UserCheckIns SET checkin_type = ?, work_plan = ?, health_plan = ?, family_plan = ?, checkin_date = ? WHERE checkin_id = ?`,
        [checkin_type, work_plan, health_plan, family_plan, checkin_date, checkin_id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ updated: this.changes });
        });
});

// Delete a check-in
router.delete('/:checkin_id', (req, res) => {
    const { checkin_id } = req.params;
    db.run(`DELETE FROM UserCheckIns WHERE checkin_id = ?`, [checkin_id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deleted: this.changes });
    });
});

module.exports = router;
