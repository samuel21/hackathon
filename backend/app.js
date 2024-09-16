const express = require('express');
const app = express();

app.use(express.json());

// Load route files
const usersRoutes = require('./routes/users');  // Ensure correct path
const preferencesRoutes = require('./routes/preferences');  // Ensure correct path
const plansRoutes = require('./routes/plans');  // Ensure correct path
const schedulesRoutes = require('./routes/schedules');  // Ensure correct path
const hobbiesRoutes = require('./routes/hobbies');  // Ensure correct path
const checkinsRoutes = require('./routes/checkins');  // Ensure correct path

// Use the routes as middleware
app.use('/users', usersRoutes);
app.use('/preferences', preferencesRoutes);
app.use('/plans', plansRoutes);
app.use('/schedules', schedulesRoutes);
app.use('/hobbies', hobbiesRoutes);
app.use('/checkins', checkinsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
