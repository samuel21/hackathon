const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

router.get('/', (req, res) => {
    res.send('Daily check-ins route working');
});

// Update a daily check-in
router.put('/:checkin_id', (req, res) => {
    const { checkin_id } = req.params;
    const { task_id, task_done, checkin_date } = req.body;
    db.run(`UPDATE DailyCheckIns SET task_id = ?, task_done = ?, checkin_date = ? WHERE checkin_id = ?`,
        [task_id, task_done, checkin_date, checkin_id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ updated: this.changes });
        });
});
module.exports = router;