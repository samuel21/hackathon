const express = require('express');
const multer = require('multer');
const ical = require('ical');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Utility function to parse iCal data
function parseIcal(data) {
  const parsedEvents = [];
  const events = ical.parseICS(data);

  Object.values(events).forEach((event) => {
    if (event.type === 'VEVENT') {
      parsedEvents.push({
        name: event.summary || 'No Title',
        description: event.description || 'No Description',
        start_time: event.start,
        end_time: event.end,
        priority: event.priority || 'medium',
        labels: event.categories || 'none',
        status: 'pending',
      });
    }
  });

  return parsedEvents;
}

// Upload API for parsing .ics files
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    try {
      // Parse the .ics file
      const icsData = req.file.buffer.toString("utf-8");
      console.log("ICS Data:", icsData); // Log raw ICS data
      const events = parseIcal(icsData);
      console.log("Parsed Events:", events); // Log parsed events
  
      // Save events to the database
      const insertPromises = events.map((event) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Schedules (user_id, name, description, due_date, category, priority, labels, start_time, end_time, status, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const params = [
            1, // Replace with actual user_id if needed
            event.name,
            event.description,
            null, // Replace with actual due_date if needed
            'work', // Adjust category based on your needs
            event.priority,
            event.labels,
            event.start_time,
            event.end_time,
            event.status,
            "ics",
          ];
  
          db.run(query, params, function (err) {
            if (err) {
              console.error("Database Insert Error:", err.message);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
  
      Promise.all(insertPromises)
        .then(() => res.status(200).send("Events successfully saved."))
        .catch((error) => {
          console.error("Error Inserting Events:", error);
          res.status(500).send("Error saving events.");
        });
    } catch (error) {
      console.error("File Processing Error:", error);
      res.status(500).send("Error processing file.");
    }
});

module.exports = router;
