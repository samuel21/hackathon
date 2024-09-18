const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database("./HackScheduler.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Drop all tables
db.serialize(() => {
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error("Error fetching table names:", err.message);
    } else {
      let dropTablePromises = tables.map((table) => {
        return new Promise((resolve, reject) => {
          db.run(`DROP TABLE IF EXISTS ${table.name}`, (err) => {
            if (err) {
              console.error(`Error dropping ${table.name} table:`, err.message);
              reject(err);
            } else {
              console.log(`${table.name} table dropped successfully`);
              resolve();
            }
          });
        });
      });

      // Wait for all drop table operations to complete
      Promise.all(dropTablePromises)
        .then(() => {
          // Close the database
          db.close((err) => {
            if (err) {
              console.error("Error closing the database:", err.message);
            } else {
              console.log("Database closed successfully");
            }
          });
        })
        .catch((err) => {
          console.error("Error during table drop operations:", err.message);
        });
    }
  });
});
