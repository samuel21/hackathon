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

// Function to get the start and end of the current week
const getWeekRange = () => {
    const today = new Date();
    
    // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)
    const dayOfWeek = today.getDay();
    
    // Calculate the start and end of the week (assuming Monday as the first day)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // If Sunday, go back to Monday
    
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Add 6 days to get to Sunday
    
    // Return the dates in ISO format
    return {
      startOfWeek: firstDayOfWeek.toISOString().split('T')[0], // YYYY-MM-DD
      endOfWeek: lastDayOfWeek.toISOString().split('T')[0]     // YYYY-MM-DD
    };
};


// Get schedules for the current week by user_id
router.get('/weekly-schedules/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const { startOfWeek, endOfWeek } = getWeekRange();
  
    const query = `
      SELECT * FROM schedules 
      WHERE user_id = ?
      AND (
        (date(start_time) BETWEEN ? AND ?) OR
        (date(due_date) BETWEEN ? AND ?)
      )
    `;
  
    db.all(query, [userId, startOfWeek, endOfWeek, startOfWeek, endOfWeek], (err, rows) => {
      if (err) {
        console.error('Error fetching weekly schedules:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No schedules found for this week' });
      }
  
      res.status(200).json(rows);
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
