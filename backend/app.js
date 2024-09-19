const express = require("express");
const multer = require("multer");
const db = require("./database");

const app = express();
app.use(express.json());

// Load route files
const uploadRoutes = require('./routes/upload'); // upload ics file
const usersRoutes = require("./routes/users"); // Ensure correct path
const preferencesRoutes = require("./routes/preferences"); // Ensure correct path
const plansRoutes = require("./routes/plans"); // Ensure correct path
const schedulesRoutes = require("./routes/schedules"); // Ensure correct path
const hobbiesRoutes = require("./routes/hobbies"); // Ensure correct path
const checkinsRoutes = require("./routes/weeklycheckins"); // Ensure correct path
const generatescheduleRoutes = require("./routes/generateschedule"); // Ensure correct path
const generatesummaryRoutes = require("./routes/generatesummary"); // Ensure correct path

// Use the routes as middleware
app.use('/upload', uploadRoutes);
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
