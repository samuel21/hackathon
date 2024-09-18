const express = require("express");
const multer = require("multer");
const db = require("./database");
const parseIcal = require("./services/icalParserService");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), (req, res) => {
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
          event.category,
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
      .catch((error) => res.status(500).send("Error processing file."));
  } catch (error) {
    console.error("File Processing Error:", error);
    res.status(500).send("Error processing file.");
  }
});

app.use(express.json());

// Load route files
const usersRoutes = require("./routes/users"); // Ensure correct path
const preferencesRoutes = require("./routes/preferences"); // Ensure correct path
const plansRoutes = require("./routes/plans"); // Ensure correct path
const schedulesRoutes = require("./routes/schedules"); // Ensure correct path
const hobbiesRoutes = require("./routes/hobbies"); // Ensure correct path
const checkinsRoutes = require("./routes/weeklycheckins"); // Ensure correct path
const generatescheduleRoutes = require("./routes/generateschedule"); // Ensure correct path
const generatesummaryRoutes = require("./routes/generatesummary"); // Ensure correct path

// Use the routes as middleware
app.use("/users", usersRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/plans", plansRoutes);
app.use("/schedules", schedulesRoutes);
app.use("/hobbies", hobbiesRoutes);
app.use("/weeklycheckins", checkinsRoutes);
app.use("/generateschedule", generatescheduleRoutes);
app.use("/generatesummary", generatesummaryRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
