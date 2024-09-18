const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database("./HackScheduler.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Clear data from all tables and reset auto-increment counters
db.serialize(() => {
  // Clear data from UserWeeklyCheckIns table
  db.run(`DELETE FROM UserWeeklyCheckIns`, (err) => {
    if (err) {
      console.error("Error clearing UserWeeklyCheckIns table:", err.message);
    } else {
      console.log("UserWeeklyCheckIns table cleared successfully");
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

  // Clear data from UserTodo table
  db.run(`DELETE FROM UserTodo`, (err) => {
    if (err) {
      console.error("Error clearing UserTodo table:", err.message);
    } else {
      console.log("UserTodo table cleared successfully");
    }
  });

  // Reset auto-increment counters
  db.run(
    `DELETE FROM sqlite_sequence WHERE name='UserWeeklyCheckIns'`,
    (err) => {
      if (err) {
        console.error(
          "Error resetting auto-increment counter for UserWeeklyCheckIns table:",
          err.message
        );
      } else {
        console.log(
          "Auto-increment counter for UserWeeklyCheckIns table reset successfully"
        );
      }
    }
  );

  db.run(`DELETE FROM sqlite_sequence WHERE name='Schedules'`, (err) => {
    if (err) {
      console.error(
        "Error resetting auto-increment counter for Schedules table:",
        err.message
      );
    } else {
      console.log(
        "Auto-increment counter for Schedules table reset successfully"
      );
    }
  });

  db.run(`DELETE FROM sqlite_sequence WHERE name='UserPreferences'`, (err) => {
    if (err) {
      console.error(
        "Error resetting auto-increment counter for UserPreferences table:",
        err.message
      );
    } else {
      console.log(
        "Auto-increment counter for UserPreferences table reset successfully"
      );
    }
  });

  db.run(`DELETE FROM sqlite_sequence WHERE name='Users'`, (err) => {
    if (err) {
      console.error(
        "Error resetting auto-increment counter for Users table:",
        err.message
      );
    } else {
      console.log("Auto-increment counter for Users table reset successfully");
    }
  });

  db.run(`DELETE FROM sqlite_sequence WHERE name='UserTodo'`, (err) => {
    if (err) {
      console.error(
        "Error resetting auto-increment counter for UserTodo table:",
        err.message
      );
    } else {
      console.log(
        "Auto-increment counter for UserTodo table reset successfully"
      );
    }
  });

  // Close the database
  db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Database closed successfully");
    }
  });
});
