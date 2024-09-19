const express = require('express');
const multer = require('multer');
const parseIcal = require('../services/parseIcal'); // Adjust path as necessary
//const { RRule, rrulestr } = require('rrule');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('HackScheduler.db');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.json());

const { RRule, RRuleSet, rrulestr } = require('rrule');

// Function to handle recurrence rules and generate occurrences
function generateOccurrences(start, end, ruleString) {
  const occurrences = [];

  if (!ruleString) {
    console.warn("No recurrence rule provided.");
    return occurrences; // No occurrences to generate
  }

  try {
    const rule = rrulestr(ruleString, { dtstart: new Date(start) });
    
    // Use UNTIL parameter if available
    const ruleOptions = rule.options;
    const until = ruleOptions.until || end; // Default to the event end if UNTIL is not specified
    console.log(until);
    const allOccurrences = rule.between(new Date(start), new Date(until));

    allOccurrences.forEach(date => {
      occurrences.push({
        start_time: date.toISOString(),
        end_time: new Date(date.getTime() + (ruleOptions.duration || 60 * 60 * 1000)).toISOString() // Default duration of 1 hour
      });
    });
  } catch (error) {
    console.error("Recurrence Rule Error:", error.message);
  }

  return occurrences;
}


// Endpoint to handle file uploads
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    // Parse the .ics file
    const icsData = req.file.buffer.toString("utf-8");
    console.log("ICS Data:", icsData);

    // Parse the ICS data
    const events = parseIcal(icsData);
    console.log("Parsed Events:", events);

    // Process events and generate occurrences
    const insertPromises = [];

    events.forEach(event => {
      const recurrenceRule = event.recurrenceRule || '';

      console.log(`Processing Event: ${event.name}`);
      console.log(`Recurrence Rule: ${recurrenceRule}`);

      let occurrences = [];

      if (recurrenceRule) {
        console.log("generate");
        occurrences = generateOccurrences(event.start_time, event.end_time, recurrenceRule);
      } else {
        console.log("dont generate");
       
        occurrences.push({
          start_time: event.start_time,
          end_time: event.end_time
        });
      }

      occurrences.forEach((occurrence) => {
        insertPromises.push(new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Schedules (user_id, name, description, due_date, category, priority, labels, start_time, end_time, status, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const params = [
            1,
            event.name,
            event.description,
            null,
            'work',
            'medium',
            '',
            occurrence.start_time,
            occurrence.end_time,
            'pending',
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
        }));
      });
    });

    Promise.all(insertPromises)
      .then(() => res.status(200).send("Events successfully saved."))
      .catch((error) => {
        console.error("Error processing file:", error);
        res.status(500).send("Error processing file.");
      });
  } catch (error) {
    console.error("File Processing Error:", error);
    res.status(500).send("Error processing file.");
  }
});

module.exports = router;
