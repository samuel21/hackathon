const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('HackScheduler.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Clear data from all tables and reset auto-increment counters
db.serialize(() => {
    // Clear data from UserCheckIns table
    db.run(`DELETE FROM UserCheckIns`, (err) => {
        if (err) {
            console.error("Error clearing UserCheckIns table:", err.message);
        } else {
            console.log("UserCheckIns table cleared successfully");
        }
    });

    // Clear data from Hobbies table
    db.run(`DELETE FROM Hobbies`, (err) => {
        if (err) {
            console.error("Error clearing Hobbies table:", err.message);
        } else {
            console.log("Hobbies table cleared successfully");
        }
    });

    // Clear data from Schedules table
    db.run(`DELETE FROM Schedules`, (err) => {
        if (err) {
            console.error("Error clearing Schedules table:", err.message);
        } else {
            console.log("Schedules table cleared successfully");
        }
    });

    // Clear data from WorkLearningPlans table
    db.run(`DELETE FROM WorkLearningPlans`, (err) => {
        if (err) {
            console.error("Error clearing WorkLearningPlans table:", err.message);
        } else {
            console.log("WorkLearningPlans table cleared successfully");
        }
    });

    // Clear data from UserPreferences table
    db.run(`DELETE FROM UserPreferences`, (err) => {
        if (err) {
            console.error("Error clearing UserPreferences table:", err.message);
        } else {
            console.log("UserPreferences table cleared successfully");
        }
    });

    // Clear data from Users table
    db.run(`DELETE FROM Users`, (err) => {
        if (err) {
            console.error("Error clearing Users table:", err.message);
        } else {
            console.log("Users table cleared successfully");
        }
    });

    // Reset auto-increment counters
    db.run(`DELETE FROM sqlite_sequence WHERE name='UserCheckIns'`, (err) => {
        if (err) {
            console.error("Error resetting auto-increment counter for UserCheckIns table:", err.message);
        } else {
            console.log("Auto-increment counter for UserCheckIns table reset successfully");
        }
    });

    db.run(`DELETE FROM sqlite_sequence WHERE name='Hobbies'`, (err) => {
        if (err) {
            console.error("Error resetting auto-increment counter for Hobbies table:", err.message);
        } else {
            console.log("Auto-increment counter for Hobbies table reset successfully");
        }
    });

    db.run(`DELETE FROM sqlite_sequence WHERE name='Schedules'`, (err) => {
        if (err) {
            console.error("Error resetting auto-increment counter for Schedules table:", err.message);
        } else {
            console.log("Auto-increment counter for Schedules table reset successfully");
        }
    });

    db.run(`DELETE FROM sqlite_sequence WHERE name='WorkLearningPlans'`, (err) => {
        if (err) {
            console.error("Error resetting auto-increment counter for WorkLearningPlans table:", err.message);
        } else {
            console.log("Auto-increment counter for WorkLearningPlans table reset successfully");
        }
    });

    db.run(`DELETE FROM sqlite_sequence WHERE name='UserPreferences'`, (err) => {
        if (err) {
            console.error("Error resetting auto-increment counter for UserPreferences table:", err.message);
        } else {
            console.log("Auto-increment counter for UserPreferences table reset successfully");
        }
    });

    db.run(`DELETE FROM sqlite_sequence WHERE name='Users'`, (err) => {
        if (err) {
            console.error("Error resetting auto-increment counter for Users table:", err.message);
        } else {
            console.log("Auto-increment counter for Users table reset successfully");
        }
    });

    // Close the database
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database closed successfully');
        }
    });
});